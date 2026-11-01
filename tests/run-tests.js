#!/usr/bin/env node
// Headless test runner for Pixel Hopper. Usage: node tests/run-tests.js [path/to/pixel-hopper.html]
const fs=require('fs'),path=require('path'),file=process.argv[2]||path.join(__dirname,'..','pixel-hopper.html');
const src=fs.readFileSync(file,'utf8').split('<script>')[1].split('</script>')[0];
let el_ref;const fails={},bad=m=>fails[m]=(fails[m]||0)+1,note=m=>m.replace(/-?\d+(\.\d+)?/g,'#');
function load(store,WSck,three){const noop=()=>{},H={},C={},raf=[],nav={};let boom=0;
 const ctx=new Proxy({},{get:(t,k)=>k.startsWith('create')?()=>({addColorStop:noop}):k=='fillText'?()=>{if(boom){boom=0;throw new Error('boom')}}:noop,set:()=>true});
 const el=el_ref={getContext:()=>ctx,getBoundingClientRect:()=>({left:0,top:0,width:320,height:192}),addEventListener:(n,h)=>C[n]=h,classList:{toggle:noop},style:{setProperty:noop},setAttribute:noop,dataset:{}},win={};
 const g={window:win,document:{createElement:()=>({width:0,height:0,getContext:()=>ctx}),getElementById:()=>el,querySelectorAll:()=>[],body:el,documentElement:el,addEventListener:(n,h)=>H['doc'+n]=h,hidden:false},localStorage:{getItem:()=>store||null,setItem:noop},performance:{now:()=>0},requestAnimationFrame:f=>raf.push(f),setInterval:noop,setTimeout:noop,matchMedia:()=>({matches:false}),navigator:nav,WebSocket:WSck,THREE:three,addEventListener:(n,h)=>H[n]=h};
 new Function(...Object.keys(g),src)(...Object.values(g));return{PH:win.PH,H,C,raf,nav,boom:()=>boom=1}}
const {PH,H,C}=load();
// 1. static level validation
PH.LV.forEach((L,i)=>{PH.ld(i);const G=PH.G,t=(x,y)=>x<0||x>=L.w?1:y<0||y>=12?0:G[y][x],nm='L'+(i+1)+' '+L.n+': ';
 const can=(col,y,ex,strict,rad)=>{rad=rad||2;for(let c=col-rad;c<=col+rad;c++)for(let r=0;r<12;r++)if(t(c,r)==1&&t(c,r-1)!=1&&r*16<=y+ex&&r*16>(strict?y:y-8))return 1;return 0};
 const gs=[...L.g].sort((a,b)=>a[0]-b[0]);for(let k=1;k<gs.length;k++)if(gs[k][0]-gs[k-1][1]>3)bad(nm+'gap wider than 3 tiles');
 L.p.forEach(([a,y])=>{if(!can(a,y*16,51,1,4))bad(nm+'platform too high to reach at col '+a)});
 L.c.forEach(([a,y,n])=>{for(let k=0;k<n;k++){if(t(a+k,y)==1)bad(nm+'coin inside solid at '+(a+k)+','+y);else if(!can(a+k,y*16+8,70))bad(nm+'coin unreachable at '+(a+k)+','+y)}});
 (L.u||[]).forEach(([a,y,k])=>{if(t(a,y)==1)bad(nm+'orb inside solid at '+a+','+y);else if(!can(a,y*16+8,70))bad(nm+'orb unreachable at '+a+','+y);if(k<0||k>3)bad(nm+'bad orb kind')});
 L.e.forEach(([a,y,k])=>{k=k||0;if(t(a,y)==1)bad(nm+'enemy inside solid at '+a);if(t(a,y)==2)bad(nm+'enemy on spike at '+a);if([0,1,3].includes(k)&&t(a,y+1)!=1)bad(nm+'enemy floating at '+a+','+y)});
 L.s.forEach(([a,y])=>{if(t(a,y+1)!=1)bad(nm+'spike not on ground at '+a);if(t(a,y)==1)bad(nm+'spike inside solid at '+a)});
 if(t(L.st[0],L.st[1])||t(L.st[0],L.st[1]+1)!=1)bad(nm+'bad spawn');if(t(L.f[0],L.f[1])||t(L.f[0],L.f[1]+1)!=1)bad(nm+'flag not on clear ground');
 if(t(L.f[0],L.f[1]+1)==1&&L.s.some(([a,y])=>a==L.f[0]))bad(nm+'spike under flag');
 (L.cp||[]).forEach(x=>{const c=x/16;if(t(c,9)||t(c,10)!=1||L.s.some(([a])=>Math.abs(a-c)<3)||(L.bs!=null&&c>=L.ar-3))bad(nm+'bad checkpoint at col '+c)});
 if(L.tut&&(L.cp||[]).length)bad(nm+'tutorial should have no checkpoints')});
// 2. 1000 random play sessions + invariants
let wins=0;for(let r=0;r<1000;r++){try{PH.S.df=r%5;PH.S.hr=r%4;PH.S.du=PH.S.dev=r%2;PH.S.god=r%3==0;PH.S.fly=r%11==0;PH.S.cb=r%5;PH.play(r%PH.LV.length);if(r%4==0)PH.p.pw=[...PH.PD];
 for(let t=0;t<900;t++){if(t%12==0){const K=PH.K;K.ArrowRight=Math.random()<.7;K.ArrowLeft=Math.random()<.15;K[' ']=Math.random()<.5;K.ArrowDown=Math.random()<.2;if(Math.random()<.3)PH.set('jb',6);if(Math.random()<.2)PH.set('fq',1)}
  if(r%7==0&&PH.L.bs!=null&&t==300){PH.p.x=(PH.L.ar+5)*16;PH.p.y=130;PH.p.vy=0}PH.step();if(t%15==0)PH.draw();PH.inv().forEach(m=>bad('invariant: '+note(m)));if(PH.scene=='clear')wins++;if(PH.scene!='play')break}}catch(e){bad('session crash: '+e.message)}}
