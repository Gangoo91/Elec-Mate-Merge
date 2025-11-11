import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, AlertTriangle, Target, Wrench, TrendingUp } from "lucide-react";

interface TradeIntelligenceProps {
  tradeIntelligence: {
    materialsCompleteness: {
      status: 'green' | 'amber' | 'red';
      score: number;
      commentary: string;
      missingItems?: string[];
      recommendations?: string[];
    };
    labourRealism: {
      status: 'green' | 'amber' | 'red';
      score: number;
      commentary: string;
      benchmarkComparison?: string;
      concerns?: string[];
      recommendations?: string[];
    };
    futureWorkLogic: {
      status: 'green' | 'amber' | 'red';
      score: number;
      commentary: string;
      relevanceCheck?: string;
      concerns?: string[];
      recommendations?: string[];
    };
    overallAssessment: {
      readyToQuote: boolean;
      summary: string;
      criticalIssues?: string[];
    };
  };
}

const TradeIntelligenceCard = ({ tradeIntelligence }: TradeIntelligenceProps) => {
  const getStatusIcon = (status: 'green' | 'amber' | 'red') => {
    switch (status) {
      case 'green':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'amber':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'red':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status: 'green' | 'amber' | 'red', score: number) => {
    const colors = {
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      amber: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      red: 'bg-red-500/20 text-red-400 border-red-500/30'
    };

    return (
      <Badge variant="outline" className={colors[status]}>
        {status.toUpperCase()} ({score}%)
      </Badge>
    );
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Trade Intelligence - AI Self-Validation</CardTitle>
          </div>
          <Badge 
            variant="outline" 
            className={tradeIntelligence.overallAssessment.readyToQuote 
              ? 'bg-green-500/20 text-green-400 border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border-red-500/30'
            }
          >
            {tradeIntelligence.overallAssessment.readyToQuote ? '✓ Ready to Quote' : '⚠ Review Required'}
          </Badge>
        </div>
        <CardDescription>
          AI-powered quality check of materials, labour estimates, and future work suggestions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Assessment */}
        <div className="rounded-lg border border-border/50 bg-background/50 p-4">
          <p className="text-sm text-muted-foreground mb-2">Overall Assessment:</p>
          <p className="text-sm">{tradeIntelligence.overallAssessment.summary}</p>
          
          {tradeIntelligence.overallAssessment.criticalIssues && 
           tradeIntelligence.overallAssessment.criticalIssues.length > 0 && (
            <div className="mt-3 space-y-1">
              <p className="text-xs font-semibold text-red-400">Critical Issues:</p>
              {tradeIntelligence.overallAssessment.criticalIssues.map((issue, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-red-300">
                  <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 1. Materials Completeness */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(tradeIntelligence.materialsCompleteness.status)}
              <h4 className="text-sm font-semibold">📦 Materials Completeness</h4>
            </div>
            {getStatusBadge(
              tradeIntelligence.materialsCompleteness.status, 
              tradeIntelligence.materialsCompleteness.score
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">
            {tradeIntelligence.materialsCompleteness.commentary}
          </p>

          {tradeIntelligence.materialsCompleteness.missingItems && 
           tradeIntelligence.materialsCompleteness.missingItems.length > 0 && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 space-y-2">
              <p className="text-xs font-semibold text-red-400">Missing Items:</p>
              <ul className="space-y-1">
                {tradeIntelligence.materialsCompleteness.missingItems.map((item, idx) => (
                  <li key={idx} className="text-xs text-red-300 flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tradeIntelligence.materialsCompleteness.recommendations && 
           tradeIntelligence.materialsCompleteness.recommendations.length > 0 && (
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 space-y-2">
              <p className="text-xs font-semibold text-blue-400">Recommendations:</p>
              <ul className="space-y-1">
                {tradeIntelligence.materialsCompleteness.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-xs text-blue-300 flex items-start gap-2">
                    <Wrench className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 2. Labour Realism */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(tradeIntelligence.labourRealism.status)}
              <h4 className="text-sm font-semibold">⏱️ Labour Realism</h4>
            </div>
            {getStatusBadge(
              tradeIntelligence.labourRealism.status, 
              tradeIntelligence.labourRealism.score
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">
            {tradeIntelligence.labourRealism.commentary}
          </p>

          {tradeIntelligence.labourRealism.benchmarkComparison && (
            <div className="rounded-lg border border-border/50 bg-background/50 p-3">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold">Benchmark: </span>
                {tradeIntelligence.labourRealism.benchmarkComparison}
              </p>
            </div>
          )}

          {tradeIntelligence.labourRealism.concerns && 
           tradeIntelligence.labourRealism.concerns.length > 0 && (
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 space-y-2">
              <p className="text-xs font-semibold text-yellow-400">Concerns:</p>
              <ul className="space-y-1">
                {tradeIntelligence.labourRealism.concerns.map((concern, idx) => (
                  <li key={idx} className="text-xs text-yellow-300 flex items-start gap-2">
                    <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span>{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tradeIntelligence.labourRealism.recommendations && 
           tradeIntelligence.labourRealism.recommendations.length > 0 && (
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 space-y-2">
              <p className="text-xs font-semibold text-blue-400">Recommendations:</p>
              <ul className="space-y-1">
                {tradeIntelligence.labourRealism.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-xs text-blue-300 flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 3. Future Work Logic */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(tradeIntelligence.futureWorkLogic.status)}
              <h4 className="text-sm font-semibold">🎯 Future Work Logic</h4>
            </div>
            {getStatusBadge(
              tradeIntelligence.futureWorkLogic.status, 
              tradeIntelligence.futureWorkLogic.score
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">
            {tradeIntelligence.futureWorkLogic.commentary}
          </p>

          {tradeIntelligence.futureWorkLogic.relevanceCheck && (
            <div className="rounded-lg border border-border/50 bg-background/50 p-3">
              <p className="text-xs text-muted-foreground">
                {tradeIntelligence.futureWorkLogic.relevanceCheck}
              </p>
            </div>
          )}

          {tradeIntelligence.futureWorkLogic.concerns && 
           tradeIntelligence.futureWorkLogic.concerns.length > 0 && (
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 space-y-2">
              <p className="text-xs font-semibold text-yellow-400">Flagged:</p>
              <ul className="space-y-1">
                {tradeIntelligence.futureWorkLogic.concerns.map((concern, idx) => (
                  <li key={idx} className="text-xs text-yellow-300 flex items-start gap-2">
                    <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span>{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tradeIntelligence.futureWorkLogic.recommendations && 
           tradeIntelligence.futureWorkLogic.recommendations.length > 0 && (
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 space-y-2">
              <p className="text-xs font-semibold text-blue-400">Better Alternatives:</p>
              <ul className="space-y-1">
                {tradeIntelligence.futureWorkLogic.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-xs text-blue-300 flex items-start gap-2">
                    <TrendingUp className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeIntelligenceCard;
