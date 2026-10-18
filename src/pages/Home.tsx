import { Suspense, lazy } from 'react';
import { About } from '@/components/sections/About';
import { Hero } from '@/components/sections/Hero';
import { MarqueeStrip } from '@/components/sections/MarqueeStrip';
import { Work } from '@/components/sections/Work';
import { Deferred } from '@/components/ui/Deferred';
import { site } from '@/data/site';
import { usePageMeta } from '@/hooks/usePageMeta';

/**
 * Below-the-fold sections are split into their own chunks and mounted when they
 * get close to the viewport. The hero, the work section and the about section are
 * the only things in the critical path.
 */
const Services = lazy(() => import('@/components/sections/Services').then((m) => ({ default: m.Services })));
const Process = lazy(() => import('@/components/sections/Process').then((m) => ({ default: m.Process })));
const Testimonials = lazy(() =>
  import('@/components/sections/Testimonials').then((m) => ({ default: m.Testimonials })),
);
const Contact = lazy(() => import('@/components/sections/Contact').then((m) => ({ default: m.Contact })));

export default function Home() {
  usePageMeta({ title: site.title, description: site.description, path: '/' });

  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Work />
      <About />
      <Deferred minHeight="80vh">
        <Suspense fallback={null}>
          <Services />
        </Suspense>
      </Deferred>
      <Deferred minHeight="80vh">
        <Suspense fallback={null}>
          <Process />
        </Suspense>
      </Deferred>
      <Deferred minHeight="60vh">
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>
      </Deferred>
      <Deferred minHeight="90vh">
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </Deferred>
    </>
  );
}
