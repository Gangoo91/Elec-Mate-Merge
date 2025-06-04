
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';
import { EICRCircuit, CircuitType } from '@/types/eicr';

const CircuitManager = () => {
  const { eicrSession, addCircuit, updateCircuit } = useEICR();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCircuit, setEditingCircuit] = useState<string | null>(null);
  const [newCircuit, setNewCircuit] = useState<Partial<EICRCircuit>>({
    ref: '',
    type: 'lighting',
    description: '',
    protective_device: '',
    rating: '',
    conductor_csa: '',
    earthing_conductor: '',
    max_zs: 0,
    overall_condition: 'satisfactory',
  });

  if (!eicrSession) return null;

  const { eicr_report } = eicrSession;

  const handleAddCircuit = () => {
    if (newCircuit.ref && newCircuit.type && newCircuit.description) {
      addCircuit(newCircuit as EICRCircuit);
      setNewCircuit({
        ref: '',
        type: 'lighting',
        description: '',
        protective_device: '',
        rating: '',
        conductor_csa: '',
        earthing_conductor: '',
        max_zs: 0,
        overall_condition: 'satisfactory',
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Circuit Form */}
      {showAddForm && (
        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Circuit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Circuit Reference</label>
                <Input
                  value={newCircuit.ref || ''}
                  onChange={(e) => setNewCircuit(prev => ({ ...prev, ref: e.target.value }))}
                  placeholder="e.g., L1, C1, S1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Circuit Type</label>
                <Select
                  value={newCircuit.type}
                  onValueChange={(value: CircuitType) => setNewCircuit(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lighting">Lighting</SelectItem>
                    <SelectItem value="power">Power</SelectItem>
                    <SelectItem value="cooker">Cooker</SelectItem>
                    <SelectItem value="shower">Shower</SelectItem>
                    <SelectItem value="immersion">Immersion</SelectItem>
                    <SelectItem value="heating">Heating</SelectItem>
                    <SelectItem value="smoke-alarm">Smoke Alarm</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Protective Device</label>
                <Input
                  value={newCircuit.protective_device || ''}
                  onChange={(e) => setNewCircuit(prev => ({ ...prev, protective_device: e.target.value }))}
                  placeholder="e.g., MCB, RCBO"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">Rating (A)</label>
                <Input
                  value={newCircuit.rating || ''}
                  onChange={(e) => setNewCircuit(prev => ({ ...prev, rating: e.target.value }))}
                  placeholder="e.g., 6A, 32A"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Conductor CSA</label>
                <Input
                  value={newCircuit.conductor_csa || ''}
                  onChange={(e) => setNewCircuit(prev => ({ ...prev, conductor_csa: e.target.value }))}
                  placeholder="e.g., 2.5mm²"
                />
              </div>
              <div>
                <label className="text-sm font-medium">CPC CSA</label>
                <Input
                  value={newCircuit.earthing_conductor || ''}
                  onChange={(e) => setNewCircuit(prev => ({ ...prev, earthing_conductor: e.target.value }))}
                  placeholder="e.g., 1.5mm²"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Max Zs (Ω)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={newCircuit.max_zs || ''}
                  onChange={(e) => setNewCircuit(prev => ({ ...prev, max_zs: parseFloat(e.target.value) || 0 }))}
                  placeholder="e.g., 1.44"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                value={newCircuit.description || ''}
                onChange={(e) => setNewCircuit(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Circuit description and location"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleAddCircuit}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                Add Circuit
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Circuits List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Circuit Schedule ({eicr_report.circuits.length})</h3>
          {!showAddForm && (
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Circuit
            </Button>
          )}
        </div>

        {eicr_report.circuits.length === 0 ? (
          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardContent className="pt-6 text-center">
              <p className="text-blue-200">No circuits added yet. Add circuits to begin testing.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {eicr_report.circuits.map((circuit) => (
              <Card key={circuit.ref} className="border-elec-yellow/20 bg-elec-gray">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono">
                          {circuit.ref}
                        </Badge>
                        <span className="font-medium capitalize">
                          {circuit.type.replace('-', ' ')}
                        </span>
                        <Badge 
                          variant={circuit.overall_condition === 'satisfactory' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {circuit.overall_condition}
                        </Badge>
                      </div>
                      
                      <p className="text-sm">{circuit.description}</p>
                      
                      <div className="grid grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">Protective Device:</span>
                          <div>{circuit.protective_device} {circuit.rating}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Conductor:</span>
                          <div>{circuit.conductor_csa}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">CPC:</span>
                          <div>{circuit.earthing_conductor}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Max Zs:</span>
                          <div>{circuit.max_zs}Ω</div>
                        </div>
                      </div>

                      {/* Test Results */}
                      {(circuit.measured_zs || circuit.insulation_resistance || circuit.rcd_operation || circuit.continuity_cpc) && (
                        <div className="mt-3 p-3 bg-elec-dark/30 rounded border">
                          <div className="text-xs text-muted-foreground mb-2">Test Results:</div>
                          <div className="grid grid-cols-4 gap-4 text-xs">
                            {circuit.measured_zs && (
                              <div>
                                <span className="text-muted-foreground">Measured Zs:</span>
                                <div className={circuit.measured_zs > circuit.max_zs ? 'text-red-400' : 'text-green-400'}>
                                  {circuit.measured_zs}Ω
                                </div>
                              </div>
                            )}
                            {circuit.insulation_resistance && (
                              <div>
                                <span className="text-muted-foreground">Insulation:</span>
                                <div className={circuit.insulation_resistance < 1 ? 'text-red-400' : 'text-green-400'}>
                                  {circuit.insulation_resistance}MΩ
                                </div>
                              </div>
                            )}
                            {circuit.rcd_operation && (
                              <div>
                                <span className="text-muted-foreground">RCD:</span>
                                <div className={circuit.rcd_operation > 300 ? 'text-red-400' : 'text-green-400'}>
                                  {circuit.rcd_operation}ms
                                </div>
                              </div>
                            )}
                            {circuit.continuity_cpc && (
                              <div>
                                <span className="text-muted-foreground">R1+R2:</span>
                                <div>{circuit.continuity_cpc}Ω</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
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
