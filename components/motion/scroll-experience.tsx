"use client";
import { useEffect } from 'react';
import Lenis from 'lenis';
import { setSmoothScroller } from '../../lib/smooth-scroll';

// Elements that rise into view the first time they are scrolled to.
const REVEAL_SELECTORS = [
  'main section h2',
  '.section-topline > .eyebrow', '.guide-description > .eyebrow', '.respect-intro > .eyebrow', '.plan-intro > .eyebrow',
  '.faq-section > div > .eyebrow', '.worth-section > .eyebrow', '.closing > .eyebrow', '.founder-message > .eyebrow', '.founder-beliefs > .eyebrow',
  '.section-heading > p', '.guide-product', '.guide-description > p', '.guide-description > .button', '.product-facts > div',
  '.chapter-list article', '.founder-card', '.founder-message > p', '.founder-beliefs li', '.founder-signoff',
  '.respect-intro > p', '.respect-comparison article', '.preview-item', '.preview-foot',
  '.scenario-list > button', '.script-result', '.plan-intro > p', '.plan-intro > .button', '.plan-days > button', '.day-detail',
  '.worth-section > p', '.faq-section > div > p', '.faq-list details', '.closing > p', '.closing > div',
  '.art-section .section-heading .eyebrow', '.art-piece',
].join(',');

const STAGGER_MS = 85;
const MAX_SCALE_DROP = 0.07;
// How far (in px) a picture with data-depth="1" drifts while it crosses the screen.
const DRIFT_PX = 70;

/**
 * Adds the scroll experience to the home page:
 * - smooth, eased wheel scrolling (Lenis),
 * - "stacking" sections: each section slides up over the previous one, which
 *   stays pinned and gently shrinks and darkens as it is covered,
 * - content that rises into view as it is reached.
 * Nothing runs for visitors who ask their device to reduce motion.
 */
