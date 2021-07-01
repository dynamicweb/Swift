import "regenerator-runtime/runtime";
import { Collapse, Dropdown, Modal, Offcanvas } from 'bootstrap';
import { tns } from 'tiny-slider/src/tiny-slider';
import { Sliders } from './_sliders';
import { Cart } from './_cart';
import { Scroll } from './_scroll';
import { ProductList } from './_productlist';
import { VariantSelector } from './_variantselector';
import { Typeahead } from './_typeahead';

window.Modal = Modal;
window.Collapse = Collapse;
window.tns = tns;
window.Sliders = Sliders;
window.Cart = Cart;
window.Scroll = Scroll;
window.ProductList = ProductList;
window.VariantSelector = VariantSelector;
window.Typeahead = Typeahead;

window.onpopstate = function (event) {
	Typeahead.navigateToPage(document.location.href);
};


