import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalDraft } from '@/hooks/useLocalDraft';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { AuditTimeline } from './common/AuditTimeline';
import { ApprovalBadge, ApprovalInfoCard } from './common/ApprovalBadge';
import { ApprovalSheet } from './common/ApprovalSheet';
import { useRequestApproval } from '@/hooks/useSupervisorApproval';
import { LocationAutoFill } from './common/LocationAutoFill';
import { SafetyPhotoCapture } from './common/SafetyPhotoCapture';
import { DraftRecoveryBanner } from './common/DraftRecoveryBanner';
import { DraftSaveIndicator } from './common/DraftSaveIndicator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  usePermits,
  useCreatePermit,
  useClosePermit,
  useCancelPermit,
  useExtendPermit,
  usePermitExpiryCheck,
} from '@/hooks/usePermitsToWork';
import { useFireWatchRecords } from '@/hooks/useFireWatchRecords';
import { useSafeIsolationRecords } from '@/hooks/useSafeIsolationRecords';
import type { Json } from '@/integrations/supabase/types';
import {
  ArrowLeft,
  Plus,
  Flame,
  Lock,
  Zap,
  ArrowUpFromLine,
  Shovel,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  FileText,
  User,
  MapPin,
  Calendar,
  Timer,
  Pencil,
  Trash2,
  Search,
  Filter,
  FileDown,
  Loader2,
  Copy,
} from 'lucide-react';
import { LoadMoreButton } from './common/LoadMoreButton';
import { useShowMore } from '@/hooks/useShowMore';

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
  icon: React.ElementType;
  colour: string;
  gradient: string;
  description: string;
  defaultHazards: string[];
  defaultPPE: string[];
  defaultPrecautions: string[];
}[] = [
  {
    id: 'hot-work',
    label: 'Hot Work',
    icon: Flame,
    colour: 'text-orange-400',
    gradient: 'from-orange-400 to-red-500',
    description: 'Welding, cutting, brazing, soldering or any work producing sparks or flame',
    defaultHazards: [
      'Fire risk from sparks and hot metal',
      'Fume inhalation',
      'Burns from hot surfaces',
      'Ignition of nearby combustibles',
    ],
    defaultPPE: [
      'Welding helmet/goggles',
      'Heat-resistant gloves',
      'Fire-retardant overalls',
      'Steel toe-cap boots',
    ],
    defaultPrecautions: [
      'Remove combustible materials within 10m',
      'Fire extinguisher within 2m',
      'Fire watch for 60 minutes after completion',
      'Check area above, below and behind work area',
    ],
  },
  {
    id: 'confined-space',
    label: 'Confined Space',
    icon: Lock,
    colour: 'text-purple-400',
    gradient: 'from-purple-400 to-purple-600',
    description: 'Entry into enclosed spaces with limited access/egress or poor ventilation',
    defaultHazards: ['Oxygen depletion', 'Toxic atmosphere', 'Engulfment', 'Limited access/egress'],
    defaultPPE: [
      'Gas monitor (4-head)',
      'Safety harness & lanyard',
      'Breathing apparatus',
      'Communication equipment',
    ],
    defaultPrecautions: [
      'Continuous gas monitoring',
      'Rescue plan in place',
      'Standby person at entry point',
      'Forced ventilation if required',
    ],
  },
  {
    id: 'electrical-isolation',
    label: 'Electrical Isolation',
    icon: Zap,
    colour: 'text-yellow-400',
    gradient: 'from-yellow-400 to-amber-500',
    description: 'Isolation of electrical systems for safe working — lock-off/tag-out',
    defaultHazards: [
      'Electric shock',
      'Arc flash',
      'Residual stored energy',
      'Incorrect identification of circuits',
    ],
    defaultPPE: [
      'Insulated gloves (Class 0 min.)',
      'Safety glasses/face shield',
      'Arc-flash rated clothing',
      'Insulated tools',
    ],
    defaultPrecautions: [
      'Prove dead at point of work',
      'Lock-off with personal padlock',
      'Danger tags applied',
      'Voltage indicator proved before and after use',
    ],
  },
  {
    id: 'working-at-height',
    label: 'Working at Height',
    icon: ArrowUpFromLine,
    colour: 'text-blue-400',
    gradient: 'from-blue-400 to-blue-600',
    description: 'Work where a person could fall a distance liable to cause personal injury',
    defaultHazards: [
      'Falls from height',
      'Falling objects',
      'Scaffold/platform collapse',
      'Adverse weather conditions',
    ],
    defaultPPE: [
      'Safety harness & lanyard',
      'Hard hat with chin strap',
      'Non-slip footwear',
      'Tool tethers',
    ],
    defaultPrecautions: [
      'Guard rails and toe boards in place',
      'Check weather conditions',
      'Exclusion zone below',
      'Rescue plan in place',
    ],
  },
  {
    id: 'excavation',
    label: 'Excavation',
    icon: Shovel,
    colour: 'text-amber-400',
    gradient: 'from-amber-400 to-amber-600',
    description: 'Digging, trenching or ground disturbance work',
    defaultHazards: [
      'Trench collapse',
      'Underground services strike',
      'Falling into excavation',
      'Flooding',
    ],
    defaultPPE: ['Hard hat', 'Hi-vis vest', 'Steel toe-cap boots', 'Gloves'],
    defaultPrecautions: [
      'CAT & Genny scan completed',
      'Service drawings reviewed',
      'Trench support/battering in place',
      'Barriers and warning signs around excavation',
    ],
  },
];

