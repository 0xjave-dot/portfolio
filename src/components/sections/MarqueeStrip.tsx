interface TechItem {
  name: string;
  icon?: string;
  logoUrl?: string;
}

const frontEndAndData: TechItem[] = [
  { name: 'HTML5', icon: 'html5' },
  { name: 'CSS3', icon: 'css3' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Next.js', icon: 'nextdotjs' },
  { name: 'Tailwind CSS', icon: 'tailwindcss' },
  { name: 'Vite', icon: 'vite' },
  { name: 'Framer Motion', icon: 'framer' },
  { name: 'GSAP', icon: 'greensock' },
  { name: 'Node.js', icon: 'nodedotjs' },
  { name: 'Express', icon: 'express' },
  { name: 'Python', icon: 'python' },
  { name: 'Django', icon: 'django' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'Firebase', icon: 'firebase' },
  { name: 'Firebase Auth', icon: 'firebase' },
  { name: 'Firestore', icon: 'firebase' },
  { name: 'Firebase Storage', icon: 'firebase' },
  { name: 'REST APIs', icon: 'postman' },
  { name: 'Zod', icon: 'zod' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Pandas', icon: 'pandas' },
  { name: 'NumPy', icon: 'numpy' },
  { name: 'Jupyter', icon: 'jupyter' },
];

const designAndTools: TechItem[] = [
  {
    name: 'Paystack',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Paystack_Logo.svg',
  },
  {
    name: 'Flutterwave',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flutterwave_Logo.png',
  },
  {
    name: 'Bachs',
    logoUrl: 'https://bachs.io/_astro/BACHS_Lettermark_Black.B117O8yP.svg',
  },
  { name: 'Cart & checkout', icon: 'shopify' },
  { name: 'Booking engines', icon: 'calendly' },
  { name: 'PXXL.APP', logoUrl: 'https://pxxl.app/favicon.ico' },
  { name: 'Telegram Bot API', icon: 'telegram' },
  { name: 'AI chat workflows', icon: 'openai' },
  { name: 'Market data', icon: 'tradingview' },
  { name: 'Order automation', icon: 'python' },
  { name: 'Backtesting', icon: 'chartdotjs' },
  { name: 'Design systems', icon: 'storybook' },
  { name: 'Art direction', icon: 'figma' },
  { name: 'Render', icon: 'render' },
  { name: 'SEO', icon: 'googlesearchconsole' },
  { name: 'Core Web Vitals', icon: 'googlechrome' },
  { name: 'Figma', icon: 'figma' },
  { name: 'Framer', icon: 'framer' },
  { name: 'Google Analytics', icon: 'googleanalytics' },
  { name: 'Google Search Console', icon: 'googlesearchconsole' },
  { name: 'Ahrefs', icon: 'ahrefs' },
  { name: 'SEMrush', icon: 'semrush' },
  { name: 'Notion', icon: 'notion' },
  { name: 'Obsidian', icon: 'obsidian' },
  { name: 'WordPress', icon: 'wordpress' },
  { name: 'Medium', icon: 'medium' },
  { name: 'Canva', icon: 'canva' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Vercel', icon: 'vercel' },
  { name: 'Netlify', icon: 'netlify' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Postman', icon: 'postman' },
];

function TechRow({ items, direction }: { items: TechItem[]; direction: 'left' | 'right' }) {
  return (
    <div className="w-full overflow-hidden py-2">
      <div className={`tech-glider-track tech-glider-track-${direction}`}>
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4 pr-4">
            {items.map((item) => (
              <div
                key={`${copy}-${item.name}`}
                className="group flex shrink-0 select-none items-center gap-3 rounded-full border border-line/15 bg-surface/40 px-5 py-3 backdrop-blur-sm transition-colors duration-300 hover:border-line/30 hover:bg-surface/70 sm:px-6 sm:py-4"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center sm:h-6 sm:w-6">
                  {item.icon || item.logoUrl ? (
                    <img
                      src={item.logoUrl ?? `https://cdn.simpleicons.org/${item.icon}`}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(event) => {
                        const image = event.currentTarget;
                        if (image.dataset.fallback) return;
                        image.dataset.fallback = 'true';
                        const initial = item.name.slice(0, 1);
                        image.src = `data:image/svg+xml,${encodeURIComponent(
                          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="#C8794A" font-family="serif" font-size="19" font-style="italic">${initial}</text></svg>`,
                        )}`;
                      }}
                      className="h-full w-full object-contain opacity-75 transition-opacity group-hover:opacity-100"
                    />
                  ) : (
                    <span aria-hidden="true" className="font-serif text-lg italic text-accentInk">
                      {item.name.slice(0, 1)}
                    </span>
                  )}
                </span>
                <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink/75 sm:text-[0.8rem]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two opposing, seamless tech stack gliders beneath the hero. */
export function MarqueeStrip() {
  return (
    <section
      aria-label="Tech stack"
      className="relative overflow-hidden border-y border-line/15 bg-surface/40 py-4 sm:py-6"
    >
      <div className="flex flex-col gap-2 sm:gap-3">
        <TechRow items={frontEndAndData} direction="left" />
        <TechRow items={designAndTools} direction="right" />
      </div>
    </section>
  );
}
