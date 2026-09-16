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
      <div class="mx-auto mb-14 max-w-[620px] text-center">
        <span
          class="rounded-full bg-mint-soft px-3.5 py-1 text-[11px] font-bold tracking-[0.08em] text-mint uppercase"
        >
          Who it’s for
        </span>
        <h2
          class="mt-4 font-display text-[30px] leading-[1.12] font-bold tracking-[-0.025em] sm:text-[40px]"
        >
          One canvas, three sets of expectations
        </h2>
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
