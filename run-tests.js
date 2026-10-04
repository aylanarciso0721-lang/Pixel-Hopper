#!/usr/bin/env node
// Headless test runner for Pixel Hopper. Usage: node tests/run-tests.js [path/to/pixel-hopper.html]
const fs=require('fs'),path=require('path'),file=process.argv[2]||path.join(__dirname,'..','pixel-hopper.html');
const src=fs.readFileSync(file,'utf8').split('<script>')[1].split('</script>')[0];
const fails={},bad=m=>fails[m]=(fails[m]||0)+1,note=m=>m.replace(/-?\d+(\.\d+)?/g,'#');
function load(store){const noop=()=>{},H={},C={},raf=[];let boom=0;
 const ctx=new Proxy({},{get:(t,k)=>k.startsWith('create')?()=>({addColorStop:noop}):k=='fillText'?()=>{if(boom){boom=0;throw new Error('boom')}}:noop,set:()=>true});
 const el={getContext:()=>ctx,getBoundingClientRect:()=>({left:0,top:0,width:320,height:192}),addEventListener:(n,h)=>C[n]=h,classList:{toggle:noop},style:{setProperty:noop},setAttribute:noop,dataset:{}},win={};
 const g={window:win,document:{getElementById:()=>el,querySelectorAll:()=>[],body:el,documentElement:el,addEventListener:(n,h)=>H['doc'+n]=h,hidden:false},localStorage:{getItem:()=>store||null,setItem:noop},performance:{now:()=>0},requestAnimationFrame:f=>raf.push(f),setInterval:noop,setTimeout:noop,matchMedia:()=>({matches:false}),navigator:{},addEventListener:(n,h)=>H[n]=h};
 new Function(...Object.keys(g),src)(...Object.values(g));return{PH:win.PH,H,C,raf,boom:()=>boom=1}}
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
 if(t(L.f[0],L.f[1]+1)==1&&L.s.some(([a,y])=>a==L.f[0]))bad(nm+'spike under flag')});
// 2. 1000 random play sessions + invariants
let wins=0;for(let r=0;r<1000;r++){try{PH.S.df=r%5;PH.S.hr=r%4;PH.S.du=PH.S.dev=r%2;PH.S.god=r%3==0;PH.S.fly=r%11==0;PH.S.cb=r%5;PH.play(r%PH.LV.length);if(r%4==0)PH.p.pw=[...PH.PD];
 for(let t=0;t<900;t++){if(t%12==0){const K=PH.K;K.ArrowRight=Math.random()<.7;K.ArrowLeft=Math.random()<.15;K[' ']=Math.random()<.5;K.ArrowDown=Math.random()<.2;if(Math.random()<.3)PH.set('jb',6);if(Math.random()<.2)PH.set('fq',1)}
  if(r%7==0&&PH.L.bs!=null&&t==300){PH.p.x=(PH.L.ar+5)*16;PH.p.y=130;PH.p.vy=0}PH.step();if(t%15==0)PH.draw();PH.inv().forEach(m=>bad('invariant: '+note(m)));if(PH.scene=='clear')wins++;if(PH.scene!='play')break}}catch(e){bad('session crash: '+e.message)}}
// 3. scripted boss fights
PH.S.du=PH.S.dev=PH.S.fly=0;PH.S.df=1;PH.LV.forEach((L,i)=>{if(L.bs==null)return;try{PH.play(i);PH.p.x=(L.ar+5)*16;PH.p.y=130;for(let t=0;t<5;t++)PH.step();
 for(let k=0;k<20&&PH.bo.a;k++){PH.p.x=PH.bo.x+6;PH.p.y=PH.bo.y-18;PH.p.vy=3;PH.step();for(let t=0;t<70;t++){PH.p.pw[1]=1;PH.step();PH.p.x=PH.bo.x+6;PH.p.y=Math.min(PH.p.y,PH.bo.y-60)}}
 if(PH.bo.a)bad('boss '+(i+1)+' not defeated');else{PH.p.x=L.f[0]*16;PH.p.y=130;PH.step();if(PH.scene!='clear')bad('flag after boss '+(i+1)+' did not clear level')}}catch(e){bad('boss crash: '+e.message)}});
