#!/usr/bin/env node
/**
 * Color system check.
 *
 * Three questions, because the color bugs in this project have been three
 * different kinds of bug:
 *
 *   1. Do the two repos' CSS declare the same shared tokens?
 *   2. Does COLOR_SYSTEM.md tell the truth about the CSS?
 *   3. Has a brand value been typed straight into a component instead of using
 *      the token?
 *
 * Zero dependencies. Exits 0 to allow the commit, 1 to block it, 2 to skip
 * (e.g. one repo cloned without its sibling).
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { dirname, resolve, relative, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SELF = dirname(fileURLToPath(import.meta.url))
// scripts/hooks/checks -> repo -> projects-2026
const ROOT = resolve(SELF, '..', '..', '..', '..')
const LANDING = join(ROOT, 'email-landing')
const EDITOR = join(ROOT, 'email-canvas')

const LANDING_CSS = join(LANDING, 'src/style.css')
const EDITOR_CSS = join(EDITOR, 'src/app/globals.css')
const LANDING_MD = join(LANDING, 'COLOR_SYSTEM.md')
const EDITOR_MD = join(EDITOR, 'COLOR_SYSTEM.md')

const isEditor = basename(dirname(dirname(SELF))) === 'email-canvas'
const SELF_REPO = isEditor ? EDITOR : LANDING
const SIBLING = isEditor ? LANDING : EDITOR
const SELF_CSS = isEditor ? EDITOR_CSS : LANDING_CSS
const SELF_MD = isEditor ? EDITOR_MD : LANDING_MD

function basename(p) {
  return p.split('/').pop()
}

// The 15 tokens that must be identical under the same name in both repos.
// `muted` is excluded on purpose: it is the same value under a different name
// on each side, and is checked separately below.
const SHARED = [
  'canvas', 'surface', 'subtle', 'ink', 'ink-deep', 'line', 'line-strong',
  'brand', 'brand-bright', 'brand-deep', 'tint', 'mint', 'mint-soft',
  'coral', 'coral-soft',
]

// Values that belong to the brand ramp. Typing one of these into a component
// is the bug check 3 looks for.
const BRAND_VALUES = [
  '#123c5a', '#2e7fa6', '#0c2c42', '#e1edf4', '#0a2231',
  '#123C5A', '#2E7FA6', '#0C2C42', '#E1EDF4', '#0A2231',
]

// Files allowed to contain literal brand values, with the reason. New files are
// not on this list, so they are held to the rule. If you add an entry, leave a
// reason — an unexplained allowlist entry is just a hole.
const ALLOWLIST = {
  'email-landing/src/components/BrandMark.vue':
    'SVG gradient stops. The logo is artwork, and its three stops are brand tokens by design.',
  'email-landing/src/components/SiteFooter.vue':
    'The confetti ramp samples token values to paint canvas dots, which has to be literal.',
  'email-landing/src/components/EditorWorkbench.vue':
    'A mockup of another product. It paints literal values to look like a screenshot.',
  'email-landing/src/components/CollaborativeCursors.vue':
    'Drives the mockup above; a swatch pick has to be a real value.',
  'email-canvas/src/components/DashboardView.tsx':
    'Default for user-authored block styling, not a brand decision.',
}

const problems = []
const notes = []
const fail = (m) => problems.push(m)
const note = (m) => notes.push(m)

// ── helpers ────────────────────────────────────────────────────────────────
const readCss = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : null)
const readMd = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : null)

function cssTokens(css) {
  const out = {}
  for (const m of css.matchAll(/--color-([a-z-]+):\s*(#[0-9a-fA-F]{6})/g)) {
    if (!(m[1] in out)) out[m[1]] = m[2].toLowerCase()
  }
  return out
}

function mdTokens(md) {
  const out = {}
  for (const m of md.matchAll(/\|\s*`--color-([a-z-]+)`\s*\|\s*`(#[0-9a-fA-F]{6})`/g)) {
    if (!(m[1] in out)) out[m[1]] = m[2].toLowerCase()
  }
  return out
}

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc
  for (const e of readdirSyncSafe(dir)) {
    if (e === 'node_modules' || e === '.git' || e === 'dist' || e === '.next') continue
    const full = join(dir, e)
    if (statIsDir(full)) walk(full, acc)
    else acc.push(full)
  }
  return acc
}
function readdirSyncSafe(d) {
  try { return readdirSync(d) } catch { return [] }
}
function statIsDir(p) {
  try { return statSync(p).isDirectory() } catch { return false }
}

// ── 0. can we even run? ────────────────────────────────────────────────────
if (!existsSync(SELF_CSS)) {
  console.log('color-system: SKIP — cannot find this repo’s stylesheet at ' + relative(ROOT, SELF_CSS))
  process.exit(2)
}

// ── 1. CSS ↔ CSS ───────────────────────────────────────────────────────────
if (!existsSync(SIBLING) || !existsSync(EDITOR_CSS)) {
  note(
    `sibling repo not available (${relative(ROOT, SIBLING)}) — skipped the cross-repo ` +
    'comparison. This is normal in a single-repo clone or CI; it is NOT a pass.',
  )
} else {
  const a = cssTokens(readCss(LANDING_CSS) || '')
  const b = cssTokens(readCss(EDITOR_CSS) || '')
  for (const t of SHARED) {
    if (!a[t]) fail(`${t}: not declared in email-landing/src/style.css`)
    else if (!b[t]) fail(`${t}: not declared in email-canvas/src/app/globals.css`)
    else if (a[t] !== b[t]) {
      fail(`${t}: repos disagree — email-landing ${a[t]} vs email-canvas ${b[t]}`)
    }
  }
  // muted: same value, different name on each side
  const lm = a.muted
  const em = (readCss(EDITOR_CSS) || '').match(/--muted-foreground:\s*(#[0-9a-fA-F]{6})/)?.[1]?.toLowerCase()
  if (!lm) fail('muted: not declared in email-landing/src/style.css')
  else if (!em) fail('muted-foreground: not declared in email-canvas/src/app/globals.css')
  else if (lm !== em) fail(`muted: repos disagree — email-landing --color-muted ${lm} vs email-canvas --muted-foreground ${em}`)
}

// ── 2. MD ↔ CSS ────────────────────────────────────────────────────────────
for (const [label, repoDir, mdPath, cssPath] of [
  ['email-landing', LANDING, LANDING_MD, LANDING_CSS],
  ['email-canvas', EDITOR, EDITOR_MD, EDITOR_CSS],
]) {
  // A repo that isn't on disk can't be checked. That's a single-repo clone or a
  // CI job, not a color problem — skip it rather than fail.
  if (!existsSync(repoDir)) { note(`${label} is not on disk — its checks were skipped`); continue }
  const md = readMd(mdPath)
  if (!md) { fail(`${label}: COLOR_SYSTEM.md is missing`); continue }
  const css = readCss(cssPath)
  if (!css) { fail(`${label}: stylesheet is missing`); continue }
  const doc = mdTokens(md)
  const real = cssTokens(css)
  // The editor exposes muted text as --muted-foreground, so the doc's
  // --color-muted row is checked against that name there.
  if (label === 'email-canvas') {
    const em = css.match(/--muted-foreground:\s*(#[0-9a-fA-F]{6})/)?.[1]?.toLowerCase()
    if (em) real.muted = em
  }
  for (const t of Object.keys(doc)) {
    if (!(t in real)) fail(`${label}: COLOR_SYSTEM.md documents --color-${t} but the CSS does not declare it`)
    else if (doc[t] !== real[t]) {
      fail(`${label}: COLOR_SYSTEM.md says --color-${t} is ${doc[t]}, the CSS says ${real[t]} — one is a lie`)
    }
  }
  for (const t of SHARED) {
    if (!(t in doc)) fail(`${label}: COLOR_SYSTEM.md is missing --color-${t} from its palette table`)
  }
  if (!('muted' in doc)) fail(`${label}: COLOR_SYSTEM.md is missing --color-muted from its palette table`)
}

// ── 3. hardcoded brand values in components ────────────────────────────────
for (const repo of ['email-landing', 'email-canvas']) {
  const src = join(ROOT, repo, 'src')
  if (!existsSync(src)) continue
  for (const file of walk(src)) {
    if (!/\.(vue|tsx?|jsx?|svelte|css)$/.test(file)) continue
    if (file.endsWith('globals.css') || file.endsWith('style.css')) continue
    const key = relative(ROOT, file)
    if (key in ALLOWLIST) continue
    const text = readFileSync(file, 'utf8')
    for (const v of BRAND_VALUES) {
      const lines = text.split('\n')
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(v)) {
          fail(`${relative(ROOT, file)}:${i + 1} hardcodes the brand value ${v} — use the token instead (or add it to ALLOWLIST with a reason)`)
        }
      }
    }
  }
}

// ── report ─────────────────────────────────────────────────────────────────
console.log('color-system: ' + (problems.length ? `${problems.length} problem(s)` : 'ok'))

if (notes.length) {
  console.log('')
  for (const n of notes) console.log('  note: ' + n)
}

if (problems.length) {
  console.log('')
  for (const p of problems) console.log('  ✗ ' + p)
  console.log('')
  console.log('  COLOR_SYSTEM.md in each repo root is the source of truth for what the')
  console.log('  palette should be. email-canvas/src/app/globals.css is the canonical')
  console.log('  definition; email-landing/src/style.css copies it.')
  console.log('')
  console.log('  To commit anyway: git commit --no-verify')
  process.exit(1)
}

process.exit(0)
