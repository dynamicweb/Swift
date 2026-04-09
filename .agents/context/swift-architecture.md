# Swift Architecture

Swift is a DynamicWeb 10 storefront. Pages are assembled from **paragraph templates** that editors drag-and-drop in the CMS. The platform renders CSHTML, injects data via ViewModels, and Swift adds interactivity with HTMX + Alpine.js.

---

## Template Hierarchy

```
Swift-v2_Master.cshtml          — PageViewModel — HTML shell, loads CSS/JS
  └─ ContentPlaceholder()       — DW renders all paragraphs on the page
       ├─ Paragraph/*.cshtml    — ParagraphViewModel — content blocks
       └─ eCom/**/*.cshtml      — domain ViewModels — product, order, etc.
```

### Master Template

`Files/Templates/Designs/Swift-v2/Swift-v2_Master.cshtml`

Inherits `PageViewModel`. Responsibilities:
- Loads compiled CSS (`swift.css`) + runtime-generated stylesheets (color schemes, button styles, typography) via `Model.TryGetColorSchemeStyle()` etc.
- Loads JS: Bootstrap bundle → HTMX → Alpine.js (deferred) → `swift.js`
- Sets HTML data attributes from area settings (`data-swift-openlinksinnewtab`, etc.)
- Injects Google Tag Manager if area setting `GoogleTagManagerID` is set
- Initialises Bootstrap dropdowns and tooltips in `DOMContentLoaded`; re-initialises tooltips on `htmx:afterRequest`

### Paragraph Templates

`Files/Templates/Designs/Swift-v2/Paragraph/Swift-v2_*.cshtml`

All inherit `ParagraphViewModel`. Access editor-configured settings via `Model.Item.Get*()`. Can read shared product/list data from `Dynamicweb.Context.Current.Items` when rendered inside a product detail or list page.

### eCommerce Templates

`Files/Templates/Designs/Swift-v2/eCom/` — split into:
- `ProductCatalog/` — product display, variant selection, search, filtering
- `CustomerExperienceCenter/` — B2B: orders, quotes, saved carts, RMA
- `Order/` — checkout flow and order receipts

These inherit domain-specific ViewModels (`ProductViewModel`, `ProductListViewModel`, `OrderListViewModel`, etc.) instead of `ParagraphViewModel`.

### QueryPublisher Templates

`Files/Templates/Designs/Swift-v2/QueryPublisher/` — inherit `RazorTemplateBase<RazorTemplateModel<Template>>` (the classic DW template API). Access data via `GetLoop("LoopName")` and `loopItem.GetString("Field.Name")` — **not** ViewModel properties.

---

## Context.Current.Items — Sharing Data Between Templates

Parent templates store their model in the request-scoped dictionary so child paragraph templates can read it without a separate query.

**Parent stores:**
```csharp
// ProductDetailRenderGrid.cshtml
if (Dynamicweb.Context.Current?.Items.Contains("ProductDetails") ?? false)
    Dynamicweb.Context.Current.Items["ProductDetails"] = Model;
else
    Dynamicweb.Context.Current?.Items.Add("ProductDetails", Model);
```

**Child reads:**
```csharp
// Swift-v2_ProductNumber.cshtml, Swift-v2_ProductPrice.cshtml, etc.
ProductViewModel? product = null;
if (Dynamicweb.Context.Current.Items.Contains("ProductDetails"))
    product = (ProductViewModel)Dynamicweb.Context.Current.Items["ProductDetails"];
```

**Common keys:**

| Key | Type | Set by |
|-----|------|--------|
| `ProductDetails` | `ProductViewModel` | `ProductDetailRenderGrid.cshtml` |
| `ProductList` | `ProductListViewModel` | `ProductListRenderGrid.cshtml` |
| `PriceType` | `string` | Various price-context templates |

---

## HTMX Patterns

HTMX replaces page fragments without full reloads. Swift uses it for search, filtering, cart, address management, modals, and more.

### Common attribute combinations

**Form triggers a GET and swaps a named region:**
```html
<form hx-get="@url"
      hx-trigger="submit, change"
      hx-target="[data-swift-user-list]"
      hx-select="[data-swift-user-list]"
      hx-swap="outerHTML"
      hx-replace-url="true">
```

**Button POSTs JSON values and replaces a region:**
```html
<button hx-post="/default.aspx?..."
        hx-vals='{"AddressId": "@address.Id", "IsDefault": "true"}'
        hx-trigger="click"
        hx-target="[data-swift-addresses]"
        hx-select="[data-swift-addresses]"
        hx-swap="outerHTML">
```

