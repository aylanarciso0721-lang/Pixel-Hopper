#!/usr/bin/env node
// Headless test runner for Pixel Hopper. Usage: node tests/run-tests.js [path/to/pixel-hopper.html]
const fs=require('fs'),path=require('path'),file=process.argv[2]||path.join(__dirname,'..','pixel-hopper.html');
const src=fs.readFileSync(file,'utf8').split('<script>')[1].split('</script>')[0];
const fails={},bad=m=>fails[m]=(fails[m]||0)+1,note=m=>m.replace(/-?\d+(\.\d+)?/g,'#');
function load(store){const noop=()=>{},H={},C={},raf=[],nav={};let boom=0;
 const ctx=new Proxy({},{get:(t,k)=>k.startsWith('create')?()=>({addColorStop:noop}):k=='fillText'?()=>{if(boom){boom=0;throw new Error('boom')}}:noop,set:()=>true});
 const el={getContext:()=>ctx,getBoundingClientRect:()=>({left:0,top:0,width:320,height:192}),addEventListener:(n,h)=>C[n]=h,classList:{toggle:noop},style:{setProperty:noop},setAttribute:noop,dataset:{}},win={};
 const g={window:win,document:{getElementById:()=>el,querySelectorAll:()=>[],body:el,documentElement:el,addEventListener:(n,h)=>H['doc'+n]=h,hidden:false},localStorage:{getItem:()=>store||null,setItem:noop},performance:{now:()=>0},requestAnimationFrame:f=>raf.push(f),setInterval:noop,setTimeout:noop,matchMedia:()=>({matches:false}),navigator:nav,addEventListener:(n,h)=>H[n]=h};
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
 q.play(0);for(let i=0;i<4;i++)q.step();const x0=q.p.x;q.gp();for(let i=0;i<30;i++)q.step();if(!(q.p.x>x0+10)||!q.V.right)bad('gamepad: d-pad right did not move the player');
 g.nav.getGamepads=()=>[];q.gp();if(q.V.right||q.V.jump)bad('gamepad: input stuck after disconnect')}
// 17. offline / installable app files
{const root=path.dirname(file),rd=f=>fs.readFileSync(path.join(root,f),'utf8'),has=f=>fs.existsSync(path.join(root,f)),html=fs.readFileSync(file,'utf8');
 if(!has('manifest.webmanifest'))bad('missing manifest.webmanifest');else{try{const m=JSON.parse(rd('manifest.webmanifest'));if(!m.name||!m.start_url||!m.display)bad('manifest missing name, start_url or display');(m.icons||[]).forEach(ic=>{if(!has(ic.src))bad('manifest icon missing: '+ic.src)});if(!(m.icons||[]).some(ic=>/512/.test(ic.sizes)))bad('manifest needs a 512px icon')}catch(e){bad('manifest is not valid JSON')}}
 if(!has('sw.js'))bad('missing sw.js');else{try{new Function(rd('sw.js'))}catch(e){bad('sw.js has a syntax error')}if(!/caches\.open/.test(rd('sw.js')))bad('sw.js does not cache anything')}
 if(!/rel="manifest"/.test(html))bad('html does not link the manifest');if(!/serviceWorker/.test(html))bad('html does not register the service worker');if(!/@font-face\{font-family:'PH Pixel';src:url\(data:font\/woff2/.test(html))bad('font is not bundled in the html');
 ['test.yml','release.yml'].forEach(w=>{const p='.github/workflows/'+w;if(!has(p))bad('missing '+p);else if(!/tests\/run-tests\.js/.test(rd(p)))bad(w+' does not run the tests')})}
// 18. new save fields are repaired
{const q=load(JSON.stringify({S:{kb:{jump:'x'.repeat(50),zzz:'q',left:5,right:'l'}},P:{ac:['first','hack',3,'first'],t:'x',st:{s:-5,e:'a'},dd:-1,db:'z'}})).PH;if(Object.keys(q.S.kb).join()!=='right')bad('save: key bindings not sanitised ('+Object.keys(q.S.kb)+')');if(q.P.ac.join()!=='first')bad('save: achievements not sanitised');if(!Array.isArray(q.P.t)||q.P.st.s!==0||q.P.st.e!==0||q.P.dd!==0||q.P.db!==0)bad('save: stats not sanitised')}
const n=Object.keys(fails).length;console.log(n?'FAIL':'PASS','|',PH.LV.length,'levels | sessions won by random play:',wins);Object.entries(fails).sort().forEach(([k,v])=>console.log(' x'+v,k));process.exit(n?1:0);
