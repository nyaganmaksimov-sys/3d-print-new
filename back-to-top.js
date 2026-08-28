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

  // Cache-busted project fixes: guarantees that GitHub Pages does not keep the old modal/catalog code.
  const addScript=(src)=>{const s=document.createElement('script');s.src=src;s.defer=false;document.body.appendChild(s)};
  addScript('service-modal.js?v=20260828-3');
  addScript('catalog-fix.js?v=20260828-3');
})();
