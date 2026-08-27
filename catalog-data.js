/* Каталог готовых моделей. Источник моделей — 3DToday; данные об авторах/лицензиях указываются только после проверки страницы конкретной модели. */
(() => {
  const models = [
    ['2110 — Центр сопло печки — маунт под планшет Lenovo (251,2×158,8×75)','auto','FDM · ZIP'],['2114 13 15 — Ремонтный комплект бардачка','auto','FDM · ZIP'],['Geely Coolray A3 — органайзер в подлокотник','auto','FDM · ZIP'],['Great Wall Wingle 5 — крепление двери багажника','auto','FDM · ZIP'],['Haval H3 — органайзеры в ниши багажника','auto','FDM · ZIP'],['Hover H3 — лапка открытия капота, усиленная','auto','FDM · ZIP'],['Kia Ceed — фиксатор заднего сидения','auto','FDM · ZIP'],['Solaris 2 TS-1639R — проставки задних колонок','auto','FDM · ZIP'],['Toyota Mark 2 90 — накладка ручки двери','auto','FDM · ZIP'],['Гриль для 16 динамика','tech','FDM · ZIP'],['Заглушка отверстия для разблокировки АКПП Mitsubishi Outlander III рест.','auto','FDM · ZIP'],['Заглушка стоек BMW E39','auto','FDM · ZIP'],['Защёлка подлокотника Great Wall Hover H5','auto','FDM · ZIP'],['Защёлка подлокотника Lacetty','auto','FDM · ZIP'],['ЗИП для стеклоподъёмника Renault Scenic 1999–2003','auto','FDM · ZIP'],['3ч для селектора Suzuki Wagon R+ / Solio 2001','auto','FDM · ZIP'],['Клипса направляющей шторки Mercedes Vito','auto','FDM · ZIP'],['Контейнеры подстаканников центральной консоли Haval H3 (CoolDog) 2024','auto','FDM · ZIP'],['Направляющая сдвижной двери Honda Stepwgn RP3','auto','FDM · ZIP'],['Парктроник Porsche Macan','auto','FDM · ZIP'],['Планка дефлектора Lada Vesta','auto','FDM · ZIP'],['Подстаканники центральной консоли Haval H3 (CoolDog) 2024','auto','FDM · ZIP'],['Проставки перед Hyundai Solaris HCR под колонки Pioneer TS-1339R','auto','FDM · ZIP'],['Ручка-защёлка подлокотника Mitsubishi Outlander 3','auto','FDM · ZIP'],['Сетка для динамика Renault Laguna II','tech','FDM · ZIP'],['Клипса бампера Corolla E100–E104','auto','FDM · 3MF'],['Шестерня редуктора люка Toyota Mark II JZX90 Vista SV32','auto','FDM · 3MF'],['Штуцер трубки омывателя','auto','FDM · 3MF'],['Great Wall Wingle 5 — ручка бардачка','auto','FDM · STL'],['Nissan Maxima A32 — втулка кулисы КПП','auto','FDM · STL'],['Subaru Impreza — подрулевой элемент для сигнала','auto','FDM · STL'],['Водосток для Ford Fiesta MK5','auto','FDM · STL'],['Декоративный ободок селектора Nissan Qashqai J10','auto','FDM · STL'],['Держатель полки Nissan Qashqai J10','auto','FDM · STL'],['Держатель щупа Kia Spectra','auto','FDM · STL'],['Заглушка амортизатора Mazda','auto','FDM · STL'],['Защёлка дворника Pinch-Tab','auto','FDM · STL'],['Каска на фаркоп','auto','FDM · STL'],['Клипса держатель упора капота ВАЗ-1118 / 1119 / 1117 / Lada Kalina / ВАЗ-2123 / Нива / Chevrolet Travel','auto','FDM · STL'],['Клипса для Avto Seat Aceta','auto','FDM · STL'],['Клипса молдинга Lancer 9 / Lancer Cedia','auto','FDM · STL'],['Крепление датчика MNX XNT Humminbird','tech','FDM · STL'],['Кронштейн воздухозаборника Toyota','auto','FDM · STL'],['Кронштейн Nissan Авенир','auto','FDM · STL'],['Кронштейн троса отопителя Chevrolet Lacetti','auto','FDM · STL'],['Пин для уплотнителей Гранта','auto','FDM · STL'],['Приборная панель на Volkswagen Golf 4','auto','FDM · STL'],['Рамка, держатель зеркала Mitsubishi Galant 8','auto','FDM · STL'],['Ремкомплект ресничек BMW E39','auto','FDM · STL'],['Скан 2110 — центральное сопло печки торпеды','auto','FDM · STL']
  ];
  const grid = document.querySelector('.catalog-grid');
  const filters = document.querySelector('.filters');
  if (!grid || !filters) return;

  const modelClass = name => { const n=name.toLowerCase(); if(n.includes('шестер')||n.includes('редукт'))return'model-gear'; if(n.includes('клипс')||n.includes('защёл')||n.includes('защел'))return'model-clip'; if(n.includes('ручк'))return'model-handle'; if(n.includes('кронштейн')||n.includes('креплен')||n.includes('держател'))return'model-bracket'; if(n.includes('сетка')||n.includes('гриль'))return'model-grille'; if(n.includes('органайзер')||n.includes('контейнер')||n.includes('подстакан'))return'model-box'; if(n.includes('датчик')||n.includes('парктроник')||n.includes('электрон'))return'model-tech'; return'model-part'; };

  const sourceUrl = 'https://3dtoday.ru/3d-models';
  grid.innerHTML = models.map(([name,cat,meta],i)=>`<article class="product" data-cat="${cat}"><div class="product-image placeholder model-placeholder ${modelClass(name)}"><div class="model-stage"><div class="model-object"></div><div class="model-gridline"></div><span class="model-axis">X&nbsp;&nbsp;&nbsp;Y&nbsp;&nbsp;&nbsp;Z</span></div><div class="model-label"><b>${cat==='auto'?'AUTO':'TECH'}</b><small>3D PREVIEW ${String(i+1).padStart(2,'0')}</small></div></div><div class="product-info"><span>${cat==='auto'?'Авто':'Электроника'} · ${meta}</span><h3>${name}</h3><div class="model-credit"><small>Источник: 3DToday</small><small>Автор: указать после проверки</small><small>Лицензия: проверить на странице модели</small></div><div class="model-actions"><a href="${sourceUrl}" target="_blank" rel="noopener noreferrer">3DToday →</a><b>Рассчитать стоимость →</b></div></div></article>`).join('');

  /* Информационная плашка: каталог не выдаёт сторонние модели за собственные. */
  const note = document.createElement('div');
  note.className = 'catalog-attribution';
  note.innerHTML = '<strong>Источник моделей — 3DToday.</strong><span>Автор и условия лицензии каждой конкретной модели должны быть проверены перед коммерческим изготовлением.</span><a href="https://3dtoday.ru/3d-models" target="_blank" rel="noopener noreferrer">Открыть каталог 3DToday →</a>';
  filters.parentNode.insertBefore(note, grid);

  const buttons=filters.querySelectorAll('button');
  const apply=filter=>grid.querySelectorAll('.product').forEach(p=>p.style.display=filter==='all'||p.dataset.cat===filter?'':'none');
  buttons.forEach(button=>button.onclick=()=>{buttons.forEach(b=>b.classList.remove('active'));button.classList.add('active');apply(button.dataset.filter);});
  apply('all');

  const layoutStyle=document.createElement('style');
  layoutStyle.textContent=`
    .catalog-attribution{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;margin:0 0 24px;padding:14px 16px;border:1px solid #cbd9e8;border-radius:12px;background:#fff;font-size:11px;color:#687587}
    .catalog-attribution strong{color:#171719}.catalog-attribution a{color:#008fc8;font-weight:800;white-space:nowrap}
    .model-credit{display:grid;gap:3px;margin:10px 0 12px;padding:9px 10px;border-left:2px solid #079bd7;background:#f5f9fc;color:#778599}
    .model-credit small{font-size:9px;line-height:1.3}.model-credit small:first-child{color:#008fc8;font-weight:800}
    .model-actions{display:flex;align-items:center;justify-content:space-between;gap:10px}.model-actions a{font-size:10px;color:#008fc8;font-weight:800}.model-actions b{font-size:10px}
    .equipment-list{grid-template-columns:repeat(3,minmax(0,1fr))!important;align-items:stretch}
    .equipment-card{display:flex!important;align-items:center;gap:14px;min-width:0}.equipment-card .number{flex:0 0 auto;min-width:38px}.equipment-card .equip-icon{flex:0 0 66px!important;margin:0 4px 0 0!important}.equipment-card>div:last-child{min-width:0}
    @media(max-width:850px){.equipment-list{grid-template-columns:1fr!important}.equipment-card{display:flex!important}.catalog-attribution{grid-template-columns:1fr}.catalog-attribution a{white-space:normal}}
  `;
  document.head.appendChild(layoutStyle);
})();
