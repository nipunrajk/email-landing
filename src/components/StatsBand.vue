<script setup lang="ts">
// Three product facts. The numbers (4, 3, 0) aren't impressive at scale, so they
// stay inline within a sentence rather than blown up as hero digits — the claim
// carries the section, not the numeral.
const stats = [
  {
    lead: 'Export to',
    value: '4',
    tail: 'formats',
    note: 'HTML, MJML, React Email and Blade — one canvas, four outputs.',
  },
  {
    lead: 'Catch',
    value: '3',
    tail: 'failure points',
    note: 'Gmail clipping, Outlook spacing and risky CSS, before you send.',
  },
  {
    lead: 'Inherit',
    value: '0',
    tail: 'nested tables',
    note: 'Readable markup you can commit and diff, not an artifact to maintain.',
  },
]
</script>

<template>
  <section class="border-y border-line bg-surface py-16 xl:py-20">
    <div class="shell">
      <div class="grid gap-10 divide-line sm:grid-cols-3 sm:gap-10 sm:divide-x">
        <div v-for="(stat, i) in stats" :key="i" class="sm:first:pl-0 sm:px-2 sm:last:pr-0">
          <p
            class="font-display text-[21px] leading-snug font-bold tracking-[-0.015em] sm:text-[23px]"
          >
            {{ stat.lead }} <span class="text-brand">{{ stat.value }}</span> {{ stat.tail }}
          </p>
          <p class="mt-2.5 max-w-[280px] text-[13.5px] leading-relaxed text-muted">
            {{ stat.note }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
