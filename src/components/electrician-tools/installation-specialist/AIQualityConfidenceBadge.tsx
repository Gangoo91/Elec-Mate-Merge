import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle2, TrendingUp, Database, Brain } from "lucide-react";

interface QualityMetrics {
  overallConfidence: number; // 0-100
  ragDataQuality: 'excellent' | 'good' | 'fair' | 'poor';
  bs7671Coverage: number; // Number of regulations found
  practicalWorkCoverage: number; // Number of procedures found
  stage: 'initializing' | 'rag' | 'ai' | 'generation' | 'validation' | 'complete';
}

interface AIQualityConfidenceBadgeProps {
  metrics?: QualityMetrics;
  isGenerating: boolean;
}

export const AIQualityConfidenceBadge = ({ metrics, isGenerating }: AIQualityConfidenceBadgeProps) => {
  if (!isGenerating || !metrics) return null;

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 80) return 'High Confidence';
    if (confidence >= 60) return 'Moderate Confidence';
    return 'Low Confidence';
  };

  const getRAGQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'bg-green-500/20 border-green-500/40 text-green-400';
      case 'good': return 'bg-blue-500/20 border-blue-500/40 text-blue-400';
      case 'fair': return 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400';
      case 'poor': return 'bg-red-500/20 border-red-500/40 text-red-400';
      default: return 'bg-muted/20 border-border text-muted-foreground';
    }
  };

  const getRAGQualityIcon = () => {
    switch (metrics.ragDataQuality) {
      case 'excellent': return <CheckCircle2 className="h-4 w-4" />;
      case 'good': return <TrendingUp className="h-4 w-4" />;
      case 'fair': return <AlertTriangle className="h-4 w-4" />;
      case 'poor': return <AlertTriangle className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  const showWarning = metrics.overallConfidence < 60 || metrics.ragDataQuality === 'poor' || metrics.ragDataQuality === 'fair';

  return (
    <Card className={`border-2 transition-all duration-300 ${
      showWarning 
        ? 'border-yellow-500/40 bg-yellow-500/10' 
        : 'border-blue-500/30 bg-blue-500/10'
    }`}>
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className={`h-5 w-5 ${getConfidenceColor(metrics.overallConfidence)}`} />
            <span className="font-semibold text-sm">Quality Monitor</span>
          </div>
          <Badge variant="outline" className={getRAGQualityColor(metrics.ragDataQuality)}>
            {getRAGQualityIcon()}
            <span className="ml-1.5">{(metrics.ragDataQuality || 'unknown').toUpperCase()}</span>
          </Badge>
        </div>

        {/* Confidence Score */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Overall Confidence</span>
            <span className={`text-2xl font-bold ${getConfidenceColor(metrics.overallConfidence)}`}>
              {metrics.overallConfidence}%
            </span>
          </div>
          <div className="h-2 bg-elec-dark rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                metrics.overallConfidence >= 80 ? 'bg-green-500' :
                metrics.overallConfidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${metrics.overallConfidence}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {getConfidenceLabel(metrics.overallConfidence)}
          </p>
        </div>

        {/* RAG Data Coverage */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/50">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Database className="h-3 w-3" />
              <span>BS 7671 Regulations</span>
            </div>
            <div className="text-xl font-bold text-blue-400">
              {metrics.bs7671Coverage}
            </div>
            <p className="text-xs text-muted-foreground">regulations found</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Brain className="h-3 w-3" />
              <span>Work Procedures</span>
            </div>
            <div className="text-xl font-bold text-purple-400">
              {metrics.practicalWorkCoverage}
            </div>
            <p className="text-xs text-muted-foreground">procedures found</p>
          </div>
        </div>

        {/* Warning Message */}
        {showWarning && (
          <div className="mt-3 p-3 bg-yellow-500/20 border border-yellow-500/40 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-yellow-400">
                  {metrics.ragDataQuality === 'poor' ? 'Insufficient Knowledge Base Data' :
                   metrics.overallConfidence < 60 ? 'Lower Than Expected Confidence' :
                   'Limited Regulatory Coverage'}
                </p>
                <p className="text-xs text-yellow-300 mt-1">
                  {metrics.ragDataQuality === 'poor' 
                    ? 'The knowledge base has limited information for this installation type. Results may be generic.'
                    : 'Some installation details may require manual verification with BS 7671.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stage Indicator */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border/50">
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          <span>
            {metrics.stage === 'rag' && 'Searching knowledge base...'}
            {metrics.stage === 'ai' && 'Analysing requirements...'}
            {metrics.stage === 'generation' && 'Generating installation steps...'}
            {metrics.stage === 'validation' && 'Validating compliance...'}
            {metrics.stage === 'complete' && 'Quality check complete'}
            {metrics.stage === 'initializing' && 'Starting quality monitoring...'}
          </span>
        </div>
      </div>
    </Card>
  );
};
