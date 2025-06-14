
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Plus, 
  Trash2,
  FileText,
  Download,
  Settings
} from 'lucide-react';

interface Circuit {
  id: string;
  reference: string;
  description: string;
  type: string;
  rating: number;
  r1r2: number | null;
  rn: number | null;
  insulation: number | null;
  polarity: 'PASS' | 'FAIL' | 'N/A' | null;
  earthContinuity: number | null;
  pfc: number | null;
  rcd: number | null;
  functionalTesting: 'PASS' | 'FAIL' | 'N/A' | null;
  overallResult: 'PASS' | 'FAIL' | 'INVESTIGATE' | null;
}

interface TestingSession {
  installationAddress: string;
  inspectionDate: string;
  inspectorName: string;
  circuits: Circuit[];
}

const EnhancedTestingGrid = () => {
  const [session, setSession] = useState<TestingSession>({
    installationAddress: '',
    inspectionDate: new Date().toISOString().split('T')[0],
    inspectorName: '',
    circuits: []
  });

  const [activeTab, setActiveTab] = useState('setup');

  // Sample circuit types for quick addition
  const circuitTypes = [
    { type: 'Lighting', rating: 6, description: 'Downstairs Lights' },
    { type: 'Power', rating: 32, description: 'Kitchen Ring' },
    { type: 'Shower', rating: 45, description: 'Electric Shower' },
    { type: 'Cooker', rating: 32, description: 'Electric Cooker' },
    { type: 'Immersion', rating: 16, description: 'Immersion Heater' }
  ];

  const addCircuit = useCallback((templateType?: any) => {
    const newCircuit: Circuit = {
      id: `circuit-${Date.now()}`,
      reference: `C${session.circuits.length + 1}`,
      description: templateType?.description || '',
      type: templateType?.type || '',
      rating: templateType?.rating || 0,
      r1r2: null,
      rn: null,
      insulation: null,
      polarity: null,
      earthContinuity: null,
      pfc: null,
      rcd: null,
      functionalTesting: null,
      overallResult: null
    };

    setSession(prev => ({
      ...prev,
      circuits: [...prev.circuits, newCircuit]
    }));
  }, [session.circuits.length]);

  const removeCircuit = useCallback((circuitId: string) => {
    setSession(prev => ({
      ...prev,
      circuits: prev.circuits.filter(c => c.id !== circuitId)
    }));
  }, []);

  const updateCircuit = useCallback((circuitId: string, field: string, value: any) => {
    setSession(prev => ({
      ...prev,
      circuits: prev.circuits.map(circuit => {
        if (circuit.id === circuitId) {
          const updated = { ...circuit, [field]: value };
          
          // Auto-calculate overall result based on test values
          let overallResult: 'PASS' | 'FAIL' | 'INVESTIGATE' | null = null;
          
          // Check if we have enough data to determine result
          const hasTestData = updated.r1r2 !== null || updated.insulation !== null || 
                            updated.polarity !== null || updated.earthContinuity !== null;
          
          if (hasTestData) {
            // BS 7671 compliance checks
            let failureFound = false;
            let investigationNeeded = false;

            // R1+R2 check (should be less than 1.67 x Zs for most circuits)
            if (updated.r1r2 !== null && updated.r1r2 > 2.0) {
              failureFound = true;
            }

            // Insulation resistance check (minimum 1MΩ for most circuits)
            if (updated.insulation !== null && updated.insulation < 1.0) {
              failureFound = true;
            }

            // Polarity check
            if (updated.polarity === 'FAIL') {
              failureFound = true;
            }

            // Earth continuity check (should be low, typically less than R1+R2)
            if (updated.earthContinuity !== null && updated.r1r2 !== null && 
                updated.earthContinuity > updated.r1r2) {
              investigationNeeded = true;
            }

            // PFC check (should be sufficient for protective device operation)
            if (updated.pfc !== null && updated.pfc < 100) {
              investigationNeeded = true;
            }

            // Functional testing
            if (updated.functionalTesting === 'FAIL') {
              failureFound = true;
            }

            if (failureFound) {
              overallResult = 'FAIL';
            } else if (investigationNeeded) {
              overallResult = 'INVESTIGATE';
            } else {
              overallResult = 'PASS';
            }
          }

          return { ...updated, overallResult };
        }
        return circuit;
      })
    }));
  }, []);

  const getResultBadge = (result: string | null) => {
    if (!result) return null;
    
    const variants = {
      'PASS': 'bg-green-500/10 text-green-400 border-green-500/20',
      'FAIL': 'bg-red-500/10 text-red-400 border-red-500/20',
      'INVESTIGATE': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'N/A': 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    };

    return (
      <Badge className={variants[result as keyof typeof variants] || variants['N/A']}>
        {result}
      </Badge>
    );
  };

  const getResultIcon = (result: string | null) => {
    switch (result) {
      case 'PASS':
        return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case 'FAIL':
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'INVESTIGATE':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      default:
        return null;
    }
  };

  const generateReport = () => {
    const passCount = session.circuits.filter(c => c.overallResult === 'PASS').length;
    const failCount = session.circuits.filter(c => c.overallResult === 'FAIL').length;
    const investigateCount = session.circuits.filter(c => c.overallResult === 'INVESTIGATE').length;
    
    console.log('Test Results Summary:', {
      total: session.circuits.length,
      pass: passCount,
      fail: failCount,
      investigate: investigateCount
    });
  };

  // Setup Tab Content
  const SetupTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Installation Address</label>
          <Input
            value={session.installationAddress}
            onChange={(e) => setSession(prev => ({ ...prev, installationAddress: e.target.value }))}
            placeholder="Enter property address"
            className="bg-elec-gray/50 border-elec-yellow/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Inspection Date</label>
          <Input
            type="date"
            value={session.inspectionDate}
            onChange={(e) => setSession(prev => ({ ...prev, inspectionDate: e.target.value }))}
            className="bg-elec-gray/50 border-elec-yellow/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Inspector Name</label>
          <Input
            value={session.inspectorName}
            onChange={(e) => setSession(prev => ({ ...prev, inspectorName: e.target.value }))}
            placeholder="Enter inspector name"
            className="bg-elec-gray/50 border-elec-yellow/20"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Quick Circuit Templates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {circuitTypes.map((template, index) => (
            <Button
              key={index}
              onClick={() => addCircuit(template)}
              variant="outline"
              className="h-auto p-3 border-elec-yellow/20 hover:border-elec-yellow/40"
            >
              <div className="text-center">
                <div className="font-medium">{template.type}</div>
                <div className="text-xs text-muted-foreground">{template.rating}A</div>
                <div className="text-xs text-muted-foreground">{template.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {session.circuits.length > 0 && (
        <div className="flex justify-end">
          <Button 
            onClick={() => setActiveTab('testing')}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            Continue to Testing Grid
          </Button>
        </div>
      )}
    </div>
  );

  // Testing Grid Tab Content
  const TestingGridTab = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-elec-yellow">{session.circuits.length}</div>
            <div className="text-sm text-muted-foreground">Total Circuits</div>
          </CardContent>
        </Card>
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">
              {session.circuits.filter(c => c.overallResult === 'PASS').length}
            </div>
            <div className="text-sm text-muted-foreground">Passed</div>
          </CardContent>
        </Card>
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-400">
              {session.circuits.filter(c => c.overallResult === 'FAIL').length}
            </div>
            <div className="text-sm text-muted-foreground">Failed</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-400">
              {session.circuits.filter(c => c.overallResult === 'INVESTIGATE').length}
            </div>
            <div className="text-sm text-muted-foreground">Investigate</div>
          </CardContent>
        </Card>
      </div>

      {/* Testing Grid */}
      <Card className="border-elec-yellow/20 bg-elec-gray/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Schedule of Test Results</span>
            <div className="flex gap-2">
              <Button onClick={() => addCircuit()} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Circuit
              </Button>
              <Button onClick={generateReport} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {session.circuits.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Circuits Added</h3>
              <p className="text-muted-foreground mb-4">
                Add circuits from the setup tab or use the quick templates above.
              </p>
              <Button onClick={() => setActiveTab('setup')} variant="outline">
                Go to Setup
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-elec-yellow/20">
                    <th className="text-left p-2">Ref</th>
                    <th className="text-left p-2">Description</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Rating (A)</th>
                    <th className="text-left p-2">R1+R2 (Ω)</th>
                    <th className="text-left p-2">Rn (Ω)</th>
                    <th className="text-left p-2">IR (MΩ)</th>
                    <th className="text-left p-2">Polarity</th>
                    <th className="text-left p-2">Earth (Ω)</th>
                    <th className="text-left p-2">PFC (A)</th>
                    <th className="text-left p-2">RCD (ms)</th>
                    <th className="text-left p-2">Function</th>
                    <th className="text-left p-2">Result</th>
                    <th className="text-left p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {session.circuits.map((circuit) => (
                    <tr key={circuit.id} className="border-b border-gray-700/50 hover:bg-elec-gray/20">
                      <td className="p-2">
                        <Input
                          value={circuit.reference}
                          onChange={(e) => updateCircuit(circuit.id, 'reference', e.target.value)}
                          className="w-16 h-8 text-xs bg-transparent border-gray-600"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          value={circuit.description}
                          onChange={(e) => updateCircuit(circuit.id, 'description', e.target.value)}
                          className="w-32 h-8 text-xs bg-transparent border-gray-600"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          value={circuit.type}
                          onChange={(e) => updateCircuit(circuit.id, 'type', e.target.value)}
                          className="w-20 h-8 text-xs bg-transparent border-gray-600"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          value={circuit.rating || ''}
                          onChange={(e) => updateCircuit(circuit.id, 'rating', parseFloat(e.target.value) || 0)}
                          className="w-16 h-8 text-xs bg-transparent border-gray-600"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.01"
                          value={circuit.r1r2 || ''}
                          onChange={(e) => updateCircuit(circuit.id, 'r1r2', parseFloat(e.target.value) || null)}
                          className="w-20 h-8 text-xs bg-transparent border-gray-600"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.01"
                          value={circuit.rn || ''}
                          onChange={(e) => updateCircuit(circuit.id, 'rn', parseFloat(e.target.value) || null)}
                          className="w-20 h-8 text-xs bg-transparent border-gray-600"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={circuit.insulation || ''}
                          onChange={(e) => updateCircuit(circuit.id, 'insulation', parseFloat(e.target.value) || null)}
                          className="w-20 h-8 text-xs bg-transparent border-gray-600"
                        />
                      </td>
                      <td className="p-2">
                        <select
                          value={circuit.polarity || ''}
                          onChange={(e) => updateCircuit(circuit.id, 'polarity', e.target.value || null)}
                          className="w-20 h-8 text-xs bg-elec-gray border border-gray-600 rounded"
                        >
                          <option value="">-</option>
                          <option value="PASS">PASS</option>
                          <option value="FAIL">FAIL</option>
                          <option value="N/A">N/A</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.01"
                          value={circuit.earthContinuity || ''}
                          onChange={(e) => updateCircuit(circuit.id, 'earthContinuity', parseFloat(e.target.value) || null)}
                          className="w-20 h-8 text-xs bg-transparent border-gray-600"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          value={circuit.pfc || ''}
                          onChange={(e) => updateCircuit(circuit.id, 'pfc', parseFloat(e.target.value) || null)}
                          className="w-20 h-8 text-xs bg-transparent border-gray-600"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          value={circuit.rcd || ''}
                          onChange={(e) => updateCircuit(circuit.id, 'rcd', parseFloat(e.target.value) || null)}
                          className="w-20 h-8 text-xs bg-transparent border-gray-600"
                        />
                      </td>
                      <td className="p-2">
                        <select
                          value={circuit.functionalTesting || ''}
                          onChange={(e) => updateCircuit(circuit.id, 'functionalTesting', e.target.value || null)}
                          className="w-20 h-8 text-xs bg-elec-gray border border-gray-600 rounded"
                        >
                          <option value="">-</option>
                          <option value="PASS">PASS</option>
                          <option value="FAIL">FAIL</option>
                          <option value="N/A">N/A</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-1">
                          {getResultIcon(circuit.overallResult)}
                          {getResultBadge(circuit.overallResult)}
                        </div>
                      </td>
                      <td className="p-2">
                        <Button
                          onClick={() => removeCircuit(circuit.id)}
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0 border-red-500/20 hover:border-red-500/40"
                        >
                          <Trash2 className="h-3 w-3 text-red-400" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Compliance Notes */}
      <Alert className="bg-blue-500/10 border-blue-500/30">
        <AlertTriangle className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          <strong>BS 7671 Compliance Notes:</strong> Results are automatically evaluated against current regulations. 
          IR values should be {'>='} 1MΩ, R1+R2 values should comply with Zs requirements, and PFC should be adequate for protective device operation.
        </AlertDescription>
      </Alert>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Schedule of Test Results</h1>
        <p className="text-muted-foreground">
          Comprehensive electrical testing interface with BS 7671 compliance checking
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="setup">Setup & Circuits</TabsTrigger>
          <TabsTrigger value="testing">Testing Grid</TabsTrigger>
        </TabsList>

        <TabsContent value="setup">
          <SetupTab />
        </TabsContent>

        <TabsContent value="testing">
          <TestingGridTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedTestingGrid;
