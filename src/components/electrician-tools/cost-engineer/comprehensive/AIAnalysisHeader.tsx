import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

interface AIAnalysisHeaderProps {
  jobDescription?: string;
  complexity?: any;
  confidence?: any;
  riskAssessment?: any;
  recommendedQuote?: any;
}

const AIAnalysisHeader = ({
  jobDescription,
  complexity,
  confidence,
  riskAssessment,
  recommendedQuote
}: AIAnalysisHeaderProps) => {
  const getComplexityColor = (rating: number) => {
    if (rating <= 2) return "bg-green-500/20 text-green-500 border-green-500/30";
    if (rating <= 3) return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    return "bg-red-500/20 text-red-500 border-red-500/30";
  };

  const getConfidenceColor = (level: number) => {
    if (level >= 80) return "text-green-500";
    if (level >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getRiskColor = (severity: string) => {
    switch(severity) {
      case 'critical': return '🔴';
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const avgConfidence = confidence 
    ? Math.round((confidence.materials?.level + confidence.labour?.level) / 2)
    : 75;

  const highRisks = riskAssessment?.risks?.filter((r: any) => 
    r.severity === 'critical' || r.severity === 'high'
  ).length || 0;

  return (
    <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-elec-dark/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Brain className="h-7 w-7 text-elec-yellow" />
            <div>
              <CardTitle className="text-xl sm:text-2xl">AI Cost Engineer Analysis</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Comprehensive pricing and profitability assessment
              </p>
            </div>
          </div>
          
          {recommendedQuote && (
            <Badge className="bg-elec-yellow text-elec-dark px-3 py-1 text-sm font-bold">
              {recommendedQuote.tier.toUpperCase()} TIER
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Job Description */}
        {jobDescription && (
          <div className="p-4 rounded-lg bg-background/50 border border-border/50">
            <p className="text-sm leading-relaxed">{jobDescription}</p>
          </div>
        )}

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Complexity */}
          {complexity && (
            <div className="p-3 rounded-lg bg-background/30 border border-border/30">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Complexity</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold px-2 py-0.5 rounded border ${getComplexityColor(complexity.rating)}`}>
                  {complexity.rating}/5
                </span>
                <span className="text-sm font-medium">{complexity.label}</span>
              </div>
            </div>
          )}

          {/* Confidence */}
          {confidence && (
            <div className="p-3 rounded-lg bg-background/30 border border-border/30">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Confidence</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold ${getConfidenceColor(avgConfidence)}`}>
                  {avgConfidence}%
                </span>
                <span className="text-sm text-muted-foreground">accuracy</span>
              </div>
            </div>
          )}

          {/* Risk Level */}
          {riskAssessment && (
            <div className="p-3 rounded-lg bg-background/30 border border-border/30">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Risk Level</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  {highRisks > 0 ? '🔴' : '🟢'}
                </span>
                <span className="text-sm font-medium">
                  {highRisks > 0 ? `${highRisks} high risk${highRisks > 1 ? 's' : ''}` : 'Low risk'}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAnalysisHeader;
