import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, CheckCircle2, AlertTriangle } from "lucide-react";

interface QuickMetricsCardProps {
  complexity?: any;
  confidence?: any;
  riskAssessment?: any;
}

const QuickMetricsCard = ({
  complexity,
  confidence,
  riskAssessment
}: QuickMetricsCardProps) => {
  const getComplexityColor = (rating: number) => {
    if (rating <= 2) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (rating <= 3) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  const getConfidenceColor = (level: number) => {
    if (level >= 80) return "text-green-400";
    if (level >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const avgConfidence = confidence 
    ? Math.round((confidence.materials?.level + confidence.labour?.level) / 2)
    : 75;

  const highRisks = riskAssessment?.risks?.filter((r: any) => 
    r.severity === 'critical' || r.severity === 'high'
  ).length || 0;

  return (
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl bg-gradient-to-br from-elec-card to-elec-dark/50">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5 bg-gradient-to-r from-blue-500/10 to-transparent border-b border-blue-500/20">
        <CardTitle className="text-xl sm:text-2xl font-bold text-white">
          📊 Job Snapshot
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-4 py-5 sm:px-6 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Complexity */}
          {complexity && (
            <div className="p-4 rounded-lg bg-background/30 border border-border/30 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-white/70" />
                <span className="text-sm text-white/90 font-semibold">Complexity</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className={`text-2xl font-bold px-3 py-1 rounded-lg border-2 ${getComplexityColor(complexity.rating)}`}>
                  {complexity.rating}/5
                </span>
                <span className="text-base font-medium text-white mt-1">{complexity.label}</span>
              </div>
            </div>
          )}

          {/* Confidence */}
          {confidence && (
            <div className="p-4 rounded-lg bg-background/30 border border-border/30 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <CheckCircle2 className="h-5 w-5 text-white/70" />
                <span className="text-sm text-white/90 font-semibold">Confidence</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className={`text-2xl font-bold ${getConfidenceColor(avgConfidence)}`}>
                  {avgConfidence}%
                </span>
                <span className="text-base text-white/90 mt-1">Accuracy</span>
              </div>
            </div>
          )}

          {/* Risk Level */}
          {riskAssessment && (
            <div className="p-4 rounded-lg bg-background/30 border border-border/30 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-white/70" />
                <span className="text-sm text-white/90 font-semibold">Risk Level</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl">
                  {highRisks > 0 ? '🔴' : '🟢'}
                </span>
                <span className="text-base font-medium text-white mt-1">
                  {highRisks > 0 ? `${highRisks} High Risk${highRisks > 1 ? 's' : ''}` : 'Low Risk'}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickMetricsCard;
