import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteBerita } from "./actions";

export default async function AdminBeritaPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Kelola Berita</h1>
        <Link 
          href="/admin/berita/create" 
          className="bg-semut-red hover:bg-semut-red-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Tambah Berita
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 font-medium w-16">No</th>
                <th className="px-6 py-4 font-medium">Judul</th>
                <th className="px-6 py-4 font-medium">Penulis / DPP</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Belum ada berita.
                  </td>
                </tr>
              ) : (
                posts.map((post, index) => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 text-gray-500 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{post.title}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{post.author?.name || 'Admin'}</div>
                      <div className="text-xs text-gray-500">{post.author?.dpp || 'DPP PUSAT'}</div>
                    </td>
                    <td className="px-6 py-4">
                      {post.published ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">Published</span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs font-medium">Draft</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-3 items-center">
                      <Link href={`/admin/berita/${post.id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium">
                        Edit
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteBerita(post.id);
                      }}>
                        <button type="submit" className="text-red-600 hover:text-red-800 font-medium">Hapus</button>
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
