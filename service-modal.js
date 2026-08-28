(() => {
  const services = {
    print:{accent:'#00bfff',title:'3D-ПЕЧАТЬ',image:'assets/3Dpechat 600х600.png',intro:'Изготавливаем функциональные детали, корпуса, крепления, прототипы, органайзеры и декоративные изделия на FDM-принтерах.',items:['PLA / PETG / ABS и другие материалы','Подбор цвета, заполнения и толщины стенок','Единичные детали и небольшие серии','Печать готовой модели или помощь с подготовкой файла'],fits:'Корпуса, крепления, автомобильные детали, органайзеры, прототипы и декоративные изделия.',process:'Получаем модель → проверяем геометрию → согласовываем параметры → печатаем → выполняем постобработку при необходимости.'},
    resin:{accent:'#5f9dff',title:'ФОТОПОЛИМЕР',image:'assets/fotopolimer.png',intro:'Высокоточная фотополимерная печать там, где особенно важны мелкие детали, гладкая поверхность и аккуратная геометрия.',items:['Высокая детализация мелких элементов','Гладкая поверхность после обработки','Миниатюры, мастер-модели и декоративные изделия','Подбор смолы под прочность и внешний вид'],fits:'Миниатюры, статуэтки, мастер-модели, корпуса и детали сложной геометрии.',process:'Проверяем модель → выбираем смолу и ориентацию → печатаем → промываем и засвечиваем → выполняем финишную обработку.'},
    cnc:{accent:'#ff087d',title:'ЧПУ-ФРЕЗЕРОВКА',image:'assets/chpu.png',intro:'Фрезеровка и гравировка по вашему чертежу, эскизу или готовому цифровому файлу.',items:['Дерево, пластик, композиты и подходящие металлы','Раскрой, карманы, отверстия и гравировка','Подготовка файла и согласование результата','Подбор инструмента и режимов под материал'],fits:'Панели, таблички, декоративные элементы, проставки, корпуса и технические детали.',process:'Получаем чертёж или модель → готовим программу → согласовываем материал → выполняем обработку → проверяем результат.'},
    canvas:{accent:'#ffd400',title:'ХУДОЖЕСТВЕННАЯ МАСТЕРСКАЯ',image:'assets/risovanie.png',intro:'Создаём картины и авторские работы по вашему эскизу, фотографии, референсу или собственной идее.',items:['Картины и авторские работы на заказ','Портреты, пейзажи и декоративные композиции','Выбор формата, палитры и стилистики','Работы для интерьера, подарка или памятного события'],fits:'Дом, офис, подарок, интерьерные композиции, памятные и авторские работы.',process:'Обсуждаем идею → согласовываем эскиз и стиль → выполняем работу → показываем результат → подготавливаем к передаче.'},
    air:{accent:'#a45cff',title:'АЭРОГРАФИЯ',image:'assets/Airografia600х600.png',intro:'Индивидуальная аэрография для автомобилей, мотоциклов, шлемов, деталей и других подходящих поверхностей.',items:['Разработка дизайна под конкретный объект','Яркие многослойные композиции и плавные переходы','Аэрография авто, мото, шлемов и отдельных элементов','Защитное финишное покрытие по задаче'],fits:'Автомобили, мотоциклы, шлемы, панели, элементы интерьера и другие поверхности.',process:'Осматриваем поверхность → обсуждаем идею → готовим эскиз → выполняем роспись → наносим защитный финиш при необходимости.'},
    souvenir:{accent:'#ff8a00',title:'СУВЕНИРНАЯ ПРОДУКЦИЯ',image:'assets/suvenirka.png',intro:'Изготавливаем персонализированные подарки и сувенирную продукцию с вашим изображением, логотипом или дизайном.',items:['Кружки и другая сувенирная продукция','Футболки и текстиль с индивидуальным дизайном','Подарки для друзей, мероприятий и компаний','Подготовка макета под выбранный формат изделия'],fits:'Подарки, корпоративная продукция, памятные сувениры и брендированные изделия.',process:'Выбираем изделие → получаем дизайн → проверяем макет → изготавливаем → проверяем качество и упаковываем.'}
  };

  const esc = value => String(value).replace(/[&<>\\"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','\\':'&#92;','"':'&quot;'}[ch]));

  function renameCanvasService(){
    document.querySelectorAll('.service.s4 h3').forEach(el=>el.textContent='ХУДОЖЕСТВЕННАЯ МАСТЕРСКАЯ');
    document.querySelectorAll('.service.s4 .service-img').forEach(el=>el.alt='Художественная мастерская');
    const option=document.querySelector('#calcService option[value="canvas"]');
    if(option) option.textContent='Художественная мастерская';
  }

  const serviceKey = el => {
    const title=(el.querySelector('h3')?.textContent||'').toLowerCase().replace(/ё/g,'е');
    if(title.includes('3d-печать')) return 'print';
    if(title.includes('фотополимер')) return 'resin';
    if(title.includes('чпу')) return 'cnc';
    if(title.includes('художественная мастерская')||title.includes('холст')) return 'canvas';
    if(title.includes('аэрограф')) return 'air';
    if(title.includes('сувенир')) return 'souvenir';
    return null;
  };

  const css=document.createElement('style');
  css.textContent=`
    /* Карточки услуг: компактное изображение с отступами, без отдельного фона. */
    .service{display:flex!important;flex-direction:column!important;overflow:hidden!important;position:relative!important}
    .service-img{display:block!important;width:74%!important;max-width:74%!important;height:auto!important;aspect-ratio:1/1!important;object-fit:contain!important;padding:0!important;margin:18px auto 10px!important;border:0!important;border-radius:10px!important;background:transparent!important;box-sizing:border-box!important;transform:none!important;will-change:transform!important}
    .service-body{flex:1!important;transform:none!important}
    .service:hover .service-img{transform:scale(1.02)!important;filter:saturate(1.08) brightness(1.04)!important}
    .service.s4 h3{font-size:12px!important;line-height:1.08!important}

    /* Полноэкранная карточка: без вылета картинки и без отдельного фона под ней. */
    .service-fullscreen{position:fixed!important;inset:0!important;z-index:99999!important;display:block!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;padding:0!important;background:rgba(2,3,7,.96)!important;backdrop-filter:blur(18px)!important;overflow:auto!important;transition:opacity .28s ease,visibility .28s ease!important}
    .service-fullscreen.open{visibility:visible!important;opacity:1!important;pointer-events:auto!important}
    .service-fullscreen__card{position:relative!important;width:100vw!important;min-height:100dvh!important;display:grid!important;grid-template-columns:minmax(380px,.82fr) minmax(500px,1.18fr)!important;overflow:hidden!important;background:radial-gradient(circle at 82% 18%,rgba(0,191,255,.12),transparent 30%),radial-gradient(circle at 12% 82%,rgba(255,8,125,.10),transparent 28%),linear-gradient(145deg,#090d14,#111722 52%,#07090e)!important}
    .service-fullscreen__visual{position:relative!important;min-height:100dvh!important;height:100%!important;background:transparent!important;overflow:hidden!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:clamp(28px,5vw,72px)!important}
    .service-fullscreen__visual:after{display:none!important}
    .service-fullscreen__visual img{display:block!important;width:min(82%,760px)!important;height:min(82vh,760px)!important;min-height:0!important;object-fit:contain!important;object-position:center!important;background:transparent!important;border:0!important;border-radius:0!important;filter:drop-shadow(0 28px 45px rgba(0,0,0,.55)) saturate(1.06) contrast(1.04)!important;opacity:0!important;transform:scale(.985)!important;transition:opacity .25s ease,transform .25s ease!important}
    .service-fullscreen__visual.ready img{opacity:1!important;transform:scale(1)!important}
    .service-fullscreen__glow{position:absolute!important;width:58%!important;aspect-ratio:1!important;left:21%!important;top:20%!important;border-radius:50%!important;filter:blur(90px)!important;opacity:.12!important;pointer-events:none!important}
    .service-fullscreen__content{position:relative!important;padding:clamp(40px,5vw,82px)!important;overflow:auto!important;display:flex!important;flex-direction:column!important;justify-content:center!important;min-width:0!important;opacity:0!important;transform:translateY(10px)!important;transition:opacity .28s ease .04s,transform .28s ease .04s!important}
    .service-fullscreen.open .service-fullscreen__content{opacity:1!important;transform:translateY(0)!important}
    .service-fullscreen__eyebrow{font:800 10px/1 monospace!important;letter-spacing:.25em!important;color:#8b96a5!important;text-transform:uppercase!important;margin-bottom:16px!important}
    .service-fullscreen__title{font-size:clamp(44px,5.2vw,84px)!important;line-height:.94!important;letter-spacing:-.055em!important;margin:0 65px 22px 0!important;color:#fff!important}
    .service-fullscreen__accent{height:5px!important;width:115px!important;border-radius:99px!important;margin-bottom:27px!important;box-shadow:0 0 25px currentColor!important}
    .service-fullscreen__intro{max-width:820px!important;color:#d2d9e2!important;font-size:clamp(16px,1.35vw,21px)!important;line-height:1.7!important;margin:0 0 30px!important}
    .service-fullscreen__grid{display:grid!important;grid-template-columns:1fr 1fr!important;gap:14px!important;margin:4px 0 30px!important}
    .service-fullscreen__block{padding:20px!important;border:1px solid rgba(255,255,255,.13)!important;border-radius:14px!important;background:rgba(255,255,255,.045)!important}
    .service-fullscreen__block h3{font-size:11px!important;letter-spacing:.14em!important;text-transform:uppercase!important;color:#fff!important;margin:0 0 12px!important}
    .service-fullscreen__block p{font-size:12px!important;line-height:1.65!important;color:#b9c3ce!important;margin:0!important}
    .service-fullscreen__list{padding:0!important;margin:0!important;list-style:none!important;display:grid!important;gap:10px!important}
    .service-fullscreen__list li{font-size:12px!important;line-height:1.5!important;color:#e1e5ea!important;padding-left:20px!important;position:relative!important}
    .service-fullscreen__list li:before{content:'+'!important;position:absolute!important;left:0!important;top:0!important;font-weight:900!important}
    .service-fullscreen__actions{display:flex!important;gap:12px!important;flex-wrap:wrap!important;margin-top:4px!important}
    .service-fullscreen__action{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:50px!important;padding:0 22px!important;border-radius:8px!important;border:1px solid rgba(255,255,255,.2)!important;font-size:11px!important;font-weight:900!important;text-transform:uppercase!important;letter-spacing:.05em!important;color:#fff!important;background:#111720!important;cursor:pointer!important}
    .service-fullscreen__action.primary{border:0!important;color:#050507!important;background:linear-gradient(90deg,#00bfff,#176cff)!important;box-shadow:0 12px 35px rgba(0,191,255,.2)!important}
    .service-fullscreen__close{position:absolute!important;z-index:10!important;right:28px!important;top:24px!important;width:48px!important;height:48px!important;border-radius:12px!important;border:1px solid rgba(255,255,255,.25)!important;background:rgba(8,11,16,.82)!important;color:#fff!important;font-size:27px!important;cursor:pointer!important;backdrop-filter:blur(8px)!important}
    body.service-modal-open{overflow:hidden!important}

    @media(max-width:900px){
      .service-img{width:78%!important;max-width:78%!important;margin:13px auto 7px!important}
      .service-fullscreen__card{display:flex!important;flex-direction:column!important;min-height:100dvh!important;height:auto!important;overflow:auto!important}
      .service-fullscreen__visual{height:37vh!important;min-height:37vh!important;flex:0 0 37vh!important;padding:20px!important}
      .service-fullscreen__visual img{width:min(72%,430px)!important;height:min(34vh,430px)!important}
      .service-fullscreen__content{padding:30px 22px 38px!important;justify-content:flex-start!important}
      .service-fullscreen__title{font-size:clamp(36px,10vw,56px)!important}
      .service-fullscreen__intro{font-size:14px!important}
      .service-fullscreen__grid{grid-template-columns:1fr!important}
      .service-fullscreen__action{width:100%!important}
      .service-fullscreen__close{right:12px!important;top:12px!important}
    }
    @media(prefers-reduced-motion:reduce){
      .service-fullscreen,.service-fullscreen__visual img,.service-fullscreen__content{transition:none!important}
    }
  `;
  document.head.appendChild(css);
  renameCanvasService();

  const modal=document.createElement('div');
  modal.className='service-fullscreen';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML='<div class="service-fullscreen__card"><button class="service-fullscreen__close" type="button" aria-label="Закрыть">×</button><div class="service-fullscreen__visual"><img alt=""><div class="service-fullscreen__glow"></div></div><div class="service-fullscreen__content"></div></div>';
  document.body.appendChild(modal);

  const visual=modal.querySelector('.service-fullscreen__visual');
  const visualImg=visual.querySelector('img');
  const glow=modal.querySelector('.service-fullscreen__glow');
  const content=modal.querySelector('.service-fullscreen__content');
  let active={card:null,source:null,key:null};

  function setContent(d){
    content.innerHTML=`<div class="service-fullscreen__eyebrow">3D-ARTPRINT · УСЛУГА</div><h2 class="service-fullscreen__title">${esc(d.title)}</h2><div class="service-fullscreen__accent" style="background:${d.accent};color:${d.accent}"></div><p class="service-fullscreen__intro">${esc(d.intro)}</p><div class="service-fullscreen__grid"><div class="service-fullscreen__block"><h3>Что входит</h3><ul class="service-fullscreen__list">${d.items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="service-fullscreen__block"><h3>Подходит для</h3><p>${esc(d.fits)}</p><br><h3>Как работаем</h3><p>${esc(d.process)}</p></div></div><div class="service-fullscreen__actions"><a class="service-fullscreen__action primary" href="#order">ЗАКАЗАТЬ УСЛУГУ →</a><button class="service-fullscreen__action" type="button" data-service-close>НАЗАД К УСЛУГАМ</button></div>`;
    const order=content.querySelector('.primary');
    order.addEventListener('click',()=>{closeModal();setTimeout(()=>document.querySelector('#order')?.scrollIntoView({behavior:'smooth'}),260)});
  }

  function openModal(card){
    if(modal.classList.contains('open')) return;
    const key=serviceKey(card); if(!key) return;
    const source=card.querySelector('.service-img'); if(!source) return;
    const d=services[key];
    active={card,source,key};
    visualImg.classList.remove('ready');
    visualImg.src=source.currentSrc||source.src||d.image;
    visualImg.alt=d.title;
    glow.style.background=d.accent;
    setContent(d);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('service-modal-open');

    const showImage=()=>requestAnimationFrame(()=>visual.classList.add('ready'));
    if(visualImg.complete) showImage();
    else visualImg.addEventListener('load',showImage,{once:true});
  }

  function closeModal(){
    if(!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('service-modal-open');
    setTimeout(()=>{
      visual.classList.remove('ready');
      visualImg.removeAttribute('src');
      active={card:null,source:null,key:null};
    },300);
  }

  document.addEventListener('click',e=>{
    const closeButton=e.target.closest('[data-service-close],.service-fullscreen__close');
    if(closeButton){e.preventDefault();e.stopPropagation();closeModal();return;}
    if(e.target===modal){closeModal();return;}
    if(modal.classList.contains('open') && e.target.closest('.service-fullscreen__content')) return;
    const trigger=e.target.closest('[data-open-service]');
    const card=trigger?.closest('.service')||e.target.closest('.service');
    if(card){e.preventDefault();e.stopPropagation();openModal(card);}
  },true);

  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open')){e.preventDefault();closeModal();}});

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',renameCanvasService,{once:true});
})();