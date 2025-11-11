import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, AlertTriangle, Target, Wrench, TrendingUp, Info } from "lucide-react";

interface TradeIntelligenceProps {
  tradeIntelligence: {
    materialsCompleteness: {
      status: 'green' | 'amber' | 'red';
      score: number;
      commentary: string;
      missingItems?: string[];
      recommendations?: string[];
      excessItems?: string[];
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
      status?: 'green' | 'amber' | 'red';
      summary: string;
      criticalIssues?: string[];
    };
  };
}

const TradeIntelligenceCard = ({ tradeIntelligence }: TradeIntelligenceProps) => {
  if (!tradeIntelligence) return null;

  const getStatusColor = (status: 'green' | 'amber' | 'red') => {
    switch (status) {
      case 'green':
        return 'text-green-400';
      case 'amber':
        return 'text-yellow-400';
      case 'red':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: 'green' | 'amber' | 'red') => {
    switch (status) {
      case 'green':
        return <CheckCircle className="h-6 w-6 text-green-400" />;
      case 'amber':
        return <AlertTriangle className="h-6 w-6 text-yellow-400" />;
      case 'red':
        return <AlertCircle className="h-6 w-6 text-red-400" />;
      default:
        return <Info className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: 'green' | 'amber' | 'red', score: number) => {
    const colors = {
      green: 'bg-green-500/20 text-green-300 border-2 border-green-500/40',
      amber: 'bg-yellow-500/20 text-yellow-300 border-2 border-yellow-500/40',
      red: 'bg-red-500/20 text-red-300 border-2 border-red-500/40'
    };
    
    const labels = {
      green: 'GOOD',
      amber: 'REVIEW',
      red: 'ISSUE'
    };

    return (
      <Badge 
        variant="outline" 
        className={`${colors[status]} text-base sm:text-sm font-bold px-4 py-1.5`}
      >
        {labels[status]} {score}%
      </Badge>
    );
  };

  return (
    <Card className="border-0 sm:border-2 border-elec-yellow/20 rounded-none sm:rounded-xl bg-gradient-to-br from-elec-card to-elec-dark/30 shadow-none sm:shadow-xl">
      <CardHeader className="px-4 py-5 sm:px-6 sm:py-6 bg-gradient-to-r from-blue-500/10 to-transparent border-b border-blue-500/20">
        <CardTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Target className="h-6 w-6 text-elec-yellow" />
          Trade Intelligence - AI Self-Validation
        </CardTitle>
        <CardDescription className="text-base sm:text-sm text-white/90 mt-2">
          AI-powered quality check of materials, labour estimates, and value-add suggestions to ensure compliance with BS7671:2018+A3:2024
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 py-5 sm:px-6 sm:py-6 space-y-6">
        {/* Overall Assessment */}
        <div className="rounded-xl border-2 border-green-500/30 bg-green-500/10 p-5">
          <div className="flex items-start gap-3 mb-3">
            <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-base font-bold text-white mb-2">Overall Assessment</h4>
              <p className="text-base text-white/90 leading-relaxed">
                {tradeIntelligence.overallAssessment.summary}
              </p>
            </div>
          </div>
          
          {tradeIntelligence.overallAssessment.criticalIssues && 
           tradeIntelligence.overallAssessment.criticalIssues.length > 0 && (
            <div className="mt-4 rounded-xl border-2 border-red-500/30 bg-red-500/10 p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="text-sm font-bold text-red-300">Critical Issues:</p>
              </div>
              <ul className="space-y-2">
                {tradeIntelligence.overallAssessment.criticalIssues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base sm:text-sm text-white">
                    <span className="text-red-400 text-xl">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Materials Completeness */}
        <div className="space-y-4 p-4 rounded-xl bg-background/20 border border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              {getStatusIcon(tradeIntelligence.materialsCompleteness.status)}
              <h4 className="text-lg sm:text-base font-bold text-white">
                📦 Materials Completeness
              </h4>
            </div>
            {getStatusBadge(
              tradeIntelligence.materialsCompleteness.status,
              tradeIntelligence.materialsCompleteness.score
            )}
          </div>
          
          <p className="text-base sm:text-sm text-white/90 leading-relaxed">
            {tradeIntelligence.materialsCompleteness.commentary}
          </p>

          {tradeIntelligence.materialsCompleteness.missingItems && 
           tradeIntelligence.materialsCompleteness.missingItems.length > 0 && (
            <div className="rounded-xl border-2 border-red-500/30 bg-red-500/10 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="text-sm font-bold text-red-300">Missing Items:</p>
              </div>
              <ul className="space-y-2">
                {tradeIntelligence.materialsCompleteness.missingItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base sm:text-sm text-white">
                    <span className="text-red-400 text-xl">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tradeIntelligence.materialsCompleteness.excessItems && 
           tradeIntelligence.materialsCompleteness.excessItems.length > 0 && (
            <div className="rounded-xl border-2 border-yellow-500/30 bg-yellow-500/10 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <p className="text-sm font-bold text-yellow-300">Potential Excess:</p>
              </div>
              <ul className="space-y-2">
                {tradeIntelligence.materialsCompleteness.excessItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base sm:text-sm text-white">
                    <span className="text-yellow-400 text-xl">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tradeIntelligence.materialsCompleteness.recommendations && 
           tradeIntelligence.materialsCompleteness.recommendations.length > 0 && (
            <div className="rounded-xl border-2 border-blue-500/30 bg-blue-500/10 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-400" />
                <p className="text-sm font-bold text-blue-300">Recommendations:</p>
              </div>
              <ul className="space-y-2">
                {tradeIntelligence.materialsCompleteness.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base sm:text-sm text-white">
                    <Wrench className="h-4 w-4 mt-1 flex-shrink-0 text-blue-400" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Labour Realism */}
        <div className="space-y-4 p-4 rounded-xl bg-background/20 border border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              {getStatusIcon(tradeIntelligence.labourRealism.status)}
              <h4 className="text-lg sm:text-base font-bold text-white">
                ⏱️ Labour Realism
              </h4>
            </div>
            {getStatusBadge(
              tradeIntelligence.labourRealism.status,
              tradeIntelligence.labourRealism.score
            )}
          </div>
          
          <p className="text-base sm:text-sm text-white/90 leading-relaxed">
            {tradeIntelligence.labourRealism.commentary}
          </p>

          {tradeIntelligence.labourRealism.benchmarkComparison && (
            <div className="rounded-xl border-2 border-blue-500/30 bg-blue-500/10 p-4">
              <p className="text-base sm:text-sm text-white/90">
                <span className="font-bold text-blue-300">Benchmark: </span>
                {tradeIntelligence.labourRealism.benchmarkComparison}
              </p>
            </div>
          )}

          {tradeIntelligence.labourRealism.concerns && 
           tradeIntelligence.labourRealism.concerns.length > 0 && (
            <div className="rounded-xl border-2 border-yellow-500/30 bg-yellow-500/10 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <p className="text-sm font-bold text-yellow-300">Concerns:</p>
              </div>
              <ul className="space-y-2">
                {tradeIntelligence.labourRealism.concerns.map((concern, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base sm:text-sm text-white">
                    <span className="text-yellow-400 text-xl">•</span>
                    <span>{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tradeIntelligence.labourRealism.recommendations && 
           tradeIntelligence.labourRealism.recommendations.length > 0 && (
            <div className="rounded-xl border-2 border-blue-500/30 bg-blue-500/10 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-400" />
                <p className="text-sm font-bold text-blue-300">Recommendations:</p>
              </div>
              <ul className="space-y-2">
                {tradeIntelligence.labourRealism.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base sm:text-sm text-white">
                    <Wrench className="h-4 w-4 mt-1 flex-shrink-0 text-blue-400" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Future Work Logic */}
        <div className="space-y-4 p-4 rounded-xl bg-background/20 border border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              {getStatusIcon(tradeIntelligence.futureWorkLogic.status)}
              <h4 className="text-lg sm:text-base font-bold text-white">
                🎯 Future Work Logic
              </h4>
            </div>
            {getStatusBadge(
              tradeIntelligence.futureWorkLogic.status,
              tradeIntelligence.futureWorkLogic.score
            )}
          </div>
          
          <p className="text-base sm:text-sm text-white/90 leading-relaxed">
            {tradeIntelligence.futureWorkLogic.commentary}
          </p>

          {tradeIntelligence.futureWorkLogic.relevanceCheck && (
            <div className="rounded-xl border-2 border-blue-500/30 bg-blue-500/10 p-4">
              <p className="text-base sm:text-sm text-white/90">
                {tradeIntelligence.futureWorkLogic.relevanceCheck}
              </p>
            </div>
          )}

          {tradeIntelligence.futureWorkLogic.concerns && 
           tradeIntelligence.futureWorkLogic.concerns.length > 0 && (
            <div className="rounded-xl border-2 border-yellow-500/30 bg-yellow-500/10 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <p className="text-sm font-bold text-yellow-300">Flagged:</p>
              </div>
              <ul className="space-y-2">
                {tradeIntelligence.futureWorkLogic.concerns.map((concern, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base sm:text-sm text-white">
                    <span className="text-yellow-400 text-xl">•</span>
                    <span>{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tradeIntelligence.futureWorkLogic.recommendations && 
           tradeIntelligence.futureWorkLogic.recommendations.length > 0 && (
            <div className="rounded-xl border-2 border-blue-500/30 bg-blue-500/10 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <p className="text-sm font-bold text-blue-300">Better Alternatives:</p>
              </div>
              <ul className="space-y-2">
                {tradeIntelligence.futureWorkLogic.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base sm:text-sm text-white">
                    <TrendingUp className="h-4 w-4 mt-1 flex-shrink-0 text-blue-400" />
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
