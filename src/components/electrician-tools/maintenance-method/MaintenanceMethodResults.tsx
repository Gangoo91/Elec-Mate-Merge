import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MaintenanceMethodData } from '@/types/maintenance-method';
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
  const { maintenanceGuide, executiveSummary, steps, summary, recommendations, eicrObservations } = methodData;
  const { isMobile } = useMobileEnhanced();

  return (
    <div className={cn("space-y-6 pb-20", isMobile && "space-y-4")}>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Maintenance Instructions
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
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
          <div className="text-sm text-muted-foreground leading-relaxed">
            {maintenanceGuide}
          </div>
        </CardContent>
      </Card>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Executive Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <span className="text-sm font-medium">Equipment Type:</span>
              <p className="text-sm text-muted-foreground">{executiveSummary.equipmentType}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Maintenance Type:</span>
              <p className="text-sm text-muted-foreground">{executiveSummary.maintenanceType}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Recommended Frequency:</span>
              <p className="text-sm text-muted-foreground">{executiveSummary.recommendedFrequency}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Overall Condition:</span>
              <p className="text-sm text-muted-foreground">{executiveSummary.overallCondition}</p>
            </div>
          </div>

          {executiveSummary.criticalFindings && executiveSummary.criticalFindings.length > 0 && (
            <div className="space-y-2 pt-2 border-t">
              <div className="flex items-center gap-2 text-sm font-medium text-destructive">
                <AlertTriangle className="h-4 w-4" />
                Critical Findings
              </div>
              <ul className="space-y-1 ml-6">
                {executiveSummary.criticalFindings.map((finding, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground list-disc">
                    {finding}
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
          <CardTitle className="text-lg">Maintenance Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{summary.totalSteps}</p>
                <p className="text-xs text-muted-foreground">Total Steps</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold">{summary.estimatedDuration}</p>
                <p className="text-xs text-muted-foreground">Duration</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShieldAlert className="h-5 w-5 text-primary" />
              </div>
              <div>
                <Badge variant={summary.overallRiskLevel === 'high' ? 'destructive' : 'default'}>
                  {summary.overallRiskLevel.toUpperCase()}
                </Badge>
                <p className="text-xs text-muted-foreground">Risk Level</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Wrench className="h-4 w-4" />
              Required Tools ({summary.toolsRequired.length})
            </div>
            <div className="flex flex-wrap gap-1.5 ml-6">
              {summary.toolsRequired.map((tool, idx) => (
                <Badge key={idx} variant="secondary">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Steps */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Detailed Maintenance Steps
        </h2>
        {steps.map((step) => (
          <MaintenanceStepCard key={step.stepNumber} step={step} />
        ))}
      </div>

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
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
            <CardTitle className="text-lg">EICR Observations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {eicrObservations.c1Dangerous && eicrObservations.c1Dangerous.length > 0 && (
              <div>
                <Badge variant="destructive" className="mb-2">C1 - Danger Present</Badge>
                <ul className="space-y-1 ml-4">
                  {eicrObservations.c1Dangerous.map((obs, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground list-disc">
                      {obs}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {eicrObservations.c2UrgentRemedial && eicrObservations.c2UrgentRemedial.length > 0 && (
              <div>
                <Badge variant="destructive" className="mb-2">C2 - Potentially Dangerous</Badge>
                <ul className="space-y-1 ml-4">
                  {eicrObservations.c2UrgentRemedial.map((obs, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground list-disc">
                      {obs}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {eicrObservations.c3Improvement && eicrObservations.c3Improvement.length > 0 && (
              <div>
                <Badge variant="secondary" className="mb-2">C3 - Improvement Recommended</Badge>
                <ul className="space-y-1 ml-4">
                  {eicrObservations.c3Improvement.map((obs, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground list-disc">
                      {obs}
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
