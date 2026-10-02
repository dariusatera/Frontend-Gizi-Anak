/**
 * Riwayat Anak - Data Controller
 * File: riwayat-anak.js
 */

// ==========================================
// MOCK DATA - Seluruh Riwayat Anak
// ==========================================
const MOCK_RIWAYAT_DATA = [
  {
    id: 'child_001',
    nama: 'Aditya Pratama',
    initials: 'AD',
    avatarColor: 'green',
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
    avatarColor: 'yellow',
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
    avatarColor: 'yellow',
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
    avatarColor: 'green',
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
    avatarColor: 'yellow',
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
    avatarColor: 'green',
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
  
  if (!data || data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #64748b;">Tidak ada data balita</td></tr>';
    return;
  }

  const rows = data.map(child => `
    <tr>
      <td>
        <div class="user-cell">
          <div class="user-avatar ${child.avatarColor}">${child.initials}</div>
          <span class="user-name">${child.nama}</span>
        </div>
      </td>
      <td>${child.usia} Bulan<br>(${child.jenisKelamin})</td>
      <td>${child.namaOrangTua}</td>
      <td>${child.wilayah}</td>
      <td>
        <span class="badge-status ${child.statusClass}">${child.status}</span>
      </td>
      <td>
        <button class="btn-rujuk" onclick="handleRujuk('${child.id}', '${child.nama}')">
          Rujuk<br>Puskesmas
        </button>
      </td>
    </tr>
  `).join('');

  tbody.innerHTML = rows;
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
// INISIALISASI
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderTable(MOCK_RIWAYAT_DATA);
});