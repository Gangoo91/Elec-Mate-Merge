import { useState } from 'react';
import { X } from 'lucide-react';

const KEY = 'employer-hub-in-dev-dismissed';

/**
 * Sections that are genuinely unfinished and should say so. Empty on
 * purpose (ELE-1819): the banner told every paying customer on every hub page
 * that the product was not finished. Add a section key here, deliberately, to
 * show the strip on that page only. The Overview carries a one-line "new and
 * still growing" note with the feedback link instead.
 */
const IN_DEVELOPMENT_SECTIONS: ReadonlySet<string> = new Set<string>([]);

/**
 * A slim, single-line, dismissible strip for a section listed above.
 * Dismissal is sessionStorage: it stops nagging during a visit and comes back
 * next time, so the expectation is reset rather than permanently hidden.
 */
export function InDevelopmentBanner({ section }: { section?: string }) {
  const [open, setOpen] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) !== '1';
    } catch {
      // Private windows and blocked site data both throw on access.
      return true;
    }
  });

  if (!open || !section || !IN_DEVELOPMENT_SECTIONS.has(section)) return null;

  const dismiss = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* nothing to persist to; it simply returns on the next visit */
    }
  };

  return (
    <div className="border-b border-white/[0.1] bg-white/[0.04]">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <p className="min-w-0 flex-1 truncate py-2 text-[13px] text-white">
          <span className="font-semibold text-elec-yellow">Beta</span> · This page is still being
          built.{' '}
          <a
            href="mailto:founder@elec-mate.com?subject=Employer%20Hub%20feedback"
            className="font-semibold text-elec-yellow underline underline-offset-2"
          >
            Tell Andrew
          </a>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Hide this notice"
          className="-mr-3 h-11 w-11 shrink-0 flex items-center justify-center rounded-lg text-white hover:bg-white/5 touch-manipulation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
