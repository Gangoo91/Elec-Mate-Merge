
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, TrendingUp, FileDown } from "lucide-react";
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";
import EntriesList from "@/components/apprentice/time-tracking/EntriesList";
import TimeEntryForm from "@/components/apprentice/time-tracking/TimeEntryForm";
import { useToast } from "@/hooks/use-toast";

const TimeTrackingTab = () => {
  const { entries, totalTime, addTimeEntry, isLoading } = useTimeEntries();
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  // Calculate weekly progress (assuming 20% of 37.5 hours per week = 7.5 hours)
  const weeklyTargetMinutes = 7.5 * 60; // 450 minutes
  const currentWeekMinutes = entries
    .filter(entry => {
      const entryDate = new Date(entry.date);
      const now = new Date();
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      return entryDate >= weekStart;
    })
    .reduce((total, entry) => total + entry.duration, 0);

  const weeklyProgress = Math.min((currentWeekMinutes / weeklyTargetMinutes) * 100, 100);

  // Calculate activity statistics
  const activityStats = entries.reduce((stats, entry) => {
    const activity = entry.activity;
    if (!stats[activity]) {
      stats[activity] = { count: 0, totalMinutes: 0 };
    }
    stats[activity].count++;
    stats[activity].totalMinutes += entry.duration;
    return stats;
  }, {} as Record<string, { count: number; totalMinutes: number }>);

  const exportTimeEntries = async () => {
    setIsExporting(true);
    
    try {
      // Prepare export data
      const exportData = {
        exportInfo: {
          exportDate: new Date().toISOString(),
          exportType: "time_tracking",
          totalEntries: entries.length,
          dateRange: {
            earliest: entries.length > 0 ? entries.reduce((earliest, entry) => 
              entry.date < earliest ? entry.date : earliest, entries[0].date) : null,
            latest: entries.length > 0 ? entries.reduce((latest, entry) => 
              entry.date > latest ? entry.date : latest, entries[0].date) : null
          }
        },
        summary: {
          totalHours: Math.floor(totalTime.hours + totalTime.minutes / 60),
          totalMinutes: totalTime.hours * 60 + totalTime.minutes,
          weeklyProgress: {
            currentWeekMinutes,
            targetMinutes: weeklyTargetMinutes,
            progressPercentage: Math.round(weeklyProgress)
          },
          activityBreakdown: Object.entries(activityStats).map(([activity, stats]) => ({
            activity,
            count: stats.count,
            totalMinutes: stats.totalMinutes,
            totalHours: Math.round((stats.totalMinutes / 60) * 10) / 10,
            percentage: Math.round((stats.totalMinutes / (totalTime.hours * 60 + totalTime.minutes)) * 100)
          }))
        },
        timeEntries: entries.map(entry => ({
          id: entry.id,
          date: entry.date,
          activity: entry.activity,
          duration: entry.duration,
          durationHours: Math.round((entry.duration / 60) * 10) / 10,
          notes: entry.notes,
          isAutomatic: entry.isAutomatic || false,
          isQuiz: entry.isQuiz || false,
          ...(entry.score && { score: entry.score }),
          ...(entry.totalQuestions && { totalQuestions: entry.totalQuestions })
        }))
      };

      // Create and download the file
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `time-tracking-export-${new Date().toISOString().split('T')[0]}.json`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `Exported ${entries.length} time entries successfully.`,
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your time entries. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-elec-yellow"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Export Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Time Tracking</h2>
          <p className="text-muted-foreground">
            Track your off-the-job training hours and monitor progress towards your 20% requirement
          </p>
        </div>
        <Button 
          onClick={exportTimeEntries}
          disabled={isExporting || entries.length === 0}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <FileDown className="h-4 w-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export Time Entries'}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-blue-500/50 bg-blue-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-300">
              Total Time Tracked
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-100">
              {totalTime.hours}h {totalTime.minutes}m
            </div>
            <p className="text-xs text-blue-300 mt-1">
              {entries.length} entries recorded
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-500/50 bg-green-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-300">
              This Week's Progress
            </CardTitle>
            <Calendar className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-100">
              {Math.round(weeklyProgress)}%
            </div>
            <p className="text-xs text-green-300 mt-1">
              {Math.floor(currentWeekMinutes / 60)}h {currentWeekMinutes % 60}m / 7.5h target
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-purple-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-300">
              Activity Types
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-100">
              {Object.keys(activityStats).length}
            </div>
            <p className="text-xs text-purple-300 mt-1">
              Different training activities
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Time Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-elec-yellow">Add Time Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <TimeEntryForm onEntryAdded={addTimeEntry} />
        </CardContent>
      </Card>

      {/* Entries List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-elec-yellow">Recent Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <EntriesList entries={entries} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeTrackingTab;
