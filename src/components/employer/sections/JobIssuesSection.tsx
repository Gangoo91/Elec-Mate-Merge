import { useState, useCallback, useMemo, useRef, useEffect, type ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import {
  Camera,
  Check,
  CheckCircle,
  ClipboardCheck,
  FileSignature,
  Loader2,
  Plus,
  RefreshCw,
  RotateCcw,
  Trash2,
  X,
} from 'lucide-react';
import { useJobContext } from '@/hooks/useJobContext';
import { JobContextBar } from '@/components/employer/JobContextBar';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { ISSUES_HELP } from '@/components/employer/help/jobs-quality';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RequestSignatureSheet } from '@/components/employer/sheets/RequestSignatureSheet';
import { toast } from '@/hooks/use-toast';
import { uploadJobPhotos } from '@/utils/uploadJobPhotos';
import { useStorageUrls } from '@/utils/storageUrls';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  useJobIssues,
  useCreateJobIssue,
  useUpdateJobIssueStatus,
  useDeleteJobIssue,
  type JobIssue,
  type CreateJobIssueInput,
  type IssueType,
  type IssueSeverity,
  type IssueStatus,
} from '@/hooks/useJobIssues';
import { useIssueVariations, useRaiseVariationOrder, voReference } from '@/hooks/useIssueVariations';
import {
  useSignatureRequests,
  useApplySignedVariation,
  displayStatus,
  isOpenRequest,
  type SignatureRequest,
} from '@/hooks/useSignatureRequests';
import { useJobs } from '@/hooks/useJobs';
import { useEmployees } from '@/hooks/useEmployees';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { FormSheet } from '@/components/forms/FormSheet';
import { PhotoTile } from '@/components/employer/photos/PhotoTile';
import { PhotoLightbox, type LightboxPhoto } from '@/components/employer/photos/PhotoLightbox';
import { cn } from '@/lib/utils';
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
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/employer/editorial';

/* ==========================================================================
   Issues (ELE-1967). One section for everything raised on a job: snags,
   defects, variations, RFIs, delays. Quality & Snags was a filtered copy of
   the same table and now redirects here (?type=snags).

   - Type tabs, status chips, search; grouped by job.
   - Per-job punch list: every snag and defect, tick them off, add more,
     then get the client to sign the handover (create_signature_request,
     'Handover', document = the job: the signed copy lists anything left).
   - A Variation issue raises a variation order (raise_variation_order),
     which goes to the client to approve (create_signature_request,
     'Variation') and, once signed, into the job value.
   Deep links: ?issue=<id>, ?type=snags|variations|rfis|delays|other,
   ?punch=1&job=<id> opens the punch list.
   ========================================================================== */

type TypeTab = 'all' | 'snags' | 'variations' | 'rfis' | 'delays' | 'other';
type StatusFilter = 'open' | 'resolved' | 'all';

const TYPE_TABS: { value: TypeTab; label: string; types: IssueType[] | null }[] = [
  { value: 'all', label: 'All', types: null },
  { value: 'snags', label: 'Snags & defects', types: ['Snag', 'Defect'] },
  { value: 'variations', label: 'Variations', types: ['Variation'] },
  { value: 'rfis', label: 'Questions (RFI)', types: ['RFI'] },
  { value: 'delays', label: 'Delays', types: ['Delay'] },
  { value: 'other', label: 'Other', types: ['Other'] },
];

const TYPE_DEFAULT: Record<TypeTab, IssueType> = {
  all: 'Snag',
  snags: 'Snag',
  variations: 'Variation',
  rfis: 'RFI',
  delays: 'Delay',
  other: 'Other',
};

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

const typeTone: Record<IssueType, Tone> = {
  Snag: 'orange',
  Defect: 'red',
  Variation: 'purple',
  RFI: 'cyan',
  Delay: 'amber',
  Other: 'blue',
};

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const cardCn =
  'rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.03]';

const isDone = (i: Pick<JobIssue, 'status'>) =>
  i.status === 'Resolved' || i.status === 'Closed' || i.status === 'Rejected';
