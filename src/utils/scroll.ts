/**
 * Scroll-to-top for certificate step navigation — ELE-1464.
 *
 * Three behaviours had grown up across the cert forms: `behavior: 'auto'` on
 * EICR/EIC/Minor Works, `behavior: 'smooth'` on EV charging, Solar PV and the
 * shared CertShellFooter, and a bare `scrollTo({ top: 0 })` on the notice-style
 * certs. Same gesture, three different feels depending on which cert you opened.
 *
 * ## Why stepped forms scroll instantly
 *
 * A smooth scroll takes roughly 300ms. The cert step transition
 * (`animate-mw-step-in`) takes 260ms. Run them together and the new section
 * slides in while the viewport is still travelling — the "little jolt" reported
 * on the EICR. Scrolling instantly BEFORE the step changes removes the race:
 * the new section always renders at the top of the viewport, which is what a
 * native push transition does.
 *
 * So: `smooth` is the default for ordinary "jump back up" affordances, and
 * `instant` is correct wherever the content itself animates. Callers say which
 * they are rather than each inventing their own.
 */

export interface ScrollToTopOptions {
  /**
   * Force an instant jump. Use on stepped forms whose content animates in —
   * see the note above. Defaults to false (smooth).
   */
  instant?: boolean;
  /**
   * Scroll this element instead of the window, for certs that render inside
   * their own scroll container. Falls back to the window when the ref is empty.
   */
  container?: HTMLElement | null;
}

/** True when the user has asked the OS to reduce motion. */
const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** How far down we still count as "already at the top" — avoids a pointless animation. */
const AT_TOP_THRESHOLD_PX = 2;

/**
 * Send the viewport (or `container`) back to the top.
 *
 * No-ops when already there, and downgrades to an instant jump when the user
 * prefers reduced motion. Safe to call during SSR — it simply does nothing.
 */
export const scrollToTop = (options: ScrollToTopOptions = {}): void => {
  if (typeof window === 'undefined') return;

  const { instant = false, container = null } = options;
  const target = container ?? null;

  const currentTop = target ? target.scrollTop : window.scrollY || window.pageYOffset || 0;
  if (currentTop <= AT_TOP_THRESHOLD_PX) return;

  const behavior: ScrollBehavior = instant || prefersReducedMotion() ? 'auto' : 'smooth';

  if (target) {
    target.scrollTo({ top: 0, behavior });
    return;
  }
  window.scrollTo({ top: 0, behavior });
};

/**
 * Convenience for step/tab changes on a cert form.
 *
 * Call this BEFORE applying the state change so the viewport is already at the
 * top when the new section animates in.
 */
export const scrollToTopForStepChange = (container?: HTMLElement | null): void =>
  scrollToTop({ instant: true, container });
