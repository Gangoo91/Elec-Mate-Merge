
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, Info, Clock, Shield, Lightbulb } from 'lucide-react';

interface GuidedWorkflowProps {
  currentStep: any;
  session: any;
  mode: 'electrician' | 'apprentice';
}

const GuidedWorkflow = ({ currentStep, session, mode }: GuidedWorkflowProps) => {
  if (!currentStep) return null;

  const getStepTypeInfo = () => {
    const stepId = currentStep.id.toLowerCase();
    
    if (stepId.includes('isolation') || stepId.includes('safe')) {
      return {
        type: 'safety-critical',
        icon: Shield,
        color: 'text-red-400',
        bgColor: 'bg-red-500/10 border-red-500/30',
        message: 'Safety Critical Step - Follow procedure exactly'
      };
    }
    
    if (stepId.includes('planning') || stepId.includes('preparation')) {
      return {
        type: 'preparation',
        icon: Lightbulb,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10 border-blue-500/30',
        message: 'Preparation Step - Proper planning ensures safe testing'
      };
    }
    
    if (stepId.includes('test') || stepId.includes('measure')) {
      return {
        type: 'testing',
        icon: CheckCircle,
        color: 'text-green-400',
        bgColor: 'bg-green-500/10 border-green-500/30',
        message: 'Active Testing - Record results accurately'
      };
    }
    
    return {
      type: 'general',
      icon: Info,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10 border-yellow-500/30',
      message: 'Important Step - Follow guidance carefully'
    };
  };

  const stepInfo = getStepTypeInfo();
  const StepIcon = stepInfo.icon;

  const getProgressContext = () => {
    if (!session) return '';
    
    const currentIndex = session.currentStepIndex;
    const totalSteps = session.results?.length || 0;
    const completedSteps = session.results?.filter((r: any) => r.status === 'completed').length || 0;
    
    return `Step ${currentIndex + 1} of ${totalSteps} • ${completedSteps} completed`;
  };

  const getEducationalContent = () => {
    if (mode !== 'apprentice') return null;

    const educationalTips = {
      'safe-isolation': 'Remember: PROVE DEAD before starting any work. This is the most critical safety procedure.',
      'continuity': 'R1+R2 testing verifies the protective conductor path. High readings indicate poor connections.',
      'insulation': 'Insulation resistance testing finds deteriorated insulation. Always disconnect sensitive equipment first.',
      'polarity': 'Polarity testing ensures switches break the line conductor, not neutral. Critical for safety.',
      'rcd': 'RCD testing verifies earth leakage protection. Test buttons only confirm mechanics, not electrical operation.',
      'earth-fault-loop': 'Zs testing confirms protective devices will operate fast enough to prevent dangerous voltages.'
    };

    const stepType = currentStep.id.toLowerCase();
    for (const [key, tip] of Object.entries(educationalTips)) {
      if (stepType.includes(key)) {
        return (
          <Alert className="bg-blue-500/10 border-blue-500/30">
            <Lightbulb className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200">
              <strong>Learning Tip:</strong> {tip}
            </AlertDescription>
          </Alert>
        );
      }
    }

    return null;
  };

  return (
    <div className="space-y-4">
      {/* Step Context */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <StepIcon className={`h-5 w-5 ${stepInfo.color}`} />
              Current Step Context
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {getProgressContext()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert className={stepInfo.bgColor}>
            <StepIcon className={`h-4 w-4 ${stepInfo.color}`} />
            <AlertDescription className={stepInfo.color.replace('text-', 'text-')}>
              {stepInfo.message}
            </AlertDescription>
          </Alert>

          {/* Time Guidance */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Estimated time: {currentStep.estimatedTime} minutes</span>
          </div>

          {/* Prerequisites Check */}
          {currentStep.safetyNotes && currentStep.safetyNotes.length > 0 && (
            <Alert className="bg-amber-500/10 border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <AlertDescription className="text-amber-200">
                <strong>Safety Requirements:</strong>
                <ul className="mt-1 space-y-1">
                  {currentStep.safetyNotes.map((note: string, index: number) => (
                    <li key={index} className="text-xs">• {note}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Educational Content for Apprentices */}
          {getEducationalContent()}
        </CardContent>
      </Card>

      {/* Tools Required */}
      {currentStep.tools && currentStep.tools.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Tools & Equipment Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {currentStep.tools.map((tool: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Expected Outcome */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            Expected Outcome
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {currentStep.expectedResult}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuidedWorkflow;
