"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import fs from "fs";
import path from "path";

async function verifyAuth() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function createDocument(prevState: any, formData: FormData) {
  try {
    await verifyAuth();
    
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File;

    if (!title || !file || file.size === 0) {
      return { error: "Judul dan File Dokumen wajib diisi" };
    }

    // Upload file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create unique filename
    const ext = file.name.split('.').pop();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `doc-${uniqueSuffix}.${ext}`;
    
    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads/docs");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);
    const fileUrl = `/uploads/docs/${filename}`;

    await prisma.document.create({
      data: {
        title,
        description,
        fileUrl,
      },
    });

  } catch (error: any) {
    return { error: error.message || "Gagal menyimpan dokumen" };
  }

  revalidatePath("/admin/legalitas");
  revalidatePath("/legalitas");
  redirect("/admin/legalitas");
}

export async function updateDocument(id: string, prevState: any, formData: FormData) {
  try {
    await verifyAuth();
    
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;

    if (!title) {
      return { error: "Judul wajib diisi" };
    }

    const updateData: any = {
      title,
      description,
    };

    // If new file is uploaded
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const ext = file.name.split('.').pop();
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `doc-${uniqueSuffix}.${ext}`;
      
      const uploadDir = path.join(process.cwd(), "public/uploads/docs");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const filepath = path.join(uploadDir, filename);
      fs.writeFileSync(filepath, buffer);
      
      updateData.fileUrl = `/uploads/docs/${filename}`;
    }

    await prisma.document.update({
      where: { id },
      data: updateData,
    });

  } catch (error: any) {
    return { error: error.message || "Gagal memperbarui dokumen" };
  }

  revalidatePath("/admin/legalitas");
  revalidatePath("/legalitas");
  redirect("/admin/legalitas");
}

export async function deleteDocument(id: string) {
  await verifyAuth();
  
  try {
    // Optionally we could delete the physical file too, but let's keep it simple for now
    await prisma.document.delete({
      where: { id },
    });
    revalidatePath("/admin/legalitas");
    revalidatePath("/legalitas");
  } catch (error) {
    console.error("Delete error:", error);
    throw new Error("Gagal menghapus dokumen");
  }
}