const isSnag = (i: Pick<JobIssue, 'issue_type'>) => i.issue_type === 'Snag' || i.issue_type === 'Defect';
const money = (n: number) =>
  `${n < 0 ? '-' : '+'}£${Math.abs(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function timeAgo(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true });
  } catch {
    return '';
  }
}

const emptyForm = (type: IssueType = 'Snag'): Partial<CreateJobIssueInput> => ({
  job_id: '',
  title: '',
  description: '',
  issue_type: type,
  severity: 'Medium',
  status: 'Open',
  location: '',
  photos: [],
});

export function JobIssuesSection() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobId: contextJobId } = useJobContext();

  const initialType = (searchParams.get('type') as TypeTab | null) ?? 'all';
  const [typeTab, setTypeTab] = useState<TypeTab>(
    TYPE_TABS.some((t) => t.value === initialType) ? initialType : 'all'
  );
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('open');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [punchJobId, setPunchJobId] = useState<string | null>(null);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [resolveId, setResolveId] = useState<string | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [voPrice, setVoPrice] = useState('');
  const [voSign, setVoSign] = useState<'+' | '-'>('+');
  const [voDesc, setVoDesc] = useState('');
  const [signVo, setSignVo] = useState<{ id: string; jobId: string; title: string } | null>(null);
  const [handoverJob, setHandoverJob] = useState<{ id: string; client: string | null } | null>(null);
  const [quickSnag, setQuickSnag] = useState('');
  const [lightbox, setLightbox] = useState<{ photos: LightboxPhoto[]; index: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [formData, setFormData] = useState<Partial<CreateJobIssueInput>>(emptyForm());

  const { data: allIssues = [], isLoading, error, refetch } = useJobIssues();
  const issues = useMemo(
    () => (contextJobId ? allIssues.filter((i) => i.job_id === contextJobId) : allIssues),
    [allIssues, contextJobId]
  );
  const { data: jobs = [] } = useJobs();
  const { data: employees = [] } = useEmployees();
  const { data: variations = [] } = useIssueVariations();
  const { data: signatures = [] } = useSignatureRequests(contextJobId ?? null);
  const createJobIssue = useCreateJobIssue();
  const updateStatus = useUpdateJobIssueStatus();
  const deleteJobIssue = useDeleteJobIssue();
  const raiseVo = useRaiseVariationOrder();
  const applySigned = useApplySignedVariation();

  const selected = useMemo(() => issues.find((i) => i.id === selectedId) ?? null, [issues, selectedId]);

  /* ---------- deep links ---------- */
  const issueParam = searchParams.get('issue');
  const punchParam = searchParams.get('punch');
  useEffect(() => {
    if (!issueParam || !allIssues.length) return;
    if (allIssues.some((i) => i.id === issueParam)) {
      setSelectedId(issueParam);
      setStatusFilter('all');
    }
  }, [issueParam, allIssues]);
  useEffect(() => {
    if (punchParam && contextJobId) setPunchJobId(contextJobId);
  }, [punchParam, contextJobId]);

  const dropParam = (key: string) =>
    setSearchParams(
      (prev) => {
        const n = new URLSearchParams(prev);
        n.delete(key);
        return n;
      },
      { replace: true }
    );

  const setTab = (v: TypeTab) => {
    setTypeTab(v);
    setSearchParams(
      (prev) => {
        const n = new URLSearchParams(prev);
        if (v === 'all') n.delete('type');
        else n.set('type', v);
        return n;
      },
      { replace: true }
    );
  };

  useEffect(() => {
    if (showCreateSheet) {
      setFormData((prev) => ({
        ...prev,
        job_id: prev.job_id || contextJobId || '',
        issue_type: prev.title ? prev.issue_type : TYPE_DEFAULT[typeTab],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCreateSheet]);

  // Reset the variation form when another issue opens.
  useEffect(() => {
    setVoPrice('');
    setVoSign('+');
    setVoDesc(selected ? [selected.title, selected.description].filter(Boolean).join('\n\n') : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const handleRefresh = useCallback(async () => {
    await refetch();
    toast({ title: 'Issues refreshed' });
  }, [refetch]);

  /* ---------- filtering ---------- */
  const typeOf = (t: TypeTab) => TYPE_TABS.find((x) => x.value === t)?.types ?? null;
  const matchesStatus = (i: JobIssue) =>
    statusFilter === 'all' || (statusFilter === 'open' ? !isDone(i) : isDone(i));

  const tabs = TYPE_TABS.map((t) => ({
    value: t.value,
    label: t.label,
    count: issues.filter((i) => (!t.types || t.types.includes(i.issue_type)) && matchesStatus(i)).length,
  })).filter((t) => t.value === 'all' || t.value === typeTab || t.count > 0 || ['snags', 'variations'].includes(t.value));

  const filtered = useMemo(() => {
    const types = typeOf(typeTab);
    const q = searchQuery.trim().toLowerCase();
    return issues.filter(
      (i) =>
        (!types || types.includes(i.issue_type)) &&
        matchesStatus(i) &&
        (!q ||
          [i.title, i.description, i.location, i.job?.title, i.job?.client, i.reporter?.name, i.assigned_employee?.name]
            .filter(Boolean)
            .some((t) => String(t).toLowerCase().includes(q)))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issues, typeTab, statusFilter, searchQuery]);

  const groups = useMemo(() => {
    const m = new Map<string, { jobId: string; title: string; client: string | null; items: JobIssue[] }>();
    for (const i of filtered) {
      const g = m.get(i.job_id) ?? { jobId: i.job_id, title: i.job?.title ?? 'Job', client: i.job?.client ?? null, items: [] };
      g.items.push(i);
      m.set(i.job_id, g);
    }
    const sevRank: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
    return Array.from(m.values()).map((g) => ({
      ...g,
      items: g.items.sort(
        (a, b) =>
          Number(isDone(a)) - Number(isDone(b)) ||
          (sevRank[a.severity] ?? 9) - (sevRank[b.severity] ?? 9) ||
          b.created_at.localeCompare(a.created_at)
      ),
    }));
  }, [filtered]);

  const voByIssue = useMemo(() => {
    const m = new Map<string, (typeof variations)[number]>();
    variations.forEach((v) => {
      if (!m.has(v.job_issue_id)) m.set(v.job_issue_id, v);
    });
    return m;
  }, [variations]);

  const sigByDoc = useMemo(() => {
    const m = new Map<string, SignatureRequest>();
    signatures.forEach((s) => {
      if (s.document_id && !m.has(s.document_id)) m.set(s.document_id, s);
    });
    return m;
  }, [signatures]);

  const handoverFor = (jobId: string) =>
    signatures.find((s) => s.document_type === 'Handover' && (s.document_id === jobId || s.job_id === jobId)) ?? null;

  const weekAgo = Date.now() - 7 * 86400000;
  const stats = {
    open: issues.filter((i) => !isDone(i)).length,
    snagsOpen: issues.filter((i) => isSnag(i) && !isDone(i)).length,
    toPrice: issues.filter(
      (i) =>
        i.issue_type === 'Variation' &&
        !isDone(i) &&
        (!voByIssue.get(i.id) || voByIssue.get(i.id)?.status === 'Pending')
    ).length,
    resolved7d: issues.filter((i) => isDone(i) && i.resolved_at && new Date(i.resolved_at).getTime() >= weekAgo).length,
  };

  /* ---------- photos ---------- */
  const punchIssues = useMemo(
    () =>
      punchJobId
        ? allIssues
            .filter((i) => i.job_id === punchJobId && isSnag(i) && i.status !== 'Rejected')
            .sort((a, b) => Number(isDone(a)) - Number(isDone(b)) || a.created_at.localeCompare(b.created_at))
        : [],
    [allIssues, punchJobId]
  );
  const { urls: photoSrcs, loading: photosLoading } = useStorageUrls('visual-uploads', [
    ...(selected?.photos ?? []),
    ...(formData.photos ?? []),
    ...punchIssues.flatMap((i) => i.photos ?? []).slice(0, 60),
  ]);
  const openPhotos = (i: JobIssue, index: number) =>
    setLightbox({
      index,
      photos: (i.photos ?? []).map((p, n) => ({
        key: `${i.id}:${n}`,
        url: photoSrcs[p] ?? null,
        title: i.title,
        meta: `${i.job?.title ?? 'Job'} · ${format(new Date(i.created_at), 'd MMM yyyy')}`,
        caption: i.description ?? null,
      })),
    });

  /* ---------- actions ---------- */
  const handlePhotoSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingPhotos(true);
    try {
      const { urls, failed } = await uploadJobPhotos(files, 'issues');
      if (urls.length) setFormData((p) => ({ ...p, photos: [...(p.photos || []), ...urls] }));
      if (failed.length) {
        toast({
          title: `${failed.length} photo${failed.length === 1 ? '' : 's'} not added`,
          description: failed.map((f) => `${f.name}: ${f.reason}`).join(', '),
          variant: 'destructive',
        });
      }
    } catch {
      toast({ title: 'Upload failed', description: 'Could not upload photos. Try again.', variant: 'destructive' });
    } finally {
      setUploadingPhotos(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCreate = async () => {
    if (!formData.job_id || !formData.title?.trim()) {
      toast({ title: 'Pick the job and give it a title', variant: 'destructive' });
      return;
    }
    try {
      await createJobIssue.mutateAsync({ ...formData, title: formData.title.trim() } as CreateJobIssueInput);
      setShowCreateSheet(false);
      setFormData(emptyForm(TYPE_DEFAULT[typeTab]));
    } catch {
      // toast from the hook
    }
  };

  const handleQuickSnag = async () => {
    if (!punchJobId || !quickSnag.trim()) return;
    try {
      await createJobIssue.mutateAsync({
        ...emptyForm('Snag'),
        job_id: punchJobId,
        title: quickSnag.trim(),
      } as CreateJobIssueInput);
      setQuickSnag('');
    } catch {
      // toast from the hook
    }
  };

  const confirmResolve = async () => {
    if (!resolveId) return;
    try {
      await updateStatus.mutateAsync({ id: resolveId, status: 'Resolved', resolution_notes: resolutionNotes.trim() || undefined });
      setResolveId(null);
      setResolutionNotes('');
    } catch {
      // toast from the hook
    }
  };

  const togglePunch = (i: JobIssue) =>
    updateStatus.mutate({
      id: i.id,
      status: isDone(i) ? 'Open' : 'Resolved',
      resolution_notes: isDone(i) ? undefined : i.resolution_notes || 'Fixed (ticked off on the punch list)',
    });

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteJobIssue.mutateAsync(deleteConfirmId);
      setDeleteConfirmId(null);
      setSelectedId(null);
    } catch {
      // toast from the hook
    }
  };

  const handleRaiseVo = async () => {
    if (!selected) return;
    const n = Number(voPrice.replace(/[£,\s]/g, ''));
    if (!Number.isFinite(n) || n === 0) {
      toast({ title: 'Enter the price change', description: 'For example 120 for £120 extra.', variant: 'destructive' });
      return;
    }
    try {
      await raiseVo.mutateAsync({ issueId: selected.id, value: voSign === '-' ? -n : n, description: voDesc.trim() || null });
    } catch {
      // toast from the hook
    }
  };

  const closeIssue = () => {
    setSelectedId(null);
    if (issueParam) dropParam('issue');
  };
  const closePunch = () => {
    setPunchJobId(null);
    if (punchParam) dropParam('punch');
  };

  /* ---------- help ---------- */
  const helpBlockers: HelpBlocker[] = [];
  if (!isLoading && jobs.length === 0) {
    helpBlockers.push({
      text: 'An issue belongs to a job, and there are no jobs yet.',
      fixLabel: 'Add a job',
      onFix: () => navigate('/employer?section=jobs'),
    });
  }

  const heroActions = (
    <>
      <PrimaryButton data-help="issues.report" onClick={() => setShowCreateSheet(true)}>
        <Plus className="h-4 w-4 mr-1.5" />
        Report issue
      </PrimaryButton>
      <IconButton onClick={handleRefresh} aria-label="Refresh">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
      <PageHelpButton help={ISSUES_HELP} blockers={helpBlockers} askContext={{ page: 'issues', tab: typeTab }} />
    </>
  );
  const hero = (
    <PageHero
      eyebrow="Jobs"
      title="Issues"
      description="Snags, defects, variations and anything holding a job up. One list by job, with a punch list for handover."
      tone="red"
      actions={heroActions}
    />
  );

  if (isLoading) {
    return (
      <PageFrame>
        {hero}
        <LoadingBlocks />
      </PageFrame>
    );
  }
  if (error) {
    return (
      <PageFrame>
        {hero}
        <EmptyState title="Couldn't load issues" description={(error as Error).message} action="Try again" onAction={() => refetch()} />
      </PageFrame>
    );
  }

  const contextJob = contextJobId ? jobs.find((j) => j.id === contextJobId) : null;
  const contextSnags = contextJobId ? allIssues.filter((i) => i.job_id === contextJobId && isSnag(i) && i.status !== 'Rejected') : [];
  const punchJob = punchJobId ? jobs.find((j) => j.id === punchJobId) : null;
  const punchDone = punchIssues.filter(isDone).length;
  const punchOpen = punchIssues.length - punchDone;
  const punchSig = punchJobId ? handoverFor(punchJobId) : null;

  const selectedVo = selected ? voByIssue.get(selected.id) : undefined;
  const selectedVoSig = selectedVo ? sigByDoc.get(selectedVo.id) : undefined;

  const content = (
    <PageFrame>
      {hero}

      <HowItWorks help={ISSUES_HELP} blockers={helpBlockers} askContext={{ page: 'issues', tab: typeTab }} />

      <JobContextBar what="Issues" />

      {contextJobId && (
        <button
          type="button"
          data-help="issues.punch-job"
          onClick={() => setPunchJobId(contextJobId)}
          className={cn(cardCn, 'flex w-full items-center gap-3 p-4 text-left touch-manipulation active:scale-[0.99]')}
        >
          <ClipboardCheck className="h-5 w-5 shrink-0 text-white" aria-hidden />
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-semibold text-white">Punch list for {contextJob?.title ?? 'this job'}</span>
            <span className="block text-[12.5px] text-white">
              {contextSnags.length
                ? `${contextSnags.filter(isDone).length} of ${contextSnags.length} fixed · client sign-off ${(() => {
                    const s = handoverFor(contextJobId);
                    return s ? displayStatus(s).toLowerCase() : 'not sent';
                  })()}`
                : 'No snags yet. Add them as you walk round.'}
            </span>
          </span>
          <span aria-hidden className="text-white">›</span>
        </button>
      )}

      <StatStrip
        columns={4}
        stats={[
          { label: 'Open', value: stats.open, tone: 'red', onClick: () => { setStatusFilter('open'); setTab('all'); } },
          { label: 'Snags open', value: stats.snagsOpen, tone: 'orange', onClick: () => { setStatusFilter('open'); setTab('snags'); } },
          { label: 'Variations to agree', value: stats.toPrice, tone: 'purple', onClick: () => { setStatusFilter('open'); setTab('variations'); } },
          { label: 'Resolved 7d', value: stats.resolved7d, tone: 'emerald' },
        ]}
      />

      <div data-help="issues.tabs">
        <FilterBar
          tabs={tabs}
          activeTab={typeTab}
          onTabChange={(v) => setTab(v as TypeTab)}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search issues, jobs, people…"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none]" data-help="issues.status-chips">
        {(
          [
            ['open', 'Still open'],
            ['resolved', 'Resolved'],
            ['all', 'Everything'],
          ] as [StatusFilter, string][]
        ).map(([v, l]) => (
          <button
            key={v}
            type="button"
            onClick={() => setStatusFilter(v)}
            className={cn('h-11 shrink-0 rounded-full border px-4 text-[13px] touch-manipulation', statusFilter === v ? chipOn : chipOff)}
          >
            {l}
          </button>
        ))}
      </div>

      {groups.length === 0 ? (
        <EmptyState
          title={issues.length === 0 ? 'No issues yet' : 'Nothing here'}
          description={
            issues.length === 0
              ? 'Report a snag, defect or variation, or let the team raise them from site. They all land here.'
              : statusFilter === 'open'
                ? 'Nothing open in this list. Everything is sorted.'
                : 'Try another tab or clear the search.'
          }
          action="Report issue"
          onAction={() => setShowCreateSheet(true)}
        />
      ) : (
        <div className={cn("grid gap-4", groups.length > 1 && "xl:grid-cols-2")} data-help="issues.list">
          {groups.map((g) => {
            const jobSnags = allIssues.filter((i) => i.job_id === g.jobId && isSnag(i) && i.status !== 'Rejected');
            return (
              <section key={g.jobId} className={cn(cardCn, 'overflow-hidden')} aria-label={g.title}>
                <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-[14px] font-semibold text-white">{g.title}</h2>
                    <p className="truncate text-[12px] text-white">
                      {[g.client, `${g.items.length} ${g.items.length === 1 ? 'item' : 'items'}`].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  {jobSnags.length > 0 && (
                    <SecondaryButton
                      data-help="issues.punch"
                      className="h-11 shrink-0 px-4"
                      onClick={() => setPunchJobId(g.jobId)}
                    >
                      Punch list {jobSnags.filter(isDone).length}/{jobSnags.length}
                    </SecondaryButton>
                  )}
                </div>
                <ul className="divide-y divide-white/[0.08]">
                  {g.items.map((i) => {
                    const vo = voByIssue.get(i.id);
                    return (
                      <li key={i.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(i.id)}
                          className="flex w-full items-start gap-3 px-4 py-3.5 text-left touch-manipulation hover:bg-white/[0.03]"
                        >
                          <span
                            aria-hidden
                            className={cn(
                              'mt-1 h-2.5 w-2.5 shrink-0 rounded-full',
                              isDone(i) ? 'bg-emerald-400' : i.severity === 'Critical' || i.severity === 'High' ? 'bg-red-400' : 'bg-orange-400'
                            )}
                          />
                          <span className="min-w-0 flex-1">
                            <span className={cn('block text-[14px] font-medium text-white', isDone(i) && 'line-through decoration-white/40')}>
                              {i.title}
                            </span>
                            <span className="mt-1 flex flex-wrap items-center gap-1.5">
                              <Pill tone={typeTone[i.issue_type] ?? 'blue'}>{i.issue_type}</Pill>
                              {!isDone(i) && <Pill tone={severityToTone[i.severity] ?? 'amber'}>{i.severity}</Pill>}
                              <Pill tone={statusToTone[i.status] ?? 'blue'}>{i.status}</Pill>
                              {vo && <Pill tone="purple">{`${voReference(vo.id)} ${vo.status}`}</Pill>}
                            </span>
                            <span className="mt-1 block text-[12px] text-white">
                              {[
                                i.reporter?.name ? `From ${i.reporter.name}` : null,
                                i.assigned_employee?.name ? `With ${i.assigned_employee.name}` : null,
                                i.location,
                                (i.photos?.length ?? 0) > 0 ? `${i.photos.length} photo${i.photos.length === 1 ? '' : 's'}` : null,
                                timeAgo(i.created_at),
                              ]
                                .filter(Boolean)
                                .join(' · ')}
                            </span>
                          </span>
                          <span aria-hidden className="mt-1 text-white">›</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      )}

      {/* ---------- one issue ---------- */}
      <FormSheet
        open={!!selected}
        onOpenChange={(o) => !o && closeIssue()}
        width="wide"
        eyebrow={selected?.issue_type}
        title={selected?.title ?? 'Issue'}
        description={
          selected
            ? `${selected.job?.title ?? 'Job'} · raised ${format(new Date(selected.created_at), 'd MMM yyyy')}${selected.reporter?.name ? ` by ${selected.reporter.name}` : ''}`
            : undefined
        }
        bodyClassName="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-start"
        footer={
          selected && !isDone(selected) ? (
            <PrimaryButton
              data-help="issues.resolve"
              fullWidth
              size="lg"
              onClick={() => {
                setResolveId(selected.id);
                setResolutionNotes('');
              }}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Resolve issue
            </PrimaryButton>
          ) : selected ? (
            <SecondaryButton fullWidth size="lg" onClick={() => updateStatus.mutate({ id: selected.id, status: 'Open' })}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reopen
            </SecondaryButton>
          ) : null
        }
      >
        {selected && (
          <>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                <Pill tone={typeTone[selected.issue_type] ?? 'blue'}>{selected.issue_type}</Pill>
                <Pill tone={severityToTone[selected.severity] ?? 'amber'}>{selected.severity}</Pill>
                <Pill tone={statusToTone[selected.status] ?? 'blue'}>{selected.status}</Pill>
              </div>

              {selected.description && (
                <div className={cn(cardCn, 'p-4 space-y-2')}>
                  <h3 className="text-sm font-semibold text-white">What's wrong</h3>
                  <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-white">{selected.description}</p>
                </div>
              )}

              {(selected.photos?.length ?? 0) > 0 && (
                <div className={cn(cardCn, 'p-4 space-y-3')}>
                  <h3 className="text-sm font-semibold text-white">Photos ({selected.photos.length})</h3>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {selected.photos.map((p, n) => (
                      <PhotoTile
                        key={p}
                        url={photoSrcs[p]}
                        loading={photosLoading && !photoSrcs[p]}
                        alt={`Photo ${n + 1} of ${selected.title}`}
                        onClick={() => openPhotos(selected, n)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {selected.resolution_notes && (
                <div className={cn(cardCn, 'p-4 space-y-2')}>
                  <h3 className="text-sm font-semibold text-white">How it was sorted</h3>
                  <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-white">{selected.resolution_notes}</p>
                  {selected.resolved_at && (
                    <p className="text-[12px] text-white">{format(new Date(selected.resolved_at), "d MMM yyyy 'at' HH:mm")}</p>
                  )}
                </div>
              )}

              {selected.issue_type === 'Variation' && (
                <div className={cn(cardCn, 'p-4 space-y-3')} data-help="issues.variation">
                  <h3 className="text-sm font-semibold text-white">Variation order</h3>
                  {selectedVo ? (
                    <>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[15px] font-semibold text-white">{voReference(selectedVo.id)}</span>
                        <span className="text-[15px] font-semibold tabular-nums text-white">{money(Number(selectedVo.value ?? 0))}</span>
                        <Pill tone={selectedVo.status === 'Approved' ? 'emerald' : selectedVo.status === 'Rejected' ? 'red' : 'amber'}>
                          {selectedVo.status}
                        </Pill>
                      </div>
                      <p className="text-[13px] text-white">
                        {selectedVo.status === 'Approved'
                          ? `Approved${selectedVo.approved_by ? ` by ${selectedVo.approved_by}` : ''}${selectedVo.approved_date ? ` on ${format(new Date(selectedVo.approved_date), 'd MMM yyyy')}` : ''}. It is in the job value.`
                          : selectedVoSig
                            ? selectedVoSig.status === 'Signed'
                              ? `Signed by ${selectedVoSig.signer_name}${selectedVoSig.signed_at ? ` on ${format(new Date(selectedVoSig.signed_at), 'd MMM')}` : ''}.`
                              : `Sent to ${selectedVoSig.signer_name}: ${displayStatus(selectedVoSig).toLowerCase()}.`
                            : 'Pending. Send it to the client to approve before you do the extra work.'}
                      </p>
                      {selectedVo.status === 'Pending' && selectedVoSig?.status === 'Signed' && !selectedVoSig.applied_at ? (
                        <PrimaryButton
                          fullWidth
                          disabled={applySigned.isPending}
                          onClick={() => applySigned.mutate(selectedVoSig.id)}
                        >
                          {applySigned.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                          Add to the job value
                        </PrimaryButton>
                      ) : selectedVo.status === 'Pending' && (!selectedVoSig || !isOpenRequest(selectedVoSig)) ? (
                        <PrimaryButton
                          fullWidth
                          data-help="issues.vo-send"
                          onClick={() => setSignVo({ id: selectedVo.id, jobId: selectedVo.job_id, title: selected.title })}
                        >
                          <FileSignature className="h-4 w-4 mr-2" />
                          Send to the client to approve
                        </PrimaryButton>
                      ) : null}
                      <SecondaryButton
                        fullWidth
                        onClick={() => navigate(`/employer?section=financials&job=${selectedVo.job_id}`)}
                      >
                        See it in Job financials
                      </SecondaryButton>
                    </>
                  ) : (
                    <>
                      <p className="text-[13px] text-white">
                        Put a price on it. It becomes a variation order on the job, ready to send to the client.
                      </p>
                      <div className="grid grid-cols-[auto_1fr] gap-2">
                        <div className="flex rounded-full border border-white/[0.12] p-0.5">
                          {(['+', '-'] as const).map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setVoSign(s)}
                              className={cn(
                                'h-10 w-12 rounded-full text-[13px] touch-manipulation',
                                voSign === s ? 'bg-elec-yellow font-semibold text-black' : 'text-white'
                              )}
                              aria-label={s === '+' ? 'Extra cost' : 'Saving'}
                            >
                              {s === '+' ? 'Add' : 'Less'}
                            </button>
                          ))}
                        </div>
                        <Input
                          inputMode="decimal"
                          value={voPrice}
                          onChange={(e) => setVoPrice(e.target.value)}
                          placeholder="Price change, £"
                          className={inputClass}
                          aria-label="Price change in pounds"
                        />
                      </div>
                      <Textarea
                        value={voDesc}
                        onChange={(e) => setVoDesc(e.target.value)}
                        placeholder="What the extra work is"
                        className={`${textareaClass} min-h-[80px]`}
                        aria-label="What the variation is"
                      />
                      <PrimaryButton
                        fullWidth
                        data-help="issues.vo-raise"
                        disabled={raiseVo.isPending}
                        onClick={handleRaiseVo}
                      >
                        {raiseVo.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                        Raise variation order
                      </PrimaryButton>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className={cn(cardCn, 'p-4 space-y-3')}>
                <h3 className="text-sm font-semibold text-white">Details</h3>
                <dl className="grid grid-cols-2 gap-3 text-[13px]">
                  <div className="col-span-2">
                    <dt className="text-[12px] text-white">Job</dt>
                    <dd className="font-medium text-white">
                      {selected.job?.title ?? 'Job'}
                      {selected.job?.client ? ` (${selected.job.client})` : ''}
                    </dd>
                  </div>
                  {selected.location && (
                    <div>
                      <dt className="text-[12px] text-white">Where</dt>
                      <dd className="font-medium text-white">{selected.location}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-[12px] text-white">Reported by</dt>
                    <dd className="font-medium text-white">{selected.reporter?.name ?? 'Office'}</dd>
                  </div>
                  {selected.assigned_employee && (
                    <div>
                      <dt className="text-[12px] text-white">With</dt>
                      <dd className="font-medium text-white">{selected.assigned_employee.name}</dd>
                    </div>
                  )}
                  {selected.due_date && (
                    <div>
                      <dt className="text-[12px] text-white">Due</dt>
                      <dd className="font-medium text-white">{format(new Date(selected.due_date), 'd MMM yyyy')}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {!isDone(selected) && (
                <div className={cn(cardCn, 'p-4 space-y-3')} data-help="issues.status">
                  <h3 className="text-sm font-semibold text-white">Where it is up to</h3>
                  <div className="flex flex-wrap gap-2">
                    {(['Open', 'In Progress', 'Rejected'] as IssueStatus[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        disabled={updateStatus.isPending}
                        onClick={() => updateStatus.mutate({ id: selected.id, status: s })}
                        className={cn('h-11 rounded-full border px-4 text-[13px] touch-manipulation', selected.status === s ? chipOn : chipOff)}
                      >
                        {s === 'In Progress' ? 'In progress' : s === 'Rejected' ? 'Not doing it' : s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isSnag(selected) && (
                <SecondaryButton
                  fullWidth
                  onClick={() => {
                    const job = selected.job_id;
                    setSelectedId(null);
                    setPunchJobId(job);
                  }}
                >
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Open this job's punch list
                </SecondaryButton>
              )}

              <DestructiveButton fullWidth onClick={() => setDeleteConfirmId(selected.id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete issue
              </DestructiveButton>
            </div>
          </>
        )}
      </FormSheet>

      {/* ---------- punch list ---------- */}
      <FormSheet
        open={!!punchJobId}
        onOpenChange={(o) => !o && closePunch()}
        width="wide"
        eyebrow="Punch list"
        title={punchJob?.title ?? punchIssues[0]?.job?.title ?? 'Job'}
        description={
          punchIssues.length
            ? `${punchDone} of ${punchIssues.length} fixed${punchOpen ? `, ${punchOpen} to go` : '. All clear for handover.'}`
            : 'Walk the job and add each snag as you find it.'
        }
        bodyClassName="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start"
        footer={
          <PrimaryButton
            data-help="issues.punch-sign"
            fullWidth
            size="lg"
            onClick={() => punchJobId && setHandoverJob({ id: punchJobId, client: punchJob?.client ?? null })}
          >
            <FileSignature className="h-4 w-4 mr-2" />
            {punchSig?.status === 'Signed' ? 'Get it signed again' : 'Get the client to sign it off'}
          </PrimaryButton>
        }
      >
        <div className="space-y-4">
          {punchIssues.length > 0 && (
            <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]" aria-hidden>
              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{ width: `${Math.round((punchDone / punchIssues.length) * 100)}%` }}
              />
            </div>
          )}
          <div className={cn(cardCn, 'overflow-hidden')}>
            <ul className="divide-y divide-white/[0.08]" data-help="issues.punch-items">
              {punchIssues.map((i) => (
                <li key={i.id} className="flex items-center gap-2 px-2 py-1.5">
                  <button
                    type="button"
                    onClick={() => togglePunch(i)}
                    disabled={updateStatus.isPending}
                    aria-label={isDone(i) ? `Reopen ${i.title}` : `Mark ${i.title} fixed`}
                    className={cn(
                      'flex h-11 w-11 shrink-0 items-center justify-center rounded-full touch-manipulation',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-full border-2',
                        isDone(i) ? 'border-emerald-400 bg-emerald-400 text-black' : 'border-white/50'
                      )}
                    >
                      {isDone(i) && <Check className="h-4 w-4" />}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPunchJobId(null);
                      setSelectedId(i.id);
                    }}
                    className="min-w-0 flex-1 py-2 text-left touch-manipulation"
                  >
                    <span className={cn('block text-[14px] font-medium text-white', isDone(i) && 'line-through decoration-white/40')}>
                      {i.title}
                    </span>
                    <span className="block text-[12px] text-white">
                      {[i.issue_type, i.location, i.reporter?.name ? `from ${i.reporter.name}` : null, (i.photos?.length ?? 0) ? `${i.photos.length} photo${i.photos.length === 1 ? '' : 's'}` : null]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </button>
                  {(i.photos?.length ?? 0) > 0 && (
                    <PhotoTile
                      url={photoSrcs[i.photos[0]]}
                      loading={photosLoading && !photoSrcs[i.photos[0]]}
                      alt={`Photo of ${i.title}`}
                      className="h-12 w-12 shrink-0"
                      onClick={() => openPhotos(i, 0)}
                    />
                  )}
                </li>
              ))}
              {punchIssues.length === 0 && (
                <li className="px-4 py-6 text-center text-[13px] text-white">No snags on this job yet.</li>
              )}
            </ul>
            <div className="flex gap-2 border-t border-white/[0.08] p-3">
              <Input
                value={quickSnag}
                onChange={(e) => setQuickSnag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleQuickSnag())}
                placeholder="Add a snag, e.g. Landing light switch loose"
                className={`${inputClass} flex-1`}
                aria-label="New snag"
              />
              <SecondaryButton className="h-11 px-4" disabled={!quickSnag.trim() || createJobIssue.isPending} onClick={handleQuickSnag}>
                Add
              </SecondaryButton>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className={cn(cardCn, 'p-4 space-y-2')} data-help="issues.punch-status">
            <h3 className="text-sm font-semibold text-white">Client sign-off</h3>
            {punchSig ? (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone={punchSig.status === 'Signed' ? 'emerald' : isOpenRequest(punchSig) ? 'amber' : 'red'}>
                    {displayStatus(punchSig)}
                  </Pill>
                  <span className="text-[13px] text-white">{punchSig.signer_name}</span>
                </div>
                <p className="text-[13px] text-white">
                  {punchSig.status === 'Signed'
                    ? `Signed${punchSig.signed_at ? ` on ${format(new Date(punchSig.signed_at), "d MMM yyyy 'at' HH:mm")}` : ''}. The signed copy is on Signatures.`
                    : isOpenRequest(punchSig)
                      ? `Sent ${format(new Date(punchSig.created_at), 'd MMM')}. Chase it or copy the link from Signatures.`
                      : 'This request is no longer live. Send a new one.'}
                </p>
                <SecondaryButton fullWidth onClick={() => navigate(`/employer?section=signatures&job=${punchJobId}`)}>
                  Open on Signatures
                </SecondaryButton>
              </>
            ) : (
              <p className="text-[13px] text-white">
                Not sent yet. When the list is done, send the handover. The client signs on their phone.
              </p>
            )}
          </div>
          {punchOpen > 0 && (
            <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4">
              <p className="text-[13px] text-orange-300">
                {punchOpen} {punchOpen === 1 ? 'item is' : 'items are'} still open. They will be listed on the sign-off as
                outstanding, so the client sees exactly what is left.
              </p>
            </div>
          )}
        </div>
      </FormSheet>

      {/* ---------- report ---------- */}
      <FormSheet
        open={showCreateSheet}
        onOpenChange={setShowCreateSheet}
        width="wide"
        eyebrow="Issues"
        title="Report an issue"
        description="Snags, defects, variations, questions for the client, delays."
        bodyClassName="grid gap-5 lg:grid-cols-2 lg:items-start"
        footer={
          <PrimaryButton data-help="issues.submit" onClick={handleCreate} disabled={createJobIssue.isPending} fullWidth size="lg">
            {createJobIssue.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Report issue
          </PrimaryButton>
        }
      >
        <div className="space-y-5">
          <div className="space-y-2" data-help="issues.form-job">
            <Label className="text-white text-[12px] font-medium">Job</Label>
            <Select value={formData.job_id} onValueChange={(v) => setFormData((p) => ({ ...p, job_id: v }))}>
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Pick the job" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                    {job.client ? ` (${job.client})` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-white text-[12px] font-medium">What is it?</Label>
            <div className="flex flex-wrap gap-2">
              {(['Snag', 'Defect', 'Variation', 'RFI', 'Delay', 'Other'] as IssueType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, issue_type: t }))}
                  className={cn('h-11 rounded-full border px-4 text-[13px] touch-manipulation', formData.issue_type === t ? chipOn : chipOff)}
                >
                  {t === 'RFI' ? 'Question (RFI)' : t}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white text-[12px] font-medium">Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
              placeholder={formData.issue_type === 'Variation' ? 'e.g. Extra double socket in the lounge' : 'e.g. Bathroom fan not running on'}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white text-[12px] font-medium">How serious</Label>
            <div className="grid grid-cols-4 gap-2">
              {(['Low', 'Medium', 'High', 'Critical'] as IssueSeverity[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, severity: s }))}
                  className={cn('h-11 rounded-full border px-2 text-[13px] touch-manipulation', formData.severity === s ? chipOn : chipOff)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white text-[12px] font-medium">Where on site</Label>
            <Input
              value={formData.location || ''}
              onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
              placeholder="e.g. First floor landing"
              className={inputClass}
            />
          </div>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-white text-[12px] font-medium">Who's on it</Label>
              <Select
                value={formData.assigned_to || 'none'}
                onValueChange={(v) => setFormData((p) => ({ ...p, assigned_to: v === 'none' ? undefined : v }))}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Nobody yet" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="none">Nobody yet</SelectItem>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-white text-[12px] font-medium">Due by</Label>
              <Input
                type="date"
                value={formData.due_date || ''}
                onChange={(e) => setFormData((p) => ({ ...p, due_date: e.target.value || undefined }))}
                className={inputClass}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white text-[12px] font-medium">Details</Label>
            <Textarea
              value={formData.description || ''}
              onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
              placeholder="What's wrong, or what the client asked for…"
              className={`${textareaClass} min-h-[100px]`}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white text-[12px] font-medium">Photos</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              multiple
              onChange={handlePhotoSelect}
              className="hidden"
            />
            <div className="flex flex-wrap gap-2">
              {(formData.photos || []).map((p) => (
                <div key={p} className="relative">
                  <PhotoTile url={photoSrcs[p]} loading={!photoSrcs[p]} alt="Issue photo" className="h-20 w-20" />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, photos: (prev.photos || []).filter((x) => x !== p) }))}
                    className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black text-white touch-manipulation"
                    aria-label="Remove photo"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPhotos}
                className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/25 text-white disabled:opacity-50 touch-manipulation"
                aria-label="Add photos"
              >
                {uploadingPhotos ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
                <span className="text-[11px]">Add</span>
              </button>
            </div>
          </div>
        </div>
      </FormSheet>

      {/* ---------- resolve ---------- */}
      <FormSheet
        open={!!resolveId}
        onOpenChange={(o) => !o && setResolveId(null)}
        eyebrow="Resolve"
        title="How was it sorted?"
        description="A line or two. It stays on the record and the person who raised it sees it."
        footer={
          <PrimaryButton onClick={confirmResolve} disabled={updateStatus.isPending} fullWidth size="lg">
            {updateStatus.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Mark as resolved
          </PrimaryButton>
        }
      >
        <Textarea
          value={resolutionNotes}
          onChange={(e) => setResolutionNotes(e.target.value)}
          placeholder="e.g. Re-terminated the neutral at the switch, tested OK"
          className={`${textareaClass} min-h-[120px]`}
          aria-label="How it was sorted"
        />
      </FormSheet>

      {/* Variation order → client approval (their signing flow). */}
      <RequestSignatureSheet
        open={!!signVo}
        onOpenChange={(o) => !o && setSignVo(null)}
        documentType="Variation"
        documentId={signVo?.id ?? null}
        documentTitle={signVo ? `Variation: ${signVo.title}` : undefined}
        jobId={signVo?.jobId}
        defaultName={signVo ? (jobs.find((j) => j.id === signVo.jobId)?.client ?? null) : null}
      />

      {/* Punch list → handover sign-off (their signing flow; the document is the job, and
          the office can attach its certificates). */}
      <RequestSignatureSheet
        open={!!handoverJob}
        onOpenChange={(o) => !o && setHandoverJob(null)}
        documentType="Handover"
        jobId={handoverJob?.id}
        defaultName={handoverJob?.client ?? null}
      />

      {lightbox && (
        <PhotoLightbox
          open
          photos={lightbox.photos}
          index={lightbox.index}
          onIndexChange={(n) => setLightbox((l) => (l ? { ...l, index: n } : l))}
          onOpenChange={(o) => !o && setLightbox(null)}
        />
      )}

      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="bg-[hsl(0_0%_10%)] border-white/[0.06]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete this issue?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              It is removed for good, with its photos list. A variation order already raised stays in Job financials.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]">
              Keep it
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="h-11 bg-red-500/90 text-white hover:bg-red-500">
              {deleteJobIssue.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageFrame>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh}>
      {content}
    </PullToRefresh>
  ) : (
    content
  );
}
