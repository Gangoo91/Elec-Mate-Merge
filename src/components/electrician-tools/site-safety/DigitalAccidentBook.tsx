import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLocalDraft } from '@/hooks/useLocalDraft';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { useShowMore } from '@/hooks/useShowMore';
import {
  useAccidentRecords,
  useCreateAccidentRecord,
  useRIDDORDeadlineCheck,
  useArchiveOldRecords,
  useMarkRIDDORReported,
  getRIDDORDeadlineStatus,
  calculateRIDDORDeadline,
} from '@/hooks/useAccidentRecords';

import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent } from '@/components/ui/sheet';

import {
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  LoadingState,
  Eyebrow,
  Field,
  FormCard,
  ListCard,
  ListRow,
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/college/primitives';
import { SafetyModuleShell, SafetyMasthead } from './common/SafetyModuleShell';
import { SignatureField } from './common/SignatureField';
import { ReadinessGate } from './common/ReadinessGate';
import { DraftRecoveryBanner } from './common/DraftRecoveryBanner';
import { DraftSaveIndicator } from './common/DraftSaveIndicator';
import { SmartTextarea } from './common/SmartTextarea';
import { LocationAutoFill } from './common/LocationAutoFill';
import { SafetyPhotoCapture } from './common/SafetyPhotoCapture';
import { LoadMoreButton } from './common/LoadMoreButton';
import { fmtCardDate } from './common/SafetyRecordCard';
import { SafetyDocumentShare } from './common/SafetyDocumentShare';
import { RemoteSignShareSheet } from './common/RemoteSignShareSheet';
import { createSafetySignToken, buildSignUrl, useRecordSignatures } from '@/hooks/useRemoteSignToken';
import { CorrectiveActionsPanel } from './common/CorrectiveActionsPanel';
import { FiveWhysAnalysis } from './common/FiveWhysAnalysis';
import { RIDDORCountdown } from './common/RIDDORCountdown';
import { JobLinkField } from './common/JobLinkField';
import { useSparkProjects } from '@/hooks/useSparkProjects';

// ─── Types ───

type InjuryType =
  | 'cut-laceration'
  | 'burn'
  | 'electric-shock'
  | 'fracture'
  | 'sprain-strain'
  | 'bruise-contusion'
  | 'eye-injury'
  | 'chemical-exposure'
  | 'fall-injury'
  | 'crush-injury'
  | 'head-injury'
  | 'respiratory'
  | 'other';

type BodyPart =
  | 'head'
  | 'face'
  | 'eyes'
  | 'neck'
  | 'shoulder'
  | 'arm'
  | 'hand-fingers'
  | 'chest'
  | 'back'
  | 'abdomen'
  | 'hip'
  | 'leg'
  | 'knee'
  | 'foot-toes'
  | 'multiple';

type Severity = 'minor' | 'moderate' | 'major' | 'fatal';

interface AccidentRecord {
  id: string;
  // Injured person
  injured_name: string;
  injured_role: string;
  injured_employer: string;
  injured_address: string;
  // Incident
  incident_date: string;
  incident_time: string;
  location: string;
  location_detail: string;
  // Injury
  injury_type: InjuryType;
  body_part: BodyPart;
  severity: Severity;
  injury_description: string;
  // How it happened
  incident_description: string;
  activity_at_time: string;
  cause: string;
  // Witnesses
  witnesses: string;
  // Treatment
  first_aid_given: boolean;
  first_aid_details: string;
  first_aider_name: string;
  hospital_visit: boolean;
  hospital_name: string;
  // Aftermath
  time_off_work: boolean;
  days_off: number;
  return_date: string;
  // Reporting
  reported_to: string;
  reported_date: string;
  // RIDDOR
  is_riddor_reportable: boolean;
  riddor_category: string;
  riddor_reference: string;
  riddor_reported: boolean;
  riddor_deadline: string | null;
  riddor_reported_date: string | null;
  // Meta
  recorded_by: string;
  additional_notes: string;
  corrective_actions: string;
  job_id: string | null;
  photos?: string[];
  incident_number?: string;
  is_archived?: boolean;
  created_at: string;
}

// ─── Constants ───

const INJURY_TYPES: { id: InjuryType; label: string }[] = [
  { id: 'cut-laceration', label: 'Cut / Laceration' },
  { id: 'burn', label: 'Burn (thermal/chemical)' },
  { id: 'electric-shock', label: 'Electric Shock' },
  { id: 'fracture', label: 'Fracture / Break' },
  { id: 'sprain-strain', label: 'Sprain / Strain' },
  { id: 'bruise-contusion', label: 'Bruise / Contusion' },
  { id: 'eye-injury', label: 'Eye Injury' },
  { id: 'chemical-exposure', label: 'Chemical Exposure' },
  { id: 'fall-injury', label: 'Fall Injury' },
  { id: 'crush-injury', label: 'Crush Injury' },
  { id: 'head-injury', label: 'Head Injury' },
  { id: 'respiratory', label: 'Respiratory Issue' },
  { id: 'other', label: 'Other' },
];

const BODY_PARTS: { id: BodyPart; label: string }[] = [
  { id: 'head', label: 'Head' },
  { id: 'face', label: 'Face' },
  { id: 'eyes', label: 'Eyes' },
  { id: 'neck', label: 'Neck' },
  { id: 'shoulder', label: 'Shoulder' },
  { id: 'arm', label: 'Arm / Elbow' },
  { id: 'hand-fingers', label: 'Hand / Fingers' },
  { id: 'chest', label: 'Chest' },
  { id: 'back', label: 'Back' },
  { id: 'abdomen', label: 'Abdomen' },
  { id: 'hip', label: 'Hip / Pelvis' },
  { id: 'leg', label: 'Leg / Thigh' },
  { id: 'knee', label: 'Knee' },
  { id: 'foot-toes', label: 'Foot / Toes' },
  { id: 'multiple', label: 'Multiple Areas' },
];

// One colour dimension = severity. Fatal/major (RIDDOR immediate) = red,
// moderate = amber, minor = green.
const SEVERITIES: { id: Severity; label: string; description: string }[] = [
  { id: 'minor', label: 'Minor', description: 'First-aid only' },
  { id: 'moderate', label: 'Moderate', description: 'Treatment needed' },
  { id: 'major', label: 'Major', description: 'Specified injury' },
  { id: 'fatal', label: 'Fatal', description: 'Report immediately' },
];

function sevTone(severity: Severity): Tone {
  return severity === 'fatal' || severity === 'major' ? 'red' : severity === 'moderate' ? 'amber' : 'green';
}

const SEV_CLASS: Record<Tone, string> = {
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  green: 'bg-green-500/10 text-green-400 border-green-500/25',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
  yellow: 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/25',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25',
};

const SEV_LABEL: Record<Severity, string> = {
  minor: 'Minor',
  moderate: 'Moderate',
  major: 'Major',
  fatal: 'Fatal',
};

function SevPill({ severity }: { severity: Severity }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        SEV_CLASS[sevTone(severity)]
      )}
    >
      {SEV_LABEL[severity].toUpperCase()}
    </span>
  );
}

