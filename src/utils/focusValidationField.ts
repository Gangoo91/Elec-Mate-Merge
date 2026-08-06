/**
 * Take the electrician to the field that is wrong (ELE-1487).
 *
 * The missing-items sheet has always been able to say *what* is outstanding and
 * *which step* it lives on, then leave you to find it — on a form with sixty
 * fields across five steps. Switching tab is not arriving.
 *
 * Fields are located by the `data-field` attribute the forms already carry.
 * Switching tab unmounts and remounts a step, so the target does not exist at
 * the moment of the click; this polls briefly rather than guessing at a delay.
 */

/**
 * How long to keep trying, in milliseconds.
 *
 * Generous because three things have to finish first: the sheet's close
 * animation, Radix releasing the page, and React remounting the step. Each is
 * polled for rather than assumed, so the budget is only ever a backstop.
 */
const MAX_WAIT_MS = 3000;
const POLL_MS = 60;

/**
 * True while an overlay is still open and holding focus.
 *
 * Deliberately keyed on an *open* dialog only. Radix also marks the rest of the
 * page with `aria-hidden`/`data-aria-hidden`, but measurement showed those
 * markers are **left behind** after this sheet closes — they never clear. An
 * earlier version of this guard waited for them and therefore waited forever,
 * which is why the jump silently did nothing.
 *
 * (That lingering `aria-hidden` on the app root is a real accessibility defect
 * in its own right — the whole app disappears from a screen reader once this
 * sheet has been opened. Tracked separately; it must not gate focus here.)
 */
const pageHeldByOverlay = (): boolean =>
  document.querySelector('[role="dialog"][data-state="open"]') !== null;

/**
 * How long to let a step's slide-in finish before correcting the scroll.
 * The step transition is 260ms; this clears it with a margin.
 */
const SETTLE_MS = 420;

/** How long the highlight stays on, in milliseconds. */
const FLASH_MS = 1600;

const findField = (field: string): HTMLElement | null =>
  document.querySelector<HTMLElement>(`[data-field="${CSS.escape(field)}"]`);

/**
 * Focus a control, or the first focusable thing inside it.
 *
 * Not every field is an input — earthing arrangement is a chip group, the
 * signature is a canvas. Focusing the wrapper is still the right outcome:
 * it scrolls into view and takes the highlight.
 */
const focusTarget = (el: HTMLElement): void => {
  const focusable = el.matches('input, textarea, select, button')
    ? el
    : el.querySelector<HTMLElement>(
        'input:not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled])'
      );

  (focusable ?? el).focus?.({ preventScroll: true });
  if (focusable instanceof HTMLInputElement) focusable.select?.();
};

/**
 * A brief ring around the field so the eye lands on it.
 *
 * Applied as inline styles rather than a class so it cannot be defeated by the
 * cascade on a control that already carries a focus ring, and cleaned up after.
 */
const flash = (el: HTMLElement): void => {
  const previous = {
    outline: el.style.outline,
    outlineOffset: el.style.outlineOffset,
    borderRadius: el.style.borderRadius,
    transition: el.style.transition,
  };
  el.style.transition = 'outline-color 200ms ease';
  el.style.outline = '2px solid hsl(var(--elec-yellow, 48 96% 53%))';
  el.style.outlineOffset = '3px';
  if (!el.style.borderRadius) el.style.borderRadius = '10px';

  window.setTimeout(() => {
    el.style.outline = previous.outline;
    el.style.outlineOffset = previous.outlineOffset;
    el.style.borderRadius = previous.borderRadius;
    el.style.transition = previous.transition;
  }, FLASH_MS);
};

/**
 * Scroll to, focus and highlight a field.
 *
 * Resolves true when the field was found. False means the form does not carry a
 * `data-field` for it — the caller has still changed tab, so the user is at
 * least on the right step, and the panel should not pretend otherwise.
 */
export const focusValidationField = (field: string): Promise<boolean> =>
  new Promise((resolve) => {
    if (!field || typeof document === 'undefined') {
      resolve(false);
      return;
    }

    const started = Date.now();

    const attempt = () => {
      // Wait for the overlay to release the page before touching focus.
      if (pageHeldByOverlay()) {
        if (Date.now() - started < MAX_WAIT_MS) {
          window.setTimeout(attempt, POLL_MS);
          return;
        }
        resolve(false);
        return;
      }

      const el = findField(field);
      if (el) {
        focusTarget(el);

        // Changing step re-renders, and React can replace the very node we just
        // focused — focus then falls back to <body> and the user lands nowhere.
        // Confirm it stuck, and if the node was swapped underneath us, go round
        // again against the replacement.
        window.setTimeout(() => {
          const settled = findField(field);
          const holdsFocus =
            settled != null &&
            (document.activeElement === settled || settled.contains(document.activeElement));

          if (holdsFocus) {
            // One scroll, and not until focus has settled.
            //
            // An earlier version fired a smooth scroll here and a corrective
            // one after the step's slide-in. On a long step — the main
            // protective device sits ~2000px down — the second call landed
            // while the first was still animating, and the in-flight smooth
            // scroll then carried on and undid it. Two scrolls fighting is
            // worse than one that is simply late.
            //
            // `preventScroll` on the focus means nothing has moved yet, so this
            // is the only thing that scrolls, and it starts from a settled
            // layout after the transition has finished.
            window.setTimeout(() => {
              // `auto`, not `smooth`. Smooth scrolling is animation-driven, so
              // the browser does not run it when the window is unfocused or the
              // tab is backgrounded — the same trap that made an rAF-driven
              // version of this never start at all. Measured: `smooth` left the
              // page at scrollY 67 with the field 1993px down; `auto` lands it
              // dead centre every time.
              //
              // It is also the better behaviour. The electrician tapped "Go" on
              // a named field; arriving is the point, and a 2000px glide is
              // just latency between the tap and the answer.
              (findField(field) ?? settled).scrollIntoView({
                behavior: 'auto',
                block: 'center',
              });
            }, SETTLE_MS);
            flash(settled);
            resolve(true);
            return;
          }
          if (Date.now() - started >= MAX_WAIT_MS) {
            // Out of budget. The caller has still changed step, so the user is
            // on the right page — better than pretending we arrived.
            if (settled) flash(settled);
            resolve(false);
            return;
          }
          attempt();
        }, POLL_MS);
        return;
      }
      if (Date.now() - started >= MAX_WAIT_MS) {
        resolve(false);
        return;
      }
      window.setTimeout(attempt, POLL_MS);
    };

    // A timer, not requestAnimationFrame. rAF is paused while the window is
    // unfocused or the tab is in the background, so an rAF-driven jump silently
    // never starts — which is exactly how this failed the first time. Timers
    // are throttled in the background but they do run.
    window.setTimeout(attempt, 0);
  });

/** True when the form carries a target for this field. */
export const canFocusValidationField = (field: string): boolean => Boolean(findField(field));