// 3. scripted boss fights
PH.S.du=PH.S.dev=PH.S.fly=0;PH.S.df=1;PH.LV.forEach((L,i)=>{if(L.bs==null)return;try{PH.play(i);PH.p.x=(L.ar+5)*16;PH.p.y=130;for(let t=0;t<5;t++)PH.step();
 for(let k=0;k<20&&PH.bo.a;k++){PH.p.x=PH.bo.x+6;PH.p.y=PH.bo.y-18;PH.p.vy=3;PH.step();for(let t=0;t<70;t++){PH.p.pw[1]=1;PH.step();PH.p.x=PH.bo.x+6;PH.p.y=Math.min(PH.p.y,PH.bo.y-60)}}
 if(PH.bo.a)bad('boss '+(i+1)+' not defeated');else{PH.p.x=L.f[0]*16;PH.p.y=130;PH.step();if(PH.scene!='clear')bad('flag after boss '+(i+1)+' did not clear level')}}catch(e){bad('boss crash: '+e.message)}});
// 4. every menu item runs and every scene draws
PH.P.w=5000;for(const n of Object.keys(PH.HD)){try{PH.set('scene',n);if(PH.M[n])PH.M[n]().forEach(it=>{PH.set('scene',n);it[1]()});PH.set('scene',n);PH.draw()}catch(e){bad('menu '+n+': '+e.message)}}
PH.S.np=1;
// 5. secret code
PH.S.du=PH.S.dev=0;PH.go('code');'1234'.split('').forEach(PH.kp);PH.kp('OK');if(PH.S.du)bad('wrong code accepted');PH.go('code');'73906158240417369852'.split('').forEach(PH.kp);PH.kp('OK');if(!PH.S.du)bad('right code rejected');
// 6. random keyboard + pointer events, locked and unlocked
const keys=['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter','Escape',' ','p','`','Backspace','x','Shift','g','h','f','n','b','k','l','r','[',']','1','2','3','4','5','7','9','0','z','w','a','s','d'];
for(const du of [0,1]){const G2=load();G2.PH.S.du=du;G2.PH.P.w=5000;for(let i=0;i<30000;i++){try{const k=keys[Math.random()*keys.length|0],ev={key:k,repeat:Math.random()<.1,preventDefault(){},clientX:Math.random()*320,clientY:Math.random()*192},r=Math.random();
 if(r<.5)G2.H.keydown(ev);else if(r<.7)G2.H.keyup(ev);else if(r<.85)G2.C.pointerdown(ev);else G2.C.pointermove(ev);if(i%4000==0)G2.H.blur();if(i%5000==0)G2.H.docvisibilitychange();
 for(let t=0;t<3;t++)G2.PH.step();if(i%5==0)G2.PH.draw();G2.PH.inv().forEach(m=>bad('input fuzz invariant: '+note(m)));if(!du&&G2.PH.S.dev)bad('dev enabled while locked');if(!['title','pause'].includes(G2.PH.back))bad('stale back '+G2.PH.back)}catch(e){bad('input fuzz crash: '+e.stack.split('\n').slice(0,2).join(' | '))}}}
// 7. corrupt save data is sanitised
for(const st of['not json',JSON.stringify({S:{df:99,hr:-3,vol:'x',cb:'z',dev:1,du:0,tc:7,ts:1.5},P:{u:999,b:'bad'}}),JSON.stringify({S:null,P:{u:-5,b:[1,null,'a']}}),JSON.stringify({S:{of:5},P:{w:-5,o:'x',up:'zz'}}),JSON.stringify({S:{of:3},P:{w:12.5,o:[0,2,2,99,-1],up:[9,-1,1.5,'a',7]}})]){try{const q=load(st).PH,S=q.S;if(S.df<0||S.df>=q.DF.length||S.hr<0||S.hr>=q.HERO.length||S.dev||S.vol<0||S.vol>10||S.cb>4||S.tc>2||S.ts>3||!Number.isInteger(S.ts))bad('save not sanitised: '+st.slice(0,30));if(!q.P.o.includes(S.of)||q.P.w<0||!Number.isInteger(q.P.w)||q.P.up.length!=q.UPG.length||q.P.up.some((v,i)=>!Number.isInteger(v)||v<0||v>q.UPG[i][1]))bad('shop data not sanitised');if(!(q.P.u>=1&&q.P.u<=q.NL)||!Array.isArray(q.P.b)||q.P.b.some(v=>!Number.isFinite(v)))bad('progress not sanitised');q.play(0);q.step();q.draw()}catch(e){bad('corrupt save crash: '+e.message)}}
// 8. render error must not stop the main loop
{const ce=console.error;console.error=()=>{};const q=load();let f=q.raf.pop();q.raf.length=0;q.boom();f(16);console.error=ce;if(q.raf.length!=1)bad('main loop stopped after render error');if(!/boom/.test(q.PH.errors().last))bad('render error not recorded');q.raf.pop()(32);if(q.PH.errors().n)bad('error counter not reset after recovery')}
// 9. every hero on every difficulty can clear a 3-tile gap with a last-moment jump (no coyote time needed)
{Object.keys(PH.K).forEach(k=>PH.K[k]=0);const ti=PH.LV.findIndex(l=>l.tut);for(let df=0;df<PH.DF.length;df++)for(let hr=0;hr<PH.HERO.length;hr++){PH.S.df=df;PH.S.hr=hr;PH.S.du=PH.S.dev=0;PH.play(ti);PH.en.forEach(e=>e.a=0);const g=c=>c<0||c>=PH.L.w?1:PH.G[10][c];PH.p.x=16*17;let ok=0;
 for(let t=0;t<260&&PH.scene=='play';t++){PH.K.ArrowRight=1;PH.K[' ']=0;const q=PH.p;if(q.g&&g(Math.floor((q.x+q.vx+1)/16))!=1){PH.set('jb',6);PH.K[' ']=1}if(!q.g)PH.K[' ']=1;PH.step();if(PH.p.x>16*26&&!PH.dead&&PH.p.g)ok=1;if(PH.dead)break}
 if(!ok)bad('hero '+PH.HERO[hr][0]+' on '+PH.DF[df][0]+' cannot clear a 3-tile gap')}PH.K.ArrowRight=0}