// 4. every menu item runs and every scene draws
for(const n of Object.keys(PH.HD)){try{PH.set('scene',n);if(PH.M[n])PH.M[n]().forEach(it=>{PH.set('scene',n);it[1]()});PH.set('scene',n);PH.draw()}catch(e){bad('menu '+n+': '+e.message)}}
// 5. secret code
PH.S.du=PH.S.dev=0;PH.go('code');'1234'.split('').forEach(PH.kp);PH.kp('OK');if(PH.S.du)bad('wrong code accepted');PH.go('code');'73906158240417369852'.split('').forEach(PH.kp);PH.kp('OK');if(!PH.S.du)bad('right code rejected');
// 6. random keyboard + pointer events, locked and unlocked
const keys=['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter','Escape',' ','p','`','Backspace','x','Shift','g','h','f','n','b','k','l','r','[',']','1','2','3','4','5','7','9','0','z','w','a','s','d'];
for(const du of [0,1]){const G2=load();G2.PH.S.du=du;for(let i=0;i<30000;i++){try{const k=keys[Math.random()*keys.length|0],ev={key:k,repeat:Math.random()<.1,preventDefault(){},clientX:Math.random()*320,clientY:Math.random()*192},r=Math.random();
 if(r<.5)G2.H.keydown(ev);else if(r<.7)G2.H.keyup(ev);else if(r<.85)G2.C.pointerdown(ev);else G2.C.pointermove(ev);if(i%4000==0)G2.H.blur();if(i%5000==0)G2.H.docvisibilitychange();
 for(let t=0;t<3;t++)G2.PH.step();if(i%5==0)G2.PH.draw();G2.PH.inv().forEach(m=>bad('input fuzz invariant: '+note(m)));if(!du&&G2.PH.S.dev)bad('dev enabled while locked');if(!['title','pause'].includes(G2.PH.back))bad('stale back '+G2.PH.back)}catch(e){bad('input fuzz crash: '+e.stack.split('\n').slice(0,2).join(' | '))}}}
// 7. corrupt save data is sanitised
for(const st of['not json',JSON.stringify({S:{df:99,hr:-3,vol:'x',cb:'z',dev:1,du:0,tc:7,ts:1.5},P:{u:999,b:'bad'}}),JSON.stringify({S:null,P:{u:-5,b:[1,null,'a']}})]){try{const q=load(st).PH,S=q.S;if(S.df<0||S.df>=q.DF.length||S.hr<0||S.hr>=q.HERO.length||S.dev||S.vol<0||S.vol>10||S.cb>4||S.tc>2||S.ts>3||!Number.isInteger(S.ts))bad('save not sanitised: '+st.slice(0,30));if(!(q.P.u>=1&&q.P.u<=q.LV.length-1)||!Array.isArray(q.P.b)||q.P.b.some(v=>!Number.isFinite(v)))bad('progress not sanitised');q.play(0);q.step();q.draw()}catch(e){bad('corrupt save crash: '+e.message)}}
// 8. render error must not stop the main loop
{const ce=console.error;console.error=()=>{};const q=load();let f=q.raf.pop();q.raf.length=0;q.boom();f(16);console.error=ce;if(q.raf.length!=1)bad('main loop stopped after render error');if(!/boom/.test(q.PH.errors().last))bad('render error not recorded');q.raf.pop()(32);if(q.PH.errors().n)bad('error counter not reset after recovery')}
// 9. every hero on every difficulty can clear a 3-tile gap with a last-moment jump (no coyote time needed)
{Object.keys(PH.K).forEach(k=>PH.K[k]=0);const ti=PH.LV.findIndex(l=>l.tut);for(let df=0;df<PH.DF.length;df++)for(let hr=0;hr<PH.HERO.length;hr++){PH.S.df=df;PH.S.hr=hr;PH.S.du=PH.S.dev=0;PH.play(ti);PH.en.forEach(e=>e.a=0);const g=c=>c<0||c>=PH.L.w?1:PH.G[10][c];PH.p.x=16*17;let ok=0;
 for(let t=0;t<260&&PH.scene=='play';t++){PH.K.ArrowRight=1;PH.K[' ']=0;const q=PH.p;if(q.g&&g(Math.floor((q.x+q.vx+1)/16))!=1){PH.set('jb',6);PH.K[' ']=1}if(!q.g)PH.K[' ']=1;PH.step();if(PH.p.x>16*26&&!PH.dead&&PH.p.g)ok=1;if(PH.dead)break}
 if(!ok)bad('hero '+PH.HERO[hr][0]+' on '+PH.DF[df][0]+' cannot clear a 3-tile gap')}PH.K.ArrowRight=0}
const n=Object.keys(fails).length;console.log(n?'FAIL':'PASS','|',PH.LV.length,'levels | sessions won by random play:',wins);Object.entries(fails).sort().forEach(([k,v])=>console.log(' x'+v,k));process.exit(n?1:0);
