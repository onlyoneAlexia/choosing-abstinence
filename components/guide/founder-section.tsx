import { founder, founderBeliefs, founderEmailLink, founderMessage } from '../../lib/founder';

function XIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}

function MailIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
}

export function ContactLinks({ className = '' }: { className?: string }) {
  return <div className={`contact-links ${className}`.trim()}>
    <a className="contact-link" href={founderEmailLink}><MailIcon/><span>{founder.email}</span></a>
    <a className="contact-link" href={founder.xUrl} target="_blank" rel="noopener noreferrer"><XIcon/><span>{founder.xHandle} on X</span><span className="sr-only"> (opens in a new tab)</span></a>
  </div>;
}

export default function FounderSection() {
  return <section className="founder-section section-pad" id="founder" aria-labelledby="founder-heading">
    <aside className="founder-card" aria-label={`About ${founder.name}`}>
      <div className="founder-card-top"><span>The founder</span><span>Choosing Abstinence</span></div>
      <div className="founder-monogram" aria-hidden="true">{founder.initials}</div>
      <h3 className="founder-name">{founder.name}</h3>
      <p className="founder-role">{founder.role}</p>
      <span className="founder-reach">You can reach out.</span>
      <ContactLinks/>
      <p className="founder-safety">Email and X are not crisis services. If you are in danger, please contact local emergency services or someone you trust nearby.</p>
    </aside>
    <div className="founder-message">
      <span className="eyebrow"><i/> A note from the founder.</span>
      <h2 id="founder-heading">{founderMessage.heading[0]}<br/>{founderMessage.heading[1]}</h2>
      <p className="founder-lead">{founderMessage.lead}</p>
      {founderMessage.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      <div className="founder-beliefs">
        <span className="eyebrow">What I want every reader to know.</span>
        <ul>{founderBeliefs.map((belief, index) => <li key={belief.title}><span className="belief-number">0{index + 1}</span><h3>{belief.title}</h3><p>{belief.text}</p></li>)}</ul>
      </div>
      <p>{founderMessage.closing}</p>
      <div className="founder-signoff"><span>With care,</span><strong>{founder.name}</strong><span>{founder.role}</span></div>
    </div>
  </section>;
}
