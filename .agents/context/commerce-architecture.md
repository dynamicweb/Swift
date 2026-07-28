# Commerce Architecture — Cart & Order Domain

How cart and order surfaces in Swift are structured, which platform mechanisms are sanctioned, and the rules any new commerce component must follow.

Read this before touching anything under `eCom/Cart/`, `eCom/CustomerExperienceCenter/Orders/`, `Paragraph/Swift-v2_MiniCart/`, or `_src/js/_cart*.js`.

Companion docs: [`swift-architecture.md`](swift-architecture.md) (template hierarchy, HTMX/Alpine patterns), [`viewmodel-cheatsheet.md`](viewmodel-cheatsheet.md) (encoding rules — mandatory), [`paragraph-layouts.md`](paragraph-layouts.md) (layout subfolder system).

Platform facts below were verified against the DynamicWeb 10 source tree, not documentation. Paths that are not repo-relative are platform source, rooted at the DW10 checkout — mostly under `src/Features/Ecommerce/Dynamicweb.Ecommerce/`, `src/Features/Content/Dynamicweb/`, `src/Application/Providers/Dynamicweb.Rendering.Providers.NetCore/`, and the un-nested `Dynamicweb.Frontend.Classic.Api*/` projects. Class names are given in full so they can be found by grep regardless of layout changes.

Verified against DW10 as of 2026-07. Re-check anything load-bearing after a platform upgrade — several of the behaviours below are internal implementation, not contract.

---

## 1. Core Concepts

### 1.1 There are two cart mutation pipelines, and they do not agree

This is the single most important thing to understand about this domain.

**Pipeline A — classic `CartCmd`** (legacy)

A request parameter intercepted during page load. `CartHandler.CatchCart` is registered in a handler chain on `Standard.Page.Loaded` (`Dynamicweb.Ecommerce/Frontend/EcomPageLoadNotificationSubscriber.cs`). Commands: `add`, `addmulti`, `setmulti`, `addwithpoints`, `emptycart`, `updateorderlines`, `incorderline`, `decorderline`, `delorderline`, `deleteallorderlines`, `delsavedforlater`, `orderline`, `loadorder`, `setcart`, `archive`, `setname`, `setdiscount`, `copy`, `copyExtended`, `createnew`, `CombineForPayment`, `UpdateCombinedPayments`, `createnotificationforthisproduct`. All case-insensitive.

Its only outputs are a **redirect** or an **in-place page render**. It has no structured result payload for the frontend.

**Pipeline B — `/dwapi/ecommerce/carts`** (current)

`CartsController` (`Dynamicweb.Frontend.Classic.Api.Ecommerce/Controllers/CartsController.cs`, `[Route("dwapi/ecommerce/carts")]`). Returns real view models, including `CartResponseModel` with per-line validation detail.

**They use different validators and will disagree about whether the same add is legal:**

| | Pipeline A (`CartCmd`) | Pipeline B (`dwapi`) |
|---|---|---|
| Validator | `CartService.OrderLineBuilder` | `CartProductsValidationHelper` |
| Stock checked at all | **only if `DontShowProductIfNotOnStock` is set** | always |
| Stock read | `product.GetUnitStock(stockLocation, unitId)` | `catalogProduct.Stock` |
| Honours `ProductReserve` | yes (within that gate) | **no** |
| Stock location / unit aware | yes | **no** |
| Min quantity / step violation | **silently coerced upward** (`GetValidQuantity`) | rejected with an error code |
| Failure detail | none | `CartReviewViewModel` per line |
| Partial success | possible | **all-or-nothing** |

The whole stock-and-reserve block in `OrderLineBuilder` sits inside `if (doCheckStock && ...)` where `doCheckStock` is the `/Globalsettings/Ecom/Product/DontShowProductIfNotOnStock` setting. **With the default (setting off), Pipeline A performs no stock check at all** — it is *more* permissive than Pipeline B, not less. A flow that validates classically and submits to the API will therefore reject items the old flow accepted.

> **Rule:** a single user-facing flow must use one pipeline end to end. Never validate in one and mutate in the other. New work uses Pipeline B.

`CartResultType` **cannot be used to detect an add failure** — `CartHandler` sets `CartResultType.ProductAdded` unconditionally after `AddOrderLinesInternal`, even when the line was rejected.

### 1.2 `X-DW-Template` is the sanctioned HTML-fragment mechanism

`Dynamicweb.Frontend.Classic.Api/Formatters/HtmlDwTemplateOutputFormatter.cs`.

Any `/dwapi` endpoint that returns a single `ViewModelBase` in an `ObjectResult` can be rendered through **any** Razor template by sending three headers:

```
Accept: text/html
X-DW-Template: /Designs/Swift-v2/eCom/Cart/MiniCart/MiniCartDropdown.cshtml
X-DW-Culture: en-GB        (optional; controls Translate())
```

This is the load-bearing insight for the whole domain. It means **the API layer and the template layer are already decoupled**, and we do not need custom endpoints to get HTML fragments. The response template declares its own `@inherits ViewModelTemplate<T>` matching whatever the endpoint returns.

Activation contract, all three required:
- path starts with `/dwapi`
- `Accept` contains `text/html`
- `x-dw-template` header non-empty

Hard constraints:
- The action must return a **single** `ViewModelBase`. Collection-returning endpoints (`GET /dwapi/content/rows/{pageId}/{device}`, `GET /dwapi/ecommerce/groups`) **500** under `X-DW-Template`.
- `ContentResult` does not work — only `ObjectResult`/`Ok(model)`. (So `GET /dwapi/feeds/GetFeedOutput` is not renderable this way.)
- A template error returns **HTTP 500** with the body `An error occurred while rendering the template.` The real exception only appears in the DW system log. Budget for this when debugging.

### 1.3 `LayoutTemplate` is not a fragment API

`LayoutTemplate` is a genuine platform parameter (`PageViewLoader.cs`, read from query string *and* form), but it only swaps the layout. The entire page pipeline still runs: permissions, item loading, notifications, global paragraph replacement, navigation-tag replacement, snippet pass, URL replacement, minification, cookie-warning injection.

Worse: **an unresolvable layout name silently falls back to the full page layout.** A typo injects a whole HTML document into your `hx-target`.

