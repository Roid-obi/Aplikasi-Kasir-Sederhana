# 🛒 Aplikasi Kasir Sederhana (POS)

Aplikasi Point of Sale (POS) berbasis web yang ringan, responsif, dan mudah digunakan — cocok untuk warung, kantin, atau usaha kecil. Dibangun dengan HTML, CSS, dan JavaScript murni **tanpa framework**.

---

## ✨ Fitur Utama

- ✅ **Kategori Produk**: Makanan, Minuman, dan Tambahan  
- ✅ **Filter produk** berdasarkan kategori  
- ✅ **Keranjang belanja** dengan penambahan/pengurangan jumlah item  
- ✅ **Perhitungan otomatis**: subtotal, pajak (10%), dan grand total  
- ✅ **Struk digital** yang siap dicetak  
- ✅ **Penyimpanan lokal** menggunakan `localStorage` (keranjang tidak hilang saat refresh)  
- ✅ **Desain responsif** — bisa dipakai di HP, tablet, atau desktop  
- ✅ **Font Jepang modern**: [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP)  
- ✅ **Tema warna**: Maroon (`#800000`) dan putih — simpel dan profesional

---

## 📦 Teknologi yang Digunakan

- **HTML5**
- **CSS3** (Grid, Flexbox, Media Queries)
- **JavaScript** (ES6, DOM Manipulation, LocalStorage)
- **Google Fonts**: Noto Sans JP
- **Tanpa framework** (vanilla JS only)

---

## 🚀 Cara Menjalankan

1. Clone repositori ini:
   ```bash
   git clone https://github.com/nama-username/pos-sederhana.git
   cd pos-sederhana
   ```

2. Buka file `index.html` langsung di browser:
   ```bash
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   ```

> 💡 Tidak perlu server! Aplikasi ini berjalan sepenuhnya di sisi klien.

---

## 🖼️ Tampilan Antarmuka

- **Panel kiri**: Daftar produk dengan filter kategori  
- **Panel kanan**: Keranjang belanja + ringkasan pembayaran  
- **Tombol**:  
  - **Bayar & Cetak Struk** → tampilkan struk dalam modal  
  - **Bersihkan Keranjang** → hapus semua item  

---

## 📝 Catatan Pengembang

- Data produk disimpan dalam array JavaScript (`script.js`) — mudah dikustomisasi.  
- Semua data keranjang disimpan di `localStorage` dengan key `simple_pos_cart`.  
- Struk menggunakan font monospace agar tampil rapi saat dicetak.  
- Desain sengaja dibuat **minimalis dan fungsional**, bukan "mewah".

---

## 📄 Lisensi

Proyek ini bersifat **open-source** dan gratis untuk digunakan, dimodifikasi, atau didistribusikan — baik untuk pembelajaran maupun penggunaan komersial.

---

## 🙌 Kontribusi

Kontribusi sangat diterima!  
Jika Anda menemukan bug atau punya ide fitur:

1. Fork repositori ini  
2. Buat branch baru (`git checkout -b fitur-baru`)  
3. Commit perubahan Anda (`git commit -m 'Tambah fitur...'`)  
4. Push ke branch (`git push origin fitur-baru`)  
5. Buka Pull Request

---

## 📧 Kontak

Dibuat dengan ❤️ untuk UMKM Indonesia.  
Jika ada pertanyaan, silakan buka **Issue** di repositori ini.

---

> **"Sederhana itu indah — apalagi kalau bisa bantu jualan!"** 🍜🥤

--- 

✅ **Siap di-upload ke GitHub!**  
Cukup simpan sebagai `README.md` di root folder proyek Anda.