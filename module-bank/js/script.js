'use strict';

var body = document.querySelector('body');
var inputRealty = document.getElementById('calc-realty');
var inputFirstpay = document.getElementById('calc-firstpay');
var inputFirstpayRange = document.getElementById('calc-firstpay-range');
var inputDateRange = document.getElementById('calc-date-range');
var inputDate = document.getElementById('calc-date');
var dropdown = document.querySelector('.dropdown');
var dropdownInput = document.getElementById('dropdown-input');
var calcStep2 = document.getElementById('calc-step2');
var calcFirstpayWrap = document.getElementById('calc-firstpay-wrap');
var calcTitle = document.getElementById('calc-title');
var calcCost = document.getElementById('calc-cost');
var calcDateFirst = document.getElementById('calc-date-first');
var calcDateLast = document.getElementById('calc-date-last');
var calcPlus = document.getElementById('calc-plus');
var calcMinus = document.getElementById('calc-minus');
var calcRealtyError = document.getElementById('calc-realty-error');
var calcProcentValue = document.getElementById('calc-firstpay-value');
var checkboxСapital = document.getElementById('calc-extra-capital');
var checkboxKacko = document.getElementById('calc-extra-kacko');
var checkboxLife = document.getElementById('calc-extra-life');
var checkboxProject = document.getElementById('calc-extra-project');
var calcStepCheckbox = document.querySelectorAll('.calc__step-checkbox');
var calcCheckbox = document.querySelectorAll('.calc__step-checkbox input[type=checkbox]');
var offerSuccess = document.getElementById('offer-success');
var offerFailed = document.getElementById('offer-failed');
var offerFailedText = document.getElementById('offer-failed-text');
var offerSuccessText = document.getElementById('offer-success-text');
var offerBtn = document.getElementById('offer-btn');
var request = document.getElementById('request');
var requestWrap = document.getElementById('request-wrap');
var requestBtn = document.getElementById('request-btn');
var inputs = document.querySelectorAll('.calc__request-form input');
var formName = document.getElementById('name');
var formPhone = document.getElementById('phone');
var formEmail = document.getElementById('email'); // const calcFlex = document.getElementById('calc__flex');
// const calcFirstpayError = document.getElementById('calc-fistpay-error');
// const requestForm = document.getElementById('request-form');

var requestNumber = 0;
var requestTarget;
var requestPrice;
var procent;
var defValue = 2000000;
var capital = 470000;
var generalSum; // стоимость недвижимости

var procentSum; // сумма первоначальный взнос

var procRate; // % первоначального взноса

var procRateMonth; // процентная ставка

var dateSum; // срок кредитования

var sumCredit; // сумма кредита(с вычитом первоначального взноса)

var payMonth; // ежемесячный платеж

var profitMonth; // ежемесячный платеж

var offerSum = document.getElementById('calc-offer-sum');
var offerProc = document.getElementById('calc-offer-proc');
var offerMonthpay = document.getElementById('calc-offer-monthpay');
var offerMonthprofit = document.getElementById('calc-offer-monthprofit');
/*
 * defValue.js
 */

/* получает дефолтное значение в зависимости от категории */

