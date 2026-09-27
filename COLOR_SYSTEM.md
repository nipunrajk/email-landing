# Color — the single source for this repo

**If you are an agent (opencode, Claude, Gemini, Copilot, or any other model) about to
touch color in this repository, this is the file to read. It is the only one.**

No other document in this repo defines or discusses the color scheme. Anything that needs
a color, a token, or a palette question resolves here. If you find a hex in a component,
it is a bug — use the token.

---

## 1. The rule

- **Use the tokens. Never write a hex value.** Raw hex in a component survives the next
  re-theme and silently goes stale. This repo has had exactly that problem.
- **Never reach for `indigo-*`, `violet-*`, `purple-*`, or `fuchsia-*`.** The brand was
  electric violet (`#6e44ff`) until it was replaced. It is a Tailwind-violet-600 with the
  chroma pushed past the default, which is the generic AI-SaaS look this palette exists to
  avoid. It is not coming back, not even temporarily.
- **One accent hue.** Brand blue for anything interactive or brand-bearing. Mint and coral
  are **status only** — "passes" and "flagged". They are never decoration.
- **Do not add a color that has no role.** If you need a step that doesn't exist, the fix
  is a role, not a hex. Check §3 first — the trap is usually already solved.

## 2. The palette

15 tokens shared byte-for-byte with [`email-canvas`](../email-canvas/COLOR_SYSTEM.md), plus
a 16th value that is renamed on that side. **This table is identical in both repos and is
enforced by a pre-commit hook (§5).** Do not edit one copy.

### Surfaces & text

| Token | Value | Use it for | Measured |
|---|---|---|---|
| `--color-canvas` | `#edf1f4` | Page background. Tinted stock, never a neutral gray. | — |
| `--color-surface` | `#ffffff` | Cards, panels, popovers. | — |
| `--color-subtle` | `#e2e9ef` | Recessed fills: inputs, chips, hover backdrops. | — |
| `--color-ink` | `#0f1d28` | Body text, headings. | 15.07:1 on canvas |
| `--color-muted` | `#5a6b78` | Secondary copy. | 4.85:1 canvas · 5.51:1 surface |
| `--color-ink-deep` | `#0a2231` | Dark grounds. | — |

### Rules & edges

| Token | Value | Use it for |
|---|---|---|
| `--color-line` | `#dce4ea` | Hairline dividers. Decorative — not a state indicator. |
| `--color-line-strong` | `#bfcbd5` | An edge that has to hold a shape: ghost buttons, active card outlines. |

### Brand

| Token | Value | Use it for | Measured |
|---|---|---|---|
| `--color-brand` | `#123c5a` | Cyanotype Prussian Blue. Primary CTAs, active states, focus rings. | white **11.54:1** · text on canvas **10.16:1** |
| `--color-brand-bright` | `#2e7fa6` | Wet print. **Dark grounds and focus halos only.** | **3.93:1** on canvas — never small text on light |
| `--color-brand-deep` | `#0c2c42` | Pressed state. | white **14.44:1** |
| `--color-tint` | `#e1edf4` | Plate wash: badge fills, icon containers. | — |

### Status — never decoration

| Token | Value | Meaning |
|---|---|---|
| `--color-mint` | `#2d6a4a` | "Passes" |
| `--color-mint-soft` | `#e2efe7` | "Passes" wash |
| `--color-coral` | `#9a4527` | "Flagged" |
| `--color-coral-soft` | `#f5e4dc` | "Flagged" wash |

Why blue and not violet: the neutrals sit at hue ≈243° in OKLCH. The brand is 244°, so brand
and ink come off one plate. The old violet was 285° — a 41° rotation at 3.7× the chroma, a
different hue sitting on a blue-gray system, which reads as a sticker rather than a brand.
Keep the hue family intact if you adjust anything.

## 3. Traps — check these before adding a color

**`--color-brand` on `--color-ink-deep` is 1.41:1.** A `bg-brand` button on the dark footer
card effectively disappears. The footer's primary action is inverted
(`bg-surface` / `text-ink`, 17.12:1) for exactly this reason.

**`--color-brand-bright` cannot substitute for it either.** It is 4.47:1 with white and
3.66:1 with every dark label in the system — a dead zone where nothing clears 4.5:1. Don't
try to fix a dark-ground button by reaching for `brand-bright`; invert it.

**`--color-brand-bright` is not a text color on light grounds.** 3.93:1 on canvas. It is for
dark grounds and halos.

**`--color-line` at 1.29:1 is decorative only.** It is fine as a divider and wrong as the
only thing identifying an interactive control.

**A sub-44px control in the editor mockup is a picture, not a control.** The mockup's
toolbar buttons render at their real editor sizes. Don't resize them to satisfy a tap-target
rule, and don't add `aria-label`s to them.

## 4. Local to this repo

**Brand mark.** `src/components/BrandMark.vue` and `public/favicon.svg` render the chamfered
dispatch badge. Its three gradient stops are brand tokens, not new colors: `#2e7fa6` at 0%
→ `#123c5a` at 52% → `#0c2c42` at 100%, with the arrow shadow in `#0a2231` at 0.5.
`email-canvas/public/logo.svg` is the canonical artwork file.

**The footer's confetti** samples a weighted ramp from these tokens — white ×6, tint ×3,
brand-bright ×3, brand ×1, coral ×1 — so the hover scatter is brand-family with one warm
accent in fourteen. If you change the palette, that weighting is in `SiteFooter.vue` and
wants a look.

**Known rough edge, not a regression.** The brand ramp has ~10.8° of hue drift
(`tint` and `brand-bright` at H≈233°, `brand` and `brand-deep` at H≈243°) and a 0.37
lightness gap between `tint` (L 0.94) and `brand-bright` (L 0.57). This predates the
cyanotype port. Closing it means adding a step at L≈0.75 — which needs a role to consume it
before it earns a place. Don't "fix" it casually.

## 5. Verify

A git pre-commit hook enforces this file. It runs on every commit in both repos:

```sh
npm run hooks:install     # once per clone
```

The hook checks three things: that the two repos' CSS declare the same shared tokens, that
this table matches the CSS, and that no component has hardcoded a brand value. If it
fails, **`email-canvas/src/app/globals.css` is canonical** — change it there, copy into
`src/style.css`, update the table above, and commit again.

Run it by hand any time with `node scripts/hooks/checks/10-color-system.mjs`.

To add another check later, drop a file in `scripts/hooks/checks/`. The dispatcher picks it
up; no wiring needed. Bypass a single commit with `git commit --no-verify`.
