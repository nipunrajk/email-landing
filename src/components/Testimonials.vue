<script setup lang="ts">
import Icon from '@/components/Icon.vue'

// PLACEHOLDER CONTENT — replace every entry below with real quotes before launch.
// Names, roles and metrics must come from actual customers who agreed to be quoted;
// nothing here should go live as-is.
const testimonials = [
  {
    metric: 'Hours saved per week',
    metricIcon: 'trending-up',
    tone: 'mint',
    quote:
      'Replace with a designer’s quote — what the Figma-to-email handoff used to cost them, and what it looks like now that frames come in as editable blocks.',
    name: 'Customer name',
    role: 'Role · Company',
    rating: 5,
  },
  {
    metric: 'Click-to-open rate',
    metricIcon: 'sparkle',
    tone: 'brand',
    quote:
      'Replace with a marketer’s quote — how running the pre-send checks changed what they ship, and what that did for their campaign cadence.',
    name: 'Customer name',
    role: 'Role · Company',
    rating: 5,
  },
  {
    metric: 'Outlook render bugs',
    metricIcon: 'check-circle',
    tone: 'mint',
    quote:
      'Replace with an engineer’s quote — how the exported markup compares to the nested-table templates they were maintaining before.',
    name: 'Customer name',
    role: 'Role · Company',
    rating: 5,
  },
]

const toneClass: Record<string, string> = {
  mint: 'bg-mint-soft text-mint',
  brand: 'bg-tint text-brand',
}
</script>

<template>
  <section class="border-t border-line py-20 sm:py-24 xl:py-28">
    <div class="shell">
      <div class="mx-auto mb-14 max-w-[620px] text-center sm:mb-16">
        <span
          class="rounded-full bg-mint-soft px-3.5 py-1 text-[11px] font-bold tracking-[0.08em] text-mint uppercase"
        >
          Customer stories
        </span>
        <h2
          class="mt-4 font-display text-[30px] leading-[1.12] font-bold tracking-[-0.025em] sm:text-[40px]"
        >
          What teams say about Getdraft
        </h2>
        <p class="mt-4 text-[16px] leading-relaxed text-muted sm:text-[17px]">
          Placeholder copy — drop in three real quotes and this section is done.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <article
          v-for="(item, i) in testimonials"
          :key="i"
          class="flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 shadow-sm transition-shadow hover:shadow-md sm:p-8"
        >
          <div>
            <span
              class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold"
              :class="toneClass[item.tone]"
            >
              <Icon :name="item.metricIcon" class="size-3.5" />
              {{ item.metric }}
            </span>

            <div class="mt-6 flex gap-0.5 text-amber-500">
              <Icon v-for="n in item.rating" :key="n" name="star" filled class="size-4" />
            </div>

            <p class="mt-4 text-[15px] leading-relaxed text-ink sm:text-[16px]">
              “{{ item.quote }}”
            </p>
          </div>

          <div class="mt-6 flex items-center gap-3 border-t border-line pt-6">
            <span class="grid size-11 shrink-0 place-items-center rounded-full bg-subtle text-muted">
              <Icon name="users" class="size-5" />
            </span>
            <span class="min-w-0">
              <span class="block truncate text-[14px] font-bold">{{ item.name }}</span>
              <span class="block truncate text-[13px] text-muted">{{ item.role }}</span>
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
