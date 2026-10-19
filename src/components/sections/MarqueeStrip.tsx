interface TechItem {
  name: string;
  icon: string;
}

const frontEndAndData: TechItem[] = [
  { name: 'HTML5', icon: 'html5' },
  { name: 'CSS3', icon: 'css3' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'React', icon: 'react' },
  { name: 'Next.js', icon: 'nextdotjs' },
  { name: 'Tailwind CSS', icon: 'tailwindcss' },
  { name: 'Node.js', icon: 'nodedotjs' },
  { name: 'Express', icon: 'express' },
  { name: 'Python', icon: 'python' },
  { name: 'Django', icon: 'django' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'Firebase', icon: 'firebase' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Pandas', icon: 'pandas' },
  { name: 'NumPy', icon: 'numpy' },
  { name: 'Jupyter', icon: 'jupyter' },
];

const designAndTools: TechItem[] = [
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
                <img
                  src={`https://cdn.simpleicons.org/${item.icon}`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-5 w-5 object-contain opacity-75 transition-opacity group-hover:opacity-100 sm:h-6 sm:w-6"
                />
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
