
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, User, Building, Play } from 'lucide-react';
import { useState } from 'react';
import { TestFlow } from '@/types/inspection-testing';
import { useEICR } from '@/contexts/EICRContext';

interface SessionSetupProps {
  flow: TestFlow;
  onStartSession: (installationDetails: any, technician: any) => void;
  mode: 'electrician' | 'apprentice';
}

const SessionSetup = ({ flow, onStartSession, mode }: SessionSetupProps) => {
  const { initializeEICR } = useEICR();
  const [installationDetails, setInstallationDetails] = useState({
    address: '',
    description: '',
    estimatedAge: '',
    earthingSystem: '',
    supplyType: '',
    mainSwitchRating: '',
    accessLimitations: '',
    specialRequirements: ''
  });

  const [technicianDetails, setTechnicianDetails] = useState({
    name: '',
    qualification: '',
    registrationNumber: '',
    organisation: ''
  });

  const handleStartSession = () => {
    // Initialize EICR context with session details
    initializeEICR(installationDetails, technicianDetails);
    
    // Start the test session
    onStartSession(installationDetails, technicianDetails);
  };

  const isFormValid = () => {
    return installationDetails.address && 
           installationDetails.description && 
           technicianDetails.name && 
           technicianDetails.qualification;
  };

  return (
    <div className="space-y-6">
      {/* Flow Summary */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle>Testing Session Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{flow.steps.length} test steps</Badge>
            <Badge variant="outline">
              ~{flow.steps.reduce((total, step) => total + step.estimatedTime, 0)} minutes
            </Badge>
            <Badge variant="outline">{flow.difficulty}</Badge>
            {flow.isComprehensive && (
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                Complete EICR Suite
              </Badge>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p><strong>Standards:</strong> {flow.regulatoryStandards?.join(', ')}</p>
          </div>

          {mode === 'apprentice' && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-blue-400" />
                <span className="font-medium text-blue-200">Learning Mode</span>
              </div>
              <p className="text-sm text-blue-300 mt-1">
                This session includes detailed explanations and learning objectives for each test step.
              </p>
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
            <div>
              <Label htmlFor="address">Installation Address *</Label>
              <Textarea
                id="address"
                value={installationDetails.address}
                onChange={(e) => setInstallationDetails({...installationDetails, address: e.target.value})}
                placeholder="Full installation address including postcode..."
                className="bg-elec-dark border-elec-yellow/20"
                rows={3}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Installation Description *</Label>
              <Textarea
                id="description"
                value={installationDetails.description}
                onChange={(e) => setInstallationDetails({...installationDetails, description: e.target.value})}
                placeholder="Type and use of installation (e.g., domestic dwelling, office building)..."
                className="bg-elec-dark border-elec-yellow/20"
                rows={3}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="estimated-age">Estimated Age</Label>
              <Input
                id="estimated-age"
                value={installationDetails.estimatedAge}
                onChange={(e) => setInstallationDetails({...installationDetails, estimatedAge: e.target.value})}
                placeholder="e.g., 15-20 years"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div>
              <Label htmlFor="earthing-system">Earthing System</Label>
              <Select 
                value={installationDetails.earthingSystem} 
                onValueChange={(value) => setInstallationDetails({...installationDetails, earthingSystem: value})}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select earthing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TN-S">TN-S (Separate earth)</SelectItem>
                  <SelectItem value="TN-C-S">TN-C-S (PME)</SelectItem>
                  <SelectItem value="TT">TT (Earth electrode)</SelectItem>
                  <SelectItem value="IT">IT (Isolated)</SelectItem>
                  <SelectItem value="unknown">Unknown/TBC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="supply-type">Supply Type</Label>
              <Select 
                value={installationDetails.supplyType} 
                onValueChange={(value) => setInstallationDetails({...installationDetails, supplyType: value})}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select supply type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single-phase">Single-phase (230V)</SelectItem>
                  <SelectItem value="three-phase">Three-phase (400V)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="main-switch">Main Switch Rating</Label>
              <Input
                id="main-switch"
                value={installationDetails.mainSwitchRating}
                onChange={(e) => setInstallationDetails({...installationDetails, mainSwitchRating: e.target.value})}
                placeholder="e.g., 100A"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div>
              <Label htmlFor="limitations">Access Limitations</Label>
              <Input
                id="limitations"
                value={installationDetails.accessLimitations}
                onChange={(e) => setInstallationDetails({...installationDetails, accessLimitations: e.target.value})}
                placeholder="Areas not accessible for inspection..."
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="special-requirements">Special Requirements</Label>
            <Textarea
              id="special-requirements"
              value={installationDetails.specialRequirements}
              onChange={(e) => setInstallationDetails({...installationDetails, specialRequirements: e.target.value})}
              placeholder="Any special considerations, existing faults, or specific requirements..."
              className="bg-elec-dark border-elec-yellow/20"
              rows={2}
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
            <div>
              <Label htmlFor="technician-name">Name *</Label>
              <Input
                id="technician-name"
                value={technicianDetails.name}
                onChange={(e) => setTechnicianDetails({...technicianDetails, name: e.target.value})}
                placeholder="Full name"
                className="bg-elec-dark border-elec-yellow/20"
                required
              />
            </div>
            <div>
              <Label htmlFor="qualification">Qualification *</Label>
              <Select 
                value={technicianDetails.qualification} 
                onValueChange={(value) => setTechnicianDetails({...technicianDetails, qualification: value})}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="City & Guilds 2391-52">City & Guilds 2391-52</SelectItem>
                  <SelectItem value="City & Guilds 2394/2395">City & Guilds 2394/2395</SelectItem>
                  <SelectItem value="EAL 600/4338/4">EAL 600/4338/4</SelectItem>
                  <SelectItem value="NICEIC Qualified">NICEIC Qualified</SelectItem>
                  <SelectItem value="NAPIT Qualified">NAPIT Qualified</SelectItem>
                  <SelectItem value="STROMA Qualified">STROMA Qualified</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="registration">Registration Number</Label>
              <Input
                id="registration"
                value={technicianDetails.registrationNumber}
                onChange={(e) => setTechnicianDetails({...technicianDetails, registrationNumber: e.target.value})}
                placeholder="NICEIC/NAPIT/STROMA etc. number"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div>
              <Label htmlFor="organisation">Organisation</Label>
              <Input
                id="organisation"
                value={technicianDetails.organisation}
                onChange={(e) => setTechnicianDetails({...technicianDetails, organisation: e.target.value})}
                placeholder="Company or organisation name"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prerequisites Check */}
      {flow.prerequisites && flow.prerequisites.length > 0 && (
        <Card className="border-orange-500/30 bg-orange-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              Prerequisites Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Please ensure the following requirements are met before starting:
            </p>
            <ul className="space-y-2">
              {flow.prerequisites.map((prerequisite, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                  <span>{prerequisite}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Start Session */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div>
              <p className="font-medium">Ready to begin testing session?</p>
              <p className="text-sm text-muted-foreground">
                {isFormValid() 
                  ? 'All required information provided. EICR report will be automatically generated.'
                  : 'Please complete all required fields marked with *'
                }
              </p>
            </div>
            <Button
              onClick={handleStartSession}
              disabled={!isFormValid()}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Start Testing Session
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionSetup;