> **Rule:** `LayoutTemplate` is legacy. Prefer `/dwapi` + `X-DW-Template`. Existing uses (`Swift-v2_CartSummary.cshtml`, `CartType=minicart`) are tolerated but are not the pattern for new components.

### 1.4 Swift conventions vs platform parameters

Confirmed absent from the entire DW10 source — these are **our** inventions and carry no platform guarantees:

`CartType`, `RequestPageID`, `CartSummaryPageId`, `checkoutUrl`, `quoteCheckoutPageLink`, `ParagraphId`, `LoadContent`.

Genuine platform parameters: `ID`, `AreaID`, `LayoutTemplate`, `CartCmd`, `redirect`, `OrderContext`, `SetOrderContext`, `PricesWithVAT`, `CurrencyCode`, `CountryCode`, `LanguageID`, `Stocklocation`, `DeliveryAddressId`, `OrderTime`, `fields` (`/dwapi` sparse fieldsets), `feed`, `debug`.

> **Rule:** when inventing a request parameter, prefix it `swift-` or pass it in `hx-vals` against a documented endpoint parameter instead. Undocumented bare names look like platform contract and mislead the next developer.

---

## 2. Cart State Model

The unresolved question in PR 19994 ("we need to test cart context and how it should work") is a state-ownership question. Here is the answer we standardise on.

### 2.1 Server owns cart truth; the client owns nothing

Never compute cart totals or counts in JavaScript. Every cart mutation response carries the authoritative cart. The client's only job is to place server-rendered HTML into the DOM.

### 2.2 One broadcast mechanism: `hx-swap-oob`

Three mechanisms currently compete in the repo. Only the third is sanctioned.

| Mechanism | Where | Verdict |
|---|---|---|
| `_cart.js` POSTs a form, reads the response body as a **bare quantity string**, writes it via `innerHTML` into `#Cart_{minicartid}` or, failing that, all `.js-cart-qty` | `_src/js/_cart.js` (`main`) | **Legacy.** Fragile string contract, no error surface, no *order-context* scoping. |
| `<meta data-swift-cart-count>` control element + `swift.CartResponse.updateCartFromMeta()` reads the dataset and writes `.mini-cart-quantity` | `_cartResponse.js` (`swi/25137`) | **Reject.** Reinvents `hx-swap-oob` in JS and adds a non-semantic `<meta>` in `<body>`. |
| Response fragment contains the counter with `hx-swap-oob`, HTMX patches every instance | `MiniCartDropdown.cshtml` (`swi/25613`) | **Adopt.** Zero JS, declarative, works for any number of minicart instances. |

The sanctioned pattern — in the **response** template, not the page:

```cshtml
<span class="mini-cart-quantity"
      hx-swap-oob="innerHTML:[data-swift-minicart-counter]">@Model.SumProductQuantities()</span>
```

> **Get the `hx-swap-oob` syntax exactly right.** htmx special-cases only the bare value `true`. Any other value is split on the first `:`, and everything before it becomes the swap style — so `hx-swap-oob="true innerHTML:[...]"` yields the nonsense style `"true innerHTML"`, falls through htmx's `switch`, and recurses with `htmx.config.defaultSwapStyle`. That default happens to be `innerHTML`, so the wrong form appears to work by accident. Write `hx-swap-oob="innerHTML:[selector]"` — style first, no `true`.
>
> `Clean.cshtml:3` shows the same bug with a real consequence: `hx-swap-oob="true outerHTML:#swiftMinicart@(Model.ID)"` silently degrades to an `innerHTML` swap, so the root element is never replaced.

> `hx-swap-oob` is only meaningful in a **response body**. Placing it on an element in the initially-rendered page is a no-op. This is pre-existing (`Clean.cshtml:3` on `main`) and repeated on `swi/25613` — `Dropdown.cshtml` once, `Offcanvas.cshtml` twice (lines 41 and 54). Harmless, but dead markup that implies behaviour it does not have. Remove it from page-side markup wherever you touch it.

### 2.3 Pick one count function

Three different counts are actually in use in this repo. They return different numbers.

| Expression | Where | Semantics |
|---|---|---|
| `Model.SumProductQuantities()` | `swi/25613` + `swi/25137` fragments | Sums `Quantity` over `Product`, `Fixed`, `PointProduct`, `GiftCard` lines. `OrderViewModelExtensions.cs` / `OrderExtensions.cs`. |
| `Cart.ProductOrderLines.Sum(o => o.Quantity)` | `swi/25613` paragraph initial render | Product lines only — excludes gift cards and point products. |
| `Cart.GetParentProductLineQuantityCount(...)` | `Clean.cshtml:23`, all branches | Parent lines only — **differs for BOM/child lines**. |

Also available, and to avoid: `CartViewModel.ProductsCount` counts *distinct* products rather than quantity. `CartViewModel.TotalProductsCount` wraps `GetParentProductLineQuantityCount`. Neither is currently used for a cart count in this repo — don't introduce them. (Note `ProductListViewModel.TotalProductsCount`, which *is* used in product-list templates, is an unrelated property with a confusingly similar name.)

> **Rule:** the minicart badge uses **`SumProductQuantities()`** everywhere — both initial page render and every OOB update. A mismatch between initial render and update makes the badge jump on first interaction. `swi/25613` currently has exactly this mismatch (`ProductOrderLines.Sum` on the page, `SumProductQuantities()` in the fragment).

### 2.4 Order context scoping

An order context (`OrderContext`) is a multi-shop / multi-cart partition. Every cart storage key is namespaced by it:

```csharp
// Dynamicweb.Ecommerce/Common/Context.cs
ConvertKeyToCartContextAwareKey(key, contextId) => $"{key}.'{contextId}'"
```

Applied to the session cart key, the cart cookie name, and `DW_extranet_AccessUserCartID`. The active cart pointer is stored in one of two places depending on context (`CartRepository.SetUserCart`): with **no** context it is `AccessUser.AccessUserCartID`; **with** a context it is a row in `EcomOrderContextAccessUserRelation`, one per user+context. `CartService.GetActiveCartId` reads only the former — so it does not see context-scoped carts.

