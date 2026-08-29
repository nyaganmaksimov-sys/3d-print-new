/* 3D-Print catalog -> calculator integration */
(function(){
  'use strict';

  function fireChange(el){
    if(!el) return;
    el.dispatchEvent(new Event('change',{bubbles:true}));
    el.dispatchEvent(new Event('input',{bubbles:true}));
  }

  function findCalculatorProduct(title){
    const select = document.getElementById('cp-product');
    if(!select) return null;

    const clean = String(title).trim().toLowerCase();
    const options = Array.from(select.options || []);

    return options.find(o => {
      const t = (o.textContent || '').trim().toLowerCase();
      const v = (o.value || '').trim().toLowerCase();
      return t === clean || v === clean || t.includes(clean) || clean.includes(t);
    }) || null;
  }

  function selectCatalogProduct(title){
    const select = document.getElementById('cp-product');
    if(!select) return false;

    const option = findCalculatorProduct(title);

    if(option){
      select.value = option.value;
      fireChange(select);
      return true;
    }

    /* Keep the catalog choice even when it is not yet present in the calculator list. */
    window.__catalogModel = title;
    fireChange(select);
    return false;
  }

 function putModelIntoTask(title, url){
  const task = document.getElementById('orderTask');

  if(!task) return;

  const markerModel = 'Модель из каталога:';
  const markerUrl = 'Ссылка на модель:';

  const modelLine =
    `${markerModel} ${title}`;

  const urlLine =
    url
      ? `${markerUrl} ${url}`
      : '';

  let current =
    task.value.trim();

  /*
   * Удаляем старую модель и старую ссылку,
   * если они уже были добавлены.
   */
  current = current
    .replace(/^Модель из каталога:.*$/gim, '')
    .replace(/^Ссылка на модель:.*$/gim, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  /*
   * Формируем новый блок.
   */
  const modelBlock = [
    modelLine,
    urlLine
  ]
    .filter(Boolean)
    .join('\n');

  task.value =
    current
      ? `${modelBlock}\n\n${current}`
      : modelBlock;

  /*
   * Сообщаем остальному коду сайта,
   * что поле изменилось.
   */
  task.dataset.userEdited = 'true';

  task.dispatchEvent(
    new Event('input', {
      bubbles: true
    })
  );

  console.log(
    'Каталог → Задача:',
    {
      model: title,
      url: url
    }
  );
}

  function goToCalculator(){
    const calc = document.getElementById('calculator')
      || document.getElementById('calc')
      || document.querySelector('#cp-product')?.closest('.section')
      || document.querySelector('.calc-box');

    if(calc){
      calc.scrollIntoView({behavior:'smooth',block:'start'});
    }

    setTimeout(function(){
      const first = document.getElementById('cp-product')
        || document.getElementById('orderName');
      if(first) first.focus({preventScroll:true});
    },600);
  }

  function createButton(card,title){
    if(card.querySelector('.catalog-order-btn')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'catalog-order-btn';
    button.textContent = 'ЗАКАЗАТЬ ЭТУ МОДЕЛЬ →';
    button.setAttribute('aria-label',`Заказать модель ${title}`);

    button.addEventListener('click',function(){
      selectCatalogProduct(title);
      putModelIntoTask(title);
      goToCalculator();

      if(window.SoundFX && typeof window.SoundFX.click === 'function'){
        window.SoundFX.click();
      }
    });

    const body = card.querySelector('.model-info') || card;
    body.appendChild(button);
  }

  function enhanceCatalog(){
    const cards = document.querySelectorAll('.model-card');

    cards.forEach(function(card){
      const title = card.querySelector('.model-info h3, h3');
      if(!title) return;

      const name = title.textContent.trim();
      if(!name) return;

      createButton(card,name);
    });
  }

  function addStyles(){
    if(document.getElementById('catalog-order-styles')) return;

    const style = document.createElement('style');
    style.id = 'catalog-order-styles';
    style.textContent = `
      .catalog-order-btn{
        width:100%;
        margin-top:12px;
        padding:11px 10px;
        border:1px solid rgba(0,191,255,.38);
        border-radius:6px;
        background:linear-gradient(90deg,rgba(0,191,255,.10),rgba(23,108,255,.08));
        color:#fff;
        font-size:9px;
        font-weight:900;
        letter-spacing:.35px;
        cursor:pointer;
        transition:.2s ease;
      }
      .catalog-order-btn:hover{
        transform:translateY(-2px);
        border-color:rgba(0,191,255,.8);
        background:linear-gradient(90deg,rgba(0,191,255,.18),rgba(23,108,255,.14));
        box-shadow:0 8px 24px rgba(0,191,255,.12);
      }
      .catalog-order-btn:active{transform:translateY(0)}
    `;
    document.head.appendChild(style);
  }

  function init(){
    addStyles();
    enhanceCatalog();

    /* Catalog cards are static today, but this also handles cards added later. */
    const observer = new MutationObserver(enhanceCatalog);
    observer.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded',init,{once:true});
  }else{
    init();
  }
})();
