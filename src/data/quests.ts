/**
 * SIDE QUESTS — the things that are not client websites.
 *
 * Written from Raven's own list. Keep the copy honest: no invented dates,
 * links, metrics or users. `state` is deliberately conversational rather than a
 * fake status field, because most of these are "still running somewhere".
 */
export interface Quest {
  index: string;
  name: string;
  kind: string;
  /** What it actually is, in one or two sentences. */
  summary: string;
  stack: string[];
  /** The deadpan line that sells the personality. */
  note: string;
  state: string;
}

export const quests: Quest[] = [
  {
    index: '01',
    name: 'DREADNOUGHT-7',
    kind: 'Telegram group bot',
    summary:
      'A Telegram bot for a Warhammer group chat with the personality of a dreadnought: ancient, sarcastic, and absolutely certain it is right.',
    stack: ['Python', 'Telegram Bot API'],
    note: 'It has opinions. It has seen things. It will not be reasoned with.',
    state: 'Alive, mostly',
  },
  {
    index: '02',
    name: 'TRIVIA & REBUS',
    kind: 'Browser games',
    summary:
      'Web trivia and rebus puzzles, built for friends who argue about the answers more than they play.',
    stack: ['React', 'TypeScript'],
    note: 'Made for six people who take scoring very seriously.',
    state: 'Built',
  },
  {
    index: '03',
    name: 'MARKET SCRIPTS',
    kind: 'Python · automation',
    summary:
      'Python scripts that pull market data, run the analysis, and place orders without me watching a chart at 3am.',
    stack: ['Python', 'REST APIs', 'Scheduling'],
    note: 'Built so I could stop refreshing charts. It still runs.',
    state: 'Running',
  },
  {
    index: '04',
    name: 'BINARY OPTIONS SCRIPT',
    kind: 'Python · trading',
    summary:
      'A script for trading binary options, written because I wanted to know whether the pattern actually held.',
    stack: ['Python'],
    note: 'Do not start here. It worked, which is not the same as a good idea.',
    state: 'Retired',
  },
  {
    index: '05',
    name: 'THE BLOG',
    kind: 'Writing · publishing',
    summary:
      'A blog, back when that was a thing people did. Kept alive longer than most, and killed on purpose.',
    stack: ['Writing', 'SEO', 'Publishing'],
    note: 'Ran it, wrote it, shut it down. Learned more from that than from most tutorials.',
    state: 'Ran it',
  },
  {
    index: '06',
    name: 'AI CHAT WORKFLOWS',
    kind: 'LLM · automation',
    summary:
      'Automated workflows that answer, triage and route messages so a human does not have to sit there doing it.',
    stack: ['LLM APIs', 'Automation', 'Prompt design'],
    note: '“Dabbling”, in the sense that it now runs unattended.',
    state: 'Dabbling',
  },
];

/** A sample exchange, written to show the dreadnought's voice. Not a transcript of a real chat. */
export const dreadnoughtTranscript: Array<{ speaker: 'user' | 'bot' | 'system'; text: string }> = [
  { speaker: 'system', text: 'DREADNOUGHT-7 online. 11,000 years of patience, none of it for you.' },
  { speaker: 'user', text: 'morning' },
  {
    speaker: 'bot',
    text: 'I HAVE SLEPT FOR ELEVEN THOUSAND YEARS. YOUR MORNING IS NOT MY CONCERN. STATE. YOUR. PURPOSE.',
  },
  { speaker: 'user', text: 'who is winning' },
  { speaker: 'bot', text: 'NOBODY. THAT IS THE POINT. NEXT QUESTION, MORTAL.' },
];
