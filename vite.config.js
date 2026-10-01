import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // JANGAN ADA BARIS 'base' DI SINI! Vercel akan error jika ada.
  
  build: {
    rollupOptions: {
      // Memberitahu Vite untuk mem-build semua file HTML kamu
      input: {
        main: resolve(__dirname, 'index.html'),
        daftar: resolve(__dirname, 'daftar.html'),
        login: resolve(__dirname, 'login.html'),
        'data-kader': resolve(__dirname, 'data-kader.html'),
        'review-kader': resolve(__dirname, 'review-kader.html'),
        'db-kader': resolve(__dirname, 'db-kader.html'),
        kebijakan: resolve(__dirname, 'kebijakan.html'),
      },
    },
  },
})