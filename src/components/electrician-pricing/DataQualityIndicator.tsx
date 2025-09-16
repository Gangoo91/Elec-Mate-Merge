import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Shield, 
  Users, 
  TrendingUp,
  Info
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DataSource {
  name: string;
  confidence: number;
  lastUpdated: string;
  type: 'live' | 'cached' | 'estimated' | 'community';
  verificationLevel: 'verified' | 'reviewed' | 'submitted';
}

interface DataQualityProps {
  sources: DataSource[];
  overallConfidence: number;
  isStale?: boolean;
  totalDataPoints: number;
}

const DataQualityIndicator = ({ 
  sources, 
  overallConfidence, 
  isStale = false, 
  totalDataPoints 
}: DataQualityProps) => {
  
  const getQualityLevel = (confidence: number) => {
    if (confidence >= 85) return { level: 'High', color: 'text-green-400', bgColor: 'bg-green-500/10', icon: CheckCircle };
    if (confidence >= 70) return { level: 'Good', color: 'text-blue-400', bgColor: 'bg-blue-500/10', icon: TrendingUp };
    if (confidence >= 50) return { level: 'Moderate', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', icon: Clock };
    return { level: 'Low', color: 'text-red-400', bgColor: 'bg-red-500/10', icon: AlertTriangle };
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'live': return Shield;
      case 'cached': return Clock;
      case 'estimated': return TrendingUp;
      case 'community': return Users;
      default: return Info;
    }
  };

  const getVerificationBadge = (level: string) => {
    switch (level) {
      case 'verified':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Verified</Badge>;
      case 'reviewed':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Reviewed</Badge>;
      case 'submitted':
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">Submitted</Badge>;
      default:
        return null;
    }
  };

  const quality = getQualityLevel(overallConfidence);
  const QualityIcon = quality.icon;

  return (
    <TooltipProvider>
      <Card className={`border-elec-yellow/20 ${quality.bgColor} transition-all duration-200`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <QualityIcon className={`h-4 w-4 ${quality.color}`} />
              <span className="text-sm font-medium">Data Quality: {quality.level}</span>
              {isStale && (
                <Tooltip>
                  <TooltipTrigger>
                    <AlertTriangle className="h-3 w-3 text-yellow-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Data may be outdated. Refresh recommended.</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            
            <div className="text-xs text-muted-foreground">
              {totalDataPoints} data points
            </div>
          </div>

          {/* Confidence Score Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Confidence Score</span>
              <span>{overallConfidence}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  overallConfidence >= 85 ? 'bg-green-400' : 
                  overallConfidence >= 70 ? 'bg-blue-400' : 
                  overallConfidence >= 50 ? 'bg-yellow-400' : 'bg-red-400'
                }`}
                style={{ width: `${overallConfidence}%` }}
              ></div>
            </div>
          </div>

          {/* Data Sources */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Data Sources
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sources.map((source, index) => {
                const SourceIcon = getSourceIcon(source.type);
                return (
                  <div key={index} className="flex items-center justify-between p-2 rounded bg-elec-gray/30 border border-elec-yellow/10">
                    <div className="flex items-center gap-2">
                      <SourceIcon className="h-3 w-3 text-elec-yellow" />
                      <span className="text-xs font-medium">{source.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getVerificationBadge(source.verificationLevel)}
                      <span className="text-xs text-muted-foreground">{source.confidence}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quality Metrics */}
          <div className="mt-4 pt-3 border-t border-elec-yellow/10">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-elec-yellow">{sources.filter(s => s.type === 'live').length}</div>
                <div className="text-xs text-muted-foreground">Live Sources</div>
              </div>
              <div>
                <div className="text-lg font-bold text-elec-yellow">{sources.filter(s => s.verificationLevel === 'verified').length}</div>
                <div className="text-xs text-muted-foreground">Verified</div>
              </div>
              <div>
                <div className="text-lg font-bold text-elec-yellow">
                  {Math.round(sources.reduce((acc, s) => acc + s.confidence, 0) / sources.length)}%
                </div>
                <div className="text-xs text-muted-foreground">Avg Confidence</div>
              </div>
            </div>
          </div>

          {/* Improvement Suggestions */}
          {overallConfidence < 70 && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="text-sm font-medium text-yellow-400 mb-1">Improve Data Quality</h5>
                  <ul className="text-xs text-yellow-300 space-y-1">
                    <li>• Refresh data sources for latest information</li>
                    <li>• Add more regional data points</li>
                    <li>• Verify community submissions</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default DataQualityIndicator;