var getDefValue = function getDefValue() {
  /* название категорий */
  var realtyTitle = "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438";
  var autoTitle = "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F";
  var creditTitle = "\u0421\u0443\u043C\u043C\u0430 \u043F\u043E\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0433\u043E \u043A\u0440\u0435\u0434\u0438\u0442\u0430";
  /* текст min/max для категорий */

  var realtyCost = "\u041E\u0442 1 200 000  \u0434\u043E 25 000 000 \u0440\u0443\u0431\u043B\u0435\u0439";
  var autoCost = "\u041E\u0442 500 000  \u0434\u043E 5 000 000 \u0440\u0443\u0431\u043B\u0435\u0439";
  var creditCost = "\u041E\u0442 50 000  \u0434\u043E 3 000 000 \u0440\u0443\u0431\u043B\u0435\u0439";
  /* defVal % для категорий */

  var realtyProc = 10;
  var autoProc = 20;
  /* defVal min/max для категорий */

  var realtyMin = 1200000;
  var realtyMax = 25000000;
  var autoMin = 500000;
  var autoMax = 5000000;
  var creditMin = 50000;
  var creditMax = 3000000;
  /* defVal years для категорий */

  var realtyYearFirst = 5;
  var realtyYearLast = 30;
  var autoYearFirst = 1;
  var autoYearLast = 5;
  var creditYearFirst = 1;
  var creditYearLast = 7;

  if (dropdownInput.value === 'credit-realty') {
    /* проверяет если категория первоначальный взнос скрыта, то показать */
    if (calcFirstpayWrap.classList.contains('visually-hidden')) {
      calcFirstpayWrap.classList.remove('visually-hidden');
    }

    if (calcStep2.classList.contains('visually-hidden')) {
      calcStep2.classList.remove('visually-hidden');
    }
    /* цикл проверяет все чекбоксы и показывает только для текущей категории */


    for (var i = 0; calcStepCheckbox.length > i; i++) {
      if (calcStepCheckbox[i].children[0].id !== checkboxСapital.id) {
        calcStepCheckbox[i].classList.add('visually-hidden');
      } else {
        calcStepCheckbox[i].classList.remove('visually-hidden');
      }
    }
    /* цикл сбрасывает значения checkbox  */


    for (var _i = 0; calcCheckbox.length > _i; _i++) {
      calcCheckbox[_i].checked = false;
    }

    if (offerSuccess.classList.contains('visually-hidden')) {
      offerFailed.classList.add('visually-hidden');
      offerSuccess.classList.remove('visually-hidden');
    }
    /* записывает defValue в переменную где храниться общая сумма */


    generalSum = defValue;
    /* добавляет min/max для инпута(общей стоимости) */

    inputRealty.min = realtyMin;
    inputRealty.max = realtyMax;
    /* добавляет defVal для инпута(общей стоимости) */
    // inputRealty.value = defValue;

    /* добавляет значение для инпута(первоначальный взнос) */
    // inputFirstpay.value = (generalSum * 10) / 100;

    /* добавляет параметры для инпута(слайдер) */

    inputFirstpayRange.min = realtyProc;
    inputFirstpayRange.max = 100;
    inputFirstpayRange.step = 5;
    inputFirstpayRange.value = realtyProc;
    /* добавляет параметры для инпута(дата) */

    inputDateRange.min = realtyYearFirst;
    inputDateRange.max = 30;
    inputDateRange.step = 1;
    inputDateRange.value = realtyYearFirst; // inputDate.value = realtyYearFirst;

    offerSuccessText.textContent = "\u0421\u0443\u043C\u043C\u0430 \u0438\u043F\u043E\u0442\u0435\u043A\u0438";
    /* выводим defVal в html */

    calcTitle.textContent = realtyTitle;
    calcCost.textContent = realtyCost;
    calcProcentValue.textContent = realtyProc;
    calcDateFirst.textContent = realtyYearFirst + ' лет';
    calcDateLast.textContent = realtyYearLast + ' лет';
  } else if (dropdownInput.value === 'credit-auto') {
    /* проверяет если категория первоначальный взнос скрыта, то показать */
    if (calcFirstpayWrap.classList.contains('visually-hidden')) {
      calcFirstpayWrap.classList.remove('visually-hidden');
    }

    if (calcStep2.classList.contains('visually-hidden')) {
      calcStep2.classList.remove('visually-hidden');
    }
    /* цикл проверяет все чекбоксы и показывает только для текущей категории */


    for (var _i2 = 0; calcStepCheckbox.length > _i2; _i2++) {
      if (calcStepCheckbox[_i2].children[0].id !== checkboxKacko.id && calcStepCheckbox[_i2].children[0].id !== checkboxLife.id) {
        calcStepCheckbox[_i2].classList.add('visually-hidden');

        calcStepCheckbox.checked = false;
      } else {
        calcStepCheckbox[_i2].classList.remove('visually-hidden');
      }
    }
    /* цикл сбрасывает значения checkbox  */


    for (var _i3 = 0; calcCheckbox.length > _i3; _i3++) {
      calcCheckbox[_i3].checked = false;
    }

    if (offerSuccess.classList.contains('visually-hidden')) {
      offerFailed.classList.add('visually-hidden');
      offerSuccess.classList.remove('visually-hidden');
    }
    /* записывает defValue в переменную где зраниться общая сумма */


    generalSum = defValue;
    /* добавляет min/max для инпута(первоначальный взнос) */

    inputRealty.min = autoMin;
    inputRealty.max = autoMax;
    /* добавляет defVal для инпута(первоначальный взнос) */

    inputRealty.value = defValue;
    /* добавляет значение для инпута(первоначальный взнос) */

    inputFirstpay.value = generalSum * 20 / 100;
    /* добавляет параметры для инпута(слайдер) */

    inputFirstpayRange.value = autoProc;
    inputFirstpayRange.min = autoProc;
    inputFirstpayRange.max = 100;
    inputFirstpayRange.step = 5;
    /* добавляет параметры для инпута(дата) */

    inputDateRange.min = autoYearFirst;
    inputDateRange.max = 5;
    inputDateRange.step = 1;
    inputDateRange.value = autoYearFirst; // inputDate.value = autoYearFirst;

    offerSuccessText.textContent = "\u0421\u0443\u043C\u043C\u0430 \u0430\u0432\u0442\u043E\u043A\u0440\u0435\u0434\u0438\u0442\u0430";
    /* выводим defVal в html */

    calcTitle.textContent = autoTitle;
    calcCost.textContent = autoCost;
    calcProcentValue.textContent = autoProc;
    calcDateFirst.textContent = autoYearFirst + ' лет';
    calcDateLast.textContent = autoYearLast + ' лет';
  } else if (dropdownInput.value === 'credit-user') {
    /* цикл проверяет все чекбоксы и показывает только для текущей категории */
    for (var _i4 = 0; calcStepCheckbox.length > _i4; _i4++) {
      if (calcStepCheckbox[_i4].children[0].id !== checkboxProject.id) {
        calcStepCheckbox[_i4].classList.add('visually-hidden');

        calcStepCheckbox.checked = false;
      } else {
        calcStepCheckbox[_i4].classList.remove('visually-hidden');
      }
    }

    if (calcStep2.classList.contains('visually-hidden')) {
      calcStep2.classList.remove('visually-hidden');
    }
    /* цикл сбрасывает значения checkbox  */


    for (var _i5 = 0; calcCheckbox.length > _i5; _i5++) {
      calcCheckbox[_i5].checked = false;
    }

    if (offerSuccess.classList.contains('visually-hidden')) {
      offerFailed.classList.add('visually-hidden');
      offerSuccess.classList.remove('visually-hidden');
    }
    /* записывает defValue в переменную где храниться общая сумма */


    generalSum = defValue;
    /* добавляет min/max для инпута(credit-realty) */

    inputRealty.min = creditMin;
    inputRealty.max = creditMax;
    /* добавляет defVal для инпута(credit-realty) */

    inputRealty.value = defValue;
    /* добавляет значение для инпута(первоначальный взнос) */

    inputFirstpay.value = 0;
    offerSuccessText.textContent = "\u0421\u0443\u043C\u043C\u0430 \u043A\u0440\u0435\u0434\u0438\u0442\u0430";
    /* добавляет параметры для инпута(дата) */

    inputDateRange.min = creditYearFirst;
    inputDateRange.max = 7;
    inputDateRange.step = 1;
    inputDateRange.value = creditYearFirst;
    inputDate.value = creditYearFirst;
    /* выводим defVal в html */

    calcTitle.textContent = creditTitle;
    calcCost.textContent = creditCost;
    calcDateFirst.textContent = creditYearFirst + ' лет';
    calcDateLast.textContent = creditYearLast + ' лет';
    /* скрывает блок */

    calcFirstpayWrap.classList.add('visually-hidden');
  }
};
/*
 * calculation.js
 */

