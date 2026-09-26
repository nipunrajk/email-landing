<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { RouterLink } from 'vue-router'
import { site } from '@/config'
import { joinWaitlist } from '@/waitlist'
import Icon from '@/components/Icon.vue'

const email = ref('')
const honeypot = ref('')
const status = ref<'idle' | 'sending' | 'done' | 'error'>('idle')

async function handleWaitlistSubmit() {
  if (status.value === 'sending') return
  status.value = 'sending'
  try {
    await joinWaitlist(email.value.trim(), honeypot.value)
    status.value = 'done'
  } catch (err) {
    console.error('Waitlist sign-up failed', err)
    status.value = 'error'
  }
}

const year = new Date().getFullYear()

// Product capabilities, not trial/pricing terms — nothing here needs sourcing.
const facts = ['No account needed', 'Figma frame import', 'HTML · MJML · React Email · Blade', 'Verified for Outlook & Gmail']

// Mirrors SiteHeader's nav, in the same order, so the two ends of the page offer
// the same path through the content.
const footerNav = [
  { label: 'Product', href: '#product' },
  { label: 'Integrations', href: '#exports' },
  { label: 'Showcase', href: '#audiences' },
  { label: 'Templates', href: '#templates' },
]

const cardRef = useTemplateRef<HTMLDivElement>('cardRef')
const spacerRef = useTemplateRef<HTMLDivElement>('spacerRef')
const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')

const FONT_FAMILY = '"Hanken Grotesk"'
const WORDMARK = 'Getdraft'

interface Dot {
  ox: number
  oy: number
  x: number
  y: number
  scatterX: number
  scatterY: number
  r: number
  color: string
  wasMovedByMouse: boolean
  opacity: number
  revealAt: number
  resetAt: number
}

function createDot(ox: number, oy: number, r: number): Dot {
  return {
    ox,
    oy,
    x: ox,
    y: oy,
    scatterX: (Math.random() - 0.5) * 2,
    scatterY: (Math.random() - 0.5) * 2,
    r,
    color: '#ffffff',
    wasMovedByMouse: false,
    opacity: 0,
    revealAt: 0,
    resetAt: 0,
  }
}

interface GlyphParticle {
  id: number
  x: number
  y: number
  char: '●' | '○'
  color: string
  rot: number
  fontSize: number
}

const glyphs = ref<GlyphParticle[]>([])
let glyphIdCounter = 0
let lastGlyphEmitTime = 0
const GLYPH_THROTTLE_MS = 50
const GLYPH_LIFETIME_MS = 350
const glyphTimers = new Map<number, ReturnType<typeof setTimeout>>()

// A ramp, not a bag of hues. Four of the five steps sit within 10° of the brand
// hue in OKLCH (white carries no hue of its own), so the scatter reads as one
// colour coming apart rather than as confetti. Weights keep white in the
// majority and drop the deep brand step to the tail, so colour lands as an
// accent instead of competing with the wordmark.
//
// Coral is the one deliberate exception — 115° from the brand, and it carries
// "flagged" meaning elsewhere on the site — so it earns its place by being
// scarce: one dot in fourteen, as a warm counterpoint against the violet.
const CONFETTI_STEPS: [token: string, fallback: string, weight: number][] = [
  ['--color-surface', '#ffffff', 6],
  ['--color-tint', '#ede9fe', 3],
  ['--color-brand-bright', '#a78bfa', 3],
  ['--color-brand', '#6e44ff', 1],
  ['--color-coral', '#9a4527', 1],
]

let CONFETTI_PALETTE: string[] = ['#ffffff']

function resolveColor(varName: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  return value || fallback
}

function resolveConfettiPalette() {
  // Expanded into a flat bag so the sampling site stays a single array index.
  CONFETTI_PALETTE = CONFETTI_STEPS.flatMap(([token, fallback, weight]) =>
    Array.from({ length: weight }, () => resolveColor(token, fallback)),
  )
}

const REVEAL_DURATION = 900
const RESET_DELAY = 200
const RESET_DURATION = 900

