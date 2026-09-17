<script setup lang="ts">
import Icon from '@/components/Icon.vue'

interface Persona {
  role: string
  tagline: string
  icon: string
  deliverable: string
  specTag: string
  proofPoints: string[]
}

const audiences: Persona[] = [
  {
    role: 'Designers',
    tagline: 'Figma stays in sync. No screenshot slicing.',
    icon: 'frame',
    deliverable: 'Figma → Editable Blocks',
    specTag: 'Design Handoff',
    proofPoints: [
      'Real Auto Layout to table conversion',
      'Preserves typography & spacing rules',
      'Frame import without rasterizing layers',
    ],
  },
  {
    role: 'Marketers',
    tagline: 'Send with certainty. Zero Outlook panic.',
    icon: 'sparkle',
    deliverable: 'Verified Inbox Previews',
    specTag: 'Pre-Send QA',
    proofPoints: [
      'Pre-send render audit for Gmail & Outlook',
      '102KB Gmail clipping warnings',
      'Shareable review links for team sign-off',
    ],
  },
  {
    role: 'Engineers',
    tagline: 'Production markup you can actually commit.',
    icon: 'code',
    deliverable: 'Git-Ready Production Code',
    specTag: 'Developer Output',
    proofPoints: [
      'Clean React Email (JSX), MJML & Blade',
      'Zero nested-table spaghetti in source',
      'Git-diffable, modular component export',
    ],
  },
]
</script>

<template>
  <section
    id="audiences"
    class="scroll-mt-24 border-y border-line bg-surface py-14 sm:py-16 xl:py-20"
  >
    <div class="shell">
      <!-- Section Header: Clean eyebrow on top, crisp title, and balanced layout -->
      <div class="mb-10 sm:mb-12">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span
              class="inline-flex items-center gap-1.5 rounded-full bg-tint px-3 py-1 font-mono text-[11px] font-bold tracking-[0.08em] text-brand uppercase"
            >
              Who it’s for
            </span>
            <h2
              class="mt-3 font-display text-[28px] leading-[1.15] font-bold tracking-[-0.025em] text-balance sm:text-[36px] xl:text-[40px]"
            >
              One canvas, three sets of expectations
            </h2>
          </div>
          <p class="max-w-[340px] text-[14px] leading-relaxed text-muted sm:text-right">
            Figma design, marketing deliverability, and developer code in total sync.
          </p>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <article
          v-for="item in audiences"
          :key="item.role"
          class="group flex flex-col justify-between rounded-2xl border border-line bg-canvas p-6 transition-all duration-200 hover:-translate-y-1 hover:border-line-strong hover:shadow-md sm:p-7"
        >
          <!-- Top Role & Tagline -->
          <div>
            <span
              class="mb-4 grid size-11 place-items-center rounded-xl bg-tint text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white"
            >
              <Icon :name="item.icon" class="size-5" />
            </span>
            <h3 class="font-display text-[21px] font-bold tracking-[-0.02em] text-ink">
              {{ item.role }}
            </h3>
            <p class="mt-1 text-[14.5px] font-semibold text-ink/80 leading-snug">
              {{ item.tagline }}
            </p>

            <!-- Proof Points Checklist -->
            <ul class="mt-5 space-y-2.5 border-t border-line pt-4 text-[13.5px] text-muted">
              <li
                v-for="point in item.proofPoints"
                :key="point"
                class="flex items-start gap-2.5"
              >
                <span
                  class="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-mint-soft text-mint"
                >
                  <Icon name="check" class="size-2.5 stroke-[2.5]" />
                </span>
                <span class="leading-snug">{{ point }}</span>
              </li>
            </ul>
          </div>

          <!-- Bottom Deliverable Spec Pill -->
          <div class="mt-6 flex items-center justify-between border-t border-line pt-3.5">
            <span class="font-mono text-[10.5px] font-semibold tracking-wider text-muted uppercase">
              {{ item.specTag }}
            </span>
            <span
              class="inline-flex items-center rounded-lg border border-line bg-surface px-2.5 py-1 font-mono text-[11px] font-semibold text-ink shadow-2xs transition-colors group-hover:border-brand/40"
            >
              {{ item.deliverable }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
