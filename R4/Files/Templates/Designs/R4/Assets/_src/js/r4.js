import "regenerator-runtime/runtime";
import { Collapse, Dropdown } from 'bootstrap';
import { tns } from 'tiny-slider/src/tiny-slider';
import { Sliders } from './_sliders';
import { Cart } from './_cart';
import { ProductList } from './_productlist';
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< main

========================================================================
import { Lazyimage } from './_lazyimage';
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> feature/776-product-list-optimizations-and-reeflow/f776-product-list-optimizations-and-reeflow
import { Typeahead } from './_typeahead';
import { hcOffcanvasNav } from 'hc-offcanvas-nav';


window.tns = tns;
window.Sliders = Sliders;
window.Cart = Cart;
window.ProductList = ProductList;
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< main
window.Typeahead = Typeahead;
========================================================================
window.Lazyimage = Lazyimage;
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> feature/776-product-list-optimizations-and-reeflow/f776-product-list-optimizations-and-reeflow


document.addEventListener('DOMContentLoaded', function (event) {
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< main
    Sliders.init();
	Typeahead.init();
========================================================================
	Sliders.Init();
	Lazyimage.Init();
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> feature/776-product-list-optimizations-and-reeflow/f776-product-list-optimizations-and-reeflow
});

window.onpopstate = function (event) {
	Typeahead.navigateToPage(document.location.href);
};