// 10. economy: coins bank on clear (never in the tutorial), shop rules, upgrade effects, reset
{const q=load().PH;q.S.du=q.S.dev=0;const mult=[1,1,1.25,1.5,2];Object.keys(q.K).forEach(k=>q.K[k]=0);
 for(let df=0;df<5;df++){q.S.df=df;const w0=q.P.w;q.play(0);q.en.forEach(e=>e.a=0);q.set('lives',99);q.step();const tot=q.co.length;q.co.forEach(k=>{q.p.x=k.x-6;q.p.y=k.y-7;q.step()});q.p.x=q.L.f[0]*16;q.p.y=130;q.step();
  if(q.scene!='clear'){bad('economy: level 1 not cleared on '+q.DF[df][0]);continue}const exp=Math.round(tot*mult[df]);if(q.earn!=exp||q.P.w!=w0+exp)bad('economy: wrong payout on '+q.DF[df][0]+' got '+q.earn+' expected '+exp)}
 const w1=q.P.w;q.S.df=1;q.play(q.LV.findIndex(l=>l.tut));q.step();q.p.x=q.L.f[0]*16;q.p.y=130;q.step();if(q.earn!=0||q.P.w!=w1)bad('economy: tutorial paid coins');
 q.P.w=1000;const c1=q.OUT[1][1];q.buyO(1);if(!q.P.o.includes(1)||q.S.of!=1||q.P.w!=1000-c1)bad('shop: outfit purchase failed');q.buyO(1);if(q.P.w!=1000-c1)bad('shop: owned outfit charged again');
 q.P.w=0;q.buyO(6);if(q.P.o.includes(6))bad('shop: bought outfit without coins');
 q.P.w=100000;q.UPG.forEach((u,i)=>{for(let k=0;k<u[1]+2;k++)q.buyU(i);if(q.P.up[i]!=u[1])bad('shop: '+u[0]+' ended at level '+q.P.up[i])});
 const want=q.UPG.reduce((a,u)=>{for(let l=0;l<u[1];l++)a+=u[2]*(l+1);return a},0);if(100000-q.P.w!=want)bad('shop: upgrade prices wrong');
 q.S.df=1;q.play(0);for(let i=0;i<3;i++)q.step();if(q.lives!=q.DF[1][1]+3)bad('upgrade: extra lives not applied');if(q.p.pw[1]!=1)bad('upgrade: start shield missing');
 const c0=q.co[0],x0=c0.x;q.p.x=c0.x-30;q.p.y=c0.y-7;q.step();if(c0.x==x0)bad('upgrade: coin magnet did nothing');
 q.play(0);for(let i=0;i<3;i++)q.step();q.pu.push({x:q.p.x+6,y:q.p.y+7,k:0,t:0});q.step();if(q.p.pw[0]!=Math.round(900*1.75))bad('upgrade: power time not extended ('+q.p.pw[0]+')');
 q.play(0);for(let i=0;i<4;i++)q.step();q.K[' ']=1;q.set('jb',6);q.step();if(Math.abs(q.p.vy+6.2*1.12)>.01)bad('upgrade: jump boost wrong ('+q.p.vy+')');q.K[' ']=0;
 q.M.dat()[0][1]();q.M.dat()[0][1]();if(q.P.w!==0||q.P.o.length!=1||q.S.of!==0||q.P.up.some(v=>v))bad('reset save did not clear shop data')}
// 11. leaving noclip while embedded inside a platform must push the player out, not trap or drop them through it
{const q=load().PH;q.S.du=q.S.dev=1;q.S.fly=1;q.play(0);q.step();q.p.x=8*16+2;q.p.y=7*16+1;q.step();if(q.inv().length)bad('noclip: invariant broke while flying');q.S.fly=0;q.step();if(q.inv().length||q.p.y>7*16-14)bad('noclip: player stuck inside platform after leaving fly mode (y='+q.p.y+')')}
// 12. static reachability solver: every level must have a chain of jumps (<=51px up, drops any, gap per jump physics) from spawn to flag
const maxGap=h=>{const q=38.44-.7*h;return q<0?-1:1.7*(6.2+Math.sqrt(q))/.35+4};
function solve(i){PH.ld(i);const L=PH.L,t=(x,y)=>x<0||x>=L.w?1:y<0||y>=12?0:PH.G[y][x],runs=[];
 for(let r=0;r<12;r++){let s0=-1;for(let x=0;x<=L.w;x++){const on=x<L.w&&t(x,r)==1&&t(x,r-1)!=1;if(on&&s0<0)s0=x;if(!on&&s0>=0){runs.push({x0:s0*16,x1:x*16,y:r*16});s0=-1}}}
 const can=(a,b)=>{const h=a.y-b.y;if(h>51)return 0;const g=maxGap(h);return g>=0&&Math.max(b.x0-a.x1,a.x0-b.x1,0)<=g},find=(c,r)=>runs.findIndex(u=>u.y==r*16&&c*16>=u.x0&&c*16<u.x1);
 const a0=find(L.st[0],L.st[1]+1),g0=find(L.f[0],L.f[1]+1),seen=new Set([a0]),q=[a0];if(a0<0||g0<0)return'cannot locate spawn or flag surface';
 while(q.length){const a=runs[q.shift()];runs.forEach((b,k)=>{if(!seen.has(k)&&can(a,b)){seen.add(k);q.push(k)}})}return seen.has(g0)?'':'no jump path from spawn to flag'}
