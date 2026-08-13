import { prisma } from "@/lib/prisma";
import EditForm from "./EditForm";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function EditAdminPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== 'SUPERADMIN') {
    redirect("/admin/berita");
  }

  const { id } = await params;
  
  const adminUser = await prisma.admin.findUnique({
    where: { id }
  });

  if (!adminUser) return notFound();

  return <EditForm admin={adminUser} />;
}
