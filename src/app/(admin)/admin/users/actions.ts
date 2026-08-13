"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import * as jose from "jose";

import { getSession } from "@/lib/session";

async function checkSuperAdmin() {
  const session = await getSession();
  if (!session) return false;
  return session.role === 'SUPERADMIN';
}

export async function createAdmin(formData: FormData) {
  const isSuper = await checkSuperAdmin();
  if (!isSuper) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string; // in real world should hash
  const dpp = formData.get("dpp") as string;
  const role = formData.get("role") as string;

  if (!email || !password) throw new Error("Missing required fields");

  await prisma.admin.create({
    data: {
      name,
      email,
      password, // Note: In production, hash this with bcrypt!
      dpp: dpp || "DPP PUSAT",
      role: role || "ADMIN",
    }
  });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteAdmin(id: string) {
  const isSuper = await checkSuperAdmin();
  if (!isSuper) throw new Error("Unauthorized");

  await prisma.admin.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
}
