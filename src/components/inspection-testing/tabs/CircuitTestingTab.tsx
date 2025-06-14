
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Settings, 
  Plus, 
  Trash2, 
  Play, 
  CheckCircle,
  AlertCircle,
  Calculator,
  Zap,
  Edit
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Circuit {
  id: string;
  ref: string;
  description: string;
  type: string;
  mcb: string;
  csa: string;
  length: string;
  status: 'pending' | 'testing' | 'completed' | 'failed';
}

const CircuitTestingTab = () => {
  const [circuits, setCircuits] = useState<Circuit[]>([
    {
      id: '1',
      ref: 'C1',
      description: 'Downstairs lighting',
      type: 'Lighting',
      mcb: '6A',
      csa: '1.5mm²',
      length: '45m',
      status: 'pending'
    },
    {
      id: '2',
      ref: 'C2',
      description: 'Upstairs lighting',
      type: 'Lighting',
      mcb: '6A',
      csa: '1.5mm²',
      length: '38m',
      status: 'pending'
    },
    {
      id: '3',
      ref: 'C3',
      description: 'Downstairs ring',
      type: 'Power',
      mcb: '32A',
      csa: '2.5mm²',
      length: '67m',
      status: 'pending'
    }
  ]);

  const [newCircuit, setNewCircuit] = useState({
    ref: '',
    description: '',
    type: 'Lighting',
    mcb: '',
    csa: '',
    length: ''
  });

  const [activeTest, setActiveTest] = useState<string | null>(null);

  const testProcedures = [
    {
      id: 'continuity',
      name: 'Continuity of Protective Conductors',
      description: 'Test continuity of CPC using low-resistance ohmmeter',
      limit: '< 1.67Ω',
      method: 'R1 + R2 method'
    },
    {
      id: 'insulation',
      name: 'Insulation Resistance',
      description: 'Test insulation between live conductors and earth',
      limit: '> 1MΩ',
      method: '500V DC test'
    },
    {
      id: 'earth-loop',
      name: 'Earth Fault Loop Impedance',
      description: 'Measure Zs at furthest point of circuit',
      limit: 'See BS 7671 tables',
      method: 'Loop impedance tester'
    },
    {
      id: 'rcd',
      name: 'RCD Operation',
      description: 'Test RCD trip time and sensitivity',
      limit: '< 300ms @ 1×IΔn',
      method: 'RCD tester'
    },
    {
      id: 'polarity',
      name: 'Polarity',
      description: 'Verify correct polarity of all connections',
      limit: 'Correct polarity',
      method: 'Visual and continuity checks'
    }
  ];

  const addCircuit = () => {
    if (newCircuit.ref && newCircuit.description) {
      const circuit: Circuit = {
        id: Date.now().toString(),
        ...newCircuit,
        status: 'pending'
      };
      setCircuits([...circuits, circuit]);
      setNewCircuit({
        ref: '',
        description: '',
        type: 'Lighting',
        mcb: '',
        csa: '',
        length: ''
      });
    }
  };

  const removeCircuit = (id: string) => {
    setCircuits(circuits.filter(c => c.id !== id));
  };

  const startTesting = (circuitId: string) => {
    setActiveTest(circuitId);
    setCircuits(circuits.map(c => 
      c.id === circuitId ? { ...c, status: 'testing' } : c
    ));
  };

  const getStatusColor = (status: Circuit['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-500/20 text-gray-300';
      case 'testing': return 'bg-yellow-500/20 text-yellow-300';
      case 'completed': return 'bg-green-500/20 text-green-300';
      case 'failed': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusIcon = (status: Circuit['status']) => {
    switch (status) {
      case 'testing': return <Settings className="h-4 w-4 animate-spin" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Testing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-gray to-elec-gray/80">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5 text-elec-yellow" />
              Circuit Testing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Circuits:</span>
                <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                  {circuits.length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completed:</span>
                <span className="text-sm font-medium">
                  {circuits.filter(c => c.status === 'completed').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tests per Circuit:</span>
                <Badge className="bg-blue-600 text-white">5</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-blue-300">
              <Calculator className="h-5 w-5" />
              Test Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Pending:</span>
                <span className="font-medium">{circuits.filter(c => c.status === 'pending').length}</span>
              </div>
              <div className="flex justify-between">
                <span>In Progress:</span>
                <span className="font-medium text-yellow-400">{circuits.filter(c => c.status === 'testing').length}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed:</span>
                <span className="font-medium text-green-400">{circuits.filter(c => c.status === 'completed').length}</span>
              </div>
              <div className="flex justify-between">
                <span>Failed:</span>
                <span className="font-medium text-red-400">{circuits.filter(c => c.status === 'failed').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-green-300">
              <Zap className="h-5 w-5" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-elec-yellow h-2 rounded-full transition-all"
                  style={{ 
                    width: `${circuits.length > 0 ? (circuits.filter(c => c.status === 'completed').length / circuits.length) * 100 : 0}%` 
                  }}
                ></div>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-elec-yellow">
                  {circuits.length > 0 ? Math.round((circuits.filter(c => c.status === 'completed').length / circuits.length) * 100) : 0}%
                </span>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Circuit */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Circuit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <Label htmlFor="ref" className="text-sm">Circuit Ref</Label>
              <Input
                id="ref"
                placeholder="C4"
                value={newCircuit.ref}
                onChange={(e) => setNewCircuit({...newCircuit, ref: e.target.value})}
                className="bg-elec-gray/50 border-elec-yellow/20"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="description" className="text-sm">Description</Label>
              <Input
                id="description"
                placeholder="Kitchen ring main"
                value={newCircuit.description}
                onChange={(e) => setNewCircuit({...newCircuit, description: e.target.value})}
                className="bg-elec-gray/50 border-elec-yellow/20"
              />
            </div>
            <div>
              <Label htmlFor="mcb" className="text-sm">MCB Rating</Label>
              <Input
                id="mcb"
                placeholder="32A"
                value={newCircuit.mcb}
                onChange={(e) => setNewCircuit({...newCircuit, mcb: e.target.value})}
                className="bg-elec-gray/50 border-elec-yellow/20"
              />
            </div>
            <div>
              <Label htmlFor="csa" className="text-sm">Cable CSA</Label>
              <Input
                id="csa"
                placeholder="2.5mm²"
                value={newCircuit.csa}
                onChange={(e) => setNewCircuit({...newCircuit, csa: e.target.value})}
                className="bg-elec-gray/50 border-elec-yellow/20"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addCircuit} className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Circuit List */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Circuits for Testing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {circuits.map((circuit) => (
              <div 
                key={circuit.id} 
                className={`p-4 rounded-lg border transition-all ${
                  activeTest === circuit.id 
                    ? 'border-elec-yellow/50 bg-elec-yellow/5' 
                    : 'border-elec-yellow/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-bold text-elec-yellow">{circuit.ref}</div>
                    <div>
                      <h4 className="font-medium">{circuit.description}</h4>
                      <p className="text-sm text-muted-foreground">
                        {circuit.type} • {circuit.mcb} • {circuit.csa}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(circuit.status)}>
                      {getStatusIcon(circuit.status)}
                      <span className="ml-1 capitalize">{circuit.status}</span>
                    </Badge>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        onClick={() => startTesting(circuit.id)}
                        disabled={circuit.status === 'testing' || circuit.status === 'completed'}
                        className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                      >
                        {circuit.status === 'testing' ? (
                          <>
                            <Settings className="h-4 w-4 mr-1 animate-spin" />
                            Testing
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-1" />
                            Test
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeCircuit(circuit.id)}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {circuits.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No circuits added yet. Add circuits above to begin testing.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Test Procedures Reference */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Standard Test Procedures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {testProcedures.map((test) => (
              <div key={test.id} className="p-4 border border-elec-yellow/20 rounded-lg">
                <h4 className="font-medium mb-2 text-white">{test.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Limit:</span>
                  <span className="font-medium text-elec-yellow">{test.limit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Method:</span>
                  <span className="font-medium">{test.method}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Alert className="bg-orange-500/10 border-orange-500/30">
        <AlertCircle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          <strong>Testing Requirements:</strong> All test equipment must be calibrated and within certification dates. 
          Follow safe isolation procedures before testing. Record all results accurately for certification.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default CircuitTestingTab;
