import { prisma } from "@/lib/prisma";
import EditBeritaForm from "./EditForm";
import { notFound } from "next/navigation";

export default async function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id }
  });

  if (!post) {
    notFound();
  }

  return <EditBeritaForm post={post} />;
}
