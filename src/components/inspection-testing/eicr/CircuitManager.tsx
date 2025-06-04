
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Trash2, Zap, Info } from 'lucide-react';

interface Circuit {
  id: string;
  ref: string;
  description: string;
  type: string;
  protection: string;
  rating: string;
  location: string;
  cableType: string;
  cableSize: string;
  earthingArrangement: string;
}

interface CircuitManagerProps {
  onCircuitsChange?: (circuits: Circuit[]) => void;
}

const CircuitManager = ({ onCircuitsChange }: CircuitManagerProps) => {
  const [circuits, setCircuits] = useState<Circuit[]>([
    {
      id: '1',
      ref: 'C1',
      description: 'Downstairs lights',
      type: 'Lighting',
      protection: 'RCBO',
      rating: '6A',
      location: 'Ground Floor',
      cableType: 'Twin & Earth',
      cableSize: '1.5mm²',
      earthingArrangement: 'TN-C-S'
    }
  ]);

  const circuitTypes = [
    'Lighting',
    'Socket Outlets',
    'Cooker',
    'Shower',
    'Immersion Heater',
    'Smoke Alarms',
    'Boiler',
    'Electric Vehicle Charging',
    'Other'
  ];

  const protectionTypes = [
    'MCB',
    'RCBO',
    'RCD + MCB',
    'Fuse',
    'Other'
  ];

  const ratings = [
    '6A', '10A', '16A', '20A', '25A', '32A', '40A', '45A', '50A', '63A'
  ];

  const cableTypes = [
    'Twin & Earth',
    'SWA',
    'MICC',
    'FP200',
    'NYM',
    'Other'
  ];

  const cableSizes = [
    '1mm²', '1.5mm²', '2.5mm²', '4mm²', '6mm²', '10mm²', '16mm²', '25mm²', '35mm²'
  ];

  const addCircuit = () => {
    const newCircuit: Circuit = {
      id: Date.now().toString(),
      ref: `C${circuits.length + 1}`,
      description: '',
      type: '',
      protection: '',
      rating: '',
      location: '',
      cableType: '',
      cableSize: '',
      earthingArrangement: 'TN-C-S'
    };
    
    const updatedCircuits = [...circuits, newCircuit];
    setCircuits(updatedCircuits);
    onCircuitsChange?.(updatedCircuits);
  };

  const removeCircuit = (id: string) => {
    const updatedCircuits = circuits.filter(circuit => circuit.id !== id);
    setCircuits(updatedCircuits);
    onCircuitsChange?.(updatedCircuits);
  };

  const updateCircuit = (id: string, field: keyof Circuit, value: string) => {
    const updatedCircuits = circuits.map(circuit =>
      circuit.id === id ? { ...circuit, [field]: value } : circuit
    );
    setCircuits(updatedCircuits);
    onCircuitsChange?.(updatedCircuits);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
                <Zap className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <CardTitle className="text-xl">Circuit Information</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Add and configure circuits for this installation
                </p>
              </div>
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
          <Alert className="bg-blue-500/10 border-blue-500/30">
            <Info className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200">
              Circuit information is automatically included in the EICR schedule and test results.
              Ensure all details are accurate for compliance.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Circuits List */}
      <div className="space-y-4">
        {circuits.map((circuit, index) => (
          <Card key={circuit.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-elec-yellow border-elec-yellow/50">
                    Circuit {index + 1}
                  </Badge>
                  <h3 className="font-medium">
                    {circuit.description || 'New Circuit'}
                  </h3>
                </div>
                {circuits.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCircuit(circuit.id)}
                    className="text-red-400 border-red-400/50 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Basic Information Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`ref-${circuit.id}`} className="text-sm font-medium">
                    Circuit Ref
                  </Label>
                  <Input
                    id={`ref-${circuit.id}`}
                    value={circuit.ref}
                    onChange={(e) => updateCircuit(circuit.id, 'ref', e.target.value)}
                    className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                    placeholder="e.g. C1, L1, S1"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor={`description-${circuit.id}`} className="text-sm font-medium">
                    Description
                  </Label>
                  <Input
                    id={`description-${circuit.id}`}
                    value={circuit.description}
                    onChange={(e) => updateCircuit(circuit.id, 'description', e.target.value)}
                    className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                    placeholder="e.g. Downstairs lights, Kitchen sockets"
                  />
                </div>
              </div>

              {/* Circuit Type and Protection Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Type</Label>
                  <Select 
                    value={circuit.type} 
                    onValueChange={(value) => updateCircuit(circuit.id, 'type', value)}
                  >
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      {circuitTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Protection</Label>
                  <Select 
                    value={circuit.protection} 
                    onValueChange={(value) => updateCircuit(circuit.id, 'protection', value)}
                  >
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                      <SelectValue placeholder="Select protection" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      {protectionTypes.map((protection) => (
                        <SelectItem key={protection} value={protection}>
                          {protection}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Rating</Label>
                  <Select 
                    value={circuit.rating} 
                    onValueChange={(value) => updateCircuit(circuit.id, 'rating', value)}
                  >
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      {ratings.map((rating) => (
                        <SelectItem key={rating} value={rating}>
                          {rating}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Cable Information Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`location-${circuit.id}`} className="text-sm font-medium">
                    Location
                  </Label>
                  <Input
                    id={`location-${circuit.id}`}
                    value={circuit.location}
                    onChange={(e) => updateCircuit(circuit.id, 'location', e.target.value)}
                    className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                    placeholder="e.g. Ground Floor, First Floor"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Cable Type</Label>
                  <Select 
                    value={circuit.cableType} 
                    onValueChange={(value) => updateCircuit(circuit.id, 'cableType', value)}
                  >
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                      <SelectValue placeholder="Select cable type" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      {cableTypes.map((cableType) => (
                        <SelectItem key={cableType} value={cableType}>
                          {cableType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Cable Size</Label>
                  <Select 
                    value={circuit.cableSize} 
                    onValueChange={(value) => updateCircuit(circuit.id, 'cableSize', value)}
                  >
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                      <SelectValue placeholder="Select cable size" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      {cableSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {circuits.length === 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
                <Zap className="h-8 w-8 text-elec-yellow" />
              </div>
              <div>
                <h3 className="font-medium mb-2">No Circuits Added</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add circuits to begin configuring your electrical installation
                </p>
                <Button 
                  onClick={addCircuit}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Circuit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CircuitManager;
