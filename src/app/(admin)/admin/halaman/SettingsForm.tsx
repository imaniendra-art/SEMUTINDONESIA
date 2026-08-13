"use client";

import { useActionState, useState, useRef, useMemo } from "react";
import { saveSettings } from "./actions";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type Tab = 'homepage' | 'profil' | 'kontak' | 'anggota' | 'pengurus' | 'media';

interface PengurusMember {
  name: string;
  role: string;
}

interface PengurusStructure {
  id: string;
  title: string;
  members: PengurusMember[];
}export default function SettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [activeTab, setActiveTab] = useState<Tab>('homepage');
  const [successMsg, setSuccessMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState(initialSettings.logo_url || "");

  // States for Rich Text
  const [profilSejarah, setProfilSejarah] = useState(initialSettings.profil_sejarah || "");
  const [profilVisiMisi, setProfilVisiMisi] = useState(initialSettings.profil_visi_misi || "");

  // States for Dynamic Structures
  const [pengurus, setPengurus] = useState<PengurusStructure[]>(
    initialSettings.profil_pengurus ? JSON.parse(initialSettings.profil_pengurus) : [
      {
        id: "pusat",
        title: "Susunan Pengurus Pusat",
        members: [
          { name: "Bpk. Muh. Yusuf", role: "Ketua Umum" },
          { name: "Bpk. Ahmad Sujatmiko", role: "Sekretaris Jenderal" },
          { name: "Ibu Siti Aminah", role: "Bendahara" }
        ]
      }
    ]
  );

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      // Append rich text state before submitting
      formData.set("profil_sejarah", profilSejarah);
      formData.set("profil_visi_misi", profilVisiMisi);
      formData.set("profil_pengurus", JSON.stringify(pengurus));
      formData.set("logo_url", logoUrl);
      
      const res = await saveSettings(formData);
      if (res?.success) {
        setSuccessMsg("Pengaturan berhasil disimpan!");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
      return res;
    },
    null
  );

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  }), []);

  const tabs: { id: Tab, label: string }[] = [
    { id: 'homepage', label: 'Homepage' },
    { id: 'media', label: 'Media & Logo' },
    { id: 'profil', label: 'Profil Organisasi' },
    { id: 'pengurus', label: 'Pengurus' },
    { id: 'kontak', label: 'Kontak' },
    { id: 'anggota', label: 'Pendaftaran' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Tabs Header */}
      <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? "border-b-2 border-semut-red text-semut-red" 
                : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form action={formAction} className="p-6 md:p-8">
        
        {/* HOMEPAGE */}
        <div className={activeTab === 'homepage' ? 'block space-y-6' : 'hidden'}>
          <h2 className="text-xl font-bold mb-4 text-semut-gold">Bagian Hero (Atas)</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Teks Welcome / Badge</label>
            <input 
              type="text" 
              name="hero_welcome" 
              defaultValue={initialSettings.hero_welcome || "Selamat Datang di Portal Resmi"}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Judul Utama (Baris 1)</label>
            <input 
              type="text" 
              name="hero_title_1" 
              defaultValue={initialSettings.hero_title_1 || "Seniman Musik"}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Judul Utama (Baris 2)</label>
            <input 
              type="text" 
              name="hero_title_2" 
              defaultValue={initialSettings.hero_title_2 || "Dangdut"}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Kata Kunci (Highlight Merah)</label>
            <input 
              type="text" 
              name="hero_title_highlight" 
              defaultValue={initialSettings.hero_title_highlight || "Indonesia"}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Deskripsi Hero</label>
            <textarea 
              name="hero_description" 
              rows={3}
              defaultValue={initialSettings.hero_description || "Wadah silaturahmi, kreasi, dan pelestarian musik dangdut di tanah air. Bersama memajukan musisi dan seniman lokal ke kancah nasional."}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4 border-t pt-8 text-semut-gold">Bagian Visi Singkat</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Judul Visi Singkat</label>
            <input 
              type="text" 
              name="home_visi_title" 
              defaultValue={initialSettings.home_visi_title || "Satu Semut, Seribu Saudara"}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Teks Visi Singkat</label>
            <textarea 
              name="home_visi_text" 
              rows={4}
              defaultValue={initialSettings.home_visi_text || "SEMUT INDONESIA (Seniman Musik Dangdut Indonesia) didirikan sebagai rumah besar bagi seluruh pelaku industri musik dangdut. Mulai dari penyanyi, musisi, pencipta lagu, hingga pekerja panggung. Kami berkomitmen untuk mengangkat harkat dan martabat musik dangdut sebagai warisan budaya bangsa."}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>
        </div>

        {/* MEDIA & LOGO */}
        <div className={activeTab === 'media' ? 'block space-y-6' : 'hidden'}>
          <div>
            <label className="block text-sm font-medium mb-2">Logo Organisasi</label>
            <div className="flex items-center gap-4">
              {logoUrl && <img src={logoUrl} alt="Logo" className="w-20 h-20 object-contain bg-white rounded-lg border border-gray-200 dark:border-gray-700" />}
              <div className="flex-1">
                <input type="hidden" name="logo_url" value={logoUrl} />
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    const fd = new FormData();
                    fd.append("file", file);
                    try {
                      const res = await fetch("/api/upload", { method: "POST", body: fd });
                      const data = await res.json();
                      if (data.url) setLogoUrl(data.url);
                    } catch (err) {
                      console.error(err);
                    }
                    setUploading(false);
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-semut-gold file:text-black hover:file:bg-semut-gold-dark cursor-pointer transition-colors"
                />
                {uploading && <span className="text-xs text-semut-red mt-2 block font-medium animate-pulse">Mengunggah file...</span>}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Video YouTube (Link/URL)</label>
            <input 
              type="text" 
              name="youtube_url" 
              defaultValue={initialSettings.youtube_url || ""}
              placeholder="Contoh: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>
        </div>

        {/* PROFIL */}
        <div className={activeTab === 'profil' ? 'block space-y-6' : 'hidden'}>
          <div>
            <label className="block text-sm font-medium mb-2">Sejarah Singkat</label>
            <div className="bg-white dark:text-black rounded-lg border border-gray-300 dark:border-gray-700">
              <ReactQuill theme="snow" modules={modules} value={profilSejarah} onChange={setProfilSejarah} className="h-64 mb-12" />
            </div>
          </div>
          <div className="pt-8">
            <label className="block text-sm font-medium mb-2">Visi & Misi</label>
            <div className="bg-white dark:text-black rounded-lg border border-gray-300 dark:border-gray-700">
              <ReactQuill theme="snow" modules={modules} value={profilVisiMisi} onChange={setProfilVisiMisi} className="h-64 mb-12" />
            </div>
          </div>
        </div>

        {/* LEGALITAS REMOVED */}

        {/* KONTAK */}
        <div className={activeTab === 'kontak' ? 'block space-y-6' : 'hidden'}>
          <div>
            <label className="block text-sm font-medium mb-2">Alamat Kantor</label>
            <textarea 
              name="kontak_alamat" 
              rows={3}
              defaultValue={initialSettings.kontak_alamat || "Perumahan Puri Indah, Blok A No. 12\nSidoarjo, Jawa Timur 61211"}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Alamat Email</label>
            <input 
              type="text" 
              name="kontak_email" 
              defaultValue={initialSettings.kontak_email || "info@semutindonesia.com"}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Nomor Telepon / WhatsApp</label>
            <input 
              type="text" 
              name="kontak_telepon" 
              defaultValue={initialSettings.kontak_telepon || "+62 812-3456-7890"}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Instagram (URL)</label>
            <input 
              type="text" 
              name="kontak_instagram" 
              defaultValue={initialSettings.kontak_instagram || "https://instagram.com/semut_indonesia"}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Facebook (URL)</label>
            <input 
              type="text" 
              name="kontak_facebook" 
              defaultValue={initialSettings.kontak_facebook || "https://facebook.com/semut.indonesia"}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>
        </div>

        {/* ANGGOTA */}
        <div className={activeTab === 'anggota' ? 'block space-y-6' : 'hidden'}>
          <div>
            <label className="block text-sm font-medium mb-2">Teks Pengantar Pendaftaran</label>
            <textarea 
              name="anggota_pengantar" 
              rows={4}
              defaultValue={initialSettings.anggota_pengantar || "Mari bergabung bersama keluarga besar SEMUT INDONESIA. Jadilah bagian dari pergerakan untuk memajukan musik dangdut nasional."}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>
        </div>

        {/* PENGURUS */}
        <div className={activeTab === 'pengurus' ? 'block space-y-6' : 'hidden'}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-semut-gold">Struktur Pengurus</h2>
            <button 
              type="button" 
              onClick={() => setPengurus([...pengurus, { id: Date.now().toString(), title: "", members: [] }])}
              className="bg-semut-red hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              + Tambah Struktur
            </button>
          </div>
          
          {pengurus.map((struct, structIdx) => (
            <div key={struct.id} className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 rounded-xl p-6 mb-6 relative">
              <button 
                type="button"
                onClick={() => setPengurus(pengurus.filter((_, i) => i !== structIdx))}
                className="absolute top-6 right-6 text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
              >
                Hapus Struktur
              </button>
              <label className="block text-sm font-medium mb-2">Nama Struktur (Contoh: Pengurus Pusat / DPD Sidrap)</label>
              <input 
                type="text"
                placeholder="Susunan Pengurus..."
                value={struct.title}
                onChange={(e) => {
                  const newP = [...pengurus];
                  newP[structIdx].title = e.target.value;
                  setPengurus(newP);
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 mb-6"
              />
              
              <h3 className="font-bold mb-3">Daftar Anggota</h3>
              <div className="space-y-3 mb-4">
                {struct.members.map((member, memberIdx) => (
                  <div key={memberIdx} className="flex gap-4 items-center">
                    <input 
                      type="text"
                      placeholder="Nama Lengkap"
                      value={member.name}
                      onChange={(e) => {
                        const newP = [...pengurus];
                        newP[structIdx].members[memberIdx].name = e.target.value;
                        setPengurus(newP);
                      }}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                    />
                    <input 
                      type="text"
                      placeholder="Jabatan"
                      value={member.role}
                      onChange={(e) => {
                        const newP = [...pengurus];
                        newP[structIdx].members[memberIdx].role = e.target.value;
                        setPengurus(newP);
                      }}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        const newP = [...pengurus];
                        newP[structIdx].members.splice(memberIdx, 1);
                        setPengurus(newP);
                      }}
                      className="text-red-500 hover:text-red-700 p-2 bg-red-50 dark:bg-red-950 rounded-lg"
                      title="Hapus Anggota"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                onClick={() => {
                  const newP = [...pengurus];
                  newP[structIdx].members.push({ name: "", role: "" });
                  setPengurus(newP);
                }}
                className="text-semut-gold hover:text-semut-gold-dark font-medium text-sm flex items-center gap-1 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Tambah Anggota
              </button>
            </div>
          ))}
          {pengurus.length === 0 && (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500">
              Belum ada struktur pengurus. Silakan klik "Tambah Struktur".
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex items-center justify-end gap-4 mt-8">
          {successMsg && (
            <span className="text-green-600 font-medium text-sm animate-pulse">{successMsg}</span>
          )}
          <button 
            type="submit" 
            disabled={isPending}
            className="bg-semut-gold hover:bg-semut-gold-dark text-black font-bold py-2 px-8 rounded-lg transition-colors disabled:opacity-50"
          >
            {isPending ? "Menyimpan..." : "Simpan Pengaturan"}
          </button>
        </div>
      </form>
    </div>
  );
}
