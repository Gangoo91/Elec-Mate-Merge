
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus, Calendar, TrendingUp, Target, Award } from "lucide-react";
import EnhancedTrainingGuideCard from "@/components/apprentice/time-tracking/ojt/EnhancedTrainingGuideCard";
import WeeklyProgressCard from "@/components/apprentice/time-tracking/ojt/WeeklyProgressCard";
import TrackingStatusIndicator from "@/components/apprentice/time-tracking/ojt/TrackingStatusIndicator";

const TimeTrackingTab = () => {
  const weeklyStats = {
    totalHours: 37.5,
    ojtHours: 8.5,
    percentage: 22.7,
    target: 20
  };

  const recentEntries = [
    { date: "2024-01-15", activity: "BS 7671 Regulations Study", duration: 2.5, type: "Theory" },
    { date: "2024-01-14", activity: "Cable Installation Practice", duration: 3.0, type: "Practical" },
    { date: "2024-01-13", activity: "Safety Procedures Workshop", duration: 1.5, type: "Workshop" },
    { date: "2024-01-12", activity: "Testing Equipment Training", duration: 2.0, type: "Practical" }
  ];

  // Handler functions for WeeklyProgressCard
  const handleAddTimeEntry = (duration: number, activity: string, notes: string) => {
    console.log('Adding time entry:', { duration, activity, notes });
    // TODO: Implement time entry logic
  };

  const handleUploadEvidence = () => {
    console.log('Uploading evidence');
    // TODO: Implement evidence upload logic
  };

  return (
    <div className="space-y-6">
      {/* Header with Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-elec-yellow text-base flex items-center gap-2">
              <Clock className="h-4 w-4" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{weeklyStats.ojtHours}h</div>
            <p className="text-sm text-muted-foreground">
              {weeklyStats.percentage}% of total hours
            </p>
            <Badge 
              variant={weeklyStats.percentage >= weeklyStats.target ? "success" : "yellow"}
              className="mt-2"
            >
              {weeklyStats.percentage >= weeklyStats.target ? "On Track" : "Below Target"}
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-elec-yellow text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Monthly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">34.5h</div>
            <p className="text-sm text-muted-foreground">
              21.8% average this month
            </p>
            <Badge variant="success" className="mt-2">
              Above Target
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-elec-yellow text-base flex items-center gap-2">
              <Award className="h-4 w-4" />
              Total OJT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">186h</div>
            <p className="text-sm text-muted-foreground">
              Since apprenticeship start
            </p>
            <Badge variant="gold" className="mt-2">
              Excellent Progress
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Log Training Activity
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-elec-gray/50 border-elec-yellow/30">
          <Calendar className="h-4 w-4" />
          View Schedule
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-elec-gray/50 border-elec-yellow/30">
          <Target className="h-4 w-4" />
          Set Goals
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Training Guide */}
        <div className="lg:col-span-2">
          <EnhancedTrainingGuideCard />
        </div>

        {/* Weekly Progress */}
        <WeeklyProgressCard 
          weeklyHours={weeklyStats.ojtHours}
          targetHours={weeklyStats.target}
          courseHours={5.5}
          totalTime={{ hours: 186, minutes: 30 }}
          addTimeEntry={handleAddTimeEntry}
          handleUploadEvidence={handleUploadEvidence}
        />

        {/* Tracking Status */}
        <TrackingStatusIndicator />
      </div>

      {/* Recent Entries */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Training Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEntries.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-elec-dark rounded-lg border border-elec-yellow/20">
                <div className="flex-1">
                  <h4 className="font-medium text-white">{entry.activity}</h4>
                  <p className="text-sm text-muted-foreground">{entry.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                    {entry.type}
                  </Badge>
                  <span className="font-medium text-elec-yellow">{entry.duration}h</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 bg-elec-gray/50 border-elec-yellow/30">
            View All Entries
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeTrackingTab;
