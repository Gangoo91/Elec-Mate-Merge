
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Plus, Target, Calendar, TrendingUp, ChevronRight, Download } from "lucide-react";
import { useCPDData } from "@/hooks/cpd/useCPDData";
import { cpdExportService } from "@/services/cpdExportService";

interface MobileCPDTrackerProps {
  onAddEntry: () => void;
  onViewEntry: (id: string) => void;
  onViewHistory: () => void;
}

const MobileCPDTracker = ({ onAddEntry, onViewEntry, onViewHistory }: MobileCPDTrackerProps) => {
  const { stats, entries, goals, loading } = useCPDData();
  const [activeTab, setActiveTab] = useState<'overview' | 'recent' | 'goals'>('overview');

  if (loading || !stats) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="h-14 bg-gradient-to-br from-elec-gray to-elec-card rounded-xl animate-pulse border border-elec-yellow/20"></div>
        <div className="h-32 bg-gradient-to-br from-elec-gray to-elec-card rounded-xl animate-pulse border border-elec-yellow/20"></div>
        <div className="h-12 bg-white/5 rounded-lg animate-pulse"></div>
        <div className="h-40 bg-gradient-to-br from-elec-gray to-elec-card rounded-xl animate-pulse border border-elec-yellow/20"></div>
      </div>
    );
  }

  const recentEntries = entries.slice(0, 3);
  const activeGoals = goals.filter(goal => goal.status === 'Active').slice(0, 2);

  const getComplianceColor = () => {
    if (stats.completionPercentage >= 100) return "text-green-400";
    if (stats.completionPercentage >= 80) return "text-green-400";
    if (stats.completionPercentage >= 60) return "text-amber-400";
    return "text-red-400";
  };

  const handleQuickExport = () => {
    if (stats && entries && goals) {
      cpdExportService.exportToPDF(entries, stats, goals);
    }
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Quick Add Button - Sticky */}
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm py-3 -mx-4 px-4 border-b border-white/10">
        <Button
          onClick={onAddEntry}
          className="w-full h-12 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 touch-manipulation active:scale-95 transition-all font-medium text-base"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add CPD Entry
        </Button>
      </div>

      {/* Key Metrics - Compact */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <CardContent className="p-4 relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-elec-yellow">{stats.hoursThisYear}</div>
              <div className="text-xs text-white/70">Hours This Year</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
              <div className={`text-2xl font-bold ${getComplianceColor()}`}>{stats.completionPercentage}%</div>
              <div className="text-xs text-white/70">Progress</div>
            </div>
          </div>
          <div className="mt-4 space-y-2 p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex justify-between text-sm text-white">
              <span>Annual Target</span>
              <span className="text-elec-yellow font-medium">{stats.hoursThisYear} / {stats.targetHours} hours</span>
            </div>
            <Progress value={stats.completionPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-white/5 rounded-xl p-1 border border-white/10">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'recent', label: 'Recent', icon: Clock },
          { id: 'goals', label: 'Goals', icon: Target },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-sm font-medium transition-all touch-manipulation ${
                activeTab === tab.id
                  ? 'bg-elec-yellow text-elec-dark'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-gradient-to-br from-elec-gray to-amber-950/20 border-amber-500/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
              <CardContent className="p-4 text-center relative">
                <div className="text-2xl font-bold text-amber-400">{stats.daysRemaining}</div>
                <div className="text-xs text-white/70">Days Left</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-elec-gray to-blue-950/20 border-blue-500/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
              <CardContent className="p-4 text-center relative">
                <div className="text-2xl font-bold text-blue-400">{stats.hoursThisMonth}</div>
                <div className="text-xs text-white/70">This Month</div>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown - Top 3 */}
          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <CardHeader className="pb-3 relative">
              <CardTitle className="text-sm text-white">Top Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 relative">
              {stats.categoryBreakdown.slice(0, 3).map((category, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-xs font-medium text-white">{category.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-elec-yellow font-medium">{category.hours}h</span>
                    <div className="w-16 bg-white/10 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-elec-yellow transition-all"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'recent' && (
        <div className="space-y-3">
          {recentEntries.map((entry) => (
            <Card
              key={entry.id}
              className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 hover:border-elec-yellow/30 cursor-pointer transition-all overflow-hidden relative touch-manipulation active:scale-[0.98]"
              onClick={() => onViewEntry(entry.id)}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-elec-yellow/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-4 relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 flex-1 min-w-0">
                    <h3 className="font-medium text-white text-sm line-clamp-2">{entry.activity}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2 py-1 rounded bg-white/5 text-white/70">{entry.date}</span>
                      <span className="px-2 py-1 rounded bg-elec-yellow/10 text-elec-yellow font-medium">{entry.hours}h</span>
                      <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                        {entry.status}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/50 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            variant="outline"
            onClick={onViewHistory}
            className="w-full h-11 border-white/20 hover:bg-white/10 touch-manipulation active:scale-95 transition-all"
          >
            View All Entries
          </Button>
        </div>
      )}

      {activeTab === 'goals' && (
        <div className="space-y-3">
          {activeGoals.map((goal) => (
            <Card key={goal.id} className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-elec-yellow/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
              <CardContent className="p-4 relative">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-white text-sm">{goal.title}</h3>
                    <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                      {goal.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 p-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex justify-between text-xs text-white">
                      <span className="text-white/60">Progress</span>
                      <span className="text-elec-yellow font-medium">{goal.currentHours} / {goal.targetHours} hours</span>
                    </div>
                    <Progress
                      value={(goal.currentHours / goal.targetHours) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Calendar className="h-3.5 w-3.5 text-elec-yellow" />
                    <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {activeGoals.length === 0 && (
            <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <CardContent className="p-6 text-center relative">
                <div className="p-3 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 w-fit mx-auto mb-3">
                  <Target className="h-6 w-6 text-white/50" />
                </div>
                <p className="text-sm text-white font-medium">No active goals</p>
                <p className="text-xs text-white/60 mt-1">Create goals to track your progress</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={onViewHistory}
          className="h-11 border-white/20 hover:bg-white/10 touch-manipulation active:scale-95 transition-all"
        >
          <Clock className="mr-2 h-4 w-4" />
          History
        </Button>
        <Button
          variant="outline"
          onClick={handleQuickExport}
          className="h-11 border-white/20 hover:bg-white/10 touch-manipulation active:scale-95 transition-all"
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default MobileCPDTracker;