/* получает введенную сумму и записывает в generalSum*/


var getGeneralSum = function getGeneralSum() {
  /* проверяет если общая сумма NaN, то добавляет defValue */
  if (inputRealty.value === '') {
    /* добавляет defVal для инпута(общей стоимости) */
    inputRealty.value = defValue;
    generalSum = inputRealty.valueAsNumber;
  } else {
    generalSum = inputRealty.valueAsNumber;
  }
};
/* проверяет основную сумму на min/max и выводит сообщение в случае !valid */


var checkGeneralSum = function checkGeneralSum(target) {
  /* Если валидность false */
  if (!target.validity.valid) {
    /* Если значение больше */
    if (target.validity.rangeUnderflow) {
      calcRealtyError.textContent = "\u0412\u0437\u043D\u043E\u0441 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 ".concat(target.min);
      calcRealtyError.style.color = '#d40101';
      calcRealtyError.style.display = 'block';
      inputRealty.style.border = '1px solid #d40101';
      offerBtn.disabled = true;
      return false;
    } else if (target.validity.rangeOverflow) {
      /* Если значение меньше */
      calcRealtyError.textContent = "\u0412\u0437\u043D\u043E\u0441 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435 ".concat(target.max);
      calcRealtyError.style.color = '#d40101';
      inputRealty.style.border = '1px solid #d40101';
      calcRealtyError.style.display = 'block';
      offerBtn.disabled = true;
      return false;
    }
    /* Если валидность true */

  } else {
    calcRealtyError.textContent = "";
    calcRealtyError.style.display = 'none';
    inputRealty.style.border = '';
    offerBtn.disabled = false;
    return true;
  }
};
/* Задает дефолтный % для категории */


