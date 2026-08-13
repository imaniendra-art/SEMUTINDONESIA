import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteAcara } from "./actions";

export default async function AdminAcaraPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'desc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Kelola Acara</h1>
        <Link 
          href="/admin/acara/create" 
          className="bg-semut-gold hover:bg-semut-gold-dark text-black px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Tambah Acara
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 font-medium">Nama Acara</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium">Lokasi</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Belum ada acara.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{event.title}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(event.date).toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{event.location}</td>
                    <td className="px-6 py-4 text-right flex justify-end gap-3">
                      <form action={async () => {
                        "use server";
                        await deleteAcara(event.id);
                      }}>
                        <button type="submit" className="text-red-600 hover:text-red-800">Hapus</button>
                      </form>
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
