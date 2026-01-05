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
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-xl sm:text-lg font-bold text-foreground flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
          Pricing Confidence
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-4">
        {/* Materials Confidence */}
        {confidence.materials && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg sm:text-base font-medium text-foreground">Materials</span>
              <span className={`text-lg sm:text-base font-bold ${getConfidenceColor(confidence.materials.level)}`}>
                {confidence.materials.level}%
              </span>
            </div>
            <Progress value={confidence.materials.level} className="h-2" />
            <p className="text-base sm:text-sm text-foreground mt-1">
              {confidence.materials.reason}
            </p>
            {confidence.materials.factors && (
              <ul className="mt-2 space-y-2 text-left">
                {confidence.materials.factors.map((factor: string, idx: number) => (
                  <li key={idx} className="text-base sm:text-sm text-foreground flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
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
              <span className="text-lg sm:text-base font-medium text-foreground">Labour</span>
              <span className={`text-lg sm:text-base font-bold ${getConfidenceColor(confidence.labour.level)}`}>
                {confidence.labour.level}%
              </span>
            </div>
            <Progress value={confidence.labour.level} className="h-2" />
            <p className="text-base sm:text-sm text-foreground mt-1">
              {confidence.labour.reason}
            </p>
            {confidence.labour.factors && (
              <ul className="mt-2 space-y-2 text-left">
                {confidence.labour.factors.map((factor: string, idx: number) => (
                  <li key={idx} className="text-base sm:text-sm text-foreground flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Contingency */}
        {confidence.contingency && (
          <div className="p-4 sm:p-3 rounded-lg bg-background/50 border border-border/30">
            <div className="flex items-center justify-between">
              <span className="text-lg sm:text-base font-medium text-foreground">Contingency Buffer</span>
              <span className="text-lg sm:text-base font-bold text-elec-yellow">
                {confidence.contingency.percentage}%
              </span>
            </div>
            <p className="text-base sm:text-sm text-foreground mt-1">
              {confidence.contingency.reason}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingConfidenceCard;
