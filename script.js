const filterButtons = document.querySelectorAll('.filters button');
const products = document.querySelectorAll('.product');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    products.forEach(product => {
      product.style.display = filter === 'all' || product.dataset.cat === filter ? '' : 'none';
    });
  });
});

document.getElementById('order-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('form-note').textContent = 'Заявка подготовлена. Подключим Telegram/почту для реальной отправки.';
});

/* Интерактивный технический фон: за курсором появляются элементы чертежа. */
(() => {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const style = document.createElement('style');
  style.textContent = `
    .cursor-tech-layer{position:fixed;inset:0;pointer-events:none;z-index:20;overflow:hidden}
    .cursor-tech-square{position:absolute;width:10px;height:10px;border:1px solid #079bd7;opacity:0;transform:translate(-50%,-50%) scale(.55);animation:techSquare 1.35s cubic-bezier(.2,.7,.2,1) forwards}
    .cursor-tech-square:before,.cursor-tech-square:after{content:"";position:absolute;background:#079bd7;opacity:.5}.cursor-tech-square:before{width:22px;height:1px;left:50%;top:50%;transform:translate(-50%,-50%)}.cursor-tech-square:after{width:1px;height:22px;left:50%;top:50%;transform:translate(-50%,-50%)}
    .cursor-tech-dot{position:absolute;width:4px;height:4px;border-radius:50%;background:#e6007e;opacity:0;transform:translate(-50%,-50%);animation:techDot 900ms ease-out forwards}
    .cursor-tech-label{position:absolute;font:700 8px/1 monospace;letter-spacing:.08em;color:#008fc8;opacity:0;transform:translate(10px,8px);animation:techLabel 1.2s ease-out forwards}
    @keyframes techSquare{0%{opacity:0;transform:translate(-50%,-50%) scale(.55)}18%{opacity:.7}100%{opacity:0;transform:translate(-50%,-50%) scale(1.8) rotate(12deg)}}
    @keyframes techDot{0%{opacity:0;transform:translate(-50%,-50%) scale(.4)}25%{opacity:.85}100%{opacity:0;transform:translate(-50%,-50%) scale(1.8)}}
    @keyframes techLabel{0%{opacity:0;transform:translate(10px,8px)}20%{opacity:.55}100%{opacity:0;transform:translate(15px,-12px)}}
  `;
  document.head.appendChild(style);
  const layer = document.createElement('div'); layer.className='cursor-tech-layer'; document.body.appendChild(layer);
  let last=0,count=0; const labels=['R20','Ø48','A-01','SECTION','3D','SCALE 1:2'];
  window.addEventListener('pointermove',(event)=>{
    const now=performance.now(); if(now-last<75)return; last=now;
    const square=document.createElement('span'); square.className='cursor-tech-square'; square.style.left=`${event.clientX}px`; square.style.top=`${event.clientY}px`; layer.appendChild(square);
    if(count++%3===0){const dot=document.createElement('span');dot.className='cursor-tech-dot';dot.style.left=`${event.clientX+(Math.random()*34-17)}px`;dot.style.top=`${event.clientY+(Math.random()*34-17)}px`;layer.appendChild(dot)}
    if(count%7===0){const label=document.createElement('span');label.className='cursor-tech-label';label.textContent=labels[Math.floor(Math.random()*labels.length)];label.style.left=`${event.clientX}px`;label.style.top=`${event.clientY}px`;layer.appendChild(label)}
    if(layer.children.length>55)layer.firstElementChild.remove();
  });
})();

