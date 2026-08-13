"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export async function createBerita(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";
  
  if (!title || !content) {
    return { error: "Judul dan konten harus diisi" };
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  await prisma.post.create({
    data: {
      title,
      slug: `${slug}-${Date.now()}`,
      content,
      published,
      authorId: session.userId,
    }
  });

  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  redirect("/admin/berita");
}

export async function deleteBerita(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
}
