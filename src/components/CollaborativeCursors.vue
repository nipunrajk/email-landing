<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Icon from '@/components/Icon.vue'

const props = defineProps<{
  container: HTMLElement | null
  isUserInteracting: boolean
}>()

const emit = defineEmits<{
  'trigger-tab': [tab: 'properties' | 'blocks']
  'trigger-select': [target: string]
  'trigger-view': [view: 'desktop' | 'mobile']
  'trigger-menu': [menu: string | null]
  'trigger-font': [font: string]
  'trigger-color': [color: string]
  'trigger-send-preview': []
  'trigger-start-story': [story: 1 | 2]
  'trigger-reset': []
}>()

interface Point {
  x: number
  y: number
}

// ==========================================
// STORY 1: Block Assembly & Responsive QA
// ==========================================
interface BuildStep {
  libraryKey: string
  canvasKey: string
  selection: string
  label: string
  icon: string
}

const buildSteps: BuildStep[] = [
  { libraryKey: 'block-image', canvasKey: 'canvas-image', selection: 'image', label: 'Image', icon: 'image' },
  { libraryKey: 'block-text', canvasKey: 'canvas-text', selection: 'text', label: 'Text', icon: 'code' },
  { libraryKey: 'block-button', canvasKey: 'canvas-button', selection: 'button', label: 'Button', icon: 'bolt' },
  { libraryKey: 'block-columns', canvasKey: 'canvas-dropzone', selection: 'columns', label: 'Columns', icon: 'layers' },
]

const S1_FADE_IN = 500
const S1_TO_TAB = 1100
const S1_CLICK_TAB = 1400

const S1_STEP_GLIDE = 600
const S1_STEP_DWELL = 250
const S1_STEP_DRAG = 550
const S1_STEP_DROP = 200
const S1_STEP_DURATION = S1_STEP_GLIDE + S1_STEP_DWELL + S1_STEP_DRAG + S1_STEP_DROP // 1600ms

const S1_BUILD_START = S1_CLICK_TAB
const S1_BUILD_END = S1_BUILD_START + buildSteps.length * S1_STEP_DURATION // 1400 + 6400 = 7800ms

const S1_TO_MOBILE = S1_BUILD_END + 900 // 8700ms
const S1_CLICK_MOBILE = S1_TO_MOBILE + 400 // 9100ms
const S1_TO_HEALTH = S1_CLICK_MOBILE + 1000 // 10100ms
const S1_TO_DESKTOP = S1_TO_HEALTH + 1000 // 11100ms
const S1_CLICK_DESKTOP = S1_TO_DESKTOP + 400 // 11500ms
const S1_DWELL = S1_CLICK_DESKTOP + 800 // 12300ms
const S1_FADE_OUT = S1_DWELL + 600 // 12900ms
const S1_TOTAL = S1_FADE_OUT + 500 // 13400ms

// ==========================================
// STORY 2: Live Canvas Selection & Design Tuning
// ==========================================
const S2_FADE_IN = 500
const S2_TO_HEADING = 1000
const S2_CLICK_HEADING = 1300
const S2_TO_FONT_BTN = S2_CLICK_HEADING + 1000 // 2300ms
const S2_CLICK_FONT_BTN = S2_TO_FONT_BTN + 400 // 2700ms
const S2_TO_FONT_OPT = S2_CLICK_FONT_BTN + 700 // 3400ms
const S2_CLICK_FONT_OPT = S2_TO_FONT_OPT + 400 // 3800ms
const S2_TO_BUTTON = S2_CLICK_FONT_OPT + 1100 // 4900ms
const S2_CLICK_BUTTON = S2_TO_BUTTON + 400 // 5300ms
const S2_TO_SWATCH_BTN = S2_CLICK_BUTTON + 1000 // 6300ms
const S2_CLICK_SWATCH_BTN = S2_TO_SWATCH_BTN + 400 // 6700ms
const S2_TO_SWATCH_PICK = S2_CLICK_SWATCH_BTN + 700 // 7400ms
const S2_CLICK_SWATCH_PICK = S2_TO_SWATCH_PICK + 400 // 7800ms
const S2_TO_SEND = S2_CLICK_SWATCH_PICK + 1200 // 9000ms
const S2_CLICK_SEND = S2_TO_SEND + 400 // 9400ms
const S2_DWELL = S2_CLICK_SEND + 1400 // 10800ms
const S2_FADE_OUT = S2_DWELL + 600 // 11400ms
const S2_TOTAL = S2_FADE_OUT + 500 // 11900ms

