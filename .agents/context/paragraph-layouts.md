# Paragraph Layouts

How Swift's paragraph layout system works, and how to build new layouts correctly.

---

## How It Works

Each paragraph type lives in a **subfolder** under `Files/Templates/Designs/Swift-v2/Paragraph/`. Every `.cshtml` file in that folder is a **layout variant** — a selectable visual arrangement of the same editor fields.

```
Paragraph/
├── Swift-v2_Card/
│   ├── CardImageTop.cshtml      ← layout variant
│   ├── CardImageLeft.cshtml     ← layout variant
│   ├── CardImageRight.cshtml
│   ├── CardOverlayLeft.cshtml
│   ├── CardOverlayRight.cshtml
│   └── CardTitleTop.cshtml
├── Swift-v2_Poster/
│   ├── TextBottomLeft.cshtml
│   ├── TextMiddleCenter.cshtml
│   └── ...
└── Swift-v2_Text/
    ├── TextLeft.cshtml
    ├── TextCenter.cshtml
    └── TextRight.cshtml
```

**Key facts:**
- There is no parent `.cshtml` per folder — the layout files *are* the templates
- DynamicWeb auto-discovers all `.cshtml` files in the subfolder and exposes them as layout choices in the editor
- All layouts within a paragraph type share the same editor fields (same item type definition) — only the HTML structure differs
- The layout filename becomes the display name in the editor UI (PascalCase → spaced label)

---

## File Naming Convention

`{DescriptiveLayout}.cshtml` — PascalCase, describes the primary visual characteristic.

