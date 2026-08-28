/* Дополнительные модели каталога. Все записи содержат реальное фото и ведут на исходную карточку 3DToday. */
(() => {
  const grid = document.querySelector('.catalog-grid');
  const filters = document.querySelector('.filters');
  if (!grid || !filters || grid.dataset.extraModelsAdded === 'true') return;
  grid.dataset.extraModelsAdded = 'true';

  const extra = [
    ['Дефлектор для Skoda Octavia A5 2010 года выпуска','auto','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/khobbi/avtomobili/deflektor-dlya-skoda-octavia-a5-2010-goda-vypuska','Дефлектор для Skoda Octavia A5 2010 года выпуска.','https://3dtoday.ru/cache/640x/models/images/OjtKeekmTKII9mqWBR8yQCpOjVjiNXsYAXPxjIDF.jpg'],
    ['Дефлектор боковых воздуховодов ВАЗ 2110-11-12 Европанель','auto','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/khobbi/avtomobili/deflektor-bokovyx-vozduxovodov-vaz-2110-11-12-evropanel','Дефлектор боковых воздуховодов ВАЗ 2110-11-12 с европанелью.','https://3dtoday.ru/cache/640x/models/images/4gwia4ofDIyZlUknAFnGNLZQ7ASjjpY4Jqu1ZPiu.jpg'],
    ['Ручка-защелка подлокотника Mitsubishi Outlander 3 обычная и удлиненная','auto','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/khobbi/avtomobili/rucka-zashhelka-podlokotnika-mitsubishi-outlander-3-obycnaya-i-udlinennaya','Ручка-защелка подлокотника Mitsubishi Outlander 3 в обычном и удлиненном вариантах.','https://3dtoday.ru/cache/640x/models/images/46NiJ4HotP7nNPex9XMS6qSWIng4ZsTMGg17lfqV.png'],
    ['Скан 2110 — центральное сопло печки торпеды','auto','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/khobbi/avtomobili/skan-krivoizagotovka2110-centralnoe-soplo-pecki-torpedy','Сканированная заготовка центрального сопла печки торпеды ВАЗ 2110.','https://3dtoday.ru/cache/640x/models/images/mdHKp6pLhTvpaKljW8x8pcyQBoMg56LoZF2Dmee1.jpg'],
    ['Передний аэродинамический щиток Geely Sityray','auto','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/khobbi/avtomobili/perednii-aerodinamiceskii-shhitok-geely-sityray','Передний аэродинамический щиток для Geely Sityray.','https://3dtoday.ru/cache/640x/models/images/ncUCIBcoOfriGfZAA8jOVc4RKgw9MToVSQwyZNzu.jpg'],
    ['Накладка ручки МКПП BMW 5 Series E39 1995-2004','auto','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/khobbi/avtomobili/nakladka-rucki-mkpp-bmw-5-series-e39-1995-2004','Накладка ручки механической коробки передач BMW 5 Series E39 1995-2004.','https://3dtoday.ru/cache/640x/models/images/lNFrm6eIVUB9CSl0SXzJWZVDNs2dgIQcp6IEsDoj.jpg'],
    ['Клипса уплотнителя двери Lada','auto','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/khobbi/avtomobili/klipsa-uplotnitelya-dveri-lada','Клипса уплотнителя двери для автомобилей Lada.','https://3dtoday.ru/cache/640x/models/images/AghRZjrCX9ntXpPaoQkzRCamr5IG3rTzTYwwvmkj.png'],
    ['Клипса под саморез 7.4-14.5','auto','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/khobbi/avtomobili/klipsa-pod-samorez-74-145','Универсальная клипса под саморез размером 7.4-14.5.','https://3dtoday.ru/cache/640x/models/images/WujsnHEFVG3ojA7pxyssq7FILJoQSKgF9aK0pY6i.jpg'],
    ['Крепеж пневмоинструмента','tech','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/khobbi/raznye-modeli/krepez-pnevmoinstrumenta','Крепежная деталь для пневмоинструмента.','https://3dtoday.ru/cache/640x/models/images/C88f2AZiPIRXTAujZm3RV3CPhfQxQNCYf3xrYkwj.jpg'],
    ['Кот — кулон','gifts','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/3d-modeli-dlya-yuvelirov/kulony/kot-kulon','Модель кулона в форме кота.','https://3dtoday.ru/cache/640x/models/images/YcyjhMvTWZod9FWvo2pvPO1svKltk9gZTFMv8MYO.jpeg'],
    ['Киса и Пёсик','gifts','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/3d-modeli-dlya-yuvelirov/sergi/kisa-i-pyosik','Модель серег «Киса и Пёсик».','https://3dtoday.ru/cache/640x/models/images/PLjb3j7TmWnCIk8xnGN6eTT4nBKFYoJOQu0zd39K.jpeg'],
    ['Сердечко любимой мамочке','gifts','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/3d-modeli-dlya-yuvelirov/kulony/serdechko_lyubimoy_mamochke','Памятный кулон в форме сердечка.','https://3dtoday.ru/cache/640x/iblock/628/6282cb78a228c5908735b1adef3557d5.jpeg'],
    ['CatSite — Каска для кошек','home','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/3ddoctors/masks/catsite-kaska-dlya-kosek','Защитная каска для кошек — забавная модель для печати.','https://3dtoday.ru/cache/640x/models/images/lthurTebHnBDELXY4OFZC7u2iqicIU7RnqK46on8.webp'],
    ['Шлем Бэтмена для кошек','home','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/3ddoctors/masks/slem-betmena-dlya-kosek','Декоративный шлем Бэтмена для кошки.','https://3dtoday.ru/cache/640x/models/images/bucrHysJZkE1k1peUZCoVaG68T383wApIJyvdGAe.webp'],
    ['Шлем для кошки в стиле Дарта Вейдера','home','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/3ddoctors/masks/slem-dlya-koski-v-stile-darta-veidera','Декоративный шлем для кошки в стиле Дарта Вейдера.','https://3dtoday.ru/cache/640x/models/images/w6pIycAnvbwOxE9WoTpZMqWiqwZhKbFWutYIJomN.png'],
    ['Полка для Яндекс Станции Миди','home','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/for-home/accessories/polka-dlya-yandeks-stancii-midi','Компактная полка для Яндекс Станции Миди.','https://3dtoday.ru/cache/640x/models/images/ohOSpZoflVO74s0rYzfWvEwLzXinuCGE132JvknH.jpg'],
    ['Царевна Лебедь','home','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/for-home/decoration/carevna-lebed','Декоративная модель Царевны Лебедь.','https://3dtoday.ru/cache/640x/models/images/H0XPHXcN7zwjzN1y7PYBopX0h0q6UEURPBPFegHg.jpg'],
    ['Шаблон для выставления зазоров','tech','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/for-home/accessories/sablon-dlya-vystavleniya-zazorov','Шаблон для точной проверки и выставления зазоров.','https://3dtoday.ru/cache/640x/models/images/86hWYif1bSTkXHboWtV6AgIb4JcVu1oxvpsBv61D.jpg'],
    ['Поилка для террариума','home','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/for-home/pets/poilka-dlya-terrariuma','Поилка для обитателей террариума.','https://3dtoday.ru/cache/640x/models/images/5jniAYD9RlShTLwsY9Ktrc45wBcG5bFx3OVE7L22.jpg'],
    ['Крючок на стену для ключа','home','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/for-home/bathroom/kryucok-na-stenu-dlya-klyuca-ot-sl10-filtra','Настенный крючок для ключа от SL10 фильтра.','https://3dtoday.ru/cache/640x/models/images/FUomDXEvPbK5lWYj9QqEHGdfNpdR40KFnh84hWSl.jpg'],
    ['Деталь для блендера Redmond','home','Бесплатная модель','3DToday','free','https://3dtoday.ru/3d-models/for-home/kitchen/detal-dlya-blendera-redmond','Запасная деталь для блендера Redmond.','https://3dtoday.ru/cache/640x/models/images/LetCXKDBdWYNDHgXgTg5NHAZMJhIdeUqCwtQ73vx.png']
  ];

  const label = cat => ({auto:'Авто',home:'Для дома',office:'Офис',tech:'Электроника',gifts:'Подарки'}[cat] || 'Модели');
  const html = extra.map(([name,cat,meta,author,type,url,description,image]) => `<article class="product extra-model" data-cat="${cat}" data-type="${type}" data-name="${(name+' '+author+' '+description).toLowerCase()}"><div class="product-image has-real-image"><a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Открыть ${name} на 3DToday"><img src="${image}" alt="${name}" loading="lazy" referrerpolicy="no-referrer"><div class="model-label"><b>БЕСПЛАТНАЯ</b><small>Реальное фото модели</small></div></a></div><div class="product-info"><span>${label(cat)} · ${meta}</span><h3>${name}</h3><p class="catalog-description">${description}</p><div class="model-credit"><small>Автор: ${author}</small><small>Источник: 3DToday</small></div><div class="model-actions"><a href="${url}" target="_blank" rel="noopener noreferrer">Фото и модель на 3DToday →</a><b>Бесплатная модель</b></div></div></article>`).join('');
  grid.insertAdjacentHTML('beforeend', html);

  // Пересобираем фильтры и поиск после добавления новых карточек, чтобы новые модели участвовали в поиске.
  const oldSearch = document.querySelector('.catalog-search');
  if (oldSearch) {
    const freshSearch = oldSearch.cloneNode(true);
    freshSearch.querySelector('input').id = 'catalogSearchAll';
    freshSearch.querySelector('input').placeholder = 'Поиск модели, марки или детали…';
    oldSearch.replaceWith(freshSearch);
  }

  filters.innerHTML = [['all','Все'],['free','Бесплатные'],['paid','Платные'],['home','Для дома'],['auto','Авто'],['tech','Электроника'],['office','Офис'],['gifts','Подарки']].map(([id,text],i)=>`<button class="${i===0?'active':''}" data-filter="${id}">${text}</button>`).join('');

  const products = [...grid.querySelectorAll('.product')];
  let active = 'all';
  let query = '';
  const apply = () => {
    let visible = 0;
    products.forEach(card => {
      const ok = (active === 'all' || card.dataset.type === active || card.dataset.cat === active) && (!query || card.dataset.name.includes(query));
      card.style.display = ok ? '' : 'none';
      if (ok) visible++;
    });
    let empty = grid.querySelector('.catalog-empty');
    if (!visible) {
      if (!empty) { empty = document.createElement('div'); empty.className = 'catalog-empty'; empty.textContent = 'По вашему запросу ничего не найдено.'; grid.appendChild(empty); }
      empty.style.display = 'block';
    } else if (empty) empty.style.display = 'none';
  };
  filters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    filters.querySelectorAll('button').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    active = button.dataset.filter;
    apply();
  }));
  const input = document.querySelector('#catalogSearchAll');
  const clear = input?.parentElement?.querySelector('button');
  input?.addEventListener('input', e => { query = e.target.value.trim().toLowerCase(); apply(); });
  clear?.addEventListener('click', () => { input.value = ''; query = ''; apply(); input.focus(); });
  apply();
})();
