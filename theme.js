(() => {
  const STORAGE_KEY = '3d-artprint-theme';
  const saved = localStorage.getItem(STORAGE_KEY);
  const systemLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = saved === 'light' || saved === 'dark' ? saved : (systemLight ? 'light' : 'dark');

  const css = document.createElement('style');
  css.id = 'artprint-theme-css';
  css.textContent = `
    .theme-toggle{position:fixed;top:94px;right:24px;z-index:99990;display:flex;align-items:center;gap:8px;padding:6px 9px 6px 10px;border:1px solid rgba(255,255,255,.22);border-radius:999px;background:rgba(10,14,20,.88);color:#fff;box-shadow:0 10px 30px rgba(0,0,0,.28);backdrop-filter:blur(12px);font:800 10px/1 Arial,sans-serif;user-select:none}
    .theme-toggle .theme-icon{opacity:.78;font-size:12px}.theme-toggle input{position:absolute;opacity:0;pointer-events:none}.theme-switch{position:relative;width:42px;height:22px;border-radius:999px;background:linear-gradient(90deg,#00bfff,#176cff);box-shadow:inset 0 0 0 1px rgba(255,255,255,.16);cursor:pointer}.theme-switch:after{content:'';position:absolute;top:3px;left:22px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 2px 7px rgba(0,0,0,.35);transition:.25s}.theme-toggle input:not(:checked)+.theme-switch{background:#2b313a}.theme-toggle input:not(:checked)+.theme-switch:after{left:3px}
    body.theme-light{background:#f4f7fa!important;color:#161b22!important}
    body.theme-light:before{background:radial-gradient(circle at 75% 15%,rgba(0,140,255,.12),transparent 28%),radial-gradient(circle at 20% 75%,rgba(255,0,133,.08),transparent 30%),#f4f7fa!important}
    body.theme-light header{background:rgba(255,255,255,.90)!important;border-bottom-color:rgba(20,35,50,.12)!important;color:#161b22!important}
    body.theme-light .head .nav a{color:#46515d!important}.theme-light .nav a:hover{color:#111!important}.theme-light .order-btn{background:#111!important;color:#fff!important}
    body.theme-light .hero:before{background:radial-gradient(circle at 78% 42%,rgba(0,191,255,.15),transparent 24%),radial-gradient(circle at 62% 75%,rgba(255,8,125,.10),transparent 25%)}
    body.theme-light .eyebrow,body.theme-light .section-kicker{color:#697583!important}.theme-light .hero-sub{color:#202832}.theme-light .hero-copy,.theme-light .section-desc{color:#687584!important}
    body.theme-light .btn-secondary{background:#fff!important;color:#151b22!important;border-color:#cbd5df!important}
    body.theme-light .service,body.theme-light .model-card,body.theme-light .step,body.theme-light .order-box{background:linear-gradient(180deg,#fff,#eef3f7)!important;border-color:#d5dee7!important;box-shadow:0 12px 35px rgba(30,55,75,.10),inset 0 1px 0 rgba(255,255,255,.8)!important}
    body.theme-light .service:hover,body.theme-light .model-card:hover{border-color:rgba(0,145,220,.45)!important;box-shadow:0 20px 50px rgba(30,55,75,.14)!important}
    body.theme-light .service-number,body.theme-light .model-info small{color:#71808d!important}.theme-light .service h3{filter:saturate(.95)}.theme-light .service-link{color:#1b242d!important;border-color:#c9d4de!important;background:rgba(255,255,255,.7)!important}.theme-light .service-link:hover{background:#eaf7ff!important}
    body.theme-light .model-info h3,body.theme-light .step h3{color:#18212a!important}.theme-light .model-info p,.theme-light .step p{color:#667481!important}.theme-light .model-link{color:#008ecb!important}
    body.theme-light .calc-box{background:linear-gradient(135deg,#fff,#edf3f7)!important;border-color:rgba(0,145,220,.32)!important;box-shadow:0 18px 55px rgba(30,55,75,.12),inset 0 1px 0 rgba(255,255,255,.9)!important}.theme-light .calc-form{background:rgba(255,255,255,.65)!important;border-color:#d7e1e9!important}.theme-light .field label{color:#43515e!important}.theme-light .field input,.theme-light .field select{background:#fff!important;color:#17202a!important;border-color:#cbd6df!important;box-shadow:inset 0 1px 3px rgba(30,55,75,.06)!important}.theme-light .field input::placeholder{color:#8a96a2!important}.theme-light .calc-result{background:linear-gradient(145deg,#fff,#eaf5fb)!important;border-color:rgba(0,145,220,.35)!important;box-shadow:inset 0 1px 0 #fff,0 12px 35px rgba(30,55,75,.10)!important}.theme-light .calc-label{color:#667482!important}.theme-light .calc-note{color:#687684!important}
    body.theme-light .order-box h2{color:#18212a!important}.theme-light .order-box p{color:#657381!important}.theme-light label{color:#566473!important}.theme-light textarea,.theme-light form input{background:#fff!important;color:#17202a!important;border-color:#cbd6df!important;box-shadow:inset 0 1px 3px rgba(30,55,75,.06)!important}.theme-light textarea::placeholder,.theme-light form input::placeholder{color:#8a96a2!important}
    body.theme-light footer{background:#edf2f6!important;border-top-color:#d4dee7!important;color:#65727e!important}.theme-light .foot-links a{color:#53606c!important}
    body.theme-light .modal{background:rgba(30,45,60,.38)!important}.theme-light .modal-card{background:linear-gradient(145deg,#fff,#edf3f7)!important;border-color:#d2dde6!important;box-shadow:0 30px 100px rgba(30,55,75,.22),inset 0 1px 0 #fff!important}.theme-light .modal-card p{color:#52616e!important}.theme-light .modal-card ul{color:#33424f!important}.theme-light .modal-close{background:#fff!important;color:#17202a!important;border-color:#cbd6df!important}.theme-light .modal-card h2{color:#17202a!important}
    body.theme-light .theme-toggle{background:rgba(255,255,255,.92);color:#1c2731;border-color:#cbd6df;box-shadow:0 10px 30px rgba(30,55,75,.14)}

    body.theme-light .header{background:rgba(255,255,255,.92)!important;border-bottom-color:#d5dee7!important;color:#18212a!important}
    body.theme-light .header nav a{color:#53616e!important}.theme-light .header nav a:hover,.theme-light .header nav a.active{color:#111!important}.theme-light .header .header-btn{background:#111!important;color:#fff!important}
    body.theme-light .catalog-page{background:#f4f7fa!important}.theme-light .catalog-controls{background:transparent!important}.theme-light .catalog-search{background:#fff!important;border-color:#cbd6df!important;color:#18212a!important;box-shadow:0 14px 40px rgba(30,55,75,.08),inset 0 1px 0 #fff!important}.theme-light .catalog-search input{color:#18212a!important}.theme-light .catalog-search input::placeholder{color:#8a96a2!important}.theme-light .catalog-search>span{color:#008ecb!important}.theme-light .catalog-search button{color:#7a8793!important}.theme-light .filters button{background:#fff!important;color:#36434f!important;border-color:#cbd6df!important}.theme-light .filters button.active{background:linear-gradient(90deg,#00bfff,#176cff)!important;color:#fff!important;border-color:transparent!important}.theme-light .catalog-search-status{color:#71808d!important}.theme-light .catalog-search-status strong{color:#1a2630!important}.theme-light .catalog-search-empty{background:#fff!important;color:#6e7c88!important;border-color:#cbd6df!important}.theme-light .catalog-hero h1{color:#18212a!important}.theme-light .catalog-hero p{color:#657381!important}.theme-light .catalog-back{background:#fff!important;color:#1a2630!important;border-color:#cbd6df!important}.theme-light .catalog-attribution{background:#fff!important;border-color:#d5dee7!important;color:#667481!important}.theme-light .product{background:#fff!important;border-color:#d5dee7!important;box-shadow:0 10px 30px rgba(30,55,75,.07)!important}.theme-light .model-stage{background:radial-gradient(circle at 50% 35%,#fff 0,#f2f6f8 58%,#e9eff3 100%)!important}.theme-light footer{background:#edf2f6!important;border-color:#d5dee7!important;color:#667481!important}
    body.theme-light .service-fullscreen__card{background:radial-gradient(circle at 82% 18%,rgba(0,191,255,.10),transparent 30%),radial-gradient(circle at 12% 82%,rgba(255,8,125,.07),transparent 28%),linear-gradient(145deg,#f7fafc,#e9f0f5 52%,#f7fafc)!important}.theme-light .service-fullscreen__content{color:#17202a!important}.theme-light .service-fullscreen__title{color:#17202a!important}.theme-light .service-fullscreen__intro{color:#4d5d6b!important}.theme-light .service-fullscreen__block{background:rgba(255,255,255,.72)!important;border-color:#d0dbe4!important}.theme-light .service-fullscreen__block h3{color:#17202a!important}.theme-light .service-fullscreen__block p,.theme-light .service-fullscreen__list li{color:#50606e!important}.theme-light .service-fullscreen__action:not(.primary){background:#fff!important;color:#17202a!important;border-color:#c8d3dd!important}.theme-light .service-fullscreen__close{background:rgba(255,255,255,.92)!important;color:#17202a!important;border-color:#c8d3dd!important}.theme-light .service-fullscreen__visual{background:#dce7ee!important}
    @media(max-width:760px){.theme-toggle{top:78px;right:12px;padding:5px 7px 5px 8px}.theme-toggle .theme-icon{font-size:11px}.theme-switch{width:38px;height:20px}.theme-toggle input:not(:checked)+.theme-switch:after{left:3px}}
  `;
  document.head.appendChild(css);

  const wrap = document.createElement('label');
  wrap.className = 'theme-toggle';
  wrap.title = 'Переключить светлую / тёмную тему';
  wrap.innerHTML = '<span class="theme-icon">☾</span><input type="checkbox" aria-label="Светлая тема"><span class="theme-switch"></span><span class="theme-icon">☀</span>';
  document.body.appendChild(wrap);
  const input = wrap.querySelector('input');

  function apply(theme) {
    document.body.classList.toggle('theme-light', theme === 'light');
    input.checked = theme === 'light';
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }
  input.addEventListener('change', () => apply(input.checked ? 'light' : 'dark'));
  apply(initial);
})();
