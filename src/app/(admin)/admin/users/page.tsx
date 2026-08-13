import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteAdmin } from "./actions";
import { cookies } from "next/headers";
import * as jose from "jose";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

async function checkSuperAdmin() {
  const session = await getSession();
  if (!session) return false;
  return session.role === 'SUPERADMIN';
}

export default async function AdminUsersPage() {
  const isSuper = await checkSuperAdmin();
  if (!isSuper) {
    redirect("/admin/berita"); // Redirect if not superadmin
  }

  const admins = await prisma.admin.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola akun akses berdasarkan DPP/Daerah</p>
        </div>
        <Link 
          href="/admin/users/create" 
          className="bg-semut-red hover:bg-semut-red-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Tambah Akun
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 font-medium">Nama / Email</th>
                <th className="px-6 py-4 font-medium">DPP / Cabang</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {admins.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Belum ada data admin.
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{admin.name || 'Tanpa Nama'}</div>
                      <div className="text-gray-500 text-xs">{admin.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-semut-red/10 text-semut-red rounded-md text-xs font-bold uppercase tracking-wider">
                        {admin.dpp}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {admin.role === 'SUPERADMIN' ? (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">Super Admin</span>
                      ) : (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">Admin Daerah</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-3 items-center">
                      {admin.role !== 'SUPERADMIN' && (
                        <form action={async () => {
                          "use server";
                          await deleteAdmin(admin.id);
                        }}>
                          <button type="submit" className="text-red-600 hover:text-red-800 font-medium text-xs">Hapus</button>
                        </form>
                      )}
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
