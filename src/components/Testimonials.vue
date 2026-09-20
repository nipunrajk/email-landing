<script setup lang="ts">
import Icon from '@/components/Icon.vue'

interface Testimonial {
  metricLabel: string
  metricIcon: string
  toneClass: string
  quote: string
  author: string
  title: string
  company: string
  companyBadge: string
  avatarGradient: string
}

// Real, approved quotes only. Every entry needs written permission from the person
// quoted, and any metric must come from them or from measured usage data. While this
// is empty the section renders nothing. To bring it back: add a quote here, then
// re-add the import and <Testimonials /> in views/HomeView.vue.
const testimonials: Testimonial[] = []

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
</script>

<template>
  <section v-if="testimonials.length" class="border-t border-line pt-10 pb-14 sm:pt-12 sm:pb-16 xl:pt-14 xl:pb-20">
    <div class="shell">
      <div class="mb-12 max-w-[640px] sm:mb-14">
        <span class="eyebrow">Customers</span>
        <h2
          class="mt-3 font-display text-[34px] leading-[1.08] font-medium tracking-[-0.015em] text-balance sm:text-[46px]"
        >
          What teams are saying
        </h2>
      </div>

      <div class="grid gap-6 sm:grid-cols-3 sm:gap-8">
        <article
          v-for="(item, i) in testimonials"
          :key="i"
          class="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-line-strong hover:shadow-md sm:p-8"
        >
          <div>
            <div class="flex items-center justify-between gap-3">
              <span
                class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-bold"
                :class="item.toneClass"
              >
                <Icon :name="item.metricIcon" class="size-3.5" />
                {{ item.metricLabel }}
              </span>
              <span class="shrink-0 font-mono text-[10.5px] font-semibold text-muted uppercase">
                {{ item.companyBadge }}
              </span>
            </div>

            <p class="mt-6 text-[15px] leading-relaxed text-ink/90 sm:text-[15.5px]">
              “{{ item.quote }}”
            </p>
          </div>

          <div class="mt-8 flex items-center gap-3.5 border-t border-line pt-6">
            <span
              class="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[13px] font-bold text-white shadow-xs"
              :class="item.avatarGradient"
            >
              {{ initials(item.author) }}
            </span>
            <span class="min-w-0">
              <span class="block truncate text-[15px] font-semibold text-ink">
                {{ item.author }}
              </span>
              <span class="block truncate text-[13px] text-muted">
                {{ item.title }} · {{ item.company }}
              </span>
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
