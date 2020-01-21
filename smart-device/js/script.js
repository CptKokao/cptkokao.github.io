/* eslint-disable */
'use strict';

/* аккордеон */
var btnNav = document.querySelector('#btn-nav');
var btnContact = document.querySelector('#btn-contact');
var navList = document.querySelector('.nav__list');
var contactList = document.querySelector('.footer__contact-list');

var toogle = function toogle(e, btn, changeClass) {
  e.preventDefault();

  if (btn.classList.contains('footer__btn--plus')) {
    btn.classList.remove('footer__btn--plus');
    btn.classList.add('footer__btn--minus');
    changeClass.style.display = 'block';
  } else {
    btn.classList.remove('footer__btn--minus');
    btn.classList.add('footer__btn--plus');
    changeClass.style.display = 'none';
  }
};

btnNav.addEventListener('click', function (e) {
  return toogle(e, btnNav, navList);
});
btnContact.addEventListener('click', function (e) {
  return toogle(e, btnContact, contactList);
});

/* модальное окно */
var modal = document.querySelector('.modal');
var callBtn = document.querySelector('.header__call');
var body = document.querySelector('body');
var overlay = document.querySelector('.overlay');
var close = document.querySelector('.modal__close');
var modalInput = document.querySelector('.modal [type="text"]');

/* открытие модального окна */
callBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if (modal.classList.contains('visually-hidden')) {
    modal.classList.remove('visually-hidden');
    overlay.classList.remove('visually-hidden');
    body.style.overflow = 'hidden';
    modalInput.focus();
  } else {
    modal.classList.add('visually-hidden');
    overlay.classList.add('visually-hidden');
    body.style.overflow = 'auto';
  }
});

/* закрытие модального окна */
var closeModal = function closeModal(e) {
  e.preventDefault();
  modal.classList.add('visually-hidden');
  overlay.classList.add('visually-hidden');
  body.style.overflow = 'auto';
};

close.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
window.addEventListener('keydown', function (e) {
  if (e.code === 'Escape') {
    closeModal();
  }
});

/* хранение данных в localStorage */
var formModal = document.querySelector('.modal .form');
var modalName = document.querySelector('#modal-name');
var modalTel = document.querySelector('#modal-tel');
var modalMessage = document.querySelector('#modal-message');
var feedbackModal = document.querySelector('.feedback .form');
var feedbackName = document.querySelector('#feedback-name');
var feedbackTel = document.querySelector('#feedback-tel');
var feedbackMessage = document.querySelector('#feedback-message');

if (formModal) {
  formModal.addEventListener('submit', function () {
    localStorage.setItem('name-modal', modalName.value);
    localStorage.setItem('phone-modal', modalTel.value);
    localStorage.setItem('message-modal', modalMessage.value);
  });
}

if (feedbackModal) {
  feedbackModal.addEventListener('submit', function () {
    localStorage.setItem('name-field', feedbackName.value);
    localStorage.setItem('phone-field', feedbackTel.value);
    localStorage.setItem('message-field', feedbackMessage.value);
  });
}

/* валидацию формы телефона */
var maskOptions = {
  mask: '+{7}(000)000-00-00'
};

IMask(modalTel, maskOptions);
IMask(feedbackTel, maskOptions);

var lazyLoadInstance = new LazyLoad({
  elements_selector: '.lazy'
  // ... more custom settings?
});
