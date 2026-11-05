export const sources = ["TikTok", "Instagram", "Facebook", "WhatsApp", "YouTube", "X", "Direct", "Other"] as const;
export const kinds = ["visit", "preview", "share", "script_copy", "plan_download"] as const;
export type MetricKind = typeof kinds[number];

export function normaliseSource(tag: unknown, referrer: unknown): string {
  const tags: Record<string, string> = {tiktok:"TikTok",instagram:"Instagram",facebook:"Facebook",whatsapp:"WhatsApp",youtube:"YouTube",x:"X",twitter:"X",direct:"Direct"};
  if (typeof tag === "string" && tag.trim()) return tags[tag.toLowerCase().trim()] || "Other";
  if (typeof referrer !== "string" || !referrer) return "Direct";
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    const maps: [string[],string][] = [[["tiktok.com"],"TikTok"],[["instagram.com"],"Instagram"],[["facebook.com","fb.com"],"Facebook"],[["whatsapp.com","wa.me"],"WhatsApp"],[["youtube.com","youtu.be"],"YouTube"],[["x.com","twitter.com","t.co"],"X"]];
    for (const [domains,label] of maps) if (domains.some(d=>host===d||host.endsWith("."+d))) return label;
    return "Other";
  } catch { return "Direct"; }
}

export function lagosDay(now = new Date()) { return new Date(now.getTime()+3600000).toISOString().slice(0,10); }
export function dateRange(days:number,now=new Date()) {return Array.from({length:days},(_,i)=>lagosDay(new Date(now.getTime()-(days-i-1)*86400000)));}
export function requestedDays(value: string|null) { const days=Number(value);return [7,30,90].includes(days)?days:30; }
