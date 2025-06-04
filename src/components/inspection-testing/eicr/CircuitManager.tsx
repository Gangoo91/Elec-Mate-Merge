
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';
import { EICRCircuit, CircuitType } from '@/types/eicr';

const CircuitManager = () => {
  const { eicrSession, addCircuit, updateCircuit } = useEICR();
  const [isAddingCircuit, setIsAddingCircuit] = useState(false);
  const [editingCircuit, setEditingCircuit] = useState<string | null>(null);
  const [newCircuit, setNewCircuit] = useState<Partial<EICRCircuit>>({
    ref: '',
    type: 'lighting',
    description: '',
    protective_device: 'MCB Type B',
    rating: '',
    conductor_csa: '',
    earthing_conductor: '',
    max_zs: 0,
    overall_condition: 'satisfactory'
  });

  const circuits = eicrSession?.eicr_report.circuits || [];

  const circuitTemplates = {
    lighting: { rating: '16', conductor_csa: '1.5', earthing_conductor: '1.5', max_zs: 2.87, protective_device: 'MCB Type B' },
    power: { rating: '32', conductor_csa: '2.5', earthing_conductor: '2.5', max_zs: 1.44, protective_device: 'MCB Type B' },
    cooker: { rating: '32', conductor_csa: '6.0', earthing_conductor: '6.0', max_zs: 0.72, protective_device: 'MCB Type C' },
    shower: { rating: '40', conductor_csa: '10.0', earthing_conductor: '10.0', max_zs: 1.15, protective_device: 'MCB Type C' },
    immersion: { rating: '20', conductor_csa: '2.5', earthing_conductor: '2.5', max_zs: 2.30, protective_device: 'MCB Type B' },
    heating: { rating: '32', conductor_csa: '2.5', earthing_conductor: '2.5', max_zs: 1.44, protective_device: 'MCB Type B' }
  };

  const handleCircuitTypeChange = (type: CircuitType) => {
    const template = circuitTemplates[type as keyof typeof circuitTemplates] || circuitTemplates.lighting;
    setNewCircuit(prev => ({
      ...prev,
      type,
      ...template
    }));
  };

  const handleAddCircuit = () => {
    if (!newCircuit.ref || !newCircuit.description) return;

    const circuit: EICRCircuit = {
      ref: newCircuit.ref,
      type: newCircuit.type as CircuitType,
      description: newCircuit.description,
      protective_device: newCircuit.protective_device || 'MCB Type B',
      rating: newCircuit.rating || '16',
      conductor_csa: newCircuit.conductor_csa || '1.5',
      earthing_conductor: newCircuit.earthing_conductor || '1.5',
      max_zs: newCircuit.max_zs || 2.87,
      overall_condition: 'satisfactory'
    };

    addCircuit(circuit);
    setNewCircuit({
      ref: '',
      type: 'lighting',
      description: '',
      protective_device: 'MCB Type B',
      rating: '',
      conductor_csa: '',
      earthing_conductor: '',
      max_zs: 0,
      overall_condition: 'satisfactory'
    });
    setIsAddingCircuit(false);
  };

  const getCircuitStatus = (circuit: EICRCircuit) => {
    const hasTestResults = circuit.measured_zs !== undefined || 
                          circuit.insulation_resistance !== undefined ||
                          circuit.rcd_operation !== undefined ||
                          circuit.continuity_cpc !== undefined;
    
    if (!hasTestResults) return 'pending';
    if (circuit.overall_condition === 'unsatisfactory') return 'failed';
    return 'tested';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'tested': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'failed': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'tested': return CheckCircle;
      case 'failed': return AlertTriangle;
      default: return Zap;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
              Circuit Manager
            </CardTitle>
            <Button 
              onClick={() => setIsAddingCircuit(true)} 
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Circuit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500/20 text-green-300">
                {circuits.filter(c => getCircuitStatus(c) === 'tested').length} Tested
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-red-500/20 text-red-300">
                {circuits.filter(c => getCircuitStatus(c) === 'failed').length} Failed
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-500/20 text-yellow-300">
                {circuits.filter(c => getCircuitStatus(c) === 'pending').length} Pending
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {isAddingCircuit && (
        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-lg">Add New Circuit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ref">Circuit Reference</Label>
                <Input
                  id="ref"
                  value={newCircuit.ref}
                  onChange={(e) => setNewCircuit(prev => ({ ...prev, ref: e.target.value }))}
                  placeholder="L1, C1, S1, etc."
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
              <div>
                <Label htmlFor="type">Circuit Type</Label>
                <Select 
                  value={newCircuit.type} 
                  onValueChange={handleCircuitTypeChange}
                >
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lighting">Lighting</SelectItem>
                    <SelectItem value="power">Power/Sockets</SelectItem>
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
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newCircuit.description}
                onChange={(e) => setNewCircuit(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Ground floor lighting, kitchen sockets, etc."
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="rating">Rating (A)</Label>
                <Input
                  id="rating"
                  value={newCircuit.rating}
                  onChange={(e) => setNewCircuit(prev => ({ ...prev, rating: e.target.value }))}
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
              <div>
                <Label htmlFor="conductor_csa">Conductor CSA (mm²)</Label>
                <Input
                  id="conductor_csa"
                  value={newCircuit.conductor_csa}
                  onChange={(e) => setNewCircuit(prev => ({ ...prev, conductor_csa: e.target.value }))}
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
              <div>
                <Label htmlFor="protective_device">Protective Device</Label>
                <Select 
                  value={newCircuit.protective_device} 
                  onValueChange={(value) => setNewCircuit(prev => ({ ...prev, protective_device: value }))}
                >
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MCB Type B">MCB Type B</SelectItem>
                    <SelectItem value="MCB Type C">MCB Type C</SelectItem>
                    <SelectItem value="MCB Type D">MCB Type D</SelectItem>
                    <SelectItem value="RCBO">RCBO</SelectItem>
                    <SelectItem value="Fuse BS 3036">Fuse BS 3036</SelectItem>
                    <SelectItem value="Fuse BS 88">Fuse BS 88</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3">
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

      {circuits.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle>Circuit Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ref</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Protection</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {circuits.map((circuit) => {
                  const status = getCircuitStatus(circuit);
                  const StatusIcon = getStatusIcon(status);
                  
                  return (
                    <TableRow key={circuit.ref}>
                      <TableCell className="font-mono">{circuit.ref}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {circuit.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{circuit.description}</TableCell>
                      <TableCell>{circuit.rating}A</TableCell>
                      <TableCell>{circuit.protective_device}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingCircuit(circuit.ref)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CircuitManager;
