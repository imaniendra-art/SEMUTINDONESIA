"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Post {
  id: string;
  title: string;
  subtitle: string | null;
  image: string | null;
  content: string;
  slug: string;
  createdAt: Date;
}

function getThumbnail(content: string) {
  const match = content.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

interface NewsCarouselProps {
  posts: Post[];
}

export default function NewsCarousel({ posts }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (posts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [posts.length]);

  if (posts.length === 0) {
    return (
      <div className="w-full aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center p-8">
        <div className="w-20 h-20 mb-4 bg-semut-red/20 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-semut-red">
            <path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 0-2.41-1.46L4.03 4.04"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Belum Ada Berita</h3>
        <p className="text-gray-400 text-sm">Berita terbaru akan ditampilkan di sini.</p>
      </div>
    );
  }

  const currentPost = posts[currentIndex];

  return (
    <div className="w-full aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden relative shadow-2xl group border border-white/20">
      
      {/* Background Images - mapping all for preload & transition */}
      {posts.map((post, index) => (
        <div
          key={post.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {(post.image || getThumbnail(post.content)) ? (
            <Image
              src={post.image || getThumbnail(post.content)!}
              alt={post.title}
              fill
              className="object-cover"
              priority={index === 0} // preload the first image
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-semut-red/60 to-black flex items-center justify-center">
              <span className="text-white/20 font-bold text-4xl">SEMUT INDONESIA</span>
            </div>
          )}
          
          {/* Dark Overlay Gradient (Bottom up) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90" />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
        <Link href={`/berita/${currentPost.slug}`} className="block group/link">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-semut-red text-white text-xs font-bold uppercase tracking-wider mb-3">
            Berita Terbaru
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight group-hover/link:text-semut-gold transition-colors line-clamp-2">
            {currentPost.title}
          </h3>
          {currentPost.subtitle && (
            <p className="text-sm md:text-base text-gray-300 line-clamp-2 mb-4">
              {currentPost.subtitle}
            </p>
          )}
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <span>{new Date(currentPost.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </Link>
      </div>

      {/* Navigation Indicators */}
      {posts.length > 1 && (
        <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 z-30 flex gap-2">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-6 bg-semut-gold" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Read More Clickable Area (Overlay link for the whole box if they miss the text) */}
      <Link href={`/berita/${currentPost.slug}`} className="absolute inset-0 z-10 opacity-0 cursor-pointer" aria-label="Baca selengkapnya" />
    </div>
  );
}
