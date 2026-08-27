(() => {
  const grid = document.querySelector('.catalog-grid');
  const filters = document.querySelector('.filters');
  if (!grid || !filters) return;

  // Дополнительные категории каталога по структуре 3DToday.
  const extraModels = [
    ['Держатель пульта кондиционера','home','Для дома · FDM','3DToday'],
    ['Кронштейн для сушилки белья','home','Для дома · FDM','3DToday'],
    ['Подставка для монитора VESA 100×100','office','Для офиса · FDM','3DToday'],
    ['Ручка холодильника Electrolux','home','Для дома · FDM','3DToday'],
    ['Форма для печенья «Алфавит и цифры»','kitchen','Кухня · FDM','3DToday'],
    ['Крышка для пакетов','kitchen','Кухня · FDM','3DToday'],
    ['Кашпо / цветочный горшок','decor','Декор · FDM','3DToday'],
    ['Держатель паяльника','tech','Электроника · FDM','3DToday'],
    ['Ползунок кнопки','tech','Электроника · FDM','3DToday'],
    ['Корпус для радиодеталей','tech','Электроника · FDM','3DToday'],
    ['Скульптура для декора','decor','Искусство · Resin','3DToday'],
    ['Брелок','gifts','Подарки · FDM','3DToday'],
    ['Кулон / медальон','gifts','Подарки · Resin','3DToday'],
    ['Органайзер для рабочего стола','office','Для офиса · FDM','3DToday'],
    ['Шестерёнка механизма','mechanical','Механические части · FDM','3DToday'],
    ['Корпус механизма','mechanical','Механические части · FDM','3DToday'],
    ['Крепёжная деталь','mechanical','Механические части · FDM','3DToday'],
    ['Крепление для робота','hobby','Хобби · FDM','3DToday'],
    ['Деталь для 3D-принтера','printer','Детали для 3D-принтеров · FDM','3DToday'],
    ['Охлаждение для 3D-принтера','printer','Детали для 3D-принтеров · FDM','3DToday']
  ];

  const objectClass = name => {
    const n = name.toLowerCase();
    if (n.includes('шестер')) return 'model-gear';
    if (n.includes('клипс') || n.includes('защёл') || n.includes('защел')) return 'model-clip';
    if (n.includes('ручк')) return 'model-handle';
    if (n.includes('кронштейн') || n.includes('креплен') || n.includes('держател')) return 'model-bracket';
    if (n.includes('сетка') || n.includes('гриль')) return 'model-grille';
    if (n.includes('органайзер') || n.includes('контейнер') || n.includes('подстакан')) return 'model-box';
    if (n.includes('кашпо') || n.includes('горшок') || n.includes('скульптур')) return 'model-decor';
    return 'model-part';
  };

  const makeCard = ([name, cat, meta], index) => `<article class="product extra-product" data-cat="${cat}" data-name="${name.toLowerCase()}">
    <div class="product-image placeholder model-placeholder ${objectClass(name)}"><div class="model-stage"><div class="model-object"></div><div class="model-gridline"></div><span class="model-axis">X&nbsp;&nbsp;&nbsp;Y&nbsp;&nbsp;&nbsp;Z</span></div><div class="model-label"><b>${cat.toUpperCase()}</b><small>3D PREVIEW ${String(index + 51).padStart(2,'0')}</small></div></div>
    <div class="product-info"><span>${meta}</span><h3>${name}</h3><div class="model-credit"><small>Источник: 3DToday</small><small>Автор: требуется проверка</small><small>Лицензия: требуется проверка</small></div><div class="model-actions"><a href="https://3dtoday.ru/shop" target="_blank" rel="noopener noreferrer">3DToday →</a><b>Рассчитать стоимость →</b></div></div>
  </article>`;

  grid.insertAdjacentHTML('beforeend', extraModels.map(makeCard).join(''));

  // Добавляем категории в интерфейс.
  const categoryButtons = [
    ['all','Все'], ['home','Для дома'], ['auto','Авто'], ['tech','Электроника'],
    ['decor','Декор'], ['office','Для офиса'], ['kitchen','Кухня'], ['mechanical','Механика'],
    ['hobby','Хобби'], ['gifts','Подарки'], ['printer','Для 3D-принтеров']
  ];
  filters.innerHTML = categoryButtons.map(([id,label],i)=>`<button class="${i===0?'active':''}" data-filter="${id}">${label}</button>`).join('');

  const searchWrap = document.createElement('div');
  searchWrap.className = 'catalog-search-wrap';
  searchWrap.innerHTML = `<div class="catalog-search"><span>⌕</span><input id="catalog-search" type="search" placeholder="Поиск модели, марки автомобиля или детали…" autocomplete="off"><button type="button" id="clear-search" aria-label="Очистить">×</button></div><div class="search-hint">Например: <button type="button" data-query="BMW">BMW</button><button type="button" data-query="Toyota">Toyota</button><button type="button" data-query="клипса">клипса</button><button type="button" data-query="органайзер">органайзер</button></div>`;
  filters.parentNode.insertBefore(searchWrap, filters);

  const allProducts = [...grid.querySelectorAll('.product')];
  const pageSize = 10;
  let activeFilter = 'all';
  let query = '';
  let visibleCount = pageSize;

  const empty = document.createElement('div');
  empty.className = 'catalog-empty';
  empty.textContent = 'По вашему запросу ничего не найдено.';
  grid.after(empty);

  const more = document.createElement('button');
  more.className = 'catalog-more btn primary';
  more.type = 'button';
  more.textContent = 'Показать ещё';
  empty.after(more);

  const matches = () => allProducts.filter(card => {
    const cat = card.dataset.cat || '';
    const text = (card.dataset.name || card.textContent).toLowerCase();
    return (activeFilter === 'all' || cat === activeFilter) && (!query || text.includes(query));
  });

  const render = () => {
    const list = matches();
    allProducts.forEach(card => { card.style.display = 'none'; });
    list.slice(0, visibleCount).forEach(card => { card.style.display = ''; });
    empty.style.display = list.length ? 'none' : '';
    more.style.display = list.length > visibleCount ? 'inline-flex' : 'none';
    more.textContent = `Показать ещё · ${Math.min(pageSize, list.length - visibleCount)}`;
  };

  filters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    filters.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    visibleCount = pageSize;
    render();
  }));

  const input = searchWrap.querySelector('#catalog-search');
  input.addEventListener('input', () => { query = input.value.trim().toLowerCase(); visibleCount = pageSize; render(); });
  searchWrap.querySelector('#clear-search').addEventListener('click', () => { input.value = ''; query = ''; visibleCount = pageSize; input.focus(); render(); });
  searchWrap.querySelectorAll('[data-query]').forEach(b => b.addEventListener('click', () => { input.value = b.dataset.query; query = b.dataset.query.toLowerCase(); visibleCount = pageSize; render(); }));
  more.addEventListener('click', () => { visibleCount += pageSize; render(); });
  render();
})();
