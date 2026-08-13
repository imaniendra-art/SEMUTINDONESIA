import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return { title: "Berita tidak ditemukan" };
  return {
    title: `${post.title} | SEMUT INDONESIA`,
    description: post.content.replace(/<[^>]*>/gm, "").slice(0, 160),
  };
}

function getThumbnail(content: string) {
  const match = content.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!post || !post.published) notFound();

  // Fetch 3 berita terkait (selain berita ini)
  const related = await prisma.post.findMany({
    where: { published: true, NOT: { id: post.id } },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { author: true },
  });

  const thumbUrl = post.image || getThumbnail(post.content);

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero */}
      <div className="relative bg-black text-white">
        {thumbUrl && (
          <div className="absolute inset-0">
            <Image src={thumbUrl} alt={post.title} fill className="object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          </div>
        )}
        <div className="relative container mx-auto px-4 py-20 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-bold bg-semut-red text-white uppercase tracking-wider">
              {(post.author as any)?.dpp || "DPP PUSAT"}
            </span>
            <span className="text-sm text-gray-300">
              {new Date(post.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            {post.title}
          </h1>
          {(post as any).subtitle && (
            <p className="text-lg text-gray-300">{(post as any).subtitle}</p>
          )}
        </div>
      </div>

      {/* Konten */}
      <div className="container mx-auto px-4 py-12 max-w-4xl flex-1">
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            [&_img]:rounded-xl [&_img]:shadow-md [&_img]:mx-auto [&_img]:max-w-full
            [&_p]:mb-4 [&_p]:leading-relaxed
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
            [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-semut-red
            [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Penulis */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-semut-red/10 flex items-center justify-center text-semut-red font-bold text-lg shrink-0">
            {(post.author as any)?.name?.charAt(0) || "A"}
          </div>
          <div>
            <p className="font-semibold">{(post.author as any)?.name || "Admin"}</p>
            <p className="text-sm text-gray-500">{(post.author as any)?.dpp || "DPP PUSAT"}</p>
          </div>
        </div>

        {/* Tombol kembali */}
        <div className="mt-8">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-semut-red font-semibold hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            Kembali ke Berita
          </Link>
        </div>
      </div>

      {/* Berita Terkait */}
      {related.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-8">Berita Lainnya</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((rel: any) => {
                const relThumb = rel.image || getThumbnail(rel.content);
                return (
                  <Link
                    key={rel.id}
                    href={`/berita/${rel.slug}`}
                    className="bg-white dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm group hover:shadow-md transition-all"
                  >
                    <div className="h-40 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                      {relThumb ? (
                        <Image src={relThumb} alt={rel.title} fill className="object-cover transition-transform group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-semut-red/20 to-semut-gold/20" />
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-bold text-semut-red uppercase tracking-wider">
                        {rel.author?.dpp || "DPP PUSAT"}
                      </span>
                      <h3 className="text-sm font-bold mt-1 line-clamp-2 group-hover:text-semut-red transition-colors">
                        {rel.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
