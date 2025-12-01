import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MaintenanceMethodData, MaintenanceStep } from '@/types/maintenance-method';
import { MaintenanceStepCard } from './MaintenanceStepCard';
import { 
  FileText, 
  Download, 
  Clock, 
  Wrench, 
  ShieldAlert,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { cn } from '@/lib/utils';

interface MaintenanceMethodResultsProps {
  methodData: MaintenanceMethodData;
  onExportPDF?: () => void;
  onReset?: () => void;
}

export const MaintenanceMethodResults = ({
  methodData,
  onExportPDF,
  onReset
}: MaintenanceMethodResultsProps) => {
  const { maintenanceGuide, executiveSummary, summary, recommendations, eicrObservations } = methodData;
  const { isMobile } = useMobileEnhanced();
  
  // Step management state
  const [steps, setSteps] = useState<MaintenanceStep[]>(methodData.steps);

  const updateStep = (index: number, updated: MaintenanceStep) => {
    setSteps(prev => prev.map((step, i) => i === index ? updated : step));
  };

  const deleteStep = (index: number) => {
    setSteps(prev => prev.filter((_, i) => i !== index).map((step, i) => ({
      ...step,
      stepNumber: i + 1
    })));
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newSteps.length) return;
    
    [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
    
    // Renumber steps
    const renumbered = newSteps.map((step, i) => ({
      ...step,
      stepNumber: i + 1
    }));
    
    setSteps(renumbered);
  };

  const addNewStep = () => {
    const newStep: MaintenanceStep = {
      stepNumber: steps.length + 1,
      title: 'New Step',
      content: 'Add step description here...',
      estimatedDuration: '10-15 minutes',
      riskLevel: 'low'
    };
    setSteps(prev => [...prev, newStep]);
  };

  return (
    <div className={cn("space-y-6 pb-20", isMobile && "space-y-4")}>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="text-left flex-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Maintenance Instructions
              </CardTitle>
              <p className="text-sm text-foreground mt-1">
                {executiveSummary.equipmentType}
              </p>
            </div>
            <div className={cn(
              "flex gap-2",
              isMobile && "flex-col w-full"
            )}>
              {onReset && (
                <Button 
                  onClick={onReset}
                  className={cn(
                    "bg-gradient-to-r from-elec-yellow via-elec-yellow to-elec-yellow/90 text-black hover:scale-[1.02] active:scale-95 transition-all",
                    isMobile && "w-full"
                  )}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Generate New
                </Button>
              )}
              {onExportPDF && (
                <Button 
                  onClick={onExportPDF}
                  variant="outline"
                  className={cn(
                    "active:scale-95 transition-all",
                    isMobile && "w-full"
                  )}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-foreground leading-relaxed text-left">
            {maintenanceGuide}
          </div>
        </CardContent>
      </Card>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-left">Executive Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 text-left">
            <div>
              <span className="text-sm font-medium text-foreground">Equipment Type:</span>
              <p className="text-sm text-foreground">{executiveSummary.equipmentType}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">Maintenance Type:</span>
              <p className="text-sm text-foreground">{executiveSummary.maintenanceType}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">Recommended Frequency:</span>
              <p className="text-sm text-foreground">{executiveSummary.recommendedFrequency}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">Overall Condition:</span>
              <p className="text-sm text-foreground">{executiveSummary.overallCondition}</p>
            </div>
            {executiveSummary.estimatedAge && (
              <div>
                <span className="text-sm font-medium text-foreground">Estimated Age:</span>
                <p className="text-sm text-foreground">{executiveSummary.estimatedAge}</p>
              </div>
            )}
          </div>

          {executiveSummary.criticalFindings && executiveSummary.criticalFindings.length > 0 && (
            <div className="space-y-2 pt-2 border-t text-left">
              <div className="flex items-center gap-2 text-sm font-medium text-destructive">
                <AlertTriangle className="h-4 w-4" />
                Critical Findings
              </div>
              <ul className="space-y-1.5 ml-6">
                {executiveSummary.criticalFindings.map((finding, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-left">Maintenance Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">{summary.totalSteps}</p>
                <p className="text-xs text-foreground">Total Steps</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-left">
                <p className="text-lg font-semibold text-foreground">{summary.estimatedDuration}</p>
                <p className="text-xs text-foreground">Duration</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <ShieldAlert className="h-5 w-5 text-amber-400" />
              </div>
              <div className="text-left">
                <Badge variant={summary.overallRiskLevel === 'high' ? 'destructive' : summary.overallRiskLevel === 'medium' ? 'default' : 'secondary'}>
                  {summary.overallRiskLevel.toUpperCase()}
                </Badge>
                <p className="text-xs text-foreground mt-1">Risk Level</p>
              </div>
            </div>
          </div>

          {summary.toolsRequired && summary.toolsRequired.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-elec-yellow/30 bg-elec-yellow/5 p-3 rounded-lg text-left">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Wrench className="h-4 w-4 text-elec-yellow" />
                Required Tools ({summary.toolsRequired.length})
              </div>
              <div className="flex flex-wrap gap-1.5 ml-6">
                {summary.toolsRequired.map((tool, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-elec-yellow/20 text-foreground border-elec-yellow/30">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {summary.requiredQualifications && summary.requiredQualifications.length > 0 && (
            <div className="space-y-2 pt-2 text-left">
              <div className="text-sm font-medium text-foreground">Required Qualifications:</div>
              <div className="flex flex-wrap gap-1.5 ml-6">
                {summary.requiredQualifications.map((qual, idx) => (
                  <Badge key={idx} variant="outline" className="text-foreground">
                    {qual}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Maintenance Steps */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-foreground">
            <FileText className="h-5 w-5" />
            Detailed Maintenance Steps
          </h2>
          <Button
            onClick={addNewStep}
            variant="outline"
            size="sm"
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </div>
        {steps.map((step, index) => (
          <MaintenanceStepCard 
            key={step.stepNumber} 
            step={step}
            onUpdate={(updated) => updateStep(index, updated)}
            onDelete={() => deleteStep(index)}
            onMoveUp={index > 0 ? () => moveStep(index, 'up') : undefined}
            onMoveDown={index < steps.length - 1 ? () => moveStep(index, 'down') : undefined}
          />
        ))}
      </div>

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-left">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-left">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* EICR Observations */}
      {eicrObservations && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-left">EICR Observations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            {eicrObservations.c1Dangerous && eicrObservations.c1Dangerous.length > 0 && (
              <div>
                <Badge variant="destructive" className="mb-2">C1 - Danger Present</Badge>
                <ul className="space-y-1.5 ml-4">
                  {eicrObservations.c1Dangerous.map((obs, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-destructive mt-0.5">•</span>
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {eicrObservations.c2UrgentRemedial && eicrObservations.c2UrgentRemedial.length > 0 && (
              <div>
                <Badge variant="destructive" className="mb-2 bg-orange-500/20 text-orange-400 border-orange-500/30">
                  C2 - Potentially Dangerous
                </Badge>
                <ul className="space-y-1.5 ml-4">
                  {eicrObservations.c2UrgentRemedial.map((obs, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-orange-400 mt-0.5">•</span>
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {eicrObservations.c3Improvement && eicrObservations.c3Improvement.length > 0 && (
              <div>
                <Badge variant="secondary" className="mb-2">C3 - Improvement Recommended</Badge>
                <ul className="space-y-1.5 ml-4">
                  {eicrObservations.c3Improvement.map((obs, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {eicrObservations.fir && eicrObservations.fir.length > 0 && (
              <div>
                <Badge variant="outline" className="mb-2">FI - Further Investigation</Badge>
                <ul className="space-y-1.5 ml-4">
                  {eicrObservations.fir.map((obs, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
