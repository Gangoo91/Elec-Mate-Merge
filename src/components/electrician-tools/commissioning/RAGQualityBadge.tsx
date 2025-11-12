import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, AlertCircle, Database } from "lucide-react";

interface RAGQualityBadgeProps {
  practicalProceduresFound: number;
  regulationsFound: number;
  qualityScore: number; // 0-100
}

export const RAGQualityBadge = ({ 
  practicalProceduresFound, 
  regulationsFound, 
  qualityScore 
}: RAGQualityBadgeProps) => {
  const getColor = () => {
    if (qualityScore >= 70) return { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-300', icon: CheckCircle2 };
    if (qualityScore >= 40) return { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-300', icon: AlertTriangle };
    return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-300', icon: AlertCircle };
  };
  
  const getMessage = () => {
    if (qualityScore >= 70) return 'High-quality testing data retrieved';
    if (qualityScore >= 40) return 'Moderate testing data - procedures may be less detailed';
    return 'Insufficient testing data - results may be generic';
  };
  
  const getRecommendation = () => {
    if (qualityScore >= 70) return null;
    if (qualityScore >= 40) return 'Cross-reference with GN3 for additional detail';
    return 'Essential testing templates used - verify procedures with GN3 Guidance Note';
  };
  
  const colors = getColor();
  const Icon = colors.icon;
  
  return (
    <Card className={`p-4 ${colors.border} ${colors.bg} border-2`}>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Icon className={`h-5 w-5 ${colors.text} shrink-0 mt-0.5`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge 
                variant={qualityScore >= 70 ? 'default' : 'destructive'}
                className="shrink-0"
              >
                Quality: {qualityScore}%
              </Badge>
              <span className={`text-sm font-semibold ${colors.text}`}>
                {getMessage()}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
              <div className="flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5" />
                <span>
                  {practicalProceduresFound} practical procedures
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5" />
                <span>
                  {regulationsFound} BS 7671 regulations
                </span>
              </div>
            </div>
            {getRecommendation() && (
              <div className={`mt-2 text-xs ${colors.text} font-medium`}>
                💡 {getRecommendation()}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
