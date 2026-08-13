import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const isLoggedIn = !!session;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
      {/* Sidebar for logged in users */}
      {isLoggedIn && (
        <aside className="w-64 bg-[#121212] text-white flex flex-col border-r border-gray-800 shadow-2xl z-20 shrink-0">
          <div className="h-20 px-6 border-b border-gray-800 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-semut-gold shrink-0 bg-black flex items-center justify-center">
              <Image src="/logo-si.jpeg" alt="Logo Semut" width={44} height={44} className="object-cover w-full h-full scale-110" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-extrabold text-white leading-none tracking-wide mt-1">SEMUT</h2>
              <span className="text-[10px] text-semut-gold font-bold tracking-widest uppercase mt-0.5">Admin Panel</span>
            </div>
          </div>
          
          <div className="px-5 py-6">
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">Menu Utama</div>
             <nav className="space-y-1">
               <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                 Dashboard
               </Link>
               <Link href="/admin/berita" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
                 Kelola Berita
               </Link>
               <Link href="/admin/acara" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                 Kelola Acara
               </Link>
               <Link href="/admin/legalitas" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                 Kelola Dokumen
               </Link>
             </nav>
          </div>

          {session.role === 'SUPERADMIN' && (
            <div className="px-5 py-2">
               <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">Sistem</div>
               <nav className="space-y-1">
                 <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-semut-gold hover:text-yellow-300 hover:bg-semut-gold/10 transition-all">
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                   Manajemen Admin
                 </Link>
                 <Link href="/admin/halaman" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-semut-gold hover:text-yellow-300 hover:bg-semut-gold/10 transition-all">
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                   Kelola Halaman
                 </Link>
               </nav>
            </div>
          )}
          
          <div className="mt-auto p-5 border-t border-gray-800 bg-[#0a0a0a]">
            <Link href="/" className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm font-bold transition-all border border-white/5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Kembali ke Web
            </Link>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {isLoggedIn && (
          <header className="bg-white dark:bg-[#111] border-b-4 border-semut-red shadow-sm h-20 flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center gap-3">
               <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-semut-red/10 border border-red-100 dark:border-semut-red/20 text-semut-red text-xs font-extrabold uppercase tracking-widest shadow-sm">
                 <span className="w-2 h-2 rounded-full bg-semut-red animate-pulse"></span>
                 {session.dpp || 'DPP PUSAT'}
               </span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-extrabold text-gray-900 dark:text-gray-100 tracking-wide">
                  {session.role === 'SUPERADMIN' ? 'Super Administrator' : 'Administrator'}
                </div>
                <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Akses Dasbor Aktif</div>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-gray-800"></div>
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-gray-500 hover:text-semut-red hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                  Logout
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                </button>
              </form>
            </div>
          </header>
        )}
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
