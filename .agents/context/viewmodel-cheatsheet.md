# ViewModel Cheatsheet

Quick reference for the ViewModels and APIs used in Swift CSHTML templates.

---

## Inheritance Declarations

```csharp
// Paragraph templates (most common)
@inherits Dynamicweb.Rendering.ViewModelTemplate<Dynamicweb.Frontend.ParagraphViewModel>

// Master template
@inherits Dynamicweb.Rendering.ViewModelTemplate<Dynamicweb.Frontend.PageViewModel>

// Product detail / variant selector
@inherits Dynamicweb.Rendering.ViewModelTemplate<Dynamicweb.Ecommerce.ProductCatalog.ViewModels.ProductViewModel>

// Product list / search results
@inherits Dynamicweb.Rendering.ViewModelTemplate<Dynamicweb.Ecommerce.ProductCatalog.ViewModels.ProductListViewModel>

// Order list (CEC)
@inherits Dynamicweb.Rendering.ViewModelTemplate<Dynamicweb.Ecommerce.Orders.ViewModels.OrderListViewModel>

// QueryPublisher templates (classic API — no ViewModel)
@inherits Dynamicweb.Rendering.RazorTemplateBase<Dynamicweb.Rendering.RazorTemplateModel<Dynamicweb.Rendering.Template>>
```

---

## ParagraphViewModel (`Model` in paragraph templates)

### Reading paragraph editor settings

```csharp
Model.Item.GetString("FieldName")                      // string, empty if missing
Model.Item.GetString("FieldName", "default")           // string with fallback
Model.Item.GetRawValueString("FieldName", "default")   // raw dropdown value (use for option keys)
Model.Item.GetBoolean("FieldName")                     // bool
Model.Item.GetInteger("FieldName")                     // int
Model.Item.GetFile("FieldName")                        // FileViewModel
Model.Item.GetImageFile("FieldName")                   // image file
Model.Item.GetLink("FieldName").PageId                 // int — linked page
Model.Item.SystemName                                  // paragraph template system name
```

> Use `GetRawValueString` for dropdown/radio fields where the raw key matters (e.g. `"hide"`, `"show"`).
> Use `GetString` for text/label fields.

### TryGet pattern — conditional rendering when a value may not exist

Use `TryGet*` instead of `Get*` when absence of a value means the element should not render at all. The out variable is declared inline; the body only executes on success.

**Item fields** (area settings, paragraph settings):

```csharp
// Image — renders <link> only when favicon is configured
@if (Model.Area?.Item?.TryGetImageFile("Favicon", out ImageFileViewModel? favicon) ?? false)
{
    <link rel="shortcut icon" href="@favicon?.Path">
}

// File — renders a partial only when a custom include is configured
@if (Model.Area?.Item?.TryGetFile("CustomHeadInclude", out FileViewModel? include) ?? false)
{
    @RenderPartial($"Designs/Swift-v2/Custom/{include?.Name}")
}

// String — renders a <style> block only when a value is set
@if (Model.Area?.Item?.TryGetString("MediaQueryLimit", out string? limit) ?? false)
{
    <style>@@media screen and (min-width: @(limit)px) { ... }</style>
}

// Inline ternary with fallback
Pageview.Meta.AddTag("site_name",
    Model.Area?.Item?.TryGetString("MetaSiteName", out string? siteName) is true
        ? siteName
        : Model.Area?.Name);
```

> The `?? false` is needed when the calling object is nullable (`Model.Area?.Item?` can be null, making the whole expression null rather than false).

**ViewModel objects** (product images, prices, order state):

