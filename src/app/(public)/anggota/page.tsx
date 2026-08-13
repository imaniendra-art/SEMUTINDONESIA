export default function AnggotaPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Header */}
      <div className="bg-semut-red text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">Anggota SEMUT INDONESIA</h1>
          <p className="text-lg max-w-2xl mx-auto text-semut-red-100">
            Direktori resmi seniman dan musisi yang tergabung dalam keluarga besar SEMUT INDONESIA
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex-1">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 md:p-12">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Halaman direktori anggota sedang dalam tahap pengembangan.
          </p>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-semut-red/10 text-semut-red mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <p className="text-gray-500">
            Segera hadir: Direktori resmi seniman dan musisi yang tergabung dalam SEMUT INDONESIA.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
