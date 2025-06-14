
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Play, Pause, RotateCcw } from 'lucide-react';
import { TestStep, TestResult } from '@/types/inspection-testing';
import { EICRProvider } from '@/contexts/EICRContext';

interface InspectionTestingWalkthroughProps {
  mode: 'electrician' | 'apprentice';
  onComplete?: (report: any) => void;
}

const InspectionTestingWalkthrough: React.FC<InspectionTestingWalkthroughProps> = ({ 
  mode, 
  onComplete 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  // Sample test steps for demonstration
  const testSteps: TestStep[] = [
    {
      id: 'safe-isolation',
      title: 'Safe Isolation',
      description: 'Safely isolate the electrical installation',
      instructions: [
        'Identify the appropriate isolation point',
        'Switch off and lock the main switch',
        'Test voltage indicator on known live source',
        'Test installation is dead',
        'Test voltage indicator again on known live source'
      ],
      safetyWarnings: ['Always use a voltage indicator', 'Never assume circuits are dead'],
      estimatedTime: '10-15 minutes',
      category: 'safety'
    },
    {
      id: 'visual-inspection',
      title: 'Visual Inspection',
      description: 'Conduct thorough visual inspection of the installation',
      instructions: [
        'Check consumer unit condition',
        'Inspect cable runs and fixings',
        'Examine socket outlets and switches',
        'Check earthing and bonding arrangements'
      ],
      estimatedTime: '20-30 minutes',
      category: 'inspection'
    },
    {
      id: 'continuity-testing',
      title: 'Continuity Testing',
      description: 'Test continuity of protective conductors',
      instructions: [
        'Connect test leads to protective conductor',
        'Measure resistance values',
        'Record readings on schedule',
        'Check all circuits systematically'
      ],
      acceptableLimits: { max: 1.67, unit: 'Ω' },
      estimatedTime: '15-25 minutes',
      category: 'testing'
    }
  ];

  const currentStep = testSteps[currentStepIndex];

  const handleStartSession = () => {
    setSessionActive(true);
    setCurrentStepIndex(0);
    setResults([]);
  };

  const handleStepComplete = (stepResult: Omit<TestResult, 'stepId' | 'timestamp'>) => {
    const result: TestResult = {
      ...stepResult,
      stepId: currentStep.id,
      timestamp: new Date()
    };
    
    setResults(prev => [...prev, result]);
    
    if (currentStepIndex < testSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Session complete
      setSessionActive(false);
      onComplete?.(results);
    }
  };

  const handleReset = () => {
    setSessionActive(false);
    setCurrentStepIndex(0);
    setResults([]);
  };

  if (!sessionActive) {
    return (
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-elec-yellow" />
            Inspection & Testing Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Ready to begin a comprehensive inspection and testing session. This will guide you through 
              all required procedures according to BS 7671.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow">{testSteps.length}</div>
                <div className="text-sm text-muted-foreground">Test Procedures</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow">60-90</div>
                <div className="text-sm text-muted-foreground">Minutes (Est.)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow">EICR</div>
                <div className="text-sm text-muted-foreground">Auto Generated</div>
              </div>
            </div>
            
            <Button 
              onClick={handleStartSession}
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Testing Session
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Step {currentStepIndex + 1} of {testSteps.length}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Current step */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {currentStep.title}
            <span className="text-sm text-muted-foreground">{currentStep.estimatedTime}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">{currentStep.description}</p>
            
            <div>
              <h4 className="font-medium mb-2">Instructions:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                {currentStep.instructions.map((instruction, index) => (
                  <li key={index} className="text-muted-foreground">{instruction}</li>
                ))}
              </ol>
            </div>

            {currentStep.safetyWarnings && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <h4 className="font-medium text-red-400 mb-2">⚠️ Safety Warnings:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-200">
                  {currentStep.safetyWarnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                onClick={() => handleStepComplete({ status: 'completed', isWithinLimits: true })}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Complete
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => handleStepComplete({ status: 'skipped' })}
              >
                Skip Step
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Completed steps summary */}
      {results.length > 0 && (
        <Card className="border-green-500/30 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-400">Completed Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>{testSteps.find(s => s.id === result.stepId)?.title}</span>
                  <span className={`capitalize ${
                    result.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {result.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const InspectionTestingWalkthroughWithProvider: React.FC<InspectionTestingWalkthroughProps> = (props) => {
  return (
    <EICRProvider>
      <InspectionTestingWalkthrough {...props} />
    </EICRProvider>
  );
};

export default InspectionTestingWalkthroughWithProvider;
