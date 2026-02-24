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
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  ScanBarcode,
  RotateCcw,
  Copy,
  ClipboardPaste,
  CheckCircle2,
  XCircle,
  Sparkles,
  Loader2,
} from 'lucide-react';
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
}

/** Three-button result group: Pass / Fail / N/A */
const ResultButtonGroup: React.FC<{
  result: TestResult;
  onChange: (value: TestResult) => void;
  size?: 'sm' | 'md';
}> = ({ result, onChange, size = 'sm' }) => {
  const base =
    size === 'md'
      ? 'h-11 px-3 text-sm font-semibold rounded-lg'
      : 'h-9 px-2.5 text-xs font-semibold rounded-lg';

  const options: { value: TestResult; label: string }[] = [
    { value: 'pass', label: 'Pass' },
    { value: 'fail', label: 'Fail' },
    { value: 'na', label: 'N/A' },
  ];

  return (
    <div className="flex gap-1">
      {options.map((opt) => {
        const isActive = result === opt.value;
        let activeClasses = 'bg-white/[0.06] text-white border-white/[0.08]';
        if (isActive && opt.value === 'pass') {
          activeClasses = 'bg-green-500/15 text-green-400 border-green-500/20';
        } else if (isActive && opt.value === 'fail') {
          activeClasses = 'bg-red-500/15 text-red-400 border-red-500/20';
        } else if (isActive && opt.value === 'na') {
          activeClasses = 'bg-blue-500/15 text-blue-400 border-blue-500/20';
        }

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(isActive ? '' : opt.value)}
            className={cn(base, 'border transition-all touch-manipulation', activeClasses)}
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
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aiPhotoInputRef = useRef<HTMLInputElement>(null);
  const [scannerOpen, setScannerOpen] = useState(false);
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
        leakageCurrent: undefined,
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
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 bg-[#242428] border-b border-white/[0.08] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-white/10 touch-manipulation"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <span className="text-sm font-semibold text-white">
                  Appliance {applianceIndex + 1} of {totalAppliances}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-white/10 touch-manipulation"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-32">
              <div className="p-4 space-y-6">
                {/* AI Identify + Photos — combined section */}
                <div className="space-y-3">
                  {/* AI Identify card */}
                  <button
                    type="button"
                    disabled={isIdentifying}
                    onClick={() => aiPhotoInputRef.current?.click()}
                    className="w-full rounded-2xl overflow-hidden touch-manipulation active:scale-[0.98] transition-transform"
                  >
                    <div
                      className={cn(
                        'relative px-4 py-3.5 flex items-center gap-3',
                        'bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-500/20',
                        'border border-purple-500/25'
                      )}
                      style={{ borderRadius: 'inherit' }}
                    >
                      <div className="h-10 w-10 rounded-xl bg-purple-500/25 flex items-center justify-center shrink-0">
                        {isIdentifying ? (
                          <Loader2 className="h-5 w-5 text-purple-300 animate-spin" />
                        ) : (
                          <Sparkles className="h-5 w-5 text-purple-300" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <span className="text-sm font-semibold text-white block">
                          {isIdentifying ? 'Identifying...' : 'AI Identify'}
                        </span>
                        <span className="text-xs text-white block">
                          {isIdentifying
                            ? 'Analysing photo with Gemini'
                            : 'Snap a photo — auto-fills all fields'}
                        </span>
                      </div>
                      <div className="shrink-0">
                        <Camera className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </button>

                  {/* Photo thumbnails */}
                  <div className="flex flex-wrap gap-2">
                    {(appliance.photos || []).map((photo, i) => (
                      <div
                        key={i}
                        className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.06]"
                      >
                        <img
                          src={photo}
                          alt={`Photo ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          className="absolute top-0.5 right-0.5 h-5 w-5 bg-black/70 rounded-full flex items-center justify-center touch-manipulation"
                        >
                          <X className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-20 h-20 rounded-xl border-2 border-dashed border-white/[0.12] flex flex-col items-center justify-center gap-1 text-white touch-manipulation hover:bg-white/[0.04] transition-colors"
                    >
                      <Camera className="h-5 w-5" />
                      <span className="text-[10px]">Add</span>
                    </button>
                  </div>
                </div>

                {/* Asset Details */}
                <div className="space-y-3">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Asset Details
                  </h3>

                  <div className="space-y-3">
                    {/* Asset Number + Scan */}
                    <div>
                      <Label className="text-white text-sm">Asset No.</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="e.g., PAT001"
                          value={appliance.assetNumber || ''}
                          onChange={(e) => update('assetNumber', e.target.value)}
                          className="h-11 text-base touch-manipulation flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => setScannerOpen(true)}
                          className="h-11 w-11 shrink-0 touch-manipulation"
                          title="Scan barcode"
                        >
                          <ScanBarcode className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <Label className="text-white text-sm">Description</Label>
                      <Input
                        placeholder="e.g., Kettle, Monitor, Drill"
                        value={appliance.description || ''}
                        onChange={(e) => update('description', e.target.value)}
                        className="h-11 text-base touch-manipulation"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <Label className="text-white text-sm">Location</Label>
                      <PATLocationPicker
                        value={appliance.location || ''}
                        onChange={(v) => update('location', v)}
                        recentLocations={recentLocations}
                        onAddRecent={onAddRecentLocation}
                      />
                    </div>

                    {/* Make / Model */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-white text-sm">Make</Label>
                        <Input
                          placeholder="Manufacturer"
                          value={appliance.make || ''}
                          onChange={(e) => update('make', e.target.value)}
                          className="h-11 text-base touch-manipulation"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-sm">Model</Label>
                        <Input
                          placeholder="Model"
                          value={appliance.model || ''}
                          onChange={(e) => update('model', e.target.value)}
                          className="h-11 text-base touch-manipulation"
                        />
                      </div>
                    </div>

                    {/* Serial */}
                    <div>
                      <Label className="text-white text-sm">Serial No.</Label>
                      <Input
                        placeholder="Serial number"
                        value={appliance.serialNumber || ''}
                        onChange={(e) => update('serialNumber', e.target.value)}
                        className="h-11 text-base touch-manipulation"
                      />
                    </div>

                    {/* Class - Segmented Toggle */}
                    <div>
                      <Label className="text-white text-sm">Class</Label>
                      <div className="flex gap-2 mt-1">
                        {(['I', 'II', 'III'] as ApplianceClass[]).map((cls) => (
                          <button
                            key={cls}
                            type="button"
                            onClick={() => update('applianceClass', cls)}
                            className={cn(
                              'flex-1 h-11 rounded-lg text-sm font-semibold border-2 transition-all touch-manipulation',
                              appliance.applianceClass === cls
                                ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                                : 'bg-white/[0.06] border-white/[0.08] text-white'
                            )}
                          >
                            {cls}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <Label className="text-white text-sm">Category</Label>
                      <Select
                        value={appliance.category || 'portable'}
                        onValueChange={(v) => update('category', v as ApplianceCategory)}
                      >
                        <SelectTrigger className="h-11 touch-manipulation">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="z-[200]">
                          <SelectItem value="hand-held">Hand-held</SelectItem>
                          <SelectItem value="portable">Portable</SelectItem>
                          <SelectItem value="moveable">Moveable</SelectItem>
                          <SelectItem value="stationary">Stationary</SelectItem>
                          <SelectItem value="fixed">Fixed</SelectItem>
                          <SelectItem value="IT">IT Equipment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Visual Inspection */}
                <div className="space-y-3">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Visual Inspection
                  </h3>

                  <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl divide-y divide-white/[0.06]">
                    {/* Flex */}
                    <div className="flex items-center justify-between p-3">
                      <span className="text-white text-sm">Flex / Cable</span>
                      <ResultButtonGroup
                        result={appliance.visualInspection.flexCondition}
                        onChange={(v) => updateVisual('flexCondition', v)}
                      />
                    </div>
                    {/* Plug */}
                    <div className="flex items-center justify-between p-3">
                      <span className="text-white text-sm">Plug</span>
                      <ResultButtonGroup
                        result={appliance.visualInspection.plugCondition}
                        onChange={(v) => updateVisual('plugCondition', v)}
                      />
                    </div>
                    {/* Fuse Rating */}
                    <div className="flex items-center justify-between p-3">
                      <span className="text-white text-sm">Fuse Rating</span>
                      <div className="flex gap-1">
                        {['3A', '5A', '13A'].map((fuse) => (
                          <button
                            key={fuse}
                            type="button"
                            onClick={() => updateVisual('fuseRating', fuse)}
                            className={cn(
                              'h-9 px-3 text-xs font-semibold rounded-lg border transition-all touch-manipulation',
                              appliance.visualInspection.fuseRating === fuse
                                ? 'bg-blue-500/15 text-blue-400 border-blue-500/20'
                                : 'bg-white/[0.06] text-white border-white/[0.08]'
                            )}
                          >
                            {fuse}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Enclosure */}
                    <div className="flex items-center justify-between p-3">
                      <span className="text-white text-sm">Enclosure</span>
                      <ResultButtonGroup
                        result={appliance.visualInspection.enclosureCondition}
                        onChange={(v) => updateVisual('enclosureCondition', v)}
                      />
                    </div>
                    {/* Switches */}
                    <div className="flex items-center justify-between p-3">
                      <span className="text-white text-sm">Switches / Controls</span>
                      <ResultButtonGroup
                        result={appliance.visualInspection.switchesControls}
                        onChange={(v) => updateVisual('switchesControls', v)}
                      />
                    </div>
                    {/* Environment */}
                    <div className="flex items-center justify-between p-3">
                      <span className="text-white text-sm">Environment</span>
                      <ResultButtonGroup
                        result={appliance.visualInspection.suitableForEnvironment}
                        onChange={(v) => updateVisual('suitableForEnvironment', v)}
                      />
                    </div>
                  </div>
                </div>

                {/* Electrical Tests */}
                <div className="space-y-3">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    Electrical Tests
                  </h3>

                  <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl divide-y divide-white/[0.06]">
                    {/* Earth Continuity */}
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">Earth Continuity</span>
                        <ResultButtonGroup
                          result={appliance.electricalTests.earthContinuity.result}
                          onChange={(v) => updateElectricalNested('earthContinuity', 'result', v)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Reading"
                            value={appliance.electricalTests.earthContinuity.reading || ''}
                            onChange={(e) =>
                              updateElectricalNested('earthContinuity', 'reading', e.target.value)
                            }
                            className="h-10 text-sm touch-manipulation"
                            inputMode="decimal"
                          />
                        </div>
                        <div className="flex items-center px-2 bg-white/[0.04] rounded-lg border border-white/[0.06] text-white text-xs">
                          &Omega;
                        </div>
                      </div>
                    </div>

                    {/* Insulation Resistance */}
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">
                          Insulation Resistance
                        </span>
                        <ResultButtonGroup
                          result={appliance.electricalTests.insulationResistance.result}
                          onChange={(v) =>
                            updateElectricalNested('insulationResistance', 'result', v)
                          }
                        />
                      </div>
                      <div className="flex gap-2">
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
                            className="h-10 text-sm touch-manipulation"
                            inputMode="decimal"
                          />
                        </div>
                        <div className="flex items-center px-2 bg-white/[0.04] rounded-lg border border-white/[0.06] text-white text-xs">
                          M&Omega;
                        </div>
                      </div>
                    </div>

                    {/* Load Test */}
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">Load Test</span>
                        <ResultButtonGroup
                          result={appliance.electricalTests.loadTest?.result || ''}
                          onChange={(v) => updateElectricalNested('loadTest', 'result', v)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Reading"
                            value={appliance.electricalTests.loadTest?.reading || ''}
                            onChange={(e) =>
                              updateElectricalNested('loadTest', 'reading', e.target.value)
                            }
                            className="h-10 text-sm touch-manipulation"
                            inputMode="decimal"
                          />
                        </div>
                        <div className="flex items-center px-2 bg-white/[0.04] rounded-lg border border-white/[0.06] text-white text-xs">
                          kVA
                        </div>
                      </div>
                    </div>

                    {/* Leakage Current */}
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">Leakage Current</span>
                        <ResultButtonGroup
                          result={appliance.electricalTests.leakageCurrent?.result || ''}
                          onChange={(v) => updateElectricalNested('leakageCurrent', 'result', v)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Reading"
                            value={appliance.electricalTests.leakageCurrent?.reading || ''}
                            onChange={(e) =>
                              updateElectricalNested('leakageCurrent', 'reading', e.target.value)
                            }
                            className="h-10 text-sm touch-manipulation"
                            inputMode="decimal"
                          />
                        </div>
                        <div className="flex items-center px-2 bg-white/[0.04] rounded-lg border border-white/[0.06] text-white text-xs">
                          mA
                        </div>
                      </div>
                    </div>

                    {/* Polarity */}
                    <div className="flex items-center justify-between p-3">
                      <span className="text-white text-sm font-medium">Polarity</span>
                      <ResultButtonGroup
                        result={appliance.electricalTests.polarity}
                        onChange={(v) => updateElectrical('polarity', v)}
                      />
                    </div>

                    {/* Functional Check */}
                    <div className="flex items-center justify-between p-3">
                      <span className="text-white text-sm font-medium">Functional Check</span>
                      <ResultButtonGroup
                        result={appliance.electricalTests.functionalCheck}
                        onChange={(v) => updateElectrical('functionalCheck', v)}
                      />
                    </div>
                  </div>
                </div>

                {/* Overall Result Card */}
                <div
                  className={cn(
                    'rounded-2xl border-2 p-4 space-y-3',
                    displayResult === 'pass'
                      ? 'bg-green-500/10 border-green-500/30'
                      : displayResult === 'fail'
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-white/[0.06] border-white/[0.08]'
                  )}
                >
                  {/* Overall result toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {displayResult === 'pass' ? (
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                      ) : displayResult === 'fail' ? (
                        <XCircle className="h-6 w-6 text-red-400" />
                      ) : (
                        <div className="h-6 w-6 rounded-full border-2 border-white/20" />
                      )}
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
                          ? 'PASSED'
                          : displayResult === 'fail'
                            ? 'FAILED'
                            : 'Untested'}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => update('overallResult', 'pass')}
                        className={cn(
                          'h-10 px-4 rounded-lg text-sm font-semibold border transition-all touch-manipulation',
                          (appliance.overallResult || autoResult) === 'pass'
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-white/[0.06] text-white border-white/[0.08]'
                        )}
                      >
                        Pass
                      </button>
                      <button
                        type="button"
                        onClick={() => update('overallResult', 'fail')}
                        className={cn(
                          'h-10 px-4 rounded-lg text-sm font-semibold border transition-all touch-manipulation',
                          (appliance.overallResult || autoResult) === 'fail'
                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                            : 'bg-white/[0.06] text-white border-white/[0.08]'
                        )}
                      >
                        Fail
                      </button>
                    </div>
                  </div>

                  {/* Repair Code */}
                  <div>
                    <Label className="text-white text-sm">Repair Code</Label>
                    <Select
                      value={appliance.repairCode || ''}
                      onValueChange={(v) => update('repairCode', v as PATRepairCode)}
                    >
                      <SelectTrigger className="h-11 touch-manipulation">
                        <SelectValue placeholder="N/A — No repair needed" />
                      </SelectTrigger>
                      <SelectContent className="z-[200]">
                        {PAT_REPAIR_CODES.map((code) => (
                          <SelectItem key={code.value} value={code.value || '_none'}>
                            {code.value
                              ? `${code.value} — ${code.label.split(' — ')[1] || code.label}`
                              : code.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Next Test Due */}
                  <div>
                    <Label className="text-white text-sm">Next Test Due</Label>
                    <Input
                      type="date"
                      value={appliance.nextTestDue || ''}
                      onChange={(e) => update('nextTestDue', e.target.value)}
                      className="h-11 text-base touch-manipulation"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <Label className="text-white text-sm">Notes</Label>
                    <Textarea
                      placeholder="Additional notes for this appliance..."
                      value={appliance.notes || ''}
                      onChange={(e) => update('notes', e.target.value)}
                      className="touch-manipulation text-base min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3 px-1">
                  <button
                    type="button"
                    onClick={handleCopyData}
                    className="flex items-center gap-1.5 text-sm text-blue-400 font-medium touch-manipulation"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy Test Data
                  </button>
                  {copiedData && (
                    <button
                      type="button"
                      onClick={handlePasteData}
                      className="flex items-center gap-1.5 text-sm text-green-400 font-medium touch-manipulation"
                    >
                      <ClipboardPaste className="h-3.5 w-3.5" />
                      Paste
                    </button>
                  )}
                  <div className="flex-1" />
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-sm text-red-400 font-medium touch-manipulation"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Sticky Footer Navigation */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#242428] border-t border-white/[0.08] p-3 pb-6 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                onClick={() => onNavigate('prev')}
                disabled={applianceIndex === 0}
                className="h-12 px-5 touch-manipulation"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Prev
              </Button>

              <div className="text-center">
                <span className="text-xs text-white">
                  {applianceIndex + 1} / {totalAppliances}
                </span>
              </div>

              {applianceIndex < totalAppliances - 1 ? (
                <Button
                  onClick={handleSaveAndNext}
                  className="h-12 px-5 bg-blue-500 hover:bg-blue-600 text-white font-semibold touch-manipulation"
                >
                  Save & Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={onClose}
                  className="h-12 px-5 bg-green-500 hover:bg-green-600 text-white font-semibold touch-manipulation"
                >
                  Done
                </Button>
              )}
            </div>
          </div>
        </SheetContent>

        {/* Barcode / Serial Number Scanner */}
        <SerialNumberScannerSheet
          open={scannerOpen}
          onOpenChange={setScannerOpen}
          onSerialExtracted={(serial, photoBase64) => {
            update('assetNumber', serial);
            update('barcodeScanned', true);
            // Add the scanned photo to the appliance photos
            if (photoBase64) {
              const dataUrl = photoBase64.startsWith('data:')
                ? photoBase64
                : `data:image/jpeg;base64,${photoBase64}`;
              onUpdateAppliance({
                ...appliance,
                assetNumber: serial,
                barcodeScanned: true,
                photos: [...(appliance.photos || []), dataUrl],
              });
            }
            setScannerOpen(false);
          }}
        />
      </Sheet>
    </>
  );
};

export default PATTestSheet;
