
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
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="pb-3 relative">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <TrendingUp className="h-4 w-4 text-elec-yellow" />
            </div>
            Most Popular
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 relative">
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
              <span className="text-xs text-white/80">IET Professional</span>
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                95%
              </Badge>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
              <span className="text-xs text-white/80">NICEIC Approved</span>
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                92%
              </Badge>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
              <span className="text-xs text-white/80">ECA Membership</span>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">
                88%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Impact */}
      <Card className="bg-gradient-to-br from-elec-gray to-green-950/20 border-green-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="pb-3 relative">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
              <Target className="h-4 w-4 text-green-400" />
            </div>
            Career Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 relative">
          <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-lg font-bold text-green-400">£15k-£25k</div>
            <div className="text-xs text-white/70">Average salary increase</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-lg font-bold text-green-400">90%</div>
            <div className="text-xs text-white/70">Career advancement rate</div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-gradient-to-br from-elec-gray to-blue-950/20 border-blue-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="pb-3 relative">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <Zap className="h-4 w-4 text-blue-400" />
            </div>
            Quick Start
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 relative">
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
            <span className="text-xs text-white/80">Entry Level</span>
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
              4 options
            </Badge>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
            <span className="text-xs text-white/80">Under £300</span>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
              6 available
            </Badge>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
            <span className="text-xs text-white/80">Online/Hybrid</span>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-xs">
              8 courses
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Investment Overview */}
      <Card className="bg-gradient-to-br from-elec-gray to-amber-950/20 border-amber-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="pb-3 relative">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30">
              <PoundSterling className="h-4 w-4 text-amber-400" />
            </div>
            Investment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 relative">
          <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-lg font-bold text-amber-400">£200-£1500</div>
            <div className="text-xs text-white/70">Typical cost range</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-lg font-bold text-amber-400">4-18 months</div>
            <div className="text-xs text-white/70">ROI timeframe</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccreditationAnalytics;
