
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Download, Printer, Save, Trash2 } from 'lucide-react';

interface Circuit {
  id: string;
  reference: string;
  description: string;
  type: string;
  mcb_rating: string;
  conductor_csa: string;
  max_zs: string;
  // Test results
  continuity_r1_r2: string;
  continuity_rn: string;
  insulation_resistance_l_l: string;
  insulation_resistance_l_n: string;
  insulation_resistance_l_e: string;
  polarity: string;
  earth_fault_loop_zs: string;
  rcd_operation_time: string;
  rcd_operation_current: string;
  overall_result: 'pass' | 'fail' | 'pending';
}

const ScheduleOfTestResults = () => {
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [newCircuit, setNewCircuit] = useState({
    reference: '',
    description: '',
    type: 'lighting',
    mcb_rating: '',
    conductor_csa: '',
    max_zs: ''
  });

  const circuitTypes = [
    { value: 'lighting', label: 'Lighting' },
    { value: 'power', label: 'Power' },
    { value: 'cooker', label: 'Cooker' },
    { value: 'shower', label: 'Shower' },
    { value: 'immersion', label: 'Immersion' },
    { value: 'heating', label: 'Heating' },
    { value: 'other', label: 'Other' }
  ];

  const addCircuit = () => {
    if (!newCircuit.reference || !newCircuit.description) {
      return;
    }

    const circuit: Circuit = {
      id: `circuit-${Date.now()}`,
      ...newCircuit,
      continuity_r1_r2: '',
      continuity_rn: '',
      insulation_resistance_l_l: '',
      insulation_resistance_l_n: '',
      insulation_resistance_l_e: '',
      polarity: '',
      earth_fault_loop_zs: '',
      rcd_operation_time: '',
      rcd_operation_current: '',
      overall_result: 'pending'
    };

    setCircuits([...circuits, circuit]);
    setNewCircuit({
      reference: '',
      description: '',
      type: 'lighting',
      mcb_rating: '',
      conductor_csa: '',
      max_zs: ''
    });
  };

  const updateCircuitValue = (circuitId: string, field: keyof Circuit, value: string) => {
    setCircuits(circuits.map(circuit => 
      circuit.id === circuitId 
        ? { ...circuit, [field]: value }
        : circuit
    ));
  };

  const deleteCircuit = (circuitId: string) => {
    setCircuits(circuits.filter(circuit => circuit.id !== circuitId));
  };

  const exportResults = () => {
    console.log('Exporting results:', circuits);
    // TODO: Implement PDF export
  };

  const printResults = () => {
    window.print();
  };

  const saveResults = () => {
    localStorage.setItem('eicr-schedule-results', JSON.stringify(circuits));
    console.log('Results saved to localStorage');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Schedule of Test Results</h2>
          <p className="text-muted-foreground">
            Enter circuit details and test measurements for EICR
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={saveResults} variant="outline" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button onClick={printResults} variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button onClick={exportResults} className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Add Circuit Form */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-elec-yellow" />
            Add Circuit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Reference</label>
              <Input
                placeholder="C1"
                value={newCircuit.reference}
                onChange={(e) => setNewCircuit({...newCircuit, reference: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Input
                placeholder="Kitchen lights"
                value={newCircuit.description}
                onChange={(e) => setNewCircuit({...newCircuit, description: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Type</label>
              <Select value={newCircuit.type} onValueChange={(value) => setNewCircuit({...newCircuit, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {circuitTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">MCB Rating</label>
              <Input
                placeholder="32A"
                value={newCircuit.mcb_rating}
                onChange={(e) => setNewCircuit({...newCircuit, mcb_rating: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Conductor CSA</label>
              <Input
                placeholder="2.5mm²"
                value={newCircuit.conductor_csa}
                onChange={(e) => setNewCircuit({...newCircuit, conductor_csa: e.target.value})}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addCircuit} className="bg-elec-yellow text-black hover:bg-elec-yellow/90 w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Results Grid */}
      {circuits.length === 0 ? (
        <Alert className="bg-blue-500/10 border-blue-500/30">
          <AlertDescription className="text-blue-200">
            No circuits added yet. Use the form above to add your first circuit and begin testing.
          </AlertDescription>
        </Alert>
      ) : (
        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle>Test Results Grid</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[80px]">Ref</TableHead>
                  <TableHead className="min-w-[150px]">Description</TableHead>
                  <TableHead className="min-w-[100px]">Type</TableHead>
                  <TableHead className="min-w-[80px]">MCB</TableHead>
                  <TableHead className="min-w-[80px]">CSA</TableHead>
                  <TableHead className="min-w-[100px]">Continuity R1+R2 (Ω)</TableHead>
                  <TableHead className="min-w-[100px]">Continuity Rn (Ω)</TableHead>
                  <TableHead className="min-w-[120px]">IR L-L (MΩ)</TableHead>
                  <TableHead className="min-w-[120px]">IR L-N (MΩ)</TableHead>
                  <TableHead className="min-w-[120px]">IR L-E (MΩ)</TableHead>
                  <TableHead className="min-w-[100px]">Polarity</TableHead>
                  <TableHead className="min-w-[100px]">Zs (Ω)</TableHead>
                  <TableHead className="min-w-[120px]">RCD Time (ms)</TableHead>
                  <TableHead className="min-w-[120px]">RCD Current (mA)</TableHead>
                  <TableHead className="min-w-[100px]">Result</TableHead>
                  <TableHead className="min-w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {circuits.map((circuit) => (
                  <TableRow key={circuit.id}>
                    <TableCell className="font-medium">{circuit.reference}</TableCell>
                    <TableCell>{circuit.description}</TableCell>
                    <TableCell className="capitalize">{circuit.type}</TableCell>
                    <TableCell>{circuit.mcb_rating}</TableCell>
                    <TableCell>{circuit.conductor_csa}</TableCell>
                    <TableCell>
                      <Input
                        className="w-20 h-8"
                        value={circuit.continuity_r1_r2}
                        onChange={(e) => updateCircuitValue(circuit.id, 'continuity_r1_r2', e.target.value)}
                        placeholder="0.25"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="w-20 h-8"
                        value={circuit.continuity_rn}
                        onChange={(e) => updateCircuitValue(circuit.id, 'continuity_rn', e.target.value)}
                        placeholder="0.15"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="w-24 h-8"
                        value={circuit.insulation_resistance_l_l}
                        onChange={(e) => updateCircuitValue(circuit.id, 'insulation_resistance_l_l', e.target.value)}
                        placeholder=">999"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="w-24 h-8"
                        value={circuit.insulation_resistance_l_n}
                        onChange={(e) => updateCircuitValue(circuit.id, 'insulation_resistance_l_n', e.target.value)}
                        placeholder=">999"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="w-24 h-8"
                        value={circuit.insulation_resistance_l_e}
                        onChange={(e) => updateCircuitValue(circuit.id, 'insulation_resistance_l_e', e.target.value)}
                        placeholder=">999"
                      />
                    </TableCell>
                    <TableCell>
                      <Select value={circuit.polarity} onValueChange={(value) => updateCircuitValue(circuit.id, 'polarity', value)}>
                        <SelectTrigger className="w-20 h-8">
                          <SelectValue placeholder="✓" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="correct">✓</SelectItem>
                          <SelectItem value="incorrect">✗</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        className="w-20 h-8"
                        value={circuit.earth_fault_loop_zs}
                        onChange={(e) => updateCircuitValue(circuit.id, 'earth_fault_loop_zs', e.target.value)}
                        placeholder="0.45"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="w-24 h-8"
                        value={circuit.rcd_operation_time}
                        onChange={(e) => updateCircuitValue(circuit.id, 'rcd_operation_time', e.target.value)}
                        placeholder="28"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="w-24 h-8"
                        value={circuit.rcd_operation_current}
                        onChange={(e) => updateCircuitValue(circuit.id, 'rcd_operation_current', e.target.value)}
                        placeholder="30"
                      />
                    </TableCell>
                    <TableCell>
                      <Select value={circuit.overall_result} onValueChange={(value: 'pass' | 'fail' | 'pending') => updateCircuitValue(circuit.id, 'overall_result', value)}>
                        <SelectTrigger className="w-20 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">-</SelectItem>
                          <SelectItem value="pass">✓</SelectItem>
                          <SelectItem value="fail">✗</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteCircuit(circuit.id)}
                        className="h-8 w-8 p-0 hover:bg-red-500/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Summary Card */}
      {circuits.length > 0 && (
        <Card className="border-green-500/30 bg-green-500/10">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">{circuits.length}</div>
                <div className="text-sm text-muted-foreground">Total Circuits</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {circuits.filter(c => c.overall_result === 'pass').length}
                </div>
                <div className="text-sm text-muted-foreground">Passed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {circuits.filter(c => c.overall_result === 'fail').length}
                </div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {circuits.filter(c => c.overall_result === 'pending').length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScheduleOfTestResults;
