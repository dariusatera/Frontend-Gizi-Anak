/**
 * Riwayat Anak Kader - Dual Layout (Timeline + Grid)
 * File: riwayat-kader.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // 1. AMBIL DATA ANAK
  // ============================================
  const urlParams = new URLSearchParams(window.location.search);
  const childId = urlParams.get('id');
  
  let selectedChild = JSON.parse(sessionStorage.getItem('selectedAnakKader'));
  
  if (childId && !selectedChild) {
    const MOCK_CHILDREN = [
      { id: 'child_001', nama: 'Aditya Pratama', initials: 'AD', usia: 18, jenisKelamin: 'L', namaOrangTua: 'Ibu Ratna S.', wilayah: 'Dusun Kenanga RT 02', status: 'Gizi Buruk', bb: 8.5, tb: 72 },
      { id: 'child_002', nama: 'Kirana Larasati', initials: 'KL', usia: 24, jenisKelamin: 'P', namaOrangTua: 'Ibu Dewi Wardani', wilayah: 'Dusun Mawar RT 01', status: 'Gizi Buruk', bb: 9.2, tb: 78 },
      { id: 'child_003', nama: 'Fauzan Rahman', initials: 'FR', usia: 11, jenisKelamin: 'L', namaOrangTua: 'Ibu Halimah', wilayah: 'Dusun Sukamaju RT 04', status: 'Gizi Kurang', bb: 7.8, tb: 68 },
    ];
    selectedChild = MOCK_CHILDREN.find(c => c.id === childId);
  }

  if (!selectedChild) {
    alert('Data anak tidak ditemukan.');
    window.location.href = '/perhatian-kader.html';
    return;
  }

  // ============================================
  // 2. ISI DATA PROFIL
  // ============================================
  document.getElementById('breadcrumb-name').textContent = selectedChild.nama;
  document.getElementById('profile-name').textContent = selectedChild.nama;
  document.getElementById('child-avatar').textContent = selectedChild.initials || selectedChild.nama.substring(0, 2).toUpperCase();
  document.getElementById('profile-usia').textContent = selectedChild.usia;
  document.getElementById('profile-bb').textContent = selectedChild.bb || '-';
  document.getElementById('profile-tb').textContent = selectedChild.tb || '-';
  document.getElementById('profile-ibu').textContent = selectedChild.namaOrangTua;
  document.getElementById('profile-wilayah').textContent = selectedChild.wilayah;
  document.getElementById('ai-child-name').textContent = selectedChild.nama.split(' ')[0];
  
  const statusEl = document.getElementById('profile-status');
  const statusTextEl = document.getElementById('profile-status-text');
  statusTextEl.textContent = selectedChild.status;
  
  if (selectedChild.status === 'Gizi Baik') {
    statusEl.className = 'status-value baik';
  } else if (selectedChild.status === 'Gizi Kurang') {
    statusEl.className = 'status-value kurang';
  } else {
    statusEl.className = 'status-value buruk';
  }

  // ============================================
  // 3. MOCK DATA TIMELINE
  // ============================================
  const timelineData = [
    { tanggal: 'Hari Ini, 12 Okt 2023', current: true, pagi: 'Bubur Ayam, Telur Rebus', siang: 'Nasi Tim, Sayur Bayam, Ikan', malam: '' },
    { tanggal: 'Kemarin, 11 Okt 2023', current: false, pagi: 'Nasi Lembek, Tahu, Wortel', siang: 'Macaroni Schotel, Susu', malam: 'Nasi Tim, Ayam Cincang' },
    { tanggal: '10 Okt 2023', current: false, pagi: 'Nasi Lembek, Tahu, Wortel', siang: 'Macaroni Schotel, Susu', malam: 'Nasi Tim, Ayam Cincang' },
    { tanggal: '09 Okt 2023', current: false, pagi: 'Nasi Lembek, Tahu, Wortel', siang: 'Macaroni Schotel, Susu', malam: 'Nasi Tim, Ayam Cincang' },
  ];

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
              <span class="meal-icon">☀️</span>
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
  // 4. MOCK DATA GRID
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
      '2023-10': { nama: 'Okt', tahun: '2023', hari: 12 },
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

    const info = bulanInfo[bulan] || { nama: 'Okt', tahun: '2023', hari: 12 };

    for (let i = 1; i <= info.hari; i++) {
      const template = templates[(i - 1) % templates.length];
      const tanggalStr = `${String(i).padStart(2, '0')} ${info.nama} ${info.tahun}`;
      
      data.push({
        id: `${bulan}-${String(i).padStart(2, '0')}`,
        tanggal: tanggalStr,
        pagi: template.pagi,
        siang: template.siang,
        malam: template.malam,
        lengkap: true
      });
    }

    return data;
  }

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
          <div class="meal-radio checked" data-meal="pagi" data-id="${day.id}"></div>
          <div class="meal-info">
            <div class="meal-type">Pagi</div>
            <div class="meal-food">${day.pagi || '-'}</div>
          </div>
        </div>
        
        <div class="meal-item">
          <div class="meal-radio checked" data-meal="siang" data-id="${day.id}"></div>
          <div class="meal-info">
            <div class="meal-type">Siang</div>
            <div class="meal-food">${day.siang || '-'}</div>
          </div>
        </div>
        
        <div class="meal-item">
          <div class="meal-radio checked" data-meal="malam" data-id="${day.id}"></div>
          <div class="meal-info">
            <div class="meal-type">Malam</div>
            <div class="meal-food">${day.malam || '-'}</div>
          </div>
        </div>
      `;
      gridContainer.appendChild(card);
    });

    attachGridEventListeners();
  }

  function attachGridEventListeners() {
    document.querySelectorAll('.btn-lengkap').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.target.textContent = e.target.textContent.includes('✓') ? 'Lengkap' : '✓ Lengkap';
      });
    });

    document.querySelectorAll('.meal-radio').forEach(radio => {
      radio.addEventListener('click', (e) => {
        e.target.classList.toggle('checked');
      });
    });
  }

  // ============================================
  // 5. TOGGLE ANTARA TIMELINE DAN GRID
  // ============================================
  const filterBulan = document.getElementById('filter-bulan');
  const timelineLayout = document.getElementById('timeline-layout');
  const gridLayout = document.getElementById('grid-layout');

  if (filterBulan) {
    filterBulan.addEventListener('change', (e) => {
      const bulanTerpilih = e.target.value;
      
      if (bulanTerpilih) {
        timelineLayout.style.display = 'none';
        gridLayout.style.display = 'block';
        
        const bulanLabel = e.target.options[e.target.selectedIndex].text;
        const mockData = getMockDataForMonth(bulanTerpilih);
        renderDailyLog(mockData, bulanLabel);
      } else {
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
      filterBulan.value = '';
    });
  }

  // ============================================
  // 6. SEARCH
  // ============================================
  const searchInput = document.getElementById('search-makanan');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase();
      
      document.querySelectorAll('.meal-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.opacity = text.includes(keyword) || keyword === '' ? '1' : '0.3';
      });

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
  // 7. CETAK
  // ============================================
  const btnCetak = document.getElementById('btn-cetak-riwayat');
  if (btnCetak) {
    btnCetak.addEventListener('click', () => {
      const bulan = filterBulan.value ? filterBulan.options[filterBulan.selectedIndex].text : 'Semua Bulan';
      alert(`Mencetak riwayat ${selectedChild.nama} untuk ${bulan}`);
    });
  }

  // ============================================
  // 8. INITIAL RENDER
  // ============================================
  renderTimeline(timelineData);
});