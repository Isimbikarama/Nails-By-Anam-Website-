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
        '> 0.2%, not dead',
        'IE 11',
      ],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
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
              colors: {
                pink: {
                  50: '#FFF5F7',
                  100: '#FFE4E6',
                  200: '#FECDD3',
                  300: '#FDA4AF',
                  400: '#FB7185',
                  500: '#F43F5E',
                  600: '#E11D48',
                  700: '#BE123C',
                  800: '#9F1239'
                },
                rose: {
                  50: '#FFF1F2',
                  100: '#FFE4E6',
                  200: '#FECDD3',
                  300: '#FDA4AF',
                  400: '#FB7185',
                  500: '#F43F5E',
                  600: '#E11D48',
                  700: '#BE123C',
                  800: '#9F1239'
                },
                footer: {
                  from: '#A5495B',
                  to: '#3B1215'
                }
              }
            },
          },
        }),
        autoprefixer,
      ],
    },
  },
})


