
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TestFlow } from '@/types/inspection-testing';
import { useEICR } from '@/contexts/EICRContext';

interface SessionSetupProps {
  testFlow: TestFlow;
  onStartSession: (installationDetails: any, technician: any) => void;
}

const SessionSetup: React.FC<SessionSetupProps> = ({
  testFlow,
  onStartSession
}) => {
  const { initializeEICR } = useEICR();
  const [installationDetails, setInstallationDetails] = useState({
    location: '',
    installationType: '',
    description: ''
  });
  const [technician, setTechnician] = useState({
    name: '',
    qualifications: '',
    company: ''
  });

  const handleStartSession = () => {
    initializeEICR(installationDetails, technician);
    onStartSession(installationDetails, technician);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Session Setup - {testFlow.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {testFlow.description}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="font-medium">Installation Details</h3>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={installationDetails.location}
                  onChange={(e) => setInstallationDetails(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., 123 Main Street, London"
                />
              </div>
              <div>
                <Label htmlFor="installationType">Installation Type</Label>
                <Input
                  id="installationType"
                  value={installationDetails.installationType}
                  onChange={(e) => setInstallationDetails(prev => ({ ...prev, installationType: e.target.value }))}
                  placeholder="e.g., Domestic, Commercial"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={installationDetails.description}
                  onChange={(e) => setInstallationDetails(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of work"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Technician Details</h3>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={technician.name}
                  onChange={(e) => setTechnician(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your name"
                />
              </div>
              <div>
                <Label htmlFor="qualifications">Qualifications</Label>
                <Input
                  id="qualifications"
                  value={technician.qualifications}
                  onChange={(e) => setTechnician(prev => ({ ...prev, qualifications: e.target.value }))}
                  placeholder="e.g., 18th Edition, 2391"
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={technician.company}
                  onChange={(e) => setTechnician(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Company name"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-medium mb-2">Test Overview</h4>
            <div className="text-sm space-y-1">
              <p>Steps: {testFlow.steps.length}</p>
              <p>Estimated Duration: {testFlow.estimatedDuration}</p>
              <p>Type: {testFlow.type.toUpperCase()}</p>
            </div>
          </div>

          <Button 
            onClick={handleStartSession}
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
            disabled={!installationDetails.location || !technician.name}
          >
            Start Testing Session
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionSetup;
