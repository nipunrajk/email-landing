<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { site } from '@/config'
import SiteHeader from '@/components/SiteHeader.vue'

const year = new Date().getFullYear()

const sections = [
  {
    heading: 'What gets collected',
    body: 'When you submit the waitlist form, four fields are recorded: the email address you typed, the time of submission, a campaign source (for example linkedin, if you arrived from a tagged link), and the referring page your browser reported. Nothing else is collected, and the form sets no cookies.',
  },
  {
    heading: 'Where it goes',
    body: 'The submission is sent directly to a Google Sheet through an Apps Script endpoint, which appends one row. It is not routed through any other service, and the editor itself runs entirely in your browser — nothing you design is uploaded to us.',
  },
  {
    heading: 'Why it is collected',
    body: 'Solely to email you once when the full version of Getdraft opens. The address is not sold, shared, or used for marketing beyond that notice.',
  },
  {
    heading: 'How long it is kept',
    body: 'Until the launch announcement is sent, and until you ask for it to be removed. Removing your row also removes your address.',
  },
  {
    heading: 'Getting it removed',
    body: 'Reply to the launch email, or write to the address that sent it, and the row is deleted from the sheet.',
  },
]
</script>

<template>
  <div id="top" class="min-h-svh bg-canvas text-ink">
    <SiteHeader />

    <main class="pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div class="shell">
        <div class="mx-auto max-w-[68ch]">
          <RouterLink
            to="/"
            class="inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium text-muted transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span>
            Back to {{ site.name }}
          </RouterLink>

          <span class="eyebrow mt-6 block">Privacy</span>
          <h1
            class="mt-3 font-display text-[38px] leading-[1.06] font-medium tracking-[-0.015em] text-balance sm:text-[52px]"
          >
            What this site collects
          </h1>
          <p class="mt-4 text-[17px] leading-relaxed text-pretty text-muted">
            {{ site.name }} is a marketing site for a browser-based tool. It has no accounts, no
            tracking scripts, and no third-party analytics. This page covers the one form on it.
          </p>

          <div class="mt-12 space-y-9">
            <section v-for="s in sections" :key="s.heading">
              <h2 class="font-display text-[22px] leading-tight font-medium tracking-[-0.015em]">
                {{ s.heading }}
              </h2>
              <p class="mt-2.5 text-[15.5px] leading-relaxed text-pretty text-muted">
                {{ s.body }}
              </p>
            </section>
          </div>

          <p class="mt-12 border-t border-line pt-6 text-[13px] text-muted">
            Last updated {{ year }}. If anything here is unclear, write to the address that sent
            the launch email and it will be clarified here.
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
