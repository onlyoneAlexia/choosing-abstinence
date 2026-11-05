import type { MetricKind } from './metrics';
import { starterPlan } from './guide-content';
import { getSmoothScroller } from './smooth-scroll';

export function measure(kind: MetricKind) {
  if (navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
  let referrer = '';
  try { referrer = document.referrer ? new URL(document.referrer).origin : ''; } catch {}
  fetch('/api/events', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind, source: new URLSearchParams(location.search).get('utm_source'), referrer }), keepalive: true,
  }).catch(() => {});
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const smooth = getSmoothScroller();
  if (smooth) { smooth(target); return; }
  target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

export function starterPlanText() {
  return ['CHOOSING ABSTINENCE', 'Your seven-day starter plan', '', 'Use this plan at your own pace. Keep your reflections in a private notebook.', '',
    ...starterPlan.flatMap((day, index) => [`DAY ${index + 1}: ${day.title}`, day.action, `Reflection: ${day.reflection}`, '']),
    'Your worth does not depend on your sexual history. This is educational relationship guidance for adults.', '',
    'https://choosing-abstinence-alexia.timidan-x.chatgpt.site/',
  ].join('\n');
}
