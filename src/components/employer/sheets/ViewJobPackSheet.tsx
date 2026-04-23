import { useState, useEffect, useMemo } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import {
  useUpdateJobPack,
  useDeleteJobPack,
  useJobPackDocuments,
  useJobPackAcknowledgements,
} from '@/hooks/useJobPacks';
import { useEmployees } from '@/hooks/useEmployees';
import { useCertificationsByEmployees } from '@/hooks/useCertifications';
import { supabase } from '@/integrations/supabase/client';
import { JobPack, JobPackStatus } from '@/services/jobPackService';
import {
  MapPin,
  Users,
  Trash2,
  Save,
  FileText,
  ClipboardList,
  BookOpen,
  CheckCircle2,
  Download,
  AlertCircle,
  Upload,
  Send,
  Award,
  AlertTriangle,
  Clock,
  Sparkles,
  RefreshCw,
  Eye,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  Pill,
  Eyebrow,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
  SuccessCheckmark,
} from '@/components/employer/editorial';

interface ViewJobPackSheetProps {
  jobPack: JobPack | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewJobPackSheet({ jobPack, open, onOpenChange }: ViewJobPackSheetProps) {
  const updateJobPack = useUpdateJobPack();
  const deleteJobPack = useDeleteJobPack();
  const { data: employees = [] } = useEmployees();
  const { data: documents = [] } = useJobPackDocuments(jobPack?.id || '');
  const { data: acknowledgements = [] } = useJobPackAcknowledgements(jobPack?.id || '');

  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [location, setLocation] = useState('');
  const [scope, setScope] = useState('');
  const [status, setStatus] = useState<JobPackStatus>('Draft');
  const [briefingContent, setBriefingContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [isSendingToWorkers, setIsSendingToWorkers] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (jobPack) {
      setTitle(jobPack.title);
      setClient(jobPack.client);
      setLocation(jobPack.location);
      setScope(jobPack.scope || '');
      setStatus(jobPack.status);
      setBriefingContent(jobPack.briefing_content || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobPack?.id]);

  const assignedEmployees = useMemo(
    () => employees.filter((e) => jobPack?.assigned_workers?.includes(e.id)),
    [employees, jobPack?.assigned_workers]
  );

  const assignedWorkerIds = useMemo(() => assignedEmployees.map((e) => e.id), [assignedEmployees]);
  const { data: workerCertifications = [] } = useCertificationsByEmployees(assignedWorkerIds);

  const certificationCompliance = useMemo(() => {
    if (!jobPack?.required_certifications?.length || !assignedEmployees.length) {
      return { compliant: 0, total: 0, percentage: 100, details: [] };
    }

    const requiredCerts = jobPack.required_certifications.map((c) => c.toLowerCase());

    const details = assignedEmployees.map((emp) => {
      const empCerts = workerCertifications
        .filter((c) => c.employee_id === emp.id)
        .map((c) => c.name.toLowerCase());

      const missingCerts = requiredCerts.filter(
        (required) => !empCerts.some((cert) => cert.includes(required) || required.includes(cert))
      );

      return {
        employee: emp,
        hasCerts: missingCerts.length === 0,
        missingCerts: missingCerts.map(
          (c) => jobPack.required_certifications?.find((rc) => rc.toLowerCase() === c) || c
        ),
      };
    });

    const compliant = details.filter((d) => d.hasCerts).length;

    return {
      compliant,
      total: assignedEmployees.length,
      percentage:
        assignedEmployees.length > 0
          ? Math.round((compliant / assignedEmployees.length) * 100)
          : 100,
      details,
    };
  }, [jobPack?.required_certifications, assignedEmployees, workerCertifications]);

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
          status,
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
        | 'rams_generated'
        | 'method_statement_generated'
        | 'briefing_pack_generated';
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
      await updateJobPack.mutateAsync({
        id: jobPack.id,
        updates: {
          sent_to_workers_at: new Date().toISOString(),
          status: 'In Progress',
        },
      });

      toast({
        title: 'Pack sent',
        description: `Job pack sent to ${assignedEmployees.length} worker(s).`,
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

  const acknowledgedCount = acknowledgements.length;
  const acknowledgedPercent =
    assignedEmployees.length > 0
      ? Math.round((acknowledgedCount / assignedEmployees.length) * 100)
      : 0;

  const statusTone: Record<string, 'emerald' | 'amber' | 'blue' | 'yellow'> = {
    Complete: 'emerald',
    'In Progress': 'blue',
    Draft: 'amber',
  };

  return (
    <>
      <SuccessCheckmark show={showSuccess} />
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
        >
          <SheetShell
            eyebrow={jobPack.client}
            title={isEditing ? 'Edit job pack' : jobPack.title}
            description={
              <span className="flex items-center gap-2">
                <Pill tone={statusTone[jobPack.status] ?? 'amber'}>{jobPack.status}</Pill>
                <span className="truncate">{jobPack.location}</span>
              </span>
            }
            footer={
              isEditing ? (
                <>
                  <SecondaryButton onClick={() => setIsEditing(false)} fullWidth>
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={handleSave}
                    disabled={updateJobPack.isPending}
                    fullWidth
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save changes
                  </PrimaryButton>
                </>
              ) : (
                <>
                  <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                    Close
                  </SecondaryButton>
                  <PrimaryButton onClick={() => setIsEditing(true)} fullWidth>
                    Edit
                  </PrimaryButton>
                </>
              )
            }
          >
            {isEditing ? (
              <>
                <FormCard eyebrow="Job pack details">
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
                  <Field label="Scope of works">
                    <Textarea
                      value={scope}
                      onChange={(e) => setScope(e.target.value)}
                      rows={4}
                      className={cn(textareaClass, 'min-h-[120px]')}
                    />
                  </Field>
                  <Field label="Status">
                    <Select value={status} onValueChange={(v) => setStatus(v as JobPackStatus)}>
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Complete">Complete</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </FormCard>
              </>
            ) : (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start gap-0 h-auto p-1 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl">
                  {['overview', 'documents', 'certs', 'briefing', 'distribute'].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="flex-1 h-10 touch-manipulation data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-xs sm:text-sm rounded-lg text-white capitalize"
                    >
                      {tab === 'distribute' ? 'Send' : tab}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-3 mt-4">
                  <div className="flex items-center gap-3 text-white">
                    <MapPin className="h-5 w-5 shrink-0" />
                    <span>{jobPack.location}</span>
                  </div>

                  {jobPack.scope && (
                    <FormCard eyebrow="Scope of works">
                      <p className="text-sm text-white">{jobPack.scope}</p>
                    </FormCard>
                  )}

                  {jobPack.hazards && jobPack.hazards.length > 0 && (
                    <FormCard eyebrow="Identified hazards">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-amber-400" />
                        <Eyebrow>Hazards</Eyebrow>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {jobPack.hazards.map((hazard) => (
                          <Pill key={hazard} tone="amber">
                            {hazard}
                          </Pill>
                        ))}
                      </div>
                    </FormCard>
                  )}

                  {assignedEmployees.length > 0 && (
                    <FormCard eyebrow={`Assigned workers · ${assignedEmployees.length}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-white" />
                        <Eyebrow>Workers</Eyebrow>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {assignedEmployees.map((emp) => (
                          <Pill key={emp.id} tone="yellow">
                            {emp.name}
                          </Pill>
                        ))}
                      </div>
                    </FormCard>
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
                          This will permanently delete "{jobPack.title}". This action cannot be
                          undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="space-y-3 mt-4">
                  <DocumentCard
                    icon={<FileText className="h-5 w-5" />}
                    title="RAMS"
                    description="Risk Assessment & Method Statement"
                    generated={jobPack.rams_generated}
                    onGenerate={() => handleGenerateDocument('rams')}
                    isGenerating={isGenerating === 'rams'}
                    disabled={isGenerating !== null}
                  />

                  <DocumentCard
                    icon={<ClipboardList className="h-5 w-5" />}
                    title="Method statement"
                    description="Step-by-step work procedure"
                    generated={jobPack.method_statement_generated}
                    onGenerate={() => handleGenerateDocument('method_statement')}
                    isGenerating={isGenerating === 'method_statement'}
                    disabled={isGenerating !== null}
                  />

                  <DocumentCard
                    icon={<BookOpen className="h-5 w-5" />}
                    title="Briefing pack"
                    description="Complete worker briefing document"
                    generated={jobPack.briefing_pack_generated}
                    onGenerate={() => handleGenerateDocument('briefing_pack')}
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

                  <div className="rounded-2xl border border-dashed border-white/[0.1] bg-[hsl(0_0%_10%)] p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-white mb-2" />
                    <p className="text-sm font-medium text-white">
                      Upload additional documents
                    </p>
                    <p className="text-xs text-white">Design drawings, specs, schedules</p>
                    <SecondaryButton className="mt-3">Choose files</SecondaryButton>
                  </div>

                  {documents.length > 0 && (
                    <FormCard eyebrow="Uploaded documents">
                      <div className="space-y-2">
                        {documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between p-3 bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl"
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <FileText className="h-4 w-4 text-white shrink-0" />
                              <span className="text-sm text-white truncate">{doc.title}</span>
                            </div>
                            <SecondaryButton size="sm">
                              <Download className="h-4 w-4" />
                            </SecondaryButton>
                          </div>
                        ))}
                      </div>
                    </FormCard>
                  )}
                </TabsContent>

                {/* Certifications Tab */}
                <TabsContent value="certs" className="space-y-3 mt-4">
                  {jobPack.required_certifications && jobPack.required_certifications.length > 0 ? (
                    <>
                      <FormCard eyebrow="Required certifications">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="h-4 w-4 text-blue-400" />
                          <Eyebrow>Certifications</Eyebrow>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {jobPack.required_certifications.map((cert) => (
                            <Pill key={cert} tone="cyan">
                              {cert}
                            </Pill>
                          ))}
                        </div>
                      </FormCard>

                      <div
                        className={cn(
                          'rounded-2xl border p-4',
                          certificationCompliance.percentage === 100
                            ? 'border-emerald-500/25 bg-emerald-500/10'
                            : 'border-amber-400/25 bg-amber-400/10'
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">Team compliance</span>
                          <span
                            className={cn(
                              'text-lg font-bold tabular-nums',
                              certificationCompliance.percentage === 100
                                ? 'text-emerald-400'
                                : 'text-amber-400'
                            )}
                          >
                            {certificationCompliance.compliant}/{certificationCompliance.total}
                          </span>
                        </div>
                        <Progress
                          value={certificationCompliance.percentage}
                          className={cn(
                            'h-2',
                            certificationCompliance.percentage === 100
                              ? '[&>div]:bg-emerald-400'
                              : '[&>div]:bg-amber-400'
                          )}
                        />
                        <p className="text-xs text-white mt-2">
                          {certificationCompliance.percentage === 100
                            ? 'All assigned workers have required certifications'
                            : `${certificationCompliance.total - certificationCompliance.compliant} worker(s) may be missing certifications`}
                        </p>
                      </div>

                      <FormCard eyebrow="Worker certification status">
                        {assignedEmployees.map((emp) => {
                          const detail = certificationCompliance.details.find(
                            (d) => d.employee.id === emp.id
                          );
                          const isCompliant = detail?.hasCerts ?? true;
                          return (
                            <div
                              key={emp.id}
                              className={cn(
                                'flex items-center justify-between p-3 rounded-xl border',
                                isCompliant
                                  ? 'border-emerald-500/20 bg-emerald-500/5'
                                  : 'border-amber-400/20 bg-amber-400/5'
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={cn(
                                    'p-1.5 rounded-full',
                                    isCompliant ? 'bg-emerald-500/20' : 'bg-amber-400/20'
                                  )}
                                >
                                  {isCompliant ? (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                  ) : (
                                    <AlertCircle className="h-4 w-4 text-amber-400" />
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-white truncate">
                                    {emp.name}
                                  </p>
                                  <p className="text-xs text-white truncate">{emp.team_role}</p>
                                </div>
                              </div>
                              <Pill tone={isCompliant ? 'emerald' : 'amber'}>
                                {isCompliant ? 'Compliant' : 'Check required'}
                              </Pill>
                            </div>
                          );
                        })}
                      </FormCard>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Award className="h-12 w-12 mx-auto text-white mb-3" />
                      <p className="text-sm text-white">
                        No certifications required for this job pack
                      </p>
                      <SecondaryButton className="mt-3" onClick={() => setIsEditing(true)}>
                        Add requirements
                      </SecondaryButton>
                    </div>
                  )}
                </TabsContent>

                {/* Briefing Tab */}
                <TabsContent value="briefing" className="space-y-3 mt-4">
                  <Field label="Pre-job briefing content">
                    <Textarea
                      value={briefingContent}
                      onChange={(e) => setBriefingContent(e.target.value)}
                      placeholder="Site access arrangements, emergency contacts, PPE requirements, specific safety notes…"
                      rows={8}
                      className={cn(textareaClass, 'min-h-[200px]')}
                    />
                  </Field>

                  {jobPack.hazards && jobPack.hazards.length > 0 && (
                    <FormCard eyebrow="Hazard summary">
                      <div className="flex items-center gap-2 mb-2 text-amber-400">
                        <AlertTriangle className="h-4 w-4" />
                        <Eyebrow>Hazards</Eyebrow>
                      </div>
                      <ul className="text-sm space-y-1 text-white">
                        {jobPack.hazards.map((hazard) => (
                          <li key={hazard} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            {hazard}
                          </li>
                        ))}
                      </ul>
                    </FormCard>
                  )}

                  {jobPack.required_certifications &&
                    jobPack.required_certifications.length > 0 && (
                      <FormCard eyebrow="Required qualifications">
                        <div className="flex items-center gap-2 mb-2 text-blue-400">
                          <Award className="h-4 w-4" />
                          <Eyebrow>Qualifications</Eyebrow>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {jobPack.required_certifications.map((cert) => (
                            <Pill key={cert} tone="cyan">
                              {cert}
                            </Pill>
                          ))}
                        </div>
                      </FormCard>
                    )}

                  <PrimaryButton
                    onClick={handleSave}
                    disabled={updateJobPack.isPending}
                    fullWidth
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save briefing content
                  </PrimaryButton>
                </TabsContent>

                {/* Distribution Tab */}
                <TabsContent value="distribute" className="space-y-3 mt-4">
                  {jobPack.sent_to_workers_at ? (
                    <>
                      <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/25 p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                          <div>
                            <p className="font-medium text-emerald-400">Pack sent to workers</p>
                            <p className="text-xs text-white truncate">
                              {new Date(jobPack.sent_to_workers_at).toLocaleString('en-GB', {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white">Acknowledged</span>
                          <span className="font-bold text-white tabular-nums">
                            {acknowledgedCount}/{assignedEmployees.length}
                          </span>
                        </div>
                        <Progress
                          value={acknowledgedPercent}
                          className="h-2 mt-2 [&>div]:bg-emerald-400"
                        />
                      </div>

                      <FormCard eyebrow="Acknowledgement status">
                        {assignedEmployees.map((emp) => {
                          const ack = acknowledgements.find((a) => a.employee_id === emp.id);
                          return (
                            <div
                              key={emp.id}
                              className={cn(
                                'flex items-center justify-between p-3 rounded-xl border',
                                ack
                                  ? 'border-emerald-500/20 bg-emerald-500/5'
                                  : 'border-white/[0.06] bg-[hsl(0_0%_9%)]'
                              )}
                            >
                              <div className="flex items-center gap-3">
                                {ack ? (
                                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                ) : (
                                  <Clock className="h-4 w-4 text-white" />
                                )}
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-white truncate">
                                    {emp.name}
                                  </p>
                                  {ack && (
                                    <p className="text-xs text-white truncate">
                                      Acknowledged{' '}
                                      {new Date(ack.acknowledged_at).toLocaleString('en-GB', {
                                        dateStyle: 'medium',
                                        timeStyle: 'short',
                                      })}
                                    </p>
                                  )}
                                </div>
                              </div>
                              {!ack && (
                                <SecondaryButton size="sm">
                                  <RefreshCw className="h-4 w-4" />
                                </SecondaryButton>
                              )}
                            </div>
                          );
                        })}
                      </FormCard>

                      <SecondaryButton fullWidth>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Send reminder to pending
                      </SecondaryButton>
                    </>
                  ) : (
                    <>
                      <div className="text-center py-6">
                        <Send className="h-12 w-12 mx-auto text-elec-yellow/50 mb-3" />
                        <h3 className="font-semibold text-white mb-1">Ready to distribute</h3>
                        <p className="text-sm text-white">
                          Send this job pack to {assignedEmployees.length} assigned worker(s)
                        </p>
                      </div>

                      <FormCard eyebrow="Pre-flight check">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white">Documents ready</span>
                          <span className="font-medium text-white tabular-nums">
                            {
                              [
                                jobPack.rams_generated,
                                jobPack.method_statement_generated,
                                jobPack.briefing_pack_generated,
                              ].filter(Boolean).length
                            }
                            /3
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white">Workers assigned</span>
                          <span className="font-medium text-white tabular-nums">
                            {assignedEmployees.length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white">Certifications</span>
                          <Pill
                            tone={
                              certificationCompliance.percentage === 100 ? 'emerald' : 'amber'
                            }
                          >
                            {certificationCompliance.percentage}% compliant
                          </Pill>
                        </div>
                      </FormCard>

                      <PrimaryButton
                        onClick={handleSendToWorkers}
                        disabled={isSendingToWorkers || assignedEmployees.length === 0}
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

                      {assignedEmployees.length === 0 && (
                        <p className="text-xs text-center text-white">
                          Assign workers before sending
                        </p>
                      )}
                    </>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </SheetShell>
        </SheetContent>
      </Sheet>
    </>
  );
}

interface DocumentCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  generated: boolean;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled?: boolean;
  note?: string;
}

function DocumentCard({
  icon,
  title,
  description,
  generated,
  onGenerate,
  isGenerating,
  disabled,
  note,
}: DocumentCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-4',
        generated
          ? 'border-emerald-500/25 bg-emerald-500/5'
          : 'border-white/[0.06] bg-[hsl(0_0%_12%)]'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'p-2 rounded-xl',
              generated ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/[0.06] text-white'
            )}
          >
            {icon}
          </div>
          <div>
            <p className="font-medium text-white">{title}</p>
            <p className="text-xs text-white">{description}</p>
          </div>
        </div>
        {generated ? (
          <div className="flex gap-2">
            <SecondaryButton size="sm">
              <Eye className="h-4 w-4 mr-1" />
              View
            </SecondaryButton>
            <SecondaryButton size="sm">
              <Download className="h-4 w-4" />
            </SecondaryButton>
          </div>
        ) : (
          <PrimaryButton size="sm" onClick={onGenerate} disabled={disabled}>
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : (
              <Sparkles className="h-4 w-4 mr-1" />
            )}
            Generate
          </PrimaryButton>
        )}
      </div>
      {note && <p className="text-xs text-white mt-2">{note}</p>}
    </div>
  );
}
