
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Building2, User } from 'lucide-react';

interface EICRSetupFormProps {
  onStartSession: (installationDetails: any, technician: any) => void;
}

const EICRSetupForm: React.FC<EICRSetupFormProps> = ({ onStartSession }) => {
  const [installationDetails, setInstallationDetails] = useState({
    address: '',
    type: 'Domestic',
    description: '',
    age: '',
    earthingSystem: 'TN-S',
    supply: 'Single Phase 230V',
    mainSwitch: '100A',
    mainEarth: '16mm²',
    mainBonding: '10mm²',
    alterations: false
  });

  const [technician, setTechnician] = useState({
    name: '',
    qualification: '18th Edition BS 7671',
    company: '',
    registrationNumber: '',
    contactDetails: ''
  });

  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (!installationDetails.address.trim()) {
      newErrors.push('Installation address is required');
    }
    if (!installationDetails.description.trim()) {
      newErrors.push('Installation description is required');
    }
    if (!technician.name.trim()) {
      newErrors.push('Technician name is required');
    }
    if (!technician.qualification.trim()) {
      newErrors.push('Technician qualification is required');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleStartSession = () => {
    if (validateForm()) {
      onStartSession(installationDetails, technician);
    }
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-500/10 border-blue-500/30">
        <FileText className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Complete the installation and technician details to begin the EICR process. 
          All information will be included in the final report.
        </AlertDescription>
      </Alert>

      {errors.length > 0 && (
        <Alert className="bg-red-500/10 border-red-500/30">
          <AlertDescription className="text-red-200">
            <div className="space-y-1">
              {errors.map((error, index) => (
                <div key={index}>• {error}</div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Installation Details */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-elec-yellow" />
              Installation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Installation Address *</Label>
              <Textarea
                id="address"
                value={installationDetails.address}
                onChange={(e) => setInstallationDetails(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Enter full installation address..."
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Installation Type</Label>
                <Select value={installationDetails.type} onValueChange={(value) => setInstallationDetails(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Domestic">Domestic</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="age">Estimated Age</Label>
                <Input
                  id="age"
                  value={installationDetails.age}
                  onChange={(e) => setInstallationDetails(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="e.g., 15 years"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={installationDetails.description}
                onChange={(e) => setInstallationDetails(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the electrical installation..."
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="earthingSystem">Earthing System</Label>
                <Select value={installationDetails.earthingSystem} onValueChange={(value) => setInstallationDetails(prev => ({ ...prev, earthingSystem: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TN-S">TN-S</SelectItem>
                    <SelectItem value="TN-C-S">TN-C-S</SelectItem>
                    <SelectItem value="TT">TT</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="supply">Supply Type</Label>
                <Select value={installationDetails.supply} onValueChange={(value) => setInstallationDetails(prev => ({ ...prev, supply: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single Phase 230V">Single Phase 230V</SelectItem>
                    <SelectItem value="Three Phase 400V">Three Phase 400V</SelectItem>
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
              <Label htmlFor="techName">Technician Name *</Label>
              <Input
                id="techName"
                value={technician.name}
                onChange={(e) => setTechnician(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Full name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="qualification">Qualification *</Label>
              <Select value={technician.qualification} onValueChange={(value) => setTechnician(prev => ({ ...prev, qualification: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18th Edition BS 7671">18th Edition BS 7671</SelectItem>
                  <SelectItem value="17th Edition BS 7671">17th Edition BS 7671</SelectItem>
                  <SelectItem value="City & Guilds 2391">City & Guilds 2391</SelectItem>
                  <SelectItem value="NVQ Level 3">NVQ Level 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="company">Company/Organisation</Label>
              <Input
                id="company"
                value={technician.company}
                onChange={(e) => setTechnician(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Company name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="registration">Registration Number</Label>
              <Input
                id="registration"
                value={technician.registrationNumber}
                onChange={(e) => setTechnician(prev => ({ ...prev, registrationNumber: e.target.value }))}
                placeholder="NICEIC/NAPIT etc."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="contact">Contact Details</Label>
              <Textarea
                id="contact"
                value={technician.contactDetails}
                onChange={(e) => setTechnician(prev => ({ ...prev, contactDetails: e.target.value }))}
                placeholder="Phone, email, address..."
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={handleStartSession}
          className="bg-elec-yellow text-black hover:bg-elec-yellow/90 px-8 py-3 text-lg"
        >
          Start EICR Process
        </Button>
      </div>
    </div>
  );
};

export default EICRSetupForm;
