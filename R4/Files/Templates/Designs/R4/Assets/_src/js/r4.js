import "regenerator-runtime/runtime";
import { Collapse, Dropdown, Modal, Offcanvas } from 'bootstrap';
import { tns } from 'tiny-slider/src/tiny-slider';
import { Sliders } from './_sliders';
import { Cart } from './_cart';
import { ProductList } from './_productlist';

import { Typeahead } from './_typeahead';
import { hcOffcanvasNav } from 'hc-offcanvas-nav';

window.Modal = Modal;

window.tns = tns;
window.Sliders = Sliders;
window.Cart = Cart;
window.ProductList = ProductList;
window.Typeahead = Typeahead;


document.addEventListener('DOMContentLoaded', function (event) {
	ProductList.init();
    Sliders.init();
	Typeahead.init();
});

window.onpopstate = function (event) {
	Typeahead.navigateToPage(document.location.href);
};

document.addEventListener('scroll', function (e) {
	var themeChangers = document.querySelectorAll("[data-alternative-theme]");

	themeChangers.forEach(function (element) {
		var currentTheme = element.getAttribute("class");
		var mainTheme = element.getAttribute("data-main-theme");
		var alternativeTheme = element.getAttribute("data-alternative-theme");

		var headerElement = element.closest("header");
		var headerHeight = headerElement.clientHeight;
		console.log(headerHeight);

		if (document.body.scrollTop > headerHeight || document.documentElement.scrollTop > headerHeight) {
			if (currentTheme !== mainTheme) {
				element.setAttribute("class", mainTheme);
			}
		} else {
			if (currentTheme !== alternativeTheme) {
				element.setAttribute("class", alternativeTheme);
			}
		}
	});

	//Hideable elements
	var hideableElements = document.querySelectorAll(".js-hide-on-scroll");

	if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
		hideableElements.forEach(function (element) {
			element.classList.add("d-none");
		});
	} else {
		hideableElements.forEach(function (element) {
			element.classList.remove("d-none");
		});
	}
});
