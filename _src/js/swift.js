// Swift Web Components
import "./components/VideoPlayer";
import "./components/Locationsmap";

// Swift modules
import { Favorites } from "./_favorites";
import { Cart } from "./_cart";
import { ProductList } from "./_productlist";
import { PageUpdater } from "./_pageupdater";
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
import { Authentication } from "./_authentication";

// Swift modules
const swift = (function () {
  return {
    Cart: Cart,
    Favorites: Favorites,
    ProductList: ProductList,
    PageUpdater: PageUpdater,
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
    Authentication: Authentication,
  };
})();

export { swift };
window.swift = swift;
const bootstrap = window.bootstrap || {};

// Popstate
window.onpopstate = function () {
  swift.Typeahead.navigateToPage(document.location.href);
};

// Function to initialize Bootstrap tooltips
function initializeTooltips() {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

// Function to reinitialize tooltips after HTMX updates
function reinitializeTooltips() {
    
  // Dispose of existing tooltips to prevent memory leaks
  const existingTooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...existingTooltips].map(tooltipTriggerEl => {
    const tooltip = bootstrap.Tooltip.getInstance(tooltipTriggerEl);
    if (tooltip) {
      tooltip.dispose();
    }
  });
  
  // Reinitialize all tooltips
  initializeTooltips();
}

// Secure external links
function secureExternalLinks() {
  document.querySelectorAll('a[href*="://"]').forEach(link => {
    if (!link.hasAttribute('target')) link.target = '_blank';
    const rel = link.getAttribute('rel') || '';
    link.setAttribute('rel', `${rel} noopener noreferrer`.trim());
  });
}

// Make reinitializeTooltips available globally for HTMX
window.reinitializeTooltips = reinitializeTooltips;

window.addEventListener("htmx:afterRequest", reinitializeTooltips);

window.addEventListener("DOMContentLoaded", () => {
  
  // Ensure JWT token is requested on page load if any swift-auth element is present and HTMX is loaded
  if (window.htmx) {
    const swiftAuthElements = document.querySelectorAll('[hx-ext~="swift-auth"]');
    if (swiftAuthElements.length > 0) {
      // Intentionally request a token up front so that protected endpoints don't trigger on-demand delays later
      swift.Authentication.EnsureToken();
    }
  }

  // Initialize tooltips on page load
  initializeTooltips();

  // Secure external links on page load
  if (document.documentElement.getAttribute('data-swift-openlinksinnewtab')?.toLowerCase() === 'true') {
    secureExternalLinks();
  }
  
  // Dropdown
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
        dropdownMenu.classList.add("mouseover");
        try {
          bsMenu.show();
        } finally {
          dropdownToggle.focus = preventFocus;
        }
      });

      dropdown.addEventListener("mouseleave", () => {
        dropdownMenu.classList.remove("mouseover");
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


// swift-auth HTMX extension: JWT for dwapi.
// This ensures that any HTMX request using the 'swift-auth' extension:
// - Adds the Authorization header ("htmx:configRequest" event)
if (window.htmx && typeof window.htmx.defineExtension === 'function') {
  htmx.defineExtension('swift-auth', {
    onEvent: function (name, event) {
      
      // Attach the Authorization header before sending the request if JWT present
      if (name === 'htmx:configRequest' && swift.Authentication.token) {
        event.detail.headers.Authorization = 'Bearer ' + swift.Authentication.token;
      }
    }
  });
}