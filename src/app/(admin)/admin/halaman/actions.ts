"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";

async function checkSuperAdmin() {
  const session = await getSession();
  if (!session) return false;
  return session.role === 'SUPERADMIN';
}

export async function saveSettings(formData: FormData) {
  const isSuper = await checkSuperAdmin();
  if (!isSuper) throw new Error("Unauthorized");

  // Get all keys from FormData
  const keys = Array.from(formData.keys());
  
  // Upsert each setting
  for (const key of keys) {
    if (key.startsWith('$ACTION_ID_')) continue; // Skip Next.js internal action keys
    
    const value = formData.get(key) as string;
    
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  // Revalidate all public pages that might use these settings
  revalidatePath("/");
  revalidatePath("/profil");
  revalidatePath("/legalitas");
  revalidatePath("/kontak");
  revalidatePath("/anggota");
  revalidatePath("/pendaftaran");
  
  return { success: true };
}
