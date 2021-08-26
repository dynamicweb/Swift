import * as bootstrap from 'bootstrap';
import { tns } from 'tiny-slider/src/tiny-slider';
import { Sliders } from './_sliders';
import { Cart } from './_cart';
import { Scroll } from './_scroll';
import { ProductList } from './_productlist';
import { PageUpdater } from './_pageupdater';
import { VariantSelector } from './_variantselector';
import { Typeahead } from './_typeahead';

//Bootstrap
window.bootstrap = bootstrap;

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


