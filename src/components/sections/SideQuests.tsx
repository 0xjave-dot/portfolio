import { dreadnoughtTranscript, quests } from '@/data/quests';
import { Stamp } from '@/components/ui/Annotation';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';

function Transcript() {
  return (
    <figure className="border border-line/20 bg-[#0A0A0B] p-4 font-mono text-[0.68rem] leading-relaxed text-[#EDEAE3] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:p-5 sm:text-[0.74rem]">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" aria-hidden="true" />
          <span className="ml-2 text-[0.55rem] uppercase tracking-[0.18em] text-white/40">
            telegram · dreadnought-7
          </span>
        </span>
        <span className="text-[0.55rem] uppercase tracking-[0.18em] text-white/30">sample</span>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {dreadnoughtTranscript.map((line) => (
          <p key={`${line.speaker}-${line.text.slice(0, 12)}`} className="flex gap-2">
            <span
              className={
                line.speaker === 'bot'
                  ? 'shrink-0 text-accent'
                  : line.speaker === 'user'
                    ? 'shrink-0 text-white/35'
                    : 'shrink-0 text-white/25'
              }
            >
              {line.speaker === 'system' ? '//' : line.speaker === 'user' ? '>' : 'D7>'}
            </span>
            <span
              className={
                line.speaker === 'bot'
                  ? 'text-accent/90'
                  : line.speaker === 'user'
                    ? 'text-white/75'
                    : 'text-white/30'
              }
            >
              {line.text}
            </span>
          </p>
        ))}
        <p className="flex gap-2 pt-1">
          <span className="shrink-0 text-white/35">&gt;</span>
          <span className="h-3.5 w-2 animate-blink bg-accent" aria-hidden="true" />
        </p>
      </div>
      <figcaption className="mt-4 border-t border-white/10 pt-2.5 text-[0.55rem] uppercase tracking-[0.16em] text-white/30">
        Sample exchange — not a real transcript
      </figcaption>
    </figure>
  );
}

/**
 * Side quests: everything that isn't a client website. This is where the range
 * (bots, games, trading scripts, automation) lives, kept separate from
 * the paid work above so a business owner still reads the case studies first.
 */
export function SideQuests() {
  return (
    <section
      className="defer-paint relative border-t border-line/15 py-section"
      aria-labelledby="quests-title"
    >
      <div className="shell">
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="label text-accentInk">02</span>
              <span className="label">Side quests</span>
            </div>
            <SplitText
              as="h2"
              id="quests-title"
              className="mt-4 font-display text-[clamp(2.2rem,5.2vw,3.9rem)] font-medium leading-[0.94] tracking-[-0.045em]"
              lines={['Things that', 'aren’t websites.']}
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/60 sm:text-base">
              I have the ability to have fun too. A Telegram bot with a bad attitude, games for
              friends, scripts that watch markets, and automation experiments. 
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Stamp className="text-stamp">FOR THE LOVE OF THE GAME</Stamp>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">
                Some of these are still running
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <Transcript />
            </Reveal>
          </div>
        </div>

        <ol className="mt-14 flex flex-col border-t border-line/15">
          {quests.map((quest) => (
            <li key={quest.index}>
              <div
                className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b border-line/10 py-5 transition-colors duration-300 hover:bg-ink/[0.03]"
                data-cursor="Built"
              >
                <span className="col-span-2 font-mono text-[0.6rem] text-accentInk sm:col-span-1">
                  {quest.index}
                </span>
                <div className="col-span-10 flex flex-col gap-1 sm:col-span-4">
                  <span className="font-display text-lg font-medium leading-tight tracking-[-0.02em] text-ink sm:text-xl">
                    {quest.name}
                  </span>
                  <span className="label">{quest.kind}</span>
                </div>
                <p className="col-span-12 max-w-xl text-sm leading-relaxed text-ink/65 sm:col-span-4">
                  {quest.summary}
                </p>
                <div className="col-span-12 flex flex-col items-start gap-1 sm:col-span-3 sm:items-end">
                  <span className="font-serif text-sm italic text-ink/75">{quest.note}</span>
                  <span className="flex flex-wrap gap-1 sm:justify-end">
                    {quest.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line/15 px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    <span className="rounded-full border border-accent/30 px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-accentInk">
                      {quest.state}
                    </span>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-6 max-w-xl text-xs leading-relaxed text-muted">
          Client work is above. This is what happens when nobody is paying and the idea will not
          leave me alone.
        </p>
      </div>
    </section>
  );
}
