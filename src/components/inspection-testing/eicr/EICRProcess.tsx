
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, FileText, ArrowLeft, Clock, Users, PlayCircle } from 'lucide-react';
import EICRSetupForm from './EICRSetupForm';
import TestStepDisplay from '../TestStepDisplay';
import ReportGenerator from '../ReportGenerator';
import { useTestFlowEngine } from '@/hooks/useTestFlowEngine';
import { eicrTestFlow } from '@/data/inspection-testing/eicrTestFlow';

type EICRStage = 'overview' | 'setup' | 'testing' | 'completed';

const EICRProcess = () => {
  const [currentStage, setCurrentStage] = useState<EICRStage>('overview');
  
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

  const handleStartSetup = () => {
    setCurrentStage('setup');
  };

  const handleStartSession = (installationDetails: any, technician: any) => {
    console.log('Starting EICR session with:', { installationDetails, technician });
    startSession(installationDetails, technician);
    setCurrentStage('testing');
  };

  const handleStepComplete = (result: any) => {
    if (currentStep) {
      recordResult(currentStep.id, result);
      
      if (isLastStep) {
        const completedSession = completeSession();
        setCurrentStage('completed');
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

  const handleBackToOverview = () => {
    setCurrentStage('overview');
  };

  const handleStartNewEICR = () => {
    setCurrentStage('overview');
  };

  // Overview Stage
  if (currentStage === 'overview') {
    return (
      <div className="space-y-6">
        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              EICR Complete Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Complete Electrical Installation Condition Report following BS 7671:2018+A2:2022. 
                This comprehensive process includes visual inspection, testing procedures, and 
                professional report generation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-400 mb-2">What's Included</h4>
                <ul className="text-blue-300 text-sm space-y-1">
                  <li>• Complete visual inspection procedures</li>
                  <li>• All required testing sequences (continuity, insulation, Zs, RCD, polarity)</li>
                  <li>• Automatic fault classification (C1, C2, C3, FI)</li>
                  <li>• Professional EICR report generation</li>
                  <li>• Compliance with BS 7671:2018+A2:2022</li>
                </ul>
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={handleStartSetup}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
                  size="lg"
                >
                  <PlayCircle className="h-5 w-5" />
                  Begin EICR Setup
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prerequisites and Safety */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-orange-500/30 bg-orange-500/10">
            <CardHeader>
              <CardTitle className="text-orange-400">Prerequisites</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-orange-300 text-sm space-y-2">
                {eicrTestFlow.prerequisites?.map((req, index) => (
                  <li key={index}>• {req}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-500/30 bg-red-500/10">
            <CardHeader>
              <CardTitle className="text-red-400">Safety Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-red-300 text-sm space-y-2">
                {eicrTestFlow.safetyRequirements?.map((req, index) => (
                  <li key={index}>• {req}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Setup Stage
  if (currentStage === 'setup') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            onClick={handleBackToOverview}
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Overview
          </Button>
        </div>
        
        <EICRSetupForm onStartSession={handleStartSession} />
      </div>
    );
  }

  // Completed Stage
  if (currentStage === 'completed' && session) {
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
            onClick={handleStartNewEICR}
            variant="outline"
          >
            Start New EICR
          </Button>
        </div>
      </div>
    );
  }

  // Testing Stage
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
