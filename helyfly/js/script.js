/* eslint-disable */
'use strict';

// polyfill swiper for IE11
if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
      value: function(search, rawPos) {
          var pos = rawPos > 0 ? rawPos|0 : 0;
          return this.substring(pos, pos + search.length) === search;
      }
  });
}

/* Слайдер для блока tab */
var gallerySwiper = new Swiper('.gallery__container', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  loop: true,
});

/* Слайдер для блока map */
var mapSwiper = new Swiper('.map__slider-swiper-container', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: '.map__slider-swiper-button-next',
    prevEl: '.map__slider-swiper-button-prev',
  },
  pagination: {
    el: '.map__slider-swiper-pagination',
  },
});


/* Yandex карта */

ymaps.ready(init);
function init(){
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

  var myPlacemark = new ymaps.Placemark([55.75897861, 37.61587440], 
    {balloonContent: 'Встречаемся тут!'}, 
    {preset: "islands#redIcon"}
  );

  // myPin.add(myPlacemark);
  myMap.geoObjects.add(myPlacemark);

  // Балун откроется в точке «привязки» балуна — т. е. над меткой.
  // myMap.balloon.open();
};

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
    body.style.overflow = 'hidden';
    // modalInput.focus();
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
  console.log(e)
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
let video = document.querySelector('.desc__video');
let videoImg = document.querySelector('.desc__video-img');

video.addEventListener('click', () => {
  let iframe = createIframe();

  videoImg.remove();
  video.appendChild(iframe);
});

/* cоздаем iframe */
function createIframe() {
  let iframe = document.createElement('iframe');
  
	iframe.setAttribute('src', 'https://www.youtube.com/embed/4JS70KB9GS0?autoplay=1');
	iframe.setAttribute('allowfullscreen', '');
	iframe.setAttribute('allow', 'autoplay');

	return iframe;
}


/* cоздаем линк еще для блока Отзывы */
let linkMore = document.querySelector('.review__link');
let block = document.querySelector('.review__list');

linkMore.addEventListener('click', (e) => {
  e.preventDefault();
  block.insertAdjacentHTML('beforeend', 
    `
    <!-- Отзыв -->
    <div class="review__item">

      <div class="review__img">
        <img src="./img/antonova.png" alt="Валерия Антонова">
      </div>

      <p class="review__title-name">Валерия Антонова</p>
      <p class="review__title-prof">Арт-директор</p>
      <div class="review__title-wrap">
        <div class="review__title-rating">
          <img src="./img/rating.svg" alt="Рейтинг">
        </div>
        <p class="review__extra">Супер! Я бы заказала съемку снова!</p>
      </div>

      <p class="review__text">Хотим выразить огромную благодарность вашей компании! Получили море ощущений, все прошло просто замечательно. Фотки получились великолепные, отдельное спасибо фотографу!</p>
      <p class="review__data">27 Апреля, 2019г.</p>
    </div>
    `
  );
});

/* cоздает линк еще для блока about__leader - Отзывы */
let aboutLeaderLink = document.querySelector('.about__leader-link');
let aboutLeader = document.querySelector('.about__leader');

aboutLeaderLink.addEventListener('click', (e) => {
  e.preventDefault();
  aboutLeader.insertAdjacentHTML('beforeend', 
    `
    <p>Сначала мы (я и моя команда) изучаем интересы клиентов, а затем придумываем подходящее решение, которое соответствует бюджету и планам клиента. Мы никогда не зависим от субпоставщиков и не свяжемся.</p>
    `
  );
  aboutLeaderLink.remove();
});

/* cоздает линк еще для блока about__services - Отзывы */
let aboutServices = document.querySelector('.about__services');
let aboutServicesLink = document.querySelector('.about__services-link');

aboutServicesLink.addEventListener('click', (e) => {
  e.preventDefault();
  aboutServices.insertAdjacentHTML('beforeend', 
    `
    <p>Качественный подбор места и локации для вашей съемки. При необходимости всегда возможно прерваться на обед/ужин. Более 50 фотографий на выходе с обработкой и замечательные впечатления о Дубае !</p>
    `
  );
  aboutServicesLink.remove();
});

/* cоздает дополнительные фото для юлока gallery */
let galleryWrap = document.querySelector('.gallery__wrap');
let galleryMore = document.querySelector('.gallery__more');


galleryMore.addEventListener('click', (e) => {
  e.preventDefault();
  let galleryWrapClone = galleryWrap.cloneNode(true); // клонировать сообщение
  console.log(galleryWrapClone)
  galleryWrap.insertAdjacentElement('beforeend', galleryWrapClone);
  galleryMore.remove();
});