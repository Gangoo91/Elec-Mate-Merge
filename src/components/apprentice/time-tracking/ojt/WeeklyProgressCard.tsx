
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, Book, PlusCircle, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TimeEntryForm from "../TimeEntryForm";
import { TimeEntryTotal } from "@/types/time-tracking";

interface WeeklyProgressCardProps {
  weeklyHours: number;
  targetHours: number;
  courseHours: number;
  totalTime: TimeEntryTotal;
  addTimeEntry: (duration: number, activity: string, notes: string) => void;
  handleUploadEvidence: () => void;
}

const WeeklyProgressCard = ({
  weeklyHours,
  targetHours,
  courseHours,
  totalTime,
  addTimeEntry,
  handleUploadEvidence
}: WeeklyProgressCardProps) => {
  const progress = (weeklyHours / targetHours) * 100;

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray lg:col-span-1">
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
              <span>{weeklyHours} / {targetHours} hours</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <Book className="h-4 w-4 text-elec-yellow mr-2" />
                Course Learning
              </span>
              <span>{courseHours} hours</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Time automatically tracked from online learning
            </div>
          </div>
          
          <div className="mt-2 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <Clock className="h-4 w-4 text-elec-yellow mr-2" />
                Total Recorded Time
              </span>
              <span>{totalTime.hours}h {totalTime.minutes}m</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Log Manual Hours
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Log Training Hours</DialogTitle>
                </DialogHeader>
                <TimeEntryForm onAddEntry={addTimeEntry} />
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="w-full" onClick={handleUploadEvidence}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Evidence
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyProgressCard;
