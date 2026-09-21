import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command, mode }) => {
  // Fail loudly instead of shipping CTAs that point nowhere.
  if (command === 'build' && mode === 'production') {
    const env = loadEnv(mode, process.cwd(), 'VITE_')
    const editor = env.VITE_EDITOR_URL ?? ''
    if (!editor || /localhost|127\.0\.0\.1/.test(editor)) {
      throw new Error(
        `VITE_EDITOR_URL must be set to the public editor URL for production builds (got "${editor}"). ` +
          'Set it in your host\'s environment variables — see .env.example.',
      )
    }
    if (!env.VITE_WAITLIST_ENDPOINT) {
      console.warn(
        '\n⚠ VITE_WAITLIST_ENDPOINT is not set — the email form will not store sign-ups. See README.md → "Waitlist sign-ups".\n',
      )
    }
  }

  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
