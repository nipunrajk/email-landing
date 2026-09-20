<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import Icon from '@/components/Icon.vue'

// ---- Card 1: frame blocks ----
const frameBlocks = [
  { title: 'Column 1', dim: '180 × 160 px' },
  { title: 'Column 2', dim: '180 × 160 px' },
  { title: 'Column 3', dim: '180 × 160 px' },
]
const hoveredBlock = ref<number | null>(null)
const activeBlock = computed(() => hoveredBlock.value ?? 1)

// ---- Card 2: exports ----
const formats = [
  { name: 'HTML', note: 'Inlined, table-safe' },
  { name: 'MJML', note: 'Component source' },
  { name: 'React Email', note: 'Typed JSX' },
  { name: 'Blade', note: 'Laravel views' },
]

// ---- Card 3: auto-fix demo ----
const staticChecks = [{ name: 'Gmail clipping' }, { name: 'Outlook spacing' }]
type CssFixState = 'fix' | 'checking' | 'fixed'
const cssFixState = ref<CssFixState>('fix')
let fixTimer: ReturnType<typeof setTimeout> | null = null

function runAutoFix() {
  if (cssFixState.value === 'checking') return
  const next = cssFixState.value === 'fix' ? 'fixed' : 'fix'
  cssFixState.value = 'checking'
  fixTimer = setTimeout(() => {
    cssFixState.value = next
  }, 300)
}

// ---- Card 4: code window ----
interface CodeFormat {
  id: 'mjml' | 'html' | 'react'
  label: string
  html: string
  plain: string
}

const codeFormats: CodeFormat[] = [
  {
    id: 'mjml',
    label: 'MJML',
    plain: '<mj-section padding="24px">\n  <mj-column>\n    <mj-text font-size="22px">\n      Architectural knitwear\n    </mj-text>\n  </mj-column>\n</mj-section>',
    html: '<span class="text-white/40">&lt;mj-section</span> padding<span class="text-white/40">=</span><span class="text-brand-bright">"24px"</span><span class="text-white/40">&gt;</span>\n  <span class="text-white/40">&lt;mj-column&gt;</span>\n    <span class="text-white/40">&lt;mj-text</span> font-size<span class="text-white/40">=</span><span class="text-brand-bright">"22px"</span><span class="text-white/40">&gt;</span>\n      Architectural knitwear\n    <span class="text-white/40">&lt;/mj-text&gt;</span>\n  <span class="text-white/40">&lt;/mj-column&gt;</span>\n<span class="text-white/40">&lt;/mj-section&gt;</span>',
  },
  {
    id: 'html',
    label: 'HTML',
    plain: '<td style="padding:24px;">\n  <table role="presentation" width="100%">\n    <tr>\n      <td style="font-size:22px;">\n        Architectural knitwear\n      </td>\n    </tr>\n  </table>\n</td>',
    html: '<span class="text-white/40">&lt;td</span> style<span class="text-white/40">=</span><span class="text-brand-bright">"padding:24px;"</span><span class="text-white/40">&gt;</span>\n  <span class="text-white/40">&lt;table</span> role<span class="text-white/40">=</span><span class="text-brand-bright">"presentation"</span> width<span class="text-white/40">=</span><span class="text-brand-bright">"100%"</span><span class="text-white/40">&gt;</span>\n    <span class="text-white/40">&lt;tr&gt;</span>\n      <span class="text-white/40">&lt;td</span> style<span class="text-white/40">=</span><span class="text-brand-bright">"font-size:22px;"</span><span class="text-white/40">&gt;</span>\n        Architectural knitwear\n      <span class="text-white/40">&lt;/td&gt;</span>\n    <span class="text-white/40">&lt;/tr&gt;</span>\n  <span class="text-white/40">&lt;/table&gt;</span>\n<span class="text-white/40">&lt;/td&gt;</span>',
  },
  {
    id: 'react',
    label: 'React Email',
    plain: '<Section style={{ padding: 24 }}>\n  <Text style={{ fontSize: 22 }}>\n    Architectural knitwear\n  </Text>\n</Section>',
    html: '<span class="text-brand-bright">&lt;Section</span> <span class="text-white/40">style=</span>{{ padding: 24 }}<span class="text-brand-bright">&gt;</span>\n  <span class="text-brand-bright">&lt;Text</span> <span class="text-white/40">style=</span>{{ fontSize: 22 }}<span class="text-brand-bright">&gt;</span>\n    Architectural knitwear\n  <span class="text-brand-bright">&lt;/Text&gt;</span>\n<span class="text-brand-bright">&lt;/Section&gt;</span>',
  },
]

