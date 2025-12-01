import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Wrench, 
  Clock, 
  ShieldCheck,
  CheckCircle2,
  Book
} from 'lucide-react';
import { MaintenanceStep } from '@/types/maintenance-method';

interface MaintenanceStepCardProps {
  step: MaintenanceStep;
}

export const MaintenanceStepCard = ({ step }: MaintenanceStepCardProps) => {
  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Card className="border-border/50 hover:border-border transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <span className="text-primary">Step {step.stepNumber}</span>
              <span className="text-foreground">{step.title}</span>
            </CardTitle>
          </div>
          {step.riskLevel && (
            <Badge variant={getRiskColor(step.riskLevel)} className="shrink-0">
              {step.riskLevel.toUpperCase()} RISK
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main Content */}
        <div className="text-sm text-muted-foreground leading-relaxed">
          {step.content}
        </div>

        {/* Duration */}
        {step.estimatedDuration && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Duration:</span>
            <span className="text-muted-foreground">{step.estimatedDuration}</span>
          </div>
        )}

        {/* Safety Information */}
        {step.safety && step.safety.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Safety Requirements
            </div>
            <ul className="space-y-1 ml-6">
              {step.safety.map((safety, idx) => {
                const safetyNote = typeof safety === 'string' ? safety : safety.note;
                return (
                  <li key={idx} className="text-sm text-muted-foreground list-disc">
                    {safetyNote}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Tools Required */}
        {step.toolsRequired && step.toolsRequired.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              Tools Required
            </div>
            <ul className="space-y-1 ml-6">
              {step.toolsRequired.map((tool, idx) => (
                <li key={idx} className="text-sm text-muted-foreground list-disc">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Inspection Checkpoints */}
        {step.inspectionCheckpoints && step.inspectionCheckpoints.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              Inspection Checkpoints
            </div>
            <ul className="space-y-1 ml-6">
              {step.inspectionCheckpoints.map((checkpoint, idx) => (
                <li key={idx} className="text-sm text-muted-foreground list-disc">
                  {checkpoint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* BS 7671 References */}
        {step.bsReferences && step.bsReferences.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Book className="h-4 w-4 text-muted-foreground" />
              BS 7671 References
            </div>
            <div className="flex flex-wrap gap-1.5 ml-6">
              {step.bsReferences.map((ref, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {ref}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Linked Hazards */}
        {step.linkedHazards && step.linkedHazards.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-destructive">
              <ShieldCheck className="h-4 w-4" />
              Linked Hazards
            </div>
            <ul className="space-y-1 ml-6">
              {step.linkedHazards.map((hazard, idx) => (
                <li key={idx} className="text-sm text-muted-foreground list-disc">
                  {hazard}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Qualifications */}
        {step.qualifications && step.qualifications.length > 0 && (
          <div className="pt-2 border-t border-border/50">
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Required Qualifications:</span>{' '}
              {step.qualifications.join(', ')}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
