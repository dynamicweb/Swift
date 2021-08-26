import { Alert, Button, Carousel, Collapse, Dropdown, Modal, Offcanvas, Popover, ScrollSpy, Tab, Toast, Tooltip } from 'bootstrap';
import { tns } from 'tiny-slider/src/tiny-slider';
import { Sliders } from './_sliders';
import { Cart } from './_cart';
import { Scroll } from './_scroll';
import { ProductList } from './_productlist';
import { PageUpdater } from './_pageupdater';
import { VariantSelector } from './_variantselector';
import { Typeahead } from './_typeahead';

//Bootstrap modules
const bootstrap = function () {
	return {
		Alert: Alert,
		Button: Button,
		Carousel: Carousel,
		Collapse: Collapse,
		Dropdown: Dropdown,
		Modal: Modal,
		Offcanvas: Offcanvas,
		Popover: Popover,
		ScrollSpy: ScrollSpy,
		Tab: Tab,
		Toast: Toast,
		Tooltip: Tooltip
	}
}();
export { bootstrap };

window.bootstrap = bootstrap;
window.bootstrap.Alert = Alert;
window.bootstrap.Button = Button;
window.bootstrap.Carousel = Carousel;
window.bootstrap.Collapse = Collapse;
window.bootstrap.Dropdown = Dropdown;
window.bootstrap.Modal = Modal;
window.bootstrap.Offcanvas = Offcanvas;
window.bootstrap.Popover = Popover;
window.bootstrap.ScrollSpy = ScrollSpy;
window.bootstrap.Tab = Tab;
window.bootstrap.Toast = Toast;
window.bootstrap.Tooltip = Tooltip;

//Tiny slider
window.tns = tns;

//Swift modules
const swift = function () {
	return {
		Cart: Cart,
		Sliders: Sliders,
		Scroll: Scroll,
		ProductList: ProductList,
		PageUpdater: PageUpdater,
		VariantSelector: VariantSelector,
		Typeahead: Typeahead
	}
}();
export { swift };

window.swift = swift;
window.swift.Cart = Cart;
window.swift.Sliders = Sliders;
window.swift.Scroll = Scroll;
window.swift.ProductList = ProductList;
window.swift.PageUpdater = PageUpdater;
window.swift.VariantSelector = VariantSelector;
window.swift.Typeahead = Typeahead;


//Popstate
window.onpopstate = function (event) {
	Typeahead.navigateToPage(document.location.href);
};


