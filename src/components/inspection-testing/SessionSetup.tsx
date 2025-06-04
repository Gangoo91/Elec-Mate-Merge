
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Building, FileText, Clock, CheckCircle } from 'lucide-react';
import { TestFlow } from '@/types/inspection-testing';

interface SessionSetupProps {
  flow: TestFlow;
  onStartSession: (installationDetails: any, technician: any) => void;
  mode: 'electrician' | 'apprentice';
}

const SessionSetup = ({ flow, onStartSession, mode }: SessionSetupProps) => {
  const [installationDetails, setInstallationDetails] = useState({
    buildingName: '',
    address: '',
    installationType: '',
    voltage: '230V',
    phases: 'single',
    earthingSystem: 'TN-C-S',
    notes: ''
  });

  const [technicianDetails, setTechnicianDetails] = useState({
    name: mode === 'apprentice' ? 'Apprentice User' : '',
    qualification: mode === 'apprentice' ? 'Apprentice Electrician' : '',
    company: '',
    certificateNumber: ''
  });

  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    const installationValid = installationDetails.buildingName && 
                            installationDetails.address && 
                            installationDetails.installationType;
    
    const technicianValid = technicianDetails.name && technicianDetails.qualification;
    
    setIsValid(installationValid && technicianValid);
  };

  const handleInstallationChange = (field: string, value: string) => {
    setInstallationDetails(prev => ({ ...prev, [field]: value }));
    setTimeout(validateForm, 100);
  };

  const handleTechnicianChange = (field: string, value: string) => {
    setTechnicianDetails(prev => ({ ...prev, [field]: value }));
    setTimeout(validateForm, 100);
  };

  const handleStartSession = () => {
    if (isValid) {
      onStartSession(installationDetails, technicianDetails);
    }
  };

  const getEstimatedDuration = () => {
    return flow.steps.reduce((total, step) => total + step.estimatedTime, 0);
  };

  return (
    <div className="space-y-6">
      {/* Flow Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Testing Procedure Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">~{getEstimatedDuration()} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{flow.steps.length} steps</span>
            </div>
            <Badge variant="outline" className="w-fit">
              {flow.difficulty} level
            </Badge>
          </div>
          
          {flow.prerequisites && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Prerequisites:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {flow.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Installation Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-elec-yellow" />
            Installation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="buildingName">Building/Property Name *</Label>
              <Input
                id="buildingName"
                value={installationDetails.buildingName}
                onChange={(e) => handleInstallationChange('buildingName', e.target.value)}
                placeholder="e.g., Main Office Building"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="installationType">Installation Type *</Label>
              <Select onValueChange={(value) => handleInstallationChange('installationType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select installation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic Installation</SelectItem>
                  <SelectItem value="commercial">Commercial Installation</SelectItem>
                  <SelectItem value="industrial">Industrial Installation</SelectItem>
                  <SelectItem value="temporary">Temporary Installation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Installation Address *</Label>
            <Textarea
              id="address"
              value={installationDetails.address}
              onChange={(e) => handleInstallationChange('address', e.target.value)}
              placeholder="Full address including postcode"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voltage">Nominal Voltage</Label>
              <Select onValueChange={(value) => handleInstallationChange('voltage', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="230V" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="230V">230V (Single Phase)</SelectItem>
                  <SelectItem value="400V">400V (Three Phase)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phases">Number of Phases</Label>
              <Select onValueChange={(value) => handleInstallationChange('phases', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Single" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Phase</SelectItem>
                  <SelectItem value="three">Three Phase</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="earthingSystem">Earthing System</Label>
              <Select onValueChange={(value) => handleInstallationChange('earthingSystem', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="TN-C-S" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TN-S">TN-S</SelectItem>
                  <SelectItem value="TN-C-S">TN-C-S (PME)</SelectItem>
                  <SelectItem value="TT">TT</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={installationDetails.notes}
              onChange={(e) => handleInstallationChange('notes', e.target.value)}
              placeholder="Any special considerations, previous test results, or relevant information"
              rows={3}
            />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="technicianName">Name *</Label>
              <Input
                id="technicianName"
                value={technicianDetails.name}
                onChange={(e) => handleTechnicianChange('name', e.target.value)}
                placeholder="Full name"
                disabled={mode === 'apprentice'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification *</Label>
              <Select 
                onValueChange={(value) => handleTechnicianChange('qualification', value)}
                disabled={mode === 'apprentice'}
                value={technicianDetails.qualification}
              >
                <SelectTrigger>
                  <SelectValue placeholder={mode === 'apprentice' ? 'Apprentice Electrician' : 'Select qualification'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apprentice Electrician">Apprentice Electrician</SelectItem>
                  <SelectItem value="Level 3 Electrician">Level 3 Qualified Electrician</SelectItem>
                  <SelectItem value="18th Edition">18th Edition Qualified</SelectItem>
                  <SelectItem value="Inspection & Testing">Inspection & Testing Qualified (2391)</SelectItem>
                  <SelectItem value="Approved Electrician">Approved Electrician</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company/Organization</Label>
              <Input
                id="company"
                value={technicianDetails.company}
                onChange={(e) => handleTechnicianChange('company', e.target.value)}
                placeholder="Company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certificateNumber">Certificate Number</Label>
              <Input
                id="certificateNumber"
                value={technicianDetails.certificateNumber}
                onChange={(e) => handleTechnicianChange('certificateNumber', e.target.value)}
                placeholder="Qualification certificate number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mode-specific Information */}
      {mode === 'apprentice' && (
        <Alert className="bg-blue-500/10 border-blue-500/30">
          <User className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            <strong>Learning Mode:</strong> This session is for educational purposes. All procedures include 
            detailed explanations and learning tips to help develop your testing skills.
          </AlertDescription>
        </Alert>
      )}

      {/* Start Session Button */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <Button
            onClick={handleStartSession}
            disabled={!isValid}
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 h-12 text-lg"
          >
            Start Testing Session
          </Button>
          {!isValid && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              Please complete all required fields (marked with *) to begin
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionSetup;
