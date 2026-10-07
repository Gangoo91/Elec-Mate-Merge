import { useEffect, useRef } from 'react';

/* ==========================================================================
   useDeepLinkFocus — land a notification tap on the exact row.

   A notification link names the item (`?focus=<id>`, `?entry=<id>`, …). The
   page marks each row with `data-focus-id="<id>"`; this hook waits for that
   row to render (data loads after the route does), scrolls it to the middle
   of the screen and rings it for a few seconds so the eye finds it.

   Waits up to ~10s, then gives up quietly: an item that has since been
   deleted leaves the user on the right page, just without the ring.
   ========================================================================== */

const RING = ['ring-2', 'ring-elec-yellow', 'ring-inset', 'transition-shadow'];

export function focusSelector(id: string): string {
  const safe = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(id) : id.replace(/"/g, '');
  return `[data-focus-id="${safe}"]`;
}

/**
 * @param id     the item to find, or null for none
 * @param ready  false while the list is still loading (the hook waits)
 */
export function useDeepLinkFocus(id: string | null | undefined, ready = true): void {
  const done = useRef<string | null>(null);

  useEffect(() => {
    if (!id || !ready || done.current === id) return;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let clear: ReturnType<typeof setTimeout> | null = null;

    const tryFocus = () => {
      const el = document.querySelector<HTMLElement>(focusSelector(id));
      if (el) {
        done.current = id;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add(...RING);
        clear = setTimeout(() => el.classList.remove(...RING), 4000);
        return;
      }
      attempts += 1;
      if (attempts < 40) timer = setTimeout(tryFocus, 250);
    };
    tryFocus();
    return () => {
      if (timer) clearTimeout(timer);
      if (clear) clearTimeout(clear);
    };
  }, [id, ready]);
}
