(() => {
  const grid = document.querySelector('.catalog-grid');
  if (!grid) return;
  const filters = document.querySelector('.filters');
  const isFullCatalog = /(^|\/)catalog\.html$/i.test(window.location.pathname);
  const extraModels=[['Держатель пульта кондиционера','home','Для дома · FDM'],['Кронштейн для сушилки белья','home','Для дома · FDM'],['Подставка для монитора VESA 100×100','office','Для офиса · FDM'],['Ручка холодильника Electrolux','home','Для дома · FDM'],['Форма для печенья «Алфавит и цифры»','kitchen','Кухня · FDM'],['Крышка для пакетов','kitchen','Кухня · FDM'],['Кашпо / цветочный горшок','decor','Декор · FDM'],['Держатель паяльника','tech','Электроника · FDM'],['Ползунок кнопки','tech','Электроника · FDM'],['Корпус для радиодеталей','tech','Электроника · FDM'],['Скульптура для декора','decor','Искусство · Resin'],['Брелок','gifts','Подарки · FDM'],['Кулон / медальон','gifts','Подарки · Resin'],['Органайзер для рабочего стола','office','Для офиса · FDM'],['Шестерёнка механизма','mechanical','Механические части · FDM'],['Корпус механизма','mechanical','Механические части · FDM'],['Крепёжная деталь','mechanical','Механические части · FDM'],['Крепление для робота','hobby','Хобби · FDM'],['Деталь для 3D-принтера','printer','Детали для 3D-принтеров · FDM'],['Охлаждение для 3D-принтера','printer','Детали для 3D-принтеров · FDM']];
  const objectClass=n=>{n=n.toLowerCase();if(n.includes('шестер'))return'model-gear';if(n.includes('клипс')||n.includes('защёл')||n.includes('защел'))return'model-clip';if(n.includes('ручк'))return'model-handle';if(n.includes('кронштейн')||n.includes('креплен')||n.includes('держател'))return'model-bracket';if(n.includes('органайзер')||n.includes('контейнер'))return'model-box';if(n.includes('кашпо')||n.includes('горшок')||n.includes('скульптур'))return'model-decor';return'model-part'};

  if(isFullCatalog){
    grid.insertAdjacentHTML('beforeend',extraModels.map(([name,cat,meta],i)=>`<article class="product extra-product" data-cat="${cat}" data-name="${name.toLowerCase()}" data-type="print"><div class="product-image placeholder model-placeholder ${objectClass(name)}"><div class="model-stage"><div class="model-object"></div><div class="model-gridline"></div><span class="model-axis">X&nbsp;&nbsp;Y&nbsp;&nbsp;Z</span></div><div class="model-label"><b>${cat.toUpperCase()}</b><small>3D PREVIEW ${String(i+51).padStart(2,'0')}</small></div></div><div class="product-info"><span>${meta}</span><h3>${name}</h3><div class="model-credit"><small>Источник: 3D-PRINT</small><small>Категория: готовое изделие</small></div><div class="model-actions"><a href="index.html#order">Заказать печать →</a><b>Рассчитать стоимость →</b></div></div></article>`).join(''));
  }

  const allProducts=[...grid.querySelectorAll('.product')];

  if(!isFullCatalog){
    if(filters) filters.style.display='none';
    document.querySelectorAll('.catalog-search-wrap,.catalog-search').forEach(el=>el.remove());
    allProducts.forEach((card,i)=>card.style.display=i<4?'':'none');
    const oldMore=grid.parentElement.querySelector('.catalog-more');
    if(oldMore) oldMore.remove();
    const more=document.createElement('a');
    more.className='catalog-more btn primary';
    more.href='catalog.html';
    more.textContent='Открыть полный каталог моделей →';
    grid.after(more);
    return;
  }

  if(!filters) return;

  // Определяем тип предложения по первоисточнику. 3DToday /market — платные модели;
  // /3d-models — бесплатные модели; /shop — готовые распечатанные изделия, которые можно заказать.
  const detectType=card=>{
    const href=card.querySelector('.model-actions a[href]')?.getAttribute('href')||'';
    if(card.dataset.type==='print'||/\/shop(?:\/|$)/i.test(href)) return 'print';
    if(/\/market(?:\/|$)/i.test(href)) return 'paid';
    if(/\/3d-models(?:\/|$)/i.test(href)) return 'free';
    return 'free';
  };

  const categoryButtons=[['all','Все'],['free','Бесплатные'],['paid','Платные'],['print','Готовые изделия'],['home','Для дома'],['auto','Авто'],['tech','Электроника'],['decor','Декор'],['office','Офис'],['kitchen','Кухня'],['mechanical','Механика'],['hobby','Хобби'],['gifts','Подарки'],['printer','3D-принтеры']];
  filters.innerHTML=categoryButtons.map(([id,label],i)=>`<button class="${i===0?'active':''}" data-filter="${id}">${label}</button>`).join('');

  document.querySelectorAll('.catalog-search').forEach(el=>{if(!el.closest('.catalog-search-wrap'))el.remove()});
  const searchWrap=document.querySelector('.catalog-search-wrap');
  const input=searchWrap?.querySelector('input');
  const clear=searchWrap?.querySelector('button');

  allProducts.forEach((card,index)=>{
    const type=detectType(card);
    card.dataset.type=type;
    const info=card.querySelector('.product-info');
    if(info&&!info.querySelector('.model-type-badge')){
      const badge=document.createElement('span');
      badge.className=`model-type-badge model-type-${type}`;
      badge.textContent=type==='paid'?'ПЛАТНАЯ МОДЕЛЬ':type==='free'?'БЕСПЛАТНАЯ МОДЕЛЬ':'ГОТОВОЕ ИЗДЕЛИЕ';
      const title=info.querySelector('h3');
      if(title) title.before(badge); else info.prepend(badge);
    }
  });

  // Полный каталог: убираем старую кнопку «Показать ещё» и всегда показываем весь список.
  const oldMore=document.getElementById('catalogMore');
  if(oldMore) oldMore.remove();

  let activeFilter='all',query='';
  const empty=document.querySelector('.catalog-empty')||document.createElement('div');
  empty.className='catalog-empty';
  empty.textContent='По вашему запросу ничего не найдено.';
  if(!empty.parentElement) grid.after(empty);

  const render=()=>{
    let found=0;
    allProducts.forEach(card=>{
      const cat=card.dataset.cat||'';
      const type=card.dataset.type||'free';
      const text=(card.dataset.name||card.textContent).toLowerCase();
      const ok=(['all','free','paid','print'].includes(activeFilter)?(activeFilter==='all'||type===activeFilter):(cat===activeFilter))&&(!query||text.includes(query));
      card.style.display=ok?'':'none';
      if(ok) found++;
    });
    empty.style.display=found?'none':'';
  };

  filters.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
    filters.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    activeFilter=b.dataset.filter;
    render();
  }));
  input?.addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();render()});
  clear?.addEventListener('click',()=>{if(input){input.value='';query='';render();input.focus()}});
  render();
})();