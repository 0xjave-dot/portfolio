/**
 * The artwork. Original renders from the old portfolio, re-compressed to WebP.
 * Replace a file in /public/bird with the same name to swap it out.
 */
export interface BirdArt {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export const birdArt = {
  /** Square crop of the face — the logo, taken from the old site's header artwork. */
  logo: {
    src: '/bird/raven-logo.webp',
    width: 160,
    height: 160,
    alt: 'Raven logo: a raven in thick black glasses',
    caption: 'The mark.',
  },
  hero: {
    src: '/bird/raven-group.webp',
    width: 656,
    height: 904,
    alt: 'Raven rendered as a hooded bird holding a laptop in one claw and a crystal staff in the other',
    caption: 'FIG. 01 — the bird. Hood, laptop, staff. The staff does nothing.',
  },
  face: {
    src: '/bird/raven-portrait.webp',
    width: 500,
    height: 435,
    alt: 'Close-up of Raven, a raven in thick black glasses, looking unimpressed',
    caption: 'FIG. 02 — the face. This is its happy expression.',
  },
  typing: {
    src: '/bird/raven-moon.webp',
    width: 500,
    height: 444,
    alt: 'Raven typing on a mechanical keyboard with code reflected in its glasses',
    caption: 'FIG. 03 — at work, 02:14. The code in the glasses is real.',
  },
  brick: {
    src: '/bird/raven-lego.webp',
    width: 576,
    height: 594,
    alt: 'Translucent glass brick lit pink and blue',
    caption: 'FIG. 04 — a brick. No reason. I just like it.',
  },
  blob: {
    src: '/bird/raven-blob.webp',
    width: 386,
    height: 432,
    alt: 'Abstract glass object',
    caption: 'FIG. 05 — something from the hoard.',
  },
} satisfies Record<string, BirdArt>;

export type BirdArtKey = keyof typeof birdArt;
