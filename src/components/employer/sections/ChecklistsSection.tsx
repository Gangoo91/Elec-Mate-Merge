/**
 * Safety → Checklists (ELE-1826). The office decides what must be ticked,
 * photographed and signed before the crew starts a job and when they finish.
 *
 *   Jobs      every live job with checks, and exactly what is missing where
 *   Checklists the firm's own templates: edit, attach, auto-attach rules
 *   Library   the five Elec-Mate templates to copy (safe isolation, DB change,
 *             EICR visit, EV charger install, PAT round)
 *
 * The gate itself lives in the database (guard_timesheet_prestart): a worker
 * cannot clock themselves in while a required before-start check is open.
 */
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { CHECKLISTS_HELP } from '@/components/employer/help/checklists';
import { useJobContext } from '@/hooks/useJobContext';
import { useJobLabels } from '@/hooks/useJobLabels';
import { PageFrame, PageHero, StatStrip, LoadingBlocks } from '@/components/employer/editorial';
import {
  frameClass,
  panel,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  StatusPill,
  PlainEmpty,
  Segments,
  SearchField,
  FilterRow,
} from '@/components/employer/pageParts/PageParts';
import { Link2, Plus } from 'lucide-react';
import { planBtn, planBtnPrimary } from '@/components/employer/jobs/PlanRow';
import {
  useChecklistTemplates,
  useFirmChecklistOverview,
  useChecklistOfficeActions,
  checklistErrorMessage,
  type ChecklistOverviewJob,
  type ChecklistTemplate,
} from '@/hooks/usePrestartChecklists';
import { TemplateEditorSheet } from '@/components/employer/checklists/TemplateEditorSheet';
import { AttachChecklistSheet } from '@/components/employer/checklists/AttachChecklistSheet';
import { JobChecksSheet } from '@/components/employer/checklists/JobChecksSheet';

type Tab = 'jobs' | 'templates' | 'library';

