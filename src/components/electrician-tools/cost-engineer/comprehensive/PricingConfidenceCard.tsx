import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

interface PricingConfidenceCardProps {
  confidence: any;
}

const PricingConfidenceCard = ({ confidence }: PricingConfidenceCardProps) => {
  const getConfidenceColor = (level: number) => {
    if (level >= 80) return "text-green-500";
    if (level >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getProgressColor = (level: number) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
          Pricing Confidence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Materials Confidence */}
        {confidence.materials && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Materials</span>
              <span className={`text-sm font-bold ${getConfidenceColor(confidence.materials.level)}`}>
                {confidence.materials.level}%
              </span>
            </div>
            <Progress value={confidence.materials.level} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {confidence.materials.reason}
            </p>
            {confidence.materials.factors && (
              <ul className="mt-2 space-y-0.5">
                {confidence.materials.factors.map((factor: string, idx: number) => (
                  <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                    <span>•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Labour Confidence */}
        {confidence.labour && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Labour</span>
              <span className={`text-sm font-bold ${getConfidenceColor(confidence.labour.level)}`}>
                {confidence.labour.level}%
              </span>
            </div>
            <Progress value={confidence.labour.level} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {confidence.labour.reason}
            </p>
            {confidence.labour.factors && (
              <ul className="mt-2 space-y-0.5">
                {confidence.labour.factors.map((factor: string, idx: number) => (
                  <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                    <span>•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Contingency */}
        {confidence.contingency && (
          <div className="p-3 rounded-lg bg-background/50 border border-border/30">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Contingency Buffer</span>
              <span className="text-sm font-bold text-elec-yellow">
                {confidence.contingency.percentage}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {confidence.contingency.reason}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingConfidenceCard;
