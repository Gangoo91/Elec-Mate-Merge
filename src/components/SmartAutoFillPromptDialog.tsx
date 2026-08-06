import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ChevronLeft, X } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import { CIRCUIT_PRESETS } from '@/constants/circuitPresets';

interface SmartAutoFillPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUseAutoFill: (circuitType?: string, suggestions?: Partial<TestResult>) => void;
  onSkip: () => void;
  circuitNumber: string;
}

// Circuit presets. Values verified against src/utils/circuitDefaults.ts
// (pickCableSize / getCpcForLive / BS_STANDARD_MAP) and the Minor Works
// verified presets (MWSmartDefaults). Field value formats match the schedule
// selects exactly:
//   typeOfWiring  — BS 7671 model-form codes (wiringTypeOptions): A = T&E,
//                   F = SWA (thermoplastic), O = other (e.g. fire-resistant)
//   bsStandard    — combined form from bsStandardOptions, e.g. 'MCB (BS EN 60898)'
//   referenceMethod — Appendix 4 codes (referenceMethodOptions)
// Presets now live in one place — `@/constants/circuitPresets`. This file,
// `CompactCircuitAutoFillSection` and `CircuitAutoFillButton` each carried their
// own copy and they had drifted: the same "Downstairs Ring" produced 2.5mm vs
// 2.5 (breaking the ring detector), reference method A vs C (Iz 20 vs 27) and
// `bsStandard: 'MCB'` vs `'RCBO (BS EN 61009)'` (the first resolves no maximum
// Zs at all). Same button, three different circuits.
const circuitTypes = CIRCUIT_PRESETS;

const categories = ['Lighting', 'Sockets', 'Appliances', 'Modern', 'Commercial', 'Industrial'];

// '2.5mm' → '2.5', '10mm' → '10'
const stripMm = (v?: string) => (v || '').replace(/mm$/, '');

// Quiet mono summary of what the preset prefills, e.g.
// "32A Type B RCBO · 2.5/1.5mm² · ref A · 30mA RCD Type A"
const presetSummary = (s: Partial<TestResult>) => {
  const parts = [
    `${s.protectiveDeviceRating}A Type ${s.protectiveDeviceCurve} ${s.protectiveDeviceType}`,
    `${stripMm(s.liveSize)}/${stripMm(s.cpcSize)}mm²`,
    `ref ${s.referenceMethod}`,
  ];
  if (s.rcdRating) parts.push(`${s.rcdRating}mA RCD Type ${s.rcdType}`);
  return parts.join(' · ');
};

const noFocusRing =
  'outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0';

