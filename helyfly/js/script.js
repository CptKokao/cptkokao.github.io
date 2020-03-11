/* eslint-disable */
'use strict'; // polyfill swiper for IE11

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function value(search, rawPos) {
      var pos = rawPos > 0 ? rawPos | 0 : 0;
      return this.substring(pos, pos + search.length) === search;
    }
  });
}
/* Слайдер для блока tab */


var gallerySwiper = new Swiper('.gallery__container', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  loop: true
});
/* Слайдер для блока map */

var mapSwiper = new Swiper('.map__slider-swiper-container', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: '.map__slider-swiper-button-next',
    prevEl: '.map__slider-swiper-button-prev'
  },
  pagination: {
    el: '.map__slider-swiper-pagination'
  }
});
/* модальное окно */

var modal = document.querySelector('.modal');
var body = document.querySelector('body');
var heroBtn = document.querySelector('.hero__btn');
var overlay = document.querySelector('.overlay');
var close = document.querySelector('.modal__close');
var modalInput = document.querySelector('.modal [type="text"]');
var esc = 27;
/* открытие модального окна */

heroBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if (modal.classList.contains('visually-hidden')) {
    modal.classList.remove('visually-hidden');
    overlay.classList.remove('visually-hidden');
    body.style.overflow = 'hidden'; // modalInput.focus();
  } else {
    modal.classList.add('visually-hidden');
    overlay.classList.add('visually-hidden');
    body.style.overflow = 'auto';
  }
});
/* закрытие модального окна */

var closeModal = function closeModal(e) {
  modal.classList.add('visually-hidden');
  overlay.classList.add('visually-hidden');
  body.style.overflow = 'auto';
};

close.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
window.addEventListener('keydown', function (e) {
  console.log(e);

  if (e.code === 'Escape' || e.keyCode === esc) {
    closeModal();
  }
});
/* маска формы телефона */

$("#tel").mask("8(999) 999-9999");
$("#date").mask("99.99.9999");
$("#card").mask("99999-9999-9999-9999");
$("#date-card").mask("99.9999");
$("#cvv").mask("999");
/* видео youtube */

var video = document.querySelector('.desc__video');
var videoImg = document.querySelector('.desc__video picture');
video.addEventListener('click', function () {
  var iframe = createIframe();
  videoImg.remove();
  video.appendChild(iframe);
});
/* cоздаем iframe */

function createIframe() {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('src', 'https://www.youtube.com/embed/4JS70KB9GS0?autoplay=1');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  return iframe;
}
/* cоздаем линк еще для блока Отзывы */


var linkMore = document.querySelector('.review__link');
var block = document.querySelector('.review__list');
linkMore.addEventListener('click', function (e) {
  e.preventDefault();
  block.insertAdjacentHTML('beforeend', "\n    <!-- \u041E\u0442\u0437\u044B\u0432 -->\n\t  <div class=\"review__item\">\n      <div class=\"review__img\">\n        <picture>\n          <source srcset=\"./img/antonova.webp 1x, ./img/antonova@2x.webp 2x\" type=\"image/webp\">\n          <img src=\"./img/antonova.png\" srcset=\"./img/antonova@2x.png 2x\" alt=\"\u0412\u0430\u043B\u0435\u0440\u0438\u044F \u0410\u043D\u0442\u043E\u043D\u043E\u0432\u0430\">\n        </picture>\n      </div>\n      <p class=\"review__title-name\">\u0412\u0430\u043B\u0435\u0440\u0438\u044F \u0410\u043D\u0442\u043E\u043D\u043E\u0432\u0430</p>\n      <p class=\"review__title-prof\">\u0410\u0440\u0442-\u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440</p>\n      <div class=\"review__title-wrap\">\n        <div class=\"review__title-rating\">\n          <img src=\"./img/rating.svg\" alt=\"\u0420\u0435\u0439\u0442\u0438\u043D\u0433\">\n        </div>\n        <p class=\"review__extra\">\u0421\u0443\u043F\u0435\u0440! \u042F \u0431\u044B \u0437\u0430\u043A\u0430\u0437\u0430\u043B\u0430 \u0441\u044A\u0435\u043C\u043A\u0443 \u0441\u043D\u043E\u0432\u0430!</p>\n      </div>\n      <p class=\"review__text\">\u0425\u043E\u0442\u0438\u043C \u0432\u044B\u0440\u0430\u0437\u0438\u0442\u044C \u043E\u0433\u0440\u043E\u043C\u043D\u0443\u044E \u0431\u043B\u0430\u0433\u043E\u0434\u0430\u0440\u043D\u043E\u0441\u0442\u044C \u0432\u0430\u0448\u0435\u0439 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438! \u041F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u043C\u043E\u0440\u0435 \u043E\u0449\u0443\u0449\u0435\u043D\u0438\u0439, \u0432\u0441\u0435 \u043F\u0440\u043E\u0448\u043B\u043E \u043F\u0440\u043E\u0441\u0442\u043E \u0437\u0430\u043C\u0435\u0447\u0430\u0442\u0435\u043B\u044C\u043D\u043E. \u0424\u043E\u0442\u043A\u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438\u0441\u044C \u0432\u0435\u043B\u0438\u043A\u043E\u043B\u0435\u043F\u043D\u044B\u0435, \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0435 \u0441\u043F\u0430\u0441\u0438\u0431\u043E \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0443!</p>\n      <p class=\"review__data\">27 \u0410\u043F\u0440\u0435\u043B\u044F, 2019\u0433.</p>\n    </div>\n    ");
});
/* cоздает линк еще для блока about__leader - Отзывы */

