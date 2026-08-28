(() => {
  if (!/\/catalog\.html$/i.test(location.pathname)) return;

  const style = document.createElement('style');
  style.id = 'catalog-artprint-fix-v3';
  style.textContent = `
    /* === CATALOG: exactly the same dark header language as the main page === */
    body{background:#050507!important;color:#f7f8fb!important}
    .header{height:82px!important;min-height:82px!important;position:sticky!important;top:0!important;z-index:1000!important;display:grid!important;grid-template-columns:1fr auto 1fr!important;align-items:center!important;gap:28px!important;padding:0 max(28px,calc((100vw - 1420px)/2))!important;background:rgba(5,5,7,.96)!important;border-bottom:1px solid rgba(255,255,255,.12)!important;backdrop-filter:blur(16px)!important}
    .header .brand{grid-column:2!important;grid-row:1!important;position:static!important;transform:none!important;width:auto!important;margin:0!important;display:flex!important;align-items:center!important;justify-content:center!important;z-index:3!important}
    .header .brand img{width:150px!important;height:auto!important;max-width:150px!important;max-height:52px!important;object-fit:contain!important;display:block!important}
    .header nav{grid-column:1!important;grid-row:1!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:28px!important;margin:0!important;padding:0!important}
    .header nav a{font-size:12px!important;font-weight:800!important;color:#c8cbd2!important;text-transform:uppercase!important;transition:.2s!important}
    .header nav a:hover,.header nav a.active{color:#fff!important}
    .header .header-btn{grid-column:3!important;grid-row:1!important;justify-self:end!important;margin:0!important;padding:13px 20px!important;border-radius:6px!important;background:#fff!important;color:#050507!important;font-size:11px!important;font-weight:900!important;box-shadow:0 8px 25px rgba(255,255,255,.08)!important}
    .header .header-btn:hover{background:#00bfff!important;color:#fff!important}

    /* === ONE wide dark search field; no light background === */
    .catalog-page{background:transparent!important}
    .catalog-controls{padding:18px 0 8px!important;background:transparent!important}
    .catalog-search-wrap{width:100%!important;margin:0 auto 14px!important;background:transparent!important}
    .catalog-search{display:flex!important;align-items:center!important;gap:12px!important;width:100%!important;height:62px!important;box-sizing:border-box!important;background:linear-gradient(145deg,#111923,#0b1017)!important;border:1px solid rgba(255,255,255,.20)!important;border-radius:10px!important;padding:0 20px!important;box-shadow:0 14px 40px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.04)!important;color:#fff!important}
    .catalog-search>span{color:#00bfff!important;font-size:28px!important}
    .catalog-search input{flex:1!important;min-width:0!important;color:#fff!important;background:transparent!important;font-size:16px!important}
    .catalog-search input::placeholder{color:#778392!important}
    .catalog-search button{color:#8995a3!important;background:transparent!important;border:0!important}
    .catalog-search button:hover{color:#fff!important}
    .filters{background:transparent!important}
    .filters button{border:1px solid rgba(255,255,255,.16)!important;background:#10151d!important;color:#c8d0da!important;box-shadow:none!important}
    .filters button:hover{background:#151d28!important;border-color:rgba(0,191,255,.45)!important;box-shadow:0 10px 25px rgba(0,0,0,.25)!important}
    .filters button:before{background:linear-gradient(110deg,transparent 25%,rgba(255,255,255,.08),transparent 75%)!important}
    .filters button.active{background:linear-gradient(90deg,#00bfff,#176cff)!important;color:#fff!important;border-color:transparent!important;box-shadow:0 10px 28px rgba(0,145,255,.18)!important}

    /* === SEARCH MUST ACTUALLY HIDE NON-MATCHING CARDS === */
    .catalog-grid .product.catalog-search-hidden{display:none!important}
    .catalog-search-status{display:flex!important;justify-content:space-between!important;gap:15px!important;align-items:center!important;margin:8px 2px 12px!important;color:#7e8996!important;font-size:12px!important}
    .catalog-search-status strong{color:#fff!important;font-weight:800!important}
    .catalog-search-empty{display:none!important;grid-column:1/-1!important;padding:55px 25px!important;text-align:center!important;border:1px dashed rgba(255,255,255,.2)!important;border-radius:14px!important;background:#0d1219!important;color:#8995a3!important}
    .catalog-search-empty.show{display:block!important}

    /* darken the remaining old light wrappers */
    .catalog-hero p{color:#8995a3!important}
    .catalog-back{border:1px solid rgba(255,255,255,.18)!important;color:#fff!important;background:#10151d!important}
    .catalog-back:hover{border-color:#00bfff!important;background:#121c27!important}
    .catalog-attribution{background:#0d1219!important;border-color:rgba(255,255,255,.14)!important;color:#8d98a5!important}
    .catalog-attribution a{color:#00bfff!important}
    footer{background:#050507!important;color:#737b86!important;border-color:rgba(255,255,255,.12)!important}
    footer img{width:150px!important;max-width:150px!important;height:auto!important}

    @media(max-width:900px){
      .header{grid-template-columns:1fr auto 1fr!important;gap:12px!important;padding:0 18px!important}
      .header nav{gap:16px!important}
      .header nav a{font-size:10px!important}
      .header .brand img{width:135px!important;max-width:135px!important;max-height:46px!important}
      .header .header-btn{padding:11px 14px!important;font-size:10px!important}
    }
    @media(max-width:760px){
      .header{height:70px!important;min-height:70px!important;padding:0 14px!important}
      .header nav{display:none!important}
      .header .brand{grid-column:2!important}
      .header .brand img{width:120px!important;max-width:120px!important;max-height:42px!important}
      .header .header-btn{grid-column:3!important;padding:10px 12px!important;font-size:9px!important}
      .catalog-search{height:54px!important;border-radius:9px!important;padding:0 14px!important}
      .catalog-search input{font-size:14px!important}
      .catalog-search>span{font-size:24px!important}
    }
  `;
  document.head.appendChild(style);

  // Always use the compact horizontal 3D-ARTPRINT logo in the catalog header.
  document.querySelectorAll('.header .brand img, footer img').forEach(img => {
    img.src = 'assets/logo-horizontal.png';
    img.alt = '3D-ARTPRINT';
  });
  document.title = document.title.replace(/3D-PRINT/g, '3D-ARTPRINT');

  const input = document.getElementById('catalogSearchTop');
  const clear = document.getElementById('clearSearchTop');
  const grid = document.querySelector('.catalog-grid');
  const wrap = document.querySelector('.catalog-search-wrap');
  if (!input || !grid || !wrap) return;

  let status = document.querySelector('.catalog-search-status');
  if (!status) {
    status = document.createElement('div');
    status.className = 'catalog-search-status';
    status.innerHTML = '<span>Поиск по названию, автомобилю, категории, автору и описанию</span><strong></strong>';
    wrap.after(status);
  }
  const statusStrong = status.querySelector('strong');

  let empty = document.querySelector('.catalog-search-empty');
  if (!empty) {
    empty = document.createElement('div');
    empty.className = 'catalog-search-empty';
    empty.textContent = 'По вашему запросу моделей не найдено. Попробуйте другое название, марку автомобиля или номер детали.';
    grid.appendChild(empty);
  }

  const normalize = value => String(value || '').toLowerCase().replace(/ё/g,'е').replace(/[–—]/g,'-').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
  const searchable = card => {
    const hrefs = [...card.querySelectorAll('a[href]')].map(a => a.getAttribute('href') || '').join(' ');
    const imageAlt = [...card.querySelectorAll('img[alt]')].map(img => img.alt || '').join(' ');
    return normalize(`${card.textContent} ${hrefs} ${imageAlt}`);
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
    if(statusStrong) statusStrong.textContent = query ? `Найдено: ${matches}` : `Всего: ${cards.length}`;
    empty.classList.toggle('show', Boolean(query) && matches === 0);
    if(clear) clear.style.visibility = input.value ? 'visible' : 'hidden';
  };
  input.addEventListener('input', run);
  input.addEventListener('keydown', e => { if(e.key === 'Escape'){input.value='';run();} });
  if(clear) clear.addEventListener('click', () => {input.value='';input.focus();run();});
  const observer = new MutationObserver(() => run());
  observer.observe(grid,{childList:true,subtree:true});
  run();
})();
