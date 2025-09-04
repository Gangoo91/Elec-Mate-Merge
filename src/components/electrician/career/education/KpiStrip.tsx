import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Award, Clock } from "lucide-react";
import { LiveEducationAnalytics } from "@/hooks/useLiveEducationData";

interface KpiStripProps {
  analytics: LiveEducationAnalytics | null;
  isFromCache: boolean;
  lastUpdated: string | null;
}

const KpiStrip = ({ analytics, isFromCache, lastUpdated }: KpiStripProps) => {
  const defaultAnalytics = {
    averageEmploymentRate: 94,
    totalProviders: 85,
    averageRating: 4.7,
    highDemandPrograms: 45
  };

  const data = analytics || defaultAnalytics;

  return (
    <Card className="border-elec-yellow/10 bg-elec-card">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="h-4 w-4 text-elec-yellow" />
                <span className="text-lg font-semibold text-elec-yellow">
                  {data.averageEmploymentRate}%
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Employment Rate</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="h-4 w-4 text-elec-yellow" />
                <span className="text-lg font-semibold text-elec-yellow">
                  {data.totalProviders}+
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Providers</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="h-4 w-4 text-elec-yellow" />
                <span className="text-lg font-semibold text-elec-yellow">
                  {data.averageRating}/5
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Avg Rating</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="h-4 w-4 text-elec-yellow" />
                <span className="text-lg font-semibold text-elec-yellow">
                  {data.highDemandPrograms}+
                </span>
              </div>
              <div className="text-xs text-muted-foreground">High Demand</div>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col items-end text-right gap-1">
            {isFromCache && (
              <Badge variant="warning" className="text-xs">
                Cached Data
              </Badge>
            )}
            {lastUpdated && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {new Date(lastUpdated).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiStrip;