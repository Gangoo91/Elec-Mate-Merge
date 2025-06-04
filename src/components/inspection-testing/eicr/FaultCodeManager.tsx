
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Plus, Trash2, Edit } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';
import { EICRFault, FaultCode, CircuitType } from '@/types/eicr';

const FaultCodeManager = () => {
  const { eicrSession, addFault, updateFault, removeFault } = useEICR();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFault, setEditingFault] = useState<string | null>(null);
  const [newFault, setNewFault] = useState<Partial<EICRFault>>({
    circuitRef: '',
    circuitType: 'other',
    faultCode: 'C3',
    description: '',
    location: '',
    remedy: '',
  });

  if (!eicrSession) return null;

  const { eicr_report } = eicrSession;

  const getFaultBadgeColor = (code: FaultCode) => {
    switch (code) {
      case 'C1': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'C2': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'C3': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'FI': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getFaultDescription = (code: FaultCode) => {
    switch (code) {
      case 'C1': return 'Danger present. Risk of injury. Immediate remedial action required.';
      case 'C2': return 'Potentially dangerous. Urgent remedial action required.';
      case 'C3': return 'Improvement recommended.';
      case 'FI': return 'Further investigation required without delay.';
      default: return '';
    }
  };

  const handleAddFault = () => {
    if (newFault.circuitRef && newFault.description && newFault.faultCode && newFault.circuitType) {
      addFault({
        circuitRef: newFault.circuitRef,
        circuitType: newFault.circuitType,
        faultCode: newFault.faultCode,
        description: newFault.description,
        location: newFault.location || '',
        remedy: newFault.remedy || '',
      });
      
      setNewFault({
        circuitRef: '',
        circuitType: 'other',
        faultCode: 'C3',
        description: '',
        location: '',
        remedy: '',
      });
      setShowAddForm(false);
    }
  };

  const handleEditFault = (fault: EICRFault) => {
    setEditingFault(fault.id);
    setNewFault(fault);
    setShowAddForm(true);
  };

  const handleUpdateFault = () => {
    if (editingFault && newFault.circuitRef && newFault.description && newFault.faultCode && newFault.circuitType) {
      updateFault(editingFault, {
        circuitRef: newFault.circuitRef,
        circuitType: newFault.circuitType,
        faultCode: newFault.faultCode,
        description: newFault.description,
        location: newFault.location || '',
        remedy: newFault.remedy || '',
      });
      
      setEditingFault(null);
      setNewFault({
        circuitRef: '',
        circuitType: 'other',
        faultCode: 'C3',
        description: '',
        location: '',
        remedy: '',
      });
      setShowAddForm(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingFault(null);
    setShowAddForm(false);
    setNewFault({
      circuitRef: '',
      circuitType: 'other',
      faultCode: 'C3',
      description: '',
      location: '',
      remedy: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Add/Edit Fault Form */}
      {showAddForm && (
        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              {editingFault ? 'Edit Fault Code' : 'Add New Fault Code'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Circuit Reference</label>
                <Input
                  value={newFault.circuitRef || ''}
                  onChange={(e) => setNewFault(prev => ({ ...prev, circuitRef: e.target.value }))}
                  placeholder="e.g., L1, C1, S1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Circuit Type</label>
                <Select
                  value={newFault.circuitType}
                  onValueChange={(value: CircuitType) => setNewFault(prev => ({ ...prev, circuitType: value }))}
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Fault Code</label>
                <Select
                  value={newFault.faultCode}
                  onValueChange={(value: FaultCode) => setNewFault(prev => ({ ...prev, faultCode: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="C1">C1 - Dangerous</SelectItem>
                    <SelectItem value="C2">C2 - Potentially Dangerous</SelectItem>
                    <SelectItem value="C3">C3 - Improvement Recommended</SelectItem>
                    <SelectItem value="FI">FI - Further Investigation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={newFault.location || ''}
                  onChange={(e) => setNewFault(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Kitchen, Garage, Distribution Board"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={newFault.description || ''}
                onChange={(e) => setNewFault(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the fault or observation"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Remedy/Recommendation</label>
              <Textarea
                value={newFault.remedy || ''}
                onChange={(e) => setNewFault(prev => ({ ...prev, remedy: e.target.value }))}
                placeholder="Recommended action to remedy the fault"
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={editingFault ? handleUpdateFault : handleAddFault}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                {editingFault ? 'Update Fault' : 'Add Fault'}
              </Button>
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fault Codes List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recorded Fault Codes ({eicr_report.faults.length})</h3>
          {!showAddForm && (
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Fault
            </Button>
          )}
        </div>

        {eicr_report.faults.length === 0 ? (
          <Card className="border-green-500/30 bg-green-500/5">
            <CardContent className="pt-6 text-center">
              <p className="text-green-200">No faults recorded. Installation appears satisfactory.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {eicr_report.faults.map((fault) => (
              <Card key={fault.id} className="border-elec-yellow/20 bg-elec-gray">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge className={getFaultBadgeColor(fault.faultCode)}>
                          {fault.faultCode}
                        </Badge>
                        <span className="font-medium">{fault.circuitRef}</span>
                        <span className="text-sm text-muted-foreground capitalize">
                          {fault.circuitType.replace('-', ' ')}
                        </span>
                        {fault.location && (
                          <span className="text-sm text-muted-foreground">• {fault.location}</span>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {getFaultDescription(fault.faultCode)}
                      </p>
                      
                      <div className="space-y-1">
                        <p className="text-sm">{fault.description}</p>
                        {fault.remedy && (
                          <p className="text-sm text-blue-200">
                            <strong>Remedy:</strong> {fault.remedy}
                          </p>
                        )}
                      </div>
                      
                      {fault.stepId && (
                        <p className="text-xs text-muted-foreground">
                          Auto-generated from test step: {fault.stepId}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditFault(fault)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFault(fault.id)}
                      >
                        <Trash2 className="h-4 w-4" />
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

export default FaultCodeManager;
