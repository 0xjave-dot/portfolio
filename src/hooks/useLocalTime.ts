import { useEffect, useState } from 'react';
import { formatLagosOffset, formatLagosTime } from '@/lib/utils';

export interface LocalTime {
  time: string;
  offset: string;
}

/** Live Africa/Lagos clock, ticking once a second. */
export function useLocalTime(): LocalTime {
  const [state, setState] = useState<LocalTime>(() => {
    const now = new Date();
    return { time: formatLagosTime(now), offset: formatLagosOffset(now) };
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      const now = new Date();
      setState({ time: formatLagosTime(now), offset: formatLagosOffset(now) });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return state;
}