PH.LV.forEach((L,i)=>{const m=solve(i);if(m)bad('solver L'+(i+1)+' '+L.n+': '+m)});
{const L=PH.LV[0],g=L.g,p=L.p;L.g=[[0,18],[26,64]];L.p=[];if(!solve(0))bad('solver sanity: an 8-tile gap was accepted');L.g=[[0,18],[26,64]];L.p=[[19,6,6]];if(!solve(0))bad('solver sanity: a 64px jump was accepted');L.g=g;L.p=p;if(solve(0))bad('solver sanity: level 1 rejected after restore')}
// 13. checkpoints on every difficulty, respawn keeps progress, game over can continue from the checkpoint
for(let df=0;df<5;df++){const q=load().PH;q.S.du=q.S.dev=0;q.S.df=df;q.play(1);q.en.forEach(e=>e.a=0);q.step();const cp=(q.L.cp||[])[0];if(!cp){bad('checkpoint: none on level 2');continue}
 q.p.x=cp+4;q.p.y=145;q.step();if(q.ck!=cp)bad('checkpoint: not reached on '+q.DF[df][0]);q.set('lives',2);q.p.y=400;for(let t=0;t<80;t++)q.step();
 if(Math.abs(q.p.x-cp)>2||q.scene!='play'||q.lives!=1)bad('checkpoint: respawn failed on '+q.DF[df][0]+' ('+q.p.x+','+q.lives+','+q.scene+')');
 q.p.y=400;for(let t=0;t<80;t++)q.step();if(q.scene!='over'){bad('checkpoint: game over expected');continue}const it=q.M.over();if(!/CHECKPOINT/.test(it[0][0]))bad('checkpoint: no continue option on game over');else{it[0][1]();if(q.scene!='play'||Math.abs(q.p.x-cp)>2||q.lives!=q.DF[df][1]+q.P.up[0])bad('checkpoint: continue from game over failed on '+q.DF[df][0])}}
{const q=load().PH;q.play(1);q.step();if(q.M.over().some(it=>/CHECKPOINT/.test(it[0])))bad('checkpoint: continue option offered without a checkpoint')}
// 14. boss intro and phase 2
PH.S.du=PH.S.dev=PH.S.fly=0;PH.S.df=1;PH.LV.forEach((L,i)=>{if(L.bs==null)return;PH.play(i);PH.p.x=(L.ar+5)*16;PH.p.y=130;PH.step();PH.step();const bx=PH.bo.x;for(let t=0;t<30;t++){PH.p.pw[1]=1;PH.step()}if(PH.bo.x!=bx)bad('boss '+(i+1)+' moved during its intro');
 for(let k=0;k<20&&PH.bo.a;k++){PH.p.x=PH.bo.x+6;PH.p.y=PH.bo.y-18;PH.p.vy=3;PH.step();for(let t=0;t<70;t++){PH.p.pw[1]=1;PH.step();PH.p.x=PH.bo.x+6;PH.p.y=Math.min(PH.p.y,PH.bo.y-60)}if(PH.bo.hp<=PH.bo.mx/2&&PH.bo.a){for(let t=0;t<200;t++){PH.p.pw[1]=1;PH.step();PH.p.x=PH.bo.x+6;PH.p.y=Math.min(PH.p.y,PH.bo.y-60)}break}}
 if(!PH.log().some(m=>/phase 2/.test(m)))bad('boss '+(i+1)+' never entered phase 2');if(!PH.log().some(m=>/boss hp/.test(m)))bad('boss '+(i+1)+' hit log missing')});
// 15. achievements, best times, daily challenge
{const clear=(q,i)=>{q.play(i);q.en.forEach(e=>e.a=0);q.set('lives',99);q.step();const tot=q.co.length;q.co.forEach(k=>{q.p.x=k.x-6;q.p.y=k.y-7;q.step()});q.p.x=q.L.f[0]*16;q.p.y=130;q.step();return tot};
 const q=load().PH;q.S.du=q.S.dev=0;for(let df=0;df<5;df++){q.S.df=df;clear(q,0)}
 ['first','clean','demon'].forEach(id=>{if(!q.P.ac.includes(id))bad('achievement not unlocked: '+id)});if(new Set(q.P.ac).size!=q.P.ac.length)bad('achievement unlocked twice');if(!(q.P.t[0]>0))bad('best time not recorded');
 q.S.df=1;const di=q.DI;if(!q.LV[di].daily)bad('daily level missing at index '+di);const w0=q.P.w,tot=clear(q,di);if(q.earn!=tot*2||q.P.w!=w0+tot*2)bad('daily: first clear should pay double ('+q.earn+' vs '+tot*2+')');if(!q.P.ac.includes('daily'))bad('daily achievement missing');
 const w1=q.P.w;clear(q,di);if(q.earn!=0||q.P.w!=w1)bad('daily: paid twice on the same day');
 const a=load().PH.LV[di],b=load().PH.LV[di];if(JSON.stringify([a.g,a.e,a.c])!=JSON.stringify([b.g,b.e,b.c]))bad('daily: layout is not deterministic');
 q.M.dat()[0][1]();q.M.dat()[0][1]();if(q.P.ac.length||q.P.dd||q.P.t.length)bad('reset save did not clear achievements, daily or times')}
