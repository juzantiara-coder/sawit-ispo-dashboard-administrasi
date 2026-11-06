'use client';

import React, { useState } from 'react';
import { 
  Trees, 
  Plus, 
  Calendar, 
  MapPin, 
  Users, 
  ClipboardList, 
  CheckCircle, 
  AlertCircle, 
  Search,
  Filter,
  DollarSign,
  Sparkles,
  ShieldAlert,
  Clock,
  ArrowUpRight,
  Pencil,
  Trash2,
  GraduationCap,
  UserCheck
} from 'lucide-react';

export default function AfdelingModule({ 
  afdelingList, 
  setAfdelingList, 
  bkmList, 
  setBkmList, 
  absensiList, 
  setAbsensiList,
  searchTerm 
}) {
  const [subTab, setSubTab] = useState('blok'); // 'blok' | 'bkm' | 'absensi' | 'upkeep'
  const [showAddBlokModal, setShowAddBlokModal] = useState(false);
  const [showEditBlokModal, setShowEditBlokModal] = useState(false);
  const [showAddBKMModal, setShowAddBKMModal] = useState(false);
  const [filterAfdeling, setFilterAfdeling] = useState('Semua');

  // New Blok Form State
  const [newBlok, setNewBlok] = useState({
    id: '',
    afdeling: 'Afdeling I',
    luasHa: 30,
    jmlPokok: 4200,
    sph: 140,
    status: 'TM-Prima',
    thnTanam: 2018,
    jenisTanah: 'Mineral',
    topografi: 'Datar',
    tph: 39,
    mandor: 'Supardi'
  });

  // Edit Blok State
  const [editBlok, setEditBlok] = useState({
    id: '',
    afdeling: 'Afdeling I',
    luasHa: 30,
    jmlPokok: 4200,
    sph: 140,
    status: 'TM-Prima',
    thnTanam: 2018,
    jenisTanah: 'Mineral',
    topografi: 'Datar',
    tph: 39,
    mandor: 'Supardi'
  });

  // New BKM Form State
  const [newBKM, setNewBKM] = useState({
    tanggal: new Date().toISOString().slice(0, 10),
    afdeling: 'Afdeling I',
    blok: 'BLOK-A01',
    mandor: 'Supardi',
    kegiatan: 'Rawat CPT (Circle, Path, TPH)',
    tenagaKerja: 8,
    targetHa: 10,
    realisasiHa: 10,
    satuan: 'Ha',
    biayaHK: 1080000,
    status: 'Menunggu Verifikasi'
  });

  // Handlers
  const handleAddBlok = (e) => {
    e.preventDefault();
    if (!newBlok.id) return alert('Kode Blok wajib diisi!');
    const sphCalc = Math.round(newBlok.jmlPokok / newBlok.luasHa);
    const item = { ...newBlok, sph: sphCalc, id: newBlok.id.toUpperCase() };
    setAfdelingList([item, ...afdelingList]);
    setShowAddBlokModal(false);
    setNewBlok({
      id: '',
      afdeling: 'Afdeling I',
      luasHa: 30,
      jmlPokok: 4200,
      sph: 140,
      status: 'TM-Prima',
      thnTanam: 2018,
      jenisTanah: 'Mineral',
      topografi: 'Datar',
      tph: 39,
      mandor: 'Supardi'
    });
  };

  const handleOpenEditBlok = (item) => {
    setEditBlok({ ...item });
    setShowEditBlokModal(true);
  };

  const handleSaveEditBlok = (e) => {
    e.preventDefault();
    const sphCalc = Math.round(editBlok.jmlPokok / editBlok.luasHa);
    const updated = afdelingList.map(b => b.id === editBlok.id ? { ...editBlok, sph: sphCalc } : b);
    setAfdelingList(updated);
    setShowEditBlokModal(false);
  };

  const handleDeleteBlok = (id) => {
    if (confirm(`Apakah Anda yakin ingin menghapus Blok ${id}?`)) {
      setAfdelingList(afdelingList.filter(b => b.id !== id));
      setShowEditBlokModal(false);
    }
  };

  const handleAddBKM = (e) => {
    e.preventDefault();
    const id = `BKM-${Date.now().toString().slice(-6)}`;
    const cost = Number(newBKM.tenagaKerja) * 135000;
    const item = { ...newBKM, id, biayaHK: cost };
    setBkmList([item, ...bkmList]);
    setShowAddBKMModal(false);
  };

  // Filtered lists
  const filteredBloks = afdelingList.filter(b => {
    const matchSearch = b.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        b.afdeling.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        b.mandor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAfd = filterAfdeling === 'Semua' || b.afdeling === filterAfdeling;
    return matchSearch && matchAfd;
  });

  const filteredBKM = bkmList.filter(b => {
    return b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
           b.blok.toLowerCase().includes(searchTerm.toLowerCase()) ||
           b.kegiatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
           b.mandor.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Summary Metrics
  const totalLuas = afdelingList.reduce((acc, curr) => acc + Number(curr.luasHa), 0);
  const totalPokok = afdelingList.reduce((acc, curr) => acc + Number(curr.jmlPokok), 0);
  const tmCount = afdelingList.filter(b => b.status.startsWith('TM')).length;
  const tbmCount = afdelingList.filter(b => b.status.startsWith('TBM')).length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Subnav */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Modul 1: Divisi Lapangan & Budidaya
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Administrasi Afdeling Perkebunan</h2>
          <p className="text-xs text-slate-500">
            Pengelolaan agronomi blok, buku kerja mandor harian, absensi regu kerja, dan rotasi upkeep berbasis ISPO GAP.
          </p>

          {/* Posisi Identitas Mahasiswa Penanggung Jawab Modul */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium shadow-xs">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span className="text-slate-500">Penanggung Jawab:</span>
              <span className="font-bold text-emerald-900">Muhammad Nurdiansyah</span>
              <span className="text-emerald-800 font-mono font-semibold bg-emerald-100/90 px-2 py-0.5 rounded-md border border-emerald-300">
                NIM: 24242012
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
              <UserCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Kontributor: <strong>Justiar Noer</strong> (NIM: 24242029)</span>
            </div>
          </div>
        </div>

        {/* Sub-tab navigation pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setSubTab('blok')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'blok' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Data Blok & SPH
          </button>
          <button
            onClick={() => setSubTab('bkm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'bkm' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Buku Kerja Mandor (BKM)
          </button>
          <button
            onClick={() => setSubTab('absensi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'absensi' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Absensi Tenaga Kerja
          </button>
          <button
            onClick={() => setSubTab('upkeep')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'upkeep' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rotasi Upkeep ISPO
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Luas Terdaftar</span>
            <Trees className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalLuas.toFixed(1)} <span className="text-xs font-normal text-slate-500">Ha</span></p>
          <p className="text-[11px] text-emerald-700 mt-1">10 Blok Aktif Terpetakan</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Populasi Pokok Sawit</span>
            <Sparkles className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalPokok.toLocaleString()} <span className="text-xs font-normal text-slate-500">Pkk</span></p>
          <p className="text-[11px] text-slate-500 mt-1">Rata-rata SPH: 140 pkk/ha (Standar ISPO)</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Distribusi Tanaman</span>
            <MapPin className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-emerald-700">{tmCount}</span>
            <span className="text-xs text-slate-600 font-medium">Blok TM</span>
            <span className="text-slate-300">|</span>
            <span className="text-2xl font-bold text-amber-600">{tbmCount}</span>
            <span className="text-xs text-slate-600 font-medium">Blok TBM</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">TBM 1-3 dalam masa rawat vegetatif</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>BKM Berjalan Hari Ini</span>
            <ClipboardList className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{bkmList.length} <span className="text-xs font-normal text-slate-500">SPK Kerja</span></p>
          <p className="text-[11px] text-emerald-700 mt-1">Biaya HK: Rp {(bkmList.reduce((a,c)=>a+c.biayaHK,0)).toLocaleString()}</p>
        </div>
      </div>

      {/* SUBTAB 1: DATA BLOK */}
      {subTab === 'blok' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-800">Master Data Blok & SPH Afdeling</span>
              <div className="flex items-center gap-1 text-xs text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select 
                  value={filterAfdeling} 
                  onChange={(e) => setFilterAfdeling(e.target.value)}
                  className="bg-transparent border-none focus:outline-none text-xs font-medium cursor-pointer"
                >
                  <option value="Semua">Semua Afdeling</option>
                  <option value="Afdeling I">Afdeling I</option>
                  <option value="Afdeling II">Afdeling II</option>
                  <option value="Afdeling III">Afdeling III</option>
                  <option value="Afdeling IV">Afdeling IV</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => setShowAddBlokModal(true)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition"
            >
              <Plus className="w-4 h-4" /> Tambah Blok Baru
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Kode Blok</th>
                  <th className="py-3 px-4">Afdeling</th>
                  <th className="py-3 px-4 text-right">Luas (Ha)</th>
                  <th className="py-3 px-4 text-right">Jml Pokok</th>
                  <th className="py-3 px-4 text-right">SPH</th>
                  <th className="py-3 px-4">Status & Thn Tanam</th>
                  <th className="py-3 px-4">Tanah & Kontur</th>
                  <th className="py-3 px-4 text-right">Jml TPH</th>
                  <th className="py-3 px-4">Mandor Lapangan</th>
                  <th className="py-3 px-4 text-center font-bold text-emerald-900">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBloks.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">{b.id}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
                        {b.afdeling}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-800">{b.luasHa}</td>
                    <td className="py-3 px-4 text-right">{b.jmlPokok.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold ${
                        b.sph >= 136 && b.sph <= 143 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {b.sph} pkk/ha
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status.startsWith('TM') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {b.status}
                        </span>
                        <span className="text-slate-400 font-mono">({b.thnTanam})</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-700">{b.jenisTanah}</span>
                      <span className="text-[10px] text-slate-400 block">{b.topografi}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-slate-700">{b.tph} TPH</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{b.mandor}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenEditBlok(b)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold shadow-2xs transition active:scale-95"
                        title="Edit Master Data Blok & SPH"
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
          <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>Standar SPH ISPO: 136 - 142 pokok/Ha (Pancang Mata Lima / Teras Kontur)</span>
            <span>Menampilkan {filteredBloks.length} blok perkebunan</span>
          </div>
        </div>
      )}

      {/* SUBTAB 2: BUKU KERJA MANDOR (BKM) */}
      {subTab === 'bkm' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Buku Kerja Mandor (BKM) & Laporan Upkeep Harian</h3>
              <p className="text-xs text-slate-500">Pencatatan realisasi rotasi pemeliharaan, alokasi HK (Hari Kerja), dan biaya upah.</p>
            </div>
            <button
              onClick={() => setShowAddBKMModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition"
            >
              <Plus className="w-4 h-4" /> Input BKM Baru
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">No BKM</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Afdeling / Blok</th>
                  <th className="py-3 px-4">Mandor</th>
                  <th className="py-3 px-4">Jenis Kegiatan Upkeep</th>
                  <th className="py-3 px-4 text-center">Tenaga (HK)</th>
                  <th className="py-3 px-4 text-right">Target vs Hasil</th>
                  <th className="py-3 px-4 text-right">Biaya HK</th>
                  <th className="py-3 px-4">Status Verifikasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBKM.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{item.id}</td>
                    <td className="py-3 px-4">{item.tanggal}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">{item.afdeling}</span>
                      <span className="text-[11px] text-emerald-700 block font-mono">{item.blok}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">{item.mandor}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">{item.kegiatan}</span>
                      <span className="text-[10px] text-slate-400">SOP Standar Teknis Perkebunan</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 font-bold text-slate-800">
                        {item.tenagaKerja} HK
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-slate-500">{item.targetHa} / </span>
                      <span className="font-bold text-emerald-700">{item.realisasiHa} {item.satuan}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-slate-900">
                      Rp {item.biayaHK.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 w-fit ${
                        item.status.includes('Terverifikasi') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status.includes('Terverifikasi') ? <CheckCircle className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3 text-amber-600" />}
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

      {/* SUBTAB 3: ABSENSI TENAGA KERJA */}
      {subTab === 'absensi' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Presensi & Pengawasan K3 Tenaga Kerja Lapangan</h3>
              <p className="text-xs text-slate-500">Pemeriksaan disiplin jam masuk, pembagian regu kerja, dan kepatuhan APD (K3 ISPO Prinsip 5).</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-200 font-medium">
                Tingkat Kehadiran: 94.8%
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">NIK</th>
                  <th className="py-3 px-4">Nama Tenaga Kerja</th>
                  <th className="py-3 px-4">Afdeling</th>
                  <th className="py-3 px-4">Regu Kerja</th>
                  <th className="py-3 px-4">Status Kehadiran</th>
                  <th className="py-3 px-4">Jam Masuk</th>
                  <th className="py-3 px-4">Inspeksi APD (K3)</th>
                  <th className="py-3 px-4 text-right">Premi Harian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {absensiList.map((item) => (
                  <tr key={item.nik} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">{item.nik}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{item.nama}</td>
                    <td className="py-3 px-4">{item.afdeling}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                        {item.regu}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'Hadir' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono">{item.jamMasuk}</td>
                    <td className="py-3 px-4">
                      <span className="text-slate-800 font-medium">{item.apd}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-emerald-800">
                      Rp {item.premi.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 4: ROTASI UPKEEP ISPO */}
      {subTab === 'upkeep' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upkeep TBM Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-700 border border-amber-200">
                  <Trees className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Upkeep TBM (Tanaman Belum Menghasilkan)</h4>
                  <p className="text-[11px] text-slate-500">Fokus fase vegetatif umur 0 - 36 Bulan</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-amber-100 text-amber-900 text-xs font-bold font-mono">TBM 1-3</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-1">1. Kastrasi (Sanitasi Bunga)</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Membuang seluruh bunga jantan dan bunga betina umur 6/13 s/d 24 bulan.
                  Rotasi: <span className="font-bold text-emerald-700">1 tahun 3x (tiap 4 bulan sekali)</span>.
                  Berhenti kastrasi pada umur 30 bulan (6 bulan sebelum rencana panen umur 36 bulan).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-1">2. Pemupukan TBM (Prinsip Hara Stabil)</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Aplikasi BO kompos & pupuk kandang untuk kegemburan tanah (70-80%). Pemupukan anorganik bertahap melingkar di luar piringan.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-1">3. Rawat CPT (Circle, Path, TPH)</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Pembersihan manual/chem piringan 1.5 - 2 m, pasar rintis, dan persiapan TPH (1.3 TPH/Ha).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-1">4. Sensus Pokok & Konsolidasi</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Sensus pokok produktif, abnormal, dan sisipan. Target full stand sesuai SPH 136-142 pkk/ha homogen.
                </p>
              </div>
            </div>
          </div>

          {/* Upkeep TM Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700 border border-emerald-200">
                  <Trees className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Upkeep TM (Tanaman Menghasilkan)</h4>
                  <p className="text-[11px] text-slate-500">Fokus produktivitas generatif umur 3 - 25+ Tahun</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-900 text-xs font-bold font-mono">TM 1-4</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-1">1. Aturan Pruning Pelepah (Songgo)</span>
                <div className="grid grid-cols-3 gap-2 mt-2 text-center text-[10px]">
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="font-bold text-emerald-800 block">Songgo 3</span>
                    <span className="text-slate-600">TM Muda (3-7 th)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="font-bold text-emerald-800 block">Songgo 2</span>
                    <span className="text-slate-600">TM Remaja (8-14 th)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="font-bold text-emerald-800 block">Songgo 1</span>
                    <span className="text-slate-600">TM Tua (&gt;15 th)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-1">2. Pemupukan TM Prinsip 4T</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  <strong className="text-slate-800">Tepat Jenis</strong> (analisa hara daun), <strong className="text-slate-800">Tepat Dosis</strong>, <strong className="text-slate-800">Tepat Waktu</strong> (curah hujan &gt; 100mm/bln), dan <strong className="text-slate-800">Tepat Cara</strong> (sebar merata di piringan/gawangan).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-1">3. Pengendalian HPT & Gulma Ramah ISPO</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Pemasangan Ferotrap Oryctes, Agensia Hayati (Cordyceps/Trichoderma), pemanfaatan gulma menguntungkan (Turnera subulata, Antigonon), Dongkel Anak Kayu (DAK), dan wiping selektif.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-1">4. Konservasi Tanah dan Air</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Pembuatan rorak, guludan teras kontur, dan penanaman LCC (Legume Cover Crops) pada pembukaan lahan baru.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT MASTER BLOK & SPH */}
      {showEditBlokModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Edit Master Data Blok & SPH</h3>
                  <p className="text-[11px] text-slate-500 font-mono">Kode: {editBlok.id}</p>
                </div>
              </div>
              <button onClick={() => setShowEditBlokModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>
            <form onSubmit={handleSaveEditBlok} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kode Blok</label>
                  <input
                    type="text"
                    disabled
                    value={editBlok.id}
                    className="w-full p-2 border rounded-lg bg-slate-100 font-mono font-bold text-slate-600 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Afdeling *</label>
                  <select
                    value={editBlok.afdeling}
                    onChange={(e) => setEditBlok({ ...editBlok, afdeling: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-emerald-600"
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
                  <label className="font-semibold text-slate-700 block mb-1">Luas Lahan (Ha) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={editBlok.luasHa}
                    onChange={(e) => setEditBlok({ ...editBlok, luasHa: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jumlah Pokok *</label>
                  <input
                    type="number"
                    required
                    value={editBlok.jmlPokok}
                    onChange={(e) => setEditBlok({ ...editBlok, jmlPokok: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600">Estimasi SPH Baru:</span>
                <span className="font-mono font-bold text-emerald-800">
                  {editBlok.luasHa > 0 ? Math.round(editBlok.jmlPokok / editBlok.luasHa) : 0} pkk/ha
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Status Tanaman</label>
                  <select
                    value={editBlok.status}
                    onChange={(e) => setEditBlok({ ...editBlok, status: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="TM-Prima">TM-Prima (8-14 th)</option>
                    <option value="TM-Remaja">TM-Remaja (3-7 th)</option>
                    <option value="TM-Tua">TM-Tua (&gt;15 th)</option>
                    <option value="TBM-3">TBM-3 (Umur 25-36 bln)</option>
                    <option value="TBM-2">TBM-2 (Umur 13-24 bln)</option>
                    <option value="TBM-1">TBM-1 (Umur 0-12 bln)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tahun Tanam</label>
                  <input
                    type="number"
                    value={editBlok.thnTanam}
                    onChange={(e) => setEditBlok({ ...editBlok, thnTanam: parseInt(e.target.value) || 2020 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jenis Tanah</label>
                  <select
                    value={editBlok.jenisTanah}
                    onChange={(e) => setEditBlok({ ...editBlok, jenisTanah: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Mineral">Mineral</option>
                    <option value="Gambut">Gambut</option>
                    <option value="Pasiran">Pasiran</option>
                    <option value="Rendahan">Rendahan</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Topografi</label>
                  <select
                    value={editBlok.topografi}
                    onChange={(e) => setEditBlok({ ...editBlok, topografi: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Datar">Datar</option>
                    <option value="Bergelombang">Bergelombang</option>
                    <option value="Terasering">Terasering</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jml TPH</label>
                  <input
                    type="number"
                    value={editBlok.tph}
                    onChange={(e) => setEditBlok({ ...editBlok, tph: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mandor Lapangan</label>
                <input
                  type="text"
                  value={editBlok.mandor}
                  onChange={(e) => setEditBlok({ ...editBlok, mandor: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="pt-3 flex items-center justify-between border-t">
                <button
                  type="button"
                  onClick={() => handleDeleteBlok(editBlok.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus Blok
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEditBlokModal(false)}
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

      {/* Modal Tambah Blok */}
      {showAddBlokModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">Registrasi Blok Kebun Baru</h3>
              <button onClick={() => setShowAddBlokModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>
            <form onSubmit={handleAddBlok} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kode Blok *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: BLOK-A04"
                    value={newBlok.id}
                    onChange={(e) => setNewBlok({ ...newBlok, id: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Afdeling *</label>
                  <select
                    value={newBlok.afdeling}
                    onChange={(e) => setNewBlok({ ...newBlok, afdeling: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-emerald-600"
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
                  <label className="font-semibold text-slate-700 block mb-1">Luas Lahan (Ha) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newBlok.luasHa}
                    onChange={(e) => setNewBlok({ ...newBlok, luasHa: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jumlah Pokok *</label>
                  <input
                    type="number"
                    required
                    value={newBlok.jmlPokok}
                    onChange={(e) => setNewBlok({ ...newBlok, jmlPokok: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Status Tanaman</label>
                  <select
                    value={newBlok.status}
                    onChange={(e) => setNewBlok({ ...newBlok, status: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="TM-Prima">TM-Prima (8-14 th)</option>
                    <option value="TM-Remaja">TM-Remaja (3-7 th)</option>
                    <option value="TM-Tua">TM-Tua (&gt;15 th)</option>
                    <option value="TBM-3">TBM-3 (Umur 25-36 bln)</option>
                    <option value="TBM-2">TBM-2 (Umur 13-24 bln)</option>
                    <option value="TBM-1">TBM-1 (Umur 0-12 bln)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tahun Tanam</label>
                  <input
                    type="number"
                    value={newBlok.thnTanam}
                    onChange={(e) => setNewBlok({ ...newBlok, thnTanam: parseInt(e.target.value) || 2020 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jenis Tanah</label>
                  <select
                    value={newBlok.jenisTanah}
                    onChange={(e) => setNewBlok({ ...newBlok, jenisTanah: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Mineral">Mineral</option>
                    <option value="Gambut">Gambut</option>
                    <option value="Pasiran">Pasiran</option>
                    <option value="Rendahan">Rendahan</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Mandor Lapangan</label>
                  <input
                    type="text"
                    value={newBlok.mandor}
                    onChange={(e) => setNewBlok({ ...newBlok, mandor: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddBlokModal(false)}
                  className="px-3 py-1.5 rounded-lg border text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
                >
                  Simpan Blok
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah BKM */}
      {showAddBKMModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">Input Buku Kerja Mandor (BKM)</h3>
              <button onClick={() => setShowAddBKMModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>
            <form onSubmit={handleAddBKM} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tanggal</label>
                  <input
                    type="date"
                    required
                    value={newBKM.tanggal}
                    onChange={(e) => setNewBKM({ ...newBKM, tanggal: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Afdeling</label>
                  <select
                    value={newBKM.afdeling}
                    onChange={(e) => setNewBKM({ ...newBKM, afdeling: e.target.value })}
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
                  <label className="font-semibold text-slate-700 block mb-1">Pilih Blok</label>
                  <select
                    value={newBKM.blok}
                    onChange={(e) => setNewBKM({ ...newBKM, blok: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    {afdelingList.map(b => (
                      <option key={b.id} value={b.id}>{b.id} ({b.afdeling})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Mandor</label>
                  <input
                    type="text"
                    required
                    value={newBKM.mandor}
                    onChange={(e) => setNewBKM({ ...newBKM, mandor: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Jenis Kegiatan Upkeep</label>
                <select
                  value={newBKM.kegiatan}
                  onChange={(e) => setNewBKM({ ...newBKM, kegiatan: e.target.value })}
                  className="w-full p-2 border rounded-lg font-medium"
                >
                  <option value="Rawat CPT (Circle, Path, TPH)">Rawat CPT (Circle, Path, TPH)</option>
                  <option value="Kastrasi Bunga TBM (Sanitasi)">Kastrasi Bunga TBM (Sanitasi)</option>
                  <option value="Pruning Pelepah Songgo 1-3">Pruning Pelepah Songgo 1-3</option>
                  <option value="Pemupukan TM NPK 13-6-27 (Prinsip 4T)">Pemupukan TM NPK 13-6-27 (Prinsip 4T)</option>
                  <option value="Pengendalian Gulma / Chem Wiping Piringan">Pengendalian Gulma / Chem Wiping Piringan</option>
                  <option value="Dongkel Anak Kayu (DAK Gawangan)">Dongkel Anak Kayu (DAK Gawangan)</option>
                  <option value="Pemasangan Ferotrap Hama Kumbang">Pemasangan Ferotrap Hama Kumbang</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tenaga (HK)</label>
                  <input
                    type="number"
                    required
                    value={newBKM.tenagaKerja}
                    onChange={(e) => setNewBKM({ ...newBKM, tenagaKerja: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Target (Ha)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={newBKM.targetHa}
                    onChange={(e) => setNewBKM({ ...newBKM, targetHa: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Realisasi (Ha)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={newBKM.realisasiHa}
                    onChange={(e) => setNewBKM({ ...newBKM, realisasiHa: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddBKMModal(false)}
                  className="px-3 py-1.5 rounded-lg border text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
                >
                  Simpan BKM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
