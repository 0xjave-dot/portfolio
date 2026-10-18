import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

const EASE = [0.22, 1, 0.36, 1] as const;

interface SplitTextProps {
  /** Plain text. Required unless `lines` is provided. */
  text?: string;
  /** Explicit lines — use when you want to control the break points. */
  lines?: string[];
  as?: Tag;
  className?: string;
  lineClassName?: string;
  /** Animate whole lines or every word. */
  mode?: 'lines' | 'words';
  delay?: number;
  stagger?: number;
  /** Animate immediately on mount instead of waiting for the viewport. */
  immediate?: boolean;
  once?: boolean;
  style?: CSSProperties;
  id?: string;
  children?: ReactNode;
}

/**
 * Masked text reveal: splits into lines (or words) and slides each unit up from
 * behind a clipping mask. Hand-written — no paid GSAP SplitText plugin.
 *
 * Screen readers get exactly one clean copy of the string (`sr-only`), while the
 * animated spans are `aria-hidden`, so nothing is announced twice or out of order.
 */
export function SplitText({
  text = '',
  lines,
  as = 'div',
  className,
  lineClassName,
  mode = 'lines',
  delay = 0,
  stagger = 0.055,
  immediate = false,
  once = true,
  style,
  id,
  children,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once, margin: '-8% 0px -10% 0px' });
  const reduced = useReducedMotion();
  const Tag = as;
  const resolvedLines = lines ?? text.split('\n');
  const show = immediate || inView;
  const flat = resolvedLines.join(' ');

  if (reduced) {
    return (
      <Tag id={id} className={className} style={style}>
        {resolvedLines.map((line, index) => (
          <span key={`${line}-${index}`} className="block">
            {line}
          </span>
        ))}
        {children}
      </Tag>
    );
  }

  const unit = (value: string, key: string, order: number): ReactNode => (
    <span
      key={key}
      className={cn(
        'inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]',
        mode === 'words' && 'mr-[0.26em]',
      )}
    >
      <motion.span
        className="inline-block will-change-transform"
        initial={{ y: '112%' }}
        animate={show ? { y: '0%' } : { y: '112%' }}
        transition={{ duration: 1, ease: EASE, delay: delay + order * stagger }}
      >
        {value}
      </motion.span>
    </span>
  );

  return (
    <Tag ref={ref as never} id={id} className={className} style={style}>
      <span className="sr-only">{flat}</span>
      <span aria-hidden="true">
        {resolvedLines.map((line, lineIndex) => {
          const words = mode === 'words' ? line.split(' ').filter(Boolean) : [line];
          return (
            <span key={`${line}-${lineIndex}`} className={cn('block', lineClassName)}>
              {words.map((word, wordIndex) => unit(word, `${lineIndex}-${wordIndex}`, lineIndex + wordIndex))}
            </span>
          );
        })}
      </span>
      {children}
    </Tag>
  );
}
