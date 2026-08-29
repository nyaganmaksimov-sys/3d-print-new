(()=>{
'use strict';
const root=document.querySelector('.calc-box');
if(!root)return;
const money=n=>new Intl.NumberFormat('ru-RU').format(Math.round(n))+' ₽';
const data={
 fdm:{name:'FDM / FFF',icon:'🖨️',materials:{pla:['PLA',10,1.24],petg:['PETG',11,1.27],abs:['ABS',14,1.04],asa:['ASA',15,1.07],tpu:['TPU',18,1.20],pa:['Нейлон PA',35,1.14],cf:['Композит CF/GF',40,1.20]},machine:260,setup:180},
 sla:{name:'SLA / фотополимер',icon:'💎',materials:{standard:['Standard Resin',50,1.10],abs:['ABS-like Resin',60,1.10],tough:['Tough / Engineering Resin',85,1.12],clear:['Clear Resin',75,1.10]},machine:420,setup:300},
 sls:{name:'SLS',icon:'⚙️',materials:{pa12:['PA12 Nylon',100,1.01],pa11:['PA11 Nylon',120,1.03]},machine:850,setup:650},
 mjf:{name:'MJF',icon:'🏭',materials:{pa12:['PA12',90,1.01],pa11:['PA11',110,1.03]},machine:780,setup:600},
 sublimation:{name:'Сублимационная печать',icon:'🎨',materials:{mug:['Кружка 330 мл',390,0],tshirt:['Футболка белая',750,0],oversize:['Футболка oversize',1100,0],puzzle:['Пазл сувенирный',450,0]},machine:0,setup:150}
};
const products={
 detail:{name:'Техническая деталь',icon:'⚙️',methods:['fdm','sla','sls','mjf'],shape:.32},
 housing:{name:'Корпус / кожух',icon:'📦',methods:['fdm','sla','sls','mjf'],shape:.24},
 prototype:{name:'Прототип',icon:'🧪',methods:['fdm','sla','sls','mjf'],shape:.28},
 figure:{name:'Фигурка / модель',icon:'🗿',methods:['fdm','sla','sls','mjf'],shape:.18},
 decor:{name:'Декор / интерьер',icon:'🏠',methods:['fdm','sla','sls','mjf'],shape:.22},
 spare:{name:'Запчасть',icon:'🔧',methods:['fdm','sla','sls','mjf'],shape:.30},
 souvenir:{name:'Сувенирная продукция',icon:'🎁',methods:['fdm','sublimation'],shape:.20}
};
const productOptions=Object.entries(products).map(([v,p])=>`<button type="button" class="cp-choice" data-product="${v}"><span class="cp-choice-icon">${p.icon}</span><span>${p.name}</span></button>`).join('');
root.innerHTML=`
<div class="calc-form">
 <div class="field full"><label>1. ЧТО ИЗГОТОВИТЬ</label><div class="cp-choices" id="cp-products">${productOptions}</div><input id="cp-product" type="hidden" value="detail"></div>
 <div class="field full"><label>2. МЕТОД ИЗГОТОВЛЕНИЯ</label><div class="cp-choices cp-methods" id="cp-methods"></div><input id="cp-method" type="hidden" value="fdm"></div>
 <div class="field full"><label>3. МАТЕРИАЛ / ОСНОВА</label><div class="cp-choices cp-materials" id="cp-materials"></div><input id="cp-material" type="hidden" value="pla"></div>
 <div id="cp-dimensions" class="field full"><label>РАЗМЕР ИЗДЕЛИЯ, мм</label><div class="cp-dims"><input id="cp-l" type="number" min="10" value="100" placeholder="Длина"><input id="cp-w" type="number" min="10" value="80" placeholder="Ширина"><input id="cp-h" type="number" min="1" value="40" placeholder="Высота"></div></div>
 <div id="cp-fill-wrap" class="field"><label>ЗАПОЛНЕНИЕ</label><select id="cp-fill"><option value="0.12">12%</option><option value="0.20" selected>20%</option><option value="0.35">35%</option><option value="0.50">50%</option><option value="0.70">70%</option><option value="1">100%</option></select></div>
 <div id="cp-finish-wrap" class="field"><label>ПОСТОБРАБОТКА</label><select id="cp-finish"><option value="0">Без обработки</option><option value="0.12">Зачистка +12%</option><option value="0.25">Шлифовка +25%</option><option value="0.45">Грунтовка + покраска +45%</option></select></div>
 <div id="cp-print-wrap" class="field full"><label>РАЗМЕР ПРИНТА</label><div class="cp-choices cp-print-choices" id="cp-print-choices"></div><input id="cp-print" type="hidden" value="standard"></div>
 <div class="field full"><label>КОЛИЧЕСТВО, шт.</label><input id="cp-qty" type="number" min="1" value="1"></div>
</div>
<div class="calc-result">
 <div class="calc-label">ОРИЕНТИРОВОЧНАЯ СТОИМОСТЬ</div><div class="price" id="cp-price">— <span>₽</span></div>
 <div class="cp-range" id="cp-range"></div><div class="cp-breakdown" id="cp-breakdown"></div>
 <p class="calc-note">Расчёт предварительный. Точная цена 3D-печати зависит от веса модели, поддержек и времени печати. Для сублимации учитываются основа, формат изображения и тираж.</p>
 <button class="btn btn-primary calc-order" type="button" onclick="document.querySelector('#order')?.scrollIntoView({behavior:'smooth'})">Оформить заказ</button>
</div>`;
const $=id=>document.getElementById(id);
function choiceButtons(container,items,current,attr){container.innerHTML=items.map(([v,n,icon])=>`<button type="button" class="cp-choice ${v===current?'active':''}" data-${attr}="${v}">${icon?`<span class="cp-choice-icon">${icon}</span>`:''}<span>${n}</span></button>`).join('');}
function updateProducts(){document.querySelectorAll('[data-product]').forEach(b=>b.classList.toggle('active',b.dataset.product===$('cp-product').value));updateMethods();}
function updateMethods(){const p=products[$('cp-product').value];choiceButtons($('cp-methods'),p.methods.map(k=>[k,data[k].name,data[k].icon]),p.methods[0],'method');$('cp-method').value=p.methods[0];updateMaterials();}
function updateMaterials(){const m=$('cp-method').value;const mats=Object.entries(data[m].materials);choiceButtons($('cp-materials'),mats.map(([k,v])=>[k,v[0],m==='sublimation'?(k==='mug'?'☕':k==='tshirt'||k==='oversize'?'👕':'🧩'):'🧱']),mats[0][0],'material');$('cp-material').value=mats[0][0];const sub=m==='sublimation';$('cp-dimensions').style.display=sub?'none':'';$('cp-fill-wrap').style.display=sub?'none':'';$('cp-finish-wrap').style.display=sub?'none':'';$('cp-print-wrap').style.display=sub?'':'none';if(sub){choiceButtons($('cp-print-choices'),[['standard','Стандартный принт','▧'],['large','Увеличенный A3','▦'],['double','Две стороны','▤']], 'standard','print');$('cp-print').value='standard';}}
function setActive(selector,attr,value){document.querySelectorAll(selector).forEach(b=>b.classList.toggle('active',b.dataset[attr]===value));}
function calc(){const product=products[$('cp-product').value],method=$('cp-method').value,mat=$('cp-material').value,qty=Math.max(1,+$('cp-qty').value||1);let total=0,materialCost=0,work=0,setup=0,discount=0;
 if(method==='sublimation'){const base=data[method].materials[mat][1];const print=$('cp-print').value;const printMult=print==='large'?1.18:print==='double'?1.32:1;const baseCost=base*printMult;discount=qty>=50?.22:qty>=20?.16:qty>=10?.10:qty>=5?.05:0;const unit=baseCost*(1-discount);materialCost=unit*.72;work=unit*.28;setup=qty>1?120:150;total=Math.max(300,unit*qty+setup);}
 else {const l=Math.max(10,+$('cp-l').value||100),w=Math.max(10,+$('cp-w').value||80),h=Math.max(1,+$('cp-h').value||40),fill=+$('cp-fill').value;const volume=l*w*h*product.shape;const effectiveVolume=volume*(.35+fill*.65);const density=data[method].materials[mat][2];const grams=Math.max(8,effectiveVolume/1000*density);const rate=data[method].materials[mat][1];materialCost=grams*rate;const hours=Math.max(.35,grams/(method==='fdm'?28:method==='sla'?22:55));work=data[method].machine*hours;setup=data[method].setup;const finish=1+(+$('cp-finish').value||0);const raw=(materialCost+work+setup)*finish;discount=qty>=100?.38:qty>=50?.30:qty>=20?.22:qty>=10?.14:qty>=5?.08:0;total=Math.max(method==='fdm'?350:500,raw*(1-discount));}
 const low=total*.88,high=total*1.15;const per=total/qty;$('cp-price').innerHTML=`${money(total).replace(' ₽','')} <span>₽</span>`;$('cp-range').textContent=`Ориентир: ${money(low)} — ${money(high)} · ${money(per)} / шт.`;
 const rows=[['Изделие',product.name],['Метод',data[method].name],['Материал / основа',data[method].materials[mat][0]],['Материал',money(materialCost)],['Работа / печать',money(work)],['Подготовка',money(setup)]];if(discount)rows.push(['Скидка за тираж',`−${Math.round(discount*100)}%`]);$('cp-breakdown').innerHTML=rows.map(([a,b])=>`<div><span>${a}</span><b>${b}</b></div>`).join('');}
 document.querySelectorAll('[data-product]').forEach(b=>b.addEventListener('click',()=>{$('cp-product').value=b.dataset.product;updateProducts();calc()}));
 $('cp-methods').addEventListener('click',e=>{const b=e.target.closest('[data-method]');if(!b)return;$('cp-method').value=b.dataset.method;setActive('[data-method]','method',b.dataset.method);updateMaterials();calc()});
 $('cp-materials').addEventListener('click',e=>{const b=e.target.closest('[data-material]');if(!b)return;$('cp-material').value=b.dataset.material;setActive('[data-material]','material',b.dataset.material);calc()});
 $('cp-print-choices').addEventListener('click',e=>{const b=e.target.closest('[data-print]');if(!b)return;$('cp-print').value=b.dataset.print;setActive('[data-print]','print',b.dataset.print);calc()});
 ['cp-l','cp-w','cp-h','cp-fill','cp-finish','cp-qty'].forEach(id=>$(id).addEventListener('input',calc));
 updateProducts();calc();
 const css=document.createElement('style');css.textContent=`
 .cp-choices{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:8px}.cp-methods{grid-template-columns:repeat(4,minmax(0,1fr))}.cp-materials{grid-template-columns:repeat(4,minmax(0,1fr))}.cp-choice{min-height:58px;display:flex;align-items:center;justify-content:center;gap:7px;padding:9px 8px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:rgba(255,255,255,.025);color:#b8c2cc;font-size:10px;font-weight:800;cursor:pointer;transition:.18s}.cp-choice:hover{border-color:rgba(0,191,255,.45);transform:translateY(-1px)}.cp-choice.active{background:linear-gradient(135deg,rgba(0,191,255,.18),rgba(23,108,255,.10));border-color:rgba(0,191,255,.75);color:#fff;box-shadow:0 0 0 1px rgba(0,191,255,.08),0 7px 20px rgba(0,0,0,.2)}.cp-choice-icon{font-size:20px;line-height:1}.cp-dims{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.cp-range{font-size:11px;color:#8fa1b2;margin:-2px 0 15px}.cp-breakdown{width:100%;display:grid;gap:0;margin-bottom:18px}.cp-breakdown div{display:flex;justify-content:space-between;gap:15px;font-size:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.07)}.cp-breakdown span{color:#84909c}.cp-breakdown b{color:#dce4ec;text-align:right}.theme-light .cp-choice{background:rgba(255,255,255,.7);color:#52606d;border-color:#cbd6df}.theme-light .cp-choice.active{background:#eaf7ff;border-color:#00a8df;color:#17202a}.theme-light .cp-breakdown div{border-bottom-color:#dce4eb}.theme-light .cp-breakdown b{color:#26343f}
 @media(max-width:900px){.cp-choices,.cp-methods,.cp-materials{grid-template-columns:repeat(2,minmax(0,1fr))}}
 @media(max-width:480px){.cp-choices,.cp-methods,.cp-materials{grid-template-columns:1fr 1fr}.cp-choice{min-height:54px;font-size:9px}.cp-choice-icon{font-size:18px}.cp-dims{grid-template-columns:1fr}.cp-breakdown div{font-size:9px}}
 `;document.head.appendChild(css);
})();

