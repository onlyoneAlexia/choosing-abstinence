import { isOwner } from "../../lib/owner";
import { chatGPTSignInPath, getChatGPTUser } from "../chatgpt-auth";
import Dashboard from "./dashboard";
export const dynamic="force-dynamic";
export const metadata={title:"Private analytics | Choosing Abstinence",robots:{index:false,follow:false}};
export default async function AnalyticsPage(){
  if(!await isOwner()) {
    const user=await getChatGPTUser();
    return <main className="lock-page"><a className="brand" href="/">c<span className="brand-dot">a</span><span>Choosing Abstinence</span></a><div className="lock-card"><span className="eyebrow">FOR THE CREATOR</span><h1>Your dashboard<br/><em>stays private.</em></h1><p>{user?"This account does not have access. Sign in with the ChatGPT account that created this website.":"Sign in with the ChatGPT account that created this website to see visits, clicks and traffic sources."}</p><a className="button" target="_top" href={chatGPTSignInPath("/analytics")}>Sign in with ChatGPT <span>↗</span></a><a className="text-link" href="/">Back to the website</a></div></main>;
  }
  return <Dashboard/>;
}
