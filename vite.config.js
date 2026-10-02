import { defineConfig } from 'vite'
import { resolve } from 'path'

// Gunakan standar modern ESM untuk Vite/Vercel (menggantikan __dirname)
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
        'perhatian-kader': resolve(__dirname, 'perhatian-kader.html'), // Ditambahkan sesuai folder
        kebijakan: resolve(__dirname, 'kebijakan.html'),
        
        // File baru yang sudah kita buat
        'data-ortu': resolve(__dirname, 'data-ortu.html'),
        'data-dirianak': resolve(__dirname, 'data-dirianak.html'),
        'data-pertumbuhan': resolve(__dirname, 'data-pertumbuhan.html'),
      },
    },
  },
})