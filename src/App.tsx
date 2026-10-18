import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Cursor } from '@/components/cursor/Cursor';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { PageCurtain } from '@/components/layout/PageCurtain';
import { Preloader } from '@/components/layout/Preloader';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { SmoothScroll, useScrollReset } from '@/components/providers/SmoothScroll';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Terminal } from '@/components/terminal/Terminal';
import Home from '@/pages/Home';

const CaseStudy = lazy(() => import('@/pages/CaseStudy'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[140] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:font-mono focus:text-[0.65rem] focus:uppercase focus:tracking-[0.16em] focus:text-[#0A0A0B]"
    >
      Skip to content
    </a>
  );
}

function RouteFallback() {
  return (
    <div className="flex min-h-[100svh] items-center justify-center">
      <span className="label animate-pulse">Loading</span>
    </div>
  );
}

function Shell() {
  const location = useLocation();
  useScrollReset(location.pathname);

  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <Preloader />
      <Cursor />
      <PageCurtain />
      <Navbar />
      <Terminal />

      <main id="main" className="relative z-10 bg-paper">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<RouteFallback />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/work/:slug" element={<CaseStudy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <Shell />
      </SmoothScroll>
    </ThemeProvider>
  );
}