```csharp
// Product image — renders OG tag only when image exists
if (Model.DefaultImage.TryGetImageFileViewModel(out ImageFileViewModel? image))
{
    Pageview.Meta.AddOpenGraphTag("image", image.Path);
}

// Product image in order line (nullable caller — use `is true`)
@if (orderline.GetProduct()?.DefaultImage.TryGetImageFileViewModel(out var image) is true)
{
    <img src="@image?.ToGetImage(new(){ Height = 30, Width = 30 })" alt="@orderline.ProductName">
}

// VAT label — renders <small> only when VAT applies
@if (product.Price.TryGetVatLabel(out string vatLabel))
{
    <small class="opacity-85 fst-normal">@Translate(vatLabel)</small>
}

// Order state — renders badge only when state is set
@if (Model.TryGetOrderState(out var state))
{
    <span class="badge" style="background-color:@state.StateColor?.Hex !important;">
        @Translate(state.Name)
    </span>
}
```

**PageViewModel stylesheet helpers** (master template only):

```csharp
@if (Model.TryGetColorSchemeStyle(out string? colorSchemeStyle))
{
    AddStylesheet(colorSchemeStyle);
}
@if (Model.TryGetButtonStyle(out string? buttonStyle))
{
    AddStylesheet(buttonStyle);
}
@if (Model.TryGetTypographyStyle(out string? typographyStyle))
{
    AddStylesheet(typographyStyle);
}
```

**When to use `?? false` vs `is true`**

| Caller | Pattern | Why |
|--------|---------|-----|
| Non-nullable (`Model`, `product.Price`) | `if (x.TryGet(...))` | Direct bool return |
| Nullable chain (`Model.Area?.Item?`) | `if (x?.TryGet(...) ?? false)` | Null propagation returns `null?`, not `false` |
| Nullable caller with method chain | `if (x?.TryGet(...) is true)` | Alternative to `?? false`; also works |

### Page and area context

```csharp
Pageview.Page.ID                                       // current page ID (int)
Pageview.Page.TopImage                                 // page banner image
Pageview.Area.EcomShopId                               // shop ID string
Pageview.Area.EcomCurrencyId                           // currency code
Pageview.Area.CultureInfo.TwoLetterISOLanguageName     // "en", "da", etc.
Pageview.Area.CultureInfo.DateTimeFormat.ShortDatePattern
Pageview.AreaID                                        // area ID (int)
Pageview.CurrentParagraph.ID                           // current paragraph ID (int)
Pageview.IsVisualEditorMode                            // bool — true in DW editor
```

### Area settings (editor-configured global settings)

```csharp
Pageview.AreaSettings.GetRawValueString("SettingName", "")
Pageview.Area?.Item?.GetString("SettingName")
Pageview.Area?.Item?.GetBoolean("SettingName")
```

### Color scheme

```csharp
Model.ColorScheme?.Id    // color scheme identifier, use in CSS class
```

---

## PageViewModel (`Model` in master template)

```csharp
Model.Title                                            // page title
Model.MetaDescription                                  // meta description
Model.ID                                               // page ID
Model.Area                                             // AreaViewModel
Model.Item?.GetString("SettingName")                   // page item fields

// Runtime stylesheet helpers
Model.TryGetColorSchemeStyle(out string? css)          // outputs color scheme CSS path
Model.TryGetButtonStyle(out string? css)               // outputs button CSS path
Model.TryGetTypographyStyle(out string? css)           // outputs typography CSS path
```

---

## ProductViewModel (`Model` in product templates)

```csharp
Model.Id                                               // product ID string
Model.Number                                           // product number (SKU)
Model.Name                                             // product name
Model.ShortDescription
Model.LongDescription                                  // HTML content
Model.MetaTitle
Model.MetaDescription
Model.DefaultImage                                     // FileViewModel
Model.DefaultImage.TryGetImageFileViewModel(out ...)   // for responsive images

// Pricing
Model.Price.PriceFormatted                             // "123,00 DKK"
Model.Price.Price                                      // decimal
Model.Price.CurrencyCode
Model.Price.ToStringInvariant()                        // "123.00" — use in JS/JSON
Model.Price.TryGetVatLabel(out string vatLabel)
Model.GetPrice(unitId).Price.PriceFormatted            // price for specific unit

// Variants
Model.VariantInfo?.PriceMin?.PriceFormatted
Model.VariantName
Model.VariantId

// Navigation
Model.PrimaryOrDefaultGroup.PrimaryPageId              // int — product page
```

