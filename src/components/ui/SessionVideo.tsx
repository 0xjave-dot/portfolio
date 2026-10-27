import { useEffect, useRef } from 'react';
import type { ProjectVideo } from '@/data/projects';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface SessionVideoProps {
  video: ProjectVideo;
  className?: string;
  /** Load the poster eagerly (above the fold). */
  priority?: boolean;
}

/**
 * A recorded browsing session: muted, looping, and only playing while it is on
 * screen. With reduced motion it never autoplays — the poster shows, with
 * controls to play it on request.
 */
export function SessionVideo({ video, className, priority = false }: SessionVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;
    if (typeof IntersectionObserver === 'undefined') {
      void element.play().catch(() => {});
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void element.play().catch(() => {});
        else element.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      width={video.width}
      height={video.height}
      poster={video.poster}
      muted
      loop
      playsInline
      preload={priority ? 'auto' : 'none'}
      controls={reduced}
      aria-label={video.alt}
      className={cn('block h-auto w-full', className)}
    >
      <source src={video.webm} type="video/webm" />
      <source src={video.mp4} type="video/mp4" />
    </video>
  );
}
