import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // Fetch latest news (top 2 for hero, next 4 for bottom section)
  const allLatestPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

  const heroPosts = allLatestPosts.slice(0, 2);
  const sectionPosts = allLatestPosts.slice(2, 6);

  // Fetch upcoming events (top 3)
  const upcomingEvents = await prisma.event.findMany({
    where: { date: { gte: new Date() } },
    orderBy: { date: 'asc' },
    take: 3,
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Split Layout */}
      <section className="relative bg-black text-white pt-12 pb-16 md:pt-20 md:pb-16 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20 bg-[url('/logo-si.jpeg')] bg-cover bg-center bg-no-repeat blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-semut-red/30 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-semut-gold/20 rounded-full blur-[120px] translate-y-1/3 translate-x-1/3" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-semut-red/20 rounded-full blur-[100px] -translate-y-1/2" />
        
        <div className="container mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Welcome Speech */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-semut-red animate-pulse"></span>
              <span className="text-sm font-medium tracking-wide text-gray-300">Selamat Datang di Portal Resmi</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Seniman Musik <br className="hidden md:block" />
              Dangdut <span className="text-transparent bg-clip-text bg-gradient-to-r from-semut-red to-red-500">Indonesia</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
              Wadah silaturahmi, kreasi, dan pelestarian musik dangdut di tanah air. Bersama memajukan musisi dan seniman lokal ke kancah nasional.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                href="/pendaftaran" 
                className="bg-semut-red hover:bg-semut-red-dark text-white font-semibold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(204,0,0,0.3)] hover:shadow-[0_0_30px_rgba(204,0,0,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Gabung Sekarang
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
              <Link 
                href="/profil" 
                className="bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold py-4 px-8 rounded-xl backdrop-blur-sm transition-all flex items-center justify-center"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
          
          {/* Right Column: Latest News Glass Card */}
          <div className="lg:col-span-5 w-full mt-10 lg:mt-0 perspective-1000">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-semut-gold/20 to-transparent blur-3xl rounded-full"></div>
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-semut-red rounded-full"></span>
                  Berita Terhangat
                </h3>
                <Link href="/berita" className="text-sm font-medium text-semut-gold hover:text-white transition-colors flex items-center gap-1">
                  Semua
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </Link>
              </div>
              
              <div className="space-y-4 relative z-10">
                {heroPosts.length > 0 ? (
                  heroPosts.map((post) => (
                    <Link href={`/berita/${post.id}`} key={post.id} className="block group/item bg-black/40 hover:bg-black/60 p-4 rounded-xl transition-all border border-white/5 hover:border-white/20">
                      <div className="flex gap-4 items-center">
                        <div className="w-20 h-20 bg-gray-800 rounded-lg shrink-0 overflow-hidden relative border border-white/10">
                          {/* We don't have images in schema yet, so fallback */}
                           <div className="absolute inset-0 bg-gradient-to-br from-semut-red/40 to-semut-gold/40 flex items-center justify-center">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50"><path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 0-2.41-1.46L4.03 4.04"/></svg>
                           </div>
                        </div>
                        <div className="flex flex-col justify-center flex-1">
                          <span className="text-xs text-semut-gold mb-1.5 font-medium tracking-wide">
                            {post.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                          <h4 className="text-sm md:text-base font-semibold text-gray-200 group-hover/item:text-white transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center p-6 text-gray-400 bg-black/20 rounded-xl border border-white/5">
                    Belum ada berita dipublikasikan.
                  </div>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Visi Misi Section (Glimpse) */}
      <section className="pt-12 pb-16 px-4 bg-white dark:bg-gray-950 relative">
        <div className="container mx-auto max-w-4xl text-center">
          <Image 
            src="/logo-si.jpeg" 
            alt="Logo SEMUT INDONESIA" 
            width={160} 
            height={160} 
            className="rounded-full shadow-lg mx-auto mb-6 border-4 border-semut-gold" 
          />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Satu Semut, Seribu Saudara</h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            SEMUT INDONESIA (Seniman Musik Dangdut Indonesia) didirikan sebagai rumah besar bagi seluruh pelaku industri musik dangdut. Mulai dari penyanyi, musisi, pencipta lagu, hingga pekerja panggung. Kami berkomitmen untuk mengangkat harkat dan martabat musik dangdut sebagai warisan budaya bangsa.
          </p>
          <Link href="/profil" className="text-semut-red font-semibold hover:text-semut-red-dark transition-colors inline-flex items-center gap-2 group">
            Lihat Profil Lengkap
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      {/* Latest News & Events Section */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Berita (Takes up 2 columns on lg) */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">Berita & Informasi</h3>
                  <p className="text-gray-500">Kabar terbaru seputar kegiatan SEMUT INDONESIA</p>
                </div>
                <Link href="/berita" className="hidden sm:flex text-sm font-medium text-semut-red hover:underline items-center gap-1">
                  Lihat Semua Berita <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {sectionPosts.length > 0 ? sectionPosts.map((post) => (
                  <Link href={`/berita/${post.id}`} key={post.id} className="bg-white dark:bg-gray-950 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm group hover:shadow-md transition-all flex flex-col">
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-semut-red/20 to-semut-gold/20 flex items-center justify-center transition-transform group-hover:scale-105">
                         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                       </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-xs font-semibold text-semut-red mb-3">
                        {post.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <h4 className="text-xl font-bold mb-3 group-hover:text-semut-red transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                        {post.content}
                      </p>
                      <div className="text-sm font-medium text-semut-red flex items-center gap-1 mt-auto">
                        Baca selengkapnya <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </div>
                    </div>
                  </Link>
                )) : (
                  <div className="col-span-2 text-center p-12 bg-white dark:bg-gray-950 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-500">
                    Kumpulan berita akan segera hadir.
                  </div>
                )}
              </div>
              <Link href="/berita" className="sm:hidden mt-6 flex justify-center w-full py-3 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-medium text-foreground hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                Lihat Semua Berita
              </Link>
            </div>

            {/* Acara (Takes up 1 column on lg) */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-950 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm sticky top-24">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-semut-gold"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    Jadwal Acara
                  </h3>
                  <Link href="/acara" className="text-sm text-semut-gold hover:underline">Semua</Link>
                </div>
                
                <div className="space-y-6">
                  {upcomingEvents.length > 0 ? upcomingEvents.map((event) => (
                    <div key={event.id} className="flex gap-4 group cursor-default">
                      <div className="w-16 h-16 rounded-2xl bg-semut-gold/10 flex flex-col items-center justify-center shrink-0 text-semut-gold border border-semut-gold/20 shadow-sm transition-transform group-hover:scale-105">
                        <span className="text-xs font-bold uppercase tracking-wider">{event.date.toLocaleDateString('id-ID', { month: 'short' })}</span>
                        <span className="text-xl font-extrabold leading-none mt-1">{event.date.getDate()}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-bold mb-1 leading-tight group-hover:text-semut-gold transition-colors">{event.title}</h4>
                        <div className="flex flex-col gap-1 mt-2">
                          <p className="text-xs text-gray-500 flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            {event.time}
                          </p>
                          <p className="text-xs text-gray-500 flex items-start gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span className="line-clamp-2">{event.location}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-gray-500">
                      Belum ada jadwal acara mendatang.
                    </div>
                  )}
                </div>
                
                {upcomingEvents.length > 0 && (
                  <Link href="/acara" className="mt-8 block w-full py-3 rounded-xl bg-semut-gold/10 text-semut-gold text-center text-sm font-bold hover:bg-semut-gold hover:text-black transition-colors">
                    Lihat Kalender Penuh
                  </Link>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
