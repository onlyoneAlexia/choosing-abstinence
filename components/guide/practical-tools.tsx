"use client";
import { useRef, useState } from 'react';
import { scripts, starterPlan } from '../../lib/guide-content';
import { measure, starterPlanText } from '../../lib/guide-client';

export default function PracticalTools() {
  const [scenario, setScenario] = useState(0);
  const [scriptNotice, setScriptNotice] = useState('');
  const [fallback, setFallback] = useState(false);
  const [day, setDay] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [downloadNotice, setDownloadNotice] = useState('');
  const copied = useRef(false), downloaded = useRef(false);
  async function copyScript() {
    try {
      await navigator.clipboard.writeText(scripts[scenario].quote);
      setScriptNotice('Your script has been copied. You can adapt it to sound like you.');
      setFallback(false);
      if (!copied.current) { copied.current = true; measure('script_copy'); }
    } catch { setFallback(true); setScriptNotice('Select the text below to copy your script.'); }
  }
  function downloadPlan() {
    const blob = new Blob([starterPlanText()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = 'Choosing-Abstinence-7-Day-Starter-Plan.txt'; document.body.appendChild(a); a.click(); a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloadNotice('Your starter plan is ready to save. You can use it offline in your own time.');
    if (!downloaded.current) { downloaded.current = true; measure('plan_download'); }
  }
  function toggleDay() { setCompleted(current => current.includes(day) ? current.filter(i => i !== day) : [...current, day]); }
  return <>
    <section className="script-section section-pad" id="tools" aria-labelledby="script-heading">
      <div className="section-topline"><span className="eyebrow">03 / Find your words</span><span className="tiny-note">You can make these words your own.</span></div>
      <div className="section-heading"><h2 id="script-heading">You do not have to<br/>find every word alone.</h2><p>Choose a situation below to find a clear way to express your boundary. You can be warm, direct and honest without turning your answer into a negotiation.</p></div>
      <div className="script-workspace">
        <div className="scenario-list" role="group" aria-label="Choose a situation">{scripts.map((script, index) => <button key={script.label} aria-pressed={scenario === index} className={scenario === index ? 'selected' : ''} onClick={() => { setScenario(index); setScriptNotice(''); setFallback(false); }}><span className="scenario-index">0{index + 1}</span><span>{script.label}</span><span aria-hidden="true">↗</span></button>)}</div>
        <div className="script-result" aria-live="polite"><p className="script-context">{scripts[scenario].context}</p><blockquote>“{scripts[scenario].quote}”</blockquote><p className="script-note">{scripts[scenario].note}</p><button className="button" onClick={copyScript}>Copy this script <span aria-hidden="true">↗</span></button>{fallback && <textarea data-lenis-prevent aria-label="Script to copy" className="copy-fallback" readOnly value={scripts[scenario].quote} onFocus={e => e.target.select()}/>}<p className="status" role="status">{scriptNotice}</p></div>
      </div>
    </section>
    <section className="plan-section section-pad" id="starter-plan" aria-labelledby="plan-heading">
      <div className="plan-intro"><span className="eyebrow">04 / Start with one week</span><h2 id="plan-heading">Small steps can<br/>support a big choice.</h2><p>You do not need to plan the rest of your life today. Use these seven prompts to understand your reasons, practise your words and build a little more support around you.</p><button className="button" onClick={downloadPlan}>Download the starter plan <span aria-hidden="true">↓</span></button><p className="plan-download-note">This is a free text download. You do not need to enter your email address.</p><p className="status" role="status">{downloadNotice}</p></div>
      <div className="plan-workspace"><div className="plan-days" role="group" aria-label="Choose a day">{starterPlan.map((_, index) => <button aria-pressed={day === index} aria-label={`Day ${index + 1}${completed.includes(index) ? ', marked complete' : ''}`} className={day === index ? 'selected' : ''} key={index} onClick={() => setDay(index)}><small>DAY</small><span>{index + 1}</span>{completed.includes(index) && <i aria-hidden="true">✓</i>}</button>)}</div><article className="day-detail" aria-live="polite"><span className="eyebrow">Day {day + 1} of 7</span><h3>{starterPlan[day].title}</h3><p>{starterPlan[day].action}</p><div className="reflection"><span>Ask yourself this.</span><p>{starterPlan[day].reflection}</p></div><label className="complete-day"><input type="checkbox" checked={completed.includes(day)} onChange={toggleDay}/><span>I have spent some time with this prompt.</span></label></article><div className="plan-progress"><span>{completed.length} of 7 prompts marked complete.</span><span>Your checkmarks reset when you reload.</span></div></div>
    </section>
  </>;
}