export function ChecklistsSection() {
  const [tab, setTab] = useState<Tab>('jobs');
  const [search, setSearch] = useState('');
  const [showFinished, setShowFinished] = useState(false);
  const [editing, setEditing] = useState<ChecklistTemplate | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [attachOpen, setAttachOpen] = useState(false);
  const [attachJob, setAttachJob] = useState<string | null>(null);
  const [attachTemplate, setAttachTemplate] = useState<string | null>(null);
  const [checksJob, setChecksJob] = useState<string | null>(null);

  const {
    data: templates,
    isLoading: tLoading,
    isError: tError,
    refetch: tRefetch,
  } = useChecklistTemplates();
  const {
    data: jobs = [],
    isLoading: jLoading,
    isError: jError,
    refetch: jRefetch,
  } = useFirmChecklistOverview(showFinished);
  const { copyLibrary } = useChecklistOfficeActions();
  const { data: labels = [] } = useJobLabels();

  // Deep link: ?section=checklists&job=<id> opens that job's checks (the bell does this).
  const { jobId: contextJobId } = useJobContext();
  useEffect(() => {
    if (contextJobId) setChecksJob(contextJobId);
  }, [contextJobId]);

  const firmTemplates = templates?.firm ?? [];
  const library = templates?.library ?? [];

  const stats = useMemo(() => {
    const withGaps = jobs.filter((j) => j.open_count > 0).length;
    const countersign = jobs.reduce((n, j) => n + Number(j.awaiting_countersign || 0), 0);
    return { live: jobs.length, withGaps, countersign };
  }, [jobs]);

  const term = search.trim().toLowerCase();
  const shownJobs = jobs.filter(
    (j) =>
      !term ||
      [j.title, j.client, j.location, ...(j.checklist_names ?? [])].some((v) =>
        (v ?? '').toLowerCase().includes(term)
      )
  );
  const shownTemplates = firmTemplates.filter(
    (t) => !term || [t.name, t.job_type].some((v) => (v ?? '').toLowerCase().includes(term))
  );
  const shownLibrary = library.filter(
    (t) =>
      !term ||
      [t.name, t.job_type, t.description].some((v) => (v ?? '').toLowerCase().includes(term))
  );
  const copiedFrom = new Set(firmTemplates.map((t) => t.source_template_id).filter(Boolean));

  const helpBlockers: HelpBlocker[] =
    !tLoading && firmTemplates.length === 0
      ? [
          {
            text: 'You have no checklists yet. Start from one of the five in the Library.',
            fixLabel: 'Open the Library',
            onFix: () => setTab('library'),
          },
        ]
      : [];

  const openEditor = (t: ChecklistTemplate | null) => {
    setEditing(t);
    setEditorOpen(true);
  };
  const openAttach = (jobId: string | null, templateId: string | null) => {
    setAttachJob(jobId);
    setAttachTemplate(templateId);
    setAttachOpen(true);
  };

  const addFromLibrary = (t: ChecklistTemplate) =>
    copyLibrary.mutate(t.id, {
      onSuccess: () => {
        toast.success(`${t.name} added to your checklists`);
        setTab('templates');
      },
      onError: (e) => toast.error(checklistErrorMessage(e, 'Couldn’t add it')),
    });

  const loading = tLoading || jLoading;

  const loadFailed = !loading && (tError || jError);
  const liveLine = (() => {
    if (loading) return 'Loading checklists.';
    if (loadFailed) return "Couldn't load checklists.";
    if (firmTemplates.length === 0)
      return 'No checklists yet. Start from one of the five in the Library.';
    const todo: string[] = [];
    if (stats.withGaps > 0)
      todo.push(
        `${stats.withGaps} ${stats.withGaps === 1 ? 'job has' : 'jobs have'} checks missing`
      );
    if (stats.countersign > 0) todo.push(`${stats.countersign} to countersign`);
    if (todo.length) return `${todo.join(', ')}.`;
    return stats.live > 0
      ? `Every check is in on ${stats.live} ${stats.live === 1 ? 'job' : 'jobs'}.`
      : 'No live job has checks on it yet.';
  })();

  return (
    <>
      <PageFrame className={frameClass}>
        <PageHero
          title="Checklists"
          description={liveLine}
          actions={
            <HeroActions>
              <HeroPrimary
                data-help="checklists.new"
                onClick={() => openEditor(null)}
                icon={<Plus className="h-4 w-4" />}
              >
                New checklist
              </HeroPrimary>
              {firmTemplates.length > 0 && (
                <HeroSecondary
                  label="Attach to a job"
                  onClick={() => openAttach(null, null)}
                  icon={<Link2 className="h-4 w-4" />}
                >
                  Attach to a job
                </HeroSecondary>
              )}
              <PageHelpButton help={CHECKLISTS_HELP} blockers={helpBlockers} />
            </HeroActions>
          }
        />

        <HowItWorks help={CHECKLISTS_HELP} blockers={helpBlockers} />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Jobs with checks', value: stats.live, onClick: () => setTab('jobs') },
            {
              label: 'Jobs with gaps',
              value: stats.withGaps,
              tone: stats.withGaps ? 'yellow' : undefined,
              onClick: () => setTab('jobs'),
            },
            {
              label: 'To countersign',
              value: stats.countersign,
              tone: stats.countersign ? 'yellow' : undefined,
              onClick: () => setTab('jobs'),
            },
            {
              label: 'Your checklists',
              value: firmTemplates.length,
              onClick: () => setTab('templates'),
            },
          ]}
        />

        <FilterRow>
          <div data-help="checklists.tabs">
            <Segments
              items={[
                { value: 'jobs' as Tab, label: 'Jobs' },
                { value: 'templates' as Tab, label: 'Your checklists' },
                { value: 'library' as Tab, label: 'Library' },
              ]}
              value={tab}
              onChange={setTab}
            />
          </div>
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder={tab === 'jobs' ? 'Search jobs' : 'Search checklists'}
            className="lg:w-72"
          />
        </FilterRow>

        {loading ? (
          <LoadingBlocks />
        ) : loadFailed ? (
          <PlainEmpty
            text="Couldn't load checklists. Check your connection and try again."
            action="Try again"
            onAction={() => {
              tRefetch();
              jRefetch();
            }}
          />
        ) : tab === 'jobs' ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[14px] text-white">
                {showFinished
                  ? 'Every job with checks, finished ones included.'
                  : 'Live jobs with checks. Gaps first.'}
              </p>
              <button
                type="button"
                onClick={() => setShowFinished((v) => !v)}
                aria-pressed={showFinished}
                className={cn(
                  'inline-flex h-11 items-center rounded-full border px-4 text-[13px] font-semibold touch-manipulation',
                  showFinished
                    ? 'border-white bg-white text-black'
                    : 'border-white/[0.14] bg-white/[0.05] text-white'
                )}
              >
                {showFinished ? 'Showing finished jobs' : 'Include finished jobs'}
              </button>
            </div>
            {shownJobs.length === 0 ? (
              <PlainEmpty
                text={
                  term
                    ? 'No jobs match this search.'
                    : firmTemplates.length === 0
                      ? 'Jobs with checks appear here with what is missing. Add a checklist from the Library first, then attach it to a job.'
                      : 'Jobs with checks appear here with what is missing. Attach a checklist to a job, or set one to go on new jobs.'
                }
                action={firmTemplates.length === 0 ? 'Open the Library' : 'Attach to a job'}
                onAction={() =>
                  firmTemplates.length === 0 ? setTab('library') : openAttach(null, null)
                }
              />
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                {shownJobs.map((j) => (
                  <JobCard key={j.job_id} job={j} onOpen={() => setChecksJob(j.job_id)} />
                ))}
              </div>
            )}
          </div>
        ) : tab === 'templates' ? (
          shownTemplates.length === 0 ? (
            <PlainEmpty
              text={
                term
                  ? 'No checklists match this search.'
                  : 'Your checklists appear here. Start from the Library (safe isolation, DB change, EICR visit, EV charger install, PAT round) or build your own.'
              }
              action="Open the Library"
              onAction={() => setTab('library')}
            />
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {shownTemplates.map((t) => (
                <TemplateCard
                  key={t.id}
                  t={t}
                  rule={autoRule(t, labels)}
                  actions={
                    <>
                      <button type="button" className={planBtn} onClick={() => openEditor(t)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className={planBtnPrimary}
                        onClick={() => openAttach(null, t.id)}
                      >
                        Attach to a job
                      </button>
                    </>
                  }
                />
              ))}
            </div>
          )
        ) : shownLibrary.length === 0 ? (
          <PlainEmpty text="No library checklists match this search." />
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {shownLibrary.map((t) => {
              const have = copiedFrom.has(t.id);
              return (
                <TemplateCard
                  key={t.id}
                  t={t}
                  rule={t.description ?? undefined}
                  actions={
                    have ? (
                      <button type="button" className={planBtn} onClick={() => setTab('templates')}>
                        In your checklists
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={planBtnPrimary}
                        disabled={copyLibrary.isPending}
                        onClick={() => addFromLibrary(t)}
                      >
                        Add to my checklists
                      </button>
                    )
                  }
                />
              );
            })}
          </div>
        )}
      </PageFrame>

      <TemplateEditorSheet open={editorOpen} onOpenChange={setEditorOpen} template={editing} />
      <AttachChecklistSheet
        open={attachOpen}
        onOpenChange={setAttachOpen}
        templates={firmTemplates}
        initialJobId={attachJob}
        initialTemplateId={attachTemplate}
        onAttached={(id) => {
          setTab('jobs');
          setChecksJob(id);
        }}
      />
      <JobChecksSheet
        jobId={checksJob}
        open={!!checksJob && !attachOpen}
        onOpenChange={(o) => !o && setChecksJob(null)}
        onAttach={(id) => openAttach(id, null)}
      />
    </>
  );
}

