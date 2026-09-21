<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { site } from '@/config'
import BrandMark from '@/components/BrandMark.vue'
import Icon from '@/components/Icon.vue'

// Keep this in the same top-to-bottom order as the sections on the page,
// otherwise clicking through the nav jumps up and down.
const nav = [
  { label: 'Product', href: '#product' },
  { label: 'Integrations', href: '#exports' },
  { label: 'Showcase', href: '#audiences' },
  { label: 'Templates', href: '#templates' },
]

const header = ref<HTMLElement | null>(null)
const activeHref = ref(nav[0].href)

let frame = 0

// The active item is the last section whose top has scrolled past the header.
function updateActive() {
  frame = 0
  const line = (header.value?.getBoundingClientRect().bottom ?? 0) + 24
  let current = nav[0].href
  for (const item of nav) {
    const el = document.querySelector(item.href)
    if (el && el.getBoundingClientRect().top <= line) current = item.href
  }
  activeHref.value = current
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(updateActive)
}

onMounted(() => {
  updateActive()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <header ref="header" class="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-md">
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
            item.href === activeHref
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
          item.href === activeHref
            ? 'font-semibold text-brand'
            : 'font-medium text-muted hover:text-ink'
        "
      >
        {{ item.label }}
      </a>
    </nav>
  </header>
</template>
