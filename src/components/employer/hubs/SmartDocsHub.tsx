import { format } from 'date-fns';
import { useMemo, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Section } from '@/pages/employer/EmployerDashboard';
import { useEmployerHubCounts } from '@/hooks/useFinanceModel';
import { useFirmDocuments, type FirmDocKind, type FirmDocument } from '@/hooks/useFirmDocuments';
import { useJobs } from '@/hooks/useJobs';
import { useJobPacks } from '@/hooks/useJobPacks';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { PageFrame, PageHero, selectTriggerClass } from '@/components/employer/editorial';
import {
  frameClass,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  plural,
} from '@/components/employer/pageParts/PageParts';
import {
  SectionHead,
  StatCards,
  ListPanel,
  PageTiles,
  type ListItem,
  type IndexLink,
} from '@/components/employer/hubs/AreaPage';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { SMART_DOCS_HELP } from '@/components/employer/help/clients';

interface SmartDocsHubProps {
  onNavigate: (section: Section) => void;
}

/* ── Words for documents ─────────────────────────────────────────────── */

const KIND: Record<FirmDocKind, string> = {
  rams: 'RAMS',
  job_pack: 'Job pack',
  briefing: 'Briefing',
  quote: 'Quote',
  invoice: 'Invoice',
  certificate: 'Certificate',
  signature: 'Signature',
  compliance: 'Document',
  ai_rams: 'RAMS, AI drafted',
  design: 'Design',
};

const shortDay = (iso: string) => {
  const d = new Date(iso);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  // date-fns, not toLocaleDateString: en-GB gives "Sept"; the app writes "Sep".
  return format(d, sameYear ? 'd MMM' : 'd MMM yyyy');
};
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');

/** Red for a problem, yellow while it is still moving, white when settled. */
const statusTone = (st: string): ListItem['tone'] =>
  /overdue|reject|fail|expired|declin|void/i.test(st)
    ? 'red'
    : /not issued|draft|progress|pending|submitted|generated|processing|sent|awaiting/i.test(st)
      ? 'yellow'
      : undefined;

function signedLine(d: FirmDocument): string | null {
  if (d.to_sign == null && d.signed == null) return null;
  const n = d.signed ?? 0;
  const of = d.to_sign ?? 0;
  if (!n) return 'Nobody signed yet';
  return of ? `${n} of ${of} signed` : `${n} signed`;
}

/** A job has a RAMS when one is issued, drafted on it, or carried in its pack. */
const isRams = (d: FirmDocument) =>
  d.kind === 'rams' ||
  d.kind === 'ai_rams' ||
  (d.kind === 'job_pack' && (d.detail ?? '').toLowerCase().includes('rams'));

/* ── The document cards ──────────────────────────────────────────────── */

/** The same surface as the template's stat cards and page tiles. */
const cardCls =
  'rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.065] to-white/[0.025] ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors';

interface DocType {
  key: string;
  title: string;
  what: string;
  time: string;
  section: Section;
  /** What on a job counts as this document already being there. */
  onJob: (items: FirmDocument[]) => boolean;
  figure?: string;
  help?: string;
}

