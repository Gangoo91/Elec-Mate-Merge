
import TimeEntryCard from "./TimeEntryCard";
import { TimeEntry } from "@/types/time-tracking";

interface EntriesListProps {
  entries: TimeEntry[];
}

const EntriesList = ({ entries }: EntriesListProps) => {
  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Time Entries</h3>
      {sortedEntries.map((entry) => (
        <TimeEntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntriesList;
