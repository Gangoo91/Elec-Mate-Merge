
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Plus, Trash2 } from 'lucide-react';
import { cableSizeOptions } from '@/types/cableTypes';

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
  const circuits = formData.circuits || [];

  const addCircuit = () => {
    const newCircuit: Circuit = {
      id: Date.now().toString(),
      reference: `C${circuits.length + 1}`,
      description: '',
      type: 'lighting',
      rating: '6',
      liveSize: '1.5',
      cpcSize: '1.5',
      installationMethod: '101',
      length: '',
      rcdProtected: false
    };
    
    onUpdate('circuits', [...circuits, newCircuit]);
  };

  const removeCircuit = (id: string) => {
    onUpdate('circuits', circuits.filter((circuit: Circuit) => circuit.id !== id));
  };

  const updateCircuit = (id: string, field: string, value: any) => {
    const updatedCircuits = circuits.map((circuit: Circuit) => 
      circuit.id === id ? { ...circuit, [field]: value } : circuit
    );
    onUpdate('circuits', updatedCircuits);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-elec-gray">Circuit Schedule</CardTitle>
          <p className="text-sm text-muted-foreground">
            Record details of all circuits in the installation
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {circuits.map((circuit: Circuit, index: number) => (
              <Card key={circuit.id} className="border border-border bg-card border-l-4 border-l-elec-yellow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Circuit {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCircuit(circuit.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Circuit Reference</label>
                      <Input
                        placeholder="e.g., C1, L1"
                        value={circuit.reference}
                        onChange={(e) => updateCircuit(circuit.id, 'reference', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Input
                        placeholder="e.g., Lighting, Socket outlets"
                        value={circuit.description}
                        onChange={(e) => updateCircuit(circuit.id, 'description', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Circuit Type</label>
                      <MobileSelectPicker
                        value={circuit.type}
                        onValueChange={(value) => updateCircuit(circuit.id, 'type', value)}
                        options={[
                          { value: 'lighting', label: 'Lighting' },
                          { value: 'power', label: 'Power/Sockets' },
                          { value: 'cooker', label: 'Cooker' },
                          { value: 'shower', label: 'Shower' },
                          { value: 'heating', label: 'Heating' },
                          { value: 'immersion', label: 'Immersion Heater' },
                          { value: 'other', label: 'Other' },
                        ]}
                        placeholder="Select type"
                        title="Circuit Type"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">MCB Rating (A)</label>
                      <MobileSelectPicker
                        value={circuit.rating}
                        onValueChange={(value) => updateCircuit(circuit.id, 'rating', value)}
                        options={[
                          { value: '6', label: '6A' },
                          { value: '10', label: '10A' },
                          { value: '16', label: '16A' },
                          { value: '20', label: '20A' },
                          { value: '25', label: '25A' },
                          { value: '32', label: '32A' },
                          { value: '40', label: '40A' },
                          { value: '45', label: '45A' },
                          { value: '50', label: '50A' },
                        ]}
                        placeholder="Select rating"
                        title="MCB Rating"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Live Conductor Size</label>
                      <MobileSelectPicker
                        value={circuit.liveSize}
                        onValueChange={(value) => updateCircuit(circuit.id, 'liveSize', value)}
                        options={cableSizeOptions.map((option) => ({ value: option.value, label: option.label }))}
                        placeholder="Select size"
                        title="Live Conductor Size"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">CPC Size</label>
                      <MobileSelectPicker
                        value={circuit.cpcSize}
                        onValueChange={(value) => updateCircuit(circuit.id, 'cpcSize', value)}
                        options={cableSizeOptions.map((option) => ({ value: option.value, label: option.label }))}
                        placeholder="Select size"
                        title="CPC Size"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Installation Method</label>
                      <MobileSelectPicker
                        value={circuit.installationMethod}
                        onValueChange={(value) => updateCircuit(circuit.id, 'installationMethod', value)}
                        options={[
                          { value: '100', label: '100 - Enclosed in conduit' },
                          { value: '101', label: '101 - Clipped direct' },
                          { value: '102', label: '102 - In trunking' },
                          { value: '103', label: '103 - In conduit' },
                          { value: '104', label: '104 - In ducting' },
                        ]}
                        placeholder="Select method"
                        title="Installation Method"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Circuit Length (m)</label>
                      <Input
                        placeholder="e.g., 25"
                        value={circuit.length}
                        onChange={(e) => updateCircuit(circuit.id, 'length', e.target.value)}
                        className="h-11 touch-manipulation"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">RCD Protected</label>
                      <MobileSelectPicker
                        value={circuit.rcdProtected ? 'yes' : 'no'}
                        onValueChange={(value) => updateCircuit(circuit.id, 'rcdProtected', value === 'yes')}
                        options={[
                          { value: 'yes', label: 'Yes' },
                          { value: 'no', label: 'No' },
                        ]}
                        placeholder="Select"
                        title="RCD Protected"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button onClick={addCircuit} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Circuit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICCircuitSchedule;
