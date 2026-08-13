import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image 
                src="/logo-si.jpeg" 
                alt="SEMUT INDONESIA Logo" 
                width={48} 
                height={48} 
                className="rounded-full object-cover"
              />
              <span className="font-bold text-lg tracking-tight text-semut-red dark:text-semut-gold">
                SEMUT INDONESIA
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Seniman Musik Dangdut Indonesia. Wadah silaturahmi, kreasi, dan pelestarian musik dangdut di tanah air.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Tautan Utama</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/" className="hover:text-semut-red transition-colors">Beranda</Link></li>
              <li><Link href="/profil" className="hover:text-semut-red transition-colors">Profil Organisasi</Link></li>
              <li><Link href="/berita" className="hover:text-semut-red transition-colors">Portal Berita</Link></li>
              <li><Link href="/acara" className="hover:text-semut-red transition-colors">Jadwal Acara</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Layanan</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/pendaftaran" className="hover:text-semut-red transition-colors">Pendaftaran Anggota</Link></li>
              <li><Link href="/kontak" className="hover:text-semut-red transition-colors">Hubungi Kami</Link></li>
              <li><Link href="/admin" className="hover:text-semut-red transition-colors">Login Admin</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Hubungi Ketua</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Bpk. Muh. Yusuf
            </p>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-semut-gold"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a 
                href="https://wa.me/6285399717199" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-semut-red transition-colors dark:text-gray-400 dark:hover:text-white"
              >
              +62 853-9971-7199 (WhatsApp)
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} SEMUT INDONESIA. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
