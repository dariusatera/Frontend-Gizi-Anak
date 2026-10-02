import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        daftar: resolve(__dirname, 'daftar.html'),
        login: resolve(__dirname, 'login.html'),
        'data-kader': resolve(__dirname, 'data-kader.html'),
        'review-kader': resolve(__dirname, 'review-kader.html'),
        'db-kader': resolve(__dirname, 'db-kader.html'),
        'riwayat-anak': resolve(__dirname, 'riwayat-anak.html'),
        kebijakan: resolve(__dirname, 'kebijakan.html'),
      },
    },
  },
})