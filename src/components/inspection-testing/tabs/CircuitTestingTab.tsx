
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Settings, Shield } from 'lucide-react';
import EnhancedTestingInterface from '../EnhancedTestingInterface';
import TestStepDisplay from '../TestStepDisplay';
import { useEnhancedTesting } from '@/hooks/useEnhancedTesting';

const CircuitTestingTab = () => {
  const {
    session,
    startSession,
    pauseSession,
    resumeSession,
    recordResult,
    nextStep,
    previousStep,
    completeSession,
    getCurrentStep,
    getStepProgress
  } = useEnhancedTesting();

  const currentStep = getCurrentStep();
  const progress = getStepProgress();

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Schedule of Results - Enhanced Testing System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Enhanced comprehensive testing system covering the complete inspection and testing sequence. 
            Choose from visual inspection only, testing procedures only, or the full comprehensive 
            inspection and testing process following BS 7671:2018+A2:2022 requirements.
          </p>

          <Alert className="mb-6 bg-blue-500/10 border-blue-500/30">
            <Shield className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200">
              <strong>Enhanced Testing System:</strong> This system provides guided workflows for 
              visual inspection, dead testing, and live testing procedures. Each step includes 
              detailed instructions, safety warnings, and automated result validation.
            </AlertDescription>
          </Alert>

          <EnhancedTestingInterface
            session={session}
            onStartSession={startSession}
            onPauseSession={pauseSession}
            onResumeSession={resumeSession}
          />

          {session && currentStep && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Step {progress.current} of {progress.total}
                </h3>
                <div className="text-sm text-muted-foreground">
                  {progress.percentage}% Complete
                </div>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>

              <TestStepDisplay
                step={currentStep}
                result={session.results.find(r => r.stepId === currentStep.id)}
                onRecordResult={(result) => recordResult(currentStep.id, result)}
                mode="electrician"
              />

              <div className="flex justify-between mt-6">
                <button
                  onClick={previousStep}
                  disabled={progress.current === 1}
                  className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
                >
                  Previous Step
                </button>
                
                {progress.current === progress.total ? (
                  <button
                    onClick={completeSession}
                    className="px-6 py-2 bg-elec-yellow text-black rounded hover:bg-elec-yellow/90"
                  >
                    Complete Session
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    className="px-4 py-2 bg-elec-yellow text-black rounded hover:bg-elec-yellow/90"
                  >
                    Next Step
                  </button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CircuitTestingTab;
