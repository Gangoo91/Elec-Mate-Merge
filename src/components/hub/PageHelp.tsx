import { useEffect, useState, type ReactNode } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';

/* ==========================================================================
   PageHelp — "what is this page and how do I use it", on any screen.

   Andrew, 6 Oct 2026: "tell them what it is and how to use it… maybe a
   question mark at top or hint", and "we should do that with most pages".
   ELE-1980 (in-app help for college staff).

   Two pieces, one content object:
     <PageHelpButton help={HELP} />   a round "?" by the page title that
                                       opens the full explanation in a sheet
     <HowItWorks help={HELP} />       a three-step strip under the title for
                                       first visits; dismissible, remembered
                                       per page on this device
   Write the content once per page as a PageHelpContent constant.
   ========================================================================== */

export interface PageHelpContent {
  /** Stable id for remembering "dismissed" (e.g. 'college-evidence-pack'). */
  id: string;
  /** Sheet title, e.g. "The evidence pack". */
  title: string;
  /** One or two sentences: what this page is for. */
  what: ReactNode;
  /** Three to five steps: how to use it. The first three show in the strip. */
  steps: Array<{ title: string; body: ReactNode }>;
  /** Optional extra notes (what the colours mean, who sees what). */
  notes?: Array<{ title: string; body: ReactNode }>;
  /** Optional colour key, shown as swatches (status colours, chart keys). */
  legend?: Array<{ swatch: string; label: string; body?: ReactNode }>;
  /** Where the rules come from, shown last. */
  source?: ReactNode;
}

const storageKey = (id: string) => `page-help-dismissed:${id}`;

function readDismissed(id: string) {
  try {
    return window.localStorage.getItem(storageKey(id)) === '1';
  } catch {
    return false;
  }
}

export function PageHelpButton({
  help,
  className,
  compact,
}: {
  help: PageHelpContent;
  className?: string;
  /** For a masthead's trailing slot: no ring, sized to the 48px bar. */
  compact?: boolean;
}) {
  // ?help=1 opens the guide (a link from support or a tour can point at it).
  const [open, setOpen] = useState(() => {
    try {
      return new URLSearchParams(window.location.search).get('help') === '1';
    } catch {
      return false;
    }
  });
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`How ${help.title.toLowerCase()} works`}
        title="How this page works"
        className={cn(
          'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:text-elec-yellow',
          compact ? 'hover:bg-white/[0.06]' : 'border border-white/[0.14] hover:border-elec-yellow',
          className
        )}
      >
        <HelpCircle className="h-5 w-5" aria-hidden="true" />
      </button>
      <PageHelpSheet help={help} open={open} onOpenChange={setOpen} />
    </>
  );
}

export function PageHelpSheet({
  help,
  open,
  onOpenChange,
}: {
  help: PageHelpContent;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const card = 'rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5';
  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      bodyClassName="space-y-9"
      eyebrow="How this page works"
      title={help.title}
      footer={
        <div className="flex justify-end">
          <button type="button" onClick={() => onOpenChange(false)} className={cn(buttonPrimaryCn, 'w-full px-10 sm:w-auto')}>
            Got it
          </button>
        </div>
      }
    >
      <p className="max-w-4xl text-[16px] leading-relaxed text-white sm:text-[18px]">{help.what}</p>

      <section>
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">How to use it</h3>
        <ol className={cn('grid gap-3 sm:grid-cols-2', help.steps.length >= 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3')}>
          {help.steps.map((st, i) => (
            <li key={st.title} className={card}>
              <span className="text-[32px] font-bold leading-none tabular-nums text-elec-yellow">{i + 1}</span>
              <span className="mt-3 block text-[16px] font-semibold text-white">{st.title}</span>
              <span className="mt-1.5 block text-[14px] leading-relaxed text-white">{st.body}</span>
            </li>
          ))}
        </ol>
      </section>

      {(help.legend?.length || help.notes?.length) && (
        <section className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
          {help.legend?.length ? (
            <div className={card}>
              <h3 className="text-[15px] font-semibold text-white">What the colours mean</h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {help.legend.map((l) => (
                  <li key={l.label} className="flex gap-3">
                    <span className={cn('mt-0.5 h-5 w-5 shrink-0 rounded-[5px]', l.swatch)} />
                    <span className="min-w-0">
                      <span className="block text-[14px] font-semibold text-white">{l.label}</span>
                      {l.body && <span className="block text-[13px] leading-snug text-white">{l.body}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {help.notes?.map((n) => (
            <div key={n.title} className={card}>
              <h3 className="text-[15px] font-semibold text-white">{n.title}</h3>
              <div className="mt-2 text-[14px] leading-relaxed text-white">{n.body}</div>
            </div>
          ))}
        </section>
      )}

      {help.source && (
        <div className="flex flex-col gap-1 border-t border-white/[0.08] pt-5 sm:flex-row sm:gap-6">
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">Source</span>
          <p className="max-w-4xl text-[13px] leading-relaxed text-white">{help.source}</p>
        </div>
      )}
    </FormSheet>
  );
}

/** First-visit strip: the first three steps, dismissible and remembered. */
export function HowItWorks({ help }: { help: PageHelpContent }) {
  const [hidden, setHidden] = useState(true);
  const [open, setOpen] = useState(false);
  useEffect(() => setHidden(readDismissed(help.id)), [help.id]);
  if (hidden) return null;
  const dismiss = () => {
    try {
      window.localStorage.setItem(storageKey(help.id), '1');
    } catch {
      /* private mode: just hide for now */
    }
    setHidden(true);
  };
  return (
    <section className="relative -mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-4 py-5 sm:mx-0 sm:rounded-3xl sm:border-x sm:px-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">How it works</p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Hide how it works"
          className="-mr-2 -mt-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-white touch-manipulation hover:bg-white/[0.06]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <ol className="mt-1 grid gap-4 sm:grid-cols-3 sm:gap-6">
        {help.steps.slice(0, 3).map((s, i) => (
          <li key={s.title} className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-elec-yellow text-[13px] font-bold text-elec-yellow">
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className="block text-[14.5px] font-semibold text-white">{s.title}</span>
              <span className="mt-0.5 block text-[13px] leading-relaxed text-white">{s.body}</span>
            </span>
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation"
      >
        Read the full guide
      </button>
      <PageHelpSheet help={help} open={open} onOpenChange={setOpen} />
    </section>
  );
}
