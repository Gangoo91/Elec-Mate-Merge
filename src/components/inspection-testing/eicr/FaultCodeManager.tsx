import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useEICR } from '@/contexts/EICRContext';
import { FaultCode, CircuitType } from '@/types/eicr';

const FaultCodeManager = () => {
  const { eicrSession, addFault, updateFault, removeFault } = useEICR();
  const [isAddingFault, setIsAddingFault] = useState(false);
  const [editingFault, setEditingFault] = useState<string | null>(null);
  const [newFault, setNewFault] = useState({
    circuitRef: '',
    circuitType: 'other' as CircuitType,
    faultCode: 'C3' as FaultCode,
    description: '',
    location: '',
    remedy: ''
  });

  if (!eicrSession) return null;

  const { faults } = eicrSession.eicr_report;

  const handleAddFault = () => {
    if (newFault.description && newFault.location) {
      addFault(newFault);
      setNewFault({
        circuitRef: '',
        circuitType: 'other' as CircuitType,
        faultCode: 'C3' as FaultCode,
        description: '',
        location: '',
        remedy: ''
      });
      setIsAddingFault(false);
    }
  };

  const getFaultCodeColor = (code: FaultCode) => {
    switch (code) {
      case 'C1': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'C2': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'C3': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'FI': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const getFaultCodeDescription = (code: FaultCode) => {
    switch (code) {
      case 'C1': return 'Danger present - immediate action required';
      case 'C2': return 'Potentially dangerous - urgent remedial action required';
      case 'C3': return 'Improvement recommended';
      case 'FI': return 'Further investigation required';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Fault Code Management</h3>
          <p className="text-sm text-muted-foreground">
            Record and manage faults found during inspection in accordance with BS 7671
          </p>
        </div>
        <Button 
          onClick={() => setIsAddingFault(true)} 
          className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Fault
        </Button>
      </div>

      {/* Add Fault Form */}
      {isAddingFault && (
        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              Record New Fault
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="circuit-ref">Circuit Reference</Label>
                <Input
                  id="circuit-ref"
                  value={newFault.circuitRef}
                  onChange={(e) => setNewFault({...newFault, circuitRef: e.target.value})}
                  placeholder="e.g., L1, L2, C1"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
              <div>
                <Label htmlFor="circuit-type">Circuit Type</Label>
                <Select value={newFault.circuitType} onValueChange={(value: CircuitType) => setNewFault({...newFault, circuitType: value})}>
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
            </div>

            <div>
              <Label htmlFor="fault-code">Fault Classification</Label>
              <Select value={newFault.faultCode} onValueChange={(value: FaultCode) => setNewFault({...newFault, faultCode: value})}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C1">C1 - Danger Present</SelectItem>
                  <SelectItem value="C2">C2 - Potentially Dangerous</SelectItem>
                  <SelectItem value="C3">C3 - Improvement Recommended</SelectItem>
                  <SelectItem value="FI">FI - Further Investigation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Fault Description</Label>
              <Textarea
                id="description"
                value={newFault.description}
                onChange={(e) => setNewFault({...newFault, description: e.target.value})}
                placeholder="Describe the fault found..."
                className="bg-elec-dark border-elec-yellow/20"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newFault.location}
                onChange={(e) => setNewFault({...newFault, location: e.target.value})}
                placeholder="Specific location of fault"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="remedy">Remedial Action Required</Label>
              <Textarea
                id="remedy"
                value={newFault.remedy}
                onChange={(e) => setNewFault({...newFault, remedy: e.target.value})}
                placeholder="Recommended remedial action..."
                className="bg-elec-dark border-elec-yellow/20"
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddFault} className="bg-green-600 hover:bg-green-700">
                Record Fault
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsAddingFault(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Faults */}
      <div className="space-y-4">
        {faults.length === 0 ? (
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="pt-6 text-center">
              <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No faults recorded yet</p>
              <p className="text-sm text-muted-foreground">
                Faults will be automatically added during testing or can be added manually
              </p>
            </CardContent>
          </Card>
        ) : (
          faults.map((fault) => (
            <Card key={fault.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getFaultCodeColor(fault.faultCode)}>
                        {fault.faultCode}
                      </Badge>
                      <span className="font-mono text-sm">{fault.circuitRef}</span>
                      <Badge variant="outline" className="text-xs">
                        {fault.circuitType}
                      </Badge>
                    </div>
                    
                    <h4 className="font-medium">{fault.description}</h4>
                    
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {fault.location}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      <strong>Remedy:</strong> {fault.remedy}
                    </p>
                    
                    <p className="text-xs text-muted-foreground">
                      {getFaultCodeDescription(fault.faultCode)}
                    </p>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFault(fault.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FaultCodeManager;
