import { env } from "cloudflare:workers";
import { isOwner } from "../../../lib/owner";
import { dateRange, requestedDays } from "../../../lib/metrics";

export async function GET(request:Request) {
  const headers={"Cache-Control":"private, no-store", "Vary":"Cookie"};
  if(!await isOwner())return Response.json({error:"Owner access required"},{status:403,headers});
  const url=new URL(request.url),days=requestedDays(url.searchParams.get("days")),dates=dateRange(days);
  try {
    const {results}=await env.DB!.prepare("SELECT day, source, kind, count FROM daily_metrics WHERE day >= ? AND day <= ? ORDER BY day ASC, source ASC, kind ASC").bind(dates[0],dates.at(-1)).all<{day:string,source:string,kind:string,count:number}>();
    if(url.searchParams.get("format")==="csv") {
      const csv=["Date (Africa/Lagos),Source,Event,Count",...results.map(r=>[r.day,r.source,r.kind,r.count].join(","))].join("\r\n");
      return new Response(csv,{headers:{...headers,"Content-Type":"text/csv; charset=utf-8","Content-Disposition":`attachment; filename="choosing-abstinence-${days}-days.csv"`}});
    }
    return Response.json({days,dates,rows:results,updatedAt:new Date().toISOString()},{headers});
  } catch{return Response.json({error:"Analytics could not load. Please try again."},{status:503,headers});}
}
