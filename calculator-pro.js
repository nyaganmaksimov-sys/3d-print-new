(()=>{
'use strict';
const root=document.querySelector('.calc-box');
if(!root)return;
const money=n=>new Intl.NumberFormat('ru-RU').format(Math.round(n))+' ₽';
const data={
 fdm:{name:'FDM / FFF',materials:{pla:['PLA',10,1.24],petg:['PETG',11,1.27],abs:['ABS',15,1.04],asa:['ASA',15,1.07],tpu:['TPU',18,1.20],pa:['Нейлон PA',35,1.14],cf:['Композит CF/GF',35,1.20]},machine:260,setup:180},
 sla:{name:'SLA / фотополимер',materials:{standard:['Standard Resin',50,1.10],abs:['ABS-like Resin',60,1.10],tough:['Tough / Engineering Resin',85,1.12],clear:['Clear Resin',75,1.10]},machine:420,setup:300},
 sls:{name:'SLS',materials:{pa12:['PA12 Nylon',100,1.01],pa11:['PA11 Nylon',120,1.03]},machine:850,setup:650},
 mjf:{name:'MJF',materials:{pa12:['PA12',90,1.01],pa11:['PA11',110,1.03]},machine:780,setup:600},
 sublimation:{name:'Сублимация',materials:{mug:['Кружка 330 мл',390,0],tshirt:['Футболка белая',900,0],oversize:['Футболка oversize',1300,0],puzzle:['Пазл / сувенир',450,0]},machine:0,setup:150}
};
const products={
 detail:{name:'Техническая деталь',methods:['fdm','sla','sls','mjf'],shape:.32},
 housing:{name:'Корпус / кожух',methods:['fdm','sla','sls','mjf'],shape:.24},
 prototype:{name:'Прототип',methods:['fdm','sla','sls','mjf'],shape:.28},
 figure:{name:'Фигурка / модель',methods:['fdm','sla','sls','mjf'],shape:.18},
 decor:{name:'Декор / интерьер',methods:['fdm','sla','sls','mjf'],shape:.22},
 spare:{name:'Запчасть',methods:['fdm','sla','sls','mjf'],shape:.30},
 souvenir:{name:'Сувенирная продукция',methods:['fdm','sublimation'],shape:.20}
};
root.innerHTML=`
<div class="calc-form">
 <div class="field full"><label>Что изготовить</label><select id="cp-product"><option value="detail">Техническая деталь</option><option value="housing">Корпус / кожух</option><option value="prototype">Прототип</option><option value="figure">Фигурка / модель</option><option value="decor">Декор / интерьер</option><option value="spare">Запчасть</option><option value="souvenir">Сувенирная продукция</option></select></div>
 <div class="field"><label>Метод изготовления</label><select id="cp-method"></select></div>
 <div class="field"><label>Материал / изделие</label><select id="cp-material"></select></div>
 <div id="cp-dimensions" class="field full"><label>Размер изделия, мм</label><div class="cp-dims"><input id="cp-l" type="number" min="10" value="100" placeholder="Длина"><input id="cp-w" type="number" min="10" value="80" placeholder="Ширина"><input id="cp-h" type="number" min="1" value="40" placeholder="Высота"></div></div>
 <div id="cp-fill-wrap" class="field"><label>Заполнение</label><select id="cp-fill"><option value="0.12">12%</option><option value="0.20" selected>20%</option><option value="0.35">35%</option><option value="0.50">50%</option><option value="0.70">70%</option><option value="1">100%</option></select></div>
 <div id="cp-finish-wrap" class="field"><label>Постобработка</label><select id="cp-finish"><option value="0">Без обработки</option><option value="0.12">Удаление поддержек / зачистка +12%</option><option value="0.25">Шлифовка +25%</option><option value="0.45">Грунтовка и покраска +45%</option></select></div>
 <div id="cp-print-wrap" class="field full"><label>Печать на сувенире</label><select id="cp-print"><option value="1">Одна сторона / стандартный формат</option><option value="1.25">Увеличенный принт</option><option value="1.55">Две стороны</option></select></div>
 <div class="field full"><label>Количество, шт.</label><input id="cp-qty" type="number" min="1" value="1"></div>
</div>
<div class="calc-result">
 <div class="calc-label">ОРИЕНТИРОВОЧНАЯ СТОИМОСТЬ</div><div class="price" id="cp-price">— <span>₽</span></div>
 <div class="cp-range" id="cp-range"></div><div class="cp-breakdown" id="cp-breakdown"></div>
 <p class="calc-note">Цена предварительная. Для 3D-печати итог зависит от реального веса модели, поддержек и времени печати. Для сублимации — от основы, размера принта и тиража.</p>
 <button class="btn btn-primary calc-order" type="button" onclick="document.querySelector('#order')?.scrollIntoView({behavior:'smooth'})">Оформить заказ</button>
</div>`;
const $=id=>document.getElementById(id);
function opts(select,items){select.innerHTML=items.map(([v,n])=>`<option value="${v}">${n}</option>`).join('');}
function updateMethods(){const p=products[$('cp-product').value];opts($('cp-method'),p.methods.map(k=>[k,data[k].name]));updateMaterials();}
function updateMaterials(){const m=$('cp-method').value;opts($('cp-material'),Object.entries(data[m].materials).map(([k,v])=>[k,v[0]]));const sub=m==='sublimation';$('cp-dimensions').style.display=sub?'none':'';$('cp-fill-wrap').style.display=sub?'none':'';$('cp-finish-wrap').style.display=sub?'none':'';$('cp-print-wrap').style.display=sub?'':'none';if(sub){$('cp-print').innerHTML=Object.entries({mug:'Полная печать / стандарт',tshirt:'A4 — одна сторона',oversize:'A3 — одна сторона',puzzle:'Полная поверхность'}).map(([v,n])=>`<option value="${v}">${n}</option>`).join('');}}
function calc(){const product=products[$('cp-product').value],method=$('cp-method').value,mat=$('cp-material').value,qty=Math.max(1,+$('cp-qty').value||1);let unit=0,materialCost=0,work=0,setup=data[method].setup;
 if(method==='sublimation'){const base=data[method].materials[mat][1];const print=$('cp-print').value;let mult=print==='mug'?1:print==='tshirt'?1:print==='oversize'?1.18:1;unit=base*mult;const discount=qty>=50?.78:qty>=20?.84:qty>=10?.9:qty>=5?.95:1;unit*=discount;setup=qty>1?120:150;materialCost=unit*.78;work=unit*.22;}
 else {const l=Math.max(10,+$('cp-l').value||100),w=Math.max(10,+$('cp-w').value||80),h=Math.max(1,+$('cp-h').value||40),fill=+$('cp-fill').value;const volume=l*w*h*product.shape;const effectiveVolume=volume*(.35+fill*.65);const density=data[method].materials[mat][2];const grams=Math.max(8,effectiveVolume/1000*density);const rate=data[method].materials[mat][1];materialCost=grams*rate;const hours=Math.max(.35,grams/(method==='fdm'?28:method==='sla'?22:55));work=data[method].machine*hours;const finish=1+(+$('cp-finish').value||0);unit=(materialCost+work+setup)*finish; if(qty>=100)unit*=.62;else if(qty>=50)unit*=.70;else if(qty>=20)unit*=.78;else if(qty>=10)unit*=.86;else if(qty>=5)unit*=.92;setup=setup/Math.max(1,qty);}
 const min=method==='sublimation'?300:method==='fdm'?350:500;let total=Math.max(min,unit*qty+setup);const low=total*.88,high=total*1.15; $('cp-price').innerHTML=`${money(total).replace(' ₽','')} <span>₽</span>`;$('cp-range').textContent=`Ориентир: ${money(low)} — ${money(high)}`;$('cp-breakdown').innerHTML=`<div><span>Изделие</span><b>${product.name}</b></div><div><span>Метод</span><b>${data[method].name}</b></div><div><span>Тираж</span><b>${qty} шт.</b></div>`;}
$('cp-product').addEventListener('change',()=>{updateMethods();calc()});$('cp-method').addEventListener('change',()=>{updateMaterials();calc()});['cp-material','cp-l','cp-w','cp-h','cp-fill','cp-finish','cp-print','cp-qty'].forEach(id=>$(id).addEventListener('input',calc));
updateMethods();calc();
const css=document.createElement('style');css.textContent=`.cp-dims{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.cp-range{font-size:11px;color:#8fa1b2;margin:-2px 0 15px}.cp-breakdown{width:100%;display:grid;gap:6px;margin-bottom:18px}.cp-breakdown div{display:flex;justify-content:space-between;gap:15px;font-size:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.07)}.cp-breakdown span{color:#84909c}.cp-breakdown b{color:#dce4ec;text-align:right}@media(max-width:760px){.cp-dims{grid-template-columns:1fr}.cp-breakdown div{font-size:9px}}`;document.head.appendChild(css);
})();
