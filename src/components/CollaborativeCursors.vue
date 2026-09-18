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
  'trigger-drop': []
  'trigger-reset': []
}>()

interface Point {
  x: number
  y: number
}

// A single ghost cursor demos the product end to end — it builds the
// template (Image, then Text, then Button, then Columns, each dragged from
// the block library onto its own canvas element) and then runs the pre-send
// QA pass (mobile check, health badge, back to desktop). All positions are
// derived at runtime from data-cursor-target rects (or fractions of the
// container box for spawn/rest points), so nothing here is a hardcoded
// screen coordinate.
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

const TAB_GLIDE_END = 900
const TAB_DWELL_END = 1300
const STEP_GLIDE = 700
const STEP_DWELL = 300
const STEP_DRAG = 700
const STEP_DROP = 200
const STEP_DURATION = STEP_GLIDE + STEP_DWELL + STEP_DRAG + STEP_DROP

const BUILD_START = TAB_DWELL_END
const BUILD_END = BUILD_START + buildSteps.length * STEP_DURATION

const TIMING = {
  toTab: TAB_GLIDE_END,
  clickTab: TAB_DWELL_END,
  buildEnd: BUILD_END,
  toMobile: BUILD_END + 1200,
  clickMobile: BUILD_END + 1200 + 1300,
  toHealth: BUILD_END + 1200 + 1300 + 1300,
  toDesktop: BUILD_END + 1200 + 1300 + 1300 + 1200,
} as const

const cycleDuration = TIMING.toDesktop + 2500

function stepStart(index: number): number {
  return BUILD_START + index * STEP_DURATION
}

const motionEnabled = ref(true)
// The choreography's targets (blocks tab, block library, health badge) only
// exist in the DOM at lg: and above in this layout — below that, running the
// demo would just collapse the cursor to (0,0) for whatever's hidden.
const viewportSupported = ref(true)
const active = computed(() => motionEnabled.value && viewportSupported.value)
const cursorPos = ref<Point>({ x: 0, y: 0 })
const healthBadgePos = ref<Point>({ x: 0, y: 0 })
const showGhostBlock = ref(false)
const healthPulseActive = ref(false)
const ghostLabel = ref(buildSteps[0]!.label)
const ghostIcon = ref(buildSteps[0]!.icon)

const fired = {
  clickTab: false,
  steps: new Set<number>(),
  clickMobile: false,
  clickDesktop: false,
}

function resetFired() {
  fired.clickTab = false
  fired.steps.clear()
  fired.clickMobile = false
  fired.clickDesktop = false
  emit('trigger-reset')
}

function ease(t: number): number {
  const c = Math.min(1, Math.max(0, t))
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2
}

function progress(elapsed: number, start: number, end: number): number {
  return ease((elapsed - start) / (end - start))
}

function lerp(a: Point, b: Point, t: number): Point {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }
}

function targetPoint(key: string): Point {
  const container = props.container
  if (!container) return { x: 0, y: 0 }
  const el = container.querySelector<HTMLElement>(`[data-cursor-target="${key}"]`)
  if (!el) return { x: 0, y: 0 }
  const containerRect = container.getBoundingClientRect()
  const rect = el.getBoundingClientRect()
  return {
    x: rect.left - containerRect.left + rect.width / 2,
    y: rect.top - containerRect.top + rect.height / 2,
  }
}

function relativePoint(xFraction: number, yFraction: number): Point {
  const container = props.container
  if (!container) return { x: 0, y: 0 }
  const rect = container.getBoundingClientRect()
  return { x: rect.width * xFraction, y: rect.height * yFraction }
}

let rafId: number | null = null
let lastFrameTime: number | null = null
let elapsedAccum = 0

