import { useEffect, useState } from 'react';
import { intro } from '@/lib/intro';

/** True once the preloader has lifted (immediately if it was skipped). */
export function useIntroComplete(): boolean {
  const [done, setDone] = useState(() => intro.isComplete());

  useEffect(() => {
    if (intro.isComplete()) {
      setDone(true);
      return;
    }
    return intro.subscribe(() => setDone(true));
  }, []);

  return done;
}
