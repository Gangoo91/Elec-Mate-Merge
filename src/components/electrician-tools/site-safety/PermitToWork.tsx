import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import { supabase } from '@/integrations/supabase/client';
import { useLocalDraft } from '@/hooks/useLocalDraft';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { useShowMore } from '@/hooks/useShowMore';
import { useRequestApproval } from '@/hooks/useSupervisorApproval';
import {
  usePermits,
  useCreatePermit,
  useClosePermit,
  useCancelPermit,
  useExtendPermit,
  useAmendPermit,
  usePermitRevisions,
  usePermitExpiryCheck,
} from '@/hooks/usePermitsToWork';
import { useFireWatchRecords } from '@/hooks/useFireWatchRecords';
import { useSafeIsolationRecords } from '@/hooks/useSafeIsolationRecords';
import { useRAMSDocuments } from '@/hooks/useRAMSDocuments';
import type { Json } from '@/integrations/supabase/types';

import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

import {
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  LoadingState,
  Eyebrow,
  TextAction,
  Field,
  FormCard,
  SheetShell,
  ListCard,
  ListRow,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  toneAccent,
  type Tone,
} from '@/components/college/primitives';

import { SafetyModuleShell } from './common/SafetyModuleShell';
import { SignatureField } from './common/SignatureField';
import { LocationAutoFill } from './common/LocationAutoFill';
import { SafetyPhotoCapture } from './common/SafetyPhotoCapture';
import { SmartTextarea } from './common/SmartTextarea';
import { DraftRecoveryBanner } from './common/DraftRecoveryBanner';
import { DraftSaveIndicator } from './common/DraftSaveIndicator';
import { AuditTimeline } from './common/AuditTimeline';
import { ApprovalInfoCard } from './common/ApprovalBadge';
import { ApprovalSheet } from './common/ApprovalSheet';
import { CorrectiveActionsPanel } from './common/CorrectiveActionsPanel';
import { SaveAsTemplateSheet } from './common/SaveAsTemplateSheet';
import { LoadTemplateSheet } from './common/LoadTemplateSheet';
import { SafetyDocumentShare } from './common/SafetyDocumentShare';
import { LoadMoreButton } from './common/LoadMoreButton';
import { ReadinessGate } from './common/ReadinessGate';
import { CloseOutSheet } from './common/CloseOutSheet';
import { JobLinkField } from './common/JobLinkField';
import { useSparkProjects } from '@/hooks/useSparkProjects';

// ─── Types ───

type PermitType =
  | 'hot-work'
  | 'confined-space'
  | 'electrical-isolation'
  | 'working-at-height'
  | 'excavation';
type PermitStatus = 'active' | 'expired' | 'cancelled' | 'closed';

interface PermitHazard {
  id: string;
  description: string;
  controls: string;
}

interface Permit {
  id: string;
  type: PermitType;
  title: string;
  location: string;
  description: string;
  issuer_name: string;
  issuer_signature: string;
  receiver_name: string;
  receiver_signature: string;
  hazards: PermitHazard[];
  precautions: string[];
  ppe_required: string[];
  start_time: string;
  end_time: string;
  duration_hours: number;
  status: PermitStatus;
  emergency_procedures: string;
  additional_notes: string;
  photos: string[];
  auto_fire_watch: boolean;
  version: number;
  linked_rams_id: string | null;
  linked_rams_title: string | null;
  acceptance_status: string;
  job_id: string | null;
  requires_approval: boolean;
  approval_status: 'not_required' | 'pending' | 'approved' | 'rejected';
  approved_by: string | null;
  approved_at: string | null;
  approval_comments: string | null;
  approval_signature: string | null;
  created_at: string;
  closed_at?: string;
  closed_by?: string;
}

// ─── Constants ───

const PERMIT_TYPES: {
  id: PermitType;
  label: string;
  description: string;
  defaultHazards: string[];
  defaultPPE: string[];
  defaultPrecautions: string[];
}[] = [
  {
    id: 'hot-work',
    label: 'Hot Work',
    description: 'Welding, cutting, brazing, soldering or any work producing sparks or flame',
    defaultHazards: ['Fire risk from sparks and hot metal', 'Fume inhalation', 'Burns from hot surfaces', 'Ignition of nearby combustibles'],
    defaultPPE: ['Welding helmet/goggles', 'Heat-resistant gloves', 'Fire-retardant overalls', 'Steel toe-cap boots'],
    defaultPrecautions: [
      'Remove combustible materials within 10m radius — BS 9999',
      'Fire extinguisher (CO₂ or dry powder) within 2m — RRO 2005',
      'Fire watch for minimum 60 minutes after completion — HSG168',
      'Check area above, below and behind work area for fire spread risk',
      'Smoke/heat detectors isolated with permit from fire alarm panel — BS 5839-1',
    ],
  },
  {
    id: 'confined-space',
    label: 'Confined Space',
    description: 'Entry into enclosed spaces with limited access/egress or poor ventilation',
    defaultHazards: ['Oxygen depletion', 'Toxic atmosphere', 'Engulfment', 'Limited access/egress'],
    defaultPPE: ['Gas monitor (4-head)', 'Safety harness & lanyard', 'Breathing apparatus', 'Communication equipment'],
    defaultPrecautions: [
      'Continuous atmospheric monitoring (O₂, LEL, CO, H₂S) — Confined Spaces Regs 1997',
      'Written rescue plan in place before entry — ACOP L101',
      'Trained standby person at entry point with communication equipment',
      'Forced ventilation if natural ventilation inadequate',
      'Entry permit time-limited; re-test atmosphere if work paused >30 min',
    ],
  },
  {
    id: 'electrical-isolation',
    label: 'Electrical Isolation',
    description: 'Isolation of electrical systems for safe working — lock-off/tag-out',
    defaultHazards: ['Electric shock', 'Arc flash', 'Residual stored energy', 'Incorrect identification of circuits'],
    defaultPPE: ['Insulated gloves (Class 0 min.)', 'Safety glasses/face shield', 'Arc-flash rated clothing', 'Insulated tools'],
    defaultPrecautions: [
      'Prove dead at point of work using 3-point test — GS38',
      'Lock-off with personal padlock and unique key — BS 7671 Reg 537.2',
      'Danger tags applied at all points of isolation — EAWR 1989 Reg 12',
      'Voltage indicator proved on known live source before AND after test — GS38',
      'All sources of supply identified including back-feeds, UPS, generators',
    ],
  },
  {
    id: 'working-at-height',
    label: 'Working at Height',
    description: 'Work where a person could fall a distance liable to cause personal injury',
    defaultHazards: ['Falls from height', 'Falling objects', 'Scaffold/platform collapse', 'Adverse weather conditions'],
    defaultPPE: ['Safety harness & lanyard', 'Hard hat with chin strap', 'Non-slip footwear', 'Tool tethers'],
    defaultPrecautions: [
      'Guard rails (min 950mm), mid-rails, and toe boards in place — WAH Regs 2005 Sch 2',
      'Check weather conditions — cease work in winds >40 mph or heavy rain',
      'Exclusion zone below marked with barriers and signage — CDM 2015',
      'Rescue plan in place and communicated to all operatives — WAH Regs 2005 Reg 4',
      'All access equipment inspected before use — INDG401',
    ],
  },
  {
    id: 'excavation',
    label: 'Excavation',
    description: 'Digging, trenching or ground disturbance work',
    defaultHazards: ['Trench collapse', 'Underground services strike', 'Falling into excavation', 'Flooding'],
    defaultPPE: ['Hard hat', 'Hi-vis vest', 'Steel toe-cap boots', 'Gloves'],
    defaultPrecautions: [
      'CAT & Genny scan completed and results recorded — HSG47',
      'Up-to-date service drawings obtained from all utility providers — PAS 128',
      'Trench support/battering in place for excavations >1.2m — CDM 2015',
      'Barriers, edge protection, and warning signs around excavation — CDM 2015 Reg 22',
      'Hand-dig within 500mm of identified services — HSG47',
    ],
  },
];

