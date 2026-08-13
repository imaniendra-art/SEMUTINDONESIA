import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import EditForm from "./EditForm";

export default async function EditLegalitasPage({ params }: { params: { id: string } }) {
  const document = await prisma.document.findUnique({
    where: { id: params.id }
  });

  if (!document) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/legalitas" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Edit Dokumen Legalitas</h1>
          <p className="text-gray-500 text-sm mt-1">Perbarui informasi atau file dokumen</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8 max-w-2xl">
        <EditForm document={document} />
      </div>
    </div>
  );
}
