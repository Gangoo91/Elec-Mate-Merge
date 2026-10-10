import { useState, useEffect, useMemo, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import {
  useUpdateJobPack,
  useDeleteJobPack,
  useJobPackDocuments,
  useJobPackAcknowledgements,
  useCreateJobPackDocument,
  invalidatePackViews,
  chaseUnsignedPack,
} from '@/hooks/useJobPacks';
import { useCrewCompetence } from '@/hooks/useCrewCompetence';
import { checkPackCrew } from '@/utils/packCompetence';
import { uploadJobPackFile } from '@/services/jobPackDocumentService';
import { useEmployees } from '@/hooks/useEmployees';
import { supabase } from '@/integrations/supabase/client';
import { JobPack } from '@/services/jobPackService';
import {
  Trash2,
  Save,
  Download,
  Upload,
  Send,
  Sparkles,
  RefreshCw,
  Eye,
  Loader2,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
  textareaClass,
  SuccessCheckmark,
} from '@/components/employer/editorial';
import {
  panel,
  PanelHead,
  Rows,
  Row,
  KeyValue,
  StatusPill,
  Segments,
  PlainEmpty,
  plural,
  rowBtnPrimary,
  rowBtnSecondary,
} from '@/components/employer/pageParts/PageParts';

type PackTab = 'overview' | 'documents' | 'certs' | 'briefing' | 'distribute';

interface ViewJobPackSheetProps {
  jobPack: JobPack | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Open the site safety PDF for this pack's job (ELE-1962: the PDF is an export of the pack). */
  onExportSitePack?: (jobId: string | null) => void;
}

export function ViewJobPackSheet({
  jobPack,
  open,
  onOpenChange,
  onExportSitePack,
}: ViewJobPackSheetProps) {
  const queryClient = useQueryClient();
  const updateJobPack = useUpdateJobPack();
  const deleteJobPack = useDeleteJobPack();
  const { data: employees = [] } = useEmployees();
  const { data: documents = [] } = useJobPackDocuments(jobPack?.id || '');
  const { data: acknowledgements = [] } = useJobPackAcknowledgements(jobPack?.id || '');

  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [location, setLocation] = useState('');
  const [scope, setScope] = useState('');
  const [briefingContent, setBriefingContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tab, setTab] = useState<PackTab>('overview');
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [isSendingToWorkers, setIsSendingToWorkers] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [viewerDoc, setViewerDoc] = useState<{ title: string; content: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createJobPackDocument = useCreateJobPackDocument();

  // Generated RAMS/Method/Briefing content is stored on the document row's
  // `description` (markdown) — map each card's type to its generated doc.
  const generatedDocByType = useMemo(() => {
    const map: Record<
      string,
      { title: string; description: string | null; file_url: string | null }
    > = {};
    for (const d of documents) {
      if (d.generated_by === 'AI' && d.document_type) map[d.document_type.toUpperCase()] = d;
    }
    return map;
  }, [documents]);

  const openGeneratedDoc = (docType: string, fallbackTitle: string) => {
    const doc = generatedDocByType[docType.toUpperCase()];
    if (doc?.file_url) {
      window.open(doc.file_url, '_blank');
      return;
    }
    if (doc?.description) {
      setViewerDoc({ title: doc.title || fallbackTitle, content: doc.description });
    } else {
      toast({ title: 'Not ready', description: 'Generate this document first.' });
    }
  };

  const downloadGeneratedDoc = (docType: string, fallbackTitle: string) => {
    const doc = generatedDocByType[docType.toUpperCase()];
    if (doc?.file_url) {
      window.open(doc.file_url, '_blank');
      return;
    }
    if (!doc?.description) {
      toast({ title: 'Not ready', description: 'Generate this document first.' });
      return;
    }
    const blob = new Blob([doc.description], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(doc.title || fallbackTitle).replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUploadFiles = async (files: FileList | null) => {
    if (!files?.length || !jobPack) return;
    setIsUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fileUrl = await uploadJobPackFile(jobPack.id, file, 'attachment');
        await createJobPackDocument.mutateAsync({
          job_pack_id: jobPack.id,
          title: file.name,
          document_type: 'Other',
          description: null,
          file_url: fileUrl,
          generated_by: 'Upload',
          is_required: false,
        });
      }
      toast({ title: 'Uploaded', description: 'Document(s) attached to the pack.' });
    } catch {
      toast({
        title: 'Upload failed',
        description: 'Could not attach the document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (jobPack) {
      setTitle(jobPack.title);
      setClient(jobPack.client);
      setLocation(jobPack.location);
      setScope(jobPack.scope || '');
      setBriefingContent(jobPack.briefing_content || '');
      setTab('overview');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobPack?.id]);

  const assignedEmployees = useMemo(
    () => employees.filter((e) => jobPack?.assigned_workers?.includes(e.id)),
    [employees, jobPack?.assigned_workers]
  );

  // Required certificates against the crew's Elec-ID credentials, judged on
  // the start date: the same check the job sheet and diary use (ELE-1834).
  const { matrix, isLoading: matrixLoading } = useCrewCompetence();
  const crewCheck = useMemo(
    () =>
      checkPackCrew(
        matrix,
        jobPack?.required_certifications,
        assignedEmployees,
        jobPack?.start_date ?? null
      ),
    [matrix, jobPack?.required_certifications, jobPack?.start_date, assignedEmployees]
  );

  const handleSave = async () => {
    if (!jobPack) return;

    try {
      await updateJobPack.mutateAsync({
        id: jobPack.id,
        updates: {
          title,
          client,
          location,
          scope,
          briefing_content: briefingContent,
        },
      });

      toast({
        title: 'Job pack updated',
        description: `${title} has been updated.`,
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsEditing(false);
      }, 700);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update job pack.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!jobPack) return;

    try {
      await deleteJobPack.mutateAsync(jobPack.id);

      toast({
        title: 'Job pack deleted',
        description: `${jobPack.title} has been deleted.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete job pack.',
        variant: 'destructive',
      });
    }
  };

  const handleGenerateDocument = async (
    documentType: 'rams' | 'method_statement' | 'briefing_pack'
  ) => {
    if (!jobPack) return;

    setIsGenerating(documentType);

    try {
      const { error } = await supabase.functions.invoke('generate-job-pack-document', {
        body: {
          jobPackId: jobPack.id,
          documentType,
          jobData: {
            title: jobPack.title,
            client: jobPack.client,
            location: jobPack.location,
            scope: jobPack.scope,
            hazards: jobPack.hazards,
            required_certifications: jobPack.required_certifications,
          },
        },
      });

      if (error) throw error;

      const updateField = `${documentType}_generated` as
        'rams_generated' | 'method_statement_generated' | 'briefing_pack_generated';
      await updateJobPack.mutateAsync({
        id: jobPack.id,
        updates: { [updateField]: true },
      });

      toast({
        title: 'Document generated',
        description: `${documentType.replace('_', ' ').toUpperCase()} has been generated using AI.`,
      });
    } catch (error) {
      console.error('Error generating document:', error);
      toast({
        title: 'Generation failed',
        description: 'Failed to generate document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(null);
    }
  };

  const handleSendToWorkers = async () => {
    if (!jobPack || assignedEmployees.length === 0) return;

    setIsSendingToWorkers(true);

    try {
      // Atomic server-side send: status + ack rows + worker pushes
      const { data, error } = await supabase.rpc('send_job_pack', { p_pack_id: jobPack.id });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const r = data as any;
      if (error || r?.error) throw new Error(r?.error || error?.message);

      // Refresh the pack row (status → In Progress, sent_to_workers_at) and
      // the ack list so the Distribute tab flips to the sent view instead of
      // re-offering the Send button against a pack that just went out.
      invalidatePackViews(queryClient, jobPack.id);
      queryClient.invalidateQueries({ queryKey: ['job-pack-acknowledgements', jobPack.id] });

      toast({
        title: 'Pack sent',
        description: `Job pack sent to ${r?.workers ?? assignedEmployees.length} worker(s) for sign-off.`,
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 700);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send job pack to workers.',
        variant: 'destructive',
      });
    } finally {
      setIsSendingToWorkers(false);
    }
  };

  if (!jobPack) return null;

  const signedAcks = acknowledgements.filter((a) => !!a.acknowledged_at);
  const acknowledgedCount = signedAcks.length;
  const acknowledgedPercent =
    assignedEmployees.length > 0
      ? Math.round((acknowledgedCount / assignedEmployees.length) * 100)
      : 0;

  // Same vocabulary as the section list/tabs (Sent/Signed) — two names for
  // one state on the same screen read as two different states
  const statusLabel: Record<string, string> = {
    Draft: 'Draft',
    'In Progress': 'Sent',
    Complete: 'Complete',
  };

  const docsReady = [
    jobPack.rams_generated,
    jobPack.method_statement_generated,
    jobPack.briefing_pack_generated,
  ].filter(Boolean).length;
  const statusLine = [
    `${statusLabel[jobPack.status] ?? jobPack.status}${
      jobPack.status === 'In Progress' && assignedEmployees.length > 0
        ? `, ${acknowledgedCount} of ${assignedEmployees.length} signed`
        : ''
    }`,
    jobPack.location,
  ]
    .filter(Boolean)
    .join(' · ');
  const twoCols = 'grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start';
  const fmtDateTime = (ts: string) =>
    new Date(ts).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });

  const chaseOne = async (emp: { id: string; name: string }) => {
    const pending = acknowledgements.find((a) => a.employee_id === emp.id && !a.acknowledged_at);
    if (!pending) {
      toast({
        title: 'Send the pack first',
        description: 'Chasing works once the pack has been sent.',
      });
      return;
    }
    const { data, error } = await supabase.rpc('chase_pack_signoff', { p_ack_id: pending.id });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error || (data as any)?.error) {
      toast({ title: 'Could not chase', variant: 'destructive' });
    } else {
      toast({ title: 'Reminder sent', description: `${emp.name} has been nudged to sign.` });
    }
  };

  const chaseAll = async () => {
    const pending = acknowledgements.filter((a) => !a.acknowledged_at);
    if (pending.length === 0) {
      toast({
        title: 'Waiting on the pack to be re-sent',
        description: 'Someone was added after it went out. Send it again so they can sign.',
      });
      return;
    }
    try {
      // One reminder per person per day (chase_pack_unsigned).
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
    }
  };

  const anyUnsigned = assignedEmployees.some(
    (emp) => !acknowledgements.find((a) => a.employee_id === emp.id && !!a.acknowledged_at)
  );
  const sendBlocked =
    isSendingToWorkers ||
    assignedEmployees.length === 0 ||
    !jobPack.rams_generated ||
    !jobPack.method_statement_generated ||
    !jobPack.briefing_pack_generated;

  return (
    <>
      <SuccessCheckmark show={showSuccess} />
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        width="wide"
        eyebrow={jobPack.client}
        title={isEditing ? 'Edit job pack' : jobPack.title}
        description={statusLine}
        subheader={
          isEditing ? undefined : (
            <div data-help="jobpacks.tabs" className="pb-3">
              <Segments
                items={[
                  { value: 'overview' as PackTab, label: 'Overview' },
                  { value: 'documents' as PackTab, label: 'Docs', count: docsReady },
                  { value: 'certs' as PackTab, label: 'Certs' },
                  { value: 'briefing' as PackTab, label: 'Brief' },
                  { value: 'distribute' as PackTab, label: 'Send' },
                ]}
                value={tab}
                onChange={setTab}
              />
            </div>
          )
        }
        bodyClassName="space-y-5 pt-4"
        footer={
          isEditing ? (
            <div className="flex gap-3">
              <SecondaryButton onClick={() => setIsEditing(false)} className="flex-1">
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleSave}
                disabled={updateJobPack.isPending}
                className="flex-1"
              >
                <Save className="h-4 w-4 mr-2" />
                Save changes
              </PrimaryButton>
            </div>
          ) : (
            <div className="flex gap-3">
              <SecondaryButton onClick={() => onOpenChange(false)} className="flex-1">
                Close
              </SecondaryButton>
              <PrimaryButton onClick={() => setIsEditing(true)} className="flex-1">
                Edit
              </PrimaryButton>
            </div>
          )
        }
      >
        {isEditing ? (
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-4">
              <Field label="Title" required>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <FormGrid cols={2}>
                <Field label="Client">
                  <Input
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Location">
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
            </div>
            <Field label="Scope of works">
              <Textarea
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                rows={4}
                className={cn(textareaClass, 'min-h-[120px]')}
              />
            </Field>
          </div>
        ) : tab === 'overview' ? (
          <div className={twoCols}>
            <div className="space-y-5">
              <section className={cn(panel, 'overflow-hidden')}>
                <PanelHead title="The job" />
                <Rows>
                  <KeyValue label="Location" value={jobPack.location || 'Not set'} />
                  <KeyValue label="Client" value={jobPack.client || 'Not set'} />
                  {jobPack.start_date && (
                    <KeyValue
                      label="Starts"
                      value={new Date(jobPack.start_date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    />
                  )}
                  <KeyValue label="Documents" value={`${docsReady} of 3 made`} />
                </Rows>
              </section>
              {jobPack.scope && (
                <section className={cn(panel, 'px-4 py-3 sm:px-5')}>
                  <p className="text-[13px] font-semibold text-white">Scope of works</p>
                  <p className="mt-1 whitespace-pre-wrap text-[14px] leading-relaxed text-white">
                    {jobPack.scope}
                  </p>
                </section>
              )}
              {jobPack.hazards && jobPack.hazards.length > 0 && (
                <section className={cn(panel, 'px-4 py-3 sm:px-5')}>
                  <p className="text-[13px] font-semibold text-white">Hazards</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-white">
                    {jobPack.hazards.join(', ')}
                  </p>
                </section>
              )}
            </div>
            <div className="space-y-5">
              <section className={cn(panel, 'overflow-hidden')}>
                <PanelHead
                  title="Workers"
                  meta={<span className="text-[13px] text-white">{assignedEmployees.length}</span>}
                />
                {assignedEmployees.length === 0 ? (
                  <p className="px-4 py-3 text-[14px] text-white sm:px-5">Nobody assigned yet.</p>
                ) : (
                  <Rows>
                    {assignedEmployees.map((emp) => (
                      <Row key={emp.id} title={emp.name} detail={emp.team_role ?? undefined} />
                    ))}
                  </Rows>
                )}
              </section>
              {onExportSitePack && (
                <SecondaryButton fullWidth onClick={() => onExportSitePack(jobPack.job_id ?? null)}>
                  <Download className="h-4 w-4 mr-2" />
                  Site safety PDF for the principal contractor
                </SecondaryButton>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DestructiveButton fullWidth>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete job pack
                  </DestructiveButton>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete job pack?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete "{jobPack.title}". This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ) : tab === 'documents' ? (
          <div className={twoCols}>
            <section className={cn(panel, 'overflow-hidden')}>
              <PanelHead
                title="Pack documents"
                meta={<span className="text-[13px] text-white">{docsReady} of 3</span>}
              />
              <Rows>
                <DocumentRow
                  title="RAMS"
                  description="Risk assessment and method statement"
                  generated={jobPack.rams_generated}
                  onGenerate={() => handleGenerateDocument('rams')}
                  onView={() => openGeneratedDoc('rams', 'RAMS')}
                  onDownload={() => downloadGeneratedDoc('rams', 'RAMS')}
                  isGenerating={isGenerating === 'rams'}
                  disabled={isGenerating !== null}
                />
                <DocumentRow
                  title="Method statement"
                  description="Step-by-step work procedure"
                  generated={jobPack.method_statement_generated}
                  onGenerate={() => handleGenerateDocument('method_statement')}
                  onView={() => openGeneratedDoc('method_statement', 'Method statement')}
                  onDownload={() => downloadGeneratedDoc('method_statement', 'Method statement')}
                  isGenerating={isGenerating === 'method_statement'}
                  disabled={isGenerating !== null}
                />
                <DocumentRow
                  title="Briefing pack"
                  description="Complete worker briefing document"
                  generated={jobPack.briefing_pack_generated}
                  onGenerate={() => handleGenerateDocument('briefing_pack')}
                  onView={() => openGeneratedDoc('briefing_pack', 'Briefing pack')}
                  onDownload={() => downloadGeneratedDoc('briefing_pack', 'Briefing pack')}
                  isGenerating={isGenerating === 'briefing_pack'}
                  disabled={
                    isGenerating !== null ||
                    !jobPack.rams_generated ||
                    !jobPack.method_statement_generated
                  }
                  note={
                    !jobPack.rams_generated || !jobPack.method_statement_generated
                      ? 'Generate RAMS and Method Statement first'
                      : undefined
                  }
                />
              </Rows>
            </section>
            <div className="space-y-5">
              <section className={cn(panel, 'px-4 py-4 sm:px-5')}>
                <p className="text-[15px] font-semibold text-white">Upload additional documents</p>
                <p className="mt-0.5 text-[13px] text-white">Design drawings, specs, schedules</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleUploadFiles(e.target.files)}
                />
                <SecondaryButton
                  className="mt-3"
                  fullWidth
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? 'Uploading…' : 'Choose files'}
                </SecondaryButton>
              </section>
              {documents.length > 0 && (
                <section className={cn(panel, 'overflow-hidden')}>
                  <PanelHead
                    title="Uploaded documents"
                    meta={<span className="text-[13px] text-white">{documents.length}</span>}
                  />
                  <Rows>
                    {documents.map((doc) => (
                      <Row
                        key={doc.id}
                        title={doc.title}
                        chevron={false}
                        trailing={
                          <button
                            type="button"
                            aria-label={`Open ${doc.title}`}
                            onClick={() => {
                              if (doc.file_url) window.open(doc.file_url, '_blank');
                              else if (doc.description)
                                setViewerDoc({ title: doc.title, content: doc.description });
                            }}
                            className={rowBtnSecondary}
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        }
                      />
                    ))}
                  </Rows>
                </section>
              )}
            </div>
          </div>
        ) : tab === 'certs' ? (
          /* Required certificates checked against each person's Elec-ID
             credentials on the start date (ELE-1962). */
          jobPack.required_certifications && jobPack.required_certifications.length > 0 ? (
            <div className={twoCols}>
              <section className={cn(panel, 'overflow-hidden')}>
                <PanelHead
                  title={
                    assignedEmployees.length === 0 || matrixLoading
                      ? 'The crew'
                      : crewCheck.peopleShort === 0
                        ? 'Everyone holds what this pack needs'
                        : `${crewCheck.peopleShort} of ${assignedEmployees.length} missing something`
                  }
                />
                {assignedEmployees.length === 0 ? (
                  <p className="px-4 py-3 text-[14px] text-white sm:px-5">
                    Nobody is on this pack yet, so there is no one to check.
                  </p>
                ) : matrixLoading ? (
                  <p className="px-4 py-3 text-[14px] text-white sm:px-5">
                    Checking the crew's credentials.
                  </p>
                ) : (
                  <Rows>
                    {assignedEmployees.map((emp) => {
                      const gaps = crewCheck.gaps[emp.id] ?? [];
                      return (
                        <Row
                          key={emp.id}
                          title={emp.name}
                          detail={
                            gaps.length ? (
                              <span className="text-red-400">{gaps.join(', ')}</span>
                            ) : (
                              'All in date'
                            )
                          }
                          trailing={
                            <StatusPill tone={gaps.length ? 'red' : 'green'}>
                              {gaps.length ? 'Not covered' : 'Covered'}
                            </StatusPill>
                          }
                        />
                      );
                    })}
                  </Rows>
                )}
                {(crewCheck.check.apprenticesOnly || crewCheck.check.ecsExpired.length > 0) && (
                  <p className="border-t border-white/[0.07] px-4 py-3 text-[13px] text-white sm:px-5">
                    {crewCheck.check.problems
                      .filter((p) => !p.startsWith('Nobody on this job holds'))
                      .join('. ')}
                    .
                  </p>
                )}
              </section>
              <section className={cn(panel, 'px-4 py-4 sm:px-5')}>
                <p className="text-[13px] font-semibold text-white">This pack needs</p>
                <p className="mt-1 text-[15px] font-semibold text-white">
                  {jobPack.required_certifications.join(', ')}
                </p>
                <p className="mt-3 text-[13px] leading-snug text-white">
                  Read from each person's Elec-ID credentials, judged on the start date. Add a
                  missing certificate on their Elec-ID and this updates.
                </p>
              </section>
            </div>
          ) : (
            <PlainEmpty text="No certificates required for this job pack." />
          )
        ) : tab === 'briefing' ? (
          <div className={twoCols}>
            <div className="space-y-4">
              <Field label="Pre-job briefing content">
                <Textarea
                  value={briefingContent}
                  onChange={(e) => setBriefingContent(e.target.value)}
                  placeholder="Site access arrangements, emergency contacts, PPE requirements, specific safety notes…"
                  rows={8}
                  className={cn(textareaClass, 'min-h-[200px]')}
                />
              </Field>
              <PrimaryButton onClick={handleSave} disabled={updateJobPack.isPending} fullWidth>
                <Save className="h-4 w-4 mr-2" />
                Save briefing content
              </PrimaryButton>
            </div>
            <div className="space-y-5">
              {jobPack.hazards && jobPack.hazards.length > 0 && (
                <section className={cn(panel, 'px-4 py-3 sm:px-5')}>
                  <p className="text-[13px] font-semibold text-white">Hazard summary</p>
                  <ul className="mt-1 space-y-1 text-[14px] text-white">
                    {jobPack.hazards.map((hazard) => (
                      <li key={hazard}>{hazard}</li>
                    ))}
                  </ul>
                </section>
              )}
              {jobPack.required_certifications && jobPack.required_certifications.length > 0 && (
                <section className={cn(panel, 'px-4 py-3 sm:px-5')}>
                  <p className="text-[13px] font-semibold text-white">Required qualifications</p>
                  <p className="mt-1 text-[14px] text-white">
                    {jobPack.required_certifications.join(', ')}
                  </p>
                </section>
              )}
            </div>
          </div>
        ) : jobPack.sent_to_workers_at ? (
          <div className={twoCols}>
            <section className={cn(panel, 'overflow-hidden')}>
              <PanelHead
                title="Sign-offs"
                meta={
                  <span className="text-[13px] text-white">
                    {acknowledgedCount} of {assignedEmployees.length}
                  </span>
                }
              />
              <Rows>
                {assignedEmployees.map((emp) => {
                  const ack = acknowledgements.find(
                    (a) => a.employee_id === emp.id && !!a.acknowledged_at
                  );
                  return (
                    <Row
                      key={emp.id}
                      title={emp.name}
                      detail={ack ? `Signed ${fmtDateTime(ack.acknowledged_at)}` : 'Not signed yet'}
                      trailing={
                        ack ? (
                          <StatusPill tone="green">Signed</StatusPill>
                        ) : (
                          <button
                            type="button"
                            onClick={() => chaseOne(emp)}
                            className={rowBtnSecondary}
                          >
                            Chase
                          </button>
                        )
                      }
                    />
                  );
                })}
              </Rows>
            </section>
            <div className="space-y-5">
              <section className={cn(panel, 'px-4 py-4 sm:px-5')}>
                <p className="text-[13px] font-semibold text-white">Sent to workers</p>
                <p className="mt-1 text-[15px] font-semibold text-white">
                  {fmtDateTime(jobPack.sent_to_workers_at)}
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.08]" aria-hidden>
                  <div
                    className="h-full rounded-full bg-emerald-400 transition-all"
                    style={{ width: `${acknowledgedPercent}%` }}
                  />
                </div>
                <p className="mt-2 text-[13px] text-white">
                  {acknowledgedCount} of {assignedEmployees.length} signed
                </p>
              </section>
              {anyUnsigned && (
                <SecondaryButton fullWidth onClick={chaseAll}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Chase everyone still to sign
                </SecondaryButton>
              )}
            </div>
          </div>
        ) : (
          <div className={twoCols}>
            <section className={cn(panel, 'overflow-hidden')}>
              <PanelHead title="Before you send" />
              <Rows>
                <KeyValue
                  label="Documents ready"
                  value={`${docsReady} of 3`}
                  tone={docsReady === 3 ? 'green' : undefined}
                />
                <KeyValue label="Workers assigned" value={assignedEmployees.length} />
                <KeyValue
                  label="Certificates"
                  value={
                    !jobPack.required_certifications?.length
                      ? 'None required'
                      : crewCheck.peopleShort === 0
                        ? 'Everyone covered'
                        : `${crewCheck.peopleShort} not covered`
                  }
                  tone={
                    !jobPack.required_certifications?.length || crewCheck.peopleShort === 0
                      ? 'green'
                      : 'red'
                  }
                />
              </Rows>
            </section>
            <div className="space-y-3">
              <p className="text-[14px] leading-snug text-white">
                Send this job pack to {plural(assignedEmployees.length, 'assigned worker')}. Each
                person signs it on their phone.
              </p>
              <PrimaryButton
                onClick={handleSendToWorkers}
                // Same gate as the list's Send action — all 3 documents
                // generated. Sending an empty pack from here undermined
                // the list's 3/3 requirement.
                disabled={sendBlocked}
                fullWidth
                size="lg"
              >
                {isSendingToWorkers ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Send to workers
              </PrimaryButton>
              {assignedEmployees.length === 0 ? (
                <p className="text-[13px] text-white">Assign workers before sending</p>
              ) : !jobPack.rams_generated ||
                !jobPack.method_statement_generated ||
                !jobPack.briefing_pack_generated ? (
                <p className="text-[13px] text-white">
                  Generate all three documents before sending
                </p>
              ) : null}
            </div>
          </div>
        )}
      </FormSheet>

      <FormSheet
        open={!!viewerDoc}
        onOpenChange={(o) => !o && setViewerDoc(null)}
        width="wide"
        title={viewerDoc?.title || 'Document'}
      >
        <div
          className="overflow-x-auto text-[13px] leading-relaxed text-white
            [&_h1]:text-lg [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-5 [&_h1]:mb-2 [&_h1]:first:mt-0
            [&_h2]:text-[15px] [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-5 [&_h2]:mb-1.5
            [&_h3]:text-[13.5px] [&_h3]:font-semibold [&_h3]:text-elec-yellow [&_h3]:mt-4 [&_h3]:mb-1
            [&_p]:mb-2.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:mb-3
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_ol]:mb-3 [&_li]:leading-relaxed
            [&_strong]:font-semibold [&_strong]:text-white [&_hr]:border-white/10 [&_hr]:my-4
            [&_table]:w-full [&_table]:text-[12px] [&_table]:mb-3 [&_table]:border-collapse
            [&_th]:border [&_th]:border-white/10 [&_th]:px-2 [&_th]:py-1 [&_th]:text-left [&_th]:bg-white/[0.04] [&_th]:text-white
            [&_td]:border [&_td]:border-white/10 [&_td]:px-2 [&_td]:py-1"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{viewerDoc?.content || ''}</ReactMarkdown>
        </div>
      </FormSheet>
    </>
  );
}

interface DocumentRowProps {
  title: string;
  description: string;
  generated: boolean;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled?: boolean;
  note?: string;
  onView?: () => void;
  onDownload?: () => void;
}

/** One pack document: made (View + download) or not yet (Generate). */
function DocumentRow({
  title,
  description,
  generated,
  onGenerate,
  isGenerating,
  disabled,
  note,
  onView,
  onDownload,
}: DocumentRowProps) {
  return (
    <Row
      title={title}
      detail={note ?? (generated ? `${description}. Ready.` : description)}
      chevron={false}
      trailing={
        generated ? (
          <>
            <button type="button" onClick={onView} className={rowBtnSecondary}>
              <Eye className="h-4 w-4 " />
              View
            </button>
            <button
              type="button"
              onClick={onDownload}
              aria-label={`Download ${title}`}
              className={cn(rowBtnSecondary, 'w-11 px-0')}
            >
              <Download className="h-4 w-4" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onGenerate}
            disabled={disabled}
            className={cn(rowBtnPrimary, 'disabled:opacity-40')}
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
            ) : (
              <Sparkles className="h-4 w-4 mr-1.5" />
            )}
            Generate
          </button>
        )
      }
    />
  );
}
