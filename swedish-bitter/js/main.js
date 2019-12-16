// Импортируем jQuery

// Импортируем необходимые js-файлы Bootstrap 4

// Импортируем другие js-файлы
'use strict';

// модальное окно
const introMore = document.querySelector('.intro__btn');
const introModal = document.querySelector('.intro-modal');
const introModalClose = document.querySelector('.intro-modal__close');

introMore.addEventListener('click', () => {
  introModal.classList.toggle("hidden");
});

introModalClose.addEventListener('click', () => {
  introModal.classList.toggle("hidden");
});


// переключение отзывов
const fromRusian = document.querySelector('#russian');
const fromForeigner = document.querySelector('#foreigner');
const reviewsRussian = document.querySelector('#reviews-russian');
const reviewsForeigner = document.querySelector('#reviews-foreigner');
const reviewsForeignerWrapper = document.querySelector('.reviews__blocks-wrapper--for');
const reviewsRussianWrapper = document.querySelector('.reviews__blocks-wrapper--rus');

fromRusian.addEventListener('click', () => {
  fromForeigner.classList.remove("reviews__active");
  reviewsForeignerWrapper.style.display="none";

  fromRusian.classList.add("reviews__active");
  reviewsRussianWrapper.style.display="flex";

});

fromForeigner.addEventListener('click', () => {
  fromRusian.classList.remove("reviews__active");
  reviewsRussianWrapper.style.display="none";

  fromForeigner.classList.add("reviews__active");
  reviewsForeignerWrapper.style.display="flex";
});

// больше отзывов
const reviewsMore = document.querySelector('#reviews-more');
const reviewsExtra = document.querySelector('.reviews_extra');

reviewsMore.addEventListener('click', () => {
  reviewsExtra.style.display="flex";
  reviewsMore.classList.add("hidden");
}, false );