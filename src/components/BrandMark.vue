<template>
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="brand-mark shrink-0"
    aria-hidden="true"
  >
    <defs>
      <!-- Baseplate: built around the shared brand anchor #6E44FF — the app's
           --primary sits at the midpoint, with the plate darkening into it from
           a lit top edge, so the mark reads as the same violet as the editor. -->
      <linearGradient id="lego-plate-grad" x1="18%" y1="0%" x2="82%" y2="100%">
        <stop offset="0%" stop-color="#8B6BFF" />
        <stop offset="52%" stop-color="#6E44FF" />
        <stop offset="100%" stop-color="#3D21A6" />
      </linearGradient>



      <!-- Arrow shadow: cast in the brand's own darkest value, not generic black -->
      <filter id="arrow-shadow" x="-20%" y="-20%" width="150%" height="150%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.8" flood-color="#1F1147" flood-opacity="0.5" />
      </filter>
    </defs>

    <!-- Chamfered Modular Baseplate -->
    <path
      d="M14 0 H86 L100 14 V86 L86 100 H14 L0 86 V14 Z"
      fill="url(#lego-plate-grad)"
      class="badge-base"
    />



    <!-- ↗ Dispatch Arrow -->
    <g class="arrow-group" filter="url(#arrow-shadow)">
      <path
        d="M28 29.5 H70.5 V72"
        stroke="#FFFFFF"
        stroke-width="11"
        stroke-linecap="butt"
        stroke-linejoin="miter"
      />
      <path
        d="M70.5 29.5 L27 73"
        stroke="#FFFFFF"
        stroke-width="11"
        stroke-linecap="butt"
      />
    </g>
  </svg>
</template>

<style scoped>
.brand-mark {
  overflow: visible;
}

.badge-base {
  transition: filter 160ms ease;
}

:global(.group:hover) .badge-base,
.brand-mark:hover .badge-base {
  filter: brightness(1.06);
}

:global(.group:active) .brand-mark,
.brand-mark:active {
  transform: scale(0.98);
  transition: transform 100ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .brand-mark,
  .badge-base {
    transition: none !important;
    transform: none !important;
  }
}
</style>
