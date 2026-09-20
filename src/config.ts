// No localhost fallback: dev URLs live in .env.development, and production builds
// are checked in vite.config.ts, so a dead CTA can't ship without the build failing.
export const site = {
  name: 'Getdraft',
  editorUrl: import.meta.env.VITE_EDITOR_URL ?? '',
  waitlistEndpoint: import.meta.env.VITE_WAITLIST_ENDPOINT ?? '',
}
