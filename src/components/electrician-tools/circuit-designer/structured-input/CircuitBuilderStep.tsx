import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircuitInput } from "@/types/installation-design";
import { Plus, Zap, CircuitBoard } from "lucide-react";
import { CircuitCard } from "./CircuitCard";
import { CircuitPresetSelector } from "./CircuitPresetSelector";
import { QuickAddButtons } from "./QuickAddButtons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CircuitBuilderStepProps {
  circuits: CircuitInput[];
  setCircuits: (circuits: CircuitInput[]) => void;
  installationType: 'domestic' | 'commercial' | 'industrial';
}

export const CircuitBuilderStep = ({
  circuits,
  setCircuits,
  installationType
}: CircuitBuilderStepProps) => {
  const addCircuit = (circuit: Omit<CircuitInput, 'id'>) => {
    const newCircuit: CircuitInput = {
      id: `circuit-${Date.now()}-${Math.random()}`,
      ...circuit
    };
    setCircuits([...circuits, newCircuit]);
  };

  const addBlankCircuit = () => {
    addCircuit({
      name: '',
      loadType: 'socket',
      phases: 'single',
      specialLocation: 'none',
      cableLength: 20
    });
  };

  const updateCircuit = (id: string, updates: Partial<CircuitInput>) => {
    setCircuits(circuits.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCircuit = (id: string) => {
    setCircuits(circuits.filter(c => c.id !== id));
  };

  const duplicateCircuit = (id: string) => {
    const circuit = circuits.find(c => c.id === id);
    if (circuit) {
      const { id: _, ...circuitData } = circuit;
      addCircuit({
        ...circuitData,
        name: `${circuit.name} (Copy)`
      });
    }
  };

  return (
    <div className="space-y-5">
      {/* Section Header - Native app style */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 border border-elec-yellow/30 shadow-[0_0_12px_rgba(255,204,0,0.1)]">
            <CircuitBoard className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Build Your Circuits</h2>
            <p className="text-sm text-white/50">Add circuits for accurate calculations</p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className={cn(
            "px-3 py-1.5 rounded-full font-semibold",
            circuits.length > 0
              ? "bg-elec-yellow/15 border border-elec-yellow/30 text-elec-yellow"
              : "bg-white/5 border border-white/10 text-white/50"
          )}
        >
          {circuits.length} Circuit{circuits.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      {/* Quick Add Templates */}
      <CircuitPresetSelector
        installationType={installationType}
        onSelectPreset={(preset) => {
          const newCircuits = preset.circuits.map(c => ({
            id: `circuit-${Date.now()}-${Math.random()}`,
            ...c
          }));
          setCircuits([...circuits, ...newCircuits]);
          toast.success(`Added ${preset.circuits.length} circuits from template`, {
            description: preset.name
          });
        }}
      />

      {/* Quick Add Buttons */}
      <QuickAddButtons
        installationType={installationType}
        onAddCircuit={addCircuit}
      />

      {/* Circuits List */}
      {circuits.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
              Your Circuits
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={addBlankCircuit}
              className={cn(
                "gap-2 h-11 px-4 rounded-xl",
                "bg-elec-yellow/10 border border-elec-yellow/25",
                "hover:bg-elec-yellow/20 hover:border-elec-yellow/40",
                "text-elec-yellow font-medium",
                "transition-all duration-ios-fast",
                "active:scale-[0.97]",
                "touch-manipulation"
              )}
            >
              <Plus className="h-4 w-4" />
              <span>Add Custom</span>
            </Button>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {circuits.map((circuit, index) => (
                <motion.div
                  key={circuit.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
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

      {/* Empty State - Native app feel */}
      {circuits.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-8 sm:p-12 text-center rounded-2xl",
            "bg-gradient-to-br from-elec-yellow/[0.04] to-transparent",
            "border-2 border-dashed border-elec-yellow/20"
          )}
        >
          <div className="inline-flex p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20 mb-5">
            <Zap className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
            No Circuits Added Yet
          </h3>
          <p className="text-sm text-white/50 mb-6 max-w-sm mx-auto">
            Choose a template above or add individual circuits to start designing
          </p>
          <Button
            onClick={addBlankCircuit}
            className={cn(
              "gap-2.5 h-13 px-8 rounded-xl",
              "bg-elec-yellow text-black font-semibold text-base",
              "hover:bg-elec-yellow/90",
              "shadow-[0_4px_16px_rgba(255,204,0,0.25)]",
              "active:scale-[0.97]",
              "transition-all duration-ios-fast",
              "touch-manipulation"
            )}
          >
            <Plus className="h-5 w-5" />
            Add Your First Circuit
          </Button>
        </motion.div>
      )}
    </div>
  );
};
