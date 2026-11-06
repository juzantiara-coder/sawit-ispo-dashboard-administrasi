import './globals.css';

export const metadata = {
  title: 'Dashboard Administrasi Perkebunan Kelapa Sawit Berbasis ISPO',
  description: 'Sistem Informasi Manajemen Administrasi Operasional Perkebunan Kelapa Sawit dan Kepatuhan Sertifikasi ISPO (Indonesian Sustainable Palm Oil)',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen bg-[#f4f6f8] text-slate-800">
        {children}
      </body>
    </html>
  );
}
