/**
 * Dashboard Kader - Dynamic Data Controller
 * File: db-kader.js
 */

// ==========================================
// KONFIGURASI
// ==========================================
const CONFIG = {
  USE_MOCK_DATA: true,
  API_BASE_URL: '/api/dashboard',
  REFRESH_INTERVAL: 300000
};

// ==========================================
// MOCK DATA
// ==========================================
const MOCK_DATA = {
  summary: {
    total: 124,
    giziBaik: 98,
    giziKurang: 15,
    giziBuruk: 11,
    penurunanPersen: -38
  },
  trend: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
    values: [45, 42, 38, 35, 32, 28, 25, 22, 18, 15]
  },
  children: [
    {
      id: 'child_001',
      nama: 'Aditya Pratama',
      initials: 'AD',
      usia: 18,
      jenisKelamin: 'L',
      namaOrangTua: 'Ibu Ratna S.',
      wilayah: 'Dusun Kenanga RT 02',
      status: 'Gizi Buruk',
      statusClass: 'red'
    },
    {
      id: 'child_002',
      nama: 'Kirana Larasati',
      initials: 'KL',
      usia: 24,
      jenisKelamin: 'P',
      namaOrangTua: 'Ibu Dewi Wardani',
      wilayah: 'Dusun Mawar RT 01',
      status: 'Gizi Buruk',
      statusClass: 'red'
    },
    {
      id: 'child_003',
      nama: 'Fauzan Rahman',
      initials: 'FR',
      usia: 11,
      jenisKelamin: 'L',
      namaOrangTua: 'Ibu Halimah',
      wilayah: 'Dusun Sukamaju RT 04',
      status: 'Gizi Kurang',
      statusClass: 'yellow'
    }
  ],
  history: [
    { id: 1, nama: 'Siti Aminah', usia: 18, tanggal: '12 Okt 2023', status: 'Gizi Kurang', statusClass: 'gizi-kurang' },
    { id: 2, nama: 'Aditya Pratama', usia: 18, tanggal: '12 Okt 2023', status: 'Gizi Buruk', statusClass: 'gizi-buruk' },
    { id: 3, nama: 'Dewi Lestari', usia: 12, tanggal: '12 Okt 2023', status: 'Gizi Baik', statusClass: 'gizi-baik' },
    { id: 4, nama: 'Kirana Larasati', usia: 24, tanggal: '12 Okt 2023', status: 'Gizi Buruk', statusClass: 'gizi-buruk' },
    { id: 5, nama: 'Siti Amanah', usia: 24, tanggal: '12 Okt 2023', status: 'Gizi Kurang', statusClass: 'gizi-kurang' },
    { id: 6, nama: 'Fauzan Rahman', usia: 11, tanggal: '12 Okt 2023', status: 'Gizi Buruk', statusClass: 'gizi-buruk' },
    { id: 7, nama: 'Dewi Kartika', usia: 12, tanggal: '12 Okt 2023', status: 'Gizi Baik', statusClass: 'gizi-baik' },
    { id: 8, nama: 'Budi Santoso', usia: 11, tanggal: '12 Okt 2023', status: 'Gizi Buruk', statusClass: 'gizi-buruk' }
  ]
};

// ==========================================
// API SERVICE CLASS
// ==========================================
class DashboardAPI {
  async getSummary() {
    if (CONFIG.USE_MOCK_DATA) return MOCK_DATA.summary;
    const res = await fetch(`${CONFIG.API_BASE_URL}/summary`);
    return res.json();
  }

  async getTrendData() {
    if (CONFIG.USE_MOCK_DATA) return MOCK_DATA.trend;
    const res = await fetch(`${CONFIG.API_BASE_URL}/trend`);
    return res.json();
  }

  async getChildrenList() {
    if (CONFIG.USE_MOCK_DATA) return MOCK_DATA.children;
    const res = await fetch(`${CONFIG.API_BASE_URL}/children/priority`);
    return res.json();
  }

  async getHistoryData() {
    if (CONFIG.USE_MOCK_DATA) return MOCK_DATA.history;
    const res = await fetch(`${CONFIG.API_BASE_URL}/history`);
    return res.json();
  }
}

// ==========================================
// NAVIGATION CONTROLLER
// ==========================================
class NavigationController {
  constructor() {
    this.navItems = document.querySelectorAll('.nav-item');
    this.pages = {
      dashboard: document.getElementById('dashboard-page'),
      history: document.getElementById('history-page')
    };
    this.init();
  }

