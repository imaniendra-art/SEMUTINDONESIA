"use client";

import { useActionState, useState, useRef, useMemo } from "react";
import { updateAcara } from "../../actions";
import Link from "next/link";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false }) as any;

export default function EditForm({ event }: { event: any }) {
  const [description, setDescription] = useState(event.description || "");
  const quillRef = useRef<any>(null);
  
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      if (!description || description === "<p><br></p>") {
        return { error: "Deskripsi acara tidak boleh kosong" };
      }
      return await updateAcara(event.id, formData);
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

  // Format date for datetime-local input
  const dateObj = new Date(event.date);
  // Subtract timezone offset to get local time string in correct format
  dateObj.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset());
  const defaultDate = dateObj.toISOString().slice(0, 16);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Edit Acara</h1>
        <Link href="/admin/acara" className="text-gray-500 hover:text-gray-700">
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
            <label className="block text-sm font-medium mb-2" htmlFor="title">Nama Acara</label>
            <input 
              id="title"
              name="title"
              type="text" 
              defaultValue={event.title}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-semut-gold outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="image">
              Foto Sampul (Cover) 
              <span className="text-gray-500 text-xs ml-2 font-normal">(Kosongkan jika tidak ingin mengubah)</span>
            </label>
            <input 
              id="image"
              name="image"
              type="file" 
              accept="image/*"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-semut-gold outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-semut-gold file:text-black hover:file:bg-semut-gold-dark"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="description">Deskripsi</label>
            <input type="hidden" name="description" value={description} />
            <div className="bg-white dark:text-black rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-semut-gold transition-all">
              <ReactQuill 
                ref={quillRef}
                theme="snow" 
                modules={modules}
                value={description} 
                onChange={setDescription} 
                className="h-[300px] mb-12"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="date">Tanggal & Waktu</label>
              <input 
                id="date"
                name="date"
                type="datetime-local" 
                defaultValue={defaultDate}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-semut-gold outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="location">Lokasi</label>
              <input 
                id="location"
                name="location"
                type="text" 
                defaultValue={event.location}
                required
                placeholder="Misal: Alun-Alun Sidoarjo"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-semut-gold outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-semut-gold hover:bg-semut-gold-dark text-black font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
