(() => {
  'use strict';

  const BUTTON_CLASS = 'catalog-order-buttons';

  function normalize(text) {
    return String(text || '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function getModelTitle(card) {
    const title =
      card.querySelector('.model-info h3') ||
      card.querySelector('h3') ||
      card.querySelector('.product-title') ||
      card.querySelector('[data-model-title]');

    return normalize(title?.textContent);
  }

  function getModelUrl(card) {
    /*
     * В первую очередь ищем ссылку непосредственно
     * внутри карточки.
     */
    const links = [...card.querySelectorAll('a[href]')];

    /*
     * Отбрасываем внутренние ссылки сайта.
     * Нас интересует оригинальная страница модели.
     */
    const external = links.find(link => {
      const href = link.getAttribute('href') || '';

      return (
        /^https?:\/\//i.test(href) &&
        !href.includes('3d-artprint.ru')
      );
    });

    if (external) {
      return external.href;
    }

    /*
     * Если ссылка относительная,
     * используем её как страницу модели.
     */
    const relative = links.find(link => {
      const href = link.getAttribute('href') || '';

      return (
        href &&
        !href.startsWith('#') &&
        !href.startsWith('javascript:')
      );
    });

    if (relative) {
      return new URL(
        relative.getAttribute('href'),
        location.href
      ).href;
    }

    /*
     * Иногда ссылка может быть записана
     * непосредственно в data-атрибуте.
     */
    const dataUrl =
      card.dataset.modelUrl ||
      card.dataset.url ||
      card.getAttribute('data-model-url');

    return dataUrl
      ? new URL(dataUrl, location.href).href
      : '';
  }

  function playSound(type) {
    if (
      window.SoundFX &&
      typeof window.SoundFX[type] === 'function'
    ) {
      window.SoundFX[type]();
    }
  }

  function selectCalculatorModel(title) {
    /*
     * Если калькулятор находится на этой же странице.
     */
    const select =
      document.getElementById('cp-product');

    if (!select) {
      return;
    }

    const cleanTitle =
      title.toLowerCase();

    const options =
      [...select.options];

    const match =
      options.find(option => {

        const optionText =
          normalize(option.textContent)
            .toLowerCase();

        const optionValue =
          normalize(option.value)
            .toLowerCase();

        return (
          optionText === cleanTitle ||
          optionValue === cleanTitle ||
          optionText.includes(cleanTitle) ||
          cleanTitle.includes(optionText)
        );
      });

    if (match) {

      select.value =
        match.value;

      select.dispatchEvent(
        new Event('input', {
          bubbles: true
        })
      );

      select.dispatchEvent(
        new Event('change', {
          bubbles: true
        })
      );
    }

    /*
     * Сохраняем выбранную модель,
     * даже если её пока нет в списке калькулятора.
     */
    window.__catalogModel = title;
  }

  function addModelToOrder(title, url) {

    /*
     * Сохраняем модель глобально.
     */
    window.__catalogModel = title;
    window.__catalogModelUrl = url;

    /*
     * Если есть калькулятор на этой странице —
     * выбираем модель.
     */
    selectCalculatorModel(title);

    /*
     * Если есть форма заявки —
     * добавляем информацию о модели.
     */
    const task =
      document.getElementById('orderTask');

    if (task) {

      const modelLine =
        `Модель из каталога: ${title}`;

      const linkLine =
        url
          ? `Страница модели: ${url}`
          : '';

      const current =
        task.value.trim();

      /*
       * Удаляем старую информацию
       * об этой модели.
       */
      const cleaned =
        current
          .replace(
            /^Модель из каталога:.*$/gim,
            ''
          )
          .replace(
            /^Страница модели:.*$/gim,
            ''
          )
          .replace(
            /^\s*\n\s*\n/gm,
            '\n'
          )
          .trim();

      const prefix =
        [
          modelLine,
          linkLine
        ]
        .filter(Boolean)
        .join('\n');

      task.value =
        cleaned
          ? `${prefix}\n\n${cleaned}`
          : prefix;

      task.dataset.userEdited =
        'true';

      task.dispatchEvent(
        new Event('input', {
          bubbles: true
        })
      );
    }

    /*
     * Если калькулятор находится на index.html,
     * переходим туда.
     */
    if (
      location.pathname.endsWith(
        '/catalog.html'
      )
    ) {

      const target =
        `index.html#calculator`;

      window.location.href =
        target;
    }
  }

  function createButtons(card) {

    if (
      card.querySelector(
        `.${BUTTON_CLASS}`
      )
    ) {
      return;
    }

    const title =
      getModelTitle(card);

    if (!title) {
      return;
    }

    const modelUrl =
      getModelUrl(card);

    const wrapper =
      document.createElement('div');

    wrapper.className =
      BUTTON_CLASS;

    /*
     * Кнопка заказа.
     */
    const orderButton =
      document.createElement('button');

    orderButton.type =
      'button';

    orderButton.className =
      'catalog-order-main';

    orderButton.innerHTML =
      'ЗАКАЗАТЬ ЭТУ МОДЕЛЬ <span>→</span>';

    orderButton.title =
      `Заказать модель: ${title}`;

    orderButton.addEventListener(
      'click',
      event => {

        event.preventDefault();
        event.stopPropagation();

        playSound('click');

        addModelToOrder(
          title,
          modelUrl
        );
      }
    );

    /*
     * Ссылка на страницу модели.
     */
    const modelLink =
      document.createElement('a');

    modelLink.className =
      'catalog-model-link';

    modelLink.innerHTML =
      '↗ СТРАНИЦА МОДЕЛИ';

    modelLink.title =
      `Открыть страницу модели: ${title}`;

    if (modelUrl) {

      modelLink.href =
        modelUrl;

      modelLink.target =
        '_blank';

      modelLink.rel =
        'noopener noreferrer';

    } else {

      modelLink.href =
        '#';

      modelLink.addEventListener(
        'click',
        event => {
          event.preventDefault();
        }
      );
    }

    wrapper.appendChild(
      orderButton
    );

    wrapper.appendChild(
      modelLink
    );

    /*
     * Ставим кнопки в конец блока
     * с информацией о модели.
     */
    const info =
      card.querySelector(
        '.model-info'
      );

    if (info) {

      info.appendChild(
        wrapper
      );

    } else {

      card.appendChild(
        wrapper
      );
    }
  }

  function addStyles() {

    if (
      document.getElementById(
        'catalog-order-buttons-style'
      )
    ) {
      return;
    }

    const style =
      document.createElement('style');

    style.id =
      'catalog-order-buttons-style';

    style.textContent = `
      .catalog-order-buttons {
        display: flex;
        flex-direction: column;
        gap: 7px;
        width: 100%;
        margin-top: 14px;
      }

      .catalog-order-main {
        width: 100%;
        min-height: 42px;
        padding: 0 14px;

        border: 1px solid rgba(0,191,255,.48);
        border-radius: 7px;

        background:
          linear-gradient(
            100deg,
            rgba(0,191,255,.15),
            rgba(23,108,255,.12)
          );

        color: #fff;

        font-family: inherit;
        font-size: 10px;
        font-weight: 900;
        letter-spacing: .45px;

        cursor: pointer;

        transition:
          transform .2s ease,
          border-color .2s ease,
          background .2s ease,
          box-shadow .2s ease;
      }

      .catalog-order-main span {
        color: #00bfff;
        margin-left: 5px;
      }

      .catalog-order-main:hover {
        transform: translateY(-2px);

        border-color:
          rgba(0,191,255,.95);

        background:
          linear-gradient(
            100deg,
            rgba(0,191,255,.25),
            rgba(23,108,255,.20)
          );

        box-shadow:
          0 10px 30px
          rgba(0,191,255,.13);
      }

      .catalog-order-main:active {
        transform: translateY(0);
      }

      .catalog-model-link {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        min-height: 34px;

        box-sizing: border-box;

        border: 1px solid
          rgba(255,255,255,.13);

        border-radius: 6px;

        background:
          rgba(255,255,255,.025);

        color: #8995a3;

        text-decoration: none;

        font-family: inherit;
        font-size: 9px;
        font-weight: 800;
        letter-spacing: .35px;

        transition:
          color .2s ease,
          border-color .2s ease,
          background .2s ease;
      }

      .catalog-model-link:hover {
        color: #fff;

        border-color:
          rgba(0,191,255,.45);

        background:
          rgba(0,191,255,.06);
      }

      @media (max-width: 600px) {

        .catalog-order-main {
          min-height: 44px;
          font-size: 9px;
        }

        .catalog-model-link {
          min-height: 36px;
          font-size: 8px;
        }
      }
    `;

    document.head.appendChild(
      style
    );
  }

  function init() {

    addStyles();

    const cards =
      document.querySelectorAll(
        '.model-card, .product'
      );

    cards.forEach(
      createButtons
    );

    /*
     * Следим за каталогом,
     * потому что часть карточек может
     * добавляться JavaScript-ом.
     */
    const observer =
      new MutationObserver(
        mutations => {

          let changed = false;

          mutations.forEach(
            mutation => {

              if (
                mutation.addedNodes &&
                mutation.addedNodes.length
              ) {
                changed = true;
              }
            }
          );

          if (changed) {

            document
              .querySelectorAll(
                '.model-card, .product'
              )
              .forEach(
                createButtons
              );
          }
        }
      );

    observer.observe(
      document.body,
      {
        childList: true,
        subtree: true
      }
    );

    console.log(
      '3D-ARTPRINT catalog buttons initialized'
    );
  }

  if (
    document.readyState ===
    'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      init,
      { once: true }
    );

  } else {

    init();
  }

})();
