// Data Master & Simulasi Administrasi Perkebunan Kelapa Sawit Berbasis ISPO
// PT. SAWIT LESTARI MAKMUR - KEBUN SEJAHTERA (2,450 Ha)

export const initialAfdelingData = [
  { id: 'BLOK-A01', afdeling: 'Afdeling I', luasHa: 28.5, jmlPokok: 3990, sph: 140, status: 'TM-Prima', thnTanam: 2016, jenisTanah: 'Mineral', topografi: 'Datar', tph: 37, mandor: 'Supardi' },
  { id: 'BLOK-A02', afdeling: 'Afdeling I', luasHa: 30.0, jmlPokok: 4260, sph: 142, status: 'TM-Prima', thnTanam: 2016, jenisTanah: 'Mineral', topografi: 'Datar', tph: 39, mandor: 'Supardi' },
  { id: 'BLOK-A03', afdeling: 'Afdeling I', luasHa: 25.0, jmlPokok: 3400, sph: 136, status: 'TM-Remaja', thnTanam: 2019, jenisTanah: 'Rendahan', topografi: 'Datar', tph: 32, mandor: 'Supardi' },
  { id: 'BLOK-B01', afdeling: 'Afdeling II', luasHa: 32.0, jmlPokok: 4480, sph: 140, status: 'TM-Prima', thnTanam: 2015, jenisTanah: 'Mineral', topografi: 'Bergelombang', tph: 41, mandor: 'Bambang I.' },
  { id: 'BLOK-B02', afdeling: 'Afdeling II', luasHa: 29.5, jmlPokok: 4130, sph: 140, status: 'TBM-3', thnTanam: 2022, jenisTanah: 'Gambut', topografi: 'Datar', tph: 38, mandor: 'Bambang I.' },
  { id: 'BLOK-B03', afdeling: 'Afdeling II', luasHa: 27.0, jmlPokok: 3834, sph: 142, status: 'TBM-2', thnTanam: 2023, jenisTanah: 'Gambut', topografi: 'Datar', tph: 35, mandor: 'Bambang I.' },
  { id: 'BLOK-C01', afdeling: 'Afdeling III', luasHa: 35.0, jmlPokok: 4900, sph: 140, status: 'TM-Tua', thnTanam: 2008, jenisTanah: 'Mineral', topografi: 'Terasering', tph: 45, mandor: 'Hendra K.' },
  { id: 'BLOK-C02', afdeling: 'Afdeling III', luasHa: 31.0, jmlPokok: 4340, sph: 140, status: 'TM-Prima', thnTanam: 2014, jenisTanah: 'Mineral', topografi: 'Bergelombang', tph: 40, mandor: 'Hendra K.' },
  { id: 'BLOK-D01', afdeling: 'Afdeling IV', luasHa: 26.0, jmlPokok: 3692, sph: 142, status: 'TM-Remaja', thnTanam: 2018, jenisTanah: 'Pasiran', topografi: 'Datar', tph: 34, mandor: 'Wahyudi' },
  { id: 'BLOK-D02', afdeling: 'Afdeling IV', luasHa: 33.0, jmlPokok: 4620, sph: 140, status: 'TBM-1', thnTanam: 2024, jenisTanah: 'Mineral', topografi: 'Datar', tph: 42, mandor: 'Wahyudi' }
];

