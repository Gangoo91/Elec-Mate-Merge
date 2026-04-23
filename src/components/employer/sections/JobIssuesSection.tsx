import { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RefreshCw, Loader2, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { format, formatDistanceToNow } from 'date-fns';
import {
  useJobIssues,
  useJobIssueStats,
  useCreateJobIssue,
  useUpdateJobIssueStatus,
  useDeleteJobIssue,
  type JobIssue,
  type CreateJobIssueInput,
  type IssueType,
  type IssueSeverity,
  type IssueStatus,
} from '@/hooks/useJobIssues';
import { useJobs } from '@/hooks/useJobs';
import { useEmployees } from '@/hooks/useEmployees';

import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { SwipeableRow } from '@/components/ui/swipeable-row';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
  IconButton,
  EmptyState,
  LoadingBlocks,
  Divider,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  FormCard,
  FormGrid,
  Field,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/employer/editorial';

type FilterTab = 'all' | 'open' | 'critical' | 'in_progress' | 'resolved';

const severityToTone: Record<IssueSeverity, Tone> = {
  Critical: 'red',
  High: 'red',
  Medium: 'amber',
  Low: 'blue',
};

const statusToTone: Record<IssueStatus, Tone> = {
  Open: 'red',
  'In Progress': 'orange',
  Resolved: 'emerald',
  Closed: 'blue',
  Rejected: 'amber',
};

function getInitials(name?: string | null): string {
  if (!name) return 'NA';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'NA';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function timeAgo(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true });
  } catch {
    return '';
  }
}

function resolvedThisWeek(issues: JobIssue[]): number {
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return issues.filter((i) => {
    if (i.status !== 'Resolved' && i.status !== 'Closed') return false;
    const ts = i.resolved_at ? new Date(i.resolved_at).getTime() : 0;
    return ts >= cutoff;
  }).length;
}

