/**
 * PATTestSheet — 85vh bottom sheet for per-appliance testing
 *
 * Everything for one appliance in a single scrollable sheet:
 * photo capture, barcode scan, visual inspection, electrical tests,
 * result card, copy/paste, prev/next navigation.
 */

import React, { useState, useRef, useCallback } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Appliance,
  TestResult,
  ApplianceClass,
  ApplianceCategory,
  PAT_REPAIR_CODES,
  PATRepairCode,
} from '@/types/pat-testing';
import PATLocationPicker from './PATLocationPicker';
import { SerialNumberScannerSheet } from '@/components/inspection/fire-alarm/SerialNumberScannerSheet';

/* ─── Shared style tokens ─── */
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const voltCn = 'bg-elec-yellow border border-elec-yellow text-black font-semibold';
const neutralCn = 'bg-white/[0.06] border border-white/[0.12] text-white font-medium';

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

interface PATTestSheetProps {
  open: boolean;
  onClose: () => void;
  appliance: Appliance;
  applianceIndex: number;
  totalAppliances: number;
  onUpdateAppliance: (updated: Appliance) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onCopyData: (data: Partial<Appliance>) => void;
  copiedData: Partial<Appliance> | null;
  recentLocations: string[];
  onAddRecentLocation: (location: string) => void;
  /** Open the barcode/serial scanner as soon as the sheet mounts (Scan button flow). */
  openScannerOnMount?: boolean;
}

