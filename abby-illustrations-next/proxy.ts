import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function proxy() {  
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/protected/:path*"],
};