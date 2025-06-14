
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, FileText, Play, Clock, Users } from 'lucide-react';
import EICRSetupForm from './EICRSetupForm';
import TestStepDisplay from '../TestStepDisplay';
import ReportGenerator from '../ReportGenerator';
import { useTestFlowEngine } from '@/hooks/useTestFlowEngine';
import { eicrTestFlow } from '@/data/inspection-testing/eicrTestFlow';

const EICRProcess = () => {
  const [showSetup, setShowSetup] = useState(true);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  
  const {
    session,
    currentStep,
    currentStepIndex,
    currentStepResult,
    progress,
    isLastStep,
    isFirstStep,
    isSessionActive,
    startSession,
    recordResult,
    nextStep,
    previousStep,
    completeSession
  } = useTestFlowEngine(eicrTestFlow);

  const handleStartSession = (installationDetails: any, technician: any) => {
    console.log('Starting EICR session with:', { installationDetails, technician });
    startSession(installationDetails, technician);
    setShowSetup(false);
  };

  const handleStepComplete = (result: any) => {
    if (currentStep) {
      recordResult(currentStep.id, result);
      
      if (isLastStep) {
        const completedSession = completeSession();
        setSessionCompleted(true);
        console.log('EICR session completed:', completedSession);
      } else {
        nextStep();
      }
    }
  };

  const handleGenerateReport = (format: 'pdf' | 'excel' | 'word') => {
    console.log(`Generating ${format.toUpperCase()} report for session:`, session?.id);
    // Report generation logic would go here
  };

  const handleEmailReport = () => {
    console.log('Emailing report for session:', session?.id);
    // Email logic would go here
  };

  const handlePrintReport = () => {
    console.log('Printing report for session:', session?.id);
    // Print logic would go here
  };

  if (showSetup) {
    return (
      <div className="space-y-6">
        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              EICR Process Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-elec-yellow/20 rounded-lg mb-3 mx-auto">
                  <Clock className="h-6 w-6 text-elec-yellow" />
                </div>
                <h3 className="font-semibold mb-1">Duration</h3>
                <p className="text-sm text-muted-foreground">{eicrTestFlow.estimatedDuration}</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-elec-yellow/20 rounded-lg mb-3 mx-auto">
                  <CheckCircle className="h-6 w-6 text-elec-yellow" />
                </div>
                <h3 className="font-semibold mb-1">Total Steps</h3>
                <p className="text-sm text-muted-foreground">{eicrTestFlow.steps.length} procedures</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-elec-yellow/20 rounded-lg mb-3 mx-auto">
                  <Users className="h-6 w-6 text-elec-yellow" />
                </div>
                <h3 className="font-semibold mb-1">Difficulty</h3>
                <p className="text-sm text-muted-foreground capitalize">{eicrTestFlow.difficulty}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <EICRSetupForm onStartSession={handleStartSession} />
      </div>
    );
  }

  if (sessionCompleted && session) {
    return (
      <div className="space-y-6">
        <Alert className="bg-green-500/10 border-green-500/30">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-200">
            <strong>EICR Process Complete!</strong> Your electrical installation condition report 
            has been successfully completed. You can now generate professional reports.
          </AlertDescription>
        </Alert>

        <ReportGenerator
          session={session}
          onGenerateReport={handleGenerateReport}
          onEmailReport={handleEmailReport}
          onPrintReport={handlePrintReport}
        />

        <div className="flex justify-center">
          <Button 
            onClick={() => {
              setShowSetup(true);
              setSessionCompleted(false);
            }}
            variant="outline"
          >
            Start New EICR
          </Button>
        </div>
      </div>
    );
  }

  if (!session || !currentStep) {
    return (
      <Alert className="bg-red-500/10 border-red-500/30">
        <AlertDescription className="text-red-200">
          Unable to load EICR session. Please try starting again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">EICR in Progress</h2>
              <p className="text-muted-foreground">
                Step {currentStepIndex + 1} of {eicrTestFlow.steps.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-elec-yellow">{Math.round(progress)}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Step */}
      <TestStepDisplay
        step={currentStep}
        result={currentStepResult}
        onRecordResult={handleStepComplete}
        mode="electrician"
      />

      {/* Navigation */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Button
              onClick={previousStep}
              disabled={isFirstStep}
              variant="outline"
            >
              Previous Step
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {session.location} • {session.installationType}
              </p>
            </div>
            
            <div className="text-right">
              {isLastStep ? (
                <span className="text-sm text-muted-foreground">
                  Complete current step to finish
                </span>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Continue to next step
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRProcess;
