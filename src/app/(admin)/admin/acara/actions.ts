"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export async function createAcara(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dateStr = formData.get("date") as string;
  const location = formData.get("location") as string;
  
  if (!title || !description || !dateStr || !location) {
    return { error: "Semua kolom harus diisi" };
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  await prisma.event.create({
    data: {
      title,
      slug: `${slug}-${Date.now()}`,
      description,
      date: new Date(dateStr),
      location,
    }
  });

  revalidatePath("/admin/acara");
  revalidatePath("/acara");
  redirect("/admin/acara");
}

export async function deleteAcara(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/acara");
  revalidatePath("/acara");
}