function StartCard({
  doc,
  status,
  className,
  onOpen,
}: {
  doc: DocType;
  status?: { text: string; needed: boolean };
  className?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-help={doc.help}
      className={cn(
        cardCls,
        'group flex min-h-[176px] min-w-0 flex-col p-4 text-left touch-manipulation hover:border-white/[0.18] hover:from-white/[0.08] sm:p-5',
        className
      )}
    >
      <span className="text-[15.5px] font-semibold leading-snug tracking-tight text-white">
        {doc.title}
      </span>
      <span className="mt-1.5 text-[13px] leading-snug text-white">{doc.what}</span>
      <span className="mt-auto block pt-4 text-[12.5px] leading-snug text-white">{doc.time}</span>
      <span className="mt-3 flex items-center justify-between gap-2 border-t border-white/[0.08] pt-3">
        <span className="text-[13.5px] font-semibold text-elec-yellow group-hover:underline underline-offset-4">
          Start
        </span>
        {status ? (
          <span
            className={cn(
              'truncate text-[12.5px] font-semibold',
              status.needed ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {status.text}
          </span>
        ) : doc.figure ? (
          <span className="truncate text-[12.5px] font-semibold tabular-nums text-white">
            {doc.figure}
          </span>
        ) : null}
      </span>
    </button>
  );
}

/**
 * Smart Docs (10 Oct 2026, on the Jobs page template). Andrew: "less icons,
 * they look AI generated and we need to look like a proper app".
 *
 *  - the figures that count: RAMS made, designs, briefing packs and what is
 *    waiting on signatures;
 *  - "Start a document": the generators as cards, and a job picker. With a job
 *    picked each card says whether the job has it, and RAMS and designs open on
 *    that job so what they make is saved to it (ELE-2012 behaviour);
 *  - recent documents on jobs (or one job's documents), and by job: the live
 *    jobs with no RAMS and the jobs with the most documents;
 *  - every other page that holds documents as tiles with its figure.
 * The generators themselves are linked, never changed here.
 */
export function SmartDocsHub({ onNavigate }: SmartDocsHubProps) {
  const [params, setParams] = useSearchParams();
  const jobId = params.get('docsjob');

  // AI drafts by the firm's owner and managers (one firm-scoped call).
  const { data: hub } = useEmployerHubCounts();
  const docs = hub?.docs;
  // Every document on the firm's jobs (the RPC caps at 200), and one job's.
  const { data: firmDocs, isLoading: firmLoading, error: firmError } = useFirmDocuments(null, 200);
  const { data: jobDocs, isLoading: jobLoading, error: jobError } = useFirmDocuments(jobId, 100);
  const { data: jobs = [], isLoading: jobsLoading } = useJobs();
  const { data: jobPacks = [] } = useJobPacks();

  const byKind = firmDocs?.by_kind;
  const n = (k: FirmDocKind) => byKind?.[k] ?? 0;
  const allItems = useMemo(() => firmDocs?.items ?? [], [firmDocs]);
  const complete = !!firmDocs && allItems.length >= firmDocs.total;

  const job = jobId ? (jobs.find((j) => j.id === jobId) ?? null) : null;
  const liveJobs = useMemo(() => jobs.filter((j) => !j.archived_at && !j.is_template), [jobs]);

  /* ── Figures ───────────────────────────────────────────────────── */

  // The last five AI drafts hold every one made this month when the oldest of
  // them is from before the month (or there are fewer than five); otherwise
  // the count is a floor.
  const monthStart = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
  }, []);
  const recent = docs?.recent ?? [];
  const recentCoversMonth = recent.length < 5 || recent[recent.length - 1].at < monthStart;
  const thisMonth = (kinds: string[]) => {
    const k = recent.filter((r) => kinds.includes(r.kind) && r.at >= monthStart).length;
    return recentCoversMonth ? String(k) : `${k}+`;
  };
  const lastOf = (kinds: string[]) => recent.find((r) => kinds.includes(r.kind))?.at ?? null;

  const ramsMonth = thisMonth(['rams', 'method_statement']);
  const ramsLast = lastOf(['rams', 'method_statement']);
  const designLast = lastOf(['design']);
  const briefLast = lastOf(['briefing_pack']);

  const packsToSign = jobPacks.filter((p) => p.status === 'In Progress').length;
  const ramsToSign = hub?.safety.rams_pending ?? 0;
  const toSign = packsToSign + ramsToSign;

  const madeSub = (total: number, last: string | null, none: string) =>
    total === 0 ? none : last ? `Latest on ${shortDay(last)}` : 'Drafted with AI';

  /* ── By job ────────────────────────────────────────────────────── */

  const byJob = useMemo(() => {
    const counts = new Map<string, { title: string; n: number; rams: boolean }>();
    for (const d of allItems) {
      const c = counts.get(d.job_id) ?? { title: d.job_title ?? 'Job', n: 0, rams: false };
      c.n += 1;
      if (isRams(d)) c.rams = true;
      counts.set(d.job_id, c);
    }
    return counts;
  }, [allItems]);

  // Live work with no RAMS: only claimed when every document was read.
  const noRams = useMemo(() => {
    if (!complete) return [];
    return liveJobs
      .filter((j) => ['Active', 'Pending'].includes(j.status) && !byJob.get(j.id)?.rams)
      .sort((a, b) => {
        const sa = a.start_date ? String(a.start_date) : '9999';
        const sb = b.start_date ? String(b.start_date) : '9999';
        return sa < sb ? -1 : 1;
      });
  }, [complete, liveJobs, byJob]);

  const mostDocs = useMemo(
    () =>
      [...byJob.entries()]
        .map(([id, c]) => ({ id, ...c }))
        .sort((a, b) => b.n - a.n)
        .slice(0, 4),
    [byJob]
  );

  const pickJob = (id: string, scroll = false) => {
    const next = new URLSearchParams(params);
    if (id) next.set('docsjob', id);
    else next.delete('docsjob');
    setParams(next, { replace: true });
    if (scroll)
      requestAnimationFrame(() =>
        document
          .getElementById('smartdocs-start')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      );
  };

  const byJobItems: ListItem[] = [
    ...noRams.slice(0, 4).map((j) => {
      const start = j.start_date ? String(j.start_date).slice(0, 10) : null;
      const started = !!start && start <= new Date().toISOString().slice(0, 10);
      return {
        key: `norams-${j.id}`,
        title: j.title,
        detail: [
          j.client || null,
          start ? `${started ? 'Started' : 'Starts'} ${shortDay(start)}` : null,
        ]
          .filter(Boolean)
          .join(' · '),
        status: 'No RAMS',
        tone: 'yellow' as const,
        onOpen: () => pickJob(j.id, true),
      };
    }),
    ...mostDocs
      .filter((m) => !noRams.slice(0, 4).some((j) => j.id === m.id))
      .map((m) => ({
        key: `docs-${m.id}`,
        title: m.title,
        detail: m.rams ? 'Has a RAMS' : undefined,
        status: plural(m.n, 'document'),
        onOpen: () => pickJob(m.id, true),
      })),
  ];

  /* ── Start a document ──────────────────────────────────────────── */

  const jobItems = jobDocs?.items ?? [];
  const types: DocType[] = [
    {
      key: 'rams',
      title: 'Safety documents',
      what: 'RAMS and method statement for the job, in one run.',
      time: 'Usually ready in under 2 minutes',
      section: 'airams',
      onJob: (it) => it.some(isRams),
      figure: docs ? (docs.rams > 0 ? `${docs.rams} made` : 'None yet') : undefined,
    },
    {
      key: 'brief',
      title: 'Briefing pack',
      what: 'A toolbox talk from the job and site photos.',
      time: 'The crew sign it in the app',
      section: 'aibriefingpack',
      onJob: (it) =>
        it.some(
          (d) =>
            d.kind === 'briefing' ||
            (d.kind === 'job_pack' && (d.detail ?? '').toLowerCase().includes('briefing'))
        ),
      figure: docs
        ? docs.briefing_packs > 0
          ? `${docs.briefing_packs} made`
          : 'None yet'
        : undefined,
    },
    {
      key: 'design',
      title: 'Design spec',
      what: 'Every circuit sized, protected and checked.',
      time: 'Six steps, then about 30 seconds',
      section: 'aidesignspec',
      onJob: (it) => it.some((d) => d.kind === 'design'),
      figure: docs ? (docs.designs > 0 ? `${docs.designs} made` : 'None yet') : undefined,
      help: 'smartdocs.design',
    },
    {
      key: 'quote',
      title: 'AI quote',
      what: 'Priced from your price book and past jobs.',
      time: 'Ready in 20 to 40 seconds',
      section: 'aiquote',
      onJob: (it) => it.some((d) => d.kind === 'quote' || d.kind === 'invoice'),
      figure: byKind ? (n('quote') > 0 ? `${n('quote')} on jobs` : undefined) : undefined,
      help: 'smartdocs.quote',
    },
    {
      key: 'cert',
      title: 'Certificate',
      what: 'EIC, EICR or minor works, linked to the job.',
      time: 'Filled in on site as you test',
      section: 'testing',
      onJob: (it) => it.some((d) => d.kind === 'certificate'),
      figure: byKind
        ? n('certificate') > 0
          ? `${n('certificate')} on jobs`
          : undefined
        : undefined,
    },
  ];

  const openDoc = (t: DocType) =>
    // The generators that save to a job open on the picked one.
    job && (t.section === 'airams' || t.section === 'aidesignspec')
      ? setParams({ section: t.section, job: job.id })
      : onNavigate(t.section);

  const jobOptions = [
    { value: '', label: 'All jobs' },
    ...(job && !liveJobs.includes(job) ? [job] : []).concat(liveJobs).map((j) => ({
      value: j.id,
      label: j.title,
      description: j.client || undefined,
    })),
  ];

  const neededOnJob = job && jobDocs ? types.filter((t) => !t.onJob(jobItems)).length : 0;

  /* ── Recent documents ──────────────────────────────────────────── */

  const listSource = job ? jobItems : allItems.slice(0, 8);
  const listLoading = job ? jobLoading : firmLoading;
  const listError = job ? jobError : firmError;
  const recentItems: ListItem[] = listSource.map((d) => ({
    key: `${d.kind}-${d.id}`,
    title: d.title,
    detail: [
      KIND[d.kind] ?? 'Document',
      job || d.job_title === d.title ? null : d.job_title,
      signedLine(d),
      d.at ? shortDay(d.at) : null,
    ]
      .filter(Boolean)
      .join(' · '),
    status: d.status ? cap(d.status) : undefined,
    tone: d.status ? statusTone(d.status) : undefined,
    onOpen: () => setParams({ section: d.section, ...(d.params ?? {}) }),
  }));

  /* ── Live line ─────────────────────────────────────────────────── */

  const draftsTotal = docs ? docs.rams + docs.designs + docs.briefing_packs : 0;
  const lead: string[] = [];
  if (packsToSign > 0) lead.push(`${plural(packsToSign, 'job pack')} waiting on signatures`);
  if (ramsToSign > 0) lead.push(`${plural(ramsToSign, 'RAMS', 'RAMS')} to sign off`);
  if (noRams.length > 0) lead.push(`${plural(noRams.length, 'live job')} with no RAMS`);
  const standing = !docs
    ? 'Every document for a job in one place'
    : draftsTotal === 0
      ? 'Nothing drafted yet'
      : `${plural(draftsTotal, 'AI draft')} so far${recent[0] ? `, the latest on ${shortDay(recent[0].at)}` : ''}`;
  const liveLine =
    lead.length > 0
      ? `${cap(lead.join(', '))}. ${standing}.`
      : `${standing}. ${draftsTotal === 0 ? 'Start a document below.' : 'Nothing waiting on you.'}`;

  /* ── Everything in Smart Docs ──────────────────────────────────── */

  const fig = (v: number) => (byKind && v > 0 ? v.toLocaleString('en-GB') : undefined);
  const safetyLinks: IndexLink[] = [
    {
      title: 'RAMS',
      detail: !byKind
        ? 'Issued RAMS and sign-off'
        : ramsToSign > 0
          ? `${plural(ramsToSign, 'RAMS', 'RAMS')} to sign off`
          : n('rams') + n('ai_rams') > 0
            ? 'On jobs, issued or drafted'
            : 'None on a job yet',
      value: fig(n('rams') + n('ai_rams')),
      onClick: () => onNavigate('rams'),
    },
    {
      title: 'Job packs',
      detail:
        packsToSign > 0
          ? `${plural(packsToSign, 'pack')} waiting on signatures`
          : n('job_pack') > 0
            ? 'Nothing waiting on signatures'
            : 'No packs yet',
      value: fig(n('job_pack')),
      onClick: () => onNavigate('jobpacks'),
    },
    {
      title: 'Briefings',
      detail: n('briefing') > 0 ? 'Toolbox talks on jobs' : 'None on a job yet',
      value: fig(n('briefing')),
      onClick: () => onNavigate('briefings'),
    },
    {
      title: 'Compliance',
      detail: n('compliance') > 0 ? 'Documents on jobs' : 'Nothing on a job yet',
      value: fig(n('compliance')),
      onClick: () => onNavigate('compliance'),
    },
  ];
  const moneyLinks: IndexLink[] = [
    {
      title: 'Quotes and invoices',
      detail: n('quote') + n('invoice') > 0 ? 'Linked to jobs' : 'None linked to a job yet',
      value: fig(n('quote') + n('invoice')),
      onClick: () => onNavigate('quotes'),
    },
    {
      title: 'Testing',
      detail: n('certificate') > 0 ? 'Certificates saved to jobs' : 'No certificates on jobs yet',
      value: fig(n('certificate')),
      onClick: () => onNavigate('testing'),
    },
    {
      title: 'Signatures',
      detail: n('signature') > 0 ? 'Requests on jobs' : 'No requests on jobs',
      value: fig(n('signature')),
      onClick: () => onNavigate('signatures'),
    },
    {
      title: 'All jobs',
      detail: 'Every job, with its documents',
      value: liveJobs.length > 0 ? liveJobs.length.toLocaleString('en-GB') : undefined,
      onClick: () => onNavigate('jobs'),
    },
  ];

  const dash = '–';
  const yellowIf = (v: number): ReactNode =>
    v > 0 ? <span className="text-elec-yellow">{v}</span> : v;

  return (
    <PageFrame className={cn(frameClass, 'pb-40 sm:pb-24')}>
      <PageHero
        title="Smart Docs"
        description={liveLine}
        actions={
          <HeroActions>
            {/* Short enough to fit beside AI quote on a phone. */}
            <HeroPrimary onClick={() => openDoc(types[0])}>New RAMS</HeroPrimary>
            <HeroSecondary labelOnPhone onClick={() => onNavigate('aiquote')}>
              AI quote
            </HeroSecondary>
            <PageHelpButton help={SMART_DOCS_HELP} askContext={{ page: 'smartdocs' }} />
          </HeroActions>
        }
      />

      <HowItWorks help={SMART_DOCS_HELP} askContext={{ page: 'smartdocs' }} />

      <StatCards
        stats={[
          {
            label: 'Safety documents',
            value: docs ? docs.rams : dash,
            sub: docs
              ? docs.rams === 0
                ? 'No RAMS made yet'
                : `${ramsMonth === '0' ? 'None' : ramsMonth} this month${ramsLast && ramsMonth === '0' ? `, last on ${shortDay(ramsLast)}` : ''}`
              : undefined,
            onOpen: () => onNavigate('airams'),
          },
          {
            label: 'Designs',
            value: docs ? docs.designs : dash,
            sub: docs ? madeSub(docs.designs, designLast, 'No designs yet') : undefined,
            onOpen: () => onNavigate('aidesignspec'),
          },
          {
            label: 'Briefing packs',
            value: docs ? docs.briefing_packs : dash,
            sub: docs
              ? madeSub(docs.briefing_packs, briefLast, 'No briefing packs yet')
              : undefined,
            onOpen: () => onNavigate('aibriefingpack'),
          },
          {
            label: 'Waiting on signatures',
            value: hub ? yellowIf(toSign) : dash,
            sub: !hub
              ? undefined
              : toSign === 0
                ? 'Nothing waiting'
                : [
                    packsToSign ? plural(packsToSign, 'job pack') : null,
                    ramsToSign ? `${plural(ramsToSign, 'RAMS', 'RAMS')} to sign off` : null,
                  ]
                    .filter(Boolean)
                    .join(', '),
            onOpen: () => onNavigate(packsToSign > 0 || ramsToSign === 0 ? 'jobpacks' : 'rams'),
          },
        ]}
      />

      <section id="smartdocs-start" className="scroll-mt-24">
        <SectionHead
          title={job ? 'Start a document for this job' : 'Start a document'}
          meta={
            job
              ? jobDocs
                ? neededOnJob > 0
                  ? `${neededOnJob} not on this job yet`
                  : 'All on this job'
                : undefined
              : 'AI drafts, you check'
          }
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {types.map((t, i) => {
            const on = job && jobDocs ? t.onJob(jobItems) : null;
            return (
              <StartCard
                key={t.key}
                doc={t}
                className={
                  i === types.length - 1
                    ? 'col-span-2 min-h-[136px] lg:col-span-1 lg:min-h-[176px]'
                    : undefined
                }
                status={
                  on === null
                    ? undefined
                    : on
                      ? { text: 'On this job', needed: false }
                      : { text: 'Not on it yet', needed: true }
                }
                onOpen={() => openDoc(t)}
              />
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-6">
          <div className="w-full sm:max-w-sm">
            <label className="mb-1 block text-[13px] font-semibold text-white">For a job</label>
            <MobileSelectPicker
              value={jobId ?? ''}
              onValueChange={(v) => pickJob(v)}
              options={jobOptions}
              placeholder={jobsLoading ? 'Loading jobs…' : 'All jobs'}
              title="Pick a job"
              triggerClassName={selectTriggerClass}
            />
          </div>
          <p className="pb-2.5 text-[13px] leading-snug text-white">
            {job
              ? 'Safety documents and designs open on this job, so what they make is saved to it.'
              : 'Pick a job to see what it has and what it still needs.'}
          </p>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-5 lg:items-stretch">
        <section data-help="smartdocs.byjob" className="flex flex-col lg:col-span-3">
          <SectionHead
            title={job ? 'Documents for this job' : 'Recent documents'}
            meta={
              job
                ? jobDocs
                  ? plural(jobDocs.total, 'document')
                  : undefined
                : firmDocs && firmDocs.total > 0
                  ? `${plural(firmDocs.total, 'document')} on jobs`
                  : undefined
            }
            action={job ? 'Show all' : undefined}
            onAction={job ? () => pickJob('') : undefined}
          />
          <ListPanel
            className="flex-1"
            items={listLoading ? [] : recentItems}
            empty={
              listLoading
                ? 'Gathering documents.'
                : listError
                  ? "Couldn't load documents. Check your connection and try again."
                  : job
                    ? 'Nothing saved to this job yet. Start one above and it is saved here, with its status and who has signed.'
                    : 'No documents on a job yet. RAMS, packs, briefings, quotes and certificates saved to a job show here with their status.'
            }
          />
        </section>

        <section className="flex flex-col lg:col-span-2">
          <SectionHead
            title="By job"
            meta={
              noRams.length > 0
                ? `${plural(noRams.length, 'job')} with no RAMS`
                : firmDocs && !complete
                  ? `From the latest ${allItems.length}`
                  : undefined
            }
            action="All jobs"
            onAction={() => onNavigate('jobs')}
          />
          <ListPanel
            className="flex-1"
            items={firmLoading ? [] : byJobItems}
            empty={
              firmLoading
                ? 'Gathering documents.'
                : liveJobs.length === 0
                  ? 'No jobs yet. Add a job and its documents are gathered here.'
                  : 'No live job is missing a RAMS, and no job has documents yet.'
            }
            footer={
              noRams.length > 4 ? (
                <button
                  type="button"
                  onClick={() => onNavigate('jobs')}
                  className="text-[13.5px] font-semibold text-elec-yellow"
                >
                  {plural(noRams.length - 4, 'more job')} with no RAMS
                </button>
              ) : undefined
            }
          />
        </section>
      </div>

      <section>
        <SectionHead title="Everything in Smart Docs" />
        <PageTiles
          groups={[
            { title: 'Safety on site', links: safetyLinks },
            { title: 'Quotes, certificates and sign-off', links: moneyLinks },
          ]}
        />
      </section>
    </PageFrame>
  );
}
