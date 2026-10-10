import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircuitInput } from '@/types/installation-design';
import { CircuitCard } from './CircuitCard';
import { CircuitPresetSelector } from './CircuitPresetSelector';
import { QuickAddButtons } from './QuickAddButtons';
import { StepHeader, Section, QuietButton, ItemCard } from './wizardUi';
import { textareaCn, buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
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
      // Append (don't replace): user might already have circuits.
      setCircuits([...circuits, ...parsed]);
      const assumptions = String(data?.extraction?.assumptions ?? '').trim();
      toast.success(`${parsed.length} circuit${parsed.length === 1 ? '' : 's'} added from scope`, {
        id: loading,
        description: assumptions
          ? `Assumptions: ${assumptions}`
          : 'Review each one and edit as needed.',
        duration: 8000,
      });
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
    <div className="space-y-8">
      <div className="space-y-4">
        <StepHeader
          title="Circuit list"
          description="Add the circuits the designer should size. Paste a written scope of works to build the list automatically, pick a template, or add them one by one."
        />
        <div className="flex flex-wrap gap-2">
          <QuietButton onClick={() => setScopeOpen(true)}>Paste a scope of works</QuietButton>
          {onVisionExtracted && (
            <QuietButton onClick={() => setUploadOpen(true)}>
              Upload a plan, schedule or photo
            </QuietButton>
          )}
        </div>
      </div>

      {/* Upload importer sheet. Wraps DesignVisionUpload so it shares the
          same extraction pipeline, kind picker, PDF support, etc. Closes
          automatically once a successful extraction lands. */}
      {onVisionExtracted && (
        <Sheet open={uploadOpen} onOpenChange={setUploadOpen}>
          <SheetContent
            side="bottom"
            className="h-[85vh] overflow-y-auto rounded-t-2xl border-t border-white/[0.10] bg-[hsl(0_0%_8%)] px-4 pb-6 pt-4 sm:px-6"
          >
            <div className="mx-auto w-full max-w-3xl">
              <SheetHeader className="text-left">
                <SheetTitle className="text-[20px] font-semibold tracking-tight text-white">
                  Import from a plan, schedule or photo
                </SheetTitle>
              </SheetHeader>
              <p className="mt-2 text-[14px] leading-relaxed text-white">
                Upload a floor plan, an existing schedule, a BoQ or a site photo. We'll extract the
                relevant detail and pre-fill the wizard. Your call to use it or build the list by
                hand.
              </p>
              <div className="mt-4">
                <DesignVisionUpload
                  onExtracted={(r) => {
                    onVisionExtracted(r);
                    setUploadOpen(false);
                  }}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Scope import sheet */}
      <Sheet open={scopeOpen} onOpenChange={setScopeOpen}>
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-y-auto rounded-t-2xl border-t border-white/[0.10] bg-[hsl(0_0%_8%)] px-4 pb-6 pt-4 sm:px-6"
        >
          <div className="mx-auto w-full max-w-3xl">
            <SheetHeader className="text-left">
              <SheetTitle className="text-[20px] font-semibold tracking-tight text-white">
                Paste a scope of works
              </SheetTitle>
            </SheetHeader>
            <p className="mt-2 text-[14px] leading-relaxed text-white">
              Paste the written scope as you'd send it to the customer or get it from the architect.
              We'll turn it into a draft circuit list for you to review and edit before generating
              the design.
            </p>
            <div className="mt-4 space-y-4">
              <textarea
                value={scopeText}
                onChange={(e) => setScopeText(e.target.value)}
                placeholder={`e.g.\nRewire of 3-bed semi.\n• Kitchen ring (incl. hob, hood) and dedicated cooker outlet.\n• House sockets ring (downstairs).\n• Upstairs sockets ring.\n• Lighting circuits, ground floor and first floor.\n• Bathroom lights + shower 40A.\n• Smoke / heat alarms.\n• EV charger 32A on driveway.`}
                className={cn(textareaCn, 'min-h-[220px] text-[15px] leading-relaxed')}
                maxLength={6000}
                autoFocus
                disabled={scopeParsing}
              />
              <div className="flex items-center justify-between gap-3 text-[12px] tabular-nums text-white">
                <span>{scopeText.length} / 6000 chars</span>
                <span className="text-right">
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
                  className={cn(buttonSecondaryCn, 'flex-1')}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={parseScope}
                  disabled={scopeParsing || !scopeText.trim()}
                  className={cn(buttonPrimaryCn, 'flex-1')}
                >
                  {scopeParsing ? 'Parsing…' : 'Parse to circuits'}
                </button>
              </div>
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
        <Section
          title="Your circuits"
          aside={
            <>
              {circuits.length} {circuits.length === 1 ? 'circuit' : 'circuits'}
              {totalKw > 0 ? ` · ${totalKw.toFixed(2)} kW` : ''}
              {hasThreePhase ? ' · three phase' : ''}
            </>
          }
        >
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
          <QuietButton onClick={addBlankCircuit} className="w-full sm:w-auto">
            + Add custom
          </QuietButton>
        </Section>
      )}

      {/* Empty state */}
      {circuits.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <ItemCard className="text-center sm:py-10">
            <h3 className="text-[15px] font-semibold text-white">No circuits yet</h3>
            <p className="mx-auto mt-1 max-w-sm text-[14px] leading-snug text-white">
              Pick a template above to seed a typical layout, tap a quick add, or add a blank
              circuit to fill in yourself.
            </p>
            <div className="mt-5 flex justify-center">
              <QuietButton onClick={addBlankCircuit}>+ Add your first circuit</QuietButton>
            </div>
          </ItemCard>
        </motion.div>
      )}
    </div>
  );
};