export function JobIssuesSection() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [selectedIssue, setSelectedIssue] = useState<JobIssue | null>(null);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showResolveSheet, setShowResolveSheet] = useState(false);
  const [resolveIssueId, setResolveIssueId] = useState<string | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<CreateJobIssueInput>>({
    job_id: '',
    title: '',
    description: '',
    issue_type: 'Snag',
    severity: 'Medium',
    status: 'Open',
    location: '',
    photos: [],
  });

  const { data: issues = [], isLoading, error, refetch } = useJobIssues();
  const { data: stats } = useJobIssueStats();
  const { data: jobs = [] } = useJobs();
  const { data: employees = [] } = useEmployees();
  const createJobIssue = useCreateJobIssue();
  const updateJobIssueStatus = useUpdateJobIssueStatus();
  const deleteJobIssue = useDeleteJobIssue();

  const handleRefresh = useCallback(async () => {
    await refetch();
    toast({ title: 'Issues refreshed' });
  }, [refetch]);

  const handleResolve = (issueId: string) => {
    setResolveIssueId(issueId);
    setResolutionNotes('');
    setShowResolveSheet(true);
  };

  const handleConfirmResolve = async () => {
    if (resolveIssueId) {
      await updateJobIssueStatus.mutateAsync({
        id: resolveIssueId,
        status: 'Resolved',
        resolution_notes: resolutionNotes,
      });
      setShowResolveSheet(false);
      setResolveIssueId(null);
      setResolutionNotes('');
    }
  };

  const handleStatusChange = async (issueId: string, status: IssueStatus) => {
    await updateJobIssueStatus.mutateAsync({ id: issueId, status });
  };

  const handleCreate = async () => {
    if (!formData.job_id || !formData.title) {
      toast({
        title: 'Error',
        description: 'Please fill in required fields',
        variant: 'destructive',
      });
      return;
    }
    try {
      await createJobIssue.mutateAsync(formData as CreateJobIssueInput);
      setShowCreateSheet(false);
      resetForm();
    } catch (e) {
      // handled in hook
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteJobIssue.mutateAsync(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      job_id: '',
      title: '',
      description: '',
      issue_type: 'Snag',
      severity: 'Medium',
      status: 'Open',
      location: '',
      photos: [],
    });
  };

  const filteredIssues = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return issues.filter((issue) => {
      const matchesSearch =
        !q ||
        issue.title.toLowerCase().includes(q) ||
        issue.description?.toLowerCase().includes(q) ||
        issue.job?.title?.toLowerCase().includes(q);

      let matchesTab = true;
      if (filterTab === 'open') matchesTab = issue.status === 'Open';
      else if (filterTab === 'critical')
        matchesTab = issue.severity === 'Critical' || issue.severity === 'High';
      else if (filterTab === 'in_progress') matchesTab = issue.status === 'In Progress';
      else if (filterTab === 'resolved')
        matchesTab = issue.status === 'Resolved' || issue.status === 'Closed';

      return matchesSearch && matchesTab;
    });
  }, [issues, searchQuery, filterTab]);

  const openCount = stats?.open ?? 0;
  const inProgressCount = stats?.inProgress ?? 0;
  const criticalCount = (stats?.critical ?? 0) + (stats?.high ?? 0);
  const resolved7d = useMemo(() => resolvedThisWeek(issues), [issues]);

  const tabs = [
    { value: 'all', label: 'All', count: issues.length },
    { value: 'open', label: 'Open', count: openCount },
    { value: 'critical', label: 'Critical', count: criticalCount },
    { value: 'in_progress', label: 'In progress', count: inProgressCount },
    { value: 'resolved', label: 'Resolved', count: (stats?.resolved ?? 0) + (stats?.closed ?? 0) },
  ];

  if (isLoading) {
    return (
      <PageFrame>
        <LoadingBlocks />
      </PageFrame>
    );
  }

  if (error) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Operations"
          title="Issues"
          description="Problems, blockers and escalations across all jobs."
          tone="red"
        />
        <EmptyState
          title="Failed to load issues"
          description={error.message}
          action="Try again"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  const content = (
    <PageFrame>
      <PageHero
        eyebrow="Operations"
        title="Issues"
        description="Problems, blockers and escalations across all jobs."
        tone="red"
        actions={
          <>
            <PrimaryButton onClick={() => setShowCreateSheet(true)}>Report issue</PrimaryButton>
            <IconButton onClick={handleRefresh} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </>
        }
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Open', value: openCount, tone: 'red' },
          { label: 'Critical', value: criticalCount, tone: 'red' },
          { label: 'In progress', value: inProgressCount, tone: 'orange' },
          { label: 'Resolved 7d', value: resolved7d, tone: 'emerald' },
        ]}
      />

      <FilterBar
        tabs={tabs}
        activeTab={filterTab}
        onTabChange={(v) => setFilterTab(v as FilterTab)}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search issues, jobs, descriptions…"
      />

      {filteredIssues.length === 0 ? (
        <EmptyState
          title="No issues"
          description="Everything running smoothly."
          action="Report issue"
          onAction={() => setShowCreateSheet(true)}
        />
      ) : (
        <ListCard>
          <ListCardHeader
            tone="red"
            title="Issues"
            meta={<Pill tone="red">{filteredIssues.length}</Pill>}
          />
          <ListBody>
            {filteredIssues.map((issue) => {
              const reporterName =
                issue.assigned_employee?.name || issue.job?.client || 'Unassigned';
              const sevTone = severityToTone[issue.severity];
              const statTone = statusToTone[issue.status];
              const accent: Tone | undefined =
                issue.severity === 'Critical' || issue.severity === 'High' ? 'red' : undefined;

              const row = (
                <ListRow
                  key={issue.id}
                  accent={accent}
                  lead={<Avatar initials={getInitials(reporterName)} />}
                  title={issue.title}
                  subtitle={`${issue.job?.title ?? 'No job'} · ${reporterName} · ${timeAgo(issue.created_at)}`}
                  trailing={
                    <>
                      <Pill tone={sevTone}>{issue.severity}</Pill>
                      <Pill tone={statTone}>{issue.status}</Pill>
                    </>
                  }
                  onClick={() => setSelectedIssue(issue)}
                />
              );

              if (isMobile && issue.status !== 'Resolved' && issue.status !== 'Closed') {
                return (
                  <SwipeableRow
                    key={issue.id}
                    rightAction={{
                      icon: <CheckCircle className="h-6 w-6" />,
                      label: 'Resolve',
                      onClick: () => handleResolve(issue.id),
                      variant: 'success',
                    }}
                    leftAction={{
                      icon: <Trash2 className="h-6 w-6" />,
                      label: 'Delete',
                      onClick: () => setDeleteConfirmId(issue.id),
                      variant: 'destructive',
                    }}
                  >
                    {row}
                  </SwipeableRow>
                );
              }

              return row;
            })}
          </ListBody>
        </ListCard>
      )}

      {/* Create Issue Sheet */}
      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 border-b border-white/[0.06]">
              <SheetTitle className="text-white text-[15px] font-semibold">Report new issue</SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-white text-[12px]">Job *</Label>
                <Select
                  value={formData.job_id}
                  onValueChange={(v) => setFormData((prev) => ({ ...prev, job_id: v }))}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select a job" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title} - {job.client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white text-[12px]">Issue title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Brief description of the issue"
  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-white text-[12px]">Issue type</Label>
                  <Select
                    value={formData.issue_type}
                    onValueChange={(v) =>
                      setFormData((prev) => ({ ...prev, issue_type: v as IssueType }))
                    }
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="Snag">Snag</SelectItem>
                      <SelectItem value="Variation">Variation</SelectItem>
                      <SelectItem value="RFI">RFI</SelectItem>
                      <SelectItem value="Defect">Defect</SelectItem>
                      <SelectItem value="Delay">Delay</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white text-[12px]">Severity</Label>
                  <Select
                    value={formData.severity}
                    onValueChange={(v) =>
                      setFormData((prev) => ({ ...prev, severity: v as IssueSeverity }))
                    }
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white text-[12px]">Location</Label>
                <Input
                  value={formData.location || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, location: e.target.value }))
                  }
                  placeholder="Where on site is this issue?"
  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white text-[12px]">Assign to</Label>
                <Select
                  value={formData.assigned_to || ''}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, assigned_to: v || undefined }))
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name} - {emp.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white text-[12px]">Due date</Label>
                <Input
                  type="date"
                  value={formData.due_date || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, due_date: e.target.value || undefined }))
                  }
