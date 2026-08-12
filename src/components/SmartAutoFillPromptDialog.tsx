import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { X } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { getSpareCircuitFields } from '@/utils/spareCircuitFields';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import {
  CIRCUIT_PRESETS,
  PRESET_CATEGORIES,
  describePreset,
  type CircuitPreset,
} from '@/constants/circuitPresets';

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


/**
 * The summary is `describePreset` from the preset module, not a local copy.
 *
 * The local one interpolated every field unconditionally, including
 * `referenceMethod` — which ELE-1509 deliberately removed from the presets,
 * because how a cable is installed is a site observation and cannot be known
 * from a circuit's name. With the field gone the template rendered the string
 * "ref undefined" on every preset in this sheet.
 *
 * `describePreset` guards each part, so a field the presets stop carrying
 * disappears from the summary instead of printing as undefined.
 */

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
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  /**
   * Every preset on one screen, grouped, with a filter — not a drill-down.
   *
   * This used to be category -> preset -> confirm: three interactions to place
   * a circuit whose details the electrician already knew when they opened the
   * sheet. On a 23-way board that is roughly ninety taps before a single test
   * reading is entered.
   *
   * Showing everything also answers a question the drill-down could not: "what
   * can this thing actually do?" A category list hides the answer behind a tap,
   * which is how five board tools stayed invisible for months.
   */
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = (c: CircuitPreset) =>
      !q ||
      c.type.toLowerCase().includes(q) ||
      (c.keywords || []).some((k) => k.toLowerCase().includes(q)) ||
      describePreset(c).toLowerCase().includes(q);

    return PRESET_CATEGORIES.map((category) => ({
      category,
      options: circuitTypes.filter((c) => c.category === category && matches(c)),
    })).filter((g) => g.options.length > 0);
  }, [query]);

  const resultCount = groups.reduce((n, g) => n + g.options.length, 0);

  /** One tap places the circuit. There is no separate confirm step: the card
      already shows the device, cable and RCD it will apply, and everything it
      writes stays editable in the row. */
  const handlePickCircuit = (preset: CircuitPreset) => {
    haptic.success();
    onUseAutoFill(preset.type, preset.suggestions);
  };

  const handleAddBlank = () => {
    haptic.light();
    onSkip();
  };

  /**
   * A spare way, placed in one tap.
   *
   * The cascade already existed — `getSpareCircuitFields()` sets the description
   * to "Spare" and N/As every test and circuit-detail field with 0 points served
   * — but it was only reachable from the Spare button on a row that already
   * existed. Adding a spare therefore meant picking a preset you did not want
   * just to get a row, then overwriting all of it. Boards come with runs of
   * spare ways, so it belongs here, at the point of adding.
   *
   * It sits beside "Add blank way" rather than among the preset tiles: this
   * footer is for the way you want regardless of what the list is showing, and
   * a Spare tile would render its spec line as "N/A · N/A · N/A".
   */
  const handleAddSpare = () => {
    haptic.success();
    onUseAutoFill('Spare', getSpareCircuitFields() as Partial<TestResult>);
  };

  const body = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-start gap-2 border-b border-white/[0.1] px-4 py-3">
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[15px] font-semibold tracking-tight text-white">
            Add circuit — Way {circuitNumber}
          </h2>
          <p className="mt-0.5 text-xs text-white">
            One tap fills the device, rating, cable and RCD. Everything stays editable.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close"
          className={cn(
            'flex h-11 w-11 -mr-2 shrink-0 items-center justify-center rounded-xl text-white touch-manipulation active:scale-95',
            noFocusRing
          )}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Filter — typing narrows every group at once, so a known circuit is
          reachable without hunting for which category it lives in. */}
      <div className="border-b border-white/[0.1] px-4 py-2.5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search — kitchen, ring, cooker, shower…"
          aria-label="Search circuit presets"
          className={cn(
            'h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-[14px] font-medium text-white placeholder:text-white/40 caret-elec-yellow',
            'focus:border-elec-yellow focus:outline-none touch-manipulation'
          )}
        />
      </div>

      {/* Gallery */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {resultCount === 0 ? (
          <p className="py-8 text-center text-sm font-medium text-white">
            Nothing matches “{query.trim()}”. Add a blank way and type the circuit yourself.
          </p>
        ) : (
          <div className="space-y-5">
            {groups.map((group) => (
              <section key={group.category}>
                <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-white">
                  {group.category}
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {group.options.map((preset) => (
                    <button
                      key={preset.type}
                      type="button"
                      onClick={() => handlePickCircuit(preset)}
                      className={cn(
                        'rounded-xl border border-white/[0.12] bg-white/[0.06] p-3 text-left',
                        'transition-colors duration-150 ease-out hover:border-elec-yellow/50 hover:bg-white/[0.1]',
                        'touch-manipulation active:scale-[0.99]',
                        noFocusRing
                      )}
                    >
                      <span className="block text-sm font-semibold text-white">{preset.type}</span>
                      {/* The spec, in the electrician's own shorthand. Shown on
                          the card because a preset you cannot inspect is a
                          preset you have to undo. */}
                      <span className="mt-1 block font-mono text-[11px] leading-snug text-white/85">
                        {describePreset(preset)}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Footer — a blank way is the escape hatch for the circuits no list
          will ever hold, and stays available whatever the filter shows. */}
      <div className="border-t border-white/[0.1] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleAddSpare}
            className={cn(
              'h-12 w-full rounded-xl border border-white/[0.12] bg-white/[0.06] text-sm font-semibold text-white touch-manipulation active:scale-[0.98]',
              noFocusRing
            )}
          >
            Add spare way
          </button>
          <button
            type="button"
            onClick={handleAddBlank}
            className={cn(
              'h-12 w-full rounded-xl border border-white/[0.12] bg-white/[0.06] text-sm font-semibold text-white touch-manipulation active:scale-[0.98]',
              noFocusRing
            )}
          >
            Add blank way
          </button>
        </div>
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
