import { createRoot } from 'react-dom/client';
import Home from '../app/page';
import { founder } from '../lib/founder';
import { sitePath } from '../lib/site';
import '../app/globals.css';

function Privacy() {
  return <main className="privacy-page">
    <a className="text-link" href={sitePath('/')}>← Back to the guide</a>
    <span className="eyebrow">A note about privacy</span>
    <h1>Your reflections<br/><em>stay with you.</em></h1>
    <p>This GitHub Pages edition does not collect website analytics, set tracking cookies, or send your script selections and checklist choices to a server.</p>
    <h2>Your reading and tools</h2>
    <p>The boundary scripts and seven-day checklist work in your browser. Selections reset when you reload. Copy buttons use your clipboard only when you choose them. The starter plan downloads a text file directly to your device.</p>
    <h2>Hosting</h2>
    <p>GitHub hosts this website and may process technical request information to deliver and protect it. <a className="text-link" href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">Read GitHub’s privacy statement.</a></p>
    <h2>If you follow another link</h2>
    <p>The creator dashboard opens the separately hosted website and requires its existing sign-in. Email and X links open those services. Anything you send goes directly to {founder.name} through the service you choose.</p>
    <a className="button" href={sitePath('/')}>Return to the guide ↗</a>
  </main>;
}

createRoot(document.getElementById('root')!).render(
  document.documentElement.dataset.page === 'privacy' ? <Privacy/> : <Home/>,
);
