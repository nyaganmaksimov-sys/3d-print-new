(function(){
  const btn=document.createElement('button');
  btn.className='back-to-top';
  btn.type='button';
  btn.setAttribute('aria-label','Наверх');
  btn.innerHTML='<span>↑</span><small>НАВЕРХ</small>';
  document.body.appendChild(btn);
  const toggle=()=>btn.classList.toggle('visible',window.scrollY>450);
  window.addEventListener('scroll',toggle,{passive:true});
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  toggle();
})();