const STATUS_LABEL: Record<PermitStatus, string> = {
  active: 'Active',
  expired: 'Expired',
  cancelled: 'Cancelled',
  closed: 'Closed',
};

// ─── Small presentational helpers (monochrome, no icons) ───

const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

// Colour follows one meaningful dimension: status + expiry urgency.
function statusTone(status: PermitStatus, expiring?: boolean): Tone | undefined {
  if (expiring && status === 'active') return 'amber';
  if (status === 'active') return 'green';
  if (status === 'expired') return 'red';
  if (status === 'closed') return 'blue';
  return undefined; // cancelled → neutral
}

const STATUS_PILL: Record<'amber' | 'green' | 'red' | 'blue' | 'neutral', string> = {
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  neutral: 'bg-white/[0.05] text-white/55 border-white/10',
};

function StatusPill({ status, expiring }: { status: PermitStatus; expiring?: boolean }) {
  const tone = statusTone(status, expiring);
  const key = (tone as 'amber' | 'green' | 'red' | 'blue') ?? 'neutral';
  const label = expiring && status === 'active' ? 'Expiring' : STATUS_LABEL[status];
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        STATUS_PILL[key]
      )}
    >
      {label}
    </span>
  );
}

function remainingClasses(endTime: string, now: Date): string {
  const diff = new Date(endTime).getTime() - now.getTime();
  if (diff <= 0) return 'text-red-400';
  if (diff < 3600000) return 'text-amber-400';
  return 'text-white/45';
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-lg text-[11.5px] text-white/75 bg-white/[0.05] border border-white/10">
      {children}
    </span>
  );
}

// Type-aware close-out checklist — confirm the area is safe before closing.
function closeOutItems(type: PermitType): string[] {
  const base = [
    'Work is complete',
    'Work area made safe and left clean',
    'All tools and personnel removed from the area',
  ];
  const extra: Record<PermitType, string[]> = {
    'hot-work': ['Fire watch completed (min. 60 min) and area checked for smouldering'],
    'electrical-isolation': ['Locks-off and danger tags removed; system safely re-energised or handed over'],
    'working-at-height': ['Access equipment removed or made safe; exclusion zone cleared'],
    'confined-space': ['All personnel accounted for and signed out of the space'],
    excavation: ['Excavation made safe — barriers, covers and edge protection in place'],
  };
  return [...base, ...(extra[type] || [])];
}

