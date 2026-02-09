import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  ChevronDown,
  Shield,
  User,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Plus,
  Trash2,
  Camera,
  Sparkles,
  Lightbulb,
  Clock,
  X,
  History,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import SignatureInput from '@/components/signature/SignatureInput';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { useToast } from '@/hooks/use-toast';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';

interface FireAlarmDeclarationsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const FireAlarmDeclarations: React.FC<FireAlarmDeclarationsProps> = ({ formData, onUpdate }) => {
  const isMobile = useIsMobile();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    commissioning: true,
    handover: true,
    previousDefects: true,
    defects: true,
    declarations: true,
    certification: true,
  });

  const { getDefaultProfile } = useInspectorProfiles();
  const { toast } = useToast();
  const {
    calculateNextServiceISO,
    calculateNextInspectionISO,
    suggestDefectSeverityFromDescription,
    formatToUKDate,
  } = useFireAlarmSmartForm();

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateHandover = (field: string, value: boolean) => {
    const current = formData.handoverDocumentation || {};
    onUpdate('handoverDocumentation', { ...current, [field]: value });
  };

  const handover = formData.handoverDocumentation || {};

  // Defects management
  const addDefect = () => {
    const defects = formData.defectsFound || [];
    const newDefect = {
      id: `defect-${Date.now()}`,
      description: '',
      severity: 'non-critical' as const,
      rectified: false,
      rectificationDate: '',
    };
    onUpdate('defectsFound', [...defects, newDefect]);
  };

  const updateDefect = (id: string, field: string, value: any) => {
    const defects = formData.defectsFound || [];
    const updatedDefects = defects.map((d: any) => (d.id === id ? { ...d, [field]: value } : d));
    onUpdate('defectsFound', updatedDefects);
  };

  const removeDefect = (id: string) => {
    const defects = formData.defectsFound || [];
    onUpdate(
      'defectsFound',
      defects.filter((d: any) => d.id !== id)
    );
  };

  // Previous defects management (for periodic testing)
  const addPreviousDefect = () => {
    const defects = formData.previousDefects || [];
    const newDefect = {
      id: `prev-defect-${Date.now()}`,
      description: '',
      originalDate: '',
      status: 'outstanding' as const,
      notes: '',
    };
    onUpdate('previousDefects', [...defects, newDefect]);
  };

  const updatePreviousDefect = (id: string, field: string, value: any) => {
    const defects = formData.previousDefects || [];
    const updatedDefects = defects.map((d: any) => (d.id === id ? { ...d, [field]: value } : d));
    onUpdate('previousDefects', updatedDefects);
  };

  const removePreviousDefect = (id: string) => {
    const defects = formData.previousDefects || [];
    onUpdate(
      'previousDefects',
      defects.filter((d: any) => d.id !== id)
    );
  };

  // Handle defect description change with auto-severity suggestion
  const handleDefectDescriptionChange = (id: string, description: string) => {
    updateDefect(id, 'description', description);

    // Auto-suggest severity based on description
    if (description.length > 10) {
      const suggestion = suggestDefectSeverityFromDescription(description);
      // Only update if current severity is the default
      const defects = formData.defectsFound || [];
      const defect = defects.find((d: any) => d.id === id);
      if (defect && defect.severity === 'non-critical') {
        updateDefect(id, 'severity', suggestion.severity);
      }
    }
  };

  // Handle defect photo upload
  const handleDefectPhotoUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Convert to base64 for storage
    const reader = new FileReader();
    reader.onloadend = () => {
      updateDefect(id, 'photoUrl', reader.result as string);
      toast({
        title: 'Photo added',
        description: 'Defect photo has been attached.',
      });
    };
    reader.readAsDataURL(file);
  };

  // Auto-calculate service dates when commissioning date changes
  useEffect(() => {
    if (formData.commissioningDate && !formData.nextServiceDue) {
      const nextService = calculateNextServiceISO(formData.commissioningDate);
      if (nextService) {
        onUpdate('nextServiceDue', nextService);
      }
    }
    if (formData.commissioningDate && !formData.nextInspectionDue) {
      const nextInspection = calculateNextInspectionISO(formData.commissioningDate);
      if (nextInspection) {
        onUpdate('nextInspectionDue', nextInspection);
      }
    }
  }, [formData.commissioningDate]);

  // Load profile to section
  const loadProfileToSection = (section: 'designer' | 'installer' | 'commissioner') => {
    const profile = getDefaultProfile();
    if (!profile) return;

    const today = new Date().toISOString().split('T')[0];
    const qualifications = Array.isArray(profile.qualifications)
      ? profile.qualifications.join(', ')
      : '';

    onUpdate(`${section}Name`, profile.name);
    onUpdate(`${section}Qualifications`, qualifications);
    onUpdate(`${section}Company`, profile.companyName);
    onUpdate(`${section}Date`, today);
    if (profile.signatureData) {
      onUpdate(`${section}Signature`, profile.signatureData);
    }

    toast({
      title: 'Profile Loaded',
      description: `Your saved profile has been applied to ${section} section.`,
    });
  };

  const isComplete = {
    installer: formData.installerName && formData.installerSignature,
    commissioner: formData.commissionerName && formData.commissionerSignature,
  };

  return (
    <div className={cn(isMobile ? 'space-y-0' : 'space-y-6')}>
      {/* Legal Notice */}
      <div className={cn(isMobile ? 'px-4 py-3' : '')}>
        <Alert className="border-amber-500/30 bg-amber-500/10">
          <Shield className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200 text-xs sm:text-sm">
            <strong>BS 5839 Compliance:</strong> This certificate confirms the fire detection and
            alarm system has been installed, commissioned, and tested in accordance with BS 5839-1
            and the relevant fire risk assessment requirements.
          </AlertDescription>
        </Alert>
      </div>

      {/* Commissioning Details */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible
          open={openSections.commissioning}
          onOpenChange={() => toggleSection('commissioning')}
        >
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Commissioning Details</h3>
                  <span className="text-xs text-muted-foreground">Dates & handover</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
                    openSections.commissioning && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white font-semibold">Commissioning Details</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white/40 transition-transform',
                    openSections.commissioning && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="commissioningDate">Commissioning Date *</Label>
                  <Input
                    id="commissioningDate"
                    type="date"
                    value={formData.commissioningDate || ''}
                    onChange={(e) => onUpdate('commissioningDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="handoverDate">Handover Date</Label>
                  <Input
                    id="handoverDate"
                    type="date"
                    value={formData.handoverDate || ''}
                    onChange={(e) => onUpdate('handoverDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              {/* Auto-calculated service dates preview */}
              {formData.commissioningDate && (
                <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <Clock className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-elec-yellow" />
                      Auto-calculated Service Dates
                    </p>
                    <div className="mt-1 text-muted-foreground">
                      <p>
                        Next service:{' '}
                        <span className="text-green-400 font-medium">
                          {formatToUKDate(calculateNextServiceISO(formData.commissioningDate))}
                        </span>{' '}
                        (6 months)
                      </p>
                      <p>
                        Next inspection:{' '}
                        <span className="text-blue-400 font-medium">
                          {formatToUKDate(calculateNextInspectionISO(formData.commissioningDate))}
                        </span>{' '}
                        (12 months)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Handover Documentation */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.handover} onOpenChange={() => toggleSection('handover')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <FileCheck className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Handover Documentation</h3>
                  <span className="text-xs text-muted-foreground">Checklist items</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
                    openSections.handover && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <FileCheck className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold">Handover Documentation Checklist</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white/40 transition-transform',
                    openSections.handover && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'asBuiltDrawings', label: 'As-built drawings' },
                  { id: 'operationManual', label: 'O&M manual' },
                  { id: 'maintenanceLog', label: 'Maintenance log book' },
                  { id: 'zoneChart', label: 'Zone chart/plan' },
                  { id: 'causeEffectMatrix', label: 'Cause & effect matrix' },
                  { id: 'trainingProvided', label: 'User training' },
                ].map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      'flex items-center gap-3 h-12 px-4 rounded-lg cursor-pointer transition-colors',
                      handover[item.id]
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-black/30 border border-white/10 hover:border-white/20'
                    )}
                    onClick={() => updateHandover(item.id, !handover[item.id])}
                  >
                    <Checkbox
                      id={item.id}
                      checked={handover[item.id] || false}
                      onCheckedChange={(checked) => updateHandover(item.id, checked as boolean)}
                      className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white h-5 w-5 shrink-0"
                    />
                    <Label
                      htmlFor={item.id}
                      className={cn(
                        'cursor-pointer text-sm font-medium',
                        handover[item.id] ? 'text-green-300' : 'text-foreground'
                      )}
                    >
                      {item.label}
                    </Label>
                    {handover[item.id] && (
                      <CheckCircle2 className="h-4 w-4 text-green-400 ml-auto shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Previous Defects - Only show for periodic testing */}
      {formData.certificateType === 'periodic' && (
        <div className={cn(isMobile ? '' : 'eicr-section-card')}>
          <Collapsible
            open={openSections.previousDefects}
            onOpenChange={() => toggleSection('previousDefects')}
          >
            <CollapsibleTrigger className="w-full">
              {isMobile ? (
                <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                    <History className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-foreground">Previous Defects</h3>
                    <span className="text-xs text-muted-foreground">
                      {(formData.previousDefects || []).length} from previous cert
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 text-muted-foreground transition-transform shrink-0',
                      openSections.previousDefects && 'rotate-180'
                    )}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
                      <History className="h-4 w-4 text-amber-400" />
                    </div>
                    <span className="text-white font-semibold">Previous Defects Status</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 text-white/40 transition-transform',
                      openSections.previousDefects && 'rotate-180'
                    )}
                  />
                </div>
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
                <p className="text-xs text-muted-foreground">
                  Record the status of defects identified in the previous certificate.
                </p>

                {(formData.previousDefects || []).map((defect: any, index: number) => (
                  <div
                    key={defect.id}
                    className="border border-white/10 rounded-xl overflow-hidden"
                  >
                    {/* Header */}
                    <div
                      className={cn(
                        'flex items-center justify-between px-4 py-3',
                        defect.status === 'outstanding' &&
                          'bg-red-500/10 border-b border-red-500/20',
                        defect.status === 'rectified' &&
                          'bg-green-500/10 border-b border-green-500/20',
                        defect.status === 'no-longer-applicable' &&
                          'bg-gray-500/10 border-b border-gray-500/20'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold',
                            defect.status === 'outstanding' && 'bg-red-500/20 text-red-400',
                            defect.status === 'rectified' && 'bg-green-500/20 text-green-400',
                            defect.status === 'no-longer-applicable' &&
                              'bg-gray-500/20 text-gray-400'
                          )}
                        >
                          {index + 1}
                        </div>
                        <span className="font-medium text-foreground text-sm">
                          Previous Defect #{index + 1}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePreviousDefect(defect.id)}
                        className="h-11 w-11 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10 touch-manipulation active:scale-[0.98] transition-transform"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Body */}
                    <div className="p-4 space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">
                          Original Defect Description
                        </Label>
                        <Textarea
                          placeholder="Description from previous certificate..."
                          value={defect.description || ''}
                          onChange={(e) =>
                            updatePreviousDefect(defect.id, 'description', e.target.value)
                          }
                          className="text-base touch-manipulation min-h-[60px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">Original Date</Label>
                          <Input
                            type="date"
                            value={defect.originalDate || ''}
                            onChange={(e) =>
                              updatePreviousDefect(defect.id, 'originalDate', e.target.value)
                            }
                            className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">Current Status</Label>
                          <Select
                            value={defect.status || 'outstanding'}
                            onValueChange={(v) => updatePreviousDefect(defect.id, 'status', v)}
                          >
                            <SelectTrigger
                              className={cn(
                                'h-11 touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow',
                                defect.status === 'rectified' &&
                                  'bg-green-500/10 border-green-500/30',
                                defect.status === 'outstanding' &&
                                  'bg-red-500/10 border-red-500/30',
                                defect.status === 'no-longer-applicable' &&
                                  'bg-gray-500/10 border-gray-500/30'
                              )}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="z-[100] bg-elec-gray border-white/20 text-foreground">
                              <SelectItem value="outstanding">
                                <span className="text-red-400 font-medium">Outstanding</span>
                              </SelectItem>
                              <SelectItem value="rectified">
                                <span className="text-green-400 font-medium">Rectified</span>
                              </SelectItem>
                              <SelectItem value="no-longer-applicable">
                                <span className="text-gray-400 font-medium">
                                  No Longer Applicable
                                </span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Notes</Label>
                        <Textarea
                          placeholder="Any notes about rectification or current status..."
                          value={defect.notes || ''}
                          onChange={(e) => updatePreviousDefect(defect.id, 'notes', e.target.value)}
                          className="text-base touch-manipulation min-h-[60px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full h-11 touch-manipulation border-dashed border-white/20 hover:border-amber-500 hover:bg-amber-500/10"
                  onClick={addPreviousDefect}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Previous Defect
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Defects Found */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.defects} onOpenChange={() => toggleSection('defects')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Defects & Observations</h3>
                  <span className="text-xs text-muted-foreground">
                    {(formData.defectsFound || []).length} recorded
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
                    openSections.defects && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-white font-semibold">Defects & Observations</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white/40 transition-transform',
                    openSections.defects && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              {(formData.defectsFound || []).map((defect: any, index: number) => (
                <div key={defect.id} className="border border-white/10 rounded-xl overflow-hidden">
                  {/* Defect Header */}
                  <div
                    className={cn(
                      'flex items-center justify-between px-4 py-3',
                      defect.severity === 'critical' && 'bg-red-500/10 border-b border-red-500/20',
                      defect.severity === 'non-critical' &&
                        'bg-amber-500/10 border-b border-amber-500/20',
                      defect.severity === 'recommendation' &&
                        'bg-blue-500/10 border-b border-blue-500/20',
                      !defect.severity && 'bg-amber-500/10 border-b border-amber-500/20'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold',
                          defect.severity === 'critical' && 'bg-red-500/20 text-red-400',
                          defect.severity === 'non-critical' && 'bg-amber-500/20 text-amber-400',
                          defect.severity === 'recommendation' && 'bg-blue-500/20 text-blue-400',
                          !defect.severity && 'bg-amber-500/20 text-amber-400'
                        )}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <span className="font-medium text-foreground text-sm">
                          Defect #{index + 1}
                        </span>
                        <span
                          className={cn(
                            'ml-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                            defect.severity === 'critical' && 'bg-red-500/20 text-red-400',
                            defect.severity === 'non-critical' && 'bg-amber-500/20 text-amber-400',
                            defect.severity === 'recommendation' && 'bg-blue-500/20 text-blue-400',
                            !defect.severity && 'bg-amber-500/20 text-amber-400'
                          )}
                        >
                          {defect.severity || 'Non-Critical'}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDefect(defect.id)}
                      className="h-11 w-11 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10 touch-manipulation active:scale-[0.98] transition-transform"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Defect Body */}
                  <div className="p-4 space-y-4">
                    {/* Description */}
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Description</Label>
                      <Textarea
                        placeholder="Describe the defect or observation..."
                        value={defect.description || ''}
                        onChange={(e) => handleDefectDescriptionChange(defect.id, e.target.value)}
                        className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                      {defect.description && defect.description.length > 10 && (
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Lightbulb className="h-3 w-3 text-elec-yellow" />
                          Severity auto-suggested based on description
                        </p>
                      )}
                    </div>

                    {/* Severity & Rectified Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Severity</Label>
                        <Select
                          value={defect.severity || 'non-critical'}
                          onValueChange={(v) => updateDefect(defect.id, 'severity', v)}
                        >
                          <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-elec-gray border-white/20 text-foreground">
                            <SelectItem value="critical">
                              <span className="text-red-400 font-medium">Critical</span>
                            </SelectItem>
                            <SelectItem value="non-critical">
                              <span className="text-amber-400 font-medium">Non-Critical</span>
                            </SelectItem>
                            <SelectItem value="recommendation">
                              <span className="text-blue-400 font-medium">Recommendation</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Status</Label>
                        <Select
                          value={defect.rectified ? 'rectified' : 'outstanding'}
                          onValueChange={(v) => {
                            updateDefect(defect.id, 'rectified', v === 'rectified');
                            if (v === 'rectified' && !defect.rectificationDate) {
                              updateDefect(
                                defect.id,
                                'rectificationDate',
                                new Date().toISOString().split('T')[0]
                              );
                            }
                          }}
                        >
                          <SelectTrigger
                            className={cn(
                              'h-11 touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow',
                              defect.rectified
                                ? 'bg-green-500/10 border-green-500/30'
                                : 'bg-elec-gray'
                            )}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-elec-gray border-white/20 text-foreground">
                            <SelectItem value="outstanding">
                              <span className="text-amber-400 font-medium">Outstanding</span>
                            </SelectItem>
                            <SelectItem value="rectified">
                              <span className="text-green-400 font-medium">Rectified</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {defect.rectified && (
                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Rectification Date</Label>
                        <Input
                          type="date"
                          value={defect.rectificationDate || ''}
                          onChange={(e) =>
                            updateDefect(defect.id, 'rectificationDate', e.target.value)
                          }
                          className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                        />
                      </div>
                    )}

                    {/* Photo Section */}
                    <div className="flex items-start gap-4">
                      {defect.photoUrl ? (
                        <div className="relative">
                          <img
                            src={defect.photoUrl}
                            alt="Defect photo"
                            className="h-20 w-20 rounded-lg border border-white/20 object-cover"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateDefect(defect.id, 'photoUrl', '')}
                            className="absolute -top-2 -right-2 h-11 w-11 p-0 rounded-full bg-red-500 hover:bg-red-600 text-white touch-manipulation"
                            aria-label="Remove photo"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={(e) => handleDefectPhotoUpload(defect.id, e)}
                            className="hidden"
                            id={`photo-${defect.id}`}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-11 px-4 touch-manipulation border-white/20 hover:border-elec-yellow hover:bg-elec-yellow/10"
                            onClick={() => document.getElementById(`photo-${defect.id}`)?.click()}
                          >
                            <Camera className="h-4 w-4 mr-2" />
                            Add Photo
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full h-11 touch-manipulation border-dashed border-white/20 hover:border-elec-yellow hover:bg-elec-yellow/10"
                onClick={addDefect}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Defect/Observation
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Declarations */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible
          open={openSections.declarations}
          onOpenChange={() => toggleSection('declarations')}
        >
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Declarations & Signatures</h3>
                  <span className="text-xs text-muted-foreground">Installer & Commissioner</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
                    openSections.declarations && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <User className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white font-semibold">Declarations & Signatures</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white/40 transition-transform',
                    openSections.declarations && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-6', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              {/* Use Saved Profile Button */}
              {getDefaultProfile() && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => loadProfileToSection('installer')}
                    className="h-10 touch-manipulation border-white/20 hover:border-elec-yellow hover:bg-elec-yellow/10"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Apply Profile to Installer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => loadProfileToSection('commissioner')}
                    className="h-10 touch-manipulation border-white/20 hover:border-elec-yellow hover:bg-elec-yellow/10"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Apply Profile to Commissioner
                  </Button>
                </div>
              )}

              {/* Designer Declaration (optional) */}
              <div className="bg-black/40 rounded-xl p-4">
                <h4 className="text-sm font-semibold mb-4 text-white/80">
                  Designer Declaration (if applicable)
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Designer Name</Label>
                      <Input
                        placeholder="Full name"
                        value={formData.designerName || ''}
                        onChange={(e) => onUpdate('designerName', e.target.value)}
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        placeholder="Company name"
                        value={formData.designerCompany || ''}
                        onChange={(e) => onUpdate('designerCompany', e.target.value)}
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Qualifications</Label>
                      <Input
                        placeholder="e.g., FIA, BAFE"
                        value={formData.designerQualifications || ''}
                        onChange={(e) => onUpdate('designerQualifications', e.target.value)}
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={formData.designerDate || ''}
                        onChange={(e) => onUpdate('designerDate', e.target.value)}
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                  </div>
                  <SignatureInput
                    label="Designer Signature"
                    value={formData.designerSignature}
                    onChange={(sig) => onUpdate('designerSignature', sig)}
                    placeholder="Draw or type signature"
                  />
                </div>
              </div>

              {/* Installer Declaration */}
              <div
                className={cn(
                  'bg-black/40 rounded-xl p-4',
                  !isComplete.installer && 'ring-1 ring-amber-500/30'
                )}
              >
                <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  Installer Declaration *
                  {isComplete.installer && <CheckCircle2 className="h-4 w-4 text-green-400" />}
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Installer Name *</Label>
                      <Input
                        placeholder="Full name"
                        value={formData.installerName || ''}
                        onChange={(e) => onUpdate('installerName', e.target.value)}
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        placeholder="Company name"
                        value={formData.installerCompany || ''}
                        onChange={(e) => onUpdate('installerCompany', e.target.value)}
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Qualifications</Label>
                      <Input
                        placeholder="e.g., FIA, BAFE accredited"
                        value={formData.installerQualifications || ''}
                        onChange={(e) => onUpdate('installerQualifications', e.target.value)}
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={formData.installerDate || new Date().toISOString().split('T')[0]}
                        onChange={(e) => onUpdate('installerDate', e.target.value)}
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                  </div>
                  <SignatureInput
                    label="Installer Signature *"
                    value={formData.installerSignature}
                    onChange={(sig) => onUpdate('installerSignature', sig)}
                    placeholder="Draw or type signature"
                    required
                  />
                </div>
              </div>

              {/* Commissioner Declaration */}
              <div
                className={cn(
                  'bg-black/40 rounded-xl p-4',
                  !isComplete.commissioner && 'ring-1 ring-amber-500/30'
                )}
              >
                <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  Commissioner Declaration *
                  {isComplete.commissioner && <CheckCircle2 className="h-4 w-4 text-green-400" />}
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <Checkbox
                      id="sameAsInstaller"
                      checked={formData.sameAsInstaller || false}
                      onCheckedChange={(checked) => {
                        onUpdate('sameAsInstaller', checked);
                        if (checked) {
                          onUpdate('commissionerName', formData.installerName);
                          onUpdate('commissionerCompany', formData.installerCompany);
                          onUpdate('commissionerQualifications', formData.installerQualifications);
                          onUpdate('commissionerDate', formData.installerDate);
                          onUpdate('commissionerSignature', formData.installerSignature);
                        }
                      }}
                      className="border-blue-400/40 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 mt-0.5"
                    />
                    <Label
                      htmlFor="sameAsInstaller"
                      className="text-sm cursor-pointer leading-relaxed"
                    >
                      Same person as Installer
                    </Label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Commissioner Name *</Label>
                      <Input
                        placeholder="Full name"
                        value={formData.commissionerName || ''}
                        onChange={(e) => onUpdate('commissionerName', e.target.value)}
                        disabled={formData.sameAsInstaller}
                        className={cn(
                          'h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow',
                          formData.sameAsInstaller && 'opacity-50'
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        placeholder="Company name"
                        value={formData.commissionerCompany || ''}
                        onChange={(e) => onUpdate('commissionerCompany', e.target.value)}
                        disabled={formData.sameAsInstaller}
                        className={cn(
                          'h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow',
                          formData.sameAsInstaller && 'opacity-50'
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Qualifications</Label>
                      <Input
                        placeholder="e.g., FIA, BAFE accredited"
                        value={formData.commissionerQualifications || ''}
                        onChange={(e) => onUpdate('commissionerQualifications', e.target.value)}
                        disabled={formData.sameAsInstaller}
                        className={cn(
                          'h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow',
                          formData.sameAsInstaller && 'opacity-50'
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={formData.commissionerDate || new Date().toISOString().split('T')[0]}
                        onChange={(e) => onUpdate('commissionerDate', e.target.value)}
                        disabled={formData.sameAsInstaller}
                        className={cn(
                          'h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow',
                          formData.sameAsInstaller && 'opacity-50'
                        )}
                      />
                    </div>
                  </div>
                  <div className={formData.sameAsInstaller ? 'opacity-50 pointer-events-none' : ''}>
                    <SignatureInput
                      label="Commissioner Signature *"
                      value={formData.commissionerSignature}
                      onChange={(sig) => onUpdate('commissionerSignature', sig)}
                      placeholder="Draw or type signature"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Certification & Next Service */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible
          open={openSections.certification}
          onOpenChange={() => toggleSection('certification')}
        >
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Certification & Service</h3>
                  <span className="text-xs text-muted-foreground">Result & next due dates</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
                    openSections.certification && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white font-semibold">Certification & Service Schedule</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white/40 transition-transform',
                    openSections.certification && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div className="space-y-2">
                <Label>Overall Result</Label>
                <Select
                  value={formData.overallResult || ''}
                  onValueChange={(v) => onUpdate('overallResult', v)}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-background border-border text-foreground">
                    <SelectItem value="satisfactory">
                      <span className="flex items-center gap-2 text-green-400">
                        <CheckCircle2 className="h-4 w-4" /> Satisfactory
                      </span>
                    </SelectItem>
                    <SelectItem value="unsatisfactory">
                      <span className="flex items-center gap-2 text-red-400">
                        <AlertTriangle className="h-4 w-4" /> Unsatisfactory
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Next Service Due</Label>
                  <Input
                    type="date"
                    value={formData.nextServiceDue || ''}
                    onChange={(e) => onUpdate('nextServiceDue', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                  <p className="text-xs text-muted-foreground">
                    BS 5839 recommends 6-monthly service
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Next Inspection Due</Label>
                  <Input
                    type="date"
                    value={formData.nextInspectionDue || ''}
                    onChange={(e) => onUpdate('nextInspectionDue', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                  <p className="text-xs text-muted-foreground">Annual inspection recommended</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea
                  placeholder="Any additional notes, recommendations, or comments..."
                  value={formData.additionalNotes || ''}
                  onChange={(e) => onUpdate('additionalNotes', e.target.value)}
                  className="text-base touch-manipulation min-h-[100px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Final Status */}
      <div className={cn(isMobile ? 'px-4 pb-4' : '')}>
        {isComplete.installer && isComplete.commissioner ? (
          <Alert className="border-green-500/30 bg-green-500/10">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200 text-xs sm:text-sm">
              <strong>Certificate ready for generation.</strong> All required declarations have been
              completed.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="border-amber-500/30 bg-amber-500/10">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-amber-200 text-xs sm:text-sm">
              <strong>Incomplete declarations.</strong> Both Installer and Commissioner declarations
              must be completed with signatures before the certificate can be generated.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default FireAlarmDeclarations;
