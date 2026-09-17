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
  transition:
    transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1),
    filter 280ms ease;
}

.badge-base {
  transition: filter 240ms ease;
}



.arrow-group {
  transform-origin: 50px 50px;
  animation: arrow-enter 500ms cubic-bezier(0.16, 1, 0.3, 1) both;
  transition: transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes arrow-enter {
  0% {
    opacity: 0;
    transform: translate(-6px, 6px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
}

:global(.group:hover) .brand-mark,
.brand-mark:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 6px 20px rgba(110, 68, 255, 0.45));
}

:global(.group:hover) .arrow-group,
.brand-mark:hover .arrow-group {
  transform: translate(3.5px, -3.5px);
}

:global(.group:active) .brand-mark,
.brand-mark:active {
  transform: scale(0.96);
}

:global(.group:active) .arrow-group,
.brand-mark:active .arrow-group {
  transform: translate(5px, -5px);
}

@media (prefers-reduced-motion: reduce) {
  .brand-mark,
  .arrow-group {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}
</style>