Resolution precedence in `GetCartContext()`:
1. `Context.Current.Items` if already set this request
2. cookie `EcomCart:CustomCartContext` — **only when `Request["SetOrderContext"]` is null**
3. the current area's shop default (`shop.OrderContextId`)
4. `null` → the global cart

Frontend rules:
- Scope every minicart DOM lookup by context: `[data-swift-minicart-context="{id}"]`. An unscoped selector updates the wrong badge on multi-context sites.
- A missing context attribute means "global cart", not "any cart". Do not treat empty as a wildcard.
- **Do not set `Common.Context.CartContext` from inside a paragraph template.**

  ```cshtml
  @* Anti-pattern *@
  if (Model.Item?.TryGetString("ContextCart", out var cartContext) ?? false)
  {
      Dynamicweb.Ecommerce.Common.Context.CartContext = ...GetOrderContextById(cartContext);
  }
  ```

  This mutates request-global state during render. The result depends on paragraph render order, and it leaks into every subsequent paragraph on the page.

  **This is pre-existing, not new.** `Clean.cshtml` on `main` already does it, and worse — it unconditionally assigns `CartContext = null` (line 10) before the conditional set (line 17), so any minicart on the page resets the context for everything rendered after it. `Dropdown.cshtml:12` and `Offcanvas.cshtml:12` on `swi/25613` carry the pattern forward without the null-reset. Treat this as debt to retire across all three files, not as a defect the PR introduced.

  Correct approach: read the setting and pass it as an endpoint parameter (`hx-vals`); use the `SetOrderContext`/`OrderContext` request parameters when the context genuinely needs to change.

### 2.5 Cart identity: `CartSecret` is a capability

`Order.Secret` has an `internal` setter — treat it as fixed for the life of the order; you cannot rotate it. In `CartHelper.GetCart`:
- the `CartID` branch **is** authorization-checked (`IsAllowedToSetCart`) and only honoured for logged-in users
- the `CartSecret` branch is **not** authorization-checked — possession of the secret *is* the authorization

> **Rule:** treat a `CartSecret` like a bearer token. Never put it in a URL that could be logged, shared, or land in a `Referer` header; never render another user's secret; never place it in a query string when a header or POST body will do. Note that our current CEC templates do put it in the path (`hx-get="/dwapi/ecommerce/carts/@(Model.Secret)"`) — acceptable for the owner's own cart in a same-origin XHR, but do not extend the pattern to links or redirects.

**A cart secret can become invalid — but only on Pipeline A.** `CartService.VerifyEmptyCart` deletes the cart outright when the last order line is removed, unless `/Globalsettings/Ecom/Cart/DoNotDeleteCartsWithZeroOrderlines` is set. All five of its call sites are inside `CartService`, i.e. the classic pipeline. The `/dwapi` deletes (`RemoveLineFromCart`, `EmptyCart`) call only `SaveCartChanges` and never `VerifyEmptyCart`, so an API-driven empty cart keeps its id and secret.

Practical consequence: on Pipeline B you may hold a secret across an empty-cart transition. But a component that can be reached from *either* pipeline — or that runs on a page where a classic `CartCmd` may also have fired — should still handle a 404 by re-resolving the active cart.

---

## 3. Endpoint Strategy

### 3.1 Default choice per operation

| Operation | Use | Returns |
|---|---|---|
| Read a cart for display | `GET /dwapi/ecommerce/carts/{secret}` | `OrderViewModel` |
| Add one or many products | `POST /dwapi/ecommerce/carts/additems/form` | `CartResponseModel` |
| Add from JSON | `POST /dwapi/ecommerce/carts/additems` | `CartResponseModel` |
| Reorder a past order | `POST /dwapi/ecommerce/carts/reorder` | `CartResponseModel` |
| Reorder replacing cart | `POST /dwapi/ecommerce/carts/reorder/replace` | `CartResponseModel` |
| Remove a line | `DELETE /dwapi/ecommerce/carts/{secret}/items/{itemId}` | 200 |
| Update lines | `PATCH /dwapi/ecommerce/carts/{secret}/items` | array of per-line results (`UpdateCartLineResponse` is `internal` — a JSON shape, not a referenceable type) |
| Set active cart | `PATCH /dwapi/ecommerce/carts/{secret}/active` | 200 |
| List user's carts | `GET /dwapi/ecommerce/carts/list` | `UserCartsListResponse` |
| Product search (picker) | `GET /dwapi/ecommerce/products/search` | `ProductListViewModel` |
| Query-driven content lists | `GET /dwapi/query` | `QueryResultViewModel` |

The four `CartResponseModel` endpoints are the only ones that give per-line validation detail. Prefer them for anything a user can get wrong.

### 3.2 `additems/form` field naming

`additems/form` accepts a plain form post, which is why it pairs well with HTMX. Field lookup is case-insensitive.

Envelope: `secret`, `currency`, `language`, `ordercontextid`, `replaceexistingproducts`, `showpriceswithvat`.

Per product, optionally integer-suffixed: `productid{n}`, `variantid{n}`, `quantity{n}`, `unitid{n}`, `stocklocationid{n}`. Unsuffixed keys map to product group 0, and suffixed and unsuffixed may be mixed.

Booleans accept `true`/`false`, `1`, `yes`, `on`.

`OrderLineFields` is **not** parseable from a form — JSON body only (`CartProduct.OrderLineFields`).

### 3.3 Auth

Both `additems` variants and all four `reorder` registrations carry `[UserTokenFilter]`, not `[PermissionFilter]` — anonymous callers are accepted and get a fresh cart. The user-scoped endpoints (`GET ""`, `GET list`, `GET customerNumber`, `GET active`, `PATCH {secret}/active`, `POST create`) carry `[PermissionFilter]` and need a JWT. `GET /dwapi/ecommerce/products/search` carries no auth filter at all.

Swift already has the JWT plumbing: the `swift-auth` HTMX extension in `_src/js/swift.js` attaches `Authorization: Bearer` from `swift.Authentication.token`. Use `hx-ext="swift-auth"` on any element hitting a `[PermissionFilter]` endpoint.

If the solution sets `/Globalsettings/System/Security/DeliveryApi/RequireJwt`, **every** `/dwapi` call needs a token, including anonymous product search. Don't assume the default.

