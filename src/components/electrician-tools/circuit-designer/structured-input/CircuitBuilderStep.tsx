import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircuitInput } from "@/types/installation-design";
import { Plus, Zap, Trash2, Copy } from "lucide-react";
import { CircuitCard } from "./CircuitCard";
import { CircuitPresetSelector } from "./CircuitPresetSelector";
import { QuickAddButtons } from "./QuickAddButtons";
import { toast } from "sonner";

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
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Build Your Circuits</h2>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            {circuits.length} Circuit{circuits.length !== 1 ? 's' : ''}
          </Badge>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Add circuits to your design - be specific about loads and cable runs for accurate calculations
        </p>
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
            <h3 className="text-base sm:text-lg font-semibold">Your Circuits</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addBlankCircuit}
              className="gap-2 touch-manipulation"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Custom Circuit</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>

          <div className="space-y-3">
            {circuits.map((circuit, index) => (
              <CircuitCard
                key={circuit.id}
                circuit={circuit}
                index={index}
                installationType={installationType}
                onUpdate={(updates) => updateCircuit(circuit.id, updates)}
                onDelete={() => deleteCircuit(circuit.id)}
                onDuplicate={() => duplicateCircuit(circuit.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {circuits.length === 0 && (
        <Card className="p-12 text-center border-dashed">
          <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Circuits Added Yet</h3>
          <p className="text-muted-foreground mb-6">
            Choose a template above or add individual circuits to get started
          </p>
          <Button onClick={addBlankCircuit} size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Add Your First Circuit
          </Button>
        </Card>
      )}
    </div>
  );
};
