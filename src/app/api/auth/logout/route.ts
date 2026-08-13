import { deleteSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await deleteSession();
  const loginUrl = new URL("/admin/login", request.nextUrl.origin);
  return NextResponse.redirect(loginUrl);
}
