import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { pathOf, recordNavigation, rememberScroll, savedScroll } from '@/lib/navHistory';

/**
 * Scroll on navigation, and record where each page was opened from (for
 * useSmartBack in `@/lib/navHistory`).
 *
 * Everywhere: a new pathname starts at the top.
 *
 * College and apprentice areas (8 Oct 2026), where one path holds many
 * screens (`/college?section=…&studentId=…`):
 *   - a new screen starts at the top, including a new section or learner;
 *   - going back (browser or a Back button) returns to the scroll position the
 *     page was left at, waiting for slow content to grow tall enough and settle;
 *   - a link to an anchor (`#ilp`) is left to the page, which scrolls to it;
 *   - a filter or tab that replaces the address in place does not jump.
 */
const AREA = /^\/(college|apprentice)(\/|$)/;
const SCREEN_PARAMS = ['section', 'studentId', 'id', 'tab'];

const screenOf = (search: string) => {
  const p = new URLSearchParams(search);
  return SCREEN_PARAMS.map((k) => p.get(k) ?? '').join('|');
};

const ScrollToTop = () => {
  const location = useLocation();
  const kind = useNavigationType();
  const prev = useRef<{ key: string; pathname: string; search: string } | null>(null);

  // Keep the current entry's scroll position: as the reader scrolls, and at
  // the moment they tap, press a key or use the browser's back (before the
  // page changes, so a quick tap right after scrolling still counts).
  useEffect(() => {
    const key = location.key;
    let t: number | undefined;
    const now = () => {
      window.clearTimeout(t);
      rememberScroll(key, window.scrollY);
    };
    const onScroll = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => rememberScroll(key, window.scrollY), 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointerdown', now, { capture: true, passive: true });
    window.addEventListener('keydown', now, { capture: true });
    window.addEventListener('popstate', now, { capture: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointerdown', now, { capture: true });
      window.removeEventListener('keydown', now, { capture: true });
      window.removeEventListener('popstate', now, { capture: true });
    };
  }, [location.key]);

  useEffect(() => {
    const before = prev.current;
    recordNavigation(location.key, pathOf(location), kind, before?.key ?? null);
    prev.current = { key: location.key, pathname: location.pathname, search: location.search };

    const inArea = AREA.test(location.pathname);
    try {
      window.history.scrollRestoration = inArea ? 'manual' : 'auto';
    } catch {
      /* not supported */
    }

    if (!inArea) {
      if (!before || before.pathname !== location.pathname) window.scrollTo(0, 0);
      return;
    }

    if (kind === 'POP') {
      const target = savedScroll(location.key);
      if (target <= 0) {
        window.scrollTo(0, 0);
        return;
      }
      // Content loads after the route renders; wait (up to 6s: college wi-fi and
      // slow phones) until the page
      // is tall enough, and stop if the reader starts scrolling themselves.
      let cancelled = false;
      const cancel = () => (cancelled = true);
      window.addEventListener('wheel', cancel, { passive: true, once: true });
      window.addEventListener('touchstart', cancel, { passive: true, once: true });
      window.addEventListener('keydown', cancel, { once: true });
      const started = performance.now();
      let raf = 0;
      // Hold the position until the page stops growing: restoring as soon as
      // there was room, then letting cards above load in, pushed the page
      // (scroll anchoring) hundreds of pixels past where it was left.
      let lastHeight = -1;
      let steadySince = started;
      const tryRestore = () => {
        if (cancelled) return;
        const now = performance.now();
        const height = document.documentElement.scrollHeight;
        if (height !== lastHeight) {
          lastHeight = height;
          steadySince = now;
        }
        const room = height - window.innerHeight;
        window.scrollTo(0, Math.min(target, Math.max(0, room)));
        if ((room >= target && now - steadySince > 600) || now - started > 6000) return;
        raf = requestAnimationFrame(tryRestore);
      };
      raf = requestAnimationFrame(tryRestore);
      return () => {
        cancelled = true;
        cancelAnimationFrame(raf);
        window.removeEventListener('wheel', cancel);
        window.removeEventListener('touchstart', cancel);
        window.removeEventListener('keydown', cancel);
      };
    }

    const newScreen =
      !before ||
      before.pathname !== location.pathname ||
      screenOf(before.search) !== screenOf(location.search);
    if (location.hash) {
      // A hash is either a place on the page (#coverage) or a sheet to open
      // (#messages). A new screen starts at the top either way; a real anchor
      // is then scrolled to (pages that place it themselves, later, still win).
      if (!newScreen) return;
      window.scrollTo(0, 0);
      const id = decodeURIComponent(location.hash.slice(1));
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
      return;
    }
    if (kind === 'PUSH' ? newScreen || before?.search !== location.search : newScreen) {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  return null;
};

export default ScrollToTop;
