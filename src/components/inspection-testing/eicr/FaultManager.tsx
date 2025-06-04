
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';
import { EICRFault, FaultCode, CircuitType } from '@/types/eicr';

const FaultManager = () => {
  const { eicrSession, addFault, updateFault, removeFault } = useEICR();
  const [isAddingFault, setIsAddingFault] = useState(false);
  const [editingFault, setEditingFault] = useState<string | null>(null);
  const [newFault, setNewFault] = useState<Partial<EICRFault>>({
    circuitRef: '',
    circuitType: 'lighting',
    faultCode: 'C3',
    description: '',
    location: '',
    remedy: ''
  });

  const faults = eicrSession?.eicr_report.faults || [];
  const circuits = eicrSession?.eicr_report.circuits || [];

  const handleAddFault = () => {
    if (!newFault.circuitRef || !newFault.description || !newFault.location || !newFault.remedy) return;

    addFault({
      circuitRef: newFault.circuitRef,
      circuitType: newFault.circuitType as CircuitType,
      faultCode: newFault.faultCode as FaultCode,
      description: newFault.description,
      location: newFault.location,
      remedy: newFault.remedy
    });

    setNewFault({
      circuitRef: '',
      circuitType: 'lighting',
      faultCode: 'C3',
      description: '',
      location: '',
      remedy: ''
    });
    setIsAddingFault(false);
  };

  const getFaultCodeColor = (code: FaultCode) => {
    switch (code) {
      case 'C1': return 'bg-red-600 text-white';
      case 'C2': return 'bg-orange-600 text-white';
      case 'C3': return 'bg-yellow-600 text-white';
      case 'FI': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getFaultCodeDescription = (code: FaultCode) => {
    switch (code) {
      case 'C1': return 'Danger present - immediate remedial action required';
      case 'C2': return 'Potentially dangerous - urgent remedial action required';
      case 'C3': return 'Improvement recommended';
      case 'FI': return 'Further investigation required';
      default: return '';
    }
  };

  const getCommonFaults = (faultCode: FaultCode) => {
    const faultLibrary = {
      C1: [
        'Live parts accessible to touch',
        'Insulation resistance below 0.5MΩ',
        'Earth fault loop impedance above maximum permissible value',
        'Protective conductor disconnected'
      ],
      C2: [
        'RCD not operating within required time limits',
        'Earth fault loop impedance approaching maximum values',
        'Inadequate earthing arrangements',
        'Polarity incorrect'
      ],
      C3: [
        'Minor damage to accessories',
        'Labels missing or illegible',
        'Slightly high resistance readings',
        'Minor installation defects'
      ],
      FI: [
        'Unable to verify test results',
        'Access limitations preventing full inspection',
        'Unusual installation methods requiring investigation',
        'Equipment requiring specialist assessment'
      ]
    };
    return faultLibrary[faultCode] || [];
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              Fault Manager
            </CardTitle>
            <Button 
              onClick={() => setIsAddingFault(true)} 
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Fault
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-600 text-white">C1</Badge>
              <span>{faults.filter(f => f.faultCode === 'C1').length} Dangerous</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-600 text-white">C2</Badge>
              <span>{faults.filter(f => f.faultCode === 'C2').length} Potentially Dangerous</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-600 text-white">C3</Badge>
              <span>{faults.filter(f => f.faultCode === 'C3').length} Improvement Recommended</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-600 text-white">FI</Badge>
              <span>{faults.filter(f => f.faultCode === 'FI').length} Further Investigation</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {isAddingFault && (
        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-lg">Add New Fault</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="circuitRef">Circuit Reference</Label>
                <Select 
                  value={newFault.circuitRef} 
                  onValueChange={(value) => setNewFault(prev => ({ ...prev, circuitRef: value }))}
                >
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue placeholder="Select circuit" />
                  </SelectTrigger>
                  <SelectContent>
                    {circuits.map(circuit => (
                      <SelectItem key={circuit.ref} value={circuit.ref}>
                        {circuit.ref} - {circuit.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="faultCode">Fault Code</Label>
                <Select 
                  value={newFault.faultCode} 
                  onValueChange={(value: FaultCode) => setNewFault(prev => ({ ...prev, faultCode: value }))}
                >
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="C1">C1 - Danger present</SelectItem>
                    <SelectItem value="C2">C2 - Potentially dangerous</SelectItem>
                    <SelectItem value="C3">C3 - Improvement recommended</SelectItem>
                    <SelectItem value="FI">FI - Further investigation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Fault Code Description</Label>
              <p className="text-sm text-muted-foreground bg-elec-dark p-2 rounded border border-elec-yellow/20">
                {getFaultCodeDescription(newFault.faultCode as FaultCode)}
              </p>
            </div>

            {newFault.faultCode && (
              <div>
                <Label>Common Faults for {newFault.faultCode}</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {getCommonFaults(newFault.faultCode as FaultCode).map((fault, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start text-left h-auto p-2"
                      onClick={() => setNewFault(prev => ({ ...prev, description: fault }))}
                    >
                      {fault}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="description">Fault Description</Label>
              <Textarea
                id="description"
                value={newFault.description}
                onChange={(e) => setNewFault(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the fault found..."
                className="bg-elec-dark border-elec-yellow/20"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newFault.location}
                onChange={(e) => setNewFault(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Specific location where fault was found"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="remedy">Recommended Remedy</Label>
              <Textarea
                id="remedy"
                value={newFault.remedy}
                onChange={(e) => setNewFault(prev => ({ ...prev, remedy: e.target.value }))}
                placeholder="Recommended action to rectify the fault..."
                className="bg-elec-dark border-elec-yellow/20"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleAddFault} className="bg-green-600 hover:bg-green-700">
                Add Fault
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

      {faults.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle>Fault Register</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Circuit</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Remedy</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faults.map((fault) => (
                  <TableRow key={fault.id}>
                    <TableCell>
                      <Badge className={getFaultCodeColor(fault.faultCode)}>
                        {fault.faultCode}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{fault.circuitRef}</TableCell>
                    <TableCell className="max-w-xs truncate" title={fault.description}>
                      {fault.description}
                    </TableCell>
                    <TableCell>{fault.location}</TableCell>
                    <TableCell className="max-w-xs truncate" title={fault.remedy}>
                      {fault.remedy}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingFault(fault.id)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => removeFault(fault.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {faults.length === 0 && !isAddingFault && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Faults Recorded</h3>
            <p className="text-muted-foreground mb-4">
              This installation currently has no recorded faults. 
              Add faults as they are discovered during testing.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FaultManager;
