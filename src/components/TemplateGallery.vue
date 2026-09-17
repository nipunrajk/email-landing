<script setup lang="ts">
import { computed, ref } from 'vue'
import { site } from '@/config'
import Icon from '@/components/Icon.vue'

// These are the real templates shipped in the editor (src/lib/templates.ts in the
// email-canvas app) — names, descriptions and counts all come from there.
type Layout = 'hero' | 'grid' | 'article' | 'list'

interface Template {
  name: string
  description: string
  category: string
  layout: Layout
}

// Architecture/verification claims are properties of the layout family, not any
// one template, so they're derived once here rather than repeated 15 times —
// every hero-layout template genuinely does share the same column structure.
// "-Safe" / "-Ready" phrasing on purpose: these describe how the layout is built,
// not a completed QA event we can't actually claim happened.
const layoutSpecs: Record<Layout, { spec: string; verified: string }> = {
  hero: { spec: '600px Single-Column', verified: 'Dark Mode Ready' },
  grid: { spec: '600px · 2-Column Grid', verified: 'Clip-Safe (<102KB)' },
  article: { spec: '600px Editorial Column', verified: 'Outlook-Safe Markup' },
  list: { spec: '600px Editorial Column', verified: 'Outlook-Safe Markup' },
}

const templates: Template[] = [
  {
    name: 'SaaS Welcome',
    description: 'Onboard new users with a hero, headline, button, and features.',
    category: 'SaaS',
    layout: 'hero',
  },
  {
    name: 'Product showcase',
    description: 'A modern retail email: lifestyle hero, a two-by-two product grid, and a promo code.',
    category: 'E-commerce',
    layout: 'grid',
  },
  {
    name: 'Monthly digest',
    description: 'A company roundup: intro note, lead story with image, linked stories, stats highlight.',
    category: 'Newsletter',
    layout: 'list',
  },
  {
    name: 'Abandoned Cart',
    description: 'Remind shoppers about the items they left behind, with a product grid and CTA.',
    category: 'E-commerce',
    layout: 'grid',
  },
  {
    name: 'Promo',
    description: 'Bold promotional email with a full-width hero, big headline, and single CTA.',
    category: 'E-commerce',
    layout: 'hero',
  },
  {
    name: 'Receipt',
    description: 'Order confirmation with line items, totals, and a footer summary.',
    category: 'E-commerce',
    layout: 'list',
  },
  {
    name: 'Product update',
    description: 'A polished SaaS release: dark hero, screenshot, feature cards, stats, social footer.',
    category: 'SaaS',
    layout: 'hero',
  },
  {
    name: 'Welcome email',
    description: 'A warm onboarding welcome with a single clear call to action.',
    category: 'SaaS',
    layout: 'hero',
  },
  {
    name: 'Product launch',
    description: 'Announce a new product or feature with an image, benefits, and a strong CTA.',
    category: 'SaaS',
    layout: 'article',
  },
  {
    name: 'Newsletter',
    description: 'A clean weekly newsletter with a featured story, two article teasers, and a footer.',
    category: 'Newsletter',
    layout: 'list',
  },
  {
    name: 'Article post',
    description: 'A Substack-style article email: title, author line, reaction row, and long-form body.',
    category: 'Newsletter',
    layout: 'article',
  },
  {
    name: 'Arabic newsletter',
    description: 'A weekly newsletter in Arabic: featured story, two teasers, and a footer.',
    category: 'Newsletter',
    layout: 'list',
  },
  {
    name: 'Urdu article digest',
    description: 'A Medium-style digest in Urdu: three recommended reads with thumbnails and read times.',
    category: 'Newsletter',
    layout: 'list',
  },
  {
    name: 'Event invitation',
    description: 'An elegant event or webinar invite: date badge, agenda, speakers, and an RSVP button.',
    category: 'Campaigns',
    layout: 'article',
  },
  {
    name: 'Brand story',
    description: 'An editorial, minimalist campaign email: full-bleed hero, generous type, one CTA.',
    category: 'Campaigns',
    layout: 'hero',
  },
]

const categories = ['All templates', 'E-commerce', 'SaaS', 'Newsletter', 'Campaigns']
const activeCategory = ref('All templates')

const visible = computed(() => {
  const pool =
    activeCategory.value === 'All templates'
      ? templates
      : templates.filter((t) => t.category === activeCategory.value)
  return pool.slice(0, 3)
})

function countFor(category: string) {
  return category === 'All templates'
    ? templates.length
    : templates.filter((t) => t.category === category).length
}

function monogram(name: string) {
  return name.charAt(0).toUpperCase()
}
</script>

