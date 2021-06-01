import "regenerator-runtime/runtime";
import { Collapse, Dropdown, Modal, Offcanvas } from 'bootstrap';
import { tns } from 'tiny-slider/src/tiny-slider';
import { Sliders } from './_sliders';
import { Cart } from './_cart';
import { ProductList } from './_productlist';
import { VariantSelector } from './_variantselector';

import { Typeahead } from './_typeahead';
import { hcOffcanvasNav } from 'hc-offcanvas-nav';

window.Modal = Modal;

window.tns = tns;
window.Sliders = Sliders;
window.Cart = Cart;
window.ProductList = ProductList;
window.VariantSelector = VariantSelector;
window.Typeahead = Typeahead;


document.addEventListener('DOMContentLoaded', function (event) {
	ProductList.init();
	VariantSelector.init();
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

		if (document.body.scrollTop > headerHeight || document.documentElement.scrollTop > headerHeight) {
			if (currentTheme !== mainTheme) {
				var alternativeThemeClasses = alternativeTheme.split(" ");
				for (var i = 0; i < alternativeThemeClasses.length; i++) {
					if (alternativeThemeClasses[i] != "") {
						element.classList.remove(alternativeThemeClasses[i]);
					}
				}

				var mainThemeClasses = mainTheme.split(" ");
				for (var i = 0; i < mainThemeClasses.length; i++) {
					if (mainThemeClasses[i] != "") {
						element.classList.add(mainThemeClasses[i]);
					}
				}
			}
		} else {
			if (currentTheme !== alternativeTheme) {
				var mainThemeClasses = mainTheme.split(" ");
				for (var i = 0; i < mainThemeClasses.length; i++) {
					if (mainThemeClasses[i] != "") {
						element.classList.remove(mainThemeClasses[i]);
					}
				}

				var alternativeThemeClasses = alternativeTheme.split(" ");
				for (var i = 0; i < alternativeThemeClasses.length; i++) {
					if (alternativeThemeClasses[i] != "") {
						element.classList.add(alternativeThemeClasses[i]);
					}
				}
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
