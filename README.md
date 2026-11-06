# Dashboard Sistem Informasi Administrasi Perkebunan Kelapa Sawit Berbasis ISPO

Sistem dashboard informasi administrasi perkebunan kelapa sawit terintegrasi yang dirancang sesuai alur kerja operasional perkebunan (Mindmap Manajemen Produktivitas Kelapa Sawit) dan standar sertifikasi keberlanjutan **ISPO (Indonesian Sustainable Palm Oil)**.

Aplikasi telah dibangun menggunakan **Next.js**, **Tailwind CSS**, dan **Lucide Icons**, serta dilengkapi fitur validasi stok real-time, cetak dokumen PDF formal perkebunan, dan ekspor data ke Excel (.xlsx).

---

## 🌾 4 Modul Utama Sistem

### 1. Administrasi Afdeling
- **Master Data Blok & SPH**: Pencatatan luasan lahan (Ha), populasi pokok, status tanaman (TBM 1-3, TM Remaja, TM Prima, TM Tua), tahun tanam, jenis tanah (Mineral, Gambut, Rendahan, Pasiran), topografi, dan jumlah TPH (1.3 TPH/Ha). SPH dikalkulasi otomatis dengan standar ISPO 136–142 pokok/Ha.
- **Buku Kerja Mandor (BKM)**: Form pencatatan harian kegiatan upkeep, alokasi Hari Kerja (HK), target vs realisasi luasan, kalkulasi biaya upah, serta status verifikasi Asisten Kepala (Askep).
- **Absensi & K3 Tenaga Kerja**: Pemantauan disiplin presensi regu rawat/semprot/pupuk, jam masuk, inspeksi kepatuhan Alat Pelindung Diri (APD K3), dan perhitungan premi harian.
- **Rotasi Pemeliharaan (Upkeep ISPO)**: Panduan teknis agronomi:
  - *Upkeep TBM*: Kastrasi bunga jantan & betina umur 6–30 bulan (rotasi 4 bulan sekali), pemupukan bahan organik hara stabil (70–80%), rawat CPT (Circle, Path, TPH), dan sensus pokok homogen.
  - *Upkeep TM*: Aturan pruning pelepah (Songgo 3 untuk TM Muda, Songgo 2 untuk TM Remaja, Songgo 1 untuk TM Tua), pemupukan prinsip 4T (Tepat Jenis, Tepat Dosis, Tepat Waktu, Tepat Cara), pengendalian HPT ramah lingkungan (Ferotrap kumbang tanduk, agensia hayati Cordyceps/Trichoderma, dan rorak konservasi tanah/air).

### 2. Administrasi Panen & Angkut PKS
- **SPK & Taksasi Panen**: Registrasi SPK panen, mandor panen, jumlah tenaga pemanen, kerapatan panen (AKP %), rata-rata berat janjang (BJR kg), target janjang, realisasi janjang, dan estimasi tonase panen.
- **Surat Pengantar Buah (SPB) & Angkut PKS**: Tiket angkut resmi terintegrasi dengan nomor polisi truk, nama supir, jam angkut, asal TPH/blok, janjang kirim, estimasi kg kebun vs timbang netto nyata di jembatan timbang PKS, serta pelacakan selisih losses (Traceability TBS 100% ISPO).
- **Inspeksi Mutu & Denda Panen**: Pengecekan kualitas panen tiap pemanen (Buah Masak prima vs denda buah mentah BM Rp 20.000, tangkai panjang TP >2cm Rp 5.000, dan brondolan tinggal BT di piringan/pasar pikul Rp 10.000).

### 3. Administrasi Gudang & Logistik
- **Buku Kartu Mutasi Stok**: Pengelolaan logistik perkebunan (Pupuk NPK/Urea/MOP/Dolomit, Herbisida Glifosat/Metil Metsulfuron, Ferotrap Oryctes, Solar Dexlite B35, Pelumas Mesin Diesel, Mata Egrek, Dodos, Sepatu Safety Boots, Helm SNI, Masker Respirator).
- **Bukti Permintaan Barang (BPB)**: Validasi otomatis stok logistik saat mandor/afdeling mengajukan barang ke gudang.
- **Bukti Penerimaan Barang (BPPB)**: Pencatatan barang masuk dari distributor/vendor resmi dengan pembaruan saldo kartu stok otomatis.
- **Reorder Point Alert**: Dashboard peringatan stok minimum dengan indikator warna status (Aman, Perlu Reorder, Kritis) dan rekomendasi jumlah pemesanan ulang (Economic Order Quantity).

### 4. Administrasi Kantor & Kearsipan Sertifikasi ISPO
- **Executive Summary Dashboard**: Ringkasan performa untuk Asisten Kantor / Askep / Estate Manager: Realisasi panen bulanan vs target RKAP (4,120.4 Ton / 4,300 Ton = 95.8%), realisasi biaya upkeep vs anggaran RKAP, biaya per hektar (Cost/Ha), rendemen minyak sawit pabrik (OER 22.85%), dan kadar asam lemak bebas (FFA 2.82%).
- **Matriks Kepatuhan 7 Prinsip ISPO**:
  - Prinsip 1: Legalitas Usaha Perkebunan (HGU No. 44/HGU/BPN/2005 & IUP).
  - Prinsip 2: Penerapan Sistem Manajemen GAP Kelapa Sawit.
  - Prinsip 3: Perlindungan Hutan Alam, Gambut, Kawasan HCV 185 Ha, dan Sempadan Sungai 50m bebas pestisida.
  - Prinsip 4: Pengelolaan Lingkungan & TPS Limbah B3 Berizin KLHK (Manifest oli bekas & jerigen tercacah).
  - Prinsip 5: Tanggung Jawab Ketenagakerjaan & K3 (Zero Accident & tes darah cholinesterase berkala operator semprot).
  - Prinsip 6: Kemitraan Kebun Plasma & Tanggung Jawab Sosial CSR.
  - Prinsip 7: Ketertelusuran TBS (Traceability) 100% dari PKS kembali ke blok kebun.
- **Pusat Ekspor Dokumen**:
  - Ekspor seluruh data operasional (Blok, BKM, Panen, SPB, Gudang, ISPO) ke format **Excel (.xlsx)** multi-sheet.
  - Cetak format formal perkebunan lengkap dengan kop PT. SAWIT LESTARI MAKMUR dan kolom tanda tangan pengesahan (Asisten TU, Askep, dan Estate Manager) atau simpan sebagai **PDF**.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi saat ini sudah aktif berjalan di:
👉 **`http://localhost:3000`**

Untuk menjalankan kembali di lain waktu:
```powershell
cd C:\Users\FSOS\.gemini\antigravity\scratch\sawit-ispo-dashboard
npm run dev
# atau untuk versi produksi cepat:
npm run start
```
