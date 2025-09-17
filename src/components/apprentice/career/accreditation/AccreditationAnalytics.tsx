
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Award, 
  Users, 
  Target,
  Clock,
  PoundSterling,
  MapPin,
  Zap
} from "lucide-react";

const AccreditationAnalytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Popular Accreditations */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-elec-yellow" />
            Most Popular
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/80">IET Professional</span>
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                95%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/80">NICEIC Approved</span>
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                92%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/80">ECA Membership</span>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">
                88%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Impact */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="h-4 w-4 text-elec-yellow" />
            Career Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-center">
            <div className="text-lg font-bold text-elec-yellow">£15k-£25k</div>
            <div className="text-xs text-white/80">Average salary increase</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">90%</div>
            <div className="text-xs text-white/80">Career advancement rate</div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            Quick Start
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/80">Entry Level</span>
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
              4 options
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/80">Under £300</span>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
              6 available
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/80">Online/Hybrid</span>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-xs">
              8 courses
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Investment Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <PoundSterling className="h-4 w-4 text-elec-yellow" />
            Investment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-center">
            <div className="text-lg font-bold text-elec-yellow">£200-£1500</div>
            <div className="text-xs text-white/80">Typical cost range</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-amber-400">4-18 months</div>
            <div className="text-xs text-white/80">ROI timeframe</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccreditationAnalytics;
