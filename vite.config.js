import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Mistral SDK has optional OpenTelemetry peer deps — mark them external
      // so Vite doesn't try to bundle them (they are never used in browser)
      external: [
        '@opentelemetry/api',
        '@opentelemetry/semantic-conventions/incubating',
      ],
    },
  },
  optimizeDeps: {
    exclude: ['@opentelemetry/api'],
  },
})
