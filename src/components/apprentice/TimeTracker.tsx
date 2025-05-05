
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, Plus } from "lucide-react";
import TimeEntryForm from "./time-tracking/TimeEntryForm";
import EntriesList from "./time-tracking/EntriesList";
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";

const TimeTracker = () => {
  const { entries, totalTime, addTimeEntry } = useTimeEntries();

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-elec-yellow" />
              <div>
                <CardTitle>Off-The-Job Training Logger</CardTitle>
                <CardDescription>Track your 20% off-the-job training time</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-elec-yellow">{totalTime.hours}h {totalTime.minutes}m</div>
              <p className="text-xs text-muted-foreground">Total logged time</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Recent Training Activities</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add New Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Log Training Hours</DialogTitle>
                </DialogHeader>
                <TimeEntryForm onAddEntry={addTimeEntry} />
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="time-entry-form">
            <TimeEntryForm onAddEntry={addTimeEntry} />
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-3">Recent Entries</h4>
            <EntriesList entries={entries.slice(0, 5)} />
            
            {entries.length > 5 && (
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm" className="text-sm">
                  View All Entries
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeTracker;
