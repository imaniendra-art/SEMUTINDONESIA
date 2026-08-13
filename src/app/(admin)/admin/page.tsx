import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const postsCount = await prisma.post.count();
  const eventsCount = await prisma.event.count();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Admin</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="text-gray-500 text-sm font-medium mb-2">Total Berita</div>
          <div className="text-3xl font-bold text-semut-red">{postsCount}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="text-gray-500 text-sm font-medium mb-2">Total Acara</div>
          <div className="text-3xl font-bold text-semut-gold">{eventsCount}</div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Selamat Datang di Portal Admin SEMUT INDONESIA</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Gunakan menu di sebelah kiri untuk mengelola Berita dan Jadwal Acara. Sistem ini dibuat sederhana agar pengurus dapat memperbarui informasi dengan cepat dan mudah.
        </p>
      </div>
    </div>
  );
}
