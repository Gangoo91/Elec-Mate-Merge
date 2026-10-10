import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  PageFrame,
  PageHero,
  StatStrip,
  LoadingBlocks,
  PrimaryButton,
} from '@/components/employer/editorial';
import {
  PanelTitle,
  PlainEmpty,
  Row,
  RowList,
  StatusPill,
  colClass,
  frameClass,
  heroPrimaryClass,
  twoColClass,
} from '@/components/employer/pageParts/PageParts';
import {
  PageHelpButton,
  HowItWorks,
  type PageHelpContent,
  type HelpBlocker,
} from '@/components/hub/PageHelp';
import { useFirmPriceBook } from '@/hooks/useFirmPriceBook';
import { supabase } from '@/integrations/supabase/client';
import { useQuotes } from '@/hooks/useFinance';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import type { Quote } from '@/services/financeService';
import type { AIQuoteStamp } from '@/services/aiQuoteService';
import { AIQuoteSheet } from '@/components/employer/quotes/AIQuoteSheet';
import { CreateQuoteDialog } from '@/components/employer/dialogs/CreateQuoteDialog';

/* ==========================================================================
   AI quote (ELE-1990).

   Was: a form that totalled what you typed, fixed VAT at 20% and saved a .txt.
   Now: pick a job, the AI drafts the lines (price book first, labour from the
   firm's own history), it is saved as a normal DRAFT quote on the job and
   opens in the quote builder to check and send. One quote path, one
   numbering (createQuote → assign_document_numbers).
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'employer-ai-quote',
  title: 'AI quote',
  what: (
    <>
      A first-draft quote in a couple of minutes. Pick a job, or describe the work, and the AI lists
      the materials and labour. Prices come from your own price book wherever it has the item;
      anything else is marked as an estimate for you to check.
    </>
  ),
  steps: [
    {
      title: 'Pick the job',
      body: 'Choose an open job or describe the work. Give it a job type so it can compare with your past jobs.',
    },
    {
      title: 'Check the draft',
      body: 'Every line says where its price came from: your price book, your rate, or an AI estimate to check.',
    },
    {
      title: 'Send from the quote builder',
      body: 'Save it as a draft on the job, adjust anything, then send it to the customer as normal.',
    },
  ],
  notes: [
    {
      title: 'Labour hours',
      body: 'When you have finished jobs of the same type with approved timesheets, the draft shows how long they really took and lets you use that figure.',
    },
    {
      title: 'VAT and CIS',
      body: 'Follow your firm settings: not VAT registered means no VAT, and reverse charge and CIS apply where you have them switched on.',
    },
    {
      title: 'Who sees what',
      body: 'Office managers can draft quotes. They see sell prices only, never buy prices or markup.',
    },
    {
      title: 'Cost',
      body: 'Drafting the same job again with the same prices reuses the earlier draft rather than running the AI again.',
    },
  ],
  tasks: [
    {
      title: 'Draft a quote from a job',
      steps: [
        'Tap Start a draft.',
        'Pick From a job and choose the job, or Describe the work and type what needs doing. Add a job type if you can.',
        'Tap Draft my quote. It takes 20 to 40 seconds; keep the sheet open.',
      ],
      who: 'Owner, admins and office managers.',
      tour: [
        { target: 'aiquote.start', caption: 'Tap Start a draft.', opens: true },
        { target: 'aiquote.mode', caption: 'Pick From a job, or Describe the work.' },
        { target: 'aiquote.draft', caption: 'Then tap Draft my quote.' },
      ],
    },
    {
      title: 'Check the draft and save it',
      steps: [
        'Read Where the prices came from: price book, your rate, or an AI estimate to check.',
        'Edit the scope of works (the customer sees it). Under Labour, tap Use … hours to match your past jobs if it shows.',
        'Tap Save draft and review. It opens in the quote builder as a draft on the job.',
      ],
      after: 'Nothing goes to the customer until you send it from the quote builder.',
      who: 'Owner, admins and office managers.',
    },
    {
      title: 'Finish an earlier draft',
      steps: [
        'Under Recent AI drafts, tap one marked Check.',
        'It opens in the quote builder. Change anything, then send it as normal.',
      ],
      tour: [
        {
          target: 'aiquote.list',
          caption: 'Tap a draft to open it in the quote builder.',
          optional: true,
        },
      ],
    },
  ],
};

const money = (n: number) =>
  `£${Number(n || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const aiStampOf = (q: Quote) => ((q.settings ?? {}) as { aiQuote?: AIQuoteStamp }).aiQuote ?? null;

const isDraft = (q: Quote) => String(q.status).toLowerCase() === 'draft';

interface AIQuoteSectionProps {
  onNavigate: (section: Section) => void;
}

export function AIQuoteSection({ onNavigate: _onNavigate }: AIQuoteSectionProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: role, isLoading: roleLoading } = useEmployerRole();
  const { data: quotes = [], isLoading } = useQuotes();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deepJob, setDeepJob] = useState<string | null>(null);
  const [editing, setEditing] = useState<Quote | null>(null);

  const canDraft = !!role?.role && ['owner', 'admin', 'office'].includes(role.role);

  // ?job=<id> opens the sheet with that job picked (e.g. from a job card).
  useEffect(() => {
    const job = searchParams.get('job');
    if (!job || !canDraft) return;
    setDeepJob(job);
    setSheetOpen(true);
    const next = new URLSearchParams(searchParams);
    next.delete('job');
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams, canDraft]);

  const aiQuotes = useMemo(() => quotes.filter((q) => !!aiStampOf(q)), [quotes]);
  const stats = useMemo(() => {
    const sent = aiQuotes.filter((q) => !isDraft(q)).length;
    const won = aiQuotes.filter((q) => q.status === 'Approved').length;
    const value = aiQuotes
      .filter((q) => q.status === 'Approved')
      .reduce((s, q) => s + Number(q.value || 0), 0);
    return { drafted: aiQuotes.length, sent, won, value };
  }, [aiQuotes]);

  const openQuote = async (q: Quote) => {
    if (isDraft(q)) {
      // The list's `description` is the row's notes; the scope of works lives
      // in job_details.description, so read it before opening the builder.
      const { data } = await supabase
        .from('quotes')
        .select('job_details, notes')
        .eq('id', q.id)
        .maybeSingle();
      const jd = ((data as { job_details?: { description?: string } } | null)?.job_details ??
        {}) as {
        description?: string;
      };
      setEditing({
        ...q,
        description: jd.description ?? null,
        notes: (data as { notes?: string | null } | null)?.notes ?? q.notes,
      });
      return;
    }
    setSearchParams({ section: 'quotes', quote: q.id });
  };

  // Live "Before you start" line for the help (ELE-1980). Same cached
  // price book the Price Book page reads.
  const { data: priceBook } = useFirmPriceBook();
  const helpBlockers: HelpBlocker[] =
    canDraft && priceBook && priceBook.length === 0
      ? [
          {
            text: 'Your price book is empty, so every material line will be an AI estimate to check.',
            fixLabel: 'Open the price book',
            onFix: () => setSearchParams({ section: 'pricebook' }),
          },
        ]
      : [];

  const waitingDrafts = aiQuotes.filter(isDraft).length;
  const headline = roleLoading
    ? 'Loading.'
    : !canDraft
      ? 'Only the owner, admins and office managers can draft quotes.'
      : waitingDrafts > 0
        ? `${waitingDrafts} AI draft${waitingDrafts === 1 ? '' : 's'} waiting for you to check and send.`
        : 'Pick a job and get a draft priced from your price book and past jobs. You check it, then send it.';

  const startDraft = () => {
    setDeepJob(null);
    setSheetOpen(true);
  };

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="AI quote"
        description={headline}
        actions={
          <>
            {canDraft && !roleLoading && (
              <PrimaryButton
                data-help="aiquote.start"
                onClick={startDraft}
                className={heroPrimaryClass}
              >
                Start a draft
              </PrimaryButton>
            )}
            <PageHelpButton help={HELP} blockers={helpBlockers} askContext={{ page: 'aiquote' }} />
          </>
        }
      />

      <HowItWorks help={HELP} blockers={helpBlockers} askContext={{ page: 'aiquote' }} />

      {roleLoading ? (
        <LoadingBlocks />
      ) : !canDraft ? (
        <PlainEmpty
          stacked
          text="Quotes are drafted by the office. Ask your office if a customer needs a price."
        />
      ) : (
        <>
          {aiQuotes.length > 0 && (
            <StatStrip
              columns={4}
              stats={[
                {
                  label: 'AI drafts',
                  value: stats.drafted.toLocaleString(),
                  sub: waitingDrafts > 0 ? `${waitingDrafts} to check` : 'All checked',
                  tone: waitingDrafts > 0 ? 'yellow' : undefined,
                },
                { label: 'Sent', value: stats.sent.toLocaleString(), sub: 'To customers' },
                { label: 'Won', value: stats.won.toLocaleString(), sub: 'Accepted' },
                { label: 'Won value', value: money(stats.value), sub: 'From AI drafts' },
              ]}
            />
          )}

          <div className={twoColClass}>
            <section className={colClass}>
              <div>
                <PanelTitle
                  title="Recent AI drafts"
                  meta={aiQuotes.length > 0 ? `${aiQuotes.length}` : undefined}
                  action={aiQuotes.length > 0 ? 'All quotes' : undefined}
                  onAction={() => setSearchParams({ section: 'quotes' })}
                />
                {isLoading ? (
                  <LoadingBlocks />
                ) : aiQuotes.length === 0 ? (
                  <PlainEmpty
                    stacked
                    text="Your AI-drafted quotes show here with their number, customer and status."
                  />
                ) : (
                  <div data-help="aiquote.list">
                    <RowList>
                      {aiQuotes.slice(0, 30).map((q) => {
                        const stamp = aiStampOf(q);
                        return (
                          <Row
                            wrapDetail
                            key={q.id}
                            title={`${q.quote_number || 'Draft'} · ${q.client}`}
                            detail={[
                              q.job_title,
                              stamp
                                ? `${stamp.fromPriceBook} from price book, ${stamp.estimated} estimated`
                                : null,
                            ]
                              .filter(Boolean)
                              .join(' · ')}
                            trailing={
                              <>
                                <span className="hidden text-[14px] font-semibold tabular-nums text-white sm:inline">
                                  {money(q.value)}
                                </span>
                                <StatusPill
                                  tone={
                                    isDraft(q)
                                      ? 'volt'
                                      : q.status === 'Approved'
                                        ? 'green'
                                        : 'neutral'
                                  }
                                >
                                  {isDraft(q) ? 'Check' : q.status}
                                </StatusPill>
                              </>
                            }
                            onClick={() => void openQuote(q)}
                          />
                        );
                      })}
                    </RowList>
                  </div>
                )}
              </div>
            </section>

            <aside className={colClass}>
              <div>
                <PanelTitle title="Where prices come from" />
                <RowList>
                  <Row
                    wrapDetail
                    title="Your price book"
                    detail={
                      priceBook
                        ? priceBook.length > 0
                          ? `${priceBook.length} item${priceBook.length === 1 ? '' : 's'}. Materials are priced from here first.`
                          : 'Empty, so every material is an AI estimate to check.'
                        : 'Materials are priced from here first.'
                    }
                    onClick={() => setSearchParams({ section: 'pricebook' })}
                  />
                  <Row
                    wrapDetail
                    title="Your past jobs"
                    detail="Labour is checked against finished jobs of the same type."
                  />
                  <Row
                    wrapDetail
                    title="Your settings"
                    detail="VAT, reverse charge and CIS follow your firm settings."
                  />
                </RowList>
              </div>
            </aside>
          </div>
        </>
      )}

      <AIQuoteSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        initialJobId={deepJob}
        onSaved={(q) => {
          setSheetOpen(false);
          setEditing(q);
        }}
      />

      <CreateQuoteDialog
        open={!!editing}
        onOpenChange={(o) => {
          if (!o) setEditing(null);
        }}
        editQuote={editing}
        jobId={editing?.job_id ?? undefined}
      />
    </PageFrame>
  );
}

export default AIQuoteSection;
