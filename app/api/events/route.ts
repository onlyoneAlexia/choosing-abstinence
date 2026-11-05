import { env } from "cloudflare:workers";
import { kinds, lagosDay, normaliseSource } from "../../../lib/metrics";
import { isOwner } from "../../../lib/owner";

export async function POST(request:Request) {
  const headers={"Cache-Control":"no-store"};
  if (request.headers.get("origin")!==new URL(request.url).origin) return new Response("Forbidden",{status:403,headers});
  if (!request.headers.get("content-type")?.startsWith("application/json")) return new Response("JSON required",{status:415,headers});
  if (request.headers.get("dnt")==="1" || request.headers.get("sec-gpc")==="1" || /bot|crawler|spider|headless/i.test(request.headers.get("user-agent")||"")) return new Response(null,{status:204,headers});
  try {
    const text=await request.text();
    if(text.length>2048)return new Response("Too large",{status:413,headers});
    const body=JSON.parse(text);
    if(!body || !kinds.includes(body.kind))return new Response("Invalid event",{status:400,headers});
    if(await isOwner())return new Response(null,{status:204,headers});
    const day=lagosDay();
    let ref=body.referrer;
    try {if(new URL(ref).origin===new URL(request.url).origin)ref="";}catch{}
    const source=normaliseSource(body.source,ref);
    await env.DB!.prepare("INSERT INTO daily_metrics (day, source, kind, count) VALUES (?, ?, ?, 1) ON CONFLICT(day, source, kind) DO UPDATE SET count = count + 1").bind(day,source,body.kind).run();
    return new Response(null,{status:204,headers});
  }catch{return new Response("Unable to record event",{status:503,headers});}
}
