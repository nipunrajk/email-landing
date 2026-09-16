<script setup lang="ts">
import { site } from '@/config'
import BrandMark from '@/components/BrandMark.vue'
import Icon from '@/components/Icon.vue'

const nav = [
  { label: 'Product', href: '#product' },
  { label: 'Exports', href: '#exports' },
  { label: 'Who it’s for', href: '#audiences' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-md">
    <div
      class="shell flex h-16 items-center justify-between gap-4 sm:h-20"
    >
      <a href="#top" class="flex items-center gap-3 text-ink">
        <span
          class="grid size-9 place-items-center rounded-xl bg-brand text-white shadow-sm sm:size-10"
        >
          <BrandMark class="size-5 sm:size-6" />
        </span>
        <span class="font-display text-[20px] font-extrabold tracking-[-0.03em]">
          {{ site.name }}
        </span>
      </a>

      <nav class="hidden items-center gap-8 md:flex">
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          class="text-[14px] font-medium text-muted transition-colors hover:text-brand"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-1 sm:gap-4">
        <a
          :href="site.loginUrl"
          class="px-2 text-[14px] font-semibold text-muted transition-colors hover:text-brand"
        >
          Log in
        </a>
        <a :href="site.editorUrl" class="btn btn-primary btn-sm">
          <span>Try the editor</span>
          <Icon name="arrow-right" class="size-4" />
        </a>
      </div>
    </div>

    <nav class="flex gap-6 overflow-x-auto border-t border-line px-5 py-2.5 md:hidden">
      <a
        v-for="item in nav"
        :key="item.href"
        :href="item.href"
        class="text-[13px] font-medium whitespace-nowrap text-muted transition-colors hover:text-brand"
      >
        {{ item.label }}
      </a>
    </nav>
  </header>
</template>