// RIDDOR deadline status → tone for the small pill in the list/detail.
function riddorTone(status: ReturnType<typeof getRIDDORDeadlineStatus>['status']): Tone {
  return status === 'reported'
    ? 'green'
    : status === 'overdue' || status === 'immediate'
      ? 'red'
      : status === 'due_soon'
        ? 'amber'
        : 'orange';
}

const RIDDOR_SPECIFIED_INJURIES = [
  'Fracture (other than fingers/thumbs/toes)',
  'Amputation of arm, hand, finger, thumb, leg, foot or toe',
  'Permanent loss of sight or reduction of sight',
  'Crush injury leading to internal organ damage',
  'Serious burn covering >10% of body or affecting eyes/respiratory system/vital organs',
  'Scalping requiring hospital treatment',
  'Loss of consciousness from head injury or asphyxia',
  'Hypothermia/heat-induced illness requiring resuscitation or hospital admission',
];

const RIDDOR_DANGEROUS_OCCURRENCES = [
  'Collapse, overturning or failure of load-bearing equipment',
  'Plant/equipment contact with overhead power line',
  'Electrical short circuit or overload with fire or explosion',
  'Accidental release of biological agent',
  'Collapse or partial collapse of scaffold over 5m',
  'Unintended collapse of any building under construction',
];

const F2508_CHECKLIST = [
  'Name, address & telephone of the person reporting',
  'Date, time & location of the incident',
  'Name, address & occupation of the injured person',
  'Nature of injury or condition',
  'Brief description of the circumstances',
  "Name & address of the injured person's employer",
  'Details of the dangerous occurrence (if applicable)',
];

// ─── RIDDOR Check ───

function checkRIDDOR(record: Partial<AccidentRecord>): {
  reportable: boolean;
  reasons: string[];
  deadline: string | null;
} {
  const reasons: string[] = [];

  // Fatal — immediate phone report
  if (record.severity === 'fatal') {
    reasons.push('Fatal injury — must be reported immediately by phone (0345 300 9923)');
  }

  // Major/specified injuries — immediate
  if (record.severity === 'major') {
    reasons.push('Major/specified injury — report immediately');
  }

  // Electric shock — only RIDDOR-reportable if causing hospital visit,
  // loss of consciousness, or requiring resuscitation (not ALL electric shocks)
  if (record.injury_type === 'electric-shock' && record.hospital_visit) {
    reasons.push(
      'Electric shock requiring hospital treatment — reportable as dangerous occurrence (10 days)'
    );
  }

  // Over 7 days incapacitation — report within 15 days
  if (record.time_off_work && record.days_off && record.days_off >= 7) {
    reasons.push(
      `Over 7 consecutive days incapacitation (${record.days_off} days) — report within 15 days`
    );
  }

  // Hospital visit from workplace accident (only flag if not already covered above)
  if (
    record.hospital_visit &&
    record.severity !== 'major' &&
    record.severity !== 'fatal' &&
    record.injury_type !== 'electric-shock'
  ) {
    reasons.push('Hospital attendance — review if this constitutes a "specified injury"');
  }

  const deadline = calculateRIDDORDeadline(record as AccidentRecord);

  return {
    reportable: reasons.length > 0,
    reasons,
    deadline,
  };
}

const emptyForm = (): Partial<AccidentRecord> => ({
  injured_name: '',
  injured_role: '',
  injured_employer: '',
  injured_address: '',
  incident_date: new Date().toISOString().split('T')[0],
  incident_time: '',
  location: '',
  location_detail: '',
  injury_type: undefined,
  body_part: undefined,
  severity: undefined,
  injury_description: '',
  incident_description: '',
  activity_at_time: '',
  cause: '',
  witnesses: '',
  first_aid_given: false,
  first_aid_details: '',
  first_aider_name: '',
  hospital_visit: false,
  hospital_name: '',
  time_off_work: false,
  days_off: 0,
  return_date: '',
  reported_to: '',
  reported_date: new Date().toISOString().split('T')[0],
  is_riddor_reportable: false,
  riddor_category: '',
  riddor_reference: '',
  riddor_reported: false,
  riddor_deadline: null,
  riddor_reported_date: null,
  recorded_by: '',
  additional_notes: '',
  corrective_actions: '',
  job_id: null,
});

const softTextareaClass =
  'min-h-[100px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl';

function CollapsibleSection({
  title,
  open,
  onOpenChange,
  children,
}: {
  title: string;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
      <Collapsible open={open} onOpenChange={onOpenChange}>
        <CollapsibleTrigger className="flex items-center justify-between w-full px-5 py-4 touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors">
          <Eyebrow>{title}</Eyebrow>
          <span
            className={cn('text-white/40 text-[13px] transition-transform duration-200', open && 'rotate-180')}
            aria-hidden
          >
            ⌄
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-5 pb-5 pt-1 space-y-4">{children}</CollapsibleContent>
      </Collapsible>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value?: React.ReactNode }) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] text-white/55">{label}</span>
      <span className="text-[13px] text-white">{value}</span>
    </div>
  );
}

// ─── Main Component ───

