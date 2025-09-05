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
    <Card className="mobile-card">
      <CardContent className="mobile-padding">
        <div className="flex flex-col gap-4">
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <span className="text-lg sm:text-xl font-semibold text-elec-yellow">
                  {data.averageEmploymentRate}%
                </span>
              </div>
              <div className="mobile-small-text text-text-subtle">Employment Rate</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Users className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <span className="text-lg sm:text-xl font-semibold text-elec-yellow">
                  {data.totalProviders}+
                </span>
              </div>
              <div className="mobile-small-text text-text-subtle">Providers</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Award className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <span className="text-lg sm:text-xl font-semibold text-elec-yellow">
                  {data.averageRating}/5
                </span>
              </div>
              <div className="mobile-small-text text-text-subtle">Avg Rating</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <span className="text-lg sm:text-xl font-semibold text-elec-yellow">
                  {data.highDemandPrograms}+
                </span>
              </div>
              <div className="mobile-small-text text-text-subtle">High Demand</div>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
            {isFromCache && (
              <Badge variant="warning" className="mobile-small-text w-fit">
                Cached Data
              </Badge>
            )}
            {lastUpdated && (
              <div className="flex items-center gap-2 mobile-small-text text-text-subtle">
                <Clock className="h-3 w-3 flex-shrink-0" />
                <span>Updated {new Date(lastUpdated).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiStrip;