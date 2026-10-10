import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { HelpCircle, MessageCircle, PlayCircle, X } from 'lucide-react';
import { GuidedTour, type TourStep } from '@/components/hub/GuidedTour';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn } from '@/components/forms/fieldStyles';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

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
  /**
   * Optional full guide: "How to …" tasks, each with numbered steps that name
   * the real buttons, and who can do it where roles differ. Shown in the sheet
   * only (never in the strip).
   */
  tasks?: Array<{
    title: string;
    steps: ReactNode[];
    who?: ReactNode;
    after?: ReactNode;
    /** "Show me": an on-screen walkthrough over the real controls (data-help targets). */
    tour?: TourStep[];
  }>;
  /** Optional extra notes (what the colours mean, who sees what). */
  notes?: Array<{ title: string; body: ReactNode }>;
  /** Optional colour key, shown as swatches (status colours, chart keys). */
  legend?: Array<{ swatch: string; label: string; body?: ReactNode }>;
  /** Where the rules come from, shown last. */
  source?: ReactNode;
}

/** Something on the page that blocks a task right now, with a way to fix it. */
export interface HelpBlocker {
  text: ReactNode;
  fixLabel?: string;
  onFix?: () => void;
}

/** Page context handed to "Ask Mate about this page". */
export interface PageAskContext {
  page: string;
  tab?: string;
  summary?: string;
}
export type PageAskHandler = (ctx: PageAskContext) => void;

/**
 * A hub can provide one onAsk for every page in it (e.g. the Employer Hub
 * opening Employer Mate); a page can still pass its own.
 */
const PageHelpAskContext = createContext<PageAskHandler | undefined>(undefined);
export const PageHelpAskProvider = PageHelpAskContext.Provider;

interface LiveHelpProps {
  /** Live "Before you start" lines from the page's own state. */
  blockers?: HelpBlocker[];
  /** "Ask Mate about this page"; falls back to PageHelpAskProvider. */
  onAsk?: PageAskHandler;
  /** What the page is showing, for onAsk (page defaults to the help id). */
  askContext?: Partial<PageAskContext>;
}

