<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import FeatureGrid from '@/components/FeatureGrid.vue'
import AudienceRow from '@/components/AudienceRow.vue'
import FooterCta from '@/components/FooterCta.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <div id="top" class="min-h-svh bg-canvas text-ink">
    <SiteHeader />
    <main>
      <HeroSection />
      <FeatureGrid />
      <AudienceRow />
      <FooterCta />
    </main>
    <SiteFooter />
  </div>
</template>
