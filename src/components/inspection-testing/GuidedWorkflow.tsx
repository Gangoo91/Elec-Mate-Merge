
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TestStep, TestSession } from '@/types/inspection-testing';
import { CheckCircle, Clock, AlertTriangle, FileText, Shield } from 'lucide-react';

interface GuidedWorkflowProps {
  currentStep: TestStep | null;
  session: TestSession | null;
  mode: 'electrician' | 'apprentice';
}

const GuidedWorkflow = ({ currentStep, session, mode }: GuidedWorkflowProps) => {
  if (!currentStep || !session) return null;

  const currentStepIndex = session.currentStepIndex;
  const totalSteps = session.results.length > 0 ? session.results.length : 10; // Fallback
  const completedSteps = session.results.filter(r => r.status === 'completed').length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const isCurrentStepCompleted = session.results.some(
    r => r.stepId === currentStep.id && r.status === 'completed'
  );

  const getStepTypeInfo = (stepId: string) => {
    if (stepId.includes('preliminary') || stepId.includes('documentation')) {
      return { icon: FileText, color: 'text-blue-400', type: 'Documentation' };
    }
    if (stepId.includes('isolation') || stepId.includes('safety')) {
      return { icon: Shield, color: 'text-orange-400', type: 'Safety' };
    }
    if (stepId.includes('visual') || stepId.includes('inspection')) {
      return { icon: CheckCircle, color: 'text-green-400', type: 'Visual Inspection' };
    }
    return { icon: CheckCircle, color: 'text-elec-yellow', type: 'Electrical Test' };
  };

  const stepInfo = getStepTypeInfo(currentStep.id);
  const StepIcon = stepInfo.icon;

  return (
    <div className="space-y-4">
      {/* Current Step Overview */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <StepIcon className={`h-5 w-5 ${stepInfo.color}`} />
            <CardTitle className="text-sm">Current Step</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Step {currentStepIndex + 1}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {stepInfo.type}
            </Badge>
            {isCurrentStepCompleted && (
              <Badge className="bg-green-600 text-xs">
                Completed
              </Badge>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Estimated time: {currentStep.estimatedTime} minutes
            </div>
            
            <div className="text-xs">
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">Session Progress</span>
                <span className="text-muted-foreground">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Notes */}
      {currentStep.safetyNotes && currentStep.safetyNotes.length > 0 && (
        <Card className="border-orange-500/30 bg-orange-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-400" />
              Safety Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {currentStep.safetyNotes.map((note, index) => (
                <li key={index} className="text-xs text-orange-200 flex items-start gap-2">
                  <div className="h-1 w-1 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Required Tools */}
      {currentStep.tools && currentStep.tools.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Required Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {currentStep.tools.map((tool, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* UK Standards Reference */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-400" />
            UK Standards Reference
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-xs">
            <div className="font-medium text-blue-200">BS 7671:2018+A2:2022</div>
            <div className="text-blue-300">Requirements for Electrical Installations</div>
          </div>
          <div className="text-xs">
            <div className="font-medium text-blue-200">IET Guidance Note 3</div>
            <div className="text-blue-300">Inspection & Testing</div>
          </div>
          {mode === 'apprentice' && (
            <div className="text-xs text-blue-300 mt-2 p-2 bg-blue-500/10 rounded">
              <strong>Learning Tip:</strong> This step demonstrates compliance with UK electrical 
              installation standards. Understanding these requirements is essential for electrical competency.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Learning Objectives (Apprentice Mode) */}
      {mode === 'apprentice' && (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Learning Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-xs text-green-200">
              <li className="flex items-start gap-2">
                <div className="h-1 w-1 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                Understand the purpose and method of this test
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1 w-1 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                Learn acceptable values and limits per BS 7671
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1 w-1 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                Identify potential faults and remedial actions
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1 w-1 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                Practice proper use of test equipment
              </li>
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Session Statistics */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Session Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Completed Steps:</span>
            <span className="font-medium">{completedSteps}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Remaining Steps:</span>
            <span className="font-medium">{totalSteps - completedSteps}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Failed Tests:</span>
            <span className="font-medium text-red-400">
              {session.results.filter(r => r.status === 'failed').length}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuidedWorkflow;
