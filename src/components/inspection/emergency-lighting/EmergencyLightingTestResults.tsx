import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { EmergencyLightingPhotos } from './EmergencyLightingPhotos';
import { cn } from '@/lib/utils';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';
import { useHaptic } from '@/hooks/useHaptic';
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
import useReadingKeypad from '@/hooks/useReadingKeypad';

type Defect = EmergencyLightingFormData['defectsFound'][number];

interface EmergencyLightingTestResultsProps {
  formData: EmergencyLightingFormData;
  onUpdate: (
    field: string,
    value: EmergencyLightingFormData[keyof EmergencyLightingFormData]
  ) => void;
}

// Section card — the only box on the page
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

// Paper-form underline input
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTrigger =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 w-full px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

// Pass/fail chips — solid when selected
const verdictCn = (selected: boolean, tone: 'pass' | 'fail' | 'neutral') =>
  cn(
    'flex-1 h-11 rounded-xl text-sm font-semibold transition-all touch-manipulation active:scale-[0.98]',
    selected && tone === 'pass' && 'bg-green-500 border border-green-500 text-black',
    selected && tone === 'fail' && 'bg-red-500 border border-red-500 text-white',
    selected && tone === 'neutral' && 'bg-white/25 border border-white/25 text-white',
    !selected && 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
  );

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}</Label>
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
  <div className="flex items-center justify-between gap-3">
    <Label className="text-[12px] font-medium text-white">{label}</Label>
    <div className="flex gap-2">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onChange(v)}
          className={cn(
            'h-11 w-16 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98]',
            value === v
              ? v
                ? 'bg-green-500 border border-green-500 text-black font-semibold'
                : 'bg-red-500 border border-red-500 text-white font-semibold'
              : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
          )}
        >
          {v ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Sub = ({ title }: { title: string }) => (
  <div className="border-t border-white/[0.1] pt-4">
    <h3 className="text-sm font-semibold text-white">{title}</h3>
  </div>
);

const EmergencyLightingTestResults: React.FC<EmergencyLightingTestResultsProps> = ({
  formData,
  onUpdate,
}) => {
  const { calculateTestDates, suggestDefectPriority, formatDate, getLuxRequirement } =
    useEmergencyLightingSmartForm();
  const haptic = useHaptic();

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

  // ── Reading keypad — shared MW pattern ──
  // Serves the annual duration reading plus every lux reading row. Lux fields
  // are keyed per reading id (`lux-${id}`) so data-keypad-field stays unique as
  // rows are added/removed. Values flow through the EXISTING handlers
  // (updateAnnualTest / handleLuxValueChange); the lux verdict reuses the
  // result already computed by handleLuxValueChange — no new compliance logic.
  const keypadMeta = useMemo(() => {
    const meta: Record<string, { label: string; unit: string }> = {
      annualDuration: { label: 'Duration tested — annual test', unit: 'min' },
    };
    (formData.luxReadings || []).forEach((r: LuxReading, i: number) => {
      meta[`lux-${r.id}`] = {
        label: r.location ? `Lux reading — ${r.location}` : `Lux reading #${i + 1}`,
        unit: 'lux',
      };
    });
    return meta;
  }, [formData.luxReadings]);
  const keypad = useReadingKeypad({
    meta: keypadMeta,
    getValue: (field) =>
      field === 'annualDuration'
        ? String(annualTest.duration || '')
        : String(
            (formData.luxReadings || []).find((r: LuxReading) => `lux-${r.id}` === field)
              ?.luxReading || ''
          ),
    setValue: (field, value) => {
      if (field === 'annualDuration') {
        updateAnnualTest('duration', parseInt(value) || 0);
        return;
      }
      const reading = (formData.luxReadings || []).find(
        (r: LuxReading) => `lux-${r.id}` === field
      );
      if (reading) handleLuxValueChange(reading.id, value, reading.category || '');
    },
    getStatus: (field) => {
      // Duration reuses the cert's OWN existing rule (useEmergencyLightingSmartForm
      // → validateTestResults: durationAchieved >= ratedDuration). No new limit is
      // introduced — it compares the tested duration against the rated duration
      // the user set on the Installation tab.
      if (field === 'annualDuration') {
        const tested = Number(annualTest.duration) || 0;
        const rated = Number(formData.ratedDuration) || 0;
        if (!tested || !rated) return null;
        return tested >= rated
          ? { tone: 'pass', label: `Meets ${rated} min rating` }
          : { tone: 'check', label: `Below ${rated} min rating` };
      }
      const reading = (formData.luxReadings || []).find(
        (r: LuxReading) => `lux-${r.id}` === field
      );
      if (!reading?.result) return null;
      return reading.result === 'pass'
        ? { tone: 'pass', label: reading.minRequired ? `Meets ${reading.minRequired} minimum` : 'Meets minimum' }
        : { tone: 'check', label: reading.minRequired ? `Below ${reading.minRequired} minimum` : 'Below minimum' };
    },
  });

  const batteryConditionOptions = [
    { value: 'good', label: 'Good — meets rated duration' },
    { value: 'fair', label: 'Fair — approaching end of life' },
    { value: 'poor', label: 'Poor — requires replacement' },
  ];

  const zoneCategoryOptions = [
    { value: 'escape-route', label: 'Escape route (≥1 lux)' },
    { value: 'open-area', label: 'Open area (≥0.5 lux)' },
    { value: 'high-risk', label: 'High risk (≥15 lux)' },
  ];

  const priorityOptions = [
    { value: 'immediate', label: 'Immediate', color: 'red' },
    { value: 'within-7-days', label: '7 days', color: 'orange' },
    { value: 'within-28-days', label: '28 days', color: 'amber' },
    { value: 'recommendation', label: 'Recommend', color: 'blue' },
  ];

  return (
    <div
      className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4"
      // Delegated press haptic — every chip/button tap in this tab buzzes
      // without wiring each onClick individually.
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) haptic.light();
      }}
    >
      {/* Test equipment */}
      <div className={cardCn}>
        <SectionHeader title="Test equipment" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Lux meter make">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Serial no.">
            <Input
              value={formData.luxMeterSerial || ''}
              onChange={(e) => onUpdate('luxMeterSerial', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Cal. date">
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
      <div className={cardCn}>
        <SectionHeader title="Monthly functional test" />
        <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
          <p className="text-xs text-white/80">
            BS 5266 — Monthly flick test: simulate mains failure, verify all luminaires illuminate
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Test date">
            <Input
              type="date"
              value={monthlyTest.date || ''}
              onChange={(e) => updateMonthlyTest('date', e.target.value)}
              className={inputCn}
            />
          </Field>
          {nextTestDates && monthlyTest.date && (
            <Field label="Next due">
              <div className="flex h-11 items-center border-b border-white/[0.15] px-1 text-base font-medium text-white">
                {formatDate(nextTestDates.nextMonthlyTest)}
              </div>
            </Field>
          )}
        </div>

        <Sub title="Functional checks" />

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

        <Sub title="Faults and action" />

        <Field label="Faults found">
          <Textarea
            placeholder="Describe any faults found during the test..."
            value={monthlyTest.faultsFound || ''}
            onChange={(e) => updateMonthlyTest('faultsFound', e.target.value)}
            className={textareaCn}
          />
        </Field>

        <Field label="Action taken">
          <Textarea
            placeholder="Describe any remedial action taken..."
            value={monthlyTest.actionTaken || ''}
            onChange={(e) => updateMonthlyTest('actionTaken', e.target.value)}
            className={textareaCn}
          />
        </Field>
      </div>

      {/* Annual Duration Test */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Annual duration test" />
        <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
          <p className="text-xs text-white/80">
            BS 5266 — Annual full duration test: run for rated duration (1hr or 3hr) and verify
            operation throughout
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Test date">
            <Input
              type="date"
              value={annualTest.date || ''}
              onChange={(e) => updateAnnualTest('date', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Duration tested (minutes)">
            <Input
             
              min="0"
              placeholder="e.g., 180"
              value={annualTest.duration || ''}
              onChange={(e) => updateAnnualTest('duration', parseInt(e.target.value) || 0)}
              className={inputCn}
              {...keypad.field('annualDuration')}
            />
          </Field>
        </div>

        {nextTestDates && annualTest.date && (
          <div className="rounded-xl bg-white/[0.05] px-3.5 py-3 text-xs text-white/80">
            Next annual duration test due:{' '}
            <span className="font-medium text-white">
              {formatDate(nextTestDates.nextAnnualTest)}
            </span>
          </div>
        )}

        <Sub title="Duration checks" />

        <Toggle
          label="All luminaires operated for full rated duration"
          value={annualTest.allLuminairesOperational}
          onChange={(v) => updateAnnualTest('allLuminairesOperational', v)}
        />

        <Sub title="Battery condition" />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[12px] font-medium text-white">Battery Condition</Label>
            {annualTest.batteryCondition && (
              <BatteryConditionBadge condition={annualTest.batteryCondition} />
            )}
          </div>
          <MobileSelectPicker
            value={annualTest.batteryCondition || ''}
            onValueChange={(value) => updateAnnualTest('batteryCondition', value)}
            options={batteryConditionOptions}
            placeholder="Assess battery condition"
            title="Battery condition"
            triggerClassName={pickerTrigger}
          />
          {annualTest.batteryCondition === 'poor' && (
            <p className="text-xs font-medium text-red-400">
              Battery replacement required — add to defects list
            </p>
          )}
        </div>

        <Sub title="Faults and action" />

        <Field label="Faults found">
          <Textarea
            placeholder="Describe any faults found during the duration test..."
            value={annualTest.faultsFound || ''}
            onChange={(e) => updateAnnualTest('faultsFound', e.target.value)}
            className={textareaCn}
          />
        </Field>

        <Field label="Action taken">
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
            <div className={cn(cardCn, 'lg:col-span-2')}>
              <SectionHeader title="Luminaire summary" />
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-white">Functional test</span>
                    <span className="text-white/80">
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
                    <span className="font-medium text-white">Duration test</span>
                    <span className="text-white/80">
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
        <div className={cn(cardCn, 'lg:col-span-2')}>
          <SectionHeader title="Individual luminaire results" />

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
              className="h-11 rounded-xl bg-white/[0.06] border border-white/[0.12] text-xs font-semibold text-white touch-manipulation active:scale-[0.98]"
            >
              All functional PASS
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
              className="h-11 rounded-xl bg-white/[0.06] border border-white/[0.12] text-xs font-semibold text-white touch-manipulation active:scale-[0.98]"
            >
              All duration PASS
            </button>
          </div>

          {(formData.luminaires || []).map((lum: Luminaire, index: number) => (
            <div key={lum.id} className="border-t border-white/[0.08] pt-4 space-y-3">
              <div>
                <p className="text-[13px] font-medium text-white">
                  <span className="font-semibold text-elec-yellow">#{index + 1}</span>{' '}
                  {/* Reference first — testing a run of fittings means matching
                      each row to the sticker in front of you, and the code is
                      the only unique thing. Several can share a location. */}
                  {lum.reference && (
                    <span className="font-mono text-[12px] text-white">{lum.reference} · </span>
                  )}
                  {lum.location || 'Unknown location'}
                </p>
                <p className="text-xs text-white/80">
                  {lum.luminaireType || 'Type not specified'}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <Label className={labelCn}>Functional</Label>
                  <div className="flex gap-2">
                    {['pass', 'fail', 'na'].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => updateLuminaireTest(lum.id, 'functionalTestResult', v)}
                        className={verdictCn(
                          lum.functionalTestResult === v,
                          v === 'pass' ? 'pass' : v === 'fail' ? 'fail' : 'neutral'
                        )}
                      >
                        {v === 'pass' ? 'Pass' : v === 'fail' ? 'Fail' : 'N/A'}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className={labelCn}>Duration</Label>
                  <div className="flex gap-2">
                    {['pass', 'fail', 'na'].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => updateLuminaireTest(lum.id, 'durationTestResult', v)}
                        className={verdictCn(
                          lum.durationTestResult === v,
                          v === 'pass' ? 'pass' : v === 'fail' ? 'fail' : 'neutral'
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
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Lux readings (BS EN 1838)" />

        <div className="rounded-xl bg-white/[0.05] p-3.5">
          <p className="text-[13px] font-semibold text-white mb-2">
            Minimum illuminance requirements
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
              <span className="text-white/80">
                Escape: <strong className="text-white">{'≥'}1 lux</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              <span className="text-white/80">
                Open: <strong className="text-white">{'≥'}0.5 lux</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span className="text-white/80">
                High risk: <strong className="text-white">{'≥'}15 lux</strong>
              </span>
            </div>
          </div>
          <p className="text-xs text-white/80 mt-2">
            Measured at floor level (0.5m above) under emergency lighting conditions
          </p>
        </div>

        {(formData.luxReadings || []).length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm font-medium text-white">No lux readings recorded</p>
            <p className="text-xs text-white/80 mt-1">
              Add readings to verify BS EN 1838 compliance
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {(formData.luxReadings || []).map((reading: LuxReading, index: number) => (
              <div key={reading.id} className="border-t border-white/[0.08] pt-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13px] font-medium text-white">Reading #{index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeLuxReading(reading.id)}
                    className="h-11 shrink-0 px-2 text-sm font-medium text-red-400 touch-manipulation"
                    aria-label="Remove lux reading"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <Field label="Location">
                    <Input
                      placeholder="e.g., Corridor A"
                      value={reading.location || ''}
                      onChange={(e) => updateLuxReading(reading.id, 'location', e.target.value)}
                      className={inputCn}
                    />
                  </Field>
                  <Field label="Zone category">
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
                      title="Zone category"
                      triggerClassName={pickerTrigger}
                    />
                  </Field>
                  <Field label="Lux reading">
                    <Input
                     
                      step="0.1"
                      min="0"
                      placeholder="e.g., 1.5"
                      value={reading.luxReading || ''}
                      onChange={(e) =>
                        handleLuxValueChange(reading.id, e.target.value, reading.category || '')
                      }
                      className={cn(
                        inputCn,
                        reading.result === 'pass' && 'border-green-500',
                        reading.result === 'fail' && 'border-red-500'
                      )}
                      {...keypad.field(`lux-${reading.id}`)}
                    />
                  </Field>
                  <Field label="Result">
                    <div
                      className={cn(
                        'h-11 flex items-center justify-center rounded-xl text-sm font-semibold',
                        reading.result === 'pass' && 'bg-green-500 text-black',
                        reading.result === 'fail' && 'bg-red-500 text-white',
                        !reading.result &&
                          'bg-white/[0.06] border border-white/[0.12] text-white/80'
                      )}
                    >
                      {reading.result === 'pass' && 'PASS'}
                      {reading.result === 'fail' && 'FAIL'}
                      {!reading.result && '--'}
                    </div>
                  </Field>
                </div>
                {reading.minRequired && (
                  <p className="text-xs text-white/80">Minimum required: {reading.minRequired}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={addLuxReading}
          className="w-full h-11 rounded-xl border border-dashed border-white/[0.25] flex items-center justify-center text-sm font-medium text-white touch-manipulation active:scale-[0.98]"
        >
          Add lux reading
        </button>
      </div>

      {/* Defects Found */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Defects and observations" />

        {(formData.defectsFound || []).map(
          (defect: EmergencyLightingFormData['defectsFound'][number], defectIndex: number) => (
            <div key={defect.id} className="border-t border-white/[0.08] pt-4 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] font-medium text-white">Defect #{defectIndex + 1}</p>
                <button
                  type="button"
                  onClick={() => removeDefect(defect.id)}
                  className="h-11 shrink-0 px-2 text-sm font-medium text-red-400 touch-manipulation"
                  aria-label="Remove defect"
                >
                  Remove
                </button>
              </div>

              {!defect.description && (
                <div className="space-y-1.5">
                  <Label className={labelCn}>Tap to select common defect:</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                        className="h-11 px-3 text-xs font-medium bg-white/[0.06] border border-white/[0.12] rounded-xl touch-manipulation transition-colors text-left text-white active:scale-[0.98]"
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
                    className={cn(textareaCn, 'min-h-[60px]')}
                  />
                </Field>
              )}

              <div className="space-y-1.5">
                <Label className={labelCn}>Priority</Label>
                <div className="flex flex-wrap gap-2">
                  {priorityOptions.map((priority) => (
                    <button
                      key={priority.value}
                      type="button"
                      onClick={() => updateDefect(defect.id, 'priority', priority.value)}
                      className={cn(
                        'h-11 px-3.5 rounded-xl text-xs font-semibold touch-manipulation transition-all active:scale-[0.98]',
                        defect.priority === priority.value
                          ? priority.color === 'red'
                            ? 'bg-red-500 border border-red-500 text-white'
                            : priority.color === 'orange'
                              ? 'bg-orange-500 border border-orange-500 text-black'
                              : priority.color === 'amber'
                                ? 'bg-amber-500 border border-amber-500 text-black'
                                : 'bg-blue-500 border border-blue-500 text-white'
                          : 'bg-white/[0.06] border border-white/[0.12] text-white'
                      )}
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {(formData.luminaires || []).length > 0 && (
                  <Field label="Link to luminaire">
                    <MobileSelectPicker
                      value={defect.luminaireId || 'general'}
                      onValueChange={(v) =>
                        updateDefect(defect.id, 'luminaireId', v === 'general' ? '' : v)
                      }
                      options={[
                        { value: 'general', label: 'General (not specific)' },
                        ...(formData.luminaires || []).map((lum: Luminaire, index: number) => ({
                          value: lum.id,
                          label: `#${index + 1} - ${lum.reference ? `${lum.reference} · ` : ''}${lum.location || 'Unknown'}`,
                        })),
                      ]}
                      placeholder="General"
                      title="Link to luminaire"
                      triggerClassName={pickerTrigger}
                    />
                  </Field>
                )}

                <div>
                  <Label className={labelCn}>Rectified on site</Label>
                  {/* "No" is not a failure — an outstanding defect is neutral,
                      so it takes the neutral chip rather than solid red. */}
                  <div className="flex gap-2">
                    {[true, false].map((v) => (
                      <button
                        key={String(v)}
                        type="button"
                        onClick={() => updateDefect(defect.id, 'rectified', v)}
                        className={verdictCn(defect.rectified === v, v ? 'pass' : 'neutral')}
                      >
                        {v ? 'Yes' : 'No'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rectification date — the payload has always carried
                    defects[].rectification_date but nothing on the form could
                    fill it, so a rectified defect reached the PDF undated. */}
                {defect.rectified && (
                  <Field label="Rectified on">
                    <Input
                      type="date"
                      value={defect.rectificationDate || ''}
                      onChange={(e) =>
                        updateDefect(defect.id, 'rectificationDate', e.target.value)
                      }
                      className={inputCn}
                    />
                  </Field>
                )}
              </div>

              <Sub title="Photo evidence" />
              {defect.photoUrl ? (
                <div className="relative">
                  <img
                    src={defect.photoUrl}
                    alt="Defect evidence"
                    className="w-full h-32 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => removeDefectPhoto(defect.id)}
                    className="absolute top-2 right-2 h-9 rounded-lg bg-black/70 px-3 text-xs font-medium text-white touch-manipulation"
                  >
                    Remove
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
                    type="button"
                    onClick={() => defectPhotoInputRefs.current[defect.id]?.click()}
                    disabled={uploadingDefectId === defect.id}
                    className="w-full h-11 rounded-xl border border-dashed border-white/[0.25] flex items-center justify-center text-sm font-medium text-white touch-manipulation active:scale-[0.98] disabled:opacity-50"
                  >
                    {uploadingDefectId === defect.id ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      'Add photo'
                    )}
                  </button>
                </div>
              )}
            </div>
          )
        )}

        <button
          type="button"
          onClick={addDefect}
          className="w-full h-11 rounded-xl border border-dashed border-white/[0.25] flex items-center justify-center text-sm font-medium text-white touch-manipulation active:scale-[0.98]"
        >
          Add defect
        </button>
      </div>

      {/* Photo Evidence */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Photo evidence" />
        <p className="text-xs text-white/80">
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

      {/* Scroll room so the last reading can rise clear of the keypad */}
      {keypad.spacer}

      {/* Reading keypad — coarse-pointer devices only */}
      {keypad.element}
    </div>
  );
};

export default EmergencyLightingTestResults;
