import { motion, AnimatePresence } from 'framer-motion';
import { CircuitInput } from '@/types/installation-design';
import { CircuitCard } from './CircuitCard';
import { CircuitPresetSelector } from './CircuitPresetSelector';
import { QuickAddButtons } from './QuickAddButtons';
import { Eyebrow } from '@/components/college/primitives';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CircuitBuilderStepProps {
  circuits: CircuitInput[];
  setCircuits: (circuits: CircuitInput[]) => void;
  installationType: 'domestic' | 'commercial' | 'industrial';
}

export const CircuitBuilderStep = ({
  circuits,
  setCircuits,
  installationType,
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
          Add the circuits the designer should size. Use a preset to start, or build them one by
          one.
        </p>
      </div>

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
