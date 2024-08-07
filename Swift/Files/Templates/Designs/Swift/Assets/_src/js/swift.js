import * as bootstrap from 'bootstrap';
import { Favorites } from './_favorites';
import { Cart } from './_cart';
import { Scroll } from './_scroll';
import { ProductList } from './_productlist';
import { PageUpdater } from './_pageupdater';
import { LocationsMap } from './_locationsmap';
import { Places } from './_places';
import { ProductExport } from './_productexport';
import { StaticVariants } from './_staticvariants';
import { VariantSelector } from './_variantselector';
import { Video } from './_video';
import { Image } from './_image';
import { Typeahead } from './_typeahead';
import { AssetLoader } from './_assetLoader';
import { LiveProductInfo } from './_live-product-info';
import { BackInStockNotification } from './_backInStockNotification';
import { ExpressBuy } from './_expressBuy';
import { Menu } from './_menu';

//Bootstrap
window.bootstrap = bootstrap;

//Swift modules
const swift = function () {
	return {
		Cart: Cart,
		Favorites: Favorites,
		Scroll: Scroll,
		ProductList: ProductList,
		PageUpdater: PageUpdater,
		LocationsMap: LocationsMap,
		Places: Places,
		ProductExport: ProductExport,
		StaticVariants: StaticVariants,
		VariantSelector: VariantSelector,
		Typeahead: Typeahead,
		Video: Video,
		Image: Image,
		AssetLoader: AssetLoader,
		LiveProductInfo: LiveProductInfo,
		BackInStockNotification: BackInStockNotification,
		ExpressBuy: ExpressBuy,
		Menu: Menu
	}
}();
export { swift };

window.swift = swift;

//Popstate
window.onpopstate = function (event) {
	swift.Typeahead.navigateToPage(document.location.href);
};

window.addEventListener("DOMContentLoaded", () => {
	const dropdowns = document.querySelectorAll("#page-header-desktop .dropdown");
  
	dropdowns.forEach((dropdown) => {
	  const dropdownToggle = dropdown.querySelector(
		'[data-bs-toggle="dropdown"]'
	  );
	  const dropdownMenu = dropdown.querySelector(".dropdown-menu");
  
	  if (dropdownToggle) {
		const bsMenu = new bootstrap.Dropdown(dropdownToggle);
  
		dropdown.addEventListener("mouseenter", () => {
		  dropdownMenu.classList.toggle("mouseover");
		  bsMenu.show();
		  dropdownToggle.style.outline = "none";
		});
  
		dropdown.addEventListener("mouseleave", () => {
		  dropdownMenu.classList.toggle("mouseover");
		  bsMenu.hide();
		});
  
		dropdownToggle.addEventListener("click", () => {
		  if (dropdownToggle.hasAttribute("href")) {
			window.location = dropdownToggle.getAttribute("href");
		  }
		});
	  }
	});
  });

