/** The belt under the hero. Part skills, part warning label. */
export const capabilities: string[] = [
  'Product design',
  'React',
  'TypeScript',
  'Node',
  'PostgreSQL',
  'Firebase',
  'Push notifications',
  'PWA',
  'Telegram bots',
  'Browser games',
  'Python',
  'Automation',
  'API design',
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
    body: 'Typed React on the front, a real API and a real database behind it — schema, migrations, auth, queues, the lot. Real data, real payments, real push. A staging link from the first week, so there is no big reveal and no surprises at the end.',
    output: 'Staging build, migrations, QA pass',
  },
  {
    index: '04',
    stage: 'Fly',
    title: 'Launch',
    body: 'Domain, analytics, OG cards, sitemap, redirects, a performance pass, and a handover document written for a human. Then I hover for thirty days while the first real users arrive.',
    output: 'Live site, handover doc, 30-day cover',
  },
  {
    index: '05',
    stage: 'Mend',
    title: 'Harden',
    body: 'The part nobody photographs: I read the codebase looking for the thing that will embarrass us at 2am. On the church platform that turned up a device-auth takeover, a database dump committed to git and ten other problems — all fixed, all written down in a file you can read.',
    output: 'Security pass, written audit, and a system that holds',
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