var setDefProcent = function setDefProcent() {
  /* defVal % для категорий */
  var realtyProc = 10;
  var autoProc = 20;

  if (dropdownInput.value === 'credit-realty') {
    var value = Number(inputFirstpay.value);
    procent = realtyProc;
    /* выводим % в html */

    calcProcentValue.textContent = procent;
    /* вычисляем какой % от суммы */

    procentSum = generalSum / 100 * procent;
    /* проверка на введенное число, если value < min, то def % */

    if (value > procentSum) {
      inputFirstpay.value = value;
      inputFirstpayRange.value = realtyProc;
      procentSum = value;
    } else {
      /* добавляет procent в value инпута(первоначальный взнос) */
      inputFirstpay.value = procentSum;
      inputFirstpayRange.value = realtyProc;
    }
  } else if (dropdownInput.value === 'credit-auto') {
    var _value = Number(inputFirstpay.value);

    procent = autoProc;
    /* выводим % в html */

    calcProcentValue.textContent = procent;
    /* вычисляем какой % от суммы */

    procentSum = generalSum / 100 * procent;
    /* проверка на введенное число, если value < min, то def % */

    if (_value > procentSum) {
      inputFirstpay.value = _value;
      inputFirstpayRange.value = autoProc;
      procentSum = _value;
    } else {
      /* добавляет procent в value инпута(первоначальный взнос) */
      inputFirstpay.value = procentSum;
      inputFirstpayRange.value = autoProc;
    }
  }
};
/* Задает % для категории */


var setCurProcent = function setCurProcent() {
  if (dropdownInput.value === 'credit-user') {
    procentSum = 0;
  } else {
    /* получает % */
    procent = Number(inputFirstpayRange.value);
    /* выводим % в html */

    calcProcentValue.textContent = procent;
    /* вычисляем какой % от суммы */

    procentSum = generalSum / 100 * procent;
    /* добавляет procent в value инпута(первоначальный взнос) */

    inputFirstpay.value = procentSum;
  }
};
/* получает срок кредитования */


var getSumYears = function getSumYears() {
  /* Значение input[type='range'] записывает в переменную dateSum */
  dateSum = inputDateRange.value;
  inputDate.value = dateSum;
  calcDateFirst.textContent = dateSum + ' лет';
  inputDateRange.value = dateSum;
};
/* получает срок кредитования */


var getPutYears = function getPutYears() {
  /* Значение input[type='range'] записывает в переменную dateSum */
  dateSum = Number(inputDate.value);
  var dateMin = Number(inputDateRange.min);
  var dateMax = Number(inputDateRange.max);

  if (dateSum < dateMin) {
    dateSum = dateMin;
  } else if (dateSum > dateMax) {
    dateSum = dateMax;
  }

  inputDate.value = dateSum;
  calcDateFirst.textContent = dateSum + ' лет';
  inputDateRange.value = dateSum;
};
/* получает ежемесячный платеж */


var getPayMonth = function getPayMonth() {
  var countPeriods = dateSum * 12;
  payMonth = Math.round(sumCredit * (procRateMonth / (1 - 1 / Math.pow(1 + procRateMonth, countPeriods))));
  profitMonth = Math.round(payMonth / 0.45);
};
/* Получить сумму кредита */


var calcSumCredit = function calcSumCredit() {
  if (checkboxСapital.checked) {
    sumCredit = generalSum - procentSum - capital;
  } else {
    sumCredit = generalSum - procentSum;
  }
};
/* получает % ставку */


var getProcentRate = function getProcentRate() {
  /* если проверка не пройдена на min/max то false  */
  if (!checkGeneralSum(inputRealty)) {
    return false;
  } else {
    if (dropdownInput.value === 'credit-user') {
      /* %=0 т.к. нет блока первоначальный взнос */
      procentSum = 0;

      if (checkboxProject.checked) {
        if (sumCredit >= 2000000) {
          procRate = '9';
          procRateMonth = 9 / 100 / 12;
        } else if (sumCredit >= 750000 && sumCredit < 2000000) {
          procRate = '12';
          procRateMonth = 12 / 100 / 12;
        } else {
          procRate = '14.5';
          procRateMonth = 14.5 / 100 / 12;
        }
      } else {
        if (sumCredit >= 2000000) {
          procRate = '9.5';
          procRateMonth = 9.5 / 100 / 12;
        } else if (sumCredit >= 750000 && sumCredit < 2000000) {
          procRate = '12.5';
          procRateMonth = 12.5 / 100 / 12;
        } else {
          procRate = '15';
          procRateMonth = 15 / 100 / 12;
        }
      }
    } else {
      /* проверяет %, на основе этого находит % ставку  */
      if (dropdownInput.value === 'credit-realty') {
        if (procent >= 20) {
          procRate = '8.5';
          procRateMonth = 8.5 / 100 / 12;
        } else {
          procRate = '9.4';
          procRateMonth = 9.4 / 100 / 12;
        }
      } else if (dropdownInput.value === 'credit-auto') {
        /* проверяет % и checkbox с услугами, на основе этого находит % ставку  */
        if (checkboxKacko.checked && checkboxLife.checked) {
          procRate = '3.5';
          procRateMonth = 3.5 / 100 / 12;
        } else if (checkboxKacko.checked || checkboxLife.checked) {
          procRate = '8.5';
          procRateMonth = 8.5 / 100 / 12;
        } else if (sumCredit >= 2000000) {
          procRate = '15';
          procRateMonth = 15 / 100 / 12;
        } else {
          procRate = '16';
          procRateMonth = 16 / 100 / 12;
        }
      }
    }

    return true;
  }
};
/* получает step для инпута */


