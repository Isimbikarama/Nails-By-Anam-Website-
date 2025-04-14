import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcssPostcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'], // Target modern browsers but not IE 11 (you can modify this as needed)
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // To support async/await in older browsers
    }),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcssPostcss({
          content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
          ],
          theme: {
            extend: {
              fontFamily: {
                custom: ['CustomFont', 'sans-serif'],
              },
            },
          },
        }),
        autoprefixer, // Ensures proper prefixes for older browsers
      ],
    },
  },
})
