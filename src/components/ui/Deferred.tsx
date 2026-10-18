import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface DeferredProps {
  children: ReactNode;
  /**
   * Anchor id. It lives on this wrapper (which is always in the DOM) rather than
   * on the section inside, so nav links and scroll-spy work before the section
   * has been mounted.
   */
  id?: string;
  /** Space reserved before the section mounts, so the scroll position stays put. */
  minHeight?: string;
}

/**
 * Mounts its children (usually a lazily imported section) only when it is within
 * ~1.2 viewports of the viewport. Keeps the first paint to the hero and the work
 * section, and lets the rest of the page stream in before it is seen.
 *
 * Emits `edge:layout` once mounted so ScrollTrigger can re-measure the document.
 */
export function Deferred({ children, id, minHeight = '70vh' }: DeferredProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: '120% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [show]);

  useEffect(() => {
    if (!show) return;
    window.dispatchEvent(new Event('edge:layout'));
  }, [show]);

  // A nav jump asks the target section to mount before the scroll starts.
  useEffect(() => {
    if (!id || show) return;
    const onReveal = (event: Event) => {
      if ((event as CustomEvent<string>).detail === id) setShow(true);
    };
    window.addEventListener('edge:reveal', onReveal);
    return () => window.removeEventListener('edge:reveal', onReveal);
  }, [id, show]);

  return (
    <div id={id} ref={ref} style={show ? undefined : { minHeight }}>
      {show ? children : null}
    </div>
  );
}
