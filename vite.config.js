import { defineConfig } from 'vite'
import { resolve } from 'path'

const __dirname = import.meta.dirname;

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // Halaman Utama
        main: resolve(__dirname, 'index.html'),
        daftar: resolve(__dirname, 'daftar.html'),
        login: resolve(__dirname, 'login.html'),
        kebijakan: resolve(__dirname, 'kebijakan.html'),

        // Halaman Kader
        'data-kader': resolve(__dirname, 'data-kader.html'),
        'review-kader': resolve(__dirname, 'review-kader.html'),
        'db-kader': resolve(__dirname, 'db-kader.html'),
        'perhatian-kader': resolve(__dirname, 'perhatian-kader.html'),

        // Halaman Orang Tua - Pendaftaran
        'data-ortu': resolve(__dirname, 'data-ortu.html'),
        'data-dirianak': resolve(__dirname, 'data-dirianak.html'),
        'data-pertumbuhan': resolve(__dirname, 'data-pertumbuhan.html'),
        'review-ortu': resolve(__dirname, 'review-ortu.html'),

        // Halaman Orang Tua - Dashboard & Fitur
        'db-ortu': resolve(__dirname, 'db-ortu.html'),
        'input-ortu': resolve(__dirname, 'input-ortu.html'),
        'history-ortu': resolve(__dirname, 'history-ortu.html'),
        'resep-detail': resolve(__dirname, 'resep-detail.html'),

        // Halaman Kader - Riwayat Anak
        'riwayat-kader': resolve(__dirname, 'riwayat-kader.html'),
      },
    },
  },
})