const mouse = { x: -9999, y: -9999, radius: 150 }
let dots: Dot[] = []
let canvasWidth = 0
let canvasHeight = 0
let rafId: number | null = null
let resizeObserver: ResizeObserver | null = null
let entranceObserver: IntersectionObserver | null = null
let visibilityObserver: IntersectionObserver | null = null
let resizePending = false
let mql: MediaQueryList | null = null
let prefersReducedMotion = false
let hasRevealed = false
let entranceActive = false
let entranceStart = 0

function distanceFromOrigin(d: Dot): number {
  return Math.hypot(d.x - d.ox, d.y - d.oy)
}

function updateDot(d: Dot) {
  const dx = d.x - mouse.x
  const dy = d.y - mouse.y
  const dist = Math.hypot(dx, dy)

  if (dist < mouse.radius) {
    const e = 1 - dist / mouse.radius
    const amplitude = e * e * 300
    const lerp = Math.max(0.015, 0.04 * e)
    const targetX = d.ox + d.scatterX * amplitude
    const targetY = d.oy + d.scatterY * amplitude
    d.x += (targetX - d.x) * lerp
    d.y += (targetY - d.y) * lerp
    d.wasMovedByMouse = true

    if (distanceFromOrigin(d) > 5 && d.color === '#ffffff') {
      d.color = CONFETTI_PALETTE[Math.floor(Math.random() * CONFETTI_PALETTE.length)]
    }
  } else {
    d.x += (d.ox - d.x) * 0.03
    d.y += (d.oy - d.y) * 0.03
    if (distanceFromOrigin(d) < 2 && d.wasMovedByMouse) {
      d.color = '#ffffff'
      d.wasMovedByMouse = false
    }
  }
}

function drawDot(ctx: CanvasRenderingContext2D, d: Dot) {
  if (d.opacity <= 0) return
  ctx.globalAlpha = d.opacity
  ctx.fillStyle = d.color
  ctx.beginPath()
  ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalAlpha = 1
}

function clearAllGlyphs() {
  for (const timer of glyphTimers.values()) clearTimeout(timer)
  glyphTimers.clear()
  glyphs.value = []
}

function maybeEmitGlyphs(x: number, y: number) {
  if (prefersReducedMotion) return
  const now = performance.now()
  if (now - lastGlyphEmitTime < GLYPH_THROTTLE_MS) return
  lastGlyphEmitTime = now

  const isMobile = canvasWidth < 480
  const count = 1 + Math.floor(Math.random() * 3)
  const fontSize = isMobile ? 6 : 16
  const glyphPalette = ['#a78bfa', '#6e44ff', 'rgba(255,255,255,0.45)']

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const dist = 30 + Math.random() * 90
    const id = glyphIdCounter++
    glyphs.value.push({
      id,
      x: x + Math.cos(angle) * dist,
      y: y + Math.sin(angle) * dist,
      char: Math.random() < 0.5 ? '●' : '○',
      color: glyphPalette[Math.floor(Math.random() * glyphPalette.length)],
      rot: -10 + Math.random() * 20,
      fontSize,
    })
    const timer = setTimeout(() => {
      glyphs.value = glyphs.value.filter((g) => g.id !== id)
      glyphTimers.delete(id)
    }, GLYPH_LIFETIME_MS)
    glyphTimers.set(id, timer)
  }
}

