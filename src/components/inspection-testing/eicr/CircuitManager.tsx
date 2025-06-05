
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Zap } from 'lucide-react';

interface Circuit {
  ref: string;
  description: string;
  type: string;
  rating: string;
  cableType: string;
  method: string;
  length: string;
}

interface CircuitManagerProps {
  onCircuitsChange: (circuits: Circuit[]) => void;
}

const CircuitManager = ({ onCircuitsChange }: CircuitManagerProps) => {
  const [circuits, setCircuits] = useState<Circuit[]>([]);

  useEffect(() => {
    // Load existing circuits from localStorage if available
    const savedCircuits = localStorage.getItem('eicr-circuits');
    if (savedCircuits) {
      const parsedCircuits = JSON.parse(savedCircuits);
      setCircuits(parsedCircuits);
    } else {
      // Add default circuit
      const defaultCircuit: Circuit = {
        ref: 'C1',
        description: 'Socket outlets',
        type: 'Ring Final',
        rating: '32A',
        cableType: '2.5mm² T&E',
        method: 'Clipped direct',
        length: '50m',
      };
      setCircuits([defaultCircuit]);
    }
  }, []);

  useEffect(() => {
    onCircuitsChange(circuits);
  }, [circuits, onCircuitsChange]);

  const addCircuit = () => {
    const newRef = `C${circuits.length + 1}`;
    const newCircuit: Circuit = {
      ref: newRef,
      description: '',
      type: '',
      rating: '',
      cableType: '',
      method: '',
      length: '',
    };
    setCircuits([...circuits, newCircuit]);
  };

  const removeCircuit = (index: number) => {
    const updatedCircuits = circuits.filter((_, i) => i !== index);
    // Update refs to maintain sequence
    const resequencedCircuits = updatedCircuits.map((circuit, i) => ({
      ...circuit,
      ref: `C${i + 1}`,
    }));
    setCircuits(resequencedCircuits);
  };

  const updateCircuit = (index: number, field: keyof Circuit, value: string) => {
    const updatedCircuits = circuits.map((circuit, i) =>
      i === index ? { ...circuit, [field]: value } : circuit
    );
    setCircuits(updatedCircuits);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
                <Zap className="h-6 w-6 text-elec-yellow" />
              </div>
              <CardTitle>Circuit Information</CardTitle>
            </div>
            <Button
              onClick={addCircuit}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Circuit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {circuits.map((circuit, index) => (
              <div
                key={index}
                className="p-4 border border-elec-yellow/20 rounded-lg bg-elec-dark/50 space-y-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Circuit {circuit.ref}</h3>
                  {circuits.length > 1 && (
                    <Button
                      onClick={() => removeCircuit(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`description-${index}`}>Circuit Description *</Label>
                    <Input
                      id={`description-${index}`}
                      value={circuit.description}
                      onChange={(e) => updateCircuit(index, 'description', e.target.value)}
                      placeholder="e.g., Socket outlets, Lighting circuit"
                      className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`type-${index}`}>Circuit Type</Label>
                    <Select
                      value={circuit.type}
                      onValueChange={(value) => updateCircuit(index, 'type', value)}
                    >
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ring Final">Ring Final</SelectItem>
                        <SelectItem value="Radial">Radial</SelectItem>
                        <SelectItem value="Lighting">Lighting</SelectItem>
                        <SelectItem value="Cooker">Cooker</SelectItem>
                        <SelectItem value="Immersion Heater">Immersion Heater</SelectItem>
                        <SelectItem value="Electric Shower">Electric Shower</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`rating-${index}`}>MCB Rating</Label>
                    <Select
                      value={circuit.rating}
                      onValueChange={(value) => updateCircuit(index, 'rating', value)}
                    >
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6A">6A</SelectItem>
                        <SelectItem value="10A">10A</SelectItem>
                        <SelectItem value="16A">16A</SelectItem>
                        <SelectItem value="20A">20A</SelectItem>
                        <SelectItem value="25A">25A</SelectItem>
                        <SelectItem value="32A">32A</SelectItem>
                        <SelectItem value="40A">40A</SelectItem>
                        <SelectItem value="45A">45A</SelectItem>
                        <SelectItem value="50A">50A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`cable-${index}`}>Cable Type & Size</Label>
                    <Input
                      id={`cable-${index}`}
                      value={circuit.cableType}
                      onChange={(e) => updateCircuit(index, 'cableType', e.target.value)}
                      placeholder="e.g., 2.5mm² T&E"
                      className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`method-${index}`}>Installation Method</Label>
                    <Select
                      value={circuit.method}
                      onValueChange={(value) => updateCircuit(index, 'method', value)}
                    >
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Clipped direct">Clipped direct</SelectItem>
                        <SelectItem value="In conduit">In conduit</SelectItem>
                        <SelectItem value="In trunking">In trunking</SelectItem>
                        <SelectItem value="Underground">Underground</SelectItem>
                        <SelectItem value="Overhead">Overhead</SelectItem>
                        <SelectItem value="In thermal insulation">In thermal insulation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`length-${index}`}>Approximate Length</Label>
                    <Input
                      id={`length-${index}`}
                      value={circuit.length}
                      onChange={(e) => updateCircuit(index, 'length', e.target.value)}
                      placeholder="e.g., 50m"
                      className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                    />
                  </div>
                </div>
              </div>
            ))}

            {circuits.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No circuits added yet</p>
                <Button
                  onClick={addCircuit}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  Add First Circuit
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        <p>
          * Add all circuits that will be inspected and tested. Each circuit must have a unique reference 
          and description to identify it clearly in the EICR report.
        </p>
      </div>
    </div>
  );
};

export default CircuitManager;
