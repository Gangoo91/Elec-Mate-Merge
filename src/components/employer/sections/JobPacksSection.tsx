import { useState, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useJobPacks, useUpdateJobPackDocument, useUpdateJobPack } from '@/hooks/useJobPacks';
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

export const JobPacksSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewJobPack, setShowNewJobPack] = useState(false);
  const [selectedJobPack, setSelectedJobPack] = useState<JobPack | null>(null);
  const [showJobPackSheet, setShowJobPackSheet] = useState(false);
  const [activeTab, setActiveTab] = useState<StatusTab>('all');

  const { data: jobPacks = [], isLoading, refetch, isRefetching } = useJobPacks();
  const { data: employees = [] } = useEmployees();
  const { data: jobs = [] } = useJobs();
  const updateDocument = useUpdateJobPackDocument();
  const updateJobPack = useUpdateJobPack();

  const jobPackJobIds = useMemo(
    () => new Set(jobPacks.map((jp) => jp.title.toLowerCase())),
    [jobPacks]
  );

  const jobsAwaitingPack = useMemo(
    () =>
      jobs
        .filter(
          (j) =>
            (j.status === 'Active' || j.status === 'Pending') &&
            !jobPackJobIds.has(j.title.toLowerCase())
        )
        .slice(0, 5),
    [jobs, jobPackJobIds]
  );

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
    awaiting: jobsAwaitingPack.length,
  };

  const handleGenerateDocument = async (
    e: React.MouseEvent,
    jobPackId: string,
    documentType: 'rams_generated' | 'method_statement_generated' | 'briefing_pack_generated',
    documentName: string
  ) => {
    e.stopPropagation();
    try {
      await updateDocument.mutateAsync({ id: jobPackId, documentType, status: true });
      toast({
        title: `${documentName} Generated`,
        description: `${documentName} has been auto-generated.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to generate ${documentName}.`,
        variant: 'destructive',
      });
    }
  };

  const handleSendToWorkers = async (e: React.MouseEvent, jobPack: JobPack) => {
    e.stopPropagation();
    try {
      await updateJobPack.mutateAsync({
        id: jobPack.id,
        updates: {
          status: 'In Progress',
          sent_to_workers_at: new Date().toISOString(),
        },
      });
      toast({
        title: 'Job Pack Sent',
        description: `${jobPack.title} has been sent to assigned workers.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send job pack.',
        variant: 'destructive',
      });
    }
  };

  const handleJobPackClick = (jobPack: JobPack) => {
    setSelectedJobPack(jobPack);
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
              <IconButton
                onClick={() => refetch()}
                disabled={isRefetching}
                aria-label="Refresh"
              >
                <RefreshCw className={isRefetching ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />
              </IconButton>
            </>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Active', value: stats.inProgress },
            { label: 'Awaiting Signature', value: stats.awaiting, tone: 'orange' },
            { label: 'Signed', value: stats.draft, tone: 'emerald' },
            { label: 'Completed', value: stats.complete, accent: true },
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
                  onClick={() => setShowNewJobPack(true)}
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
                  activeTab === 'all'
                    ? 'No job packs yet'
                    : `No ${activeTab.toLowerCase()} packs`
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

                const subtitleBits = [jobPack.client, jobPack.location]
                  .filter(Boolean)
                  .join(' · ');

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
                          <button
                            onClick={(e) => {
                              if (!jobPack.rams_generated) {
                                handleGenerateDocument(
                                  e,
                                  jobPack.id,
                                  'rams_generated',
                                  'RAMS'
                                );
                              } else if (!jobPack.method_statement_generated) {
                                handleGenerateDocument(
                                  e,
                                  jobPack.id,
                                  'method_statement_generated',
                                  'Method Statement'
                                );
                              } else {
                                handleGenerateDocument(
                                  e,
                                  jobPack.id,
                                  'briefing_pack_generated',
                                  'Briefing Pack'
                                );
                              }
                            }}
                            className="hidden sm:inline-flex h-8 px-3 rounded-full bg-white/[0.06] border border-white/[0.08] text-white text-[12px] font-medium touch-manipulation hover:bg-white/[0.1] transition-colors"
                          >
                            Generate
                          </button>
                        )}
                        {canSend && (
                          <button
                            onClick={(e) => handleSendToWorkers(e, jobPack)}
                            className="hidden sm:inline-flex h-8 px-3 rounded-full bg-elec-yellow text-black text-[12px] font-semibold touch-manipulation"
                          >
                            Send
                          </button>
                        )}
                        <Pill tone={tone}>{jobPack.status}</Pill>
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

      <AddJobPackDialog open={showNewJobPack} onOpenChange={setShowNewJobPack} />

      <ViewJobPackSheet
        jobPack={selectedJobPack}
        open={showJobPackSheet}
        onOpenChange={setShowJobPackSheet}
      />
    </>
  );
};