function autoRule(t: ChecklistTemplate, labels: { id: string; name: string }[]): string {
  if (t.auto_all_jobs) return 'Goes on every new job';
  if (t.auto_label_ids.length) {
    const names = labels.filter((l) => t.auto_label_ids.includes(l.id)).map((l) => l.name);
    return names.length ? `Goes on jobs labelled ${names.join(' or ')}` : 'Goes on labelled jobs';
  }
  return 'Attach it to jobs yourself';
}

function TemplateCard({
  t,
  rule,
  actions,
}: {
  t: ChecklistTemplate;
  rule?: string;
  actions: ReactNode;
}) {
  const before = t.items.filter((i) => i.phase === 'before');
  const after = t.items.filter((i) => i.phase === 'after');
  const types = Array.from(new Set(t.items.map((i) => i.type)));
  return (
    <div className={cn(panel, 'flex flex-col overflow-hidden')}>
      <div className="flex-1 px-4 py-4 sm:px-5">
        {t.job_type && <p className="text-[12px] font-semibold text-white">{t.job_type}</p>}
        <h3 className="mt-0.5 text-[16px] font-semibold tracking-tight text-white">{t.name}</h3>
        {rule && <p className="mt-1 text-[13px] leading-snug text-white">{rule}</p>}
        <p className="mt-3 text-[13px] text-white">
          {[
            `${before.length} before start`,
            `${after.length} on completion`,
            types.includes('rams') ? 'Needs RAMS signed' : null,
            types.includes('photo') ? 'Photos' : null,
            types.includes('signature') ? 'Signature' : null,
          ]
            .filter(Boolean)
            .join(' · ')}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 border-t border-white/[0.07] px-4 py-3 sm:px-5 [&>*:only-child]:col-span-2">
        {actions}
      </div>
    </div>
  );
}