async function rasterizeText(waitForFont: boolean) {
  if (waitForFont) {
    try {
      await document.fonts.load(`800 100px ${FONT_FAMILY}`)
      await document.fonts.ready
    } catch {
      // progressive enhancement — proceed with whatever font is available
    }
  }

  const card = cardRef.value
  const spacer = spacerRef.value
  const canvas = canvasRef.value
  if (!card || !spacer || !canvas) return

  const cardRect = card.getBoundingClientRect()
  const width = Math.max(1, Math.round(cardRect.width))
  const height = Math.max(1, Math.round(cardRect.height))
  const dpr = window.devicePixelRatio || 1

  canvasWidth = width
  canvasHeight = height

  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const spacerRect = spacer.getBoundingClientRect()
  const spacerLocalTop = spacerRect.top - cardRect.top
  const spacerLocalHeight = Math.max(1, Math.round(spacerRect.height))

  const offscreen = document.createElement('canvas')
  offscreen.width = width
  offscreen.height = height
  const offCtx = offscreen.getContext('2d', { willReadFrequently: true })
  if (!offCtx) return

  // Narrower than the card so the wordmark reads as a mark rather than a
  // headline, and the tighter dot pitch below has enough resolution to keep the
  // letterforms legible (at 11px pitch "G" and "e" were ambiguous).
  const targetWidth = width * 0.72
  const maxFontSize = spacerLocalHeight * 0.7

  let lo = 10
  let hi = spacerLocalHeight * 1.4
  for (let i = 0; i < 12; i++) {
    const mid = (lo + hi) / 2
    offCtx.font = `800 ${mid}px ${FONT_FAMILY}`
    const measured = offCtx.measureText(WORDMARK).width
    if (measured > targetWidth) hi = mid
    else lo = mid
  }
  const fontSize = Math.min(lo, maxFontSize)

  offCtx.clearRect(0, 0, width, height)
  offCtx.fillStyle = '#ffffff'
  offCtx.textAlign = 'center'
  offCtx.textBaseline = 'middle'
  offCtx.font = `800 ${fontSize}px ${FONT_FAMILY}`
  offCtx.fillText(WORDMARK, width / 2, spacerLocalTop + spacerLocalHeight / 2)

  const isMobile = width < 480
  const gap = isMobile ? 3 : 8
  const dotRadius = isMobile ? 1.2 : 3.2
  mouse.radius = isMobile ? 70 : 150

  const imageData = offCtx.getImageData(0, 0, width, height).data

  const newDots: Dot[] = []
  for (let gy = 0; gy < height; gy += gap) {
    for (let gx = 0; gx < width; gx += gap) {
      const px = Math.floor(gx)
      const py = Math.floor(gy)
      const idx = (py * width + px) * 4
      const r = imageData[idx]
      const g = imageData[idx + 1]
      const b = imageData[idx + 2]
      const alpha = imageData[idx + 3]
      if (alpha > 128 && r > 200 && g > 200 && b > 200) {
        const dot = createDot(gx, gy, dotRadius)
        if (hasRevealed || prefersReducedMotion) dot.opacity = 1
        newDots.push(dot)
      }
    }
  }
  dots = newDots

  // Reassigning canvas.width above wipes every drawn pixel, so the static frame
  // has to be repainted here. With motion enabled the rAF loop covers this on the
  // next frame; under prefers-reduced-motion there is no loop, so without this
  // the wordmark survives only until the first resize.
  if (prefersReducedMotion) drawStaticFrame()
}

function scheduleEntranceReveal() {
  const n = dots.length || 1

  const revealOrder = [...dots].sort(() => Math.random() - 0.5)
  revealOrder.forEach((d, i) => {
    d.revealAt = (i / n) * REVEAL_DURATION
  })

  const resetOrder = [...dots].sort(() => Math.random() - 0.5)
  resetOrder.forEach((d, i) => {
    d.resetAt = REVEAL_DURATION + RESET_DELAY + (i / n) * RESET_DURATION
  })

  entranceStart = performance.now()
  entranceActive = true
}

function stepEntrance() {
  if (!entranceActive) return
  const elapsed = performance.now() - entranceStart
  let stillActive = false

  for (const d of dots) {
    if (d.opacity === 0 && elapsed >= d.revealAt) {
      d.opacity = 1
      d.color = CONFETTI_PALETTE[Math.floor(Math.random() * CONFETTI_PALETTE.length)]
    }
    if (d.color !== '#ffffff' && !d.wasMovedByMouse && elapsed >= d.resetAt) {
      d.color = '#ffffff'
    }
    if (elapsed < d.resetAt) stillActive = true
  }

  entranceActive = stillActive
}

function animate() {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx) return
  stepEntrance()
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  for (const d of dots) {
    updateDot(d)
    drawDot(ctx, d)
  }
  rafId = requestAnimationFrame(animate)
}

