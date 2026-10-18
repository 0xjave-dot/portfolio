import { useEffect } from 'react';
import { applyPageMeta } from '@/lib/seo';
import type { PageMeta } from '@/lib/seo';

export function usePageMeta(meta: PageMeta): void {
  useEffect(() => {
    applyPageMeta(meta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.title, meta.description, meta.path, meta.image, meta.type]);
}
