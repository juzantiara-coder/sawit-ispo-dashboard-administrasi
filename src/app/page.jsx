'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AfdelingModule from '../components/AfdelingModule';
import PanenModule from '../components/PanenModule';
import GudangModule from '../components/GudangModule';
import OfficeISPOModule from '../components/OfficeISPOModule';
import { 
  initialAfdelingData, 
  initialBKMData, 
  initialAbsensiData, 
  initialPanenSPK, 
  initialSPBData, 
  initialDendaPanen, 
  initialGudangStok, 
  initialBPBData, 
  initialBPPBData, 
  initialISPOData, 
  executiveKPISummary 
} from '../data/mockData';
import { exportToExcel, exportMultipleSheetsToExcel, triggerPrint } from '../utils/exportUtils';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('afdeling'); // 'afdeling' | 'panen' | 'gudang' | 'kantor'
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Operational State
  const [afdelingList, setAfdelingList] = useState(initialAfdelingData);
  const [bkmList, setBkmList] = useState(initialBKMData);
  const [absensiList, setAbsensiList] = useState(initialAbsensiData);
  const [panenSPKList, setPanenSPKList] = useState(initialPanenSPK);
  const [spbList, setSpbList] = useState(initialSPBData);
  const [dendaList, setDendaList] = useState(initialDendaPanen);
  const [gudangStok, setGudangStok] = useState(initialGudangStok);
  const [bpbList, setBpbList] = useState(initialBPBData);
  const [bppbList, setBppbList] = useState(initialBPPBData);
  const [ispoList, setIspoList] = useState(initialISPOData);
  const [executiveData, setExecutiveData] = useState(executiveKPISummary);

  const reorderAlertCount = gudangStok.filter(item => item.stokAkhir <= item.minStok).length;

  // Dynamic titles for header
  const getHeaderMeta = () => {
    switch (activeTab) {
      case 'afdeling':
        return {
          title: 'Administrasi Afdeling',
          subtitle: 'Pengelolaan data blok, SPH pokok, buku kerja mandor, dan rotasi pemeliharaan (upkeep).'
        };
      case 'panen':
        return {
          title: 'Administrasi Panen & Angkut PKS',
          subtitle: 'Pencatatan SPK panen harian, BJR, surat pengantar buah (SPB), dan audit denda mutu buah.'
        };
      case 'gudang':
        return {
          title: 'Administrasi Gudang & Logistik',
          subtitle: 'Mutasi logistik pupuk, herbisida, BBM traktor, sparepart panen, dan validasi BPB/BPPB.'
        };
      case 'kantor':
        return {
          title: 'Administrasi Kantor & Sertifikasi ISPO',
          subtitle: 'Executive dashboard KPI, kearsipan 7 prinsip ISPO, log limbah B3, dan ekspor laporan formal.'
        };
      default:
        return {
          title: 'Administrasi Sawit ISPO',
          subtitle: 'Sistem Informasi Terintegrasi Operasional Perkebunan Kelapa Sawit'
        };
    }
  };

  const { title, subtitle } = getHeaderMeta();

  // Export current active view to Excel
  const handleExportCurrent = () => {
    switch (activeTab) {
      case 'afdeling':
        exportMultipleSheetsToExcel({
          'Data Blok Afdeling': afdelingList,
          'Buku Kerja Mandor': bkmList,
          'Absensi TK': absensiList
        }, 'Laporan_Afdeling_Dan_Upkeep');
        break;
      case 'panen':
        exportMultipleSheetsToExcel({
          'SPK Panen': panenSPKList,
          'Tiket SPB PKS': spbList,
          'Mutu Dan Denda': dendaList
        }, 'Laporan_Panen_Dan_SPB_PKS');
        break;
      case 'gudang':
        exportMultipleSheetsToExcel({
          'Stok Logistik': gudangStok,
          'Permintaan BPB': bpbList,
          'Penerimaan BPPB': bppbList
        }, 'Laporan_Mutasi_Gudang');
        break;
      case 'kantor':
        exportToExcel(ispoList, 'Laporan_Kepatuhan_ISPO');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f4f6f8]">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen}
        reorderAlertCount={reorderAlertCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header 
          title={title} 
          subtitle={subtitle} 
          setMobileOpen={setMobileOpen}
          onExportExcel={handleExportCurrent}
          onPrint={triggerPrint}
          reorderAlertCount={reorderAlertCount}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Dynamic Body Module */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {activeTab === 'afdeling' && (
            <AfdelingModule 
              afdelingList={afdelingList}
              setAfdelingList={setAfdelingList}
              bkmList={bkmList}
              setBkmList={setBkmList}
              absensiList={absensiList}
              setAbsensiList={setAbsensiList}
              searchTerm={searchTerm}
            />
          )}

          {activeTab === 'panen' && (
            <PanenModule 
              panenSPKList={panenSPKList}
              setPanenSPKList={setPanenSPKList}
              spbList={spbList}
              setSpbList={setSpbList}
              dendaList={dendaList}
              setDendaList={setDendaList}
              searchTerm={searchTerm}
            />
          )}

          {activeTab === 'gudang' && (
            <GudangModule 
              gudangStok={gudangStok}
              setGudangStok={setGudangStok}
              bpbList={bpbList}
              setBpbList={setBpbList}
              bppbList={bppbList}
              setBppbList={setBppbList}
              searchTerm={searchTerm}
            />
          )}

          {activeTab === 'kantor' && (
            <OfficeISPOModule 
              executiveData={executiveData}
              ispoList={ispoList}
              afdelingList={afdelingList}
              bkmList={bkmList}
              panenSPKList={panenSPKList}
              spbList={spbList}
              gudangStok={gudangStok}
              searchTerm={searchTerm}
            />
          )}
        </main>
      </div>
    </div>
  );
}
