
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TestSession, TestFlow } from '@/types/inspection-testing';
import { Play, Pause, Settings, Eye, Zap } from 'lucide-react';
import { enhancedComprehensiveFlow, visualInspectionOnlyFlow } from '@/data/inspection-testing/enhancedComprehensiveFlow';
import { comprehensiveTestFlow } from '@/data/inspection-testing/comprehensiveTestFlow';

interface EnhancedTestingInterfaceProps {
  session: TestSession | null;
  onStartSession: (flow: TestFlow, installationDetails: any, technician: any) => void;
  onPauseSession: () => void;
  onResumeSession: () => void;
}

const EnhancedTestingInterface: React.FC<EnhancedTestingInterfaceProps> = ({
  session,
  onStartSession,
  onPauseSession,
  onResumeSession
}) => {
  const [selectedFlow, setSelectedFlow] = useState<string>('enhanced-comprehensive');
  const [installationDetails, setInstallationDetails] = useState({
    location: 'Test Location',
    type: 'Domestic',
    description: 'Electrical installation testing'
  });

  const availableFlows = [
    {
      id: 'enhanced-comprehensive',
      flow: enhancedComprehensiveFlow,
      icon: <Settings className="h-4 w-4" />,
      description: 'Complete inspection and testing sequence'
    },
    {
      id: 'visual-only',
      flow: visualInspectionOnlyFlow,
      icon: <Eye className="h-4 w-4" />,
      description: 'Visual inspection only'
    },
    {
      id: 'testing-only',
      flow: comprehensiveTestFlow,
      icon: <Zap className="h-4 w-4" />,
      description: 'Testing procedures only'
    }
  ];

  const handleStartSession = () => {
    const selectedFlowData = availableFlows.find(f => f.id === selectedFlow);
    if (selectedFlowData) {
      onStartSession(
        selectedFlowData.flow,
        installationDetails,
        {
          name: 'Test Technician',
          qualifications: 'Qualified Electrician (18th Edition)',
          company: 'Test Company Ltd'
        }
      );
    }
  };

  const getSessionStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  if (session) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Active Session: {session.flowId}</span>
            <Badge className={getSessionStatusColor(session.status)}>
              {session.status || 'in-progress'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Progress</p>
              <p className="text-2xl font-bold">
                {session.currentStepIndex + 1} / {session.steps.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Started</p>
              <p className="font-medium">
                {session.startTime.toLocaleTimeString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{session.location}</p>
            </div>
          </div>

          <div className="flex gap-2">
            {session.status === 'in-progress' ? (
              <Button onClick={onPauseSession} variant="outline">
                <Pause className="h-4 w-4 mr-2" />
                Pause Session
              </Button>
            ) : (
              <Button onClick={onResumeSession} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                <Play className="h-4 w-4 mr-2" />
                Resume Session
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle>Start Enhanced Testing Session</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-3 block">Select Testing Flow</label>
          <Select value={selectedFlow} onValueChange={setSelectedFlow}>
            <SelectTrigger>
              <SelectValue placeholder="Choose testing procedure" />
            </SelectTrigger>
            <SelectContent>
              {availableFlows.map((flow) => (
                <SelectItem key={flow.id} value={flow.id}>
                  <div className="flex items-center gap-2">
                    {flow.icon}
                    <div>
                      <p className="font-medium">{flow.flow.title}</p>
                      <p className="text-xs text-muted-foreground">{flow.description}</p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedFlow && (
          <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/10">
            {(() => {
              const flow = availableFlows.find(f => f.id === selectedFlow)?.flow;
              return flow ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{flow.title}</h4>
                    <Badge variant="outline">{flow.difficulty}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{flow.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="ml-2">{flow.estimatedDuration}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Steps:</span>
                      <span className="ml-2">{flow.steps.length}</span>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}

        <Button 
          onClick={handleStartSession}
          className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
          disabled={!selectedFlow}
        >
          <Play className="h-4 w-4 mr-2" />
          Start Testing Session
        </Button>
      </CardContent>
    </Card>
  );
};

export default EnhancedTestingInterface;
