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
        'defaults',
        'not IE 11',
        'iOS >= 10',
        'Android >= 4.4',
        'last 2 versions'
      ],
      polyfills: true,
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      modernPolyfills: true
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
        autoprefixer({
          overrideBrowserslist: [
            '>0.2%',
            'not dead',
            'not op_mini all',
            'iOS >= 10',
            'Android >= 4.4'
          ]
        }),
      ],
    },
  },
})