const currentStory = ref<1 | 2>(1)
const motionEnabled = ref(true)
const viewportSupported = ref(true)
const active = computed(() => motionEnabled.value && viewportSupported.value)

const cursorPos = ref<Point>({ x: 0, y: 0 })
const cursorFadeOpacity = ref(1)
const healthBadgePos = ref<Point>({ x: 0, y: 0 })
const showGhostBlock = ref(false)
const healthPulseActive = ref(false)
const ghostLabel = ref(buildSteps[0]!.label)
const ghostIcon = ref(buildSteps[0]!.icon)

const firedS1 = {
  clickTab: false,
  steps: new Set<number>(),
  clickMobile: false,
  clickDesktop: false,
}

const firedS2 = {
  clickHeading: false,
  clickFontBtn: false,
  clickFontOpt: false,
  clickButton: false,
  clickSwatchBtn: false,
  clickSwatchPick: false,
  clickSend: false,
}

function resetS1() {
  firedS1.clickTab = false
  firedS1.steps.clear()
  firedS1.clickMobile = false
  firedS1.clickDesktop = false
}

function resetS2() {
  firedS2.clickHeading = false
  firedS2.clickFontBtn = false
  firedS2.clickFontOpt = false
  firedS2.clickButton = false
  firedS2.clickSwatchBtn = false
  firedS2.clickSwatchPick = false
  firedS2.clickSend = false
}

function ease(t: number): number {
  const c = Math.min(1, Math.max(0, t))
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2
}

function progress(elapsed: number, start: number, end: number): number {
  if (end <= start) return 1
  return ease((elapsed - start) / (end - start))
}

function lerp(a: Point, b: Point, t: number): Point {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }
}

function relativePoint(xFraction: number, yFraction: number): Point {
  const container = props.container
  if (!container) return { x: 0, y: 0 }
  const rect = container.getBoundingClientRect()
  return { x: rect.width * xFraction, y: rect.height * yFraction }
}

function targetPoint(key: string, fallback?: Point): Point {
  const container = props.container
  const defaultFallback = fallback ?? relativePoint(0.5, 0.5)
  if (!container) return defaultFallback
  const el = container.querySelector<HTMLElement>(`[data-cursor-target="${key}"]`)
  if (!el) return defaultFallback
  const containerRect = container.getBoundingClientRect()
  const rect = el.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) return defaultFallback
  return {
    x: rect.left - containerRect.left + rect.width / 2,
    y: rect.top - containerRect.top + rect.height / 2,
  }
}

let rafId: number | null = null
let lastFrameTime: number | null = null
let elapsedAccum = 0

