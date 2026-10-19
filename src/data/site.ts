/**
 * RAVEN — identity, contact + navigation.
 * Everything here is editable without touching a component.
 */

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  /** true = not confirmed yet, rendered as a quiet "pending" state */
  placeholder?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  id: string;
  index: string;
}

export const site = {
  brand: 'Raven',
  tagline: 'Websites, bots, and other things.',
  role: 'Web developer',
  location: 'Lagos, Nigeria',
  coords: '6.5244° N, 3.3792° E',
  timeZone: 'Africa/Lagos',
  timeZoneLabel: 'WAT / GMT+1',
  email: '0xjave@gmail.com',
  phone: {
    raw: '09013406288',
    display: '0901 340 6288',
    tel: '+2349013406288',
  },
  whatsapp: {
    href: 'https://wa.me/2349013406288',
    label: 'WhatsApp',
  },
  availability: 'Open for work — slowly, but open',
  status: 'Taking on two projects. Maybe three. Let’s not get carried away.',
  /**
   * Placeholder origin — replace with the production domain before launch.
   */
  url: 'https://0xjave-dot.github.io/portfolio',
  title: 'Raven — websites, bots and other things',
  description:
    'Raven makes websites, Telegram bots, browser games, Python market scripts and AI chat workflows — built end to end. React, TypeScript, Firebase, Paystack. Lagos, Nigeria.',
  github: 'https://github.com/0xjave-dot',
  socials: [
    { label: 'GitHub', href: 'https://github.com/0xjave-dot', handle: '@0xjave-dot' },
    { label: 'GitHub', href: 'https://github.com/jesse781227-U', handle: '@jesse781227-U' },
    { label: 'X', href: 'https://x.com/CorvusCorax0x', handle: '@CorvusCorax0x' },
  ] as SocialLink[],
} as const;

export const navItems: NavItem[] = [
  { label: 'Work', href: '#work', id: 'work', index: '01' },
  { label: 'Side quests', href: '#quests', id: 'quests', index: '02' },
  { label: 'The bird', href: '#about', id: 'about', index: '03' },
  { label: 'What I do', href: '#services', id: 'services', index: '04' },
  { label: 'Contact', href: '#contact', id: 'contact', index: '05' },
];

export const sectionIds = [
  'hero',
  'work',
  'quests',
  'about',
  'services',
  'process',
  'contact',
] as const;

export const sectionLabels: Record<string, string> = {
  hero: 'Specimen',
  work: 'Field records',
  quests: 'Side quests',
  about: 'The bird',
  services: 'Capabilities',
  process: 'Lifecycle',
  contact: 'Send word',
};
