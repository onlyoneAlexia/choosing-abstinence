// Artwork used on the home page. The files live in public/images/art/ and are made from the
// founder's chosen images (see docs/design-notes.md). Add each artist's name to `credit`
// before the site goes public; a filled-in credit is shown under the artwork.

export type ArtPiece = {
  src: string;
  width: number;
  height: number;
  alt: string;
  shape: 'arch' | 'oval' | 'print';
  title: string;
  text: string;
  /** How strongly the picture drifts inside its frame while scrolling (0 = still). */
  depth: number;
  credit: string;
};

export const artPieces: ArtPiece[] = [
  {
    src: '/images/art/moon-woman.webp', width: 760, height: 1056,
    alt: 'A woman with long dark hair and a flowing white gown sits on a glittering crescent moon above calm pink water at dusk.',
    shape: 'arch', title: 'Take your time.', text: 'Waiting is not falling behind. Your timeline belongs to you.', depth: 1, credit: '',
  },
  {
    src: '/images/art/rose-woman.webp', width: 760, height: 896,
    alt: 'A dreamy pink double-exposure portrait of a woman with her eyes closed, holding a rose to her face.',
    shape: 'oval', title: 'Choose yourself first.', text: 'You deserve care that respects the woman you already are.', depth: 0.7, credit: '',
  },
  {
    src: '/images/art/lily-painting.webp', width: 736, height: 552,
    alt: 'A close-up painting of a woman resting with her eyes closed and a white lily tucked behind her ear.',
    shape: 'print', title: 'Rest in your decision.', text: 'You do not have to defend your choice to everyone who asks.', depth: 0.85, credit: '',
  },
];

/** Decorative butterflies: the flowing one sits on light sections, the glowing one on wine. */
export const butterflies = {
  smoke: { src: '/images/art/butterfly-smoke.webp', width: 500, height: 1008 },
  glow: { src: '/images/art/butterfly-glow.webp', width: 900, height: 1019 },
};
