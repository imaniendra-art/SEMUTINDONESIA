import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pendaftaran Anggota | SEMUT INDONESIA",
  description: "Bergabunglah bersama Seniman Musik Dangdut Indonesia.",
};

export default function PendaftaranPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <div className="container mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-semut-red/10 text-semut-red rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
        </div>
        <h1 className="text-4xl font-extrabold mb-4">Pendaftaran Anggota</h1>
        <h2 className="text-2xl text-semut-gold font-semibold mb-6">Segera Hadir!</h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-10">
          Sistem pendaftaran anggota online SEMUT INDONESIA saat ini sedang dalam tahap pengembangan. Untuk sementara waktu, pendaftaran dan perpanjangan keanggotaan dapat dilakukan dengan menghubungi pengurus pusat.
        </p>

        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 max-w-lg w-full">
          <h3 className="text-lg font-bold mb-4 border-b pb-4">Informasi Pendaftaran Manual</h3>
          <ul className="text-left space-y-4 mb-6">
            <li className="flex gap-3">
              <span className="text-green-500 mt-1 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">Siapkan foto KTP, pas foto terbaru, dan bukti karya/profil sebagai seniman.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500 mt-1 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">Hubungi Ketua Umum via WhatsApp untuk mendapatkan formulir fisik/PDF.</span>
            </li>
          </ul>
          
          <a 
            href="https://wa.me/6285399717199" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Hubungi via WhatsApp
          </a>
        </div>
        
        <Link href="/" className="mt-8 text-sm text-gray-500 hover:text-semut-red underline">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
