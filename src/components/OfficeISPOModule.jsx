'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BarChart3, 
  FileText, 
  Award, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  Download, 
  Printer, 
  AlertCircle, 
  ExternalLink,
  Layers,
  Leaf,
  Users2,
  GraduationCap
} from 'lucide-react';
import { exportToExcel, exportMultipleSheetsToExcel, triggerPrint } from '../utils/exportUtils';

export default function OfficeISPOModule({ 
  executiveData, 
  ispoList, 
  afdelingList, 
  bkmList, 
  panenSPKList, 
  spbList, 
  gudangStok, 
  searchTerm 
}) {
  const [subTab, setSubTab] = useState('eksekutif'); // 'eksekutif' | 'ispo' | 'limbah' | 'laporan'
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Limbah B3 logbook simulation
  const limbahB3Logs = [
    { id: 'LB3-2611-01', tanggal: '2026-11-02', jenisLimbah: 'Oli Bekas Mesin Traktor/Genset', kodeLimbah: 'B105d', jumlah: '380 Liter', sumber: 'Bengkel Sentral Traksi', penyimpanan: 'Drum Besi TPS LB3 Berizin', status: 'Tersimpan (Maks 90 hari)', transporter: 'PT. Wastec International' },
    { id: 'LB3-2611-02', tanggal: '2026-11-01', jenisLimbah: 'Kemasan Bekas Pestisida (Bilas 3x & Puncture)', kodeLimbah: 'B353-1', jumlah: '45 Jerigen', sumber: 'Afdeling I & II (Penyemprotan)', penyimpanan: 'Ruang Wadah Khusus TPS', status: 'Tercacah & Ditusuk', transporter: 'PT. Wastec International' },
    { id: 'LB3-2610-18', tanggal: '2026-10-28', jenisLimbah: 'Aki/Baterai Bekas Traktor', kodeLimbah: 'A102d', jumlah: '6 Unit', sumber: 'Bengkel Sentral Traksi', penyimpanan: 'Pallet Tertutup TPS', status: 'Siap Angkut Vendor', transporter: 'PT. Wastec International' },
    { id: 'LB3-2610-14', tanggal: '2026-10-25', jenisLimbah: 'Kain Majun & Sarung Tangan Bekas Oli', kodeLimbah: 'B110d', jumlah: '25 Kg', sumber: 'Bengkel & Gudang Oli', penyimpanan: 'Drum Kuning Berlabel B3', status: 'Tersimpan', transporter: 'PT. Wastec International' }
  ];

  const handleExportFullSystem = () => {
    const multiData = {
      'Master Blok': afdelingList,
      'BKM Mandor': bkmList,
      'SPK Panen': panenSPKList,
      'Tiket SPB PKS': spbList,
      'Stok Gudang': gudangStok,
      'Audit ISPO': ispoList
    };
    exportMultipleSheetsToExcel(multiData, 'Rekapitulasi_Lengkap_Operasional_Sawit_ISPO');
  };

  const handleExportISPOReport = () => {
    exportToExcel(ispoList, 'Rekap_Audit_Kepatuhan_ISPO');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Subtabs */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Modul 4: Manajemen Kantor & Sertifikasi ISPO
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Administrasi Kantor & Kepatuhan ISPO</h2>
          <p className="text-xs text-slate-500">
            Executive summary untuk Askep / Manajer, pemenuhan 7 Prinsip Sertifikasi ISPO, K3, dan logbook limbah B3.
          </p>

          {/* Posisi Identitas Mahasiswa Penanggung Jawab Modul (Posisi Seragam) */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium shadow-xs">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span className="text-slate-500">Penanggung Jawab:</span>
              <span className="font-bold text-emerald-900">Imel Twenty Agusti</span>
              <span className="text-emerald-800 font-mono font-semibold bg-emerald-100/90 px-2 py-0.5 rounded-md border border-emerald-300">
                NIM: 24244004
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setSubTab('eksekutif')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'eksekutif' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ringkasan Eksekutif
          </button>
          <button
            onClick={() => setSubTab('ispo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'ispo' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            7 Prinsip ISPO
          </button>
          <button
            onClick={() => setSubTab('limbah')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'limbah' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Logbook Limbah B3 & K3
          </button>
          <button
            onClick={() => setSubTab('laporan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'laporan' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pusat Ekspor & Cetak
          </button>
        </div>
      </div>

      {/* SUBTAB 1: RINGKASAN EKSEKUTIF */}
      {subTab === 'eksekutif' && (
        <div className="space-y-6">
          {/* Top KPI Scorecards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>Panen Bulan Berjalan</span>
                <TrendingUp className="w-4 h-4 text-emerald-700" />
              </div>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {executiveData.panenBulanIniTon} <span className="text-xs font-normal text-slate-500">/ {executiveData.targetPanenTon} Ton</span>
              </p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                <div 
                  className="bg-emerald-600 h-1.5 rounded-full" 
                  style={{ width: `${executiveData.pencapaianPanenPersen}%` }}
                />
              </div>
              <p className="text-[11px] text-emerald-700 mt-1.5 font-medium">
                Pencapaian: {executiveData.pencapaianPanenPersen}% RKAP
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>Biaya Upkeep vs Budget</span>
                <DollarSign className="w-4 h-4 text-emerald-700" />
              </div>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                Rp 845 <span className="text-xs font-normal text-slate-500">Juta</span>
              </p>
              <p className="text-[11px] text-emerald-700 mt-1">Hemat Rp 75 Jt (Under budget RKAP)</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Cost per Ha: Rp {executiveData.biayaPerHa.toLocaleString()}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>Kualitas Pengolahan PKS</span>
                <Award className="w-4 h-4 text-emerald-700" />
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-emerald-800">{executiveData.oerPersenPKS}%</span>
                <span className="text-xs text-slate-500 font-medium">Rendemen OER</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">Kadar Asam Bebas (FFA): <strong className="text-emerald-700">{executiveData.ffaPersenPKS}%</strong> (&lt;3.5%)</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>Status Audit ISPO</span>
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
              </div>
              <p className="text-lg font-bold text-emerald-800 mt-1 flex items-center gap-1.5">
                <CheckCircle className="w-5 h-5 text-emerald-600" /> Valid
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Sertifikat Berlaku s.d. Nov 2028</p>
              <p className="text-[10px] text-emerald-700 mt-0.5">Surveillance Audit: Lulus Tanpa Temuan</p>
            </div>
          </div>

          {/* Strategic Estate Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Overview Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-slate-900 text-sm">Profil Estate & Evaluasi Manajemen Produktivitas</h3>
                <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  HGU: 2,450 Ha
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 block">Luas Tanaman Menghasilkan (TM)</span>
                  <span className="text-xl font-bold text-emerald-800 font-mono mt-0.5 block">{executiveData.luasTMHa} Ha</span>
                  <span className="text-[10px] text-slate-500">80.8% dari total HGU</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 block">Luas Belum Menghasilkan (TBM)</span>
                  <span className="text-xl font-bold text-amber-600 font-mono mt-0.5 block">{executiveData.luasTBMHa} Ha</span>
                  <span className="text-[10px] text-slate-500">19.2% (TBM 1-3)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 block">Total Populasi Pohon</span>
                  <span className="text-xl font-bold text-slate-900 font-mono mt-0.5 block">{executiveData.totalPokok.toLocaleString()}</span>
                  <span className="text-[10px] text-emerald-700">SPH Standar 140 pkk/ha</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-100 space-y-2">
                <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  Catatan Agronomi & Strategi Produktivitas Askep
                </h4>
                <ul className="text-xs text-emerald-900/90 space-y-1 list-disc list-inside leading-relaxed">
                  <li>Rotasi panen dijaga konsisten pada siklus 7-8 hari untuk menjaga kematangan buah (Fraksi 2-3) dan menekan asam lemak bebas (FFA).</li>
                  <li>Aplikasi pemupukan TM Semester II telah mencapai 82% target luasan dengan prinsip 4T (Tepat Jenis, Dosis, Waktu, dan Cara).</li>
                  <li>Zona sempadan Sungai Batang Pane (185 Ha HCV) bebas dari herbisida kimiawi dan terawat sebagai koridor keanekaragaman hayati ISPO.</li>
                </ul>
              </div>
            </div>

            {/* Quick Actions & Audit Readiness */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm border-b pb-3">Kesiapan Audit ISPO</h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Legalitas & Patok HGU</span>
                  <span className="font-bold text-emerald-700">100% Siap</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Kepatuhan K3 & APD Lapangan</span>
                  <span className="font-bold text-emerald-700">100% Siap</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Manifest Limbah B3 KLHK</span>
                  <span className="font-bold text-emerald-700">96% Siap</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Ketertelusuran TBS (Traceability)</span>
                  <span className="font-bold text-emerald-700">100% Siap</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleExportFullSystem}
                  className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Download className="w-4 h-4" /> Download Executive Pack (Excel)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: 7 PRINSIP SERTIFIKASI ISPO */}
      {subTab === 'ispo' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Dokumen & Matriks 7 Prinsip Sertifikasi ISPO Perkebunan</h3>
              <p className="text-xs text-slate-500">Standar Permentan No. 38 Tahun 2020 tentang Sertifikasi Kelapa Sawit Berkelanjutan Indonesia.</p>
            </div>
            <button
              onClick={handleExportISPOReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm"
            >
              <Download className="w-4 h-4" /> Ekspor Matriks ISPO
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {ispoList.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                      P{idx + 1}
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{item.prinsip}</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 w-fit">
                    {item.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{item.keterangan}</p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100">
                  <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                    <span>Audit Terakhir: <strong>{item.tglAudit}</strong></span>
                    <span>Auditor: <strong>{item.auditor}</strong></span>
                  </div>

                  <button
                    onClick={() => alert(`Membuka berkas kearsipan sertifikasi: ${item.fileDokumen}\n\nDokumen resmi tersimpan aman dalam repositori ISO/ISPO Kebun Sejahtera.`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{item.fileDokumen}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: LOGBOOK LIMBAH B3 & K3 */}
      {subTab === 'limbah' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Logbook TPS Limbah Bahan Berbahaya & Beracun (B3)</h3>
                <p className="text-xs text-slate-500">Izin TPS LB3 No. 04/TPS-LB3/2022 dari Dinas Lingkungan Hidup / KLHK.</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                Penyimpanan Aman Terkunci
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-100/80 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">No. Log LB3</th>
                    <th className="py-3 px-4">Tanggal Masuk</th>
                    <th className="py-3 px-4">Jenis Limbah B3</th>
                    <th className="py-3 px-4">Kode Limbah</th>
                    <th className="py-3 px-4">Jumlah Volume</th>
                    <th className="py-3 px-4">Sumber Asal Limbah</th>
                    <th className="py-3 px-4">Bentuk Pengemasan</th>
                    <th className="py-3 px-4">Status & Pengangkut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {limbahB3Logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{log.id}</td>
                      <td className="py-3 px-4">{log.tanggal}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{log.jenisLimbah}</td>
                      <td className="py-3 px-4 font-mono text-emerald-700">{log.kodeLimbah}</td>
                      <td className="py-3 px-4 font-bold text-slate-800">{log.jumlah}</td>
                      <td className="py-3 px-4">{log.sumber}</td>
                      <td className="py-3 px-4 text-slate-600">{log.penyimpanan}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700 block w-fit">
                          {log.status}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{log.transporter}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* K3 Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-medium">Jam Kerja Selamat (Zero Accident)</span>
              <p className="text-2xl font-bold text-emerald-800 font-mono mt-1">1,482,000 <span className="text-xs font-normal text-slate-500">Jam</span></p>
              <p className="text-[11px] text-emerald-700 mt-1">Nihil Kecelakaan Berat / Fatality</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-medium">Tes Darah Cholinesterase (Semprot)</span>
              <p className="text-2xl font-bold text-slate-900 font-mono mt-1">100% <span className="text-xs font-normal text-slate-500">Normal</span></p>
              <p className="text-[11px] text-emerald-700 mt-1">42 Operator Semprot Diperiksa Okt 2026</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-medium">Kepatuhan Pemakaian APD</span>
              <p className="text-2xl font-bold text-emerald-800 font-mono mt-1">98.5%</p>
              <p className="text-[11px] text-slate-500 mt-1">Inspeksi Harian Tim P2K3 Kebun</p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: PUSAT EKSPOR & CETAK FORMAL */}
      {subTab === 'laporan' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Excel Full Export Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-800 w-fit">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Ekspor Buku Administrasi Komprehensif (.xlsx)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Menghasilkan workbook Excel terpadu yang memuat sheet data Blok Kebun, Buku Kerja Mandor (BKM), SPK Panen, Tiket Timbang SPB, Mutasi Gudang, dan Matriks Kepatuhan ISPO.
              </p>
              <button
                onClick={handleExportFullSystem}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-sm transition active:scale-95"
              >
                <Download className="w-4 h-4" /> Download Laporan Excel Multi-Sheet
              </button>
            </div>

            {/* Print / PDF Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="p-3 bg-slate-100 rounded-xl text-slate-800 w-fit">
                <Printer className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Cetak Laporan Resmi / Simpan Format PDF</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Membuka jendela cetak standar dokumen perkebunan dengan kop formal PT. SAWIT LESTARI MAKMUR dan kolom verifikasi pengesahan pengelola sistem.
              </p>
              <button
                onClick={triggerPrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs shadow-sm transition active:scale-95"
              >
                <Printer className="w-4 h-4" /> Cetak / Cetak ke PDF
              </button>
            </div>
          </div>

          {/* Pratinjau Dokumen Formal Perkebunan (Print Sheet Preview) */}
          <div className="bg-white rounded-2xl border-2 border-slate-300 p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-wider uppercase">PT. SAWIT LESTARI MAKMUR</h2>
                <p className="text-xs text-slate-600">ESTATE SEJAHTERA UTAMA - KABUPATEN LABUHANBATU UTARA</p>
                <p className="text-[11px] text-slate-500">Izin HGU No. 44/HGU/BPN/2005 | Sertifikat ISPO: ISPO-2023-08819</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-900 rounded border border-emerald-300">
                  ISPO CERTIFIED
                </span>
                <p className="text-[11px] font-mono text-slate-400 mt-2">DOKUMEN OPERASIONAL</p>
              </div>
            </div>

            <div className="text-center py-2">
              <h3 className="text-base font-bold text-slate-900 uppercase underline tracking-wide">
                REKAPITULASI LAPORAN OPERASIONAL & KEPATUHAN ISPO
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Periode Audit Berjalan: 04 November 2026</p>
            </div>

            {/* Quick table preview in formal document */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border p-3 rounded-lg bg-slate-50">
              <div>
                <span className="text-slate-400 block text-[10px]">Luas HGU Efektif</span>
                <span className="font-bold text-slate-900">2,450.0 Ha</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Realisasi Panen</span>
                <span className="font-bold text-emerald-800">{executiveData.panenBulanIniTon} Ton (95.8%)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Biaya Upkeep / Ha</span>
                <span className="font-bold text-slate-900">Rp {executiveData.biayaPerHa.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Rendemen Minyak</span>
                <span className="font-bold text-emerald-800">22.85% (FFA 2.82%)</span>
              </div>
            </div>

            {/* Tim Pengembang & Penanggung Jawab Sistem Administrasi ISPO */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs font-bold text-slate-800 mb-2.5 uppercase tracking-wide">Tim Pengelola & Penanggung Jawab Modul Sistem ISPO:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Modul Afdeling:</span>
                  <span className="font-bold text-slate-900 block truncate">M. Nurdiansyah</span>
                  <span className="text-[10px] text-emerald-700 font-mono">NIM: 24242012</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Modul Panen:</span>
                  <span className="font-bold text-slate-900 block truncate">Justiar Noer</span>
                  <span className="text-[10px] text-emerald-700 font-mono">NIM: 24242029</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Modul Gudang:</span>
                  <span className="font-bold text-slate-900 block truncate">Sisca Ramadhani</span>
                  <span className="text-[10px] text-emerald-700 font-mono">NIM: 24244003</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Modul Kantor & ISPO:</span>
                  <span className="font-bold text-slate-900 block truncate">Imel Twenty Agusti</span>
                  <span className="text-[10px] text-emerald-700 font-mono">NIM: 24244004</span>
                </div>
              </div>
            </div>

            {/* Signature Box */}
            <div className="pt-6 grid grid-cols-3 gap-6 text-center text-xs">
              <div>
                <p className="text-slate-500 mb-14">Dibuat Oleh,<br /><strong className="text-slate-700">Asisten Administrasi / Tata Usaha</strong></p>
                <p className="font-bold text-slate-900 underline">Ahmad Faisal, S.P.</p>
                <p className="text-[10px] text-slate-500">NIK: 2018-091</p>
              </div>
              <div>
                <p className="text-slate-500 mb-14">Diperiksa Oleh,<br /><strong className="text-slate-700">Asisten Kepala (Askep)</strong></p>
                <p className="font-bold text-slate-900 underline">Ir. Hendra Wardhana</p>
                <p className="text-[10px] text-slate-500">NIK: 2012-044</p>
              </div>
              <div>
                <p className="text-slate-500 mb-14">Disetujui Oleh,<br /><strong className="text-slate-700">Estate Manager</strong></p>
                <p className="font-bold text-slate-900 underline">Ir. M. Ridwan Siregar, M.M.</p>
                <p className="text-[10px] text-slate-500">NIK: 2008-012</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
