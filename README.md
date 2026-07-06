# 💼 WorkManager (WA Cloud Edition)

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge&logo=github" alt="Version">
  <img src="https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20JS-orange?style=for-the-badge&logo=javascript" alt="Frontend">
  <img src="https://img.shields.io/badge/Cloud%20Backup-WhatsApp%20Base64-25D366?style=for-the-badge&logo=whatsapp" alt="Database">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</p>

---

### 📝 Deskripsi Proyek
**WorkManager** adalah aplikasi sistem manajemen internal karyawan (*HRMS & Payroll*) berbasis web statis yang dirancang khusus agar **100% ringan dan bisa di-host gratis di GitHub Pages**. 

Aplikasi ini tidak memerlukan server database sewaan (seperti MySQL/PHP) yang rumit. Sebagai gantinya, aplikasi ini menggunakan **WhatsApp Base64 Engine** sebagai metode pencadangan data *cloud* yang aman, instan, dan anti-hilang—sangat ramah untuk dijalankan dan dikelola langsung dari HP!

---

### ✨ Fitur Unggulan

* 🔐 **Sistem Login Multi-level:** Membatasi hak akses antara `Owner` (Akses Penuh) dan `Mandor` (Hanya input absen lapangan).
* 📊 **Absensi Fleksibel & Suntik Data:** Mendukung perhitungan bobot **1.0 Hari (Full Day)** dan **0.5 Hari (Half Day)**, serta fitur halaman khusus untuk menyisipkan absensi masa lalu yang terlewat (4.5 hari lalu).
* 💵 **Kalkulator Gaji Otomatis:** Menghitung akumulasi hari kerja secara presisi (termasuk pecahan desimal), ditambah tunjangan makan/transport, dan potongan kasbon otomatis.
* 💳 **Manajemen Kasbon (Pinjaman):** Melacak sisa saldo pinjaman karyawan secara langsung.
* ☁️ **WhatsApp Database Cloud Engine:** Mengubah seluruh isi database lokal menjadi kode teks terenkripsi untuk dicadangkan langsung ke chat WhatsApp pribadi dalam 1 klik.

---

### 🔑 Akses Akun Demo (Bawaan)

Kamu bisa langsung mencoba simulasi hak akses menggunakan akun bawaan di bawah ini:

| Jabatan / Hak Akses | Username | Password | Fitur yang Terbuka |
| :--- | :--- | :--- | :--- |
| **Owner (Pemilik)** | `owner` | `123` | Semua menu (Karyawan, Gaji, Pinjaman, Setting, Absen) |
| **Mandor (Pengawas)** | `mandor` | `123` | Dashboard ringkasan, Absen Massal, & Input Manual saja |

> ⚠️ *Catatan: Ketik username menggunakan huruf kecil semua.*

---

### 🚀 Cara Pemasangan di GitHub Pages

1. **Buat Repositori Baru** di akun GitHub kamu.
2. Unggah (`Upload`) semua berkas proyek kamu ke repositori tersebut:
   * `login.html`
   * `index.html`
   * `input_manual.html`
   * `app.js`
   * `style.css`
   * `README.md`
3. Pergi ke menu **Settings** repositori kamu $\rightarrow$ **Pages**.
4. Di bagian *Build and deployment*, ubah Branch menjadi `main` (atau `master`), lalu klik **Save**.
5. Tunggu sekitar 1-2 menit, GitHub akan memberikan tautan URL online aplikasi kamu.

---

### 💡 Cara Menyalakan Fitur Backup WhatsApp

1. Setelah berhasil login pertama kali sebagai `owner`, masuk ke menu **Setting** di bagian paling bawah sidebar.
2. Pada kolom nomor WhatsApp, masukkan nomor kamu diawali kode negara (Contoh: `628123456789`). Klik **Simpan Pengaturan**.
3. Selesai! Kamu sekarang bisa melakukan backup kapan saja dengan menekan tombol **Kirim Backup ke WA**.

---
<p align="center">Made with ❤️ for lightweight business operations.</p>