export const initialBKMData = [
  { id: 'BKM-2026-1101', tanggal: '2026-11-04', afdeling: 'Afdeling I', blok: 'BLOK-A01', mandor: 'Supardi', kegiatan: 'Rawat CPT (Circle, Path, TPH)', tenagaKerja: 8, targetHa: 12.0, realisasiHa: 12.5, satuan: 'Ha', biayaHK: 1080000, status: 'Terverifikasi Askep' },
  { id: 'BKM-2026-1102', tanggal: '2026-11-04', afdeling: 'Afdeling II', blok: 'BLOK-B03', mandor: 'Bambang I.', kegiatan: 'Kastrasi Bunga TBM (Sanitasi)', tenagaKerja: 5, targetHa: 8.0, realisasiHa: 8.0, satuan: 'Ha', biayaHK: 675000, status: 'Terverifikasi Askep' },
  { id: 'BKM-2026-1103', tanggal: '2026-11-04', afdeling: 'Afdeling II', blok: 'BLOK-B01', mandor: 'Bambang I.', kegiatan: 'Pruning Pelepah Songgo 2 (TM Remaja)', tenagaKerja: 7, targetHa: 9.0, realisasiHa: 9.5, satuan: 'Ha', biayaHK: 945000, status: 'Menunggu Verifikasi' },
  { id: 'BKM-2026-1104', tanggal: '2026-11-04', afdeling: 'Afdeling III', blok: 'BLOK-C01', mandor: 'Hendra K.', kegiatan: 'Pemupukan TM NPK 13-6-27 (Prinsip 4T)', tenagaKerja: 10, targetHa: 15.0, realisasiHa: 14.8, satuan: 'Ha', biayaHK: 1350000, status: 'Terverifikasi Askep' },
  { id: 'BKM-2026-1105', tanggal: '2026-11-03', afdeling: 'Afdeling IV', blok: 'BLOK-D01', mandor: 'Wahyudi', kegiatan: 'Pengendalian Gulma / Chem Wiping Piringan', tenagaKerja: 6, targetHa: 10.0, realisasiHa: 10.0, satuan: 'Ha', biayaHK: 810000, status: 'Terverifikasi Askep' },
  { id: 'BKM-2026-1106', tanggal: '2026-11-03', afdeling: 'Afdeling I', blok: 'BLOK-A02', mandor: 'Supardi', kegiatan: 'Dongkel Anak Kayu (DAK Gawangan)', tenagaKerja: 6, targetHa: 8.5, realisasiHa: 8.5, satuan: 'Ha', biayaHK: 810000, status: 'Terverifikasi Askep' }
];

export const initialAbsensiData = [
  { nik: 'TK-0104', nama: 'Agus Santoso', afdeling: 'Afdeling I', regu: 'Regu Semprot', status: 'Hadir', jamMasuk: '06:15', apd: 'Lengkap (Masker+Boots+Glove)', premi: 25000 },
  { nik: 'TK-0109', nama: 'Joko Pranoto', afdeling: 'Afdeling I', regu: 'Regu Rawat CPT', status: 'Hadir', jamMasuk: '06:20', apd: 'Lengkap', premi: 30000 },
  { nik: 'TK-0211', nama: 'Slamet Riyadi', afdeling: 'Afdeling II', regu: 'Regu Kastrasi', status: 'Hadir', jamMasuk: '06:10', apd: 'Lengkap', premi: 20000 },
  { nik: 'TK-0215', nama: 'M. Syarifuddin', afdeling: 'Afdeling II', regu: 'Regu Pruning', status: 'Hadir', jamMasuk: '06:18', apd: 'Lengkap (Helm+Kacamata)', premi: 35000 },
  { nik: 'TK-0302', nama: 'Wawan Gunawan', afdeling: 'Afdeling III', regu: 'Regu Pupuk', status: 'Hadir', jamMasuk: '06:05', apd: 'Lengkap (Respirator+Boots)', premi: 40000 },
  { nik: 'TK-0314', nama: 'Dedi Kurniawan', afdeling: 'Afdeling III', regu: 'Regu Pupuk', status: 'Sakit (Surat Dokter)', jamMasuk: '-', apd: '-', premi: 0 },
  { nik: 'TK-0408', nama: 'Budi Hartono', afdeling: 'Afdeling IV', regu: 'Regu Wiping', status: 'Hadir', jamMasuk: '06:22', apd: 'Lengkap', premi: 20000 }
];

export const initialPanenSPK = [
  { id: 'SPK-PN-261104-01', tanggal: '2026-11-04', afdeling: 'Afdeling I', blok: 'BLOK-A01', mandor: 'Rustam Effendi', jmlPemanen: 14, akpPersen: 22.5, bjrKg: 21.4, targetJanjang: 880, realisasiJanjang: 915, estimasiTon: 19.58, status: 'Selesai Angkut' },
  { id: 'SPK-PN-261104-02', tanggal: '2026-11-04', afdeling: 'Afdeling I', blok: 'BLOK-A02', mandor: 'Rustam Effendi', jmlPemanen: 15, akpPersen: 24.0, bjrKg: 22.1, targetJanjang: 950, realisasiJanjang: 970, estimasiTon: 21.44, status: 'Sedang Muat di TPH' },
  { id: 'SPK-PN-261104-03', tanggal: '2026-11-04', afdeling: 'Afdeling II', blok: 'BLOK-B01', mandor: 'Danang Tri', jmlPemanen: 16, akpPersen: 21.0, bjrKg: 20.8, targetJanjang: 920, realisasiJanjang: 890, estimasiTon: 18.51, status: 'Menuju PKS' },
  { id: 'SPK-PN-261104-04', tanggal: '2026-11-04', afdeling: 'Afdeling III', blok: 'BLOK-C02', mandor: 'Surono', jmlPemanen: 15, akpPersen: 23.5, bjrKg: 23.0, targetJanjang: 980, realisasiJanjang: 1010, estimasiTon: 23.23, status: 'Dalam Proses Panen' }
];

