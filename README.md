# 🌿 NutriTumbuh - Monitoring Gizi Anak Posyandu

![NutriTumbuh](https://img.shields.io/badge/Status-Prototype-green)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

**NutriTumbuh** adalah aplikasi web monitoring gizi anak untuk Posyandu yang dirancang untuk membantu **Kader Posyandu** dan **Orang Tua** dalam memantau tumbuh kembang balita. Aplikasi ini menyediakan dashboard analitik, rekomendasi makanan berbasis AI, serta riwayat pemantauan gizi yang komprehensif.

---

## 📑 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Instalasi & Menjalankan](#-instalasi--menjalankan)
- [Struktur Proyek](#-struktur-proyek)
- [Peta Halaman & Alur Navigasi](#-peta-halaman--alur-navigasi)
- [Panduan Testing](#-panduan-testing)
- [Design System](#-design-system)
- [Catatan Penting](#-catatan-penting)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## ✨ Fitur Utama

### 👩‍️ Untuk Kader Posyandu
- 📊 **Dashboard Analitik** dengan grafik tren prevalensi gizi & donut chart distribusi status gizi
- 📋 **Daftar Balita Prioritas** dengan status gizi (Baik/Kurang/Buruk)
-  **Pencarian** berdasarkan nama anak atau orang tua
- 👁 **Detail Riwayat Anak** dengan tampilan timeline & grid 4 kolom
-  **Tombol Rujuk** ke Puskesmas untuk balita gizi buruk
- 📈 **Analisis Cerdas AI** untuk rekomendasi tindak lanjut

### 👨‍‍👧 Untuk Orang Tua
-  **Pencatatan Asupan Harian** dengan tag makanan interaktif
- 📏 **Monitoring Perkembangan Fisik** (Tinggi & Berat Badan)
- 🤖 **Rekomendasi Makanan AI** berdasarkan budget & bahan tersedia
-  **Detail Resep Lengkap** dengan bahan, langkah masak, info gizi, & tips
-  **Riwayat Makanan** dengan dual layout (Timeline + Grid)
- 📝 **Catatan Harian** untuk observasi orang tua

---

## 🛠 Teknologi yang Digunakan

| Teknologi | Kegunaan |
|-----------|----------|
| **HTML5** | Struktur halaman |
| **CSS3** | Styling & responsivitas |
| **JavaScript (ES6+)** | Logika interaktif & manipulasi DOM |
| **Vite** | Build tool & dev server |
| **Chart.js** | Visualisasi grafik (line chart & donut) |
| **Google Fonts** | Typography (Plus Jakarta Sans & Poppins) |
| **SessionStorage** | Penyimpanan data sementara antar halaman |

---

## 🚀 Instalasi & Menjalankan

### Prasyarat
- **Node.js** versi 18 atau lebih baru ([Download](https://nodejs.org/))
- **npm** (terinstal otomatis bersama Node.js)
- **Git** (opsional, untuk clone repository)

### Langkah-langkah

1. **Clone Repository** (jika dari GitHub):
   ```bash
   git clone https://github.com/username/NutriTumbuh.git
   cd NutriTumbuh
