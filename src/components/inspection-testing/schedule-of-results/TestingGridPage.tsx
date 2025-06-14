
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Save, TestTube } from 'lucide-react';
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

interface TestResults {
  [circuitId: string]: {
    continuity_r1: string;
    continuity_r2: string;
    continuity_rn: string;
    insulation_live_earth: string;
    insulation_neutral_earth: string;
    insulation_live_neutral: string;
    polarity: string;
    earth_fault_loop: string;
    rcd_operating_time: string;
    rcd_operating_current: string;
  };
}

const TestingGridPage = () => {
  const navigate = useNavigate();
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [testResults, setTestResults] = useState<TestResults>({});

  useEffect(() => {
    // Load circuits from localStorage
    const storedCircuits = localStorage.getItem('eicrCircuits');
    if (storedCircuits) {
      const parsedCircuits = JSON.parse(storedCircuits);
      setCircuits(parsedCircuits);
      
      // Initialize test results structure
      const initialResults: TestResults = {};
      parsedCircuits.forEach((circuit: Circuit) => {
        initialResults[circuit.id] = {
          continuity_r1: '',
          continuity_r2: '',
          continuity_rn: '',
          insulation_live_earth: '',
          insulation_neutral_earth: '',
          insulation_live_neutral: '',
          polarity: '',
          earth_fault_loop: '',
          rcd_operating_time: '',
          rcd_operating_current: ''
        };
      });
      setTestResults(initialResults);
    }
  }, []);

  const updateTestResult = (circuitId: string, testType: string, value: string) => {
    setTestResults(prev => ({
      ...prev,
      [circuitId]: {
        ...prev[circuitId],
        [testType]: value
      }
    }));
  };

  const handleBack = () => {
    navigate('/electrician-tools/inspection-testing');
  };

  const handleSaveResults = () => {
    // Save test results to localStorage
    localStorage.setItem('eicrTestResults', JSON.stringify(testResults));
    console.log('Test results saved:', testResults);
  };

  const handleExportResults = () => {
    // Export functionality would go here
    console.log('Exporting results...', { circuits, testResults });
  };

  const getComplianceStatus = (value: string, testType: string) => {
    if (!value) return null;
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'N/A';
    
    // Basic compliance rules (simplified)
    switch (testType) {
      case 'insulation':
        return numValue >= 1.0 ? 'Pass' : 'Fail';
      case 'continuity':
        return numValue <= 2.0 ? 'Pass' : 'Investigate';
      case 'earth_fault_loop':
        return numValue <= 1.15 ? 'Pass' : 'Fail';
      default:
        return 'Pass';
    }
  };

  if (circuits.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="border-red-500/30 bg-red-500/10">
          <CardContent className="p-8 text-center">
            <TestTube className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-red-300 mb-2">No circuits found</h3>
            <p className="text-red-200 mb-4">Please go back and add circuits before testing.</p>
            <Button onClick={handleBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Circuit Setup
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <TestTube className="h-6 w-6 text-elec-yellow" />
            EICR Testing Grid
          </h2>
          <p className="text-muted-foreground">
            Complete testing for {circuits.length} circuit{circuits.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Setup
          </Button>
          <Button onClick={handleSaveResults} variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save Results
          </Button>
          <Button onClick={handleExportResults} className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Export EICR
          </Button>
        </div>
      </div>

      {/* Testing Grid */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle>Test Results Grid</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px]">Circuit</TableHead>
                <TableHead className="min-w-[150px]">Description</TableHead>
                <TableHead className="min-w-[80px]">R1 (Ω)</TableHead>
                <TableHead className="min-w-[80px]">R2 (Ω)</TableHead>
                <TableHead className="min-w-[80px]">Rn (Ω)</TableHead>
                <TableHead className="min-w-[100px]">IR L-E (MΩ)</TableHead>
                <TableHead className="min-w-[100px]">IR N-E (MΩ)</TableHead>
                <TableHead className="min-w-[100px]">IR L-N (MΩ)</TableHead>
                <TableHead className="min-w-[80px]">Polarity</TableHead>
                <TableHead className="min-w-[100px]">Zs (Ω)</TableHead>
                <TableHead className="min-w-[100px]">RCD Time (ms)</TableHead>
                <TableHead className="min-w-[100px]">RCD Current (mA)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {circuits.map((circuit) => (
                <TableRow key={circuit.id}>
                  <TableCell className="font-medium">
                    <Badge variant="outline" className="text-elec-yellow border-elec-yellow">
                      {circuit.reference}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{circuit.description}</TableCell>
                  
                  {/* Continuity Tests */}
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="R1"
                      className="w-20 h-8 text-xs"
                      value={testResults[circuit.id]?.continuity_r1 || ''}
                      onChange={(e) => updateTestResult(circuit.id, 'continuity_r1', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="R2"
                      className="w-20 h-8 text-xs"
                      value={testResults[circuit.id]?.continuity_r2 || ''}
                      onChange={(e) => updateTestResult(circuit.id, 'continuity_r2', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Rn"
                      className="w-20 h-8 text-xs"
                      value={testResults[circuit.id]?.continuity_rn || ''}
                      onChange={(e) => updateTestResult(circuit.id, 'continuity_rn', e.target.value)}
                    />
                  </TableCell>
                  
                  {/* Insulation Resistance Tests */}
                  <TableCell>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="IR L-E"
                      className="w-24 h-8 text-xs"
                      value={testResults[circuit.id]?.insulation_live_earth || ''}
                      onChange={(e) => updateTestResult(circuit.id, 'insulation_live_earth', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="IR N-E"
                      className="w-24 h-8 text-xs"
                      value={testResults[circuit.id]?.insulation_neutral_earth || ''}
                      onChange={(e) => updateTestResult(circuit.id, 'insulation_neutral_earth', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="IR L-N"
                      className="w-24 h-8 text-xs"
                      value={testResults[circuit.id]?.insulation_live_neutral || ''}
                      onChange={(e) => updateTestResult(circuit.id, 'insulation_live_neutral', e.target.value)}
                    />
                  </TableCell>
                  
                  {/* Polarity */}
                  <TableCell>
                    <select
                      className="w-20 h-8 text-xs bg-elec-gray border border-gray-600 rounded"
                      value={testResults[circuit.id]?.polarity || ''}
                      onChange={(e) => updateTestResult(circuit.id, 'polarity', e.target.value)}
                    >
                      <option value="">-</option>
                      <option value="✓">✓</option>
                      <option value="✗">✗</option>
                    </select>
                  </TableCell>
                  
                  {/* Earth Fault Loop */}
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Zs"
                      className="w-24 h-8 text-xs"
                      value={testResults[circuit.id]?.earth_fault_loop || ''}
                      onChange={(e) => updateTestResult(circuit.id, 'earth_fault_loop', e.target.value)}
                    />
                  </TableCell>
                  
                  {/* RCD Tests */}
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="Time"
                      className="w-24 h-8 text-xs"
                      value={testResults[circuit.id]?.rcd_operating_time || ''}
                      onChange={(e) => updateTestResult(circuit.id, 'rcd_operating_time', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="Current"
                      className="w-24 h-8 text-xs"
                      value={testResults[circuit.id]?.rcd_operating_current || ''}
                      onChange={(e) => updateTestResult(circuit.id, 'rcd_operating_current', e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Test Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{circuits.length}</div>
              <div className="text-sm text-blue-300">Circuits</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-500/10 border-green-500/30">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {Object.values(testResults).filter(result => 
                  Object.values(result).some(value => value !== '')
                ).length}
              </div>
              <div className="text-sm text-green-300">In Progress</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {Object.values(testResults).filter(result => 
                  Object.values(result).every(value => value !== '')
                ).length}
              </div>
              <div className="text-sm text-yellow-300">Completed</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestingGridPage;
