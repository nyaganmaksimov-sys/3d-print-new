(() => {
  'use strict';

  const STORAGE_KEY = '3dprint_catalog_order';
  const BUTTON_CLASS = 'catalog-order-buttons';

  const normalize = value => String(value || '').replace(/\s+/g, ' ').trim();

  function getTitle(card) {
    const el = card.querySelector('.model-info h3, .product-info h3, h3, .product-title, [data-model-title]');
    return normalize(el?.textContent);
  }

  function getUrl(card) {
    const links = [...card.querySelectorAll('a[href]')];
    const link = links.find(a => {
      const href = a.getAttribute('href') || '';
      return /^https?:\/\//i.test(href) && !href.includes('3d-artprint.ru');
    }) || links.find(a => {
      const href = a.getAttribute('href') || '';
      return href && !href.startsWith('#') && !href.startsWith('javascript:');
    });
    return link ? new URL(link.getAttribute('href'), location.href).href : '';
  }

  function saveOrder(title, url) {
    const data = {
      title: title || '',
      url: url || '',
      time: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.__catalogModel = data.title;
    window.__catalogModelUrl = data.url;
    return data;
  }

  function putIntoTask(data) {
    const task = document.getElementById('orderTask');
    if (!task || !data?.title) return;

    const lines = [`Модель из каталога: ${data.title}`];
    if (data.url) lines.push(`Ссылка на модель: ${data.url}`);

    let current = task.value.trim();
    current = current
      .replace(/^Модель из каталога:.*$/gim, '')
      .replace(/^Ссылка на модель:.*$/gim, '')
      .replace(/^\s*\n/gm, '')
      .trim();

    task.value = current ? `${lines.join('\n')}\n\n${current}` : lines.join('\n');
    task.dataset.catalogModel = data.title;
    task.dataset.catalogModelUrl = data.url || '';
    task.dataset.userEdited = 'true';
    task.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function restoreOnOrderPage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    let data;
    try { data = JSON.parse(raw); } catch { return; }
    if (!data?.title) return;

    window.__catalogModel = data.title;
    window.__catalogModelUrl = data.url || '';

    const apply = () => putIntoTask(data);
    if (document.getElementById('orderTask')) apply();
    else setTimeout(apply, 300);
  }

  function selectCalculatorProduct(title) {
    const select = document.getElementById('cp-product');
    if (!select) return;

    const wanted = title.toLowerCase();
    const match = [...select.options].find(option => {
      const text = normalize(option.textContent).toLowerCase();
      const value = normalize(option.value).toLowerCase();
      return text === wanted || value === wanted || text.includes(wanted) || wanted.includes(text);
    });

    if (match) {
      select.value = match.value;
      select.dispatchEvent(new Event('input', { bubbles: true }));
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  function goToCalculator() {
    window.location.href = 'index.html#order';
  }

  function addButtons(card) {
    if (card.querySelector(`.${BUTTON_CLASS}`)) return;

    const title = getTitle(card);
    if (!title) return;

    const url = getUrl(card);
    const wrap = document.createElement('div');
    wrap.className = BUTTON_CLASS;

    const order = document.createElement('button');
    order.type = 'button';
    order.className = 'catalog-order-main';
    order.innerHTML = 'ЗАКАЗАТЬ ЭТУ МОДЕЛЬ <span>→</span>';

    order.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      const data = saveOrder(title, url);
      selectCalculatorProduct(title);
      putIntoTask(data);

      try {
        if (window.SoundFX?.click) window.SoundFX.click();
      } catch {}

      goToCalculator();
    });

    const link = document.createElement('a');
    link.className = 'catalog-model-link';
    link.textContent = '↗ СТРАНИЦА МОДЕЛИ';
    link.href = url || '#';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    if (!url) link.addEventListener('click', e => e.preventDefault());

    wrap.append(order, link);
    (card.querySelector('.model-info, .product-info') || card).appendChild(wrap);
  }

  function addStyles() {
    if (document.getElementById('catalog-order-buttons-style')) return;
    const style = document.createElement('style');
    style.id = 'catalog-order-buttons-style';
    style.textContent = `
      .catalog-order-buttons{display:flex;flex-direction:column;gap:7px;width:100%;margin-top:14px}
      .catalog-order-main{width:100%;min-height:42px;padding:0 14px;border:1px solid rgba(0,191,255,.48);border-radius:7px;background:linear-gradient(100deg,rgba(0,191,255,.15),rgba(23,108,255,.12));color:#fff;font:900 10px inherit;letter-spacing:.45px;cursor:pointer;transition:.2s}
      .catalog-order-main span{color:#00bfff;margin-left:5px}
      .catalog-order-main:hover{transform:translateY(-2px);border-color:rgba(0,191,255,.95);background:linear-gradient(100deg,rgba(0,191,255,.25),rgba(23,108,255,.2));box-shadow:0 10px 30px rgba(0,191,255,.13)}
      .catalog-model-link{display:flex;align-items:center;justify-content:center;width:100%;min-height:34px;box-sizing:border-box;border:1px solid rgba(255,255,255,.13);border-radius:6px;background:rgba(255,255,255,.025);color:#8995a3;text-decoration:none;font:800 9px inherit;letter-spacing:.35px;transition:.2s}
      .catalog-model-link:hover{color:#fff;border-color:rgba(0,191,255,.45);background:rgba(0,191,255,.06)}
    `;
    document.head.appendChild(style);
  }

  function initCatalog() {
    addStyles();
    document.querySelectorAll('.model-card, .product').forEach(addButtons);
    new MutationObserver(mutations => {
      if (mutations.some(m => m.addedNodes?.length)) {
        document.querySelectorAll('.model-card, .product').forEach(addButtons);
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    if (document.getElementById('orderTask')) restoreOnOrderPage();
    if (document.querySelector('.catalog-grid')) initCatalog();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();