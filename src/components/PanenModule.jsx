'use client';

import React, { useState } from 'react';
import { 
  Tractor, 
  Plus, 
  Scale, 
  Truck, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Printer, 
  ArrowRight,
  TrendingUp,
  Percent,
  Clock,
  Pencil,
  Trash2,
  GraduationCap
} from 'lucide-react';

export default function PanenModule({ 
  panenSPKList, 
  setPanenSPKList, 
  spbList, 
  setSpbList, 
  dendaList, 
  setDendaList, 
  searchTerm 
}) {
  const [subTab, setSubTab] = useState('spk'); // 'spk' | 'spb' | 'mutu'
  const [showAddSPKModal, setShowAddSPKModal] = useState(false);
  const [showEditSPKModal, setShowEditSPKModal] = useState(false);
  const [showAddSPBModal, setShowAddSPBModal] = useState(false);
  const [showAddDendaModal, setShowAddDendaModal] = useState(false);

  // New SPK State
  const [newSPK, setNewSPK] = useState({
    tanggal: new Date().toISOString().slice(0, 10),
    afdeling: 'Afdeling I',
    blok: 'BLOK-A01',
    mandor: 'Rustam Effendi',
    jmlPemanen: 14,
    akpPersen: 22.5,
    bjrKg: 21.5,
    targetJanjang: 900,
    realisasiJanjang: 920,
    status: 'Dalam Proses Panen'
  });

  // Edit SPK State
  const [editSPK, setEditSPK] = useState({
    id: '',
    tanggal: '',
    afdeling: '',
    blok: '',
    mandor: '',
    jmlPemanen: 14,
    akpPersen: 22.5,
    bjrKg: 21.5,
    targetJanjang: 900,
    realisasiJanjang: 920,
    status: 'Dalam Proses Panen'
  });

  // New SPB State
  const [newSPB, setNewSPB] = useState({
    tanggal: new Date().toISOString().slice(0, 10),
    jam: '14:30',
    afdeling: 'Afdeling I',
    blok: 'BLOK-A01',
    tph: 'TPH 01-10',
    noPolisi: 'BK 8192 YZ',
    supir: 'Supriyadi',
    janjangKirim: 450,
    estimasiKg: 9675,
    timbangNettoKg: 0,
    selisihKg: 0,
    pksTujuan: 'PKS KEBUN SEJAHTERA (PKS-01)',
    status: 'Menuju Jembatan Timbang'
  });

  // New Denda State
  const [newDenda, setNewDenda] = useState({
    tanggal: new Date().toISOString().slice(0, 10),
    pemanen: '',
    afdeling: 'Afdeling I',
    blok: 'BLOK-A01',
    sampelJanjang: 100,
    buahMasak: 95,
    buahMentah: 2,
    tangkaiPanjang: 3,
    brondolanTinggalPkk: 1,
    keterangan: 'Tangkai panjang dipotong rapi'
  });

  // Calculation Handlers
  const handleAddSPK = (e) => {
    e.preventDefault();
    const id = `SPK-PN-${Date.now().toString().slice(-6)}`;
    const estimasiTon = ((newSPK.realisasiJanjang * newSPK.bjrKg) / 1000);
    const item = { ...newSPK, id, estimasiTon: Number(estimasiTon.toFixed(2)) };
    setPanenSPKList([item, ...panenSPKList]);
    setShowAddSPKModal(false);
  };

  const handleOpenEditSPK = (item) => {
    setEditSPK({ ...item });
    setShowEditSPKModal(true);
  };

  const handleSaveEditSPK = (e) => {
    e.preventDefault();
    const estimasiTon = ((Number(editSPK.realisasiJanjang) * Number(editSPK.bjrKg)) / 1000);
    const updated = panenSPKList.map(s => s.id === editSPK.id ? { ...editSPK, estimasiTon: Number(estimasiTon.toFixed(2)) } : s);
    setPanenSPKList(updated);
    setShowEditSPKModal(false);
  };

  const handleDeleteSPK = (id) => {
    if (confirm(`Apakah Anda yakin ingin menghapus SPK ${id}?`)) {
      setPanenSPKList(panenSPKList.filter(s => s.id !== id));
      setShowEditSPKModal(false);
    }
  };

  const handleAddSPB = (e) => {
    e.preventDefault();
    const noSPB = `SPB-PKS-${Date.now().toString().slice(-6)}`;
    const item = { ...newSPB, noSPB };
    setSpbList([item, ...spbList]);
    setShowAddSPBModal(false);
  };

  const handleAddDenda = (e) => {
    e.preventDefault();
    if (!newDenda.pemanen) return alert('Nama pemanen wajib diisi!');
    const id = `QC-PN-${Date.now().toString().slice(-4)}`;
    const dendaRp = (Number(newDenda.buahMentah) * 20000) + 
                    (Number(newDenda.tangkaiPanjang) * 5000) + 
                    (Number(newDenda.brondolanTinggalPkk) * 10000);
    const item = { ...newDenda, id, dendaRp };
    setDendaList([item, ...dendaList]);
    setShowAddDendaModal(false);
  };

  // KPI aggregates
  const totalJanjang = panenSPKList.reduce((a, c) => a + Number(c.realisasiJanjang), 0);
  const totalTonase = panenSPKList.reduce((a, c) => a + Number(c.estimasiTon), 0);
  const avgBJR = (panenSPKList.reduce((a, c) => a + Number(c.bjrKg), 0) / (panenSPKList.length || 1)).toFixed(1);
  const totalSPB = spbList.length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Subtabs */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Modul 2: Panen, Angkut & Olah di PKS
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Administrasi & Logistik Panen TBS</h2>
          <p className="text-xs text-slate-500">
            Manajemen SPK taksasi ancak panen, tiket timbang Surat Pengantar Buah (SPB), dan audit mutu denda buah.
          </p>

          {/* Posisi Identitas Mahasiswa Penanggung Jawab Modul (Posisi Seragam) */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium shadow-xs">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span className="text-slate-500">Penanggung Jawab:</span>
              <span className="font-bold text-emerald-900">Justiar Noer</span>
              <span className="text-emerald-800 font-mono font-semibold bg-emerald-100/90 px-2 py-0.5 rounded-md border border-emerald-300">
                NIM: 24242029
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setSubTab('spk')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'spk' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            SPK & Taksasi Panen
          </button>
          <button
            onClick={() => setSubTab('spb')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'spb' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tiket SPB & Angkut PKS
          </button>
          <button
            onClick={() => setSubTab('mutu')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'mutu' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pemeriksaan Mutu & Denda
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Realisasi Janjang Hari Ini</span>
            <Tractor className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalJanjang.toLocaleString()} <span className="text-xs font-normal text-slate-500">Jjg</span></p>
          <p className="text-[11px] text-emerald-700 mt-1 font-medium">Pencapaian: 101.4% Target Harian</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Estimasi Tonase Panen</span>
            <Scale className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalTonase.toFixed(2)} <span className="text-xs font-normal text-slate-500">Ton</span></p>
          <p className="text-[11px] text-slate-500 mt-1">Berdasarkan BJR tiap blok panen</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Rata-rata BJR Kebun</span>
            <TrendingUp className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{avgBJR} <span className="text-xs font-normal text-slate-500">Kg/Jjg</span></p>
          <p className="text-[11px] text-emerald-700 mt-1">Optimum Tanaman Menghasilkan</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Ritasi Truk SPB ke PKS</span>
            <Truck className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalSPB} <span className="text-xs font-normal text-slate-500">Trip SPB</span></p>
          <p className="text-[11px] text-slate-500 mt-1">Ketertelusuran TBS 100% ISPO</p>
        </div>
      </div>

      {/* SUBTAB 1: SPK & TAKSASI PANEN */}
      {subTab === 'spk' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Buku Register SPK Panen & Taksasi Ancak</h3>
              <p className="text-xs text-slate-500">Monitoring kerapatan panen (AKP), alokasi pemanen, dan perolehan tonase.</p>
            </div>
            <button
              onClick={() => setShowAddSPKModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition"
            >
              <Plus className="w-4 h-4" /> Terbitkan SPK Panen
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">No. SPK Panen</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Afdeling / Blok</th>
                  <th className="py-3 px-4">Mandor Panen</th>
                  <th className="py-3 px-4 text-center">TK Pemanen</th>
                  <th className="py-3 px-4 text-right">AKP (%)</th>
                  <th className="py-3 px-4 text-right">BJR (Kg)</th>
                  <th className="py-3 px-4 text-right">Target vs Hasil Janjang</th>
                  <th className="py-3 px-4 text-right">Estimasi Tonase</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center font-bold text-emerald-900">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {panenSPKList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{item.id}</td>
                    <td className="py-3 px-4">{item.tanggal}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">{item.afdeling}</span>
                      <span className="text-[11px] text-emerald-700 block font-mono">{item.blok}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">{item.mandor}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 font-bold text-slate-800">
                        {item.jmlPemanen} Org
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-medium text-slate-700">{item.akpPersen}%</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-800">{item.bjrKg} kg</td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-slate-400">{item.targetJanjang} / </span>
                      <span className="font-bold text-emerald-800">{item.realisasiJanjang} Jjg</span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 text-sm">
                      {item.estimasiTon} Ton
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenEditSPK(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold shadow-2xs transition active:scale-95"
                        title="Edit SPK Panen"
                      >
                        <Pencil className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 2: TIKET SPB & ANGKUT PKS */}
      {subTab === 'spb' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Surat Pengantar Buah (SPB) & Rekonsiliasi Timbangan PKS</h3>
              <p className="text-xs text-slate-500">Tiket angkut resmi TBS dari TPH Afdeling ke Pabrik Kelapa Sawit (Traceability FFB ISPO).</p>
            </div>
            <button
              onClick={() => setShowAddSPBModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition"
            >
              <Plus className="w-4 h-4" /> Cetak / Input SPB Baru
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">No. SPB</th>
                  <th className="py-3 px-4">Waktu & Asal</th>
                  <th className="py-3 px-4">Truk & Driver</th>
                  <th className="py-3 px-4 text-right">Jjg Kirim</th>
                  <th className="py-3 px-4 text-right">Estimasi Kebun</th>
                  <th className="py-3 px-4 text-right">Netto PKS</th>
                  <th className="py-3 px-4 text-right">Selisih (Losses)</th>
                  <th className="py-3 px-4">Status Pengiriman</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {spbList.map((item) => (
                  <tr key={item.noSPB} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{item.noSPB}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">{item.afdeling} - {item.blok}</span>
                      <span className="text-[10px] text-slate-400 block">{item.tanggal} ({item.jam})</span>
                      <span className="text-[10px] text-emerald-700 font-mono">{item.tph}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-slate-900 block">{item.noPolisi}</span>
                      <span className="text-[11px] text-slate-500">Supir: {item.supir}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-800">{item.janjangKirim} Jjg</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-700">{item.estimasiKg.toLocaleString()} kg</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                      {item.timbangNettoKg > 0 ? `${item.timbangNettoKg.toLocaleString()} kg` : <span className="text-amber-600 italic">Belum Timbang</span>}
                    </td>
                    <td className="py-3 px-4 text-right font-mono">
                      {item.selisihKg !== 0 ? (
                        <span className={`font-semibold ${item.selisihKg < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {item.selisihKg} kg
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 w-fit ${
                        item.status === 'Diterima PKS' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status === 'Diterima PKS' ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3 text-amber-600" />}
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 3: MUTU & DENDA PANEN */}
      {subTab === 'mutu' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              <span className="font-bold text-emerald-900 text-xs block">Buah Masak (Fraksi 2-3)</span>
              <p className="text-[11px] text-emerald-800 mt-1">Brondolan lepas 5 - 10 butir di piringan. Kriteria panen wajib ISPO.</p>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
              <span className="font-bold text-rose-900 text-xs block">Denda Buah Mentah (BM)</span>
              <p className="text-[11px] text-rose-800 mt-1">Fraksi 00 & 0 (kurang brondol). Denda Rp 20.000 / jjg karena menurunkan rendemen OER.</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <span className="font-bold text-amber-900 text-xs block">Denda Tangkai Panjang (TP)</span>
              <p className="text-[11px] text-amber-800 mt-1">Tangkai &gt; 2 cm (berbentuk V). Denda Rp 5.000 / jjg karena menyerap minyak di loading ramp.</p>
            </div>
            <div className="bg-slate-100 border border-slate-300 rounded-xl p-3">
              <span className="font-bold text-slate-800 text-xs block">Denda Brondolan Tinggal (BT)</span>
              <p className="text-[11px] text-slate-600 mt-1">Brondolan tidak dikutip di piringan/pasar pikul. Denda Rp 10.000 / piringan.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Catatan Pemeriksaan Mutu Panen & Denda</h3>
                <p className="text-xs text-slate-500">Pengecekan kualitas panen tiap pemanen untuk menjaga kualitas TBS ke PKS.</p>
              </div>
              <button
                onClick={() => setShowAddDendaModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition"
              >
                <Plus className="w-4 h-4" /> Input QC Denda Panen
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-100/80 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">ID QC</th>
                    <th className="py-3 px-4">Tanggal</th>
                    <th className="py-3 px-4">Nama Pemanen</th>
                    <th className="py-3 px-4">Blok</th>
                    <th className="py-3 px-4 text-center">Sampel</th>
                    <th className="py-3 px-4 text-center text-emerald-800 font-bold">Masak (Ok)</th>
                    <th className="py-3 px-4 text-center text-rose-700 font-bold">Mentah (BM)</th>
                    <th className="py-3 px-4 text-center text-amber-700 font-bold">Tangkai &gt;2cm</th>
                    <th className="py-3 px-4 text-center">Brondolan Tinggal</th>
                    <th className="py-3 px-4 text-right">Potongan Denda</th>
                    <th className="py-3 px-4">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dendaList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 font-mono font-bold text-slate-800">{item.id}</td>
                      <td className="py-3 px-4">{item.tanggal}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{item.pemanen}</td>
                      <td className="py-3 px-4 font-mono text-emerald-700">{item.blok}</td>
                      <td className="py-3 px-4 text-center font-medium">{item.sampelJanjang} Jjg</td>
                      <td className="py-3 px-4 text-center font-bold text-emerald-700 bg-emerald-50/50">{item.buahMasak}</td>
                      <td className="py-3 px-4 text-center font-bold text-rose-600">{item.buahMentah}</td>
                      <td className="py-3 px-4 text-center font-bold text-amber-600">{item.tangkaiPanjang}</td>
                      <td className="py-3 px-4 text-center font-medium text-slate-700">{item.brondolanTinggalPkk}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-rose-700">
                        {item.dendaRp > 0 ? `Rp ${item.dendaRp.toLocaleString()}` : <span className="text-emerald-700">Nihil</span>}
                      </td>
                      <td className="py-3 px-4 text-slate-600">{item.keterangan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT SPK PANEN */}
      {showEditSPKModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Edit Register SPK Panen</h3>
                  <p className="text-[11px] text-slate-500 font-mono">No: {editSPK.id}</p>
                </div>
              </div>
              <button onClick={() => setShowEditSPKModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>
            <form onSubmit={handleSaveEditSPK} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Afdeling / Blok</label>
                  <input
                    type="text"
                    disabled
                    value={`${editSPK.afdeling} - ${editSPK.blok}`}
                    className="w-full p-2 border rounded-lg bg-slate-100 font-mono font-bold text-slate-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Mandor Panen *</label>
                  <input
                    type="text"
                    required
                    value={editSPK.mandor}
                    onChange={(e) => setEditSPK({ ...editSPK, mandor: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">TK Pemanen</label>
                  <input
                    type="number"
                    required
                    value={editSPK.jmlPemanen}
                    onChange={(e) => setEditSPK({ ...editSPK, jmlPemanen: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">AKP (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={editSPK.akpPersen}
                    onChange={(e) => setEditSPK({ ...editSPK, akpPersen: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">BJR (Kg) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={editSPK.bjrKg}
                    onChange={(e) => setEditSPK({ ...editSPK, bjrKg: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Target Janjang</label>
                  <input
                    type="number"
                    required
                    value={editSPK.targetJanjang}
                    onChange={(e) => setEditSPK({ ...editSPK, targetJanjang: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Realisasi Janjang *</label>
                  <input
                    type="number"
                    required
                    value={editSPK.realisasiJanjang}
                    onChange={(e) => setEditSPK({ ...editSPK, realisasiJanjang: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg font-bold text-emerald-800"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                <span className="text-emerald-900">Estimasi Tonase Baru:</span>
                <span className="font-mono font-bold text-emerald-950 text-sm">
                  {((Number(editSPK.realisasiJanjang) * Number(editSPK.bjrKg)) / 1000).toFixed(2)} Ton
                </span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Status Pekerjaan</label>
                <select
                  value={editSPK.status}
                  onChange={(e) => setEditSPK({ ...editSPK, status: e.target.value })}
                  className="w-full p-2 border rounded-lg font-medium"
                >
                  <option value="Dalam Proses Panen">Dalam Proses Panen</option>
                  <option value="Sedang Muat di TPH">Sedang Muat di TPH</option>
                  <option value="Menuju PKS">Menuju PKS</option>
                  <option value="Selesai Angkut">Selesai Angkut</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-between border-t">
                <button
                  type="button"
                  onClick={() => handleDeleteSPK(editSPK.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus SPK
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEditSPKModal(false)}
                    className="px-3 py-1.5 rounded-lg border text-slate-700 hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-sm"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah SPK Panen */}
      {showAddSPKModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">Terbitkan SPK Panen & Taksasi</h3>
              <button onClick={() => setShowAddSPKModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>
            <form onSubmit={handleAddSPK} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tanggal Panen</label>
                  <input
                    type="date"
                    required
                    value={newSPK.tanggal}
                    onChange={(e) => setNewSPK({ ...newSPK, tanggal: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Afdeling</label>
                  <select
                    value={newSPK.afdeling}
                    onChange={(e) => setNewSPK({ ...newSPK, afdeling: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Afdeling I">Afdeling I</option>
                    <option value="Afdeling II">Afdeling II</option>
                    <option value="Afdeling III">Afdeling III</option>
                    <option value="Afdeling IV">Afdeling IV</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Blok Panen</label>
                  <input
                    type="text"
                    required
                    value={newSPK.blok}
                    onChange={(e) => setNewSPK({ ...newSPK, blok: e.target.value })}
                    className="w-full p-2 border rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Mandor Panen</label>
                  <input
                    type="text"
                    required
                    value={newSPK.mandor}
                    onChange={(e) => setNewSPK({ ...newSPK, mandor: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jml Pemanen (TK)</label>
                  <input
                    type="number"
                    required
                    value={newSPK.jmlPemanen}
                    onChange={(e) => setNewSPK({ ...newSPK, jmlPemanen: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">AKP (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={newSPK.akpPersen}
                    onChange={(e) => setNewSPK({ ...newSPK, akpPersen: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">BJR (Kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newSPK.bjrKg}
                    onChange={(e) => setNewSPK({ ...newSPK, bjrKg: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Target Janjang</label>
                  <input
                    type="number"
                    required
                    value={newSPK.targetJanjang}
                    onChange={(e) => setNewSPK({ ...newSPK, targetJanjang: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Realisasi Janjang</label>
                  <input
                    type="number"
                    required
                    value={newSPK.realisasiJanjang}
                    onChange={(e) => setNewSPK({ ...newSPK, realisasiJanjang: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddSPKModal(false)}
                  className="px-3 py-1.5 rounded-lg border text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
                >
                  Simpan SPK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah SPB */}
      {showAddSPBModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">Buat Tiket SPB (Surat Pengantar Buah)</h3>
              <button onClick={() => setShowAddSPBModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>
            <form onSubmit={handleAddSPB} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">No Polisi Truk</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: BK 8820 YU"
                    value={newSPB.noPolisi}
                    onChange={(e) => setNewSPB({ ...newSPB, noPolisi: e.target.value })}
                    className="w-full p-2 border rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Supir</label>
                  <input
                    type="text"
                    required
                    value={newSPB.supir}
                    onChange={(e) => setNewSPB({ ...newSPB, supir: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Afdeling & Blok Asal</label>
                  <input
                    type="text"
                    value={`${newSPB.afdeling} - ${newSPB.blok}`}
                    onChange={(e) => setNewSPB({ ...newSPB, blok: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Lokasi TPH</label>
                  <input
                    type="text"
                    value={newSPB.tph}
                    onChange={(e) => setNewSPB({ ...newSPB, tph: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Janjang Muat</label>
                  <input
                    type="number"
                    required
                    value={newSPB.janjangKirim}
                    onChange={(e) => {
                      const jjg = parseInt(e.target.value) || 0;
                      setNewSPB({ ...newSPB, janjangKirim: jjg, estimasiKg: jjg * 21.5 });
                    }}
                    className="w-full p-2 border rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Estimasi Tonase (Kg)</label>
                  <input
                    type="number"
                    value={newSPB.estimasiKg}
                    onChange={(e) => setNewSPB({ ...newSPB, estimasiKg: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddSPBModal(false)}
                  className="px-3 py-1.5 rounded-lg border text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
                >
                  Terbitkan SPB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Denda */}
      {showAddDendaModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">Pemeriksaan Mutu Panen & Denda</h3>
              <button onClick={() => setShowAddDendaModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>
            <form onSubmit={handleAddDenda} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Pemanen *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sarmin (NIK: 0882)"
                    value={newDenda.pemanen}
                    onChange={(e) => setNewDenda({ ...newDenda, pemanen: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Blok Panen</label>
                  <input
                    type="text"
                    value={newDenda.blok}
                    onChange={(e) => setNewDenda({ ...newDenda, blok: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold text-rose-700 block mb-1">Buah Mentah (BM)</label>
                  <input
                    type="number"
                    min="0"
                    value={newDenda.buahMentah}
                    onChange={(e) => setNewDenda({ ...newDenda, buahMentah: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-amber-700 block mb-1">Tangkai &gt;2cm</label>
                  <input
                    type="number"
                    min="0"
                    value={newDenda.tangkaiPanjang}
                    onChange={(e) => setNewDenda({ ...newDenda, tangkaiPanjang: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Brondolan Tinggal</label>
                  <input
                    type="number"
                    min="0"
                    value={newDenda.brondolanTinggalPkk}
                    onChange={(e) => setNewDenda({ ...newDenda, brondolanTinggalPkk: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Catatan Koreksi Agronomi</label>
                <input
                  type="text"
                  value={newDenda.keterangan}
                  onChange={(e) => setNewDenda({ ...newDenda, keterangan: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddDendaModal(false)}
                  className="px-3 py-1.5 rounded-lg border text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
                >
                  Simpan Hasil QC
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