export const initialSPBData = [
  { noSPB: 'SPB-PKS-261104-001', tanggal: '2026-11-04', jam: '10:45', afdeling: 'Afdeling I', blok: 'BLOK-A01', tph: 'TPH 01-12', noPolisi: 'BK 8452 XT', supir: 'Tugiman', janjangKirim: 450, estimasiKg: 9630, timbangNettoKg: 9580, selisihKg: -50, pksTujuan: 'PKS KEBUN SEJAHTERA (PKS-01)', status: 'Diterima PKS' },
  { noSPB: 'SPB-PKS-261104-002', tanggal: '2026-11-04', jam: '11:30', afdeling: 'Afdeling I', blok: 'BLOK-A01', tph: 'TPH 13-25', noPolisi: 'BM 9123 EA', supir: 'Kuswanto', janjangKirim: 465, estimasiKg: 9951, timbangNettoKg: 9920, selisihKg: -31, pksTujuan: 'PKS KEBUN SEJAHTERA (PKS-01)', status: 'Diterima PKS' },
  { noSPB: 'SPB-PKS-261104-003', tanggal: '2026-11-04', jam: '13:15', afdeling: 'Afdeling II', blok: 'BLOK-B01', tph: 'TPH 01-18', noPolisi: 'BK 8812 ZL', supir: 'Nasrullah', janjangKirim: 440, estimasiKg: 9152, timbangNettoKg: 0, selisihKg: 0, pksTujuan: 'PKS KEBUN SEJAHTERA (PKS-01)', status: 'Menuju Jembatan Timbang' },
  { noSPB: 'SPB-PKS-261104-004', tanggal: '2026-11-04', jam: '14:00', afdeling: 'Afdeling III', blok: 'BLOK-C02', tph: 'TPH 05-15', noPolisi: 'BA 9044 LD', supir: 'Rudi Ardiansyah', janjangKirim: 480, estimasiKg: 11040, timbangNettoKg: 0, selisihKg: 0, pksTujuan: 'PKS KEBUN SEJAHTERA (PKS-01)', status: 'Pemuatan di Blok' }
];

export const initialDendaPanen = [
  { id: 'QC-PN-001', tanggal: '2026-11-04', pemanen: 'Sarmin (NIK: 0882)', afdeling: 'Afdeling I', blok: 'BLOK-A01', sampelJanjang: 100, buahMasak: 94, buahMentah: 2, tangkaiPanjang: 3, brondolanTinggalPkk: 1, dendaRp: 45000, keterangan: 'Tangkai > 2cm dipotong ulang di TPH' },
  { id: 'QC-PN-002', tanggal: '2026-11-04', pemanen: 'M. Ridwan (NIK: 0891)', afdeling: 'Afdeling I', blok: 'BLOK-A01', sampelJanjang: 100, buahMasak: 98, buahMentah: 0, tangkaiPanjang: 1, brondolanTinggalPkk: 1, dendaRp: 15000, keterangan: 'Brondolan dikutip bersih' },
  { id: 'QC-PN-003', tanggal: '2026-11-04', pemanen: 'Jumali (NIK: 0914)', afdeling: 'Afdeling II', blok: 'BLOK-B01', sampelJanjang: 100, buahMasak: 91, buahMentah: 4, tangkaiPanjang: 4, brondolanTinggalPkk: 1, dendaRp: 75000, keterangan: 'Peringatan buah mentah tidak membrondol' },
  { id: 'QC-PN-004', tanggal: '2026-11-03', pemanen: 'Suparno (NIK: 0741)', afdeling: 'Afdeling III', blok: 'BLOK-C01', sampelJanjang: 100, buahMasak: 99, buahMentah: 0, tangkaiPanjang: 1, brondolanTinggalPkk: 0, dendaRp: 5000, keterangan: 'Sangat baik, buah masak optimal' }
];

