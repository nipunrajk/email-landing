<script setup lang="ts">
import Ctas from '@/components/Ctas.vue'
import Icon from '@/components/Icon.vue'
import EditorWorkbench from '@/components/EditorWorkbench.vue'

const facts = ['Figma frame import', 'HTML · MJML · React Email · Blade', 'Verified for Outlook & Gmail']
</script>

<template>
  <section class="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center"
      aria-hidden="true"
    >
      <div
        class="h-[520px] w-[900px] max-w-full rounded-full bg-gradient-to-tr from-tint via-canvas to-transparent blur-3xl"
      />
    </div>

    <div class="shell">
      <div class="text-center">
        <a
          href="#product"
          class="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-3.5 py-1.5 shadow-sm transition-colors hover:border-brand"
        >
          <span
            class="rounded-full bg-mint-soft px-2 py-0.5 font-mono text-[11px] font-semibold text-mint"
          >
            Figma → email
          </span>
          <span class="text-[13px] text-muted">Frames come in. Editable blocks come out.</span>
          <Icon name="chevron-right" class="size-3.5 text-muted" />
        </a>

        <h1
          class="mx-auto mt-8 max-w-[900px] font-display text-[38px] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-[56px] xl:text-[64px]"
        >
          <span class="text-muted">Design in Figma.</span>
          <span class="text-ink">Ship real email markup.</span>
        </h1>

        <p class="mx-auto mt-6 max-w-[620px] text-[17px] leading-relaxed text-muted sm:text-[19px]">
          Getdraft turns your frames into editable email blocks, exports clean HTML, MJML, React Email
          or Blade, and checks the inbox before you send.
        </p>

        <div class="mt-9">
          <Ctas size="lg" align="center" />
        </div>

        <ul
          class="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] text-muted"
        >
          <li v-for="fact in facts" :key="fact" class="flex items-center gap-1.5">
            <Icon name="check-circle" class="size-4 text-mint" />
            {{ fact }}
          </li>
        </ul>
      </div>

      <div id="demo" class="mt-14 scroll-mt-24">
        <EditorWorkbench />
      </div>
    </div>
  </section>
</template>