export function DigitalAccidentBook({ onBack }: { onBack: () => void }) {
  const { data: dbRecords, isLoading } = useAccidentRecords();
  const createRecord = useCreateAccidentRecord();
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const [showShare, setShowShare] = useState(false);

  // RIDDOR deadline warning toasts
  useRIDDORDeadlineCheck();
  // Auto-archive records older than 3 years (server-side)
  useArchiveOldRecords();

  const records: AccidentRecord[] = (dbRecords || []).map((r) => ({
    id: r.id,
    injured_name: r.injured_name,
    injured_role: r.injured_role || '',
    injured_employer: r.injured_employer || '',
    injured_address: r.injured_address || '',
    incident_date: r.incident_date,
    incident_time: r.incident_time || '',
    location: r.location,
    location_detail: r.location_detail || '',
    injury_type: r.injury_type as InjuryType,
    body_part: r.body_part as BodyPart,
    severity: r.severity as Severity,
    injury_description: r.injury_description || '',
    incident_description: r.incident_description,
    activity_at_time: r.activity_at_time || '',
    cause: r.cause || '',
    witnesses: r.witnesses || '',
    first_aid_given: r.first_aid_given,
    first_aid_details: r.first_aid_details || '',
    first_aider_name: r.first_aider_name || '',
    hospital_visit: r.hospital_visit,
    hospital_name: r.hospital_name || '',
    time_off_work: r.time_off_work,
    days_off: r.days_off,
    return_date: r.return_date || '',
    reported_to: r.reported_to || '',
    reported_date: r.reported_date || '',
    is_riddor_reportable: r.is_riddor_reportable,
    riddor_category: r.riddor_category || '',
    riddor_reference: r.riddor_reference || '',
    riddor_reported: r.riddor_reported,
    riddor_deadline: r.riddor_deadline || null,
    riddor_reported_date: r.riddor_reported_date || null,
    recorded_by: r.recorded_by,
    additional_notes: r.additional_notes || '',
    corrective_actions: r.corrective_actions || '',
    job_id: r.job_id ?? null,
    incident_number: r.incident_number || undefined,
    is_archived: r.is_archived ?? false,
    created_at: r.created_at,
  }));

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<AccidentRecord>>(emptyForm);

  // Spark project link
  const { data: jobs = [] } = useSparkProjects('active');
  const jobTitleFor = (id: string | null) => (id ? jobs.find((j) => j.id === id)?.title ?? null : null);

  // ─── Draft persistence ───
  const {
    status: draftStatus,
    recoveredData: recoveredDraft,
    clearDraft,
    dismissRecovery: dismissDraft,
  } = useLocalDraft({
    key: 'accident-book',
    data: { form },
    enabled: showForm,
  });

  const restoreDraft = () => {
    if (!recoveredDraft) return;
    if (recoveredDraft.form) setForm((prev) => ({ ...prev, ...recoveredDraft.form }));
    dismissDraft();
  };

  const [viewingRecord, setViewingRecord] = useState<AccidentRecord | null>(null);
  // Remote supervisor sign-off (generic engine)
  const [showSignShare, setShowSignShare] = useState(false);
  const [signUrl, setSignUrl] = useState('');
  const [signLoading, setSignLoading] = useState(false);
  const { data: accidentSignatures = [] } = useRecordSignatures('accident', viewingRecord?.id ?? null);
  const remoteSupervisor = accidentSignatures.find((s) => s.role === 'supervisor' && s.signed_signature);

  const requestSupervisorSignOff = async (rec: AccidentRecord) => {
    setSignLoading(true);
    try {
      const token = await createSafetySignToken({
        documentType: 'accident',
        recordId: rec.id,
        role: 'supervisor',
        summary: {
          title: 'Accident Record — Supervisor Sign-off',
          subtitle: rec.incident_number || undefined,
          lines: [
            { label: 'Injury', value: injuryLabelOf(rec.injury_type) },
            { label: 'Severity', value: SEV_LABEL[rec.severity] },
            { label: 'Location', value: rec.location || '—' },
          ],
          statement:
            'By signing you confirm, as the responsible manager/supervisor, that this accident record has been reviewed and the corrective actions are appropriate.',
        },
      });
      if (!token) return;
      setSignUrl(buildSignUrl(token));
      setShowSignShare(true);
    } finally {
      setSignLoading(false);
    }
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showArchived, setShowArchived] = useState(false);
  const [showRIDDORGuide, setShowRIDDORGuide] = useState(false);
  const [reporterSigData, setReporterSigData] = useState('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  // Collapsible (optional) form sections
  const [treatmentOpen, setTreatmentOpen] = useState(false);
  const [reportingOpen, setReportingOpen] = useState(false);

  // RIDDOR reporting state
  const [showMarkReported, setShowMarkReported] = useState(false);
  const [riddorRef, setRiddorRef] = useState('');
  const [riddorReportedDate, setRiddorReportedDate] = useState(new Date().toISOString().split('T')[0]);
  const markReported = useMarkRIDDORReported();

  const handleMarkReported = async () => {
    if (!viewingRecord || !riddorRef.trim()) return;
    await markReported.mutateAsync({
      id: viewingRecord.id,
      riddor_reference: riddorRef.trim(),
      riddor_reported_date: riddorReportedDate,
    });
    setShowMarkReported(false);
    setRiddorRef('');
    setViewingRecord(null);
  };

  const updateForm = (updates: Partial<AccidentRecord>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setPhotoUrls([]);
    setReporterSigData('');
    setTreatmentOpen(false);
    setReportingOpen(false);
    setForm(emptyForm());
  };

  const riddorCheck = useMemo(() => checkRIDDOR(form), [form]);

  // ─── Readiness gate ───
  const readiness = [
    { ok: !!(form.injured_name || '').trim(), label: 'Injured person named' },
    { ok: !!(form.incident_date || '').trim(), label: 'Incident date' },
    { ok: !!(form.location || '').trim(), label: 'Location' },
    { ok: (form.incident_description || '').trim().length > 0, label: 'How it happened' },
    { ok: !!form.injury_type && !!form.body_part && !!form.severity, label: 'Injury, body part & severity' },
    { ok: !!(form.recorded_by || '').trim(), label: 'Recorded by' },
  ];
  const formReady = readiness.every((r) => r.ok);

  const saveRecord = async () => {
    try {
      await createRecord.mutateAsync({
        injured_name: form.injured_name || '',
        injured_role: form.injured_role || '',
        injured_employer: form.injured_employer || '',
        injured_address: form.injured_address || '',
        incident_date: form.incident_date || '',
        incident_time: form.incident_time || '',
        location: form.location || '',
        location_detail: form.location_detail || '',
        injury_type: form.injury_type || 'other',
        body_part: form.body_part || 'multiple',
        severity: form.severity || 'minor',
        injury_description: form.injury_description || '',
        incident_description: form.incident_description || '',
        activity_at_time: form.activity_at_time || '',
        cause: form.cause || '',
        witnesses: form.witnesses || '',
        first_aid_given: form.first_aid_given || false,
        first_aid_details: form.first_aid_details || '',
        first_aider_name: form.first_aider_name || '',
        hospital_visit: form.hospital_visit || false,
        hospital_name: form.hospital_name || '',
        time_off_work: form.time_off_work || false,
        days_off: form.days_off || 0,
        return_date: form.return_date || '',
        reported_to: form.reported_to || '',
        reported_date: form.reported_date || '',
        is_riddor_reportable: riddorCheck.reportable,
        riddor_category: riddorCheck.reasons.join('; '),
        riddor_reference: form.riddor_reference || '',
        riddor_reported: form.riddor_reported || false,
        riddor_deadline: riddorCheck.deadline || null,
        riddor_reported_date: null,
        recorded_by: form.recorded_by || '',
        additional_notes: form.additional_notes || '',
        corrective_actions: form.corrective_actions || '',
        job_id: form.job_id ?? null,
        photos: photoUrls,
        reporter_signature: reporterSigData || undefined,
      });
      clearDraft();
      setShowForm(false);
      resetForm();
    } catch {
      // Error toast handled by the hook
    }
  };

  // 3-year archival: records flagged by DB trigger (never deleted — legal requirement)
  const isArchived = (r: AccidentRecord) => r.is_archived ?? false;
  const archivedCount = records.filter(isArchived).length;

  const filteredRecords = records.filter((r) => {
    // Archive filter
    if (!showArchived && isArchived(r)) return false;
    // Status tab
    if (statusFilter === 'riddor' && !r.is_riddor_reportable) return false;
    if (statusFilter === 'riddor') {
      const st = getRIDDORDeadlineStatus(r as never).status;
      if (st === 'reported') return false;
    }
    if (statusFilter === 'fatal_major' && r.severity !== 'fatal' && r.severity !== 'major') return false;
    // Search filter
    const q = searchQuery.toLowerCase();
    return (
      r.injured_name.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.incident_description.toLowerCase().includes(q)
    );
  });

  // RIDDOR-pending / urgent records sort to the top.
  const sortedRecords = useMemo(() => {
    const rank = (r: AccidentRecord): number => {
      if (!r.is_riddor_reportable) return 2;
      const st = getRIDDORDeadlineStatus(r as never).status;
      if (st === 'reported') return 1;
      return 0; // pending RIDDOR → top
    };
    return [...filteredRecords].sort((a, b) => rank(a) - rank(b));
  }, [filteredRecords]);

  const {
    visible: visibleRecords,
    hasMore: hasMoreRecords,
    remaining: remainingRecords,
    loadMore: loadMoreRecords,
  } = useShowMore(sortedRecords);

  const total = records.filter((r) => !isArchived(r)).length;
  const riddorPending = records.filter(
    (r) => r.is_riddor_reportable && getRIDDORDeadlineStatus(r as never).status !== 'reported'
  ).length;
  const fatalMajor = records.filter((r) => r.severity === 'fatal' || r.severity === 'major').length;

  const filterTabs = useMemo(
    () => [
      { value: 'all', label: 'All', count: total },
      { value: 'riddor', label: 'RIDDOR pending', count: riddorPending },
      { value: 'fatal_major', label: 'Fatal / major', count: fatalMajor },
    ],
    [total, riddorPending, fatalMajor]
  );

  const injuryLabelOf = (t: InjuryType) => INJURY_TYPES.find((x) => x.id === t)?.label || t;
  const bodyPartLabelOf = (b: BodyPart) => BODY_PARTS.find((x) => x.id === b)?.label || b;

  // ─── Form ───
  if (showForm) {
    return (
      <div className="bg-elec-dark min-h-screen pb-28">
        <SafetyMasthead
          onBack={() => {
            resetForm();
            setShowForm(false);
          }}
          backLabel="Records"
          moduleName="Record accident"
          trailing={<DraftSaveIndicator status={draftStatus} />}
        />
        <div className="mx-auto max-w-3xl px-4 py-4 space-y-4">
          <AnimatePresence>
            {recoveredDraft && <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />}
          </AnimatePresence>

          {/* Injured person */}
          <FormCard eyebrow="Injured person">
            <Field label="Full name" required>
              <input
                value={form.injured_name}
                onChange={(e) => updateForm({ injured_name: e.target.value })}
                placeholder="Name of injured person"
                className={inputClass}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Role / job title">
                <input
                  value={form.injured_role}
                  onChange={(e) => updateForm({ injured_role: e.target.value })}
                  placeholder="e.g. Electrician"
                  className={inputClass}
                />
              </Field>
              <Field label="Employer">
                <input
                  value={form.injured_employer}
                  onChange={(e) => updateForm({ injured_employer: e.target.value })}
                  placeholder="Company name"
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label="Address" hint="Required for RIDDOR records">
              <input
                value={form.injured_address}
                onChange={(e) => updateForm({ injured_address: e.target.value })}
                placeholder="Home address"
                className={inputClass}
              />
            </Field>
          </FormCard>

          {/* When & where */}
          <FormCard eyebrow="When & where">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date of incident" required>
                <input
                  type="date"
                  value={form.incident_date}
                  onChange={(e) => updateForm({ incident_date: e.target.value })}
                  className={cn(inputClass, '[color-scheme:dark]')}
                />
              </Field>
              <Field label="Time">
                <input
                  type="time"
                  value={form.incident_time}
                  onChange={(e) => updateForm({ incident_time: e.target.value })}
                  className={cn(inputClass, '[color-scheme:dark]')}
                />
              </Field>
            </div>
            <LocationAutoFill
              value={form.location || ''}
              onChange={(v) => updateForm({ location: v })}
              label="Location"
              placeholder="Site name / address"
            />
            <Field label="Specific location">
              <input
                value={form.location_detail}
                onChange={(e) => updateForm({ location_detail: e.target.value })}
                placeholder="e.g. Plant room, Level 2, Riser 3"
                className={inputClass}
              />
            </Field>
            <JobLinkField
              jobId={form.job_id ?? null}
              jobTitle={jobTitleFor(form.job_id ?? null)}
              onSelect={(id) => updateForm({ job_id: id })}
            />
          </FormCard>

          {/* What happened */}
          <FormCard eyebrow="What happened">
            <Field label="Activity at time of incident">
              <input
                value={form.activity_at_time}
                onChange={(e) => updateForm({ activity_at_time: e.target.value })}
                placeholder="e.g. Installing containment at height"
                className={inputClass}
              />
            </Field>
            <Field label="How did the incident happen?" required>
              <SmartTextarea
                value={form.incident_description || ''}
                onChange={(val) => updateForm({ incident_description: val })}
                placeholder="Describe exactly what happened, including what the person was doing…"
                className={softTextareaClass}
              />
            </Field>
            <Field label="Cause / contributing factors">
              <input
                value={form.cause}
                onChange={(e) => updateForm({ cause: e.target.value })}
                placeholder="e.g. Wet floor, faulty equipment, inadequate PPE"
                className={inputClass}
              />
            </Field>
            <Field label="Witnesses">
              <input
                value={form.witnesses}
                onChange={(e) => updateForm({ witnesses: e.target.value })}
                placeholder="Names and contact details of witnesses"
                className={inputClass}
              />
            </Field>
          </FormCard>

          {/* Injury */}
          <FormCard eyebrow="Injury">
            <Field label="Type of injury" required>
              <Select
                value={form.injury_type}
                onValueChange={(v) => updateForm({ injury_type: v as InjuryType })}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select injury type…" />
                </SelectTrigger>
                <SelectContent className={cn(selectContentClass, 'max-h-[300px]')}>
                  {INJURY_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Body part injured" required>
              <Select value={form.body_part} onValueChange={(v) => updateForm({ body_part: v as BodyPart })}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select body part…" />
                </SelectTrigger>
                <SelectContent className={cn(selectContentClass, 'max-h-[300px]')}>
                  {BODY_PARTS.map((part) => (
                    <SelectItem key={part.id} value={part.id}>
                      {part.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Severity" required>
              <div className="grid grid-cols-2 gap-2">
                {SEVERITIES.map((s) => {
                  const selected = form.severity === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => updateForm({ severity: s.id })}
                      className={cn(
                        'p-3 rounded-xl border text-left transition-all active:scale-[0.98] touch-manipulation',
                        selected ? SEV_CLASS[sevTone(s.id)] : 'border-white/[0.08] bg-[hsl(0_0%_10%)] text-white'
                      )}
                    >
                      <span className="text-[13px] font-medium block">{s.label}</span>
                      <span className="text-[11px] text-white/55">{s.description}</span>
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Injury description">
              <SmartTextarea
                value={form.injury_description || ''}
                onChange={(val) => updateForm({ injury_description: val })}
                placeholder="Describe the injury in detail…"
                className={cn(softTextareaClass, 'min-h-[80px]')}
              />
            </Field>

            <SafetyPhotoCapture
              photos={photoUrls}
              onPhotosChange={setPhotoUrls}
              label="Incident scene photos"
            />
          </FormCard>

          {/* Treatment & aftermath (optional) */}
          <CollapsibleSection title="Treatment & aftermath (optional)" open={treatmentOpen} onOpenChange={setTreatmentOpen}>
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-white/80">First aid given?</span>
              <Switch
                checked={form.first_aid_given}
                onCheckedChange={(c) => updateForm({ first_aid_given: c })}
              />
            </div>
            {form.first_aid_given && (
              <>
                <Field label="First aid details">
                  <SmartTextarea
                    value={form.first_aid_details || ''}
                    onChange={(val) => updateForm({ first_aid_details: val })}
                    placeholder="Treatment administered…"
                    className={cn(softTextareaClass, 'min-h-[60px]')}
                  />
                </Field>
                <Field label="First aider name">
                  <input
                    value={form.first_aider_name}
                    onChange={(e) => updateForm({ first_aider_name: e.target.value })}
                    className={inputClass}
                  />
                </Field>
              </>
            )}

            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-white/80">Hospital visit required?</span>
              <Switch
                checked={form.hospital_visit}
                onCheckedChange={(c) => updateForm({ hospital_visit: c })}
              />
            </div>
            {form.hospital_visit && (
              <Field label="Hospital name">
                <input
                  value={form.hospital_name}
                  onChange={(e) => updateForm({ hospital_name: e.target.value })}
                  className={inputClass}
                />
              </Field>
            )}

            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-white/80">Time off work required?</span>
              <Switch
                checked={form.time_off_work}
                onCheckedChange={(c) => updateForm({ time_off_work: c })}
              />
            </div>
            {form.time_off_work && (
              <div className="grid grid-cols-2 gap-3">
                <Field label="Days off">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={form.days_off}
                    onChange={(e) => updateForm({ days_off: parseInt(e.target.value) || 0 })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Expected return">
                  <input
                    type="date"
                    value={form.return_date}
                    onChange={(e) => updateForm({ return_date: e.target.value })}
                    className={cn(inputClass, '[color-scheme:dark]')}
                  />
                </Field>
              </div>
            )}
          </CollapsibleSection>

          {/* RIDDOR alert (live) */}
          {riddorCheck.reportable && (
            <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/10 space-y-2">
              <Eyebrow className="text-red-400">RIDDOR reportable</Eyebrow>
              <p className="text-[12px] text-red-200">
                This incident may need to be reported to the HSE under RIDDOR:
              </p>
              <ul className="space-y-1">
                {riddorCheck.reasons.map((reason, i) => (
                  <li key={i} className="text-[12px] text-red-200 flex items-start gap-1.5">
                    <span className="text-red-400 mt-0.5">•</span>
                    {reason}
                  </li>
                ))}
              </ul>
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 space-y-0.5">
                <p className="text-[12px] text-red-200">
                  <strong>Report online:</strong> www.hse.gov.uk/riddor
                </p>
                <p className="text-[12px] text-red-200">
                  <strong>Fatal/major:</strong> Call 0345 300 9923 immediately
                </p>
              </div>
            </div>
          )}

          {/* Reporting & sign-off (optional) */}
          <CollapsibleSection title="Reporting & corrective actions (optional)" open={reportingOpen} onOpenChange={setReportingOpen}>
            <Field label="Reported to">
              <input
                value={form.reported_to}
                onChange={(e) => updateForm({ reported_to: e.target.value })}
                placeholder="Supervisor / manager name"
                className={inputClass}
              />
            </Field>
            <Field label="Corrective actions taken">
              <SmartTextarea
                value={form.corrective_actions || ''}
                onChange={(val) => updateForm({ corrective_actions: val })}
                placeholder="Actions taken to prevent recurrence…"
                className={cn(softTextareaClass, 'min-h-[80px]')}
              />
            </Field>
            <Field label="Additional notes">
              <SmartTextarea
                value={form.additional_notes || ''}
                onChange={(val) => updateForm({ additional_notes: val })}
                placeholder="Any additional notes…"
                className={cn(softTextareaClass, 'min-h-[60px]')}
              />
            </Field>
          </CollapsibleSection>

          {/* Recorder & signature */}
          <FormCard eyebrow="Recorder & sign-off">
            <Field label="Recorded by" required>
              <input
                value={form.recorded_by}
                onChange={(e) => updateForm({ recorded_by: e.target.value })}
                placeholder="Your full name"
                className={inputClass}
              />
            </Field>
            <SignatureField label="Reporter signature" value={reporterSigData} onChange={setReporterSigData} />
          </FormCard>

          <ReadinessGate items={readiness} title="Ready to save?" />
        </div>

        {/* Sticky save */}
        <div
          className="fixed bottom-0 inset-x-0 bg-elec-dark/95 backdrop-blur-sm border-t border-white/[0.06] px-4 py-3"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <div className="mx-auto max-w-3xl">
            <PrimaryButton
              fullWidth
              size="lg"
              disabled={!formReady || createRecord.isPending}
              onClick={saveRecord}
            >
              {createRecord.isPending ? 'Saving…' : 'Save record'}
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  // ─── List ───
  return (
    <SafetyModuleShell
      onBack={onBack}
      moduleName="Accident Book"
      trailing={
        riddorPending > 0 ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border bg-red-500/10 text-red-400 border-red-500/25 whitespace-nowrap">
            {riddorPending} RIDDOR
          </span>
        ) : undefined
      }
      hero={
        <PageHero
          eyebrow="Accident Book · RIDDOR 2013"
          title="Record accidents, meet your RIDDOR deadlines"
          description="Log workplace injuries, auto-classify RIDDOR-reportable incidents, and track the 15-day reporting clock. Records retained for the statutory 3 years."
          tone="red"
          actions={
            <>
              <SecondaryButton onClick={() => setShowRIDDORGuide(true)}>RIDDOR guide</SecondaryButton>
              <PrimaryButton
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
              >
                Record accident
              </PrimaryButton>
            </>
          }
        />
      }
      stats={
        total > 0 || archivedCount > 0 ? (
          <StatStrip
            stats={[
              { value: total, label: 'Total' },
              { value: riddorPending, label: 'RIDDOR pending', sub: 'awaiting HSE report', tone: riddorPending > 0 ? 'red' : undefined },
              { value: fatalMajor, label: 'Fatal / major' },
              { value: archivedCount, label: 'Archived', sub: '3-year statutory' },
            ]}
          />
        ) : undefined
      }
      filter={
        total > 0 ? (
          <FilterBar
            tabs={filterTabs}
            activeTab={statusFilter}
            onTabChange={setStatusFilter}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search records…"
            actions={
              archivedCount > 0 ? (
                <button
                  onClick={() => setShowArchived((v) => !v)}
                  className={cn(
                    'h-10 px-4 rounded-full text-[12.5px] font-medium whitespace-nowrap border touch-manipulation transition-colors',
                    showArchived
                      ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                      : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white'
                  )}
                >
                  {showArchived ? 'Hide' : 'Show'} archived ({archivedCount})
                </button>
              ) : undefined
            }
          />
        ) : undefined
      }
    >
      {isLoading ? (
        <LoadingState />
      ) : records.length === 0 ? (
        <EmptyState
          title="No accidents recorded"
          description="No accidents recorded — a good safety record. When an incident happens, record it here to stay RIDDOR-compliant."
          action="Record accident"
          onAction={() => {
            resetForm();
            setShowForm(true);
          }}
        />
      ) : sortedRecords.length === 0 ? (
        <EmptyState title="No matching records" description="Try a different tab or clear your search." />
      ) : (
        <div className="space-y-2.5">
          {visibleRecords.map((record) => {
            const riddorStatus = record.is_riddor_reportable
              ? getRIDDORDeadlineStatus(record as never)
              : null;
            return (
              <ListCard key={record.id}>
                <ListRow
                  accent={sevTone(record.severity)}
                  onClick={() => setViewingRecord(record)}
                  title={record.injured_name}
                  subtitle={`${injuryLabelOf(record.injury_type)}${record.location ? ` · ${record.location}` : ''}${
                    isArchived(record) ? ' · Archived' : ''
                  }`}
                  trailing={
                    <div className="flex flex-col items-end gap-1">
                      <SevPill severity={record.severity} />
                      {riddorStatus && (
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.1em] border whitespace-nowrap',
                            SEV_CLASS[riddorTone(riddorStatus.status)]
                          )}
                        >
                          {riddorStatus.label}
                        </span>
                      )}
                      <span className="text-[11px] text-white/45 tabular-nums">
                        {fmtCardDate(record.incident_date)}
                      </span>
                    </div>
                  }
                />
              </ListCard>
            );
          })}
          {hasMoreRecords && <LoadMoreButton onLoadMore={loadMoreRecords} remaining={remainingRecords} />}
        </div>
      )}

      {/* Record detail sheet */}
      <Sheet open={!!viewingRecord} onOpenChange={() => setViewingRecord(null)}>
        <SheetContent side="bottom" className="h-[88vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06]">
          {viewingRecord && (
            <SheetShell
              eyebrow={`Accident · ${SEV_LABEL[viewingRecord.severity]}${
                viewingRecord.incident_number ? ` · ${viewingRecord.incident_number}` : ''
              }`}
              title={viewingRecord.injured_name}
              description={`${viewingRecord.incident_date}${
                viewingRecord.incident_time ? ` ${viewingRecord.incident_time}` : ''
              } · ${viewingRecord.location}`}
              footer={
                <div className="flex flex-col gap-2 w-full">
                  <div className="grid grid-cols-2 gap-2">
                    <PrimaryButton
                      fullWidth
                      disabled={isExporting && exportingId === viewingRecord.id}
                      onClick={() => exportPDF('accident', viewingRecord.id)}
                    >
                      {isExporting && exportingId === viewingRecord.id ? 'Exporting…' : 'Export PDF'}
                    </PrimaryButton>
                    <SecondaryButton fullWidth onClick={() => setShowShare(true)}>
                      Share
                    </SecondaryButton>
                  </div>
                  {viewingRecord.is_riddor_reportable && (
                    <button
                      onClick={() => exportPDF('riddor-report', viewingRecord.id)}
                      disabled={isExporting && exportingId === viewingRecord.id}
                      className="w-full h-11 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-[13px] font-semibold touch-manipulation active:scale-[0.98] transition-all disabled:opacity-40"
                    >
                      {isExporting && exportingId === viewingRecord.id ? 'Exporting…' : 'Export RIDDOR report'}
                    </button>
                  )}
                </div>
              }
            >
              <div className="flex items-center gap-2">
                <SevPill severity={viewingRecord.severity} />
                {viewingRecord.is_riddor_reportable && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border bg-red-500/10 text-red-400 border-red-500/25">
                    RIDDOR Reportable
                  </span>
                )}
              </div>

              {/* RIDDOR Countdown — 15-day deadline tracker */}
              {viewingRecord.is_riddor_reportable && (
                <RIDDORCountdown
                  category={viewingRecord.riddor_category}
                  incidentDate={viewingRecord.incident_date}
                  isReported={!!viewingRecord.riddor_reported_date}
                  hseReference={viewingRecord.riddor_reference}
                />
              )}

              {/* RIDDOR status + report actions */}
              {viewingRecord.is_riddor_reportable &&
                (() => {
                  const deadlineStatus = getRIDDORDeadlineStatus(viewingRecord as never);
                  return (
                    <FormCard eyebrow="RIDDOR status" className="border-red-500/20">
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border',
                            SEV_CLASS[riddorTone(deadlineStatus.status)],
                            (deadlineStatus.status === 'overdue' || deadlineStatus.status === 'immediate') &&
                              'animate-pulse'
                          )}
                        >
                          {deadlineStatus.label}
                        </span>
                      </div>
                      <p className="text-[12px] text-white/70">{viewingRecord.riddor_category}</p>
                      {viewingRecord.riddor_deadline && (
                        <DetailField
                          label="Deadline"
                          value={new Date(viewingRecord.riddor_deadline).toLocaleDateString('en-GB')}
                        />
                      )}
                      {viewingRecord.riddor_reference && (
                        <DetailField label="HSE reference" value={viewingRecord.riddor_reference} />
                      )}
                      {viewingRecord.riddor_reported_date && (
                        <DetailField
                          label="Reported"
                          value={
                            <span className="text-green-400">
                              {new Date(viewingRecord.riddor_reported_date).toLocaleDateString('en-GB')}
                            </span>
                          }
                        />
                      )}

                      {deadlineStatus.status !== 'reported' && (
                        <>
                          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                            <Eyebrow className="mb-1.5">Information needed for F2508</Eyebrow>
                            {F2508_CHECKLIST.map((item, i) => (
                              <div key={i} className="flex items-start gap-1.5 mb-1">
                                <span className="text-green-400 mt-0.5 text-[11px]" aria-hidden>
                                  ✓
                                </span>
                                <span className="text-[11px] text-white/80">{item}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <a
                              href="https://notifications.hse.gov.uk/riddorforms/Injury"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 h-11 flex items-center justify-center rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-[12.5px] font-semibold touch-manipulation active:scale-[0.98] transition-all"
                            >
                              Report online
                            </a>
                            <a
                              href="tel:03453009923"
                              className="h-11 px-4 flex items-center justify-center rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-[12.5px] font-semibold touch-manipulation active:scale-[0.98] transition-all"
                            >
                              Call HSE
                            </a>
                          </div>

                          <button
                            onClick={() => setShowMarkReported(true)}
                            className="w-full h-11 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[12.5px] font-semibold touch-manipulation active:scale-[0.98] transition-all"
                          >
                            Mark as reported
                          </button>
                        </>
                      )}
                    </FormCard>
                  );
                })()}

              {/* Injured person */}
              <FormCard eyebrow="Injured person">
                <DetailField label="Name" value={viewingRecord.injured_name} />
                <DetailField label="Role" value={viewingRecord.injured_role} />
                <DetailField label="Employer" value={viewingRecord.injured_employer} />
                <DetailField label="Address" value={viewingRecord.injured_address} />
              </FormCard>

              {/* Incident */}
              <FormCard eyebrow="Incident">
                <DetailField
                  label="Location"
                  value={`${viewingRecord.location}${
                    viewingRecord.location_detail ? ` — ${viewingRecord.location_detail}` : ''
                  }`}
                />
                <DetailField
                  label="Date / time"
                  value={`${viewingRecord.incident_date} ${viewingRecord.incident_time}`.trim()}
                />
                <DetailField label="Activity" value={viewingRecord.activity_at_time} />
                <DetailField label="What happened" value={viewingRecord.incident_description} />
                <DetailField label="Cause" value={viewingRecord.cause} />
                <DetailField label="Witnesses" value={viewingRecord.witnesses} />
                {viewingRecord.job_id && (
                  <DetailField label="Linked project" value={jobTitleFor(viewingRecord.job_id) || 'Linked project'} />
                )}
              </FormCard>

              {/* Injury */}
              <FormCard eyebrow="Injury">
                <DetailField label="Type" value={injuryLabelOf(viewingRecord.injury_type)} />
                <DetailField label="Body part" value={bodyPartLabelOf(viewingRecord.body_part)} />
                <DetailField label="Description" value={viewingRecord.injury_description} />
              </FormCard>

              {/* Treatment & aftermath */}
              {(viewingRecord.first_aid_given ||
                viewingRecord.hospital_visit ||
                viewingRecord.time_off_work) && (
                <FormCard eyebrow="Treatment & aftermath">
                  {viewingRecord.first_aid_given && (
                    <>
                      <DetailField label="First aid" value="Given" />
                      <DetailField label="Details" value={viewingRecord.first_aid_details} />
                      <DetailField label="First aider" value={viewingRecord.first_aider_name} />
                    </>
                  )}
                  {viewingRecord.hospital_visit && (
                    <DetailField label="Hospital" value={viewingRecord.hospital_name || 'Yes'} />
                  )}
                  {viewingRecord.time_off_work && (
                    <DetailField
                      label="Time off work"
                      value={`${viewingRecord.days_off} days${
                        viewingRecord.return_date ? ` — return ${viewingRecord.return_date}` : ''
                      }`}
                    />
                  )}
                </FormCard>
              )}

              {/* Corrective actions (free text) */}
              {viewingRecord.corrective_actions && (
                <FormCard eyebrow="Corrective actions">
                  <p className="text-[13px] text-white">{viewingRecord.corrective_actions}</p>
                </FormCard>
              )}

              {/* Root cause analysis (5 Whys) */}
              <FiveWhysAnalysis
                table="accident_records"
                recordId={viewingRecord.id}
                existingWhys={((viewingRecord as Record<string, unknown>).five_whys as []) || []}
                existingCategory={
                  ((viewingRecord as Record<string, unknown>).root_cause_category as string) || ''
                }
                existingSummary={((viewingRecord as Record<string, unknown>).root_cause as string) || ''}
              />

              {/* Corrective actions tracker */}
              <CorrectiveActionsPanel sourceType="accident" sourceId={viewingRecord.id} />

              {/* Supervisor sign-off (remote) */}
              <div>
                <Eyebrow className="mb-2">Supervisor sign-off</Eyebrow>
                {remoteSupervisor?.signed_signature ? (
                  <div className="p-3 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06]">
                    <p className="text-[11.5px] text-emerald-400 mb-2">
                      Signed by {remoteSupervisor.signed_name || 'supervisor'}
                      {remoteSupervisor.signed_at ? ` · ${new Date(remoteSupervisor.signed_at).toLocaleDateString('en-GB')}` : ''}
                    </p>
                    <img src={remoteSupervisor.signed_signature} alt="Supervisor signature" className="h-12 opacity-80" />
                  </div>
                ) : (
                  <SecondaryButton fullWidth disabled={signLoading} onClick={() => requestSupervisorSignOff(viewingRecord)}>
                    {signLoading ? 'Preparing link…' : 'Request supervisor sign-off'}
                  </SecondaryButton>
                )}
              </div>

              {/* Meta */}
              <div className="p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="flex justify-between text-[11px] text-white/55">
                  <span>Recorded by: {viewingRecord.recorded_by}</span>
                  {viewingRecord.reported_to && <span>Reported to: {viewingRecord.reported_to}</span>}
                </div>
                {isArchived(viewingRecord) && (
                  <p className="text-[10px] text-amber-400 mt-2 text-center">
                    Retained for statutory period (3 years). Do not delete.
                  </p>
                )}
              </div>
            </SheetShell>
          )}
        </SheetContent>
      </Sheet>

      {/* Mark as reported bottom sheet */}
      <Sheet open={showMarkReported} onOpenChange={setShowMarkReported}>
        <SheetContent side="bottom" className="rounded-t-2xl p-0 border-white/[0.06]">
          <SheetShell
            eyebrow="RIDDOR"
            title="Mark RIDDOR as reported"
            description="Record the HSE reference once you have submitted F2508."
            footer={
              <PrimaryButton
                fullWidth
                disabled={!riddorRef.trim() || markReported.isPending}
                onClick={handleMarkReported}
              >
                {markReported.isPending ? 'Saving…' : 'Confirm reported'}
              </PrimaryButton>
            }
          >
            <Field label="HSE reference number">
              <input
                value={riddorRef}
                onChange={(e) => setRiddorRef(e.target.value)}
                placeholder="e.g. 2024/12345"
                className={inputClass}
              />
            </Field>
            <Field label="Date reported">
              <input
                type="date"
                value={riddorReportedDate}
                onChange={(e) => setRiddorReportedDate(e.target.value)}
                className={cn(inputClass, '[color-scheme:dark]')}
              />
            </Field>
          </SheetShell>
        </SheetContent>
      </Sheet>

      {/* RIDDOR guide sheet */}
      <Sheet open={showRIDDORGuide} onOpenChange={setShowRIDDORGuide}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06]">
          <SheetShell
            eyebrow="RIDDOR 2013"
            title="RIDDOR reporting guide"
            description="Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013"
          >
            <FormCard eyebrow="When must you report?">
              <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/5">
                <Eyebrow className="text-red-400">Immediately (by phone)</Eyebrow>
                <p className="text-[12px] text-white/80 mt-1">Deaths and specified injuries — call 0345 300 9923</p>
              </div>
              <div className="p-3 rounded-xl border border-orange-500/20 bg-orange-500/5">
                <Eyebrow className="text-orange-400">Within 15 days</Eyebrow>
                <p className="text-[12px] text-white/80 mt-1">Over-7-day incapacitation injuries</p>
              </div>
              <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5">
                <Eyebrow className="text-amber-400">Within 10 days</Eyebrow>
                <p className="text-[12px] text-white/80 mt-1">Dangerous occurrences and occupational diseases</p>
              </div>
            </FormCard>

            <FormCard eyebrow="Specified injuries">
              {RIDDOR_SPECIFIED_INJURIES.map((injury, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 text-[11px]" aria-hidden>
                    •
                  </span>
                  <span className="text-[12px] text-white/80">{injury}</span>
                </div>
              ))}
            </FormCard>

            <FormCard eyebrow="Dangerous occurrences (electrical)">
              {RIDDOR_DANGEROUS_OCCURRENCES.map((occurrence, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5 text-[11px]" aria-hidden>
                    •
                  </span>
                  <span className="text-[12px] text-white/80">{occurrence}</span>
                </div>
              ))}
            </FormCard>

            <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 space-y-1">
              <Eyebrow className="text-blue-400">How to report</Eyebrow>
              <p className="text-[12px] text-white/80">
                <strong>Online:</strong> www.hse.gov.uk/riddor
              </p>
              <p className="text-[12px] text-white/80">
                <strong>Phone (fatal/specified):</strong> 0345 300 9923
              </p>
              <p className="text-[12px] text-white/80">
                <strong>Record keeping:</strong> Keep records for minimum 3 years
              </p>
              <p className="text-[12px] text-white/80">
                <strong>Who reports:</strong> The responsible person (employer, self-employed person, or person
                in control of premises)
              </p>
            </div>
          </SheetShell>
        </SheetContent>
      </Sheet>

      {viewingRecord && (
        <SafetyDocumentShare
          open={showShare}
          onClose={() => setShowShare(false)}
          pdfType="accident"
          recordId={viewingRecord.id}
          documentTitle={`Accident Record — ${viewingRecord.injured_name || 'Unknown'}`}
        />
      )}

      <RemoteSignShareSheet
        open={showSignShare}
        onOpenChange={setShowSignShare}
        url={signUrl}
        roleLabel="supervisor sign-off"
      />
    </SafetyModuleShell>
  );
}

export default DigitalAccidentBook;
