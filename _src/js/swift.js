// Swift Web Components
import "./components/VideoPlayer";

// Swift modules
import { Favorites } from "./_favorites";
import { Cart } from "./_cart";
import { ProductList } from "./_productlist";
import { PageUpdater } from "./_pageupdater";
import { LocationsMap } from "./_locationsmap";
import { Places } from "./_places";
import { ProductExport } from "./_productexport";
import { StaticVariants } from "./_staticvariants";
import { VariantSelector } from "./_variantselector";
import { Video } from "./_video";
import { Image } from "./_image";
import { Typeahead } from "./_typeahead";
import { AssetLoader } from "./_assetLoader";
import { BackInStockNotification } from "./_backInStockNotification";
import { ExpressBuy } from "./_expressBuy";
import { Menu } from "./_menu";

// Swift modules
const swift = (function () {
  return {
    Cart: Cart,
    Favorites: Favorites,
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
    BackInStockNotification: BackInStockNotification,
    ExpressBuy: ExpressBuy,
    Menu: Menu,
  };
})();

export { swift };
window.swift = swift;

// Popstate
window.onpopstate = function () {
  swift.Typeahead.navigateToPage(document.location.href);
};

// Dropdown
window.addEventListener("DOMContentLoaded", () => {
  const bootstrap = window.bootstrap || {};
  const dropdowns = document.querySelectorAll("[data-swift-page-header] .dropdown");
  Menu.setMenuContentOffset();

  dropdowns.forEach((dropdown) => {
    const dropdownToggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    
    if (dropdownToggle) {
      let bsMenu = bootstrap.Dropdown.getOrCreateInstance(dropdownToggle);
      let preventFocus = dropdownToggle.focus = () => {
        /*do nothing*/
      };
      
      dropdown.addEventListener("mouseenter", () => {
        dropdownMenu.classList.toggle("mouseover");
        try {
          bsMenu.show();
        } finally {
          dropdownToggle.focus = preventFocus;
        }
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
