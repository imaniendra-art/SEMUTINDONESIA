"use client";

import { useActionState } from "react";
import { createAcara } from "../actions";
import Link from "next/link";

export default function CreateAcaraPage() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await createAcara(formData);
    },
    null
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Tambah Acara</h1>
        <Link href="/admin/acara" className="text-gray-500 hover:text-gray-700">
          Kembali
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
              {state.error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="title">Nama Acara</label>
            <input 
              id="title"
              name="title"
              type="text" 
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-semut-gold outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="description">Deskripsi</label>
            <textarea 
              id="description"
              name="description"
              rows={4}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-semut-gold outline-none transition-all"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="date">Tanggal & Waktu</label>
              <input 
                id="date"
                name="date"
                type="datetime-local" 
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-semut-gold outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="location">Lokasi</label>
              <input 
                id="location"
                name="location"
                type="text" 
                required
                placeholder="Misal: Alun-Alun Sidoarjo"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-semut-gold outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-semut-gold hover:bg-semut-gold-dark text-black font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {isPending ? "Menyimpan..." : "Simpan Acara"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
