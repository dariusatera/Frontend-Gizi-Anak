# NutriTumbuh - Monitoring Gizi Anak Posyandu

NutriTumbuh adalah aplikasi web monitoring gizi anak untuk Posyandu yang dirancang untuk membantu Kader Posyandu dan Orang Tua dalam memantau tumbuh kembang balita.

## Fitur Utama

### Untuk Kader Posyandu
- Dashboard Analitik dengan grafik tren prevalensi gizi
- Daftar Balita Prioritas dengan status gizi (Baik/Kurang/Buruk)
- Pencarian berdasarkan nama anak atau orang tua
- Detail Riwayat Anak dengan tampilan timeline & grid
- Tombol Rujuk ke Puskesmas
- Analisis Cerdas AI

### Untuk Orang Tua
- Pencatatan Asupan Harian dengan tag makanan interaktif
- Monitoring Perkembangan Fisik (TB & BB)
- Rekomendasi Makanan AI berdasarkan budget & bahan
- Detail Resep Lengkap
- Riwayat Makanan dengan dual layout (Timeline + Grid)
- Catatan Harian

## Teknologi
- HTML5, CSS3, JavaScript (ES6+)
- Vite (Build tool)
- Chart.js (Grafik)
- Google Fonts (Plus Jakarta Sans & Poppins)

## Cara Menjalankan

1. Install dependencies:
   npm install

2. Jalankan dev server:
   npm run dev

3. Buka browser di http://localhost:5173

## Struktur Halaman

### Alur Kader
Daftar → Data Kader → Review → Dashboard → Riwayat Anak

### Alur Orang Tua
Daftar → Data Ortu → Data Anak → Data Pertumbuhan → Review → Dashboard → Input/History

## Catatan
- Prototype ini menggunakan mock data (belum ada backend)
- Data disimpan di sessionStorage (hilang saat browser ditutup)
- Chart.js butuh internet aktif (load dari CDN)

Dibuat untuk Monitoring Gizi Anak Posyandu
