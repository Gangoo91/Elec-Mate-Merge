import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  EmptyState,
  LoadingBlocks,
} from '@/components/employer/editorial';
import {
  PageHelpButton,
  HowItWorks,
  type PageHelpContent,
  type HelpBlocker,
} from '@/components/hub/PageHelp';
import { useFirmPriceBook } from '@/hooks/useFirmPriceBook';
import { buttonPrimaryCn, cardCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
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
      A first-draft quote in a couple of minutes. Pick a job, or describe the work, and the AI
      lists the materials and labour. Prices come from your own price book wherever it has the
      item; anything else is marked as an estimate for you to check.
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
        'Under Recent AI drafts, tap one marked Draft, tap to check.',
        'It opens in the quote builder. Change anything, then send it as normal.',
      ],
      tour: [{ target: 'aiquote.list', caption: 'Tap a draft to open it in the quote builder.', optional: true }],
    },
  ],
};

const money = (n: number) =>
  `£${Number(n || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const aiStampOf = (q: Quote) =>
  ((q.settings ?? {}) as { aiQuote?: AIQuoteStamp }).aiQuote ?? null;

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
    const value = aiQuotes.filter((q) => q.status === 'Approved').reduce((s, q) => s + Number(q.value || 0), 0);
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
      const jd = ((data as { job_details?: { description?: string } } | null)?.job_details ?? {}) as {
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

  return (
    <PageFrame>
      <PageHero
        eyebrow="Smart Docs"
        title="AI quote"
        description="Pick a job and get a draft quote priced from your own price book and your own past jobs. You check it, then send it from the quote builder."
        tone="yellow"
        actions={<PageHelpButton help={HELP} blockers={helpBlockers} askContext={{ page: 'aiquote' }} />}
      />

      {roleLoading ? (
        <LoadingBlocks />
      ) : !canDraft ? (
        <EmptyState
          title="Quotes are drafted by the office"
          description="Only the owner, admins and office managers can draft quotes. Ask your office if a customer needs a price."
        />
      ) : (
        <section className={cn(cardCn, 'sm:flex sm:items-center sm:justify-between sm:gap-6 sm:space-y-0')}>
          <div className="min-w-0">
            <h2 className="text-[17px] font-semibold text-white">Draft a quote with AI</h2>
            <p className="mt-1 text-[13px] text-white">
              Materials from your price book first, labour checked against your own jobs, VAT from
              your settings.
            </p>
          </div>
          <button
            type="button"
            data-help="aiquote.start"
            onClick={() => {
              setDeepJob(null);
              setSheetOpen(true);
            }}
            className={cn(buttonPrimaryCn, 'mt-4 w-full px-6 sm:mt-0 sm:w-auto sm:shrink-0')}
          >
            Start a draft
          </button>
        </section>
      )}

      <HowItWorks help={HELP} blockers={helpBlockers} askContext={{ page: 'aiquote' }} />

      <StatStrip
        columns={4}
        stats={[
          { label: 'AI drafts', value: stats.drafted.toLocaleString() },
          { label: 'Sent', value: stats.sent.toLocaleString() },
          { label: 'Won', value: stats.won.toLocaleString() },
          { label: 'Won value', value: money(stats.value) },
        ]}
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : aiQuotes.length === 0 ? (
        <EmptyState
          title="No AI drafts yet"
          description="Your AI-drafted quotes show here with their number, customer and status."
        />
      ) : (
        <div data-help="aiquote.list">
        <ListCard className="-mx-4 rounded-none border-x-0 sm:mx-0 sm:rounded-2xl sm:border-x">
          <ListCardHeader title="Recent AI drafts" meta={<span className="text-[12px] text-white">{aiQuotes.length}</span>} />
          <ListBody>
            {aiQuotes.slice(0, 30).map((q) => {
              const stamp = aiStampOf(q);
              return (
                <ListRow
                  key={q.id}
                  title={`${q.quote_number || 'Draft'} · ${q.client}`}
                  subtitle={[
                    q.job_title,
                    stamp ? `${stamp.fromPriceBook} from price book, ${stamp.estimated} estimated` : null,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                  trailing={
                    <>
                      <span className="text-[13px] font-semibold text-white tabular-nums">{money(q.value)}</span>
                      <span className="rounded-full border border-white/20 px-2 py-0.5 text-[11px] text-white">
                        {isDraft(q) ? 'Draft, tap to check' : q.status}
                      </span>
                    </>
                  }
                  onClick={() => void openQuote(q)}
                />
              );
            })}
          </ListBody>
        </ListCard>
        </div>
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
