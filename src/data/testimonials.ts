/**
 * TESTIMONY — deliberately not fabricated.
 *
 * There are no quotes here, because inventing one and putting it in a client's
 * mouth is a strange thing to do. Each entry is a placeholder keyed to a real
 * project; add the verbatim quote and set `placeholder: false` when it arrives.
 */
export interface Testimonial {
  /** Verbatim client words. Empty until a real one exists. */
  quote: string;
  author: string;
  role: string;
  project: string;
  placeholder: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote: '',
    author: 'Awaiting statement',
    role: 'Founder, Zanori Spaces',
    project: 'zanori',
    placeholder: true,
  },
  {
    quote: '',
    author: 'Awaiting statement',
    role: 'Fitables Beauty Bar',
    project: 'fitables',
    placeholder: true,
  },
  {
    quote: '',
    author: 'Awaiting statement',
    role: 'Apreeltree',
    project: 'apreeltree',
    placeholder: true,
  },
  {
    quote: '',
    author: 'Awaiting statement',
    role: 'DUDJA',
    project: 'dudja',
    placeholder: true,
  },
];