export const initialGudangStok = [
  { id: 'STK-PUP-01', nama: 'Pupuk NPK 13-6-27-4+0.5B', kategori: 'Pupuk', satuan: 'Zak (50 Kg)', stokAwal: 800, masuk: 400, keluar: 240, stokAkhir: 960, minStok: 300, lokasi: 'Gudang Kimia Sektor A', status: 'Aman' },
  { id: 'STK-PUP-02', nama: 'Pupuk Urea Petro Granul 46% N', kategori: 'Pupuk', satuan: 'Zak (50 Kg)', stokAwal: 350, masuk: 0, keluar: 220, stokAkhir: 130, minStok: 200, lokasi: 'Gudang Kimia Sektor A', status: 'Perlu Reorder' },
  { id: 'STK-PUP-03', nama: 'Pupuk MOP / KCl 60% K2O', kategori: 'Pupuk', satuan: 'Zak (50 Kg)', stokAwal: 500, masuk: 200, keluar: 150, stokAkhir: 550, minStok: 250, lokasi: 'Gudang Kimia Sektor A', status: 'Aman' },
  { id: 'STK-PUP-04', nama: 'Dolomit Super Magnesium', kategori: 'Pupuk', satuan: 'Zak (50 Kg)', stokAwal: 120, masuk: 0, keluar: 90, stokAkhir: 30, minStok: 100, lokasi: 'Gudang Terbuka Sektor B', status: 'Kritis' },
  { id: 'STK-HER-01', nama: 'Glifosat 480 SL (Herbisida Sistemik)', kategori: 'Herbisida', satuan: 'Jerigen (20 L)', stokAwal: 85, masuk: 40, keluar: 25, stokAkhir: 100, minStok: 40, lokasi: 'Gudang Pestisida Berizin', status: 'Aman' },
  { id: 'STK-HER-02', nama: 'Metil Metsulfuron 20 WDG (Gulma Kayu)', kategori: 'Herbisida', satuan: 'Sachet (250 gr)', stokAwal: 140, masuk: 0, keluar: 60, stokAkhir: 80, minStok: 50, lokasi: 'Gudang Pestisida Berizin', status: 'Aman' },
  { id: 'STK-HER-03', nama: 'Ferotrap Oryctes (Feromon Kumbang Tanduk)', kategori: 'Pestisida', satuan: 'Paket / Ampul', stokAwal: 45, masuk: 0, keluar: 30, stokAkhir: 15, minStok: 25, lokasi: 'Ruang PHT Khusus', status: 'Perlu Reorder' },
  { id: 'STK-BBM-01', nama: 'BBM Solar Dexlite B35 Traktor/Alat', kategori: 'BBM & Pelumas', satuan: 'Liter', stokAwal: 4800, masuk: 5000, keluar: 3100, stokAkhir: 6700, minStok: 2500, lokasi: 'Tangki Timbun BBM Gudang Utama', status: 'Aman' },
  { id: 'STK-BBM-02', nama: 'Pelumas Mesin SAE 40 Diesel Heavy Duty', kategori: 'BBM & Pelumas', satuan: 'Drum (200 L)', stokAwal: 6, masuk: 2, keluar: 1, stokAkhir: 7, minStok: 3, lokasi: 'Rumah Oli & Grease', status: 'Aman' },
  { id: 'STK-SPR-01', nama: 'Mata Egrek Panen Baja Karbon King Star', kategori: 'Sparepart & Alat', satuan: 'Pcs', stokAwal: 95, masuk: 50, keluar: 42, stokAkhir: 103, minStok: 40, lokasi: 'Rak Perkakas A-3', status: 'Aman' },
  { id: 'STK-SPR-02', nama: 'Dodos Panen Gagang Besi 12.5 cm', kategori: 'Sparepart & Alat', satuan: 'Pcs', stokAwal: 40, masuk: 0, keluar: 28, stokAkhir: 12, minStok: 20, lokasi: 'Rak Perkakas A-4', status: 'Perlu Reorder' },
  { id: 'STK-APD-01', nama: 'Sepatu Safety Boots Karet Nitril Tahan Kimia', kategori: 'Alat Pelindung Diri (APD)', satuan: 'Pasang', stokAwal: 60, masuk: 50, keluar: 45, stokAkhir: 65, minStok: 30, lokasi: 'Lemari APD K3', status: 'Aman' },
  { id: 'STK-APD-02', nama: 'Helm Safety Lapangan Sertifikasi SNI', kategori: 'Alat Pelindung Diri (APD)', satuan: 'Pcs', stokAwal: 25, masuk: 0, keluar: 18, stokAkhir: 7, minStok: 15, lokasi: 'Lemari APD K3', status: 'Kritis' },
  { id: 'STK-APD-03', nama: 'Masker Respirator Filter Pestisida 3M', kategori: 'Alat Pelindung Diri (APD)', satuan: 'Pcs', stokAwal: 45, masuk: 30, keluar: 22, stokAkhir: 53, minStok: 25, lokasi: 'Lemari APD K3', status: 'Aman' }
];

