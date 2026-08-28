/* Дополнительное поведение каталога.
   ВАЖНО: модели здесь НЕ добавляются. Полный список и реальные фотографии
   формируются только из catalog-data.js. Это исключает карточки-заглушки. */
(() => {
  const grid = document.querySelector('.catalog-grid');
  const isCatalog = /\/catalog\.html$/i.test(location.pathname);

  // Новый фирменный стиль: 3D-ARTPRINT.
  document.title = document.title.replace(/3D-PRINT/g, '3D-ARTPRINT');
  document.querySelectorAll('meta[content*="3D-PRINT"]').forEach(meta => {
    meta.setAttribute('content', meta.getAttribute('content').replace(/3D-PRINT/g, '3D-ARTPRINT'));
  });
  document.querySelectorAll('[alt],[aria-label]').forEach(el => {
    ['alt','aria-label'].forEach(attr => {
      const value = el.getAttribute(attr);
      if (value && value.includes('3D-PRINT')) el.setAttribute(attr, value.replace(/3D-PRINT/g, '3D-ARTPRINT'));
    });
  });
  document.querySelectorAll('.brand, footer > img').forEach(el => {
    if (el.classList.contains('brand')) {
      el.innerHTML = '<img src="logo-artprint.svg" alt="3D-ARTPRINT">';
    } else {
      el.src = 'logo-artprint.svg';
      el.alt = '3D-ARTPRINT';
    }
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach(node => {
    if (node.nodeValue.includes('3D-PRINT')) node.nodeValue = node.nodeValue.replace(/3D-PRINT/g, '3D-ARTPRINT');
  });

  // Обновляем позиционирование бренда в hero/подвале без изменения существующей верстки.
  document.querySelectorAll('.hero .eyebrow, .identity-strip p').forEach(el => {
    el.textContent = el.textContent.replace('3D-ПЕЧАТЬ · ПРОИЗВОДСТВО · НА ЗАКАЗ', '3D-ARTPRINT · 3D-ПЕЧАТЬ · АРТ · ПРОИЗВОДСТВО');
    el.textContent = el.textContent.replace('3D-ПЕЧАТЬ • ФОТОПОЛИМЕРНАЯ ПЕЧАТЬ • ЧПУ-ФРЕЗЕРОВКА', '3D-ПЕЧАТЬ • АРТ-ПЕЧАТЬ • ЧПУ • СУВЕНИРЫ');
  });
  const heroText = document.querySelector('.hero-text');
  if (heroText) heroText.textContent = 'Создаём детали, прототипы, предметы интерьера и сувениры, а также переносим идеи на холст, одежду и другие поверхности.';
  const stats = document.querySelectorAll('.stats span');
  if (stats[1]) stats[1].textContent = 'направлений творчества и производства';
  const statStrong = document.querySelectorAll('.stats strong');
  if (statStrong[1]) statStrong[1].textContent = '6+';

  // Новые услуги. Добавляем их только один раз на главной странице.
  const serviceGrid = document.querySelector('.service-grid');
  if (serviceGrid && !serviceGrid.dataset.creativeServicesAdded) {
    serviceGrid.dataset.creativeServicesAdded = 'true';
    serviceGrid.insertAdjacentHTML('beforeend', `
      <article class="service creative-service">
        <span>05</span>
        <div class="service-icon accent" aria-hidden="true">
          <svg viewBox="0 0 64 64"><path class="draw" d="M14 12h36v40H14z"/><path class="draw" d="M20 18h24v28H20z"/><path class="draw pulse" d="M23 39c7-8 12-8 18 0"/><circle class="fill yellow pulse" cx="26" cy="27" r="3"/><circle class="fill blue pulse" cx="39" cy="31" r="3"/></svg>
        </div>
        <h3>Рисование на холсте</h3>
        <p>Картины и авторские работы на холсте по вашему эскизу, фотографии или идее.</p>
      </article>
      <article class="service creative-service">
        <span>06</span>
        <div class="service-icon blue" aria-hidden="true">
          <svg viewBox="0 0 64 64"><path class="draw" d="M13 45c13-2 17-13 19-26"/><path class="draw" d="M32 19l8 3-3 9-8-3z"/><path class="draw pulse" d="M42 17c4 3 7 7 8 12"/><circle class="fill accent pulse" cx="19" cy="42" r="3"/><circle class="fill yellow pulse" cx="48" cy="36" r="3"/></svg>
        </div>
        <h3>Аэрография</h3>
        <p>Художественная роспись и аэрография для автомобилей, мотоциклов, шлемов и предметов.</p>
      </article>
      <article class="service creative-service featured">
        <span>07</span>
        <div class="service-icon yellow" aria-hidden="true">
          <svg viewBox="0 0 64 64"><path class="draw" d="M17 20h30v30H17z"/><path class="draw" d="M17 25h30M23 14h18v6H23z"/><path class="draw pulse" d="M25 34h14M25 40h9"/><circle class="fill accent pulse" cx="44" cy="43" r="4"/></svg>
        </div>
        <h3>Сувенирная продукция</h3>
        <p>Кружки, футболки, подарки и брендированная продукция с вашим дизайном.</p>
      </article>`);
    const style = document.createElement('style');
    style.textContent = `
      .creative-service{position:relative;overflow:hidden}
      .creative-service:after{content:'ART';position:absolute;right:-8px;bottom:-24px;font-size:92px;font-weight:900;line-height:1;color:rgba(19,155,214,.055);pointer-events:none;transform:rotate(-10deg)}
      .creative-service h3{position:relative;z-index:1}
      .creative-service p{position:relative;z-index:1}
      @media(min-width:761px){.service-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
    `;
    document.head.appendChild(style);
  }

  if (!grid) return;
  const cards = [...grid.querySelectorAll('.product')];

  // На главной показываем ровно 4 реальные карточки и ссылку на полный каталог.
  if (!isCatalog) {
    document.querySelector('.filters')?.remove();
    document.querySelector('.catalog-search-wrap')?.remove();

    cards.forEach((card, index) => {
      card.style.display = index < 4 ? '' : 'none';
    });

    grid.parentElement?.querySelector('.catalog-more')?.remove();
    const button = document.createElement('a');
    button.className = 'catalog-more btn primary';
    button.href = 'catalog.html';
    button.textContent = 'Открыть полный каталог моделей →';
    grid.after(button);
    return;
  }

  // На странице полного каталога отображаем только модели с реальным изображением.
  cards.forEach(card => {
    const photo = card.querySelector('.product-image img');
    if (!photo || !photo.src) card.remove();
  });
})();
