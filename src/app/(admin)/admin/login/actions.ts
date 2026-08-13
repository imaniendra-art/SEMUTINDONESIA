"use server";

import { prisma } from "@/lib/prisma";
import { setSession } from "@/lib/session";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password harus diisi." };
  }

  let admin = await prisma.admin.findUnique({ where: { email } });

  // Auto-create default superadmin on very first login if no admin exists at all
  if (!admin && email === "admin@semutindonesia.com" && password === "admin123") {
    const hashed = await bcrypt.hash(password, 12);
    admin = await prisma.admin.create({
      data: {
        email,
        password: hashed,
        name: "Admin Pusat",
        role: "SUPERADMIN",
      },
    });
  }

  if (!admin) {
    return { error: "Kredensial tidak valid." };
  }

  // Compare with bcrypt — handles both hashed and legacy plaintext (migration path)
  const isValid = await bcrypt.compare(password, admin.password).catch(() => false);

  // Fallback for legacy plaintext passwords (before migration)
  const isLegacyMatch = !isValid && admin.password === password;

  if (!isValid && !isLegacyMatch) {
    return { error: "Kredensial tidak valid." };
  }

  // If legacy plaintext matched, silently upgrade to hashed
  if (isLegacyMatch) {
    const hashed = await bcrypt.hash(password, 12);
    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashed },
    });
  }

  await setSession(admin.id, admin.role, admin.dpp);
  redirect("/admin");
}
