import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLocalDraft } from '@/hooks/useLocalDraft';
import { useShowMore } from '@/hooks/useShowMore';
import { storageGetSync, storageRemoveSync } from '@/utils/storage';

import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

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
import { NearMissReportDetail } from './NearMissReportDetail';
import { SwipeableListItem } from './common/SwipeableListItem';
import { DeleteConfirmSheet } from './common/DeleteConfirmSheet';
import { LoadMoreButton } from './common/LoadMoreButton';
import { fmtCardDate } from './common/SafetyRecordCard';
import { SafetyPhotoCapture } from './common/SafetyPhotoCapture';
import { RiskMatrix } from './common/RiskMatrix';
import { SaveAsTemplateSheet } from './common/SaveAsTemplateSheet';
import { LoadTemplateSheet } from './common/LoadTemplateSheet';
import { NEAR_MISS_STANDARD_TEMPLATES } from '@/data/site-safety/near-miss-templates';
import { JobLinkField } from './common/JobLinkField';
import { NearMissReport, Witness } from './types';

interface FormData {
  category: string;
  severity: string;
  description: string;
  location: string;
  incident_date: string;
  incident_time: string;
  reporter_name: string;
  potential_consequences: string;
  immediate_actions: string;
  preventive_measures: string;
  witnesses: Witness[];
  third_party_involved: boolean;
  third_party_details: string;
  weather_conditions: string;
  lighting_conditions: string;
  equipment_involved: string;
  equipment_faulty: boolean;
  equipment_fault_details: string;
  supervisor_notified: boolean;
  supervisor_name: string;
  previous_similar_incidents: string;
  likelihood: number;
}

const QUICK_TEMPLATES = [
  { id: 'electrical', label: 'Electrical', category: 'electrical_hazard', severity: 'high', description: 'Near miss involving electrical hazard — exposed live parts, shock risk, or inadequate isolation discovered. Ref: EAWR 1989 Reg 4, GS38.' },
  { id: 'fire', label: 'Fire risk', category: 'fire_risk', severity: 'critical', description: 'Near miss involving fire hazard — overheating connection, arcing, sparking, or potential ignition source. Ref: BS 7671 Chapter 42, RRO 2005.' },
  { id: 'ppe', label: 'PPE issue', category: 'ppe_failure', severity: 'medium', description: 'Near miss due to PPE issue — missing, damaged, or incorrect PPE identified before work commenced. Ref: PPER 2022.' },
  { id: 'worksite', label: 'Worksite', category: 'worksite_hazard', severity: 'medium', description: 'Near miss involving worksite hazard — trip hazard, cable strike risk, unstable surface, or access issue. Ref: CDM 2015, HSG47.' },
];

const CATEGORIES = [
  { value: 'electrical_hazard', label: 'Electrical Hazard' },
  { value: 'fire_risk', label: 'Fire Risk' },
  { value: 'fall_hazard', label: 'Fall Hazard' },
  { value: 'ppe_failure', label: 'PPE Failure/Issue' },
  { value: 'worksite_hazard', label: 'Worksite Hazard' },
  { value: 'tool_equipment', label: 'Tool/Equipment Issue' },
  { value: 'chemical_exposure', label: 'Chemical Exposure' },
  { value: 'manual_handling', label: 'Manual Handling' },
  { value: 'vehicle_incident', label: 'Vehicle Incident' },
  { value: 'other', label: 'Other' },
];

const SEVERITIES = [
  { value: 'low', label: 'Low', description: 'Minor incident, no injury likely' },
  { value: 'medium', label: 'Medium', description: 'Moderate risk, minor injury possible' },
  { value: 'high', label: 'High', description: 'Significant risk, serious injury possible' },
  { value: 'critical', label: 'Critical', description: 'Life-threatening or major incident' },
];

const SEVERITY_NUMERIC: Record<string, number> = { low: 1, medium: 2, high: 3, critical: 4 };
function severityToNumber(severity: string): number {
  return SEVERITY_NUMERIC[severity] || 1;
}

