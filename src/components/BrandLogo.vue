<script setup lang="ts">
import { site } from '@/config'
import BrandMark from '@/components/BrandMark.vue'

withDefaults(
  defineProps<{
    theme?: 'light' | 'dark'
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    theme: 'light',
    size: 'md',
  },
)
</script>

<template>
  <div class="inline-flex items-center gap-2.5">
    <BrandMark
      :class="{
        'size-7': size === 'sm',
        'size-8 sm:size-9': size === 'md',
        'size-10 sm:size-11': size === 'lg',
      }"
    />
    <span
      class="font-sans font-extrabold tracking-[-0.03em] uppercase select-none"
      :class="[
        theme === 'dark' ? 'text-white' : 'text-ink',
        {
          'text-[16px]': size === 'sm',
          'text-[20px] sm:text-[22px]': size === 'md',
          'text-[24px] sm:text-[28px]': size === 'lg',
        },
      ]"
    >
      {{ site.name }}
    </span>
  </div>
</template>
