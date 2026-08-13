import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami | SEMUT INDONESIA",
  description: "Kontak dan alamat pengurus pusat Seniman Musik Dangdut Indonesia.",
};

export default function KontakPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">Hubungi Kami</h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-300">
            Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex-1">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Kontak Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold border-l-4 border-semut-red pl-3 mb-6">Informasi Kontak</h2>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-semut-red/10 text-semut-red rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">WhatsApp / Telepon</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Bpk. Muh. Yusuf (Ketua Umum)</p>
                <a href="https://wa.me/6285399717199" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-500 font-medium hover:underline">
                  +62 853-9971-7199
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-semut-gold/10 text-semut-gold rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Untuk kerjasama dan pertanyaan umum</p>
                <a href="mailto:info@semutindonesia.com" className="text-semut-red font-medium hover:underline">
                  info@semutindonesia.com
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Sekretariat Pusat</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Gedung Kesenian Jakarta,<br />
                  Jl. Kesenian No. 1, Jakarta Pusat,<br />
                  DKI Jakarta 10710
                </p>
              </div>
            </div>
          </div>

          {/* Map/Form Placeholder */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 flex flex-col justify-center text-center">
            <div className="mb-6 mx-auto w-16 h-16 bg-white dark:bg-black rounded-full flex items-center justify-center text-gray-400 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M12 2v20"/><path d="m4.9 4.9 14.2 14.2"/><path d="m4.9 19.1 14.2-14.2"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Mari Berjejaring</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Organisasi kami sangat terbuka untuk bekerja sama dengan berbagai pihak, baik musisi, promotor, label rekaman, maupun pemerintah daerah untuk memajukan industri dangdut.
            </p>
            <p className="text-sm font-medium text-semut-red">
              Silakan hubungi kontak WhatsApp di samping untuk respons cepat.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