const LIKELIHOOD_LEVELS = [
  { value: 1, label: 'Very Unlikely', description: 'Could happen but very rare' },
  { value: 2, label: 'Unlikely', description: 'Not expected but possible' },
  { value: 3, label: 'Possible', description: 'Could occur at some time' },
  { value: 4, label: 'Likely', description: 'Will probably occur' },
  { value: 5, label: 'Very Likely', description: 'Expected to occur' },
];

const WEATHER_CONDITIONS = [
  { value: 'clear', label: 'Clear/Sunny' },
  { value: 'overcast', label: 'Overcast' },
  { value: 'rain', label: 'Rain' },
  { value: 'wind', label: 'High Wind' },
  { value: 'cold', label: 'Cold/Frost' },
  { value: 'hot', label: 'Hot' },
  { value: 'dark', label: 'Dark/Night' },
];

const LIGHTING_CONDITIONS = [
  { value: 'good', label: 'Good Natural Light' },
  { value: 'adequate', label: 'Adequate' },
  { value: 'poor', label: 'Poor' },
  { value: 'artificial', label: 'Artificial Only' },
  { value: 'dark', label: 'Very Dark/No Light' },
];

// One colour dimension = severity.
function sevTone(severity: string): Tone {
  return severity === 'critical' ? 'red' : severity === 'high' ? 'orange' : severity === 'medium' ? 'amber' : 'blue';
}
const SEV_CLASS: Record<string, string> = {
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
};

function SevPill({ severity }: { severity: string }) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap', SEV_CLASS[sevTone(severity)])}>
      {(severity || '—').toUpperCase()}
    </span>
  );
}