/* EmailJS integration for the order form. */
(()=>{
'use strict';

const SERVICE_ID = 'service_6xfl2a';
const TEMPLATE_ID = 'template_yju0736';
const PUBLIC_KEY = 'n8hebGkPhnnvLzaWu';

let emailReady = null;

/* ---------- EmailJS ---------- */

function loadEmailJS(){
  if(window.emailjs) return Promise.resolve(window.emailjs);
  if(emailReady) return emailReady;

  emailReady = new Promise((resolve,reject)=>{
    const script = document.createElement('script');

    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';

    script.onload = ()=>{
      try{
        window.emailjs.init({
          publicKey: PUBLIC_KEY
        });

        resolve(window.emailjs);
      }catch(error){
        reject(error);
      }
    };

    script.onerror = ()=>{
      reject(new Error('Не удалось загрузить EmailJS'));
    };

    document.head.appendChild(script);
  });

  return emailReady;
}

/* ---------- Helpers ---------- */

function value(id){
  return document.getElementById(id)?.value?.trim() || '';
}

function text(id){
  return document.getElementById(id)?.innerText?.trim() || '';
}

/* ---------- Calculator data ---------- */

function getCalculatorData(){

  const product = value('cp-product');
  const method = value('cp-method');
  const material = value('cp-material');

  const qty = value('cp-qty') || '1';

  const price = text('cp-price') || 'не рассчитана';
  const range = text('cp-range') || '';

  const l = value('cp-l');
  const w = value('cp-w');
  const h = value('cp-h');

  const dims = [l,w,h]
    .filter(Boolean)
    .join(' × ');

  const fill = value('cp-fill');

  const finishElement = document.getElementById('cp-finish');

  const finish =
    finishElement?.selectedOptions?.[0]?.textContent?.trim()
    || 'Без обработки';

  const print = value('cp-print');

  const materialButton =
    document.querySelector(`[data-material="${material}"]`);

  const methodButton =
    document.querySelector(`[data-method="${method}"]`);

  const productButton =
    document.querySelector(`[data-product="${product}"]`);

  const materialLabel =
    materialButton?.querySelector('span:last-child')?.innerText?.trim()
    || material
    || 'Не указан';

  const methodLabel =
    methodButton?.querySelector('span:last-child')?.innerText?.trim()
    || method
    || 'Не указан';

  const productLabel =
    productButton?.querySelector('span:last-child')?.innerText?.trim()
    || product
    || 'Не указан';

  let fillLabel = '—';

  if(fill){
    const fillNumber = Number(fill);

    if(!Number.isNaN(fillNumber)){
      fillLabel = Math.round(fillNumber * 100) + '%';
    }
  }

  let printLabel = '—';

  if(print){

    const printButton =
      document.querySelector(`[data-print="${print}"]`);

    printLabel =
      printButton?.querySelector('span:last-child')?.innerText?.trim()
      || print;
  }

  return {
    productLabel,
    methodLabel,
    materialLabel,
    qty,
    price,
    range,
    dims: dims || 'Не указан',
    fillLabel,
    finish,
    printLabel
  };
}

/* ---------- Build task text ---------- */

function buildCalculatorTask(){

  const c = getCalculatorData();

  return [
    'Заявка на 3D-печать',
    '',
    'ПАРАМЕТРЫ КАЛЬКУЛЯТОРА:',
    '',
    `Изделие: ${c.productLabel}`,
    `Метод изготовления: ${c.methodLabel}`,
    `Материал / основа: ${c.materialLabel}`,
    `Размер: ${c.dims}`,
    `Заполнение: ${c.fillLabel}`,
    `Постобработка: ${c.finish}`,
    `Формат принта: ${c.printLabel}`,
    `Количество: ${c.qty} шт.`,
    `Стоимость: ${c.price}`,
    c.range ? `Ориентир: ${c.range}` : ''
  ]
  .filter(Boolean)
  .join('\n');
}

/* ---------- Put calculator data into "Задача" ---------- */

function updateOrderTask(){

  const taskField = document.getElementById('orderTask');

  if(!taskField) return;

  const existingText = taskField.dataset.userEdited === 'true'
    ? taskField.value
    : '';

  const calculatorTask = buildCalculatorTask();

  if(existingText){

    taskField.value =
      calculatorTask +
      '\n\nПожелания клиента:\n' +
      existingText;

  }else{

    taskField.value = calculatorTask;

  }
}

/*
 * Запоминаем, редактировал ли пользователь поле "Задача".
 * Чтобы наши автоматические данные не уничтожали его текст.
 */

function bindTaskEditing(){

  const taskField = document.getElementById('orderTask');

  if(!taskField) return;

  if(taskField.dataset.taskBound === '1') return;

  taskField.dataset.taskBound = '1';

  taskField.addEventListener('input', ()=>{

    taskField.dataset.userEdited = 'true';

  });

}

/* ---------- Collect order ---------- */

async function sendOrder(form){

  const button =
    form.querySelector('button[type="submit"]');

  const name =
    value('orderName');

  const contact =
    value('orderContact');

  const taskField =
    document.getElementById('orderTask');

  const calculatorTask =
    buildCalculatorTask();

  if(!name || !contact){

    form.reportValidity();

    return;
  }

  /*
   * Всегда получаем свежие данные калькулятора.
   */

  let userTask = '';

  if(taskField){

    userTask = taskField.value.trim();

    /*
     * Если поле уже содержит автоматически созданную
     * информацию — не дублируем её.
     */

    if(userTask.startsWith('Заявка на 3D-печать')){

      const marker = '\n\nПожелания клиента:';

      const markerPosition =
        userTask.indexOf(marker);

      if(markerPosition !== -1){

        userTask =
          userTask
            .slice(markerPosition + marker.length)
            .trim();

      }else{

        userTask = '';

      }
    }
  }

  const finalTask =
    userTask
      ? calculatorTask +
        '\n\nПожелания клиента:\n' +
        userTask
      : calculatorTask;

  /*
   * Обновляем поле формы перед отправкой.
   */

  if(taskField){

    taskField.value = finalTask;

  }

  if(button){

    button.disabled = true;

    button.dataset.originalText =
      button.textContent;

    button.textContent =
      'ОТПРАВЛЯЕМ…';
  }

  try{

    const c = getCalculatorData();

    /*
     * Если пользователь указал email,
     * используем его как Reply-To.
     */

    const email =
      contact.includes('@')
        ? contact
        : '';

    const templateParams = {

      name: name,

      email: email,

      phone: contact,

      /*
       * Основная задача.
       */
      message: finalTask,

      /*
       * Отдельные параметры тоже передаём,
       * чтобы их можно было использовать
       * непосредственно в EmailJS шаблоне.
       */

      product: c.productLabel,

      method: c.methodLabel,

      material: c.materialLabel,

      dimensions: c.dims,

      fill: c.fillLabel,

      finish: c.finish,

      print: c.printLabel,

      quantity: c.qty,

      price: c.price,

      price_range: c.range

    };

    console.log(
      'EmailJS template params:',
      templateParams
    );

    const api =
      await loadEmailJS();

    const response =
      await api.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams
      );

    console.log(
      'EmailJS success:',
      response
    );

    if(button){

      button.textContent =
        'ЗАЯВКА ОТПРАВЛЕНА ✓';
    }

    alert(
      'Заявка успешно отправлена. Спасибо! Мы свяжемся с вами для уточнения деталей.'
    );

    /*
     * Очищаем форму только после успешной отправки.
     */

    form.reset();

    if(taskField){

      taskField.dataset.userEdited =
        'false';

      taskField.value = '';

    }

    setTimeout(()=>{

      if(button){

        button.disabled = false;

        button.textContent =
          button.dataset.originalText
          || 'ОТПРАВИТЬ ЗАЯВКУ →';

      }

    },3500);

  }catch(error){

    console.error(
      'EmailJS error:',
      error
    );

    /*
     * Показываем настоящую ошибку в консоли,
     * чтобы можно было точно определить проблему.
     */

    const errorText =
      error?.text
      || error?.message
      || 'Неизвестная ошибка';

    console.error(
      'EmailJS error details:',
      errorText
    );

    if(button){

      button.disabled = false;

      button.textContent =
        button.dataset.originalText
        || 'ОТПРАВИТЬ ЗАЯВКУ →';
    }

    alert(
      'Не удалось отправить заявку.\n\n' +
      'Ошибка EmailJS: ' +
      errorText
    );

  }

}

/* ---------- Bind form ---------- */

function bind(){

  const form =
    document.getElementById('orderForm');

  if(!form){

    setTimeout(bind,500);

    return;
  }

  if(form.dataset.emailjsBound === '1'){

    return;
  }

  form.dataset.emailjsBound = '1';

  bindTaskEditing();

  /*
   * Первоначально заполняем "Задачу"
   * данными калькулятора.
   */

  updateOrderTask();

  /*
   * Следим за изменениями калькулятора.
   *
   * calculator-pro.js пересчитывает значения
   * при изменении параметров.
   *
   * Здесь периодически синхронизируем
   * поле "Задача".
   */

  let lastCalculatorState = '';

  setInterval(()=>{

    const currentState =
      buildCalculatorTask();

    if(currentState === lastCalculatorState){

      return;
    }

    lastCalculatorState =
      currentState;

    const taskField =
      document.getElementById('orderTask');

    if(!taskField) return;

    /*
     * Если пользователь ещё не начал
     * редактировать поле — обновляем его.
     */

    if(taskField.dataset.userEdited !== 'true'){

      taskField.value =
        currentState;

    }

  },500);

  /*
   * Перехватываем отправку формы
   * до старого обработчика index.html.
   */

  document.addEventListener(
    'submit',
    event=>{

      if(event.target !== form){

        return;
      }

      event.preventDefault();

      event.stopImmediatePropagation();

      sendOrder(form);

    },
    true
  );

}

bind();

})();
