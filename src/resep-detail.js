/**
 * Detail Resep - Sesuai Figma
 * File: resep-detail.js
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ============================================
  // 1. AMBIL DATA DARI SESSION STORAGE
  // ============================================
  const resepData = JSON.parse(sessionStorage.getItem('selectedResep'));
  const dataAnak = JSON.parse(sessionStorage.getItem('anakDataStep2'));
  const namaAnak = dataAnak?.namaAnak || 'Si Kecil';

  if (!resepData) {
    alert('Data resep tidak ditemukan.');
    window.location.href = '/input-ortu.html';
    return;
  }

  // ============================================
  // 2. DATA LENGKAP SETIAP RESEP (MOCK)
  // ============================================
  const resepLengkap = {
    1: {
      nama: 'Omelet Bayam & Roti Gandum',
      kalori: 320,
      protein: 15,
      lemak: 12,
      karbo: 38,
      serat: 4,
      waktu: '15 Menit',
      kesulitan: 'Mudah',
      kategori: 'Cocok Balita',
      gambar: '/img/omelet.jpg',
      bahan: [
        { nama: 'Telur ayam', jumlah: '2 butir / ±120 gram' },
        { nama: 'Bayam', jumlah: '1 genggam / ±30 gram' },
        { nama: 'Roti gandum', jumlah: '2 lembar / ±60 gram' },
        { nama: 'Minyak', jumlah: '1 sendok teh / ±5 gram' }
      ],
      langkah: [
        { judul: 'Siapkan bahan', waktu: '3 menit', desc: 'Cuci bayam hingga bersih di bawah air mengalir, kemudian tiriskan. Siapkan telur ayam dan keluarkan lembaran roti gandum.' },
        { judul: 'Buat adonan', waktu: '4 menit', desc: 'Kocok telur ayam di wadah bersih hingga berbusa tipis. Campurkan bayam yang sudah dipotong kecil-kecil, lalu tambahkan sedikit garam jika diperlukan.' },
        { judul: 'Masak omelet', waktu: '6 menit', desc: 'Panaskan satu sendok teh minyak di wajan anti lengket. Tuangkan adonan telur dan bayam, masak dengan api kecil hingga kedua sisi matang merata.' },
        { judul: 'Sajikan', waktu: '2 menit', desc: 'Sajikan omelet hangat bersama roti gandum. Pastikan memotong makanan menjadi ukuran kecil-kecil yang aman dari risiko tersedak bagi balita Anda.' }
      ]
    },
    2: {
      nama: 'Bubur Kacang Hijau Susu',
      kalori: 350,
      protein: 14,
      lemak: 6,
      karbo: 55,
      serat: 6,
      waktu: '30 Menit',
      kesulitan: 'Mudah',
      kategori: 'Cocok Balita',
      gambar: '/img/bubur.jpg',
      bahan: [
        { nama: 'Kacang hijau', jumlah: '100 gram' },
        { nama: 'Beras', jumlah: '60 gram' },
        { nama: 'Susu cair', jumlah: '150 ml' },
        { nama: 'Gula merah', jumlah: '1 sdm / ±15 gram' },
        { nama: 'Daun pandan', jumlah: '1 lembar' }
      ],
      langkah: [
        { judul: 'Rendam kacang hijau', waktu: '5 menit', desc: 'Rendam kacang hijau dalam air bersih selama beberapa jam agar lebih cepat empuk saat dimasak.' },
        { judul: 'Rebus kacang hijau', waktu: '10 menit', desc: 'Rebus kacang hijau dengan air secukupnya hingga empuk. Tiriskan jika perlu.' },
        { judul: 'Masak bubur', waktu: '10 menit', desc: 'Tambahkan beras yang sudah dicuci, masak hingga menjadi bubur kental. Masukkan daun pandan untuk aroma.' },
        { judul: 'Tambahkan susu', waktu: '5 menit', desc: 'Tuang susu cair, aduk rata dan masak dengan api kecil selama 5 menit. Angkat daun pandan dan sajikan hangat.' }
      ]
    },
    3: {
      nama: 'Pancake Pisang Oatmeal',
      kalori: 310,
      protein: 10,
      lemak: 8,
      karbo: 45,
      serat: 5,
      waktu: '20 Menit',
      kesulitan: 'Mudah',
      kategori: 'Cocok Balita',
      gambar: '/img/pancake.jpg',
      bahan: [
        { nama: 'Pisang matang', jumlah: '1 buah / ±80 gram' },
        { nama: 'Oatmeal', jumlah: '40 gram' },
        { nama: 'Telur', jumlah: '1 butir / ±50 gram' },
        { nama: 'Susu', jumlah: '50 ml' },
        { nama: 'Madu', jumlah: '1 sendok teh / ±5 ml' }
      ],
      langkah: [
        { judul: 'Haluskan pisang', waktu: '3 menit', desc: 'Haluskan pisang matang dengan garpu hingga lembut seperti pasta. Semakin matang pisang, semakin manis alami rasanya.' },
        { judul: 'Campurkan bahan', waktu: '5 menit', desc: 'Campurkan oatmeal, telur, dan susu ke dalam pisang halus. Aduk rata hingga menjadi adonan yang kental.' },
        { judul: 'Masak pancake', waktu: '8 menit', desc: 'Panaskan wajan anti lengket dengan api kecil. Tuang 1 sendok makan adonan, masak 2-3 menit hingga muncul gelembung, lalu balik.' },
        { judul: 'Sajikan', waktu: '4 menit', desc: 'Sajikan pancake hangat dengan drizzle madu di atasnya. Pastikan madu hanya untuk anak di atas 1 tahun.' }
      ]
    }
  };

  const data = resepLengkap[resepData.id] || resepLengkap[1];

  // ============================================
  // 3. RENDER HEADER
  // ============================================
  document.getElementById('resep-title').textContent = data.nama;
  document.getElementById('resep-kalori').textContent = `±${data.kalori} kkal`;
  document.getElementById('resep-waktu').textContent = data.waktu;
  document.getElementById('resep-kesulitan').textContent = data.kesulitan;
  document.getElementById('resep-kategori').textContent = data.kategori;
  document.getElementById('resep-image').src = data.gambar;

  // ============================================
  // 4. RENDER BAHAN
  // ============================================
  document.getElementById('bahan-total').textContent = `Total: ${data.bahan.length} bahan`;
  
  const bahanList = document.getElementById('bahan-list');
  bahanList.innerHTML = '';
  data.bahan.forEach(bahan => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="bahan-bullet"></div>
      <span class="bahan-nama">${bahan.nama}</span>
      <span class="bahan-jumlah">${bahan.jumlah}</span>
      <span class="bahan-status">✓ Tersedia di rumah</span>
    `;
    bahanList.appendChild(li);
  });

  // ============================================
  // 5. RENDER GIZI
  // ============================================
  document.getElementById('gizi-energi').textContent = `${data.kalori} kkal`;
  document.getElementById('gizi-protein').textContent = `${data.protein} g`;
  document.getElementById('gizi-karbo').textContent = `${data.karbo} g`;
  document.getElementById('gizi-lemak').textContent = `${data.lemak} g`;
  document.getElementById('gizi-serat').textContent = `${data.serat} g`;

  // Update lebar progress bar (dinamis)
  const maxValues = { energi: 400, protein: 30, karbo: 60, lemak: 20, serat: 10 };
  document.querySelector('.gizi-bar-fill.calorie').style.width = `${(data.kalori / maxValues.energi) * 100}%`;
  document.querySelector('.gizi-bar-fill.protein').style.width = `${(data.protein / maxValues.protein) * 100}%`;
  document.querySelector('.gizi-bar-fill.carb').style.width = `${(data.karbo / maxValues.karbo) * 100}%`;
  document.querySelector('.gizi-bar-fill.fat').style.width = `${(data.lemak / maxValues.lemak) * 100}%`;
  document.querySelector('.gizi-bar-fill.fiber').style.width = `${(data.serat / maxValues.serat) * 100}%`;

  // ============================================
  // 6. RENDER LANGKAH MEMASAK
  // ============================================
  const timeline = document.getElementById('langkah-timeline');
  timeline.innerHTML = '';
  data.langkah.forEach((langkah, index) => {
    const item = document.createElement('div');
    item.className = 'langkah-item';
    item.innerHTML = `
      <div class="langkah-number">${index + 1}</div>
      <div class="langkah-header">
        <h3 class="langkah-title">${langkah.judul}</h3>
        <span class="langkah-waktu">${langkah.waktu}</span>
      </div>
      <p class="langkah-desc">${langkah.desc}</p>
    `;
    timeline.appendChild(item);
  });
});