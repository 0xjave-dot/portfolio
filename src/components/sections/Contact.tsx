import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { birdArt } from '@/data/bird';
import { site } from '@/data/site';
import { useLocalTime } from '@/hooks/useLocalTime';
import { Stamp } from '@/components/ui/Annotation';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Toast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

const PROJECT_TYPES = ['Website', 'Web app', 'Booking system', 'Ecommerce', 'Brand + site', 'Something else'] as const;
const BUDGETS = ['Under ₦500k', '₦500k – ₦1.5m', '₦1.5m – ₦3m', '₦3m+', 'No idea yet'] as const;

const schema = z.object({
  name: z.string().min(2, 'A name I can use.'),
  email: z.string().min(1, 'An email address, please.').email('That email looks off.'),
  projectType: z.enum(PROJECT_TYPES),
  budget: z.enum(BUDGETS),
  message: z.string().min(20, 'Give me a sentence or two — 20 characters minimum.'),
  company: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-stamp"
          role="alert"
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

const fieldBase =
  'w-full border-b border-line/25 bg-transparent py-3 font-sans text-base text-ink outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-accent';

export function Contact() {
  const { time, offset } = useLocalTime();
  const [toast, setToast] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [deliveryNote, setDeliveryNote] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      projectType: 'Website',
      budget: 'No idea yet',
      message: '',
      company: '',
    },
    mode: 'onBlur',
  });

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      showToast('Email copied');
    } catch {
      showToast(site.email);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setStatus('sending');
    const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;

    if (formId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formId}`, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...values, _subject: `New project — ${values.name}` }),
        });
        if (!response.ok) throw new Error('Formspree rejected the submission');
        setDeliveryNote(null);
        setStatus('success');
        reset();
        return;
      } catch {
        setStatus('error');
        setDeliveryNote('The form endpoint did not answer. Use email or WhatsApp below.');
        return;
      }
    }

    const subject = encodeURIComponent(`Project enquiry — ${values.projectType} (${values.name})`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nProject: ${values.projectType}\nBudget: ${values.budget}\n\n${values.message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setDeliveryNote('Opening your mail app with the message filled in. If nothing happens, copy the address.');
    setStatus('success');
    reset();
  };

  return (
    <section
      className="defer-paint relative overflow-hidden border-t border-line/15 pt-section"
      aria-labelledby="contact-title"
    >
      <div className="shell">
        <div className="flex items-center gap-3">
          <span className="label text-accentInk">07</span>
          <span className="label">Send word</span>
        </div>

        <h2
          id="contact-title"
          className="relative mt-5 font-display text-[clamp(2.8rem,11vw,9rem)] font-medium leading-[0.8] tracking-[-0.055em]"
        >
          <span className="block transition-[color,transform] duration-500 ease-edge hover:-translate-y-1">
            Send
          </span>
          <span className="block font-serif italic tracking-[-0.03em] text-accentInk">word.</span>
        </h2>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/70">
          Tell me what you’re building, and when it needs to be live. I reply in full
          sentences, usually instantly (I have no life outside this) 
        </p>

        <div className="pointer-events-none absolute right-[5vw] top-24 z-0 hidden w-[15rem] lg:block">
          <img
            src={birdArt.blob.src}
            alt={birdArt.blob.alt}
            width={birdArt.blob.width}
            height={birdArt.blob.height}
            loading="lazy"
            decoding="async"
            className="w-full opacity-90"
          />
          <span className="mt-2 block text-right font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">
            Fig. 05 — something from the hoard
          </span>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-y-12 border-t border-line/15 pt-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="plate flex flex-col items-start gap-4 border border-accent/40 bg-accent/[0.06] p-6 sm:p-8"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm text-[#0A0A0B]">
                    ✓
                  </span>
                  <h3 className="font-display text-2xl tracking-[-0.03em]">Received.</h3>
                  <p className="max-w-md text-sm leading-relaxed text-ink/70">
                    {deliveryNote ??
                      'I read everything and usually reply within a day. If it is urgent, WhatsApp is faster — I am probably awake.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="link-underline font-mono text-[0.6rem] uppercase tracking-[0.16em]"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
                >
                  <div>
                    <label htmlFor="name" className="label mb-1 block">
                      Your name
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Or the company’s"
                      className={cn(fieldBase, errors.name && 'border-stamp')}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      {...register('name')}
                    />
                    <FieldError message={errors.name?.message} />
                  </div>

                  <div>
                    <label htmlFor="email" className="label mb-1 block">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={cn(fieldBase, errors.email && 'border-stamp')}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      {...register('email')}
                    />
                    <FieldError message={errors.email?.message} />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="label mb-1 block">
                      What is it
                    </label>
                    <select id="projectType" className={cn(fieldBase, 'appearance-none')} {...register('projectType')}>
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="label mb-1 block">
                      Budget
                    </label>
                    <select id="budget" className={cn(fieldBase, 'appearance-none')} {...register('budget')}>
                      {BUDGETS.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="label mb-1 block">
                      The project
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="What are you building? What’s broken? What does it need to do?"
                      className={cn(fieldBase, 'resize-none', errors.message && 'border-stamp')}
                      aria-invalid={errors.message ? 'true' : 'false'}
                      {...register('message')}
                    />
                    <FieldError message={errors.message?.message} />
                  </div>

                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="company">Company</label>
                    <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                    <MagneticButton
                      type="submit"
                      variant="solid"
                      size="md"
                      disabled={isSubmitting || status === 'sending'}
                      cursorLabel="Send"
                      trailing={<span aria-hidden="true">↗</span>}
                    >
                      {status === 'sending' ? 'Sending…' : 'Send it'}
                    </MagneticButton>
                    <span className="font-mono text-[0.56rem] uppercase leading-relaxed tracking-[0.14em] text-muted">
                      or email {site.email}
                    </span>
                  </div>

                  {status === 'error' ? (
                    <p role="alert" className="text-xs text-stamp sm:col-span-2">
                      {deliveryNote}
                    </p>
                  ) : null}
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="col-span-12 flex flex-col gap-7 lg:col-span-4 lg:col-start-9">
            <div className="flex flex-col gap-2">
              <span className="label">Email</span>
              <button
                type="button"
                onClick={copyEmail}
                className="group flex items-baseline justify-between gap-3 text-left"
                data-cursor="Copy"
              >
                <span className="font-display text-lg tracking-[-0.02em] transition-colors group-hover:text-accentInk sm:text-xl">
                  {site.email}
                </span>
                <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-muted">copy ⧉</span>
              </button>
              <span className="hairline" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="label">WhatsApp</span>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-baseline justify-between gap-3"
                data-cursor="WhatsApp"
              >
                <span className="font-display text-lg tracking-[-0.02em] transition-colors group-hover:text-accentInk sm:text-xl">
                  {site.phone.display}
                </span>
                <span aria-hidden="true" className="text-muted transition-transform group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
              <span className="hairline" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="label">Elsewhere</span>
              <ul className="flex flex-col gap-2">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={social.placeholder ? undefined : '_blank'}
                      rel={social.placeholder ? undefined : 'noreferrer noopener'}
                      className="group flex min-h-6 items-center justify-between gap-3 py-0.5 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-ink/80 transition-colors hover:text-accentInk"
                      data-cursor={social.placeholder ? undefined : 'Open'}
                    >
                      <span>{social.label}</span>
                      <span className="text-[0.58rem] text-muted transition-colors group-hover:text-accentInk">
                        {social.handle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line/15 pt-4">
              <div className="flex items-center justify-between">
                <span className="label">Lagos</span>
                <span className="font-mono text-[0.66rem] text-ink">
                  {time} <span className="text-muted">{offset}</span>
                </span>
              </div>
              <p className="mt-2 label normal-case tracking-normal">{site.coords}</p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={birdArt.face.src}
                  alt={birdArt.face.alt}
                  width={birdArt.face.width}
                  height={birdArt.face.height}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-10 rounded-full border border-line/20 object-cover grayscale"
                />
                <Stamp className="text-stamp">Pigeon post accepted</Stamp>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast message={toast} />
    </section>
  );
}
