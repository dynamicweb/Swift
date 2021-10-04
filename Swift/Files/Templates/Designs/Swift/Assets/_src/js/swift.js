import * as bootstrap from 'bootstrap';
import { tns } from 'tiny-slider/src/tiny-slider';
import { Sliders } from './_sliders';
import { Cart } from './_cart';
import { Scroll } from './_scroll';
import { ProductList } from './_productlist';
import { PageUpdater } from './_pageupdater';
import { VariantSelector } from './_variantselector';
import { Typeahead } from './_typeahead';
import { AOS } from 'aos';
import * as Plyr from 'plyr';


//Bootstrap
window.bootstrap = bootstrap;

//Tiny slider
window.tns = tns;

//Plyr video
window.Plyr = Plyr;

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

//Popstate
window.onpopstate = function (event) {
	swift.Typeahead.navigateToPage(document.location.href);
};

AOS.init();
