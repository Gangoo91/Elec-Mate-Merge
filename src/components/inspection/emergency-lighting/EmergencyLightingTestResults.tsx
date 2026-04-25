import React, { useState, useCallback, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Loader2, X } from 'lucide-react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { EmergencyLightingPhotos } from './EmergencyLightingPhotos';
import { cn } from '@/lib/utils';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';
import { BatteryConditionBadge } from './ValidationBadge';
import type { ZoneCategory } from '@/data/emergencyLightingCompliance';
import type {
  EmergencyLightingFormData,
  Luminaire,
  LuxReading,
  CertificatePhoto,
} from '@/types/emergency-lighting';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

type Defect = EmergencyLightingFormData['defectsFound'][number];

interface EmergencyLightingTestResultsProps {
  formData: EmergencyLightingFormData;
  onUpdate: (
    field: string,
    value: EmergencyLightingFormData[keyof EmergencyLightingFormData]
  ) => void;
}

const inputCn =
  'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const pickerTrigger =
  'h-11 w-full touch-manipulation bg-white/[0.06] border-white/[0.08] text-white';
const textareaCn =
  'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white';

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}</Label>
    {children}
  </div>
);

const Toggle = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean | undefined;
  onChange: (v: boolean) => void;
}) => (
  <div className="flex items-center justify-between">
    <Label className="text-white text-xs font-medium">{label}</Label>
    <div className="flex gap-1.5">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onChange(v)}
          className={cn(
            'w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
            value === v
              ? v
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
              : 'bg-white/[0.06] text-white border border-white/[0.08]'
          )}
        >
          {v ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white uppercase tracking-wider shrink-0">
      {title}
    </p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

const EmergencyLightingTestResults: React.FC<EmergencyLightingTestResultsProps> = ({
  formData,
  onUpdate,
}) => {
  const { calculateTestDates, suggestDefectPriority, formatDate, validateLux, getLuxRequirement } =
    useEmergencyLightingSmartForm();

  // Calculate next test dates when test dates change
  const monthlyTestDate = formData.monthlyFunctionalTest?.date;
  const annualTestDate = formData.annualDurationTest?.date;

  const nextTestDates =
    monthlyTestDate || annualTestDate
      ? calculateTestDates(monthlyTestDate || null, annualTestDate || null)
      : null;

  const updateMonthlyTest = (field: string, value: string | boolean) => {
    const current = formData.monthlyFunctionalTest || {};
    onUpdate('monthlyFunctionalTest', { ...current, [field]: value });
  };

  const updateAnnualTest = (field: string, value: string | number | boolean) => {
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
      luminaireId: '',
      rectified: false,
      rectificationDate: '',
    };
    onUpdate('defectsFound', [...defects, newDefect]);
  };

  const updateDefect = (id: string, field: string, value: string | boolean) => {
    const defects = formData.defectsFound || [];
    const updatedDefects = defects.map((d: Defect) => (d.id === id ? { ...d, [field]: value } : d));
    onUpdate('defectsFound', updatedDefects);
  };

  // Auto-suggest priority when defect description changes
  const handleDefectDescriptionChange = useCallback(
    (id: string, description: string) => {
      const defects = formData.defectsFound || [];
      const suggestion = suggestDefectPriority(description);

      const priorityMap: Record<string, Defect['priority']> = {
        immediate: 'immediate',
        '7-days': 'within-7-days',
        '28-days': 'within-28-days',
        recommendation: 'recommendation',
      };
      const mappedPriority = suggestion?.priority ? priorityMap[suggestion.priority] : null;

      const updatedDefects = defects.map((d: Defect) =>
        d.id === id ? { ...d, description, priority: mappedPriority || d.priority } : d
      );
      onUpdate('defectsFound', updatedDefects);
    },
    [formData.defectsFound, onUpdate, suggestDefectPriority]
  );

  const removeDefect = (id: string) => {
    const defects = formData.defectsFound || [];
    onUpdate(
      'defectsFound',
      defects.filter((d: Defect) => d.id !== id)
    );
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
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error('Failed to compress'))),
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

      const {
        data: { publicUrl },
      } = supabase.storage.from('inspection-photos').getPublicUrl(filePath);

      const defects = formData.defectsFound || [];
      const updatedDefects = defects.map((d: Defect) =>
        d.id === defectId ? { ...d, photoUrl: publicUrl } : d
      );
      onUpdate('defectsFound', updatedDefects);

      const photos = formData.photos || [];
      const newPhoto = {
        id: uuidv4(),
        url: publicUrl,
        caption: `Defect: ${defects.find((d: Defect) => d.id === defectId)?.description?.substring(0, 50) || 'Evidence'}`,
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
    const updatedDefects = defects.map((d: Defect) =>
      d.id === defectId ? { ...d, photoUrl: '' } : d
    );
    onUpdate('defectsFound', updatedDefects);
    const photos = formData.photos || [];
    onUpdate(
      'photos',
      photos.filter((p: CertificatePhoto) => p.linkedItemId !== defectId || p.category !== 'defect')
    );
  };

  // Update luminaire test results
  const updateLuminaireTest = (lumId: string, field: string, value: string) => {
    const luminaires = formData.luminaires || [];
    const updatedLuminaires = luminaires.map((lum: Luminaire) =>
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

  const updateLuxReading = (id: string, field: string, value: string) => {
    const readings = formData.luxReadings || [];
    const updatedReadings = readings.map((r: LuxReading) =>
      r.id === id ? { ...r, [field]: value } : r
    );
    onUpdate('luxReadings', updatedReadings);
  };

  const removeLuxReading = (id: string) => {
    const readings = formData.luxReadings || [];
    onUpdate(
      'luxReadings',
      readings.filter((r: LuxReading) => r.id !== id)
    );
  };

  // Auto-validate lux reading when value changes
  const handleLuxValueChange = useCallback(
    (id: string, luxValue: string, category: string) => {
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

      const updatedReadings = readings.map((r: LuxReading) =>
        r.id === id ? { ...r, luxReading: luxValue, minRequired, result } : r
      );
      onUpdate('luxReadings', updatedReadings);
    },
    [formData.luxReadings, onUpdate, getLuxRequirement]
  );

  const batteryConditionOptions = [
    { value: 'good', label: 'Good - Meets rated duration' },
    { value: 'fair', label: 'Fair - Approaching end of life' },
    { value: 'poor', label: 'Poor - Requires replacement' },
  ];

  const zoneCategoryOptions = [
    { value: 'escape-route', label: 'Escape Route (>=1 lux)' },
    { value: 'open-area', label: 'Open Area (>=0.5 lux)' },
    { value: 'high-risk', label: 'High Risk (>=15 lux)' },
  ];

  const priorityOptions = [
    { value: 'immediate', label: 'Immediate', color: 'red' },
    { value: 'within-7-days', label: '7 Days', color: 'orange' },
    { value: 'within-28-days', label: '28 Days', color: 'amber' },
    { value: 'recommendation', label: 'Recommend', color: 'blue' },
  ];

  return (
    <div className="space-y-6">
      {/* Test Equipment */}
      <div className="space-y-4">
        <SectionHeader title="Test Equipment" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Lux Meter Make">
            <MobileSelectPicker
              value={formData.luxMeterMake || ''}
              onValueChange={(v) => onUpdate('luxMeterMake', v)}
              options={[
                { value: 'Kewtech', label: 'Kewtech' },
                { value: 'Megger', label: 'Megger' },
                { value: 'Fluke', label: 'Fluke' },
                { value: 'Testo', label: 'Testo' },
                { value: 'Chauvin Arnoux', label: 'Chauvin Arnoux' },
                { value: 'Di-Log', label: 'Di-Log' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
          <Field label="Model">
            <Input
              placeholder="e.g. KT200"
              value={formData.luxMeterModel || ''}
              onChange={(e) => onUpdate('luxMeterModel', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Serial No.">
            <Input
              value={formData.luxMeterSerial || ''}
              onChange={(e) => onUpdate('luxMeterSerial', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Cal. Date">
            <Input
              type="date"
              value={formData.luxMeterCalibrationDate || ''}
              onChange={(e) => onUpdate('luxMeterCalibrationDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      {/* Monthly Functional Test */}
      <div className="space-y-4">
        <SectionHeader title="Monthly Functional Test" />
        <div className="rounded-lg p-2.5 bg-elec-yellow/5 border border-elec-yellow/15">
          <p className="text-[10px] text-white">
            BS 5266 — Monthly flick test: simulate mains failure, verify all luminaires illuminate
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Test Date">
            <Input
              type="date"
              value={monthlyTest.date || ''}
              onChange={(e) => updateMonthlyTest('date', e.target.value)}
              className={inputCn}
            />
          </Field>
          {nextTestDates && monthlyTest.date && (
            <Field label="Next Due">
              <div className="h-11 flex items-center px-3 bg-white/[0.06] border border-white/[0.08] rounded-md text-white text-sm">
                {formatDate(nextTestDates.nextMonthlyTest)}
              </div>
            </Field>
          )}
        </div>

        <Sub title="Functional Checks" />

        <div className="space-y-3">
          <Toggle
            label="All luminaires illuminate"
            value={monthlyTest.allLuminairesOperational}
            onChange={(v) => updateMonthlyTest('allLuminairesOperational', v)}
          />
          <Toggle
            label="Charging indicators normal"
            value={monthlyTest.chargingIndicatorsNormal}
            onChange={(v) => updateMonthlyTest('chargingIndicatorsNormal', v)}
          />
        </div>

        <Sub title="Faults & Action" />

        <Field label="Faults Found">
          <Textarea
            placeholder="Describe any faults found during the test..."
            value={monthlyTest.faultsFound || ''}
            onChange={(e) => updateMonthlyTest('faultsFound', e.target.value)}
            className={textareaCn}
          />
        </Field>

        <Field label="Action Taken">
          <Textarea
            placeholder="Describe any remedial action taken..."
            value={monthlyTest.actionTaken || ''}
            onChange={(e) => updateMonthlyTest('actionTaken', e.target.value)}
            className={textareaCn}
          />
        </Field>
      </div>

      {/* Annual Duration Test */}
      <div className="space-y-3">
        <SectionHeader title="Annual Duration Test" />
        <div className="rounded-lg p-2.5 bg-elec-yellow/5 border border-elec-yellow/15">
          <p className="text-[10px] text-white">
            BS 5266 — Annual full duration test: run for rated duration (1hr or 3hr) and verify
            operation throughout
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Test Date">
            <Input
              type="date"
              value={annualTest.date || ''}
              onChange={(e) => updateAnnualTest('date', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Duration Tested (minutes)">
            <Input
              type="number"
              min="0"
              placeholder="e.g., 180"
              value={annualTest.duration || ''}
              onChange={(e) => updateAnnualTest('duration', parseInt(e.target.value) || 0)}
              className={inputCn}
            />
          </Field>
        </div>

        {nextTestDates && annualTest.date && (
          <div className="text-xs text-white bg-white/[0.04] border border-white/[0.06] rounded-md px-3 py-2">
            Next Annual Duration Test Due:{' '}
            <span className="text-white font-medium">
              {formatDate(nextTestDates.nextAnnualTest)}
            </span>
          </div>
        )}

        <Sub title="Duration Checks" />

        <Toggle
          label="All luminaires operated for full rated duration"
          value={annualTest.allLuminairesOperational}
          onChange={(v) => updateAnnualTest('allLuminairesOperational', v)}
        />

        <Sub title="Battery Condition" />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-white text-xs">Battery Condition</Label>
            {annualTest.batteryCondition && (
              <BatteryConditionBadge condition={annualTest.batteryCondition} />
            )}
          </div>
          <MobileSelectPicker
            value={annualTest.batteryCondition || ''}
            onValueChange={(value) => updateAnnualTest('batteryCondition', value)}
            options={batteryConditionOptions}
            placeholder="Assess battery condition"
            title="Battery Condition"
            triggerClassName={pickerTrigger}
          />
          {annualTest.batteryCondition === 'poor' && (
            <p className="text-xs text-red-400">
              Battery replacement required - add to defects list
            </p>
          )}
        </div>

        <Sub title="Faults & Action" />

        <Field label="Faults Found">
          <Textarea
            placeholder="Describe any faults found during the duration test..."
            value={annualTest.faultsFound || ''}
            onChange={(e) => updateAnnualTest('faultsFound', e.target.value)}
            className={textareaCn}
          />
        </Field>

        <Field label="Action Taken">
          <Textarea
            placeholder="Describe any remedial action taken..."
            value={annualTest.actionTaken || ''}
            onChange={(e) => updateAnnualTest('actionTaken', e.target.value)}
            className={textareaCn}
          />
        </Field>
      </div>

      {/* Luminaire Pass/Fail Summary Bar */}
      {(formData.luminaires || []).length > 0 &&
        (() => {
          const luminaires = formData.luminaires || [];
          const total = luminaires.length;
          const funcPass = luminaires.filter(
            (l: Luminaire) => l.functionalTestResult === 'pass'
          ).length;
          const funcFail = luminaires.filter(
            (l: Luminaire) => l.functionalTestResult === 'fail'
          ).length;
          const funcUntested = total - funcPass - funcFail;
          const durPass = luminaires.filter(
            (l: Luminaire) => l.durationTestResult === 'pass'
          ).length;
          const durFail = luminaires.filter(
            (l: Luminaire) => l.durationTestResult === 'fail'
          ).length;
          const durUntested = total - durPass - durFail;

          return (
            <div className="space-y-3">
              <SectionHeader title="Luminaire Summary" />
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-white font-medium">Functional Test</span>
                    <span className="text-white">
                      {funcPass} Pass{funcFail > 0 ? `, ${funcFail} Fail` : ''}
                      {funcUntested > 0 ? `, ${funcUntested} Untested` : ''}
                    </span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                    {funcPass > 0 && (
                      <div
                        className="bg-green-500 transition-all"
                        style={{ width: `${(funcPass / total) * 100}%` }}
                      />
                    )}
                    {funcFail > 0 && (
                      <div
                        className="bg-red-500 transition-all"
                        style={{ width: `${(funcFail / total) * 100}%` }}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-white font-medium">Duration Test</span>
                    <span className="text-white">
                      {durPass} Pass{durFail > 0 ? `, ${durFail} Fail` : ''}
                      {durUntested > 0 ? `, ${durUntested} Untested` : ''}
                    </span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                    {durPass > 0 && (
                      <div
                        className="bg-green-500 transition-all"
                        style={{ width: `${(durPass / total) * 100}%` }}
                      />
                    )}
                    {durFail > 0 && (
                      <div
                        className="bg-red-500 transition-all"
                        style={{ width: `${(durFail / total) * 100}%` }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

      {/* Individual Luminaire Results */}
      {(formData.luminaires || []).length > 0 && (
        <div className="space-y-3">
          <SectionHeader title="Individual Luminaire Results" />

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                const luminaires = formData.luminaires || [];
                const updated = luminaires.map((lum: Luminaire) => ({
                  ...lum,
                  functionalTestResult: 'pass',
                }));
                onUpdate('luminaires', updated);
              }}
              className="h-11 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-white touch-manipulation active:scale-[0.98]"
            >
              All Functional PASS
            </button>
            <button
              type="button"
              onClick={() => {
                const luminaires = formData.luminaires || [];
                const updated = luminaires.map((lum: Luminaire) => ({
                  ...lum,
                  durationTestResult: 'pass',
                }));
                onUpdate('luminaires', updated);
              }}
              className="h-11 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-white touch-manipulation active:scale-[0.98]"
            >
              All Duration PASS
            </button>
          </div>

          {(formData.luminaires || []).map((lum: Luminaire, index: number) => (
            <div
              key={lum.id}
              className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 space-y-2"
            >
              <div>
                <p className="text-white text-xs font-medium">
                  #{index + 1} {lum.location || 'Unknown location'}
                </p>
                <p className="text-[10px] text-white">
                  {lum.luminaireType || 'Type not specified'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-white text-[10px]">Functional</Label>
                  <div className="flex gap-1">
                    {['pass', 'fail', 'na'].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => updateLuminaireTest(lum.id, 'functionalTestResult', v)}
                        className={cn(
                          'flex-1 h-8 rounded-lg text-[10px] font-semibold touch-manipulation transition-all',
                          lum.functionalTestResult === v
                            ? v === 'pass'
                              ? 'bg-green-500 text-white'
                              : v === 'fail'
                                ? 'bg-red-500 text-white'
                                : 'bg-white/20 text-white'
                            : 'bg-white/[0.06] text-white border border-white/[0.08]'
                        )}
                      >
                        {v === 'pass' ? 'Pass' : v === 'fail' ? 'Fail' : 'N/A'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-white text-[10px]">Duration</Label>
                  <div className="flex gap-1">
                    {['pass', 'fail', 'na'].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => updateLuminaireTest(lum.id, 'durationTestResult', v)}
                        className={cn(
                          'flex-1 h-8 rounded-lg text-[10px] font-semibold touch-manipulation transition-all',
                          lum.durationTestResult === v
                            ? v === 'pass'
                              ? 'bg-green-500 text-white'
                              : v === 'fail'
                                ? 'bg-red-500 text-white'
                                : 'bg-white/20 text-white'
                            : 'bg-white/[0.06] text-white border border-white/[0.08]'
                        )}
                      >
                        {v === 'pass' ? 'Pass' : v === 'fail' ? 'Fail' : 'N/A'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lux Readings (BS EN 1838 Compliance) */}
      <div className="space-y-3">
        <SectionHeader title="Lux Readings (BS EN 1838)" />

        <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-3">
          <p className="text-[10px] font-semibold text-white uppercase tracking-wider mb-2">
            Minimum Illuminance Requirements
          </p>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
              <span className="text-white">
                Escape: <strong className="text-white">{'≥'}1 lux</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              <span className="text-white">
                Open: <strong className="text-white">{'≥'}0.5 lux</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span className="text-white">
                High Risk: <strong className="text-white">{'≥'}15 lux</strong>
              </span>
            </div>
          </div>
          <p className="text-[10px] text-white mt-2">
            Measured at floor level (0.5m above) under emergency lighting conditions
          </p>
        </div>

        {(formData.luxReadings || []).length === 0 ? (
          <div className="text-center py-6 text-white">
            <p className="text-xs">No lux readings recorded</p>
            <p className="text-[10px]">Add readings to verify BS EN 1838 compliance</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(formData.luxReadings || []).map((reading: LuxReading, index: number) => (
              <div
                key={reading.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-white text-xs font-medium">Reading #{index + 1}</p>
                  <button
                    onClick={() => removeLuxReading(reading.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/10 touch-manipulation"
                    aria-label="Remove lux reading"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-1 space-y-1">
                    <Label className="text-white text-[10px]">Location</Label>
                    <Input
                      placeholder="e.g., Corridor A"
                      value={reading.location || ''}
                      onChange={(e) => updateLuxReading(reading.id, 'location', e.target.value)}
                      className={inputCn}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-white text-[10px]">Zone Category</Label>
                    <MobileSelectPicker
                      value={reading.category || ''}
                      onValueChange={(v) => {
                        updateLuxReading(reading.id, 'category', v);
                        if (reading.luxReading) {
                          handleLuxValueChange(reading.id, reading.luxReading, v);
                        }
                      }}
                      options={zoneCategoryOptions}
                      placeholder="Select"
                      title="Zone Category"
                      triggerClassName={pickerTrigger}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-white text-[10px]">Lux Reading</Label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="e.g., 1.5"
                      value={reading.luxReading || ''}
                      onChange={(e) =>
                        handleLuxValueChange(reading.id, e.target.value, reading.category || '')
                      }
                      className={cn(
                        inputCn,
                        reading.result === 'pass' && 'border-green-500/50 bg-green-500/10',
                        reading.result === 'fail' && 'border-red-500/50 bg-red-500/10'
                      )}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-white text-[10px]">Result</Label>
                    <div
                      className={cn(
                        'h-11 flex items-center justify-center rounded-md text-xs font-medium',
                        reading.result === 'pass' &&
                          'bg-green-500/20 text-green-400 border border-green-500/30',
                        reading.result === 'fail' &&
                          'bg-red-500/20 text-red-400 border border-red-500/30',
                        !reading.result && 'bg-white/[0.04] text-white border border-white/[0.06]'
                      )}
                    >
                      {reading.result === 'pass' && 'PASS'}
                      {reading.result === 'fail' && 'FAIL'}
                      {!reading.result && '--'}
                    </div>
                  </div>
                </div>
                {reading.minRequired && (
                  <p className="text-[10px] text-white">Minimum required: {reading.minRequired}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={addLuxReading}
          className="w-full h-11 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center text-sm text-white touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-3.5 w-3.5 mr-2" />
          Add Lux Reading
        </button>
      </div>

      {/* Defects Found */}
      <div className="space-y-3">
        <SectionHeader title="Defects & Observations" />

        {(formData.defectsFound || []).map(
          (defect: EmergencyLightingFormData['defectsFound'][number], defectIndex: number) => (
            <div
              key={defect.id}
              className="bg-white/[0.03] border border-white/[0.06] rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06]">
                <p className="text-white text-xs font-medium">Defect #{defectIndex + 1}</p>
                <button
                  onClick={() => removeDefect(defect.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/10 touch-manipulation"
                  aria-label="Remove defect"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="p-3 space-y-3">
                {!defect.description && (
                  <div className="space-y-1.5">
                    <Label className="text-[10px] text-white">Tap to select common defect:</Label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        'Failed functional test',
                        'Low battery',
                        'Charging fault',
                        'Exit sign damaged',
                        'Lens dirty/obscured',
                        'Missing luminaire',
                      ].map((quickDefect) => (
                        <button
                          key={quickDefect}
                          type="button"
                          onClick={() => handleDefectDescriptionChange(defect.id, quickDefect)}
                          className="h-9 px-3 text-[10px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg touch-manipulation transition-colors text-left text-white"
                        >
                          {quickDefect}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {defect.description && (
                  <Field label="Description">
                    <Textarea
                      placeholder="Add more details..."
                      value={defect.description || ''}
                      onChange={(e) => handleDefectDescriptionChange(defect.id, e.target.value)}
                      className="touch-manipulation text-base min-h-[60px] bg-white/[0.06] border-white/[0.08] text-white"
                    />
                  </Field>
                )}

                <div className="space-y-1.5">
                  <Label className="text-[10px] text-white">Priority</Label>
                  <div className="flex flex-wrap gap-1.5">
                    {priorityOptions.map((priority) => (
                      <button
                        key={priority.value}
                        type="button"
                        onClick={() => updateDefect(defect.id, 'priority', priority.value)}
                        className={cn(
                          'h-8 px-3 rounded-lg text-[10px] font-semibold touch-manipulation transition-all flex items-center gap-1.5',
                          defect.priority === priority.value
                            ? priority.color === 'red'
                              ? 'bg-red-500 text-white'
                              : priority.color === 'orange'
                                ? 'bg-orange-500 text-white'
                                : priority.color === 'amber'
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-blue-500 text-white'
                            : 'bg-white/[0.06] text-white border border-white/[0.08]'
                        )}
                      >
                        <span
                          className={cn(
                            'w-1.5 h-1.5 rounded-full shrink-0',
                            defect.priority === priority.value
                              ? 'bg-white/60'
                              : priority.color === 'red'
                                ? 'bg-red-500'
                                : priority.color === 'orange'
                                  ? 'bg-orange-500'
                                  : priority.color === 'amber'
                                    ? 'bg-amber-500'
                                    : 'bg-blue-500'
                          )}
                        />
                        {priority.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {(formData.luminaires || []).length > 0 && (
                    <div className="space-y-1">
                      <Label className="text-[10px] text-white">Link to Luminaire</Label>
                      <MobileSelectPicker
                        value={defect.luminaireId || 'general'}
                        onValueChange={(v) =>
                          updateDefect(defect.id, 'luminaireId', v === 'general' ? '' : v)
                        }
                        options={[
                          { value: 'general', label: 'General (not specific)' },
                          ...(formData.luminaires || []).map((lum: Luminaire, index: number) => ({
                            value: lum.id,
                            label: `#${index + 1} - ${lum.location || 'Unknown'}`,
                          })),
                        ]}
                        placeholder="General"
                        title="Link to Luminaire"
                        triggerClassName={pickerTrigger}
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <Label className="text-[10px] text-white">Rectified on site</Label>
                    <div className="flex gap-1.5">
                      {[true, false].map((v) => (
                        <button
                          key={String(v)}
                          type="button"
                          onClick={() => updateDefect(defect.id, 'rectified', v)}
                          className={cn(
                            'flex-1 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                            defect.rectified === v
                              ? v
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                              : 'bg-white/[0.06] text-white border border-white/[0.08]'
                          )}
                        >
                          {v ? 'Yes' : 'No'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Sub title="Photo Evidence" />
                {defect.photoUrl ? (
                  <div className="relative">
                    <img
                      src={defect.photoUrl}
                      alt="Defect evidence"
                      className="w-full h-32 object-cover rounded-lg border border-white/[0.08]"
                    />
                    <button
                      onClick={() => removeDefectPhoto(defect.id)}
                      className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-black/60 hover:bg-red-500/80 rounded-full touch-manipulation"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      ref={(el) => {
                        defectPhotoInputRefs.current[defect.id] = el;
                      }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleDefectPhotoUpload(defect.id, file);
                      }}
                      className="hidden"
                    />
                    <button
                      onClick={() => defectPhotoInputRefs.current[defect.id]?.click()}
                      disabled={uploadingDefectId === defect.id}
                      className="w-full h-11 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center text-sm text-white touch-manipulation active:scale-[0.98] disabled:opacity-50"
                    >
                      {uploadingDefectId === defect.id ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        'Add Photo'
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        )}

        <button
          onClick={addDefect}
          className="w-full h-11 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center text-sm text-white touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-3.5 w-3.5 mr-2" />
          Add Defect
        </button>
      </div>

      {/* Photo Evidence */}
      <div className="space-y-3">
        <SectionHeader title="Photo Evidence" />
        <p className="text-xs text-white">
          Upload photos of luminaires, exit signs, defects, and the overall installation for
          documentation.
        </p>
        <EmergencyLightingPhotos
          photos={formData.photos || []}
          luminaires={formData.luminaires || []}
          defects={(formData.defectsFound || []).map(
            (d: EmergencyLightingFormData['defectsFound'][number]) => ({
              id: d.id,
              description: d.description || 'Unnamed defect',
            })
          )}
          onPhotosChange={(photos) => onUpdate('photos', photos)}
          certificateId={formData.certificateNumber}
        />
      </div>
    </div>
  );
};

export default EmergencyLightingTestResults;
