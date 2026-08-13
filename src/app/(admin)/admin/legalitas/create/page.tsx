import Link from "next/link";
import CreateForm from "./CreateForm";

export default function CreateLegalitasPage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/legalitas" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Tambah Dokumen Legalitas</h1>
          <p className="text-gray-500 text-sm mt-1">Unggah dokumen resmi baru</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8 max-w-2xl">
        <CreateForm />
      </div>
    </div>
  );
}
