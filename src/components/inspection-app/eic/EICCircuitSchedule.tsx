
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
                      <Select
                        value={circuit.type}
                        onValueChange={(value) => updateCircuit(circuit.id, 'type', value)}
                      >
                        <SelectTrigger className="bg-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lighting">Lighting</SelectItem>
                          <SelectItem value="power">Power/Sockets</SelectItem>
                          <SelectItem value="cooker">Cooker</SelectItem>
                          <SelectItem value="shower">Shower</SelectItem>
                          <SelectItem value="heating">Heating</SelectItem>
                          <SelectItem value="immersion">Immersion Heater</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">MCB Rating (A)</label>
                      <Select
                        value={circuit.rating}
                        onValueChange={(value) => updateCircuit(circuit.id, 'rating', value)}
                      >
                        <SelectTrigger className="bg-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6A</SelectItem>
                          <SelectItem value="10">10A</SelectItem>
                          <SelectItem value="16">16A</SelectItem>
                          <SelectItem value="20">20A</SelectItem>
                          <SelectItem value="25">25A</SelectItem>
                          <SelectItem value="32">32A</SelectItem>
                          <SelectItem value="40">40A</SelectItem>
                          <SelectItem value="45">45A</SelectItem>
                          <SelectItem value="50">50A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Live Conductor Size</label>
                      <Select
                        value={circuit.liveSize}
                        onValueChange={(value) => updateCircuit(circuit.id, 'liveSize', value)}
                      >
                        <SelectTrigger className="bg-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cableSizeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">CPC Size</label>
                      <Select
                        value={circuit.cpcSize}
                        onValueChange={(value) => updateCircuit(circuit.id, 'cpcSize', value)}
                      >
                        <SelectTrigger className="bg-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cableSizeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Installation Method</label>
                      <Select
                        value={circuit.installationMethod}
                        onValueChange={(value) => updateCircuit(circuit.id, 'installationMethod', value)}
                      >
                        <SelectTrigger className="bg-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100">100 - Enclosed in conduit</SelectItem>
                          <SelectItem value="101">101 - Clipped direct</SelectItem>
                          <SelectItem value="102">102 - In trunking</SelectItem>
                          <SelectItem value="103">103 - In conduit</SelectItem>
                          <SelectItem value="104">104 - In ducting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Circuit Length (m)</label>
                      <Input
                        placeholder="e.g., 25"
                        value={circuit.length}
                        onChange={(e) => updateCircuit(circuit.id, 'length', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">RCD Protected</label>
                      <Select
                        value={circuit.rcdProtected ? 'yes' : 'no'}
                        onValueChange={(value) => updateCircuit(circuit.id, 'rcdProtected', value === 'yes')}
                      >
                        <SelectTrigger className="bg-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
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
