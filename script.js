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

/* Интерактивный технический фон: за курсором появляются маленькие элементы
   чертежа, которые мягко растворяются. Эффект отключается на touch-устройствах. */
(() => {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const style = document.createElement('style');
  style.textContent = `
    .cursor-tech-layer{position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden}
    .cursor-tech-square{position:absolute;width:10px;height:10px;border:1px solid #079bd7;opacity:0;transform:translate(-50%,-50%) scale(.55) rotate(0deg);animation:techSquare 1.35s cubic-bezier(.2,.7,.2,1) forwards}
    .cursor-tech-square::before,.cursor-tech-square::after{content:"";position:absolute;background:#079bd7;opacity:.5}
    .cursor-tech-square::before{width:22px;height:1px;left:50%;top:50%;transform:translate(-50%,-50%)}
    .cursor-tech-square::after{width:1px;height:22px;left:50%;top:50%;transform:translate(-50%,-50%)}
    .cursor-tech-dot{position:absolute;width:4px;height:4px;border-radius:50%;background:#e6007e;opacity:0;transform:translate(-50%,-50%);animation:techDot 900ms ease-out forwards}
    .cursor-tech-label{position:absolute;font:700 8px/1 monospace;letter-spacing:.08em;color:#008fc8;opacity:0;transform:translate(10px,8px);animation:techLabel 1.2s ease-out forwards}
    @keyframes techSquare{0%{opacity:0;transform:translate(-50%,-50%) scale(.55) rotate(0)}18%{opacity:.7}100%{opacity:0;transform:translate(-50%,-50%) scale(1.8) rotate(12deg)}}
    @keyframes techDot{0%{opacity:0;transform:translate(-50%,-50%) scale(.4)}25%{opacity:.85}100%{opacity:0;transform:translate(-50%,-50%) scale(1.8)}}
    @keyframes techLabel{0%{opacity:0;transform:translate(10px,8px)}20%{opacity:.55}100%{opacity:0;transform:translate(15px,-12px)}}
  `;
  document.head.appendChild(style);

  const layer = document.createElement('div');
  layer.className = 'cursor-tech-layer';
  document.body.appendChild(layer);

  let last = 0;
  let count = 0;
  const labels = ['R20','Ø48','A-01','SECTION','3D','SCALE 1:2'];

  window.addEventListener('pointermove', (event) => {
    const now = performance.now();
    if (now - last < 75) return;
    last = now;

    const square = document.createElement('span');
    square.className = 'cursor-tech-square';
    square.style.left = `${event.clientX}px`;
    square.style.top = `${event.clientY}px`;
    square.style.animationDelay = `${Math.random() * 70}ms`;
    layer.appendChild(square);

    if (count++ % 3 === 0) {
      const dot = document.createElement('span');
      dot.className = 'cursor-tech-dot';
      dot.style.left = `${event.clientX + (Math.random() * 34 - 17)}px`;
      dot.style.top = `${event.clientY + (Math.random() * 34 - 17)}px`;
      layer.appendChild(dot);
    }

    if (count % 7 === 0) {
      const label = document.createElement('span');
      label.className = 'cursor-tech-label';
      label.textContent = labels[Math.floor(Math.random() * labels.length)];
      label.style.left = `${event.clientX}px`;
      label.style.top = `${event.clientY}px`;
      layer.appendChild(label);
    }

    if (layer.children.length > 55) layer.firstElementChild.remove();
  });
})();
