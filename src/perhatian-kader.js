/**
 * Perhatian Kader - Data Controller
 * File: perhatian-kader.js
 */

// ==========================================
// MOCK DATA - Seluruh Riwayat Anak
// ==========================================
const MOCK_RIWAYAT_DATA = [
  {
    id: 'child_001',
    nama: 'Aditya Pratama',
    initials: 'AD',
    avatarColor: 'red',
    usia: 18,
    jenisKelamin: 'L',
    namaOrangTua: 'Ibu Ratna S.',
    wilayah: 'Dusun Kenanga RT 02',
    status: 'Gizi Buruk',
    statusClass: 'gizi-buruk'
  },
  {
    id: 'child_002',
    nama: 'Kirana Larasati',
    initials: 'KL',
    avatarColor: 'red',
    usia: 24,
    jenisKelamin: 'P',
    namaOrangTua: 'Ibu Dewi Wardani',
    wilayah: 'Dusun Mawar RT 01',
    status: 'Gizi Buruk',
    statusClass: 'gizi-buruk'
  },
  {
    id: 'child_003',
    nama: 'Fauzan Rahman',
    initials: 'FR',
    avatarColor: 'red',
    usia: 11,
    jenisKelamin: 'L',
    namaOrangTua: 'Ibu Halimah',
    wilayah: 'Dusun Sukamaju RT 04',
    status: 'Gizi Buruk',
    statusClass: 'gizi-buruk'
  },
  {
    id: 'child_004',
    nama: 'Budi Prabudi',
    initials: 'BP',
    avatarColor: 'red',
    usia: 36,
    jenisKelamin: 'L',
    namaOrangTua: 'Ibu Rahmawati',
    wilayah: 'Dusun Mawar RT 01',
    status: 'Gizi Buruk',
    statusClass: 'gizi-buruk'
  },
  {
    id: 'child_005',
    nama: 'Daniel Steven',
    initials: 'DS',
    avatarColor: 'red',
    usia: 48,
    jenisKelamin: 'L',
    namaOrangTua: 'Ibu Christie',
    wilayah: 'Dusun Melati RT 01',
    status: 'Gizi Buruk',
    statusClass: 'gizi-buruk'
  },
  {
    id: 'child_006',
    nama: 'Dian Kustary',
    initials: 'DK',
    avatarColor: 'red',
    usia: 16,
    jenisKelamin: 'P',
    namaOrangTua: 'Ibu Toharoh',
    wilayah: 'Dusun Mawar RT 01',
    status: 'Gizi Buruk',
    statusClass: 'gizi-buruk'
  },
  {
    id: 'child_007',
    nama: 'Dony Kamtoro',
    initials: 'DK',
    avatarColor: 'red',
    usia: 20,
    jenisKelamin: 'L',
    namaOrangTua: 'Ibu Siti',
    wilayah: 'Dusun Kecubung RT 03',
    status: 'Gizi Buruk',
    statusClass: 'gizi-buruk'
  },
  {
    id: 'child_008',
    nama: 'Siti Aminah',
    initials: 'SA',
    avatarColor: 'yellow',
    usia: 18,
    jenisKelamin: 'P',
    namaOrangTua: 'Ibu Fatimah',
    wilayah: 'Dusun Melati RT 02',
    status: 'Gizi Kurang',
    statusClass: 'gizi-kurang'
  },
  {
    id: 'child_009',
    nama: 'Dewi Lestari',
    initials: 'DL',
    avatarColor: 'green',
    usia: 12,
    jenisKelamin: 'P',
    namaOrangTua: 'Ibu Sari',
    wilayah: 'Dusun Kenanga RT 01',
    status: 'Gizi Baik',
    statusClass: 'gizi-baik'
  },
  {
    id: 'child_010',
    nama: 'Ahmad Rizki',
    initials: 'AR',
    avatarColor: 'yellow',
    usia: 15,
    jenisKelamin: 'L',
    namaOrangTua: 'Ibu Nurul',
    wilayah: 'Dusun Mawar RT 02',
    status: 'Gizi Kurang',
    statusClass: 'gizi-kurang'
  }
];

// ==========================================
// RENDER TABEL
// ==========================================
function renderTable(data) {
  const tbody = document.getElementById('riwayat-table-body');
  
  if (!tbody) return; // Safety check jika elemen belum ada

  if (!data || data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #64748b;">Tidak ada data balita</td></tr>';
    return;
  }

  // ✅ PERBAIKAN: BARIS TABEL SEKARANG BISA DIKLIK LANGSUNG
  const rows = data.map(child => `
    <tr onclick="viewDetailAnak('${child.id}', '${child.nama}')" style="cursor: pointer;" onmouseover="this.style.backgroundColor='#f0fdf4'" onmouseout="this.style.backgroundColor='transparent'">
      <td>
        <div class="user-cell">
          <div class="user-avatar ${child.avatarColor}">${child.initials}</div>
          <span class="user-name" style="color: #006a38; font-weight: 600;">${child.nama}</span>
        </div>
      </td>
      <td>${child.usia} Bulan<br><span style="color:#64748b">(${child.jenisKelamin})</span></td>
      <td>${child.namaOrangTua}</td>
      <td>${child.wilayah}</td>
      <td>
        <span class="badge-status ${child.statusClass}">${child.status}</span>
      </td>
      <td>
        <!-- event.stopPropagation() MENCEGAH TOMBOL INI MEMICU KLIK BARIS -->
        <button class="btn-rujuk" onclick="event.stopPropagation(); handleRujuk('${child.id}', '${child.nama}')">
          Rujuk<br>Puskesmas
        </button>
      </td>
    </tr>
  `).join('');

  tbody.innerHTML = rows;
}

// ==========================================
// VIEW DETAIL ANAK (Menuju ke riwayat-kader.html)
// ==========================================
function viewDetailAnak(childId, childName) {
  const child = MOCK_RIWAYAT_DATA.find(c => c.id === childId);
  
  if (child) {
    sessionStorage.setItem('selectedAnakKader', JSON.stringify({
      id: child.id,
      nama: child.nama,
      initials: child.initials,
      usia: child.usia,
      jenisKelamin: child.jenisKelamin,
      namaOrangTua: child.namaOrangTua,
      wilayah: child.wilayah,
      status: child.status,
      bb: 10.5,
      tb: 75
    }));
    
    window.location.href = `/riwayat-kader.html?id=${childId}`;
  }
}

// ==========================================
// HANDLE RUJUK
// ==========================================
function handleRujuk(childId, childName) {
  if (confirm(`Apakah Anda yakin ingin merujuk "${childName}" ke Puskesmas?`)) {
    alert(`Berhasil: Data rujukan untuk ${childName} telah dikirim ke Puskesmas.`);
  }
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================
function filterTable(keyword) {
  const filtered = MOCK_RIWAYAT_DATA.filter(child => 
    child.nama.toLowerCase().includes(keyword.toLowerCase()) ||
    child.namaOrangTua.toLowerCase().includes(keyword.toLowerCase()) ||
    child.wilayah.toLowerCase().includes(keyword.toLowerCase())
  );
  renderTable(filtered);
}

// ==========================================
// INISIALISASI
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Render tabel awal
  renderTable(MOCK_RIWAYAT_DATA);

  // Tambahkan event listener untuk search jika elemen input ada di HTML
  const searchInput = document.getElementById('perhatian-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterTable(e.target.value);
    });
  }
});