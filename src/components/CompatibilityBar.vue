<script setup lang="ts">
import { computed, h, onMounted, onUnmounted, ref } from 'vue'

// Custom SVGs with authentic vector marks
const FigmaIcon = () =>
  h(
    'svg',
    {
      viewBox: '0 0 38 57',
      class: 'h-5 w-auto shrink-0',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    [
      h('path', { d: 'M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z', fill: 'currentColor' }),
      h('path', { d: 'M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z', fill: 'currentColor' }),
      h('path', { d: 'M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z', fill: 'currentColor' }),
      h('path', { d: 'M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z', fill: 'currentColor' }),
      h('path', { d: 'M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z', fill: 'currentColor' }),
    ]
  )

const ReactIcon = () =>
  h(
    'svg',
    {
      viewBox: '-11.5 -10.232 23 20.463',
      class: 'h-5 w-auto shrink-0',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '1.3',
    },
    [
      h('circle', { cx: '0', cy: '0', r: '2.05', fill: 'currentColor', stroke: 'none' }),
      h('ellipse', { rx: '11', ry: '4.2' }),
      h('ellipse', { rx: '11', ry: '4.2', transform: 'rotate(60)' }),
      h('ellipse', { rx: '11', ry: '4.2', transform: 'rotate(120)' }),
    ]
  )

const HtmlIcon = () =>
  h(
    'svg',
    {
      viewBox: '0 0 24 24',
      class: 'h-5 w-auto shrink-0',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      h('polyline', { points: '8 17 3 12 8 7' }),
      h('polyline', { points: '16 7 21 12 16 17' }),
      h('line', { x1: '13.5', y1: '5', x2: '10.5', y2: '19' }),
    ]
  )

const MjmlIcon = () =>
  h(
    'svg',
    {
      viewBox: '0 0 24 24',
      class: 'h-5 w-auto shrink-0',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '1.8',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      h('polygon', { points: '12 2 2 7 12 12 22 7 12 2', fill: 'currentColor', 'fill-opacity': '0.18' }),
      h('polyline', { points: '2 17 12 22 22 17' }),
      h('polyline', { points: '2 12 12 17 22 12' }),
    ]
  )

const BladeIcon = () =>
  h(
    'svg',
    {
      viewBox: '0 0 24 24',
      class: 'h-5 w-auto shrink-0',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '1.8',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      h('path', { d: 'M4 8l8-4 8 4v8l-8 4-8-4z', fill: 'currentColor', 'fill-opacity': '0.12' }),
      h('path', { d: 'M12 4v16M4 8l16 8M20 8l-16 8' }),
    ]
  )

const GmailIcon = () =>
  h(
    'svg',
    {
      viewBox: '0 0 24 24',
      class: 'h-5 w-auto shrink-0',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '1.8',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      h('rect', { x: '3', y: '5', width: '18', height: '14', rx: '2' }),
      h('path', { d: 'M3 7l9 6 9-6' }),
      h('path', { d: 'M3 19l6-5.5M21 19l-6-5.5' }),
    ]
  )

const OutlookIcon = () =>
  h(
    'svg',
    {
      viewBox: '0 0 24 24',
      class: 'h-5 w-auto shrink-0',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '1.8',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      h('rect', { x: '7', y: '4', width: '14', height: '16', rx: '2' }),
      h('rect', { x: '3', y: '7', width: '10', height: '10', rx: '1.5', fill: 'currentColor', 'fill-opacity': '0.15' }),
      h('circle', { cx: '8', cy: '12', r: '2.5' }),
    ]
  )

const AppleIcon = () =>
  h(
    'svg',
    {
      viewBox: '0 0 24 24',
      class: 'h-5 w-auto shrink-0',
      fill: 'currentColor',
    },
    [
      h('path', {
        d: 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1 .08 2.02-.49 2.64-1.24z',
      }),
    ]
  )

interface Item {
  id: string
  verb: string
  name: string
  detail: string
  icon: any
}

const items: Item[] = [
  {
    id: 'figma',
    verb: 'Imports from',
    name: 'Figma',
    detail: 'Frames & Auto Layout',
    icon: FigmaIcon,
  },
  {
    id: 'html',
    verb: 'Exports to',
    name: 'HTML',
    detail: 'Inlined, table-safe markup',
    icon: HtmlIcon,
  },
  {
    id: 'mjml',
    verb: 'Exports to',
    name: 'MJML',
    detail: 'Responsive semantic tags',
    icon: MjmlIcon,
  },
  {
    id: 'react',
    verb: 'Exports to',
    name: 'React Email',
    detail: 'Type-safe JSX components',
    icon: ReactIcon,
  },
  {
    id: 'blade',
    verb: 'Exports to',
    name: 'Blade',
    detail: 'Laravel template views',
    icon: BladeIcon,
  },
  {
    id: 'gmail',
    verb: 'Checked against',
    name: 'Gmail',
    detail: '102KB clip-safe inlining',
    icon: GmailIcon,
  },
  {
    id: 'outlook',
    verb: 'Checked against',
    name: 'Outlook',
    detail: 'Word-engine & 120 DPI proof',
    icon: OutlookIcon,
  },
  {
    id: 'apple',
    verb: 'Checked against',
    name: 'Apple Mail',
    detail: 'WebKit & Dark Mode ready',
    icon: AppleIcon,
  },
]

const activeIndex = ref(0)
const isHovered = ref(false)
const activeItem = computed(() => items[activeIndex.value])

let cycleTimer: number | null = null

function setActive(idx: number) {
  activeIndex.value = idx
}

function startCycle() {
  if (cycleTimer) clearInterval(cycleTimer)
  cycleTimer = window.setInterval(() => {
    if (!isHovered.value) {
      activeIndex.value = (activeIndex.value + 1) % items.length
    }
  }, 2600)
}

onMounted(() => {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (!mql.matches) {
    startCycle()
  }
})

onUnmounted(() => {
  if (cycleTimer) clearInterval(cycleTimer)
})
</script>

<template>
  <section
    class="border-y border-line bg-canvas py-6 transition-colors sm:py-8"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="shell">
      <div class="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <!-- Left Side: Harmonious Typographic Heading -->
        <div class="flex min-h-[52px] flex-col justify-center">
          <Transition name="text-fade" mode="out-in">
            <div :key="activeItem.id" class="space-y-1">
              <p class="text-[13px] font-medium text-muted">
                {{ activeItem.verb }}
              </p>
              <div class="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <h3 class="font-display text-[26px] leading-[1.1] font-medium tracking-[-0.015em] text-ink sm:text-[30px]">
                  {{ activeItem.name }}
                </h3>
                <span class="text-[14px] font-medium text-muted">
                  &mdash; {{ activeItem.detail }}
                </span>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Right Side: Interactive Focus Icon Strip -->
        <div class="flex items-center gap-2 self-stretch justify-between sm:gap-2.5 md:self-auto md:justify-end">
          <button
            v-for="(item, idx) in items"
            :key="item.id"
            type="button"
            @mouseenter="setActive(idx)"
            @focus="setActive(idx)"
            class="group relative flex size-11 items-center justify-center rounded-xl transition-all duration-150 cursor-pointer sm:size-12"
            :class="[
              activeIndex === idx
                ? 'bg-surface text-ink border border-line-strong shadow-xs scale-105'
                : 'text-muted/45 hover:text-ink hover:bg-surface/50 border border-transparent'
            ]"
            :aria-label="`${item.verb} ${item.name}`"
          >
            <component
              :is="item.icon"
              class="size-5 shrink-0 transition-transform duration-150 sm:size-5.5"
              :class="activeIndex === idx ? 'scale-105' : 'group-hover:scale-105'"
            />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-fade-enter-active,
.text-fade-leave-active {
  transition:
    opacity 0.16s ease-out,
    transform 0.16s ease-out;
}

.text-fade-enter-from {
  opacity: 0;
  transform: translateY(3px);
}

.text-fade-leave-to {
  opacity: 0;
  transform: translateY(-3px);
}

@media (prefers-reduced-motion: reduce) {
  .text-fade-enter-active,
  .text-fade-leave-active {
    transition: opacity 0.12s ease !important;
    transform: none !important;
  }
}
</style>
