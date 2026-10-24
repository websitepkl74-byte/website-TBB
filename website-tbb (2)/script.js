// ================= 1. DYNAMIC NAVIGATION EFFECT =================
const header = document.getElementById('mainnav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ================= 2. RESPONSIVE SIDEBAR MOBILE MENU =================
const burgerBtn = document.getElementById('burgerBtn');
const menuCloseBtn = document.getElementById('menuCloseBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

const toggleMenu = () => {
  mobileMenu.classList.toggle('active');
  menuOverlay.classList.toggle('active');
};

burgerBtn.addEventListener('click', toggleMenu);
menuCloseBtn.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

// ================= 3. SCHEDULE TAB DATA SYSTEM =================
const scheduleData = {
  'classic': [
    { day: 'Rabu', time: '16:00 - 18:00', name: 'Classic Class', materi: 'Basic & Cardio', level: 'Semua Tingkatan', capacity: '8x per bulan', type: 'reguler' },
      { day: 'Minggu', time: '16:00 - 18:00', name: 'Classic Class', materi: 'Basic & Cardio', level: 'Semua Tingkatan', capacity: '8x per bulan', type: 'reguler' }
  ],
  'silver': [
    { day: 'Senin', time: '16:00 - 18:00', name: 'Silver Class', materi: 'Basic, Cardio, Advance', level: 'Semua Tingkatan', capacity: '12x per bulan', type: 'reguler' },
    { day: 'Senin', time: '19:00 - 21:00', name: 'Silver Class (Evening)', materi: 'Basic, Cardio, Advance', level: 'Semua Tingkatan', capacity: '12x per bulan', type: 'reguler' },
    { day: 'Selasa', time: '16:00 - 18:00', name: 'Silver Class', materi: 'Basic, Cardio, Advance', level: 'Semua Tingkatan', capacity: '12x per bulan', type: 'reguler' },
    { day: 'Rabu', time: '16:00 - 18:00', name: 'Classic Class (gratis untuk Silver)', materi: 'Basic & Cardio', level: 'Semua Tingkatan', capacity: '12x per bulan', type: 'reguler' },
    { day: 'Kamis', time: '16:00 - 18:00', name: 'Silver Class', materi: 'Basic, Cardio, Advance', level: 'Semua Tingkatan', capacity: '12x per bulan', type: 'reguler' },
    { day: 'Jumat', time: '16:00 - 18:00', name: 'Silver Class', materi: 'Basic, Cardio, Advance', level: 'Semua Tingkatan', capacity: '12x per bulan', type: 'reguler' },
    { day: 'Jumat', time: '19:00 - 21:00', name: 'Silver Class (Evening)', materi: 'Basic, Cardio, Advance', level: 'Semua Tingkatan', capacity: '12x per bulan', type: 'reguler' },
    { day: 'Minggu', time: '16:00 - 18:00', name: 'Classic Class (gratis untuk Silver)', materi: 'Basic & Cardio', level: 'Semua Tingkatan', capacity: '12x per bulan', type: 'reguler' }
  ],
  'gold': [
    { day: 'Senin - Sabtu', time: 'Sesuai pilihan member', name: 'Gold Class (Privat)', materi: 'Basic, Cardio, Advance & Pro', level: 'Privat', capacity: 'Latihan di camp, 8x per bulan', type: 'privat' }
  ],
  'platinum': [
    { day: 'Fleksibel', time: 'Sesuai pilihan member', name: 'Platinum Class (Privat)', materi: 'Hypno Slim, Basic, Cardio, Advance & Pro', level: 'Privat', capacity: 'Trainer datang ke tempat member, 8x per bulan', type: 'privat' }
  ]
};

const renderSchedule = (dayKey) => {
  const tbody = document.getElementById('scheduleBody');
  if(!tbody) return;
  tbody.innerHTML = '';
  
  scheduleData[dayKey].forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.day || ''}</td>
      <td style="font-family: 'Space Mono'; font-weight:700; color: var(--red);">${item.time}</td>
      <td><strong style="text-transform:uppercase;">${item.name}</strong></td>
      <td>${item.materi}</td>
      <td><span class="session-tag ${item.type}">${item.level}</span></td>
      <td style="color:#555; font-size:14px;">${item.capacity}</td>
    `;
    tbody.appendChild(row);
  });
};

const switchDay = (dayKey, btnElement) => {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');
  renderSchedule(dayKey);
};

// ================= 4. ACCORDION FAQ CONTROLLER =================
const faqTriggers = document.querySelectorAll('.faq-trigger');
faqTriggers.forEach(trigger => {
  trigger.addEventListener('click', function() {
    const parent = this.parentElement;
    const isOpen = parent.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
    
    if (!isOpen) {
      parent.classList.add('active');
    }
  });
});

// ================= 6. GALERI FOTO (DAFTAR FOTO ADA DI SINI) =================
// 📷 GANTI FOTO GALERI / TAMBAH FOTO BARU:
//   1. Simpan foto di folder:  images/galeri/   (disarankan lebar maksimal 1600 px)
//   2. Tambahkan SATU BARIS baru di daftar di bawah ini, contoh:
//        { file: 'nama-foto-anda.jpg', caption: 'Judul singkat foto' },
//   3. Urutan baris = urutan foto di website. Hapus baris untuk membuang foto.
//   4. caption boleh dikosongkan:  caption: ''
//   5. Yang langsung tampil hanya GALLERY_INITIAL_COUNT foto pertama. Sisanya muncul
//      setelah pengunjung menekan tombol "Lihat ... Foto Lainnya".
//      Jadi taruh foto TERBAIK di baris-baris paling atas.
const GALLERY_FOLDER = 'images/galeri/';
const GALLERY_INITIAL_COUNT = 9;

const galleryPhotos = [
  // ---------- 9 foto pertama (langsung tampil) ----------
  { file: 'fnm-kl-bendera-2.jpg',     caption: 'Fight Night Muaythai International 2025, Kuala Lumpur' },
  { file: 'haornas-bekasi-2.jpg',     caption: 'Bendera Pengcab Kota Bandung di Bekasi' },
  { file: 'porprov-kualifikasi.jpg',  caption: 'Babak Kualifikasi Porprov XV Jawa Barat' },
  { file: 'baleendah-2.jpg',          caption: 'Semangat Nak Muay di Baleendah' },
  { file: 'bandara-malaysia.jpg',     caption: 'Tim TBB di Bandara Malaysia' },
  { file: 'kejuaraan-medali-2.jpg',   caption: 'Tim Pengcab Kota Bandung dengan Medali' },
  { file: 'fnm-kl-banner-2.jpg',      caption: 'Stadium Titiwangsa, 24 Mei 2025' },
  { file: 'sari-ater.jpg',            caption: 'Kebersamaan di Sari Ater' },
  { file: 'malam-kebersamaan-2.jpg',  caption: 'Malam Kebersamaan Keluarga TBB' },

  // ---------- muncul setelah tombol "Lihat Foto Lainnya" ----------
  { file: 'fnm-kl-bendera-1.jpg',     caption: 'Membawa Bendera TBB di Kuala Lumpur' },
  { file: 'fnm-kl-bendera-3.jpg',     caption: 'Medali Fight Night Muaythai International' },
  { file: 'fnm-kl-banner-1.jpg',      caption: 'Tim TBB di Fight Night Muaythai International 2025' },
  { file: 'fnm-kl-backdrop.jpg',      caption: 'Di Depan Backdrop Fight Night Muaythai' },
  { file: 'haornas-bekasi-1.jpg',     caption: 'Indonesia Muaythai Championship, Bekasi' },
  { file: 'kejuaraan-medali-1.jpg',   caption: 'Berfoto Bersama Usai Bertanding' },
  { file: 'kejuaraan-medali-3.jpg',   caption: 'Bendera Pengcab Kota Bandung' },
  { file: 'baleendah-1.jpg',          caption: 'Latihan Bersama di SMP BPPI Baleendah' },
  { file: 'baleendah-3.jpg',          caption: 'Kompak di SMP BPPI Baleendah' },
  { file: 'malam-kebersamaan-1.jpg',  caption: 'Kebersamaan di Malam Hari' },
  { file: 'kumpul-keluarga-tbb.jpg',  caption: 'Kumpul Bersama Keluarga Besar TBB' }
  // ← tambah baris foto baru di sini (jangan lupa koma di akhir baris sebelumnya)
];

// ---- Lightbox (foto diperbesar saat diklik, bisa digeser kiri/kanan) ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCap = document.getElementById('lightboxCap');
let lightboxIndex = 0;

const getGalleryItems = () => Array.from(document.querySelectorAll('#galleryGrid .gallery-item'));

const showLightboxAt = (index) => {
  const items = getGalleryItems();
  if (!lightbox || !items.length) return;
  lightboxIndex = (index + items.length) % items.length;
  const item = items[lightboxIndex];
  const img = item.querySelector('img');
  const caption = item.dataset.caption || '';
  lightboxImg.src = img.currentSrc || img.src;
  lightboxImg.alt = caption;
  lightboxCap.textContent = caption;
};

const openLightbox = (item) => {
  if (!lightbox) return;
  showLightboxAt(getGalleryItems().indexOf(item));
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target.closest('.lightbox-nav')) return;   // tombol geser tidak menutup
    if (e.target !== lightboxImg) closeLightbox();
  });
  document.getElementById('lightboxPrev').addEventListener('click', () => showLightboxAt(lightboxIndex - 1));
  document.getElementById('lightboxNext').addEventListener('click', () => showLightboxAt(lightboxIndex + 1));
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightboxAt(lightboxIndex - 1);
    if (e.key === 'ArrowRight') showLightboxAt(lightboxIndex + 1);
  });
}

// ---- Tombol "Lihat Foto Lainnya" ----
let galleryExpanded = false;

const updateGalleryMore = () => {
  const grid = document.getElementById('galleryGrid');
  const wrap = document.getElementById('galleryMoreWrap');
  const btn = document.getElementById('galleryMore');
  if (!grid || !wrap || !btn) return;
  const extras = grid.querySelectorAll('.gallery-extra').length;
  wrap.hidden = extras === 0;
  grid.classList.toggle('has-more', extras > 0);
  grid.classList.toggle('show-all', galleryExpanded);
  btn.textContent = galleryExpanded ? 'Sembunyikan Sebagian Foto' : `Lihat ${extras} Foto Lainnya`;
};

// ---- Bangun galeri dari daftar di atas ----
const renderGallery = () => {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.innerHTML = '';

  galleryPhotos.forEach((photo, i) => {
    const item = document.createElement('div');
    item.className = 'fac-item gallery-item';
    item.dataset.caption = photo.caption || '';
    const isExtra = i >= GALLERY_INITIAL_COUNT;
    if (isExtra) item.classList.add('gallery-extra');

    const img = document.createElement('img');
    img.loading = isExtra ? 'lazy' : 'eager';   // foto tersembunyi baru diunduh saat dibuka
    img.alt = photo.caption || 'Foto galeri Thai Boxing Bandung';
    let triedFallback = false;
    img.addEventListener('error', () => {
      if (photo.fallback && !triedFallback) {
        triedFallback = true;
        img.src = photo.fallback;
      } else {
        item.remove();            // foto tidak ditemukan: sembunyikan, bukan tampil rusak
        updateGalleryMore();
      }
    });
    img.src = GALLERY_FOLDER + photo.file;
    item.appendChild(img);

    if (photo.caption) {
      const cap = document.createElement('div');
      cap.className = 'cap';
      cap.innerHTML = '<h3></h3>';
      cap.querySelector('h3').textContent = photo.caption;
      item.appendChild(cap);
    }

    item.addEventListener('click', () => openLightbox(item));
    grid.appendChild(item);
  });

  const btn = document.getElementById('galleryMore');
  if (btn) {
    btn.onclick = () => {
      galleryExpanded = !galleryExpanded;
      updateGalleryMore();
      if (!galleryExpanded) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  }
  updateGalleryMore();
};

// Render default harian saat halaman dimuat pertama kali
document.addEventListener('DOMContentLoaded', () => {
  renderSchedule('classic');
  renderGallery();
});