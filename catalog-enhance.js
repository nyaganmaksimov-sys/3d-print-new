(() => {
  const grid = document.querySelector('.catalog-grid');
  if (!grid) return;
  const filters = document.querySelector('.filters');
  const isFullCatalog = /(^|\/)catalog\.html$/i.test(window.location.pathname);
  const extraModels=[
    ['Держатель пульта кондиционера','home','Для дома · FDM','https://3dtoday.ru/3d-models/for-home/accessories/derzhatel-pulta-kondicionera'],
    ['Кронштейн для сушилки белья','home','Для дома · FDM','https://3dtoday.ru/3d-models/for-home/accessories/kronshtein-dlya-sushilki-belya'],
    ['Подставка для монитора VESA 100×100','office','Для офиса · FDM','https://3dtoday.ru/3d-models/for-office/accessories/podstavka-dlya-monitora-s-krepleniem-pod-vesa-100-x-100'],
    ['Ручка холодильника Electrolux','home','Для дома · FDM','https://3dtoday.ru/3d-models/for-home/appliances/ruchka-xolodilnika-electrolux'],
    ['Форма для печенья «Алфавит и цифры»','kitchen','Кухня · FDM','https://3dtoday.ru/3d-models/for-home/kitchen'],
    ['Крышка для пакетов','kitchen','Кухня · FDM','https://3dtoday.ru/3d-models/for-home/kitchen'],
    ['Кашпо / цветочный горшок','decor','Декор · FDM','https://3dtoday.ru/3d-models/for-home/decoration'],
    ['Держатель паяльника','tech','Электроника · FDM','https://3dtoday.ru/3d-models/gadgets'],
    ['Ползунок кнопки','tech','Электроника · FDM','https://3dtoday.ru/3d-models/gadgets'],
    ['Корпус для радиодеталей','tech','Электроника · FDM','https://3dtoday.ru/3d-models/gadgets'],
    ['Скульптура для декора','decor','Искусство · Resin','https://3dtoday.ru/3d-models/art'],
    ['Брелок','gifts','Подарки · FDM','https://3dtoday.ru/3d-models/gifts'],
    ['Кулон / медальон','gifts','Подарки · Resin','https://3dtoday.ru/3d-models/jewelry'],
    ['Органайзер для рабочего стола','office','Для офиса · FDM','https://3dtoday.ru/3d-models/for-office/organizers/nastennyi-organaizer'],
    ['Шестерёнка механизма','mechanical','Механические части · FDM','https://3dtoday.ru/3d-models/mechanical-parts'],
    ['Корпус механизма','mechanical','Механические части · FDM','https://3dtoday.ru/3d-models/mechanical-parts'],
    ['Крепёжная деталь','mechanical','Механические части · FDM','https://3dtoday.ru/3d-models/mechanical-parts/fasteners'],
    ['Крепление для робота','hobby','Хобби · FDM','https://3dtoday.ru/3d-models/khobbi/robototexnika'],
    ['Деталь для 3D-принтера','printer','Детали для 3D-принтеров · FDM','https://3dtoday.ru/3d-models/3d-printers'],
    ['Охлаждение для 3D-принтера','printer','Детали для 3D-принтеров · FDM','https://3dtoday.ru/3d-models/3d-printers'],
    ['Настенный органайзер','office','Бесплатная · FDM · 3DToday','https://3dtoday.ru/3d-models/for-office/organizers/nastennyi-organaizer'],
    ['Органайзер под сверла и биты','office','Бесплатная · FDM · 3DToday','https://3dtoday.ru/3d-models/for-office/organizers/organaizer-pod-sverla-i-bity'],
    ['Настольная лампа','decor','Бесплатная · FDM · 3DToday','https://3dtoday.ru/3d-models/for-home/lighting/nastolnaya-lampa'],
    ['Держатель телефона','tech','Бесплатная · FDM · 3DToday','https://3dtoday.ru/3d-models/gadgets/phones/derzhatel_telefona_phone_holder'],
    ['Колпачок передней ступицы LADA VESTA','auto','Бесплатная · FDM · 3DToday','https://3dtoday.ru/3d-models/khobbi/avtomobili/kolpachok-peredney-stupitsy-lada-vesta'],
    ['Заглушка панели LADA Vesta','auto','Бесплатная · FDM · 3DToday','https://3dtoday.ru/3d-models/khobbi/avtomobili/zagluska-paneli-lada-vesta'],
    ['Органайзер для рукоделия','hobby','Платная · FDM · 3DToday','https://3dtoday.ru/market/sport-and-rest/hobby/organaizer-dlya-rukodeliya'],
    ['Органайзер для ниток и фурнитуры','office','Платная · FDM · 3DToday','https://3dtoday.ru/market/for-office/organizers/organaizer-dlya-nitok-i-furnitury'],
    ['Органайзер в подлокотник Pajero Sport 3','auto','Платная · FDM · 3DToday','https://3dtoday.ru/market/khobbi/avtomobili/organaizer-v-podlokotnik-pajero-sport-3-avtomat-kartoxolder'],
    ['Органайзер для Toyota Mark 2 90','auto','Платная · FDM · 3DToday','https://3dtoday.ru/market/for-office/organizers/organaizer-dlya-toyota-mark-2-90'],
    ['Автомобиль Lada Iskra 1:10','auto','Платная · FDM · 3DToday','https://3dtoday.ru/market/khobbi/avtomobili/avtomobil-lada-iskra-lada-iskra'],
    ['Toyota Mark 2 JZX/GX110 1:24','hobby','Платная · FDM · 3DToday','https://3dtoday.ru/market/khobbi/avtomobili/toyota-mark-2-jzx-gx-110-3d-model-dlya-pecati']
  ];
  const objectClass=n=>{n=n.toLowerCase();if(n.includes('шестер'))return'model-gear';if(n.includes('клипс')||n.includes('защёл')||n.includes('защел'))return'model-clip';if(n.includes('ручк'))return'model-handle';if(n.includes('кронштейн')||n.includes('креплен')||n.includes('держател'))return'model-bracket';if(n.includes('органайзер')||n.includes('контейнер'))return'model-box';if(n.includes('кашпо')||n.includes('горшок')||n.includes('скульптур'))return'model-decor';return'model-part'};

  if(isFullCatalog){
    grid.insertAdjacentHTML('beforeend',extraModels.map(([name,cat,meta,url],i)=>`<article class="product extra-product" data-cat="${cat}" data-name="${name.toLowerCase()}" data-type="${/\/market(?:\/|$)/i.test(url)?'paid':'free'}"><div class="product-image placeholder model-placeholder ${objectClass(name)}"><div class="model-stage"><div class="model-object"></div><div class="model-gridline"></div><span class="model-axis">3DTODAY · ${/\/market(?:\/|$)/i.test(url)?'PAID':'FREE'} ${String(i+51).padStart(2,'0')}</span></div><div class="model-label"><b>${cat.toUpperCase()}</b><small>Фото и оригинал — на 3DToday</small></div></div><div class="product-info"><span>${meta}</span><h3>${name}</h3><div class="model-credit"><small>Источник: 3DToday</small><small>Оригинал и фото: на странице модели</small></div><div class="model-actions"><a href="${url}" target="_blank" rel="noopener noreferrer">Фото и модель на 3DToday →</a><b>Рассчитать стоимость →</b></div></div></article>`).join(''));
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