function BeforeYouStart({ blockers, onDone }: { blockers?: HelpBlocker[]; onDone?: () => void }) {
  if (!blockers?.length) return null;
  return (
    <div
      className="rounded-xl border border-white/[0.1] border-l-4 border-l-orange-400 bg-white/[0.04] px-4 py-3"
      data-help-blockers=""
    >
      <p className="text-[13px] font-semibold text-orange-300">
        Before you start
      </p>
      <ul className="mt-1.5 space-y-2">
        {blockers.map((b, i) => (
          <li
            key={i}
            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-[14px] leading-snug text-white">{b.text}</span>
            {b.onFix && b.fixLabel && (
              <button
                type="button"
                onClick={() => {
                  onDone?.();
                  b.onFix?.();
                }}
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-orange-300/60 px-4 text-[13.5px] font-semibold text-white touch-manipulation hover:border-orange-300"
              >
                {b.fixLabel}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const storageKey = (id: string, userId?: string | null) =>
  userId ? `page-help-dismissed:${userId}:${id}` : `page-help-dismissed:${id}`;

/** Dismissed for this user (or, for strips hidden before it was per user, on this device). */
function readDismissed(id: string, userId?: string | null) {
  try {
    if (userId && window.localStorage.getItem(storageKey(id, userId)) === '1') return true;
    return window.localStorage.getItem(storageKey(id)) === '1';
  } catch {
    return false;
  }
}

export function PageHelpButton({
  help,
  className,
  compact,
  blockers,
  onAsk,
  askContext,
}: {
  help: PageHelpContent;
  className?: string;
  /** For a masthead's trailing slot: no ring, sized to the 48px bar. */
  compact?: boolean;
} & LiveHelpProps) {
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
        data-help="page-help"
        className={cn(
          'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:text-elec-yellow',
          compact ? 'hover:bg-white/[0.06]' : 'border border-white/[0.14] hover:border-elec-yellow',
          className
        )}
      >
        <HelpCircle className="h-5 w-5" aria-hidden="true" />
      </button>
      <PageHelpSheet
        help={help}
        open={open}
        onOpenChange={setOpen}
        blockers={blockers}
        onAsk={onAsk}
        askContext={askContext}
      />
    </>
  );
}

export function PageHelpSheet({
  help,
  open,
  onOpenChange,
  blockers,
  onAsk,
  askContext,
}: {
  help: PageHelpContent;
  open: boolean;
  onOpenChange: (o: boolean) => void;
} & LiveHelpProps) {
  const providedAsk = useContext(PageHelpAskContext);
  const ask = onAsk ?? providedAsk;
  const [tour, setTour] = useState<TourStep[] | null>(null);
  const showMe = (steps: TourStep[]) => {
    onOpenChange(false);
    // Let the sheet slide away before dimming the page.
    window.setTimeout(() => setTour(steps), 350);
  };
  const card =
    'rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5';
  const isCollege = help.id.startsWith('college');

  // ELE-1980: log each opening, so the screens people need help with show up
  // in admin. Fire and forget; a failed log never gets in the way of the help.
  useEffect(() => {
    if (!open) return;
    void supabase
      .from('help_open_events' as never)
      .insert({
        help_id: help.id,
        path: window.location.pathname + window.location.search,
      } as never)
      .then(
        () => undefined,
        () => undefined
      );
  }, [open, help.id]);

  return (
    <>
      {tour && <GuidedTour steps={tour} onClose={() => setTour(null)} />}
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        width="wide"
        bodyClassName="space-y-9"
        eyebrow="How this page works"
        title={help.title}
        footer={
          <div className="flex flex-col-reverse items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
            {isCollege && (
              <Link
                to={`/college/help?screen=${encodeURIComponent(help.title)}#support`}
                onClick={() => onOpenChange(false)}
                className="inline-flex h-11 items-center justify-center px-4 text-[13.5px] font-semibold text-elec-yellow touch-manipulation"
              >
                Still stuck? Message support
              </Link>
            )}
            {ask && (
              <button
                type="button"
                data-help="page-help.ask"
                onClick={() => {
                  onOpenChange(false);
                  ask({ page: help.id, ...askContext });
                }}
                className="inline-flex h-11 items-center justify-center gap-2 px-4 text-[13.5px] font-semibold text-elec-yellow touch-manipulation"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Ask Mate about this page
              </button>
            )}
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(buttonPrimaryCn, 'w-full px-10 sm:w-auto')}
            >
              Got it
            </button>
          </div>
        }
      >
        <BeforeYouStart blockers={blockers} onDone={() => onOpenChange(false)} />

        <p className="max-w-4xl text-[16px] leading-relaxed text-white sm:text-[18px]">
          {help.what}
        </p>

        <section>
          <h3 className="mb-3 text-[13px] font-semibold text-white">
            How to use it
          </h3>
          <ol
            className={cn(
              'grid gap-3 sm:grid-cols-2',
              help.steps.length >= 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3'
            )}
          >
            {help.steps.map((st, i) => (
              <li key={st.title} className={card}>
                <span className="text-[32px] font-bold leading-none tabular-nums text-elec-yellow">
                  {i + 1}
                </span>
                <span className="mt-3 block text-[16px] font-semibold text-white">{st.title}</span>
                <span className="mt-1.5 block text-[14px] leading-relaxed text-white">
                  {st.body}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {help.tasks?.length ? (
          <section>
            <h3 className="mb-3 text-[13px] font-semibold text-white">
              Step by step
            </h3>
            <div className="grid gap-3 lg:grid-cols-2">
              {help.tasks.map((t) => (
                <div key={t.title} className={card}>
                  <h4 className="text-[16px] font-semibold text-white">{t.title}</h4>
                  <ol className="mt-3 space-y-2">
                    {t.steps.map((st, i) => (
                      <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-white">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-elec-yellow text-[12px] font-bold text-elec-yellow">
                          {i + 1}
                        </span>
                        <span className="min-w-0">{st}</span>
                      </li>
                    ))}
                  </ol>
                  {t.after && (
                    <p className="mt-3 text-[13.5px] leading-relaxed text-white">{t.after}</p>
                  )}
                  {t.tour?.length ? (
                    <button
                      type="button"
                      onClick={() => showMe(t.tour!)}
                      data-help-show-me={t.title}
                      className="mt-3 inline-flex h-11 items-center gap-2 rounded-full border border-elec-yellow/60 px-4 text-[13.5px] font-semibold text-white touch-manipulation hover:border-elec-yellow"
                    >
                      <PlayCircle className="h-4 w-4 text-elec-yellow" aria-hidden="true" />
                      Show me
                    </button>
                  ) : null}
                  {t.who && (
                    <p className="mt-3 border-t border-white/[0.08] pt-3 text-[13px] leading-relaxed text-white">
                      <span className="font-semibold text-elec-yellow">Who can do it: </span>
                      {t.who}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null}

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
                        <span className="block text-[14px] font-semibold text-white">
                          {l.label}
                        </span>
                        {l.body && (
                          <span className="block text-[13px] leading-snug text-white">
                            {l.body}
                          </span>
                        )}
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
            <span className="shrink-0 text-[13px] font-semibold text-white">
              Source
            </span>
            <p className="max-w-4xl text-[13px] leading-relaxed text-white">{help.source}</p>
          </div>
        )}
      </FormSheet>
    </>
  );
}

/** First-visit strip: the first three steps, dismissible and remembered. */
export function HowItWorks({
  help,
  blockers,
  onAsk,
  askContext,
}: { help: PageHelpContent } & LiveHelpProps) {
  const [hidden, setHidden] = useState(true);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  // Remembered per signed-in user, so a shared office tablet still shows it
  // to the next person. The session read is local, no network.
  useEffect(() => {
    let live = true;
    setHidden(true);
    void supabase.auth.getSession().then(
      ({ data }) => {
        if (!live) return;
        const uid = data.session?.user?.id ?? null;
        setUserId(uid);
        setHidden(readDismissed(help.id, uid));
      },
      () => undefined
    );
    return () => {
      live = false;
    };
  }, [help.id]);
  if (hidden) return null;
  const dismiss = () => {
    try {
      window.localStorage.setItem(storageKey(help.id, userId), '1');
    } catch {
      /* private mode: just hide for now */
    }
    setHidden(true);
  };
  return (
    <section className="relative -mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-4 py-3 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5">
      {/* Compact by design (8 Oct): it explains the page without pushing the
          work below the fold. Step detail and the full guide sit one tap away. */}
      <div className="flex items-center gap-2">
        <p className="min-w-0 flex-1 text-[14px] font-semibold text-white">How it works</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="h-11 shrink-0 px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
        >
          Full guide
        </button>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Hide how it works"
          className="-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white touch-manipulation hover:bg-white/[0.06]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {blockers?.length ? (
        <div className="mt-1 mb-3">
          <BeforeYouStart blockers={blockers} />
        </div>
      ) : null}
      <ol className="mb-1 grid gap-2.5 sm:grid-cols-3 sm:gap-5">
        {help.steps.slice(0, 3).map((s, i) => (
          <li key={s.title} className="flex gap-2.5">
            <span className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-elec-yellow text-[12px] font-bold text-elec-yellow">
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className="block text-[14px] font-semibold leading-snug text-white">{s.title}</span>
              <span className="mt-0.5 hidden text-[13px] leading-snug text-white sm:block">{s.body}</span>
            </span>
          </li>
        ))}
      </ol>
      <PageHelpSheet
        help={help}
        open={open}
        onOpenChange={setOpen}
        blockers={blockers}
        onAsk={onAsk}
        askContext={askContext}
      />
    </section>
  );
}