function drawStaticFrame() {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx) return
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  for (const d of dots) {
    drawDot(ctx, d)
  }
}

function scheduleResize() {
  if (resizePending) return
  resizePending = true
  requestAnimationFrame(() => {
    resizePending = false
    void rasterizeText(false)
  })
}

function handlePointerMove(e: PointerEvent) {
  const card = cardRef.value
  if (!card) return
  const rect = card.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
  maybeEmitGlyphs(mouse.x, mouse.y)
}

function handlePointerLeave() {
  mouse.x = -9999
  mouse.y = -9999
}

function handleMotionPrefChange(e: MediaQueryListEvent) {
  prefersReducedMotion = e.matches
  if (prefersReducedMotion) {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    for (const d of dots) d.opacity = 1
    drawStaticFrame()
    clearAllGlyphs()
  } else if (rafId === null) {
    rafId = requestAnimationFrame(animate)
  }
}

onMounted(async () => {
  resolveConfettiPalette()

  mql = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion = mql.matches
  mql.addEventListener('change', handleMotionPrefChange)

  const card = cardRef.value
  const spacer = spacerRef.value
  if (!card || !spacer) return

  await rasterizeText(true)

  resizeObserver = new ResizeObserver(scheduleResize)
  resizeObserver.observe(card)

  card.addEventListener('pointermove', handlePointerMove)
  card.addEventListener('pointerleave', handlePointerLeave)

  if (prefersReducedMotion) {
    hasRevealed = true
    for (const d of dots) d.opacity = 1
    drawStaticFrame()
  } else {
    entranceObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          hasRevealed = true
          scheduleEntranceReveal()
          entranceObserver?.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    entranceObserver.observe(spacer)

    // The footer is the last element on the page, so once it scrolls away the
    // loop has nothing left to animate. Idle at 0 rather than repainting ~4k
    // canvas dots every frame for the rest of the session.
    visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && rafId === null) {
          rafId = requestAnimationFrame(animate)
        } else if (!entry.isIntersecting && rafId !== null) {
          cancelAnimationFrame(rafId)
          rafId = null
        }
      },
      { threshold: 0 },
    )
    visibilityObserver.observe(card)
    rafId = requestAnimationFrame(animate)
  }
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
  resizeObserver?.disconnect()
  entranceObserver?.disconnect()
  visibilityObserver?.disconnect()
  const card = cardRef.value
  card?.removeEventListener('pointermove', handlePointerMove)
  card?.removeEventListener('pointerleave', handlePointerLeave)
  mql?.removeEventListener('change', handleMotionPrefChange)
  clearAllGlyphs()
})
</script>

