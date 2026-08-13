import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b-[4px] border-semut-red shadow-md dark:border-semut-red">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo-si.jpeg" 
              alt="SEMUT INDONESIA Logo" 
              width={48} 
              height={48} 
              className="rounded-full object-cover"
            />
            <span className="font-extrabold text-xl tracking-tight text-semut-red dark:text-semut-gold">
              SEMUT INDONESIA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-semut-red transition-colors">Beranda</Link>
            <Link href="/profil" className="hover:text-semut-red transition-colors">Profil</Link>
            <Link href="/berita" className="hover:text-semut-red transition-colors">Berita</Link>
            <Link href="/acara" className="hover:text-semut-red transition-colors">Acara</Link>
            <Link href="/anggota" className="hover:text-semut-red transition-colors">Anggota</Link>
            <Link href="/legalitas" className="hover:text-semut-red transition-colors">Legalitas</Link>
            <Link href="/kontak" className="hover:text-semut-red transition-colors">Kontak</Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Link 
              href="/pendaftaran" 
              className="hidden md:inline-flex items-center justify-center rounded-md bg-semut-red px-4 py-2 text-sm font-medium text-white hover:bg-semut-red-dark transition-colors"
            >
              Daftar Anggota
            </Link>
            {/* Mobile menu button (TODO: Implement mobile menu) */}
            <button className="md:hidden p-2 text-gray-600 hover:text-semut-red">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
