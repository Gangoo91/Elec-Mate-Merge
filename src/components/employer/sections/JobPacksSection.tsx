import { useState, useMemo, useEffect, useRef } from 'react';
import { FileDown, Plus, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import {
  useJobPacks,
  useJobPackSignoffs,
  invalidatePackViews,
  chaseUnsignedPack,
} from '@/hooks/useJobPacks';
import { useCrewCompetence } from '@/hooks/useCrewCompetence';
import { checkPackCrew } from '@/utils/packCompetence';
import { JobSafetyPack } from '@/components/employer/JobSafetyPack';
import { useEmployees } from '@/hooks/useEmployees';
import { useJobs } from '@/hooks/useJobs';
import { AddJobPackDialog } from '@/components/employer/dialogs/AddJobPackDialog';
import { ViewJobPackSheet } from '@/components/employer/sheets/ViewJobPackSheet';
import { JobPack } from '@/services/jobPackService';
import { JobContextBar } from '@/components/employer/JobContextBar';
import { useJobContext } from '@/hooks/useJobContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { JOB_PACKS_HELP } from '@/components/employer/help/jobs';
import {
  ResumeDraftChip,
  clearDraft,
  timeAgoShort,
  useSavedDraft,
} from '@/components/employer/dialogs/formSheetKit';
import { PageFrame, PageHero, StatStrip, LoadingBlocks } from '@/components/employer/editorial';
import {
  frameClass,
  twoColClass,
  colClass,
  PanelTitle,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  ToolButton,
  StatusPill,
  Row,
  RowList,
  PlainEmpty,
  Segments,
  SearchField,
  FilterRow,
} from '@/components/employer/pageParts/PageParts';

type StatusTab = 'all' | 'Draft' | 'In Progress' | 'Complete';

// One vocabulary everywhere (ELE-1962): Draft, then Sent while signatures are
// coming in, then Complete once everyone has signed. The database moves a
// pack to Complete itself when the last person signs.
const statusLabel: Record<string, string> = {
  Draft: 'Draft',
  'In Progress': 'Sent',
  Complete: 'Complete',
};

export const JobPacksSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewJobPack, setShowNewJobPack] = useState(false);
  const [selectedJobPackId, setSelectedJobPackId] = useState<string | null>(null);
  const [showJobPackSheet, setShowJobPackSheet] = useState(false);
  const [activeTab, setActiveTab] = useState<StatusTab>('all');
  const [packPrefillJobId, setPackPrefillJobId] = useState<string | null>(null);
  const { data: jobPacks = [], isLoading, refetch, isRefetching } = useJobPacks();
  const { data: signoffs = [] } = useJobPackSignoffs();
  const { matrix } = useCrewCompetence();
  const [chasingId, setChasingId] = useState<string | null>(null);
  // The site safety PDF is an export of a pack (ELE-1962): undefined = closed,
  // null = open with the job picker, a job id = open on that job.
  const [exportJobId, setExportJobId] = useState<string | null | undefined>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const packDraft = useSavedDraft<{ formData?: { title?: string } }>('new-job-pack', user?.id);

  // Deep link from a job's sheet: ?section=jobpacks&job=<id> (ELE-1960). The
  // list is filtered to that job's packs with a "Back to job" bar; a job with
  // no pack yet opens the create sheet with the job already chosen, so it is
  // two taps from job to RAMS.
  const { jobId: contextJobId, job: contextJob } = useJobContext();
  const autoOpenedFor = useRef<string | null>(null);
  useEffect(() => {
    if (!contextJobId || isLoading) return;
    if (autoOpenedFor.current === contextJobId) return;
    autoOpenedFor.current = contextJobId;
    const hasPack = jobPacks.some(
      (jp) =>
        jp.job_id === contextJobId ||
        (!jp.job_id && !!contextJob && jp.title.toLowerCase() === contextJob.title.toLowerCase())
    );
    if (!hasPack) {
      setPackPrefillJobId(contextJobId);
      setShowNewJobPack(true);
    }
  }, [contextJobId, contextJob, jobPacks, isLoading]);
  const { data: employees = [] } = useEmployees();
  const { data: jobs = [] } = useJobs();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // The sheet reads the LIVE row, not a stale snapshot — after a send the
  // refetched pack (status/sent_to_workers_at) must flow into the open sheet.
  const selectedJobPack = useMemo(
    () => jobPacks.find((jp) => jp.id === selectedJobPackId) ?? null,
    [jobPacks, selectedJobPackId]
  );

  // A notification opens the exact pack: ?section=jobpacks&pack=<id>.
  const packParam = searchParams.get('pack');
  useEffect(() => {
    if (!packParam || isLoading) return;
    if (jobPacks.some((jp) => jp.id === packParam)) {
      setSelectedJobPackId(packParam);
      setShowJobPackSheet(true);
    }
    const next = new URLSearchParams(searchParams);
    next.delete('pack');
    setSearchParams(next, { replace: true });
  }, [packParam, isLoading, jobPacks, searchParams, setSearchParams]);

  // Who still has to sign each pack, worked out the same way as the database
  // (_pack_sync_status): everyone with a sign-off row plus anyone assigned
  // since it went out, leaving out people no longer on the team.
  const signing = useMemo(() => {
    const onTeam = new Set(
      employees.filter((e) => String(e.status ?? '').toLowerCase() !== 'archived').map((e) => e.id)
    );
    const byPack = new Map<string, { signed: number; total: number; unsigned: number }>();
    for (const jp of jobPacks) {
      const rows = signoffs.filter((a) => a.job_pack_id === jp.id && onTeam.has(a.employee_id));
      const people = new Map<string, boolean>();
      for (const a of rows)
        people.set(a.employee_id, people.get(a.employee_id) || !!a.acknowledged_at);
      for (const w of jp.assigned_workers ?? []) {
        if (onTeam.has(w) && !people.has(w)) people.set(w, false);
      }
      const signed = [...people.values()].filter(Boolean).length;
      // Only people with a sign-off row can be chased; the rest need the pack re-sent.
      const unsigned = rows.filter((a) => !a.acknowledged_at).length;
      byPack.set(jp.id, { signed, total: people.size, unsigned });
    }
    return byPack;
  }, [jobPacks, signoffs, employees]);

  // Required certificates checked against the people on each pack (ELE-1834 check).
  const certGaps = useMemo(() => {
    const byPack = new Map<string, string[]>();
    if (!matrix) return byPack;
    for (const jp of jobPacks) {
      if (!jp.required_certifications?.length || !jp.assigned_workers?.length) continue;
      const people = employees.filter((e) => jp.assigned_workers.includes(e.id));
      const r = checkPackCrew(matrix, jp.required_certifications, people, jp.start_date);
      if (r.lines.length) byPack.set(jp.id, r.lines);
    }
    return byPack;
  }, [jobPacks, employees, matrix]);

  const handleChase = async (e: React.MouseEvent | React.KeyboardEvent, jobPack: JobPack) => {
    e.stopPropagation();
    if (chasingId) return;
    setChasingId(jobPack.id);
    try {
      const r = await chaseUnsignedPack(jobPack.id);
      const parts: string[] = [];
      if (r.alreadyToday) parts.push(`${r.alreadyToday} already reminded today`);
      if (r.notLinked) parts.push(`${r.notLinked} not on the app yet`);
      toast({
        title: r.chased
          ? `Reminder sent to ${r.chased} ${r.chased === 1 ? 'person' : 'people'}`
          : 'Nobody new to remind today',
        description: parts.length ? `${parts.join(', ')}.` : undefined,
      });
    } catch {
      toast({ title: 'Could not send reminders', variant: 'destructive' });
    } finally {
      setChasingId(null);
    }
  };

  // Prefer the real FK link (employer_job_packs.job_id); title matching only
  // covers legacy packs created before the column existed.
  const packJobIds = useMemo(
    () => new Set(jobPacks.map((jp) => jp.job_id).filter((id): id is string => !!id)),
    [jobPacks]
  );
  const legacyPackTitles = useMemo(
    () => new Set(jobPacks.filter((jp) => !jp.job_id).map((jp) => jp.title.toLowerCase())),
    [jobPacks]
  );

  // Full list for the honest stat count; only the display list is capped.
  const allJobsAwaitingPack = useMemo(
    () =>
      jobs.filter(
        (j) =>
          (j.status === 'Active' || j.status === 'Pending') &&
          !packJobIds.has(j.id) &&
          !legacyPackTitles.has(j.title.toLowerCase())
      ),
    [jobs, packJobIds, legacyPackTitles]
  );
  const jobsAwaitingPack = useMemo(() => allJobsAwaitingPack.slice(0, 5), [allJobsAwaitingPack]);

  const filteredJobPacks = useMemo(() => {
    let filtered = jobPacks;

    if (contextJobId) {
      filtered = filtered.filter(
        (jp) =>
          jp.job_id === contextJobId ||
          (!jp.job_id && !!contextJob && jp.title.toLowerCase() === contextJob.title.toLowerCase())
      );
    }

    if (activeTab !== 'all') {
      filtered = filtered.filter((jp) => jp.status === activeTab);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (jp) =>
          jp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          jp.client.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [jobPacks, activeTab, searchQuery, contextJobId, contextJob]);

  const stats = {
    total: jobPacks.length,
    draft: jobPacks.filter((jp) => jp.status === 'Draft').length,
    inProgress: jobPacks.filter((jp) => jp.status === 'In Progress').length,
    complete: jobPacks.filter((jp) => jp.status === 'Complete').length,
    awaiting: allJobsAwaitingPack.length,
    unsignedPeople: jobPacks
      .filter((jp) => jp.status === 'In Progress')
      .reduce((n, jp) => {
        const s = signing.get(jp.id);
        return n + (s ? s.total - s.signed : 0);
      }, 0),
    certPacks: jobPacks.filter((jp) => jp.status !== 'Complete' && certGaps.has(jp.id)).length,
  };

  const handleSendToWorkers = async (e: React.MouseEvent, jobPack: JobPack) => {
    e.stopPropagation();
    try {
      // Atomic server-side send: status + ack rows + worker pushes in one call
      const { data, error } = await supabase.rpc('send_job_pack', { p_pack_id: jobPack.id });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const r = data as any;
      if (error || r?.error) throw new Error(r?.error || error?.message);
      invalidatePackViews(queryClient, jobPack.id);

      toast({
        title: 'Job Pack Sent',
        description:
          (r?.workers ?? 0) > 0
            ? `${jobPack.title} is now with ${r.workers} worker${r.workers === 1 ? '' : 's'} for sign-off.`
            : `${jobPack.title} marked sent. Assign workers so they can see it.`,
      });
    } catch {
      toast({ title: 'Error', description: 'Could not send the pack.', variant: 'destructive' });
    }
  };

  // Live "Before you start" lines for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] =
    employees.length === 0
      ? [
          {
            text: 'Nobody on the team yet, so a pack has no one to send to.',
            fixLabel: 'Open the team',
            onFix: () => navigate('/employer?section=team'),
          },
        ]
      : [];
  const helpAsk = { page: 'jobpacks', tab: activeTab };

  const handleJobPackClick = (jobPack: JobPack) => {
    setSelectedJobPackId(jobPack.id);
    setShowJobPackSheet(true);
  };

  const getDocumentProgress = (jobPack: JobPack) => {
    const docs = [
      jobPack.rams_generated,
      jobPack.method_statement_generated,
      jobPack.briefing_pack_generated,
    ];
    return docs.filter(Boolean).length;
  };

  const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
  const liveLine = (() => {
    if (jobPacks.length === 0 && stats.awaiting === 0)
      return 'No packs yet. A pack holds the scope, RAMS and briefing your team signs before work starts.';
    const todo: string[] = [];
    if (stats.awaiting > 0) todo.push(`${plural(stats.awaiting, 'job')} without a pack`);
    if (stats.draft > 0) todo.push(`${plural(stats.draft, 'draft')} to finish and send`);
    if (stats.unsignedPeople > 0)
      todo.push(
        `${plural(stats.unsignedPeople, 'signature')} missing on ${plural(stats.inProgress, 'pack')}`
      );
    else if (stats.inProgress > 0) todo.push(`${plural(stats.inProgress, 'pack')} out for signing`);
    if (stats.certPacks > 0)
      todo.push(`${plural(stats.certPacks, 'pack')} with someone missing a certificate`);
    return todo.length
      ? `${todo.join(', ')}.`
      : `${plural(stats.complete, 'pack')} complete. Nothing waiting.`;
  })();

  const openNew = () => {
    if (contextJobId) setPackPrefillJobId(contextJobId);
    setShowNewJobPack(true);
  };

  const hero = (
    <PageHero
      title="Job packs"
      description={isLoading ? 'Loading job packs.' : liveLine}
      actions={
        <HeroActions>
          <HeroPrimary
            data-help="jobpacks.new"
            onClick={openNew}
            icon={<Plus className="h-4 w-4" />}
          >
            New pack
          </HeroPrimary>
          <HeroSecondary
            label="Site safety PDF"
            onClick={() => setExportJobId(contextJobId ?? null)}
            icon={<FileDown className="h-4 w-4" />}
          >
            Site safety PDF
          </HeroSecondary>
          <ToolButton
            label="Refresh"
            onClick={() => refetch()}
            disabled={isRefetching}
            icon={<RefreshCw className={isRefetching ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />}
          />
          <PageHelpButton help={JOB_PACKS_HELP} blockers={helpBlockers} askContext={helpAsk} />
        </HeroActions>
      }
    />
  );

  if (exportJobId !== undefined) {
    return (
      <JobSafetyPack
        initialJobId={exportJobId}
        backLabel="Job packs"
        onBack={() => setExportJobId(undefined)}
        onNavigate={(section) => navigate(`/employer?section=${section}`)}
      />
    );
  }

  if (isLoading) {
    return (
      <PageFrame className={frameClass}>
        {hero}
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const showAwaiting = activeTab === 'all' && !contextJobId && jobsAwaitingPack.length > 0;

  return (
    <>
      <PageFrame className={frameClass}>
        {hero}

        <HowItWorks help={JOB_PACKS_HELP} blockers={helpBlockers} askContext={helpAsk} />

        <JobContextBar what="RAMS & packs" />

        {packDraft && !showNewJobPack && (
          <ResumeDraftChip
            label={packDraft.v.formData?.title?.trim() || 'untitled pack'}
            detail={`saved ${timeAgoShort(packDraft.savedAt)}`}
            onResume={() => setShowNewJobPack(true)}
            onDiscard={() => clearDraft('new-job-pack', user?.id)}
          />
        )}

        <StatStrip
          columns={4}
          stats={[
            {
              label: 'Draft',
              value: stats.draft,
              tone: stats.draft ? 'yellow' : undefined,
              sub: 'Not sent yet',
              onClick: () => setActiveTab('Draft'),
            },
            {
              label: 'Sent',
              value: stats.inProgress,
              sub:
                stats.unsignedPeople > 0
                  ? `${plural(stats.unsignedPeople, 'signature')} missing`
                  : 'Waiting on signatures',
              onClick: () => setActiveTab('In Progress'),
            },
            {
              label: 'Complete',
              value: stats.complete,
              sub: 'Everyone has signed',
              onClick: () => setActiveTab('Complete'),
            },
            {
              label: 'Jobs to pack',
              value: stats.awaiting,
              tone: stats.awaiting ? 'yellow' : undefined,
              sub: 'Live jobs with no pack',
              onClick: () => setActiveTab('all'),
            },
          ]}
        />

        <FilterRow>
          <Segments
            items={[
              { value: 'all' as StatusTab, label: 'All' },
              { value: 'Draft' as StatusTab, label: 'Draft' },
              { value: 'In Progress' as StatusTab, label: 'Sent' },
              { value: 'Complete' as StatusTab, label: 'Complete' },
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />
          <SearchField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search job packs"
            className="lg:w-72"
          />
        </FilterRow>

        <div className={showAwaiting ? twoColClass : undefined}>
          <div className={colClass}>
            <section data-help="jobpacks.list">
              <PanelTitle title="Job packs" meta={`${filteredJobPacks.length}`} />
              {filteredJobPacks.length === 0 ? (
                <PlainEmpty
                  text={
                    activeTab === 'all'
                      ? 'Packs appear here, each with its scope, RAMS, method statement, briefing and sign-offs.'
                      : `No ${(statusLabel[activeTab] ?? activeTab).toLowerCase()} packs.`
                  }
                  action={contextJobId ? 'Create a pack for this job' : 'Create job pack'}
                  onAction={openNew}
                />
              ) : (
                <RowList>
                  {filteredJobPacks.map((jobPack) => {
                    const assignedEmployees = employees.filter((e) =>
                      jobPack.assigned_workers?.includes(e.id)
                    );
                    const docProgress = getDocumentProgress(jobPack);
                    const allDocsReady = docProgress === 3;
                    const canSend =
                      allDocsReady && jobPack.status === 'Draft' && assignedEmployees.length > 0;
                    const sign = signing.get(jobPack.id);
                    const canChase = jobPack.status === 'In Progress' && (sign?.unsigned ?? 0) > 0;
                    const gaps =
                      jobPack.status !== 'Complete' ? certGaps.get(jobPack.id) : undefined;

                    const detail = [
                      jobPack.client,
                      jobPack.status === 'Draft' ? `Docs ${docProgress}/3` : null,
                      jobPack.status !== 'Draft' && sign && sign.total > 0
                        ? `${sign.signed} of ${sign.total} signed`
                        : assignedEmployees.length > 0
                          ? `${assignedEmployees.length} worker${assignedEmployees.length !== 1 ? 's' : ''}`
                          : null,
                      jobPack.location,
                    ]
                      .filter(Boolean)
                      .join(' · ');

                    return (
                      <Row
                        key={jobPack.id}
                        onClick={() => handleJobPackClick(jobPack)}
                        title={jobPack.title}
                        detail={detail}
                        meta={
                          gaps?.length ? (
                            <span className="text-red-400">
                              {gaps[0]}
                              {gaps.length > 1 ? `, and ${gaps.length - 1} more` : ''}
                            </span>
                          ) : undefined
                        }
                        trailing={
                          <>
                            {!allDocsReady && (
                              /* Opens the pack's Documents tab where the REAL AI
                                 generation lives — the old handler just flipped
                                 the _generated flags, so "Docs 3/3" (and Send)
                                 could be reached with zero actual RAMS content. */
                              <span
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleJobPackClick(jobPack);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleJobPackClick(jobPack);
                                  }
                                }}
                                className="hidden sm:inline-flex h-11 items-center px-4 rounded-full border border-white/[0.14] text-white text-[13px] font-semibold touch-manipulation hover:bg-white/[0.06] transition-colors"
                              >
                                Generate
                              </span>
                            )}
                            {canSend && (
                              <span
                                role="button"
                                tabIndex={0}
                                onClick={(e) => handleSendToWorkers(e, jobPack)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleSendToWorkers(e as unknown as React.MouseEvent, jobPack);
                                  }
                                }}
                                className="hidden sm:inline-flex h-11 items-center px-4 rounded-full border border-elec-yellow text-elec-yellow text-[13px] font-semibold touch-manipulation hover:bg-white/[0.06]"
                              >
                                Send
                              </span>
                            )}
                            {canChase && (
                              <span
                                role="button"
                                tabIndex={0}
                                aria-disabled={chasingId === jobPack.id}
                                onClick={(e) => handleChase(e, jobPack)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleChase(e, jobPack);
                                  }
                                }}
                                className="inline-flex h-11 items-center whitespace-nowrap rounded-full border border-white/[0.18] bg-white/[0.06] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.1] aria-disabled:opacity-50"
                              >
                                {chasingId === jobPack.id
                                  ? 'Chasing'
                                  : `Chase ${sign?.unsigned ?? 0}`}
                                <span className="hidden sm:inline">&nbsp;unsigned</span>
                              </span>
                            )}
                            <StatusPill
                              tone={jobPack.status === 'Complete' ? 'green' : 'neutral'}
                              className={canChase ? 'hidden sm:inline-flex' : undefined}
                            >
                              {statusLabel[jobPack.status] ?? jobPack.status}
                            </StatusPill>
                          </>
                        }
                      />
                    );
                  })}
                </RowList>
              )}
            </section>
          </div>

          {showAwaiting && (
            <div className={colClass}>
              <section>
                <PanelTitle
                  title="Jobs awaiting a pack"
                  meta={
                    stats.awaiting > jobsAwaitingPack.length
                      ? `${jobsAwaitingPack.length} of ${stats.awaiting}`
                      : `${stats.awaiting}`
                  }
                  action="New pack"
                  onAction={() => setShowNewJobPack(true)}
                />
                <RowList>
                  {jobsAwaitingPack.map((job) => (
                    <Row
                      key={job.id}
                      title={job.title}
                      detail={job.client}
                      onClick={() => {
                        // Pre-select THIS job in the wizard, not a blank form.
                        setPackPrefillJobId(job.id);
                        setShowNewJobPack(true);
                      }}
                    />
                  ))}
                </RowList>
              </section>
            </div>
          )}
        </div>
      </PageFrame>

      <AddJobPackDialog
        open={showNewJobPack}
        onOpenChange={(open) => {
          setShowNewJobPack(open);
          if (!open) setPackPrefillJobId(null);
        }}
        initialJobId={packPrefillJobId}
      />

      <ViewJobPackSheet
        jobPack={selectedJobPack}
        open={showJobPackSheet}
        onOpenChange={setShowJobPackSheet}
        onExportSitePack={(jobId) => {
          setShowJobPackSheet(false);
          setExportJobId(jobId);
        }}
      />
    </>
  );
};