var getStep = function getStep(e) {
  var target = e.target;
  var realtyStep = 100000;
  var otherStep = 50000;

  if (target.id === calcPlus.id) {
    if (dropdownInput.value === 'credit-realty') {
      generalSum += realtyStep;
      inputRealty.value = generalSum;
    } else {
      generalSum += otherStep;
      inputRealty.value = generalSum;
    }
  } else if (target.id === calcMinus.id) {
    if (dropdownInput.value === 'credit-realty') {
      generalSum -= realtyStep;
      inputRealty.value = generalSum;
    } else {
      generalSum -= otherStep;
      inputRealty.value = generalSum;
    }
  }
};
/* получает step для инпута */


var disableForm = function disableForm(state) {
  inputRealty.disabled = state;
  calcPlus.disabled = state;
  calcMinus.disabled = state;
  inputFirstpay.disabled = state;
  inputFirstpayRange.disabled = state;
  inputDate.disabled = state;
  inputDateRange.disabled = state;

  for (var i = 0; calcStepCheckbox.length > i; i++) {
    calcStepCheckbox[i].children[0].disabled = state;
  }
};
/* добавляет события для всех checkbox */


for (var i = 0; calcStepCheckbox.length > i; i++) {
  var ckeckbox = calcStepCheckbox[i].children[0];
  ckeckbox.addEventListener('click', function () {
    /* После ввода стоимости недвижимости, должно автоматически проставляться минимальное значение первоначального взноса. */
    setDefProcent();
    /* получает сумму кредита */

    calcSumCredit();
    /* получает % ставку */

    getProcentRate();
    /* получает количество лет */

    getSumYears();
    /* вычисляет ежемесячный платеж */

    getPayMonth();
    /* показывает offer */

    getOffer();
  });
}
/* добавляет нули к номеру заказа */


function addZero(num, size) {
  num++;
  var s = num + '';

  while (s.length < size) {
    s = '0' + s;
  }

  return s;
}
/*
 * offer.js
 */

/* отображает значения для offer */


var getOffer = function getOffer() {
  if (dropdownInput.value === 'credit-realty') {
    if (sumCredit < 500000) {
      offerFailedText.textContent = "\u041D\u0430\u0448 \u0431\u0430\u043D\u043A \u043D\u0435 \u0432\u044B\u0434\u0430\u0451\u0442 \u0438\u043F\u043E\u0442\u0435\u0447\u043D\u044B\u0435 \u043A\u0440\u0435\u0434\u0438\u0442\u044B \u043C\u0435\u043D\u044C\u0448\u0435 500 000 \u0440\u0443\u0431\u043B\u0435\u0439";
      offerFailed.classList.remove('visually-hidden');
      offerSuccess.classList.add('visually-hidden');
    } else {
      offerFailed.classList.add('visually-hidden');
      offerSuccess.classList.remove('visually-hidden');
      offerSum.textContent = "".concat(sumCredit, " \u0440\u0443\u0431\u043B\u0435\u0439");
      offerProc.textContent = "".concat(procRate, " %");
      offerMonthpay.textContent = "".concat(payMonth, " \u0440\u0443\u0431\u043B\u0435\u0439");
      offerMonthprofit.textContent = "".concat(profitMonth, " \u0440\u0443\u0431\u043B\u0435\u0439");
    }
  } else if (dropdownInput.value === 'credit-auto') {
    if (sumCredit < 200000) {
      offerFailedText.textContent = "\u041D\u0430\u0448 \u0431\u0430\u043D\u043A \u043D\u0435 \u0432\u044B\u0434\u044B\u0435\u0442 \u0430\u0432\u0442\u043E\u043A\u0440\u0435\u0434\u0438\u0442\u044B \u043C\u0435\u043D\u044C\u0448\u0435 200000 \u0440\u0443\u0431\u043B\u0435\u0439";
      offerFailed.classList.remove('visually-hidden');
      offerSuccess.classList.add('visually-hidden');
    } else {
      offerFailed.classList.add('visually-hidden');
      offerSuccess.classList.remove('visually-hidden');
      offerSum.textContent = "".concat(sumCredit, " \u0440\u0443\u0431\u043B\u0435\u0439");
      offerProc.textContent = "".concat(procRate, " %");
      offerMonthpay.textContent = "".concat(payMonth, " \u0440\u0443\u0431\u043B\u0435\u0439");
      offerMonthprofit.textContent = "".concat(profitMonth, " \u0440\u0443\u0431\u043B\u0435\u0439");
    }
  } else {
    if (dropdownInput.value === 'credit-user') {
      offerSum.textContent = "".concat(sumCredit, " \u0440\u0443\u0431\u043B\u0435\u0439");
      offerProc.textContent = "".concat(procRate, " %");
      offerMonthpay.textContent = "".concat(payMonth, " \u0440\u0443\u0431\u043B\u0435\u0439");
      offerMonthprofit.textContent = "".concat(profitMonth, " \u0440\u0443\u0431\u043B\u0435\u0439");
    }
  }
};
/* сброс значения для offer */