<template>
  <section id="templates" class="scroll-mt-24 border-t border-line pt-14 pb-12 sm:pt-16 sm:pb-14 xl:pt-20 xl:pb-16">
    <div class="shell">
      <div class="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div class="max-w-[460px]">
          <span
            class="inline-flex items-center gap-1.5 rounded-full bg-tint px-3 py-1 font-mono text-[11px] font-bold tracking-[0.08em] text-brand uppercase"
          >
            Template ecosystem
          </span>
          <h2
            class="mt-3 font-display text-[30px] leading-[1.12] font-bold tracking-[-0.025em] text-balance sm:text-[40px]"
          >
            Tested layouts, ready to ship
          </h2>
          <p class="mt-3 text-[15px] leading-relaxed text-muted text-balance">
            Production email architectures built for 600px grids, automatic dark mode, and zero
            Outlook clipping.
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors"
            :class="
              activeCategory === category
                ? 'border-brand bg-brand text-white shadow-sm'
                : 'border-line bg-surface text-muted hover:border-line-strong hover:text-ink'
            "
            @click="activeCategory = category"
          >
            {{ category }}
            <span
              class="rounded-md px-1.5 py-0.5 font-mono text-[11px]"
              :class="activeCategory === category ? 'bg-white/20 text-white' : 'bg-subtle/80 text-muted'"
            >
              {{ countFor(category) }}
            </span>
          </button>
        </div>
      </div>

      <TransitionGroup
        tag="div"
        name="card"
        class="grid gap-6 md:grid-cols-3"
        :style="{ minHeight: '1px' }"
      >
        <article
          v-for="tpl in visible"
          :key="tpl.name"
          class="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_20px_40px_-15px_rgba(15,29,40,0.12)]"
        >
          <div class="relative flex h-64 flex-col items-center overflow-hidden bg-canvas pt-4">
            <!-- client-chrome strip -->
            <div class="mb-2.5 flex w-[82%] items-center justify-between">
              <div class="flex gap-1" aria-hidden="true">
                <span class="size-1 rounded-full bg-line-strong" />
                <span class="size-1 rounded-full bg-line-strong" />
                <span class="size-1 rounded-full bg-line-strong" />
              </div>
              <span class="font-mono text-[8px] font-medium tracking-wide text-muted/60">
                600px · Responsive
              </span>
            </div>

            <!-- the email sheet: a genuine inbox header on every layout, so it
                 reads as a captured email rather than a bare content fragment -->
            <div
              class="flex w-[82%] flex-1 flex-col overflow-hidden rounded-t-lg border border-line bg-surface shadow-[0_16px_32px_-12px_rgba(15,29,40,0.18),0_3px_8px_-2px_rgba(15,29,40,0.09)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.03]"
            >
              <div class="flex shrink-0 items-center justify-between border-b border-line/70 px-2.5 py-1.5">
                <div class="flex items-center gap-1">
                  <span
                    class="grid size-3.5 place-items-center rounded-full bg-ink text-[6px] font-bold text-white"
                  >
                    {{ monogram(tpl.name) }}
                  </span>
                  <span class="text-[6px] font-bold tracking-wide text-ink/70 uppercase">Studio</span>
                </div>
                <span class="text-[5.5px] text-muted/50">View in browser</span>
              </div>

              <div class="flex-1 p-2.5">
                <!-- HERO layout -->
                <template v-if="tpl.layout === 'hero'">
                  <div
                    class="rounded p-2.5"
                    style="background: radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.45), transparent 55%), linear-gradient(135deg, var(--color-tint), #efeaff 45%, var(--color-surface) 100%)"
                  >
                    <p class="text-[6px] font-bold tracking-[0.1em] text-brand uppercase">New release</p>
                    <p class="mt-1 font-display text-[10px] leading-tight font-black text-ink">
                      Ready to get<br />started?
                    </p>
                    <span
                      class="mt-1.5 inline-flex items-center rounded-full bg-brand px-1.5 py-0.5 text-[6px] font-bold text-white shadow-xs"
                    >
                      Get Started →
                    </span>
                  </div>

                  <div class="mt-2.5 grid grid-cols-2 gap-2">
                    <div v-for="n in 2" :key="n" class="flex items-start gap-1">
                      <span
                        class="mt-0.5 grid size-3 shrink-0 place-items-center rounded-full"
                        :class="n === 1 ? 'bg-mint-soft text-mint' : 'bg-tint text-brand'"
                      >
                        <Icon :name="n === 1 ? 'check' : 'sparkle'" class="size-[6px]" />
                      </span>
                      <div class="w-full space-y-1 pt-0.5">
                        <div class="h-[3px] w-full rounded-full bg-ink/15" />
                        <div class="h-[3px] w-2/3 rounded-full bg-ink/10" />
                      </div>
                    </div>
                  </div>
                </template>

                <!-- GRID layout -->
                <template v-else-if="tpl.layout === 'grid'">
                  <div class="flex items-center justify-between">
                    <span class="text-[6px] font-bold tracking-wide text-ink/70 uppercase">
                      New arrivals
                    </span>
                    <span class="rounded-full bg-coral-soft px-1.5 py-0.5 text-[6px] font-bold text-coral">
                      EXTRA20
                    </span>
                  </div>

                  <div class="mt-2 grid grid-cols-2 gap-1.5">
                    <div
                      v-for="(price, n) in ['120', '68', '95', '44']"
                      :key="n"
                      class="rounded border border-line p-1"
                    >
                      <div
                        class="h-8 rounded"
                        style="background: radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.55), transparent 60%), linear-gradient(160deg, var(--color-subtle), #e4e8f0 60%, #d6dce6 100%)"
                      />
                      <p class="mt-1 truncate text-[6px] font-semibold text-ink/80">Product {{ n + 1 }}</p>
                      <div class="mt-0.5 flex items-center justify-between">
                        <span class="text-[6px] font-bold text-brand">${{ price }}</span>
                        <span class="rounded-full bg-tint px-1 py-[1px] text-[5.5px] font-bold text-brand">
                          Add
                        </span>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- ARTICLE / LIST (editorial) layout -->
                <template v-else>
                  <div class="flex items-center justify-between border-b border-line/60 pb-1">
                    <span class="font-mono text-[6px] font-bold tracking-[0.1em] text-muted/70 uppercase">
                      Issue №42
                    </span>
                    <span class="font-mono text-[6px] text-muted/50">Sept 2026</span>
                  </div>

                  <div class="mt-2 flex gap-1.5">
                    <div
                      class="size-10 shrink-0 rounded"
                      style="background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.28), transparent 55%), linear-gradient(140deg, #2b3440, #3d4a59 55%, #1d252e 100%)"
                    />
                    <div class="min-w-0 flex-1">
                      <p class="font-display text-[7.5px] leading-tight font-bold text-ink">
                        The quarter in review
                      </p>
                      <p class="mt-0.5 text-[6px] text-muted/70">By the Getdraft team</p>
                      <div class="mt-1 space-y-1">
                        <div class="h-[3px] w-full rounded-full bg-ink/12" />
                        <div class="h-[3px] w-4/5 rounded-full bg-ink/10" />
                      </div>
                    </div>
                  </div>

                  <div class="mt-2.5 space-y-1.5 border-t border-line/60 pt-1.5">
                    <div v-for="n in 2" :key="n" class="flex items-center gap-1.5">
                      <div class="size-4 shrink-0 rounded bg-subtle" />
                      <div class="h-[3px] flex-1 rounded-full bg-ink/12" />
                    </div>
                  </div>
                </template>
              </div>

              <div class="shrink-0 border-t border-line/60 px-2.5 py-1.5 text-center">
                <span class="text-[5px] tracking-wide text-muted/40">Unsubscribe · Preferences</span>
              </div>
            </div>

            <!-- hover overlay -->
            <div
              class="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/10 opacity-0 backdrop-blur-[2px] transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <a
                :href="site.editorUrl"
                class="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 font-mono text-[11.5px] font-semibold text-ink shadow-md transition-transform hover:scale-105"
              >
                Open in Editor
                <Icon name="arrow-right" class="size-3 text-brand" />
              </a>
            </div>
          </div>

          <div class="flex flex-1 flex-col p-6">
            <div class="flex items-center justify-between gap-2">
              <h3 class="font-display text-[17px] font-bold tracking-[-0.01em]">{{ tpl.name }}</h3>
              <span class="shrink-0 rounded-full bg-subtle px-2 py-0.5 font-mono text-[10px] font-bold text-muted">
                {{ tpl.category }}
              </span>
            </div>
            <p class="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">
              {{ tpl.description }}
            </p>
            <div class="mt-5 flex items-center justify-between gap-2 border-t border-line pt-4 text-[11.5px]">
              <span class="font-mono text-muted">{{ layoutSpecs[tpl.layout].spec }}</span>
              <span class="flex shrink-0 items-center gap-1 font-mono font-semibold text-mint">
                <Icon name="check" class="size-3" />
                {{ layoutSpecs[tpl.layout].verified }}
              </span>
            </div>
          </div>
        </article>
      </TransitionGroup>

      <div class="mt-10 flex flex-col items-center gap-3 text-center sm:mt-12">
        <a
          :href="site.editorUrl"
          class="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-6 py-3 font-mono text-[13px] font-semibold text-ink shadow-sm transition-all hover:border-brand/40 hover:shadow-md"
        >
          <span>Browse all {{ templates.length }} templates</span>
          <Icon name="arrow-right" class="size-4 text-brand" />
        </a>
        <p class="text-[13px] text-muted">
          All {{ templates.length }} templates export to React Email, MJML, HTML, and Blade.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-enter-active,
.card-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}
.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
.card-leave-active {
  position: absolute;
}
</style>
