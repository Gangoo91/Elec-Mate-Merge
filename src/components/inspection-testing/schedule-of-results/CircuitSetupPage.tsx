
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Settings, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Circuit {
  id: string;
  reference: string;
  description: string;
  type: string;
  liveTest: string;
  cableType: string;
  method: string;
  csa: string;
  length: string;
}

const CircuitSetupPage = () => {
  const navigate = useNavigate();
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [formData, setFormData] = useState({
    reference: '',
    description: '',
    type: '',
    liveTest: '',
    cableType: '',
    method: '',
    csa: '',
    length: ''
  });

  const handleAddCircuit = () => {
    if (formData.reference && formData.description) {
      const newCircuit: Circuit = {
        id: Date.now().toString(),
        ...formData
      };
      setCircuits([...circuits, newCircuit]);
      setFormData({
        reference: '',
        description: '',
        type: '',
        liveTest: '',
        cableType: '',
        method: '',
        csa: '',
        length: ''
      });
    }
  };

  const handleContinueToTesting = () => {
    if (circuits.length > 0) {
      // Store circuits in localStorage for the testing page
      localStorage.setItem('eicrCircuits', JSON.stringify(circuits));
      navigate('/electrician-tools/inspection-testing/testing-grid');
    }
  };

  const handleRemoveCircuit = (id: string) => {
    setCircuits(circuits.filter(circuit => circuit.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="h-6 w-6 text-elec-yellow" />
            Schedule of Test Results - Circuit Setup
          </h2>
          <p className="text-muted-foreground">
            Add circuits to your EICR before proceeding to testing
          </p>
        </div>
      </div>

      {/* Circuit Addition Form */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-elec-yellow" />
            Add Circuit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reference">Circuit Reference</Label>
              <Input
                id="reference"
                placeholder="e.g., C1, L1, etc."
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                className="bg-elec-gray border-elec-yellow/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="e.g., Kitchen Ring, Upstairs Lights"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-elec-gray border-elec-yellow/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Circuit Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="bg-elec-gray border-elec-yellow/30">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ring">Ring Final</SelectItem>
                  <SelectItem value="radial">Radial</SelectItem>
                  <SelectItem value="lighting">Lighting</SelectItem>
                  <SelectItem value="cooker">Cooker</SelectItem>
                  <SelectItem value="shower">Shower</SelectItem>
                  <SelectItem value="immersion">Immersion Heater</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="liveTest">Live Test</Label>
              <Select value={formData.liveTest} onValueChange={(value) => setFormData({ ...formData, liveTest: value })}>
                <SelectTrigger className="bg-elec-gray border-elec-yellow/30">
                  <SelectValue placeholder="Live test required?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="limitation">Limitation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cableType">Cable Type</Label>
              <Select value={formData.cableType} onValueChange={(value) => setFormData({ ...formData, cableType: value })}>
                <SelectTrigger className="bg-elec-gray border-elec-yellow/30">
                  <SelectValue placeholder="Select cable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6242Y">6242Y Twin & Earth</SelectItem>
                  <SelectItem value="6243Y">6243Y 3-Core & Earth</SelectItem>
                  <SelectItem value="SWA">SWA Armoured</SelectItem>
                  <SelectItem value="MICC">MICC</SelectItem>
                  <SelectItem value="FP200">FP200 Fire Resistant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="method">Installation Method</Label>
              <Select value={formData.method} onValueChange={(value) => setFormData({ ...formData, method: value })}>
                <SelectTrigger className="bg-elec-gray border-elec-yellow/30">
                  <SelectValue placeholder="Installation method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A - Enclosed in conduit</SelectItem>
                  <SelectItem value="B">B - Enclosed in trunking</SelectItem>
                  <SelectItem value="C">C - Clipped direct</SelectItem>
                  <SelectItem value="D">D - In thermal insulation</SelectItem>
                  <SelectItem value="E">E - Buried direct</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="csa">CSA (mm²)</Label>
              <Select value={formData.csa} onValueChange={(value) => setFormData({ ...formData, csa: value })}>
                <SelectTrigger className="bg-elec-gray border-elec-yellow/30">
                  <SelectValue placeholder="Cross-sectional area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.0">1.0 mm²</SelectItem>
                  <SelectItem value="1.5">1.5 mm²</SelectItem>
                  <SelectItem value="2.5">2.5 mm²</SelectItem>
                  <SelectItem value="4.0">4.0 mm²</SelectItem>
                  <SelectItem value="6.0">6.0 mm²</SelectItem>
                  <SelectItem value="10.0">10.0 mm²</SelectItem>
                  <SelectItem value="16.0">16.0 mm²</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="length">Length (m)</Label>
              <Input
                id="length"
                type="number"
                placeholder="Cable length"
                value={formData.length}
                onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                className="bg-elec-gray border-elec-yellow/30"
              />
            </div>
          </div>

          <Button 
            onClick={handleAddCircuit}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            disabled={!formData.reference || !formData.description}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Circuit
          </Button>
        </CardContent>
      </Card>

      {/* Circuits Table */}
      {circuits.length > 0 && (
        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle>Added Circuits ({circuits.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Cable</TableHead>
                  <TableHead>CSA</TableHead>
                  <TableHead>Length</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {circuits.map((circuit) => (
                  <TableRow key={circuit.id}>
                    <TableCell className="font-medium text-elec-yellow">{circuit.reference}</TableCell>
                    <TableCell>{circuit.description}</TableCell>
                    <TableCell>{circuit.type}</TableCell>
                    <TableCell>{circuit.cableType}</TableCell>
                    <TableCell>{circuit.csa} mm²</TableCell>
                    <TableCell>{circuit.length}m</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveCircuit(circuit.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleContinueToTesting}
                className="bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                Continue to Testing
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {circuits.length === 0 && (
        <Card className="border-dashed border-2 border-gray-600 bg-gray-800/50">
          <CardContent className="p-8 text-center">
            <Settings className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No circuits added yet</h3>
            <p className="text-gray-500">Add at least one circuit to continue to the testing phase.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CircuitSetupPage;
