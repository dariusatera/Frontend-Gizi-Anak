/**
 * History Orang Tua - Riwayat Anak (DUAL LAYOUT)
 * File: history-ortu.js
 * 
 * LAYOUT 1 (Default): Timeline + AI + Catatan + Status Gizi
 * LAYOUT 2 (Setelah pilih bulan): Grid 4 Kolom
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ============================================
  // 1. AMBIL DATA DARI SESSION STORAGE
  // ============================================
  const dataOrtu = JSON.parse(sessionStorage.getItem('ortuDataStep1'));
  const dataAnak = JSON.parse(sessionStorage.getItem('anakDataStep2'));
  const dataGrowth = JSON.parse(sessionStorage.getItem('pertumbuhanDataStep3'));

  if (!dataAnak) {
    alert('Silakan lakukan pendaftaran data anak terlebih dahulu.');
    window.location.href = '/data-ortu.html';
    return;
  }

  // ============================================
  // 2. FUNGSI HITUNG UMUR
  // ============================================
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
    
    return tahun > 0 ? `${tahun} Tahun ${bulan} Bulan` : `${bulan} Bulan`;
  }

  // ============================================
  // 3. ISI DATA PROFIL KE HTML
  // ============================================
  const namaAnak = dataAnak.namaAnak || 'Anak NutriTumbuh';
  const namaDepan = namaAnak.split(' ')[0];
  
  document.getElementById('profile-name').textContent = namaAnak;
  document.getElementById('breadcrumb-name').textContent = namaAnak;
  document.getElementById('profile-age').textContent = hitungUmur(dataAnak.tanggalLahirAnak);
  document.getElementById('ai-child-name').textContent = namaDepan;
  
  if (dataGrowth) {
    document.getElementById('profile-bb').textContent = dataGrowth.beratBadan || '-';
    document.getElementById('profile-tb').textContent = dataGrowth.tinggiBadan || '-';
  }
  
  if (dataOrtu) {
    document.getElementById('profile-ibu').textContent = dataOrtu.namaLengkap || '-';
  }

  // ============================================
  // 4. MOCK DATA TIMELINE (LAYOUT 1)
  // ============================================
  const timelineData = [
    {
      tanggal: 'Hari Ini, 12 Okt 2023',
      current: true,
      pagi: 'Bubur Ayam, Telur Rebus',
      siang: 'Nasi Tim, Sayur Bayam, Ikan',
      malam: ''
    },
    {
      tanggal: 'Kemarin, 11 Okt 2023',
      current: false,
      pagi: 'Nasi Lembek, Tahu, Wortel',
      siang: 'Macaroni Schotel, Susu',
      malam: 'Nasi Tim, Ayam Cincang'
    },
    {
      tanggal: '10 Okt 2023',
      current: false,
      pagi: 'Nasi Lembek, Tahu, Wortel',
      siang: 'Macaroni Schotel, Susu',
      malam: 'Nasi Tim, Ayam Cincang'
    },
    {
      tanggal: '09 Okt 2023',
      current: false,
      pagi: 'Nasi Lembek, Tahu, Wortel',
      siang: 'Macaroni Schotel, Susu',
      malam: 'Nasi Tim, Ayam Cincang'
    },
    {
      tanggal: '08 Okt 2023',
      current: false,
      pagi: 'Sereal oat, susu',
      siang: 'Nasi, Telur rebus, Air putih',
      malam: 'Bubur sumsum, Pisang, Jus Apel'
    },
    {
      tanggal: '07 Okt 2023',
      current: false,
      pagi: 'Nasi, Sayur sop, Telur rebus',
      siang: 'Bubur Ayam, Susu',
      malam: 'Sereal, Susu instan'
    },
    {
      tanggal: '06 Okt 2023',
      current: false,
      pagi: 'Bubur sum-sum, Air putih',
      siang: 'Nasi, Telur orak-arik, Susu',
      malam: 'Pisan rebus, Jus alpukat'
    }
  ];

  // ============================================
  // 5. RENDER TIMELINE (LAYOUT 1)
  // ============================================
  function renderTimeline(data) {
    const container = document.getElementById('timeline-container');
    container.innerHTML = '';

    data.forEach((day) => {
      const item = document.createElement('div');
      item.className = `timeline-item ${day.current ? 'current' : ''}`;
      
      item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-date">${day.tanggal}</div>
        <div class="meals-grid">
          <div class="meal-card">
            <div class="meal-header">
              <span class="meal-icon">🌅</span>
              <span class="meal-type">Pagi</span>
            </div>
            <div class="meal-content ${!day.pagi ? 'empty' : ''}">${day.pagi || '-'}</div>
          </div>
          <div class="meal-card">
            <div class="meal-header">
              <span class="meal-icon">️</span>
              <span class="meal-type">Siang</span>
            </div>
            <div class="meal-content ${!day.siang ? 'empty' : ''}">${day.siang || '-'}</div>
          </div>
          <div class="meal-card">
            <div class="meal-header">
              <span class="meal-icon">🌙</span>
              <span class="meal-type">Malam</span>
            </div>
            <div class="meal-content ${!day.malam ? 'empty' : ''}">${day.malam || 'Belum diinput'}</div>
          </div>
        </div>
      `;
      container.appendChild(item);
    });
  }

  // ============================================
  // 6. MOCK DATA GRID (LAYOUT 2)
  // ============================================
  function getMockDataForMonth(bulan) {
    const templates = [
      { pagi: "Bubur ayam, telur rebus", siang: "Nasi tim, sayur bayam, ikan", malam: "Nasi tim, ayam cincang" },
      { pagi: "Nasi lembek, tahu, wortel", siang: "Macaroni schotel, susu", malam: "Nasi tim, ayam cincang" },
      { pagi: "Bubur instan, ayam suwir", siang: "Nasi, sayur sop, tempe", malam: "Nasi, sayur sop, ayam suwir" },
      { pagi: "Nasi, tahu, brokoli rebus", siang: "Nasi, telur orak-arik", malam: "Bubur sum-sum" },
      { pagi: "Sereal oat, susu", siang: "Nasi, telur rebus", malam: "Jus buah alpukat" },
      { pagi: "Roti, susu", siang: "Nasi, sayur bayam, telur rebus", malam: "Pisang, susu" },
      { pagi: "Bubur kacang hijau, pisang", siang: "Nasi, tempe, sayur kacang panjang", malam: "Bubur sum-sum, pisang" },
    ];

    const data = [];
    const bulanInfo = {
      '2023-09': { nama: 'Sep', tahun: '2023', hari: 30 },
      '2023-08': { nama: 'Agu', tahun: '2023', hari: 31 },
      '2023-07': { nama: 'Jul', tahun: '2023', hari: 31 },
      '2023-06': { nama: 'Jun', tahun: '2023', hari: 30 },
      '2023-05': { nama: 'Mei', tahun: '2023', hari: 31 },
      '2023-04': { nama: 'Apr', tahun: '2023', hari: 30 },
      '2023-03': { nama: 'Mar', tahun: '2023', hari: 31 },
      '2023-02': { nama: 'Feb', tahun: '2023', hari: 28 },
      '2023-01': { nama: 'Jan', tahun: '2023', hari: 31 },
    };

    const info = bulanInfo[bulan] || { nama: 'Sep', tahun: '2023', hari: 30 };

    for (let i = 1; i <= info.hari; i++) {
      const template = templates[(i - 1) % templates.length];
      const tanggalStr = `${String(i).padStart(2, '0')} ${info.nama} ${info.tahun}`;
      
      data.push({
        id: `${bulan}-${String(i).padStart(2, '0')}`,
        tanggal: tanggalStr,
        tanggalFull: `${info.tahun}-${bulan.split('-')[1]}-${String(i).padStart(2, '0')}`,
        pagi: template.pagi,
        siang: template.siang,
        malam: template.malam,
        lengkap: true
      });
    }

    return data;
  }

  // ============================================
  // 7. RENDER GRID (LAYOUT 2)
  // ============================================
  function renderDailyLog(data, bulanLabel) {
    const gridContainer = document.getElementById('daily-log-grid');
    gridContainer.innerHTML = '';
    document.getElementById('grid-bulan-label').textContent = bulanLabel;

    if (data.length === 0) {
      gridContainer.innerHTML = '<p style="text-align: center; color: #6b7280; grid-column: 1/-1; padding: 40px;">Tidak ada data untuk bulan ini.</p>';
      return;
    }

    data.forEach((day) => {
      const card = document.createElement('div');
      card.className = 'daily-card';
      card.setAttribute('data-id', day.id);
      
      card.innerHTML = `
        <div class="daily-header">
          <div>
            <div class="daily-date">${day.tanggal}</div>
            <div class="daily-meals-info">Pagi • Siang • Malam</div>
          </div>
          <button class="btn-lengkap" data-id="${day.id}">
            ${day.lengkap ? '✓ Lengkap' : 'Lengkap'}
          </button>
        </div>
        
        <div class="meal-item">
          <div class="meal-radio ${day.pagi ? 'checked' : ''}" data-meal="pagi" data-id="${day.id}"></div>
          <div class="meal-info">
            <div class="meal-type">Pagi</div>
            <div class="meal-food ${!day.pagi ? 'empty' : ''}">${day.pagi || '-'}</div>
          </div>
        </div>
        
        <div class="meal-item">
          <div class="meal-radio ${day.siang ? 'checked' : ''}" data-meal="siang" data-id="${day.id}"></div>
          <div class="meal-info">
            <div class="meal-type">Siang</div>
            <div class="meal-food ${!day.siang ? 'empty' : ''}">${day.siang || '-'}</div>
          </div>
        </div>
        
        <div class="meal-item">
          <div class="meal-radio ${day.malam ? 'checked' : ''}" data-meal="malam" data-id="${day.id}"></div>
          <div class="meal-info">
            <div class="meal-type">Malam</div>
            <div class="meal-food ${!day.malam ? 'empty' : ''}">${day.malam || '-'}</div>
          </div>
        </div>
      `;
      gridContainer.appendChild(card);
    });

    attachGridEventListeners();
  }

  // ============================================
  // 8. EVENT LISTENERS GRID
  // ============================================
  function attachGridEventListeners() {
    document.querySelectorAll('.btn-lengkap').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        console.log('Toggle lengkap untuk:', id);
        e.target.textContent = e.target.textContent.includes('✓') ? 'Lengkap' : '✓ Lengkap';
      });
    });

    document.querySelectorAll('.meal-radio').forEach(radio => {
      radio.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const meal = e.target.getAttribute('data-meal');
        console.log(`Toggle ${meal} untuk:`, id);
        e.target.classList.toggle('checked');
      });
    });
  }

  // ============================================
  // 9. TOGGLE ANTARA TIMELINE DAN GRID
  // ============================================
  const filterBulan = document.getElementById('filter-bulan');
  const timelineLayout = document.getElementById('timeline-layout');
  const gridLayout = document.getElementById('grid-layout');

  if (filterBulan) {
    filterBulan.addEventListener('change', (e) => {
      const bulanTerpilih = e.target.value;
      
      if (bulanTerpilih) {
        // TAMPILKAN GRID, SEMBUNYIKAN TIMELINE
        timelineLayout.style.display = 'none';
        gridLayout.style.display = 'block';
        
        const bulanLabel = e.target.options[e.target.selectedIndex].text;
        const mockData = getMockDataForMonth(bulanTerpilih);
        renderDailyLog(mockData, bulanLabel);
      } else {
        // KEMBALI KE TIMELINE
        timelineLayout.style.display = 'block';
        gridLayout.style.display = 'none';
      }
    });
  }

  // Tombol Kembali ke Timeline
  const btnKembaliTimeline = document.getElementById('btn-kembali-timeline');
  if (btnKembaliTimeline) {
    btnKembaliTimeline.addEventListener('click', () => {
      timelineLayout.style.display = 'block';
      gridLayout.style.display = 'none';
      filterBulan.value = ''; // Reset dropdown
    });
  }

  // ============================================
  // 10. SEARCH MAKANAN (Untuk kedua layout)
  // ============================================
  const searchInput = document.getElementById('search-makanan');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase();
      
      // Search di Timeline
      document.querySelectorAll('.meal-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(keyword) || keyword === '') {
          card.style.opacity = '1';
        } else {
          card.style.opacity = '0.3';
        }
      });

      // Search di Grid
      document.querySelectorAll('.daily-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(keyword) || keyword === '') {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.opacity = '0.3';
        }
      });
    });
  }

  // ============================================
  // 11. SIMPAN CATATAN
  // ============================================
  const btnSaveNote = document.getElementById('btn-save-note');
  if (btnSaveNote) {
    btnSaveNote.addEventListener('click', () => {
      const textarea = document.getElementById('daily-note');
      const noteText = textarea.value.trim();
      
      if (!noteText) {
        alert('Catatan tidak boleh kosong!');
        return;
      }

      const originalText = btnSaveNote.innerHTML;
      btnSaveNote.innerHTML = '<span>⏳</span> Menyimpan...';
      btnSaveNote.disabled = true;

      setTimeout(() => {
        alert(`Catatan untuk ${namaAnak} berhasil disimpan!`);
        textarea.value = '';
        btnSaveNote.innerHTML = originalText;
        btnSaveNote.disabled = false;
      }, 1000);
    });
  }

  // ============================================
  // 12. TOMBOL CETAK
  // ============================================
  const btnCetakRiwayat = document.getElementById('btn-cetak-riwayat');
  const btnCetakLaporan = document.getElementById('btn-cetak-laporan');
  
  const handlePrint = () => {
    const bulan = filterBulan.value ? filterBulan.options[filterBulan.selectedIndex].text : 'Semua Bulan';
    console.log(`Mencetak riwayat ${namaAnak} untuk ${bulan}`);
    alert(`Mencetak riwayat ${namaAnak} untuk ${bulan}`);
    // window.print();
  };
  
  if (btnCetakRiwayat) btnCetakRiwayat.addEventListener('click', handlePrint);
  if (btnCetakLaporan) btnCetakLaporan.addEventListener('click', handlePrint);

  // ============================================
  // 13. INITIAL RENDER - TAMPILKAN TIMELINE
  // ============================================
  renderTimeline(timelineData);
});