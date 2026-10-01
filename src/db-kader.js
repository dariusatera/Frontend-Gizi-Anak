/**
 * Dashboard Kader - Dynamic Data Controller
 * File: db-kader.js
 */

// ==========================================
// KONFIGURASI (UBAH DI SINI SAAT INTEGRASI)
// ==========================================
const CONFIG = {
  USE_MOCK_DATA: true, // Ubah ke 'false' saat backend sudah siap
  API_BASE_URL: '/api/dashboard', // Endpoint backend Anda nanti
  REFRESH_INTERVAL: 300000 // Auto-refresh setiap 5 menit (300000 ms)
};

// ==========================================
// MOCK DATA (Untuk Testing Tampilan Tanpa Backend)
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

  updateTable(children) {
    const tbody = document.getElementById('table-body');
    
    if (!children || children.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #64748b;">Tidak ada data balita prioritas</td></tr>';
      return;
    }

    const rows = children.map(child => `
      <tr>
        <td>
          <div class="user-cell">
            <div class="avatar-${this.getStatusColor(child.status)}">
              ${child.initials}
            </div>
            <strong>${child.nama}</strong>
          </div>
        </td>
        <td>${child.usia} Bulan<br><span style="color:#64748b">(${child.jenisKelamin})</span></td>
        <td>${child.namaOrangTua}</td>
        <td>${child.wilayah}</td>
        <td><span class="badge-status ${child.statusClass}">${child.status}</span></td>
        <td>
          <button class="btn-danger" onclick="dashboard.handleRujuk('${child.id}', '${child.nama}')">
            Rujuk<br>Puskesmas
          </button>
        </td>
      </tr>
    `).join('');

    tbody.innerHTML = rows;
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
// INISIALISASI
// ==========================================
let dashboard;

document.addEventListener('DOMContentLoaded', () => {
  dashboard = new DashboardController();
  
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
});

setInterval(() => {
  if (dashboard && !CONFIG.USE_MOCK_DATA) {
    dashboard.refresh();
  }
}, CONFIG.REFRESH_INTERVAL);