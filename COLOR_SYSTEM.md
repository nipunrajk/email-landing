# Color System Specification

This document details the complete color systems across the project ecosystem:
1. **Landing Page (`email-landing`)** — *"The Proof"* (Editorial / Cyanotype Palette)
2. **Editor Web Application (`email-canvas`)** — Spherule Brand & Canvas Hierarchy System

---

## 1. Landing Page (`email-landing`) — "The Proof"

### Narrative & Design Philosophy
Getdraft sits between a design file (Figma) and an email send. In print history, that in-between artifact is **the proof** (the blueline / cyanotype contact print pulled to inspect registration and quality before committing to an irreversible press run). 

Email clients are the modern press: unforgiving, constrained reproduction targets. The landing page palette is drawn from the tangible artifacts of proofing—tinted proofing stock, deep iron prussian blue ink, pine inspection stamps, and red margin grease pencils—avoiding generic purple/blue SaaS defaults.

### Token Architecture (`src/style.css` via `@theme`)

#### Neutrals & Surfaces
| CSS Variable | Value | Role | Visual Description |
|---|---|---|---|
| `--color-canvas` | `#edf1f4` | Page Canvas / Background | **Cool proofing-table paper**. Carries a subtle cyanotype ink undertone so the page reads as tinted stock rather than cold neutral gray. |
| `--color-surface` | `#ffffff` | Sheet / Card Surface | **The proof sheet**. Pure white reserved strictly for foreground cards and panels laid on the table. |
| `--color-subtle` | `#e2e9ef` | Recessed Fills | Recessed fills for inputs, chips, search bars, and hover backdrops. |
| `--color-ink` | `#0f1d28` | Primary Text & Headings | Near-black carrying the cyanotype blue undertone. Ensures typography belongs to the ink family. |
| `--color-muted` | `#5a6b78` | Secondary Copy & Metadata | Thinned ink. Clears 4.8:1 contrast on canvas (WCAG AA compliant). |
| `--color-ink-deep` | `#0a2231` | Dark Ground (Footer) | **The darkroom**. High-contrast base for the footer and inverted sections, drawn from the same plate. |

#### Borders & Registration Rules
| CSS Variable | Value | Role | Usage |
|---|---|---|---|
| `--color-line` | `#dce4ea` | Hairline Rule | Hairline registration rules separating content zones without feeling like harsh boxed borders. |
| `--color-line-strong` | `#bfcbd5` | Structural Border | Heavier rule used when an element boundary must hold a tactile edge (e.g. ghost buttons, active cards). |

#### Brand & Plate Colors
| CSS Variable | Value | Role | Usage |
|---|---|---|---|
| `--color-brand` | `#123c5a` | Primary Brand Color | **Cyanotype Prussian Blue**. Dark enough to carry white text at 11.4:1 contrast ratio. Primary CTAs, active highlights. |
| `--color-brand-bright`| `#2e7fa6` | Wet Print Highlight | Specular light catching wet ink. Used for hover states, active pill indicators, and accents against dark surfaces. |
| `--color-brand-deep` | `#0c2c42` | Pressed / Deep State | Pressed button states; ink soaked into the stock. |
| `--color-tint` | `#e1edf4` | Plate Wash | Diluted plate wash for badge fills, category tags, and icon containers. |

#### Status & Editorial Annotations
| CSS Variable | Value | Role | Usage |
|---|---|---|---|
| `--color-mint` | `#2d6a4a` | "Passes" / Success | Sap/pine green proofing mark (editorial annotation rather than neon web success green). |
| `--color-mint-soft` | `#e2efe7` | Success Wash | Soft background wash for successful validation badges. |
| `--color-coral` | `#9a4527` | "Flagged" / Warning | Iron oxide / red pencil margin note. Deliberately muted so warnings read as reviewer notes rather than sirens. |
| `--color-coral-soft` | `#f5e4dc` | Warning Wash | Soft background wash for warning flags and notices. |

#### Brand Mark Gradient (`BrandMark.vue`)
The chamfered dispatch badge uses a 3-stop angled linear gradient:
- **Angle**: `x1="18%" y1="0%"` to `x2="82%" y2="100%"`
- **Stop 0%**: `#2E1A6E` (Deep lacquered indigo top specular)
- **Stop 48%**: `#3D1FA8` (Vibrant enamel midtone)
- **Stop 100%**: `#1C0F52` (Near-black indigo base shadow)
- **Hover Shadow**: `rgba(30, 10, 80, 0.55)`

