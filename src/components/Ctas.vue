<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { site } from '@/config'
import Icon from '@/components/Icon.vue'

withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    align?: 'start' | 'center'
  }>(),
  { size: 'md', align: 'start' },
)

const isVideoOpen = ref(false)
const videoPlayer = ref<HTMLVideoElement | null>(null)

function openVideo() {
  isVideoOpen.value = true
  document.body.style.overflow = 'hidden'
  nextTick(() => {
    if (videoPlayer.value) {
      videoPlayer.value.currentTime = 0
      videoPlayer.value.play().catch(() => {
        // Autoplay policy fallback
      })
    }
  })
}

function closeVideo() {
  if (videoPlayer.value) {
    videoPlayer.value.pause()
  }
  isVideoOpen.value = false
  document.body.style.overflow = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isVideoOpen.value) {
    closeVideo()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div
    class="flex flex-col gap-3 sm:flex-row sm:items-center"
    :class="align === 'center' ? 'sm:justify-center' : ''"
  >
    <a :href="site.editorUrl" class="btn btn-primary !rounded-xl" :class="`btn-${size}`">
      <Icon name="bolt" class="size-4" />
      <span>Try the editor</span>
    </a>
    <a
      href="/interactive-vedio.mp4"
      class="btn btn-ghost !rounded-xl group"
      :class="`btn-${size}`"
      title="Watch interactive demo video"
      @click.prevent="openVideo"
    >
      <Icon name="play-circle" class="size-4 text-brand transition-transform group-hover:scale-110" />
      <span>Live Interactive Demo</span>
    </a>

    <!-- Interactive Video Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isVideoOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Interactive Demo Video"
        >
          <!-- Backdrop -->
          <div
            class="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
            @click="closeVideo"
          />

          <!-- Modal Box (Clean Cinema Style) -->
          <div
            class="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.85)] ring-1 ring-white/10"
            @click.stop
          >
            <!-- Floating Close Button -->
            <button
              type="button"
              class="group absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex size-9 sm:size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/75 backdrop-blur-md shadow-lg transition-all duration-150 hover:scale-105 hover:bg-black/85 hover:text-white hover:border-white/40 focus:outline-none"
              aria-label="Close demo video"
              title="Close (Esc)"
              @click="closeVideo"
            >
              <Icon name="x" class="size-4 sm:size-4.5" />
            </button>

            <!-- Video Frame -->
            <div class="relative aspect-video w-full bg-black flex items-center justify-center">
              <video
                ref="videoPlayer"
                src="/interactive-vedio.mp4"
                controls
                playsinline
                autoplay
                class="size-full object-contain"
              >
                Your browser does not support the video tag.
                <a href="/interactive-vedio.mp4" class="text-brand underline">Download or view demo video directly</a>.
              </video>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
