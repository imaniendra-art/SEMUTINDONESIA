"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { writeFileSync } from "fs";
import path from "path";

export async function createBerita(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";
  const imageFile = formData.get("image") as File | null;
  
  const subtitle = formData.get("subtitle") as string | null;
  
  if (!title || !content) {
    return { error: "Judul dan konten harus diisi" };
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  let imageUrl = null;
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate unique filename
    const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    const uploadDir = path.join(process.cwd(), "data", "uploads");
    const filePath = path.join(uploadDir, filename);
    
    writeFileSync(filePath, buffer);
    imageUrl = `/uploads/${filename}`;
  }

  await prisma.post.create({
    data: {
      title,
      subtitle,
      slug: `${slug}-${Date.now()}`,
      content,
      image: imageUrl,
      published,
      authorId: session.userId,
    }
  });

  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  revalidatePath("/");
  redirect("/admin/berita");
}

export async function deleteBerita(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  revalidatePath("/");
}

export async function updateBerita(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";
  const imageFile = formData.get("image") as File | null;
  const subtitle = formData.get("subtitle") as string | null;

  if (!title || !content) {
    return { error: "Judul dan konten harus diisi" };
  }

  const existingPost = await prisma.post.findUnique({ where: { id } });
  if (!existingPost) {
    return { error: "Berita tidak ditemukan" };
  }

  let imageUrl = existingPost.image;
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate unique filename
    const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    const uploadDir = path.join(process.cwd(), "data", "uploads");
    const filePath = path.join(uploadDir, filename);
    
    writeFileSync(filePath, buffer);
    imageUrl = `/uploads/${filename}`;
  }

  await prisma.post.update({
    where: { id },
    data: {
      title,
      subtitle,
      content,
      image: imageUrl,
      published,
    }
  });

  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  revalidatePath("/");
  redirect("/admin/berita");
}
