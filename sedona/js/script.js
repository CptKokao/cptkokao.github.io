var search = document.querySelector(".button-search");
var popup = document.querySelector(".modal-search");

search.addEventListener("click", function (evt) {
	evt.preventDefault();
    popup.classList.toggle("visually-hidden");
});
