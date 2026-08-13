import { prisma } from "@/lib/prisma";
import SettingsForm from "./SettingsForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminHalamanPage() {
  const session = await getSession();
  if (!session || session.role !== 'SUPERADMIN') {
    redirect("/admin/berita");
  }

  const settingsRaw = await prisma.setting.findMany();
  const settings = settingsRaw.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Kelola Halaman</h1>
        <p className="text-gray-500 text-sm mt-1">Ubah konten teks pada halaman-halaman utama (Homepage, Profil, dll)</p>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
