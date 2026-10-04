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
├── vite.config.js              # Konfigurasi Vite
├── package.json                # Dependencies
├── README.md                   # Dokumentasi ini
│
├── public/
│   └── img/                    # Asset gambar & icon
│
└── src/
    ├── globals.css             # Style global
    ├── main.js                 # Entry point
    │
    ├── db-kader.js             # Logic Dashboard Kader
    ├── db-kader.css
    ├── perhatian-kader.js      # Logic Daftar Balita
    ├── perhatian-kader.css
    ├── riwayat-kader.js        # Logic Riwayat per Anak
    ├── riwayat-kader.css
    │
    ├── db-ortu.js              # Logic Dashboard Ortu
    ├── db-ortu.css
    ├── input-ortu.js           # Logic Input Makanan
    ├── input-ortu.css
    ├── resep-detail.js         # Logic Detail Resep
    ├── resep-detail.css
    ├── history-ortu.js         # Logic History Ortu
    └── history-ortu.css
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
Data Kader → Review Kader → Dashboard Kader
                                ↓
                ┌───────────────┴───────────────┐
                ↓                               ↓
        Klik baris anak di tabel        "Buka Seluruh Riwayat Anak"
                ↓                               ↓
            Riwayat Anak                    Perhatian Kader
        (riwayat-kader.html)                    ↓
                                            Klik baris anak
                                                ↓
                                            Riwayat Anak
```

### 👨‍👩‍👧 Alur ORANG TUA

```text
Daftar (Role: Orang Tua)
    ↓
Data Ortu → Data Anak → Data Pertumbuhan → Review Ortu
                                                ↓
                                            Dashboard Ortu
                                                ↓
                                ┌───────────────┴───────────────┐
                                ↓                               ↓
                        Klik "Input"                    Klik "History"
                                ↓                               ↓
                        Input Makanan                   History Ortu
                                ↓                               ↓
                        Klik "Lihat Resep"          Pilih bulan di dropdown
                                ↓                               ↓
                        Detail Resep                    Grid 4 Kolom
```

---

## 🧪 Panduan Testing

### Test Case 1: Alur Pendaftaran Kader

1. Buka `http://localhost:5173`
2. Klik **"Daftar"** → Pilih role **Kader**
3. Isi form data kader → Klik **"Lanjut"**
4. Review data → Klik **"Simpan & Lanjutkan"**

* ✅ **Ekspektasi:** Harus masuk ke Dashboard Kader dengan data terisi.

### Test Case 2: Alur Pendaftaran Orang Tua

1. Buka `http://localhost:5173`
2. Klik **"Daftar"** → Pilih role **Orang Tua**
3. Isi form data orang tua → Klik **"Lanjut"**
4. Isi form data anak → Klik **"Lanjut"**
5. Isi form data pertumbuhan (TB/BB) → Klik **"Lanjut"**
6. Review semua data → Klik **"Simpan & Lanjutkan"**

* ✅ **Ekspektasi:** Harus masuk ke Dashboard Orang Tua dengan sapaan personal dan data anak yang sesuai.

### Test Case 3: Fitur Input Makanan (Orang Tua)

1. Dari Dashboard Ortu, klik **"Input"** di navbar.
2. Pilih budget (misal Rp 15.000) dan minimal 1 bahan.
3. Klik **"Buat Rekomendasi Makanan"**.

* ✅ **Ekspektasi:** Harus muncul 3 menu card di bawah setelah loading.

4. Klik **"Lihat Resep"**.

* ✅ **Ekspektasi:** Harus masuk ke halaman detail resep lengkap.

### Test Case 4: Fitur History (Orang Tua & Kader)

1. **Default:** Tampil Timeline dengan data mock.
2. Pilih bulan di dropdown → ✅ **Ekspektasi:** Harus switch ke Grid 4 Kolom.
3. Klik **"Kembali ke Tampilan Timeline"** → ✅ **Ekspektasi:** Kembali ke timeline.
4. **Test search:** Ketik nama makanan → ✅ **Ekspektasi:** Card yang mengandung kata kunci tetap jelas, lainnya redup.

### Test Case 5: Fitur Dashboard & Perhatian Kader

1. Login sebagai Kader atau selesaikan pendaftaran Kader.

* ✅ **Ekspektasi:** Dashboard menampilkan summary cards, line chart, donut chart, dan tabel balita prioritas.

2. Klik baris tabel atau "Buka Seluruh Riwayat Anak".

* ✅ **Ekspektasi:** Harus masuk ke Riwayat Anak dengan data anak yang diklik.

3. Klik tombol "Rujuk" → muncul konfirmasi → alert sukses.

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
