import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, TestTube, Clock, AlertTriangle, Plus, Trash2, CheckCircle2, XCircle, Lightbulb, Calendar, Sparkles, Camera, Sun, Upload, Loader2, X } from 'lucide-react';
import { EmergencyLightingPhotos } from './EmergencyLightingPhotos';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';
import ValidationBadge, { BatteryConditionBadge } from './ValidationBadge';
import type { ZoneCategory } from '@/data/emergencyLightingCompliance';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

interface EmergencyLightingTestResultsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

type TestResult = 'pass' | 'fail' | 'na' | '';

const TestResultBadge: React.FC<{ result: TestResult }> = ({ result }) => {
  if (result === 'pass') return <span className="text-green-500 flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Pass</span>;
  if (result === 'fail') return <span className="text-red-500 flex items-center gap-1"><XCircle className="h-4 w-4" /> Fail</span>;
  return <span className="text-muted-foreground">Not tested</span>;
};

const EmergencyLightingTestResults: React.FC<EmergencyLightingTestResultsProps> = ({
  formData,
  onUpdate,
}) => {
  const isMobile = useIsMobile();
  const { calculateTestDates, suggestDefectPriority, formatDate, validateLux, getLuxRequirement } = useEmergencyLightingSmartForm();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    monthly: true,
    annual: true,
    luminaires: true,
    luxReadings: true,
    defects: true,
    photos: true,
  });

  // Calculate next test dates when test dates change
  const monthlyTestDate = formData.monthlyFunctionalTest?.date;
  const annualTestDate = formData.annualDurationTest?.date;

  const nextTestDates = monthlyTestDate || annualTestDate
    ? calculateTestDates(monthlyTestDate || null, annualTestDate || null)
    : null;

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateMonthlyTest = (field: string, value: any) => {
    const current = formData.monthlyFunctionalTest || {};
    onUpdate('monthlyFunctionalTest', { ...current, [field]: value });
  };

  const updateAnnualTest = (field: string, value: any) => {
    const current = formData.annualDurationTest || {};
    onUpdate('annualDurationTest', { ...current, [field]: value });
  };

  const monthlyTest = formData.monthlyFunctionalTest || {};
  const annualTest = formData.annualDurationTest || {};

  // Defects management
  const addDefect = () => {
    const defects = formData.defectsFound || [];
    const newDefect = {
      id: `defect-${Date.now()}`,
      description: '',
      priority: 'within-28-days' as const,
      luminaireId: '', // Link to specific luminaire
      rectified: false,
      rectificationDate: '',
    };
    onUpdate('defectsFound', [...defects, newDefect]);
  };

  const updateDefect = (id: string, field: string, value: any) => {
    const defects = formData.defectsFound || [];
    const updatedDefects = defects.map((d: any) =>
      d.id === id ? { ...d, [field]: value } : d
    );
    onUpdate('defectsFound', updatedDefects);
  };

  // Auto-suggest priority when defect description changes
  const handleDefectDescriptionChange = useCallback((id: string, description: string) => {
    const defects = formData.defectsFound || [];
    const suggestion = suggestDefectPriority(description);

    // Map the suggestion priority format to form priority format
    const priorityMap: Record<string, string> = {
      'immediate': 'immediate',
      '7-days': 'within-7-days',
      '28-days': 'within-28-days',
      'recommendation': 'recommendation'
    };
    const mappedPriority = suggestion?.priority ? priorityMap[suggestion.priority] : null;

    const updatedDefects = defects.map((d: any) =>
      d.id === id
        ? { ...d, description, priority: mappedPriority || d.priority }
        : d
    );
    onUpdate('defectsFound', updatedDefects);
  }, [formData.defectsFound, onUpdate, suggestDefectPriority]);

  const removeDefect = (id: string) => {
    const defects = formData.defectsFound || [];
    onUpdate('defectsFound', defects.filter((d: any) => d.id !== id));
  };

  // Defect photo upload
  const [uploadingDefectId, setUploadingDefectId] = useState<string | null>(null);
  const defectPhotoInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const compressImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 1200;
          const maxHeight = 900;
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) { reject(new Error('Failed to get canvas context')); return; }
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => blob ? resolve(blob) : reject(new Error('Failed to compress')),
            'image/jpeg',
            0.8
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleDefectPhotoUpload = async (defectId: string, file: File) => {
    setUploadingDefectId(defectId);
    try {
      const compressed = await compressImage(file);
      const fileExt = 'jpg';
      const fileName = `defect-${defectId}-${uuidv4()}.${fileExt}`;
      const filePath = `emergency-lighting/${formData.certificateNumber || 'draft'}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('inspection-photos')
        .upload(filePath, compressed, { contentType: 'image/jpeg', upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('inspection-photos')
        .getPublicUrl(filePath);

      // Update defect with photo URL
      const defects = formData.defectsFound || [];
      const updatedDefects = defects.map((d: any) =>
        d.id === defectId ? { ...d, photoUrl: publicUrl } : d
      );
      onUpdate('defectsFound', updatedDefects);

      // Also add to photos array with defect link
      const photos = formData.photos || [];
      const newPhoto = {
        id: uuidv4(),
        url: publicUrl,
        caption: `Defect: ${defects.find((d: any) => d.id === defectId)?.description?.substring(0, 50) || 'Evidence'}`,
        uploadedAt: new Date().toISOString(),
        category: 'defect' as const,
        linkedItemId: defectId,
      };
      onUpdate('photos', [...photos, newPhoto]);

      toast.success('Photo uploaded');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload photo');
    } finally {
      setUploadingDefectId(null);
    }
  };

  const removeDefectPhoto = (defectId: string) => {
    const defects = formData.defectsFound || [];
    const updatedDefects = defects.map((d: any) =>
      d.id === defectId ? { ...d, photoUrl: '' } : d
    );
    onUpdate('defectsFound', updatedDefects);
    // Also remove from photos array
    const photos = formData.photos || [];
    onUpdate('photos', photos.filter((p: any) => p.linkedItemId !== defectId || p.category !== 'defect'));
  };

  // Update luminaire test results
  const updateLuminaireTest = (lumId: string, field: string, value: any) => {
    const luminaires = formData.luminaires || [];
    const updatedLuminaires = luminaires.map((lum: any) =>
      lum.id === lumId ? { ...lum, [field]: value } : lum
    );
    onUpdate('luminaires', updatedLuminaires);
  };

  // Lux readings management
  const addLuxReading = () => {
    const readings = formData.luxReadings || [];
    const newReading = {
      id: `lux-${Date.now()}`,
      location: '',
      luxReading: '',
      minRequired: '',
      result: '' as const,
    };
    onUpdate('luxReadings', [...readings, newReading]);
  };

  const updateLuxReading = (id: string, field: string, value: any) => {
    const readings = formData.luxReadings || [];
    const updatedReadings = readings.map((r: any) =>
      r.id === id ? { ...r, [field]: value } : r
    );
    onUpdate('luxReadings', updatedReadings);
  };

  const removeLuxReading = (id: string) => {
    const readings = formData.luxReadings || [];
    onUpdate('luxReadings', readings.filter((r: any) => r.id !== id));
  };

  // Auto-validate lux reading when value changes
  const handleLuxValueChange = useCallback((id: string, luxValue: string, category: string) => {
    const readings = formData.luxReadings || [];
    const numericLux = parseFloat(luxValue);

    let result: 'pass' | 'fail' | '' = '';
    let minRequired = '';

    if (!isNaN(numericLux) && category) {
      const requirement = getLuxRequirement(category as ZoneCategory);
      if (requirement) {
        minRequired = `${requirement.minLux} lux`;
        result = numericLux >= requirement.minLux ? 'pass' : 'fail';
      }
    }

    const updatedReadings = readings.map((r: any) =>
      r.id === id
        ? { ...r, luxReading: luxValue, minRequired, result }
        : r
    );
    onUpdate('luxReadings', updatedReadings);
  }, [formData.luxReadings, onUpdate, getLuxRequirement]);

  return (
    <div className={cn(isMobile ? "space-y-0" : "space-y-6")}>
      {/* Monthly Functional Test */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.monthly} onOpenChange={() => toggleSection('monthly')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <TestTube className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Monthly Functional Test</h3>
                  <span className="text-xs text-muted-foreground">Flick test results</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.monthly && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <TestTube className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold">Monthly Functional Test</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.monthly && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <p className="text-sm text-muted-foreground">
                BS 5266 requires monthly "flick test" - briefly simulate mains failure to verify luminaires illuminate.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyDate">Test Date</Label>
                  <Input
                    id="monthlyDate"
                    type="date"
                    value={monthlyTest.date || ''}
                    onChange={(e) => updateMonthlyTest('date', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                {nextTestDates && monthlyTest.date && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-blue-400" />
                      Next Monthly Test Due
                    </Label>
                    <div className="h-11 flex items-center px-3 bg-blue-500/10 border border-blue-500/30 rounded-md text-blue-300">
                      {formatDate(nextTestDates.nextMonthlyTest)}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <Checkbox
                    id="allLuminairesOperational"
                    checked={monthlyTest.allLuminairesOperational || false}
                    onCheckedChange={(checked) => updateMonthlyTest('allLuminairesOperational', checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <Label htmlFor="allLuminairesOperational" className="cursor-pointer text-base">
                      All luminaires illuminate correctly on simulated mains failure
                    </Label>
                    {monthlyTest.date && (
                      <ValidationBadge
                        status={monthlyTest.allLuminairesOperational ? 'pass' : 'fail'}
                        message={monthlyTest.allLuminairesOperational
                          ? 'All luminaires operational'
                          : 'One or more luminaires failed to illuminate'}
                        reference="BS 5266-1:2016 Clause 12.2"
                        size="sm"
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <Checkbox
                    id="chargingIndicatorsNormal"
                    checked={monthlyTest.chargingIndicatorsNormal || false}
                    onCheckedChange={(checked) => updateMonthlyTest('chargingIndicatorsNormal', checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <Label htmlFor="chargingIndicatorsNormal" className="cursor-pointer text-base">
                      All charging indicators show normal operation
                    </Label>
                    {monthlyTest.date && (
                      <ValidationBadge
                        status={monthlyTest.chargingIndicatorsNormal ? 'pass' : 'warning'}
                        message={monthlyTest.chargingIndicatorsNormal
                          ? 'Charging systems functioning correctly'
                          : 'Check charging circuit and battery connections'}
                        reference="BS 5266-1:2016 Clause 12.2.1"
                        size="sm"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyFaults">Faults Found</Label>
                <Textarea
                  id="monthlyFaults"
                  placeholder="Describe any faults found during the test..."
                  value={monthlyTest.faultsFound || ''}
                  onChange={(e) => updateMonthlyTest('faultsFound', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyAction">Action Taken</Label>
                <Textarea
                  id="monthlyAction"
                  placeholder="Describe any remedial action taken..."
                  value={monthlyTest.actionTaken || ''}
                  onChange={(e) => updateMonthlyTest('actionTaken', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Annual Duration Test */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.annual} onOpenChange={() => toggleSection('annual')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Annual Duration Test</h3>
                  <span className="text-xs text-muted-foreground">Full rated duration</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.annual && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white font-semibold">Annual Duration Test</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.annual && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <p className="text-sm text-muted-foreground">
                BS 5266 requires annual full-duration test - run luminaires for rated duration (1hr or 3hr) and verify operation throughout.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="annualDate">Test Date</Label>
                  <Input
                    id="annualDate"
                    type="date"
                    value={annualTest.date || ''}
                    onChange={(e) => updateAnnualTest('date', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualDuration">Duration Tested (minutes)</Label>
                  <Input
                    id="annualDuration"
                    type="number"
                    min="0"
                    placeholder="e.g., 180"
                    value={annualTest.duration || ''}
                    onChange={(e) => updateAnnualTest('duration', parseInt(e.target.value) || 0)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              {nextTestDates && annualTest.date && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-green-300">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Next Annual Duration Test Due:</span>
                    <span>{formatDate(nextTestDates.nextAnnualTest)}</span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <Checkbox
                    id="annualAllOperational"
                    checked={annualTest.allLuminairesOperational || false}
                    onCheckedChange={(checked) => updateAnnualTest('allLuminairesOperational', checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <Label htmlFor="annualAllOperational" className="cursor-pointer text-base">
                      All luminaires operated for full rated duration
                    </Label>
                    {annualTest.date && (
                      <ValidationBadge
                        status={annualTest.allLuminairesOperational ? 'pass' : 'fail'}
                        message={annualTest.allLuminairesOperational
                          ? 'All luminaires achieved rated duration'
                          : 'One or more luminaires failed duration test - battery replacement likely required'}
                        reference="BS 5266-1:2016 Clause 12.3"
                        size="sm"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="batteryCondition">Battery Condition</Label>
                  {annualTest.batteryCondition && (
                    <BatteryConditionBadge condition={annualTest.batteryCondition} />
                  )}
                </div>
                <Select
                  value={annualTest.batteryCondition || ''}
                  onValueChange={(value) => updateAnnualTest('batteryCondition', value)}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                    <SelectValue placeholder="Assess battery condition" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-background border-border text-foreground">
                    <SelectItem value="good">Good - Meets rated duration</SelectItem>
                    <SelectItem value="fair">Fair - Approaching end of life</SelectItem>
                    <SelectItem value="poor">Poor - Requires replacement</SelectItem>
                  </SelectContent>
                </Select>
                {annualTest.batteryCondition === 'poor' && (
                  <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Battery replacement required - add to defects list
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualFaults">Faults Found</Label>
                <Textarea
                  id="annualFaults"
                  placeholder="Describe any faults found during the duration test..."
                  value={annualTest.faultsFound || ''}
                  onChange={(e) => updateAnnualTest('faultsFound', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualAction">Action Taken</Label>
                <Textarea
                  id="annualAction"
                  placeholder="Describe any remedial action taken..."
                  value={annualTest.actionTaken || ''}
                  onChange={(e) => updateAnnualTest('actionTaken', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Individual Luminaire Results */}
      {(formData.luminaires || []).length > 0 && (
        <div className={cn(isMobile ? "" : "eicr-section-card")}>
          <Collapsible open={openSections.luminaires} onOpenChange={() => toggleSection('luminaires')}>
            <CollapsibleTrigger className="w-full">
              {isMobile ? (
                <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Lightbulb className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-foreground">Individual Luminaire Results</h3>
                    <span className="text-xs text-muted-foreground">{(formData.luminaires || []).length} luminaires</span>
                  </div>
                  <ChevronDown className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                    openSections.luminaires && "rotate-180"
                  )} />
                </div>
              ) : (
                <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
                      <Lightbulb className="h-4 w-4 text-amber-400" />
                    </div>
                    <span className="text-white font-semibold">Individual Luminaire Test Results</span>
                  </div>
                  <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.luminaires && "rotate-180")} />
                </div>
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className={cn(
                "space-y-3",
                isMobile ? "px-4 py-4" : "px-4 pb-4"
              )}>
                {(formData.luminaires || []).map((lum: any, index: number) => (
                  <div key={lum.id} className="p-3 bg-muted/30 rounded-lg">
                    {/* Luminaire info */}
                    <div className="mb-2">
                      <p className="font-medium">#{index + 1} {lum.location || 'Unknown location'}</p>
                      <p className="text-sm text-muted-foreground">{lum.luminaireType || 'Type not specified'}</p>
                    </div>
                    {/* Test results - grid layout for mobile */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Functional</Label>
                        <Select
                          value={lum.functionalTestResult || ''}
                          onValueChange={(v) => updateLuminaireTest(lum.id, 'functionalTestResult', v)}
                        >
                          <SelectTrigger className={cn(
                            "h-10 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow",
                            lum.functionalTestResult === 'pass' && "border-green-500/50 bg-green-500/10",
                            lum.functionalTestResult === 'fail' && "border-red-500/50 bg-red-500/10"
                          )}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-background border-border text-foreground">
                            <SelectItem value="pass">
                              <span className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Pass
                              </span>
                            </SelectItem>
                            <SelectItem value="fail">
                              <span className="flex items-center gap-2">
                                <XCircle className="h-4 w-4 text-red-500" />
                                Fail
                              </span>
                            </SelectItem>
                            <SelectItem value="na">N/A</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Duration</Label>
                        <Select
                          value={lum.durationTestResult || ''}
                          onValueChange={(v) => updateLuminaireTest(lum.id, 'durationTestResult', v)}
                        >
                          <SelectTrigger className={cn(
                            "h-10 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow",
                            lum.durationTestResult === 'pass' && "border-green-500/50 bg-green-500/10",
                            lum.durationTestResult === 'fail' && "border-red-500/50 bg-red-500/10"
                          )}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-background border-border text-foreground">
                            <SelectItem value="pass">
                              <span className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Pass
                              </span>
                            </SelectItem>
                            <SelectItem value="fail">
                              <span className="flex items-center gap-2">
                                <XCircle className="h-4 w-4 text-red-500" />
                                Fail
                              </span>
                            </SelectItem>
                            <SelectItem value="na">N/A</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Lux Readings (BS EN 1838 Compliance) */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.luxReadings} onOpenChange={() => toggleSection('luxReadings')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0">
                  <Sun className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Lux Readings</h3>
                  <span className="text-xs text-muted-foreground">BS EN 1838 compliance</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.luxReadings && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-yellow-500/15 flex items-center justify-center">
                    <Sun className="h-4 w-4 text-yellow-400" />
                  </div>
                  <span className="text-white font-semibold">Lux Readings (BS EN 1838)</span>
                  {(formData.luxReadings || []).length > 0 && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">
                      {(formData.luxReadings || []).length} readings
                    </span>
                  )}
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.luxReadings && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              {/* BS EN 1838 Requirements Info */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                <h4 className="font-medium text-yellow-200 text-sm mb-2">BS EN 1838 Minimum Illuminance Requirements:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">Escape Route: <strong className="text-foreground">≥1 lux</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-muted-foreground">Open Area: <strong className="text-foreground">≥0.5 lux</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-muted-foreground">High Risk: <strong className="text-foreground">≥15 lux</strong></span>
                  </div>
                </div>
              </div>

              {(formData.luxReadings || []).length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <Sun className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No lux readings recorded</p>
                  <p className="text-xs">Add readings to verify BS EN 1838 compliance</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {(formData.luxReadings || []).map((reading: any, index: number) => (
                    <div key={reading.id} className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-sm">Reading #{index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLuxReading(reading.id)}
                          className="h-8 w-8 p-0 text-red-400 hover:text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="col-span-2 sm:col-span-1 space-y-1">
                          <Label className="text-xs">Location</Label>
                          <Input
                            placeholder="e.g., Corridor A"
                            value={reading.location || ''}
                            onChange={(e) => updateLuxReading(reading.id, 'location', e.target.value)}
                            className="h-10 text-sm touch-manipulation border-white/30 focus:border-elec-yellow"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Zone Category</Label>
                          <Select
                            value={reading.category || ''}
                            onValueChange={(v) => {
                              updateLuxReading(reading.id, 'category', v);
                              // Re-validate with new category
                              if (reading.luxReading) {
                                handleLuxValueChange(reading.id, reading.luxReading, v);
                              }
                            }}
                          >
                            <SelectTrigger className="h-10 touch-manipulation bg-elec-gray border-white/30">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="z-[100] bg-background border-border text-foreground">
                              <SelectItem value="escape-route">Escape Route (≥1 lux)</SelectItem>
                              <SelectItem value="open-area">Open Area (≥0.5 lux)</SelectItem>
                              <SelectItem value="high-risk">High Risk (≥15 lux)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Lux Reading</Label>
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            placeholder="e.g., 1.5"
                            value={reading.luxReading || ''}
                            onChange={(e) => handleLuxValueChange(reading.id, e.target.value, reading.category || '')}
                            className={cn(
                              "h-10 text-sm touch-manipulation border-white/30 focus:border-elec-yellow",
                              reading.result === 'pass' && "border-green-500/50 bg-green-500/10",
                              reading.result === 'fail' && "border-red-500/50 bg-red-500/10"
                            )}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Result</Label>
                          <div className={cn(
                            "h-10 flex items-center justify-center rounded-md text-sm font-medium",
                            reading.result === 'pass' && "bg-green-500/20 text-green-400 border border-green-500/30",
                            reading.result === 'fail' && "bg-red-500/20 text-red-400 border border-red-500/30",
                            !reading.result && "bg-muted/50 text-muted-foreground border border-white/10"
                          )}>
                            {reading.result === 'pass' && (
                              <span className="flex items-center gap-1">
                                <CheckCircle2 className="h-4 w-4" /> PASS
                              </span>
                            )}
                            {reading.result === 'fail' && (
                              <span className="flex items-center gap-1">
                                <XCircle className="h-4 w-4" /> FAIL
                              </span>
                            )}
                            {!reading.result && '—'}
                          </div>
                        </div>
                      </div>
                      {reading.minRequired && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Minimum required: {reading.minRequired}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <Button
                variant="outline"
                className="w-full h-11 touch-manipulation border-dashed border-white/30"
                onClick={addLuxReading}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Lux Reading
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Defects Found */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.defects} onOpenChange={() => toggleSection('defects')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Defects & Observations</h3>
                  <span className="text-xs text-muted-foreground">{(formData.defectsFound || []).length} items</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.defects && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-white font-semibold">Defects & Observations</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.defects && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              {(formData.defectsFound || []).map((defect: any, defectIndex: number) => (
                <div key={defect.id} className="bg-muted/30 rounded-xl overflow-hidden">
                  {/* Header with delete - coloured bar */}
                  <div className={cn(
                    "flex items-center justify-between px-4 py-3",
                    defect.priority === 'immediate' ? "bg-red-500/20" :
                    defect.priority === 'within-7-days' ? "bg-orange-500/20" :
                    defect.priority === 'within-28-days' ? "bg-amber-500/20" :
                    defect.priority === 'recommendation' ? "bg-blue-500/20" :
                    "bg-white/5"
                  )}>
                    <h4 className="font-semibold text-base flex items-center gap-2">
                      <AlertTriangle className={cn(
                        "h-4 w-4",
                        defect.priority === 'immediate' ? "text-red-400" :
                        defect.priority === 'within-7-days' ? "text-orange-400" :
                        defect.priority === 'within-28-days' ? "text-amber-400" :
                        defect.priority === 'recommendation' ? "text-blue-400" :
                        "text-muted-foreground"
                      )} />
                      Defect #{defectIndex + 1}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDefect(defect.id)}
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Quick-tap common defects - 3 column grid */}
                    {!defect.description && (
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Tap to select common defect:</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { label: 'Failed functional test', icon: '⚡' },
                            { label: 'Low battery', icon: '🔋' },
                            { label: 'Charging fault', icon: '🔌' },
                            { label: 'Exit sign damaged', icon: '🚪' },
                            { label: 'Lens dirty/obscured', icon: '💡' },
                            { label: 'Missing luminaire', icon: '❌' }
                          ].map((quickDefect) => (
                            <button
                              key={quickDefect.label}
                              type="button"
                              onClick={() => handleDefectDescriptionChange(defect.id, quickDefect.label)}
                              className="h-11 px-3 text-sm bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg touch-manipulation transition-colors text-left flex items-center gap-2"
                            >
                              <span>{quickDefect.icon}</span>
                              <span className="truncate">{quickDefect.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Description - show when defect selected */}
                    {defect.description && (
                      <div className="space-y-2">
                        <Label className="text-sm">Description</Label>
                        <Textarea
                          placeholder="Add more details..."
                          value={defect.description || ''}
                          onChange={(e) => handleDefectDescriptionChange(defect.id, e.target.value)}
                          className="text-base touch-manipulation min-h-[60px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                        />
                      </div>
                    )}

                    {/* Priority - Horizontal scroll on mobile */}
                    <div className="space-y-2">
                      <Label className="text-sm flex items-center gap-2">
                        Priority
                        {defect.description && (
                          <span className="text-xs text-elec-yellow flex items-center gap-1 bg-elec-yellow/10 px-2 py-0.5 rounded-full">
                            <Sparkles className="h-3 w-3" />
                            Auto
                          </span>
                        )}
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { value: 'immediate', label: 'Immediate', shortLabel: 'Now', color: 'red' },
                          { value: 'within-7-days', label: '7 Days', shortLabel: '7d', color: 'orange' },
                          { value: 'within-28-days', label: '28 Days', shortLabel: '28d', color: 'amber' },
                          { value: 'recommendation', label: 'Recommend', shortLabel: 'Rec', color: 'blue' },
                        ].map((priority) => (
                          <button
                            key={priority.value}
                            type="button"
                            onClick={() => updateDefect(defect.id, 'priority', priority.value)}
                            className={cn(
                              "h-10 px-4 rounded-full border text-sm font-medium touch-manipulation transition-all flex items-center gap-2",
                              defect.priority === priority.value
                                ? priority.color === 'red' ? "bg-red-500/30 border-red-500 text-red-300"
                                : priority.color === 'orange' ? "bg-orange-500/30 border-orange-500 text-orange-300"
                                : priority.color === 'amber' ? "bg-amber-500/30 border-amber-500 text-amber-300"
                                : "bg-blue-500/30 border-blue-500 text-blue-300"
                                : "bg-white/5 border-white/20 text-muted-foreground hover:bg-white/10"
                            )}
                          >
                            <span className={cn(
                              "w-2 h-2 rounded-full shrink-0",
                              priority.color === 'red' ? "bg-red-500"
                              : priority.color === 'orange' ? "bg-orange-500"
                              : priority.color === 'amber' ? "bg-amber-500"
                              : "bg-blue-500"
                            )} />
                            {priority.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Link to luminaire & Rectified - Side by side on larger screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Link to luminaire */}
                      {(formData.luminaires || []).length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-xs flex items-center gap-1 text-muted-foreground">
                            <Lightbulb className="h-3 w-3 text-amber-400" />
                            Link to Luminaire
                          </Label>
                          <Select
                            value={defect.luminaireId || 'general'}
                            onValueChange={(v) => updateDefect(defect.id, 'luminaireId', v === 'general' ? '' : v)}
                          >
                            <SelectTrigger className="h-10 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow text-sm">
                              <SelectValue placeholder="General" />
                            </SelectTrigger>
                            <SelectContent className="z-[100] bg-background border-border text-foreground max-h-60">
                              <SelectItem value="general">General (not specific)</SelectItem>
                              {(formData.luminaires || []).map((lum: any, index: number) => (
                                <SelectItem key={lum.id} value={lum.id}>
                                  #{index + 1} - {lum.location || 'Unknown'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Rectified checkbox */}
                      <div
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border touch-manipulation cursor-pointer transition-colors h-fit",
                          defect.rectified
                            ? "bg-green-500/15 border-green-500/50"
                            : "bg-white/5 border-white/20 hover:bg-white/10"
                        )}
                        onClick={() => updateDefect(defect.id, 'rectified', !defect.rectified)}
                      >
                        <Checkbox
                          id={`rectified-${defect.id}`}
                          checked={defect.rectified || false}
                          onCheckedChange={(checked) => updateDefect(defect.id, 'rectified', checked)}
                          className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
                        />
                        <div className="flex-1 min-w-0">
                          <Label htmlFor={`rectified-${defect.id}`} className="text-sm font-medium cursor-pointer">
                            Rectified on site
                          </Label>
                        </div>
                        {defect.rectified && <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />}
                      </div>
                    </div>

                    {/* Photo Evidence for this defect */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <Label className="text-xs flex items-center gap-1 text-muted-foreground">
                        <Camera className="h-3 w-3 text-purple-400" />
                        Photo Evidence
                      </Label>
                      {defect.photoUrl ? (
                        <div className="relative">
                          <img
                            src={defect.photoUrl}
                            alt="Defect evidence"
                            className="w-full h-32 object-cover rounded-lg border border-white/20"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDefectPhoto(defect.id)}
                            className="absolute top-2 right-2 h-7 w-7 p-0 bg-black/60 hover:bg-red-500/80 rounded-full"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            ref={(el) => { defectPhotoInputRefs.current[defect.id] = el; }}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleDefectPhotoUpload(defect.id, file);
                            }}
                            className="hidden"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => defectPhotoInputRefs.current[defect.id]?.click()}
                            disabled={uploadingDefectId === defect.id}
                            className="w-full h-10 border-dashed border-white/30 text-muted-foreground"
                          >
                            {uploadingDefectId === defect.id ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Camera className="h-4 w-4 mr-2" />
                                Add Photo
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full h-11 touch-manipulation border-dashed border-white/30"
                onClick={addDefect}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Defect/Observation
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Photo Evidence */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.photos} onOpenChange={() => toggleSection('photos')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Camera className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Photo Evidence</h3>
                  <span className="text-xs text-muted-foreground">{(formData.photos || []).length} photos</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.photos && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <Camera className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white font-semibold">Photo Evidence</span>
                  {(formData.photos || []).length > 0 && (
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                      {(formData.photos || []).length} photos
                    </span>
                  )}
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.photos && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <p className="text-sm text-muted-foreground">
                Upload photos of luminaires, exit signs, defects, and the overall installation for documentation.
              </p>
              <EmergencyLightingPhotos
                photos={formData.photos || []}
                luminaires={formData.luminaires || []}
                defects={(formData.defectsFound || []).map((d: any) => ({
                  id: d.id,
                  description: d.description || 'Unnamed defect'
                }))}
                onPhotosChange={(photos) => onUpdate('photos', photos)}
                certificateId={formData.certificateNumber}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default EmergencyLightingTestResults;
