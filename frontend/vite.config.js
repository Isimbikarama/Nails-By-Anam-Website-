import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcssPostcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: [
        '> 0.2%, not dead', // Target browsers with more than 0.2% usage globally (can adjust based on your needs)
        'IE 11',
      ],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // Required for async/await compatibility
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
                custom: ['BebasNeue-Regular', 'PTSerif-Regular', 'Twister'],
              },
            },
          },
        }),
        autoprefixer, // Ensures proper prefixes for older browsers
      ],
    },
  },
})