  init() {
    this.navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = item.getAttribute('data-page');
        this.switchPage(pageName);
      });
    });
  }

  switchPage(pageName) {
    this.navItems.forEach(item => {
      if (item.getAttribute('data-page') === pageName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    Object.keys(this.pages).forEach(key => {
      if (key === pageName) {
        this.pages[key].classList.add('active');
      } else {
        this.pages[key].classList.remove('active');
      }
    });

    if (pageName === 'history') {
      document.title = 'Riwayat Data - NutriTumbuh';
    } else {
      document.title = 'Dashboard Kader - NutriTumbuh';
    }
  }
}

// ==========================================
// DASHBOARD CONTROLLER CLASS
// ==========================================
class DashboardController {
  constructor() {
    this.api = new DashboardAPI();
    this.charts = {};
    this.init();
  }

  async init() {
    try {
      const [summary, trendData, childrenList] = await Promise.all([
        this.api.getSummary(),
        this.api.getTrendData(),
        this.api.getChildrenList()
      ]);

      this.updateSummaryCards(summary);
      this.updateTrendChart(trendData);
      this.updateDonutChart(summary);
      this.updateTable(childrenList);
      
    } catch (error) {
      console.error('Gagal memuat data dashboard:', error);
      this.showError('Gagal memuat data. Silakan refresh halaman.');
    }
  }

  updateSummaryCards(data) {
    this.animateValue('total-anak', 0, data.total, 1000);
    this.animateValue('gizi-baik', 0, data.giziBaik, 1000);
    this.animateValue('gizi-kurang', 0, data.giziKurang, 1000);
    this.animateValue('gizi-buruk', 0, data.giziBuruk, 1000);

    const trendBadge = document.getElementById('trend-badge');
    const trendText = document.getElementById('trend-text');
    
    if (data.penurunanPersen < 0) {
      trendBadge.className = 'badge-green';
      trendText.textContent = `Penurunan Kasus: ${Math.abs(data.penurunanPersen)}% YTD`;
    } else {
      trendBadge.className = 'badge-red';
      trendText.textContent = `Peningkatan Kasus: ${data.penurunanPersen}% YTD`;
    }
  }

  updateTrendChart(data) {
    const ctx = document.getElementById('trendChart').getContext('2d');
    
    if (this.charts.trend) {
      this.charts.trend.destroy();
    }

    this.charts.trend = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.months,
        datasets: [{
          label: 'Prevalensi Gizi Kurang & Buruk',
          data: data.values,
          borderColor: '#006a38',
          backgroundColor: 'rgba(0, 106, 56, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#006a38',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#181d18',
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: (context) => `${context.parsed.y} kasus`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#f0f5ed', drawBorder: false },
            ticks: { color: '#64748b', font: { family: 'Plus Jakarta Sans' } }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#64748b', font: { family: 'Plus Jakarta Sans' } }
          }
        }
      }
    });
  }

  updateDonutChart(summary) {
    const total = summary.total;
    const baikPersen = total > 0 ? ((summary.giziBaik / total) * 100).toFixed(0) : 0;
    const kurangPersen = total > 0 ? ((summary.giziKurang / total) * 100).toFixed(0) : 0;
    const burukPersen = total > 0 ? ((summary.giziBuruk / total) * 100).toFixed(0) : 0;

    document.getElementById('donut-total').textContent = total;

    const donutChart = document.getElementById('donutChart');
    donutChart.style.background = `conic-gradient(
      #3c9a5f 0% ${baikPersen}%,
      #fdb813 ${baikPersen}% ${Number(baikPersen) + Number(kurangPersen)}%,
      #e53935 ${Number(baikPersen) + Number(kurangPersen)}% 100%
    )`;

    const legendHTML = `
      <div class="legend-item">
        <div class="legend-color" style="background: #3c9a5f;"></div>
        <span class="legend-text">Gizi Baik</span>
        <span class="legend-value">${baikPersen}%</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #fdb813;"></div>
        <span class="legend-text">Gizi Kurang</span>
        <span class="legend-value">${kurangPersen}%</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #e53935;"></div>
        <span class="legend-text">Gizi Buruk</span>
        <span class="legend-value">${burukPersen}%</span>
      </div>
    `;
    document.getElementById('chart-legend').innerHTML = legendHTML;
  }

  // ✅ PERBAIKAN: Menggunakan Event Listener, BUKAN inline onclick (agar terbaca di module)
  updateTable(children) {
    const tbody = document.getElementById('table-body');
    
    if (!children || children.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #64748b;">Tidak ada data balita prioritas</td></tr>';
      return;
    }

    const rows = children.map(child => `
      <tr class="clickable-row" data-id="${child.id}" data-nama="${child.nama}" style="cursor: pointer;" onmouseover="this.style.backgroundColor='#f0fdf4'" onmouseout="this.style.backgroundColor='transparent'">
        <td>
          <div class="user-cell">
            <div class="avatar-${this.getStatusColor(child.status)}">
              ${child.initials}
            </div>
            <strong style="color: #006a38;">${child.nama}</strong>
          </div>
        </td>
        <td>${child.usia} Bulan<br><span style="color:#64748b">(${child.jenisKelamin})</span></td>
        <td>${child.namaOrangTua}</td>
        <td>${child.wilayah}</td>
        <td><span class="badge-status ${child.statusClass}">${child.status}</span></td>
        <td>
          <button class="btn-danger" data-action="rujuk" data-id="${child.id}" data-nama="${child.nama}">
            Rujuk<br>Puskesmas
          </button>
        </td>
      </tr>
    `).join('');

    tbody.innerHTML = rows;

    // ✅ Pasang Event Listener ke setiap baris setelah di-render
    tbody.querySelectorAll('.clickable-row').forEach(row => {
      row.addEventListener('click', (e) => {
        // Jika yang diklik adalah tombol Rujuk, abaikan klik baris
        if (e.target.closest('.btn-danger')) return;
        
        const childId = row.getAttribute('data-id');
        const childName = row.getAttribute('data-nama');
        this.viewDetail(childId, childName);
      });
    });

    // ✅ Pasang Event Listener khusus untuk tombol Rujuk
    tbody.querySelectorAll('.btn-danger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Mencegah event naik ke baris
        const childId = btn.getAttribute('data-id');
        const childName = btn.getAttribute('data-nama');
        this.handleRujuk(childId, childName);
      });
    });
  }

  getStatusColor(status) {
    const colors = {
      'Gizi Baik': 'green',
      'Gizi Kurang': 'yellow',
      'Gizi Buruk': 'red'
    };
    return colors[status] || 'green';
  }

  animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    const range = end - start;
    const minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    
    let startTime = new Date().getTime();
    let endTime = startTime + duration;
    
    const run = () => {
      let now = new Date().getTime();
      let remaining = Math.max((endTime - now) / duration, 0);
      let value = Math.round(end - (remaining * range));
      obj.innerHTML = value;
      if (value === end) {
        clearInterval(timer);
      }
    };
    
    let timer = setInterval(run, stepTime);
    run();
  }

  handleRujuk(childId, childName) {
    if (confirm(`Apakah Anda yakin ingin merujuk "${childName}" ke Puskesmas?`)) {
      alert(`Berhasil: Data rujukan untuk ${childName} telah dikirim.`);
    }
  }

  viewDetail(childId, childName) {
    const child = MOCK_DATA.children.find(c => c.id === childId);
    
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

  showError(message) {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 40px; color: #e53935;">${message}</td></tr>`;
  }

  async refresh() {
    console.log('Refreshing dashboard data...');
    await this.init();
  }
}

