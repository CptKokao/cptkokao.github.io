/* eslint-disable */
'use strict';

$('.hslider').slick({
  infinite: true,
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 1,
  dots: true,
});

$('.sslider').slick({
  infinite: false,
  variableWidth: true,
  slidesToShow: 4,
  dots: true,
});

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.querySelector(".header__nav");
var logoBlack = document.querySelector(".logo-black");
var logoColor = document.querySelector(".logo-color");

// Get the offset position of the navbar
var sticky = navbar.offsetHeight;


// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}