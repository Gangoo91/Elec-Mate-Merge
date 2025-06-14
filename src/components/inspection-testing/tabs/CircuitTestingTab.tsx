
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Settings, Shield } from 'lucide-react';
import CircuitTestingInterface from '../CircuitTestingInterface';
import { useCircuitTesting } from '@/hooks/useCircuitTesting';

const CircuitTestingTab = () => {
  const {
    session,
    startSession,
    recordResult,
    nextStep,
    previousStep,
    completeSession
  } = useCircuitTesting();

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Comprehensive Circuit Testing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Complete circuit testing procedures for electrical circuits following BS 7671 requirements. 
            This comprehensive testing sequence includes safe isolation, continuity testing, insulation resistance, 
            earth fault loop impedance, RCD testing, polarity verification, and functional testing.
          </p>

          <Alert className="mb-6 bg-blue-500/10 border-blue-500/30">
            <Shield className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200">
              <strong>Safety First:</strong> All testing procedures follow BS 7671 requirements and include 
              comprehensive safety measures. Always ensure safe isolation before conducting dead tests and 
              follow proper procedures for live testing.
            </AlertDescription>
          </Alert>

          <CircuitTestingInterface
            session={session}
            onStartSession={startSession}
            onRecordResult={recordResult}
            onNextStep={nextStep}
            onPreviousStep={previousStep}
            onCompleteSession={completeSession}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CircuitTestingTab;
