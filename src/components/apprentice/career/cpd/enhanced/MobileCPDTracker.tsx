
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
      <div className="space-y-4 p-4">
        <div className="h-32 bg-elec-gray rounded-lg animate-pulse"></div>
        <div className="h-24 bg-elec-gray rounded-lg animate-pulse"></div>
        <div className="h-40 bg-elec-gray rounded-lg animate-pulse"></div>
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
    <div className="space-y-4 pb-20">
      {/* Quick Add Button - Sticky */}
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm p-4 -m-4 mb-4">
        <Button 
          onClick={onAddEntry} 
          className="w-full bg-elec-yellow text-elec-dark hover:bg-amber-400"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add CPD Entry
        </Button>
      </div>

      {/* Key Metrics - Compact */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">{stats.hoursThisYear}</div>
              <div className="text-xs text-muted-foreground">Hours This Year</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getComplianceColor()}`}>{stats.completionPercentage}%</div>
              <div className="text-xs text-muted-foreground">Progress</div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Annual Target</span>
              <span>{stats.hoursThisYear} / {stats.targetHours} hours</span>
            </div>
            <Progress value={stats.completionPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-elec-gray rounded-lg p-1">
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
              className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-elec-yellow text-elec-dark' 
                  : 'text-muted-foreground hover:text-white'
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
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-amber-400">{stats.daysRemaining}</div>
                <div className="text-xs text-muted-foreground">Days Left</div>
              </CardContent>
            </Card>
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-blue-400">{stats.hoursThisMonth}</div>
                <div className="text-xs text-muted-foreground">This Month</div>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown - Top 3 */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Top Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.categoryBreakdown.slice(0, 3).map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-xs font-medium">{category.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{category.hours}h</span>
                    <div className="w-12 bg-elec-dark rounded-full h-1">
                      <div 
                        className="h-1 rounded-full bg-elec-yellow"
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
              className="border-elec-yellow/20 bg-elec-gray cursor-pointer hover:bg-elec-gray/80 transition-colors"
              onClick={() => onViewEntry(entry.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <h3 className="font-medium text-white text-sm line-clamp-2">{entry.activity}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{entry.date}</span>
                      <span>•</span>
                      <span>{entry.hours}h</span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        {entry.status}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button 
            variant="outline" 
            onClick={onViewHistory}
            className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            View All Entries
          </Button>
        </div>
      )}

      {activeTab === 'goals' && (
        <div className="space-y-3">
          {activeGoals.map((goal) => (
            <Card key={goal.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-white text-sm">{goal.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {goal.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{goal.currentHours} / {goal.targetHours} hours</span>
                    </div>
                    <Progress 
                      value={(goal.currentHours / goal.targetHours) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {activeGoals.length === 0 && (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No active goals</p>
                <p className="text-xs text-muted-foreground mt-1">Create goals to track your progress</p>
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
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
        >
          <Clock className="mr-2 h-4 w-4" />
          History
        </Button>
        <Button 
          variant="outline" 
          onClick={handleQuickExport}
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default MobileCPDTracker;