function CollapsibleSection({ title, open, onOpenChange, children }: { title: string; open: boolean; onOpenChange: (o: boolean) => void; children: React.ReactNode }) {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
      <Collapsible open={open} onOpenChange={onOpenChange}>
        <CollapsibleTrigger className="flex items-center justify-between w-full px-5 py-4 touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors">
          <Eyebrow>{title}</Eyebrow>
          <span className={cn('text-white/40 text-[13px] transition-transform duration-200', open && 'rotate-180')} aria-hidden>⌄</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-5 pb-5 pt-1 space-y-4">{children}</CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export const NearMissReporting: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reports, setReports] = useState<NearMissReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [, setLastSubmittedReport] = useState<NearMissReport | null>(null);
  const [selectedReport, setSelectedReport] = useState<NearMissReport | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [reporterSig, setReporterSig] = useState('');
  const [linkedJobId, setLinkedJobId] = useState<string | null>(null);
  const [linkedJobTitle, setLinkedJobTitle] = useState<string | null>(null);
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [showLoadTemplate, setShowLoadTemplate] = useState(false);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [environmentOpen, setEnvironmentOpen] = useState(false);
  const [investigationOpen, setInvestigationOpen] = useState(false);

  const now = new Date();
  const [formData, setFormData] = useState<FormData>({
    category: '', severity: '', description: '', location: '',
    incident_date: now.toISOString().split('T')[0], incident_time: now.toTimeString().slice(0, 5),
    reporter_name: '', potential_consequences: '', immediate_actions: '', preventive_measures: '',
    witnesses: [], third_party_involved: false, third_party_details: '', weather_conditions: '',
    lighting_conditions: '', equipment_involved: '', equipment_faulty: false, equipment_fault_details: '',
    supervisor_notified: false, supervisor_name: '', previous_similar_incidents: '', likelihood: 0,
  });

  const getTemplateData = () => ({
    category: formData.category, severity: formData.severity, potential_consequences: formData.potential_consequences,
    immediate_actions: formData.immediate_actions, preventive_measures: formData.preventive_measures,
    weather_conditions: formData.weather_conditions, lighting_conditions: formData.lighting_conditions, likelihood: formData.likelihood,
  });

  const handleLoadTemplate = (data: Record<string, unknown>) => {
    setFormData((prev) => ({
      ...prev,
      ...(data.category && { category: data.category as string }),
      ...(data.severity && { severity: data.severity as string }),
      ...(data.description && { description: data.description as string }),
      ...(data.potential_consequences && { potential_consequences: data.potential_consequences as string }),
      ...(data.immediate_actions && { immediate_actions: data.immediate_actions as string }),
      ...(data.preventive_measures && { preventive_measures: data.preventive_measures as string }),
      ...(data.weather_conditions && { weather_conditions: data.weather_conditions as string }),
      ...(data.lighting_conditions && { lighting_conditions: data.lighting_conditions as string }),
      ...(data.likelihood !== undefined && { likelihood: data.likelihood as number }),
    }));
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      const { data } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
      if (data?.full_name) setFormData((prev) => ({ ...prev, reporter_name: data.full_name }));
    };
    loadProfile();
  }, [user]);

  useEffect(() => {
    const loadReports = async () => {
      if (!user) return;
      setLoadingReports(true);
      const { data, error } = await supabase
        .from('near_miss_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      if (!error && data) setReports(data as unknown as NearMissReport[]);
      setLoadingReports(false);
    };
    loadReports();
  }, [user]);

  // Escalation from Safety Observations
  useEffect(() => {
    const escalation = storageGetSync('escalate-to-near-miss');
    if (escalation) {
      try {
        const data = JSON.parse(escalation);
        setFormData((prev) => ({
          ...prev,
          category: data.category || prev.category,
          severity: data.severity || prev.severity,
          description: data.description ? `[Escalated from Observation] ${data.description}` : prev.description,
          location: data.location || prev.location,
        }));
        setShowForm(true);
        storageRemoveSync('escalate-to-near-miss');
      } catch {
        storageRemoveSync('escalate-to-near-miss');
      }
    }
  }, []);

  const resetForm = () => {
    const n = new Date();
    setFormData({
      category: '', severity: '', description: '', location: '',
      incident_date: n.toISOString().split('T')[0], incident_time: n.toTimeString().slice(0, 5),
      reporter_name: formData.reporter_name, potential_consequences: '', immediate_actions: '', preventive_measures: '',
      witnesses: [], third_party_involved: false, third_party_details: '', weather_conditions: '',
      lighting_conditions: '', equipment_involved: '', equipment_faulty: false, equipment_fault_details: '',
      supervisor_notified: false, supervisor_name: '', previous_similar_incidents: '', likelihood: 0,
    });
    setPhotoUrls([]);
    setErrors({});
    setSelectedTemplate(null);
    setPeopleOpen(false);
    setEnvironmentOpen(false);
    setInvestigationOpen(false);
    setReporterSig('');
    setLinkedJobId(null);
    setLinkedJobTitle(null);
  };

  const { status: draftStatus, recoveredData: recoveredDraft, clearDraft, dismissRecovery: dismissDraft } = useLocalDraft({
    key: 'near-miss-report',
    data: formData,
    enabled: showForm,
  });

  const restoreDraft = () => {
    if (!recoveredDraft) return;
    setFormData((prev) => ({ ...prev, ...recoveredDraft }));
    dismissDraft();
  };

  const applyTemplate = (template: (typeof QUICK_TEMPLATES)[0]) => {
    setSelectedTemplate(template.id);
    setFormData((prev) => ({ ...prev, category: template.category, severity: template.severity, description: template.description }));
    setErrors({});
  };

  const addWitness = () => setFormData((prev) => ({ ...prev, witnesses: [...prev.witnesses, { name: '', contact: '' }] }));
  const updateWitness = (index: number, field: 'name' | 'contact', value: string) =>
    setFormData((prev) => ({ ...prev, witnesses: prev.witnesses.map((w, i) => (i === index ? { ...w, [field]: value } : w)) }));
  const removeWitness = (index: number) => setFormData((prev) => ({ ...prev, witnesses: prev.witnesses.filter((_, i) => i !== index) }));

  const readiness = [
    { ok: !!formData.incident_date && !!formData.incident_time, label: 'Date and time' },
    { ok: !!formData.location.trim(), label: 'Location' },
    { ok: !!formData.category, label: 'Hazard category' },
    { ok: !!formData.severity, label: 'Severity rated' },
    { ok: formData.description.trim().length >= 20, label: 'Description (at least 20 characters)' },
  ];
  const formReady = readiness.every((r) => r.ok);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.incident_date) newErrors.incident_date = 'Date is required';
    if (!formData.incident_time) newErrors.incident_time = 'Time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.severity) newErrors.severity = 'Severity is required';
    if (!formData.description.trim() || formData.description.trim().length < 20)
      newErrors.description = 'Description required (at least 20 characters)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitReport = async () => {
    if (!validateForm()) {
      toast({ title: 'Missing required fields', description: 'Please complete the highlighted fields', variant: 'destructive' });
      return;
    }
    if (!user) {
      toast({ title: 'Error', description: 'You must be logged in', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    try {
      const validWitnesses = formData.witnesses.filter((w) => w.name.trim());
      const insertData = {
        user_id: user.id,
        category: formData.category,
        severity: formData.severity,
        description: formData.description,
        location: formData.location,
        incident_date: formData.incident_date,
        incident_time: formData.incident_time,
        reporter_name: formData.reporter_name || 'Anonymous',
        potential_consequences: formData.potential_consequences || null,
        immediate_actions: formData.immediate_actions || null,
        preventive_measures: formData.preventive_measures || null,
        status: 'open',
        follow_up_required: formData.severity === 'high' || formData.severity === 'critical',
        witnesses: validWitnesses.length > 0 ? validWitnesses : null,
        third_party_involved: formData.third_party_involved,
        third_party_details: formData.third_party_details || null,
        weather_conditions: formData.weather_conditions || null,
        lighting_conditions: formData.lighting_conditions || null,
        equipment_involved: formData.equipment_involved || null,
        equipment_faulty: formData.equipment_faulty,
        equipment_fault_details: formData.equipment_fault_details || null,
        supervisor_notified: formData.supervisor_notified,
        supervisor_name: formData.supervisor_name || null,
        previous_similar_incidents: formData.previous_similar_incidents || null,
        photos: photoUrls.length > 0 ? photoUrls : null,
        reporter_signature: reporterSig || null,
        likelihood: formData.likelihood > 0 ? formData.likelihood : null,
        risk_rating: formData.likelihood > 0 && formData.severity ? formData.likelihood * severityToNumber(formData.severity) : null,
        job_id: linkedJobId,
      };
      const { data, error } = await supabase.from('near_miss_reports').insert(insertData as Record<string, unknown>).select().single();
      if (error) throw error;
      setLastSubmittedReport(data as unknown as NearMissReport);
      setReports((prev) => [data as unknown as NearMissReport, ...prev]);
      clearDraft();
      resetForm();
      setShowForm(false);
      setShowSuccessDialog(true);
      toast({ title: 'Report submitted', description: 'Near miss report recorded successfully' });
    } catch (error) {
      console.error('Error:', error);
      toast({ title: 'Error', description: 'Failed to submit report', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryLabel = (value: string) => CATEGORIES.find((c) => c.value === value)?.label || value;

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        !searchQuery ||
        report.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.category?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeverity = severityFilter === 'all' || report.severity === severityFilter;
      return matchesSearch && matchesSeverity;
    });
  }, [reports, searchQuery, severityFilter]);

  const { visible: visibleReports, hasMore: hasMoreReports, remaining: remainingReports, loadMore: loadMoreReports } = useShowMore(filteredReports);

  const severityFilterTabs = useMemo(
    () => [
      { value: 'all', label: 'All', count: reports.length },
      { value: 'low', label: 'Minor', count: reports.filter((r) => r.severity === 'low').length },
      { value: 'medium', label: 'Moderate', count: reports.filter((r) => r.severity === 'medium').length },
      { value: 'high', label: 'Major', count: reports.filter((r) => r.severity === 'high').length },
      { value: 'critical', label: 'Critical', count: reports.filter((r) => r.severity === 'critical').length },
    ],
    [reports]
  );

  const handleDeleteReport = async (reportId: string) => {
    try {
      const { error } = await supabase.from('near_miss_reports').delete().eq('id', reportId);
      if (error) throw error;
      setReports((prev) => prev.filter((r) => r.id !== reportId));
      toast({ title: 'Report deleted', description: 'Near miss report removed' });
    } catch (err) {
      console.error('Delete error:', err);
      toast({ title: 'Error', description: 'Could not delete report', variant: 'destructive' });
    }
  };

  // ─── Detail ───
  if (selectedReport) {
    return (
      <NearMissReportDetail
        report={selectedReport}
        onBack={() => setSelectedReport(null)}
        onUpdate={(updated) => {
          setSelectedReport((prev) => (prev ? { ...prev, ...updated } : prev));
          setReports((prev) => prev.map((r) => (r.id === updated.id ? { ...r, ...updated } : r)));
        }}
      />
    );
  }

  // ─── Form ───
  if (showForm) {
    return (
      <div className="bg-elec-dark min-h-screen pb-28">
        <SafetyMasthead
          onBack={() => {
            resetForm();
            setShowForm(false);
          }}
          backLabel="Reports"
          moduleName="Report near miss"
          trailing={<DraftSaveIndicator status={draftStatus} />}
        />
        <div className="mx-auto max-w-3xl px-4 py-4 space-y-4">
          <AnimatePresence>
            {recoveredDraft && <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />}
          </AnimatePresence>

          {/* Quick templates */}
          <div>
            <Eyebrow className="mb-2">Quick start</Eyebrow>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => applyTemplate(t)}
                  className={cn(
                    'p-3 rounded-xl border text-left text-[13px] font-medium touch-manipulation active:scale-[0.98] transition-all',
                    selectedTemplate === t.id ? 'border-elec-yellow bg-elec-yellow/10 text-elec-yellow' : 'border-white/[0.08] bg-[hsl(0_0%_12%)] text-white'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowLoadTemplate(true)}
              className="mt-2 text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow touch-manipulation"
            >
              Load from a saved template →
            </button>
          </div>

          {/* When & where */}
          <FormCard eyebrow="When & where">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date" required>
                <input
                  type="date"
                  value={formData.incident_date}
                  onChange={(e) => setFormData((p) => ({ ...p, incident_date: e.target.value }))}
                  className={cn(inputClass, '[color-scheme:dark]', errors.incident_date && 'border-red-500/60')}
                />
              </Field>
              <Field label="Time" required>
                <input
                  type="time"
                  value={formData.incident_time}
                  onChange={(e) => setFormData((p) => ({ ...p, incident_time: e.target.value }))}
                  className={cn(inputClass, '[color-scheme:dark]', errors.incident_time && 'border-red-500/60')}
                />
              </Field>
            </div>
            <LocationAutoFill
              value={formData.location}
              onChange={(v) => setFormData((p) => ({ ...p, location: v }))}
              label="Location"
              placeholder="Where did it happen?"
            />
            <JobLinkField
              jobId={linkedJobId}
              jobTitle={linkedJobTitle}
              onSelect={(id, title) => {
                setLinkedJobId(id);
                setLinkedJobTitle(title);
              }}
            />
          </FormCard>

          {/* What happened */}
          <FormCard eyebrow="What happened">
            <Field label="Category" required>
              <Select value={formData.category} onValueChange={(v) => setFormData((p) => ({ ...p, category: v }))}>
                <SelectTrigger className={cn(selectTriggerClass, errors.category && 'border-red-500/60')}>
                  <SelectValue placeholder="Select hazard type" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Severity" required>
              <div className="grid grid-cols-2 gap-2">
                {SEVERITIES.map((s) => {
                  const selected = formData.severity === s.value;
                  return (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, severity: s.value }))}
                      className={cn(
                        'p-3 rounded-xl border text-left transition-all active:scale-[0.98]',
                        selected ? SEV_CLASS[sevTone(s.value)] : 'border-white/[0.08] bg-[hsl(0_0%_10%)] text-white'
                      )}
                    >
                      <span className="text-[13px] font-medium block">{s.label}</span>
                      <span className="text-[11px] text-white/55">{s.description}</span>
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Likelihood">
              <div className="flex gap-1.5">
                {LIKELIHOOD_LEVELS.map((l) => (
                  <button
                    key={l.value}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, likelihood: l.value }))}
                    className={cn(
                      'flex-1 h-11 rounded-xl border text-[13px] font-medium touch-manipulation active:scale-[0.97] transition-all',
                      formData.likelihood === l.value ? 'bg-elec-yellow text-black border-elec-yellow' : 'bg-[hsl(0_0%_10%)] text-white border-white/[0.08]'
                    )}
                  >
                    {l.value}
                  </button>
                ))}
              </div>
              {formData.likelihood > 0 && (
                <p className="text-[11px] text-white/55 mt-1.5">
                  {LIKELIHOOD_LEVELS[formData.likelihood - 1]?.label} — {LIKELIHOOD_LEVELS[formData.likelihood - 1]?.description}
                </p>
              )}
            </Field>

            {formData.severity && formData.likelihood > 0 && (
              <RiskMatrix selectedLikelihood={formData.likelihood} selectedSeverity={severityToNumber(formData.severity)} />
            )}

            <Field label="Description" required>
              <SmartTextarea
                placeholder="Describe what happened…"
                value={formData.description}
                onChange={(val) => setFormData((p) => ({ ...p, description: val }))}
                className={cn('min-h-[120px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl', errors.description && 'border-red-500/60')}
              />
              <p className="text-[11px] text-white/45 text-right mt-1">{formData.description.length} chars</p>
            </Field>
          </FormCard>

          {/* Actions */}
          <FormCard eyebrow="Actions (optional)">
            <Field label="Potential consequences">
              <SmartTextarea placeholder="What could have happened?" value={formData.potential_consequences} onChange={(val) => setFormData((p) => ({ ...p, potential_consequences: val }))} className="min-h-[80px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl" />
            </Field>
            <Field label="Immediate actions">
              <SmartTextarea placeholder="What did you do?" value={formData.immediate_actions} onChange={(val) => setFormData((p) => ({ ...p, immediate_actions: val }))} className="min-h-[80px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl" />
            </Field>
            <Field label="Preventive measures">
              <SmartTextarea placeholder="How to prevent this?" value={formData.preventive_measures} onChange={(val) => setFormData((p) => ({ ...p, preventive_measures: val }))} className="min-h-[80px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl" />
            </Field>
          </FormCard>

          {/* People */}
          <CollapsibleSection title="People involved (optional)" open={peopleOpen} onOpenChange={setPeopleOpen}>
            <Field label="Witnesses">
              <div className="space-y-2">
                {formData.witnesses.map((witness, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1 space-y-2">
                      <input placeholder="Name" value={witness.name} onChange={(e) => updateWitness(index, 'name', e.target.value)} className={inputClass} />
                      <input placeholder="Contact (optional)" value={witness.contact} onChange={(e) => updateWitness(index, 'contact', e.target.value)} className={inputClass} />
                    </div>
                    <button onClick={() => removeWitness(index)} className="h-11 w-11 shrink-0 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/60 flex items-center justify-center touch-manipulation" aria-label="Remove witness">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <SecondaryButton fullWidth onClick={addWitness}>+ Add witness</SecondaryButton>
              </div>
            </Field>
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-white/80">Third party involved?</span>
              <Switch checked={formData.third_party_involved} onCheckedChange={(c) => setFormData((p) => ({ ...p, third_party_involved: c }))} />
            </div>
            {formData.third_party_involved && (
              <SmartTextarea placeholder="Details about third party…" value={formData.third_party_details} onChange={(val) => setFormData((p) => ({ ...p, third_party_details: val }))} className="min-h-[80px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl" />
            )}
          </CollapsibleSection>

          {/* Environment */}
          <CollapsibleSection title="Environment & equipment (optional)" open={environmentOpen} onOpenChange={setEnvironmentOpen}>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Weather">
                <Select value={formData.weather_conditions} onValueChange={(v) => setFormData((p) => ({ ...p, weather_conditions: v }))}>
                  <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Weather" /></SelectTrigger>
                  <SelectContent className={selectContentClass}>{WEATHER_CONDITIONS.map((w) => <SelectItem key={w.value} value={w.value}>{w.label}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
              <Field label="Lighting">
                <Select value={formData.lighting_conditions} onValueChange={(v) => setFormData((p) => ({ ...p, lighting_conditions: v }))}>
                  <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Lighting" /></SelectTrigger>
                  <SelectContent className={selectContentClass}>{LIGHTING_CONDITIONS.map((l) => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
            </div>
            <Field label="Equipment involved">
              <input placeholder="e.g. Power drill, scaffold, cable" value={formData.equipment_involved} onChange={(e) => setFormData((p) => ({ ...p, equipment_involved: e.target.value }))} className={inputClass} />
            </Field>
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-white/80">Equipment faulty?</span>
              <Switch checked={formData.equipment_faulty} onCheckedChange={(c) => setFormData((p) => ({ ...p, equipment_faulty: c }))} />
            </div>
            {formData.equipment_faulty && (
              <SmartTextarea placeholder="Describe the fault…" value={formData.equipment_fault_details} onChange={(val) => setFormData((p) => ({ ...p, equipment_fault_details: val }))} className="min-h-[80px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl" />
            )}
          </CollapsibleSection>

          {/* Investigation */}
          <CollapsibleSection title="Investigation (optional)" open={investigationOpen} onOpenChange={setInvestigationOpen}>
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-white/80">Supervisor notified?</span>
              <Switch checked={formData.supervisor_notified} onCheckedChange={(c) => setFormData((p) => ({ ...p, supervisor_notified: c }))} />
            </div>
            {formData.supervisor_notified && (
              <Field label="Supervisor name">
                <input placeholder="Supervisor name" value={formData.supervisor_name} onChange={(e) => setFormData((p) => ({ ...p, supervisor_name: e.target.value }))} className={inputClass} />
              </Field>
            )}
            <Field label="Previous similar incidents?">
              <Select value={formData.previous_similar_incidents} onValueChange={(v) => setFormData((p) => ({ ...p, previous_similar_incidents: v }))}>
                <SelectTrigger className={selectTriggerClass}><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </CollapsibleSection>

          {/* Evidence + reporter */}
          <FormCard eyebrow="Evidence & reporter">
            <SafetyPhotoCapture photos={photoUrls} onPhotosChange={setPhotoUrls} maxPhotos={5} label="Evidence photos (optional)" />
            <Field label="Your name">
              <input placeholder="Optional" value={formData.reporter_name} onChange={(e) => setFormData((p) => ({ ...p, reporter_name: e.target.value }))} className={inputClass} />
            </Field>
            <SignatureField label="Reporter signature" value={reporterSig} onChange={setReporterSig} />
          </FormCard>

          <ReadinessGate items={readiness} title="Ready to submit?" />
        </div>

        {/* Sticky submit */}
        <div className="fixed bottom-0 inset-x-0 bg-elec-dark/95 backdrop-blur-sm border-t border-white/[0.06] px-4 py-3 space-y-2" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
          <div className="mx-auto max-w-3xl space-y-2">
            <PrimaryButton fullWidth size="lg" disabled={!formReady || isSubmitting} onClick={submitReport}>
              {isSubmitting ? 'Submitting…' : 'Submit report'}
            </PrimaryButton>
            <button type="button" onClick={() => setShowSaveTemplate(true)} className="w-full h-9 text-[12px] font-medium text-white/60 hover:text-white touch-manipulation">
              Save as template
            </button>
          </div>
        </div>

        <SaveAsTemplateSheet open={showSaveTemplate} onOpenChange={setShowSaveTemplate} moduleType="near-miss" getTemplateData={getTemplateData} />
        <LoadTemplateSheet open={showLoadTemplate} onOpenChange={setShowLoadTemplate} moduleType="near-miss" onLoad={handleLoadTemplate} standardTemplates={NEAR_MISS_STANDARD_TEMPLATES} />
      </div>
    );
  }

  // ─── List ───
  const total = reports.length;
  const serious = reports.filter((r) => r.severity === 'high' || r.severity === 'critical').length;
  const openCount = reports.filter((r) => !r.status || r.status === 'open' || r.status === 'in_progress').length;
  const closedCount = reports.filter((r) => r.status === 'closed').length;

  return (
    <SafetyModuleShell
      onBack={onBack ?? (() => {})}
      moduleName="Near Miss"
      hero={
        <PageHero
          eyebrow="Near Miss · MHSWR 1999"
          title="Report and learn from near misses"
          description="Capture what nearly went wrong, rate the risk, and turn it into a toolbox talk — before it becomes an accident."
          tone="red"
          actions={<PrimaryButton onClick={() => setShowForm(true)}>Report near miss</PrimaryButton>}
        />
      }
      stats={
        total > 0 ? (
          <StatStrip
            stats={[
              { value: total, label: 'Total' },
              { value: serious, label: 'Serious', sub: 'high / critical' },
              { value: openCount, label: 'Open', accent: true },
              { value: closedCount, label: 'Closed' },
            ]}
          />
        ) : undefined
      }
      filter={
        total > 0 ? (
          <FilterBar
            tabs={severityFilterTabs}
            activeTab={severityFilter}
            onTabChange={setSeverityFilter}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search reports…"
          />
        ) : undefined
      }
    >
      {loadingReports ? (
        <LoadingState />
      ) : reports.length === 0 ? (
        <EmptyState
          title="No near misses reported yet"
          description="Recording near misses helps prevent future accidents and keeps everyone safe. Report your first one."
          action="Report near miss"
          onAction={() => setShowForm(true)}
        />
      ) : filteredReports.length === 0 ? (
        <EmptyState title="No matching reports" description="Try a different severity tab or clear your search." />
      ) : (
        <div className="space-y-2.5">
          {visibleReports.map((report) => (
            <SwipeableListItem
              key={report.id}
              rightActions={[{ icon: Trash2, label: 'Delete', color: 'bg-red-500', textColor: 'text-white', onAction: () => setDeleteTarget(report.id) }]}
            >
              <ListCard>
                <ListRow
                  accent={sevTone(report.severity)}
                  onClick={() => setSelectedReport(report)}
                  title={report.description?.substring(0, 60) || 'Near miss'}
                  subtitle={`${getCategoryLabel(report.category)}${report.location ? ` · ${report.location}` : ''}`}
                  trailing={
                    <div className="flex flex-col items-end gap-1">
                      <SevPill severity={report.severity} />
                      <span className="text-[11px] text-white/45 tabular-nums">{fmtCardDate(report.incident_date)}</span>
                    </div>
                  }
                />
              </ListCard>
            </SwipeableListItem>
          ))}
          {hasMoreReports && <LoadMoreButton onLoadMore={loadMoreReports} remaining={remainingReports} />}
        </div>
      )}

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[360px]">
          <DialogHeader className="text-center pb-2">
            <DialogTitle className="text-xl text-foreground">Report submitted</DialogTitle>
            <DialogDescription className="text-base">Your near miss has been recorded successfully.</DialogDescription>
          </DialogHeader>
          <PrimaryButton fullWidth onClick={() => setShowSuccessDialog(false)}>Done</PrimaryButton>
        </DialogContent>
      </Dialog>

      <DeleteConfirmSheet
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={async () => {
          if (!deleteTarget) return;
          setIsDeleting(true);
          await handleDeleteReport(deleteTarget);
          setIsDeleting(false);
          setDeleteTarget(null);
        }}
        title="Delete near miss report?"
        description="This report will be permanently removed"
        isDeleting={isDeleting}
      />
    </SafetyModuleShell>
  );
};

export default NearMissReporting;
