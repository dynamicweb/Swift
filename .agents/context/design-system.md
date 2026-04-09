# Design System — CSS Variables & Styling

How Swift maps DynamicWeb runtime configuration to visual output via CSS custom properties.

---

## Variable Namespaces

| Prefix | Owner | Set by | Purpose |
|--------|-------|--------|---------|
| `--dw-*` | DynamicWeb | Runtime (DW backend) | Colors, typography, button shape, layout spacing from DW config |
| `--bs-*` | Bootstrap | SCSS compile time, overridden by `--dw-*` | Bootstrap component defaults |
| `--swift-*` | Swift | SCSS compile time, some set by JS | Component-specific sizing and layout logic |

---

## The Variable Chain

```
DynamicWeb backend config (color scheme editor, typography editor)
    │
    ▼ TryGetColorSchemeStyle() / TryGetButtonStyle() / TryGetTypographyStyle()
    │
    ▼ Injected as runtime <link> stylesheets — define --dw-* on [data-dw-colorscheme]
    │
    ▼ _colorschemes.scss / _typography.scss — remap --dw-* → --bs-* on same selector
    │
    ▼ Bootstrap components consume --bs-* variables
    │
    ▼ Swift components consume --dw-* and --swift-* directly
```

Color schemes are **scoped** — they only apply inside elements with `[data-dw-colorscheme]`, not globally. This allows different rows/columns on the same page to have different color schemes.

---

## `--dw-*` Variables

### Colors (set at runtime per color scheme)

```css
--dw-color-foreground              /* text color */
--dw-color-foreground-rgb          /* same as RGB triplet, for rgba() use */
--dw-color-background              /* background color */
--dw-color-background-rgb
--dw-color-button-primary          /* primary button fill */
--dw-color-button-primary-contrast /* primary button text */
--dw-color-button-primary-rgb
--dw-color-button-secondary
--dw-color-button-secondary-contrast
--dw-color-button-secondary-rgb
```

### Typography (set at runtime per area/page)

```css
--dw-base-font-size    /* root font size from DW config */
--dw-font-family
--dw-font-size         /* = --dw-base-font-size on body; scaled via pow() on headings */
--dw-font-weight
--dw-font-style
--dw-line-height
--dw-letter-spacing
--dw-text-transform
--dw-type-scale        /* multiplier for heading scale, default 1.200 */
```

Heading sizes are derived mathematically:
```scss
h1 { --dw-font-size: calc(var(--dw-base-font-size) * pow(var(--dw-type-scale), 5)); }
h2 { --dw-font-size: calc(var(--dw-base-font-size) * pow(var(--dw-type-scale), 4)); }
/* h3=3, h4=2, h5=1, h6=0 */
```

### Button shape (set at runtime)

```css
--dw-btn-padding-x
--dw-btn-padding-y
--dw-btn-border-radius
--dw-btn-border-width
```

### Layout (set in SCSS from data attributes on grid elements)

```css
--dw-container-width    /* content max-width */
--dw-container-gutter   /* horizontal margin (0 or 32px) */
--dw-row-space-top      /* row top padding (0–336px, from spacer scale) */
--dw-row-space-bottom
--dw-row-gap-column     /* column gap */
--dw-row-gap-row        /* row gap */
--dw-row-vertical-align /* flex align-items value */
```

---

## How `--dw-*` Maps to `--bs-*`

`_src/scss/1-dw/_colorschemes.scss` remaps DW color variables to Bootstrap variables **inside `[data-dw-colorscheme]`**:

```scss
[data-dw-colorscheme]:not([data-dw-colorscheme=""]) {
    --bs-body-color:     var(--dw-color-foreground);
    --bs-body-color-rgb: var(--dw-color-foreground-rgb);
    --bs-heading-color:  var(--dw-color-foreground);
    --bs-body-bg:        var(--dw-color-background);
    --bs-body-bg-rgb:    var(--dw-color-background-rgb);
    --bs-border-color:   rgba(var(--bs-body-color-rgb), .15);
}
```

Button variants inside a color scheme:
```scss
.btn-primary, [data-dw-button="primary"] {
    --bs-btn-color:        var(--dw-color-button-primary-contrast);
    --bs-btn-bg:           var(--dw-color-button-primary);
    --bs-btn-hover-bg:     color-mix(in srgb, var(--dw-color-button-primary) 75%, var(--dw-color-background));
    /* ... active, focus, disabled states */
}
```

> **Always add `data-dw-button="primary"` alongside `class="btn btn-primary"`** on buttons — the `data-dw-button` attribute is the hook that makes the color scheme theming apply.

---

## `--swift-*` Variables

### Content layout

```css
--swift-content-padding   /* standard padding inside columns (2rem default, 0 in header/footer) */
--swift-text-width        /* readable text column max-width (75ch mobile, 80ch xl+) */
--swift-offcanvas-width   /* off-canvas menu width */
```

### Poster / hero

```css
--swift-poster-padding        /* responsive clamp() value */
--swift-poster-height         /* 15vh default; 35/55/85vh for size variants */
--swift-poster-gradient       /* overlay gradient definition */
--swift-poster-gradient-color /* gradient color, defaults to var(--dw-color-background) */
```

### Tables

```css
--swift-table-cell-padding-y  /* .5rem default, .25rem in .table-clean */
--swift-table-cell-padding-x  /* .5rem default, 2rem in .table-lg */
```

### Set by JavaScript

```css
--swift-dynamic-offset   /* set by _menu.js to align megamenu with parent row padding */
```

---

## Spacer Scale

Used for row spacing (`--dw-row-space-top` etc.), driven by `data-dw-row-space-top="N"` attributes:

| N | px |
|---|----|
| 0 | 0 |
| 1 | 4px |
| 2 | 8px |
| 3 | 16px |
| 4 | 32px |
| 5 | 48px |
| 6 | 96px |
| 7 | 120px |
| 8 | 192px |
| 9 | 240px |
| 10 | 336px |

---

## Container Width Modes

`[data-swift-container]` max-width is controlled by `data-dw-container-width` on the row:

| Value | Mobile | Large |
|-------|--------|-------|
| `1` | 75ch | `--swift-text-width` |
| `2` | 100% | 65vw |
| `3` | 100% | 80% of container limit |
| `4` | 100%, no gutter | 100%, no gutter |

---

## Color Scheme Scoping

Color schemes apply to elements with `[data-dw-colorscheme]`. Inside such an element:

- Non-card, non-figure direct children of `[data-swift-gridcolumn]` get `padding: var(--swift-content-padding)`
- Poster children get `padding: var(--swift-poster-padding)`
- The background color is applied to the column itself, **unless** the column contains a `.card` (cards carry their own background)

This is why paragraphs that render a `.card` as their root element do **not** get the column background — the card's own white/themed background takes over.

---

## Writing New Component Styles

- Use `--dw-color-*` for colors that must respect the active color scheme
- Use `--bs-*` overrides for Bootstrap component theming within a color scheme scope
- Use `--swift-*` for new Swift-specific sizing or layout values
- Never hardcode colors that should vary by scheme — always reference `--dw-color-foreground` / `--dw-color-background`
- For `rgba()` with DW colors, use the `-rgb` variant: `rgba(var(--dw-color-foreground-rgb), 0.5)`
- Use `color-mix(in srgb, ...)` for hover/active tints (already used in button theming)