className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white text-[12px]">Description</Label>
                <Textarea
                  value={formData.description || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Detailed description of the issue…"
className={`${textareaClass} min-h-[100px]`}
                />
              </div>
            </div>

            <div className="p-4 border-t border-white/[0.06]">
              <PrimaryButton
                onClick={handleCreate}
                disabled={createJobIssue.isPending}
                fullWidth
                size="lg"
              >
                {createJobIssue.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Report issue
              </PrimaryButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Resolve Issue Sheet */}
      <Sheet open={showResolveSheet} onOpenChange={setShowResolveSheet}>
        <SheetContent
          side="bottom"
          className="h-[50vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 border-b border-white/[0.06]">
              <SheetTitle className="text-white text-[15px] font-semibold">Resolve issue</SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-white text-[12px]">Resolution notes</Label>
                <Textarea
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  placeholder="Describe how the issue was resolved…"
className={`${textareaClass} min-h-[120px]`}
                />
              </div>
            </div>

            <div className="p-4 border-t border-white/[0.06]">
              <PrimaryButton
                onClick={handleConfirmResolve}
                disabled={updateJobIssueStatus.isPending}
                fullWidth
                size="lg"
              >
                {updateJobIssueStatus.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Mark as resolved
              </PrimaryButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* View Issue Details Sheet */}
      <Sheet open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          {selectedIssue && (
            <div className="flex flex-col h-full">
              <SheetHeader className="p-4 border-b border-white/[0.06]">
                <div className="flex items-center justify-between gap-3">
                  <SheetTitle className="text-white text-[15px] font-semibold">
                    Issue details
                  </SheetTitle>
                  <Pill tone={statusToTone[selectedIssue.status]}>{selectedIssue.status}</Pill>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-5">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white tracking-tight leading-tight">
                    {selectedIssue.title}
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    <Pill tone={severityToTone[selectedIssue.severity]}>
                      {selectedIssue.severity}
                    </Pill>
                    <Pill tone="blue">{selectedIssue.issue_type}</Pill>
                  </div>
                </div>

                <ListCard>
                  <ListCardHeader tone="blue" title="Job" />
                  <div className="px-5 py-4">
                    <div className="text-[14px] font-semibold text-white">
                      {selectedIssue.job?.title ?? '—'}
                    </div>
                    <div className="mt-1 text-[12px] text-white">
                      {selectedIssue.job?.client ?? '—'}
                    </div>
                  </div>
                </ListCard>

                <StatStrip
                  columns={2}
                  stats={[
                    {
                      label: 'Reported',
                      value: (
                        <span className="text-[15px] sm:text-[18px]">
                          {format(new Date(selectedIssue.created_at), 'dd MMM yyyy')}
                        </span>
                      ),
                    },
                    ...(selectedIssue.location
                      ? [
                          {
                            label: 'Location',
                            value: (
                              <span className="text-[15px] sm:text-[18px]">
                                {selectedIssue.location}
                              </span>
                            ),
                          },
                        ]
                      : []),
                    ...(selectedIssue.due_date
                      ? [
                          {
                            label: 'Due date',
                            value: (
                              <span className="text-[15px] sm:text-[18px]">
                                {format(new Date(selectedIssue.due_date), 'dd MMM yyyy')}
                              </span>
                            ),
                            tone: 'amber' as Tone,
                          },
                        ]
                      : []),
                    ...(selectedIssue.assigned_employee
                      ? [
                          {
                            label: 'Assigned to',
                            value: (
                              <span className="text-[15px] sm:text-[18px]">
                                {selectedIssue.assigned_employee.name}
                              </span>
                            ),
                          },
                        ]
                      : []),
                  ]}
                />

                {selectedIssue.description && (
                  <div className="space-y-2">
                    <Divider label="Description" />
                    <p className="text-[13px] text-white leading-relaxed">
                      {selectedIssue.description}
                    </p>
                  </div>
                )}

                {selectedIssue.resolution_notes && (
                  <div className="space-y-2">
                    <Divider label="Resolution" />
                    <p className="text-[13px] text-white leading-relaxed">
                      {selectedIssue.resolution_notes}
                    </p>
                    {selectedIssue.resolved_at && (
                      <p className="text-[11px] text-white">
                        Resolved on{' '}
                        {format(new Date(selectedIssue.resolved_at), "dd MMM yyyy 'at' HH:mm")}
                      </p>
                    )}
                  </div>
                )}

                {selectedIssue.status !== 'Resolved' && selectedIssue.status !== 'Closed' && (
                  <div className="space-y-2">
                    <Label className="text-white text-[12px]">Update status</Label>
                    <Select
                      value={selectedIssue.status}
                      onValueChange={(v) => handleStatusChange(selectedIssue.id, v as IssueStatus)}
                    >
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-white/[0.06] space-y-2">
                {selectedIssue.status !== 'Resolved' && selectedIssue.status !== 'Closed' && (
                  <PrimaryButton
                    onClick={() => {
                      const id = selectedIssue.id;
                      setSelectedIssue(null);
                      handleResolve(id);
                    }}
                    fullWidth
                    size="lg"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Resolve issue
                  </PrimaryButton>
                )}
                <DestructiveButton
                  onClick={() => {
                    setDeleteConfirmId(selectedIssue.id);
                    setSelectedIssue(null);
                  }}
                  fullWidth
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete issue
                </DestructiveButton>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="bg-[hsl(0_0%_10%)] border-white/[0.06]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete issue?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This action cannot be undone. This will permanently delete the issue record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500/90 text-white hover:bg-red-500"
            >
              {deleteJobIssue.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageFrame>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh} className="h-full">
      {content}
    </PullToRefresh>
  ) : (
    content
  );
}
