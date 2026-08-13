"use client";

import { useActionState } from "react";
import { updateAdmin } from "../../actions";
import Link from "next/link";

export default function EditForm({ admin }: { admin: any }) {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await updateAdmin(admin.id, formData);
    },
    null
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/users" className="text-semut-red hover:underline text-sm font-medium mb-2 inline-block">
          &larr; Kembali ke Daftar Admin
        </Link>
        <h1 className="text-2xl font-bold">Edit Akun Admin</h1>
        <p className="text-gray-500 text-sm mt-1">Perbarui data admin</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
              {state.error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                name="name" 
                defaultValue={admin.name || ""}
                placeholder="Misal: Budi Santoso"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Asal Cabang / DPP</label>
              <input 
                type="text" 
                name="dpp" 
                defaultValue={admin.dpp}
                placeholder="Misal: DPD SULBAR"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email Login</label>
              <input 
                type="email" 
                name="email" 
                defaultValue={admin.email}
                placeholder="admin@dpdsulbar.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nomor HP (WhatsApp)</label>
              <input 
                type="text" 
                name="phone" 
                defaultValue={admin.phone || ""}
                placeholder="Misal: 08123456789"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Tingkat Akses (Role)</label>
              <select 
                name="role" 
                defaultValue={admin.role}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent" 
                required
              >
                <option value="ADMIN">Admin Daerah (Hanya bisa kelola berita sendiri)</option>
                <option value="SUPERADMIN">Super Admin (Bisa tambah akun admin lain)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Password Baru 
                <span className="text-gray-500 text-xs ml-2 font-normal">(Kosongkan jika tidak diubah)</span>
              </label>
              <input 
                type="password" 
                name="password" 
                placeholder="Minimal 6 karakter"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-semut-red hover:bg-semut-red-dark text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
