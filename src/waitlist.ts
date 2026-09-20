import { site } from '@/config'

export class WaitlistError extends Error {}

/**
 * Appends an email to the Google Sheet behind the Apps Script web app
 * (see docs/waitlist-google-sheet.md).
 *
 * Apps Script doesn't answer CORS preflights, so this sends a "simple" request:
 * a text/plain body with mode 'no-cors'. The response is therefore opaque — a
 * resolved fetch means the request was delivered, not that the row was written.
 * The script re-validates everything server-side, so that's an acceptable trade.
 */
export async function joinWaitlist(email: string, honeypot = ''): Promise<void> {
  if (!site.waitlistEndpoint) {
    throw new WaitlistError('VITE_WAITLIST_ENDPOINT is not set')
  }

  const params = new URLSearchParams(window.location.search)

  await fetch(site.waitlistEndpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      email,
      website: honeypot,
      // Which channel sent them — tag the LinkedIn post link with ?utm_source=linkedin.
      source: params.get('utm_source') ?? '',
      referrer: document.referrer,
    }),
  })
}
