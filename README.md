# 🌿 NutriTumbuh - Monitoring Gizi Anak Posyandu

![NutriTumbuh](https://img.shields.io/badge/Status-Prototype-green)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

**NutriTumbuh** adalah aplikasi web monitoring gizi anak untuk Posyandu yang dirancang untuk membantu **Kader Posyandu** dan **Orang Tua** dalam memantau tumbuh kembang balita. Aplikasi ini menyediakan fitur dashboard analitik, pencatatan asupan makanan, monitoring perkembangan fisik, dan rekomendasi berbasis AI.

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

## 🌟 Fitur Utama

### 👩‍⚕️ Untuk Kader Posyandu
- 📊 **Dashboard Analitik** dengan grafik tren prevalensi gizi & donut chart distribusi status gizi
- 📋 **Daftar Balita Prioritas** dengan status gizi (Baik/Kurang/Buruk)
- 🔍 **Pencarian** berdasarkan nama anak atau orang tua
- 👁 **Detail Riwayat Anak** dengan tampilan timeline & grid 4 kolom
- 🏥 **Tombol Rujuk** ke Puskesmas untuk balita gizi buruk
- 📈 **Analisis Cerdas AI** untuk rekomendasi tindak lanjut

### 👨‍👩‍👧 Untuk Orang Tua
- 🍽️ **Pencatatan Asupan Harian** dengan tag makanan interaktif
- 📏 **Monitoring Perkembangan Fisik** (Tinggi & Berat Badan)
- 🤖 **Rekomendasi Makanan AI** berdasarkan budget & bahan tersedia
- 📖 **Detail Resep Lengkap** dengan bahan, langkah masak, info gizi, & tips
- 📅 **Riwayat Makanan** dengan dual layout (Timeline + Grid)
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

1. **Clone Repository**:
   ```bash
   git clone https://github.com/dariusatera/Frontend-Gizi-Anak.git
   cd Frontend-Gizi-Anak
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```

4. **Buka di Browser**:
   Akses `http://localhost:5173`

5. **Build untuk Production (opsional)**:
   ```bash
   npm run build
   ```

---

## 📂 Struktur Proyek

```text
Frontend-Gizi-Anak/
├── index.html                  # Landing page
├── daftar.html                 # Pendaftaran akun
├── login.html                  # Halaman login
├── kebijakan.html              # Kebijakan privasi
├── data-kader.html             # Form data kader
├── data-ortu.html              # Form data orang tua
├── data-dirianak.html          # Form data anak
├── data-pertumbuhan.html       # Form data pertumbuhan anak
├── review-kader.html           # Review data kader sebelum simpan
├── review-ortu.html            # Review data orang tua sebelum simpan
├── db-kader.html               # Dashboard kader
├── perhatian-kader.html        # Daftar balita prioritas (kader)
├── riwayat-kader.html          # Riwayat detail anak (kader)
├── db-ortu.html                # Dashboard orang tua
├── input-ortu.html             # Form input makanan (orang tua)
├── history-ortu.html           # Riwayat makanan (orang tua)
├── resep-detail.html           # Detail resep lengkap
├── vite.config.js              # Konfigurasi Vite
├── package.json                # Dependencies
├── package-lock.json           # Lock file npm
├── .gitignore                  # Git ignore file
├── README.md                   # Dokumentasi ini
│
├── public/
│   ├── favicon.svg             # Favicon aplikasi
│   ├── icons.svg               # Sprite icon
│   └── img/                    # Asset gambar & icon
│       ├── bb.png
│       ├── Email.png
│       ├── Eye.png
│       ├── Gembok.png
│       ├── icon-arrow-left.png
│       ├── icon-arrow-right.png
│       ├── icon-baik.png
│       ├── icon-buruk.png
│       ├── icon-dashboard.png
│       ├── icon-edit.png
│       ├── icon-history.png
│       ├── icon-kurang.png
│       ├── icon-location.png
│       ├── icon-ruler.png
│       ├── icon-scale.png
│       ├── icon-search.png
│       ├── icon-sparkle.png
│       ├── icon-total.png
│       ├── icon-user-dark.png
│       ├── NutrisiTumbuh-Logo.png
│       ├── only-logo.png
│       ├── orang.png
│       └── tgl.png
│
└── src/
    ├── main.js                 # Entry point aplikasi
    ├── globals.css             # Style global
    ├── style.css               # Style tambahan
    ├── styleguide.css          # Styleguide referensi
    ├── counter.js              # Contoh counter component
    │
    ├── daftar.css              # Style halaman daftar
    ├── login.css               # Style halaman login
    ├── kebijakan.css           # Style halaman kebijakan
    │
    ├── data-kader.css          # Style form data kader
    ├── data-ortu.css           # Style form data ortu
    ├── data-dirianak.css       # Style form data anak
    ├── data-pertumbuhan.css    # Style form pertumbuhan
    ├── review-kader.css        # Style review kader
    ├── review-ortu.css         # Style review ortu
    │
    ├── db-kader.js             # Logic Dashboard Kader
    ├── db-kader.css            # Style Dashboard Kader
    ├── perhatian-kader.js      # Logic Daftar Balita Prioritas
    ├── perhatian-kader.css     # Style Daftar Balita Prioritas
    ├── riwayat-kader.js        # Logic Riwayat Detail Anak (Kader)
    ├── riwayat-kader.css       # Style Riwayat Detail Anak (Kader)
    │
    ├── db-ortu.js              # Logic Dashboard Orang Tua
    ├── db-ortu.css             # Style Dashboard Orang Tua
    ├── input-ortu.js           # Logic Input Makanan (Orang Tua)
    ├── input-ortu.css          # Style Input Makanan (Orang Tua)
    ├── history-ortu.js         # Logic Riwayat Makanan (Orang Tua)
    ├── history-ortu.css        # Style Riwayat Makanan (Orang Tua)
    ├── resep-detail.js         # Logic Detail Resep
    ├── resep-detail.css        # Style Detail Resep
    │
    └── assets/                 # Asset internal
        ├── hero.png
        ├── javascript.svg
        └── vite.svg
```

---

## 🗺️ Peta Halaman & Alur Navigasi

### 🌐 Halaman Umum

```text
Beranda (/) → Daftar (/daftar.html) → Pilih Role
                                      ↓
                                Login (/login.html)
```

### 👩‍‍⚕️ Alur KADER

```text
Daftar (Role: Kader)
    ↓
Data Kader (/data-kader.html)
    ↓
Review Kader (/review-kader.html)
    ↓
Dashboard Kader (/db-kader.html)
    ↓
┌───────────────┬───────────────┐
↓               ↓
Klik baris anak    "Buka Seluruh
di tabel           Riwayat Anak"
↓                  ↓
Riwayat Anak   Perhatian Kader
(/riwayat-      (/perhatian-
kader.html)     kader.html)
                   ↓
                Klik baris anak
                   ↓
                Riwayat Anak
                (/riwayat-
                 kader.html)
```

### 👨‍👩‍👧 Alur ORANG TUA

```text
Daftar (Role: Orang Tua)
    ↓
Data Ortu (/data-ortu.html)
    ↓
Data Anak (/data-dirianak.html)
    ↓
Data Pertumbuhan (/data-pertumbuhan.html)
    ↓
Review Ortu (/review-ortu.html)
    ↓
Dashboard Ortu (/db-ortu.html)
    ↓
┌────────────────────┬────────────────────┐
↓                    ↓
Klik "Input"         Klik "History"
↓                    ↓
Input Makanan        History Ortu
(/input-ortu.html)   (/history-ortu.html)
↓                    ↓
Klik "Lihat Resep"   Pilih bulan di dropdown
↓                    ↓
Detail Resep         Grid 4 Kolom / Timeline
(/resep-detail.html)
```

---

## 🧪 Panduan Testing

### Test Case 1: Alur Pendaftaran Kader

1. Buka `http://localhost:5173`
2. Klik **"Daftar"** → Pilih role **Kader**
3. Isi form data kader di `/data-kader.html` → Klik **"Lanjut"**
4. Review data di `/review-kader.html` → Klik **"Simpan & Lanjutkan"**

* ✅ **Ekspektasi:** Harus masuk ke Dashboard Kader (`/db-kader.html`) dengan data terisi.

### Test Case 2: Alur Pendaftaran Orang Tua

1. Buka `http://localhost:5173`
2. Klik **"Daftar"** → Pilih role **Orang Tua**
3. Isi form data orang tua di `/data-ortu.html` → Klik **"Lanjut"**
4. Isi form data anak di `/data-dirianak.html` → Klik **"Lanjut"**
5. Isi form data pertumbuhan (TB/BB) di `/data-pertumbuhan.html` → Klik **"Lanjut"**
6. Review semua data di `/review-ortu.html` → Klik **"Simpan & Lanjutkan"**

* ✅ **Ekspektasi:** Harus masuk ke Dashboard Orang Tua (`/db-ortu.html`) dengan sapaan personal dan data anak yang sesuai.

### Test Case 3: Fitur Input Makanan (Orang Tua)

1. Dari Dashboard Ortu (`/db-ortu.html`), klik **"Input"** di navbar.
2. Di `/input-ortu.html`, pilih budget (misal Rp 15.000) dan minimal 1 bahan.
3. Klik **"Buat Rekomendasi Makanan"**.

* ✅ **Ekspektasi:** Harus muncul 3 menu card di bawah setelah loading.

4. Klik **"Lihat Resep"**.

* ✅ **Ekspektasi:** Harus masuk ke halaman detail resep (`/resep-detail.html`) lengkap.

### Test Case 4: Fitur History (Orang Tua & Kader)

1. Dari Dashboard Ortu, klik **"History"** atau akses `/history-ortu.html`
2. **Default:** Tampil Timeline dengan data mock.
3. Pilih bulan di dropdown → ✅ **Ekspektasi:** Harus switch ke Grid 4 Kolom.
4. Klik **"Kembali ke Tampilan Timeline"** → ✅ **Ekspektasi:** Kembali ke timeline.
5. **Test search:** Ketik nama makanan → ✅ **Ekspektasi:** Card yang mengandung kata kunci tetap jelas, lainnya redup.

### Test Case 5: Fitur Dashboard & Perhatian Kader

1. Login sebagai Kader atau selesaikan pendaftaran Kader.

* ✅ **Ekspektasi:** Dashboard (`/db-kader.html`) menampilkan summary cards, line chart, donut chart, dan tabel balita prioritas.

2. Dari Dashboard, klik tombol "Buka Seluruh Riwayat Anak" atau akses `/perhatian-kader.html`.

* ✅ **Ekspektasi:** Harus tampil daftar lengkap balita prioritas di `/perhatian-kader.html`.

3. Klik baris tabel untuk membuka `/riwayat-kader.html`.

* ✅ **Ekspektasi:** Harus masuk ke Riwayat Anak dengan data anak yang diklik.

4. Klik tombol "Rujuk" → muncul konfirmasi → alert sukses.

---

## 🎨 Design System

### 🎨 Warna Utama

| Nama | Kode Hex | Penggunaan |
| --- | --- | --- |
| **Primary Green** | `#006a38` | Tombol, aksen, link aktif |
| **Background** | `#E8F5E9` | Background halaman |
| **Navbar** | `rgba(232, 245, 233, 0.95)` | Navbar transparan |
| **Card Background** | `#ffffff` | Card, modal |
| **Border** | `#e5e7eb` | Border card & input |

### 🚦 Status Gizi

| Status | Background | Text Color |
| --- | --- | --- |
| **Gizi Baik** | `#dcfce7` | `#166534` |
| **Gizi Kurang** | `#fef3c7` | `#92400e` |
| **Gizi Buruk** | `#fee2e2` | `#991b1b` |

### 🔤 Typography

* **Plus Jakarta Sans:** Body text, UI elements
* **Poppins:** Heading, angka besar, brand name

---

## ⚠️ Catatan Penting

**Keterbatasan Prototype**

* **Data Mock:** Semua data saat ini adalah mock data (hardcoded). Belum terhubung ke backend/database.
* **SessionStorage:** Data hilang saat browser ditutup. Untuk testing berulang, perlu input form dari awal.
* **Chart.js:** Grafik di Dashboard Kader menggunakan Chart.js dari CDN. Pastikan internet aktif saat pertama kali load.
* **AI Rekomendasi:** Simulasi dengan `setTimeout(2000)`. Data menu yang muncul bersifat statis (mock).
* **Tidak ada autentikasi real:** Login hanya simulasi, tidak ada validasi password atau session token.

**Browser yang Direkomendasikan**

* ✅ Google Chrome (terbaru)
* ✅ Mozilla Firefox (terbaru)
* ✅ Microsoft Edge (terbaru)

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Berikut langkah-langkahnya:

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/FiturBaru`)
3. Commit perubahan (`git commit -m 'Menambahkan FiturBaru'`)
4. Push ke branch (`git push origin feature/FiturBaru`)
5. Buka Pull Request

---

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

*Dibuat dengan ❤️ untuk Monitoring Gizi Anak Posyandu*