---

## ProductListViewModel (`Model` in list/search templates)

```csharp
Model.Products                                         // IEnumerable<ProductViewModel>
Model.TotalProductsCount                               // int
Model.PageSize                                         // int
Model.PageNum                                          // int
Model.FacetGroups                                      // IEnumerable<FacetGroupViewModel>
Model.SpellCheckerSuggestions                          // string[]
Model.Group                                            // ProductGroupViewModel
```

---

## OrderListViewModel (`Model` in CEC order templates)

```csharp
Model.Orders                                           // IEnumerable<OrderViewModel>

// Per order:
order.Id                                               // string
order.IntegrationOrderId
order.CustomerName
order.CustomerUserId
order.Price.PriceFormatted
order.StateId
order.StateName
order.CompletedDate                                    // DateTime
order.OrderLines                                       // IEnumerable<OrderLineViewModel>
```

---

## QueryPublisher / Classic Template API

Used only in `QueryPublisher/` templates. No typed ViewModel — data accessed via named loops and string keys.

```csharp
@foreach (var item in GetLoop("QueryResultItem")) {
    string name   = item.GetString("FieldName");
    bool selected = item.GetBoolean("FacetOption.Selected");
    int count     = item.GetInteger("FacetOption.Count");
}

// Pagination
int pageSize   = GetInteger("DwPaging.PageSize");
int totalItems = GetInteger("DwPaging.TotalItems");

// Nested loops
@foreach (var group in GetLoop("FacetGroups")) {
    @foreach (var option in group.GetLoop("FacetOptions")) { ... }
}
```

---

## Navigation Helpers

Resolve page IDs by the navigation tag editors assign in the CMS:

```csharp
int pageId = GetPageIdByNavigationTag("CartService");
// Common tags: CartService, ProductDetailPage, Shop, SearchPage
```

---

## Localization

```csharp
@Translate("Add to cart")
@Translate("In stock")
```

---

## Reading Query String / Request

```csharp
Dynamicweb.Context.Current?.Request.QueryString.Get("PageSize")
Dynamicweb.Context.Current?.Request["q"]
// Always wrap in Converter.ToInt32() etc. — values are strings
Converter.ToInt32(Dynamicweb.Context.Current?.Request.QueryString.Get("PageNum"))
```

---

## Dynamic Page Lookup

```csharp
// Get page object for a given ID, respecting language
Dynamicweb.Content.Services.Pages.GetPageOrLanguage(pageId, Pageview.AreaID)
```

---

## XSS Encoding Rules

| Context | Method | Example |
|---------|--------|---------|
| HTML content | `HtmlEncoder.HtmlEncode(value)` | `<span>@HtmlEncoder.HtmlEncode(facet.Name)</span>` |
| HTML attribute | `HtmlEncoder.HtmlEncode(value)` or Razor `@value` | `title="@HtmlEncoder.HtmlEncode(name)"` |
| JavaScript string | `HtmlEncoder.JavaScriptStringEncode(value)` | `item_name: "@HtmlEncoder.JavaScriptStringEncode(product.Name)"` |
| URL query parameter | `System.Net.WebUtility.UrlEncode(value)` | `?q=@WebUtility.UrlEncode(query)` |
| Safe — no encoding needed | ViewModel-formatted values, system-generated IDs | `@product.Price.PriceFormatted`, `@product.Number` |

**Full namespace:** `Dynamicweb.Core.Encoders.HtmlEncoder`

### When raw `@value` is safe

- Pre-formatted ViewModel properties (prices, dates) — already sanitised
- System-generated IDs and numbers (`product.Id`, `product.Number`)
- SVG content read with `ReadFile(path)` — server filesystem, not user input
- HTML content fields (`LongDescription`) — DynamicWeb sanitises on save; render with `@Html.Raw()`

### When to always encode

- Anything from user input: search queries, customer names, order references from external systems
- Facet option labels (from product data, potentially user-managed)
- Any value embedded in a JavaScript string literal
