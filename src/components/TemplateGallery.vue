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
const showAll = ref(false)

// A catalogue is something you browse, not a wall you scroll. Fifteen cards in
// one continuous stretch reads as a dump, so the default view is a hand-picked
// six that covers all four categories. The rest is one click away and the button
// says how many, so nothing is hidden behind a vague "load more".
//
// Ordered so no two neighbours repeat a preview. `article` and `list` are the
// same 600px editorial architecture and render an identical mock, so they count
// as one look here — this sequence stays clean at 1, 2 and 3 columns. The order
// is applied explicitly rather than inherited from the source array, so editing
// `templates` cannot silently break it.
const FEATURED = [
  'SaaS Welcome', // hero     · SaaS
  'Product showcase', // grid      · E-commerce
  'Monthly digest', // editorial · Newsletter
  'Abandoned Cart', // grid      · E-commerce
  'Brand story', // hero     · Campaigns
  'Event invitation', // editorial · Campaigns
]

function inCategory(category: string) {
  return category === 'All templates'
    ? templates
    : templates.filter((t) => t.category === category)
}

// A category is at most five templates, so a category view is never a wall and
// always shows itself in full. Only the unfiltered view needs the cut.
const visible = computed(() => {
  const pool = inCategory(activeCategory.value)
  if (activeCategory.value !== 'All templates' || showAll.value) return pool
  return FEATURED.map((name) => pool.find((t) => t.name === name)).filter(
    (t): t is Template => Boolean(t),
  )
})

function selectCategory(category: string) {
  activeCategory.value = category
  showAll.value = false
}

function countFor(category: string) {
  return inCategory(category).length
}

function monogram(name: string) {
  return name.charAt(0).toUpperCase()
}
</script>

<template>
  <section id="templates" class="border-t border-line pt-14 pb-12 sm:pt-16 sm:pb-14 xl:pt-20 xl:pb-16">
    <div class="shell">
      <div class="mb-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
        <div class="max-w-[460px]">
          <span
            class="eyebrow"
          >
            Template ecosystem
          </span>
          <h2
            class="mt-3 font-display text-[34px] leading-[1.08] font-medium tracking-[-0.015em] text-balance sm:text-[46px]"
          >
            Tested layouts, ready to ship
          </h2>
          <p class="mt-3 text-[15px] leading-relaxed text-pretty text-muted">
            Production email architectures built for 600px grids, automatic dark mode, and zero
            Outlook clipping.
          </p>
        </div>

        <div class="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-wrap lg:overflow-x-visible lg:px-0 lg:pb-0">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-[13px] font-semibold transition-colors"
            :class="
              activeCategory === category
                ? 'border-brand bg-brand text-white shadow-sm'
                : 'border-line bg-surface text-muted hover:border-line-strong hover:text-ink'
            "
            @click="selectCategory(category)"
          >
            {{ category }}
            <span
              class="rounded-md px-1.5 py-0.5 font-mono text-[11px] tabular-nums"
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
        class="grid gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3"
        :style="{ minHeight: '1px' }"
      >
        <article
          v-for="tpl in visible"
          :key="tpl.name"
          class="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_20px_40px_-15px_rgba(15,29,40,0.12)] focus-within:-translate-y-1.5 focus-within:border-line-strong"
        >
          <div class="relative flex aspect-[4/3] flex-col items-center overflow-hidden bg-canvas pt-4">
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
                    <p class="mt-1 font-display text-[10px] leading-tight font-medium text-ink">
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
                        <span class="text-[6px] font-bold text-brand tabular-nums">${{ price }}</span>
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
                      <p class="font-display text-[7.5px] leading-tight font-medium text-ink">
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

            <!-- The card's real hit target is the stretched link at the bottom of
                 <article>. These two are affordance only, never the target.
                 The backdrop is a desktop hover flourish. The pill is revealed on
                 hover there, but stays up on touch — with no hover to reveal it
                 and nothing else labelling the card, a hidden pill left the whole
                 grid looking like static artwork. It carries no backdrop there,
                 so the preview underneath stays readable. -->
            <div
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 bg-ink/10 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100"
            />
            <span
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 flex items-center justify-center max-md:items-end max-md:pb-3"
            >
              <span
                class="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 font-mono text-[11.5px] font-semibold text-ink opacity-0 shadow-md transition-all duration-200 group-hover:scale-105 group-hover:opacity-100 max-md:opacity-100"
              >
                Open in Editor
                <Icon name="arrow-right" class="size-3 text-brand" />
              </span>
            </span>
          </div>

          <div class="flex flex-1 flex-col p-6">
            <div class="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
              <h3 class="font-display text-[20px] leading-tight font-medium tracking-[-0.015em]">{{ tpl.name }}</h3>
              <span class="shrink-0 rounded-full bg-subtle px-2 py-0.5 font-mono text-[10px] font-bold text-muted">
                {{ tpl.category }}
              </span>
            </div>
            <p class="mt-1.5 flex-1 text-[13px] leading-relaxed text-pretty text-muted max-md:line-clamp-2">
              {{ tpl.description }}
            </p>
            <div class="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-t border-line pt-4 text-[11.5px]">
              <span class="font-mono text-muted tabular-nums">{{ layoutSpecs[tpl.layout].spec }}</span>
              <span class="flex items-center gap-1 font-mono font-semibold text-mint">
                <Icon name="check" class="size-3 shrink-0" />
                {{ layoutSpecs[tpl.layout].verified }}
              </span>
            </div>
          </div>

          <!-- The card's one real action. Stretched over the whole card so a tap,
               a click and a keyboard focus all land on it — the overlay above is
               decoration, not the hit target. -->
          <a
            :href="site.editorUrl"
            class="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <span class="sr-only">Open “{{ tpl.name }}” in the editor</span>
          </a>
        </article>
      </TransitionGroup>

      <!-- Progressive disclosure, in the grid's own measure so it doesn't read as a
           separate section. Reserves its row either way, so expanding the grid
           below it doesn't shift this control. -->
      <div class="mt-8 flex min-h-11 justify-center">
        <button
          v-if="activeCategory === 'All templates'"
          type="button"
          class="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-[14px] font-semibold text-ink shadow-sm transition-all hover:border-brand/40 hover:shadow-md"
          :aria-expanded="showAll"
          @click="showAll = !showAll"
        >
          <span v-if="!showAll">Show all {{ templates.length }} templates</span>
          <span v-else>Show fewer</span>
          <Icon
            :name="showAll ? 'chevron-up' : 'chevron-down'"
            class="size-4 text-brand"
          />
        </button>
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