// 16. key remapping and gamepad
{const g=load(),q=g.PH,key=k=>g.H.keydown({key:k,repeat:false,preventDefault(){}});q.S.du=q.S.dev=0;q.S.kb={jump:'j'};q.play(0);for(let i=0;i<4;i++)q.step();key(' ');q.step();if(q.p.vy<0)bad('remap: old jump key still works');
 for(let i=0;i<8;i++)q.step();key('j');q.K.j=1;q.step();if(!(q.p.vy<0))bad('remap: new jump key does nothing');q.K.j=0;
 q.S.kb={};q.go('keys');const it=()=>q.M.keys();it()[0][1]();key('w');if(q.S.kb.left)bad('remap: bound a key that is already used');it()[0][1]();key('q');if(q.S.kb.left!=='q')bad('remap: could not bind a free key');it()[0][1]();key('Escape');if(q.S.kb.left!=='q')bad('remap: escape should cancel');q.M.keys().slice(-2)[0][1]();if(Object.keys(q.S.kb).length)bad('remap: reset keys failed');
 q.go('title');g.nav.getGamepads=()=>[{connected:true,buttons:Array.from({length:16},(_,i)=>({pressed:i==15||i==0})),axes:[0,0]}];q.gp();if(q.scene!='pl')bad('gamepad: A did not activate Play in the menu (scene '+q.scene+')');
 q.play(0);for(let i=0;i<4;i++)q.step();const x0=q.p.x;q.gp();for(let i=0;i<30;i++)q.step();if(!(q.p.x>x0+10)||!q.PAD[0].right)bad('gamepad: d-pad right did not move the player');
 g.nav.getGamepads=()=>[];q.gp();if(q.PAD[0].right||q.PAD[0].a)bad('gamepad: input stuck after disconnect')}