var aboutLeaderLink = document.querySelector('.about__leader-link');
var aboutLeader = document.querySelector('.about__leader');
aboutLeaderLink.addEventListener('click', function (e) {
  e.preventDefault();
  aboutLeader.insertAdjacentHTML('beforeend', "\n    <p>\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043C\u044B (\u044F \u0438 \u043C\u043E\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430) \u0438\u0437\u0443\u0447\u0430\u0435\u043C \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u044B \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432, \u0430 \u0437\u0430\u0442\u0435\u043C \u043F\u0440\u0438\u0434\u0443\u043C\u044B\u0432\u0430\u0435\u043C \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0435\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0431\u044E\u0434\u0436\u0435\u0442\u0443 \u0438 \u043F\u043B\u0430\u043D\u0430\u043C \u043A\u043B\u0438\u0435\u043D\u0442\u0430. \u041C\u044B \u043D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0437\u0430\u0432\u0438\u0441\u0438\u043C \u043E\u0442 \u0441\u0443\u0431\u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u043E\u0432 \u0438 \u043D\u0435 \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F.</p>\n    ");
  aboutLeaderLink.remove();
});
/* cоздает линк еще для блока about__services - Отзывы */

var aboutServices = document.querySelector('.about__services');
var aboutServicesLink = document.querySelector('.about__services-link');
aboutServicesLink.addEventListener('click', function (e) {
  e.preventDefault();
  aboutServices.insertAdjacentHTML('beforeend', "\n    <p>\u041A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043F\u043E\u0434\u0431\u043E\u0440 \u043C\u0435\u0441\u0442\u0430 \u0438 \u043B\u043E\u043A\u0430\u0446\u0438\u0438 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0439 \u0441\u044A\u0435\u043C\u043A\u0438. \u041F\u0440\u0438 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0432\u0441\u0435\u0433\u0434\u0430 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u043F\u0440\u0435\u0440\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043E\u0431\u0435\u0434/\u0443\u0436\u0438\u043D. \u0411\u043E\u043B\u0435\u0435 50 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0439 \u043D\u0430 \u0432\u044B\u0445\u043E\u0434\u0435 \u0441 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u043E\u0439 \u0438 \u0437\u0430\u043C\u0435\u0447\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0432\u043F\u0435\u0447\u0430\u0442\u043B\u0435\u043D\u0438\u044F \u043E \u0414\u0443\u0431\u0430\u0435 !</p>\n    ");
  aboutServicesLink.remove();
});
/* cоздает дополнительные фото для юлока gallery */

var galleryWrap = document.querySelector('.gallery__wrap');
var galleryMore = document.querySelector('.gallery__more');
galleryMore.addEventListener('click', function (e) {
  e.preventDefault();
  var galleryWrapClone = galleryWrap.cloneNode(true); // клонировать сообщение

  console.log(galleryWrapClone);
  galleryWrap.insertAdjacentElement('beforeend', galleryWrapClone);
  galleryMore.remove();
});
/* Yandex карта */

ymaps.ready(init);

function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.75897861, 37.61587440],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 13,
    controls: [],
    behaviors: ['drag']
  });
  var myPlacemark = new ymaps.Placemark([55.75897861, 37.61587440], {
    balloonContent: 'Встречаемся тут!'
  }, {
    preset: "islands#redIcon"
  }); // myPin.add(myPlacemark);

  myMap.geoObjects.add(myPlacemark);
};
