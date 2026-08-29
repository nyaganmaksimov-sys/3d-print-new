/* 3D-Print UI sound system */
(()=>{
'use strict';

const STORAGE_KEY='3dprint-sound-enabled';
const VOLUME_KEY='3dprint-sound-volume';
let audioContext=null;
let enabled=localStorage.getItem(STORAGE_KEY)!=='off';
let volume=Math.max(0,Math.min(1,Number(localStorage.getItem(VOLUME_KEY)??'0.45')));

function ctx(){
  if(!audioContext) audioContext=new (window.AudioContext||window.webkitAudioContext)();
  if(audioContext.state==='suspended') audioContext.resume();
  return audioContext;
}

function tone(freq,duration,type='sine',gain=0.035,when=0){
  if(!enabled) return;
  try{
    const ac=ctx(), now=ac.currentTime+when;
    const osc=ac.createOscillator(), g=ac.createGain();
    osc.type=type;
    osc.frequency.setValueAtTime(freq,now);
    g.gain.setValueAtTime(0.0001,now);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001,gain*volume),now+0.008);
    g.gain.exponentialRampToValueAtTime(0.0001,now+duration);
    osc.connect(g); g.connect(ac.destination);
    osc.start(now); osc.stop(now+duration+0.02);
  }catch(e){}
}

function play(name){
  if(!enabled) return;
  switch(name){
    case 'hover': tone(720,.045,'sine',.018); break;
    case 'click': tone(420,.055,'triangle',.028); break;
    case 'select': tone(520,.055,'triangle',.026); tone(780,.07,'sine',.018,.035); break;
    case 'price': tone(620,.06,'sine',.018); tone(880,.10,'sine',.022,.045); break;
    case 'send': tone(420,.08,'triangle',.025); tone(620,.12,'sine',.022,.07); break;
    case 'success': tone(523,.08,'sine',.025); tone(659,.08,'sine',.028,.07); tone(784,.14,'sine',.032,.14); break;
    case 'error': tone(260,.12,'sawtooth',.025); tone(190,.16,'sawtooth',.022,.09); break;
  }
}

function buildControl(){
  if(document.getElementById('sound-control')) return;
  const wrap=document.createElement('div');
  wrap.id='sound-control';
  wrap.innerHTML=`<button type="button" id="sound-toggle" aria-label="Управление звуком"><span class="sound-icon">${enabled?'🔊':'🔇'}</span><span class="sound-label">${enabled?'SOUND ON':'SOUND OFF'}</span></button><div id="sound-panel"><label>ГРОМКОСТЬ <output id="sound-volume-value">${Math.round(volume*100)}%</output></label><input id="sound-volume" type="range" min="0" max="100" value="${Math.round(volume*100)}"></div>`;
  document.body.appendChild(wrap);

  const style=document.createElement('style');
  style.textContent=`#sound-control{position:fixed;right:22px;bottom:22px;z-index:10000;font-family:inherit}#sound-toggle{display:flex;align-items:center;gap:8px;padding:9px 12px;border:1px solid rgba(0,191,255,.35);border-radius:8px;background:rgba(10,16,24,.88);backdrop-filter:blur(12px);color:#dce7ef;font:800 9px/1 inherit;letter-spacing:1.5px;cursor:pointer;box-shadow:0 8px 28px rgba(0,0,0,.28);transition:.2s}#sound-toggle:hover{border-color:rgba(0,191,255,.75);transform:translateY(-1px)}.sound-icon{font-size:14px;letter-spacing:0}#sound-panel{display:none;margin-bottom:7px;padding:12px;border:1px solid rgba(0,191,255,.3);border-radius:8px;background:rgba(10,16,24,.94);backdrop-filter:blur(12px);box-shadow:0 10px 30px rgba(0,0,0,.3);min-width:190px}#sound-control:hover #sound-panel,#sound-panel:focus-within{display:block}#sound-panel label{display:flex;justify-content:space-between;color:#aab8c5;font:800 8px/1 inherit;letter-spacing:1.2px;margin-bottom:9px}#sound-volume{width:100%;accent-color:#00bfff;cursor:pointer}@media(max-width:760px){#sound-control{right:12px;bottom:12px}.sound-label{display:none}#sound-toggle{padding:10px}.sound-icon{font-size:16px}}`;
  document.head.appendChild(style);

  const toggle=document.getElementById('sound-toggle');
  toggle.addEventListener('click',()=>{
    enabled=!enabled;
    localStorage.setItem(STORAGE_KEY,enabled?'on':'off');
    toggle.querySelector('.sound-icon').textContent=enabled?'🔊':'🔇';
    toggle.querySelector('.sound-label').textContent=enabled?'SOUND ON':'SOUND OFF';
    if(enabled) play('click');
  });

  document.getElementById('sound-volume').addEventListener('input',e=>{
    volume=Number(e.target.value)/100;
    localStorage.setItem(VOLUME_KEY,String(volume));
    document.getElementById('sound-volume-value').textContent=Math.round(volume*100)+'%';
  });
}

function bind(){
  buildControl();

  document.addEventListener('pointerover',e=>{
    const el=e.target.closest('button,a,.cp-choice');
    if(el && !el.dataset.soundHover){el.dataset.soundHover='1';play('hover');}
  });

  document.addEventListener('click',e=>{
    const el=e.target.closest('button,a,.cp-choice');
    if(!el || el.id==='sound-toggle') return;
    if(el.matches('.cp-choice')) play('select');
    else if(el.type==='submit' || el.classList.contains('calc-order') || /отправ|оформить/i.test(el.textContent||'')) play('send');
    else play('click');
  });

  document.addEventListener('input',e=>{
    if(/^cp-(l|w|h|fill|finish|qty)$/.test(e.target.id)) play('price');
  });

  const form=document.getElementById('orderForm');
  if(form){
    form.addEventListener('submit',()=>play('send'),true);
  }
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bind); else bind();
window.print3DSound=play;
})();