// 17. offline / installable app files
{const root=path.dirname(file),rd=f=>fs.readFileSync(path.join(root,f),'utf8'),has=f=>fs.existsSync(path.join(root,f)),html=fs.readFileSync(file,'utf8');
 if(!has('manifest.webmanifest'))bad('missing manifest.webmanifest');else{try{const m=JSON.parse(rd('manifest.webmanifest'));if(!m.name||!m.start_url||!m.display)bad('manifest missing name, start_url or display');(m.icons||[]).forEach(ic=>{if(!has(ic.src))bad('manifest icon missing: '+ic.src)});if(!(m.icons||[]).some(ic=>/512/.test(ic.sizes)))bad('manifest needs a 512px icon')}catch(e){bad('manifest is not valid JSON')}}
 if(!has('sw.js'))bad('missing sw.js');else{try{new Function(rd('sw.js'))}catch(e){bad('sw.js has a syntax error')}if(!/caches\.open/.test(rd('sw.js')))bad('sw.js does not cache anything')}
 if(!/rel="manifest"/.test(html))bad('html does not link the manifest');if(!/serviceWorker/.test(html))bad('html does not register the service worker');if(!/@font-face\{font-family:'PH Pixel';src:url\(data:font\/woff2/.test(html))bad('font is not bundled in the html');
 {const pk=has('package.json')?JSON.parse(rd('package.json')):null;if(!pk||!pk.dependencies||!pk.dependencies.ws)bad('package.json must list the ws dependency');if(!has('server/server.js'))bad('missing server/server.js');if(!has('Dockerfile'))bad('missing Dockerfile')}
 ['test.yml','release.yml'].forEach(w=>{const p='.github/workflows/'+w;if(!has(p))bad('missing '+p);else if(!/tests\/run-tests\.js/.test(rd(p)))bad(w+' does not run the tests')})}
// 18. new save fields are repaired
{const q=load(JSON.stringify({S:{kb:{jump:'x'.repeat(50),zzz:'q',left:5,right:'l'}},P:{ac:['first','hack',3,'first'],t:'x',st:{s:-5,e:'a'},dd:-1,db:'z'}})).PH;if(Object.keys(q.S.kb).join()!=='right')bad('save: key bindings not sanitised ('+Object.keys(q.S.kb)+')');if(q.P.ac.join()!=='first')bad('save: achievements not sanitised');if(!Array.isArray(q.P.t)||q.P.st.s!==0||q.P.st.e!==0||q.P.dd!==0||q.P.db!==0)bad('save: stats not sanitised')}
// 19. local co-op: 4 players, independent controls, shared lives, respawn, rubber band, boss scaling
{const g=load(),q=g.PH;q.S.du=q.S.dev=0;q.S.df=1;q.S.np=4;q.play(0);q.en.forEach(e=>e.a=0);
 if(q.pl.length!=4||new Set(q.pl.map(p=>p.x)).size!=4)bad('coop: 4 players at distinct spawn points expected');if(q.lives!=q.DF[1][1]+3)bad('coop: shared lives pool wrong ('+q.lives+')');
 for(let i=0;i<10;i++)q.step();const x0=q.pl.map(p=>p.x);q.K.l=1;for(let i=0;i<30;i++)q.step();q.K.l=0;if(!(q.pl[1].x>x0[1]+10)||q.pl[0].x!==x0[0]||q.pl[2].x!==x0[2])bad('coop: P2 keys should move only P2');const xr=q.pl[1].x;q.K.j=1;for(let i=0;i<30;i++)q.step();q.K.j=0;if(!(q.pl[1].x<xr-8)||q.pl[0].x!==x0[0])bad('coop: P2 left key should move only P2 left');for(let i=0;i<20;i++)q.step();g.H.keydown({key:'i',repeat:false,preventDefault(){}});q.step();if(!(q.pl[1].vy<0)||q.pl[0].vy<0||q.pl[2].vy<0)bad('coop: P2 jump key should make only P2 jump');
 const pad=(n,right)=>Array.from({length:n},(_,i)=>({connected:true,buttons:Array.from({length:16},(_,b)=>({pressed:right&&i==2&&b==15})),axes:[0,0]}));
 g.nav.getGamepads=()=>pad(3,true);q.gp();const x2=q.pl[2].x;for(let i=0;i<30;i++)q.step();if(!(q.pl[2].x>x2+10)||q.pl[3].x!==x0[3])bad('coop: pad 3 should move only P3');g.nav.getGamepads=()=>[];q.gp();
 q.pl[2].y=400;for(let i=0;i<70;i++)q.step();if(q.lives!=q.DF[1][1]+2||q.pl[2].dead||q.pl[2].out||q.scene!='play')bad('coop: a death should cost one shared life and respawn the player ('+q.lives+')');
 const mid=q.pl.map(p=>p.x);q.pl[0].x=mid[1]+420;for(let i=0;i<130;i++)q.step();const al=q.pl.filter(p=>!p.out&&!p.dead);if(Math.abs(q.pl[0].x-q.pl[1].x)>220)bad('coop: a player left far behind was not brought back');
 q.set('lives',1);q.pl[0].y=400;for(let i=0;i<70;i++)q.step();if(!q.pl[0].out||q.scene!='play')bad('coop: out of lives should remove only that player');
 q.pl.slice(1).forEach(p=>{p.y=400});for(let i=0;i<120;i++)q.step();if(q.scene!='over')bad('coop: game over expected when every player is out ('+q.scene+')');
 q.S.np=4;const bi=q.LV.findIndex(l=>l.bs!=null);q.play(bi);if(q.bo.hp!=Math.round(q.BS[q.L.bs][2]*2.5))bad('coop: boss health should scale with players');
 q.play(0);q.en.forEach(e=>e.a=0);q.pl[3].x=q.L.f[0]*16;q.pl[3].y=130;q.step();if(q.scene!='clear')bad('coop: any player reaching the flag should clear the level')}
// 20. physics layer: collisions never embed an entity; level generation and hashing are deterministic
{const q=load().PH;let seed=12345;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;let moves=0;
 for(let li=0;li<q.LV.length;li+=3){q.play(li);const L=q.L;
  for(const [w,h] of [[12,15],[14,14],[28,28]])for(let t=0;t<120;t++){const o={x:rnd()*(L.w*16-w),y:rnd()*(160-h),w,h,vx:0,vy:0,g:0};if(q.emb(o))continue;
   for(let k=0;k<40;k++){const dx=(rnd()-.5)*6.6,dy=(rnd()-.3)*14,ox=o.x,oy=o.y;o.g=0;q.mv(o,dx,dy);moves++;
    if(![o.x,o.y].every(isFinite)){bad('physics: NaN position');break}if(q.emb(o)){bad('physics: '+w+'x'+h+' entity embedded in a wall after a move');break}
    if(Math.abs(o.x-ox)>Math.abs(dx)+.6||Math.abs(o.y-oy)>Math.abs(dy)+.6){bad('physics: entity moved farther than its velocity (beyond the 0.5px snap tolerance)');break}
    if(o.g){let gr=0;for(let c=Math.floor(o.x/16);c<=Math.floor((o.x+o.w-.1)/16);c++)if(q.T(c,Math.floor((o.y+o.h+.5)/16))==1)gr=1;if(!gr){bad('physics: grounded flag set without ground');break}}}}}
 const T2=q.T;for(const [x,y] of [[-5,3],[1e6,3],[3,-9],[3,99],[NaN,3],[3,NaN],[Infinity,0],[0.5,0.5]]){let v;try{v=T2(x,y)}catch(e){bad('physics: T() threw for '+x+','+y);continue}if(![0,1,2].includes(v))bad('physics: T() returned '+v+' for '+x+','+y)}
 const A=load().PH,B=load().PH;if(A.LV.length!=B.LV.length||A.LV.some((l,i)=>l.daily?false:JSON.stringify([l.g,l.p,l.s,l.c,l.e,l.u])!=JSON.stringify([B.LV[i].g,B.LV[i].p,B.LV[i].s,B.LV[i].c,B.LV[i].e,B.LV[i].u])))bad('levels are not deterministic between loads');
 if(q.hs('73906158240417369852')!==q.DH||q.hs('73906158240417369853')===q.DH)bad('code hash sanity check failed');
 const names=new Set(A.LV.filter(l=>!l.tut&&!l.daily).map(l=>l.n));if(names.size!=100)bad('every level should have a unique name ('+names.size+')');
 const bossLv=A.LV.map((l,i)=>l.bs!=null?i+1:0).filter(Boolean).join();if(bossLv!=='10,20,30,40,50,60,70,80,90,100')bad('bosses must be on every 10th level, got '+bossLv)}
// 21. 3D layer: real three.js scene graph with a fake renderer
let T3;try{T3=require('three')}catch(e){}
const Fake=class{constructor(o){this.domElement=o.canvas;this.n=0}setPixelRatio(){}setSize(){}render(sc,cam){sc.updateMatrixWorld();cam.updateMatrixWorld();this.n++}dispose(){}};
if(!T3)console.log('SKIPPED 3D tests (run npm install to enable them)');
else{const g=load(null,null,Object.assign({},T3,{WebGLRenderer:Fake})),q=g.PH,R=q.R3;q.S.du=q.S.dev=0;q.S.d3=1;
 if(!R.ok)bad('3D: renderer failed to initialise');
 else{for(let li=0;li<q.LV.length;li++){q.S.np=1+li%4;q.play(li);q.step();q.draw();
   if(!R.lv||R.pl.length!=q.pl.length||R.co.length!=q.co.length||R.en.length!=q.en.length||R.pu.length!=q.pu.length)bad('3D: scene does not match level '+(li+1));
   const solid=q.G.flat().filter(v=>v==1).length,dm=R.lv.children.find(c=>c.isInstancedMesh);if(!dm||dm.count!=solid)bad('3D: tile count mismatch on level '+(li+1));
   const p0=q.pl[0],v=new T3.Vector3((p0.x+6)/16,(192-p0.y-7)/16,0).project(R.cam),ex=((p0.x+6-q.camX)/160)-1,ey=1-(p0.y+7)/96;
   if(Math.abs(v.x-ex)>.1||Math.abs(v.y-ey)>.12)bad('3D: camera does not line up with the 2D layout on level '+(li+1)+' ('+v.x.toFixed(2)+','+v.y.toFixed(2)+' vs '+ex.toFixed(2)+','+ey.toFixed(2)+')');
   const lo=new T3.Vector3(q.camX/16+10,0,0).project(R.cam),hi=new T3.Vector3(q.camX/16+10,12,0).project(R.cam);if(lo.y<-1.1||lo.y>-.85||hi.y>1.1||hi.y<.85)bad('3D: all 12 tile rows should fill the view on level '+(li+1));
   if(el_display()!=='block')bad('3D: canvas not shown during play');
   const kept=R.lv;q.draw();q.draw();if(R.lv!==kept)bad('3D: scene rebuilt every frame on level '+(li+1))}
  q.go('title');q.draw();if(el_display()!=='none')bad('3D: canvas should be hidden in menus');
  q.S.d3=0;q.play(0);q.step();q.draw();if(el_display()!=='none')bad('3D: setting did not switch to the 2D renderer');q.S.d3=1;
  const bi=q.LV.findIndex(l=>l.bs!=null);q.S.np=1;q.play(bi);q.pl[0].x=(q.L.ar+5)*16;q.pl[0].y=130;for(let i=0;i<5;i++)q.step();q.draw();if(!R.bo||R.lv.children.length<5)bad('3D: boss missing');const lk=R.key;q.step();q.draw();if(R.key!==lk)bad('3D: scene key unstable');
  const g2=load(null,null,Object.assign({},T3,{WebGLRenderer:class extends Fake{render(){throw new Error('GL lost')}}})),q2=g2.PH;q2.S.d3=1;q2.S.du=q2.S.dev=0;q2.play(0);q2.step();let thrown=0;try{q2.draw();q2.draw()}catch(e){thrown=1}
  if(thrown||q2.R3.ok)bad('3D: a render failure must fall back to the 2D renderer without throwing');
  const g3=load(null,null,Object.assign({},T3,{WebGLRenderer:Fake})),q3=g3.PH;q3.S.du=q3.S.dev=1;q3.S.d3=1;
  for(let r=0;r<120;r++){try{q3.S.np=1+r%4;q3.S.df=r%5;q3.S.hr=r%4;q3.S.of=0;q3.S.god=r%3==0;q3.play(r%q3.NL);q3.pl.forEach((p,i)=>{if(r%4==0)p.pw=[...q3.PD]});
    for(let t=0;t<500;t++){if(t%12==0){const K=q3.K;K.ArrowRight=Math.random()<.7;K.ArrowLeft=Math.random()<.15;K[' ']=Math.random()<.5;K.l=Math.random()<.3;if(Math.random()<.3)q3.pl.forEach(p=>p.jb=6);if(Math.random()<.2)q3.pl.forEach(p=>p.fq=1)}
     if(r%7==0&&q3.L.bs!=null&&t==200)q3.pl.forEach(p=>{p.x=(q3.L.ar+5)*16;p.y=130;p.vy=0});q3.step();if(t%7==0)q3.draw();if(q3.scene!='play')break}}catch(e){bad('3D fuzz crash: '+e.message)}}}}
function el_display(){return el_ref.style.display}
async function netTests(){let WS,SV;try{WS=require('ws');SV=require('../server/server.js')}catch(e){console.log('SKIPPED online tests (run npm install to enable them)');return}
 const port=await SV.start(0,'127.0.0.1'),url='ws://127.0.0.1:'+port,sleep=ms=>new Promise(r=>setTimeout(r,ms));
 const mk=()=>{const g=load(null,WS);g.PH.S.srv=url;g.PH.S.du=g.PH.S.dev=0;g.PH.S.df=1;return g};
 const frames=async(gs,n)=>{for(let t=0;t<n;t++){gs.forEach(g=>g.PH.step());if(t%3==0)await sleep(4)}await sleep(40)};
 try{const A=mk(),B=mk(),C=mk(),D=mk(),E=mk(),ce=console.error;console.error=()=>{};
  A.PH.net.ncreate();await sleep(150);
  if(!A.PH.NET.on||!A.PH.NET.host||!/^[A-Z0-9]{4}$/.test(A.PH.NET.room)||A.PH.scene!='lobby'){bad('online: room was not created');return}
  const room=A.PH.NET.room;B.PH.net.njoin(room.toLowerCase());await sleep(150);
  if(!B.PH.NET.on||B.PH.NET.host||B.PH.NET.me!=1||B.PH.scene!='lobby')bad('online: guest could not join (room codes are case-insensitive)');
  if(A.PH.NET.n!=2||B.PH.NET.n!=2)bad('online: player count not shared ('+A.PH.NET.n+','+B.PH.NET.n+')');
  C.PH.net.njoin(room);await sleep(120);D.PH.net.njoin(room);await sleep(120);E.PH.net.njoin(room);await sleep(150);
  if(A.PH.NET.n!=4)bad('online: room should hold 4 players, has '+A.PH.NET.n);if(E.PH.NET.on)bad('online: a 5th player was let into a full room');
  D.PH.net.nleave();await sleep(120);if(A.PH.NET.n!=3)bad('online: a leaving player was not removed ('+A.PH.NET.n+')');
  A.PH.NET.lv=0;A.PH.net.nstart();await sleep(150);const all=[A,B,C];
  all.forEach((g,i)=>{if(g.PH.scene!='play'||g.PH.pl.length!=3)bad('online: the game did not start for player '+(i+1)+' ('+g.PH.scene+','+g.PH.pl.length+')')});
  if(all.some(g=>g.PH.scene!='play'))return;
  all.forEach(g=>g.PH.en.forEach(e=>e.a=0));await frames(all,12);
  const sx=A.PH.pl[1].x;B.PH.K.ArrowRight=1;await frames(all,150);B.PH.K.ArrowRight=0;
  const a1=A.PH.pl[1].x,b1=B.PH.pl[1].x,c1=C.PH.pl[1].x;
  if(!(a1>sx+30))bad('online: remote input did not move the guest player ('+sx+' to '+a1+')');
  if(Math.abs(a1-b1)>12||Math.abs(a1-c1)>12)bad('online: snapshots out of sync (host '+a1+', guest '+b1+', other '+c1+')');
  await frames(all,40);const y0=A.PH.pl[1].y;B.H.keydown({key:' ',repeat:false,preventDefault(){}});await sleep(40);A.PH.step();A.PH.step();if(!(A.PH.pl[1].y<y0))bad('online: a guest jump press did not reach the host');
  await frames(all,30);const k=A.PH.co[0];A.PH.pl[0].x=k.x-6;A.PH.pl[0].y=k.y-7;await frames(all,12);if(!(B.PH.co[0].t&&C.PH.co[0].t))bad('online: coin pickup did not reach the guests');
  const l0=A.PH.lives;A.PH.pl[2].y=400;await frames(all,80);if(A.PH.lives!=l0-1||B.PH.lives!=A.PH.lives)bad('online: shared lives out of sync (host '+A.PH.lives+', guest '+B.PH.lives+')');
  C.PH.net.nleave();await sleep(150);const q3=A.PH.pl.find(q=>q.slot==2);if(!q3||!q3.out)bad('online: a guest who left was not removed from the running game');
  const w0=B.PH.P.w;A.PH.pl[0].dead=0;A.PH.pl[0].x=A.PH.L.f[0]*16;A.PH.pl[0].y=130;await frames([A,B],20);
  if(A.PH.scene!='clear'||B.PH.scene!='clear')bad('online: level clear did not reach the guest ('+A.PH.scene+','+B.PH.scene+')');else if(B.PH.P.w!==w0+A.PH.earn)bad('online: guest did not receive the coin payout');
  A.PH.net.nclose();await sleep(150);if(B.PH.NET.on||B.PH.scene!='mp')bad('online: guests were not told the host left ('+B.PH.scene+')');
  const raw=new WS(url);await new Promise(r=>raw.on('open',r));raw.on('error',()=>{});raw.send('not json');raw.send(JSON.stringify({t:42}));raw.send(JSON.stringify({t:'m',d:{}}));raw.send(Buffer.alloc(20000,1));await sleep(150);
  const F=mk();F.PH.net.ncreate();await sleep(150);if(!F.PH.NET.on)bad('online: server did not survive malformed and oversized messages');F.PH.net.nclose();
  const http=require('http'),get=p=>new Promise(r=>http.get({host:'127.0.0.1',port,path:p},res=>{let b='';res.on('data',c=>b+=c);res.on('end',()=>r({c:res.statusCode,b}))}).on('error',()=>r({c:0,b:''})));
  const h=await get('/health'),i=await get('/'),t=await get('/../server/server.js'),t2=await get('/%2e%2e/package.json');
  if(h.b!='ok')bad('server: health check failed');if(i.c!=200||!/Pixel Hopper/.test(i.b))bad('server: does not serve the game');if(t.c==200||t2.c==200)bad('server: path traversal is possible');
  console.error=ce}catch(e){bad('online: test crashed: '+e.message)}finally{await SV.close()}}
(async()=>{await netTests();const n=Object.keys(fails).length;console.log(n?'FAIL':'PASS','|',PH.LV.length,'levels | sessions won by random play:',wins);Object.entries(fails).sort().forEach(([k,v])=>console.log(' x'+v,k));process.exit(n?1:0)})();
