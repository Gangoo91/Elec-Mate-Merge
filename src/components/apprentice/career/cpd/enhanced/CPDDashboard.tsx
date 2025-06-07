
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Target, Award, TrendingUp, Calendar, Download, Plus } from "lucide-react";
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
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-elec-yellow/20 bg-elec-gray animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-elec-dark rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const getComplianceStatus = () => {
    if (stats.completionPercentage >= 100) return { status: "Compliant", color: "bg-green-500" };
    if (stats.completionPercentage >= 80) return { status: "On Track", color: "bg-green-400" };
    if (stats.completionPercentage >= 60) return { status: "Monitor", color: "bg-amber-400" };
    return { status: "Attention Needed", color: "bg-red-400" };
  };

  const compliance = getComplianceStatus();

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={onAddEntry} className="bg-elec-yellow text-elec-dark hover:bg-amber-400">
          <Plus className="mr-2 h-4 w-4" />
          Add CPD Entry
        </Button>
        <Button variant="outline" onClick={onViewHistory} className="border-elec-yellow/30">
          <Clock className="mr-2 h-4 w-4" />
          View History
        </Button>
        <Button variant="outline" onClick={onManageGoals} className="border-elec-yellow/30">
          <Target className="mr-2 h-4 w-4" />
          Manage Goals
        </Button>
        <Button variant="outline" onClick={handleExportPDF} className="border-elec-yellow/30">
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              Hours This Year
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-elec-yellow">{stats.hoursThisYear}</div>
            <p className="text-xs text-muted-foreground">of {stats.targetHours} target</p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-elec-yellow" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{stats.completionPercentage}%</div>
            <p className="text-xs text-muted-foreground">Target completion</p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-elec-yellow" />
              Days Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-400">{stats.daysRemaining}</div>
            <p className="text-xs text-muted-foreground">Until year end</p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="h-4 w-4 text-elec-yellow" />
              Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge className={`${compliance.color} text-white`}>
                {compliance.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Professional bodies</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            2024 CPD Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Annual Progress</span>
              <span>{stats.hoursThisYear} / {stats.targetHours} hours</span>
            </div>
            <Progress value={stats.completionPercentage} className="h-3" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Hours This Month:</span>
              <span className="ml-2 font-medium text-elec-yellow">{stats.hoursThisMonth}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Monthly Average:</span>
              <span className="ml-2 font-medium text-elec-yellow">{stats.averageHoursPerMonth.toFixed(1)}</span>
            </div>
          </div>
          {stats.completionPercentage < 100 && (
            <div className="text-sm text-muted-foreground">
              You need {stats.targetHours - stats.hoursThisYear} more hours to meet your annual target.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Hours by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.categoryBreakdown.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{category.category}</span>
                  <span className="text-sm text-muted-foreground">{category.hours} hours ({category.percentage}%)</span>
                </div>
                <div className="w-full bg-elec-dark rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-elec-yellow"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CPDDashboard;