Cart list endpoints return **404 on an empty list**, not 200 with an empty array. `GET /dwapi/ecommerce/products/search` has three distinct non-200 outcomes: **400** if none of `RepositoryName`+`QueryName`, `GroupId` or `ProductIds` is supplied; **404** if the view model comes back null; **204** if it resolved but matched no products. HTMX treats 204 as "no swap" — which is usually what you want for a picker, but means an empty result renders nothing at all unless you handle it.

### 3.4 VAT display differs by pipeline

Three sources that disagree:

| Path | Source | Default |
|---|---|---|
| Template / classic render | `Common.Context.DisplayPricesWithVat` (override: `?PricesWithVAT=`) | solution setting |
| `/dwapi` cart render | `showPricesWithVat` param / `showpriceswithvat` form field | **`true`** |
| `reorder` | not settable — `ReorderCartItemsRequest` has no VAT field | **`true`** |

> **Rule:** always pass VAT display explicitly when calling a cart endpoint from a template, or prices in the fragment will silently disagree with prices on the page:
> ```cshtml
> hx-vals='{"ShowPricesWithVat": "@(Dynamicweb.Ecommerce.Common.Context.DisplayPricesWithVat)"}'
> ```
> `swi/25613` does this correctly. Reorder responses cannot be requested VAT-exclusive — a known platform gap (work item #28386 territory).

### 3.5 `CartResponseModel` is exactly three members

```csharp
public class CartResponseModel : ViewModelBase
{
    public OrderViewModel Cart { get; set; }        // always populated
    public CartReviewViewModel? Review { get; set; } // null on full success
    public bool IsSuccess { get; }                   // computed
}
```

`IsSuccess => Review is null || (Review.FailedOrderlines.Count == 0 && Review.CartErrors.Count == 0)`.

You cannot trim this payload. Both `CartResponseHelper` and `CartsController.CreateViewModel` call `EnsureFilledPropertiesExist()` on a fresh settings object, which fills **all** valid properties. The `?fields=` sparse-fieldset filter applies to JSON serialisation only — it does not reduce the work done server-side, and it is irrelevant when rendering through `X-DW-Template`.

`CartReviewViewModel`:
- `CartSecret` — set to `""` when validation failed *and* the cart would have been newly created
- `FailedOrderlines` — `IList<CartReviewOrderlineViewModel>` (adds `ErrorType`, `ProductViewModelEndpoint`)
- `SuccessfulOrderlines` — declared `IList<CartOrderlineViewModel>`; do **not** rely on `ErrorType` being present on these
- `CartErrors` — `IList<CartErrorType>`

### 3.6 `CartErrorType` → review UI mapping

`Dynamicweb/Frontend/CartErrorType.cs`, explicitly numbered:

| Value | Member | Review template |
|---|---|---|
| 0 | `None` | — |
| 1 | `ProductNotFound` | `NotFound.cshtml` |
| 2 | `OutOfStockWithReplacement` | `Replacement.cshtml` |
| 3 | `OutOfStockNoReplacement` | `OutOfStock.cshtml` |
| 4 | `InsufficientStockWithReplacement` | `Replacement.cshtml` |
| 5 | `InsufficientStockNoReplacement` | `InsufficientStock.cshtml` |
| 6 | `MasterProductRequiresVariant` | `Variant.cshtml` |
| 7 | `QuantityBelowMinimum` | `MinimumOrder.cshtml` |
| 8 | `FractionalQuantityNotAllowed` | `StepQuantity.cshtml` |

The `ReviewTypes/` split on `swi/25137` maps onto this well and should be kept — 7 templates for 8 non-`None` members, since `Replacement.cshtml` serves both values 2 and 4. It is a near-1:1 mapping, not a strict one. Two caveats:
- `QuantityBelowMinimum` is also raised for **negative** quantity. Zero quantity never reaches it — `ValidateProductsForReview` skips zero-quantity entries entirely (unless `DoNotDeleteOrderLinesWithZeroQuantity` is set), so no review line is produced at all. Do not design a "you asked for zero" state.
- "WithReplacement" requires `product.Discontinued && ReplacementProductId` set, and the replacement itself `Active && !Discontinued`. Replacement UI is therefore rare in practice — do not let it dominate the design.

Aggregate validation semantics that shape the UI:
- Stock is validated on the **aggregate** quantity per `(ProductId, VariantId, StockLocationId, UnitId)`, including lines already in the cart unless `replaceexistingproducts` is set.
- Per-entry successes whose aggregate key failed are **promoted to `FailedOrderlines`**.
- **All-or-nothing.** If any line fails, nothing is added and nothing is saved. (Strictly, the gate is `FailedOrderlines.Any()`, while `IsSuccess` additionally requires `CartErrors` to be empty. In the current validator every line failure also pushes a cart error, so the two coincide — but don't rely on that identity.)
- Aggregate failures are looked up by `(ProductID, ProductVariantID)` only, while aggregation keys on four fields — so unit and stock-location variations collapse during promotion.

> **Rule:** the review UI must be framed as "fix these, then we'll add everything", never "3 of 5 items were added". The latter is not a state the API can produce.

---

## 4. Component Taxonomy

Every commerce component is exactly one of five kinds. Knowing which kind you are building tells you where the file goes, what it inherits, and what it may contain.

### Kind 1 — Paragraph entry point
`Paragraph/Swift-v2_<Name>/<Layout>.cshtml` · `@inherits ViewModelTemplate<ParagraphViewModel>`

The editor-placed element. Reads item settings, renders the trigger and initial state, declares the HTMX call. **Must not contain business logic, `<script>` blocks, or `htmx.defineExtension`.**

### Kind 2 — Fragment response template
`eCom/<Domain>/<Component>/<Name>.cshtml` · `@inherits ViewModelTemplate<TDomainViewModel>`

Rendered by `/dwapi` via `X-DW-Template`. Inherits the endpoint's view model, never `ParagraphViewModel`. Carries `hx-swap-oob` for state broadcast. Has no access to `Model.Item` — any editor setting it needs must arrive as an endpoint parameter.

### Kind 3 — Review / error surface
`eCom/Cart/Review/ReviewTypes/<CartErrorType>.cshtml`

One template per `CartErrorType`, dispatched from a single `OrderReview.cshtml`. Receives `CartReviewViewModel`.

### Kind 4 — Shared JS module
`_src/js/_<name>.js`, exported through `swift.js`

Namespace object with public methods. The **only** legal home for `htmx.defineExtension`, Alpine component factories, and analytics. See §5.

### Kind 5 — Item type definition
`Files/System/Items/ItemType_Swift-v2_<Name>.xml`

Editor-facing behaviour switches. See §5.2.

### 4.1 Target folder structure

```
Files/Templates/Designs/Swift-v2/
├── Paragraph/
│   └── Swift-v2_MiniCart/
│       ├── Clean.cshtml            — legacy, CartCmd-based
│       ├── Dropdown.cshtml         — entry point (Kind 1)
│       └── Offcanvas.cshtml        — entry point (Kind 1)
└── eCom/
    ├── Cart/                       — OrderViewModel / CartResponseModel
    │   ├── CartResponse.cshtml     — shared dispatcher (Kind 2)
    │   ├── Response/*.cshtml       — success presentations the dispatcher renders
    │   ├── MiniCart/
    │   │   ├── MiniCartDropdown.cshtml
    │   │   └── MiniCartOffCanvas.cshtml
    │   └── Review/
    │       ├── OrderReview.cshtml
    │       └── ReviewTypes/*.cshtml   (Kind 3)
    ├── ProductCatalog/             — ProductViewModel / ProductListViewModel
    │   └── AddProductsSearchResult.cshtml   — picker results fragment (Kind 2)
    └── CustomerExperienceCenter/
        └── Orders/
            ├── Components/ProductSearch.cshtml
            ├── Detail/*.cshtml
            ├── List/*.cshtml
            └── Modals/*.cshtml
```

Note `AddProductsSearchResult.cshtml` sits under `ProductCatalog/` even though only the CEC modal calls it, because it inherits `ProductListViewModel`. `swi/26018` already places it correctly — that is the rule below, working.

Placement rules:
- **A template's folder is decided by its ViewModel, not by the feature that triggers it.** `OrderViewModel`/`CartResponseModel` templates belong under `eCom/Cart/`, even when the only caller lives in `CustomerExperienceCenter/`. This is Karsten's review note on PR 21942 and it generalises.
- `eCom/Cart/` is storefront-and-CEC shared. If CEC needs a variant, add a sibling template under `eCom/Cart/`, do not fork into `CustomerExperienceCenter/`.
- Paragraph layout subfolders follow [`paragraph-layouts.md`](paragraph-layouts.md). One file per layout, named for the layout.

### 4.2 `CartResponse.cshtml` must be a dispatcher, not a component

Nothing in the platform makes this file special — `X-DW-Template` is a per-request header, so any caller could name its own response template. **We choose to treat it as a single shared slot**, because the alternative is what the current PR set demonstrates: two branches independently creating `eCom/Cart/CartResponse.cshtml` with incompatible contents — 95 lines of HTMX orchestration and offcanvas control versus a 25-line Bootstrap alert. Whichever merges second silently changes the behaviour of the first. That collision is the central problem in the current PR set.

The convention is therefore: **one response template per view model, varying by parameter rather than by filename.** It keeps the review/failure branch identical everywhere, which is the part that must not diverge.

Required shape:

```cshtml
@inherits Dynamicweb.Rendering.ViewModelTemplate<Dynamicweb.Ecommerce.Frontend.CartResponseModel>

@* 1. Always broadcast new cart state, success or failure *@
<span class="mini-cart-quantity" hx-swap-oob="innerHTML:[data-swift-minicart-counter]">@Model.Cart.SumProductQuantities()</span>

@if (Model.IsSuccess)
{
    @* 2. Success presentation — chosen by caller, not hardcoded here *@
    @RenderPartial("/Designs/Swift-v2/eCom/Cart/Response/<variant>.cshtml", Model)
}
else
{
    @* 3. Review surface *@
    @RenderPartial("/Designs/Swift-v2/eCom/Cart/Review/OrderReview.cshtml", Model.Review)
}
```

The caller selects its success presentation (offcanvas, toast, inline alert, nothing) by passing a value in `hx-vals`, which the dispatcher reads and maps to a partial. It does not get to pick a different `X-DW-Template`, because the review branch must behave identically everywhere.

---

## 5. Backend ViewModels → Frontend Boundary

### 5.1 No JavaScript in templates

Enforced, with three named exceptions.

**Illegal in `.cshtml`:**
- `htmx.defineExtension(...)` — `swi/26018` does this twice, in `ProductSearch.cshtml` and `AddProductsModal.cshtml`. These templates are HTMX-swapped, so every swap re-registers the extension. The one correct example is `swift-auth` in `_src/js/swift.js`.
- `<script>` blocks containing logic, state, or event wiring
- Alpine component bodies longer than a few expressions

**Legal in `.cshtml`:**
1. HTMX attributes (`hx-get`, `hx-post`, `hx-vals`, `hx-headers`, `hx-swap-oob`, `hx-trigger`, `hx-target`)
2. Alpine attributes referencing a factory defined in `_src/js/` — `x-data="swift.MiniCart.dropdown()"`, plus short inline expressions like `x-show="open"`
3. `<template>` elements holding static markup for JS to clone

Why this matters beyond tidiness: `_src/js/` is linted and bundled; template JS is neither. `npm run build` fails on ESLint **errors and warnings** (`throwOnError` + `throwOnWarning` in `rollup.config.js`), and on Stylelint **errors only** (`failOnError`; there is no `failOnWarning`). Template JS is also unminified, uncached, and re-executed on every swap.

### 5.2 Behaviour belongs in item type settings

`ItemType_Swift-v2_MiniCart.xml` **already has** an `OffcanvasMinicartBehaviour` field with four options:

| Value | Meaning |
|---|---|
| `0` | Disabled |
| `1` | On "cart navigation link" |
| `2` | On "add to cart" |
| `3` | Always active (default) |

Only the legacy `Clean.cshtml` reads it. The new `Dropdown.cshtml` and `Offcanvas.cshtml` on `swi/25613` ignore it entirely — so the new layouts are a **feature regression** against an existing editor control. This is precisely the concern in the PR 19994 description ("settings on the itemtype for behaviour"); the field exists, it just isn't wired up.

The same field is also declared on `ItemType_Swift-v2_Master.xml`, where no template reads it either — so the setting is offered to editors in two places and honoured in one.

> **Rule:** if an editor can already configure it, the new layout must honour it. Before adding an item type field, check whether one already exists. Before shipping a new layout, diff the settings the old layout read against the settings the new one reads.

When a new switch really is needed, prefer `BoxedRadioEditor` with static options over a free-text field, and give it a `description` written for an editor rather than a developer.

### 5.3 Passing settings into fragments

A Kind 2 fragment has no `Model.Item`. Settings must cross the boundary explicitly:

```cshtml
@* Kind 1 — paragraph entry point *@
@using Dynamicweb.Core.Encoders
@{
    var behaviour = Model.Item?.TryGetString("OffcanvasMinicartBehaviour", out var b) ?? false ? b : "3";
    var contextId = Dynamicweb.Ecommerce.Common.Context.CartContext?.Id ?? "";
    var culture = Pageview?.Area?.CultureInfo?.Name ?? "";
    var layout = "/Designs/Swift-v2/eCom/Cart/MiniCart/MiniCartDropdown.cshtml";
}
<div hx-get="/dwapi/ecommerce/carts/@(HtmlEncoder.UrlPathEncode(secret))"
     hx-headers='{"x-dw-template": "@layout", "x-dw-culture": "@(HtmlEncoder.HtmlAttributeEncode(culture))", "Accept": "text/html"}'
     hx-vals='{"ShowPricesWithVat": "@(Dynamicweb.Ecommerce.Common.Context.DisplayPricesWithVat)"}'
     data-swift-minicart-context="@(HtmlEncoder.HtmlAttributeEncode(contextId))"
     data-swift-minicart-behaviour="@(HtmlEncoder.HtmlAttributeEncode(behaviour))">
```

`layout` is a developer-authored literal, so it needs no encoding. Everything sourced from item settings, order-context ids, or area configuration does — including values that "can't" contain a quote, because item settings are editable and order context names come from the database. Note this cuts both ways inside `hx-headers`/`hx-vals`: the value is inside a JSON string inside an HTML attribute, so a `"` breaks the JSON before it breaks the HTML.

Behaviour that only affects presentation (when to open, where to render) stays on the DOM as a `data-swift-*` attribute and is read by CSS or a small Alpine factory. Behaviour that affects the payload (VAT, context, culture) goes in `hx-vals`/`hx-headers`.

### 5.4 Available template helpers

`ViewModelTemplate<T>` gives you: `RenderPartial(path[, model[, viewParameters]])`, `RenderModel`, `RenderGrid`, `RenderGridRow`, `GetViewParameter*`, `AddScript`, `AddStylesheet`, `Helper`, `Pageview`, `Navigation`, `Translate`, `ReadFile`, `GetPageIdByNavigationTag`, `SetModuleViewModel`/`GetModuleViewModel`/`TryGetModuleViewModel`.

**Not available** on `ViewModelTemplate<T>`: `GetString`, `GetValue`, `GetLoop`, `GetBoolean`, `TemplateTags`. Those belong to `RazorTemplateBase<TModel>` (legacy tag-based templates, e.g. `QueryPublisher/`). Do not mix the two APIs.

`RenderPartial` resolves paths relative to `/Files/Templates/`, root-relative, or **relative to the current template's folder**. If nothing resolves it passes the raw string through silently — a typo yields no output and no error.

`GetPageIdByNavigationTag` returns `0` when not found. Always guard: `@if (cartPageId == 0) return;`

### 5.5 Encoding is mandatory

**Razor output in DW10 is not auto-encoded.** The Razor provider is configured with `RawStringFactory` (`RazorTemplateRenderingProvider.cs`), so every `@expression` is written verbatim.

| Context | Use |
|---|---|
| HTML text | `HtmlEncoder.HtmlEncode(value)` |
| HTML attribute | `HtmlEncoder.HtmlAttributeEncode(value)` — and always quote the attribute |
| JS string, incl. `x-data` and `hx-vals` JSON | `HtmlEncoder.JavaScriptStringEncode(value, addDoubleQuotes: true)`, then attribute-encode if inside an attribute |
| URL query value | `value.UrlEscape()` or `WebUtility.UrlEncode(value)` |
| URL path segment | `HtmlEncoder.UrlPathEncode(value)` |

Do **not** use `StringHelper.JsEnable` — it only escapes `'` and `"`, leaving `\`, newlines, `</script>` and U+2028/2029 unhandled, and it silently `Trim()`s the value.

This bites hardest in commerce templates because product names, variant text, cart names and order-line comments are all user- or integration-supplied. Product names flow into `hx-vals` JSON and Alpine expressions throughout the add-to-cart path. See [`viewmodel-cheatsheet.md`](viewmodel-cheatsheet.md).

---

## 6. Platform Caveats

Non-obvious platform behaviour that will cost a day if you meet it unprepared.

### 6.1 Stock and reservation are advisory

`ProductReserve` stores reservations in **process-local cache** (`Cache.Current`), not the database. They evaporate on app recycle and are not shared across load-balanced nodes. Treat reserve counts as advisory; never present them as authoritative stock.

Validation is **not atomic with the write** — read-check-then-mutate with no transaction or row lock. Two concurrent adds can both pass. Design for "the last item sold twice" being possible.

`CartHandler.CatchCart` calls `ProductReserve.EnsureOrderIsReserved(cart)` on **every page load** where a cart exists. It also sets `cart.IsProcessingCheckout = false` for any `CartCmd` that gets past the editability gate — so a classic cart mutation cancels an in-flight checkout reservation.

Add-to-cart reserve mode requires `/Globalsettings/Ecom/Product/ReserveMode` to equal `"modeAddToCart"` (case-insensitive); anything else means checkout-time reservation.

### 6.2 Removing the last line destroys the cart — on the classic pipeline

`CartService.VerifyEmptyCart` deletes the cart and clears the session when order lines reach zero, unless `DoNotDeleteCartsWithZeroOrderlines` is set. The cart id and secret become invalid.

Consequence for the minicart: a delete-line button that removes the final item invalidates the secret the fragment was rendered with. The next interaction 404s. Handle it — after any successful delete, if the resulting cart is empty, re-render the empty state from the paragraph entry point rather than reusing the stale secret.

### 6.3 Session storage switches on login

`CartSession.GetStorage()` returns `Cache.Current` for authenticated users and `ISession` for anonymous ones. The same logical cart pointer lives in different stores before and after login. `GetValue` performs a lazy session→cache migration for logged-in users — **a read has a side effect**.

Relevant global settings: `MergeAnonymousCartOnLoggingIn`, `UsePreviousCartInsteadOfNewCart`, `RecalculateOnUserLogin`, `FullCartIsolation`.

### 6.4 Classic cart results are read-once

`CartViewModelExtensions.GetCartCommandResult()` calls `CartResultManager.GetAndClearResult()` — it **clears on read**. Two templates on the same page cannot both read it. If you need the result in more than one place, read it once into a local and pass it down.

### 6.5 `QuantityOrderLine{id}` is parsed on every request

`CartHandler` parses `QuantityOrderLine{orderLineId}` parameters on **every page request, with or without `CartCmd`** — a deliberate legacy compromise noted in the source. Avoid that parameter name for anything that is not an intentional quantity update, including in unrelated forms on cart pages.

### 6.6 Bot user agents are silently ignored

`CartService.AddOrderLinesInternal` returns early for user agents matching `bot|crawler|baiduspider|80legs|ia_archiver|voyager|curl|wget|yahoo! slurp|mediapartners-google`.

**Testing `CartCmd=add` with `curl` or `wget` silently does nothing.** Set a browser user agent. (This guard is on the classic pipeline; the `/dwapi` path does not have it.)

### 6.7 Notification subscribers can swap the cart mid-request

`CartHandler` and `CartService.UpdateOrderLines` re-read `Common.Context.Cart` after every notification, with the comment *"after notify we can no longer be sure, that custom code has not change the context cart"*. Never cache an `Order` reference across a notification boundary in custom code.

### 6.8 Product search depends on solution configuration

`GET /dwapi/ecommerce/products/search` requires `RepositoryName` + `QueryName`, or `GroupId`, or `ProductIds` — else 400. `swi/26018` derives repository and query from the shop:

```cshtml
var shopIndexRepository = Services.Shops?.GetShop(shopId)?.IndexRepository;
var shopIndexName = Services.Shops?.GetShop(shopId)?.IndexName?.Replace(".index", "");
```

Reasonable, but note: whether the underlying `.query` exposes a free-text parameter is **solution configuration, not platform**. Guard for null repository/index and degrade to a disabled search box rather than emitting a request that 400s. Also note the query file is located with `Path.DirectorySeparatorChar` — repository/query paths behave differently on Linux and Windows hosts.

`ProductListViewModelSettings.FilledProperties` **throws `ArgumentException`** on an unknown property name. Trimming a picker payload is worth doing but must be exact.

Defaults: `PageSize` 10, `CurrentPage` 1. If `Parameters` is null, **every query-string key** is copied into `Parameters` — which is how facets flow in, and also how a stray parameter can perturb a query.

---

## 7. Pitfalls

Concrete failures to avoid. Examples cite the three cart branches open in July 2026 (`swi/25613-minicart-new`, `swi/25137-reorder-htmx-alpine`, `swi/26018-cart-add-product-modal`) as evidence. Several predate those branches and still exist on `main` — they are marked as such.

1. **Two branches create the same global template with incompatible contents.** `eCom/Cart/CartResponse.cshtml` — 95 lines of orchestration (`swi/25137`) versus a 25-line alert (`swi/26018`). Whichever merges second breaks the other. → §4.2.

2. **Three competing state-broadcast mechanisms.** Bare-quantity `innerHTML` (`main`), a `<meta>` control element read by JS (`swi/25137`), and `hx-swap-oob` (`swi/25613`). → §2.2. Adopt the third; delete the other two.

3. **Three different cart-count expressions**, including a mismatch inside a single branch between initial render and OOB update. → §2.3.

4. **Selector drift.** `.js-cart-qty` (still present on all three branches), `.mini-cart-quantity`, and `[data-swift-minicart-counter]` all identify the badge. → settle on `[data-swift-minicart-counter]` as the hook, `.mini-cart-quantity` as the style class, and remove `.js-cart-qty`.

5. **`htmx.defineExtension` inside HTMX-swapped templates.** `ProductSearch.cshtml` and `AddProductsModal.cshtml` on `swi/26018` — re-registers on every swap. → §5.1.

6. **A new layout silently drops an existing editor setting.** `OffcanvasMinicartBehaviour` is read only by legacy `Clean.cshtml`. → §5.2.

7. **Malformed `hx-swap-oob` values that work by accident.** `"true innerHTML:[...]"` and `"true outerHTML:[...]"` both degrade to a default `innerHTML` swap. The `outerHTML` case on `Clean.cshtml:3` is an actual live bug. → §2.2.

8. **`hx-swap-oob` on page-side markup.** No-op that implies behaviour. Pre-existing on `main`; carried forward on `swi/25613`. → §2.2.

9. **Mutating `Common.Context.CartContext` during paragraph render.** Render-order dependent, leaks into later paragraphs. Pre-existing on `main` (`Clean.cshtml`, including an unconditional `= null`); carried forward on `swi/25613`. → §2.4.

10. **A `CartResponseModel` template rendering a success alert with no state broadcast.** `swi/26018`'s version updates no counter, so adding a product from the CEC modal leaves every minicart badge stale.

11. **Mixing both pipelines inside one flow.** `_cartResponse.js:26` on `swi/25137` fires `await fetch("?CartCmd=setcart&CartSecret=…")` — a classic-pipeline call — in the middle of an otherwise `/dwapi`-driven flow. `PATCH /dwapi/ecommerce/carts/{secret}/active` is the Pipeline B equivalent. → §8.3.

12. **Long-lived branches.** Cart work in this repo has repeatedly sat on branches for months, drifting hundreds of commits behind `main`. Two compounding costs: template conflicts concentrate in a handful of hot files (`Orders_Details.cshtml`, `Orders_List.cshtml`, `Carts_Details.cshtml`), and repeated file moves leave review comments pointing at paths that no longer exist — so the review history stops being readable. → rebase weekly, and land a reduced scope rather than holding a wide branch open.

13. **`ViewModelTemplate` and `RazorTemplateBase` APIs mixed.** → §5.4.

14. **Unencoded product names in `hx-vals` JSON and Alpine expressions.** → §5.5.

---

## 8. Optimisation Guidelines

Ordered by leverage.

### 8.1 Delete before adding

The cart domain currently carries three generations of implementation simultaneously. Every new component that has to coexist with all three costs three times what it should.

Retirement order:
1. `_cart.js` bare-quantity response contract → replaced by `hx-swap-oob`
2. `.js-cart-qty` selector → `[data-swift-minicart-counter]`
3. `CartType=minicart` + `LayoutTemplate` fragment rendering → `/dwapi` + `X-DW-Template`
4. `Clean.cshtml` (`CartCmd`-based minicart) → retire once `Dropdown` and `Offcanvas` honour `OffcanvasMinicartBehaviour`
5. `_cartResponse.js` → of its three public members, `updateCartFromMeta` is `hx-swap-oob` reimplemented in JS and should go; `miniCartResponse()` is offcanvas lifecycle control that can largely become HTMX attributes; keep `orderReview()`, which is genuine client-side state. Its `CartCmd=setcart` fetch must become `PATCH /dwapi/ecommerce/carts/{secret}/active`.

### 8.2 Prefer HTMX over JS, and server render over client render

The ranked preference for any new interaction:

1. **HTMX attribute only** — `hx-get` + `X-DW-Template` + `hx-swap-oob`. No JS. This is `swi/25613`.
2. **HTMX + a small Alpine factory in `_src/js/`** — when there is genuine client-only state, e.g. the multi-step resolution progress in `orderReview()`.
3. **A JS module in `_src/js/`** — when there is genuine imperative work, e.g. analytics push, focus management.
4. **JS in a template** — never.

Every step down costs bundle size, lint coverage, and testability.

### 8.3 One flow, one pipeline

Do not mix `CartCmd` and `/dwapi` in a single user-facing flow. Their validators disagree (§1.1), so a form that validates classically and submits to the API will accept quantities the API rejects, and vice versa.

Two live examples:
- `swi/25137`'s `_cartResponse.js` calls `?CartCmd=setcart` inside an otherwise `/dwapi` flow. Use `PATCH /dwapi/ecommerce/carts/{secret}/active`.
- The legacy `CustomerCenterCmd=reorder` + `onclick="swift.Cart.Update(event)"` path in `OrderViewSearchList.cshtml:271` and `CustomerOrderViewSearchList.cshtml:286` coexists with the new `POST /dwapi/ecommerce/carts/reorder`. Note this legacy path is on `main` and `swi/25137` does not modify it — it is shared debt, not something that branch introduced, and retiring it is its own task.

### 8.4 Make failure the designed path

The API is all-or-nothing with rich per-line detail. That is a gift: it means the review UI is the primary interaction for bulk add, not an error case. Build `OrderReview.cshtml` first and the success path second. `swi/25137` gets this right and its `ReviewTypes/` split should be the template for the domain.

### 8.5 Server-side payload discipline

- Pass `ShowPricesWithVat` explicitly on every cart call (§3.4)
- Pass `x-dw-culture` on every `X-DW-Template` call, or `Translate()` uses the wrong culture in the fragment
- Trim `FilledProperties` on product search, where it works — but not on `CartResponseModel`, where it is ignored
- `?fields=` only reduces JSON, not server work, and is irrelevant under `X-DW-Template`

### 8.6 Fragment discipline

- One fragment, one target. Use `hx-swap-oob` for secondary updates rather than a second request.
- Render skeleton placeholders in the entry point so the dropdown has correct dimensions before the fragment lands. `swi/25613`'s five-row placeholder loop is the right pattern.
- Give every fragment a stable root element with a `data-swift-*` hook.
- `hx-trigger="show.bs.dropdown from:closest .dropdown"` — fetch on open, not on page load. Do not fetch cart contents for users who never open the minicart.

### 8.7 Naming conventions

| Thing | Convention | Example |
|---|---|---|
| DOM hook | `data-swift-<component>[-<part>]` | `data-swift-minicart-counter` |
| Context scope | `data-swift-<component>-context` | `data-swift-minicart-context` |
| Custom event | `<verb>.swift.<domain>` | `updated.swift.cart` |
| JS module | `_src/js/_<lowercase>.js` → `swift.<PascalCase>` | `_cart.js` → `swift.Cart` |
| Alpine factory | `swift.<Module>.<camelCase>()` | `swift.CartResponse.orderReview()` |
| HTMX extension | `swift-<kebab>`, defined **only** in `swift.js` | `swift-auth` |
| Fragment template | `eCom/<Domain>/<Component>/<Name>.cshtml` | `eCom/Cart/MiniCart/MiniCartDropdown.cshtml` |

Style classes and behaviour hooks are separate concerns. `.mini-cart-quantity` styles; `[data-swift-minicart-counter]` targets. Never target a style class from JS or `hx-swap-oob`.

### 8.8 Verification, given there are no automated tests

Quality gates are `npm run build` (ESLint + Stylelint, fails on warnings) and manual QA. So for any cart change, walk this explicitly:

- anonymous add → login → cart survives (`MergeAnonymousCartOnLoggingIn`)
- add from product list, product detail, express buy, and CEC modal → **every** minicart badge updates, on a page with two minicarts
- multi-context site: adding in context A does not change context B's badge
- remove last line via the API → cart survives, badge shows 0, empty state renders
- remove last line via a classic `CartCmd` path (e.g. the cart page) → cart is deleted → any component holding the old secret does not 404
- bulk add where one line fails → nothing added, review shows the failing line only
- VAT-inclusive and VAT-exclusive solutions → fragment prices match page prices
- a second language → `x-dw-culture` respected in the fragment
- product name containing `"`, `'`, `<`, and a non-Latin script → no broken markup, no JS error