Patterns used:
- **Position of image**: `CardImageTop`, `CardImageLeft`, `CardImageRight`
- **Text position**: `TextBottomLeft`, `TextMiddleCenter`
- **Visual style**: `CardOverlayLeft`, `IconBoxTop`
- **Minimal/single**: `Plain` (when there's only one layout)

---

## Anatomy of a Layout File

Every layout file follows this exact structure — no exceptions:

```cshtml
@inherits Dynamicweb.Rendering.ViewModelTemplate<Dynamicweb.Frontend.ParagraphViewModel>
@using Dynamicweb.Frontend

<div class="...">        ← root element (no outer wrapper — DW provides the column)
    ...
</div>
```

- Always `ParagraphViewModel` — same ViewModel for all paragraph layouts
- Always `@using Dynamicweb.Frontend` — needed for `ImageFileViewModel`, `ButtonViewModel`, `LinkViewModel`
- The root element is the layout's own outer container. DynamicWeb wraps it in the grid column — do not add an extra container layer.

---

## Reading Editor Fields

All fields use `Model.Item.TryGet*` — render the element only if the field has a value:

```cshtml
@* String / rich text *@
@if (Model.Item.TryGetString("Title", out string title))
{
    @title
}

@* Image *@
@if (Model.Item.TryGetImageFile("Image", out ImageFileViewModel image))
{
    <img src="@image.ToGetImage(new(){ Width = 650 })"
         class="..."
         style="object-position: @image.GetFocalPointPercentage()"
         alt="@Model.Item?.GetString("AltText")" />
}

@* Link on the image *@
@if (Model.Item.TryGetLink("ImageLink", out LinkViewModel link))
{
    <a href="@link.Url" class="stretched-link" title="@link.Url"></a>
}

@* Button *@
@if (Model.Item.TryGetButton("FirstButton", out ButtonViewModel btn))
{
    <a href="@btn.Link.Url" class="btn btn-@btn.Style" data-dw-button="@btn.Style">@btn.Label</a>
}
```

> `TryGetString` returns rich text HTML (already safe to render with `@title`). Do not use `@Html.Raw()` — DW sanitises rich text on save.

---

## Standard Building Blocks

These patterns appear across layouts and should be reused:

### Image in a figure

```cshtml
<figure class="m-0 position-relative">
    @if (Model.Item.TryGetImageFile("Image", out ImageFileViewModel image))
    {
        @if (image.IsSvg())
        {
            @ReadFile(image.Path)
        }
        else
        {
            <img src="@image.ToGetImage(new(){ Width = 650 })"
                 class="h-100 w-100 object-fit-cover"
                 style="object-position: @image.GetFocalPointPercentage()"
                 alt="@Model.Item?.GetString("AltText")" />
        }
    }
    @if (Model.Item.TryGetLink("ImageLink", out LinkViewModel link))
    {
        <a href="@link.Url" class="stretched-link" title="@link.Url"></a>
    }
</figure>
```

- Always `m-0` on `<figure>` to remove default browser margin
- `position-relative` enables `stretched-link` to work
- `object-fit-cover` + `object-position: @image.GetFocalPointPercentage()` preserves editor focal point
- SVG check is needed — SVGs should be inlined, not in `<img>`

### Text content area

```cshtml
<div data-swift-text class="mb-0-last-child">
    @if (Model.Item.TryGetString("Title", out string title))
    {
        @title
    }
    @if (Model.Item.TryGetString("Text", out string text))
    {
        @text
    }
</div>
```

- `data-swift-text` is a styling hook — required for typography and color scheme rules to apply correctly
- `mb-0-last-child` removes the bottom margin from the last child element (prevents double spacing at the bottom of the card body)

### Button group

```cshtml
<div class="d-flex flex-wrap gap-2 align-items-center">
    @if (Model.Item.TryGetButton("FirstButton", out ButtonViewModel firstButton))
    {
        <a href="@firstButton.Link.Url" class="btn btn-@firstButton.Style" data-dw-button="@firstButton.Style">@firstButton.Label</a>
    }
    @if (Model.Item.TryGetButton("SecondButton", out ButtonViewModel secondButton))
    {
        <a href="@secondButton.Link.Url" class="btn btn-@secondButton.Style" data-dw-button="@secondButton.Style">@secondButton.Label</a>
    }
</div>
```

- `data-dw-button="@btn.Style"` is required alongside `btn-@btn.Style` — this is the hook that makes color scheme button theming apply (see design-system.md)

---

## Layout Patterns (with real examples)

### Stack (image above content)

`Swift-v2_Card/CardImageTop.cshtml`

```cshtml
<div class="card h-100">
    <figure class="m-0 position-relative">
        ... image ...
    </figure>
    <div class="card-body">
        <div data-swift-text class="mb-0-last-child">...</div>
        <div class="d-flex flex-wrap gap-2 align-items-center">... buttons ...</div>
    </div>
</div>
```

### Side by side (2-column grid)

`Swift-v2_Card/CardImageLeft.cshtml`

```cshtml
<div class="card h-100 d-grid grid-2 gap-0">
    <figure class="m-0 position-relative">
        ... image (left column) ...
    </figure>
    <div class="card-body">
        ... text and buttons (right column) ...
    </div>
</div>
```

Swap figure and card-body order for ImageRight.

### Overlay (card overlaps image)

`Swift-v2_Card/CardOverlayLeft.cshtml`

```cshtml
<div class="grid grid-2 gap-0">
    <div class="card my-4 z-1" style="margin-inline-end: -4rem;">
        <div class="card-body">...</div>
    </div>
    <figure class="m-0 position-relative">
        ... image (full bleed, behind card) ...
    </figure>
</div>
```

The negative `margin-inline-end` pulls the card over the image. `z-1` keeps it above the figure.

### Poster (text over full-bleed background image)

`Swift-v2_Poster/TextMiddleCenter.cshtml`

```cshtml
<div data-swift-poster="middle-center" class="position-relative overflow-hidden">
    <figure class="m-0 position-absolute top-0 start-0 w-100 h-100">
        ... image (absolutely positioned, full bleed) ...
    </figure>
    <div data-swift-container class="position-relative z-1 py-4">
        <div data-swift-text class="mb-0-last-child text-center">...</div>
        <div class="d-flex flex-wrap gap-2 justify-content-center">... buttons ...</div>
    </div>
</div>
```

- `data-swift-poster="middle-center"` drives JS and CSS targeting
- Figure is `position-absolute` so the content div sets the height
- Content div is `position-relative z-1` to sit above the image

---

## Data Attributes Used in Layouts

| Attribute | Used on | Purpose |
|-----------|---------|---------|
| `data-swift-text` | text wrapper `<div>` | Hooks typography and color scheme CSS rules |
| `data-swift-poster="…"` | poster root `<div>` | Identifies poster layout variant for CSS/JS |
| `data-swift-container` | content overlay `<div>` | Marks the content area in a poster/overlay layout |
| `data-dw-button="…"` | `<a>` / `<button>` | Enables color scheme button theming |

---

## Checklist for New Layouts

- [ ] Inherits `ParagraphViewModel`, has `@using Dynamicweb.Frontend`
- [ ] All fields use `TryGet*` — no field is rendered unconditionally
- [ ] Images are in `<figure class="m-0 position-relative">`
- [ ] SVG vs raster check (`image.IsSvg()`)
- [ ] Focal point applied (`style="object-position: @image.GetFocalPointPercentage()"`) on cover images
- [ ] Text wrapped in `<div data-swift-text class="mb-0-last-child">`
- [ ] Buttons have both `class="btn btn-@btn.Style"` and `data-dw-button="@btn.Style"`
- [ ] Buttons grouped in `<div class="d-flex flex-wrap gap-2 align-items-center">`
- [ ] Root element is the layout container — no extra outer wrapper
- [ ] No hardcoded colors — use Bootstrap or `--dw-*` variables via CSS classes