const STATUS_CONFIG: Record<
  PermitStatus,
  { label: string; colour: string; bg: string; icon: React.ElementType }
> = {
  active: { label: 'Active', colour: 'text-green-400', bg: 'bg-green-500/15', icon: CheckCircle2 },
  expired: { label: 'Expired', colour: 'text-red-400', bg: 'bg-red-500/15', icon: Clock },
  cancelled: { label: 'Cancelled', colour: 'text-white', bg: 'bg-gray-500/15', icon: XCircle },
  closed: { label: 'Closed', colour: 'text-blue-400', bg: 'bg-blue-500/15', icon: CheckCircle2 },
};

// ─── Signature Pad ───

function SignaturePadInline({ onSave, label }: { onSave: (data: string) => void; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  // Resize canvas to match container width for responsive rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const { width } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = 120 * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = '120px';
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const getCoords = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasContent(true);
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => {
    setIsDrawing(false);
    if (hasContent && canvasRef.current) {
      onSave(canvasRef.current.toDataURL());
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const dpr = window.devicePixelRatio || 1;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
    setHasContent(false);
  };

  return (
    <div className="space-y-2">
      <Label className="text-white text-sm">{label}</Label>
      <div
        ref={containerRef}
        className="relative border border-white/20 rounded-xl overflow-hidden bg-white/[0.03]"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-[120px] touch-none"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
        {!hasContent && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white text-sm">Sign here</span>
          </div>
        )}
      </div>
      {hasContent && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clear}
          className="text-white text-xs h-11 touch-manipulation"
        >
          Clear signature
        </Button>
      )}
    </div>
  );
}

// ─── Time Remaining ───

function TimeRemaining({ endTime }: { endTime: string }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const end = new Date(endTime);
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) {
    return (
      <span className="text-red-400 text-xs font-semibold flex items-center gap-1">
        <Clock className="h-3 w-3" /> EXPIRED
      </span>
    );
  }

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const isUrgent = diff < 3600000; // less than 1 hour

  return (
    <span
      className={`text-xs font-semibold flex items-center gap-1 ${isUrgent ? 'text-amber-400' : 'text-green-400'}`}
    >
      <Timer className="h-3 w-3" />
      {hours}h {minutes}m remaining
    </span>
  );
}

// ─── Main Component ───

