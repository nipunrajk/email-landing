<script setup lang="ts">
import { site } from '@/config'
import BrandMark from '@/components/BrandMark.vue'
import Icon from '@/components/Icon.vue'

const nav = [
  { label: 'Product', href: '#product', active: true },
  { label: 'Templates', href: '#templates' },
  { label: 'Integrations', href: '#exports' },
  { label: 'Showcase', href: '#audiences' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-md">
    <div
      class="shell flex h-16 items-center justify-between gap-4 sm:h-20"
    >
      <a href="#top" class="group flex items-center gap-2.5 text-ink transition-opacity duration-150 hover:opacity-85">
        <BrandMark class="size-8 sm:size-9 shadow-xs" />
        <span class="font-sans text-[20px] font-extrabold tracking-[-0.03em] uppercase text-ink sm:text-[22px]">
          {{ site.name }}
        </span>
      </a>

      <nav class="hidden items-center gap-7 lg:gap-9 md:flex">
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          class="text-[14.5px] transition-colors"
          :class="
            item.active
              ? 'font-semibold text-brand'
              : 'font-medium text-muted hover:text-ink'
          "
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-4 sm:gap-6">
        <a
          :href="site.editorUrl"
          class="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-brand px-4 text-[14px] font-semibold whitespace-nowrap text-white sm:px-5 shadow-sm transition-all hover:bg-brand-deep active:scale-[0.98]"
        >
          <span class="sm:hidden">Try it</span>
          <span class="hidden sm:inline">Try the editor</span>
          <Icon name="arrow-right" class="size-3.5" />
        </a>
      </div>
    </div>

    <nav class="flex gap-6 overflow-x-auto border-t border-line px-5 py-2.5 md:hidden">
      <a
        v-for="item in nav"
        :key="item.href"
        :href="item.href"
        class="text-[13px] whitespace-nowrap transition-colors"
        :class="
          item.active
            ? 'font-semibold text-brand'
            : 'font-medium text-muted hover:text-ink'
        "
      >
        {{ item.label }}
      </a>
    </nav>
  </header>
</template>
