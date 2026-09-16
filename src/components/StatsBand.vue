<script setup lang="ts">
// These three are product facts, not performance claims — each one is verifiable
// from what Getdraft actually does, so this section is safe to ship as-is.
// Swap in business metrics later only if you can source them.
const stats = [
  {
    value: '4',
    label: 'Export formats',
    note: 'HTML, MJML, React Email and Blade — one canvas, four outputs.',
    accent: true,
  },
  {
    value: '3',
    label: 'Pre-send checks',
    note: 'Gmail clipping, Outlook spacing and risky CSS, caught on the canvas.',
    accent: false,
  },
  {
    value: '0',
    label: 'Nested-table exports',
    note: 'Readable markup you can commit and diff, not an artifact to inherit.',
    accent: true,
  },
]
</script>

<template>
  <section class="border-y border-line bg-surface py-16 xl:py-20">
    <div class="shell">
      <div class="grid gap-10 divide-line md:grid-cols-3 md:gap-0 md:divide-x">
        <div v-for="(stat, i) in stats" :key="i" class="px-4 text-center">
          <p
            class="font-display text-[44px] leading-none font-extrabold tracking-[-0.03em] sm:text-[56px]"
            :class="stat.accent ? 'text-brand' : 'text-ink'"
          >
            {{ stat.value }}
          </p>
          <p class="mt-3 font-display text-[16px] font-bold">{{ stat.label }}</p>
          <p class="mx-auto mt-1.5 max-w-[280px] text-[13px] leading-relaxed text-muted">
            {{ stat.note }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