**Load content into a modal/offcanvas body:**
```html
<button hx-get="/default.aspx?..."
        hx-trigger="click"
        hx-target="[data-swift-address-add-offcanvas] .offcanvas-body"
        hx-select="[data-swift-address-editform]"
        hx-swap="innerHTML">
```

**Append content (e.g. load more):**
```html
hx-swap="beforeend"
hx-target="main"
```

### After-swap setup

Bootstrap tooltips and other JS-initialised components must be re-initialised after HTMX swaps:
```javascript
window.addEventListener("htmx:afterRequest", reinitializeTooltips);
```

### Show a Bootstrap modal on HTMX load

```html
<div hx-on::load="bootstrap.Modal.getOrCreateInstance(this).show();">
```

### Prevent duplicate requests

```html
hx-sync="this:abort"
```

---

## Alpine.js Patterns

Alpine handles reactive UI state that doesn't need a server round-trip. It coexists with HTMX — HTMX for server interactions, Alpine for local state.

> **Razor escaping**: `@` is a Razor directive, so Alpine event handlers must use `@@`:
> `@@click` in CSHTML renders as `@click` in HTML.

### Search field with clear button

```html
<div x-data="{ searchQuery: '' }" x-init="searchQuery = $refs.searchInput.value">
    <input x-model="searchQuery" x-ref="searchInput">
    <button x-show="searchQuery.length > 0"
            @@click.prevent="searchQuery = ''; $refs.searchInput.focus();"
            type="reset">
        @Translate("Clear")
    </button>
</div>
```

### Listening to Bootstrap modal events

Bootstrap fires custom DOM events on modal elements. Alpine intercepts them with `.dot` modifier (converts dots in event names):

```html
<div x-on:hidden-bs-modal.dot="handleModalHidden()"
     x-on:show-bs-modal.dot="handleModalShow()">
```

### Combined HTMX + Alpine modal trigger

```html
<div hx-on::load="bootstrap.Modal.getOrCreateInstance(this).show();"
     x-on:hidden-bs-modal.dot="$el.remove()">
```

---

## JavaScript Module System

Entry point: `_src/js/swift.js` — composes all modules into `window.swift`.

### Module pattern (IIFE)

Every module is an IIFE that returns an object of public methods:

```javascript
const Cart = (function () {
    // private state
    let productId;

    return {
        Update: async function (e) { ... },
        Success: async function (response, clickedButton, formData) { ... },
        Error: async function (response, clickedButton) { ... },
    };
})();

export { Cart };
```

### Custom events for extensibility

Modules fire cancellable `CustomEvent`s before executing, allowing external code to intercept:

```javascript
let event = new CustomEvent("update.swift.cart", {
    cancelable: true,
    detail: { formData, parentEvent: e }
});
// Fire on both document and the clicked element
if (document.dispatchEvent(event) && clickedButton.dispatchEvent(event)) {
    // proceed
}
```

### Key modules

| Module | Exported as | Purpose |
|--------|-------------|---------|
| `_cart.js` | `swift.Cart` | Cart add/update/remove |
| `_favorites.js` | `swift.Favorites` | Wishlist operations |
| `_pageupdater.js` | `swift.PageUpdater` | HTMX-style partial page updates |
| `_productlist.js` | `swift.ProductList` | Filter/sort/page product lists |
| `_variantselector.js` | `swift.VariantSelector` | Variant option selection |
| `_typeahead.js` | `swift.Typeahead` | Search autocomplete |
| `_expressbuybulk.js` | `swift.ExpressBuy` | B2B bulk quick-order |

---

## SCSS Layer Architecture

```
_src/scss/swift.scss          — entry point
├── 0-base/                   — Bootstrap import + global variables/utilities
│   ├── _variables.scss       — SCSS variable overrides (before Bootstrap)
│   ├── _root.scss            — CSS custom properties
│   └── index.scss            — Bootstrap component imports
├── 1-dw/                     — DynamicWeb-specific styling
│   ├── _colorschemes.scss    — runtime color scheme system
│   ├── _typography.scss      — typography from DW area settings
│   ├── _buttons.scss         — [data-dw-button] elements
│   └── _rows.scss / _containers.scss
├── 2-components/             — UI component styles
│   └── _megamenu.scss, _mini-cart.scss, _modal.scss, _variant-option.scss, ...
└── 3-helpers/                — utility overrides
    ├── _htmx.scss            — loading state indicators
    ├── _a11y.scss            — accessibility
    └── _animation.scss, _icon.scss, _spaces.scss, ...
```

Build output: `Files/Templates/Designs/Swift-v2/Assets/css/swift.css`

Color schemes, button styles, and typography are **not** in `swift.css` — they are generated at runtime by DynamicWeb and loaded as separate stylesheets from the master template.
