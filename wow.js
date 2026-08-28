(() => {
  'use strict';
  if (window.__ARTPRINT_WOW__) return;
  window.__ARTPRINT_WOW__ = true;

  const colors = ['#00bfff','#ff087d','#ffd400','#a45cff','#ff8a00','#42f5b3'];
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const touch = matchMedia?.('(pointer: coarse)').matches;

  const style = document.createElement('style');
  style.textContent = `
    :root{--wow-cyan:#00bfff;--wow-pink:#ff087d;--wow-yellow:#ffd400;--wow-purple:#a45cff;--wow-orange:#ff8a00}
    body{--wow-mx:50vw;--wow-my:50vh}
    body:before{content:"";position:fixed;inset:0;pointer-events:none;z-index:0;background:radial-gradient(420px circle at var(--wow-mx) var(--wow-my),rgba(0,191,255,.045),transparent 70%);mix-blend-mode:screen;transition:background-position .1s linear}
    #wow-canvas{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:.95}
    header,main,footer{z-index:2!important}
    .wow-cursor,.wow-cursor-dot{position:fixed;pointer-events:none;z-index:100000;transform:translate(-50%,-50%);border-radius:50%;mix-blend-mode:screen}
    .wow-cursor{width:34px;height:34px;border:1px solid rgba(0,191,255,.65);box-shadow:0 0 18px rgba(0,191,255,.25),inset 0 0 14px rgba(164,92,255,.12);transition:width .2s,height .2s,border-color .2s,box-shadow .2s}
    .wow-cursor-dot{width:5px;height:5px;background:#fff;box-shadow:0 0 12px #00bfff,0 0 25px #ff087d}
    body.wow-hover .wow-cursor{width:52px;height:52px;border-color:rgba(255,8,125,.85);box-shadow:0 0 28px rgba(255,8,125,.28),0 0 60px rgba(0,191,255,.12)}
    .wow-progress{position:fixed;top:0;left:0;width:100%;height:2px;z-index:100001;background:linear-gradient(90deg,#00bfff,#176cff,#a45cff,#ff087d,#ffd400);transform-origin:left;transform:scaleX(0);box-shadow:0 0 14px rgba(0,191,255,.6)}
    .service,.model-card,.step,.calc-box,.order-box{position:relative;isolation:isolate}
    .service:before,.model-card:before,.step:before,.calc-box:before,.order-box:before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:-1;background:radial-gradient(260px circle at var(--card-x,50%) var(--card-y,50%),rgba(0,191,255,.13),transparent 65%);opacity:0;transition:opacity .25s}
    .service:hover:before,.model-card:hover:before,.step:hover:before,.calc-box:hover:before,.order-box:hover:before{opacity:1}
    .service,.model-card,.step{transform-style:preserve-3d;will-change:transform}
    .service:after,.model-card:after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.10) 48%,transparent 66%);transform:translateX(-120%);transition:transform .7s ease;z-index:4}
    .service:hover:after,.model-card:hover:after{transform:translateX(120%)}
    .service.s1:hover{border-color:rgba(0,191,255,.8)!important;box-shadow:0 25px 70px rgba(0,191,255,.12),0 0 35px rgba(0,191,255,.13)!important}
    .service.s2:hover{border-color:rgba(95,157,255,.85)!important;box-shadow:0 25px 70px rgba(95,157,255,.12),0 0 35px rgba(95,157,255,.13)!important}
    .service.s3:hover{border-color:rgba(255,8,125,.85)!important;box-shadow:0 25px 70px rgba(255,8,125,.12),0 0 35px rgba(255,8,125,.13)!important}
    .service.s4:hover{border-color:rgba(255,212,0,.85)!important;box-shadow:0 25px 70px rgba(255,212,0,.12),0 0 35px rgba(255,212,0,.13)!important}
    .service.s5:hover{border-color:rgba(164,92,255,.85)!important;box-shadow:0 25px 70px rgba(164,92,255,.12),0 0 35px rgba(164,92,255,.13)!important}
    .service.s6:hover{border-color:rgba(255,138,0,.85)!important;box-shadow:0 25px 70px rgba(255,138,0,.12),0 0 35px rgba(255,138,0,.13)!important}
    .service-img,.model-card img{transition:transform .35s cubic-bezier(.2,.8,.2,1),filter .35s ease!important}
    .service:hover .service-img,.model-card:hover img{filter:saturate(1.18) brightness(1.08);transform:translateZ(22px) scale(1.035)!important}
    .service-body,.model-info{transform:translateZ(16px)}
    .hero-logo{animation:wowLogo 5s ease-in-out infinite;filter:drop-shadow(0 25px 60px rgba(0,0,0,.6)) drop-shadow(0 0 18px rgba(0,191,255,.12))!important}
    @keyframes wowLogo{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-7px) scale(1.008)}}
    .hero .hero-actions .btn-primary{box-shadow:0 0 0 rgba(0,191,255,0);animation:wowButton 2.8s ease-in-out infinite}
    @keyframes wowButton{0%,100%{box-shadow:0 0 0 rgba(0,191,255,0)}50%{box-shadow:0 0 34px rgba(0,191,255,.25)}}
    .section.reveal-ready{opacity:0;transform:translateY(35px) scale(.985);transition:opacity .75s ease,transform .75s cubic-bezier(.2,.8,.2,1)}
    .section.reveal-ready.revealed{opacity:1;transform:none}
    .wow-title-line{display:block;height:3px;width:0;margin-top:16px;border-radius:99px;background:linear-gradient(90deg,#00bfff,#a45cff,#ff087d);box-shadow:0 0 18px rgba(0,191,255,.35);transition:width .8s ease .15s}
    .section.revealed .wow-title-line{width:110px}
    .wow-particle{position:fixed;width:3px;height:3px;border-radius:50%;pointer-events:none;z-index:99999;box-shadow:0 0 12px currentColor,0 0 25px currentColor}
    .calc-result.wow-pulse{animation:calcPulse .8s ease}
    @keyframes calcPulse{0%{transform:scale(1)}45%{transform:scale(1.018);box-shadow:0 0 50px rgba(0,191,255,.25),inset 0 1px 0 rgba(255,255,255,.08)}100%{transform:scale(1)}}
    @media(max-width:760px){body:before{background:radial-gradient(300px circle at var(--wow-mx) var(--wow-my),rgba(0,191,255,.035),transparent 70%)}.wow-cursor,.wow-cursor-dot{display:none}.hero-logo{animation-duration:6s}.service:hover:after,.model-card:hover:after{display:none}}
    @media(prefers-reduced-motion:reduce){#wow-canvas,.wow-cursor,.wow-cursor-dot,.wow-progress{display:none!important}.hero-logo{animation:none}.section.reveal-ready{opacity:1;transform:none}.service,.model-card{transform:none!important}}
  `;
  document.head.appendChild(style);

  const progress=document.createElement('div'); progress.className='wow-progress'; document.body.appendChild(progress);
  const canvas=document.createElement('canvas'); canvas.id='wow-canvas'; document.body.prepend(canvas); const ctx=canvas.getContext('2d');
  let W=innerWidth,H=innerHeight,DPR=Math.min(devicePixelRatio||1,2); let pts=[]; let mouse={x:W/2,y:H/2};
  function resize(){DPR=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;canvas.width=W*DPR;canvas.height=H*DPR;canvas.style.width=W+'px';canvas.style.height=H+'px';ctx.setTransform(DPR,0,0,DPR,0,0);const n=touch?34:68;pts=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.5+.5,c:colors[Math.floor(Math.random()*colors.length)]}))}
  resize(); addEventListener('resize',resize,{passive:true});
  function frame(){ctx.clearRect(0,0,W,H);for(const p of pts){p.x+=p.vx+(mouse.x-p.x)*0.000018;p.y+=p.vy+(mouse.y-p.y)*0.000018;if(p.x<-10)p.x=W+10;if(p.x>W+10)p.x=-10;if(p.y<-10)p.y=H+10;if(p.y>H+10)p.y=-10;ctx.globalAlpha=.5;ctx.fillStyle=p.c;ctx.shadowColor=p.c;ctx.shadowBlur=10;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}ctx.shadowBlur=0;for(let i=0;i<pts.length;i++){for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);if(d<135){ctx.globalAlpha=(1-d/135)*.18;ctx.strokeStyle=a.c;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}}ctx.globalAlpha=1;requestAnimationFrame(frame)}
  if(!reduced) requestAnimationFrame(frame); else canvas.remove();

  let cursor, dot, cx=0,cy=0,dx=0,dy=0;
  if(!touch&&!reduced){cursor=document.createElement('div');dot=document.createElement('div');cursor.className='wow-cursor';dot.className='wow-cursor-dot';document.body.append(cursor,dot);addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;document.body.style.setProperty('--wow-mx',e.clientX+'px');document.body.style.setProperty('--wow-my',e.clientY+'px');});(function cursorLoop(){cx+=(mouse.x-cx)*.16;cy+=(mouse.y-cy)*.16;dx+=(mouse.x-dx)*.35;dy+=(mouse.y-dy)*.35;cursor.style.left=cx+'px';cursor.style.top=cy+'px';dot.style.left=dx+'px';dot.style.top=dy+'px';requestAnimationFrame(cursorLoop)})();}

  const hoverTargets='a,button,.service,.model-card,.step,.theme-toggle,input,select,textarea';
  document.addEventListener('pointerover',e=>{if(e.target.closest(hoverTargets))document.body.classList.add('wow-hover')});
  document.addEventListener('pointerout',e=>{if(!e.relatedTarget||!e.relatedTarget.closest(hoverTargets))document.body.classList.remove('wow-hover')});

  document.querySelectorAll('.section-title').forEach(t=>{if(!t.querySelector('.wow-title-line')){const line=document.createElement('span');line.className='wow-title-line';t.appendChild(line)}});

  if(!reduced&&!touch){document.querySelectorAll('.service,.model-card,.step').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--card-x',((x+.5)*100)+'%');card.style.setProperty('--card-y',((y+.5)*100)+'%');card.style.transform=`perspective(1000px) rotateX(${(-y*7).toFixed(2)}deg) rotateY(${(x*7).toFixed(2)}deg) translateY(-7px) scale(1.012)`});card.addEventListener('pointerleave',()=>{card.style.transform='';card.style.removeProperty('--card-x');card.style.removeProperty('--card-y')});});}

  const hero=document.querySelector('.hero');
  if(hero&&!reduced&&!touch){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;const logo=hero.querySelector('.hero-logo');if(logo)logo.style.transform=`translate(${(x/r.width*12).toFixed(1)}px,${(y/r.height*8).toFixed(1)}px)`});hero.addEventListener('pointerleave',()=>{const logo=hero.querySelector('.hero-logo');if(logo)logo.style.transform=''});}

  document.querySelectorAll('.btn,.order-btn,.service-link').forEach(btn=>{btn.addEventListener('click',()=>{if(btn.animate)btn.animate([{transform:'scale(1)'},{transform:'scale(.96)'},{transform:'scale(1)'}],{duration:180})})});

  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.section').forEach((s,i)=>{if(i>0){s.classList.add('reveal-ready');io.observe(s)}})}

  function sparkle(x,y){if(reduced)return;for(let i=0;i<10;i++){const p=document.createElement('i');p.className='wow-particle';p.style.left=x+'px';p.style.top=y+'px';p.style.color=colors[Math.floor(Math.random()*colors.length)];document.body.appendChild(p);const a=Math.random()*Math.PI*2,d=30+Math.random()*75;const anim=p.animate([{transform:'translate(-50%,-50%) scale(1)',opacity:1},{transform:`translate(calc(-50% + ${Math.cos(a)*d}px),calc(-50% + ${Math.sin(a)*d}px)) scale(0)`,opacity:0}],{duration:450+Math.random()*400,easing:'cubic-bezier(.2,.7,.2,1)'});anim.finished.then(()=>p.remove()).catch(()=>p.remove())}}
  document.addEventListener('click',e=>{if(!touch)sparkle(e.clientX,e.clientY)});

  addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`},{passive:true});
  document.querySelectorAll('#calculator input,#calculator select').forEach(el=>el.addEventListener('change',()=>{const r=document.querySelector('.calc-result');if(r){r.classList.remove('wow-pulse');void r.offsetWidth;r.classList.add('wow-pulse')}}));
})();
