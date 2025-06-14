
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CircuitTestSession, CircuitTestStep, CircuitTestResult } from '@/types/circuit-testing';
import { comprehensiveCircuitTestFlow } from '@/data/inspection-testing/circuitTestFlow';
import { AlertTriangle, CheckCircle, Clock, Settings, Zap } from 'lucide-react';

interface CircuitTestingInterfaceProps {
  session: CircuitTestSession | null;
  onStartSession: (installationDetails: any, technician: any) => void;
  onRecordResult: (stepId: string, result: Omit<CircuitTestResult, 'stepId' | 'timestamp'>) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onCompleteSession: () => void;
}

const CircuitTestingInterface: React.FC<CircuitTestingInterfaceProps> = ({
  session,
  onStartSession,
  onRecordResult,
  onNextStep,
  onPreviousStep,
  onCompleteSession
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!session) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Comprehensive Circuit Testing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This comprehensive testing sequence follows BS 7671 requirements and includes all necessary tests for domestic electrical installations.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow">{comprehensiveCircuitTestFlow.steps.length}</div>
                <div className="text-sm text-muted-foreground">Test Steps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow">{comprehensiveCircuitTestFlow.estimatedDuration}</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow">{comprehensiveCircuitTestFlow.difficulty}</div>
                <div className="text-sm text-muted-foreground">Difficulty</div>
              </div>
            </div>

            <Button 
              onClick={() => onStartSession({}, {})}
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              Start Circuit Testing Session
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentStep = session.steps[session.currentStepIndex];
  const progress = ((session.currentStepIndex + 1) / session.steps.length) * 100;
  const completedSteps = session.results.filter(r => r.status === 'completed').length;
  const failedSteps = session.results.filter(r => r.status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Circuit Testing Progress</CardTitle>
            <Badge variant={session.status === 'completed' ? 'default' : 'secondary'}>
              {session.status.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{session.currentStepIndex + 1}/{session.steps.length}</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">{completedSteps}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">{failedSteps}</div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-400">
                  {session.steps.length - completedSteps - failedSteps}
                </div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Testing Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current Step</TabsTrigger>
          <TabsTrigger value="overview">Test Overview</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          {currentStep && (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {currentStep.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{currentStep.category}</Badge>
                  <Badge variant="outline">{currentStep.testType}</Badge>
                  {currentStep.estimatedTime && (
                    <Badge variant="outline">⏱️ {currentStep.estimatedTime}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{currentStep.description}</p>

                <div>
                  <h4 className="font-medium mb-2">Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    {currentStep.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                {currentStep.safetyWarnings && (
                  <Alert className="border-red-500/30 bg-red-500/10">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <AlertDescription>
                      <div className="space-y-1">
                        {currentStep.safetyWarnings.map((warning, index) => (
                          <div key={index} className="text-red-200">⚠️ {warning}</div>
                        ))}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {currentStep.requiredEquipment && (
                  <div>
                    <h4 className="font-medium mb-2">Required Equipment:</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentStep.requiredEquipment.map((equipment, index) => (
                        <Badge key={index} variant="outline">{equipment}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={() => onRecordResult(currentStep.id, { status: 'completed' })}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </Button>
                  <Button
                    onClick={() => onRecordResult(currentStep.id, { status: 'failed' })}
                    variant="destructive"
                    className="flex-1"
                  >
                    Mark Failed
                  </Button>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    onClick={onPreviousStep}
                    disabled={session.currentStepIndex === 0}
                    variant="outline"
                  >
                    Previous Step
                  </Button>
                  <Button
                    onClick={onNextStep}
                    disabled={session.currentStepIndex === session.steps.length - 1}
                    variant="outline"
                  >
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="overview">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Testing Sequence Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['safe-isolation', 'continuity', 'insulation-resistance', 'earth-fault-loop', 'rcd-test', 'polarity', 'functional-test'].map((category) => {
                  const categorySteps = session.steps.filter(step => step.category === category);
                  const categoryResults = session.results.filter(r => 
                    categorySteps.some(step => step.id === r.stepId)
                  );
                  const completed = categoryResults.filter(r => r.status === 'completed').length;
                  
                  return (
                    <div key={category} className="border border-elec-yellow/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium capitalize">{category.replace('-', ' ')}</h4>
                        <Badge variant="outline">
                          {completed}/{categorySteps.length}
                        </Badge>
                      </div>
                      <Progress 
                        value={(completed / categorySteps.length) * 100} 
                        className="h-2"
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Test Results Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {session.results.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No test results recorded yet
                  </p>
                ) : (
                  session.results.map((result) => {
                    const step = session.steps.find(s => s.id === result.stepId);
                    return (
                      <div key={result.stepId} className="border border-elec-yellow/20 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{step?.title}</h4>
                          <Badge variant={result.status === 'completed' ? 'default' : 'destructive'}>
                            {result.status}
                          </Badge>
                        </div>
                        {result.value && (
                          <p className="text-sm text-muted-foreground">
                            Value: {result.value} {result.unit}
                          </p>
                        )}
                        {result.notes && (
                          <p className="text-sm text-muted-foreground">
                            Notes: {result.notes}
                          </p>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CircuitTestingInterface;
