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

Email sign-ups go to a Google Sheet: setup in [`docs/waitlist-google-sheet.md`](docs/waitlist-google-sheet.md).
