
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EICRFault, FaultCode, CircuitType } from '@/types/eicr';
import { useEICR } from '@/contexts/EICRContext';
import { v4 as uuidv4 } from 'uuid';

const FaultCodeManager: React.FC = () => {
  const { addFault } = useEICR();
  const [circuitRef, setCircuitRef] = useState('');
  const [circuitType, setCircuitType] = useState<CircuitType>('lighting');
  const [faultCode, setFaultCode] = useState<FaultCode>('C2');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [remedy, setRemedy] = useState('');

  const handleAddFault = () => {
    const newFault: EICRFault = {
      id: uuidv4(),
      circuitRef,
      circuitType,
      faultCode,
      description,
      location,
      remedy,
      timestamp: new Date()
    };

    addFault(newFault);
    
    // Reset form
    setCircuitRef('');
    setDescription('');
    setLocation('');
    setRemedy('');
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle>Add EICR Fault</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Circuit Reference</label>
            <Input
              value={circuitRef}
              onChange={(e) => setCircuitRef(e.target.value)}
              placeholder="e.g., C1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Circuit Type</label>
            <Select value={circuitType} onValueChange={(value: CircuitType) => setCircuitType(value)}>
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

        <div>
          <label className="text-sm font-medium">Fault Code</label>
          <Select value={faultCode} onValueChange={(value: FaultCode) => setFaultCode(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="C1">C1 - Danger present</SelectItem>
              <SelectItem value="C2">C2 - Potentially dangerous</SelectItem>
              <SelectItem value="C3">C3 - Improvement recommended</SelectItem>
              <SelectItem value="FI">FI - Further investigation required</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the fault or observation"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Location</label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Kitchen, Bedroom 1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Remedy</label>
          <Textarea
            value={remedy}
            onChange={(e) => setRemedy(e.target.value)}
            placeholder="Recommended action to address the fault"
          />
        </div>

        <Button onClick={handleAddFault} className="w-full">
          Add Fault
        </Button>
      </CardContent>
    </Card>
  );
};

export default FaultCodeManager;
