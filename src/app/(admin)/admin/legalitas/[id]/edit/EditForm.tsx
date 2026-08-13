"use client";

import { useActionState, useState } from "react";
import { updateDocument } from "../../actions";
import Link from "next/link";
import { Document } from "@prisma/client";

export default function EditForm({ document }: { document: Document }) {
  const updateDocumentWithId = updateDocument.bind(null, document.id);
  const [state, formAction, isPending] = useActionState(updateDocumentWithId, undefined);
  const [file, setFile] = useState<File | null>(null);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Nama Dokumen</label>
        <input 
          type="text" 
          name="title" 
          defaultValue={document.title}
          required 
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-semut-gold outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Deskripsi (Opsional)</label>
        <textarea 
          name="description" 
          defaultValue={document.description || ""}
          rows={3}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-semut-gold outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">File Dokumen Baru (Opsional)</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <div className="space-y-1 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
              <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-semut-gold hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-semut-gold">
                <span>Upload file</span>
                <input 
                  id="file-upload" 
                  name="file" 
                  type="file" 
                  className="sr-only" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
              <p className="pl-1">atau drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              Biarkan kosong jika tidak ingin mengubah file
            </p>
          </div>
        </div>
        {file ? (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            File baru: {file.name}
          </p>
        ) : (
          <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            File saat ini: <a href={document.fileUrl} target="_blank" rel="noopener noreferrer" className="text-semut-gold hover:underline">Lihat Dokumen</a>
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
        <Link 
          href="/admin/legalitas" 
          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
        >
          Batal
        </Link>
        <button 
          type="submit" 
          disabled={isPending}
          className="bg-semut-gold hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
