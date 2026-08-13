"use client";

import { useActionState, useState, useRef, useMemo } from "react";
import { updateBerita } from "../../actions";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false }) as any;

export default function EditBeritaForm({ post }: { post: any }) {
  const [content, setContent] = useState(post.content || "");
  const quillRef = useRef<any>(null);
  
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      if (!content || content === "<p><br></p>") {
        return { error: "Konten berita tidak boleh kosong" };
      }
      return await updateBerita(post.id, formData);
    },
    null
  );

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          
          if (data.url) {
            const quill = quillRef.current?.getEditor();
            const range = quill?.getSelection();
            if (quill && range) {
              quill.insertEmbed(range.index, "image", data.url);
            }
          } else {
            alert("Gagal mengunggah gambar");
          }
        } catch (e) {
          console.error("Upload failed", e);
          alert("Terjadi kesalahan saat mengunggah gambar");
        }
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Edit Berita</h1>
        <Link href="/admin/berita" className="text-gray-500 hover:text-gray-700">
          Kembali
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
              {state.error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="title">Judul Berita</label>
            <input 
              id="title"
              name="title"
              type="text" 
              defaultValue={post.title}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-semut-red outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="subtitle">Sub Judul (Opsional)</label>
            <input 
              id="subtitle"
              name="subtitle"
              type="text" 
              defaultValue={post.subtitle || ""}
              placeholder="Contoh: Perayaan meriah dengan ribuan penggemar..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-semut-red outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="image">Foto Sampul (Ganti Opsional)</label>
            {post.image && (
              <div className="mb-2 text-sm text-gray-500">
                Saat ini sudah ada gambar terunggah. Pilih file baru jika ingin menggantinya.
              </div>
            )}
            <input 
              id="image"
              name="image"
              type="file" 
              accept="image/*"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-semut-red outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-semut-red file:text-white hover:file:bg-semut-red-dark"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="content">Isi Konten</label>
            <input type="hidden" name="content" value={content} />
            <div className="bg-white dark:text-black rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-semut-red transition-all">
              <ReactQuill 
                ref={quillRef}
                theme="snow" 
                modules={modules}
                value={content} 
                onChange={setContent} 
                className="h-[300px] mb-12"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="published" 
              name="published" 
              defaultChecked={post.published}
              className="w-4 h-4 text-semut-red focus:ring-semut-red rounded border-gray-300"
            />
            <label htmlFor="published" className="text-sm font-medium">
              Terbitkan (Publish)
            </label>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-semut-red hover:bg-semut-red-dark text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