---

## 2. Editor Web Application (`email-canvas`) — Spherule Canvas System

### Narrative & Design Philosophy
The editor workspace requires a high-focus, low-fatigue environment with unmistakable visual hierarchy. Elements on the canvas (HTML sections, layout rows, and individual blocks) must be immediately identifiable when hovered or selected, requiring distinct contrast boundaries that meet WCAG non-text contrast rules (≥ 3:1).

### Token Architecture (`src/app/globals.css`)

#### Core UI Tokens
| Token | CSS Variable / OKLCH | Hex / Equivalent | Usage |
|---|---|---|---|
| Primary Brand | `--primary` | `#6E44FF` | Spherule Violet brand accent. Applied to primary action buttons, focused input rings, active tab pills. |
| Primary Soft | `--color-primary-soft` | `#ede9fe` | Variable pills (`{{first_name}}`), soft selections. |
| Primary Glow | `--color-primary-glow` | `#a78bfa` | Soft focus rings and outline halos. |
| Canvas Background | `--background` / `.canvas-bg` | `oklch(0.98 0 0)` / `#f8f9fb` | Neutral workbench canvas surface. |
| Canvas Dot-Grid | Radial gradient | `#f8f9fb` + `rgba(124, 58, 237, 0.1)` | 22px × 22px dot grid aiding spatial alignment. |
| Card / Panel | `--card` / `--popover` | `oklch(1 0 0)` (`#ffffff`) | Inspector sidebars, modal dialogs, toolbar chrome. |
| Foreground | `--foreground` | `oklch(0.145 0 0)` | High-contrast dark text on chrome. |
| Muted Foreground | `--muted-foreground` | `oklch(0.556 0 0)` | Secondary labels, dimension specs, hints. |
| Border | `--border` | `oklch(0.922 0 0)` | Subtle panel dividers and input borders. |

#### Tier-Specific Canvas Selection Outlines
In the visual email canvas, outline colors explicitly differentiate the DOM structural depth:
| Structural Tier | Variable Name | Hex Code | Contrast on Canvas | Rationale |
|---|---|---|---|---|
| **Block** (text, button, image) | `--selection-block` | `#0284c7` (Sky-600) | **4.1:1** vs white | Upgraded from sky-500 (#0ea5e9 @ 2.8:1) to clear the WCAG AA 3:1 non-text contrast threshold. |
| **Row** (multi-column container) | `--selection-row` | `#1e293b` (Slate-800) | **11.5:1** vs white | High-contrast dark boundary ensuring grid rows are unmistakable. |
| **Section** (full-width wrapper) | `--selection-section` | `#475569` (Slate-600) | **5.3:1** vs white | Medium-slate perimeter marking outer page sections. |

#### Floating Canvas HUD Chrome
- **Floating HUD Background**: `--canvas-hud-bg: var(--popover)` (`#ffffff`)
- **Floating HUD Border**: `--canvas-hud-border: rgba(0, 0, 0, 0.06)` (Dark mode: `rgba(255, 255, 255, 0.12)`)
- **Floating HUD Active Text/Icon**: `--canvas-hud-fg: var(--canvas-selection)`

---

## 3. Quick Reference Matrix

```
PROJECT: email-landing ("The Proof")
├── Canvas Base:       #edf1f4  (Cool tinted paper)
├── Surface:           #ffffff  (Proof sheet)
├── Ink (Body Text):   #0f1d28  (Near-black Prussian Blue)
├── Muted Text:        #5a6b78  (AA Compliant secondary copy)
├── Primary Brand:     #123c5a  (Cyanotype Blue)
├── Brand Hover:       #2e7fa6  (Wet print cyan)
├── Line Rules:        #dce4ea  (Hairline) / #bfcbd5 (Strong)
├── Mint (Pass):       #2d6a4a  / Wash: #e2efe7
└── Coral (Flag):      #9a4527  / Wash: #f5e4dc

PROJECT: email-canvas (Editor App)
├── Brand Primary:     #6E44FF  (Spherule Violet)
├── Soft Accent:       #ede9fe  (Pills & selections)
├── Canvas Surface:    #f8f9fb  (Dot-grid background)
├── Block Selection:   #0284c7  (Sky-600 outline)
├── Row Selection:     #1e293b  (Slate-800 outline)
└── Section Selection: #475569  (Slate-600 outline)
```
