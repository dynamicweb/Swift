import * as bootstrap from 'bootstrap';
import { Sliders } from './_sliders';
import { Cart } from './_cart';
import { Scroll } from './_scroll';
import { ProductList } from './_productlist';
import { PageUpdater } from './_pageupdater';
import { LocationsMap } from './_locationsmap';
import { VariantSelector } from './_variantselector';
import { Video } from './_video';
import { Typeahead } from './_typeahead';

//Bootstrap
window.bootstrap = bootstrap;

//Swift modules
const swift = function () {
	return {
		Cart: Cart,
		Sliders: Sliders,
		Scroll: Scroll,
		ProductList: ProductList,
		PageUpdater: PageUpdater,
		LocationsMap: LocationsMap,
		VariantSelector: VariantSelector,
		Typeahead: Typeahead,
		Video: Video
	}
}();
export { swift };

window.swift = swift;

//Popstate
window.onpopstate = function (event) {
	swift.Typeahead.navigateToPage(document.location.href);
};
