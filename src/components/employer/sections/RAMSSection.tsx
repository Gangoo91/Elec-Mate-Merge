import { useState, useMemo, useEffect, type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { copyToClipboard } from '@/utils/clipboard';
import { supabase } from '@/integrations/supabase/client';
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
import { Input } from '@/components/ui/input';
import { ErrorState } from '@/components/employer/ErrorState';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, MapPin, Calendar, Download, Copy } from 'lucide-react';
import {
  useRAMSDocuments,
  useRAMSDocumentStats,
  useCreateRAMSDocument,
  useUpdateRAMSDocument,
  useUpdateRAMSStatus,
  useDeleteRAMSDocument,
  type RAMSDocument,
  type RAMSStatus,
} from '@/hooks/useRAMSDocuments';
import { useJobs } from '@/hooks/useJobs';
import { FirmRecordBar } from '@/components/electrician-tools/site-safety/common/FirmRecordBar';
import {
  useFirmRecordAccess,
  useSafetyScope,
  isFirmScope,
} from '@/components/electrician-tools/site-safety/common/SafetyScope';
import { useRecentGeneratedRams } from '@/hooks/useRecentGeneratedRams';
import { useFirmPackSafetyDocs } from '@/hooks/useFirmSafetyDocs';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { MoveToFirmPanel } from '@/components/employer/rams/MoveToFirmPanel';
import { FirmJobPicker } from '@/components/employer/smart-docs/FirmJobPicker';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { RAMS_REGISTER_HELP } from '@/components/employer/help/safetyDocs';
import {
  frameClass,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  TwoColumn,
  FigureStrip,
  Segments,
  SearchField,
  RowList,
  Row,
  StatusPill,
  PlainEmpty,
  plural,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import { format, formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  FormCard,
  FormGrid,
  Field,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/employer/editorial';

interface RAMSSectionProps {
  onNavigate?: (section: Section) => void;
}

const STATUS_OPTIONS: { value: RAMSStatus; label: string; tone: Tone }[] = [
  { value: 'draft', label: 'Draft', tone: 'amber' },
  { value: 'submitted', label: 'Submitted', tone: 'orange' },
  { value: 'approved', label: 'Approved', tone: 'emerald' },
  { value: 'rejected', label: 'Rejected', tone: 'red' },
];

const statusToneFor = (status: RAMSStatus): Tone => {
  // AI-produced documents land as 'generated' — awaiting review, not a draft.
  if ((status as string) === 'generated') return 'orange';
  return STATUS_OPTIONS.find((s) => s.value === status)?.tone ?? 'amber';
};

const statusLabelFor = (status: RAMSStatus): string => {
  if ((status as string) === 'generated') return 'AI generated';
  return STATUS_OPTIONS.find((s) => s.value === status)?.label ?? status;
};

/** The register's filters: a RAMS's status, or where it came from. */
type RegisterFilter = 'all' | 'approve' | 'notissued' | 'approved' | 'draft';
type RegisterStatus = RegisterFilter | 'other' | 'pack';

interface RegisterEntry {
  key: string;
  kind: 'doc' | 'ai' | 'pack';
  title: string;
  jobId: string | null;
  at: string;
  status: RegisterStatus;
  search: string;
  detail: string;
  pill: ReactNode;
  open: () => void;
}

const statusKindFor = (status: RAMSStatus): RegisterStatus =>
  status === 'submitted' || (status as string) === 'generated'
    ? 'approve'
    : status === 'approved'
      ? 'approved'
      : status === 'draft'
        ? 'draft'
        : 'other';

const pillToneFor = (status: RAMSStatus): PillTone =>
  status === 'approved'
    ? 'green'
    : status === 'rejected'
      ? 'red'
      : status === 'submitted' || (status as string) === 'generated'
        ? 'volt'
        : 'neutral';

const ago = (iso: string) => formatDistanceToNow(new Date(iso), { addSuffix: true });

export function RAMSSection({ onNavigate }: RAMSSectionProps) {
  const { toast } = useToast();
  const { data: ramsDocuments = [], isLoading, error, refetch } = useRAMSDocuments();
  const { data: stats } = useRAMSDocumentStats();
  const createRAMS = useCreateRAMSDocument();
  const updateRAMS = useUpdateRAMSDocument();
  const updateStatus = useUpdateRAMSStatus();
  const deleteRAMS = useDeleteRAMSDocument();
  const { data: jobs = [] } = useJobs();
  const jobTitleById = useMemo(() => new Map(jobs.map((j) => [j.id, j.title])), [jobs]);

  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showDetailSheet, setShowDetailSheet] = useState(false);
  const [selectedRAMS, setSelectedRAMS] = useState<RAMSDocument | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [filterStatus, setFilterStatus] = useState<RegisterFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const scope = useSafetyScope();
  const firmId = isFirmScope(scope) ? scope.employerId : null;
  const jobFilter = params.get('job');
  const pickJobFilter = (id: string | null) => {
    const next = new URLSearchParams(params);
    if (id) next.set('job', id);
    else next.delete('job');
    setParams(next, { replace: true });
  };
  // AI runs for the firm not yet issued, and RAMS attached to the firm's packs:
  // both belong on the one register (ELE-1940).
  const { data: aiRuns = [] } = useRecentGeneratedRams(60);
  const { data: packDocs = [] } = useFirmPackSafetyDocs(firmId);
  const { exportPDF, exportingId } = useSafetyPDFExport();

  const [formData, setFormData] = useState({
    project_name: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    assessor: '',
    contractor: '',
    supervisor: '',
    activities: [] as string[],
    risks: [] as {
      id: string;
      hazard: string;
      risk_level: 'low' | 'medium' | 'high';
      control_measures: string[];
      residual_risk: 'low' | 'medium' | 'high';
    }[],
    required_ppe: [] as string[],
    job_scale: '',
    employer_job_id: '',
  });
  const [activityInput, setActivityInput] = useState('');

  const approvedCount = stats?.approved ?? 0;
  // Awaiting approval = submitted + AI 'generated' — the same definition the
  // Safety hub landing and Safety & HR overview use, so the figures never drift.
  const submittedCount = ramsDocuments.filter(
    (d) => d.status === 'submitted' || (d.status as string) === 'generated'
  ).length;
  const draftCount = ramsDocuments.filter((d) => d.status === 'draft').length;

  const approved30dCount = useMemo(() => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return ramsDocuments.filter(
      (d) => d.status === 'approved' && new Date(d.updated_at).getTime() >= cutoff
    ).length;
  }, [ramsDocuments]);

  const notIssuedRuns = useMemo(
    () =>
      aiRuns.filter((r) => !r.issuedVersion && (r.status === 'complete' || r.status === 'partial')),
    [aiRuns]
  );

  /** Every RAMS the firm has, whatever made it, newest first. */
  const register = useMemo((): RegisterEntry[] => {
    const docs: RegisterEntry[] = ramsDocuments.map((doc) => {
      const status = doc.status as RAMSStatus;
      const job = doc.employer_job_id ? jobTitleById.get(doc.employer_job_id) : undefined;
      const madeBy = doc.ai_generation_metadata?.generation_job_id ? 'AI, issued' : 'Written';
      return {
        key: `doc-${doc.id}`,
        kind: 'doc',
        title: doc.project_name,
        jobId: doc.employer_job_id ?? null,
        at: doc.updated_at,
        status: statusKindFor(status),
        search: [doc.project_name, doc.location, doc.assessor, job].join(' '),
        detail: [job ?? 'No job', madeBy, `v${doc.version ?? 1}`, ago(doc.updated_at)].join(' · '),
        pill: <StatusPill tone={pillToneFor(status)}>{statusLabelFor(status)}</StatusPill>,
        open: () => openRAMSDetail(doc),
      };
    });
    const runs: RegisterEntry[] = notIssuedRuns.map((r) => ({
      key: `ai-${r.id}`,
      kind: 'ai',
      title: r.title,
      jobId: r.employerJobId,
      at: r.createdAt,
      status: 'notissued',
      search: [r.title, r.employerJobId ? jobTitleById.get(r.employerJobId) : ''].join(' '),
      detail: [
        r.employerJobId ? (jobTitleById.get(r.employerJobId) ?? 'A firm job') : 'No job',
        'AI drafted',
        ago(r.createdAt),
      ].join(' · '),
      pill: <StatusPill tone="volt">Not issued</StatusPill>,
      open: () => navigate(`/employer?section=site-safety&tool=rams-result&id=${r.id}`),
    }));
    const packs: RegisterEntry[] = packDocs.map((d) => ({
      key: `pack-${d.id}`,
      kind: 'pack',
      title: d.title,
      jobId: d.jobId,
      at: d.createdAt ?? '',
      status: 'pack',
      search: [d.title, d.packTitle, d.jobId ? jobTitleById.get(d.jobId) : ''].join(' '),
      detail: [
        d.jobId ? (jobTitleById.get(d.jobId) ?? 'A firm job') : 'No job',
        `In pack ${d.packTitle ?? ''}`.trim(),
        d.createdAt ? ago(d.createdAt) : null,
      ]
        .filter(Boolean)
        .join(' · '),
      pill: d.fileUrl ? <StatusPill tone="green">PDF</StatusPill> : <StatusPill>No PDF</StatusPill>,
      open: () => {
        if (d.fileUrl) window.open(d.fileUrl, '_blank', 'noopener,noreferrer');
        else setParams({ section: 'jobpacks', ...(d.jobId ? { job: d.jobId } : {}) });
      },
    }));
    return [...docs, ...runs, ...packs].sort((x, y) => (y.at || '').localeCompare(x.at || ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ramsDocuments, notIssuedRuns, packDocs, jobTitleById]);

  const shownEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return register.filter((e) => {
      if (jobFilter && e.jobId !== jobFilter) return false;
      if (q && !e.search.toLowerCase().includes(q)) return false;
      if (filterStatus === 'all') return true;
      return e.status === filterStatus;
    });
  }, [register, jobFilter, searchQuery, filterStatus]);

  // Opened from Smart Docs (?rams=<id>): open that RAMS once the list is in.
  const deepRams = params.get('rams');
  useEffect(() => {
    if (!deepRams || !ramsDocuments.length) return;
    const doc = ramsDocuments.find((d) => d.id === deepRams);
    if (doc) openRAMSDetail(doc);
    const next = new URLSearchParams(params);
    next.delete('rams');
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepRams, ramsDocuments.length]);

  const handleCreateRAMS = async () => {
    await createRAMS.mutateAsync({
      ...formData,
      // job_scale has a CHECK (domestic/commercial/industrial) — omit if unset
      job_scale: formData.job_scale || undefined,
      employer_job_id: formData.employer_job_id || undefined,
      status: 'draft',
    });
    setShowCreateSheet(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      project_name: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      assessor: '',
      contractor: '',
      supervisor: '',
      activities: [],
      risks: [],
      required_ppe: [],
      job_scale: '',
      employer_job_id: '',
    });
    setActivityInput('');
  };

  const handleStatusChange = async (id: string, status: RAMSStatus) => {
    await updateStatus.mutateAsync({ id, status });
  };

  // A worker's RAMS filed against a firm job is read and countersigned here,
  // never changed (RLS enforces it; the buttons say so first).
  const selectedAccess = useFirmRecordAccess(selectedRAMS);

  const openRAMSDetail = (doc: RAMSDocument) => {
    setSelectedRAMS(doc);
    setShowDetailSheet(true);
  };

  const addActivity = () => {
    if (activityInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        activities: [...prev.activities, activityInput.trim()],
      }));
      setActivityInput('');
    }
  };

  const removeActivity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index),
    }));
  };

  if (isLoading) {
    return (
      <PageFrame className={frameClass}>
        <LoadingBlocks />
      </PageFrame>
    );
  }

  if (error) {
    return (
      <PageFrame className={frameClass}>
        <ErrorState message="Failed to load RAMS documents" onRetry={refetch} />
      </PageFrame>
    );
  }

  const statusLine =
    register.length === 0
      ? 'Nothing on the register yet. Generate the safety documents for a job, or write one.'
      : [
          plural(register.length, 'RAMS', 'RAMS') + ' on the register',
          submittedCount ? `${submittedCount} to approve` : null,
          notIssuedRuns.length ? `${notIssuedRuns.length} AI drafted, not issued` : null,
        ]
          .filter(Boolean)
          .join(', ') + '.';

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="RAMS"
        description={statusLine}
        actions={
          <HeroActions>
            <HeroPrimary
              onClick={() =>
                jobFilter
                  ? setParams({ section: 'airams', job: jobFilter })
                  : onNavigate?.('airams')
              }
            >
              Generate RAMS
            </HeroPrimary>
            <HeroSecondary
              onClick={() => {
                resetForm();
                if (jobFilter) setFormData((prev) => ({ ...prev, employer_job_id: jobFilter }));
                setShowCreateSheet(true);
              }}
            >
              Write one
            </HeroSecondary>
            <PageHelpButton help={RAMS_REGISTER_HELP} askContext={{ page: 'rams' }} />
          </HeroActions>
        }
      />
      <HowItWorks help={RAMS_REGISTER_HELP} askContext={{ page: 'rams' }} />

      <FigureStrip
        figures={[
          { label: 'On the register', value: register.length, sub: 'Written, AI and job packs' },
          {
            label: 'To approve',
            value: submittedCount,
            sub: 'Submitted or AI generated',
            tone: submittedCount ? 'volt' : undefined,
            onOpen: submittedCount ? () => setFilterStatus('approve') : undefined,
          },
          {
            label: 'Not issued',
            value: notIssuedRuns.length,
            sub: 'AI runs to check and issue',
            tone: notIssuedRuns.length ? 'volt' : undefined,
            onOpen: notIssuedRuns.length ? () => setFilterStatus('notissued') : undefined,
          },
          {
            label: 'Approved',
            value: approved30dCount,
            sub: 'In the last 30 days',
            tone: approved30dCount ? 'green' : undefined,
          },
        ]}
      />

      <TwoColumn
        main={
          <section data-help="rams.register">
            <div className="mb-3 space-y-3">
              <Segments
                items={[
                  { value: 'all', label: 'All', count: register.length },
                  { value: 'approve', label: 'To approve', count: submittedCount },
                  { value: 'notissued', label: 'Not issued', count: notIssuedRuns.length },
                  { value: 'approved', label: 'Approved', count: approvedCount },
                  { value: 'draft', label: 'Drafts', count: draftCount },
                ]}
                value={filterStatus}
                onChange={setFilterStatus}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <FirmJobPicker value={jobFilter} onChange={pickJobFilter} allowNone="All jobs" />
                <SearchField
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search RAMS"
                />
              </div>
            </div>
            {shownEntries.length === 0 ? (
              <PlainEmpty
                text={
                  register.length === 0
                    ? 'No RAMS yet. Generate the safety documents for a job, or write one yourself.'
                    : 'Nothing matches. Clear the job, status or search.'
                }
                action={register.length === 0 ? 'Write one' : undefined}
                onAction={register.length === 0 ? () => setShowCreateSheet(true) : undefined}
              />
            ) : (
              <RowList>
                {shownEntries.map((e) => (
                  <Row
                    key={e.key}
                    title={e.title}
                    detail={e.detail}
                    status={e.pill}
                    onClick={e.open}
                  />
                ))}
              </RowList>
            )}
          </section>
        }
        side={isFirmScope(scope) ? <MoveToFirmPanel employerId={scope.employerId} /> : undefined}
      />

      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-y-auto bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          <SheetHeader>
            <SheetTitle className="text-white">Create RAMS document</SheetTitle>
            <SheetDescription className="text-white">
              Create a new risk assessment and method statement.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            <FormCard eyebrow="Project">
              <Field label="Project name" required>
                <Input
                  value={formData.project_name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, project_name: e.target.value }))
                  }
                  placeholder="e.g. Office Rewire — ABC Corp"
                  className={inputClass}
                />
              </Field>

              <FormGrid cols={2}>
                <Field label="Location" required>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                    <Input
                      value={formData.location}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, location: e.target.value }))
                      }
                      placeholder="Site address"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </Field>
                <Field label="Assessment date">
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
              </FormGrid>

              <Field label="Link job (optional)">
                <Select
                  value={formData.employer_job_id || '__none__'}
                  onValueChange={(v) =>
                    setFormData((prev) => ({
                      ...prev,
                      employer_job_id: v === '__none__' ? '' : v,
                    }))
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Link to a job" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="__none__">No job</SelectItem>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormCard>

            <FormCard eyebrow="People">
              <FormGrid cols={2}>
                <Field label="Assessor" required>
                  <Input
                    value={formData.assessor}
                    onChange={(e) => setFormData((prev) => ({ ...prev, assessor: e.target.value }))}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </Field>
                <Field label="Job scale">
                  <Select
                    value={formData.job_scale}
                    onValueChange={(v) => setFormData((prev) => ({ ...prev, job_scale: v }))}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select scale" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="domestic">Domestic</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </FormGrid>

              <FormGrid cols={2}>
                <Field label="Contractor (optional)">
                  <Input
                    value={formData.contractor}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, contractor: e.target.value }))
                    }
                    placeholder="Main contractor"
                    className={inputClass}
                  />
                </Field>
                <Field label="Supervisor (optional)">
                  <Input
                    value={formData.supervisor}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, supervisor: e.target.value }))
                    }
                    placeholder="Site supervisor"
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
            </FormCard>

            <FormCard eyebrow="Activities">
              <Field label="Work activities">
                <div className="flex gap-2">
                  <Input
                    value={activityInput}
                    onChange={(e) => setActivityInput(e.target.value)}
                    placeholder="Add activity"
                    className={inputClass}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addActivity())}
                  />
                  <SecondaryButton onClick={addActivity}>
                    <Plus className="h-4 w-4" />
                  </SecondaryButton>
                </div>
              </Field>
              {formData.activities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.activities.map((activity, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => removeActivity(index)}
                      className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/[0.1] bg-white/[0.06] text-white touch-manipulation hover:bg-white/[0.1] transition-colors"
                    >
                      {activity} <span className="ml-1.5 text-white">×</span>
                    </button>
                  ))}
                </div>
              )}
            </FormCard>

            <div className="flex gap-3 pt-2">
              <SecondaryButton
                fullWidth
                onClick={() => {
                  setShowCreateSheet(false);
                  resetForm();
                }}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={handleCreateRAMS}
                disabled={
                  !formData.project_name ||
                  !formData.location ||
                  !formData.assessor ||
                  createRAMS.isPending
                }
              >
                {createRAMS.isPending ? 'Creating…' : 'Create RAMS'}
              </PrimaryButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={showDetailSheet} onOpenChange={setShowDetailSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-y-auto bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          {selectedRAMS && (
            <>
              <SheetHeader>
                <SheetTitle className="text-white">{selectedRAMS.project_name}</SheetTitle>
                <SheetDescription className="text-white">
                  Version {selectedRAMS.version} · {selectedRAMS.assessor}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                <StatStrip
                  columns={3}
                  stats={[
                    {
                      label: 'Status',
                      value: statusLabelFor(selectedRAMS.status as RAMSStatus),
                      tone: statusToneFor(selectedRAMS.status as RAMSStatus),
                    },
                    {
                      label: 'Hazards',
                      value: selectedRAMS.risks?.length ?? 0,
                      tone: 'orange',
                    },
                    {
                      label: 'Activities',
                      value: selectedRAMS.activities?.length ?? 0,
                      tone: 'blue',
                    },
                  ]}
                />

                <ListCard>
                  <ListCardHeader tone="orange" title="Project details" />
                  <ListBody>
                    <ListRow
                      lead={<MapPin className="h-4 w-4 text-white" />}
                      title="Location"
                      subtitle={selectedRAMS.location}
                    />
                    <ListRow
                      lead={<Calendar className="h-4 w-4 text-white" />}
                      title="Assessment date"
                      subtitle={format(new Date(selectedRAMS.date), 'dd MMM yyyy')}
                    />
                    {selectedRAMS.employer_job_id &&
                      jobTitleById.get(selectedRAMS.employer_job_id) && (
                        <ListRow
                          title="On job"
                          subtitle={jobTitleById.get(selectedRAMS.employer_job_id) ?? ''}
                          trailing={<Pill tone="cyan">Job linked</Pill>}
                        />
                      )}
                    {!selectedRAMS.employer_job_id && jobs.length > 0 && (
                      <div className="px-5 sm:px-6 py-3">
                        <Select
                          value="__none__"
                          onValueChange={async (v) => {
                            if (v === '__none__') return;
                            const updated = await updateRAMS.mutateAsync({
                              id: selectedRAMS.id,
                              employer_job_id: v,
                            });
                            setSelectedRAMS(updated);
                          }}
                          disabled={updateRAMS.isPending}
                        >
                          <SelectTrigger className={selectTriggerClass}>
                            <SelectValue placeholder="Link to a job" />
                          </SelectTrigger>
                          <SelectContent className={selectContentClass}>
                            <SelectItem value="__none__">Link to a job…</SelectItem>
                            {jobs.map((job) => (
                              <SelectItem key={job.id} value={job.id}>
                                {job.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {selectedRAMS.contractor && (
                      <ListRow title="Contractor" subtitle={selectedRAMS.contractor} />
                    )}
                    {selectedRAMS.supervisor && (
                      <ListRow title="Supervisor" subtitle={selectedRAMS.supervisor} />
                    )}
                    {selectedRAMS.job_scale && (
                      <ListRow
                        title="Job scale"
                        subtitle={selectedRAMS.job_scale}
                        trailing={<Pill tone="amber">{selectedRAMS.job_scale}</Pill>}
                      />
                    )}
                  </ListBody>
                </ListCard>

                {selectedRAMS.activities && selectedRAMS.activities.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      tone="blue"
                      title="Work activities"
                      meta={<Pill tone="blue">{selectedRAMS.activities.length}</Pill>}
                    />
                    <ListBody>
                      {selectedRAMS.activities.map((activity, index) => (
                        <ListRow key={index} title={activity} />
                      ))}
                    </ListBody>
                  </ListCard>
                )}

                {selectedRAMS.risks && selectedRAMS.risks.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      tone="orange"
                      title="Risk assessment"
                      meta={<Pill tone="orange">{selectedRAMS.risks.length}</Pill>}
                    />
                    <ListBody>
                      {selectedRAMS.risks.slice(0, 5).map((risk, index) => {
                        const riskTone: Tone =
                          risk.risk_level === 'high'
                            ? 'red'
                            : risk.risk_level === 'medium'
                              ? 'amber'
                              : 'emerald';
                        return (
                          <ListRow
                            key={index}
                            title={risk.hazard}
                            subtitle={
                              risk.control_measures?.length
                                ? `${risk.control_measures.length} control measure${risk.control_measures.length === 1 ? '' : 's'}`
                                : undefined
                            }
                            trailing={<Pill tone={riskTone}>{risk.risk_level}</Pill>}
                          />
                        );
                      })}
                      {selectedRAMS.risks.length > 5 && (
                        <ListRow title={`+ ${selectedRAMS.risks.length - 5} more hazards`} />
                      )}
                    </ListBody>
                  </ListCard>
                )}

                {selectedRAMS.required_ppe && selectedRAMS.required_ppe.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      tone="emerald"
                      title="Required PPE"
                      meta={<Pill tone="emerald">{selectedRAMS.required_ppe.length}</Pill>}
                    />
                    <ListBody>
                      {selectedRAMS.required_ppe.map((ppe, index) => (
                        <ListRow key={index} title={ppe} />
                      ))}
                    </ListBody>
                  </ListCard>
                )}

                <FirmRecordBar
                  table="rams_documents"
                  row={selectedRAMS}
                  invalidate={[['ramsDocuments']]}
                />

                {selectedAccess.canEdit && (
                  <ListCard>
                    <ListCardHeader title="Update status" />
                    <div className="px-5 sm:px-6 py-4 flex flex-wrap gap-2">
                      {STATUS_OPTIONS.filter((s) => s.value !== selectedRAMS.status).map(
                        (option) => (
                          <SecondaryButton
                            key={option.value}
                            onClick={() => handleStatusChange(selectedRAMS.id, option.value)}
                            disabled={updateStatus.isPending}
                          >
                            Mark {option.label}
                          </SecondaryButton>
                        )
                      )}
                    </div>
                  </ListCard>
                )}

                <div className="flex gap-2 pt-2">
                  {/* A PDF for every RAMS (ELE-1940): the issued copy when there
                      is one, otherwise rendered from what is on the register. */}
                  <SecondaryButton
                    fullWidth
                    disabled={exportingId === selectedRAMS.id}
                    onClick={() =>
                      void exportPDF('rams', selectedRAMS.id, undefined, selectedRAMS.project_name)
                    }
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {exportingId === selectedRAMS.id
                      ? 'Building PDF…'
                      : selectedRAMS.pdf_url
                        ? 'Download PDF'
                        : 'Make the PDF'}
                  </SecondaryButton>
                  {selectedRAMS.pdf_url && (
                    <SecondaryButton
                      fullWidth
                      onClick={async () => {
                        // Share the document itself, not the dashboard URL.
                        const url = supabase.storage
                          .from('rams-pdfs')
                          .getPublicUrl(selectedRAMS.pdf_url!).data.publicUrl;
                        const ok = await copyToClipboard(url);
                        toast(
                          ok
                            ? {
                                title: 'Link copied',
                                description: 'PDF link copied to clipboard.',
                              }
                            : {
                                title: 'Copy failed',
                                description: 'Could not copy the link. Try again.',
                                variant: 'destructive',
                              }
                        );
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy PDF link
                    </SecondaryButton>
                  )}
                  {selectedAccess.canEdit && (
                    <DestructiveButton
                      onClick={() => setConfirmDelete(true)}
                      disabled={deleteRAMS.isPending}
                    >
                      Delete
                    </DestructiveButton>
                  )}
                </div>

                <PrimaryButton fullWidth onClick={() => setShowDetailSheet(false)}>
                  Close
                </PrimaryButton>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent className="bg-[hsl(0_0%_8%)] border border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete RAMS?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              {selectedRAMS
                ? `"${selectedRAMS.project_name}" will be permanently removed. This cannot be undone.`
                : 'This RAMS document will be permanently removed.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-red-500/90 hover:bg-red-500 text-white"
              onClick={async () => {
                if (!selectedRAMS) return;
                setConfirmDelete(false);
                await deleteRAMS.mutateAsync(selectedRAMS.id);
                setShowDetailSheet(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageFrame>
  );
}
