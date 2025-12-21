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
  Plus,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { cn } from '@/lib/utils';
import { StickyGenerateButton } from '../commissioning/StickyGenerateButton';

interface MaintenanceMethodResultsProps {
  methodData: MaintenanceMethodData;
  onExportPDF?: () => void;
  onReset?: () => void;
}

// Helper to extract short duration from long text
const getShortDuration = (duration: string): string => {
  const match = duration.match(/(\d+\.?\d*\s*(?:to|-)\s*\d+\.?\d*\s*(?:hours?|hrs?|minutes?|mins?))/i);
  if (match) return match[1];
  const hoursMatch = duration.match(/(\d+\.?\d*)\s*(?:hours?|hrs?)/i);
  if (hoursMatch) return `${hoursMatch[1]} hrs`;
  return duration.length > 20 ? duration.slice(0, 20) + '...' : duration;
};

export const MaintenanceMethodResults = ({
  methodData,
  onExportPDF,
  onReset
}: MaintenanceMethodResultsProps) => {
  const { maintenanceGuide, executiveSummary, summary, recommendations } = methodData;
  const { isMobile } = useMobileEnhanced();
  
  // Step management state
  const [steps, setSteps] = useState<MaintenanceStep[]>(methodData.steps);
  const [durationExpanded, setDurationExpanded] = useState(false);
  const [overviewExpanded, setOverviewExpanded] = useState(false);

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
    <div className={cn("space-y-6", isMobile ? "space-y-4 pb-32" : "pb-8")}>
      {/* Header */}
      <Card>
        <CardHeader className={isMobile ? "pb-3" : ""}>
          <div className={cn(
            "flex gap-3",
            isMobile ? "flex-col" : "items-start justify-between"
          )}>
            <div className="text-left flex-1">
              <CardTitle className={cn(
                "flex items-center gap-2",
                isMobile ? "text-xl" : "text-2xl"
              )}>
                <FileText className={cn(isMobile ? "h-5 w-5" : "h-6 w-6", "text-primary")} />
                Maintenance Instructions
              </CardTitle>
              <p className={cn(
                "text-foreground mt-1",
                isMobile ? "text-xs line-clamp-2" : "text-sm"
              )}>
                {executiveSummary.equipmentType}
              </p>
            </div>
            {onReset && (
              <Button 
                onClick={onReset}
                variant="outline"
                size={isMobile ? "default" : "sm"}
                className={cn(
                  "touch-manipulation",
                  isMobile ? "w-full h-12" : "shrink-0"
                )}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Maintenance Method
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-foreground leading-relaxed text-left">
            {isMobile && !overviewExpanded ? (
              <>
                <p className="line-clamp-4">{maintenanceGuide}</p>
                {maintenanceGuide.length > 200 && (
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => setOverviewExpanded(true)}
                    className="p-0 h-auto text-elec-yellow mt-2 font-medium"
                  >
                    Show more
                  </Button>
                )}
              </>
            ) : (
              <>
                <p>{maintenanceGuide}</p>
                {isMobile && maintenanceGuide.length > 200 && (
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => setOverviewExpanded(false)}
                    className="p-0 h-auto text-elec-yellow mt-2 font-medium"
                  >
                    Show less
                  </Button>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Executive Summary */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-card via-elec-card to-elec-card/50">
        <CardHeader className="border-b border-elec-yellow/20 pb-4">
          <CardTitle className={cn(
            "font-bold text-left text-foreground",
            isMobile ? "text-lg leading-tight" : "text-2xl"
          )}>
            {executiveSummary.equipmentType}
          </CardTitle>
          {!isMobile && <div className="h-1 w-16 bg-elec-yellow rounded-full mt-2"></div>}
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Key Information Grid */}
          <div className="grid gap-4 sm:grid-cols-2 text-left">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Wrench className="h-5 w-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-medium text-foreground/70 uppercase tracking-wide">Equipment Type</span>
                <p className="text-sm font-semibold text-foreground mt-0.5">{executiveSummary.equipmentType}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
              <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-medium text-foreground/70 uppercase tracking-wide">Maintenance Type</span>
                <p className="text-sm font-semibold text-foreground mt-0.5">{executiveSummary.maintenanceType}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-medium text-foreground/70 uppercase tracking-wide">Frequency</span>
                <p className="text-sm font-semibold text-foreground mt-0.5">{executiveSummary.recommendedFrequency}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-medium text-foreground/70 uppercase tracking-wide">Condition</span>
                <p className="text-sm font-semibold text-foreground mt-0.5">{executiveSummary.overallCondition}</p>
              </div>
            </div>

            {executiveSummary.estimatedAge && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                <div className="h-10 w-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-medium text-foreground/70 uppercase tracking-wide">Estimated Age</span>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{executiveSummary.estimatedAge}</p>
                </div>
              </div>
            )}
          </div>

          {/* Critical Findings */}
          {executiveSummary.criticalFindings && executiveSummary.criticalFindings.length > 0 && (
            <div className="space-y-3 p-4 rounded-lg bg-destructive/5 border-2 border-destructive/30 text-left">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </div>
                <span className="text-sm font-bold text-destructive uppercase tracking-wide">Critical Findings</span>
              </div>
              <ul className="space-y-2">
                {executiveSummary.criticalFindings.map((finding, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-2 bg-background/50 p-2 rounded">
                    <span className="text-destructive mt-0.5 font-bold">•</span>
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
        <CardHeader className={isMobile ? "pb-2" : ""}>
          <CardTitle className="text-lg text-left">Maintenance Overview</CardTitle>
        </CardHeader>
        <CardContent className={cn("space-y-4", isMobile && "space-y-3")}>
          {isMobile ? (
            /* Mobile-optimised compact layout */
            <div className="space-y-3">
              {/* Compact stats row */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-bold text-foreground">{summary.totalSteps}</p>
                    <p className="text-xs text-foreground/70">Steps</p>
                  </div>
                </div>
                <Badge 
                  variant={summary.overallRiskLevel === 'high' ? 'destructive' : summary.overallRiskLevel === 'medium' ? 'default' : 'secondary'}
                  className="text-xs px-2 py-1"
                >
                  {summary.overallRiskLevel.toUpperCase()} RISK
                </Badge>
              </div>

              {/* Expandable duration section */}
              <div 
                className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20 touch-manipulation cursor-pointer"
                onClick={() => setDurationExpanded(!durationExpanded)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-semibold text-foreground">
                      {getShortDuration(summary.estimatedDuration)}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    {durationExpanded ? (
                      <ChevronUp className="h-4 w-4 text-foreground/70" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-foreground/70" />
                    )}
                  </Button>
                </div>
                {durationExpanded && (
                  <p className="text-xs text-foreground/80 mt-2 leading-relaxed animate-fade-in">
                    {summary.estimatedDuration}
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* Desktop layout */
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
          )}

          {summary.toolsRequired && summary.toolsRequired.length > 0 && (
            <div className={cn(
              "space-y-2 pt-2 border-t border-elec-yellow/30 bg-elec-yellow/5 rounded-lg text-left",
              isMobile ? "p-2.5" : "p-3"
            )}>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Wrench className="h-4 w-4 text-elec-yellow" />
                Required Tools ({summary.toolsRequired.length})
              </div>
              <div className={cn("flex flex-wrap gap-1.5", isMobile ? "ml-4" : "ml-6")}>
                {summary.toolsRequired.map((tool, idx) => (
                  <Badge key={idx} variant="secondary" className={cn(
                    "bg-elec-yellow/20 text-foreground border-elec-yellow/30",
                    isMobile && "text-xs"
                  )}>
                    {tool}
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

      {/* Sticky Export PDF Button */}
      {onExportPDF && (
        <StickyGenerateButton>
          <Button 
            onClick={onExportPDF}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-elec-yellow via-elec-yellow to-elec-yellow/90 text-black hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Download className="h-5 w-5 mr-2" />
            Export PDF
          </Button>
        </StickyGenerateButton>
      )}
    </div>
  );
};
