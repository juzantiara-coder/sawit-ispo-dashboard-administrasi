'use client';

import React from 'react';
import { 
  Menu, 
  Download, 
  Printer, 
  FileSpreadsheet, 
  Calendar, 
  Search, 
  Bell, 
  Leaf,
  ShieldCheck
} from 'lucide-react';
import { exportToExcel, triggerPrint } from '../utils/exportUtils';

export default function Header({ 
  title, 
  subtitle, 
  setMobileOpen, 
  onExportExcel, 
  onPrint, 
  reorderAlertCount,
  searchTerm,
  setSearchTerm
}) {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-6 py-3.5 shadow-sm no-print">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Mobile hamburger & title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Buka Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> ISPO Certified
              </span>
            </div>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
        </div>

        {/* Right: Quick Tools, Search & Export Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Search bar */}
          <div className="relative flex-1 sm:w-56 min-w-[140px]">
            <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Cari data/blok/mandor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
            />
          </div>

          {/* Date Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>04 Nov 2026 (Rotasi 14)</span>
          </div>

          {/* Action Buttons: Export Excel */}
          <button
            onClick={onExportExcel}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition active:scale-95"
            title="Ekspor ke format Excel (.xlsx)"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Ekspor Excel</span>
          </button>

          {/* Action Buttons: Print PDF */}
          <button
            onClick={onPrint || triggerPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-sm transition active:scale-95"
            title="Cetak Laporan / Simpan PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Cetak / PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}