const activeFormat = ref<CodeFormat['id']>('mjml')
const activeCode = computed(() => codeFormats.find((f) => f.id === activeFormat.value)!)
const codeLines = computed(() => activeCode.value.plain.split('\n'))

const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null

async function copyCode() {
  try {
    await navigator.clipboard.writeText(activeCode.value.plain)
  } catch {
    return
  }
  copied.value = true
  if (copyTimer) clearTimeout(copyTimer)
  copyTimer = setTimeout(() => {
    copied.value = false
  }, 1600)
}

onUnmounted(() => {
  if (fixTimer) clearTimeout(fixTimer)
  if (copyTimer) clearTimeout(copyTimer)
})
</script>

<template>
  <section id="product" class="scroll-mt-24 pt-14 pb-20 sm:pt-16 sm:pb-24 xl:pt-20 xl:pb-28">
    <div class="shell">
      <div class="mx-auto mb-14 max-w-[740px] text-center sm:mb-20">
        <span
          class="eyebrow"
        >
          How it works
        </span>
        <h2
          class="mx-auto mt-4 max-w-[860px] font-display text-[34px] leading-[1.08] font-medium tracking-[-0.015em] text-balance sm:text-[46px] xl:text-[52px]"
        >
          Engineered for flawless inboxes and production-ready markup
        </h2>
        <p
          class="mx-auto mt-4 max-w-[720px] text-[16px] leading-relaxed text-muted text-balance sm:text-[17px]"
        >
          Say goodbye to broken tables, phantom padding, and Outlook rendering bugs.<br class="hidden sm:inline" />
          Getdraft keeps your Figma frames, clean code, and inboxes in total agreement.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-12">
        <!-- Card 1: Frames become blocks -->
        <article
          class="flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 shadow-sm transition-shadow hover:shadow-md md:col-span-7 sm:p-8"
        >
          <div class="mb-8 max-w-md">
            <span class="mb-5 grid size-12 place-items-center rounded-xl bg-tint text-brand">
              <Icon name="frame" class="size-6" />
            </span>
            <h3 class="mb-3 font-display text-[25px] leading-[1.15] font-medium tracking-[-0.015em] text-balance sm:text-[29px]">
              Frames become blocks, not screenshots
            </h3>
            <p class="text-[15px] leading-relaxed text-muted">
              Import a layout and Getdraft turns it into editable email blocks — columns, type, images
              — instead of a flattened picture you can’t fix later.
            </p>
          </div>

          <div class="rounded-xl border border-line-strong bg-canvas p-4">
            <div
              class="mb-3 flex items-center justify-between border-b border-line pb-3 text-[12px] text-muted"
            >
              <span>Frame 12</span>
              <Transition name="fade" mode="out-in">
                <span :key="activeBlock" class="font-semibold text-brand">
                  Block {{ activeBlock + 1 }} of 6 · Responsive Column
                </span>
              </Transition>
            </div>
            <div class="grid grid-cols-3 gap-3" @mouseleave="hoveredBlock = null">
              <div
                v-for="(block, i) in frameBlocks"
                :key="i"
                class="relative flex h-20 flex-col justify-between rounded-lg border bg-surface p-2 transition-all duration-200 cursor-pointer"
                :class="
                  activeBlock === i
                    ? 'border-2 border-brand opacity-100 shadow-sm'
                    : 'border-line opacity-70 hover:opacity-100 hover:border-line-strong'
                "
                @mouseenter="hoveredBlock = i"
              >
                <span class="h-2 w-6 rounded" :class="activeBlock === i ? 'bg-brand' : 'bg-brand/30'" />
                <span class="h-3 w-full rounded bg-subtle" />
                <span class="h-2 w-8 rounded" :class="activeBlock === i ? 'bg-brand' : 'bg-brand/30'" />

                <Transition name="tag-pop">
                  <span
                    v-if="activeBlock === i"
                    class="pointer-events-none absolute -top-2.5 left-1/2 z-10 -translate-x-1/2 rounded bg-brand px-2 py-0.5 font-mono text-[9px] font-semibold whitespace-nowrap text-white shadow-xs"
                  >
                    {{ block.title }} · {{ block.dim }}
                  </span>
                </Transition>
              </div>
            </div>
          </div>
        </article>

        <!-- Card 2: One canvas, four exports -->
        <article
          id="exports"
          class="flex scroll-mt-24 flex-col justify-between rounded-2xl border border-line bg-surface p-7 shadow-sm transition-shadow hover:shadow-md md:col-span-5 sm:p-8"
        >
          <div>
            <span class="mb-5 grid size-12 place-items-center rounded-xl bg-tint text-brand">
              <Icon name="code" class="size-6" />
            </span>
            <h3 class="mb-3 font-display text-[25px] leading-[1.15] font-medium tracking-[-0.015em] text-balance sm:text-[29px]">
              One canvas, four exports
            </h3>
            <p class="mb-6 text-[15px] leading-relaxed text-muted">
              HTML, MJML, React Email, or Blade. The same design, four outputs that still look like
              themselves in Gmail, Outlook, and the rest.
            </p>
          </div>

          <div class="divide-y divide-line overflow-hidden rounded-xl border border-line bg-canvas">
            <div
              v-for="format in formats"
              :key="format.name"
              class="group relative flex items-center justify-between px-4 py-3 pl-5 transition-colors duration-150 hover:bg-tint/40"
            >
              <span
                class="absolute inset-y-0 left-0 w-[3px] scale-y-0 bg-brand transition-transform duration-150 group-hover:scale-y-100"
              />
              <span class="font-mono text-[13px] font-medium">{{ format.name }}</span>
              <span class="text-[12px] text-muted transition-colors group-hover:text-ink">
                {{ format.note }}
              </span>
            </div>
          </div>
        </article>

        <!-- Card 3: Catch it before the send -->
        <article
          class="flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 shadow-sm transition-shadow hover:shadow-md md:col-span-5 sm:p-8"
        >
          <div>
            <span class="mb-5 grid size-12 place-items-center rounded-xl bg-mint-soft text-mint">
              <Icon name="check-circle" class="size-6" />
            </span>
            <h3 class="mb-3 font-display text-[25px] leading-[1.15] font-medium tracking-[-0.015em] text-balance sm:text-[29px]">
              Catch it before the send
            </h3>
            <p class="mb-6 text-[15px] leading-relaxed text-muted">
              Clipping, shaky clients, and risky CSS surface while you’re still on the canvas — not
              after the campaign is out.
            </p>
          </div>

          <div class="divide-y divide-line overflow-hidden rounded-xl border border-line bg-canvas">
            <div
              v-for="check in staticChecks"
              :key="check.name"
              class="flex items-center justify-between px-4 py-3"
            >
              <span class="text-[13px]">{{ check.name }}</span>
              <span
                class="flex items-center gap-1 rounded bg-mint-soft px-2 py-0.5 font-mono text-[11px] font-semibold text-mint"
              >
                <Icon name="check" class="size-3" />
                Clear
              </span>
            </div>

            <button
              type="button"
              class="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-subtle/60"
              @click="runAutoFix"
            >
              <span class="text-[13px]">Unsupported CSS</span>
              <Transition name="fade" mode="out-in">
                <span
                  v-if="cssFixState === 'checking'"
                  key="checking"
                  class="flex items-center gap-1.5 rounded bg-subtle px-2 py-0.5 font-mono text-[11px] font-semibold text-muted"
                >
                  <span
                    class="size-2.5 animate-spin rounded-full border-[1.5px] border-muted/30 border-t-muted"
                  />
                  Checking…
                </span>
                <span
                  v-else-if="cssFixState === 'fixed'"
                  key="fixed"
                  class="flex items-center gap-1 rounded bg-mint-soft px-2 py-0.5 font-mono text-[11px] font-semibold text-mint"
                >
                  <Icon name="check" class="size-3" />
                  Auto-inlined · Clear
                </span>
                <span
                  v-else
                  key="fix"
                  class="flex items-center gap-1 rounded bg-coral-soft px-2 py-0.5 font-mono text-[11px] font-semibold text-coral"
                >
                  <Icon name="alert" class="size-3" />
                  Fix
                </span>
              </Transition>
            </button>
          </div>
        </article>

        <!-- Card 4: Markup you'd be happy to own -->
        <article
          class="flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 shadow-sm transition-shadow hover:shadow-md md:col-span-7 sm:p-8"
        >
          <div class="mb-6 max-w-md">
            <span class="mb-5 grid size-12 place-items-center rounded-xl bg-tint text-brand">
              <Icon name="layers" class="size-6" />
            </span>
            <h3 class="mb-3 font-display text-[25px] leading-[1.15] font-medium tracking-[-0.015em] text-balance sm:text-[29px]">
              Markup you’d be happy to own
            </h3>
            <p class="text-[15px] leading-relaxed text-muted">
              Readable, structured output you can commit and diff — instead of a nested-table
              artifact nobody on the team wants to touch.
            </p>
          </div>

          <div class="overflow-hidden rounded-xl border border-line-strong bg-ink-deep">
            <div class="flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-2">
              <div class="flex gap-1">
                <button
                  v-for="format in codeFormats"
                  :key="format.id"
                  type="button"
                  class="rounded px-2.5 py-1 font-mono text-[11px] font-semibold transition-colors"
                  :class="
                    activeFormat === format.id ? 'bg-brand text-white' : 'text-white/50 hover:text-white/80'
                  "
                  @click="activeFormat = format.id"
                >
                  {{ format.label }}
                </button>
              </div>
              <button
                type="button"
                class="flex items-center gap-1 rounded px-2 py-1 font-mono text-[11px] font-medium text-white/50 transition-colors hover:text-white/90"
                @click="copyCode"
              >
                <Icon :name="copied ? 'check' : 'code'" class="size-3" />
                {{ copied ? 'Copied' : 'Copy code' }}
              </button>
            </div>

            <div class="flex h-[208px] overflow-x-auto p-4 font-mono text-[11.5px] leading-relaxed">
              <div class="mr-4 flex shrink-0 flex-col text-right text-white/25 select-none">
                <span v-for="(_, i) in codeLines" :key="i">{{ String(i + 1).padStart(2, '0') }}</span>
              </div>
              <div class="flex-1">
                <Transition name="fade" mode="out-in">
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <pre :key="activeFormat" class="text-white/90" v-html="activeCode.html" />
                </Transition>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.tag-pop-enter-active,
.tag-pop-leave-active {
  transition:
    opacity 120ms ease,
    transform 120ms ease;
}
.tag-pop-enter-from,
.tag-pop-leave-to {
  opacity: 0;
  transform: translate(-50%, 2px);
}

@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active,
  .tag-pop-enter-active,
  .tag-pop-leave-active {
    transition: opacity 100ms ease;
  }
  .tag-pop-enter-from,
  .tag-pop-leave-to {
    transform: none;
  }
}
</style>
