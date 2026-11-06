// Export utility for PDF and Excel
import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName = 'Laporan_Administrasi_Sawit') => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Perkebunan');
    XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().slice(0, 10)}.xlsx`);
  } catch (error) {
    console.error('Export Excel failed:', error);
    alert('Gagal mengekspor data ke Excel.');
  }
};

export const exportMultipleSheetsToExcel = (sheetsData, fileName = 'Laporan_Lengkap_Sawit_ISPO') => {
  try {
    const workbook = XLSX.utils.book_new();
    Object.keys(sheetsData).forEach((sheetName) => {
      const ws = XLSX.utils.json_to_sheet(sheetsData[sheetName]);
      XLSX.utils.book_append_sheet(workbook, ws, sheetName.substring(0, 31));
    });
    XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().slice(0, 10)}.xlsx`);
  } catch (error) {
    console.error('Export Multi Sheet failed:', error);
    alert('Gagal mengekspor data ke Excel.');
  }
};

export const triggerPrint = () => {
  window.print();
};
