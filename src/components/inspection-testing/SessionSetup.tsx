
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, User, MapPin, Zap } from 'lucide-react';
import { TestFlow } from '@/types/inspection-testing';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SessionSetupProps {
  testFlow: TestFlow;
  onStart: (installationDetails: any, technician: any) => void;
  mode: 'electrician' | 'apprentice';
}

const SessionSetup = ({ testFlow, onStart, mode }: SessionSetupProps) => {
  const [installationDetails, setInstallationDetails] = useState({
    location: '',
    circuitDescription: '',
    voltage: 230,
    current: 16
  });

  const [technician, setTechnician] = useState({
    name: '',
    certification: ''
  });

  const [notes, setNotes] = useState('');

  const handleStart = () => {
    if (!installationDetails.location || !installationDetails.circuitDescription || !technician.name) {
      return;
    }

    onStart(installationDetails, { ...technician, notes });
  };

  const isFormValid = installationDetails.location && 
                     installationDetails.circuitDescription && 
                     technician.name;

  return (
    <div className="space-y-6">
      {/* Prerequisites Check */}
      {testFlow.prerequisites && testFlow.prerequisites.length > 0 && (
        <Card className="bg-amber-500/10 border-amber-500/30">
          <CardHeader>
            <CardTitle className="text-amber-300 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Prerequisites Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {testFlow.prerequisites.map((prerequisite, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">{prerequisite}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Installation Details */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-elec-yellow" />
              Installation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="location">Location/Address</Label>
              <Input
                id="location"
                value={installationDetails.location}
                onChange={(e) => setInstallationDetails(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Ground Floor Office, 123 Main St"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="circuit">Circuit Description</Label>
              <Textarea
                id="circuit"
                value={installationDetails.circuitDescription}
                onChange={(e) => setInstallationDetails(prev => ({ ...prev, circuitDescription: e.target.value }))}
                placeholder="e.g., Ring final circuit serving office sockets"
                className="bg-elec-dark border-elec-yellow/20"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="voltage">Voltage (V)</Label>
                <Select 
                  value={installationDetails.voltage.toString()} 
                  onValueChange={(value) => setInstallationDetails(prev => ({ ...prev, voltage: parseInt(value) }))}
                >
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="110">110V (Site)</SelectItem>
                    <SelectItem value="230">230V (Single Phase)</SelectItem>
                    <SelectItem value="400">400V (Three Phase)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="current">Current Rating (A)</Label>
                <Select 
                  value={installationDetails.current.toString()} 
                  onValueChange={(value) => setInstallationDetails(prev => ({ ...prev, current: parseInt(value) }))}
                >
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6A</SelectItem>
                    <SelectItem value="10">10A</SelectItem>
                    <SelectItem value="16">16A</SelectItem>
                    <SelectItem value="20">20A</SelectItem>
                    <SelectItem value="25">25A</SelectItem>
                    <SelectItem value="32">32A</SelectItem>
                    <SelectItem value="40">40A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technician Details */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-elec-yellow" />
              Technician Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tech-name">Name</Label>
              <Input
                id="tech-name"
                value={technician.name}
                onChange={(e) => setTechnician(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your name"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            {mode === 'electrician' && (
              <div>
                <Label htmlFor="certification">Certification/License</Label>
                <Input
                  id="certification"
                  value={technician.certification}
                  onChange={(e) => setTechnician(prev => ({ ...prev, certification: e.target.value }))}
                  placeholder="e.g., 18th Edition, AM2"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            )}

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional information or special requirements"
                className="bg-elec-dark border-elec-yellow/20"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regulatory Standards */}
      {testFlow.regulatoryStandards && testFlow.regulatoryStandards.length > 0 && (
        <Alert className="bg-blue-500/10 border-blue-500/30">
          <Zap className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            <strong>Applicable Standards:</strong> {testFlow.regulatoryStandards.join(', ')}
          </AlertDescription>
        </Alert>
      )}

      {/* Start Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleStart}
          disabled={!isFormValid}
          className="bg-elec-yellow text-black hover:bg-elec-yellow/90 px-8 py-3 text-lg"
        >
          Start {testFlow.name}
        </Button>
      </div>
    </div>
  );
};

export default SessionSetup;
