import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteDocument } from "./actions";

export default async function KelolaLegalitasPage() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Kelola Dokumen Legalitas</h1>
          <p className="text-gray-500 text-sm mt-1">Daftar dokumen resmi dan legalitas organisasi</p>
        </div>
        <Link 
          href="/admin/legalitas/create" 
          className="bg-semut-gold hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Tambah Dokumen
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold w-16">No</th>
                <th className="px-6 py-4 font-semibold">Nama Dokumen</th>
                <th className="px-6 py-4 font-semibold">Tanggal Upload</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    Belum ada dokumen yang diunggah.
                  </td>
                </tr>
              ) : (
                documents.map((doc, index) => (
                  <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 text-gray-500 font-medium">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-gray-100">{doc.title}</div>
                          {doc.description && (
                            <div className="text-gray-500 text-xs mt-0.5 line-clamp-1">{doc.description}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {doc.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3 items-center">
                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 font-medium text-xs">
                          Lihat
                        </a>
                        <Link href={`/admin/legalitas/${doc.id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium text-xs">
                          Edit
                        </Link>
                        <form action={async () => {
                          "use server";
                          await deleteDocument(doc.id);
                        }}>
                          <button type="submit" className="text-red-600 hover:text-red-800 font-medium text-xs">Hapus</button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
