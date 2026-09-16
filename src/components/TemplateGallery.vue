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
  meta: [string, string]
}

const templates: Template[] = [
  {
    name: 'SaaS Welcome',
    description: 'Onboard new users with a hero, headline, button, and features.',
    category: 'SaaS',
    layout: 'hero',
    meta: ['Hero + features', 'Dark mode ready'],
  },
  {
    name: 'Product showcase',
    description: 'A modern retail email: lifestyle hero, a two-by-two product grid, and a promo code.',
    category: 'E-commerce',
    layout: 'grid',
    meta: ['2×2 product grid', 'Promo code'],
  },
  {
    name: 'Monthly digest',
    description: 'A company roundup: intro note, lead story with image, linked stories, stats highlight.',
    category: 'Newsletter',
    layout: 'list',
    meta: ['Lead story', 'Stats highlight'],
  },
  {
    name: 'Abandoned Cart',
    description: 'Remind shoppers about the items they left behind, with a product grid and CTA.',
    category: 'E-commerce',
    layout: 'grid',
    meta: ['Product grid', 'Responsive'],
  },
  {
    name: 'Promo',
    description: 'Bold promotional email with a full-width hero, big headline, and single CTA.',
    category: 'E-commerce',
    layout: 'hero',
    meta: ['Big hero', 'Single CTA'],
  },
  {
    name: 'Receipt',
    description: 'Order confirmation with line items, totals, and a footer summary.',
    category: 'E-commerce',
    layout: 'list',
    meta: ['Line items', 'Transactional'],
  },
  {
    name: 'Product update',
    description: 'A polished SaaS release: dark hero, screenshot, feature cards, stats, social footer.',
    category: 'SaaS',
    layout: 'hero',
    meta: ['Dark hero', 'Feature cards'],
  },
  {
    name: 'Welcome email',
    description: 'A warm onboarding welcome with a single clear call to action.',
    category: 'SaaS',
    layout: 'hero',
    meta: ['Single CTA', 'Dark mode ready'],
  },
  {
    name: 'Product launch',
    description: 'Announce a new product or feature with an image, benefits, and a strong CTA.',
    category: 'SaaS',
    layout: 'article',
    meta: ['Benefits + CTA', 'Dark mode ready'],
  },
  {
    name: 'Newsletter',
    description: 'A clean weekly newsletter with a featured story, two article teasers, and a footer.',
    category: 'Newsletter',
    layout: 'list',
    meta: ['3 stories', 'Responsive'],
  },
  {
    name: 'Article post',
    description: 'A Substack-style article email: title, author line, reaction row, and long-form body.',
    category: 'Newsletter',
    layout: 'article',
    meta: ['Long-form', 'Reaction row'],
  },
  {
    name: 'Arabic newsletter',
    description: 'A weekly newsletter in Arabic: featured story, two teasers, and a footer.',
    category: 'Newsletter',
    layout: 'list',
    meta: ['RTL layout', '3 stories'],
  },
  {
    name: 'Urdu article digest',
    description: 'A Medium-style digest in Urdu: three recommended reads with thumbnails and read times.',
    category: 'Newsletter',
    layout: 'list',
    meta: ['RTL layout', 'Thumbnails'],
  },
  {
    name: 'Event invitation',
    description: 'An elegant event or webinar invite: date badge, agenda, speakers, and an RSVP button.',
    category: 'Campaigns',
    layout: 'article',
    meta: ['Agenda + RSVP', 'Date badge'],
  },
  {
    name: 'Brand story',
    description: 'An editorial, minimalist campaign email: full-bleed hero, generous type, one CTA.',
    category: 'Campaigns',
    layout: 'hero',
    meta: ['Full-bleed hero', 'Single CTA'],
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
</script>

<template>
  <section class="border-t border-line py-20 sm:py-24 xl:py-28">
    <div class="shell">
      <div class="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span
            class="rounded-full bg-tint px-3.5 py-1 text-[11px] font-bold tracking-[0.08em] text-brand uppercase"
          >
            Template ecosystem
          </span>
          <h2
            class="mt-4 max-w-[460px] font-display text-[30px] leading-[1.12] font-bold tracking-[-0.025em] sm:text-[40px]"
          >
            Start from {{ templates.length }} tested layouts
          </h2>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors"
            :class="
              activeCategory === category
                ? 'border-brand bg-brand text-white shadow-sm'
                : 'border-line bg-surface text-muted hover:border-line-strong hover:text-ink'
            "
            @click="activeCategory = category"
          >
            {{ category }}
            <span class="ml-1 opacity-60">{{ countFor(category) }}</span>
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
          class="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="relative h-52 overflow-hidden border-b border-line bg-canvas pt-5">
            <span
              class="absolute top-3 right-3 z-10 rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-bold shadow-xs backdrop-blur-sm"
            >
              {{ tpl.category }}
            </span>

            <div
              class="mx-auto h-full w-[74%] rounded-t-lg border border-line bg-surface p-3 shadow-sm transition-transform duration-300 group-hover:-translate-y-1"
            >
              <template v-if="tpl.layout === 'hero'">
                <div class="h-16 rounded bg-gradient-to-br from-[#2b3440] via-[#3d4a59] to-[#1d252e]" />
                <div class="mt-2.5 h-2 w-4/5 rounded bg-subtle" />
                <div class="mt-1.5 h-2 w-3/5 rounded bg-subtle" />
                <div class="mt-3 h-4 w-20 rounded bg-brand/80" />
              </template>

              <template v-else-if="tpl.layout === 'grid'">
                <div class="h-10 rounded bg-gradient-to-br from-[#2b3440] to-[#3d4a59]" />
                <div class="mt-2 grid grid-cols-2 gap-2">
                  <div v-for="n in 4" :key="n" class="rounded border border-line p-1.5">
                    <div class="h-6 rounded bg-subtle" />
                    <div class="mt-1 h-1.5 w-3/4 rounded bg-subtle" />
                  </div>
                </div>
              </template>

              <template v-else-if="tpl.layout === 'article'">
                <div class="h-2.5 w-2/3 rounded bg-ink/70" />
                <div class="mt-2 h-1.5 w-1/3 rounded bg-subtle" />
                <div class="mt-3 space-y-1.5">
                  <div v-for="n in 6" :key="n" class="h-1.5 rounded bg-subtle" :class="n % 3 === 0 ? 'w-2/3' : 'w-full'" />
                </div>
                <div class="mt-3 h-4 w-16 rounded bg-brand/80" />
              </template>

              <template v-else>
                <div class="h-2.5 w-1/2 rounded bg-ink/70" />
                <div class="mt-3 space-y-2.5">
                  <div v-for="n in 3" :key="n" class="flex gap-2">
                    <div class="h-8 w-10 shrink-0 rounded bg-subtle" />
                    <div class="flex-1 space-y-1.5 pt-0.5">
                      <div class="h-1.5 w-full rounded bg-subtle" />
                      <div class="h-1.5 w-2/3 rounded bg-subtle" />
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <div class="flex flex-1 flex-col p-6">
            <h3 class="font-display text-[17px] font-bold tracking-[-0.01em]">{{ tpl.name }}</h3>
            <p class="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">
              {{ tpl.description }}
            </p>
            <div
              class="mt-5 flex items-center justify-between gap-2 border-t border-line pt-4 text-[12px]"
            >
              <span class="truncate text-muted">{{ tpl.meta[0] }}</span>
              <span class="shrink-0 font-bold text-brand">{{ tpl.meta[1] }}</span>
            </div>
          </div>
        </article>
      </TransitionGroup>

      <div class="mt-12 text-center">
        <a :href="site.editorUrl" class="btn btn-ghost btn-md">
          <span>Browse all {{ templates.length }} templates</span>
          <Icon name="arrow-right" class="size-4" />
        </a>
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
