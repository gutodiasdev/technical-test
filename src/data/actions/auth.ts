"use server"

import { tokenService } from "@/services/TokenService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setCookiesSession(token: string) {
  const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
  (await cookies()).set("session", token, {
    expires: expiresInOneDay,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await tokenService.verifyToken(session);
}

export async function getToken() {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;
  return token;
}

export async function removeTokenFromCookies() {
  (await cookies()).delete("session");
  redirect("/");
}