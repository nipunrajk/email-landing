<script setup lang="ts">
import { site } from '@/config'
import Icon from '@/components/Icon.vue'
</script>

<template>
  <section class="px-5 py-20 sm:px-8 sm:py-24">
    <div class="mx-auto max-w-[1200px]">
      <div
        class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink via-[#1b2a33] to-ink px-6 py-14 text-center sm:px-16 sm:py-20"
      >
        <div
          class="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-brand/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-brand-bright/15 blur-3xl"
          aria-hidden="true"
        />

        <div class="relative mx-auto max-w-[560px]">
          <h2
            class="font-display text-[32px] leading-[1.06] font-extrabold tracking-[-0.03em] text-white sm:text-[48px]"
          >
            Open the canvas.
          </h2>
          <p class="mt-4 text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
            Start a send, or come back to a project that’s already yours.
          </p>

          <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a :href="site.editorUrl" class="btn btn-invert btn-lg">
              <Icon name="bolt" class="size-4" />
              <span>Try the editor</span>
            </a>
            <a :href="site.loginUrl" class="btn btn-outline-invert btn-lg">
              <span>Log in</span>
              <Icon name="arrow-right" class="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
