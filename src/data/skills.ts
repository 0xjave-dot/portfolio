export interface SkillGroup {
  label: string;
  items: string[];
}

/** Tools grid — only things that have actually run somewhere. */
export const skillGroups: SkillGroup[] = [
  { label: 'Front-end', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'GSAP'] },
  { label: 'Back-end & data', items: ['Node.js', 'Firebase Auth', 'Firestore', 'Storage', 'REST APIs', 'Zod'] },
  { label: 'Commerce', items: ['Paystack', 'Flutterwave', 'Cart & checkout', 'Booking engines'] },
  { label: 'Bots & automation', items: ['Python', 'Telegram Bot API', 'AI chat workflows', 'Webhooks', 'Scheduling'] },
  { label: 'Data & markets', items: ['Market data', 'Order automation', 'Backtesting', 'CSV / ETL'] },
  { label: 'Brand & design', items: ['Figma', 'Design systems', 'Typography', 'Art direction'] },
  { label: 'Ship & measure', items: ['Git', 'GitHub', 'Render', 'Vercel', 'SEO', 'Core Web Vitals'] },
];

/** The belt under the hero. Part skills, part warning label. */
export const capabilities: string[] = [
  'Websites',
  'UI/UX',
  'React',
  'TypeScript',
  'Firebase',
  'Telegram bots',
  'Browser games',
  'Python',
  'Market scripts',
  'Automation',
  'Ecommerce',
  'No small talk',
];

export interface ProcessStep {
  index: string;
  /** The lifecycle stage, bird-flavoured. */
  stage: string;
  title: string;
  body: string;
  output: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    stage: 'Forage',
    title: 'Discover',
    body: 'I ask too many questions. What does the business actually sell, who signs off, what does the current site get wrong, what has to be true in six months. You will get used to it.',
    output: 'Scope, sitemap, what “working” means',
  },
  {
    index: '02',
    stage: 'Nest',
    title: 'Design',
    body: 'Type, colour, spacing, photography rules — then real screens with real copy, reviewed in the browser. This is the stage where I move one button four pixels for two hours and refuse to apologise.',
    output: 'Design system, key screens',
  },
  {
    index: '03',
    stage: 'Hoard',
    title: 'Build',
    body: 'Typed React, real data, real payments. A staging link from the first week, so there is no big reveal and no surprises at the end. You watch it happen; I go quiet and fix things.',
    output: 'Staging build, content in, QA pass',
  },
  {
    index: '04',
    stage: 'Fly',
    title: 'Launch',
    body: 'Domain, analytics, OG cards, sitemap, redirects, a performance pass, and a handover document written for a human. Then I hover for thirty days while the first real users arrive.',
    output: 'Live site, handover doc, 30-day cover',
  },
];

/** Special interests. The personality payload. */
export const specialInterests: string[] = [
  'Lord of the Rings lore',
  'Warhammer',
  'Zoology',
  'Dog breeds',
  'Armoured tank engines',
  'Anime arcs',
  'Typography',
  'Kerning',
  'The correct way to close a tab',
];

/** Things that are true and I am not going to pretend otherwise. */
export const knownBugs: Array<{ bug: string; status: string }> = [
  { bug: 'Small talk', status: 'unpatched since birth' },
  { bug: 'Eye contact during standups', status: 'degrades under load' },
  { bug: 'Leopard vs cheetah explanations', status: 'no off switch' },
  { bug: 'Takes “we’ll see” literally', status: 'by design' },
];
