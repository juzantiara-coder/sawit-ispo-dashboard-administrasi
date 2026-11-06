'use client';

import React, { useState } from 'react';
import { 
  Warehouse, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Package, 
  Fuel, 
  Shield, 
  Wrench, 
  ArrowDownLeft, 
  ArrowUpRight,
  Filter,
  Pencil,
  Trash2,
  GraduationCap
} from 'lucide-react';

export default function GudangModule({ 
  gudangStok, 
  setGudangStok, 
  bpbList, 
  setBpbList, 
  bppbList, 
  setBppbList, 
  searchTerm 
}) {
  const [subTab, setSubTab] = useState('stok'); // 'stok' | 'bpb' | 'bppb' | 'alert'
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [showAddBPBModal, setShowAddBPBModal] = useState(false);
  const [showAddBPPBModal, setShowAddBPPBModal] = useState(false);
  const [showAddBarangModal, setShowAddBarangModal] = useState(false);
  const [showEditBarangModal, setShowEditBarangModal] = useState(false);

  // Form BPB State (Permintaan Barang Keluar)
  const [newBPB, setNewBPB] = useState({
    afdeling: 'Afdeling I',
    keperluan: 'Pemupukan TM NPK Blok A01',
    barangId: 'STK-PUP-01',
    jumlah: 50,
    pemohon: 'Supardi (Mandor 1)'
  });

  // Form BPPB State (Penerimaan Barang Masuk)
  const [newBPPB, setNewBPPB] = useState({
    vendor: 'PT. Petrokimia Distributor',
    noSuratJalan: 'SJ-2026-908',
    barangId: 'STK-PUP-01',
    jumlahTerima: 200,
    kondisi: 'Baik & Kering',
    penerima: 'M. Sodik (Petugas Gudang)'
  });

  // Form New Master Item
  const [newBarang, setNewBarang] = useState({
    id: '',
    nama: '',
    kategori: 'Pupuk',
    satuan: 'Zak (50 Kg)',
    stokAwal: 100,
    minStok: 50,
    lokasi: 'Gudang Utama'
  });

  // Form Edit Item
  const [editBarang, setEditBarang] = useState({
    id: '',
    nama: '',
    kategori: 'Pupuk',
    satuan: 'Zak (50 Kg)',
    stokAwal: 100,
    masuk: 0,
    keluar: 0,
    stokAkhir: 100,
    minStok: 50,
    lokasi: 'Gudang Utama',
    status: 'Aman'
  });

  // Filtered Inventory
  const filteredStok = gudangStok.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.kategori.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKat = filterKategori === 'Semua' || item.kategori === filterKategori;
    return matchSearch && matchKat;
  });

  const alertItems = gudangStok.filter(item => item.stokAkhir <= item.minStok);

  // Handle BPB Submit with real-time stock validation
  const handleAddBPB = (e) => {
    e.preventDefault();
    const targetItem = gudangStok.find(i => i.id === newBPB.barangId);
    if (!targetItem) return alert('Barang tidak ditemukan!');

    if (newBPB.jumlah > targetItem.stokAkhir) {
      alert(`Gagal! Permintaan (${newBPB.jumlah} ${targetItem.satuan}) melebihi stok tersedia (${targetItem.stokAkhir} ${targetItem.satuan}).`);
      return;
    }

    const bpbId = `BPB-${Date.now().toString().slice(-6)}`;
    const bpbItem = {
      id: bpbId,
      tanggal: new Date().toISOString().slice(0, 10),
      afdeling: newBPB.afdeling,
      keperluan: newBPB.keperluan,
      barang: targetItem.nama,
      jumlah: Number(newBPB.jumlah),
      satuan: targetItem.satuan.split(' ')[0],
      pemohon: newBPB.pemohon,
      disetujuiOleh: 'Ir. Hendra Wardhana (Asisten Kepala)',
      status: 'Approved'
    };

    // Update Master Stock
    const updatedStok = gudangStok.map(item => {
      if (item.id === targetItem.id) {
        const keluar = item.keluar + Number(newBPB.jumlah);
        const akhir = item.stokAkhir - Number(newBPB.jumlah);
        const status = akhir <= (item.minStok / 2) ? 'Kritis' : akhir <= item.minStok ? 'Perlu Reorder' : 'Aman';
        return { ...item, keluar, stokAkhir: akhir, status };
      }
      return item;
    });

    setGudangStok(updatedStok);
    setBpbList([bpbItem, ...bpbList]);
    setShowAddBPBModal(false);
  };

  // Handle BPPB Submit (Receiving Goods)
  const handleAddBPPB = (e) => {
    e.preventDefault();
    const targetItem = gudangStok.find(i => i.id === newBPPB.barangId);
    if (!targetItem) return alert('Barang tidak ditemukan!');

    const bppbId = `BPPB-${Date.now().toString().slice(-6)}`;
    const bppbItem = {
      id: bppbId,
      tanggal: new Date().toISOString().slice(0, 10),
      vendor: newBPPB.vendor,
      noSuratJalan: newBPPB.noSuratJalan,
      barang: targetItem.nama,
      jumlahTerima: Number(newBPPB.jumlahTerima),
      satuan: targetItem.satuan.split(' ')[0],
      kondisi: newBPPB.kondisi,
      penerima: newBPPB.penerima,
      status: 'Masuk Stok'
    };

    // Update Stock
    const updatedStok = gudangStok.map(item => {
      if (item.id === targetItem.id) {
        const masuk = item.masuk + Number(newBPPB.jumlahTerima);
        const akhir = item.stokAkhir + Number(newBPPB.jumlahTerima);
        const status = akhir <= (item.minStok / 2) ? 'Kritis' : akhir <= item.minStok ? 'Perlu Reorder' : 'Aman';
        return { ...item, masuk, stokAkhir: akhir, status };
      }
      return item;
    });

    setGudangStok(updatedStok);
    setBppbList([bppbItem, ...bppbList]);
    setShowAddBPPBModal(false);
  };

  // Handle New Item
  const handleAddMasterBarang = (e) => {
    e.preventDefault();
    if (!newBarang.id || !newBarang.nama) return alert('Lengkapi data barang!');
    const item = {
      ...newBarang,
      masuk: 0,
      keluar: 0,
      stokAkhir: Number(newBarang.stokAwal),
      status: Number(newBarang.stokAwal) <= Number(newBarang.minStok) ? 'Perlu Reorder' : 'Aman'
    };
    setGudangStok([item, ...gudangStok]);
    setShowAddBarangModal(false);
  };

  // Handle Edit Item
  const handleOpenEditBarang = (item) => {
    setEditBarang({ ...item });
    setShowEditBarangModal(true);
  };

  const handleSaveEditBarang = (e) => {
    e.preventDefault();
    const akhir = Number(editBarang.stokAkhir);
    const min = Number(editBarang.minStok);
    const status = akhir <= (min / 2) ? 'Kritis' : akhir <= min ? 'Perlu Reorder' : 'Aman';
    const updated = gudangStok.map(i => i.id === editBarang.id ? { ...editBarang, stokAkhir: akhir, minStok: min, status } : i);
    setGudangStok(updated);
    setShowEditBarangModal(false);
  };

  const handleDeleteBarang = (id) => {
    if (confirm(`Apakah Anda yakin ingin menghapus item ${id}?`)) {
      setGudangStok(gudangStok.filter(i => i.id !== id));
      setShowEditBarangModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Subtabs */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Modul 3: Logistik & Pengendalian Persediaan
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Administrasi Gudang Perkebunan</h2>
          <p className="text-xs text-slate-500">
            Pencatatan mutasi pupuk, agrochemical berizin, BBM solar traksi, sparepart panen, dan APD K3 perkebunan.
          </p>

          {/* Posisi Identitas Mahasiswa Penanggung Jawab Modul (Posisi Seragam) */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium shadow-xs">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span className="text-slate-500">Penanggung Jawab:</span>
              <span className="font-bold text-emerald-900">Sisca Ramadhani</span>
              <span className="text-emerald-800 font-mono font-semibold bg-emerald-100/90 px-2 py-0.5 rounded-md border border-emerald-300">
                NIM: 24244003
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setSubTab('stok')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'stok' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Buku Mutasi Stok
          </button>
          <button
            onClick={() => setSubTab('bpb')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'bpb' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Permintaan (BPB)
          </button>
          <button
            onClick={() => setSubTab('bppb')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'bppb' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Penerimaan (BPPB)
          </button>
          <button
            onClick={() => setSubTab('alert')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition relative ${
              subTab === 'alert' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Reorder Alert
            {alertItems.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                {alertItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Item SKU Aktif</span>
            <Package className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{gudangStok.length} <span className="text-xs font-normal text-slate-500">Jenis</span></p>
          <p className="text-[11px] text-emerald-700 mt-1">Pupuk, Kimia, BBM, Alat & APD</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Stok BBM Solar Traksi</span>
            <Fuel className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">6,700 <span className="text-xs font-normal text-slate-500">Liter</span></p>
          <p className="text-[11px] text-emerald-700 mt-1">Status Aman (Min: 2,500 L)</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Status Reorder Point</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600 mt-1">{alertItems.length} <span className="text-xs font-normal text-slate-500">Item Kritis</span></p>
          <p className="text-[11px] text-slate-500 mt-1">Perlu penerbitan PO pengadaan</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Permintaan BPB Hari Ini</span>
            <Warehouse className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1">{bpbList.length} <span className="text-xs font-normal text-slate-500">Surat Jalan</span></p>
          <p className="text-[11px] text-emerald-700 mt-1">100% Terverifikasi Asisten</p>
        </div>
      </div>

      {/* SUBTAB 1: BUKU MUTASI STOK LOGISTIK */}
      {subTab === 'stok' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-800">Buku Kartu Mutasi Stok Logistik Kebun</span>
              <div className="flex items-center gap-1 text-xs text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select 
                  value={filterKategori} 
                  onChange={(e) => setFilterKategori(e.target.value)}
                  className="bg-transparent border-none focus:outline-none text-xs font-medium cursor-pointer"
                >
                  <option value="Semua">Semua Kategori</option>
                  <option value="Pupuk">Pupuk</option>
                  <option value="Herbisida">Herbisida</option>
                  <option value="Pestisida">Pestisida</option>
                  <option value="BBM & Pelumas">BBM & Pelumas</option>
                  <option value="Sparepart & Alat">Sparepart & Alat</option>
                  <option value="Alat Pelindung Diri (APD)">Alat Pelindung Diri (APD)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddBarangModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition"
              >
                <Plus className="w-4 h-4" /> Tambah Item Master
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Kode Item</th>
                  <th className="py-3 px-4">Nama Barang & Spesifikasi</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Satuan</th>
                  <th className="py-3 px-4 text-right">Stok Awal</th>
                  <th className="py-3 px-4 text-right text-emerald-700 font-bold">Masuk (+)</th>
                  <th className="py-3 px-4 text-right text-rose-700 font-bold">Keluar (-)</th>
                  <th className="py-3 px-4 text-right font-bold text-slate-900">Stok Akhir</th>
                  <th className="py-3 px-4 text-right">Min Stok</th>
                  <th className="py-3 px-4">Lokasi Rak</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center font-bold text-emerald-900">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStok.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{item.id}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">{item.nama}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-medium">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-600">{item.satuan}</td>
                    <td className="py-3 px-4 text-right font-mono">{item.stokAwal.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-emerald-700">+{item.masuk}</td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-rose-600">-{item.keluar}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 text-sm">
                      {item.stokAkhir.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-500">{item.minStok}</td>
                    <td className="py-3 px-4 text-slate-600 text-[11px]">{item.lokasi}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'Aman' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : item.status === 'Perlu Reorder' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-rose-100 text-rose-800 animate-pulse'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenEditBarang(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold shadow-2xs transition active:scale-95"
                        title="Edit Master Stok Gudang"
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

      {/* SUBTAB 2: BUKTI PERMINTAAN BARANG (BPB) */}
      {subTab === 'bpb' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Form & Registrasi Bukti Permintaan Barang (BPB)</h3>
              <p className="text-xs text-slate-500">Pemberian izin pengeluaran pupuk, pestisida, sparepart & solar dengan validasi stok.</p>
            </div>
            <button
              onClick={() => setShowAddBPBModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition"
            >
              <Plus className="w-4 h-4" /> Ajukan BPB Baru
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">No. BPB</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Unit / Afdeling</th>
                  <th className="py-3 px-4">Keperluan Penggunaan</th>
                  <th className="py-3 px-4">Nama Barang</th>
                  <th className="py-3 px-4 text-right">Jumlah Dikeluarkan</th>
                  <th className="py-3 px-4">Pemohon</th>
                  <th className="py-3 px-4">Persetujuan</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bpbList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{item.id}</td>
                    <td className="py-3 px-4">{item.tanggal}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{item.afdeling}</td>
                    <td className="py-3 px-4 text-slate-700">{item.keperluan}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{item.barang}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                      {item.jumlah} {item.satuan}
                    </td>
                    <td className="py-3 px-4 text-slate-700">{item.pemohon}</td>
                    <td className="py-3 px-4 text-[11px] text-emerald-800 font-medium">{item.disetujuiOleh}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
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

      {/* SUBTAB 3: BUKTI PENERIMAAN BARANG (BPPB) */}
      {subTab === 'bppb' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Bukti Penerimaan Barang (BPPB) Dari Vendor</h3>
              <p className="text-xs text-slate-500">Pencatatan pasokan logistik masuk ke gudang sentral dengan pengecekan fisik.</p>
            </div>
            <button
              onClick={() => setShowAddBPPBModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition"
            >
              <Plus className="w-4 h-4" /> Input Penerimaan (BPPB)
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">No. BPPB</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Vendor / Pemasok</th>
                  <th className="py-3 px-4">No. Surat Jalan</th>
                  <th className="py-3 px-4">Barang Diterima</th>
                  <th className="py-3 px-4 text-right">Volume / Qty</th>
                  <th className="py-3 px-4">Kondisi Fisik</th>
                  <th className="py-3 px-4">Petugas Gudang</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bppbList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{item.id}</td>
                    <td className="py-3 px-4">{item.tanggal}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{item.vendor}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{item.noSuratJalan}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{item.barang}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-800">
                      +{item.jumlahTerima} {item.satuan}
                    </td>
                    <td className="py-3 px-4 text-slate-700">{item.kondisi}</td>
                    <td className="py-3 px-4 text-slate-800">{item.penerima}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
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

      {/* SUBTAB 4: REORDER POINT ALERT */}
      {subTab === 'alert' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900 text-sm">Peringatan Stok Minimum (Reorder Point Alert)</h4>
              <p className="text-xs text-amber-800 mt-1">
                Terdapat {alertItems.length} logistik yang telah mencapai atau di bawah batas minimum pengamanan operasional kebun. Segera lakukan pengadaan (PO) agar tidak mengganggu rotasi pemupukan, proteksi hama, atau keselamatan kerja.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alertItems.map((item) => {
              const defisit = item.minStok - item.stokAkhir;
              const saranOrder = item.minStok * 2;
              return (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.kategori}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base mt-1">{item.nama}</h4>
                      <p className="text-xs text-slate-500 font-mono">Kode: {item.id} | Lokasi: {item.lokasi}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      item.status === 'Kritis' ? 'bg-rose-100 text-rose-800 animate-pulse' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Sisa Stok Saat Ini</span>
                      <span className="text-lg font-bold text-rose-600 font-mono">{item.stokAkhir}</span>
                      <span className="text-[10px] text-slate-500 block">{item.satuan}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Batas Minimum</span>
                      <span className="text-lg font-bold text-slate-700 font-mono">{item.minStok}</span>
                      <span className="text-[10px] text-slate-500 block">{item.satuan}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Saran Pemesanan</span>
                      <span className="text-lg font-bold text-emerald-700 font-mono">+{saranOrder}</span>
                      <span className="text-[10px] text-slate-500 block">{item.satuan}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500">Keterlambatan PO dapat berdampak pada upkeep</span>
                    <button 
                      onClick={() => alert(`Daftar Purchase Requisition (PR) untuk ${item.nama} sejumlah ${saranOrder} ${item.satuan} telah diteruskan ke Purchasing Kantor Direksi.`)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-xs"
                    >
                      Terbitkan Draft PO
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL EDIT MASTER BARANG */}
      {showEditBarangModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Edit Master Item Gudang</h3>
                  <p className="text-[11px] text-slate-500 font-mono">SKU: {editBarang.id}</p>
                </div>
              </div>
              <button onClick={() => setShowEditBarangModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>
            <form onSubmit={handleSaveEditBarang} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kode SKU</label>
                  <input
                    type="text"
                    disabled
                    value={editBarang.id}
                    className="w-full p-2 border rounded-lg bg-slate-100 font-mono font-bold text-slate-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kategori</label>
                  <select
                    value={editBarang.kategori}
                    onChange={(e) => setEditBarang({ ...editBarang, kategori: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Pupuk">Pupuk</option>
                    <option value="Herbisida">Herbisida</option>
                    <option value="Pestisida">Pestisida</option>
                    <option value="BBM & Pelumas">BBM & Pelumas</option>
                    <option value="Sparepart & Alat">Sparepart & Alat</option>
                    <option value="Alat Pelindung Diri (APD)">Alat Pelindung Diri (APD)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Barang & Merek</label>
                <input
                  type="text"
                  required
                  value={editBarang.nama}
                  onChange={(e) => setEditBarang({ ...editBarang, nama: e.target.value })}
                  className="w-full p-2 border rounded-lg font-medium"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Satuan</label>
                  <input
                    type="text"
                    required
                    value={editBarang.satuan}
                    onChange={(e) => setEditBarang({ ...editBarang, satuan: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Sisa Stok Fisik</label>
                  <input
                    type="number"
                    required
                    value={editBarang.stokAkhir}
                    onChange={(e) => setEditBarang({ ...editBarang, stokAkhir: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg font-bold text-emerald-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Min Stok (ROP)</label>
                  <input
                    type="number"
                    required
                    value={editBarang.minStok}
                    onChange={(e) => setEditBarang({ ...editBarang, minStok: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Lokasi Rak / Gudang</label>
                <input
                  type="text"
                  value={editBarang.lokasi}
                  onChange={(e) => setEditBarang({ ...editBarang, lokasi: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="pt-3 flex items-center justify-between border-t">
                <button
                  type="button"
                  onClick={() => handleDeleteBarang(editBarang.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus Item
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEditBarangModal(false)}
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

      {/* Modal Ajukan BPB */}
      {showAddBPBModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">Buat Permintaan Barang (BPB)</h3>
              <button onClick={() => setShowAddBPBModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>
            <form onSubmit={handleAddBPB} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Unit Peminta</label>
                  <select
                    value={newBPB.afdeling}
                    onChange={(e) => setNewBPB({ ...newBPB, afdeling: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Afdeling I">Afdeling I</option>
                    <option value="Afdeling II">Afdeling II</option>
                    <option value="Afdeling III">Afdeling III</option>
                    <option value="Afdeling IV">Afdeling IV</option>
                    <option value="Bengkel & Traksi">Bengkel & Traksi</option>
                    <option value="P2K3 / Safety Officer">P2K3 / Safety Officer</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Pemohon</label>
                  <input
                    type="text"
                    required
                    value={newBPB.pemohon}
                    onChange={(e) => setNewBPB({ ...newBPB, pemohon: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Pilih Item Logistik</label>
                <select
                  value={newBPB.barangId}
                  onChange={(e) => setNewBPB({ ...newBPB, barangId: e.target.value })}
                  className="w-full p-2 border rounded-lg font-medium"
                >
                  {gudangStok.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.nama} (Sisa: {i.stokAkhir} {i.satuan})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jumlah Diminta</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newBPB.jumlah}
                    onChange={(e) => setNewBPB({ ...newBPB, jumlah: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Keperluan Penggunaan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pemupukan NPK Blok A01"
                    value={newBPB.keperluan}
                    onChange={(e) => setNewBPB({ ...newBPB, keperluan: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddBPBModal(false)}
                  className="px-3 py-1.5 rounded-lg border text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
                >
                  Validasi & Keluarkan Barang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Input BPPB */}
      {showAddBPPBModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">Input Penerimaan Barang (BPPB)</h3>
              <button onClick={() => setShowAddBPPBModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>
            <form onSubmit={handleAddBPPB} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Vendor / Distributor</label>
                  <input
                    type="text"
                    required
                    value={newBPPB.vendor}
                    onChange={(e) => setNewBPPB({ ...newBPPB, vendor: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">No. Surat Jalan Vendor</label>
                  <input
                    type="text"
                    required
                    value={newBPPB.noSuratJalan}
                    onChange={(e) => setNewBPPB({ ...newBPPB, noSuratJalan: e.target.value })}
                    className="w-full p-2 border rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Pilih Item Logistik Masuk</label>
                <select
                  value={newBPPB.barangId}
                  onChange={(e) => setNewBPPB({ ...newBPPB, barangId: e.target.value })}
                  className="w-full p-2 border rounded-lg font-medium"
                >
                  {gudangStok.map((i) => (
                    <option key={i.id} value={i.id}>{i.nama} ({i.kategori})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jumlah Diterima</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newBPPB.jumlahTerima}
                    onChange={(e) => setNewBPPB({ ...newBPPB, jumlahTerima: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kondisi Kemasan / Fisik</label>
                  <input
                    type="text"
                    value={newBPPB.kondisi}
                    onChange={(e) => setNewBPPB({ ...newBPPB, kondisi: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddBPPBModal(false)}
                  className="px-3 py-1.5 rounded-lg border text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
                >
                  Simpan ke Kartu Stok
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Master Barang */}
      {showAddBarangModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">Tambah Item Master Gudang</h3>
              <button onClick={() => setShowAddBarangModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>
            <form onSubmit={handleAddMasterBarang} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kode SKU</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: STK-PUP-05"
                    value={newBarang.id}
                    onChange={(e) => setNewBarang({ ...newBarang, id: e.target.value.toUpperCase() })}
                    className="w-full p-2 border rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kategori</label>
                  <select
                    value={newBarang.kategori}
                    onChange={(e) => setNewBarang({ ...newBarang, kategori: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Pupuk">Pupuk</option>
                    <option value="Herbisida">Herbisida</option>
                    <option value="Pestisida">Pestisida</option>
                    <option value="BBM & Pelumas">BBM & Pelumas</option>
                    <option value="Sparepart & Alat">Sparepart & Alat</option>
                    <option value="Alat Pelindung Diri (APD)">Alat Pelindung Diri (APD)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Barang & Merek</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kieserit Magnesium Sulfat Jerman"
                  value={newBarang.nama}
                  onChange={(e) => setNewBarang({ ...newBarang, nama: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Satuan</label>
                  <input
                    type="text"
                    required
                    placeholder="Zak / Jerigen / L"
                    value={newBarang.satuan}
                    onChange={(e) => setNewBarang({ ...newBarang, satuan: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Stok Awal</label>
                  <input
                    type="number"
                    value={newBarang.stokAwal}
                    onChange={(e) => setNewBarang({ ...newBarang, stokAwal: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Reorder Point</label>
                  <input
                    type="number"
                    value={newBarang.minStok}
                    onChange={(e) => setNewBarang({ ...newBarang, minStok: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Lokasi Rak / Gudang</label>
                <input
                  type="text"
                  value={newBarang.lokasi}
                  onChange={(e) => setNewBarang({ ...newBarang, lokasi: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddBarangModal(false)}
                  className="px-3 py-1.5 rounded-lg border text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
                >
                  Simpan Master Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
