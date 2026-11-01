// Pixel Hopper online server: a small WebSocket relay with 4-player rooms, plus static hosting for the game.
// Run:  npm install && npm start      (PORT env var, default 8080)
// The room host runs the simulation; the server only relays messages, so it stays tiny and cheap.
const http = require('http'), fs = require('fs'), path = require('path');
const { WebSocketServer } = require('ws');
const ROOT = path.join(__dirname, '..'), PORT = process.env.PORT || 8080;
const ALLOWED = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean); // e.g. https://you.github.io
const FILES = { '/': 'pixel-hopper.html', '/index.html': 'pixel-hopper.html', '/pixel-hopper.html': 'pixel-hopper.html', '/manifest.webmanifest': 'manifest.webmanifest', '/sw.js': 'sw.js', '/icon.svg': 'icon.svg', '/icon-192.png': 'icon-192.png', '/icon-512.png': 'icon-512.png', '/icon-maskable-512.png': 'icon-maskable-512.png' };
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  const u = (req.url || '/').split('?')[0];
  if (u === '/health') { res.writeHead(200); res.end('ok'); return; }
  const f = FILES[u];
  if (!f) { res.writeHead(404); res.end('not found'); return; }
  fs.readFile(path.join(ROOT, f), (e, b) => {
    if (e) { res.writeHead(404); res.end('missing'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(b);
  });
});
const wss = new WebSocketServer({ server, maxPayload: 16 * 1024, verifyClient: ({ origin }) => !ALLOWED.length || !origin || ALLOWED.includes(origin) });
const rooms = new Map(), CH = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const newCode = () => { for (;;) { let c = ''; for (let i = 0; i < 4; i++) c += CH[Math.random() * CH.length | 0]; if (!rooms.has(c)) return c; } };
const send = (ws, o) => { if (ws && ws.readyState === 1) ws.send(JSON.stringify(o)); };
const occ = r => r.slots.map(s => (s ? 1 : 0));
const bcast = (r, o, except) => r.slots.forEach(s => { if (s && s !== except) send(s, o); });
function leave(ws) {
  const r = ws.room; if (!r) return; ws.room = null;
  const i = r.slots.indexOf(ws); if (i < 0) return; r.slots[i] = null;
  if (i === 0) { bcast(r, { t: 'closed' }); r.slots.forEach(s => { if (s) s.room = null; }); rooms.delete(r.code); }
  else { bcast(r, { t: 'room', slots: occ(r) }); if (r.slots.every(s => !s)) rooms.delete(r.code); }
}
wss.on('connection', ws => {
  ws.alive = true; ws.bucket = 200; ws.room = null;
  ws.on('pong', () => { ws.alive = true; });
  ws.on('message', buf => {
    if (--ws.bucket < 0) return;                       // flood protection: ~100 messages per second per client
    let m; try { m = JSON.parse(buf); } catch (e) { return; }
    if (!m || typeof m.t !== 'string') return;
    if (m.t === 'create') {
      if (ws.room) return;
      const r = { code: newCode(), slots: [ws, null, null, null] }; r.slots[0] = ws; rooms.set(r.code, r); ws.room = r;
      send(ws, { t: 'created', room: r.code, slots: occ(r) });
    } else if (m.t === 'join') {
      if (ws.room) return;
      const r = rooms.get(String(m.room || '').toUpperCase().slice(0, 6));
      if (!r) return send(ws, { t: 'error', m: 'ROOM NOT FOUND' });
      const i = r.slots.indexOf(null);
      if (i < 0) return send(ws, { t: 'error', m: 'ROOM IS FULL' });
      r.slots[i] = ws; ws.room = r;
      send(ws, { t: 'joined', room: r.code, slot: i, slots: occ(r) });
      bcast(r, { t: 'room', slots: occ(r) }, ws);
    } else if (m.t === 'm' && ws.room) {
      const r = ws.room, f = r.slots.indexOf(ws);
      if (f === 0) bcast(r, { t: 'm', f, d: m.d }, ws);   // host -> every guest
      else send(r.slots[0], { t: 'm', f, d: m.d });       // guest -> host only
    }
  });
  ws.on('close', () => leave(ws));
  ws.on('error', () => {});
});
let tick = 0;
const timer = setInterval(() => {
  tick++;
  wss.clients.forEach(ws => {
    ws.bucket = Math.min(200, ws.bucket + 100);
    if (tick % 20 === 0) { if (!ws.alive) return ws.terminate(); ws.alive = false; ws.ping(); }
  });
}, 1000);
timer.unref();
function start(port = PORT, host) { return new Promise(res => server.listen(port, host, () => res(server.address().port))); }
if (require.main === module) start().then(p => console.log('Pixel Hopper server on http://localhost:' + p));
module.exports = { server, wss, rooms, start, close: () => new Promise(res => { wss.clients.forEach(c => c.terminate()); wss.close(() => server.close(() => res())); }) };
