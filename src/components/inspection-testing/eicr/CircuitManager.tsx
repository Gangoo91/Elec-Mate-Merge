
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Zap } from 'lucide-react';
import { useState } from 'react';
import { useEICR } from '@/contexts/EICRContext';
import { EICRCircuit, CircuitType } from '@/types/eicr';

const CircuitManager = () => {
  const { eicrSession, addCircuit, updateCircuit } = useEICR();
  const [isAddingCircuit, setIsAddingCircuit] = useState(false);
  const [newCircuit, setNewCircuit] = useState<EICRCircuit>({
    ref: '',
    type: 'lighting',
    description: '',
    protective_device: '',
    rating: '',
    conductor_csa: '',
    earthing_conductor: '',
    max_zs: 0,
    overall_condition: 'satisfactory'
  });

  if (!eicrSession) return null;

  const { circuits } = eicrSession.eicr_report;

  const handleAddCircuit = () => {
    if (newCircuit.ref && newCircuit.description) {
      addCircuit(newCircuit);
      setNewCircuit({
        ref: '',
        type: 'lighting',
        description: '',
        protective_device: '',
        rating: '',
        conductor_csa: '',
        earthing_conductor: '',
        max_zs: 0,
        overall_condition: 'satisfactory'
      });
      setIsAddingCircuit(false);
    }
  };

  const getConditionColor = (condition: string) => {
    return condition === 'satisfactory' 
      ? 'bg-green-500/20 text-green-300 border-green-500/30'
      : 'bg-red-500/20 text-red-300 border-red-500/30';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Circuit Schedule Management</h3>
          <p className="text-sm text-muted-foreground">
            Manage circuits for EICR testing and populate test results
          </p>
        </div>
        <Button 
          onClick={() => setIsAddingCircuit(true)} 
          className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Circuit
        </Button>
      </div>

      {/* Add Circuit Form */}
      {isAddingCircuit && (
        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
              Add New Circuit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="circuit-ref">Circuit Reference</Label>
                <Input
                  id="circuit-ref"
                  value={newCircuit.ref}
                  onChange={(e) => setNewCircuit({...newCircuit, ref: e.target.value})}
                  placeholder="e.g., L1, L2, C1"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
              <div>
                <Label htmlFor="circuit-type">Type</Label>
                <Select value={newCircuit.type} onValueChange={(value: CircuitType) => setNewCircuit({...newCircuit, type: value})}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lighting">Lighting</SelectItem>
                    <SelectItem value="power">Power/Sockets</SelectItem>
                    <SelectItem value="cooker">Cooker</SelectItem>
                    <SelectItem value="shower">Shower</SelectItem>
                    <SelectItem value="immersion">Immersion Heater</SelectItem>
                    <SelectItem value="heating">Heating</SelectItem>
                    <SelectItem value="smoke-alarm">Smoke Alarm</SelectItem>
                    <SelectItem value="security">Security System</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newCircuit.description}
                  onChange={(e) => setNewCircuit({...newCircuit, description: e.target.value})}
                  placeholder="Ground floor lighting"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="protective-device">Protective Device</Label>
                <Input
                  id="protective-device"
                  value={newCircuit.protective_device}
                  onChange={(e) => setNewCircuit({...newCircuit, protective_device: e.target.value})}
                  placeholder="MCB Type B"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating (A)</Label>
                <Input
                  id="rating"
                  value={newCircuit.rating}
                  onChange={(e) => setNewCircuit({...newCircuit, rating: e.target.value})}
                  placeholder="16"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
              <div>
                <Label htmlFor="conductor-csa">Conductor CSA (mm²)</Label>
                <Input
                  id="conductor-csa"
                  value={newCircuit.conductor_csa}
                  onChange={(e) => setNewCircuit({...newCircuit, conductor_csa: e.target.value})}
                  placeholder="2.5"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="earthing-conductor">Earthing Conductor (mm²)</Label>
                <Input
                  id="earthing-conductor"
                  value={newCircuit.earthing_conductor}
                  onChange={(e) => setNewCircuit({...newCircuit, earthing_conductor: e.target.value})}
                  placeholder="1.5"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
              <div>
                <Label htmlFor="max-zs">Maximum Zs (Ω)</Label>
                <Input
                  id="max-zs"
                  type="number"
                  step="0.01"
                  value={newCircuit.max_zs}
                  onChange={(e) => setNewCircuit({...newCircuit, max_zs: parseFloat(e.target.value) || 0})}
                  placeholder="2.87"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddCircuit} className="bg-green-600 hover:bg-green-700">
                Add Circuit
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsAddingCircuit(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Circuits List */}
      <div className="space-y-4">
        {circuits.length === 0 ? (
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="pt-6 text-center">
              <Zap className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No circuits added yet</p>
              <p className="text-sm text-muted-foreground">
                Add circuits to begin testing and populate EICR schedule
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {circuits.map((circuit) => (
              <Card key={circuit.ref} className="border-elec-yellow/20 bg-elec-gray">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono font-bold">{circuit.ref}</span>
                        <Badge variant="outline">{circuit.type}</Badge>
                        <Badge className={getConditionColor(circuit.overall_condition)}>
                          {circuit.overall_condition}
                        </Badge>
                      </div>
                      
                      <h4 className="font-medium mb-2">{circuit.description}</h4>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Protection:</span>
                          <div>{circuit.protective_device} {circuit.rating}A</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Conductor:</span>
                          <div>{circuit.conductor_csa}mm² / {circuit.earthing_conductor}mm²</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Max Zs:</span>
                          <div>{circuit.max_zs}Ω</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Measured Zs:</span>
                          <div>{circuit.measured_zs ? `${circuit.measured_zs}Ω` : 'Not tested'}</div>
                        </div>
                      </div>

                      {/* Test Results Summary */}
                      {(circuit.insulation_resistance || circuit.polarity_correct !== undefined || circuit.rcd_operation || circuit.continuity_cpc) && (
                        <div className="mt-3 p-3 bg-elec-dark/50 rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">Test Results:</div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            {circuit.insulation_resistance && (
                              <div>IR: {circuit.insulation_resistance}MΩ</div>
                            )}
                            {circuit.polarity_correct !== undefined && (
                              <div>Polarity: {circuit.polarity_correct ? 'OK' : 'FAULT'}</div>
                            )}
                            {circuit.rcd_operation && (
                              <div>RCD: {circuit.rcd_operation}ms</div>
                            )}
                            {circuit.continuity_cpc && (
                              <div>R1+R2: {circuit.continuity_cpc}Ω</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CircuitManager;
