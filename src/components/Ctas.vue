<script setup lang="ts">
import { site } from '@/config'
import Icon from '@/components/Icon.vue'

withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    align?: 'start' | 'center'
  }>(),
  { size: 'md', align: 'start' },
)
</script>

<template>
  <div
    class="flex flex-col gap-3 sm:flex-row sm:items-center"
    :class="align === 'center' ? 'sm:justify-center' : ''"
  >
    <a :href="site.editorUrl" class="btn btn-primary !rounded-xl" :class="`btn-${size}`">
      <Icon name="bolt" class="size-4" />
      <span>Start Building Free</span>
    </a>
    <a href="#demo" class="btn btn-ghost !rounded-xl" :class="`btn-${size}`">
      <Icon name="play-circle" class="size-4 text-brand" />
      <span>Live Interactive Demo</span>
    </a>
  </div>
</template>
