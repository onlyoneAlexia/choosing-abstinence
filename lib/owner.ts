import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../app/chatgpt-auth";

export async function isOwner() {
  const user=await getChatGPTUser();
  const owner=(env as unknown as {DASHBOARD_OWNER_EMAIL?:string}).DASHBOARD_OWNER_EMAIL;
  return !!(user && owner && user.email.trim().toLowerCase()===owner.trim().toLowerCase());
}
