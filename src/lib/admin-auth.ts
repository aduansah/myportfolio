import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "portfolio_admin_session";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "P4ssword!";
const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "portfolio-admin-secret-local";

const SESSION_MAX_AGE = 60 * 60 * 24;

function sign(payload: string) {
  return crypto.createHmac("sha256", ADMIN_SECRET).update(payload).digest("hex");
}

export function createSessionToken() {
  const payload = `admin:${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string) {
  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return false;
    if (!payload.startsWith("admin:")) return false;
    return sign(payload) === signature;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export function verifyAdminPassword(password: string) {
  return password === ADMIN_PASSWORD;
}
