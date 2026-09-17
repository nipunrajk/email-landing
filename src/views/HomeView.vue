<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import CompatibilityBar from '@/components/CompatibilityBar.vue'
import FeatureGrid from '@/components/FeatureGrid.vue'
import AudienceRow from '@/components/AudienceRow.vue'
import TemplateGallery from '@/components/TemplateGallery.vue'
import Testimonials from '@/components/Testimonials.vue'
import StatsBand from '@/components/StatsBand.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <div id="top" class="min-h-svh bg-canvas text-ink">
    <SiteHeader />
    <main>
      <HeroSection />
      <CompatibilityBar />
      <FeatureGrid />
      <AudienceRow />
      <TemplateGallery />
      <Testimonials />
      <StatsBand />
    </main>
    <SiteFooter />
  </div>
</template>