function JobCard({ job, onOpen }: { job: ChecklistOverviewJob; onOpen: () => void }) {
  // "Isolation photo missing · Priya" lines, completion gaps last.
  const lines = [
    ...job.crew.flatMap((c) => c.outstanding.map((o) => `${o} · ${c.name}`)),
    ...job.completion_outstanding.map((o) => `${o} · on completion`),
  ];
  const shown = lines.slice(0, 4);
  const crewReady = job.crew.filter((c) => c.outstanding.length === 0).length;
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        panel,
        'group flex w-full flex-col overflow-hidden text-left touch-manipulation transition-colors hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
      )}
    >
      <div className="flex items-start justify-between gap-3 px-4 pt-4 sm:px-5">
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-white">{job.title}</p>
          <p className="mt-0.5 truncate text-[13px] text-white">
            {[job.location, (job.checklist_names ?? []).join(', ')].filter(Boolean).join(' · ')}
          </p>
        </div>
        {job.open_count === 0 ? (
          <StatusPill tone="green">All done</StatusPill>
        ) : (
          <StatusPill tone="volt">{job.open_count} open</StatusPill>
        )}
      </div>
      <div className="flex-1 px-4 pb-4 pt-3 sm:px-5">
        {lines.length === 0 ? (
          <p className="text-[13px] text-white">
            Every required check is in
            {job.last_activity
              ? `, last ${formatDistanceToNowStrict(parseISO(job.last_activity))} ago`
              : ''}
            .
          </p>
        ) : (
          <ul className="space-y-1">
            {shown.map((l) => (
              <li key={l} className="flex items-start gap-2 text-[13px] leading-snug text-white">
                <span
                  aria-hidden
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-elec-yellow"
                />
                <span className="min-w-0">{l}</span>
              </li>
            ))}
            {lines.length > shown.length && (
              <li className="pl-3.5 text-[12.5px] font-semibold text-white">
                and {lines.length - shown.length} more
              </li>
            )}
          </ul>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-2.5 text-[13px] text-white sm:px-5">
        <span>
          {job.crew.length === 0
            ? 'Nobody assigned yet'
            : `${crewReady} of ${job.crew.length} ready to start`}
          {Number(job.awaiting_countersign) > 0 && ` · ${job.awaiting_countersign} to countersign`}
        </span>
        <span className="font-semibold text-elec-yellow">Open</span>
      </div>
    </button>
  );
}