export default function ScrollExperience() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    const main = document.querySelector('main');
    const header = document.querySelector<HTMLElement>('.site-header');
    if (!main) return;

    root.classList.add('motion-ready');
    const lenis = new Lenis({ autoRaf: true, lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95, anchors: false });

    // ---------- Stacking sections ----------
    const items = Array.from(main.children) as HTMLElement[];
    const stacked = items.filter(el => el.tagName === 'SECTION');
    const staticTop = new Map<HTMLElement, number>();
    const height = new Map<HTMLElement, number>();
    const stickTop = new Map<HTMLElement, number>();
    const cover = new Map<HTMLElement, number>();
    let headerH = 0, vh = 0, mainBottom = 0, frame = 0;

    // Pictures that drift gently while they cross the screen (data-depth sets the strength).
    type Drifter = { el: HTMLElement; section: HTMLElement; offset: number; h: number; depth: number; last: number };
    const drifters: Drifter[] = Array.from(main.querySelectorAll<HTMLElement>('[data-depth]')).flatMap(el => {
      const section = el.closest('main > *') as HTMLElement | null;
      return section ? [{ el, section, offset: 0, h: 0, depth: Number(el.dataset.depth) || 0, last: NaN }] : [];
    });

    // An element's distance from the top of its section, ignoring transforms.
    function offsetWithin(el: HTMLElement, section: HTMLElement) {
      let offset = 0, node: HTMLElement | null = el;
      while (node && node !== section) { offset += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
      return node === section ? offset : 0;
    }

    function measure() {
      headerH = header?.offsetHeight ?? 0;
      vh = root.clientHeight;
      let y = main!.getBoundingClientRect().top + window.scrollY;
      for (const el of items) { staticTop.set(el, y); const h = el.offsetHeight; height.set(el, h); y += h; }
      mainBottom = y;
      for (const el of stacked) {
        const h = height.get(el)!;
        // Short sections pin just under the header; tall ones pin once their bottom is on screen,
        // so every part of a section is seen before the next one covers it.
        const t = Math.min(headerH, vh - h);
        stickTop.set(el, t);
        el.style.top = `${t}px`;
        el.style.setProperty('--stack-origin', `${(headerH - t + Math.min(h, vh - t)) / 2}px`);
      }
      for (const d of drifters) { d.offset = offsetWithin(d.el, d.section); d.h = d.el.offsetHeight; }
    }

    // Where an element sits on screen at scroll position y, ignoring transforms.
    function viewTop(el: HTMLElement, y: number) {
      const h = height.get(el) ?? 0;
      let top = (staticTop.get(el) ?? 0) - y;
      const t = stickTop.get(el);
      if (t !== undefined) top = Math.min(Math.max(top, t), mainBottom - y - h);
      return top;
    }

    function update() {
      frame = 0;
      const y = window.scrollY;
      const next: [HTMLElement, number][] = [];
      for (const el of stacked) {
        const after = el.nextElementSibling as HTMLElement | null;
        let p = 0;
        if (after && staticTop.has(after)) {
          const top = viewTop(el, y);
          const visibleBottom = Math.min(top + height.get(el)!, vh);
          const visibleTop = Math.max(top, headerH);
          const span = visibleBottom - visibleTop;
          if (span > 0) p = Math.min(1, Math.max(0, (visibleBottom - viewTop(after, y)) / span));
        }
        next.push([el, p]);
      }
      for (const [el, p] of next) {
        if (Math.abs((cover.get(el) ?? 0) - p) < 0.002) continue;
        cover.set(el, p);
        el.style.setProperty('--cover', p.toFixed(3));
        el.style.setProperty('--stack-scale', (1 - p * MAX_SCALE_DROP).toFixed(4));
        if (p > 0 && p < 1) el.dataset.covering = ''; else delete el.dataset.covering;
      }
      for (const d of drifters) {
        // -1 when the picture enters at the bottom of the screen, 0 at the centre, 1 as it leaves at the top.
        const centre = viewTop(d.section, y) + d.offset + d.h / 2;
        const progress = Math.min(1, Math.max(-1, (vh / 2 - centre) / (vh / 2 + d.h / 2)));
        const drift = Math.round(-progress * d.depth * DRIFT_PX * 10) / 10;
        if (drift === d.last) continue;
        d.last = drift;
        d.el.style.setProperty('--drift', `${drift}px`);
      }
    }

    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const remeasure = () => { measure(); schedule(); };
    measure(); update();
    const resizeObserver = new ResizeObserver(remeasure);
    items.forEach(el => resizeObserver.observe(el));
    window.addEventListener('resize', remeasure);
    window.addEventListener('scroll', schedule, { passive: true });

    // ---------- Smooth in-page links ----------
    function targetY(target: HTMLElement) {
      const section = target.closest('main > *') as HTMLElement | null;
      if (!section || !staticTop.has(section)) return target.getBoundingClientRect().top + window.scrollY - headerH;
      return staticTop.get(section)! + offsetWithin(target, section) - headerH;
    }
    const scrollToTarget = (target: HTMLElement) => lenis.scrollTo(Math.max(0, targetY(target)), { duration: 1.4 });
    setSmoothScroller(scrollToTarget);

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link || link.classList.contains('skip-link')) return;
      const hash = link.getAttribute('href') ?? '#';
      if (hash === '#') { event.preventDefault(); lenis.scrollTo(0, { duration: 1.4 }); return; }
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      scrollToTarget(target);
      history.pushState(null, '', hash);
    }

    // Keyboard users: if focus lands on something hidden under a later section, bring it into view.
    function onFocusIn(event: FocusEvent) {
      const el = event.target as HTMLElement | null;
      if (!el?.matches?.(':focus-visible')) return;
      const section = el.closest('main > section') as HTMLElement | null;
      const after = section?.nextElementSibling as HTMLElement | null;
      if (!section || !after || (cover.get(section) ?? 0) <= 0) return;
      if (el.getBoundingClientRect().bottom > viewTop(after, window.scrollY)) lenis.scrollTo(Math.max(0, targetY(el) - 60), { duration: 0.8 });
    }
    document.addEventListener('click', onClick);
    document.addEventListener('focusin', onFocusIn);

    // ---------- Reveal on scroll ----------
    const timers: number[] = [];
    const revealObserver = new IntersectionObserver(entries => {
      let batch = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        revealObserver.unobserve(el);
        const delay = Math.min(batch++, 6) * STAGGER_MS;
        el.style.setProperty('--reveal-delay', `${delay}ms`);
        el.dataset.reveal = 'in';
        timers.push(window.setTimeout(() => { delete el.dataset.reveal; el.style.removeProperty('--reveal-delay'); }, 1250 + delay));
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS)).filter(el => !el.closest('.hero'));
    for (const el of revealTargets) {
      if (el.getBoundingClientRect().top < vh * 0.92) continue; // Already on screen: leave it visible.
      el.dataset.reveal = 'pending';
      revealObserver.observe(el);
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      revealObserver.disconnect();
      timers.forEach(clearTimeout);
      window.removeEventListener('resize', remeasure);
      window.removeEventListener('scroll', schedule);
      document.removeEventListener('click', onClick);
      document.removeEventListener('focusin', onFocusIn);
      setSmoothScroller(null);
      lenis.destroy();
      for (const el of stacked) {
        el.style.removeProperty('top');
        ['--cover', '--stack-scale', '--stack-origin'].forEach(prop => el.style.removeProperty(prop));
        delete el.dataset.covering;
      }
      for (const d of drifters) d.el.style.removeProperty('--drift');
      for (const el of revealTargets) { delete el.dataset.reveal; el.style.removeProperty('--reveal-delay'); }
      root.classList.remove('motion-ready');
    };
  }, []);

  return null;
}
