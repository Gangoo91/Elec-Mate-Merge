import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircuitInput } from '@/types/installation-design';
import { CircuitCard } from './CircuitCard';
import { CircuitPresetSelector } from './CircuitPresetSelector';
import { QuickAddButtons } from './QuickAddButtons';
import { Eyebrow } from '@/components/college/primitives';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { scopeToCircuits } from '../vision-to-wizard';
import { DesignVisionUpload, type VisionExtractionResult } from '../DesignVisionUpload';

interface CircuitBuilderStepProps {
  circuits: CircuitInput[];
  setCircuits: (circuits: CircuitInput[]) => void;
  installationType: 'domestic' | 'commercial' | 'industrial';
  /** Optional — when set, the file-upload importer (floor plan / schedule /
   *  BoQ / photo) renders alongside the scope-paste button. The handler is
   *  passed back up so the wizard can apply project + supply pre-fills. */
  onVisionExtracted?: (result: VisionExtractionResult) => void;
}

export const CircuitBuilderStep = ({
  circuits,
  setCircuits,
  installationType,
  onVisionExtracted,
}: CircuitBuilderStepProps) => {
  const addCircuit = (circuit: Omit<CircuitInput, 'id'>) => {
    const newCircuit: CircuitInput = {
      id: `circuit-${Date.now()}-${Math.random()}`,
      ...circuit,
    };
    setCircuits([...circuits, newCircuit]);
  };

  const addBlankCircuit = () => {
    addCircuit({
      name: '',
      loadType: 'socket',
      phases: 'single',
      specialLocation: 'none',
      cableLength: 20,
    });
  };

  const updateCircuit = (id: string, updates: Partial<CircuitInput>) => {
    setCircuits(circuits.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCircuit = (id: string) => {
    setCircuits(circuits.filter((c) => c.id !== id));
  };

  const duplicateCircuit = (id: string) => {
    const circuit = circuits.find((c) => c.id === id);
    if (circuit) {
      const { id: _, ...circuitData } = circuit;
      addCircuit({
        ...circuitData,
        name: `${circuit.name} (Copy)`,
      });
    }
  };

  // ── Scope-of-works parser ─────────────────────────────────────────────
  // User pastes a written scope ("Rewire of 3-bed semi, kitchen ring, cooker
  // 32A, shower 40A, ...") and the AI returns a list of suggested circuits
  // they review and edit. Saves typing 8 entries by hand for jobs where a
  // scope exists.
  const [scopeOpen, setScopeOpen] = useState(false);
  const [scopeText, setScopeText] = useState('');
  const [scopeParsing, setScopeParsing] = useState(false);

  // ── File upload importer (floor plan / schedule / BoQ / photo) ────────
  // Sits alongside the scope-paste button — uses the same vision pipeline.
  const [uploadOpen, setUploadOpen] = useState(false);

  const parseScope = async () => {
    const text = scopeText.trim();
    if (!text) {
      toast.error('Paste a scope first');
      return;
    }
    setScopeParsing(true);
    const loading = toast.loading('Parsing scope…', {
      description: 'Usually takes 5–15 seconds.',
    });
    try {
      const { data, error } = await supabase.functions.invoke('extract-design-vision', {
        body: { kind: 'scope', text },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      const parsed = scopeToCircuits(data?.extraction);
      if (parsed.length === 0) {
        toast.error('No circuits inferred from the scope', {
          id: loading,
          description: 'Try adding more detail (rooms, accessories, ratings).',
        });
        return;
      }
      // Append (don't replace) — user might already have circuits.
      setCircuits([...circuits, ...parsed]);
      const assumptions = String(data?.extraction?.assumptions ?? '').trim();
      toast.success(
        `${parsed.length} circuit${parsed.length === 1 ? '' : 's'} added from scope`,
        {
          id: loading,
          description: assumptions
            ? `Assumptions: ${assumptions}`
            : 'Review each one and edit as needed.',
          duration: 8000,
        }
      );
      setScopeOpen(false);
      setScopeText('');
    } catch (err: any) {
      toast.error('Could not parse scope', {
        id: loading,
        description: err?.message ?? 'Try again or build circuits manually.',
      });
    } finally {
      setScopeParsing(false);
    }
  };

  // Total estimated kW for the summary strip
  const totalKw =
    circuits.reduce((sum, c) => sum + (typeof c.loadPower === 'number' ? c.loadPower : 0), 0) /
    1000;
  const hasThreePhase = circuits.some((c) => c.phases === 'three');

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Section header — editorial */}
      <div className="space-y-2">
        <Eyebrow>03 · CIRCUITS</Eyebrow>
        <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold tracking-tight leading-[1.1] text-white">
          Circuit list.
        </h2>
        <p className="text-[14px] leading-relaxed text-white/85 max-w-2xl">
          Add the circuits the designer should size. Paste a written scope of works to generate
          the list automatically, pick a preset, or build them one by one.
        </p>
        <div className="pt-1 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setScopeOpen(true)}
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] font-semibold text-elec-yellow border border-elec-yellow/40 hover:bg-elec-yellow/[0.08] active:bg-elec-yellow/[0.12] rounded-full px-3.5 py-2 min-h-[36px] touch-manipulation transition-colors"
          >
            Paste a scope of works
          </button>
          {onVisionExtracted && (
            <button
              type="button"
              onClick={() => setUploadOpen(true)}
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] font-semibold text-white border border-white/30 hover:bg-white/[0.04] active:bg-white/[0.06] rounded-full px-3.5 py-2 min-h-[36px] touch-manipulation transition-colors"
            >
              Upload plan / schedule / photo
            </button>
          )}
        </div>
      </div>

      {/* Upload importer sheet — wraps DesignVisionUpload so it shares the
          same extraction pipeline, kind picker, PDF support, etc. Closes
          automatically once a successful extraction lands. */}
      {onVisionExtracted && (
        <Sheet open={uploadOpen} onOpenChange={setUploadOpen}>
          <SheetContent
            side="bottom"
            className="bg-[hsl(0_0%_8%)] border-t border-white/[0.10] rounded-t-2xl px-4 sm:px-6 pb-6 pt-4 max-h-[90vh] overflow-y-auto"
          >
            <SheetHeader className="text-left">
              <SheetTitle className="text-[20px] font-semibold tracking-tight text-white">
                Import from a plan / schedule / photo
              </SheetTitle>
            </SheetHeader>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white">
              Upload a floor plan, an existing schedule, a BoQ or a site photo.
              We'll extract the relevant detail and pre-fill the wizard. Your
              call to use it or build the list by hand.
            </p>
            <div className="mt-4">
              <DesignVisionUpload
                onExtracted={(r) => {
                  onVisionExtracted(r);
                  setUploadOpen(false);
                }}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Scope import sheet */}
      <Sheet open={scopeOpen} onOpenChange={setScopeOpen}>
        <SheetContent
          side="bottom"
          className="bg-[hsl(0_0%_8%)] border-t border-white/[0.10] rounded-t-2xl px-4 sm:px-6 pb-6 pt-4 max-h-[85vh] overflow-y-auto"
        >
          <SheetHeader className="text-left">
            <SheetTitle className="text-[20px] font-semibold tracking-tight text-white">
              Paste a scope of works
            </SheetTitle>
          </SheetHeader>
          <p className="mt-2 text-[12.5px] leading-relaxed text-white">
            Paste the written scope as you'd send it to the customer or get it from the architect.
            We'll parse it into a draft circuit list — review and edit before generating the design.
          </p>
          <div className="mt-4 space-y-4">
            <textarea
              value={scopeText}
              onChange={(e) => setScopeText(e.target.value)}
              placeholder={`e.g.\nRewire of 3-bed semi.\n• Kitchen ring (incl. hob, hood) and dedicated cooker outlet.\n• House sockets ring (downstairs).\n• Upstairs sockets ring.\n• Lighting circuits — ground floor and first floor.\n• Bathroom lights + shower 40A.\n• Smoke / heat alarms.\n• EV charger 32A on driveway.`}
              className="w-full min-h-[180px] bg-black/40 border border-white/[0.15] rounded-lg px-3 py-2.5 text-[13px] leading-relaxed text-white placeholder:text-white/55 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
              maxLength={6000}
              autoFocus
              disabled={scopeParsing}
            />
            <div className="flex justify-between items-center text-[10.5px] tabular-nums text-white/65">
              <span>{scopeText.length} / 6000 chars</span>
              <span>
                {circuits.length > 0
                  ? `Will append to your ${circuits.length} existing circuit${circuits.length === 1 ? '' : 's'}`
                  : 'Will populate the circuit list'}
              </span>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setScopeOpen(false)}
                disabled={scopeParsing}
                className="flex-1 min-h-[44px] rounded-lg text-[13px] font-semibold uppercase tracking-[0.14em] text-white border border-white/30 hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors touch-manipulation disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={parseScope}
                disabled={scopeParsing || !scopeText.trim()}
                className={cn(
                  'flex-1 min-h-[44px] rounded-lg text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors touch-manipulation',
                  scopeParsing || !scopeText.trim()
                    ? 'bg-white/[0.04] text-white/40 cursor-not-allowed'
                    : 'bg-elec-yellow text-black hover:bg-elec-yellow/90 active:bg-elec-yellow/85'
                )}
              >
                {scopeParsing ? 'Parsing…' : 'Parse to circuits'}
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Preset templates */}
      <CircuitPresetSelector
        installationType={installationType}
        onSelectPreset={(preset) => {
          const newCircuits = preset.circuits.map((c) => ({
            id: `circuit-${Date.now()}-${Math.random()}`,
            ...c,
          }));
          setCircuits([...circuits, ...newCircuits]);
          toast.success(`Added ${preset.circuits.length} circuits from template`, {
            description: preset.name,
          });
        }}
      />

      {/* Quick Add */}
      <QuickAddButtons installationType={installationType} onAddCircuit={addCircuit} />

      {/* Circuits list */}
      {circuits.length > 0 && (
        <div className="space-y-4">
          {/* Summary strip — gridline pattern */}
          <div className="grid grid-cols-3 gap-px bg-black border border-white/[0.08] rounded-2xl overflow-hidden">
            <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Circuits
              </div>
              <div className="mt-1 text-[13px] font-semibold text-white tabular-nums">
                {circuits.length}
              </div>
            </div>
            <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Total load
              </div>
              <div className="mt-1 text-[13px] font-semibold text-elec-yellow tabular-nums">
                {totalKw > 0 ? `${totalKw.toFixed(2)} kW` : '—'}
              </div>
            </div>
            <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Three phase
              </div>
              <div className="mt-1 text-[13px] font-semibold text-white">
                {hasThreePhase ? 'Yes' : 'No'}
              </div>
            </div>
          </div>

          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
              Your circuits
            </span>
            <button
              type="button"
              onClick={addBlankCircuit}
              className={cn(
                'bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-xl px-4 h-11',
                'text-[13px] font-medium text-white',
                'hover:border-white/20 hover:bg-elec-yellow/[0.04]',
                'active:scale-[0.99] transition-colors',
                'touch-manipulation'
              )}
            >
              + Add custom
            </button>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {circuits.map((circuit, index) => (
                <motion.div
                  key={circuit.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <CircuitCard
                    circuit={circuit}
                    index={index}
                    installationType={installationType}
                    onUpdate={(updates) => updateCircuit(circuit.id, updates)}
                    onDelete={() => deleteCircuit(circuit.id)}
                    onDuplicate={() => duplicateCircuit(circuit.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Empty state — editorial centred text */}
      {circuits.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-2xl',
            'px-6 py-10 sm:px-8 sm:py-12 text-center'
          )}
        >
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50">
            No circuits yet
          </div>
          <h3 className="mt-2 text-[15px] font-semibold text-white">
            Start with a preset, or add one manually.
          </h3>
          <p className="mt-1 text-[13px] text-white/60 max-w-sm mx-auto leading-snug">
            Pick a template above to seed a typical layout, tap a quick-add pill, or add a blank
            circuit to fill in yourself.
          </p>
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={addBlankCircuit}
              className={cn(
                'bg-[hsl(0_0%_10%)] border border-elec-yellow/60 rounded-xl px-5 h-11',
                'text-[13px] font-semibold text-elec-yellow',
                'hover:bg-elec-yellow/[0.06]',
                'active:scale-[0.99] transition-colors',
                'touch-manipulation'
              )}
            >
              + Add your first circuit
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