export const initialBPBData = [
  { id: 'BPB-2026-11001', tanggal: '2026-11-04', afdeling: 'Afdeling I', keperluan: 'Pemupukan TM NPK Blok A01-A02', barang: 'Pupuk NPK 13-6-27-4+0.5B', jumlah: 120, satuan: 'Zak', pemohon: 'Supardi (Mandor 1)', disetujuiOleh: 'Ir. Hendra Wardhana (Asisten Lapangan)', status: 'Approved' },
  { id: 'BPB-2026-11002', tanggal: '2026-11-04', afdeling: 'Afdeling II', keperluan: 'Semprot Piringan Gulma Blok B02', barang: 'Glifosat 480 SL', jumlah: 15, satuan: 'Jerigen', pemohon: 'Bambang I. (Mandor)', disetujuiOleh: 'Ir. Hendra Wardhana (Asisten Lapangan)', status: 'Approved' },
  { id: 'BPB-2026-11003', tanggal: '2026-11-04', afdeling: 'Bengkel & Traksi', keperluan: 'Pengisian Bahan Bakar Traktor Angkut TBS MF-02', barang: 'BBM Solar Dexlite B35', jumlah: 450, satuan: 'Liter', pemohon: 'Danu (Kepala Bengkel)', disetujuiOleh: 'Ir. Hendra Wardhana (Asisten Lapangan)', status: 'Approved' },
  { id: 'BPB-2026-11004', tanggal: '2026-11-04', afdeling: 'Afdeling III', keperluan: 'Penggantian APD Rusak Regu Semprot Kimia', barang: 'Masker Respirator Filter Pestisida 3M', jumlah: 8, satuan: 'Pcs', pemohon: 'Hendra K. (Mandor 1)', disetujuiOleh: 'Menunggu Review Askep', status: 'Pending' }
];

export const initialBPPBData = [
  { id: 'BPPB-2026-1044', tanggal: '2026-11-03', vendor: 'PT. Petrokimia Gresik Distributor', noSuratJalan: 'SJ-PG-9921', barang: 'Pupuk NPK 13-6-27-4+0.5B', jumlahTerima: 400, satuan: 'Zak', kondisi: 'Bagus (Kemasan Utuh & Kering)', penerima: 'M. Sodik (Petugas Gudang)', status: 'Masuk Stok' },
  { id: 'BPPB-2026-1045', tanggal: '2026-11-02', vendor: 'PT. Pertamina Patra Niaga', noSuratJalan: 'SJ-PTM-08412', barang: 'BBM Solar Dexlite B35', jumlahTerima: 5000, satuan: 'Liter', kondisi: 'Sesuai Spesifikasi Density', penerima: 'M. Sodik (Petugas Gudang)', status: 'Masuk Stok' },
  { id: 'BPPB-2026-1046', tanggal: '2026-11-01', vendor: 'CV. Agro Sarana Kencana', noSuratJalan: 'SJ-ASK-302', barang: 'Sepatu Safety Boots Karet Nitril', jumlahTerima: 50, satuan: 'Pasang', kondisi: 'Lengkap SNI', penerima: 'M. Sodik (Petugas Gudang)', status: 'Masuk Stok' }
];

