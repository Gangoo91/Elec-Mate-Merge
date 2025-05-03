
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import TimeEntryForm from "./time-tracking/TimeEntryForm";
import EntriesList from "./time-tracking/EntriesList";
import { useTimeEntries } from "@/hooks/useTimeEntries";

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
          <TimeEntryForm onAddEntry={addTimeEntry} />
        </CardContent>
      </Card>

      <EntriesList entries={entries} />
    </div>
  );
};

export default TimeTracker;
