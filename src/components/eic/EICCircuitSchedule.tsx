import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { cableSizeOptions } from '@/types/cableTypes';

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}</Label>
    {children}
  </div>
);

interface Circuit {
  id: string;
  reference: string;
  description: string;
  type: string;
  rating: string;
  liveSize: string;
  cpcSize: string;
  installationMethod: string;
  length: string;
  rcdProtected: boolean;
}

interface EICCircuitScheduleProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const EICCircuitSchedule: React.FC<EICCircuitScheduleProps> = ({ formData, onUpdate }) => {
  const circuits: Circuit[] = formData.circuits || [];

  const addCircuit = () => {
    const newCircuit: Circuit = {
      id: `circuit-${Date.now()}`,
      reference: `C${circuits.length + 1}`,
      description: '',
      type: '',
      rating: '',
      liveSize: '',
      cpcSize: '',
      installationMethod: '',
      length: '',
      rcdProtected: false,
    };
    onUpdate('circuits', [...circuits, newCircuit]);
  };

  const removeCircuit = (id: string) => {
    onUpdate('circuits', circuits.filter((c: Circuit) => c.id !== id));
  };

  const updateCircuit = (id: string, field: string, value: any) => {
    const updatedCircuits = circuits.map((circuit: Circuit) =>
      circuit.id === id ? { ...circuit, [field]: value } : circuit
    );
    onUpdate('circuits', updatedCircuits);
  };

  return (
    <div className="space-y-4">
      <SectionTitle title="Circuit Schedule" />
      <p className="text-[10px] text-white">Record details of all circuits in the installation</p>

      <div className="space-y-3">
        {circuits.map((circuit: Circuit, index: number) => (
          <div
            key={circuit.id}
            className="bg-white/[0.03] rounded-lg border border-white/[0.06] border-l-4 border-l-elec-yellow p-3 space-y-3"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-semibold text-white">Circuit {index + 1}</h4>
              <button
                onClick={() => removeCircuit(circuit.id)}
                className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-red-400 touch-manipulation active:scale-[0.98]"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 items-end">
              <FormField label="Reference">
                <Input
                  placeholder="C1"
                  value={circuit.reference}
                  onChange={(e) => updateCircuit(circuit.id, 'reference', e.target.value)}
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                />
              </FormField>
              <FormField label="Description">
                <Input
                  placeholder="Lighting"
                  value={circuit.description}
                  onChange={(e) => updateCircuit(circuit.id, 'description', e.target.value)}
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                />
              </FormField>
              <FormField label="Type">
                <Select
                  value={circuit.type}
                  onValueChange={(value) => updateCircuit(circuit.id, 'type', value)}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/[0.06] border-white/[0.08] text-white z-50">
                    <SelectItem value="lighting">Lighting</SelectItem>
                    <SelectItem value="power">Power</SelectItem>
                    <SelectItem value="cooker">Cooker</SelectItem>
                    <SelectItem value="shower">Shower</SelectItem>
                    <SelectItem value="heating">Heating</SelectItem>
                    <SelectItem value="immersion">Immersion</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <div className="grid grid-cols-3 gap-2 items-end">
              <FormField label="MCB Rating (A)">
                <Select
                  value={circuit.rating}
                  onValueChange={(value) => updateCircuit(circuit.id, 'rating', value)}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08]">
                    <SelectValue placeholder="A" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/[0.06] border-white/[0.08] text-white z-50">
                    {['6','10','16','20','25','32','40','45','50'].map(v => (
                      <SelectItem key={v} value={v}>{v}A</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Live (mm²)">
                <Select
                  value={circuit.liveSize}
                  onValueChange={(value) => updateCircuit(circuit.id, 'liveSize', value)}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08]">
                    <SelectValue placeholder="mm²" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/[0.06] border-white/[0.08] text-white z-50">
                    {cableSizeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="CPC (mm²)">
                <Select
                  value={circuit.cpcSize}
                  onValueChange={(value) => updateCircuit(circuit.id, 'cpcSize', value)}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08]">
                    <SelectValue placeholder="mm²" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/[0.06] border-white/[0.08] text-white z-50">
                    {cableSizeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <div className="grid grid-cols-3 gap-2 items-end">
              <FormField label="Ref. Method">
                <Select
                  value={circuit.installationMethod}
                  onValueChange={(value) => updateCircuit(circuit.id, 'installationMethod', value)}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08]">
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/[0.06] border-white/[0.08] text-white z-50">
                    <SelectItem value="100">100 - Conduit</SelectItem>
                    <SelectItem value="101">101 - Clipped</SelectItem>
                    <SelectItem value="102">102 - Trunking</SelectItem>
                    <SelectItem value="103">103 - Conduit</SelectItem>
                    <SelectItem value="104">104 - Ducting</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Length (m)">
                <Input
                  placeholder="25"
                  value={circuit.length}
                  onChange={(e) => updateCircuit(circuit.id, 'length', e.target.value)}
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                />
              </FormField>
              <FormField label="RCD">
                <Select
                  value={circuit.rcdProtected ? 'yes' : 'no'}
                  onValueChange={(value) => updateCircuit(circuit.id, 'rcdProtected', value === 'yes')}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/[0.06] border-white/[0.08] text-white z-50">
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>
          </div>
        ))}

        <button
          onClick={addCircuit}
          className="w-full h-11 rounded-lg font-medium text-sm bg-white/[0.05] border border-white/[0.08] text-white flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          Add Circuit
        </button>
      </div>
    </div>
  );
};

export default EICCircuitSchedule;
