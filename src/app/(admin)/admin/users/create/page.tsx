import { createAdmin } from "../actions";
import Link from "next/link";
import { cookies } from "next/headers";
import * as jose from "jose";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

async function checkSuperAdmin() {
  const session = await getSession();
  if (!session) return false;
  return session.role === 'SUPERADMIN';
}

export default async function AdminUserCreatePage() {
  const isSuper = await checkSuperAdmin();
  if (!isSuper) {
    redirect("/admin/berita");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/users" className="text-semut-red hover:underline text-sm font-medium mb-2 inline-block">
          &larr; Kembali ke Daftar Admin
        </Link>
        <h1 className="text-2xl font-bold">Tambah Akun Admin</h1>
        <p className="text-gray-500 text-sm mt-1">Buat akses admin baru untuk perwakilan DPP/Daerah</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <form action={createAdmin} className="space-y-6">
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                name="name" 
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
                placeholder="admin@dpdsulbar.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="Minimal 6 karakter"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tingkat Akses (Role)</label>
            <select name="role" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent" required>
              <option value="ADMIN">Admin Daerah (Hanya bisa kelola berita sendiri)</option>
              <option value="SUPERADMIN">Super Admin (Bisa tambah akun admin lain)</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              className="bg-semut-red hover:bg-semut-red-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Simpan Akun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
