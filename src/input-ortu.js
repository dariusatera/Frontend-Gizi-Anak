/**
 * Input Orang Tua - Rencana Makan Mingguan
 * File: input-ortu.js
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Budget Selection
  const budgetButtons = document.querySelectorAll('.budget-btn');
  const customBudgetInput = document.getElementById('custom-budget-input');
  let selectedBudget = null;

  budgetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove selected from all buttons
      budgetButtons.forEach(b => b.classList.remove('selected'));
      // Add selected to clicked button
      btn.classList.add('selected');
      // Clear custom input
      customBudgetInput.value = '';
      // Set selected budget
      selectedBudget = parseInt(btn.dataset.budget);
    });
  });

  // Custom budget input
  customBudgetInput.addEventListener('input', (e) => {
    // Remove selected from all buttons
    budgetButtons.forEach(b => b.classList.remove('selected'));
    selectedBudget = parseInt(e.target.value) || 0;
  });

  // 2. Ingredients Selection
  const ingredientTags = document.querySelectorAll('.ingredient-tag');
  const ingredientSearch = document.getElementById('ingredient-search');
  let selectedIngredients = [];

  ingredientTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const ingredient = tag.dataset.ingredient;
      
      if (tag.classList.contains('selected')) {
        tag.classList.remove('selected');
        tag.innerHTML = ingredient;
        selectedIngredients = selectedIngredients.filter(i => i !== ingredient);
      } else {
        tag.classList.add('selected');
        tag.innerHTML = '<span class="check-icon">✓</span> ' + ingredient;
        selectedIngredients.push(ingredient);
      }
    });
  });

  // Add custom ingredient from search
  ingredientSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && ingredientSearch.value.trim()) {
      const customIngredient = ingredientSearch.value.trim();
      
      // Check if not already exists
      const exists = Array.from(ingredientTags).some(tag => 
        tag.dataset.ingredient.toLowerCase() === customIngredient.toLowerCase()
      );

      if (!exists) {
        // Create new tag
        const newTag = document.createElement('button');
        newTag.className = 'ingredient-tag selected';
        newTag.dataset.ingredient = customIngredient;
        newTag.innerHTML = `<span class="check-icon">✓</span> ${customIngredient}`;
        
        // Add click event
        newTag.addEventListener('click', () => {
          newTag.remove();
          selectedIngredients = selectedIngredients.filter(i => i !== customIngredient);
        });
        
        ingredientTags.appendChild(newTag);
        selectedIngredients.push(customIngredient);
      }
      
      ingredientSearch.value = '';
    }
  });

  // 3. Generate Recommendations
  const btnGenerate = document.getElementById('btn-generate');
  const recommendationsSection = document.getElementById('recommendations-section');

  btnGenerate.addEventListener('click', () => {
    // Validation
    if (!selectedBudget || selectedBudget <= 0) {
      alert('Silakan pilih atau masukkan nominal budget belanja!');
      return;
    }

    if (selectedIngredients.length === 0) {
      alert('Silakan pilih minimal 1 bahan yang tersedia di rumah!');
      return;
    }

    // Show loading state
    const originalText = btnGenerate.innerHTML;
    btnGenerate.innerHTML = '<span class="generate-icon">⏳</span> Sedang Membuat Rekomendasi...';
    btnGenerate.disabled = true;

    // Simulate AI processing
    setTimeout(() => {
      // Show recommendations
      recommendationsSection.style.display = 'block';
      
      // Scroll to recommendations
      recommendationsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Reset button
      btnGenerate.innerHTML = originalText;
      btnGenerate.disabled = false;

      // Log data (untuk demo)
      console.log('Budget:', selectedBudget);
      console.log('Bahan:', selectedIngredients);
    }, 2000);
  });

  // 4. Navigation
  const navItems = document.querySelectorAll('.nav-item-ortu');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (item.getAttribute('href') === '#') {
        e.preventDefault();
        alert('Halaman ini akan segera hadir!');
      }
    });
  });

  // ============================================
  // 5. FITUR BARU: Handle Klik "Lihat Resep"
  // ============================================
  // Data resep lengkap (mock) - nanti diganti dengan data dari backend
  const dataResepLengkap = {
    1: {
      id: '1',
      nama: 'Omelet Bayam & Roti Gandum',
      kalori: 320,
      protein: 12,
      lemak: 8,
      karbo: 30,
      waktuMakan: 'Sarapan',
      waktuMakanIcon: '',
      waktu: '15 menit',
      porsi: '1 porsi balita',
      gambar: '/img/omelet.jpg',
      bahan: [
        { nama: 'Telur ayam', jumlah: '2 butir', berat: '120g' },
        { nama: 'Bayam segar', jumlah: '1 ikat', berat: '100g' },
        { nama: 'Roti gandum', jumlah: '2 lembar', berat: '60g' },
        { nama: 'Minyak zaitun', jumlah: '1 sdt', berat: '5ml' },
        { nama: 'Garam', jumlah: 'sejumput', berat: '-' }
      ],
      langkah: [
        'Cuci bersih bayam, lalu rebus sebentar dan tiriskan. Cincang halus.',
        'Kocok 2 butir telur dalam mangkuk, tambahkan bayam cincang dan sejumput garam.',
        'Panaskan wajan dengan api kecil, olesi tipis dengan minyak zaitun.',
        'Tuang adonan telur ke wajan, masak selama 3-4 menit hingga setengah matang.',
        'Letakkan roti gandum di atas omelet, lipat menjadi dua.',
        'Masak selama 2 menit lagi hingga matang sempurna. Angkat dan sajikan hangat.'
      ],
      tips: [
        'Pastikan bayam dicuci bersih untuk menghilangkan kotoran.',
        'Gunakan api kecil agar omelet tidak gosong di luar tapi mentah di dalam.',
        'Roti gandum lebih sehat karena mengandung serat lebih tinggi.',
        'Sajikan dengan potongan buah untuk tambahan vitamin.'
      ],
      alergi: ['Telur', 'Gluten (dari roti gandum)']
    },
    2: {
      id: '2',
      nama: 'Bubur Kacang Hijau Susu',
      kalori: 350,
      protein: 14,
      lemak: 6,
      karbo: 55,
      waktuMakan: 'Siang',
      waktuMakanIcon: '☀️',
      waktu: '30 menit',
      porsi: '1 porsi balita',
      gambar: '/img/bubur.jpg',
      bahan: [
        { nama: 'Kacang hijau', jumlah: '100g', berat: '100g' },
        { nama: 'Beras', jumlah: '60g', berat: '60g' },
        { nama: 'Susu cair', jumlah: '150ml', berat: '150ml' },
        { nama: 'Gula merah', jumlah: '1 sdm', berat: '15g' },
        { nama: 'Daun pandan', jumlah: '1 lembar', berat: '-' }
      ],
      langkah: [
        'Rendam kacang hijau selama 2 jam agar lebih cepat empuk saat dimasak.',
        'Rebus kacang hijau dengan air secukupnya hingga empuk (±20 menit).',
        'Tambahkan beras yang sudah dicuci, masak hingga menjadi bubur kental.',
        'Masukkan daun pandan untuk aroma, aduk sesekali agar tidak gosong.',
        'Tuang susu cair, aduk rata dan masak dengan api kecil selama 5 menit.',
        'Angkat daun pandan, sajikan bubur dalam mangkuk. Bisa ditaburi kismis.'
      ],
      tips: [
        'Merendam kacang hijau semalaman membuat proses memasak lebih cepat.',
        'Gunakan susu UHT full cream untuk rasa yang lebih gurih.',
        'Untuk balita di bawah 1 tahun, hindari penambahan gula.',
        'Bubur bisa disimpan di kulkas maksimal 2 hari dalam wadah tertutup.'
      ],
      alergi: ['Susu (laktosa)']
    },
    3: {
      id: '3',
      nama: 'Pancake Pisang Oatmeal',
      kalori: 310,
      protein: 10,
      lemak: 8,
      karbo: 45,
      waktuMakan: 'Malam',
      waktuMakanIcon: '🌙',
      waktu: '20 menit',
      porsi: '1 porsi balita',
      gambar: '/img/pancake.jpg',
      bahan: [
        { nama: 'Pisang matang', jumlah: '1 buah', berat: '80g' },
        { nama: 'Oatmeal', jumlah: '40g', berat: '40g' },
        { nama: 'Telur', jumlah: '1 butir', berat: '50g' },
        { nama: 'Susu', jumlah: '50ml', berat: '50ml' },
        { nama: 'Madu', jumlah: '1 sdt', berat: '5ml' }
      ],
      langkah: [
        'Haluskan pisang matang dengan garpu hingga lembut seperti pasta.',
        'Campurkan oatmeal, telur, dan susu ke dalam pisang halus. Aduk rata.',
        'Diamkan adonan selama 5 menit agar oatmeal menyerap cairan.',
        'Panaskan wajan anti lengket dengan api kecil, olesi sedikit minyak.',
        'Tuang 1 sendok makan adonan, masak 2-3 menit hingga muncul gelembung.',
        'Balik pancake, masak 1-2 menit lagi. Sajikan dengan drizzle madu.'
      ],
      tips: [
        'Gunakan pisang yang benar-benar matang (kulit berbintik hitam) agar manis alami.',
        'Oatmeal instan lebih cepat matang daripada rolled oats.',
        'Madu hanya untuk anak di atas 1 tahun (botulism risk untuk bayi).',
        'Pancake bisa dibekukan dan dipanaskan ulang untuk stok makan pagi.'
      ],
      alergi: ['Telur', 'Susu']
    }
  };

  // Handle klik tombol "Lihat Resep"
  document.querySelectorAll('.btn-see-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const resepId = btn.getAttribute('data-resep');
      const card = btn.closest('.menu-card');
      
      // Jika data-resep tidak ada, coba ambil dari urutan kartu
      const cards = Array.from(document.querySelectorAll('.menu-card'));
      const cardIndex = cards.indexOf(card) + 1;
      const finalId = resepId || cardIndex.toString();
      
      const resepData = dataResepLengkap[finalId];
      
      if (resepData) {
        // Simpan ke sessionStorage agar bisa dibaca halaman detail
        sessionStorage.setItem('selectedResep', JSON.stringify(resepData));
        
        // Redirect ke halaman detail resep
        window.location.href = '/resep-detail.html';
      } else {
        alert('Data resep tidak ditemukan. Silakan coba lagi.');
      }
    });
  });
});