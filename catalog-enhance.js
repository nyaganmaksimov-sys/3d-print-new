/* Дополнительное поведение каталога.
   ВАЖНО: модели здесь НЕ добавляются. Полный список и реальные фотографии
   формируются только из catalog-data.js. Это исключает карточки-заглушки. */
(() => {
  const grid = document.querySelector('.catalog-grid');
  if (!grid) return;

  const isCatalog = /\/catalog\.html$/i.test(location.pathname);
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

  // На странице полного каталога ничего дополнительно не добавляем:
  // здесь должны отображаться только модели из catalog-data.js с реальными фото.
  cards.forEach(card => {
    const photo = card.querySelector('.product-image img');
    if (!photo || !photo.src) card.remove();
  });
})();