function tick(timestamp: number) {
  if (lastFrameTime === null) lastFrameTime = timestamp
  const delta = timestamp - lastFrameTime
  lastFrameTime = timestamp

  // Pause the choreography's clock (not just its visibility) while a real
  // visitor is present, so a ghost action can never fire and silently
  // override something the visitor just clicked themselves.
  if (!props.isUserInteracting) {
    elapsedAccum += delta
  }
  if (elapsedAccum >= cycleDuration) {
    elapsedAccum = 0
    resetFired()
  }
  const elapsed = elapsedAccum

  healthBadgePos.value = targetPoint('health-badge')
  healthPulseActive.value = elapsed >= TIMING.toHealth && elapsed < TIMING.toHealth + 900

  if (elapsed <= TIMING.toTab) {
    // --- glide in and open the block library ---
    showGhostBlock.value = false
    cursorPos.value = lerp(
      relativePoint(0.5, 0.55),
      targetPoint('blocks-tab'),
      progress(elapsed, 0, TIMING.toTab),
    )
  } else if (elapsed <= TIMING.clickTab) {
    showGhostBlock.value = false
    cursorPos.value = targetPoint('blocks-tab')
    if (!fired.clickTab) {
      fired.clickTab = true
      emit('trigger-tab', 'blocks')
    }
  } else if (elapsed <= TIMING.buildEnd) {
    // --- build the template one block at a time ---
    const sinceBuildStart = elapsed - BUILD_START
    const rawIndex = Math.min(buildSteps.length - 1, Math.floor(sinceBuildStart / STEP_DURATION))
    const step = buildSteps[rawIndex]!
    const start = stepStart(rawIndex)
    const glideEnd = start + STEP_GLIDE
    const dwellEnd = glideEnd + STEP_DWELL
    const dragEnd = dwellEnd + STEP_DRAG

    ghostLabel.value = step.label
    ghostIcon.value = step.icon

    if (elapsed <= glideEnd) {
      const prevTarget = rawIndex === 0 ? targetPoint('blocks-tab') : targetPoint(buildSteps[rawIndex - 1]!.libraryKey)
      showGhostBlock.value = false
      cursorPos.value = lerp(prevTarget, targetPoint(step.libraryKey), progress(elapsed, start, glideEnd))
    } else if (elapsed <= dwellEnd) {
      showGhostBlock.value = true
      cursorPos.value = targetPoint(step.libraryKey)
    } else if (elapsed <= dragEnd) {
      showGhostBlock.value = true
      cursorPos.value = lerp(
        targetPoint(step.libraryKey),
        targetPoint(step.canvasKey),
        progress(elapsed, dwellEnd, dragEnd),
      )
    } else {
      showGhostBlock.value = true
      cursorPos.value = targetPoint(step.canvasKey)
      if (!fired.steps.has(rawIndex)) {
        fired.steps.add(rawIndex)
        emit('trigger-select', step.selection)
        emit('trigger-drop')
      }
    }
  } else {
    // --- pre-send QA pass: mobile check, health badge, back to desktop ---
    showGhostBlock.value = false
    if (elapsed <= TIMING.toMobile) {
      cursorPos.value = lerp(
        targetPoint(buildSteps[buildSteps.length - 1]!.canvasKey),
        targetPoint('mobile-toggle'),
        progress(elapsed, TIMING.buildEnd, TIMING.toMobile),
      )
    } else if (elapsed <= TIMING.clickMobile) {
      cursorPos.value = targetPoint('mobile-toggle')
      if (!fired.clickMobile) {
        fired.clickMobile = true
        emit('trigger-view', 'mobile')
      }
    } else if (elapsed <= TIMING.toHealth) {
      cursorPos.value = lerp(
        targetPoint('mobile-toggle'),
        targetPoint('health-badge'),
        progress(elapsed, TIMING.clickMobile, TIMING.toHealth),
      )
    } else if (elapsed <= TIMING.toDesktop) {
      cursorPos.value = lerp(
        targetPoint('health-badge'),
        targetPoint('desktop-toggle'),
        progress(elapsed, TIMING.toHealth, TIMING.toDesktop),
      )
    } else {
      cursorPos.value = targetPoint('desktop-toggle')
      if (!fired.clickDesktop) {
        fired.clickDesktop = true
        emit('trigger-view', 'desktop')
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
    resetFired()
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
    class="pointer-events-none absolute inset-0 z-40 transition-opacity duration-500"
    :style="{ opacity: isUserInteracting ? 0 : 1 }"
    aria-hidden="true"
  >
    <div
      v-if="healthPulseActive"
      class="absolute size-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-mint/30"
      :style="{ left: `${healthBadgePos.x}px`, top: `${healthBadgePos.y}px` }"
    />

    <div
      class="absolute -translate-x-1 -translate-y-1"
      :style="{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }"
    >
      <svg width="34" height="34" viewBox="0 0 24 24" class="fill-ink-deep stroke-line-strong drop-shadow-[0_3px_8px_rgba(15,29,40,0.4)]">
        <path d="M4 3 20 11 12.5 13 10 21 4 3Z" stroke-width="1.25" stroke-linejoin="round" />
      </svg>
      <div
        v-if="showGhostBlock"
        class="mt-1 ml-4 flex items-center gap-1 rounded-md border border-brand/40 bg-surface/95 px-2 py-1 shadow-md"
      >
        <Icon :name="ghostIcon" class="size-3 text-brand" />
        <span class="font-mono text-[8px] font-semibold text-ink">{{ ghostLabel }}</span>
      </div>
    </div>
  </div>
</template>
