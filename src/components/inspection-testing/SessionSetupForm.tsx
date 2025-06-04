
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Clock, User, MapPin, FileText, AlertTriangle } from 'lucide-react';
import { TestFlow } from '@/types/inspection-testing';
import { useIsMobile } from '@/hooks/use-mobile';

interface SessionSetupFormProps {
  testFlow: TestFlow;
  onStartSession: (installationDetails: any, technician: any) => void;
  mode: 'electrician' | 'apprentice';
}

const SessionSetupForm = ({ testFlow, onStartSession, mode }: SessionSetupFormProps) => {
  const [installationDetails, setInstallationDetails] = useState({
    location: '',
    description: '',
    voltage: '230V',
    phases: 'single',
    notes: ''
  });

  const [technician, setTechnician] = useState({
    name: '',
    qualification: '',
    companyRegistration: '',
    supervisorName: mode === 'apprentice' ? '' : undefined
  });

  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartSession(installationDetails, technician);
  };

  const getEstimatedTime = () => {
    return testFlow.steps.reduce((total, step) => total + step.estimatedTime, 0);
  };

  const isFormValid = () => {
    return (
      installationDetails.location.trim() &&
      installationDetails.description.trim() &&
      technician.name.trim() &&
      technician.qualification.trim() &&
      (mode === 'electrician' || technician.supervisorName?.trim())
    );
  };

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} gap-6`}>
      {/* Test Flow Information */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-lg">Testing Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Procedure Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-elec-yellow" />
                  Estimated: {getEstimatedTime()} minutes
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                  {testFlow.steps.length} test steps
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Prerequisites</h4>
              <ul className="text-xs space-y-1">
                {testFlow.prerequisites?.slice(0, 4).map((prereq, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0" />
                    {prereq}
                  </li>
                ))}
                {testFlow.prerequisites && testFlow.prerequisites.length > 4 && (
                  <li className="text-muted-foreground">
                    +{testFlow.prerequisites.length - 4} more requirements
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Standards</h4>
              <div className="flex flex-wrap gap-1">
                {testFlow.regulatoryStandards?.slice(0, 3).map((standard, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {standard.split(':')[0]}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {mode === 'apprentice' && (
          <Card className="border-amber-500/30 bg-amber-900/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-300 mb-1">Apprentice Mode</p>
                  <p className="text-amber-100/90">
                    This testing session requires supervision. Ensure your supervisor is present and aware of the testing activities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Setup Form */}
      <div className="lg:col-span-2">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-elec-yellow" />
              Testing Session Setup
            </CardTitle>
            <p className="text-muted-foreground">
              Please provide the installation and technician details for this testing session.
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Installation Details */}
              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-elec-yellow" />
                  Installation Details
                </h3>
                
                <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                  <div>
                    <Label htmlFor="location">Location / Address *</Label>
                    <Input
                      id="location"
                      value={installationDetails.location}
                      onChange={(e) => setInstallationDetails(prev => ({
                        ...prev,
                        location: e.target.value
                      }))}
                      placeholder="e.g., Unit 5, Industrial Estate, Manchester"
                      className="bg-elec-dark border-elec-yellow/20"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="voltage">Supply Voltage</Label>
                    <Input
                      id="voltage"
                      value={installationDetails.voltage}
                      onChange={(e) => setInstallationDetails(prev => ({
                        ...prev,
                        voltage: e.target.value
                      }))}
                      placeholder="e.g., 230V, 400V"
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Installation Description *</Label>
                  <Textarea
                    id="description"
                    value={installationDetails.description}
                    onChange={(e) => setInstallationDetails(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                    placeholder="Brief description of the electrical installation being tested"
                    className="bg-elec-dark border-elec-yellow/20"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={installationDetails.notes}
                    onChange={(e) => setInstallationDetails(prev => ({
                      ...prev,
                      notes: e.target.value
                    }))}
                    placeholder="Any special conditions, requirements, or observations"
                    className="bg-elec-dark border-elec-yellow/20"
                    rows={2}
                  />
                </div>
              </div>

              {/* Technician Details */}
              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-elec-yellow" />
                  Technician Details
                </h3>
                
                <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                  <div>
                    <Label htmlFor="name">Technician Name *</Label>
                    <Input
                      id="name"
                      value={technician.name}
                      onChange={(e) => setTechnician(prev => ({
                        ...prev,
                        name: e.target.value
                      }))}
                      placeholder="Full name"
                      className="bg-elec-dark border-elec-yellow/20"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="qualification">Qualification *</Label>
                    <Input
                      id="qualification"
                      value={technician.qualification}
                      onChange={(e) => setTechnician(prev => ({
                        ...prev,
                        qualification: e.target.value
                      }))}
                      placeholder="e.g., 18th Edition, AM2, Qualified Electrician"
                      className="bg-elec-dark border-elec-yellow/20"
                      required
                    />
                  </div>
                </div>

                <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                  <div>
                    <Label htmlFor="company">Company Registration</Label>
                    <Input
                      id="company"
                      value={technician.companyRegistration}
                      onChange={(e) => setTechnician(prev => ({
                        ...prev,
                        companyRegistration: e.target.value
                      }))}
                      placeholder="NICEIC, NAPIT, ELECSA, etc."
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                  </div>

                  {mode === 'apprentice' && (
                    <div>
                      <Label htmlFor="supervisor">Supervisor Name *</Label>
                      <Input
                        id="supervisor"
                        value={technician.supervisorName || ''}
                        onChange={(e) => setTechnician(prev => ({
                          ...prev,
                          supervisorName: e.target.value
                        }))}
                        placeholder="Supervising electrician name"
                        className="bg-elec-dark border-elec-yellow/20"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  disabled={!isFormValid()}
                >
                  Start Testing Session
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SessionSetupForm;
