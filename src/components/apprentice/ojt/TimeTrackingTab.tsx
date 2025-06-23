
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Target, Plus, TrendingUp, Calendar, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TimeEntryForm from "../time-tracking/TimeEntryForm";
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";

const TimeTrackingTab = () => {
  const { addTimeEntry, totalTime } = useTimeEntries();

  // Mock data for demonstration
  const weeklyTarget = 8;
  const weeklyProgress = 6.5;
  const progressPercentage = (weeklyProgress / weeklyTarget) * 100;

  const handleAddEntry = (duration: number, activity: string, notes: string) => {
    addTimeEntry(duration, activity, notes);
  };

  return (
    <div className="space-y-6">
      {/* Weekly Progress Overview */}
      <Card className="bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>This week</span>
                <span>{weeklyProgress} / {weeklyTarget} hours</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-elec-yellow" />
                  <span>Monthly Total</span>
                </div>
                <div className="text-lg font-semibold">{totalTime.hours}h {totalTime.minutes}m</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-elec-yellow" />
                  <span>Target Progress</span>
                </div>
                <div className="text-lg font-semibold">{Math.round(progressPercentage)}%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-elec-yellow" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Log Training Hours
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Log Training Hours</DialogTitle>
                </DialogHeader>
                <TimeEntryForm onAddEntry={handleAddEntry} />
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Learning
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Learning Categories */}
      <Card className="bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Learning Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-elec-yellow/20">
              <h4 className="font-medium mb-2">Technical Training</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Hands-on electrical work, installations, and testing procedures
              </p>
              <div className="text-sm">
                <span className="font-medium">12.5 hours</span> logged this month
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-elec-yellow/20">
              <h4 className="font-medium mb-2">Theory & Regulations</h4>
              <p className="text-sm text-muted-foreground mb-3">
                BS 7671, building regulations, and electrical theory
              </p>
              <div className="text-sm">
                <span className="font-medium">8.2 hours</span> logged this month
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-elec-yellow/20">
              <h4 className="font-medium mb-2">Health & Safety</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Risk assessments, safe working practices, and PPE training
              </p>
              <div className="text-sm">
                <span className="font-medium">6.8 hours</span> logged this month
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-elec-yellow/20">
              <h4 className="font-medium mb-2">Professional Skills</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Communication, customer service, and business skills
              </p>
              <div className="text-sm">
                <span className="font-medium">4.1 hours</span> logged this month
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeTrackingTab;
