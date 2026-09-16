<script setup lang="ts">
import Icon from '@/components/Icon.vue'

const formats = [
  { name: 'HTML', note: 'Inlined, table-safe' },
  { name: 'MJML', note: 'Component source' },
  { name: 'React Email', note: 'Typed JSX' },
  { name: 'Blade', note: 'Laravel views' },
]

const checks = [
  { name: 'Gmail clipping', state: 'Clear' },
  { name: 'Outlook spacing', state: 'Clear' },
  { name: 'Unsupported CSS', state: 'Fix' },
]
</script>

<template>
  <section id="product" class="scroll-mt-24 py-20 sm:py-24 xl:py-28">
    <div class="shell">
      <div class="mx-auto mb-14 max-w-[680px] text-center sm:mb-20">
        <span
          class="rounded-full bg-tint px-3.5 py-1 text-[11px] font-bold tracking-[0.08em] text-brand uppercase"
        >
          How it works
        </span>
        <h2
          class="mt-4 font-display text-[30px] leading-[1.12] font-bold tracking-[-0.025em] sm:text-[40px]"
        >
          Built for email that holds its shape
        </h2>
        <p class="mt-4 text-[16px] leading-relaxed text-muted sm:text-[17px]">
          Most emails lose their design the moment they leave the canvas. Getdraft keeps the frame, the
          markup, and the inbox in agreement.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-12">
        <article
          class="flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 shadow-sm transition-shadow hover:shadow-md md:col-span-7 sm:p-8"
        >
          <div class="mb-8 max-w-md">
            <span class="mb-5 grid size-12 place-items-center rounded-xl bg-tint text-brand">
              <Icon name="frame" class="size-6" />
            </span>
            <h3 class="mb-3 font-display text-[22px] font-bold tracking-[-0.015em] sm:text-[26px]">
              Frames become blocks, not screenshots
            </h3>
            <p class="text-[15px] leading-relaxed text-muted">
              Import a layout and Getdraft turns it into editable email blocks — columns, type, images
              — instead of a flattened picture you can’t fix later.
            </p>
          </div>

          <div class="rounded-xl border border-line-strong bg-canvas p-4">
            <div
              class="mb-3 flex items-center justify-between border-b border-line pb-3 text-[12px] text-muted"
            >
              <span>Frame 12</span>
              <span class="font-semibold text-brand">6 blocks detected</span>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div
                class="flex h-20 flex-col justify-between rounded-lg border border-line bg-surface p-2"
              >
                <span class="h-2 w-6 rounded bg-brand/30" />
                <span class="h-3 w-full rounded bg-subtle" />
                <span class="h-2 w-8 rounded bg-brand" />
              </div>
              <div
                class="flex h-20 flex-col justify-between rounded-lg border-2 border-brand bg-surface p-2 shadow-sm"
              >
                <span class="h-2 w-6 rounded bg-brand" />
                <span class="h-3 w-full rounded bg-subtle" />
                <span class="h-2 w-10 rounded bg-brand" />
              </div>
              <div
                class="flex h-20 flex-col justify-between rounded-lg border border-line bg-surface p-2 opacity-50"
              >
                <span class="h-2 w-6 rounded bg-muted/30" />
                <span class="h-3 w-full rounded bg-subtle" />
                <span class="h-2 w-8 rounded bg-muted/30" />
              </div>
            </div>
          </div>
        </article>

        <article
          id="exports"
          class="flex scroll-mt-24 flex-col justify-between rounded-2xl border border-line bg-surface p-7 shadow-sm transition-shadow hover:shadow-md md:col-span-5 sm:p-8"
        >
          <div>
            <span class="mb-5 grid size-12 place-items-center rounded-xl bg-tint text-brand">
              <Icon name="code" class="size-6" />
            </span>
            <h3 class="mb-3 font-display text-[22px] font-bold tracking-[-0.015em] sm:text-[26px]">
              One canvas, four exports
            </h3>
            <p class="mb-6 text-[15px] leading-relaxed text-muted">
              HTML, MJML, React Email, or Blade. The same design, four outputs that still look like
              themselves in Gmail, Outlook, and the rest.
            </p>
          </div>

          <div class="divide-y divide-line rounded-xl border border-line bg-canvas">
            <div
              v-for="format in formats"
              :key="format.name"
              class="flex items-center justify-between px-4 py-3"
            >
              <span class="font-mono text-[13px] font-medium">{{ format.name }}</span>
              <span class="text-[12px] text-muted">{{ format.note }}</span>
            </div>
          </div>
        </article>

        <article
          class="flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 shadow-sm transition-shadow hover:shadow-md md:col-span-5 sm:p-8"
        >
          <div>
            <span class="mb-5 grid size-12 place-items-center rounded-xl bg-mint-soft text-mint">
              <Icon name="check-circle" class="size-6" />
            </span>
            <h3 class="mb-3 font-display text-[22px] font-bold tracking-[-0.015em] sm:text-[26px]">
              Catch it before the send
            </h3>
            <p class="mb-6 text-[15px] leading-relaxed text-muted">
              Clipping, shaky clients, and risky CSS surface while you’re still on the canvas — not
              after the campaign is out.
            </p>
          </div>

          <div class="divide-y divide-line rounded-xl border border-line bg-canvas">
            <div
              v-for="check in checks"
              :key="check.name"
              class="flex items-center justify-between px-4 py-3"
            >
              <span class="text-[13px]">{{ check.name }}</span>
              <span
                class="flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[11px] font-semibold"
                :class="
                  check.state === 'Fix' ? 'bg-coral-soft text-coral' : 'bg-mint-soft text-mint'
                "
              >
                <Icon :name="check.state === 'Fix' ? 'alert' : 'check'" class="size-3" />
                {{ check.state }}
              </span>
            </div>
          </div>
        </article>

        <article
          class="flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 shadow-sm transition-shadow hover:shadow-md md:col-span-7 sm:p-8"
        >
          <div class="max-w-md">
            <span class="mb-5 grid size-12 place-items-center rounded-xl bg-tint text-brand">
              <Icon name="layers" class="size-6" />
            </span>
            <h3 class="mb-3 font-display text-[22px] font-bold tracking-[-0.015em] sm:text-[26px]">
              Markup you’d be happy to own
            </h3>
            <p class="mb-6 text-[15px] leading-relaxed text-muted">
              Readable, structured output you can commit and diff — instead of a nested-table
              artifact nobody on the team wants to touch.
            </p>
          </div>

          <pre
            class="overflow-x-auto rounded-xl border border-line bg-canvas p-4 font-mono text-[12px] leading-relaxed"
          ><span class="text-muted">&lt;mj-section</span> padding<span class="text-muted">=</span><span class="text-brand">"24px"</span><span class="text-muted">&gt;</span>
  <span class="text-muted">&lt;mj-column&gt;</span>
    <span class="text-muted">&lt;mj-text</span> font-size<span class="text-muted">=</span><span class="text-brand">"22px"</span><span class="text-muted">&gt;</span>
      Architectural knitwear
    <span class="text-muted">&lt;/mj-text&gt;</span>
  <span class="text-muted">&lt;/mj-column&gt;</span>
<span class="text-muted">&lt;/mj-section&gt;</span></pre>
        </article>
      </div>
    </div>
  </section>
</template>
