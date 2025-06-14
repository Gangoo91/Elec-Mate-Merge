
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TestFlow } from '@/types/inspection-testing';

interface SessionSetupFormProps {
  testFlow: TestFlow;
  onStartSession: (installationDetails: any, technician: any) => void;
}

const SessionSetupForm: React.FC<SessionSetupFormProps> = ({ testFlow, onStartSession }) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartSession(installationDetails, technician);
  };

  const totalSteps = testFlow.steps.length;
  const estimatedTime = testFlow.estimatedDuration;

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle>Session Setup - {testFlow.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Installation Details</h3>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={installationDetails.location}
                  onChange={(e) => setInstallationDetails(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Installation location"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="installationType">Installation Type</Label>
                <Input
                  id="installationType"
                  value={installationDetails.installationType}
                  onChange={(e) => setInstallationDetails(prev => ({ ...prev, installationType: e.target.value }))}
                  placeholder="e.g. Domestic, Commercial"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={installationDetails.description}
                  onChange={(e) => setInstallationDetails(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Installation description"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Technician Details</h3>
              
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={technician.name}
                  onChange={(e) => setTechnician(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Technician name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="qualifications">Qualifications</Label>
                <Input
                  id="qualifications"
                  value={technician.qualifications}
                  onChange={(e) => setTechnician(prev => ({ ...prev, qualifications: e.target.value }))}
                  placeholder="e.g. 18th Edition, C&G 2391"
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

          <div className="bg-elec-gray/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Test Session Overview</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total Steps:</span>
                <span className="ml-2 font-medium">{totalSteps}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Estimated Time:</span>
                <span className="ml-2 font-medium">{estimatedTime}</span>
              </div>
            </div>
            
            {testFlow.regulatoryStandards && (
              <div className="mt-2">
                <span className="text-muted-foreground text-sm">Standards:</span>
                <span className="ml-2 text-sm">{testFlow.regulatoryStandards.join(', ')}</span>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
            Start Testing Session
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SessionSetupForm;
