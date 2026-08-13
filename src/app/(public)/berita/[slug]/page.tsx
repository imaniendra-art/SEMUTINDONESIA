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
      <div className="relative bg-black text-white overflow-hidden">
        {thumbUrl && (
          <div className="absolute inset-0">
            <Image src={thumbUrl} alt={post.title} fill className="object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          </div>
        )}
        <div className="relative container mx-auto px-6 md:px-8 py-16 md:py-24 max-w-3xl">
          <div className="flex items-center gap-2 mb-5">
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
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-4 break-words">
            {post.title}
          </h1>
          {(post as any).subtitle && (
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              {(post as any).subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Konten Artikel */}
      <div className="flex-1 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 md:px-8 py-12 max-w-3xl">
          <div
            className="
              prose prose-base md:prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-5
              prose-a:text-semut-red prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 dark:prose-strong:text-gray-100
              prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto prose-img:max-w-full prose-img:my-6
              prose-blockquote:border-l-4 prose-blockquote:border-semut-red prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-500
              prose-ul:pl-6 prose-ol:pl-6 prose-li:mb-1
              [&_p]:mb-5 [&_p]:leading-relaxed [&_p]:overflow-wrap-anywhere
              [&_*]:max-w-full [&_img]:max-w-full
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Divider */}
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
            {/* Penulis */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-semut-red/10 flex items-center justify-center text-semut-red font-bold text-lg shrink-0">
                {(post.author as any)?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {(post.author as any)?.name || "Admin"}
                </p>
                <p className="text-sm text-gray-500">{(post.author as any)?.dpp || "DPP PUSAT"}</p>
              </div>
            </div>

            {/* Tombol kembali */}
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 text-semut-red font-semibold hover:text-semut-red/80 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              Kembali ke Daftar Berita
            </Link>
          </div>
        </div>
      </div>

      {/* Berita Terkait */}
      {related.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16">
          <div className="container mx-auto px-6 md:px-8 max-w-3xl">
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
                      <h3 className="text-sm font-bold mt-1 line-clamp-2 group-hover:text-semut-red transition-colors leading-snug">
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
