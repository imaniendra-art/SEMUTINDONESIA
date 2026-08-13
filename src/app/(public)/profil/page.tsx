import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil Organisasi | SEMUT INDONESIA",
  description: "Sejarah, Visi, Misi, dan Susunan Pengurus Seniman Musik Dangdut Indonesia (SEMUT).",
};

export default function ProfilPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Header */}
      <div className="bg-semut-red text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">Profil Organisasi</h1>
          <p className="text-lg max-w-2xl mx-auto text-semut-red-100">
            Mengenal lebih dekat Seniman Musik Dangdut Indonesia (SEMUT)
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="bg-semut-red text-white p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </span>
                Sejarah Singkat
              </h2>
              <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p>
                  SEMUT INDONESIA didirikan atas dasar kepedulian terhadap kelestarian dan perkembangan musik dangdut di tanah air. Berawal dari perkumpulan kecil seniman di daerah, kini telah berkembang menjadi organisasi berskala nasional.
                </p>
                <p>
                  Tujuan utama kami adalah memberikan perlindungan hak cipta, wadah kreativitas, serta advokasi bagi para musisi, penyanyi, dan pekerja seni dangdut yang sering kali kurang mendapatkan perhatian yang layak.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="bg-semut-gold text-white p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </span>
                Visi & Misi
              </h2>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-semut-red">Visi</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-8 italic">
                  "Menjadi organisasi profesional yang menaungi, melindungi, dan menyejahterakan seniman musik dangdut Indonesia serta menjadikan musik dangdut sebagai tuan rumah di negeri sendiri."
                </p>

                <h3 className="text-xl font-bold mb-4 text-semut-gold">Misi</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300 list-disc list-inside">
                  <li>Membangun solidaritas dan kerukunan antar seniman musik dangdut.</li>
                  <li>Memperjuangkan hak-hak profesional dan hak cipta karya seniman.</li>
                  <li>Meningkatkan kualitas SDM melalui pelatihan dan sertifikasi profesi.</li>
                  <li>Menyelenggarakan event dan festival berskala nasional maupun internasional.</li>
                  <li>Menjalin kemitraan dengan pemerintah dan pemangku kepentingan industri musik.</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold mb-6 border-b pb-4">Susunan Pengurus Pusat</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Bpk. Muh. Yusuf</h4>
                    <p className="text-sm text-semut-red">Ketua Umum</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Bpk. Ahmad Sujatmiko</h4>
                    <p className="text-sm text-gray-500">Sekretaris Jenderal</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Ibu Siti Aminah</h4>
                    <p className="text-sm text-gray-500">Bendahara</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
