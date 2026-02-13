import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocalDraft } from '@/hooks/useLocalDraft';
import { DraftRecoveryBanner } from './common/DraftRecoveryBanner';
import { DraftSaveIndicator } from './common/DraftSaveIndicator';
import { Card, CardContent } from '@/components/ui/card';
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
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  AlertTriangle,
  Plus,
  Camera,
  X,
  Zap,
  Flame,
  Users,
  HardHat,
  Clock,
  MapPin,
  Shield,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CloudSun,
  Wrench,
  UserCheck,
  Trash2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { NearMissReportDetail } from './NearMissReportDetail';
import { SwipeableListItem } from './common/SwipeableListItem';
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
}

const QUICK_TEMPLATES = [
  {
    id: 'electrical',
    icon: Zap,
    label: 'Electrical',
    category: 'electrical_hazard',
    severity: 'high',
    description:
      'Near miss involving electrical hazard - exposed wiring, shock risk, or electrical fault detected before incident occurred.',
  },
  {
    id: 'fire',
    icon: Flame,
    label: 'Fire Risk',
    category: 'fire_risk',
    severity: 'critical',
    description:
      'Near miss involving fire hazard - overheating equipment, sparking, or potential ignition source identified.',
  },
  {
    id: 'ppe',
    icon: HardHat,
    label: 'PPE Issue',
    category: 'ppe_failure',
    severity: 'medium',
    description:
      'Near miss due to PPE issue - missing or damaged personal protective equipment identified before work commenced.',
  },
  {
    id: 'worksite',
    icon: Users,
    label: 'Worksite',
    category: 'worksite_hazard',
    severity: 'medium',
    description:
      'Near miss involving worksite hazard - trip hazard, unstable surface, or access issue identified.',
  },
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
  {
    value: 'low',
    label: 'Low',
    description: 'Minor incident, no injury likely',
    colour: 'bg-green-500/20 text-green-400 border-green-500/30',
    border: 'border-l-green-500',
  },
  {
    value: 'medium',
    label: 'Medium',
    description: 'Moderate risk, minor injury possible',
    colour: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    border: 'border-l-yellow-500',
  },
  {
    value: 'high',
    label: 'High',
    description: 'Significant risk, serious injury possible',
    colour: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    border: 'border-l-orange-500',
  },
  {
    value: 'critical',
    label: 'Critical',
    description: 'Life-threatening or major incident',
    colour: 'bg-red-500/20 text-red-400 border-red-500/30',
    border: 'border-l-red-500',
  },
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

export const NearMissReporting: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reports, setReports] = useState<NearMissReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [lastSubmittedReport, setLastSubmittedReport] = useState<NearMissReport | null>(null);
  const [selectedReport, setSelectedReport] = useState<NearMissReport | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Collapsible section states
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [environmentOpen, setEnvironmentOpen] = useState(false);
  const [investigationOpen, setInvestigationOpen] = useState(false);

  const now = new Date();
  const [formData, setFormData] = useState<FormData>({
    category: '',
    severity: '',
    description: '',
    location: '',
    incident_date: now.toISOString().split('T')[0],
    incident_time: now.toTimeString().slice(0, 5),
    reporter_name: '',
    potential_consequences: '',
    immediate_actions: '',
    preventive_measures: '',
    witnesses: [],
    third_party_involved: false,
    third_party_details: '',
    weather_conditions: '',
    lighting_conditions: '',
    equipment_involved: '',
    equipment_faulty: false,
    equipment_fault_details: '',
    supervisor_notified: false,
    supervisor_name: '',
    previous_similar_incidents: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
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

  const resetForm = () => {
    const now = new Date();
    setFormData({
      category: '',
      severity: '',
      description: '',
      location: '',
      incident_date: now.toISOString().split('T')[0],
      incident_time: now.toTimeString().slice(0, 5),
      reporter_name: formData.reporter_name,
      potential_consequences: '',
      immediate_actions: '',
      preventive_measures: '',
      witnesses: [],
      third_party_involved: false,
      third_party_details: '',
      weather_conditions: '',
      lighting_conditions: '',
      equipment_involved: '',
      equipment_faulty: false,
      equipment_fault_details: '',
      supervisor_notified: false,
      supervisor_name: '',
      previous_similar_incidents: '',
    });
    setPhotos([]);
    setPhotoPreviewUrls([]);
    setErrors({});
    setSelectedTemplate(null);
    setPeopleOpen(false);
    setEnvironmentOpen(false);
    setInvestigationOpen(false);
  };

  // Draft persistence
  const {
    status: draftStatus,
    recoveredData: recoveredDraft,
    clearDraft,
    dismissRecovery: dismissDraft,
  } = useLocalDraft({
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
    setFormData((prev) => ({
      ...prev,
      category: template.category,
      severity: template.severity,
      description: template.description,
    }));
    setErrors({});
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length > 5) {
      toast({ title: 'Maximum 5 photos', variant: 'destructive' });
      return;
    }
    const validFiles = files.filter(
      (f) => f.type.startsWith('image/') && f.size <= 10 * 1024 * 1024
    );
    setPhotos((prev) => [...prev, ...validFiles]);
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreviewUrls((prev) => [...prev, e.target?.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const addWitness = () => {
    setFormData((prev) => ({ ...prev, witnesses: [...prev.witnesses, { name: '', contact: '' }] }));
  };

  const updateWitness = (index: number, field: 'name' | 'contact', value: string) => {
    setFormData((prev) => ({
      ...prev,
      witnesses: prev.witnesses.map((w, i) => (i === index ? { ...w, [field]: value } : w)),
    }));
  };

  const removeWitness = (index: number) => {
    setFormData((prev) => ({ ...prev, witnesses: prev.witnesses.filter((_, i) => i !== index) }));
  };

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
    if (Object.keys(newErrors).length > 0) {
      const el = document.getElementById(`field-${Object.keys(newErrors)[0]}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return Object.keys(newErrors).length === 0;
  };

  const submitReport = async () => {
    if (!validateForm()) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in all highlighted fields',
        variant: 'destructive',
      });
      return;
    }
    if (!user) {
      toast({ title: 'Error', description: 'You must be logged in', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    try {
      // Filter out empty witnesses
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
        witnesses: validWitnesses.length > 0 ? JSON.stringify(validWitnesses) : null,
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
      };
      const { data, error } = await supabase
        .from('near_miss_reports')
        .insert(insertData as any)
        .select()
        .single();
      if (error) throw error;
      setLastSubmittedReport(data as unknown as NearMissReport);
      setReports((prev) => [data as unknown as NearMissReport, ...prev]);
      clearDraft();
      resetForm();
      setShowForm(false);
      setShowSuccessDialog(true);
      toast({
        title: 'Report submitted',
        description: 'Near miss report has been recorded successfully',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({ title: 'Error', description: 'Failed to submit report', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSeverityBadge = (severity: string) => {
    const sev = SEVERITIES.find((s) => s.value === severity);
    return sev ? (
      <Badge className={`${sev.colour} border`}>{sev.label}</Badge>
    ) : (
      <Badge variant="secondary">{severity}</Badge>
    );
  };
  const getSeverityBorder = (severity: string) =>
    SEVERITIES.find((s) => s.value === severity)?.border || 'border-l-muted';
  const getCategoryLabel = (value: string) =>
    CATEGORIES.find((c) => c.value === value)?.label || value;

  const handleDeleteReport = async (reportId: string) => {
    try {
      const { error } = await supabase
        .from('near_miss_reports')
        .delete()
        .eq('id', reportId);
      if (error) throw error;
      setReports((prev) => prev.filter((r) => r.id !== reportId));
      toast({ title: 'Report deleted', description: 'Near miss report has been removed' });
    } catch (err) {
      console.error('Delete error:', err);
      toast({ title: 'Error', description: 'Could not delete report', variant: 'destructive' });
    }
  };

  // Show detail view if a report is selected
  if (selectedReport) {
    return <NearMissReportDetail report={selectedReport} onBack={() => setSelectedReport(null)} />;
  }

  if (!showForm) {
    return (
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Near Miss Reports</h2>
                <p className="text-sm text-white">Record and track safety incidents</p>
              </div>
            </div>
            {reports.length > 0 && (
              <Badge className="bg-white/5 border border-white/10 text-white">
                {reports.length} report{reports.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="w-full h-14 text-base bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium touch-manipulation active:scale-[0.98]"
          >
            <Plus className="h-5 w-5 mr-2" />
            Report Near Miss
          </Button>
        </div>

        {loadingReports ? (
          <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
            <CardContent className="py-16">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
                  <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
                </div>
                <p className="text-sm text-white">Loading reports...</p>
              </div>
            </CardContent>
          </Card>
        ) : reports.length === 0 ? (
          <Card className="bg-[#1e1e1e] border border-white/10 border-dashed rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 mb-4">
                <AlertTriangle className="h-10 w-10 text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No reports yet</h3>
              <p className="text-sm text-white mb-6 max-w-[280px]">
                Recording near misses helps prevent future accidents and keeps everyone safe.
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium touch-manipulation active:scale-[0.98]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Submit your first report
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {reports.map((report) => (
              <SwipeableListItem
                key={report.id}
                rightActions={[
                  {
                    icon: Trash2,
                    label: 'Delete',
                    color: 'bg-red-500',
                    onAction: () => handleDeleteReport(report.id),
                  },
                ]}
              >
                <Card
                  className={`bg-[#1e1e1e] border border-white/10 rounded-2xl border-l-4 ${getSeverityBorder(report.severity)} cursor-pointer hover:border-white/20 active:scale-[0.98] transition-all touch-manipulation`}
                  onClick={() => setSelectedReport(report)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {getSeverityBadge(report.severity)}
                          <Badge
                            variant="outline"
                            className="text-xs bg-white/5 border-white/10 text-white"
                          >
                            {getCategoryLabel(report.category)}
                          </Badge>
                        </div>
                        <p className="text-sm text-white line-clamp-2 mb-3">{report.description}</p>
                        <div className="flex items-center gap-4 text-xs text-white">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate max-w-[120px]">{report.location}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3" />
                            {new Date(report.incident_date).toLocaleDateString('en-GB')}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-white shrink-0 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              </SwipeableListItem>
            ))}
          </div>
        )}

        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-[360px]">
            <DialogHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <DialogTitle className="text-xl text-foreground">Report Submitted</DialogTitle>
              <DialogDescription className="text-base">
                Your near miss has been recorded successfully.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => setShowSuccessDialog(false)} className="w-full h-12 mt-2">
              Done
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            resetForm();
            setShowForm(false);
          }}
          className="bg-white/5 hover:bg-white/10 text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-white">Report Near Miss</h2>
            <DraftSaveIndicator status={draftStatus} />
          </div>
          <p className="text-sm text-white">Fields with * are required</p>
        </div>
      </div>

      <AnimatePresence>
        {recoveredDraft && (
          <DraftRecoveryBanner
            onRestore={restoreDraft}
            onDismiss={dismissDraft}
          />
        )}
      </AnimatePresence>

      <div className="space-y-3">
        <Label className="text-sm text-white">Quick templates</Label>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => applyTemplate(t)}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left active:scale-[0.98] ${
                selectedTemplate === t.id
                  ? 'border-elec-yellow bg-elec-yellow/10 ring-1 ring-elec-yellow/30'
                  : 'border-white/10 bg-[#1a1a1a] hover:border-white/20'
              }`}
            >
              <t.icon
                className={`h-5 w-5 ${selectedTemplate === t.id ? 'text-elec-yellow' : 'text-elec-yellow'}`}
              />
              <span className="text-sm font-medium text-white">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
        <CardContent className="p-4 space-y-6">
          {/* When & Where Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white uppercase tracking-wide flex items-center gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              When & Where
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div id="field-incident_date" className="space-y-2">
                <Label className="text-white">
                  Date <span className="text-red-400">*</span>
                </Label>
                <Input
                  type="date"
                  value={formData.incident_date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, incident_date: e.target.value }))
                  }
                  className={`h-14 text-base bg-[#1a1a1a] border-white/10 text-white ${errors.incident_date ? 'border-red-500' : ''}`}
                />
                {errors.incident_date && (
                  <p className="text-xs text-red-400">{errors.incident_date}</p>
                )}
              </div>
              <div id="field-incident_time" className="space-y-2">
                <Label className="text-white">
                  Time <span className="text-red-400">*</span>
                </Label>
                <Input
                  type="time"
                  value={formData.incident_time}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, incident_time: e.target.value }))
                  }
                  className={`h-14 text-base bg-[#1a1a1a] border-white/10 text-white ${errors.incident_time ? 'border-red-500' : ''}`}
                />
                {errors.incident_time && (
                  <p className="text-xs text-red-400">{errors.incident_time}</p>
                )}
              </div>
            </div>
            <div id="field-location" className="space-y-2">
              <Label className="text-white">
                Location <span className="text-red-400">*</span>
              </Label>
              <Input
                placeholder="e.g. 123 High Street, London"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                className={`h-14 text-base bg-[#1a1a1a] border-white/10 text-white placeholder:text-white ${errors.location ? 'border-red-500' : ''}`}
              />
              {errors.location && <p className="text-xs text-red-400">{errors.location}</p>}
            </div>
          </div>

          {/* What Happened Section */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-medium text-white uppercase tracking-wide flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              What Happened
            </h3>
            <div id="field-category" className="space-y-2">
              <Label className="text-white">
                Category <span className="text-red-400">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(v) => setFormData((prev) => ({ ...prev, category: v }))}
              >
                <SelectTrigger
                  className={`h-14 text-base bg-[#1a1a1a] border-white/10 text-white ${errors.category ? 'border-red-500' : ''}`}
                >
                  <SelectValue placeholder="Select hazard type" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10">
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value} className="text-white">
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-xs text-red-400">{errors.category}</p>}
            </div>
            <div id="field-severity" className="space-y-2">
              <Label className="text-white">
                Severity <span className="text-red-400">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {SEVERITIES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, severity: s.value }))}
                    className={`p-3 rounded-xl border text-left transition-all active:scale-[0.98] ${formData.severity === s.value ? `${s.colour} border-2` : 'border-white/10 bg-[#1a1a1a] hover:border-white/20'}`}
                  >
                    <span className="font-medium text-sm text-white">{s.label}</span>
                    <p className="text-xs text-white mt-0.5">{s.description}</p>
                  </button>
                ))}
              </div>
              {errors.severity && <p className="text-xs text-red-400">{errors.severity}</p>}
            </div>
            <div id="field-description" className="space-y-2">
              <Label className="text-white">
                Description <span className="text-red-400">*</span>
              </Label>
              <Textarea
                placeholder="Describe what happened..."
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className={`min-h-[120px] text-base resize-none bg-[#1a1a1a] border-white/10 text-white placeholder:text-white ${errors.description ? 'border-red-500' : ''}`}
              />
              <div className="flex justify-between">
                {errors.description ? (
                  <p className="text-xs text-red-400">{errors.description}</p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-white">{formData.description.length} chars</span>
              </div>
            </div>
          </div>

          {/* Actions (Optional) Section */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-medium text-white uppercase tracking-wide flex items-center gap-2">
              <Shield className="h-4 w-4 text-elec-yellow" />
              Actions (Optional)
            </h3>
            <div className="space-y-2">
              <Label className="text-white">Potential Consequences</Label>
              <Textarea
                placeholder="What could have happened?"
                value={formData.potential_consequences}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, potential_consequences: e.target.value }))
                }
                className="min-h-[80px] text-base resize-none bg-[#1a1a1a] border-white/10 text-white placeholder:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Immediate Actions</Label>
              <Textarea
                placeholder="What did you do?"
                value={formData.immediate_actions}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, immediate_actions: e.target.value }))
                }
                className="min-h-[80px] text-base resize-none bg-[#1a1a1a] border-white/10 text-white placeholder:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Preventive Measures</Label>
              <Textarea
                placeholder="How to prevent this?"
                value={formData.preventive_measures}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, preventive_measures: e.target.value }))
                }
                className="min-h-[80px] text-base resize-none bg-[#1a1a1a] border-white/10 text-white placeholder:text-white"
              />
            </div>
          </div>

          {/* People Involved (Optional) - Collapsible */}
          <Collapsible
            open={peopleOpen}
            onOpenChange={setPeopleOpen}
            className="pt-4 border-t border-white/10"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 touch-manipulation active:scale-[0.98]">
              <h3 className="text-sm font-medium text-white uppercase tracking-wide flex items-center gap-2">
                <Users className="h-4 w-4 text-elec-yellow" />
                People Involved (Optional)
              </h3>
              {peopleOpen ? (
                <ChevronUp className="h-5 w-5 text-white" />
              ) : (
                <ChevronDown className="h-5 w-5 text-white" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-4">
              {/* Witnesses */}
              <div className="space-y-3">
                <Label className="text-white">Witnesses</Label>
                {formData.witnesses.map((witness, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Name"
                        value={witness.name}
                        onChange={(e) => updateWitness(index, 'name', e.target.value)}
                        className="h-14 text-base bg-[#1a1a1a] border-white/10 text-white placeholder:text-white"
                      />
                      <Input
                        placeholder="Contact (optional)"
                        value={witness.contact}
                        onChange={(e) => updateWitness(index, 'contact', e.target.value)}
                        className="h-14 text-base bg-[#1a1a1a] border-white/10 text-white placeholder:text-white"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeWitness(index)}
                      className="h-14 w-14 shrink-0 hover:bg-white/5"
                    >
                      <Trash2 className="h-5 w-5 text-white" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addWitness}
                  className="w-full h-12 border-white/10 bg-[#1a1a1a] text-white hover:bg-white/5 hover:border-white/20"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Witness
                </Button>
              </div>

              {/* Third Party */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Third party involved?</Label>
                  <Switch
                    checked={formData.third_party_involved}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, third_party_involved: checked }))
                    }
                  />
                </div>
                {formData.third_party_involved && (
                  <Textarea
                    placeholder="Details about third party..."
                    value={formData.third_party_details}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, third_party_details: e.target.value }))
                    }
                    className="min-h-[80px] text-base resize-none bg-[#1a1a1a] border-white/10 text-white placeholder:text-white"
                  />
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Environment & Equipment (Optional) - Collapsible */}
          <Collapsible
            open={environmentOpen}
            onOpenChange={setEnvironmentOpen}
            className="pt-4 border-t border-white/10"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 touch-manipulation active:scale-[0.98]">
              <h3 className="text-sm font-medium text-white uppercase tracking-wide flex items-center gap-2">
                <CloudSun className="h-4 w-4 text-elec-yellow" />
                Environment & Equipment (Optional)
              </h3>
              {environmentOpen ? (
                <ChevronUp className="h-5 w-5 text-white" />
              ) : (
                <ChevronDown className="h-5 w-5 text-white" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-white">Weather Conditions</Label>
                  <Select
                    value={formData.weather_conditions}
                    onValueChange={(v) =>
                      setFormData((prev) => ({ ...prev, weather_conditions: v }))
                    }
                  >
                    <SelectTrigger className="h-14 text-base bg-[#1a1a1a] border-white/10 text-white">
                      <SelectValue placeholder="Select weather" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10">
                      {WEATHER_CONDITIONS.map((w) => (
                        <SelectItem key={w.value} value={w.value} className="text-white">
                          {w.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Lighting Conditions</Label>
                  <Select
                    value={formData.lighting_conditions}
                    onValueChange={(v) =>
                      setFormData((prev) => ({ ...prev, lighting_conditions: v }))
                    }
                  >
                    <SelectTrigger className="h-14 text-base bg-[#1a1a1a] border-white/10 text-white">
                      <SelectValue placeholder="Select lighting" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10">
                      {LIGHTING_CONDITIONS.map((l) => (
                        <SelectItem key={l.value} value={l.value} className="text-white">
                          {l.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Equipment Involved</Label>
                <Input
                  placeholder="e.g. Power drill, scaffold, cable"
                  value={formData.equipment_involved}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, equipment_involved: e.target.value }))
                  }
                  className="h-14 text-base bg-[#1a1a1a] border-white/10 text-white placeholder:text-white"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Equipment faulty?</Label>
                  <Switch
                    checked={formData.equipment_faulty}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, equipment_faulty: checked }))
                    }
                  />
                </div>
                {formData.equipment_faulty && (
                  <Textarea
                    placeholder="Describe the fault..."
                    value={formData.equipment_fault_details}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, equipment_fault_details: e.target.value }))
                    }
                    className="min-h-[80px] text-base resize-none bg-[#1a1a1a] border-white/10 text-white placeholder:text-white"
                  />
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Investigation (Optional) - Collapsible */}
          <Collapsible
            open={investigationOpen}
            onOpenChange={setInvestigationOpen}
            className="pt-4 border-t border-white/10"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 touch-manipulation active:scale-[0.98]">
              <h3 className="text-sm font-medium text-white uppercase tracking-wide flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-elec-yellow" />
                Investigation (Optional)
              </h3>
              {investigationOpen ? (
                <ChevronUp className="h-5 w-5 text-white" />
              ) : (
                <ChevronDown className="h-5 w-5 text-white" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Supervisor notified?</Label>
                  <Switch
                    checked={formData.supervisor_notified}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, supervisor_notified: checked }))
                    }
                  />
                </div>
                {formData.supervisor_notified && (
                  <Input
                    placeholder="Supervisor name"
                    value={formData.supervisor_name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, supervisor_name: e.target.value }))
                    }
                    className="h-14 text-base bg-[#1a1a1a] border-white/10 text-white placeholder:text-white"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-white">Previous similar incidents?</Label>
                <Select
                  value={formData.previous_similar_incidents}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, previous_similar_incidents: v }))
                  }
                >
                  <SelectTrigger className="h-14 text-base bg-[#1a1a1a] border-white/10 text-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10">
                    <SelectItem value="yes" className="text-white">
                      Yes
                    </SelectItem>
                    <SelectItem value="no" className="text-white">
                      No
                    </SelectItem>
                    <SelectItem value="unknown" className="text-white">
                      Unknown
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Photos Section */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-medium text-white uppercase tracking-wide flex items-center gap-2">
              <Camera className="h-4 w-4 text-elec-yellow" />
              Photos (Optional)
            </h3>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoSelect}
              className="hidden"
            />
            {photoPreviewUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {photoPreviewUrls.map((url, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/10"
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" />
                    <button
                      onClick={() => removePhoto(i)}
                      className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-black/70 hover:bg-black/90 transition-colors"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {photos.length < 5 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-12 border-white/10 bg-[#1a1a1a] text-white hover:bg-white/5 hover:border-white/20"
              >
                <Camera className="h-4 w-4 mr-2" />
                Add Photo ({photos.length}/5)
              </Button>
            )}
          </div>

          {/* Reporter Name */}
          <div className="space-y-2 pt-4 border-t border-white/10">
            <Label className="text-white">Your Name</Label>
            <Input
              placeholder="Optional"
              value={formData.reporter_name}
              onChange={(e) => setFormData((prev) => ({ ...prev, reporter_name: e.target.value }))}
              className="h-14 text-base bg-[#1a1a1a] border-white/10 text-white placeholder:text-white"
            />
          </div>
        </CardContent>
      </Card>

      <div className="sticky bottom-0 bg-[#121212]/95 backdrop-blur-sm py-4 -mx-4 px-4 border-t border-white/10">
        <Button
          onClick={submitReport}
          disabled={isSubmitting}
          className="w-full h-14 text-base font-medium bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation active:scale-[0.98]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Submit Report
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
