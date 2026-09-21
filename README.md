# Getdraft

Marketing site for the Getdraft email canvas. Vue 3 + Vite + Tailwind.

```sh
npm install
npm run dev
```

## Configuration

Dev uses `.env.development` (editor at `localhost:3000`). Production builds read
`VITE_EDITOR_URL` and `VITE_WAITLIST_ENDPOINT` from the host's environment — see
`.env.example`. The build fails if `VITE_EDITOR_URL` is missing or points at localhost.

## Waitlist sign-ups (Google Sheet)

The footer form POSTs to a Google Apps Script web app that appends a row to a sheet.
No server or API key needed.

### Setup

1. Create a Google Sheet and leave it empty. The script creates a `Waitlist` tab with the
   columns `Timestamp | Email | Source | Referrer` on the first sign-up.
2. **Extensions → Apps Script**, replace `Code.gs` with the script below.
3. **Deploy → New deployment → Web app**: Execute as **Me**, Who has access **Anyone**
   (not "Anyone with a Google account", or sign-ups fail silently).
4. Authorise (click *Advanced → Go to … (unsafe)* on the warning; it's your own script).
5. Copy the Web app URL (ends in `/exec`) into `VITE_WAITLIST_ENDPOINT` in your host's
   environment variables and redeploy.

After editing the script, use **Deploy → Manage deployments → Edit → New version**. A new
*deployment* creates a new URL.

Don't rename the `Waitlist` tab or insert columns before B: the script reads column B to
de-duplicate. Your own columns (e.g. `Status`) can go to the right of D.

<details>
<summary>Apps Script</summary>

```js
const SHEET_NAME = 'Waitlist'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function doPost(e) {
  const lock = LockService.getScriptLock()
  let locked = false
  try {
    const data = JSON.parse(e.postData.contents)

    // Honeypot: real visitors never see or fill this field.
    if (data.website) return reply_({ ok: true })

    const email = String(data.email || '').trim().toLowerCase()
    // Length cap + format check. A leading = + - @ would be read as a formula by
    // Sheets, so reject those outright instead of storing them.
    if (email.length > 254 || !EMAIL_RE.test(email) || /^[=+\-@]/.test(email)) {
      return reply_({ ok: false, error: 'invalid_email' })
    }

    lock.waitLock(10000)
    locked = true
    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Email', 'Source', 'Referrer'])
    }

    // De-duplicate so a double submit doesn't add a second row.
    const last = sheet.getLastRow()
    const existing = last > 1 ? sheet.getRange(2, 2, last - 1, 1).getValues().flat() : []
    if (!existing.includes(email)) {
      sheet.appendRow([
        new Date(),
        email,
        String(data.source || '').slice(0, 100),
        String(data.referrer || '').slice(0, 300),
      ])
    }
    return reply_({ ok: true })
  } catch (err) {
    return reply_({ ok: false, error: 'server_error' })
  } finally {
    if (locked) lock.releaseLock()
  }
}

function reply_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON)
}
```

</details>

### Testing

```sh
curl -L -H "Content-Type: text/plain" \
  --data '{"email":"test@example.com","source":"test"}' \
  "https://script.google.com/macros/s/XXXX/exec"
```

Expect `{"ok":true}` and a new row. Don't add `-X POST`: Apps Script answers with a redirect
that only accepts GET, and forcing POST gives a misleading 405 "Page not found" even though
the row was written.

Tag your LinkedIn link with `?utm_source=linkedin` and the channel lands in the **Source**
column. The page can't read the script's reply, so always confirm with a real submission.
Emails are personal data: mention what you collect and why in your privacy policy.
