"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { writeFileSync } from "fs";
import path from "path";

export async function createAcara(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dateStr = formData.get("date") as string;
  const location = formData.get("location") as string;
  const imageFile = formData.get("image") as File | null;
  
  if (!title || !description || !dateStr || !location) {
    return { error: "Semua kolom harus diisi" };
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  let imageUrl = null;
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate unique filename
    const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, filename);
    
    writeFileSync(filePath, buffer);
    imageUrl = `/uploads/${filename}`;
  }

  await prisma.event.create({
    data: {
      title,
      slug: `${slug}-${Date.now()}`,
      description,
      image: imageUrl,
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
