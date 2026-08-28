(() => {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'background-blueprint-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0, mouse = {x:-1000,y:-1000}, target = {x:-1000,y:-1000};
  const marks = [];
  const labels = ['R20','Ø48','A-01','SECTION','SCALE 1:2','3D-PRINT'];
  function resize(){w=innerWidth;h=innerHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}
  function addMark(x,y){marks.push({x,y,size:10+Math.random()*22,life:0,max:70+Math.random()*50,angle:Math.random()*Math.PI*2,label:Math.random()>.72?labels[Math.floor(Math.random()*labels.length)]:''});if(marks.length>45)marks.shift()}
  addEventListener('resize',resize);
  addEventListener('pointermove',e=>{target.x=e.clientX;target.y=e.clientY;if(Math.hypot(target.x-mouse.x,target.y-mouse.y)>42)addMark(target.x,target.y)},{passive:true});
  addEventListener('pointerleave',()=>{target.x=-1000;target.y=-1000});
  function draw(){
    mouse.x+=(target.x-mouse.x)*.08;mouse.y+=(target.y-mouse.y)*.08;ctx.clearRect(0,0,w,h);
    if(mouse.x>-500){
      const glow=ctx.createRadialGradient(mouse.x,mouse.y,0,mouse.x,mouse.y,170);glow.addColorStop(0,'rgba(7,155,215,.10)');glow.addColorStop(.45,'rgba(7,155,215,.035)');glow.addColorStop(1,'rgba(7,155,215,0)');ctx.fillStyle=glow;ctx.fillRect(mouse.x-170,mouse.y-170,340,340);
      ctx.strokeStyle='rgba(7,155,215,.18)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(mouse.x-95,mouse.y);ctx.lineTo(mouse.x+95,mouse.y);ctx.moveTo(mouse.x,mouse.y-95);ctx.lineTo(mouse.x,mouse.y+95);ctx.stroke();
      ctx.strokeStyle='rgba(7,155,215,.12)';ctx.beginPath();ctx.arc(mouse.x,mouse.y,52,0,Math.PI*2);ctx.stroke();
    }
    for(let i=marks.length-1;i>=0;i--){const m=marks[i];m.life++;const p=m.life/m.max,alpha=(1-p)*.48;if(p>=1){marks.splice(i,1);continue}ctx.save();ctx.translate(m.x,m.y);ctx.rotate(m.angle+p*.3);ctx.strokeStyle=`rgba(7,155,215,${alpha})`;ctx.lineWidth=1;ctx.strokeRect(-m.size/2,-m.size/2,m.size,m.size);ctx.beginPath();ctx.moveTo(-m.size-8,0);ctx.lineTo(m.size+8,0);ctx.moveTo(0,-m.size-8);ctx.lineTo(0,m.size+8);ctx.stroke();if(m.label){ctx.font='700 8px monospace';ctx.fillStyle=`rgba(0,143,200,${alpha})`;ctx.fillText(m.label,m.size/2+8,-m.size/2-4)}ctx.restore()}
    requestAnimationFrame(draw)
  }
  resize();draw();
})();

/* Подключаем общие улучшения, не меняя существующую анимацию фона. */
(() => {
  const load = src => { const s=document.createElement('script'); s.src=src; s.defer=false; document.head.appendChild(s); };
  load('service-modal.js');
  load('catalog-fix.js');
  const css=document.createElement('link'); css.rel='stylesheet'; css.href='service-modal-fullscreen.css'; document.head.appendChild(css);
})();
