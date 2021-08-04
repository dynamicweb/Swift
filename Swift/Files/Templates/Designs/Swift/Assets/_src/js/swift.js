import { Alert, Button, Carousel, Collapse, Dropdown, Modal, Offcanvas, Popover, ScrollSpy, Tab, Toast, Tooltip } from 'bootstrap';
import { tns } from 'tiny-slider/src/tiny-slider';
import { Sliders } from './_sliders';
import { Cart } from './_cart';
import { Scroll } from './_scroll';
import { ProductList } from './_productlist';
import { PageUpdater } from './_pageupdater';
import { VariantSelector } from './_variantselector';
import { Typeahead } from './_typeahead';

window.Alert = Alert;
window.Button = Button;
window.Carousel = Carousel;
window.Collapse = Collapse;
window.Dropdown = Dropdown;
window.Modal = Modal;
window.Offcanvas = Offcanvas;
window.Popover = Popover;
window.ScrollSpy = ScrollSpy;
window.Tab = Tab;
window.Toast = Toast;
window.Tooltip = Tooltip;
window.tns = tns;
window.Sliders = Sliders;
window.Cart = Cart;
window.Scroll = Scroll;
window.ProductList = ProductList;
window.PageUpdater = PageUpdater;
window.VariantSelector = VariantSelector;
window.Typeahead = Typeahead;

window.onpopstate = function (event) {
	Typeahead.navigateToPage(document.location.href);
};