/** Three-button result group: Pass / Fail / N/A */
const ResultButtonGroup: React.FC<{
  result: TestResult;
  onChange: (value: TestResult) => void;
  size?: 'sm' | 'md';
}> = ({ result, onChange, size = 'sm' }) => {
  const base =
    size === 'md'
      ? 'h-11 px-3 text-sm rounded-lg'
      : 'h-11 px-2.5 text-xs rounded-lg';

  const options: { value: TestResult; label: string }[] = [
    { value: 'pass', label: 'Pass' },
    { value: 'fail', label: 'Fail' },
    { value: 'na', label: 'N/A' },
  ];

  return (
    <div className="flex gap-1">
      {options.map((opt) => {
        const isActive = result === opt.value;
        let activeClasses = neutralCn;
        if (isActive && opt.value === 'pass') {
          activeClasses = 'bg-green-500 border border-green-500 text-black font-semibold';
        } else if (isActive && opt.value === 'fail') {
          activeClasses = 'bg-red-500 border border-red-500 text-white font-semibold';
        } else if (isActive && opt.value === 'na') {
          activeClasses = 'bg-white border border-white text-black font-semibold';
        }

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(isActive ? '' : opt.value)}
            className={cn(base, 'transition-all touch-manipulation active:scale-[0.98]', activeClasses)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

const PATTestSheet: React.FC<PATTestSheetProps> = ({
  open,
  onClose,
  appliance,
  applianceIndex,
  totalAppliances,
  onUpdateAppliance,
  onNavigate,
  onCopyData,
  copiedData,
  recentLocations,
  onAddRecentLocation,
  openScannerOnMount = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aiPhotoInputRef = useRef<HTMLInputElement>(null);
  const [scannerOpen, setScannerOpen] = useState(openScannerOnMount);
  const [isIdentifying, setIsIdentifying] = useState(false);

  // Helper to update a field on the current appliance
  const update = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (field: string, value: any) => {
      onUpdateAppliance({ ...appliance, [field]: value });
    },
    [appliance, onUpdateAppliance]
  );

  const updateVisual = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (field: string, value: any) => {
      onUpdateAppliance({
        ...appliance,
        visualInspection: { ...appliance.visualInspection, [field]: value },
      });
    },
    [appliance, onUpdateAppliance]
  );

  const updateElectrical = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (field: string, value: any) => {
      onUpdateAppliance({
        ...appliance,
        electricalTests: { ...appliance.electricalTests, [field]: value },
      });
    },
    [appliance, onUpdateAppliance]
  );

  const updateElectricalNested = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (testName: string, field: string, value: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const existing = (appliance.electricalTests as any)[testName] || {};
      onUpdateAppliance({
        ...appliance,
        electricalTests: {
          ...appliance.electricalTests,
          [testName]: { ...existing, [field]: value },
        },
      });
    },
    [appliance, onUpdateAppliance]
  );

  // Auto-calculate overall result from individual results
  const calculateOverallResult = (): 'pass' | 'fail' | '' => {
    const vi = appliance.visualInspection;
    const et = appliance.electricalTests;

    const allResults: TestResult[] = [
      vi.flexCondition,
      vi.plugCondition,
      vi.enclosureCondition,
      vi.switchesControls,
      vi.suitableForEnvironment,
      et.earthContinuity.result,
      et.insulationResistance.result,
      et.loadTest?.result || '',
      et.polarity,
      et.functionalCheck,
      et.leakageCurrent?.result || '',
    ];

    const hasAnyResult = allResults.some((r) => r !== '');
    if (!hasAnyResult) return '';

    const hasFail = allResults.some((r) => r === 'fail');
    if (hasFail) return 'fail';

    return 'pass';
  };

  const autoResult = calculateOverallResult();
  const displayResult = appliance.overallResult || autoResult;

  // Resize + compress an image file to JPEG data URL
  const compressImage = (file: File, maxSize: number, quality: number): Promise<string> =>
    new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          const ratio = Math.min(maxSize / width, maxSize / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        // Fallback: read as-is
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      };
      img.src = url;
    });

  // Photo capture — compress + store
  const handlePhotoCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    e.target.value = '';

    // Compress all photos to max 1200px, 0.7 quality
    const compressed = await Promise.all(Array.from(files).map((f) => compressImage(f, 1200, 0.7)));
    onUpdateAppliance({
      ...appliance,
      photos: [...(appliance.photos || []), ...compressed],
    });
  };

  // AI Identify — compress small, send to Gemini, fill fields
  const handleAIIdentify = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    setIsIdentifying(true);
    try {
      // Compress aggressively for speed: 800px max, 0.5 quality (~50-100KB)
      const dataUrl = await compressImage(file, 800, 0.5);
      const base64 = dataUrl.split(',')[1];

      // Also make a better quality version for the gallery
      const galleryUrl = await compressImage(file, 1200, 0.7);

      const { data, error } = await supabase.functions.invoke('identify-pat-appliance', {
        body: { image_base64: base64, image_type: 'image/jpeg' },
      });

      if (error) throw new Error(error.message || 'Failed to identify appliance');
      if (!data?.success) throw new Error(data?.error || 'Identification failed');

      const info = data.appliance;
      onUpdateAppliance({
        ...appliance,
        description: info.description || appliance.description,
        make: info.make || appliance.make,
        model: info.model || appliance.model,
        serialNumber: info.serial_number || appliance.serialNumber,
        assetNumber: info.asset_number || appliance.assetNumber,
        category: info.category || appliance.category,
        applianceClass: info.appliance_class || appliance.applianceClass,
        photos: [...(appliance.photos || []), galleryUrl],
      });

      toast.success(`Identified: ${info.description}${info.make ? ` (${info.make})` : ''}`, {
        description: `Class ${info.appliance_class} — ${info.category}`,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to identify appliance');
    } finally {
      setIsIdentifying(false);
    }
  };

  const removePhoto = (index: number) => {
    const photos = [...(appliance.photos || [])];
    photos.splice(index, 1);
    update('photos', photos);
  };

  // Copy appliance test data (NOT asset/serial/location/photos)
  const handleCopyData = () => {
    const { visualInspection, electricalTests, overallResult, repairCode, notes } = appliance;
    onCopyData({ visualInspection, electricalTests, overallResult, repairCode, notes });
  };

  // Paste copied data
  const handlePasteData = () => {
    if (!copiedData) return;
    onUpdateAppliance({
      ...appliance,
      ...copiedData,
    });
  };

  // Reset test results
  const handleReset = () => {
    onUpdateAppliance({
      ...appliance,
      visualInspection: {
        flexCondition: '',
        plugCondition: '',
        fuseRating: '',
        enclosureCondition: '',
        switchesControls: '',
        suitableForEnvironment: '',
        notes: '',
      },
      electricalTests: {
        earthContinuity: { result: '', reading: '', limit: '0.1' },
        insulationResistance: { result: '', reading: '', limit: '1.0' },
        loadTest: { result: '', reading: '', limit: '' },
        polarity: '',
        functionalCheck: '',
        leakageCurrent: { result: '', reading: '', limit: '5.0' },
      },
      overallResult: '',
      repairCode: '',
      notes: '',
    });
  };

  // Save & navigate next
  const handleSaveAndNext = () => {
    // Auto-set overall result if not manually set
    if (!appliance.overallResult && autoResult) {
      update('overallResult', autoResult);
    }
    onNavigate('next');
  };

  /* ─── Select options ─── */
  const categoryOptions = [
    { value: 'hand-held', label: 'Hand-held' },
    { value: 'portable', label: 'Portable' },
    { value: 'moveable', label: 'Moveable' },
    { value: 'stationary', label: 'Stationary' },
    { value: 'fixed', label: 'Fixed' },
    { value: 'IT', label: 'IT Equipment' },
  ];

  const repairCodeOptions = PAT_REPAIR_CODES.map((code) => ({
    value: code.value || '_none',
    label: code.value
      ? `${code.value} — ${code.label.split(' — ')[1] || code.label}`
      : code.label,
  }));

  return (
    <>
      {/* File inputs at root level — outside Sheet portal to avoid iOS/Safari picker bugs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handlePhotoCapture}
        className="hidden"
      />
      <input
        ref={aiPhotoInputRef}
        type="file"
        accept="image/*"
        onChange={handleAIIdentify}
        className="hidden"
      />
      <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
        <SheetContent side="bottom" className="h-[85vh] p-0 bg-background border-white/[0.08] rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            {/* Sticky header */}
            <div className="sticky top-0 z-20 bg-background border-b border-white/[0.08] px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('prev')}
                  disabled={applianceIndex === 0}
                  className={cn(
                    'h-11 px-3.5 flex items-center justify-center rounded-xl text-sm touch-manipulation disabled:opacity-30 active:scale-[0.97] transition-all',
                    neutralCn
                  )}
                >
                  Prev
                </button>
                <span className="text-sm font-semibold text-white">
                  {applianceIndex + 1} / {totalAppliances}
                </span>
                <button
                  type="button"
                  onClick={handleSaveAndNext}
                  disabled={applianceIndex >= totalAppliances - 1}
                  className={cn(
                    'h-11 px-3.5 flex items-center justify-center rounded-xl text-sm touch-manipulation disabled:opacity-30 active:scale-[0.97] transition-all',
                    neutralCn
                  )}
                >
                  Next
                </button>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className={cn(
                  'h-11 w-11 flex items-center justify-center rounded-xl text-lg leading-none touch-manipulation active:scale-[0.95] transition-all',
                  neutralCn
                )}
              >
                &times;
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto pb-32">
              <div className="p-4 space-y-4">
                {/* ─── AI identify + photos ─── */}
                <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4">
                  <SectionHeader title="Photos & AI identify" />

                  <div className="space-y-3">
                    <button
                      type="button"
                      disabled={isIdentifying}
                      onClick={() => aiPhotoInputRef.current?.click()}
                      className="w-full rounded-xl bg-elec-yellow px-4 py-3 text-left touch-manipulation active:scale-[0.98] transition-transform disabled:bg-elec-yellow disabled:opacity-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <span className="block text-sm font-semibold text-black">
                            {isIdentifying ? 'Identifying...' : 'AI identify'}
                          </span>
                          <span className="block text-xs text-black/70">
                            {isIdentifying
                              ? 'Analysing photo'
                              : 'Snap a photo — auto-fills all fields'}
                          </span>
                        </div>
                        {isIdentifying && (
                          <Loader2 className="h-5 w-5 text-black animate-spin shrink-0" />
                        )}
                      </div>
                    </button>

                    {/* Photo thumbnails */}
                    <div className="flex flex-wrap gap-2">
                      {(appliance.photos || []).map((photo, i) => (
                        <div
                          key={i}
                          className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/[0.12] bg-white/[0.06]"
                        >
                          <img
                            src={photo}
                            alt={`Photo ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(i)}
                            aria-label={`Remove photo ${i + 1}`}
                            className="absolute -top-1 -right-1 h-7 w-7 bg-black/80 rounded-full flex items-center justify-center text-white text-sm leading-none touch-manipulation active:scale-90 transition-transform border border-white/20"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-20 h-20 rounded-xl border-2 border-dashed border-white/[0.15] flex flex-col items-center justify-center gap-1 text-white touch-manipulation active:scale-[0.98] transition-transform"
                      >
                        <span className="text-lg leading-none">+</span>
                        <span className="text-[10px]">Add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* ─── Asset details ─── */}
                <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4">
                  <SectionHeader title="Asset details" />

                  <div className="space-y-4">
                    {/* Asset number + scan */}
                    <div>
                      <label className={labelCn}>Asset number</label>
                      <div className="flex items-end gap-2">
                        <Input
                          placeholder="e.g. PAT001"
                          value={appliance.assetNumber || ''}
                          onChange={(e) => update('assetNumber', e.target.value)}
                          className={cn(inputCn, 'flex-1')}
                        />
                        <button
                          type="button"
                          onClick={() => setScannerOpen(true)}
                          className={cn(
                            'h-11 px-4 shrink-0 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
                            neutralCn
                          )}
                        >
                          Scan
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className={labelCn}>Description</label>
                      <Input
                        placeholder="e.g. Kettle, monitor, drill"
                        value={appliance.description || ''}
                        onChange={(e) => update('description', e.target.value)}
                        className={inputCn}
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className={labelCn}>Location</label>
                      <PATLocationPicker
                        value={appliance.location || ''}
                        onChange={(v) => update('location', v)}
                        recentLocations={recentLocations}
                        onAddRecent={onAddRecentLocation}
                      />
                    </div>

                    {/* Make + model side by side */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <div>
                        <label className={labelCn}>Make</label>
                        <Input placeholder="Manufacturer" value={appliance.make || ''} onChange={(e) => update('make', e.target.value)} className={inputCn} />
                      </div>
                      <div>
                        <label className={labelCn}>Model</label>
                        <Input placeholder="Model" value={appliance.model || ''} onChange={(e) => update('model', e.target.value)} className={inputCn} />
                      </div>
                    </div>

                    {/* Serial + class side by side */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <div>
                        <label className={labelCn}>Serial number</label>
                        <Input placeholder="Serial number" value={appliance.serialNumber || ''} onChange={(e) => update('serialNumber', e.target.value)} className={inputCn} />
                      </div>
                      <div>
                        <label className={labelCn}>Class</label>
                        <div className="flex gap-1.5">
                          {([{ value: 'I' as ApplianceClass, label: 'I' }, { value: 'II' as ApplianceClass, label: 'II' }, { value: 'III' as ApplianceClass, label: 'III' }]).map(({ value, label }) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => update('applianceClass', value)}
                              className={cn(
                                'flex-1 h-11 rounded-lg text-sm transition-all touch-manipulation active:scale-[0.98]',
                                appliance.applianceClass === value ? voltCn : neutralCn
                              )}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className={labelCn}>Category</label>
                      <MobileSelectPicker
                        value={appliance.category || 'portable'}
                        onValueChange={(v) => update('category', v as ApplianceCategory)}
                        options={categoryOptions}
                        placeholder="Select category"
                        title="Appliance category"
                        triggerClassName={pickerTriggerCn}
                      />
                    </div>
                  </div>
                </div>

                {/* ─── Visual inspection ─── */}
                <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4">
                  <SectionHeader title="Visual inspection" />

                  <div>
                    {/* Flex */}
                    <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] py-3">
                      <span className="text-[13px] font-medium text-white">Flex / cable</span>
                      <ResultButtonGroup
                        result={appliance.visualInspection.flexCondition}
                        onChange={(v) => updateVisual('flexCondition', v)}
                      />
                    </div>
                    {/* Plug */}
                    <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] py-3">
                      <span className="text-[13px] font-medium text-white">Plug</span>
                      <ResultButtonGroup
                        result={appliance.visualInspection.plugCondition}
                        onChange={(v) => updateVisual('plugCondition', v)}
                      />
                    </div>
                    {/* Fuse rating */}
                    <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] py-3">
                      <span className="text-[13px] font-medium text-white">Fuse rating</span>
                      <div className="flex gap-1">
                        {['3A', '5A', '13A', 'N/A'].map((fuse) => (
                          <button
                            key={fuse}
                            type="button"
                            onClick={() => updateVisual('fuseRating', fuse)}
                            className={cn(
                              'h-11 px-3 text-xs rounded-lg transition-all touch-manipulation active:scale-[0.98]',
                              appliance.visualInspection.fuseRating === fuse ? voltCn : neutralCn
                            )}
                          >
                            {fuse}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Enclosure */}
                    <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] py-3">
                      <span className="text-[13px] font-medium text-white">Enclosure</span>
                      <ResultButtonGroup
                        result={appliance.visualInspection.enclosureCondition}
                        onChange={(v) => updateVisual('enclosureCondition', v)}
                      />
                    </div>
                    {/* Switches */}
                    <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] py-3">
                      <span className="text-[13px] font-medium text-white">Switches / controls</span>
                      <ResultButtonGroup
                        result={appliance.visualInspection.switchesControls}
                        onChange={(v) => updateVisual('switchesControls', v)}
                      />
                    </div>
                    {/* Environment */}
                    <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] py-3">
                      <span className="text-[13px] font-medium text-white">Environment</span>
                      <ResultButtonGroup
                        result={appliance.visualInspection.suitableForEnvironment}
                        onChange={(v) => updateVisual('suitableForEnvironment', v)}
                      />
                    </div>
                    {/* Visual inspection notes */}
                    <div className="border-t border-white/[0.08] pt-3">
                      <Textarea
                        placeholder="Visual inspection notes (optional)"
                        value={appliance.visualInspection.notes || ''}
                        onChange={(e) => updateVisual('notes', e.target.value)}
                        className={cn(textareaCn, 'min-h-[60px]')}
                      />
                    </div>
                  </div>
                </div>

                {/* ─── Electrical tests ─── */}
                <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4">
                  <SectionHeader title="Electrical tests" />

                  <div>
                    {/* Earth continuity — Class I only */}
                    {appliance.applianceClass === 'I' ? (
                    <div className="border-t border-white/[0.08] py-3 space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[13px] font-medium text-white">Earth continuity</span>
                        <ResultButtonGroup
                          result={appliance.electricalTests.earthContinuity.result}
                          onChange={(v) => updateElectricalNested('earthContinuity', 'result', v)}
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Reading"
                            value={appliance.electricalTests.earthContinuity.reading || ''}
                            onChange={(e) =>
                              updateElectricalNested('earthContinuity', 'reading', e.target.value)
                            }
                            className={inputCn}
                            inputMode="decimal"
                          />
                        </div>
                        <span className="flex h-11 items-center px-1 text-sm text-white/80">
                          &Omega;
                        </span>
                      </div>
                    </div>
                    ) : (
                    <div className="border-t border-white/[0.08] py-3">
                      <span className="text-[13px] text-white/80">Earth continuity — N/A (Class {appliance.applianceClass})</span>
                    </div>
                    )}

                    {/* Insulation resistance */}
                    <div className="border-t border-white/[0.08] py-3 space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[13px] font-medium text-white">
                          Insulation resistance
                        </span>
                        <ResultButtonGroup
                          result={appliance.electricalTests.insulationResistance.result}
                          onChange={(v) =>
                            updateElectricalNested('insulationResistance', 'result', v)
                          }
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Reading"
                            value={appliance.electricalTests.insulationResistance.reading || ''}
                            onChange={(e) =>
                              updateElectricalNested(
                                'insulationResistance',
                                'reading',
                                e.target.value
                              )
                            }
                            className={inputCn}
                            inputMode="decimal"
                          />
                        </div>
                        <span className="flex h-11 items-center px-1 text-sm text-white/80">
                          M&Omega;
                        </span>
                      </div>
                    </div>

                    {/* Load test */}
                    <div className="border-t border-white/[0.08] py-3 space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[13px] font-medium text-white">Load test</span>
                        <ResultButtonGroup
                          result={appliance.electricalTests.loadTest?.result || ''}
                          onChange={(v) => updateElectricalNested('loadTest', 'result', v)}
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Reading"
                            value={appliance.electricalTests.loadTest?.reading || ''}
                            onChange={(e) =>
                              updateElectricalNested('loadTest', 'reading', e.target.value)
                            }
                            className={inputCn}
                            inputMode="decimal"
                          />
                        </div>
                        <span className="flex h-11 items-center px-1 text-sm text-white/80">
                          kVA
                        </span>
                      </div>
                    </div>

                    {/* Leakage current — required for Class II/III */}
                    <div className="border-t border-white/[0.08] py-3 space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[13px] font-medium text-white">
                          Leakage current{appliance.applianceClass !== 'I' ? ' *' : ''}
                        </span>
                        <ResultButtonGroup
                          result={appliance.electricalTests.leakageCurrent.result || ''}
                          onChange={(v) => updateElectricalNested('leakageCurrent', 'result', v)}
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Reading"
                            value={appliance.electricalTests.leakageCurrent.reading || ''}
                            onChange={(e) =>
                              updateElectricalNested('leakageCurrent', 'reading', e.target.value)
                            }
                            className={inputCn}
                            inputMode="decimal"
                          />
                        </div>
                        <span className="flex h-11 items-center px-1 text-sm text-white/80">
                          mA
                        </span>
                      </div>
                    </div>

                    {/* Polarity */}
                    <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] py-3">
                      <span className="text-[13px] font-medium text-white">Polarity</span>
                      <ResultButtonGroup
                        result={appliance.electricalTests.polarity}
                        onChange={(v) => updateElectrical('polarity', v)}
                      />
                    </div>

                    {/* Functional check */}
                    <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] py-3">
                      <span className="text-[13px] font-medium text-white">Functional check</span>
                      <ResultButtonGroup
                        result={appliance.electricalTests.functionalCheck}
                        onChange={(v) => updateElectrical('functionalCheck', v)}
                      />
                    </div>
                  </div>
                </div>

                {/* ─── Overall result ─── */}
                <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4">
                  <SectionHeader title="Overall result" />

                  <div
                    className={cn(
                      'rounded-xl border bg-white/[0.05] p-4 space-y-4',
                      displayResult === 'pass'
                        ? 'border-green-500/40'
                        : displayResult === 'fail'
                          ? 'border-red-500/40'
                          : 'border-white/[0.12]'
                    )}
                  >
                    {/* Overall result toggle */}
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          'text-lg font-bold',
                          displayResult === 'pass'
                            ? 'text-green-400'
                            : displayResult === 'fail'
                              ? 'text-red-400'
                              : 'text-white'
                        )}
                      >
                        {displayResult === 'pass'
                          ? 'Passed'
                          : displayResult === 'fail'
                            ? 'Failed'
                            : 'Untested'}
                      </span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => update('overallResult', 'pass')}
                          className={cn(
                            'h-11 px-4 rounded-lg text-sm transition-all touch-manipulation active:scale-[0.98]',
                            (appliance.overallResult || autoResult) === 'pass'
                              ? 'bg-green-500 border border-green-500 text-black font-semibold'
                              : neutralCn
                          )}
                        >
                          Pass
                        </button>
                        <button
                          type="button"
                          onClick={() => update('overallResult', 'fail')}
                          className={cn(
                            'h-11 px-4 rounded-lg text-sm transition-all touch-manipulation active:scale-[0.98]',
                            (appliance.overallResult || autoResult) === 'fail'
                              ? 'bg-red-500 border border-red-500 text-white font-semibold'
                              : neutralCn
                          )}
                        >
                          Fail
                        </button>
                      </div>
                    </div>

                    {/* Repair code */}
                    <div>
                      <label className={labelCn}>Repair code</label>
                      <MobileSelectPicker
                        value={appliance.repairCode || '_none'}
                        onValueChange={(v) => update('repairCode', v === '_none' ? '' : v as PATRepairCode)}
                        options={repairCodeOptions}
                        placeholder="N/A — No repair needed"
                        title="Repair code"
                        triggerClassName={pickerTriggerCn}
                      />
                    </div>

                    {/* Next test due */}
                    <div>
                      <label className={labelCn}>Next test due</label>
                      <Input
                        type="date"
                        value={appliance.nextTestDue || ''}
                        onChange={(e) => update('nextTestDue', e.target.value)}
                        className={inputCn}
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className={labelCn}>Notes</label>
                      <Textarea
                        placeholder="Additional notes for this appliance..."
                        value={appliance.notes || ''}
                        onChange={(e) => update('notes', e.target.value)}
                        className={textareaCn}
                      />
                    </div>
                  </div>
                </div>

                {/* ─── Action buttons ─── */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyData}
                    className={cn(
                      'h-11 px-4 rounded-xl text-sm touch-manipulation active:scale-[0.97] transition-all',
                      neutralCn
                    )}
                  >
                    Copy
                  </button>
                  {copiedData && (
                    <button
                      type="button"
                      onClick={handlePasteData}
                      className={cn(
                        'h-11 px-4 rounded-xl text-sm touch-manipulation active:scale-[0.97] transition-all',
                        voltCn
                      )}
                    >
                      Paste
                    </button>
                  )}
                  <div className="flex-1" />
                  <button
                    type="button"
                    onClick={handleReset}
                    className="h-11 px-3 text-sm font-medium text-red-400 touch-manipulation active:scale-[0.97] transition-all"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Sticky footer */}
            <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-white/[0.08] p-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onNavigate('prev')}
                disabled={applianceIndex === 0}
                className={cn(
                  'h-12 px-5 rounded-xl text-sm touch-manipulation disabled:opacity-30 active:scale-[0.98] transition-all',
                  neutralCn
                )}
              >
                Prev
              </button>

              <div className="text-center">
                <span className="text-xs text-white/80">
                  {applianceIndex + 1} / {totalAppliances}
                </span>
              </div>

              {applianceIndex < totalAppliances - 1 ? (
                <button
                  type="button"
                  onClick={handleSaveAndNext}
                  className={cn(
                    'h-12 px-5 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
                    voltCn
                  )}
                >
                  Save & next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    'h-12 px-5 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
                    voltCn
                  )}
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </SheetContent>

        {/* Barcode / serial number scanner */}
        <SerialNumberScannerSheet
          open={scannerOpen}
          onOpenChange={setScannerOpen}
          onSerialExtracted={(serial, photoBase64) => {
            // Single consolidated update — sequential update() calls each
            // spread the same stale appliance closure, so the second call
            // reverted assetNumber whenever the scanner returned no photo.
            const dataUrl = photoBase64
              ? photoBase64.startsWith('data:')
                ? photoBase64
                : `data:image/jpeg;base64,${photoBase64}`
              : null;
            onUpdateAppliance({
              ...appliance,
              assetNumber: serial,
              barcodeScanned: true,
              // Add the scanned photo to the appliance photos
              photos: dataUrl ? [...(appliance.photos || []), dataUrl] : appliance.photos,
            });
            setScannerOpen(false);
          }}
        />
      </Sheet>
    </>
  );
};

export default PATTestSheet;
