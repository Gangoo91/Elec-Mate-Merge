
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Play, Pause, RotateCcw, FileText } from 'lucide-react';
import { TestSession, TestFlow } from '@/types/inspection-testing';
import { enhancedComprehensiveFlow, visualInspectionOnlyFlow } from '@/data/inspection-testing/enhancedComprehensiveFlow';
import { eicrTestFlow, eicrVisualInspectionFlow, eicrTestingOnlyFlow } from '@/data/inspection-testing/eicrTestFlow';

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
  const [selectedFlow, setSelectedFlow] = useState<string>('enhanced-comprehensive-inspection-testing');
  const [showFlowDetails, setShowFlowDetails] = useState(false);

  const availableFlows: TestFlow[] = [
    enhancedComprehensiveFlow,
    visualInspectionOnlyFlow,
    eicrTestFlow,
    eicrVisualInspectionFlow,
    eicrTestingOnlyFlow
  ];

  const currentFlow = availableFlows.find(flow => flow.id === selectedFlow);

  const handleStartSession = () => {
    if (!currentFlow) return;

    // For EICR flows, we'll need installation and technician details
    // For now, use placeholder data - in real implementation this would come from a form
    const installationDetails = {
      address: 'Sample Installation Address',
      type: 'Domestic',
      description: 'Sample installation for testing'
    };

    const technician = {
      name: 'Test Technician',
      qualification: '18th Edition BS 7671'
    };

    onStartSession(currentFlow, installationDetails, technician);
  };

  if (session?.status === 'in-progress') {
    return (
      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Session Active</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{availableFlows.find(f => f.id === session.flowId)?.title}</p>
                <p className="text-sm text-muted-foreground">
                  Started: {session.startTime.toLocaleTimeString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={onPauseSession} variant="outline" size="sm">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (session?.status === 'pending') {
    return (
      <Card className="border-yellow-500/30 bg-yellow-500/10">
        <CardHeader>
          <CardTitle className="text-yellow-400">Session Paused</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{availableFlows.find(f => f.id === session.flowId)?.title}</p>
                <p className="text-sm text-muted-foreground">
                  Paused session can be resumed
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={onResumeSession} className="bg-elec-yellow text-black">
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/30 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Enhanced Testing System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Select Testing Flow</label>
            <Select value={selectedFlow} onValueChange={setSelectedFlow}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a testing workflow" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enhanced-comprehensive-inspection-testing">
                  Enhanced Comprehensive Inspection & Testing
                </SelectItem>
                <SelectItem value="visual-inspection-only">
                  Visual Inspection Only
                </SelectItem>
                <SelectItem value="eicr-complete-process">
                  EICR Complete Process
                </SelectItem>
                <SelectItem value="eicr-visual-inspection">
                  EICR Visual Inspection
                </SelectItem>
                <SelectItem value="eicr-testing-only">
                  EICR Testing Procedures
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {currentFlow && (
            <Alert className="bg-blue-500/10 border-blue-500/30">
              <AlertDescription className="text-blue-200">
                <div className="space-y-2">
                  <div><strong>{currentFlow.title}</strong></div>
                  <div>{currentFlow.description}</div>
                  <div className="text-xs">
                    Duration: {currentFlow.estimatedDuration} • 
                    Steps: {currentFlow.steps.length} • 
                    Difficulty: {currentFlow.difficulty || 'Standard'}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center">
            <Button 
              onClick={handleStartSession}
              disabled={!currentFlow}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Testing Session
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedTestingInterface;
