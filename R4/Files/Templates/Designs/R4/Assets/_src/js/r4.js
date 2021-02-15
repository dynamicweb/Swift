import "regenerator-runtime/runtime";
import { Collapse, Dropdown } from 'bootstrap';
import { tns } from 'tiny-slider/src/tiny-slider';
import { Sliders } from './_sliders';
import { Cart } from './_cart';
import { ProductList } from './_productlist';

import { hcOffcanvasNav } from 'hc-offcanvas-nav';

window.tns = tns;
window.Sliders = Sliders;
window.Cart = Cart;
window.ProductList = ProductList;

document.addEventListener('DOMContentLoaded', function (event) {
    Sliders.Init();
});
