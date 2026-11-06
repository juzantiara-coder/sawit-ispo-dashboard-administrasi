'use client';

import React from 'react';
import { 
  Trees, 
  Tractor, 
  Warehouse, 
  FileCheck2, 
  Menu, 
  X, 
  ShieldCheck, 
  Leaf,
  Calendar,
  Layers,
  BarChart3,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen, reorderAlertCount }) {
  const menuItems = [
    {
      id: 'afdeling',
      label: 'Administrasi Afdeling',
      sublabel: 'Blok, BKM, Absensi & Upkeep',
      icon: Trees,
      badge: '10 Blok'
    },
    {
      id: 'panen',
      label: 'Administrasi Panen',
      sublabel: 'SPK, BJR, SPB & Denda Mutu',
      icon: Tractor,
      badge: '4 SPK Aktif'
    },
    {
      id: 'gudang',
      label: 'Administrasi Gudang',
      sublabel: 'Mutasi Logistik, BPB & Reorder',
      icon: Warehouse,
      badge: reorderAlertCount > 0 ? `${reorderAlertCount} Alert` : null,
      badgeColor: 'bg-amber-500'
    },
    {
      id: 'kantor',
      label: 'Kantor & Dokumen ISPO',
      sublabel: 'KPI Eksekutif, 7 Prinsip & Audit',
      icon: ShieldCheck,
      badge: 'ISPO Certified'
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0c2e1f] text-slate-100 border-r border-[#1a4a35] shadow-xl">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#174630] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-950/40">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              AGRO-ISPO <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-1.5 py-0.5 rounded font-mono font-medium">v2.6</span>
            </h1>
            <p className="text-xs text-emerald-300/80">Sistem Administrasi Sawit</p>
          </div>
        </div>
        <button 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-emerald-200 hover:bg-emerald-800/40"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Estate Information Badge */}
      <div className="px-4 py-3 mx-4 my-3 rounded-xl bg-[#133e2b] border border-[#1d573d] text-xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-slate-300 font-medium">Kebun Sejahtera Utama</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>
        <p className="text-[11px] text-emerald-300/80">HGU No. 44/HGU/BPN/2005</p>
        <div className="mt-2 pt-2 border-t border-[#1d573d] flex items-center justify-between text-[11px] text-slate-300">
          <span>Luas: 2,450 Ha</span>
          <span className="text-emerald-400 font-semibold">ISPO Valid</span>
        </div>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <p className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-emerald-400/70">
          Modul Operasional & Tata Kelola
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileOpen(false);
              }}
              className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all duration-150 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium shadow-md shadow-emerald-950/40 ring-1 ring-emerald-400/30'
                  : 'text-slate-300 hover:bg-[#133e2b] hover:text-white'
              }`}
            >
              <div className={`p-2 rounded-lg mt-0.5 ${isActive ? 'bg-white/20 text-white' : 'bg-[#184632] text-emerald-300'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold truncate">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      item.badgeColor 
                        ? `${item.badgeColor} text-white` 
                        : isActive ? 'bg-white/20 text-white' : 'bg-emerald-900/80 text-emerald-300 border border-emerald-700/50'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className={`text-xs truncate mt-0.5 ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {item.sublabel}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Standard Reference */}
      <div className="p-4 m-3 rounded-xl bg-[#092217] border border-[#14422e] text-xs space-y-1.5">
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Kepatuhan Standar ISPO</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Kriteria panen 5 tandan, songgo 1-3, prinsip 4T pemupukan, riparian zone 50m terlindungi.
        </p>
      </div>

      {/* User profile footer */}
      <div className="p-4 border-t border-[#174630] bg-[#092217]/60 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs ring-2 ring-emerald-500/30">
          HW
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white truncate">Ir. Hendra Wardhana</p>
          <p className="text-[11px] text-emerald-400 truncate">Asisten Kepala (Askep)</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 shrink-0 select-none z-30">
        {sidebarContent}
      </aside>

      {/* Mobile / Mini-tablet off-canvas */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
