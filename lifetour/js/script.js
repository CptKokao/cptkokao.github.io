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

// Tour swiper
var swiper = new Swiper('.tour__swiper-container', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    // when window width is >= 768px
    320: {
      width: 600,
      slidesPerView: 2,
    },
    767: {
      width: 1196,
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});

// Training swiper
var swiper = new Swiper('.training__swiper-container', {
  width: 1196,
  slidesPerView: 5,
  spaceBetween: 5,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
});

// Review swiper
var swiper = new Swiper('.review__swiper-container', {
  slidesPerView: 'auto',
  spaceBetween: 15,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    // when window width is >= 768px
    320: {
      width: 600,
      slidesPerView: 2,
    },
    767: {
      width: 1196,
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});

// Swiper
var swiper = new Swiper('.gallery__swiper-container', {
  slidesPerView: 'auto',
  spaceBetween: 5,
  loop: true,
  // Disable preloading of all images
  preloadImages: false,
  // Enable lazy loading
  lazy: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
});

let phone = document.querySelector('#phone');

/*  Маска формы телефона */
var maskOptions = {
  mask: '+{7}(000)000-00-00'
};

IMask(phone, maskOptions);