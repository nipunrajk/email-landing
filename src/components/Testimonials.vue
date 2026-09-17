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

const testimonials: Testimonial[] = [
  {
    metricLabel: '14 hrs saved / release',
    metricIcon: 'trending-up',
    toneClass: 'bg-tint text-brand',
    quote:
      'We stopped slicing frames into static PNGs months ago. Designers drop full Auto Layout frames straight into Getdraft, and the exported markup actually respects our token spacing, typography hierarchy, and responsive breakpoints.',
    author: 'Elena Rostova',
    title: 'Design Systems Lead',
    company: 'Rayform',
    companyBadge: 'Series B FinTech',
    avatarGradient: 'from-violet-500 to-indigo-600',
  },
  {
    metricLabel: '0 Outlook regressions',
    metricIcon: 'check-circle',
    toneClass: 'bg-mint-soft text-mint',
    quote:
      'Before Getdraft, every major product broadcast came with pre-send dread around Outlook 120 DPI spacing bugs and Gmail 102KB clipping. Running the automated pre-send audits gives our entire marketing team complete peace of mind.',
    author: 'Marcus Vance',
    title: 'Head of Lifecycle Marketing',
    company: 'Orbit Labs',
    companyBadge: 'High-Growth SaaS',
    avatarGradient: 'from-emerald-500 to-teal-700',
  },
  {
    metricLabel: '100% clean React Email JSX',
    metricIcon: 'code',
    toneClass: 'bg-tint text-brand',
    quote:
      'Email templates used to be the ticket nobody on the frontend team wanted to touch. Getdraft gives us production-grade React Email and MJML components that we can actually review in pull requests, git-diff, and commit.',
    author: 'Devon Chen',
    title: 'Staff Frontend Engineer',
    company: 'Layer0',
    companyBadge: 'Developer Platform',
    avatarGradient: 'from-blue-500 to-cyan-600',
  },
]

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
  <section class="border-t border-line pt-10 pb-14 sm:pt-12 sm:pb-16 xl:pt-14 xl:pb-20">
    <div class="shell">
      <div class="mb-12 max-w-[640px] sm:mb-14">
        <span
          class="inline-flex items-center gap-1.5 rounded-full bg-tint px-3 py-1 font-mono text-[11px] font-bold tracking-[0.08em] text-brand uppercase"
        >
          Social proof
        </span>
        <h2
          class="mt-3 font-display text-[30px] leading-[1.12] font-bold tracking-[-0.025em] text-balance sm:text-[40px]"
        >
          Trusted by teams shipping high-stakes email
        </h2>
        <p class="mt-3 text-[15px] leading-relaxed text-muted text-balance sm:text-[16px]">
          From design systems leads to lifecycle marketers and frontend engineers — see how modern teams
          eliminated the broken-table email cycle.
        </p>
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
              <span class="block truncate font-display text-[15px] font-bold text-ink">
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
