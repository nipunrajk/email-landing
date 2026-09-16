<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Icon from '@/components/Icon.vue'

// Formats and clients Getdraft actually supports — every item here is a factual
// compatibility statement, not a customer or endorsement claim.
const items = [
  { name: 'HTML', icon: 'code' },
  { name: 'MJML', icon: 'layers' },
  { name: 'React Email', icon: 'bolt' },
  { name: 'Blade', icon: 'frame' },
  { name: 'Gmail', icon: 'mail' },
  { name: 'Outlook', icon: 'mail' },
]

const reduceMotion = ref(false)
let mql: MediaQueryList | null = null

function handleMotionChange(e: MediaQueryListEvent) {
  reduceMotion.value = e.matches
}

onMounted(() => {
  mql = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduceMotion.value = mql.matches
  mql.addEventListener('change', handleMotionChange)
})

onUnmounted(() => {
  mql?.removeEventListener('change', handleMotionChange)
})

// One group must be wider than the viewport for the loop to look seamless, so the
// six items are repeated inside each group; the track then holds two identical groups.
const groupItems = computed(() => (reduceMotion.value ? items : [...items, ...items]))
const groupCount = computed(() => (reduceMotion.value ? 1 : 2))
</script>

<template>
  <section class="overflow-hidden border-y border-line bg-surface py-14">
    <div class="shell">
      <p class="mb-8 text-center text-[11px] font-bold tracking-[0.12em] text-muted uppercase">
        One canvas — four exports, checked against the inboxes that break things
      </p>

      <p class="sr-only">
        Exports to HTML, MJML, React Email and Blade. Checked against Gmail and Outlook.
      </p>

      <div class="marquee" :class="{ 'is-static': reduceMotion }" aria-hidden="true">
        <div class="marquee-track" :class="{ 'is-animated': !reduceMotion }">
          <div v-for="g in groupCount" :key="g" class="marquee-group">
            <div
              v-for="(item, i) in groupItems"
              :key="`${g}-${i}`"
              class="flex shrink-0 items-center gap-2 text-muted transition-colors duration-200 hover:text-ink"
            >
              <Icon :name="item.icon" class="size-5" />
              <span class="font-display text-[18px] font-bold tracking-[-0.02em] whitespace-nowrap">
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
}

.marquee-group {
  display: flex;
  align-items: center;
  gap: 3.5rem;
  padding-right: 3.5rem;
}

.is-animated {
  animation: marquee 32s linear infinite;
}

.marquee:hover .is-animated {
  animation-play-state: paused;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.is-static {
  -webkit-mask-image: none;
  mask-image: none;
}

.is-static .marquee-track {
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}

.is-static .marquee-group {
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
  padding-right: 0;
}
</style>