function remainingLabel(endTime: string, now: Date): string {
  const diff = new Date(endTime).getTime() - now.getTime();
  if (diff <= 0) return 'Expired';
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${h}h ${m}m left`;
}

// ─── Main Component ───

export function PermitToWork({ onBack }: { onBack: () => void }) {
  const { data: dbPermits = [], isLoading: permitsLoading } = usePermits();
  const createPermitMutation = useCreatePermit();
  const closePermitMutation = useClosePermit();
  const cancelPermitMutation = useCancelPermit();
  const extendPermitMutation = useExtendPermit();
  const amendPermit = useAmendPermit();
  usePermitExpiryCheck();
  const requestApproval = useRequestApproval();

  const { data: allFireWatchRecords = [] } = useFireWatchRecords();
  const { data: allIsolationRecords = [] } = useSafeIsolationRecords();
  const { data: ramsDocs = [] } = useRAMSDocuments();

  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();

  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const permits: Permit[] = dbPermits.map((p) => ({
    id: p.id,
    type: p.type,
    title: p.title,
    location: p.location,
    description: p.description || '',
    issuer_name: p.issuer_name,
    issuer_signature: p.issuer_signature || '',
    receiver_name: p.receiver_name,
    receiver_signature: p.receiver_signature || '',
    hazards: Array.isArray(p.hazards) ? (p.hazards as unknown as PermitHazard[]) : [],
    precautions: p.precautions || [],
    ppe_required: p.ppe_required || [],
    start_time: p.start_time,
    end_time: p.end_time,
    duration_hours: p.duration_hours,
    status: p.status,
    emergency_procedures: p.emergency_procedures || '',
    additional_notes: p.additional_notes || '',
    photos: Array.isArray(p.photos) ? (p.photos as unknown as string[]) : [],
    auto_fire_watch: !!p.auto_fire_watch,
    version: p.version ?? 1,
    linked_rams_id: p.linked_rams_id,
    linked_rams_title: p.linked_rams_title,
    acceptance_status: p.acceptance_status || 'accepted',
    job_id: p.job_id ?? null,
    requires_approval: p.requires_approval,
    approval_status: p.approval_status,
    approved_by: p.approved_by,
    approved_at: p.approved_at,
    approval_comments: p.approval_comments,
    approval_signature: p.approval_signature,
    created_at: p.created_at,
    closed_at: p.closed_at || undefined,
    closed_by: p.closed_by || undefined,
  }));

  // View state
  const [showWizard, setShowWizard] = useState(false);
  const [viewingPermit, setViewingPermit] = useState<Permit | null>(null);
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardMode, setWizardMode] = useState<'create' | 'amend'>('create');
  const [amendingId, setAmendingId] = useState<string | null>(null);
  const [amendReason, setAmendReason] = useState('');
  const [filterStatus, setFilterStatus] = useState<PermitStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showExtendSheet, setShowExtendSheet] = useState(false);
  const [showApprovalSheet, setShowApprovalSheet] = useState(false);
  const [extensionHours, setExtensionHours] = useState(2);
  const [showShare, setShowShare] = useState(false);
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [showLoadTemplate, setShowLoadTemplate] = useState(false);
  const [showRamsPicker, setShowRamsPicker] = useState(false);

  // Wizard form state
  const [selectedType, setSelectedType] = useState<PermitType | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    issuer_name: '',
    issuer_signature: '',
    receiver_name: '',
    receiver_signature: '',
    duration_hours: 4,
    emergency_procedures: '',
    additional_notes: '',
  });
  const [hazards, setHazards] = useState<PermitHazard[]>([]);
  const [precautions, setPrecautions] = useState<string[]>([]);
  const [ppeRequired, setPpeRequired] = useState<string[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [autoFireWatch, setAutoFireWatch] = useState(false);
  const [linkedRamsId, setLinkedRamsId] = useState<string | null>(null);
  const [linkedRamsTitle, setLinkedRamsTitle] = useState<string | null>(null);
  const [linkedJobId, setLinkedJobId] = useState<string | null>(null);
  const [linkedJobTitle, setLinkedJobTitle] = useState<string | null>(null);
  const { data: jobs = [] } = useSparkProjects('active');
  const jobTitleFor = (id: string | null) => (id ? jobs.find((j) => j.id === id)?.title ?? null : null);
  // Remote receiver sign-off
  const [receiverRemote, setReceiverRemote] = useState(false);
  const [showShareLink, setShowShareLink] = useState(false);
  const [signLink, setSignLink] = useState('');
  const [linkLoading, setLinkLoading] = useState(false);
  // Close-out sign-off
  const [showCloseOut, setShowCloseOut] = useState(false);
  const [closeOutName, setCloseOutName] = useState('');

  const { data: revisions = [] } = usePermitRevisions(viewingPermit?.id ?? null);

  const relatedFireWatches = useMemo(
    () => (viewingPermit ? allFireWatchRecords.filter((fw) => fw.permit_id === viewingPermit.id) : []),
    [allFireWatchRecords, viewingPermit]
  );
  const relatedIsolations = useMemo(
    () => (viewingPermit ? allIsolationRecords.filter((ir) => ir.permit_id === viewingPermit.id) : []),
    [allIsolationRecords, viewingPermit]
  );

  // ─── Templates ───
  const getTemplateData = () => ({
    type: selectedType,
    title: formData.title,
    description: formData.description,
    emergency_procedures: formData.emergency_procedures,
    duration_hours: formData.duration_hours,
    hazards,
    precautions,
    ppeRequired,
  });

  const handleLoadTemplate = (data: Record<string, unknown>) => {
    if (data.type) setSelectedType(data.type as PermitType);
    setFormData((prev) => ({
      ...prev,
      ...(data.title ? { title: data.title as string } : {}),
      ...(data.description ? { description: data.description as string } : {}),
      ...(data.emergency_procedures ? { emergency_procedures: data.emergency_procedures as string } : {}),
      ...(data.duration_hours ? { duration_hours: data.duration_hours as number } : {}),
    }));
    if (data.hazards) setHazards(data.hazards as PermitHazard[]);
    if (data.precautions) setPrecautions(data.precautions as string[]);
    if (data.ppeRequired) setPpeRequired(data.ppeRequired as string[]);
    if (data.type) setWizardStep(1);
  };

  // ─── Draft persistence (create only) ───
  const permitDraftData = useMemo(
    () => ({ formData, selectedType, hazards, precautions, ppeRequired, autoFireWatch, linkedRamsId, linkedRamsTitle, wizardStep }),
    [formData, selectedType, hazards, precautions, ppeRequired, autoFireWatch, linkedRamsId, linkedRamsTitle, wizardStep]
  );

  const {
    status: draftStatus,
    recoveredData: recoveredDraft,
    clearDraft,
    dismissRecovery: dismissDraft,
  } = useLocalDraft({ key: 'permit-to-work', data: permitDraftData, enabled: showWizard && wizardMode === 'create' && wizardStep > 0 });

  const restoreDraft = () => {
    if (!recoveredDraft) return;
    if (recoveredDraft.formData) setFormData(recoveredDraft.formData);
    if (recoveredDraft.selectedType) setSelectedType(recoveredDraft.selectedType);
    if (recoveredDraft.hazards) setHazards(recoveredDraft.hazards);
    if (recoveredDraft.precautions) setPrecautions(recoveredDraft.precautions);
    if (recoveredDraft.ppeRequired) setPpeRequired(recoveredDraft.ppeRequired);
    if (typeof recoveredDraft.autoFireWatch === 'boolean') setAutoFireWatch(recoveredDraft.autoFireWatch);
    if (recoveredDraft.linkedRamsId !== undefined) setLinkedRamsId(recoveredDraft.linkedRamsId);
    if (recoveredDraft.linkedRamsTitle !== undefined) setLinkedRamsTitle(recoveredDraft.linkedRamsTitle);
    if (recoveredDraft.wizardStep !== undefined) setWizardStep(recoveredDraft.wizardStep);
    dismissDraft();
  };

  const typeConfig = selectedType ? PERMIT_TYPES.find((t) => t.id === selectedType) : null;

  const resetWizard = () => {
    setWizardStep(0);
    setWizardMode('create');
    setAmendingId(null);
    setAmendReason('');
    setSelectedType(null);
    setFormData({
      title: '',
      location: '',
      description: '',
      issuer_name: '',
      issuer_signature: '',
      receiver_name: '',
      receiver_signature: '',
      duration_hours: 4,
      emergency_procedures: '',
      additional_notes: '',
    });
    setHazards([]);
    setPrecautions([]);
    setPpeRequired([]);
    setPhotoUrls([]);
    setAutoFireWatch(false);
    setLinkedRamsId(null);
    setLinkedRamsTitle(null);
    setLinkedJobId(null);
    setLinkedJobTitle(null);
    setReceiverRemote(false);
  };

  const selectPermitType = (type: PermitType) => {
    const config = PERMIT_TYPES.find((t) => t.id === type)!;
    setSelectedType(type);
    setFormData((prev) => ({ ...prev, title: `${config.label} Permit`, description: config.description }));
    setHazards(config.defaultHazards.map((h, i) => ({ id: `h-${i}`, description: h, controls: '' })));
    setPrecautions([...config.defaultPrecautions]);
    setPpeRequired([...config.defaultPPE]);
    setAutoFireWatch(type === 'hot-work');
    setWizardStep(1);
  };

  const handleDuplicate = (permit: Permit) => {
    resetWizard();
    setSelectedType(permit.type);
    setFormData({
      title: permit.title,
      location: permit.location,
      description: permit.description,
      issuer_name: '',
      issuer_signature: '',
      receiver_name: '',
      receiver_signature: '',
      duration_hours: permit.duration_hours,
      emergency_procedures: permit.emergency_procedures,
      additional_notes: permit.additional_notes,
    });
    setHazards(permit.hazards.map((h) => ({ ...h })));
    setPrecautions([...permit.precautions]);
    setPpeRequired([...permit.ppe_required]);
    setAutoFireWatch(permit.auto_fire_watch);
    setLinkedRamsId(permit.linked_rams_id);
    setLinkedRamsTitle(permit.linked_rams_title);
    setLinkedJobId(permit.job_id);
    setLinkedJobTitle(jobTitleFor(permit.job_id));
    setWizardStep(1);
    setViewingPermit(null);
    setShowWizard(true);
    toast.success('Permit duplicated — complete the details to issue');
  };

  // Amend → reopen wizard prefilled, signatures cleared (must be re-signed).
  const startAmend = (permit: Permit) => {
    setWizardMode('amend');
    setAmendingId(permit.id);
    setAmendReason('');
    setSelectedType(permit.type);
    setFormData({
      title: permit.title,
      location: permit.location,
      description: permit.description,
      issuer_name: permit.issuer_name,
      issuer_signature: '',
      receiver_name: permit.receiver_name,
      receiver_signature: '',
      duration_hours: permit.duration_hours,
      emergency_procedures: permit.emergency_procedures,
      additional_notes: permit.additional_notes,
    });
    setHazards(permit.hazards.map((h) => ({ ...h })));
    setPrecautions([...permit.precautions]);
    setPpeRequired([...permit.ppe_required]);
    setAutoFireWatch(permit.auto_fire_watch);
    setLinkedRamsId(permit.linked_rams_id);
    setLinkedRamsTitle(permit.linked_rams_title);
    setLinkedJobId(permit.job_id);
    setLinkedJobTitle(jobTitleFor(permit.job_id));
    setReceiverRemote(false); // amendments are re-signed in person
    setWizardStep(1);
    setViewingPermit(null);
    setShowWizard(true);
  };

  // Tokenised remote sign-off link (mirrors the briefing pattern).
  const getOrCreateSignToken = async (permitId: string): Promise<string | null> => {
    const { data: existing } = await supabase
      .from('permit_signing_tokens')
      .select('public_token')
      .eq('permit_id', permitId)
      .maybeSingle();
    if (existing?.public_token) return existing.public_token as string;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;
    const token = crypto.randomUUID();
    const { error } = await supabase
      .from('permit_signing_tokens')
      .insert({ permit_id: permitId, user_id: user.id, public_token: token });
    if (error) return null;
    return token;
  };

  const openSignLink = async (permitId: string) => {
    setLinkLoading(true);
    try {
      const token = await getOrCreateSignToken(permitId);
      if (!token) {
        toast.error('Could not create signing link');
        return;
      }
      setSignLink(`${window.location.origin}/permit-sign/${token}`);
      setShowShareLink(true);
    } finally {
      setLinkLoading(false);
    }
  };

  const copySignLink = async () => {
    try {
      await navigator.clipboard.writeText(signLink);
      toast.success('Link copied');
    } catch {
      toast.error('Copy failed');
    }
  };

  const shareSignLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Permit to Work — sign-off', url: signLink });
      } catch { /* cancelled */ }
    } else {
      copySignLink();
    }
  };

  const issuePermit = async () => {
    if (!selectedType) return;
    const start = new Date();
    const end = new Date(start.getTime() + formData.duration_hours * 3600000);
    try {
      const created = await createPermitMutation.mutateAsync({
        type: selectedType,
        title: formData.title,
        location: formData.location,
        description: formData.description,
        issuer_name: formData.issuer_name,
        issuer_signature: formData.issuer_signature,
        receiver_name: formData.receiver_name,
        receiver_signature: formData.receiver_signature,
        hazards: hazards as unknown as Json,
        precautions,
        ppe_required: ppeRequired,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        duration_hours: formData.duration_hours,
        status: 'active',
        emergency_procedures: formData.emergency_procedures,
        additional_notes: formData.additional_notes,
        photos: photoUrls as unknown as Json,
        auto_fire_watch: autoFireWatch,
        linked_rams_id: linkedRamsId,
        linked_rams_title: linkedRamsTitle,
        job_id: linkedJobId,
        acceptance_status: receiverRemote ? 'awaiting_receiver' : 'accepted',
      });
      clearDraft();
      setShowWizard(false);
      const remote = receiverRemote;
      resetWizard();
      // Remote receiver → immediately surface the signing link to share.
      if (remote && created?.id) await openSignLink(created.id);
    } catch { /* toast handled by hook */ }
  };

  const submitAmendment = async () => {
    if (!amendingId) return;
    try {
      await amendPermit.mutateAsync({
        id: amendingId,
        changeReason: amendReason,
        fields: {
          title: formData.title,
          location: formData.location,
          description: formData.description,
          duration_hours: formData.duration_hours,
          emergency_procedures: formData.emergency_procedures,
          additional_notes: formData.additional_notes,
          issuer_name: formData.issuer_name,
          issuer_signature: formData.issuer_signature,
          receiver_name: formData.receiver_name,
          receiver_signature: formData.receiver_signature,
          hazards: hazards as unknown as Json,
          precautions,
          ppe_required: ppeRequired,
          auto_fire_watch: autoFireWatch,
          linked_rams_id: linkedRamsId,
          linked_rams_title: linkedRamsTitle,
          job_id: linkedJobId,
        },
      });
      setShowWizard(false);
      resetWizard();
    } catch { /* toast handled by hook */ }
  };

  const closePermit = async (id: string, closedBy?: string) => {
    try {
      await closePermitMutation.mutateAsync({ id, closedBy });
      setShowCloseOut(false);
      setViewingPermit(null);
    } catch { /* handled */ }
  };
  const cancelPermit = async (id: string) => {
    try {
      await cancelPermitMutation.mutateAsync(id);
      setViewingPermit(null);
    } catch { /* handled */ }
  };
  const extendPermit = async (id: string) => {
    try {
      await extendPermitMutation.mutateAsync({ id, additionalHours: extensionHours });
      setShowExtendSheet(false);
      setExtensionHours(2);
    } catch { /* handled */ }
  };

  // ─── Derived ───
  const filteredPermits = permits.filter((p) => {
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (
      searchQuery &&
      !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  // Active first (soonest-expiring first), then expired, then the rest by recency.
  const rank = (p: Permit) => (p.status === 'active' ? 0 : p.status === 'expired' ? 1 : 2);
  const sortedPermits = [...filteredPermits].sort((a, b) => {
    if (rank(a) !== rank(b)) return rank(a) - rank(b);
    if (a.status === 'active' && b.status === 'active') {
      return new Date(a.end_time).getTime() - new Date(b.end_time).getTime();
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const { visible: visiblePermits, hasMore, remaining, loadMore } = useShowMore(sortedPermits);

  const activeCount = permits.filter((p) => p.status === 'active').length;
  const expiringCount = permits.filter(
    (p) => p.status === 'active' && new Date(p.end_time).getTime() - now.getTime() < 3600000
  ).length;
  const pendingApprovalCount = permits.filter((p) => p.approval_status === 'pending').length;

  const statusCounts: Record<PermitStatus, number> = {
    active: permits.filter((p) => p.status === 'active').length,
    expired: permits.filter((p) => p.status === 'expired').length,
    closed: permits.filter((p) => p.status === 'closed').length,
    cancelled: permits.filter((p) => p.status === 'cancelled').length,
  };

  // ─── Pre-issue readiness (Delta 1) ───
  const hazardsHaveControls = hazards.length > 0 && hazards.every((h) => h.controls.trim().length > 0);
  const differentPeople =
    !!formData.issuer_name &&
    !!formData.receiver_name &&
    formData.issuer_name.trim().toLowerCase() !== formData.receiver_name.trim().toLowerCase();

  const receiverReadiness: { ok: boolean; label: string }[] = receiverRemote
    ? [{ ok: true, label: 'Receiver will sign on their own device' }]
    : [
        { ok: !!formData.receiver_name && !!formData.receiver_signature, label: 'Receiver name and signature' },
        { ok: differentPeople, label: 'Issuer and receiver are different people' },
      ];

  const readiness: { ok: boolean; label: string }[] = [
    { ok: !!formData.title && !!formData.location, label: 'Permit title and location' },
    { ok: hazards.length > 0, label: 'At least one hazard identified' },
    { ok: hazardsHaveControls, label: 'Every hazard has a control measure' },
    { ok: precautions.length > 0, label: 'Required precautions listed' },
    { ok: !!formData.emergency_procedures.trim(), label: 'Emergency procedures recorded' },
    { ok: !!formData.issuer_name && !!formData.issuer_signature, label: 'Issuer name and signature' },
    ...receiverReadiness,
  ];
  const allReady = readiness.every((r) => r.ok);
  const amendReady = allReady && (wizardMode === 'create' || amendReason.trim().length > 0);

  const canProceed = () => {
    switch (wizardStep) {
      case 1:
        return !!formData.title && !!formData.location;
      case 2:
        return hazardsHaveControls && precautions.length > 0 && !!formData.emergency_procedures.trim();
      case 3:
        return amendReady;
      default:
        return true;
    }
  };

  const isSaving = createPermitMutation.isPending || amendPermit.isPending;

  // ─── Wizard steps ───
  const renderWizardStep = () => {
    switch (wizardStep) {
      case 0:
        return (
          <div className="space-y-4">
            <TextAction onClick={() => setShowLoadTemplate(true)}>Load from a saved template →</TextAction>
            <ListCard>
              {PERMIT_TYPES.map((type, i) => (
                <ListRow
                  key={type.id}
                  onClick={() => selectPermitType(type.id)}
                  lead={
                    <span className="text-[11px] font-medium tabular-nums text-elec-yellow/80 w-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  }
                  title={type.label}
                  subtitle={type.description}
                  trailing={<span aria-hidden className="text-elec-yellow/80">→</span>}
                />
              ))}
            </ListCard>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <Field label="Permit title" required>
              <input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={inputClass}
                placeholder="e.g. Hot Work — DB Board Replacement"
              />
            </Field>
            <LocationAutoFill
              value={formData.location}
              onChange={(val) => setFormData({ ...formData, location: val })}
              placeholder="e.g. Plant Room, Building A, Level 2"
              label="Location"
            />
            <Field label="Description of work">
              <SmartTextarea
                value={formData.description}
                onChange={(val) => setFormData({ ...formData, description: val })}
                className="touch-manipulation text-[13px] min-h-[100px] bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl"
                placeholder="Describe the work to be carried out…"
              />
            </Field>
            <Field label="Duration">
              <Select
                value={String(formData.duration_hours)}
                onValueChange={(v) => setFormData({ ...formData, duration_hours: Number(v) })}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {[1, 2, 3, 4, 6, 8, 10, 12, 24].map((h) => (
                    <SelectItem key={h} value={String(h)}>
                      {h} {h === 1 ? 'hour' : 'hours'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Controlling RAMS / risk assessment" hint="The assessment this permit sits on top of.">
              {linkedRamsId ? (
                <div className="flex items-center justify-between gap-2 px-3 h-11 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.08]">
                  <span className="text-[13px] text-white truncate">{linkedRamsTitle}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setLinkedRamsId(null);
                      setLinkedRamsTitle(null);
                    }}
                    className="text-[11.5px] text-white/50 hover:text-white shrink-0 touch-manipulation"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowRamsPicker(true)}
                  className={cn(inputClass, 'flex items-center text-white/45')}
                >
                  Link a RAMS…
                </button>
              )}
              {!linkedRamsId && ramsDocs.length > 0 && (
                <p className="text-[11px] text-amber-400/90 mt-1.5">
                  Recommended — a permit should sit on top of a risk assessment. You have {ramsDocs.length} saved RAMS to link.
                </p>
              )}
            </Field>
            <JobLinkField
              jobId={linkedJobId}
              jobTitle={linkedJobTitle}
              onSelect={(id, title) => {
                setLinkedJobId(id);
                setLinkedJobTitle(title);
              }}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            <div className="space-y-2.5">
              <Eyebrow>Hazards &amp; controls</Eyebrow>
              {hazards.map((hazard, index) => (
                <div key={hazard.id} className="p-3 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)] space-y-2">
                  <p className="text-[13px] text-white font-medium">{hazard.description}</p>
                  <input
                    value={hazard.controls}
                    onChange={(e) => {
                      const updated = [...hazards];
                      updated[index] = { ...hazard, controls: e.target.value };
                      setHazards(updated);
                    }}
                    className={inputClass}
                    placeholder="Control measures (required)…"
                  />
                </div>
              ))}
              {!hazardsHaveControls && (
                <p className="text-[11px] text-amber-400/90">Add a control measure to every hazard before issuing.</p>
              )}
            </div>

            <div className="space-y-2">
              <Eyebrow>Required precautions</Eyebrow>
              <ListCard>
                {precautions.map((p, i) => (
                  <div key={i} className="px-5 py-3 text-[12.5px] text-white/90 leading-relaxed">
                    {p}
                  </div>
                ))}
              </ListCard>
            </div>

            <div className="space-y-2">
              <Eyebrow>Required PPE</Eyebrow>
              <div className="flex flex-wrap gap-1.5">
                {ppeRequired.map((item, i) => (
                  <Chip key={i}>{item}</Chip>
                ))}
              </div>
            </div>

            <Field label="Emergency procedures" required>
              <SmartTextarea
                value={formData.emergency_procedures}
                onChange={(val) => setFormData({ ...formData, emergency_procedures: val })}
                className="touch-manipulation text-[13px] min-h-[80px] bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl"
                placeholder="Emergency procedures specific to this permit…"
              />
            </Field>

            {selectedType === 'hot-work' && (
              <FormCard>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] font-medium text-white">Schedule fire watch</span>
                  <Switch checked={autoFireWatch} onCheckedChange={setAutoFireWatch} />
                </div>
                <p className="text-[11.5px] text-white/55">
                  Minimum 60 minutes after completion — HSG168. We'll flag this permit so you can log the fire
                  watch when work finishes.
                </p>
              </FormCard>
            )}

            <div>
              <Eyebrow className="mb-2">Site photos</Eyebrow>
              <SafetyPhotoCapture photos={photoUrls} onPhotosChange={setPhotoUrls} label="" />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            {wizardMode === 'amend' && (
              <FormCard eyebrow="Reason for change">
                <input
                  value={amendReason}
                  onChange={(e) => setAmendReason(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Extended scope to second board"
                />
                <p className="text-[11.5px] text-white/55">
                  Signatures have been cleared and must be re-captured. Saving creates a new version; any
                  required approval resets to pending.
                </p>
              </FormCard>
            )}

            <ReadinessGate items={readiness} />

            <FormCard eyebrow="Permit issuer">
              <Field label="Full name" required>
                <input
                  value={formData.issuer_name}
                  onChange={(e) => setFormData({ ...formData, issuer_name: e.target.value })}
                  className={inputClass}
                  placeholder="Issuer's full name"
                />
              </Field>
              <SignatureField
                label="Issuer signature"
                value={formData.issuer_signature}
                onChange={(sig) => setFormData({ ...formData, issuer_signature: sig })}
              />
            </FormCard>

            <FormCard eyebrow="Permit receiver">
              {/* In-person vs remote sign-off */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl">
                {[
                  { v: false, label: 'Signs now' },
                  { v: true, label: 'Signs on their device' },
                ].map((opt) => (
                  <button
                    key={String(opt.v)}
                    type="button"
                    onClick={() => setReceiverRemote(opt.v)}
                    className={cn(
                      'h-9 rounded-lg text-[12.5px] font-medium touch-manipulation transition-colors',
                      receiverRemote === opt.v ? 'bg-elec-yellow text-black' : 'text-white/70 hover:text-white'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <Field label={receiverRemote ? 'Full name (optional)' : 'Full name'} required={!receiverRemote}>
                <input
                  value={formData.receiver_name}
                  onChange={(e) => setFormData({ ...formData, receiver_name: e.target.value })}
                  className={inputClass}
                  placeholder="Receiver's full name"
                />
                {!receiverRemote && formData.issuer_name && formData.receiver_name && !differentPeople && (
                  <p className="text-[11px] text-red-400 mt-1.5">Issuer and receiver must be different people.</p>
                )}
              </Field>

              {receiverRemote ? (
                <p className="text-[11.5px] text-white/55">
                  A secure signing link is created when you issue the permit. The receiver reviews it and signs on
                  their own phone — you'll see "Awaiting receiver" until they do.
                </p>
              ) : (
                <SignatureField
                  label="Receiver signature"
                  value={formData.receiver_signature}
                  onChange={(sig) => setFormData({ ...formData, receiver_signature: sig })}
                />
              )}
            </FormCard>

            <Field label="Additional notes">
              <SmartTextarea
                value={formData.additional_notes}
                onChange={(val) => setFormData({ ...formData, additional_notes: val })}
                className="touch-manipulation text-[13px] min-h-[80px] bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl"
                placeholder="Any additional notes or conditions…"
              />
            </Field>
          </div>
        );

      default:
        return null;
    }
  };

  // ─── Render ───
  return (
    <SafetyModuleShell
      onBack={onBack}
      moduleName="Permit to Work"
      trailing={activeCount > 0 ? <StatusPill status="active" /> : undefined}
      hero={
        <PageHero
          eyebrow="Permit to Work"
          title="Issue, track and close work permits"
          description="Hot work, confined space, isolation, height and excavation — issued with the right controls, sign-offs, version control and live expiry."
          tone="amber"
          actions={
            <PrimaryButton
              onClick={() => {
                resetWizard();
                setShowWizard(true);
              }}
            >
              Issue permit
            </PrimaryButton>
          }
        />
      }
      stats={
        permits.length > 0 ? (
          <StatStrip
            stats={[
              { value: activeCount, label: 'Active', accent: true, onClick: () => setFilterStatus('active') },
              { value: expiringCount, label: 'Expiring', sub: 'within 1 hour', onClick: () => setFilterStatus('active') },
              { value: pendingApprovalCount, label: 'Approvals', sub: 'awaiting' },
              { value: permits.length, label: 'Total', onClick: () => setFilterStatus('all') },
            ]}
          />
        ) : undefined
      }
      filter={
        permits.length > 0 ? (
          <FilterBar
            tabs={[
              { value: 'all', label: 'All', count: permits.length },
              { value: 'active', label: 'Active', count: statusCounts.active },
              { value: 'expired', label: 'Expired', count: statusCounts.expired },
              { value: 'closed', label: 'Closed', count: statusCounts.closed },
              { value: 'cancelled', label: 'Cancelled', count: statusCounts.cancelled },
            ]}
            activeTab={filterStatus}
            onTabChange={(v) => setFilterStatus(v as PermitStatus | 'all')}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search permits…"
          />
        ) : undefined
      }
    >
      {permitsLoading ? (
        <LoadingState />
      ) : permits.length === 0 ? (
        <EmptyState
          title="No permits issued yet"
          description="Issue your first permit to work — pick a type and we'll pre-fill the standard hazards, controls and PPE."
          action="Issue permit"
          onAction={() => {
            resetWizard();
            setShowWizard(true);
          }}
        />
      ) : filteredPermits.length === 0 ? (
        <EmptyState title="No permits match your filter" description="Try a different status tab or clear your search." />
      ) : (
        <div className="space-y-3">
          <ListCard>
            {visiblePermits.map((permit) => {
              const typeLabel = PERMIT_TYPES.find((t) => t.id === permit.type)?.label || permit.type;
              const isActive = permit.status === 'active';
              const expiring = isActive && new Date(permit.end_time).getTime() - now.getTime() < 3600000;
              return (
                <ListRow
                  key={permit.id}
                  onClick={() => setViewingPermit(permit)}
                  accent={statusTone(permit.status, expiring)}
                  title={permit.title}
                  subtitle={`${typeLabel} · ${permit.location}`}
                  trailing={
                    <div className="flex flex-col items-end gap-1">
                      <StatusPill status={permit.status} expiring={expiring} />
                      {isActive && permit.acceptance_status === 'awaiting_receiver' ? (
                        <span className="text-[11px] text-amber-400">Awaiting receiver</span>
                      ) : (
                        <span className={cn('text-[11px] tabular-nums', isActive ? remainingClasses(permit.end_time, now) : 'text-white/45')}>
                          {isActive ? remainingLabel(permit.end_time, now) : fmtDate(permit.start_time || permit.created_at)}
                        </span>
                      )}
                    </div>
                  }
                />
              );
            })}
          </ListCard>
          {hasMore && <LoadMoreButton onLoadMore={loadMore} remaining={remaining} />}
        </div>
      )}

      {/* ─── Create / amend wizard ─── */}
      <Sheet open={showWizard} onOpenChange={setShowWizard}>
        <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
          <SheetShell
            eyebrow={
              wizardStep === 0
                ? wizardMode === 'amend'
                  ? 'Amend permit'
                  : 'New permit'
                : `${wizardMode === 'amend' ? 'Amend' : 'New permit'} · Step ${wizardStep} of 3${typeConfig ? ` · ${typeConfig.label}` : ''}`
            }
            title={
              wizardStep === 0
                ? 'Select permit type'
                : wizardStep === 1
                  ? 'Job details'
                  : wizardStep === 2
                    ? 'Hazards & controls'
                    : 'Authorisation & sign-off'
            }
            description={wizardMode === 'create' ? <DraftSaveIndicator status={draftStatus} /> : undefined}
            footer={
              wizardStep > 0 ? (
                <>
                  <SecondaryButton onClick={() => setWizardStep((s) => s - 1)}>Back</SecondaryButton>
                  {wizardStep === 3 && wizardMode === 'create' && (
                    <SecondaryButton onClick={() => setShowSaveTemplate(true)}>Save template</SecondaryButton>
                  )}
                  <PrimaryButton
                    fullWidth
                    disabled={!canProceed() || isSaving}
                    onClick={() => {
                      if (wizardStep < 3) setWizardStep((s) => s + 1);
                      else if (wizardMode === 'amend') submitAmendment();
                      else issuePermit();
                    }}
                  >
                    {isSaving
                      ? 'Saving…'
                      : wizardStep === 3
                        ? wizardMode === 'amend'
                          ? 'Save new version'
                          : 'Issue permit'
                        : 'Continue'}
                  </PrimaryButton>
                </>
              ) : undefined
            }
          >
            {wizardStep > 0 && (
              <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-elec-yellow"
                  initial={{ width: 0 }}
                  animate={{ width: `${(wizardStep / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
            <AnimatePresence>
              {recoveredDraft && wizardMode === 'create' && (
                <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />
              )}
            </AnimatePresence>
            {renderWizardStep()}
          </SheetShell>
        </SheetContent>
      </Sheet>

      {/* ─── Detail ─── */}
      <Sheet open={!!viewingPermit} onOpenChange={() => setViewingPermit(null)}>
        <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
          {viewingPermit &&
            (() => {
              const typeConf = PERMIT_TYPES.find((t) => t.id === viewingPermit.type)!;
              const isLive = viewingPermit.status === 'active' || viewingPermit.status === 'expired';
              const detailExpiring =
                viewingPermit.status === 'active' &&
                new Date(viewingPermit.end_time).getTime() - now.getTime() < 3600000;
              const detailTone = statusTone(viewingPermit.status, detailExpiring) ?? 'blue';
              const needsFireWatchPrompt =
                viewingPermit.type === 'hot-work' && viewingPermit.auto_fire_watch && relatedFireWatches.length === 0;
              return (
                <SheetShell
                  eyebrow={`${typeConf.label}${viewingPermit.version > 1 ? ` · Version ${viewingPermit.version}` : ''}`}
                  title={viewingPermit.title}
                  description={
                    <span className="inline-flex items-center gap-2">
                      <StatusPill status={viewingPermit.status} expiring={detailExpiring} />
                      {viewingPermit.status === 'active' && (
                        <span className={cn('text-[12px] tabular-nums', remainingClasses(viewingPermit.end_time, now))}>
                          {remainingLabel(viewingPermit.end_time, now)}
                        </span>
                      )}
                    </span>
                  }
                  footer={
                    <>
                      <PrimaryButton
                        fullWidth
                        disabled={isExporting && exportingId === viewingPermit.id}
                        onClick={() => exportPDF('permit', viewingPermit.id)}
                      >
                        {isExporting && exportingId === viewingPermit.id ? 'Exporting…' : 'Export PDF'}
                      </PrimaryButton>
                      <SecondaryButton onClick={() => setShowShare(true)}>Share</SecondaryButton>
                    </>
                  }
                >
                  {/* Status accent line — bleeds to the sheet edges */}
                  <div className={cn('-mx-5 -mt-5 mb-1 h-0.5 bg-gradient-to-r', toneAccent[detailTone])} />

                  {needsFireWatchPrompt && (
                    <div className="p-3 rounded-xl bg-orange-500/[0.08] border border-orange-500/20">
                      <p className="text-[12px] text-white/85">
                        Fire watch required — minimum 60 minutes after completion (HSG168). Log it in the Fire
                        Watch tool when work finishes.
                      </p>
                    </div>
                  )}

                  {/* Awaiting remote receiver acceptance */}
                  {viewingPermit.acceptance_status === 'awaiting_receiver' && (
                    <div className="p-3 rounded-xl bg-amber-500/[0.08] border border-amber-500/20 space-y-2.5">
                      <p className="text-[12px] text-white/85">
                        Awaiting receiver acceptance — the receiver hasn't signed yet. Work shouldn't start until
                        they accept.
                      </p>
                      <SecondaryButton
                        fullWidth
                        disabled={linkLoading}
                        onClick={() => openSignLink(viewingPermit.id)}
                      >
                        {linkLoading ? 'Preparing…' : 'Send signing link'}
                      </SecondaryButton>
                    </div>
                  )}

                  {/* Lifecycle actions */}
                  {isLive && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <SecondaryButton fullWidth onClick={() => startAmend(viewingPermit)}>
                          Amend
                        </SecondaryButton>
                        <SecondaryButton fullWidth onClick={() => setShowExtendSheet(true)}>
                          {viewingPermit.status === 'active' ? 'Extend' : 'Re-activate'}
                        </SecondaryButton>
                      </div>
                      <div className="flex gap-2">
                        <PrimaryButton
                          fullWidth
                          onClick={() => {
                            setCloseOutName(viewingPermit.issuer_name || '');
                            setShowCloseOut(true);
                          }}
                        >
                          Close permit
                        </PrimaryButton>
                        <DestructiveButton onClick={() => cancelPermit(viewingPermit.id)}>Cancel</DestructiveButton>
                      </div>
                    </div>
                  )}

                  {/* Details */}
                  <div className="space-y-1.5 text-[13px]">
                    <div className="text-white/90">{viewingPermit.location}</div>
                    <div className="text-white/65">
                      {new Date(viewingPermit.start_time).toLocaleString('en-GB')} —{' '}
                      {new Date(viewingPermit.end_time).toLocaleString('en-GB')}
                    </div>
                    {viewingPermit.description && (
                      <p className="text-white/80 leading-relaxed pt-1">{viewingPermit.description}</p>
                    )}
                  </div>

                  {/* Controlling RAMS */}
                  {viewingPermit.linked_rams_title && (
                    <div>
                      <Eyebrow className="mb-1.5">Controlling RAMS</Eyebrow>
                      <div className="px-3 py-2.5 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06] text-[13px] text-white">
                        {viewingPermit.linked_rams_title}
                      </div>
                    </div>
                  )}

                  {/* Linked project (job pack) */}
                  {viewingPermit.job_id && (
                    <div>
                      <Eyebrow className="mb-1.5">Project</Eyebrow>
                      <div className="px-3 py-2.5 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06] text-[13px] text-white">
                        {jobTitleFor(viewingPermit.job_id) || 'Linked to a project'}
                      </div>
                    </div>
                  )}

                  {/* Hazards */}
                  <div>
                    <Eyebrow className="mb-2">Hazards &amp; controls</Eyebrow>
                    <ListCard>
                      {viewingPermit.hazards.map((h) => (
                        <div key={h.id} className="px-5 py-3">
                          <p className="text-[13px] text-white font-medium">{h.description}</p>
                          {h.controls && <p className="text-[12px] text-white/60 mt-0.5">{h.controls}</p>}
                        </div>
                      ))}
                    </ListCard>
                  </div>

                  {/* PPE */}
                  <div>
                    <Eyebrow className="mb-2">Required PPE</Eyebrow>
                    <div className="flex flex-wrap gap-1.5">
                      {viewingPermit.ppe_required.map((item, i) => (
                        <Chip key={i}>{item}</Chip>
                      ))}
                    </div>
                  </div>

                  {/* Precautions */}
                  <div>
                    <Eyebrow className="mb-2">Precautions</Eyebrow>
                    <ListCard>
                      {viewingPermit.precautions.map((p, i) => (
                        <div key={i} className="px-5 py-3 text-[12.5px] text-white/90 leading-relaxed">
                          {p}
                        </div>
                      ))}
                    </ListCard>
                  </div>

                  {/* Signatures */}
                  <div className="grid grid-cols-2 gap-3">
                    {(['issuer', 'receiver'] as const).map((role) => {
                      const name = role === 'issuer' ? viewingPermit.issuer_name : viewingPermit.receiver_name;
                      const sig = role === 'issuer' ? viewingPermit.issuer_signature : viewingPermit.receiver_signature;
                      return (
                        <div key={role} className="p-3 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
                          <p className="text-[10px] uppercase tracking-[0.18em] text-white/50 mb-1">{role}</p>
                          <p className="text-[13px] text-white font-medium">{name}</p>
                          {sig && <img src={sig} alt={`${role} signature`} className="h-12 mt-1 opacity-80" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Version history */}
                  {(viewingPermit.version > 1 || revisions.length > 0) && (
                    <div>
                      <Eyebrow className="mb-2">Version history</Eyebrow>
                      <ListCard>
                        <ListRow
                          title={`Version ${viewingPermit.version} — current`}
                          subtitle={`Issued ${fmtDate(viewingPermit.created_at)}`}
                          trailing={<StatusPill status={viewingPermit.status} />}
                        />
                        {revisions.map((rev) => (
                          <ListRow
                            key={rev.id}
                            title={`Version ${rev.version}`}
                            subtitle={rev.change_reason || 'Superseded'}
                            trailing={<span className="text-[11px] text-white/45 tabular-nums">{fmtDate(rev.created_at)}</span>}
                          />
                        ))}
                      </ListCard>
                    </div>
                  )}

                  {/* Corrective actions */}
                  <CorrectiveActionsPanel sourceType="permit" sourceId={viewingPermit.id} />

                  {/* Related records */}
                  {(relatedFireWatches.length > 0 || relatedIsolations.length > 0) && (
                    <div>
                      <Eyebrow className="mb-2">Related records</Eyebrow>
                      <ListCard>
                        {relatedFireWatches.map((fw) => (
                          <ListRow
                            key={fw.id}
                            title="Fire Watch"
                            subtitle={`${fw.duration_minutes} min${fw.location ? ` · ${fw.location}` : ''} · ${new Date(fw.start_time).toLocaleDateString('en-GB')}`}
                            trailing={<StatusPill status={fw.status === 'completed' ? 'closed' : 'active'} />}
                          />
                        ))}
                        {relatedIsolations.map((ir) => (
                          <ListRow
                            key={ir.id}
                            title="Safe Isolation"
                            subtitle={`${ir.circuit_description}${ir.distribution_board ? ` · ${ir.distribution_board}` : ''} · ${new Date(ir.created_at).toLocaleDateString('en-GB')}`}
                            trailing={
                              <span className="text-[11px] text-white/55 capitalize">{String(ir.status).replace('_', ' ')}</span>
                            }
                          />
                        ))}
                      </ListCard>
                    </div>
                  )}

                  {/* Audit trail */}
                  <AuditTimeline recordType="permit" recordId={viewingPermit.id} />

                  {/* Approval */}
                  {viewingPermit.approval_status !== 'not_required' && (
                    <ApprovalInfoCard
                      status={viewingPermit.approval_status}
                      approvedBy={viewingPermit.approved_by}
                      approvedAt={viewingPermit.approved_at}
                      comments={viewingPermit.approval_comments}
                      approvalSignature={viewingPermit.approval_signature}
                    />
                  )}
                  {viewingPermit.status === 'active' && viewingPermit.approval_status === 'not_required' && (
                    <SecondaryButton
                      fullWidth
                      disabled={requestApproval.isPending}
                      onClick={() => requestApproval.mutate({ table: 'permits_to_work', recordId: viewingPermit.id })}
                    >
                      Request supervisor approval
                    </SecondaryButton>
                  )}
                  {viewingPermit.approval_status === 'pending' && (
                    <SecondaryButton fullWidth onClick={() => setShowApprovalSheet(true)}>
                      Review and approve
                    </SecondaryButton>
                  )}
                </SheetShell>
              );
            })()}
        </SheetContent>
      </Sheet>

      {/* ─── RAMS picker ─── */}
      <Sheet open={showRamsPicker} onOpenChange={setShowRamsPicker}>
        <SheetContent side="bottom" className="h-[70vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
          <SheetShell eyebrow="Controlling document" title="Link a RAMS / risk assessment">
            {ramsDocs.length === 0 ? (
              <EmptyState
                title="No saved RAMS yet"
                description="Create a RAMS first, then link it to this permit so they travel together."
              />
            ) : (
              <ListCard>
                {ramsDocs.map((r) => (
                  <ListRow
                    key={r.id}
                    onClick={() => {
                      setLinkedRamsId(r.id);
                      setLinkedRamsTitle(r.project_name);
                      setShowRamsPicker(false);
                    }}
                    title={r.project_name}
                    subtitle={`${r.location || ''}${r.location ? ' · ' : ''}${fmtDate(r.date)}`}
                    trailing={
                      linkedRamsId === r.id ? (
                        <span className="text-[11px] text-elec-yellow">Linked</span>
                      ) : (
                        <span aria-hidden className="text-elec-yellow/70">→</span>
                      )
                    }
                  />
                ))}
              </ListCard>
            )}
          </SheetShell>
        </SheetContent>
      </Sheet>

      {/* ─── Extend ─── */}
      <Sheet open={showExtendSheet} onOpenChange={setShowExtendSheet}>
        <SheetContent side="bottom" className="h-auto p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
          <div className="bg-[hsl(0_0%_8%)] p-5 space-y-4">
            <div className="flex justify-center pt-1">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>
            <div>
              <Eyebrow>Extend permit</Eyebrow>
              <h3 className="mt-1 text-[18px] font-semibold text-white">Add more time</h3>
              <p className="mt-1 text-[12.5px] text-white/60">Conditions must remain safe before extending.</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 4, 8].map((hours) => (
                <button
                  key={hours}
                  onClick={() => setExtensionHours(hours)}
                  className={cn(
                    'h-12 rounded-xl border text-center font-semibold touch-manipulation active:scale-[0.97] transition-all',
                    extensionHours === hours
                      ? 'bg-elec-yellow/15 border-elec-yellow/40 text-elec-yellow'
                      : 'border-white/10 bg-white/[0.04] text-white'
                  )}
                >
                  {hours}h
                </button>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <p className="text-[11.5px] text-white/75">
                Confirm that site conditions remain safe and all controls are still in place before extending.
              </p>
            </div>
            <div className="flex gap-2 pb-[env(safe-area-inset-bottom)]">
              <PrimaryButton
                fullWidth
                disabled={extendPermitMutation.isPending}
                onClick={() => viewingPermit && extendPermit(viewingPermit.id)}
              >
                {extendPermitMutation.isPending ? 'Extending…' : `Extend by ${extensionHours}h`}
              </PrimaryButton>
              <SecondaryButton onClick={() => setShowExtendSheet(false)}>Cancel</SecondaryButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ─── Receiver signing link ─── */}
      <Sheet open={showShareLink} onOpenChange={setShowShareLink}>
        <SheetContent side="bottom" className="h-auto p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
          <div className="bg-[hsl(0_0%_8%)] p-5 space-y-4">
            <div className="flex justify-center pt-1">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>
            <div>
              <Eyebrow>Receiver sign-off</Eyebrow>
              <h3 className="mt-1 text-[18px] font-semibold text-white">Send for signing</h3>
              <p className="mt-1 text-[12.5px] text-white/60">
                The receiver opens this on their phone, reviews the permit and signs. The link expires in 7 days.
              </p>
            </div>
            <div className="px-3 py-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.08] text-[12px] text-white/70 break-all">
              {signLink}
            </div>
            <div className="flex gap-2 pb-[env(safe-area-inset-bottom)]">
              <PrimaryButton fullWidth onClick={shareSignLink}>
                Share link
              </PrimaryButton>
              <SecondaryButton onClick={copySignLink}>Copy</SecondaryButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ─── Close-out sign-off ─── */}
      {viewingPermit && (
        <CloseOutSheet
          open={showCloseOut}
          onOpenChange={setShowCloseOut}
          items={closeOutItems(viewingPermit.type)}
          closerName={closeOutName}
          onCloserNameChange={setCloseOutName}
          isPending={closePermitMutation.isPending}
          confirmLabel="Close permit"
          onConfirm={() => closePermit(viewingPermit.id, closeOutName.trim())}
        />
      )}

      {/* Supervisor approval */}
      {viewingPermit && (
        <ApprovalSheet
          open={showApprovalSheet}
          onOpenChange={setShowApprovalSheet}
          table="permits_to_work"
          recordId={viewingPermit.id}
          recordTitle={viewingPermit.title}
        />
      )}

      {/* Templates */}
      <SaveAsTemplateSheet
        open={showSaveTemplate}
        onOpenChange={setShowSaveTemplate}
        moduleType="permit"
        getTemplateData={getTemplateData}
      />
      <LoadTemplateSheet open={showLoadTemplate} onOpenChange={setShowLoadTemplate} moduleType="permit" onLoad={handleLoadTemplate} />

      {/* Share */}
      {viewingPermit && (
        <SafetyDocumentShare
          open={showShare}
          onClose={() => setShowShare(false)}
          pdfType="permit"
          recordId={viewingPermit.id}
          documentTitle={`Permit to Work — ${viewingPermit.title}`}
        />
      )}
    </SafetyModuleShell>
  );
}

export default PermitToWork;