function tick(timestamp: number) {
  if (lastFrameTime === null) lastFrameTime = timestamp
  const delta = timestamp - lastFrameTime
  lastFrameTime = timestamp

  if (!props.isUserInteracting) {
    elapsedAccum += delta
  }

  // ==========================================
  // RUN STORY 1: Build & Mobile QA
  // ==========================================
  if (currentStory.value === 1) {
    if (elapsedAccum >= S1_TOTAL) {
      elapsedAccum = 0
      resetS2()
      currentStory.value = 2
      emit('trigger-start-story', 2)
      rafId = requestAnimationFrame(tick)
      return
    }

    const elapsed = elapsedAccum
    healthBadgePos.value = targetPoint('health-badge')
    healthPulseActive.value = elapsed >= S1_TO_HEALTH && elapsed < S1_TO_HEALTH + 800

    // Fade in / out opacity curve
    if (elapsed < S1_FADE_IN) {
      cursorFadeOpacity.value = elapsed / S1_FADE_IN
    } else if (elapsed >= S1_DWELL && elapsed < S1_FADE_OUT) {
      cursorFadeOpacity.value = Math.max(0, 1 - (elapsed - S1_DWELL) / (S1_FADE_OUT - S1_DWELL))
    } else if (elapsed >= S1_FADE_OUT) {
      cursorFadeOpacity.value = 0
    } else {
      cursorFadeOpacity.value = 1
    }

    const spawnPoint = relativePoint(0.5, 0.55)
    const blocksTabPoint = targetPoint('blocks-tab', spawnPoint)

    if (elapsed <= S1_TO_TAB) {
      showGhostBlock.value = false
      cursorPos.value = lerp(spawnPoint, blocksTabPoint, progress(elapsed, 0, S1_TO_TAB))
    } else if (elapsed <= S1_CLICK_TAB) {
      showGhostBlock.value = false
      cursorPos.value = blocksTabPoint
      if (!firedS1.clickTab) {
        firedS1.clickTab = true
        emit('trigger-tab', 'blocks')
      }
    } else if (elapsed <= S1_BUILD_END) {
      const sinceBuildStart = elapsed - S1_BUILD_START
      const rawIndex = Math.min(buildSteps.length - 1, Math.floor(sinceBuildStart / S1_STEP_DURATION))
      const step = buildSteps[rawIndex]!
      const stepStart = S1_BUILD_START + rawIndex * S1_STEP_DURATION
      const glideEnd = stepStart + S1_STEP_GLIDE
      const dwellEnd = glideEnd + S1_STEP_DWELL
      const dragEnd = dwellEnd + S1_STEP_DRAG

      ghostLabel.value = step.label
      ghostIcon.value = step.icon

      const prevTarget = rawIndex === 0 ? blocksTabPoint : targetPoint(buildSteps[rawIndex - 1]!.libraryKey, blocksTabPoint)
      const libTarget = targetPoint(step.libraryKey, prevTarget)
      const canvasTarget = targetPoint(step.canvasKey, libTarget)

      if (elapsed <= glideEnd) {
        showGhostBlock.value = false
        cursorPos.value = lerp(prevTarget, libTarget, progress(elapsed, stepStart, glideEnd))
      } else if (elapsed <= dwellEnd) {
        showGhostBlock.value = true
        cursorPos.value = libTarget
      } else if (elapsed <= dragEnd) {
        showGhostBlock.value = true
        cursorPos.value = lerp(libTarget, canvasTarget, progress(elapsed, dwellEnd, dragEnd))
      } else {
        showGhostBlock.value = true
        cursorPos.value = canvasTarget
        if (!firedS1.steps.has(rawIndex)) {
          firedS1.steps.add(rawIndex)
          emit('trigger-select', step.selection)
        }
      }
    } else {
      showGhostBlock.value = false
      const lastCanvasPos = targetPoint(buildSteps[buildSteps.length - 1]!.canvasKey, relativePoint(0.5, 0.5))
      const mobilePos = targetPoint('mobile-toggle', lastCanvasPos)
      const healthPos = targetPoint('health-badge', mobilePos)
      const desktopPos = targetPoint('desktop-toggle', healthPos)

      if (elapsed <= S1_TO_MOBILE) {
        cursorPos.value = lerp(lastCanvasPos, mobilePos, progress(elapsed, S1_BUILD_END, S1_TO_MOBILE))
      } else if (elapsed <= S1_CLICK_MOBILE) {
        cursorPos.value = mobilePos
        if (!firedS1.clickMobile) {
          firedS1.clickMobile = true
          emit('trigger-view', 'mobile')
        }
      } else if (elapsed <= S1_TO_HEALTH) {
        cursorPos.value = lerp(mobilePos, healthPos, progress(elapsed, S1_CLICK_MOBILE, S1_TO_HEALTH))
      } else if (elapsed <= S1_TO_DESKTOP) {
        cursorPos.value = lerp(healthPos, desktopPos, progress(elapsed, S1_TO_HEALTH, S1_TO_DESKTOP))
      } else {
        cursorPos.value = desktopPos
        if (!firedS1.clickDesktop) {
          firedS1.clickDesktop = true
          emit('trigger-view', 'desktop')
        }
      }
    }
  }
  // ==========================================
  // RUN STORY 2: Canvas Block Selection & Design Tuning
  // ==========================================
  else {
    if (elapsedAccum >= S2_TOTAL) {
      elapsedAccum = 0
      resetS1()
      currentStory.value = 1
      emit('trigger-start-story', 1)
      rafId = requestAnimationFrame(tick)
      return
    }

    const elapsed = elapsedAccum
    showGhostBlock.value = false

    // Fade in / out opacity curve
    if (elapsed < S2_FADE_IN) {
      cursorFadeOpacity.value = elapsed / S2_FADE_IN
    } else if (elapsed >= S2_DWELL && elapsed < S2_FADE_OUT) {
      cursorFadeOpacity.value = Math.max(0, 1 - (elapsed - S2_DWELL) / (S2_FADE_OUT - S2_DWELL))
    } else if (elapsed >= S2_FADE_OUT) {
      cursorFadeOpacity.value = 0
    } else {
      cursorFadeOpacity.value = 1
    }

    const startPos = targetPoint('desktop-toggle', relativePoint(0.5, 0.7))
    const headingPos = targetPoint('canvas-heading', relativePoint(0.5, 0.45))
    const fontBtnPos = targetPoint('toolbar-font-btn', relativePoint(0.4, 0.15))
    const fontOptPos = targetPoint('font-option-inter', fontBtnPos)
    const buttonPos = targetPoint('canvas-button', relativePoint(0.5, 0.6))
    const swatchBtnPos = targetPoint('block-swatch-btn', relativePoint(0.85, 0.45))
    const swatchPickPos = targetPoint('swatch-pick-block', swatchBtnPos)
    const sendPos = targetPoint('send-preview', relativePoint(0.8, 0.1))

    if (elapsed <= S2_TO_HEADING) {
      cursorPos.value = lerp(startPos, headingPos, progress(elapsed, 0, S2_TO_HEADING))
    } else if (elapsed <= S2_CLICK_HEADING) {
      cursorPos.value = headingPos
      if (!firedS2.clickHeading) {
        firedS2.clickHeading = true
        emit('trigger-select', 'heading')
      }
    } else if (elapsed <= S2_TO_FONT_BTN) {
      cursorPos.value = lerp(headingPos, fontBtnPos, progress(elapsed, S2_CLICK_HEADING, S2_TO_FONT_BTN))
    } else if (elapsed <= S2_CLICK_FONT_BTN) {
      cursorPos.value = fontBtnPos
      if (!firedS2.clickFontBtn) {
        firedS2.clickFontBtn = true
        emit('trigger-menu', 'font')
      }
    } else if (elapsed <= S2_TO_FONT_OPT) {
      cursorPos.value = lerp(fontBtnPos, fontOptPos, progress(elapsed, S2_CLICK_FONT_BTN, S2_TO_FONT_OPT))
    } else if (elapsed <= S2_CLICK_FONT_OPT) {
      cursorPos.value = fontOptPos
      if (!firedS2.clickFontOpt) {
        firedS2.clickFontOpt = true
        emit('trigger-font', 'Inter')
      }
    } else if (elapsed <= S2_TO_BUTTON) {
      cursorPos.value = lerp(fontOptPos, buttonPos, progress(elapsed, S2_CLICK_FONT_OPT, S2_TO_BUTTON))
    } else if (elapsed <= S2_CLICK_BUTTON) {
      cursorPos.value = buttonPos
      if (!firedS2.clickButton) {
        firedS2.clickButton = true
        emit('trigger-select', 'button')
      }
    } else if (elapsed <= S2_TO_SWATCH_BTN) {
      cursorPos.value = lerp(buttonPos, swatchBtnPos, progress(elapsed, S2_CLICK_BUTTON, S2_TO_SWATCH_BTN))
    } else if (elapsed <= S2_CLICK_SWATCH_BTN) {
      cursorPos.value = swatchBtnPos
      if (!firedS2.clickSwatchBtn) {
        firedS2.clickSwatchBtn = true
        emit('trigger-menu', 'Button-Fill')
      }
    } else if (elapsed <= S2_TO_SWATCH_PICK) {
      cursorPos.value = lerp(swatchBtnPos, swatchPickPos, progress(elapsed, S2_CLICK_SWATCH_BTN, S2_TO_SWATCH_PICK))
    } else if (elapsed <= S2_CLICK_SWATCH_PICK) {
      cursorPos.value = swatchPickPos
      if (!firedS2.clickSwatchPick) {
        firedS2.clickSwatchPick = true
        emit('trigger-color', '#a78bfa')
      }
    } else if (elapsed <= S2_TO_SEND) {
      cursorPos.value = lerp(swatchPickPos, sendPos, progress(elapsed, S2_CLICK_SWATCH_PICK, S2_TO_SEND))
    } else if (elapsed <= S2_CLICK_SEND) {
      cursorPos.value = sendPos
      if (!firedS2.clickSend) {
        firedS2.clickSend = true
        emit('trigger-send-preview')
      }
    } else {
      cursorPos.value = sendPos
      if (elapsed >= S2_DWELL) {
        emit('trigger-select', 'none')
      }
    }
  }

  rafId = requestAnimationFrame(tick)
}

