import { prisma } from "@/lib/prisma";
import EditForm from "./EditForm";
import { notFound } from "next/navigation";

export default async function EditAcaraPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const event = await prisma.event.findUnique({
    where: { id }
  });

  if (!event) return notFound();

  return <EditForm event={event} />;
}
