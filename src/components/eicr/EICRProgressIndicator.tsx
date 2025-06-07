
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Clock, FileText, Eye, TestTube, User, Building, Zap } from 'lucide-react';
import { EICRDataManager } from '@/utils/eicrDataPersistence';

interface EICRProgressIndicatorProps {
  currentStep?: string;
  showDetailedProgress?: boolean;
  compact?: boolean;
}

const EICRProgressIndicator = ({ 
  currentStep, 
  showDetailedProgress = true, 
  compact = false 
}: EICRProgressIndicatorProps) => {
  const steps = [
    {
      id: 'installation-details',
      label: 'Installation Details',
      icon: Building,
      isComplete: EICRDataManager.isInstallationDetailsComplete(),
      route: '/electrician-tools/eicr/installation-details'
    },
    {
      id: 'inspector-details',
      label: 'Inspector Details',
      icon: User,
      isComplete: EICRDataManager.isInspectorDetailsComplete(),
      route: '/electrician-tools/eicr/inspector-details'
    },
    {
      id: 'circuits',
      label: 'Circuit Information',
      icon: Zap,
      isComplete: EICRDataManager.isCircuitInformationComplete(),
      route: '/electrician-tools/eicr/circuits'
    },
    {
      id: 'inspection',
      label: 'Visual Inspection',
      icon: Eye,
      isComplete: EICRDataManager.isVisualInspectionComplete(),
      route: '/electrician-tools/eicr/inspection'
    },
    {
      id: 'testing',
      label: 'Testing & Results',
      icon: TestTube,
      isComplete: EICRDataManager.isTestingComplete(),
      route: '/electrician-tools/eicr/testing'
    }
  ];

  const overallProgress = EICRDataManager.getOverallProgress();
  const completedSteps = steps.filter(step => step.isComplete).length;

  if (compact) {
    return (
      <div className="flex items-center gap-2 p-3 bg-elec-gray/50 rounded-lg border border-elec-yellow/10">
        <FileText className="h-4 w-4 text-elec-yellow" />
        <span className="text-sm font-medium">EICR Progress:</span>
        <div className="flex gap-1">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`w-2 h-2 rounded-full ${
                step.isComplete 
                  ? 'bg-green-400' 
                  : step.id === currentStep 
                  ? 'bg-elec-yellow' 
                  : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {completedSteps}/{steps.length}
        </span>
      </div>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            EICR Progress
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`${
              overallProgress === 100 
                ? 'border-green-500/30 text-green-400' 
                : 'border-elec-yellow/30 text-elec-yellow'
            }`}
          >
            {Math.round(overallProgress)}% Complete
          </Badge>
        </div>
        <div className="w-full bg-elec-dark rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300" 
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </CardHeader>
      
      {showDetailedProgress && (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isComplete = step.isComplete;
              
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center text-center p-3 rounded-lg border transition-all ${
                    isComplete
                      ? 'bg-green-500/10 border-green-500/30'
                      : isActive
                      ? 'bg-elec-yellow/10 border-elec-yellow/30'
                      : 'bg-elec-dark/30 border-elec-yellow/10'
                  }`}
                >
                  <div className={`p-2 rounded-lg mb-2 ${
                    isComplete
                      ? 'bg-green-500/20'
                      : isActive
                      ? 'bg-elec-yellow/20'
                      : 'bg-gray-500/20'
                  }`}>
                    {isComplete ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <StepIcon className={`h-5 w-5 ${
                        isActive ? 'text-elec-yellow' : 'text-gray-400'
                      }`} />
                    )}
                  </div>
                  
                  <h4 className={`text-sm font-medium mb-1 ${
                    isComplete
                      ? 'text-green-400'
                      : isActive
                      ? 'text-elec-yellow'
                      : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </h4>
                  
                  <p className="text-xs text-muted-foreground">
                    Step {index + 1}
                  </p>
                  
                  {isComplete && (
                    <Badge variant="outline" className="mt-2 text-xs border-green-500/30 text-green-400">
                      Complete
                    </Badge>
                  )}
                  
                  {isActive && !isComplete && (
                    <Badge variant="outline" className="mt-2 text-xs border-elec-yellow/30 text-elec-yellow">
                      Active
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
          
          {showDetailedProgress && (
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-blue-400 mt-0.5" />
                <div className="text-sm">
                  <p className="text-blue-300 font-medium mb-1">EICR Compliance Note</p>
                  <p className="text-blue-200 text-xs">
                    This enhanced EICR system follows BS 7671 requirements and includes comprehensive 
                    visual inspection with 80+ inspection points across 10 main categories.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default EICRProgressIndicator;