export const initialISPOData = [
  {
    prinsip: 'Prinsip 1: Legalitas Usaha Perkebunan',
    status: 'Patuh (100%)',
    keterangan: 'Sertifikat HGU No. 44/HGU/BPN/2005 (Luas 2,450 Ha), Izin Usaha Perkebunan (IUP) No. 503/IUP/BUN/2008. Seluruh patok batas BPN terawat dan diverifikasi GPS berkala.',
    fileDokumen: 'HGU_IUP_PetaKadastral_2026.pdf',
    tglAudit: '2026-09-15',
    auditor: 'TUV Rheinland Indonesia'
  },
  {
    prinsip: 'Prinsip 2: Penerapan Sistem Manajemen Perkebunan (GAP)',
    status: 'Patuh (98%)',
    keterangan: 'Penerapan GAP Kelapa Sawit: SPH standar 136-142 pkk/ha, kastrasi TBM teratur, rotasi pruning songgo 1-3 sesuai umur tanaman, dan pemupukan berbasis analisa daun/tanah 4T.',
    fileDokumen: 'SOP_KulturTeknis_Agronomi_ISPO.pdf',
    tglAudit: '2026-09-16',
    auditor: 'TUV Rheinland Indonesia'
  },
  {
    prinsip: 'Prinsip 3: Perlindungan Pemanfaatan Hutan Alam & Gambut',
    status: 'Patuh (100%)',
    keterangan: 'Identifikasi HCV/NKT seluas 185 Ha. Penandaan sempadan Sungai Batang Pane (riparian buffer zone 50 meter) dengan plang cat merah anti-kimia & penanaman bambu/kayu lokal.',
    fileDokumen: 'Laporan_Monitoring_HCV_Sungai.pdf',
    tglAudit: '2026-09-16',
    auditor: 'TUV Rheinland Indonesia'
  },
  {
    prinsip: 'Prinsip 4: Pengelolaan dan Pemantauan Lingkungan Hidup & Limbah B3',
    status: 'Patuh (96%)',
    keterangan: 'TPS Limbah B3 berizin resmi KLHK No. 04/TPS-LB3/2022. Logbook manifest limbah B3 (oli bekas, kemasan pestisida bilas 3x & puncture, kain majun terkontaminasi). Kerjasama pemusnahan resmi dengan PT. Wastec.',
    fileDokumen: 'Manifest_LB3_TPS_Triwulan3.pdf',
    tglAudit: '2026-09-17',
    auditor: 'TUV Rheinland Indonesia'
  },
  {
    prinsip: 'Prinsip 5: Tanggung Jawab Ketenagakerjaan & K3 (Kesehatan & Keselamatan Kerja)',
    status: 'Patuh (100%)',
    keterangan: 'Struktur P2K3 aktif, penyediaan APD gratis 100% karyawan, zero fatality, tes darah cholinesterase berkala untuk seluruh operator semprot & pupuk kimia setiap 6 bulan.',
    fileDokumen: 'Rekap_P2K3_Cholinesterase_K3_2026.pdf',
    tglAudit: '2026-09-17',
    auditor: 'TUV Rheinland Indonesia'
  },
  {
    prinsip: 'Prinsip 6: Tanggung Jawab Sosial dan Pemberdayaan Ekonomi Masyarakat',
    status: 'Patuh (95%)',
    keterangan: 'Kemitraan kebun plasma Koperasi Sawit Makmur (520 Ha). Program CSR beasiswa pendidikan anak buruh tani dan bantuan perbaikan jalan desa penyangga.',
    fileDokumen: 'Laporan_Realisasi_CSR_Plasma_2026.pdf',
    tglAudit: '2026-09-18',
    auditor: 'TUV Rheinland Indonesia'
  },
  {
    prinsip: 'Prinsip 7: Peningkatan Usaha Berkelanjutan & Ketertelusuran TBS (Traceability)',
    status: 'Patuh (100%)',
    keterangan: 'Ketertelusuran TBS 100% dari PKS kembali ke asal blok dan TPH kebun. Tidak ada pasokan buah dari kawasan terlarang atau deforestasi liar pasca batas cutoff ISPO.',
    fileDokumen: 'Traceability_Matrix_TBS_2026.pdf',
    tglAudit: '2026-09-18',
    auditor: 'TUV Rheinland Indonesia'
  }
];

export const executiveKPISummary = {
  kebunName: 'PT. SAWIT LESTARI MAKMUR',
  estate: 'Estate Sejahtera Utama',
  luasTotalHa: 2450.0,
  luasTMHa: 1980.5,
  luasTBMHa: 469.5,
  totalPokok: 343200,
  panenBulanIniTon: 4120.4,
  targetPanenTon: 4300.0,
  pencapaianPanenPersen: 95.8,
  bjrRataRata: 21.8,
  oerPersenPKS: 22.85,
  ffaPersenPKS: 2.82,
  realisasiUpkeepBudget: 845000000,
  rkapUpkeepBudget: 920000000,
  biayaPerHa: 426760,
  efisiensiHKPersen: 94.2,
  reorderAlertCount: 4,
  statusKepatuhanISPO: 'Tersertifikasi (Valid s.d. Nov 2028)'
};
