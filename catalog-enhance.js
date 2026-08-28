/* Дополнительное поведение каталога.
   ВАЖНО: модели здесь НЕ добавляются. Полный список и реальные фотографии
   формируются только из catalog-data.js. Это исключает карточки-заглушки. */
(() => {
  const grid = document.querySelector('.catalog-grid');
  const isCatalog = /\/catalog\.html$/i.test(location.pathname);

  // Новый фирменный стиль: 3D-ARTPRINT.
  document.title = document.title.replace(/3D-PRINT/g, '3D-ARTPRINT');
  document.querySelectorAll('meta[content*="3D-PRINT"]').forEach(meta => {
    meta.setAttribute('content', meta.getAttribute('content').replace(/3D-PRINT/g, '3D-ARTPRINT'));
  });
  document.querySelectorAll('[alt],[aria-label]').forEach(el => {
    ['alt','aria-label'].forEach(attr => {
      const value = el.getAttribute(attr);
      if (value && value.includes('3D-PRINT')) el.setAttribute(attr, value.replace(/3D-PRINT/g, '3D-ARTPRINT'));
    });
  });
  document.querySelectorAll('.brand, footer > img').forEach(el => {
    if (el.classList.contains('brand')) {
      el.innerHTML = '<img src="assets/logo_banner.png" alt="3D-ARTPRINT">';
    } else {
      el.src = 'assets/logo_banner.png';
      el.alt = '3D-ARTPRINT';
    }
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach(node => {
    if (node.nodeValue.includes('3D-PRINT')) node.nodeValue = node.nodeValue.replace(/3D-PRINT/g, '3D-ARTPRINT');
  });

  // Обновляем позиционирование бренда в hero/подвале без изменения существующей верстки.
  document.querySelectorAll('.hero .eyebrow, .identity-strip p').forEach(el => {
    el.textContent = el.textContent.replace('3D-ПЕЧАТЬ · ПРОИЗВОДСТВО · НА ЗАКАЗ', '3D-ARTPRINT · 3D-ПЕЧАТЬ · АРТ · ПРОИЗВОДСТВО');
    el.textContent = el.textContent.replace('3D-ПЕЧАТЬ • ФОТОПОЛИМЕРНАЯ ПЕЧАТЬ • ЧПУ-ФРЕЗЕРОВКА', '3D-ПЕЧАТЬ • АРТ-ПЕЧАТЬ • ЧПУ • СУВЕНИРЫ');
  });
  const heroText = document.querySelector('.hero-text');
  if (heroText) heroText.textContent = 'Создаём детали, прототипы, предметы интерьера и сувениры, а также переносим идеи на холст, одежду и другие поверхности.';
  const stats = document.querySelectorAll('.stats span');
  if (stats[1]) stats[1].textContent = 'направлений творчества и производства';
  const statStrong = document.querySelectorAll('.stats strong');
  if (statStrong[1]) statStrong[1].textContent = '6+';

  // Новые услуги. Добавляем их только один раз на главной странице.
  const serviceGrid = document.querySelector('.service-grid');
  if (serviceGrid && !serviceGrid.dataset.creativeServicesAdded) {
    serviceGrid.dataset.creativeServicesAdded = 'true';
    serviceGrid.insertAdjacentHTML('beforeend', `
      <article class="service creative-service">
        <span>05</span>
        <div class="service-icon accent" aria-hidden="true">
          <svg viewBox="0 0 64 64"><path class="draw" d="M14 12h36v40H14z"/><path class="draw" d="M20 18h24v28H20z"/><path class="draw pulse" d="M23 39c7-8 12-8 18 0"/><circle class="fill yellow pulse" cx="26" cy="27" r="3"/><circle class="fill blue pulse" cx="39" cy="31" r="3"/></svg>
        </div>
        <h3>Рисование на холсте</h3>
        <p>Картины и авторские работы на холсте по вашему эскизу, фотографии или идее.</p>
      </article>
      <article class="service creative-service">
        <span>06</span>
        <div class="service-icon blue" aria-hidden="true">
          <svg viewBox="0 0 64 64"><path class="draw" d="M13 45c13-2 17-13 19-26"/><path class="draw" d="M32 19l8 3-3 9-8-3z"/><path class="draw pulse" d="M42 17c4 3 7 7 8 12"/><circle class="fill accent pulse" cx="19" cy="42" r="3"/><circle class="fill yellow pulse" cx="48" cy="36" r="3"/></svg>
        </div>
        <h3>Аэрография</h3>
        <p>Художественная роспись и аэрография для автомобилей, мотоциклов, шлемов и предметов.</p>
      </article>
      <article class="service creative-service featured">
        <span>07</span>
        <div class="service-icon yellow" aria-hidden="true">
          <svg viewBox="0 0 64 64"><path class="draw" d="M17 20h30v30H17z"/><path class="draw" d="M17 25h30M23 14h18v6H23z"/><path class="draw pulse" d="M25 34h14M25 40h9"/><circle class="fill accent pulse" cx="44" cy="43" r="4"/></svg>
        </div>
        <h3>Сувенирная продукция</h3>
        <p>Кружки, футболки, подарки и брендированная продукция с вашим дизайном.</p>
      </article>`);
    const style = document.createElement('style');
    style.textContent = `
      .creative-service{position:relative;overflow:hidden}
      .creative-service:after{content:'ART';position:absolute;right:-8px;bottom:-24px;font-size:92px;font-weight:900;line-height:1;color:rgba(19,155,214,.055);pointer-events:none;transform:rotate(-10deg)}
      .creative-service h3{position:relative;z-index:1}
      .creative-service p{position:relative;z-index:1}
      @media(min-width:761px){.service-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
    `;
    document.head.appendChild(style);
  }

  if (!grid) return;
  const cards = [...grid.querySelectorAll('.product')];

  // На главной показываем ровно 4 реальные карточки и ссылку на полный каталог.
  if (!isCatalog) {
    document.querySelector('.filters')?.remove();
    document.querySelector('.catalog-search-wrap')?.remove();

    cards.forEach((card, index) => {
      card.style.display = index < 4 ? '' : 'none';
    });

    grid.parentElement?.querySelector('.catalog-more')?.remove();
    const button = document.createElement('a');
    button.className = 'catalog-more btn primary';
    button.href = 'catalog.html';
    button.textContent = 'Открыть полный каталог моделей →';
    grid.after(button);
    return;
  }

  // На странице полного каталога отображаем только модели с реальным изображением.
  cards.forEach(card => {
    const photo = card.querySelector('.product-image img');
    if (!photo || !photo.src) card.remove();
  });
})();

/* ============================================================
   3D-ARTPRINT: полноэкранные карточки услуг
   ============================================================ */
(() => {
  const serviceData = {
    '3d-печать': {
      accent:'#00bfff', image:'assets/3Dpechat 600х600.png',
      intro:'Изготавливаем детали, корпуса, крепления, прототипы и готовые изделия по вашей 3D-модели или помогаем подготовить модель к печати.',
      items:['FDM-печать пластиками PLA, PETG, ABS/ASA и другими материалами','Подбор материала под нагрузку, температуру и назначение детали','Изготовление единичных деталей и небольших серий','Подготовка модели, ориентация, поддержка и настройка печати'],
      fits:'Корпуса, крепления, автомобильные детали, органайзеры, прототипы, декоративные изделия.',
      process:'Получаем модель → проверяем геометрию → согласовываем материал и параметры → печатаем → выполняем постобработку при необходимости.'
    },
    'фотополимер': {
      accent:'#5f9dff', image:'assets/fotopolimer.png',
      intro:'Высокоточная фотополимерная печать для моделей, где важны мелкие детали, гладкая поверхность и аккуратная геометрия.',
      items:['Высокая детализация мелких элементов','Гладкая поверхность после обработки','Подходит для миниатюр, мастер-моделей и декоративных изделий','Выбор смолы под требуемую прочность и внешний вид'],
      fits:'Миниатюры, статуэтки, мастер-модели, корпуса и детали со сложной геометрией.',
      process:'Проверяем модель → выбираем смолу и ориентацию → печатаем → промываем и засвечиваем → выполняем финишную обработку.'
    },
    'чпу-фрезеровка': {
      accent:'#ff087d', image:'assets/cnc.png',
      intro:'Изготавливаем детали и декоративные элементы на ЧПУ по чертежу, эскизу или цифровой модели.',
      items:['Фрезеровка дерева, пластика, композитов и подходящих металлов','Раскрой и обработка листовых материалов','Гравировка, выборка и контурная обработка','Подбор инструмента и режимов под материал'],
      fits:'Панели, таблички, декоративные элементы, проставки, корпуса и технические детали.',
      process:'Получаем чертёж или модель → подготавливаем управляющую программу → согласовываем материал → выполняем обработку → проверяем результат.'
    },
    'рисование на холсте': {
      accent:'#ffd400', image:'assets/canvas.png',
      intro:'Создаём картины и авторские работы на холсте по вашему эскизу, фотографии, референсу или собственной идее.',
      items:['Картины по вашему сюжету или референсу','Портреты и декоративные композиции','Подбор формата, палитры и стилистики','Возможность подготовить работу под интерьер или подарок'],
      fits:'Дом, офис, подарок, интерьерные композиции, памятные и авторские работы.',
      process:'Обсуждаем идею → согласовываем эскиз и стиль → выполняем работу → показываем результат → подготавливаем к передаче.'
    },
    'аэрография': {
      accent:'#a45cff', image:'assets/air.png',
      intro:'Создаём индивидуальный дизайн и выполняем аэрографию на автомобилях, мотоциклах, шлемах и других подходящих поверхностях.',
      items:['Разработка эскиза под конкретную поверхность','Яркие многослойные композиции и плавные переходы','Аэрография авто, мото, шлемов и отдельных элементов','Финишная защита покрытия по технологии материала'],
      fits:'Автомобили, мотоциклы, шлемы, панели, элементы интерьера и другие поверхности.',
      process:'Осматриваем поверхность → обсуждаем идею → готовим эскиз → выполняем роспись → наносим защитный финиш при необходимости.'
    },
    'сувенирная продукция': {
      accent:'#ff8a00', image:'assets/souvenir.png',
      intro:'Изготавливаем персонализированные подарки и сувенирную продукцию с вашим изображением, логотипом или дизайном.',
      items:['Кружки и другая сувенирная продукция','Футболки и текстиль с индивидуальным дизайном','Подарки для друзей, мероприятий и компаний','Подготовка макета под выбранный формат изделия'],
      fits:'Подарки, корпоративная продукция, памятные сувениры, брендированные изделия.',
      process:'Выбираем изделие → получаем дизайн → проверяем макет → изготавливаем → проверяем качество и упаковываем.'
    }
  };

  const normalize = value => String(value || '').toLowerCase().replace(/ё/g,'е').replace(/[–—]/g,'-').trim();
  const findService = title => {
    const key = normalize(title);
    return Object.keys(serviceData).find(name => key.includes(name)) || Object.keys(serviceData).find(name => name.includes(key));
  };

  const style = document.createElement('style');
  style.textContent = `
    .service-fullscreen{position:fixed;inset:0;z-index:1000;display:none;padding:18px;background:rgba(2,3,7,.92);backdrop-filter:blur(14px);overflow:auto}
    .service-fullscreen.open{display:flex;align-items:center;justify-content:center}
    .service-fullscreen__card{position:relative;width:min(1480px,100%);min-height:min(860px,calc(100vh - 36px));display:grid;grid-template-columns:minmax(360px,.9fr) minmax(480px,1.1fr);overflow:hidden;background:linear-gradient(135deg,#0b1018 0%,#111722 52%,#080b10 100%);border:1px solid rgba(255,255,255,.18);border-radius:22px;box-shadow:0 35px 120px rgba(0,0,0,.8),inset 0 1px 0 rgba(255,255,255,.06)}
    .service-fullscreen__visual{position:relative;min-height:100%;background:#05070b;overflow:hidden}
    .service-fullscreen__visual:after{content:'';position:absolute;inset:auto 0 0;height:42%;background:linear-gradient(transparent,rgba(3,4,8,.95));pointer-events:none}
    .service-fullscreen__visual img{width:100%;height:100%;min-height:100%;object-fit:cover;display:block;filter:saturate(1.08) contrast(1.05)}
    .service-fullscreen__glow{position:absolute;inset:12% 12%;border-radius:50%;filter:blur(55px);opacity:.2;pointer-events:none}
    .service-fullscreen__content{position:relative;padding:clamp(34px,5vw,74px);overflow:auto;display:flex;flex-direction:column;justify-content:center}
    .service-fullscreen__eyebrow{font:800 10px/1 monospace;letter-spacing:.25em;color:#8b96a5;text-transform:uppercase;margin-bottom:16px}
    .service-fullscreen__title{font-size:clamp(38px,5vw,76px);line-height:.94;letter-spacing:-.055em;margin:0 0 22px;color:#fff}
    .service-fullscreen__accent{height:4px;width:110px;border-radius:99px;margin-bottom:25px;box-shadow:0 0 25px currentColor}
    .service-fullscreen__intro{max-width:760px;color:#c5ccd5;font-size:16px;line-height:1.75;margin:0 0 28px}
    .service-fullscreen__grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:4px 0 28px}
    .service-fullscreen__block{padding:18px;border:1px solid rgba(255,255,255,.11);border-radius:12px;background:rgba(255,255,255,.035)}
    .service-fullscreen__block h3{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#fff;margin:0 0 11px}
    .service-fullscreen__block p{font-size:12px;line-height:1.65;color:#aab4c0;margin:0}
    .service-fullscreen__list{padding:0;margin:0;list-style:none;display:grid;gap:9px}
    .service-fullscreen__list li{font-size:12px;line-height:1.5;color:#d3d8df;padding-left:20px;position:relative}
    .service-fullscreen__list li:before{content:'+';position:absolute;left:0;top:0;font-weight:900}
    .service-fullscreen__actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:4px}
    .service-fullscreen__action{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 20px;border-radius:7px;border:1px solid rgba(255,255,255,.18);font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.05em;color:#fff;background:#111720;cursor:pointer}
    .service-fullscreen__action.primary{border:0;color:#050507;background:linear-gradient(90deg,#00bfff,#5f9dff);box-shadow:0 10px 35px rgba(0,191,255,.2)}
    .service-fullscreen__close{position:absolute;z-index:3;right:18px;top:18px;width:46px;height:46px;border-radius:50%;border:1px solid rgba(255,255,255,.22);background:rgba(8,11,16,.8);color:#fff;font-size:25px;cursor:pointer;backdrop-filter:blur(8px)}
    .service-fullscreen__close:hover{transform:rotate(90deg);border-color:rgba(255,255,255,.5)}
    body.service-modal-open{overflow:hidden}
    .service-fullscreen__hint{position:absolute;left:28px;bottom:24px;z-index:2;font:700 9px/1 monospace;letter-spacing:.16em;color:rgba(255,255,255,.55);text-transform:uppercase}
    @media(max-width:900px){.service-fullscreen{padding:0}.service-fullscreen__card{min-height:100vh;border-radius:0;border:0;grid-template-columns:1fr;grid-template-rows:34vh auto}.service-fullscreen__visual{min-height:34vh}.service-fullscreen__visual img{min-height:34vh}.service-fullscreen__content{padding:30px 22px 38px;justify-content:flex-start}.service-fullscreen__title{font-size:clamp(34px,10vw,52px)}.service-fullscreen__intro{font-size:14px}.service-fullscreen__grid{grid-template-columns:1fr}.service-fullscreen__close{top:12px;right:12px}}
    @media(prefers-reduced-motion:reduce){.service-fullscreen__close{transition:none}}
  `;
  document.head.appendChild(style);

  const modal = document.createElement('div');
  modal.className = 'service-fullscreen';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML = '<div class="service-fullscreen__card"><button class="service-fullscreen__close" type="button" aria-label="Закрыть">×</button><div class="service-fullscreen__visual"><img alt=""><div class="service-fullscreen__glow"></div><div class="service-fullscreen__hint">ESC — закрыть</div></div><div class="service-fullscreen__content"></div></div>';
  document.body.appendChild(modal);

  const content = modal.querySelector('.service-fullscreen__content');
  const visual = modal.querySelector('.service-fullscreen__visual');
  const image = modal.querySelector('.service-fullscreen__visual img');
  const glow = modal.querySelector('.service-fullscreen__glow');
  const close = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('service-modal-open'); };

  const open = service => {
    const title = service.querySelector('h3')?.textContent?.trim() || 'Услуга';
    const key = findService(title);
    if (!key) return;
    const data = serviceData[key];
    const sourceImage = service.querySelector('.service-img')?.getAttribute('src') || data.image;
    image.src = sourceImage;
    image.alt = title;
    glow.style.background = data.accent;
    close.style.color = '#fff';
    content.innerHTML = `
      <div class="service-fullscreen__eyebrow">3D-ARTPRINT · УСЛУГА</div>
      <h2 class="service-fullscreen__title">${title}</h2>
      <div class="service-fullscreen__accent" style="background:${data.accent};color:${data.accent}"></div>
      <p class="service-fullscreen__intro">${data.intro}</p>
      <div class="service-fullscreen__grid">
        <div class="service-fullscreen__block"><h3>Что входит</h3><ul class="service-fullscreen__list">${data.items.map(item=>`<li>${item}</li>`).join('')}</ul></div>
        <div class="service-fullscreen__block"><h3>Подходит для</h3><p>${data.fits}</p><br><h3>Как работаем</h3><p>${data.process}</p></div>
      </div>
      <div class="service-fullscreen__actions"><a class="service-fullscreen__action primary" href="#order">Рассчитать / заказать →</a><button class="service-fullscreen__action" type="button" data-service-close>Вернуться к услугам</button></div>`;
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('service-modal-open');
  };

  document.addEventListener('click', event => {
    const service = event.target.closest('.service');
    if (!service || !document.querySelector('.service-grid')) return;
    if (event.target.closest('.service-fullscreen')) return;
    event.preventDefault();
    open(service);
  });
  modal.addEventListener('click', event => { if(event.target===modal || event.target.closest('.service-fullscreen__close') || event.target.closest('[data-service-close]')) close(); });
  document.addEventListener('keydown', event => { if(event.key==='Escape' && modal.classList.contains('open')) close(); });
})();

/* ============================================================
   3D-ARTPRINT: быстрый и нормальный поиск по каталогу
   ============================================================ */
(() => {
  if (!/\/catalog\.html$/i.test(location.pathname)) return;
  const input = document.getElementById('catalogSearchTop');
  const clear = document.getElementById('clearSearchTop');
  const grid = document.querySelector('.catalog-grid');
  const wrap = document.querySelector('.catalog-search-wrap');
  if (!input || !grid || !wrap) return;

  const style = document.createElement('style');
  style.textContent = `
    .product.catalog-search-hidden{display:none!important}
    .catalog-search-status{display:flex;justify-content:space-between;gap:15px;align-items:center;margin:8px 2px 12px;color:#667482;font-size:12px}
    .catalog-search-status strong{color:#111;font-weight:800}
    .catalog-search-empty{display:none;grid-column:1/-1;padding:55px 25px;text-align:center;border:1px dashed #c8d4df;border-radius:18px;background:#fff;color:#6f7c89}
    .catalog-search-empty.show{display:block}
    @media(max-width:760px){.catalog-search-status{font-size:11px}}
  `;
  document.head.appendChild(style);

  const status = document.createElement('div');
  status.className = 'catalog-search-status';
  status.innerHTML = '<span>Поиск по названию, авто, категории, автору и описанию</span><strong></strong>';
  wrap.after(status);
  const statusStrong = status.querySelector('strong');
  const empty = document.createElement('div');
  empty.className = 'catalog-search-empty';
  empty.textContent = 'По вашему запросу моделей не найдено. Попробуйте другое название, марку автомобиля или номер детали.';
  grid.appendChild(empty);

  const normalize = value => String(value || '').toLowerCase().replace(/ё/g,'е').replace(/[–—]/g,'-').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
  const tokens = value => normalize(value).split(/\s+/).filter(Boolean);
  const searchable = card => {
    const hrefs = [...card.querySelectorAll('a[href]')].map(a => a.getAttribute('href') || '').join(' ');
    return normalize(`${card.textContent} ${hrefs}`);
  };

  const run = () => {
    const query = normalize(input.value);
    const wanted = tokens(query);
    const cards = [...grid.querySelectorAll('.product')];
    let matches = 0;
    cards.forEach(card => {
      const haystack = searchable(card);
      const ok = !wanted.length || wanted.every(token => haystack.includes(token));
      card.classList.toggle('catalog-search-hidden', !ok);
      if(ok) matches++;
    });
    statusStrong.textContent = query ? `Найдено: ${matches}` : `Всего: ${cards.length}`;
    empty.classList.toggle('show', Boolean(query) && matches===0);
    clear.style.visibility = input.value ? 'visible' : 'hidden';
  };

  input.addEventListener('input', run);
  clear.addEventListener('click', () => { input.value=''; input.focus(); run(); });
  input.addEventListener('keydown', event => { if(event.key==='Escape'){input.value='';run();} });
  run();
})();
