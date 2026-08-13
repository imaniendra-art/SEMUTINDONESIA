import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legalitas & Dokumen Resmi | SEMUT INDONESIA",
  description: "Repositori dokumen legalitas dan surat keputusan Seniman Musik Dangdut Indonesia.",
};

export default async function LegalitasPage() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">Repositori Dokumen Legalitas</h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-300">
            Daftar dokumen resmi, Akta Notaris, dan Surat Keputusan (SK) SEMUT INDONESIA
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 hidden">
          {/* Sembunyikan bagian lama agar margin rapi */}
        </div>
        
        {documents.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-semut-gold/20 text-semut-gold mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Belum ada dokumen yang diunggah.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col hover:border-semut-gold/50 transition-colors shadow-sm">
                <div className="flex items-start gap-4 mb-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight mb-1 text-gray-900 dark:text-gray-100">{doc.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Diunggah pada {doc.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    {doc.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                        {doc.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <a 
                  href={doc.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-800 hover:bg-semut-gold hover:text-black text-gray-700 dark:text-gray-300 font-medium py-2.5 px-4 rounded-lg transition-colors mt-auto border border-gray-200 dark:border-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  Lihat / Unduh Dokumen
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
