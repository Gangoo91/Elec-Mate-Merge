import { useState, useEffect, useMemo } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  Eyebrow,
  Divider,
  EmptyState,
  LoadingBlocks,
  IconButton,
  Dot,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
  type Tone,
} from '@/components/employer/editorial';
import {
  useClientPortalLinks,
  usePortalLinkByJob,
  usePortalStats,
  useCreatePortalLink,
  useUpdatePortalPermissions,
  useRegenerateToken,
  useTogglePortalActive,
  useDeletePortalLink,
  type PortalPermissions,
} from '@/hooks/useClientPortal';
import { useJobs } from '@/hooks/useJobs';
import { useProgressLogs } from '@/hooks/useProgressLogs';
import {
  ExternalLink,
  Copy,
  Eye,
  Calendar,
  Clock,
  RefreshCw,
  Camera,
  Loader2,
  Trash2,
  Power,
  Mail,
  Plus,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

function getInitials(name?: string | null): string {
  if (!name) return 'CL';
  return name
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('') || 'CL';
}

export function ClientPortalSection() {
  const isMobile = useIsMobile();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [search, setSearch] = useState('');

  const { data: jobs, isLoading: jobsLoading } = useJobs();
  const { data: portalLinks, isLoading: linksLoading } = useClientPortalLinks();
  const { data: stats } = usePortalStats();
  const { data: portalLink, isLoading: linkLoading } = usePortalLinkByJob(
    selectedJobId || undefined
  );
  const { data: progressLogs } = useProgressLogs();

  const createPortalLink = useCreatePortalLink();
  const updatePermissions = useUpdatePortalPermissions();
  const regenerateToken = useRegenerateToken();
  const toggleActive = useTogglePortalActive();
  const deleteLink = useDeletePortalLink();

  const activeJobs = useMemo(
    () =>
      jobs?.filter((j) => j.status === 'Active' || j.status === 'Completed') ||
      [],
    [jobs]
  );

  useEffect(() => {
    if (!selectedJobId && activeJobs.length > 0) {
      setSelectedJobId(activeJobs[0].id);
    }
  }, [activeJobs, selectedJobId]);

  const selectedJob = activeJobs.find((j) => j.id === selectedJobId);
  const jobLogs = progressLogs?.filter((l) => l.job_id === selectedJobId) || [];

  const portalSettings: PortalPermissions = portalLink?.permissions || {
    showProgress: true,
    showPhotos: true,
    showTimeline: true,
    showIssues: false,
    allowMessages: true,
    showBeforePhotos: true,
    showDuringPhotos: true,
    showAfterPhotos: true,
    showCompletionPhotos: true,
    showIssuePhotos: false,
  };

  const getPortalUrl = () => {
    if (!portalLink) return '';
    return `${window.location.origin}/portal/${portalLink.access_token}`;
  };

  const handleCopyLink = async () => {
    if (portalLink) {
      await copyToClipboard(getPortalUrl());
      toast({
        title: 'Link copied',
        description: 'Client portal link copied to clipboard.',
      });
    }
  };

  const handleOpenPortal = () => {
    if (portalLink) openExternalUrl(getPortalUrl());
  };

  const handleSendEmail = () => {
    if (selectedJob) {
      toast({
        title: 'Email sent',
        description: `Portal link sent to ${portalLink?.client_name || selectedJob.client}.`,
      });
    }
  };

  const handleRefreshLink = async () => {
    if (portalLink) {
      await regenerateToken.mutateAsync(portalLink.id);
      toast({
        title: 'Link refreshed',
        description: 'A new portal link has been generated.',
      });
    }
  };

  const handleCreateLink = async () => {
    if (!selectedJob) return;
    await createPortalLink.mutateAsync({
      job_id: selectedJob.id,
      client_name: selectedJob.client || 'Client',
      client_email: undefined,
    });
  };

  const handleToggleSetting = async (
    key: keyof PortalPermissions,
    value: boolean
  ) => {
    if (!portalLink) return;
    await updatePermissions.mutateAsync({
      id: portalLink.id,
      permissions: { [key]: value },
    });
  };

  const handleToggleActive = async () => {
    if (!portalLink) return;
    await toggleActive.mutateAsync({
      id: portalLink.id,
      is_active: !portalLink.is_active,
    });
  };

  const handleDelete = async () => {
    if (!portalLink) return;
    await deleteLink.mutateAsync(portalLink.id);
  };

  const handleInviteClient = () => {
    if (activeJobs.length === 0) {
      toast({
        title: 'No active jobs',
        description: 'Create or activate a job before inviting a client.',
      });
      return;
    }
    toast({
      title: 'Invite client',
      description: 'Pick a job below and create a portal link to invite them.',
    });
  };

  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return activeJobs.filter((job) => {
      const link = portalLinks?.find((l) => l.job_id === job.id);
      const isActiveLink = link?.is_active === true;
      const isPausedLink = !!link && link.is_active === false;

      if (filter === 'active' && !isActiveLink) return false;
      if (filter === 'paused' && !isPausedLink) return false;

      if (!q) return true;
      const hay = [job.title, job.client].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [activeJobs, portalLinks, filter, search]);

  const tabs = useMemo(() => {
    const all = activeJobs.length;
    const active = (portalLinks || []).filter((l) => l.is_active).length;
    const paused = (portalLinks || []).filter((l) => l.is_active === false).length;
    return [
      { value: 'all', label: 'All', count: all },
      { value: 'active', label: 'Active', count: active },
      { value: 'paused', label: 'Paused', count: paused },
    ];
  }, [activeJobs, portalLinks]);

  const heroActions = (
    <>
      <PrimaryButton onClick={handleInviteClient}>Invite client</PrimaryButton>
      <IconButton onClick={handleRefreshLink} aria-label="Refresh">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
    </>
  );

  const isLoading = jobsLoading || linksLoading;

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Operations"
          title="Client Portal"
          description="White-label portal — clients see their jobs, photos, certs and pay links."
          tone="purple"
          actions={heroActions}
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const activeClientsCount =
    (portalLinks || []).filter((l) => l.is_active).length;
  const portalViews = stats?.totalViews || 0;
  const unpaidJobs = activeJobs.filter(
    (j) => j.status === 'Active' || j.status === 'Completed'
  ).length;
  const paidViaPortal = stats?.recentlyViewed || 0;

  const openPortalDetail = (jobId: string) => {
    setSelectedJobId(jobId);
    setDetailOpen(true);
  };

  const PortalPreview = () => {
    if (!selectedJob) return null;
    return (
      <div className="space-y-5">
        <div>
          <Eyebrow>Job</Eyebrow>
          <div className="mt-2 text-xl font-semibold text-white tracking-tight">
            {selectedJob.title}
          </div>
          <div className="mt-1 text-[13px] text-white">{selectedJob.client}</div>
        </div>

        {portalSettings.showProgress && (
          <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4">
            <div className="flex items-center justify-between">
              <Eyebrow>Project progress</Eyebrow>
              <span className="text-xl font-semibold text-elec-yellow tabular-nums">
                {selectedJob.progress || 0}%
              </span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full bg-elec-yellow"
                style={{ width: `${selectedJob.progress || 0}%` }}
              />
            </div>
          </div>
        )}

        {portalSettings.showTimeline && (
          <div className="grid grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="bg-[hsl(0_0%_10%)] px-4 py-4">
              <Eyebrow>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> Start
                </span>
              </Eyebrow>
              <div className="mt-2 text-sm font-semibold text-white">
                {selectedJob.start_date
                  ? new Date(selectedJob.start_date).toLocaleDateString('en-GB')
                  : 'TBC'}
              </div>
            </div>
            <div className="bg-[hsl(0_0%_10%)] px-4 py-4">
              <Eyebrow>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> Expected
                </span>
              </Eyebrow>
              <div className="mt-2 text-sm font-semibold text-white">
                {selectedJob.end_date
                  ? new Date(selectedJob.end_date).toLocaleDateString('en-GB')
                  : 'TBC'}
              </div>
            </div>
          </div>
        )}

        {jobLogs.length > 0 && (
          <ListCard>
            <ListCardHeader
              tone="blue"
              title="Latest updates"
              meta={<Pill tone="blue">{jobLogs.length}</Pill>}
            />
            <ListBody>
              {jobLogs.slice(0, 3).map((log) => (
                <ListRow
                  key={log.id}
                  title={
                    <span className="text-white">
                      {new Date(log.date).toLocaleDateString('en-GB')}
                    </span>
                  }
                  subtitle={log.summary}
                  trailing={
                    log.hours_worked ? (
                      <Pill tone="amber">
                        <Clock className="h-2.5 w-2.5 mr-1" />
                        {log.hours_worked}h
                      </Pill>
                    ) : undefined
                  }
                />
              ))}
            </ListBody>
          </ListCard>
        )}

        {portalSettings.showPhotos && (
          <div>
            <Eyebrow>Progress photos</Eyebrow>
            <div className="mt-3 flex gap-2 flex-wrap">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06] flex items-center justify-center"
                >
                  <Camera className="h-5 w-5 text-white" />
                </div>
              ))}
            </div>
          </div>
        )}

        {portalSettings.allowMessages && (
          <PrimaryButton
            onClick={() =>
              toast({
                title: 'Preview mode',
                description: 'Clients can message you from their portal link.',
              })
            }
            fullWidth
          >
            <Mail className="h-4 w-4 mr-2" />
            Send message
          </PrimaryButton>
        )}
      </div>
    );
  };

  return (
    <PageFrame>
      <PageHero
        eyebrow="Operations"
        title="Client Portal"
        description="White-label portal — clients see their jobs, photos, certs and pay links."
        tone="purple"
        actions={heroActions}
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Active clients', value: activeClientsCount, tone: 'purple' },
          { label: 'Portal views 30d', value: portalViews, tone: 'blue' },
          { label: 'Unpaid jobs', value: unpaidJobs, tone: 'amber' },
          {
            label: 'Paid via portal',
            value: paidViaPortal,
            tone: 'emerald',
            accent: true,
          },
        ]}
      />

      <FilterBar
        tabs={tabs}
        activeTab={filter}
        onTabChange={(v) => setFilter(v as 'all' | 'active' | 'paused')}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search jobs or clients…"
      />

      {filteredJobs.length === 0 ? (
        <EmptyState
          title="No matching jobs"
          description={
            activeJobs.length === 0
              ? 'Create an active job to start sharing portal links with clients.'
              : 'Adjust your filter or search to find a job.'
          }
          action={activeJobs.length === 0 ? undefined : 'Clear filters'}
          onAction={
            activeJobs.length === 0
              ? undefined
              : () => {
                  setFilter('all');
                  setSearch('');
                }
          }
        />
      ) : (
        <ListCard>
          <ListCardHeader
            tone="purple"
            title="Clients"
            meta={<Pill tone="purple">{filteredJobs.length}</Pill>}
          />
          <ListBody>
            {filteredJobs.map((job) => {
              const link = portalLinks?.find((l) => l.job_id === job.id);
              const status: 'Active' | 'Paused' | 'No link' = link
                ? link.is_active
                  ? 'Active'
                  : 'Paused'
                : 'No link';
              const statusTone: Tone =
                status === 'Active'
                  ? 'emerald'
                  : status === 'Paused'
                    ? 'amber'
                    : 'red';
              const clientName = job.client || link?.client_name || 'Client';
              const subtitle = `${job.title} · ${job.progress || 0}%`;

              return (
                <ListRow
                  key={job.id}
                  lead={<Avatar initials={getInitials(clientName)} />}
                  title={clientName}
                  subtitle={subtitle}
                  trailing={
                    <>
                      {link && link.views_count > 0 && (
                        <Pill tone="blue">
                          <Eye className="h-2.5 w-2.5 mr-1" />
                          {link.views_count}
                        </Pill>
                      )}
                      <Pill tone={statusTone}>{status}</Pill>
                    </>
                  }
                  onClick={() => openPortalDetail(job.id)}
                />
              );
            })}
          </ListBody>
        </ListCard>
      )}

      <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={
            isMobile
              ? 'h-[92vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_10%)] border-white/[0.06]'
              : 'w-full sm:max-w-2xl p-0 flex flex-col bg-[hsl(0_0%_10%)] border-white/[0.06]'
          }
        >
          <SheetHeader className="px-5 sm:px-6 py-4 border-b border-white/[0.06]">
            <SheetTitle className="text-white text-base sm:text-lg font-semibold tracking-tight">
              {selectedJob?.client || portalLink?.client_name || 'Client portal'}
            </SheetTitle>
            <div className="mt-1 text-[12px] text-white">
              {selectedJob?.title}
            </div>
          </SheetHeader>
          <ScrollArea className="flex-1 overscroll-contain">
            <div className="p-5 sm:p-6 space-y-6">
              {linkLoading ? (
                <LoadingBlocks />
              ) : portalLink ? (
                <>
                  <div className="flex items-center justify-between">
                    <Eyebrow>Portal link</Eyebrow>
                    <Pill tone={portalLink.is_active ? 'emerald' : 'amber'}>
                      <Dot
                        tone={portalLink.is_active ? 'emerald' : 'amber'}
                        className="mr-1.5"
                      />
                      {portalLink.is_active ? 'Active' : 'Paused'}
                    </Pill>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={getPortalUrl()}
                      readOnly
                      className={inputClass}
                    />
                    <IconButton onClick={handleCopyLink} aria-label="Copy link">
                      <Copy className="h-4 w-4" />
                    </IconButton>
                    <IconButton
                      onClick={handleRefreshLink}
                      disabled={regenerateToken.isPending}
                      aria-label="Regenerate link"
                    >
                      {regenerateToken.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                    </IconButton>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <PrimaryButton onClick={handleSendEmail} fullWidth>
                      <Mail className="h-4 w-4 mr-2" />
                      Email to client
                    </PrimaryButton>
                    <SecondaryButton
                      onClick={handleToggleActive}
                      disabled={toggleActive.isPending}
                      fullWidth
                    >
                      {toggleActive.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Power className="h-4 w-4 mr-2" />
                          {portalLink.is_active ? 'Pause' : 'Resume'}
                        </>
                      )}
                    </SecondaryButton>
                    {isMobile ? (
                      <SecondaryButton onClick={() => setPreviewOpen(true)} fullWidth>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </SecondaryButton>
                    ) : (
                      <SecondaryButton onClick={handleOpenPortal} fullWidth>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open portal
                      </SecondaryButton>
                    )}
                  </div>

                  {portalLink.views_count > 0 && (
                    <StatStrip
                      columns={2}
                      stats={[
                        {
                          label: 'Total views',
                          value: portalLink.views_count,
                          tone: 'blue',
                        },
                        {
                          label: 'Last viewed',
                          value: portalLink.last_accessed_at
                            ? new Date(
                                portalLink.last_accessed_at
                              ).toLocaleDateString('en-GB')
                            : '—',
                        },
                      ]}
                    />
                  )}

                  <Divider label="Visibility" />

                  <ListCard>
                    <ListCardHeader
                      tone="purple"
                      title="What clients see"
                      meta={<Pill tone="purple">Toggles</Pill>}
                    />
                    <ListBody>
                      {[
                        { key: 'showProgress', label: 'Show progress' },
                        { key: 'showPhotos', label: 'Show photos' },
                        { key: 'showTimeline', label: 'Show timeline' },
                        { key: 'showIssues', label: 'Show issues' },
                        { key: 'allowMessages', label: 'Allow messages' },
                      ].map(({ key, label }) => (
                        <ListRow
                          key={key}
                          title={label}
                          trailing={
                            <Switch
                              checked={
                                portalSettings[key as keyof PortalPermissions]
                              }
                              onCheckedChange={(checked) =>
                                handleToggleSetting(
                                  key as keyof PortalPermissions,
                                  checked
                                )
                              }
                              disabled={updatePermissions.isPending}
                            />
                          }
                        />
                      ))}
                    </ListBody>
                  </ListCard>

                  {portalSettings.showPhotos && (
                    <ListCard>
                      <ListCardHeader
                        tone="amber"
                        title="Photo categories"
                        meta={<Pill tone="amber">Per-stage</Pill>}
                      />
                      <ListBody>
                        {[
                          {
                            key: 'showBeforePhotos',
                            label: 'Before',
                            tone: 'blue' as Tone,
                          },
                          {
                            key: 'showDuringPhotos',
                            label: 'During',
                            tone: 'amber' as Tone,
                          },
                          {
                            key: 'showAfterPhotos',
                            label: 'After',
                            tone: 'emerald' as Tone,
                          },
                          {
                            key: 'showCompletionPhotos',
                            label: 'Completion',
                            tone: 'purple' as Tone,
                          },
                          {
                            key: 'showIssuePhotos',
                            label: 'Issue',
                            tone: 'red' as Tone,
                          },
                        ].map(({ key, label, tone }) => (
                          <ListRow
                            key={key}
                            lead={<Dot tone={tone} className="ml-1" />}
                            title={label}
                            trailing={
                              <Switch
                                checked={
                                  portalSettings[key as keyof PortalPermissions]
                                }
                                onCheckedChange={(checked) =>
                                  handleToggleSetting(
                                    key as keyof PortalPermissions,
                                    checked
                                  )
                                }
                                disabled={updatePermissions.isPending}
                              />
                            }
                          />
                        ))}
                      </ListBody>
                    </ListCard>
                  )}

                  {!isMobile && (
                    <>
                      <Divider label="Preview" />
                      <ListCard>
                        <ListCardHeader
                          tone="yellow"
                          title="Client view preview"
                          meta={<Pill tone="yellow">Live</Pill>}
                        />
                        <div className="p-5 sm:p-6">
                          <PortalPreview />
                        </div>
                      </ListCard>
                    </>
                  )}

                  <Divider />

                  <div className="flex justify-end">
                    <DestructiveButton
                      onClick={handleDelete}
                      disabled={deleteLink.isPending}
                    >
                      {deleteLink.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Trash2 className="h-4 w-4 mr-2" />
                      )}
                      Delete portal link
                    </DestructiveButton>
                  </div>
                </>
              ) : (
                <EmptyState
                  title="No portal link for this job"
                  description="Generate a unique link so this client can view progress, photos, certs and invoices."
                  action={
                    createPortalLink.isPending
                      ? 'Creating…'
                      : 'Create portal link'
                  }
                  onAction={
                    createPortalLink.isPending ? undefined : handleCreateLink
                  }
                />
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
        <SheetContent
          side="bottom"
          className="h-[88vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          <SheetHeader className="px-5 py-4 border-b border-white/[0.06]">
            <SheetTitle className="text-white text-base font-semibold tracking-tight">
              Client view preview
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 overscroll-contain">
            <div className="p-5">
              <PortalPreview />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {!portalLink && selectedJob && !detailOpen && (
        <div className="fixed bottom-6 right-6 z-30">
          <PrimaryButton
            onClick={handleCreateLink}
            disabled={createPortalLink.isPending}
            size="lg"
            className="shadow-lg"
          >
            {createPortalLink.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            Create portal link
          </PrimaryButton>
        </div>
      )}
    </PageFrame>
  );
}
