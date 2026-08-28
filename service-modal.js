(() => {
  const services = {
    print:{accent:'#00bfff',title:'3D-ПЕЧАТЬ',image:'assets/3Dpechat 600х600.png',intro:'Изготавливаем функциональные детали, корпуса, крепления, прототипы, органайзеры и декоративные изделия на FDM-принтерах.',items:['PLA / PETG / ABS и другие материалы','Подбор цвета, заполнения и толщины стенок','Единичные детали и небольшие серии','Печать готовой модели или помощь с подготовкой файла'],fits:'Корпуса, крепления, автомобильные детали, органайзеры, прототипы и декоративные изделия.',process:'Получаем модель → проверяем геометрию → согласовываем параметры → печатаем → выполняем постобработку при необходимости.'},
    resin:{accent:'#5f9dff',title:'ФОТОПОЛИМЕР',image:'assets/fotopolimer.png',intro:'Высокоточная фотополимерная печать там, где особенно важны мелкие детали, гладкая поверхность и аккуратная геометрия.',items:['Высокая детализация мелких элементов','Гладкая поверхность после обработки','Миниатюры, мастер-модели и декоративные изделия','Подбор смолы под прочность и внешний вид'],fits:'Миниатюры, статуэтки, мастер-модели, корпуса и детали сложной геометрии.',process:'Проверяем модель → выбираем смолу и ориентацию → печатаем → промываем и засвечиваем → выполняем финишную обработку.'},
    cnc:{accent:'#ff087d',title:'ЧПУ-ФРЕЗЕРОВКА',image:'assets/chpu.png',intro:'Фрезеровка и гравировка по вашему чертежу, эскизу или готовому цифровому файлу.',items:['Дерево, пластик, композиты и подходящие металлы','Раскрой, карманы, отверстия и гравировка','Подготовка файла и согласование результата','Подбор инструмента и режимов под материал'],fits:'Панели, таблички, декоративные элементы, проставки, корпуса и технические детали.',process:'Получаем чертёж или модель → готовим программу → согласовываем материал → выполняем обработку → проверяем результат.'},
    canvas:{accent:'#ffd400',title:'ХУДОЖЕСТВЕННАЯ МАСТЕРСКАЯ',image:'assets/risovanie.png',intro:'Создаём картины и авторские работы по вашему эскизу, фотографии, референсу или собственной идее.',items:['Картины и авторские работы на заказ','Портреты, пейзажи и декоративные композиции','Выбор формата, палитры и стилистики','Работы для интерьера, подарка или памятного события'],fits:'Дом, офис, подарок, интерьерные композиции, памятные и авторские работы.',process:'Обсуждаем идею → согласовываем эскиз и стиль → выполняем работу → показываем результат → подготавливаем к передаче.'},
    air:{accent:'#a45cff',title:'АЭРОГРАФИЯ',image:'assets/Airografia600х600.png',intro:'Индивидуальная аэрография для автомобилей, мотоциклов, шлемов, деталей и других подходящих поверхностей.',items:['Разработка дизайна под конкретный объект','Яркие многослойные композиции и плавные переходы','Аэрография авто, мото, шлемов и отдельных элементов','Защитное финишное покрытие по задаче'],fits:'Автомобили, мотоциклы, шлемы, панели, элементы интерьера и другие поверхности.',process:'Осматриваем поверхность → обсуждаем идею → готовим эскиз → выполняем роспись → наносим защитный финиш при необходимости.'},
    souvenir:{accent:'#ff8a00',title:'СУВЕНИРНАЯ ПРОДУКЦИЯ',image:'assets/suvenirka.png',intro:'Изготавливаем персонализированные подарки и сувенирную продукцию с вашим изображением, логотипом или дизайном.',items:['Кружки и другая сувенирная продукция','Футболки и текстиль с индивидуальным дизайном','Подарки для друзей, мероприятий и компаний','Подготовка макета под выбранный формат изделия'],fits:'Подарки, корпоративная продукция, памятные сувениры и брендированные изделия.',process:'Выбираем изделие → получаем дизайн → проверяем макет → изготавливаем → проверяем качество и упаковываем.'}
  };

  function renameCanvasService(){
    document.querySelectorAll('.service.s4 h3').forEach(el=>el.textContent='ХУДОЖЕСТВЕННАЯ МАСТЕРСКАЯ');
    document.querySelectorAll('.service.s4 .service-img').forEach(el=>el.alt='Художественная мастерская');
    const option=document.querySelector('#calcService option[value="canvas"]');
    if(option) option.textContent='Художественная мастерская';
  }

  const serviceKey = el => {
    const title = (el.querySelector('h3')?.textContent || '').toLowerCase().replace(/ё/g,'е');
    if(title.includes('3d-печать')) return 'print';
    if(title.includes('фотополимер')) return 'resin';
    if(title.includes('чпу')) return 'cnc';
    if(title.includes('художественная мастерская') || title.includes('холст')) return 'canvas';
    if(title.includes('аэрограф')) return 'air';
    if(title.includes('сувенир')) return 'souvenir';
    return null;
  };

  const css = document.createElement('style');
  css.textContent = `
    .service{display:flex!important;flex-direction:column!important}
    .service-img{display:block!important;width:calc(100% - 18px)!important;height:auto!important;aspect-ratio:1/1!important;object-fit:contain!important;padding:9px!important;margin:9px auto 0!important;border-radius:9px!important;background:rgba(255,255,255,.025)!important;box-sizing:border-box!important}
    .service-body{flex:1!important}
    .service.s4 h3{font-size:12px!important;line-height:1.08!important}
    @media(max-width:760px){.service-img{width:calc(100% - 12px)!important;padding:6px!important;margin:6px auto 0!important}.service.s4 h3{font-size:11px!important}}

    .service-fullscreen{position:fixed!important;inset:0!important;z-index:99999!important;display:none!important;padding:0!important;background:rgba(2,3,7,.96)!important;backdrop-filter:blur(16px)!important;overflow:auto!important}
    .service-fullscreen.open{display:block!important}
    .service-fullscreen__card{position:relative!important;width:100vw!important;min-height:100dvh!important;display:grid!important;grid-template-columns:minmax(380px,.82fr) minmax(500px,1.18fr)!important;overflow:hidden!important;background:radial-gradient(circle at 82% 18%,rgba(0,191,255,.12),transparent 30%),radial-gradient(circle at 12% 82%,rgba(255,8,125,.10),transparent 28%),linear-gradient(145deg,#090d14,#111722 52%,#07090e)!important;border:0!important;border-radius:0!important;box-shadow:none!important}
    .service-fullscreen__visual{position:relative!important;min-height:100dvh!important;height:100%!important;background:#05070b!important;overflow:hidden!important}
    .service-fullscreen__visual img{width:100%!important;height:100%!important;min-height:100%!important;object-fit:cover!important;display:block!important;filter:saturate(1.08) contrast(1.05)!important}
    .service-fullscreen__visual:after{content:'';position:absolute;inset:auto 0 0;height:45%;background:linear-gradient(transparent,rgba(3,4,8,.96))!important;pointer-events:none!important}
    .service-fullscreen__glow{position:absolute!important;inset:12%!important;border-radius:50%!important;filter:blur(60px)!important;opacity:.2!important;pointer-events:none!important}
    .service-fullscreen__content{position:relative!important;padding:clamp(40px,5vw,82px)!important;overflow:auto!important;display:flex!important;flex-direction:column!important;justify-content:center!important;min-width:0!important}
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
    @media(max-width:900px){.service-fullscreen__card{display:flex!important;flex-direction:column!important;min-height:100dvh!important;height:auto!important;overflow:auto!important}.service-fullscreen__visual{height:34vh!important;min-height:34vh!important;flex:0 0 34vh!important}.service-fullscreen__visual img{min-height:34vh!important}.service-fullscreen__content{padding:30px 22px 38px!important;justify-content:flex-start!important}.service-fullscreen__title{font-size:clamp(36px,10vw,56px)!important}.service-fullscreen__intro{font-size:14px!important}.service-fullscreen__grid{grid-template-columns:1fr!important}.service-fullscreen__action{width:100%!important}.service-fullscreen__close{right:12px!important;top:12px!important}}
  `;
  document.head.appendChild(css);
  renameCanvasService();

  const modal = document.createElement('div');
  modal.className='service-fullscreen';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML='<div class="service-fullscreen__card"><button class="service-fullscreen__close" type="button" aria-label="Закрыть">×</button><div class="service-fullscreen__visual"><img alt=""><div class="service-fullscreen__glow"></div></div><div class="service-fullscreen__content"></div></div>';
  document.body.appendChild(modal);
  const visualImg=modal.querySelector('.service-fullscreen__visual img');
  const glow=modal.querySelector('.service-fullscreen__glow');
  const content=modal.querySelector('.service-fullscreen__content');
  let activeKey='print';
  const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('service-modal-open')};
  const open=card=>{const key=serviceKey(card);if(!key)return;activeKey=key;const d=services[key];visualImg.src=card.querySelector('.service-img')?.src||d.image;visualImg.alt=d.title;glow.style.background=d.accent;content.innerHTML=`<div class="service-fullscreen__eyebrow">3D-ARTPRINT · УСЛУГА</div><h2 class="service-fullscreen__title">${d.title}</h2><div class="service-fullscreen__accent" style="background:${d.accent};color:${d.accent}"></div><p class="service-fullscreen__intro">${d.intro}</p><div class="service-fullscreen__grid"><div class="service-fullscreen__block"><h3>Что входит</h3><ul class="service-fullscreen__list">${d.items.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="service-fullscreen__block"><h3>Подходит для</h3><p>${d.fits}</p><br><h3>Как работаем</h3><p>${d.process}</p></div></div><div class="service-fullscreen__actions"><a class="service-fullscreen__action primary" href="#order">ЗАКАЗАТЬ УСЛУГУ →</a><button class="service-fullscreen__action" type="button" data-service-close>НАЗАД К УСЛУГАМ</button></div>`;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('service-modal-open')};
  document.addEventListener('click',e=>{if(e.target.closest('.service-fullscreen'))return;const button=e.target.closest('[data-open-service]');if(button){const card=button.closest('.service');if(card){e.preventDefault();e.stopPropagation();open(card)}return;}const card=e.target.closest('.service');if(card){e.preventDefault();e.stopPropagation();open(card)}},true);
  modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('.service-fullscreen__close')||e.target.closest('[data-service-close]'))close();if(e.target.closest('.service-fullscreen__action.primary'))close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))close()});
})();
