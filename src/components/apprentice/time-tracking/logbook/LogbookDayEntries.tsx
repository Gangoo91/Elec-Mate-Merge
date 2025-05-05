
import { Card, CardContent } from "@/components/ui/card";
import { TimeEntry } from "@/types/time-tracking";
import LogbookEntryRow from "./LogbookEntryRow";

interface LogbookDayEntriesProps {
  date: string;
  entries: TimeEntry[];
  onSave: (entryId: string, updatedData: { duration: number, activity: string, notes: string }) => void;
  onDelete: (entryId: string) => void;
}

const LogbookDayEntries = ({ date, entries, onSave, onDelete }: LogbookDayEntriesProps) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-2">
      <h4 className="font-medium text-elec-yellow">{formatDate(date)}</h4>
      <Card className="border-elec-yellow/10 bg-elec-dark">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-elec-yellow/10 text-xs text-muted-foreground">
                <th className="text-left p-3">Activity</th>
                <th className="text-center p-3">Duration</th>
                <th className="text-left hidden md:table-cell p-3">Notes</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-elec-yellow/10">
              {entries.map((entry) => (
                <LogbookEntryRow 
                  key={entry.id} 
                  entry={entry} 
                  onSave={onSave} 
                  onDelete={onDelete} 
                />
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogbookDayEntries;
