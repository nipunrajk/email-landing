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
    <a :href="site.editorUrl" class="btn btn-primary" :class="`btn-${size}`">
      <Icon name="bolt" class="size-4" />
      <span>Try the editor</span>
    </a>
    <a :href="site.loginUrl" class="btn btn-ghost" :class="`btn-${size}`">
      <span>Log in</span>
      <Icon name="arrow-right" class="size-4" />
    </a>
  </div>
</template>
