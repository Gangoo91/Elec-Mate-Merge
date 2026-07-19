import { useState, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useJobPacks } from '@/hooks/useJobPacks';
import { useEmployees } from '@/hooks/useEmployees';
import { useJobs } from '@/hooks/useJobs';
import { AddJobPackDialog } from '@/components/employer/dialogs/AddJobPackDialog';
import { ViewJobPackSheet } from '@/components/employer/sheets/ViewJobPackSheet';
import { JobPack } from '@/services/jobPackService';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  type Tone,
} from '@/components/employer/editorial';

type StatusTab = 'all' | 'Draft' | 'In Progress' | 'Complete';

const statusTone: Record<string, Tone> = {
  Draft: 'orange',
  'In Progress': 'cyan',
  Complete: 'emerald',
};

// One vocabulary everywhere: tabs and stats say Sent/Signed, so the row
// pills must not say 'In Progress'/'Complete' for the same states
const statusLabel: Record<string, string> = {
  Draft: 'Draft',
  'In Progress': 'Sent',
  Complete: 'Signed',
};

export const JobPacksSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewJobPack, setShowNewJobPack] = useState(false);
  const [selectedJobPackId, setSelectedJobPackId] = useState<string | null>(null);
  const [showJobPackSheet, setShowJobPackSheet] = useState(false);
  const [activeTab, setActiveTab] = useState<StatusTab>('all');
  const [packPrefillJobId, setPackPrefillJobId] = useState<string | null>(null);

  const { data: jobPacks = [], isLoading, refetch, isRefetching } = useJobPacks();
  const { data: employees = [] } = useEmployees();
  const { data: jobs = [] } = useJobs();
  const queryClient = useQueryClient();

  // The sheet reads the LIVE row, not a stale snapshot — after a send the
  // refetched pack (status/sent_to_workers_at) must flow into the open sheet.
  const selectedJobPack = useMemo(
    () => jobPacks.find((jp) => jp.id === selectedJobPackId) ?? null,
    [jobPacks, selectedJobPackId]
  );

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
  }, [jobPacks, activeTab, searchQuery]);

  const stats = {
    total: jobPacks.length,
    draft: jobPacks.filter((jp) => jp.status === 'Draft').length,
    inProgress: jobPacks.filter((jp) => jp.status === 'In Progress').length,
    complete: jobPacks.filter((jp) => jp.status === 'Complete').length,
    awaiting: allJobsAwaitingPack.length,
  };

  const handleSendToWorkers = async (e: React.MouseEvent, jobPack: JobPack) => {
    e.stopPropagation();
    try {
      // Atomic server-side send: status + ack rows + worker pushes in one call
      const { data, error } = await supabase.rpc('send_job_pack', { p_pack_id: jobPack.id });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const r = data as any;
      if (error || r?.error) throw new Error(r?.error || error?.message);
      queryClient.invalidateQueries({ queryKey: ['job-packs'] });

      toast({
        title: 'Job Pack Sent',
        description:
          (r?.workers ?? 0) > 0
            ? `${jobPack.title} is now with ${r.workers} worker${r.workers === 1 ? '' : 's'} for sign-off.`
            : `${jobPack.title} marked sent — assign workers so they can see it.`,
      });
    } catch {
      toast({ title: 'Error', description: 'Could not send the pack.', variant: 'destructive' });
    }
  };

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

  if (isLoading) {
    return (
      <PageFrame>
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <>
      <PageFrame>
        <PageHero
          eyebrow="Operations"
          title="Job Packs"
          description="Scope, docs, sign-offs and checklists bundled per job."
          tone="yellow"
          actions={
            <>
              <PrimaryButton onClick={() => setShowNewJobPack(true)}>New pack</PrimaryButton>
              <IconButton onClick={() => refetch()} disabled={isRefetching} aria-label="Refresh">
                <RefreshCw className={isRefetching ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />
              </IconButton>
            </>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Draft', value: stats.draft },
            { label: 'Sent', value: stats.inProgress, tone: 'orange' },
            { label: 'Signed off', value: stats.complete, tone: 'emerald' },
            { label: 'Jobs to pack', value: stats.awaiting, accent: true },
          ]}
        />

        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: stats.total },
            { value: 'Draft', label: 'Draft', count: stats.draft },
            { value: 'In Progress', label: 'Sent', count: stats.inProgress },
            { value: 'Complete', label: 'Signed', count: stats.complete },
          ]}
          activeTab={activeTab}
          onTabChange={(v) => setActiveTab(v as StatusTab)}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search job packs…"
        />

        {activeTab === 'all' && jobsAwaitingPack.length > 0 && (
          <ListCard>
            <ListCardHeader
              tone="orange"
              title="Jobs awaiting pack"
              meta={<Pill tone="orange">{jobsAwaitingPack.length}</Pill>}
              action="New pack"
              onAction={() => setShowNewJobPack(true)}
            />
            <ListBody>
              {jobsAwaitingPack.map((job) => (
                <ListRow
                  key={job.id}
                  title={job.title}
                  subtitle={job.client}
                  trailing={<Pill tone="amber">No pack</Pill>}
                  onClick={() => {
                    // Pre-select THIS job in the wizard, not a blank form.
                    setPackPrefillJobId(job.id);
                    setShowNewJobPack(true);
                  }}
                />
              ))}
            </ListBody>
          </ListCard>
        )}

        <ListCard>
          <ListCardHeader
            tone="yellow"
            title="Job packs"
            meta={<Pill tone="yellow">{filteredJobPacks.length}</Pill>}
          />
          {filteredJobPacks.length === 0 ? (
            <div className="p-5 sm:p-6">
              <EmptyState
                title={
                  activeTab === 'all' ? 'No job packs yet' : `No ${activeTab.toLowerCase()} packs`
                }
                description="Job packs bundle scope, RAMS, method statements, briefings and sign-offs per job."
                action="Create job pack"
                onAction={() => setShowNewJobPack(true)}
              />
            </div>
          ) : (
            <ListBody>
              {filteredJobPacks.map((jobPack) => {
                const assignedEmployees = employees.filter((e) =>
                  jobPack.assigned_workers?.includes(e.id)
                );
                const docProgress = getDocumentProgress(jobPack);
                const allDocsReady = docProgress === 3;
                const canSend =
                  allDocsReady && jobPack.status === 'Draft' && assignedEmployees.length > 0;
                const tone = statusTone[jobPack.status] ?? 'amber';

                const subtitleBits = [jobPack.client, jobPack.location].filter(Boolean).join(' · ');

                return (
                  <ListRow
                    key={jobPack.id}
                    accent={tone}
                    title={jobPack.title}
                    subtitle={
                      <span>
                        {subtitleBits}
                        <span className="ml-2 tabular-nums">· Docs {docProgress}/3</span>
                        {assignedEmployees.length > 0 && (
                          <span className="ml-2 tabular-nums">
                            · {assignedEmployees.length} worker
                            {assignedEmployees.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </span>
                    }
                    trailing={
                      <>
                        {!allDocsReady && (
                          /* Opens the pack's Documents tab where the REAL AI
                             generation lives — the old handler just flipped
                             the _generated flags, so "Docs 3/3" (and Send)
                             could be reached with zero actual RAMS content. */
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleJobPackClick(jobPack);
                            }}
                            className="hidden sm:inline-flex h-11 px-4 rounded-full bg-white/[0.06] border border-white/[0.08] text-white text-[12px] font-medium touch-manipulation hover:bg-white/[0.1] transition-colors"
                          >
                            Generate
                          </button>
                        )}
                        {canSend && (
                          <button
                            onClick={(e) => handleSendToWorkers(e, jobPack)}
                            className="hidden sm:inline-flex h-11 px-4 rounded-full bg-elec-yellow text-black text-[12px] font-semibold touch-manipulation"
                          >
                            Send
                          </button>
                        )}
                        <Pill tone={tone}>{statusLabel[jobPack.status] ?? jobPack.status}</Pill>
                      </>
                    }
                    onClick={() => handleJobPackClick(jobPack)}
                  />
                );
              })}
            </ListBody>
          )}
        </ListCard>
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
      />
    </>
  );
};
