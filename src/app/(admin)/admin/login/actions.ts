"use server";

import { prisma } from "@/lib/prisma";
import { setSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password harus diisi." };
  }

  // In a real app, hash password and compare. Here we do simple compare for MVP.
  // Assuming a default admin was created or will be created.
  // If no admin exists, let's create a backdoor for the first login for MVP (demo only).
  let admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin && email === "admin@semutindonesia.com" && password === "admin123") {
    // Auto-create default admin on first login attempt if it matches default credentials
    admin = await prisma.admin.create({
      data: {
        email,
        password, // Should be hashed!
        name: "Admin Pusat",
        role: "SUPERADMIN"
      }
    });
  }

  if (!admin || admin.password !== password) {
    return { error: "Kredensial tidak valid." };
  }

  await setSession(admin.id, admin.role, admin.dpp);
  redirect("/admin");
}