export function PermitToWork({ onBack }: { onBack: () => void }) {
  // ─── DB hooks ───
  const { data: dbPermits = [], isLoading: permitsLoading } = usePermits();
  const createPermitMutation = useCreatePermit();
  const closePermitMutation = useClosePermit();
  const cancelPermitMutation = useCancelPermit();
  const extendPermitMutation = useExtendPermit();
  usePermitExpiryCheck();
  const [showExtendSheet, setShowExtendSheet] = useState(false);
  const [showApprovalSheet, setShowApprovalSheet] = useState(false);
  const [extensionHours, setExtensionHours] = useState(2);
  const requestApproval = useRequestApproval();

  // Related records for inter-tool linking
  const { data: allFireWatchRecords = [] } = useFireWatchRecords();
  const { data: allIsolationRecords = [] } = useSafeIsolationRecords();

  // Map DB records to local Permit shape
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

  const [showWizard, setShowWizard] = useState(false);
  const [viewingPermit, setViewingPermit] = useState<Permit | null>(null);
  const [wizardStep, setWizardStep] = useState(0);
  const [filterStatus, setFilterStatus] = useState<PermitStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Related records filtered for the currently-viewed permit
  const relatedFireWatches = useMemo(
    () =>
      viewingPermit ? allFireWatchRecords.filter((fw) => fw.permit_id === viewingPermit.id) : [],
    [allFireWatchRecords, viewingPermit]
  );
  const relatedIsolations = useMemo(
    () =>
      viewingPermit ? allIsolationRecords.filter((ir) => ir.permit_id === viewingPermit.id) : [],
    [allIsolationRecords, viewingPermit]
  );

  // Wizard state
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

  // ─── Draft persistence ───
  const permitDraftData = useMemo(
    () => ({
      formData,
      selectedType,
      hazards,
      precautions,
      ppeRequired,
      wizardStep,
    }),
    [formData, selectedType, hazards, precautions, ppeRequired, wizardStep]
  );

  const {
    status: draftStatus,
    recoveredData: recoveredDraft,
    clearDraft,
    dismissRecovery: dismissDraft,
  } = useLocalDraft({
    key: 'permit-to-work',
    data: permitDraftData,
    enabled: showWizard && wizardStep > 0,
  });

  const restoreDraft = () => {
    if (!recoveredDraft) return;
    if (recoveredDraft.formData) setFormData(recoveredDraft.formData);
    if (recoveredDraft.selectedType) setSelectedType(recoveredDraft.selectedType);
    if (recoveredDraft.hazards) setHazards(recoveredDraft.hazards);
    if (recoveredDraft.precautions) setPrecautions(recoveredDraft.precautions);
    if (recoveredDraft.ppeRequired) setPpeRequired(recoveredDraft.ppeRequired);
    if (recoveredDraft.wizardStep !== undefined) setWizardStep(recoveredDraft.wizardStep);
    dismissDraft();
  };

  const typeConfig = selectedType ? PERMIT_TYPES.find((t) => t.id === selectedType) : null;

  const resetWizard = () => {
    setWizardStep(0);
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
  };

  const handleDuplicate = (permit: Permit) => {
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
    setWizardStep(1);
    setShowWizard(true);
    toast.success('Permit duplicated — complete the details to issue');
  };

  const selectPermitType = (type: PermitType) => {
    const config = PERMIT_TYPES.find((t) => t.id === type)!;
    setSelectedType(type);
    setFormData((prev) => ({
      ...prev,
      title: `${config.label} Permit`,
      description: config.description,
    }));
    setHazards(
      config.defaultHazards.map((h, i) => ({
        id: `h-${i}`,
        description: h,
        controls: '',
      }))
    );
    setPrecautions([...config.defaultPrecautions]);
    setPpeRequired([...config.defaultPPE]);
    setWizardStep(1);
  };

  const issuePermit = async () => {
    if (!selectedType) return;

    const now = new Date();
    const end = new Date(now.getTime() + formData.duration_hours * 3600000);

    try {
      await createPermitMutation.mutateAsync({
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
        start_time: now.toISOString(),
        end_time: end.toISOString(),
        duration_hours: formData.duration_hours,
        status: 'active',
        emergency_procedures: formData.emergency_procedures,
        additional_notes: formData.additional_notes,
        photos: photoUrls as unknown as Json,
      });
      clearDraft();
      setShowWizard(false);
      resetWizard();
    } catch {
      // Error toast handled by the hook
    }
  };

  const closePermit = async (id: string) => {
    try {
      await closePermitMutation.mutateAsync({ id });
      setViewingPermit(null);
    } catch {
      // error toast handled by hook
    }
  };

  const extendPermit = async (id: string) => {
    try {
      await extendPermitMutation.mutateAsync({ id, additionalHours: extensionHours });
      setShowExtendSheet(false);
      setExtensionHours(2);
    } catch {
      // error toast handled by hook
    }
  };

  const cancelPermit = async (id: string) => {
    try {
      await cancelPermitMutation.mutateAsync(id);
      setViewingPermit(null);
    } catch {
      // error toast handled by hook
    }
  };

  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();

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

  const {
    visible: visiblePermits,
    hasMore: hasMorePermits,
    remaining: remainingPermits,
    loadMore: loadMorePermits,
  } = useShowMore(filteredPermits);

  const activeCount = permits.filter((p) => p.status === 'active').length;

  // ─── Wizard Content ───

  const renderWizardStep = () => {
    switch (wizardStep) {
      case 0:
        return (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white px-1">Select Permit Type</h3>
            {PERMIT_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <motion.button
                  key={type.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectPermitType(type.id)}
                  className="w-full text-left rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] p-4 touch-manipulation"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${type.gradient}`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[15px] font-bold text-white">{type.label}</h4>
                      <p className="text-xs text-white line-clamp-1">{type.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Job Details</h3>
            <div className="space-y-3">
              <div>
                <Label className="text-white text-sm">Permit Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  placeholder="e.g. Hot Work — DB Board Replacement"
                />
              </div>
              <LocationAutoFill
                value={formData.location}
                onChange={(val) => setFormData({ ...formData, location: val })}
                placeholder="e.g. Plant Room, Building A, Level 2"
                label="Location"
              />
              <div>
                <Label className="text-white text-sm">Description of Work</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="touch-manipulation text-base min-h-[100px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 mt-1"
                  placeholder="Describe the work to be carried out..."
                />
              </div>
              <div>
                <Label className="text-white text-sm">Duration (hours)</Label>
                <Select
                  value={String(formData.duration_hours)}
                  onValueChange={(v) => setFormData({ ...formData, duration_hours: Number(v) })}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                    {[1, 2, 3, 4, 6, 8, 10, 12, 24].map((h) => (
                      <SelectItem key={h} value={String(h)}>
                        {h} {h === 1 ? 'hour' : 'hours'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Hazards & Controls</h3>
            <div className="space-y-3">
              {hazards.map((hazard, index) => (
                <div
                  key={hazard.id}
                  className="p-3 rounded-xl border border-white/10 bg-white/[0.03] space-y-2"
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">{hazard.description}</p>
                      <Input
                        value={hazard.controls}
                        onChange={(e) => {
                          const updated = [...hazards];
                          updated[index] = { ...hazard, controls: e.target.value };
                          setHazards(updated);
                        }}
                        className="h-11 text-sm touch-manipulation border-white/20 focus:border-yellow-500 focus:ring-yellow-500 mt-2"
                        placeholder="Control measures..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="text-sm font-bold text-white mt-4">Required Precautions</h4>
            <div className="space-y-2">
              {precautions.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-white/10 bg-white/[0.03]"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm text-white">{p}</span>
                </div>
              ))}
            </div>

            <h4 className="text-sm font-bold text-white mt-4">Required PPE</h4>
            <div className="flex flex-wrap gap-2">
              {ppeRequired.map((item, i) => (
                <Badge key={i} className="bg-cyan-500/15 text-cyan-300 border-cyan-500/20 text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  {item}
                </Badge>
              ))}
            </div>

            <div className="mt-4">
              <Label className="text-white text-sm">Emergency Procedures</Label>
              <Textarea
                value={formData.emergency_procedures}
                onChange={(e) => setFormData({ ...formData, emergency_procedures: e.target.value })}
                className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 mt-1"
                placeholder="Emergency procedures specific to this permit..."
              />
            </div>

            {/* Site Photos */}
            <div className="mt-4">
              <SafetyPhotoCapture
                photos={photoUrls}
                onPhotosChange={setPhotoUrls}
                label="Site Photos"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Authorisation & Signatures</h3>

            <div className="space-y-4">
              <div className="p-3 rounded-xl border border-orange-500/20 bg-orange-500/5">
                <h4 className="text-sm font-bold text-orange-300 mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Permit Issuer
                </h4>
                <div className="space-y-3">
                  <div>
                    <Label className="text-white text-sm">Full Name</Label>
                    <Input
                      value={formData.issuer_name}
                      onChange={(e) => setFormData({ ...formData, issuer_name: e.target.value })}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                      placeholder="Issuer's full name"
                    />
                  </div>
                  <SignaturePadInline
                    label="Issuer Signature"
                    onSave={(sig) => setFormData({ ...formData, issuer_signature: sig })}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-500/5">
                <h4 className="text-sm font-bold text-blue-300 mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Permit Receiver
                </h4>
                <div className="space-y-3">
                  <div>
                    <Label className="text-white text-sm">Full Name</Label>
                    <Input
                      value={formData.receiver_name}
                      onChange={(e) => setFormData({ ...formData, receiver_name: e.target.value })}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                      placeholder="Receiver's full name"
                    />
                    {formData.issuer_name &&
                      formData.receiver_name &&
                      formData.issuer_name.trim().toLowerCase() ===
                        formData.receiver_name.trim().toLowerCase() && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-400 rounded-full" />
                          Issuer and receiver must be different people
                        </p>
                      )}
                  </div>
                  <SignaturePadInline
                    label="Receiver Signature"
                    onSave={(sig) => setFormData({ ...formData, receiver_signature: sig })}
                  />
                </div>
              </div>

              <div>
                <Label className="text-white text-sm">Additional Notes</Label>
                <Textarea
                  value={formData.additional_notes}
                  onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                  className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 mt-1"
                  placeholder="Any additional notes or conditions..."
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (wizardStep) {
      case 1:
        return formData.title && formData.location;
      case 2:
        return hazards.length > 0 && precautions.length > 0;
      case 3:
        return (
          formData.issuer_name &&
          formData.receiver_name &&
          formData.issuer_signature &&
          formData.receiver_signature &&
          formData.issuer_name.trim().toLowerCase() !== formData.receiver_name.trim().toLowerCase()
        );
      default:
        return true;
    }
  };

  // ─── Render ───

  return (
    <div className="bg-background min-h-screen animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Site Safety</span>
          </button>
          {activeCount > 0 && (
            <Badge className="bg-green-500/15 text-green-400 border-green-500/20">
              {activeCount} Active
            </Badge>
          )}
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <FileText className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Permit to Work</h1>
            <p className="text-sm text-white">Issue, manage and close work permits</p>
          </div>
        </div>

        {/* New Permit Button */}
        <Button
          onClick={() => {
            resetWizard();
            setShowWizard(true);
          }}
          className="w-full h-12 bg-elec-yellow text-black font-bold rounded-xl touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-5 w-5 mr-2" />
          Issue New Permit
        </Button>

        {/* Filter / Search */}
        {permits.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 pl-9 text-base touch-manipulation border-white/20 focus:border-yellow-500 focus:ring-yellow-500"
                  placeholder="Search permits..."
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {(['all', 'active', 'expired', 'closed', 'cancelled'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 min-h-[36px] rounded-full text-xs font-medium whitespace-nowrap touch-manipulation transition-colors active:scale-[0.97] ${
                    filterStatus === status
                      ? 'bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30'
                      : 'bg-white/[0.05] text-white border border-white/10'
                  }`}
                >
                  {status === 'all' ? 'All' : STATUS_CONFIG[status].label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Permits List */}
        {filteredPermits.length === 0 && permits.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">No Permits Issued</h3>
            <p className="text-sm text-white">Issue your first permit to work to get started</p>
          </div>
        ) : filteredPermits.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-white">No permits match your filter</p>
          </div>
        ) : (
          <div className="space-y-2 pb-20">
            {visiblePermits.map((permit) => {
              const typeConf = PERMIT_TYPES.find((t) => t.id === permit.type)!;
              const statusConf = STATUS_CONFIG[permit.status];
              const StatusIcon = statusConf.icon;
              const TypeIcon = typeConf.icon;

              return (
                <motion.button
                  key={permit.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setViewingPermit(permit)}
                  className="w-full text-left rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] p-4 touch-manipulation"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${typeConf.gradient} flex-shrink-0`}
                    >
                      <TypeIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="text-[15px] font-bold text-white truncate">
                          {permit.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{permit.location}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap mt-1">
                        <Badge
                          className={`${statusConf.bg} ${statusConf.colour} border-none text-[10px]`}
                        >
                          <StatusIcon className="h-2.5 w-2.5 mr-0.5" />
                          {statusConf.label}
                        </Badge>
                        {permit.status === 'active' && <TimeRemaining endTime={permit.end_time} />}
                        <ApprovalBadge status={permit.approval_status} />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicate(permit);
                        }}
                        className="h-11 px-3 text-xs text-white hover:text-white hover:bg-white/10 border border-white/[0.08] touch-manipulation"
                      >
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        Duplicate
                      </Button>
                      <ChevronRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
            {hasMorePermits && (
              <LoadMoreButton onLoadMore={loadMorePermits} remaining={remainingPermits} />
            )}
          </div>
        )}
      </div>

      {/* Wizard Sheet */}
      <Sheet open={showWizard} onOpenChange={setShowWizard}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            {/* Wizard Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {wizardStep > 0 && (
                  <button
                    onClick={() => setWizardStep((s) => s - 1)}
                    className="h-11 w-11 rounded-full bg-white/[0.08] flex items-center justify-center touch-manipulation"
                  >
                    <ArrowLeft className="h-4 w-4 text-white" />
                  </button>
                )}
                <h2 className="text-base font-bold text-white">
                  {wizardStep === 0 ? 'New Permit' : `Step ${wizardStep} of 3`}
                </h2>
                <DraftSaveIndicator status={draftStatus} />
              </div>
              {typeConfig && (
                <Badge className={`${typeConfig.colour} bg-white/10 border-none text-xs`}>
                  {typeConfig.label}
                </Badge>
              )}
            </div>

            {/* Progress bar */}
            {wizardStep > 0 && (
              <div className="h-1 bg-white/[0.05]">
                <motion.div
                  className="h-full bg-elec-yellow"
                  initial={{ width: 0 }}
                  animate={{ width: `${(wizardStep / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              <AnimatePresence>
                {recoveredDraft && (
                  <div className="mb-4">
                    <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />
                  </div>
                )}
              </AnimatePresence>
              {renderWizardStep()}
            </div>

            {/* Footer */}
            {wizardStep > 0 && (
              <div className="px-4 py-3 border-t border-white/10 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                <Button
                  onClick={() => {
                    if (wizardStep < 3) {
                      setWizardStep((s) => s + 1);
                    } else {
                      issuePermit();
                    }
                  }}
                  disabled={!canProceed()}
                  className="w-full h-12 bg-elec-yellow text-black font-bold rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50"
                >
                  {wizardStep === 3 ? 'Issue Permit' : 'Continue'}
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Permit Detail Sheet */}
      <Sheet open={!!viewingPermit} onOpenChange={() => setViewingPermit(null)}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          {viewingPermit &&
            (() => {
              const typeConf = PERMIT_TYPES.find((t) => t.id === viewingPermit.type)!;
              const statusConf = STATUS_CONFIG[viewingPermit.status];
              const TypeIcon = typeConf.icon;

              return (
                <div className="flex flex-col h-full bg-background">
                  <div className="px-4 py-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${typeConf.gradient}`}
                      >
                        <TypeIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-base font-bold text-white">{viewingPermit.title}</h2>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge
                            className={`${statusConf.bg} ${statusConf.colour} border-none text-[10px]`}
                          >
                            {statusConf.label}
                          </Badge>
                          {viewingPermit.status === 'active' && (
                            <TimeRemaining endTime={viewingPermit.end_time} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4">
                    {/* Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-white" />
                        <span className="text-white">{viewingPermit.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-white" />
                        <span className="text-white">
                          {new Date(viewingPermit.start_time).toLocaleString('en-GB')} —{' '}
                          {new Date(viewingPermit.end_time).toLocaleString('en-GB')}
                        </span>
                      </div>
                      <p className="text-sm text-white mt-2">{viewingPermit.description}</p>
                    </div>

                    {/* Hazards */}
                    <div>
                      <h4 className="text-sm font-bold text-white mb-2">Hazards & Controls</h4>
                      <div className="space-y-2">
                        {viewingPermit.hazards.map((h) => (
                          <div
                            key={h.id}
                            className="p-2.5 rounded-lg border border-white/10 bg-white/[0.03]"
                          >
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="h-3.5 w-3.5 text-amber-400 mt-0.5" />
                              <div>
                                <p className="text-sm text-white font-medium">{h.description}</p>
                                {h.controls && (
                                  <p className="text-xs text-white mt-0.5">{h.controls}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* PPE */}
                    <div>
                      <h4 className="text-sm font-bold text-white mb-2">Required PPE</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {viewingPermit.ppe_required.map((item, i) => (
                          <Badge
                            key={i}
                            className="bg-cyan-500/15 text-cyan-300 border-cyan-500/20 text-xs"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Precautions */}
                    <div>
                      <h4 className="text-sm font-bold text-white mb-2">Precautions</h4>
                      <div className="space-y-1.5">
                        {viewingPermit.precautions.map((p, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                            <span className="text-sm text-white">{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Signatures */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                        <p className="text-[10px] text-white mb-1">ISSUER</p>
                        <p className="text-sm text-white font-medium">
                          {viewingPermit.issuer_name}
                        </p>
                        {viewingPermit.issuer_signature && (
                          <img
                            src={viewingPermit.issuer_signature}
                            alt="Issuer signature"
                            className="h-12 mt-1 opacity-80"
                          />
                        )}
                      </div>
                      <div className="p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                        <p className="text-[10px] text-white mb-1">RECEIVER</p>
                        <p className="text-sm text-white font-medium">
                          {viewingPermit.receiver_name}
                        </p>
                        {viewingPermit.receiver_signature && (
                          <img
                            src={viewingPermit.receiver_signature}
                            alt="Receiver signature"
                            className="h-12 mt-1 opacity-80"
                          />
                        )}
                      </div>
                    </div>

                    {/* Related Records */}
                    {(relatedFireWatches.length > 0 || relatedIsolations.length > 0) && (
                      <div>
                        <h4 className="text-sm font-bold text-white mb-2">Related Records</h4>
                        <div className="space-y-2">
                          {relatedFireWatches.map((fw) => (
                            <div
                              key={fw.id}
                              className="flex items-center gap-3 p-3 rounded-xl border border-orange-500/20 bg-orange-500/[0.06]"
                            >
                              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                                <Flame className="h-4 w-4 text-orange-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white">Fire Watch</p>
                                <p className="text-xs text-white">
                                  {fw.duration_minutes} min
                                  {fw.location ? ` \u00B7 ${fw.location}` : ''}
                                  {' \u00B7 '}
                                  {new Date(fw.start_time).toLocaleDateString('en-GB')}
                                </p>
                              </div>
                              <Badge
                                className={`text-[10px] border-none ${
                                  fw.status === 'completed'
                                    ? 'bg-green-500/15 text-green-400'
                                    : 'bg-amber-500/15 text-amber-400'
                                }`}
                              >
                                {fw.status === 'completed' ? 'Complete' : 'Active'}
                              </Badge>
                            </div>
                          ))}
                          {relatedIsolations.map((ir) => (
                            <div
                              key={ir.id}
                              className="flex items-center gap-3 p-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.06]"
                            >
                              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <Zap className="h-4 w-4 text-blue-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white">Safe Isolation</p>
                                <p className="text-xs text-white">
                                  {ir.circuit_description}
                                  {ir.distribution_board ? ` \u00B7 ${ir.distribution_board}` : ''}
                                  {' \u00B7 '}
                                  {new Date(ir.created_at).toLocaleDateString('en-GB')}
                                </p>
                              </div>
                              <Badge
                                className={`text-[10px] border-none ${
                                  ir.status === 'isolated'
                                    ? 'bg-green-500/15 text-green-400'
                                    : ir.status === 're_energised'
                                      ? 'bg-blue-500/15 text-blue-400'
                                      : ir.status === 'cancelled'
                                        ? 'bg-red-500/15 text-red-400'
                                        : 'bg-amber-500/15 text-amber-400'
                                }`}
                              >
                                {ir.status === 'isolated'
                                  ? 'Isolated'
                                  : ir.status === 're_energised'
                                    ? 'Re-energised'
                                    : ir.status === 'cancelled'
                                      ? 'Cancelled'
                                      : 'In Progress'}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Audit Trail */}
                  <div className="px-4 py-3">
                    <AuditTimeline recordType="permit" recordId={viewingPermit.id} />
                  </div>

                  {/* Approval */}
                  {viewingPermit.approval_status !== 'not_required' && (
                    <div className="px-4 py-3">
                      <ApprovalInfoCard
                        status={viewingPermit.approval_status}
                        approvedBy={viewingPermit.approved_by}
                        approvedAt={viewingPermit.approved_at}
                        comments={viewingPermit.approval_comments}
                        approvalSignature={viewingPermit.approval_signature}
                      />
                    </div>
                  )}

                  {/* Approval actions */}
                  <div className="px-4 py-1 space-y-2">
                    {viewingPermit.status === 'active' &&
                      viewingPermit.approval_status === 'not_required' && (
                        <button
                          onClick={() =>
                            requestApproval.mutate({
                              table: 'permits_to_work',
                              recordId: viewingPermit.id,
                            })
                          }
                          disabled={requestApproval.isPending}
                          className="w-full h-11 px-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                          <Shield className="h-4 w-4" />
                          Request Supervisor Approval
                        </button>
                      )}

                    {viewingPermit.approval_status === 'pending' && (
                      <button
                        onClick={() => setShowApprovalSheet(true)}
                        className="w-full h-11 px-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-all"
                      >
                        <Shield className="h-4 w-4" />
                        Review and Approve
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="px-4 py-3 border-t border-white/10 flex gap-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                    <Button
                      onClick={() => exportPDF('permit', viewingPermit.id)}
                      disabled={isExporting && exportingId === viewingPermit.id}
                      className="flex-1 h-11 bg-elec-yellow text-black font-bold rounded-xl touch-manipulation active:scale-[0.98]"
                    >
                      {isExporting && exportingId === viewingPermit.id ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <FileDown className="h-4 w-4 mr-2" />
                      )}
                      Export PDF
                    </Button>
                    {(viewingPermit.status === 'active' || viewingPermit.status === 'expired') && (
                      <>
                        {viewingPermit.status === 'active' && (
                          <Button
                            onClick={() => setShowExtendSheet(true)}
                            className="h-11 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl touch-manipulation"
                          >
                            <Timer className="h-4 w-4 mr-2" />
                            Extend
                          </Button>
                        )}
                        {viewingPermit.status === 'expired' && (
                          <Button
                            onClick={() => setShowExtendSheet(true)}
                            className="h-11 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl touch-manipulation"
                          >
                            <Timer className="h-4 w-4 mr-2" />
                            Re-activate
                          </Button>
                        )}
                        <Button
                          onClick={() => closePermit(viewingPermit.id)}
                          className="flex-1 h-11 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl touch-manipulation"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Close
                        </Button>
                        <Button
                          onClick={() => cancelPermit(viewingPermit.id)}
                          variant="outline"
                          className="h-11 border-red-500/30 text-red-400 rounded-xl touch-manipulation"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })()}
        </SheetContent>
      </Sheet>
      {/* Extend Permit Sheet */}
      <Sheet open={showExtendSheet} onOpenChange={setShowExtendSheet}>
        <SheetContent side="bottom" className="h-auto p-0 rounded-t-2xl overflow-hidden">
          <div className="bg-background p-5 space-y-4">
            <div className="pt-1 pb-2 flex justify-center">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>
            <h3 className="text-lg font-bold text-white">Extend Permit Duration</h3>
            <p className="text-sm text-white">
              Select additional time. Conditions must remain safe before extending.
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 4, 8].map((hours) => (
                <button
                  key={hours}
                  onClick={() => setExtensionHours(hours)}
                  className={`h-12 rounded-xl border text-center font-semibold touch-manipulation active:scale-[0.97] transition-all ${
                    extensionHours === hours
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                      : 'border-white/10 bg-white/5 text-white'
                  }`}
                >
                  {hours}h
                </button>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-xs text-white font-medium flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                Confirm that site conditions remain safe and all controls are still in place before
                extending.
              </p>
            </div>
            <div className="flex gap-2 pb-[env(safe-area-inset-bottom)]">
              <Button
                onClick={() => viewingPermit && extendPermit(viewingPermit.id)}
                disabled={extendPermitMutation.isPending}
                className="flex-1 h-12 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl touch-manipulation"
              >
                {extendPermitMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Timer className="h-4 w-4 mr-2" />
                )}
                Extend by {extensionHours}h
              </Button>
              <Button
                onClick={() => setShowExtendSheet(false)}
                variant="outline"
                className="h-12 border-white/20 text-white rounded-xl touch-manipulation"
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Supervisor Approval Sheet */}
      {viewingPermit && (
        <ApprovalSheet
          open={showApprovalSheet}
          onOpenChange={setShowApprovalSheet}
          table="permits_to_work"
          recordId={viewingPermit.id}
          recordTitle={viewingPermit.title}
        />
      )}
    </div>
  );
}

export default PermitToWork;