const SmartAutoFillPromptDialog: React.FC<SmartAutoFillPromptDialogProps> = ({
  open,
  onOpenChange,
  onUseAutoFill,
  onSkip,
  circuitNumber,
}) => {
  const isMobile = useIsMobile();
  const haptic = useHaptic();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCircuitType, setSelectedCircuitType] = useState<string>('');

  // Reset when the sheet closes
  useEffect(() => {
    if (!open) {
      setSelectedCategory('');
      setSelectedCircuitType('');
    }
  }, [open]);

  const filteredCircuits = useMemo(() => {
    if (!selectedCategory) return [];
    return circuitTypes.filter((ct) => ct.category === selectedCategory);
  }, [selectedCategory]);

  const selectedConfig = circuitTypes.find((ct) => ct.type === selectedCircuitType);

  const handlePickCategory = (name: string) => {
    haptic.selection();
    setSelectedCategory(name);
    setSelectedCircuitType('');
  };

  const handleBack = () => {
    haptic.light();
    setSelectedCategory('');
    setSelectedCircuitType('');
  };

  const handlePickCircuit = (type: string) => {
    haptic.selection();
    setSelectedCircuitType(type);
  };

  const handleAddPreset = () => {
    if (!selectedConfig) return;
    haptic.success();
    onUseAutoFill(selectedConfig.type, selectedConfig.suggestions);
  };

  const handleAddBlank = () => {
    haptic.light();
    onSkip();
  };

  const body = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/[0.1] px-4 py-3">
        {selectedCategory && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Back to categories"
            className={cn(
              'flex h-11 w-11 -ml-2 items-center justify-center rounded-xl text-white touch-manipulation active:scale-95',
              noFocusRing
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[15px] font-semibold tracking-tight text-white">
            {selectedCategory
              ? `${selectedCategory} — Way ${circuitNumber}`
              : `Add circuit — Way ${circuitNumber}`}
          </h2>
          {!selectedCategory && (
            <p className="mt-0.5 text-xs text-white/80">
              Start from a preset — device, rating and cable sizes prefilled. Everything stays
              editable.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close"
          className={cn(
            'flex h-11 w-11 -mr-2 items-center justify-center rounded-xl text-white touch-manipulation active:scale-95',
            noFocusRing
          )}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {!selectedCategory ? (
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
            {categories.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => handlePickCategory(name)}
                className={cn(
                  'h-12 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-sm font-medium text-white transition-colors touch-manipulation active:scale-[0.98]',
                  noFocusRing
                )}
              >
                {name}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredCircuits.map((circuit) => {
              const isSelected = selectedCircuitType === circuit.type;
              return (
                <button
                  key={circuit.type}
                  type="button"
                  onClick={() => handlePickCircuit(circuit.type)}
                  className={cn(
                    'w-full rounded-xl border p-3 text-left transition-colors touch-manipulation active:scale-[0.99]',
                    noFocusRing,
                    isSelected
                      ? 'border-elec-yellow bg-elec-yellow'
                      : 'border-white/[0.12] bg-white/[0.06]'
                  )}
                >
                  <span
                    className={cn(
                      'block text-sm font-semibold',
                      isSelected ? 'text-black' : 'text-white'
                    )}
                  >
                    {circuit.type}
                  </span>
                  <span
                    className={cn(
                      'mt-0.5 block font-mono text-[11px] tabular-nums',
                      isSelected ? 'text-black' : 'text-white/80'
                    )}
                  >
                    {presetSummary(circuit.suggestions)}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex gap-3 border-t border-white/[0.1] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={handleAddBlank}
          className={cn(
            'h-12 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.06] text-sm font-medium text-white touch-manipulation active:scale-[0.98]',
            noFocusRing
          )}
        >
          Add blank way
        </button>
        <button
          type="button"
          onClick={handleAddPreset}
          disabled={!selectedConfig}
          className={cn(
            'h-12 flex-1 rounded-xl text-sm font-semibold touch-manipulation active:scale-[0.98] disabled:active:scale-100',
            noFocusRing,
            selectedConfig
              ? 'bg-elec-yellow text-black'
              : 'border border-white/[0.12] bg-white/[0.06] text-white opacity-50'
          )}
        >
          Add circuit
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          hideCloseButton
          className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.14] p-0"
        >
          <VisuallyHidden>
            <SheetTitle>Add circuit — Way {circuitNumber}</SheetTitle>
            <SheetDescription>
              Pick a circuit preset with device, rating and cable sizes prefilled, or add a blank
              way.
            </SheetDescription>
          </VisuallyHidden>
          {body}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        hideCloseButton
        className={cn(
          'flex max-h-[85vh] max-w-lg flex-col overflow-hidden rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-0 shadow-none',
          noFocusRing
        )}
      >
        <VisuallyHidden>
          <DialogTitle>Add circuit — Way {circuitNumber}</DialogTitle>
          <DialogDescription>
            Pick a circuit preset with device, rating and cable sizes prefilled, or add a blank way.
          </DialogDescription>
        </VisuallyHidden>
        {body}
      </DialogContent>
    </Dialog>
  );
};

export default SmartAutoFillPromptDialog;
