(() => {
  if (!/\/catalog\.html$/i.test(location.pathname)) return;

  const logo = 'assets/logo_banner.png';
  document.querySelectorAll('.brand img, footer > img').forEach(img => {
    img.src = logo;
    img.alt = '3D-ARTPRINT';
  });
  document.title = document.title.replace(/3D-PRINT/g, '3D-ARTPRINT');

  const logoStyle = document.createElement('style');
  logoStyle.textContent = `
    /* Catalog: compact centered logo */
    .header{position:relative!important;min-height:78px!important}
    .header .brand{position:absolute!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important;z-index:3!important;display:flex!important;align-items:center!important;justify-content:center!important;width:auto!important;margin:0!important}
    .header .brand img{width:150px!important;height:auto!important;max-height:48px!important;object-fit:contain!important;display:block!important}
    .header nav{padding-right:175px!important}
    .header .header-btn{margin-left:auto!important}
    footer>img{width:150px!important;height:auto!important;max-height:48px!important;object-fit:contain!important}
    @media(max-width:760px){.header{min-height:68px!important}.header .brand img{width:120px!important;max-height:40px!important}.header nav{display:none!important}.header .header-btn{margin-left:auto!important}}
  `;
  document.head.appendChild(logoStyle);

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
  const searchable = card => {
    const hrefs = [...card.querySelectorAll('a[href]')].map(a => a.getAttribute('href') || '').join(' ');
    return normalize(`${card.textContent} ${hrefs}`);
  };

  const run = () => {
    const query = normalize(input.value);
    const tokens = query.split(/\s+/).filter(Boolean);
    const cards = [...grid.querySelectorAll('.product')];
    let matches = 0;
    cards.forEach(card => {
      const haystack = searchable(card);
      const ok = !tokens.length || tokens.every(token => haystack.includes(token));
      card.classList.toggle('catalog-search-hidden', !ok);
      if (ok) matches++;
    });
    statusStrong.textContent = query ? `Найдено: ${matches}` : `Всего: ${cards.length}`;
    empty.classList.toggle('show', Boolean(query) && matches === 0);
    clear.style.visibility = input.value ? 'visible' : 'hidden';
  };

  input.addEventListener('input', run);
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      input.value = '';
      run();
    }
  });
  clear.addEventListener('click', () => {
    input.value = '';
    input.focus();
    run();
  });
  run();
})();
