import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Berita Terbaru | SEMUT INDONESIA",
  description: "Kumpulan berita dan informasi terbaru seputar Seniman Musik Dangdut Indonesia.",
};

export default async function BeritaPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Header */}
      <div className="bg-semut-red text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">Berita Terbaru</h1>
          <p className="text-lg max-w-2xl mx-auto text-semut-red-100">
            Kumpulan berita dan informasi terbaru seputar Seniman Musik Dangdut Indonesia
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex-1">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Belum ada berita yang diterbitkan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-950 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col group hover:shadow-md transition-all">
                <div className="h-48 bg-gray-200 dark:bg-gray-800 relative">
                  {post.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-semut-red/20 to-semut-gold/20 flex items-center justify-center text-gray-400 font-medium">
                      SEMUT INDONESIA
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-semut-red font-medium mb-2">
                    {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-semut-red transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Link href={`/berita/${post.slug}`} className="text-sm font-semibold text-semut-gold hover:text-semut-gold-dark flex items-center gap-1">
                      Baca Selengkapnya
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