// ==========================================
// HISTORY CONTROLLER
// ==========================================
class HistoryController {
  constructor() {
    this.api = new DashboardAPI();
    this.historyData = [];
  }

  async init() {
    try {
      this.historyData = await this.api.getHistoryData();
      this.renderHistoryTable(this.historyData);
    } catch (error) {
      console.error('Gagal memuat data history:', error);
    }
  }

  // ✅ PERBAIKAN: Menggunakan Event Listener, BUKAN inline onclick
  renderHistoryTable(data) {
    const tbody = document.getElementById('history-table-body');
    
    if (!data || data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: #64748b;">Tidak ada data riwayat</td></tr>';
      return;
    }

    const rows = data.map(item => `
      <tr class="clickable-history-row" data-id="${item.id}" style="cursor: pointer;" onmouseover="this.style.backgroundColor='#f0fdf4'" onmouseout="this.style.backgroundColor='transparent'">
        <td><strong style="color: #006a38;">${item.nama}</strong></td>
        <td>${item.usia}</td>
        <td>${item.tanggal}</td>
        <td><span class="status-badge ${item.statusClass}">${item.status}</span></td>
        <td><span style="color: #006a38; font-weight: 600;">Lihat Detail →</span></td>
      </tr>
    `).join('');

    tbody.innerHTML = rows;

    // ✅ Pasang Event Listener ke setiap baris history setelah di-render
    tbody.querySelectorAll('.clickable-history-row').forEach(row => {
      row.addEventListener('click', () => {
        const id = parseInt(row.getAttribute('data-id'));
        this.viewDetail(id);
      });
    });
  }

  viewDetail(id) {
    const item = this.historyData.find(h => h.id === id);
    if (item) {
      sessionStorage.setItem('selectedAnakKader', JSON.stringify({ 
        id: `child_00${item.id}`, 
        nama: item.nama, 
        usia: item.usia, 
        status: item.status, 
        bb: 10.5, 
        tb: 75 
      }));
      window.location.href = `/riwayat-kader.html?id=child_00${item.id}`;
    }
  }

  filterHistory(keyword) {
    const filtered = this.historyData.filter(item => 
      item.nama.toLowerCase().includes(keyword.toLowerCase())
    );
    this.renderHistoryTable(filtered);
  }
}

// ==========================================
// INISIALISASI
// ==========================================
let dashboard;
let historyController;
let navigation;

document.addEventListener('DOMContentLoaded', () => {
  navigation = new NavigationController();
  dashboard = new DashboardController();
  historyController = new HistoryController();
  historyController.init();
  
  const searchInput = document.getElementById('search-input');
  if (searchInput && CONFIG.USE_MOCK_DATA) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase();
      const filtered = MOCK_DATA.children.filter(child => 
        child.nama.toLowerCase().includes(keyword) || 
        child.namaOrangTua.toLowerCase().includes(keyword)
      );
      dashboard.updateTable(filtered);
    });
  }

  const historySearchInput = document.getElementById('history-search-input');
  if (historySearchInput) {
    historySearchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase();
      historyController.filterHistory(keyword);
    });
  }
});

setInterval(() => {
  if (dashboard && !CONFIG.USE_MOCK_DATA) {
    dashboard.refresh();
  }
}, CONFIG.REFRESH_INTERVAL);