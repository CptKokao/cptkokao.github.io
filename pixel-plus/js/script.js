// Initialize Swiper
var swiper = new Swiper('.swiper-container', {
navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
},
fadeEffect: {
    crossFade: true
},
autoplay: {
    delay: 4000,
},
loop: true,
});

// Форма в модальном окне с фокусом на поле Имя
$('.header__feedback-text').magnificPopup({
 type: 'inline',
 focus: '#name',
 removalDelay: 300,
  mainClass: 'mfp-fade'
});