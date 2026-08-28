// Make the whole service card open the existing full-screen service modal.
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.service[data-service], .service').forEach(card=>{
    const button=card.querySelector('[data-open-service]');
    if(!button) return;
    card.setAttribute('tabindex','0');
    card.setAttribute('role','button');
    const open=()=>button.click();
    card.addEventListener('click',e=>{
      if(e.target.closest('button,a')) return;
      open();
    });
    card.addEventListener('keydown',e=>{
      if((e.key==='Enter'||e.key===' ') && !e.target.closest('button,a')){
        e.preventDefault();
        open();
      }
    });
  });
});