var getOfferReset = function getOfferReset() {
  offerSum.textContent = '';
  offerProc.textContent = '';
  offerMonthpay.textContent = '';
  offerMonthprofit.textContent = '';
};

var getRequest = function getRequest() {
  var hidden;

  if (dropdownInput.value === 'credit-realty') {
    requestTarget = 'Ипотека';
    requestPrice = 'Стоимость недвижимости';
  } else if (dropdownInput.value === 'credit-auto') {
    requestTarget = 'Автокредит';
    requestPrice = 'Стоимость автомобиля';
  } else if (dropdownInput.value === 'credit-user') {
    requestTarget = 'Потребительский кредит';
    requestPrice = 'Сумма кредита';
    hidden = "style='display: none;'";
  }

  requestWrap.insertAdjacentHTML('afterbegin', "<div class='calc__request-item'>\n        <p>\u041D\u043E\u043C\u0435\u0440 \u0437\u0430\u044F\u0432\u043A\u0438</p>\n        <span>\u2116 ".concat(requestNumber, "</span>\n      </div>\n    \n      <div class='calc__request-item'>\n        <p>\u0426\u0435\u043B\u044C \u043A\u0440\u0435\u0434\u0438\u0442\u0430</p>\n        <span>").concat(requestTarget, "</span>\n      </div>\n    \n      <div class='calc__request-item'>\n        <p>").concat(requestPrice, "</p>\n        <span>").concat(generalSum, " \u0440\u0443\u0431\u043B\u0435\u0439</span>\n      </div>\n    \n      <div class='calc__request-item' ").concat(hidden, ">\n        <p>\u041F\u0435\u0440\u0432\u043E\u043D\u0430\u0447\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u0437\u043D\u043E\u0441</p>\n        <span>").concat(procentSum, " \u0440\u0443\u0431\u043B\u0435\u0439</span>\n      </div>\n    \n      <div class='calc__request-item'>\n        <p>\u0421\u0440\u043E\u043A \u043A\u0440\u0435\u0434\u0438\u0442\u043E\u0432\u0430\u043D\u0438\u044F</p>\n        <span>").concat(dateSum, " \u043B\u0435\u0442</span>\n      </div>"));
};
/*
 * calcOn.js
 */

/* Событие при изменения значения */


inputRealty.oninput = function () {
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */

  if (!checkGeneralSum(inputRealty)) {
    return;
  }
  /* После ввода стоимости недвижимости, должно автоматически проставляться минимальное значение первоначального взноса. */


  setDefProcent();
  /* получает сумму кредита */

  calcSumCredit();
  /* получает % ставку */

  getProcentRate();
  /* получает количество лет */

  getSumYears();
  /* вычисляет ежемесячный платеж */

  getPayMonth();
  /* показывает offer */

  getOffer();
};
/* Отслеживание клика plus */


calcPlus.onclick = function (e) {
  getStep(e);
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */

  if (!checkGeneralSum(inputRealty)) {
    return;
  }
  /* получает текущий % */


  setCurProcent();
  /* получает сумму кредита */

  calcSumCredit();
  /* получает % ставку */

  getProcentRate();
  /* получает количество лет */

  getSumYears();
  /* вычисляет ежемесячный платеж */

  getPayMonth();
  /* показывает offer */

  getOffer();
};
/* Отслеживание клика minus */


calcMinus.onclick = function (e) {
  getStep(e);
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */

  if (!checkGeneralSum(inputRealty)) {
    return;
  }
  /* получает текущий % */


  setCurProcent();
  /* получает сумму кредита */

  calcSumCredit();
  /* получает % ставку */

  getProcentRate();
  /* получает количество лет */

  getSumYears();
  /* вычисляет ежемесячный платеж */

  getPayMonth();
  /* показывает offer */

  getOffer();
};
/* Отслеживание изменения % первоначального взноса */


inputFirstpayRange.onchange = function () {
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */

  if (!checkGeneralSum(inputRealty)) {
    return;
  }
  /* получает текущий % */


  setCurProcent();
  /* получает сумму кредита */

  calcSumCredit();
  /* получает % ставку */

  getProcentRate();
  /* получает количество лет */

  getSumYears();
  /* вычисляет ежемесячный платеж */

  getPayMonth();
  /* показывает offer */

  getOffer();
};
/* Отслеживание изменения % первоначального взноса */