/* Индикатор печати синхронизирован с 8-секундным циклом анимации логотипа. */
(() => {
  const progress = document.querySelector('.progress-value');
  const layer = document.querySelector('.layer-value');
  if (!progress || !layer) return;
  const cycle = 8000;
  const start = performance.now();
  const tick = (now) => {
    const t = ((now - start) % cycle) / cycle;
    let value;
    if (t < .10) value = 3 + Math.round(t / .10 * 5);
    else if (t < .78) value = 8 + Math.round((t - .10) / .68 * 87);
    else value = 95 + Math.round((t - .78) / .22 * 5);
    progress.textContent = `${Math.min(value, 100)}%`;
    layer.textContent = Math.min(210, Math.round(12 + value * 1.98));
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();

/* Калькулятор стоимости. Базовые тарифы сейчас демонстрационные и легко заменяются на реальные. */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    .calculator{position:relative;overflow:hidden}.calculator:before{content:"CALCULATOR / ESTIMATE";position:absolute;right:24px;top:24px;font:700 9px monospace;letter-spacing:.15em;color:#079bd766}.calc-box{display:grid;grid-template-columns:1.15fr .85fr;background:#fff;border:1px solid #cbd8e7;border-radius:20px;box-shadow:0 18px 55px #49698b14;overflow:hidden}.calc-form{padding:38px;border-right:1px solid #d8e1ec}.calc-result{padding:38px;background:linear-gradient(145deg,#f3fbff,#fff);display:flex;flex-direction:column;justify-content:center;position:relative}.calc-result:after{content:"";position:absolute;width:210px;height:210px;right:-100px;bottom:-110px;border:1px solid #079bd733;border-radius:50%;box-shadow:0 0 0 25px #079bd70a,0 0 0 50px #079bd706}.calc-title{font-size:20px;font-weight:800;letter-spacing:-.04em;margin:0 0 24px}.calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px}.calc-field{display:flex;flex-direction:column;gap:7px}.calc-field.full{grid-column:1/-1}.calc-field label{font-size:11px;font-weight:800;color:#526174}.calc-field input,.calc-field select{width:100%;margin:0;background:#f9fbfd;border:1px solid #cbd8e7;border-radius:8px;color:#172033;padding:12px;font:13px Manrope}.calc-field input:focus,.calc-field select:focus{outline:2px solid #079bd733;border-color:#079bd7}.calc-range{accent-color:#079bd7;padding:0!important;background:transparent!important;border:0!important}.calc-range-row{display:flex;justify-content:space-between;font:700 10px monospace;color:#738197}.calc-qty{display:flex;align-items:center;gap:10px}.calc-qty button{width:34px;height:34px;border:1px solid #cbd8e7;background:#fff;border-radius:7px;font-size:18px;cursor:pointer}.calc-qty button:hover{background:#eefaff}.calc-qty input{text-align:center}.calc-note{font-size:10px;color:#8490a1;margin:17px 0 0}.calc-total-label{font-size:11px;font-weight:800;letter-spacing:.12em;color:#008fc8;text-transform:uppercase}.calc-total{font-size:54px;line-height:1;letter-spacing:-.07em;font-weight:800;margin:10px 0 16px;color:#171719}.calc-per{font-size:12px;color:#667085}.calc-breakdown{border-top:1px solid #d8e1ec;margin-top:25px;padding-top:18px;display:grid;gap:9px;font-size:11px;color:#667085}.calc-line{display:flex;justify-content:space-between}.calc-line strong{color:#202936}.calc-cta{margin-top:25px;width:100%}.calc-file{border:1px dashed #aebfd1!important;background:#f8fbfe!important;cursor:pointer}.calc-file::file-selector-button{border:0;background:#e9f5fb;color:#008fc8;border-radius:6px;padding:7px 9px;margin-right:8px;font:700 10px Manrope;cursor:pointer}@media(max-width:850px){.calc-box{grid-template-columns:1fr}.calc-form{border-right:0;border-bottom:1px solid #d8e1ec}.calc-result{min-height:320px}}@media(max-width:520px){.calc-form,.calc-result{padding:25px}.calc-grid{grid-template-columns:1fr}.calc-field.full{grid-column:auto}.calc-total{font-size:44px}}
  `;
  document.head.appendChild(style);
  const catalog = document.querySelector('#catalog');
  const order = document.querySelector('#order');
  if (!catalog || !order) return;
  const section = document.createElement('section');
  section.className = 'section calculator';
  section.id = 'calculator';
  section.innerHTML = `
    <div class="section-head"><p class="eyebrow">РАСЧЁТ СТОИМОСТИ</p><h2>Сколько будет стоить<br>изготовление?</h2><p>Укажите параметры модели и получите ориентировочную стоимость. Точный расчёт зависит от геометрии и файла модели.</p></div>
    <div class="calc-box">
      <div class="calc-form"><h3 class="calc-title">Параметры изготовления</h3><div class="calc-grid">
        <div class="calc-field full"><label for="calc-tech">Технология</label><select id="calc-tech"><option value="fdm">FDM 3D-печать</option><option value="resin">Фотополимерная печать</option><option value="cnc">ЧПУ-фрезеровка</option></select></div>
        <div class="calc-field"><label for="calc-material">Материал</label><select id="calc-material"></select></div>
        <div class="calc-field"><label for="calc-qty">Количество, шт.</label><div class="calc-qty"><button type="button" id="qty-minus">−</button><input id="calc-qty" type="number" min="1" max="999" value="1"><button type="button" id="qty-plus">+</button></div></div>
        <div class="calc-field"><label for="calc-weight">Вес детали, г</label><input id="calc-weight" type="number" min="1" value="80"></div>
        <div class="calc-field"><label for="calc-time">Время изготовления, мин</label><input id="calc-time" type="number" min="1" value="240"></div>
        <div class="calc-field full"><label for="calc-infill">Заполнение / сложность <b id="complexity-value">20%</b></label><input class="calc-range" id="calc-infill" type="range" min="10" max="100" step="5" value="20"><div class="calc-range-row"><span>ЭКОНОМ</span><span>СТАНДАРТ</span><span>МАКСИМУМ</span></div></div>
        <div class="calc-field full"><label for="calc-file">3D-модель (необязательно)</label><input class="calc-file" id="calc-file" type="file" accept=".stl,.3mf,.obj"></div>
      </div><p class="calc-note">* Расчёт предварительный. Тарифы можно настроить под ваши реальные цены и материалы.</p></div>
      <div class="calc-result"><span class="calc-total-label">Ориентировочная стоимость</span><div class="calc-total" id="calc-total">1 380 ₽</div><div class="calc-per" id="calc-per">1 шт. · без доставки</div><div class="calc-breakdown"><div class="calc-line"><span>Материал</span><strong id="calc-material-cost">960 ₽</strong></div><div class="calc-line"><span>Работа станка</span><strong id="calc-machine-cost">270 ₽</strong></div><div class="calc-line"><span>Подготовка</span><strong id="calc-setup-cost">150 ₽</strong></div><div class="calc-line"><span>Количество</span><strong id="calc-qty-cost">× 1</strong></div></div><a class="btn primary calc-cta" href="#order">Заказать изготовление</a></div>
    </div>`;
  catalog.after(section);

  const tech = document.getElementById('calc-tech');
  const material = document.getElementById('calc-material');
  const qty = document.getElementById('calc-qty');
  const weight = document.getElementById('calc-weight');
  const time = document.getElementById('calc-time');
  const infill = document.getElementById('calc-infill');
  const complexity = document.getElementById('complexity-value');
  const total = document.getElementById('calc-total');
  const per = document.getElementById('calc-per');
  const materialCost = document.getElementById('calc-material-cost');
  const machineCost = document.getElementById('calc-machine-cost');
  const setupCost = document.getElementById('calc-setup-cost');
  const qtyCost = document.getElementById('calc-qty-cost');
  const tariffs = {
    fdm:{materials:[['PLA','PLA'],['PETG','PETG'],['ABS/ASA','ABS']], material:12, minute:2.2, setup:150},
    resin:{materials:[['Standard Resin','RESIN'],['Tough Resin','TOUGH'],['Detail Resin','DETAIL']], material:25, minute:3.8, setup:250},
    cnc:{materials:[['Фанера / дерево','WOOD'],['Акрил','ACRYLIC'],['Алюминий','ALU']], material:4.5, minute:6.5, setup:500}
  };
  const rub = n => `${Math.round(n).toLocaleString('ru-RU')} ₽`;
  const calculate = () => {
    const data = tariffs[tech.value];
    const w = Math.max(1, Number(weight.value)||1), t = Math.max(1, Number(time.value)||1), q = Math.max(1, Math.min(999, Number(qty.value)||1)), c = Number(infill.value)||20;
    complexity.textContent = `${c}%`;
    const factor = 0.9 + c/100*0.35;
    const m = w * data.material * factor, machine = t * data.minute, setup = data.setup, single = m + machine + setup;
    const discount = q >= 10 ? .82 : q >= 5 ? .9 : q >= 3 ? .95 : 1, grand = single * q * discount;
    total.textContent = rub(grand); per.textContent = `${q} шт. · без доставки${discount<1?' · серийная скидка':''}`;
    materialCost.textContent = rub(m*q*discount); machineCost.textContent = rub(machine*q*discount); setupCost.textContent = rub(setup); qtyCost.textContent = `× ${q}`;
  };
  const updateMaterials = () => {
    const data = tariffs[tech.value]; material.innerHTML = data.materials.map(x=>`<option value="${x[1]}">${x[0]}</option>`).join('');
    if(tech.value==='cnc'){weight.value=150;time.value=90;infill.value=60}else if(tech.value==='resin'){weight.value=35;time.value=180;infill.value=30}else{weight.value=80;time.value=240;infill.value=20} calculate();
  };
  tech.addEventListener('change',updateMaterials); [weight,time,qty,infill].forEach(el=>el.addEventListener('input',calculate));
  document.getElementById('qty-minus').addEventListener('click',()=>{qty.value=Math.max(1,(Number(qty.value)||1)-1);calculate()});
  document.getElementById('qty-plus').addEventListener('click',()=>{qty.value=Math.min(999,(Number(qty.value)||1)+1);calculate()});
  updateMaterials();
})();

/* Расширенный выбор продукции и исполнения в калькуляторе. */
(() => {
  const tech = document.getElementById('calc-tech');
  const material = document.getElementById('calc-material');
  const calcGrid = document.querySelector('#calculator .calc-grid');
  const weight = document.getElementById('calc-weight');
  const time = document.getElementById('calc-time');
  const infill = document.getElementById('calc-infill');
  const total = document.getElementById('calc-total');
  const per = document.getElementById('calc-per');
  const materialCost = document.getElementById('calc-material-cost');
  const machineCost = document.getElementById('calc-machine-cost');
  const setupCost = document.getElementById('calc-setup-cost');
  const qty = document.getElementById('calc-qty');
  if (!tech || !material || !calcGrid) return;

  const style = document.createElement('style');
  style.textContent = `
    .calc-extra-field{display:flex;flex-direction:column;gap:7px}
    .calc-extra-field label{font-size:11px;font-weight:800;color:#526174}
    .calc-extra-field select{width:100%;margin:0;background:#f9fbfd;border:1px solid #cbd8e7;border-radius:8px;color:#172033;padding:12px;font:13px Manrope}
    .calc-extra-field select:focus{outline:2px solid #079bd733;border-color:#079bd7}
    .calc-product-note{font-size:9px;color:#8490a1;margin-top:2px;line-height:1.45}
    .calc-field.full:has(+ .calc-extra-field),.calc-extra-field{min-width:0}
    @media(max-width:520px){.calc-extra-field{grid-column:auto}}
    body.theme-light .calc-extra-field label{color:#43515e!important}
    body.theme-light .calc-extra-field select{background:#fff!important;color:#17202a!important;border-color:#cbd6df!important}
  `;
  document.head.appendChild(style);

  const productField = document.createElement('div');
  productField.className = 'calc-extra-field full';
  productField.innerHTML = '<label for="calc-product">Что изготавливаем</label><select id="calc-product"></select><div class="calc-product-note">Выберите тип изделия — калькулятор скорректирует ориентировочную сложность и стоимость.</div>';
  const techField = tech.closest('.calc-field');
  techField.insertAdjacentElement('afterend', productField);

  const finishField = document.createElement('div');
  finishField.className = 'calc-extra-field';
  finishField.innerHTML = '<label for="calc-finish">Исполнение / постобработка</label><select id="calc-finish"></select>';
  const materialField = material.closest('.calc-field');
  materialField.insertAdjacentElement('afterend', finishField);

  const product = document.getElementById('calc-product');
  const finish = document.getElementById('calc-finish');

  const catalog = {
    fdm: {
      products:[
        ['Функциональная деталь / крепёж',1.00,25],['Корпус / крышка / панель',1.08,30],['Автомобильная деталь',1.12,35],['Кронштейн / держатель',1.02,25],['Органайзер / аксессуар',0.95,20],['Прототип изделия',1.15,35],['Декоративная модель / макет',1.08,30],['Фигурка / игрушка',1.12,35],['Малая серия деталей',1.05,30]
      ],
      materials:[
        ['PLA — универсальный',12,1.00],['PETG — прочный',14,1.05],['ABS / ASA — технический',15,1.10],['TPU — гибкий',18,1.16],['PA / Nylon — инженерный',24,1.30],['PC — высокопрочный',28,1.38],['Carbon — усиленный',32,1.48]
      ],
      finish:[['Без постобработки',1,0],['Зачистка и удаление поддержек',1.06,80],['Шлифовка',1.16,180],['Грунтовка',1.25,300],['Покраска',1.45,650],['Сборка / склейка',1.20,250]]
    },
    resin: {
      products:[
        ['Миниатюра / фигурка',1.00,30],['Коллекционная модель',1.08,35],['Бюст / статуэтка',1.12,40],['Мелкая точная деталь',1.18,45],['Мастер-модель',1.22,45],['Ювелирная мастер-модель',1.30,55],['Макет / прототип',1.12,35],['Декоративный элемент',1.05,30],['Небольшая серия',1.08,35]
      ],
      materials:[
        ['Standard — универсальная',25,1.00],['ABS-like — прочная',28,1.06],['Tough — ударопрочная',30,1.10],['Detail — повышенная детализация',34,1.20],['Flexible — гибкая',38,1.30],['High-temp — термостойкая',45,1.45]
      ],
      finish:[['Без постобработки',1,0],['Промывка и зачистка',1.06,120],['Шлифовка',1.16,220],['Грунтовка',1.25,320],['Покраска',1.45,700],['Сборка / склейка',1.20,280]]
    },
    cnc: {
      products:[
        ['Табличка / шильдик',1.00,35],['Панель / накладка',1.08,45],['Кронштейн / крепёж',1.05,40],['Шаблон / кондуктор',1.12,45],['Мебельная деталь',1.10,50],['Декоративная деталь',1.15,55],['Гравировка',1.08,40],['Прототип / макет',1.18,60],['Малая серия',1.10,50]
      ],
      materials:[
        ['Фанера',4.5,1.00],['МДФ',4.0,0.96],['Дерево',5.5,1.10],['Акрил / оргстекло',5.5,1.08],['ПВХ / пластик',5.0,1.04],['Алюминий',8.5,1.35],['Латунь',12,1.55]
      ],
      finish:[['Фрезеровка без постобработки',1,0],['Зачистка кромок',1.07,120],['Шлифовка',1.14,180],['Полировка',1.22,300],['Гравировка + обработка',1.18,250],['Покраска / покрытие',1.38,550]]
    }
  };

  let current = {product:1, material:1, finish:1, setup:0};

  const fill = (select, items, formatter) => {
    select.innerHTML = items.map((item,index) => `<option value="${index}">${formatter(item)}</option>`).join('');
  };

  const setDefaults = () => {
    if (tech.value === 'cnc') { weight.value = 150; time.value = 90; infill.value = 60; }
    else if (tech.value === 'resin') { weight.value = 35; time.value = 180; infill.value = 30; }
    else { weight.value = 80; time.value = 240; infill.value = 20; }
  };

  const refreshOptions = (preserve = false) => {
    const data = catalog[tech.value] || catalog.fdm;
    const oldProduct = Number(product.value) || 0;
    const oldMaterial = Number(material.value) || 0;
    const oldFinish = Number(finish.value) || 0;

    fill(product, data.products, item => item[0]);
    fill(material, data.materials, item => item[0]);
    fill(finish, data.finish, item => item[0]);

    if (preserve) {
      product.value = String(Math.min(oldProduct, data.products.length - 1));
      material.value = String(Math.min(oldMaterial, data.materials.length - 1));
      finish.value = String(Math.min(oldFinish, data.finish.length - 1));
    }

    current.product = data.products[Number(product.value) || 0] || data.products[0];
    current.material = data.materials[Number(material.value) || 0] || data.materials[0];
    current.finish = data.finish[Number(finish.value) || 0] || data.finish[0];
    current.setup = current.finish[2] || 0;
  };

  const calculateExtended = () => {
    const data = catalog[tech.value] || catalog.fdm;
    const productData = data.products[Number(product.value) || 0] || data.products[0];
    const materialData = data.materials[Number(material.value) || 0] || data.materials[0];
    const finishData = data.finish[Number(finish.value) || 0] || data.finish[0];
    const w = Math.max(1, Number(weight.value) || 1);
    const t = Math.max(1, Number(time.value) || 1);
    const q = Math.max(1, Math.min(999, Number(qty.value) || 1));
    const c = Math.max(10, Number(infill.value) || 20);
    const baseMinute = tech.value === 'fdm' ? 2.2 : tech.value === 'resin' ? 3.8 : 6.5;
    const baseSetup = tech.value === 'fdm' ? 150 : tech.value === 'resin' ? 250 : 500;
    const complexity = 0.9 + c / 100 * 0.35;
    const materialPrice = w * materialData[1] * complexity * productData[1] * materialData[2];
    const machinePrice = t * baseMinute * productData[1] * materialData[2];
    const setupPrice = baseSetup + (finishData[2] || 0);
    const single = materialPrice + machinePrice + setupPrice;
    const discount = q >= 10 ? .82 : q >= 5 ? .90 : q >= 3 ? .95 : 1;
    const grand = single * q * discount * (finishData[1] || 1);
    const money = value => `${Math.round(value).toLocaleString('ru-RU')} ₽`;

    total.textContent = money(grand);
    per.textContent = `${q} шт. · без доставки${discount < 1 ? ' · серийная скидка' : ''}`;
    materialCost.textContent = money(materialPrice * q * discount * (finishData[1] || 1));
    machineCost.textContent = money(machinePrice * q * discount * (finishData[1] || 1));
    setupCost.textContent = money(setupPrice);
    document.getElementById('calc-qty-cost').textContent = `× ${q}`;
  };

  refreshOptions(false);
  setDefaults();
  calculateExtended();

  tech.addEventListener('change', () => {
    refreshOptions(false);
    setDefaults();
    calculateExtended();
  });
  product.addEventListener('change', calculateExtended);
  material.addEventListener('change', calculateExtended);
  finish.addEventListener('change', calculateExtended);
  [weight,time,qty,infill].forEach(el => el.addEventListener('input', calculateExtended));
})();
