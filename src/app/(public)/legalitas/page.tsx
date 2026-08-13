export default function LegalitasPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Legalitas Organisasi</h1>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 md:p-12">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Halaman informasi legalitas SEMUT INDONESIA sedang dalam tahap penyusunan.
          </p>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-semut-gold/20 text-semut-gold mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <p className="text-gray-500">
            Segera hadir: Dokumen resmi pendirian, pengesahan Kemenkumham, dan legalitas lainnya.
          </p>
        </div>
      </div>
    </div>
  );
}
