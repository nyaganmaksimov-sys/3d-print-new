/* 3D-PRINT order form / EmailJS integration
 * Fill these three values after creating the EmailJS service/template:
 * EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID.
 */
(function () {
  const CONFIG = {
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
    serviceId: 'YOUR_EMAILJS_SERVICE_ID',
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
    recipient: 'a4-print@bk.ru'
  };

  const state = { orderText: '', total: '', details: {} };

  function money(v) {
    const n = Number(String(v).replace(/[^0-9.,-]/g, '').replace(',', '.')) || 0;
    return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(Math.round(n)) + ' ₽';
  }

  function collectCalculatorData() {
    const root = document.querySelector('#calculator, .calculator, .calc-box');
    const text = root ? root.innerText.replace(/\n{3,}/g, '\n\n').trim() : '';
    const price = document.querySelector('.price, #calc-price, [data-total]');
    return {
      summary: text,
      total: price ? price.textContent.trim() : '',
      url: location.href,
      time: new Date().toLocaleString('ru-RU')
    };
  }

  function createModal() {
    if (document.getElementById('order-modal')) return;
    const style = document.createElement('style');
    style.textContent = `
      #order-modal{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(0,0,0,.78);backdrop-filter:blur(10px)}
      #order-modal.open{display:flex}.order-modal-card{width:min(520px,100%);background:linear-gradient(145deg,#111722,#0a0e14);border:1px solid rgba(255,255,255,.2);border-radius:16px;padding:28px;box-shadow:0 30px 100px rgba(0,0,0,.7);position:relative}
      .order-modal-card h2{margin:0 0 8px;font-size:28px}.order-modal-card .lead{color:#9da6b1;font-size:12px;line-height:1.6;margin:0 0 20px}.order-mini{display:grid;grid-template-columns:1fr 1fr;gap:12px}.order-mini label{font-size:10px;color:#b9c1cb;font-weight:800}.order-mini .full{grid-column:1/-1}.order-mini input{width:100%;margin-top:6px;padding:14px;background:#111923;color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:7px;outline:none}.order-mini input:focus{border-color:#00bfff;box-shadow:0 0 0 2px rgba(0,191,255,.12)}.order-preview{margin:16px 0;padding:13px;border:1px solid rgba(0,191,255,.2);background:rgba(0,191,255,.04);border-radius:8px;color:#9da6b1;font-size:10px;line-height:1.55;max-height:130px;overflow:auto}.order-submit{width:100%;margin-top:12px;padding:15px;border:0;border-radius:7px;background:linear-gradient(90deg,#00bfff,#176cff);color:#fff;font-weight:900;cursor:pointer}.order-submit:disabled{opacity:.55;cursor:wait}.order-close{position:absolute;right:13px;top:12px;width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.18);background:#151b24;color:#fff;cursor:pointer;font-size:19px}.order-success{text-align:center;padding:20px 5px}.order-success .ok{font-size:42px}.order-error{display:none;margin-top:10px;color:#ff6b8a;font-size:11px;line-height:1.5}
      @media(max-width:520px){.order-mini{grid-template-columns:1fr}.order-mini .full{grid-column:auto}.order-modal-card{padding:22px}}
    `;
    document.head.appendChild(style);
    const modal = document.createElement('div');
    modal.id = 'order-modal';
    modal.innerHTML = `<div class="order-modal-card">
      <button class="order-close" type="button" aria-label="Закрыть">×</button>
      <div id="order-form-view">
        <h2>Оформление заказа</h2>
        <p class="lead">Расчёт уже заполнен. Оставьте только имя и номер телефона — остальные данные мы получим автоматически.</p>
        <form id="order-form">
          <div class="order-mini">
            <label>Имя<input name="customer_name" required autocomplete="name" placeholder="Ваше имя"></label>
            <label>Телефон<input name="customer_phone" required type="tel" autocomplete="tel" placeholder="+7 900 000-00-00"></label>
          </div>
          <div class="order-preview" id="order-preview"></div>
          <button class="order-submit" type="submit">ОТПРАВИТЬ ЗАЯВКУ</button>
          <div class="order-error" id="order-error"></div>
        </form>
      </div>
      <div id="order-success-view" class="order-success" style="display:none"><div class="ok">✓</div><h2>Заявка отправлена</h2><p class="lead">Спасибо! Мы получили ваш заказ и свяжемся с вами по указанному номеру.</p><button class="order-submit" type="button" id="order-success-close">ПОНЯТНО</button></div>
    </div>`;
    document.body.appendChild(modal);
    modal.querySelector('.order-close').onclick = close;
    modal.onclick = e => { if (e.target === modal) close(); };
    modal.querySelector('#order-success-close').onclick = close;
    modal.querySelector('#order-form').addEventListener('submit', submit);
  }

  function open() {
    createModal();
    const data = collectCalculatorData();
    state.orderText = data.summary;
    state.total = data.total;
    state.details = data;
    document.getElementById('order-preview').textContent = data.summary || 'Данные текущего расчёта будут переданы в заявку.';
    document.getElementById('order-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() { const m=document.getElementById('order-modal'); if(m)m.classList.remove('open'); document.body.style.overflow=''; }

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = form.querySelector('.order-submit');
    const error = document.getElementById('order-error');
    error.style.display='none';
    if (CONFIG.publicKey.startsWith('YOUR_')) {
      error.textContent = 'Форма готова, но для отправки нужно подключить EmailJS (Public Key, Service ID и Template ID).';
      error.style.display='block';
      return;
    }
    btn.disabled = true; btn.textContent='ОТПРАВЛЯЕМ…';
    try {
      if (!window.emailjs) throw new Error('EmailJS SDK не загружен');
      const fd = new FormData(form);
      await emailjs.send(CONFIG.serviceId, CONFIG.templateId, {
        to_email: CONFIG.recipient,
        customer_name: fd.get('customer_name'),
        customer_phone: fd.get('customer_phone'),
        order_details: state.orderText,
        estimated_total: state.total,
        page_url: state.details.url,
        order_time: state.details.time
      });
      document.getElementById('order-form-view').style.display='none';
      document.getElementById('order-success-view').style.display='block';
    } catch (err) {
      error.textContent='Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.';
      error.style.display='block';
      console.error(err);
    } finally { btn.disabled=false; btn.textContent='ОТПРАВИТЬ ЗАЯВКУ'; }
  }

  window.openOrderForm = open;
  document.addEventListener('DOMContentLoaded', function(){
    createModal();
    const sdk=document.createElement('script');
    sdk.src='https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    sdk.onload=function(){ if(!CONFIG.publicKey.startsWith('YOUR_')) emailjs.init({publicKey:CONFIG.publicKey}); };
    document.head.appendChild(sdk);
    document.addEventListener('click', function(e){
      const b=e.target.closest('.calc-order, [data-order], #calc-order');
      if(b){ e.preventDefault(); open(); }
    });
  });
})();
