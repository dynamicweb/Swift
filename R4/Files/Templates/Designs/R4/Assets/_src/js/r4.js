import "regenerator-runtime/runtime";
import { Collapse, Dropdown, Modal } from 'bootstrap';
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