inputFirstpay.onchange = function () {
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */

  if (!checkGeneralSum(inputRealty)) {
    return;
  }
  /* получает текущий % */


  setDefProcent();
  /* получает сумму кредита */

  calcSumCredit();
  /* получает % ставку */

  getProcentRate();
  /* получает количество лет */

  getSumYears();
  /* вычисляет ежемесячный платеж */

  getPayMonth();
  /* показывает offer */

  getOffer();
};
/* Отслеживание изменения срока кредитования */


inputDateRange.onchange = function () {
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */

  if (!checkGeneralSum(inputRealty)) {
    return;
  }
  /* получает текущий % */


  setCurProcent();
  /* получает сумму кредита */

  calcSumCredit();
  /* получает % ставку */

  getProcentRate();
  /* получает количество лет */

  getSumYears();
  /* вычисляет ежемесячный платеж */

  getPayMonth();
  /* показывает offer */

  getOffer();
};
/* Отслеживание изменения срока кредитования */


inputDate.onchange = function () {
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */

  if (!checkGeneralSum(inputRealty)) {
    return;
  }
  /* получает текущий % */


  setCurProcent();
  /* получает сумму кредита */

  calcSumCredit();
  /* получает % ставку */

  getProcentRate();
  /* получает количество лет */

  getPutYears();
  /* вычисляет ежемесячный платеж */

  getPayMonth();
  /* показывает offer */

  getOffer();
};
/* отслеживает клик по кнопки Оформить заявку*/


offerBtn.onclick = function (e) {
  e.preventDefault();
  /* проверка на ввод значений */

  if (typeof procentSum !== 'undefined') {
    // calcFlex.classList.add('visually-hidden');
    disableForm(true);
    formName.focus();
    offerBtn.disabled = true;
    /* прибавляет ++ к номеру заказа, ТОЛЬКО один раз */

    if (requestNumber === 0) {
      requestNumber = addZero(requestNumber, 4);
    }

    getRequest();
    request.classList.remove('visually-hidden'); // сбросить значения

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      input.value = '';
    }
  } else {
    return;
  }
};
/* отслеживает клик по кнопки Отправить*/


requestBtn.onclick = function (e) {
  e.preventDefault();
  var error = 0; // Пройдёмся по всем полям

  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i]; // Проверим валидность поля, используя встроенную в JavaScript функцию checkValidity()

    if (input.checkValidity() === false) {
      error++;
      input.style.border = '1px solid #d40101';
    } else {
      input.style.border = 'none';
    }
  }

  if (error === 0) {
    /* открытие модального окна */
    openOverlay(overlay);
    /* хранение данных в localStorage */

    localStorage.setItem('name', formName.value);
    localStorage.setItem('phone', formPhone.value);
    localStorage.setItem('email', formEmail.value);
    /* скрыывает запрос */

    request.classList.add('visually-hidden');
    offrOverlay.classList.remove('visually-hidden');
    /* очищает поля запроса */

    requestWrap.innerHTML = '';
    requestNumber = addZero(requestNumber, 4);
    disableForm(false);
    getOfferReset();
    getDefValue();
  }
};
/* Событие при изменении категории */


dropdown.onclick = function (e) {
  if (e.target.classList.contains('active')) {
    return;
  }

  getDefValue(); // getSumYears();

  getOfferReset();
};
/*
 * modal.js
 */

/* модальное окно - Спасибо за обращение */


var esc = 27;
var overlay = document.getElementById('overlay');
var offrOverlay = document.getElementById('offer-overlay');
var iconClose = document.getElementById('close-overlay');
var inputLogin = document.getElementById('login');

var closeOverlay = function closeOverlay(target) {
  overlay.classList.add('visually-hidden');
  target.classList.add('visually-hidden');
  body.style.overflow = 'auto';
};

var openOverlay = function openOverlay(target) {
  overlay.classList.remove('visually-hidden');
  target.classList.remove('visually-hidden');
  body.style.overflow = 'hidden';
  inputLogin.focus();
};
/* закрытие модального окна */


iconClose.onclick = function () {
  closeOverlay(offrOverlay);
};

window.addEventListener('keydown', function (e) {
  if (e.code === 'Escape' || e.keyCode === esc) {
    closeOverlay(offrOverlay);
  }
});
/* Модальное окно */

var enterCabinet = document.getElementById('enter-cabinet');
var modal = document.getElementById('modal');
var modalClose = document.getElementById('modal-close');
var showPassword = document.getElementById('show-password');
var inputPassword = document.getElementById('password');

