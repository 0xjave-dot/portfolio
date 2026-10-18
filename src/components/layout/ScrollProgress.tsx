import { motion, useScroll, useSpring } from 'framer-motion';

/** Hairline scroll progress at the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.2 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[76] h-[2px] w-full origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