<template>
  <footer class="py-12 sm:py-16">
    <div class="shell">
      <div
        ref="cardRef"
        class="relative overflow-hidden rounded-3xl bg-ink-deep text-white shadow-2xl"
      >
        <div
          class="pointer-events-none absolute -top-40 left-1/2 z-0 size-[560px] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl"
          aria-hidden="true"
        />

        <canvas ref="canvasRef" class="pointer-events-none absolute inset-0 z-0 h-full w-full" aria-hidden="true" />

        <div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <span
            v-for="g in glyphs"
            :key="g.id"
            class="glyph-particle"
            :style="{
              left: `${g.x}px`,
              top: `${g.y}px`,
              color: g.color,
              fontSize: `${g.fontSize}px`,
              '--rot': `${g.rot}deg`,
            }"
            >{{ g.char }}</span
          >
        </div>

        <div class="relative z-10 mx-auto max-w-3xl px-6 pt-14 text-center sm:px-12 sm:pt-20">
          <div
            class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[12px] font-medium text-white/80 backdrop-blur-md"
          >
            <span class="size-1.5 rounded-full bg-white/70" aria-hidden="true" />
            <span>Runs in your browser — no install, no account</span>
          </div>

          <h2
            class="mt-6 font-display text-[40px] leading-[1.04] font-medium tracking-[-0.015em] text-balance text-white sm:text-[56px] lg:text-[66px]"
          >
            Take a Figma frame all the way to the inbox.
          </h2>

          <p class="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-pretty text-white/70 sm:text-[18px]">
            Import the frame, keep every block editable, export the format your stack already uses
            — then check it before you send.
          </p>

          <div class="mx-auto mt-9 max-w-xl">
            <p class="text-[15px] leading-relaxed text-white/80">
              Some features are limited until the full release. Leave your email and we’ll tell you
              when it opens.
            </p>

            <p
              v-if="status === 'done'"
              class="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[14px] font-medium text-white"
              role="status"
            >
              <Icon name="check-circle" class="size-4 text-brand-bright" />
              You’re on the list. We’ll email you when the full version opens.
            </p>

            <form
              v-else
              class="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row"
              @submit.prevent="handleWaitlistSubmit"
            >
              <label class="sr-only" for="waitlist-email">Email address</label>
              <input
                id="waitlist-email"
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="you@company.com"
                required
                :disabled="status === 'sending'"
                class="h-12 w-full rounded-xl border border-white/25 bg-white/[0.05] px-4 text-[14px] text-white placeholder-white/60 shadow-inner backdrop-blur-sm transition-colors focus:border-brand-bright focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-bright/30 disabled:opacity-60 sm:w-[300px]"
              />
              <!-- Honeypot: hidden from people and screen readers, bots fill it. -->
              <input
                v-model="honeypot"
                type="text"
                name="website"
                tabindex="-1"
                autocomplete="off"
                aria-hidden="true"
                class="absolute -left-[9999px] size-0 opacity-0"
              />
              <button
                type="submit"
                :disabled="status === 'sending'"
                class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 text-[14px] font-semibold text-white transition-colors hover:bg-brand-bright active:scale-[0.98] disabled:opacity-60 sm:w-auto"
              >
                <span>{{ status === 'sending' ? 'Sending…' : 'Notify me' }}</span>
              </button>
            </form>
            <p v-if="status === 'error'" class="mt-3 text-[13px] text-coral-soft" role="alert">
              Couldn’t save that. Please try again in a moment.
            </p>
          </div>

          <div class="mt-9 flex flex-col items-center gap-3">
            <span class="text-[12px] text-white/45">Or start with the editor</span>
            <a :href="site.editorUrl" class="btn btn-outline-invert btn-md !rounded-xl">
              <Icon name="bolt" class="size-4" />
              <span>Open the editor</span>
            </a>
          </div>

          <div
            class="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-x-8 gap-y-2.5 text-[12px] text-white/60 sm:grid-cols-2"
          >
            <span
              v-for="fact in facts"
              :key="fact"
              class="inline-flex items-center gap-1.5 sm:justify-center"
            >
              <Icon name="check" class="size-3.5 shrink-0 text-brand-bright" />
              <span>{{ fact }}</span>
            </span>
          </div>
        </div>

        <div ref="spacerRef" class="mt-8 h-[220px] w-full sm:h-[300px] lg:h-[380px]" aria-hidden="true" />

        <div
          class="relative z-10 flex flex-col-reverse items-center gap-4 border-t border-white/15 px-6 py-6 text-[13px] text-white/60 sm:flex-row sm:justify-between sm:px-12"
        >
          <span>© {{ year }} {{ site.name }}</span>

          <nav aria-label="Footer" class="flex flex-wrap items-center justify-center gap-x-6">
            <a
              v-for="item in footerNav"
              :key="item.href"
              :href="item.href"
              class="inline-flex min-h-11 items-center rounded transition-colors duration-150 hover:text-white"
            >
              {{ item.label }}
            </a>
            <RouterLink
              to="/privacy"
              class="inline-flex min-h-11 items-center rounded transition-colors duration-150 hover:text-white"
            >
              Privacy
            </RouterLink>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.glyph-particle {
  position: absolute;
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: flicker 350ms steps(1, end) forwards;
}

@keyframes flicker {
  0% {
    opacity: 0.75;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.9;
    transform: translate(-50%, -50%) scale(1.05);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
}
</style>