enterCabinet.onclick = function () {
  openOverlay(modal);
};

modalClose.onclick = function () {
  closeOverlay(modal);
};

overlay.onclick = function () {
  if (modal.classList.contains('visually-hidden')) {
    closeOverlay(offrOverlay);
  } else if (offrOverlay.classList.contains('visually-hidden')) {
    closeOverlay(modal);
  }
};

window.addEventListener('keydown', function (e) {
  if (e.code === 'Escape' || e.keyCode === esc) {
    if (modal.classList.contains('visually-hidden')) {
      closeOverlay(offrOverlay);
    } else if (offrOverlay.classList.contains('visually-hidden')) {
      closeOverlay(modal);
    }
  }
});

showPassword.onclick = function () {
  if (inputPassword.type === 'password') {
    inputPassword.type = 'text';
  } else {
    inputPassword.type = 'password';
  }
};
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
/* Слайдер для блока slider */


var mySwiper = new Swiper('#swiper1', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  autoplay: {
    delay: 4000
  },
  loop: true
});
/* Слайдер для блока tab */

var tabSwiper = new Swiper('#swiper2', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});
/* маска формы телефона */

$("#phone").mask("8(999) 999-9999");
/*Dropdown Menu*/

$('.dropdown').click(function () {
  $(this).attr('tabindex', 1).focus();
  $(this).toggleClass('active');
  $(this).find('.dropdown__menu').slideToggle(300);
});
$('.dropdown').focusout(function () {
  $(this).removeClass('active');
  $(this).find('.dropdown__menu').slideUp(300);
});
$('.dropdown .dropdown__menu li').click(function () {
  $(this).parents('.dropdown').find('span').text($(this).text());
  $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
});
/*End Dropdown Menu*/

$('.dropdown__menu li').click(function () {
  var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
      msg = '<span class="msg">Hidden input value: ';
  $('.msg').html(msg + input + '</span>');
});
/* valueAsNumber */

(function () {
  /* Internet Explorer 11 may have trouble retrieving the number type
  of an input value. This short script performs a quick test, and repairs
  the functionality if necessary. Load before attempting to use the
  `valueAsNumber` property on input elements. */
  "use strict";

  var a = document.createElement("input");
  a.setAttribute("type", "number");
  a.setAttribute("value", 2319);

  if ("valueAsNumber" in a && a.value != a.valueAsNumber) {
    if ("defineProperty" in Object && "getPrototypeOf" in Object) {
      Object.defineProperty(Object.getPrototypeOf(a), "valueAsNumber", {
        get: function get() {
          return parseInt(this.value, 10);
        }
      });
    }
  }
})();
/* eslint-disable */
'use strict';
/* Yandex map */

ymaps.ready(init);

function init() {
  // Создание карты.
  var myMap = new ymaps.Map('map', {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.58873129, 56.70376289],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 3,
    controls: ['zoomControl', 'geolocationControl'],
    behaviors: ['drag']
  }); // Функция, которая по состоянию чекбоксов в меню
  // показывает или скрывает геообъекты из выборки.

  function checkState() {
    var shownObjects;
    var byCity = new ymaps.GeoQueryResult(); // Отберем объекты по форме.

    if ($('#rus').prop('checked')) {
      byCity = myObjects.search('options.iconContent = "RUS"');
    }

    if ($('#cng').prop('checked')) {
      byCity = myObjects.search('options.iconContent = "CNG"').add(byCity);
    }

    if ($('#euro').prop('checked')) {
      byCity = myObjects.search('options.iconContent = "EURO"').add(byCity);
    } // Мы отобрали объекты по цвету и по форме. Покажем на карте объекты,
    // которые совмещают нужные признаки.


    shownObjects = byCity.addToMap(myMap); // Объекты, которые не попали в выборку, нужно убрать с карты.

    myObjects.remove(shownObjects).removeFromMap(myMap);
  }

  $('#rus').click(checkState);
  $('#cng').click(checkState);
  $('#euro').click(checkState); // Создадим объекты из их JSON-описания и добавим их на карту.

  window.myObjects = ymaps.geoQuery({
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [55.75897861, 37.6158744]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [58.59281591, 49.66310862]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [51.55538262, 46.059593]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [57.18885551, 65.57131175]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [55.00336661, 73.30568675]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [59.94241846, 30.2392805]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [40.36391621, 49.83888987]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'CNG'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [41.29850313, 69.30666331]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'CNG'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [53.87639833, 27.55861644]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'CNG'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [43.22421706, 76.90920237]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'CNG'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [48.9644317, 2.29006175]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'EURO'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [50.05179937, 14.50685862]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'EURO'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [51.61013852, -0.08298513]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'EURO'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [42.05625121, 12.6611555]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'EURO'
      }
    }]
  }).addToMap(myMap);
}