let motionMql: MediaQueryList | null = null
let viewportMql: MediaQueryList | null = null

function syncActive() {
  if (active.value && rafId === null) {
    lastFrameTime = null
    elapsedAccum = 0
    currentStory.value = 1
    resetS1()
    emit('trigger-start-story', 1)
    rafId = requestAnimationFrame(tick)
  } else if (!active.value && rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function handleMotionChange(e: MediaQueryListEvent) {
  motionEnabled.value = !e.matches
  syncActive()
}

function handleViewportChange(e: MediaQueryListEvent) {
  viewportSupported.value = e.matches
  syncActive()
}

onMounted(() => {
  motionMql = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionEnabled.value = !motionMql.matches
  motionMql.addEventListener('change', handleMotionChange)

  viewportMql = window.matchMedia('(min-width: 1024px)')
  viewportSupported.value = viewportMql.matches
  viewportMql.addEventListener('change', handleViewportChange)

  syncActive()
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
  motionMql?.removeEventListener('change', handleMotionChange)
  viewportMql?.removeEventListener('change', handleViewportChange)
})
</script>

<template>
  <div
    v-if="active"
    class="pointer-events-none absolute inset-0 z-40 transition-opacity duration-300"
    :style="{ opacity: isUserInteracting ? 0 : cursorFadeOpacity }"
    aria-hidden="true"
  >
    <!-- Health score ring ping -->
    <div
      v-if="healthPulseActive"
      class="absolute size-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-mint/30"
      :style="{ left: `${healthBadgePos.x}px`, top: `${healthBadgePos.y}px` }"
    />

    <!-- Ghost Cursor -->
    <div
      class="absolute -translate-x-1 -translate-y-1 transition-transform duration-75 ease-out"
      :style="{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }"
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        class="fill-ink-deep stroke-line-strong drop-shadow-[0_4px_12px_rgba(15,29,40,0.45)]"
      >
        <path d="M4 3 20 11 12.5 13 10 21 4 3Z" stroke-width="1.25" stroke-linejoin="round" />
      </svg>
      <div
        v-if="showGhostBlock"
        class="mt-1 ml-4 flex items-center gap-1.5 rounded-md border border-brand/40 bg-surface/95 px-2.5 py-1 shadow-md backdrop-blur-sm"
      >
        <Icon :name="ghostIcon" class="size-3 text-brand" />
        <span class="font-mono text-[9px] font-semibold tracking-wide text-ink">{{ ghostLabel }}</span>
      </div>
    </div>
  </div>
</template>
