import { defineConfig } from 'vite'
import { resolve } from 'path'

// PERBAIKAN: Gunakan import.meta.dirname (Standar ESM Modern yang didukung Vite/Vercel)
const __dirname = import.meta.dirname;

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
        

        'data-ortu': resolve(__dirname, 'data-ortu.html'),
        'data-dirianak': resolve(__dirname, 'data-dirianak.html'),
        'data-pertumbuhan': resolve(__dirname, 'data-pertumbuhan.html'),
        tinjauan: resolve(__dirname, 'tinjauan.html'), // Jika sudah dibuat
      },
    },
  },
})