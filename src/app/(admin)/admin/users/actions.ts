"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import * as jose from "jose";
import bcrypt from "bcryptjs";

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
  const password = formData.get("password") as string;
  const phone = formData.get("phone") as string;
  const dpp = formData.get("dpp") as string;
  const role = formData.get("role") as string;

  if (!email || !password || !phone) throw new Error("Missing required fields");

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.admin.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
      dpp: dpp || "DPP PUSAT",
      role: role || "ADMIN",
    }
  });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function updateAdmin(id: string, formData: FormData) {
  const isSuper = await checkSuperAdmin();
  if (!isSuper) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const dpp = formData.get("dpp") as string;
  const role = formData.get("role") as string;
  const password = formData.get("password") as string;

  if (!email || !phone) throw new Error("Missing required fields");

  const updateData: any = {
    name,
    email,
    phone,
    dpp: dpp || "DPP PUSAT",
    role: role || "ADMIN",
  };

  if (password) {
    updateData.password = await bcrypt.hash(password, 12);
  }

  await prisma.admin.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteAdmin(id: string) {
  const session = await getSession();
  const isSuper = session?.role === 'SUPERADMIN';
  if (!isSuper) throw new Error("Unauthorized");

  if (session.id === id) {
    throw new Error("Cannot delete yourself");
  }

  await prisma.admin.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
}
