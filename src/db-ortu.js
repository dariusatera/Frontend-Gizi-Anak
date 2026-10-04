/**
 * Dashboard Orang Tua - Dynamic Controller
 * File: db-ortu.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. AMBIL DATA DARI SESSION STORAGE
  // Kunci ini HARUS SAMA PERSIS dengan yang disimpan di Step 1, 2, dan 3
  const dataOrtu = JSON.parse(sessionStorage.getItem('ortuDataStep1'));
  const dataAnak = JSON.parse(sessionStorage.getItem('anakDataStep2'));
  const dataGrowth = JSON.parse(sessionStorage.getItem('pertumbuhanDataStep3'));

  // 2. FUNGSI HITUNG UMUR ANAK
  function hitungUmur(tanggalLahir) {
    if (!tanggalLahir) return "-";
    const lahir = new Date(tanggalLahir);
    const hariIni = new Date();
    let tahun = hariIni.getFullYear() - lahir.getFullYear();
    let bulan = hariIni.getMonth() - lahir.getMonth();
    
    if (bulan < 0 || (bulan === 0 && hariIni.getDate() < lahir.getDate())) {
      tahun--;
      bulan += 12;
    }
    
    if (tahun > 0) {
      return `${tahun} Tahun ${bulan} Bulan`;
    } else {
      return `${bulan} Bulan`;
    }
  }

  // 3. ISI DATA KE DASHBOARD
  if (dataOrtu && dataOrtu.namaLengkap) {
    document.getElementById('greeting-parent').textContent = dataOrtu.namaLengkap;
  }

  if (dataAnak) {
    const namaAnak = dataAnak.namaAnak || 'Si Kecil';
    const namaDepan = namaAnak.split(' ')[0]; // Ambil nama depan saja untuk sapaan AI

    document.getElementById('child-name').textContent = namaAnak;
    document.getElementById('child-name-inline').textContent = namaDepan;
    document.getElementById('child-name-analysis').textContent = namaDepan;
    document.getElementById('child-age').textContent = hitungUmur(dataAnak.tanggalLahirAnak);
  }

  if (dataGrowth) {
    document.getElementById('tb-value').textContent = dataGrowth.tinggiBadan || '-';
    document.getElementById('bb-value').textContent = dataGrowth.beratBadan || '-';
  }

  // ==========================================
  // FITUR INTERAKTIF DASHBOARD (TETAP SAMA)
  // ==========================================

  // 4. Hapus food tag saat tombol × diklik
  document.querySelectorAll('.tag-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.parentElement;
      tag.style.opacity = '0';
      tag.style.transform = 'scale(0.8)';
      setTimeout(() => tag.remove(), 200);
    });
  });

  // 5. Tambah makanan dari input
  const foodInput = document.getElementById('food-input');
  const foodTags = document.getElementById('food-tags');
  
  if (foodInput && foodTags) {
    foodInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && foodInput.value.trim()) {
        const foodName = foodInput.value.trim();
        const tag = document.createElement('span');
        tag.className = 'food-tag';
        tag.innerHTML = `${foodName} <button class="tag-remove" data-food="${foodName}">×</button>`;
        foodTags.appendChild(tag);
        
        tag.querySelector('.tag-remove').addEventListener('click', () => {
          tag.style.opacity = '0';
          tag.style.transform = 'scale(0.8)';
          setTimeout(() => tag.remove(), 200);
        });
        foodInput.value = '';
      }
    });
  }

  // 6. Tombol Hitung Makanan
  const btnCalculate = document.getElementById('btn-calculate');
  if (btnCalculate) {
    btnCalculate.addEventListener('click', () => {
      const tags = foodTags.querySelectorAll('.food-tag');
      if (tags.length === 0) {
        alert('Silakan tambahkan makanan terlebih dahulu!');
        return;
      }
      const foods = Array.from(tags).map(tag => tag.textContent.replace('×', '').trim());
      alert(`Berhasil mencatat ${foods.length} makanan: ${foods.join(', ')}`);
    });
  }
});