import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ==========================================================================
   GuidedTour — "Show me" over the real screen.

   Dims the page, spotlights the actual button / tab / field (found by its
   data-help="<page>.<target>" attribute) and shows a short caption with
   Back / Next / Done. A step can open a sheet or tab for the person (opens:
   true clicks the target when they press Next), and the next step waits for
   its target to appear, so a tour carries on inside the sheet it opened.
   If the person taps the spotlit control themselves, the tour moves on.

   A target that is not on screen (a role that cannot see it, an empty list)
   never breaks the tour: optional steps are skipped, others show the caption
   with a "not on screen right now" note.
   ========================================================================== */

export interface TourStep {
  /** The data-help value of the element to spotlight, e.g. 'timesheets.approve-all'. */
  target: string;
  /** Short caption, e.g. "Tap Approve all clean". */
  caption: string;
  /** Pressing Next clicks the target for them (opens a sheet, tab or menu). */
  opens?: boolean;
  /** Skip silently when the target is not on screen. */
  optional?: boolean;
  /**
   * Narrow to the control inside the target whose text starts with this,
   * e.g. target 'timesheets.tabs' + text 'Pending' spotlights the Pending tab.
   */
  text?: string;
}

const WAIT_MS = 2500;

function find(target: string, text?: string): HTMLElement | null {
  try {
    const all = Array.from(
      document.querySelectorAll<HTMLElement>(`[data-help="${CSS.escape(target)}"]`)
    );
    // Prefer one that is actually visible (a phone and a desktop copy can both exist).
    const visible = all.filter((el) => rectOf(el).width > 0);
    if (!text) return visible[0] ?? null;
    const want = text.toLowerCase();
    for (const root of visible) {
      const hit = Array.from(
        root.querySelectorAll<HTMLElement>('button, a, [role="tab"], [role="button"], label')
      ).find(
        (el) =>
          el.getBoundingClientRect().width > 0 &&
          (el.innerText || el.getAttribute('aria-label') || '').trim().toLowerCase().startsWith(want)
      );
      if (hit) return hit;
    }
    return null;
  } catch {
    return null;
  }
}

function rectOf(el: HTMLElement): DOMRect {
  const r = el.getBoundingClientRect();
  if (r.width > 0 && r.height > 0) return r;
  // A display:contents wrapper has no box: use its first child.
  const child = el.firstElementChild as HTMLElement | null;
  return child ? child.getBoundingClientRect() : r;
}

function clickable(el: HTMLElement): HTMLElement {
  if (
    el.matches('button, a, input, select, textarea, [role="tab"], [role="button"], [role="switch"]')
  )
    return el;
  return (
    el.querySelector<HTMLElement>(
      'button, a, input, select, textarea, [role="tab"], [role="button"], [role="switch"]'
    ) ?? el
  );
}

export function GuidedTour({ steps, onClose }: { steps: TourStep[]; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [searching, setSearching] = useState(true);
  const dir = useRef<1 | -1>(1);
  const step = steps[index];
  const last = index === steps.length - 1;

  const go = useCallback(
    (to: number) => {
      if (to < 0) return;
      if (to >= steps.length) return onClose();
      setIndex(to);
    },
    [steps.length, onClose]
  );

  // Find this step's target, waiting for a sheet or tab to open.
  useEffect(() => {
    if (!step) return;
    let live = true;
    setSearching(true);
    setEl(null);
    setRect(null);
    const started = Date.now();
    const tick = () => {
      if (!live) return;
      const found = find(step.target, step.text);
      if (found) {
        found.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
        setEl(found);
        setSearching(false);
        return;
      }
      if (Date.now() - started > WAIT_MS) {
        setSearching(false);
        if (step.optional) go(index + dir.current);
        return;
      }
      window.setTimeout(tick, 120);
    };
    tick();
    return () => {
      live = false;
    };
  }, [step, index, go]);

  // Keep the spotlight on the element while things scroll and animate.
  useLayoutEffect(() => {
    if (!el) {
      setRect(null);
      return;
    }
    let raf = 0;
    let live = true;
    const measure = () => {
      if (!el.isConnected) {
        const again = step ? find(step.target, step.text) : null;
        if (again && again !== el) setEl(again);
        return;
      }
      const r = rectOf(el);
      setRect((prev) =>
        prev &&
        prev.top === r.top &&
        prev.left === r.left &&
        prev.width === r.width &&
        prev.height === r.height
          ? prev
          : r
      );
    };
    const loop = () => {
      if (!live) return;
      measure();
      raf = window.requestAnimationFrame(loop);
    };
    loop();
    return () => {
      live = false;
      window.cancelAnimationFrame(raf);
    };
  }, [el, step]);

  // Tapping the spotlit control yourself moves the tour on.
  useEffect(() => {
    if (!el) return;
    const onTap = () => window.setTimeout(() => go(index + 1), 250);
    el.addEventListener('click', onTap);
    return () => el.removeEventListener('click', onTap);
  }, [el, index, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);

  if (!step) return null;

  const next = () => {
    dir.current = 1;
    if (step.opens && el) {
      clickable(el).click(); // the tap listener advances
      return;
    }
    go(index + 1);
  };
  const back = () => {
    dir.current = -1;
    go(index - 1);
  };

  const pad = 6;
  const missing = !searching && !el;
  // Caption sits at the bottom unless the target is down there.
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const captionTop = rect ? rect.top + rect.height / 2 > vh * 0.6 : false;

  // Radix sheets mark everything outside them as inert to the pointer and
  // close on an outside press, so the tour stops its own presses bubbling.
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return createPortal(
    <div className="fixed inset-0 z-[300]" style={{ pointerEvents: 'none' }} data-guided-tour="">
      {rect ? (
        <div
          aria-hidden
          className="absolute rounded-xl ring-2 ring-elec-yellow transition-all duration-200"
          style={{
            top: rect.top - pad,
            left: rect.left - pad,
            width: rect.width + pad * 2,
            height: rect.height + pad * 2,
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.72)',
          }}
        />
      ) : (
        <div aria-hidden className="absolute inset-0 bg-black/70" />
      )}

      <div
        role="dialog"
        aria-live="polite"
        aria-label="Guided tour"
        onPointerDown={stop}
        onMouseDown={stop}
        onClick={stop}
        onFocusCapture={stop}
        style={{ pointerEvents: 'auto' }}
        className={cn(
          'absolute inset-x-3 mx-auto max-w-md rounded-2xl border border-white/[0.14] bg-[#141414] p-4 shadow-2xl sm:inset-x-6',
          captionTop ? 'top-3' : 'bottom-3',
          'pb-[max(1rem,env(safe-area-inset-bottom))]'
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
            Step {index + 1} of {steps.length}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="End the tour"
            className="-mr-2 -mt-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-white touch-manipulation hover:bg-white/[0.06]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-1 text-[16px] font-semibold leading-snug text-white" data-tour-caption="">
          {step.caption}
        </p>
        {searching && <p className="mt-1 text-[13px] text-white">Finding it on screen…</p>}
        {missing && (
          <p className="mt-1 text-[13px] leading-snug text-white">
            Not on screen right now. It shows once there is something to act on, or for the people
            allowed to do it.
          </p>
        )}
        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={back}
            disabled={index === 0}
            className="h-11 rounded-full px-4 text-[14px] font-semibold text-white touch-manipulation disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            onClick={last && !step.opens ? onClose : next}
            className="h-11 rounded-full bg-elec-yellow px-6 text-[14px] font-semibold text-black touch-manipulation"
          >
            {last && !step.opens ? 'Done' : step.opens && el ? 'Open it for me' : 'Next'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
