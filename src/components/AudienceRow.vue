<script setup lang="ts">
import Icon from '@/components/Icon.vue'

const audiences = [
  {
    who: 'Designers',
    icon: 'frame',
    line: 'A canvas that feels closer to Figma than to a form builder. Frames come in. Blocks stay editable.',
  },
  {
    who: 'Marketers',
    icon: 'sparkle',
    line: 'Templates, share-for-review, and a health check before the send. Less hoping. More knowing.',
  },
  {
    who: 'Engineers',
    icon: 'code',
    line: 'Markup you can own — HTML, MJML, React Email, Blade — instead of a nested-table artifact nobody wants to touch.',
  },
]
</script>

<template>
  <section
    id="audiences"
    class="scroll-mt-24 border-y border-line bg-surface py-20 sm:py-24 xl:py-28"
  >
    <div class="shell">
      <div class="mb-14 border-t border-line-strong pt-6 sm:mb-16">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2
            class="font-display text-[30px] leading-[1.12] font-bold tracking-[-0.025em] sm:text-[40px]"
          >
            One canvas, three sets of expectations
          </h2>
          <span
            class="font-mono text-[12px] font-bold tracking-[0.12em] text-mint uppercase sm:pb-1.5"
          >
            Who it’s for
          </span>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <article
          v-for="item in audiences"
          :key="item.who"
          class="rounded-2xl border border-line bg-canvas p-7 transition-shadow hover:shadow-md"
        >
          <span class="mb-5 grid size-11 place-items-center rounded-xl bg-tint text-brand">
            <Icon :name="item.icon" class="size-5" />
          </span>
          <h3 class="mb-3 font-display text-[20px] font-bold tracking-[-0.02em]">
            {{ item.who }}
          </h3>
          <p class="text-[15px] leading-relaxed text-muted">{{ item.line }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
