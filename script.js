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
