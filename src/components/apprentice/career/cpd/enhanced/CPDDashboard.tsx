
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Target, Award, TrendingUp, Calendar, Download, Plus, BarChart3 } from "lucide-react";
import { useCPDData } from "@/hooks/cpd/useCPDData";
import { cpdExportService } from "@/services/cpdExportService";

interface CPDDashboardProps {
  onAddEntry: () => void;
  onViewHistory: () => void;
  onManageGoals: () => void;
}

const CPDDashboard = ({ onAddEntry, onViewHistory, onManageGoals }: CPDDashboardProps) => {
  const { stats, entries, goals, loading } = useCPDData();

  const handleExportPDF = () => {
    if (stats && entries && goals) {
      cpdExportService.exportToPDF(entries, stats, goals);
    }
  };

  const handleExportCSV = () => {
    if (entries) {
      cpdExportService.exportToCSV(entries);
    }
  };

  if (loading || !stats) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <CardContent className="p-6 relative">
                <div className="h-16 bg-white/10 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const getComplianceStatus = () => {
    if (stats.completionPercentage >= 100) return { status: "Compliant", color: "bg-green-500/10 text-green-400 border-green-500/30" };
    if (stats.completionPercentage >= 80) return { status: "On Track", color: "bg-green-500/10 text-green-400 border-green-500/30" };
    if (stats.completionPercentage >= 60) return { status: "Monitor", color: "bg-amber-500/10 text-amber-400 border-amber-500/30" };
    return { status: "Attention Needed", color: "bg-red-500/10 text-red-400 border-red-500/30" };
  };

  const compliance = getComplianceStatus();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={onAddEntry}
          className="h-11 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 touch-manipulation active:scale-95 transition-all"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add CPD Entry
        </Button>
        <Button
          variant="outline"
          onClick={onViewHistory}
          className="h-11 border-white/20 hover:bg-white/10 touch-manipulation active:scale-95 transition-all"
        >
          <Clock className="mr-2 h-4 w-4" />
          View History
        </Button>
        <Button
          variant="outline"
          onClick={onManageGoals}
          className="h-11 border-white/20 hover:bg-white/10 touch-manipulation active:scale-95 transition-all"
        >
          <Target className="mr-2 h-4 w-4" />
          Manage Goals
        </Button>
        <Button
          variant="outline"
          onClick={handleExportPDF}
          className="h-11 border-white/20 hover:bg-white/10 touch-manipulation active:scale-95 transition-all"
        >
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="pb-3 relative">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                <Clock className="h-4 w-4 text-elec-yellow" />
              </div>
              Hours This Year
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-elec-yellow">{stats.hoursThisYear}</div>
            <p className="text-xs text-white/70">of {stats.targetHours} target</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-elec-gray to-green-950/20 border-green-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="pb-3 relative">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                <Target className="h-4 w-4 text-green-400" />
              </div>
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-green-400">{stats.completionPercentage}%</div>
            <p className="text-xs text-white/70">Target completion</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-elec-gray to-amber-950/20 border-amber-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="pb-3 relative">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30">
                <Calendar className="h-4 w-4 text-amber-400" />
              </div>
              Days Remaining
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-amber-400">{stats.daysRemaining}</div>
            <p className="text-xs text-white/70">Until year end</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-elec-gray to-blue-950/20 border-blue-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="pb-3 relative">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
                <Award className="h-4 w-4 text-blue-400" />
              </div>
              Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <Badge variant="outline" className={compliance.color}>
              {compliance.status}
            </Badge>
            <p className="text-xs text-white/70 mt-2">Professional bodies</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
            </div>
            {new Date().getFullYear()} CPD Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white">
              <span>Annual Progress</span>
              <span className="text-elec-yellow font-medium">{stats.hoursThisYear} / {stats.targetHours} hours</span>
            </div>
            <Progress value={stats.completionPercentage} className="h-3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-xs text-white/60">Hours This Month</span>
              <div className="text-lg font-bold text-elec-yellow">{stats.hoursThisMonth}</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-xs text-white/60">Monthly Average</span>
              <div className="text-lg font-bold text-elec-yellow">{stats.averageHoursPerMonth.toFixed(1)}</div>
            </div>
          </div>
          {stats.completionPercentage < 100 && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-400">
                You need <span className="font-bold">{stats.targetHours - stats.hoursThisYear}</span> more hours to meet your annual target.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <BarChart3 className="h-5 w-5 text-elec-yellow" />
            </div>
            Hours by Category
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            {stats.categoryBreakdown.map((category, index) => {
              const colors = [
                { bar: "bg-elec-yellow", text: "text-elec-yellow" },
                { bar: "bg-blue-500", text: "text-blue-400" },
                { bar: "bg-green-500", text: "text-green-400" },
                { bar: "bg-purple-500", text: "text-purple-400" },
                { bar: "bg-amber-500", text: "text-amber-400" },
              ];
              const color = colors[index % colors.length];
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white">{category.category}</span>
                    <span className="text-sm text-white/70">{category.hours} hours <span className={color.text}>({category.percentage}%)</span></span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${color.bar} transition-all duration-500`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CPDDashboard;
