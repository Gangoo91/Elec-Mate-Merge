import { TimeEntry } from '@/types/time-tracking';
import LogbookEntryRow from './LogbookEntryRow';

interface LogbookDayEntriesProps {
  date: string;
  entries: TimeEntry[];
  onSave: (
    entryId: string,
    updatedData: { duration: number; activity: string; notes: string }
  ) => void;
  onDelete: (entryId: string) => void;
}

const LogbookDayEntries = ({ date, entries, onSave, onDelete }: LogbookDayEntriesProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-2">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        {formatDate(date)}
      </span>
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06] text-[10px] uppercase tracking-[0.18em] text-white/55">
              <th className="text-left p-3 font-medium">Activity</th>
              <th className="text-center p-3 font-medium">Duration</th>
              <th className="text-left hidden md:table-cell p-3 font-medium">Notes</th>
              <th className="text-right p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {entries.map((entry) => (
              <LogbookEntryRow key={entry.id} entry={entry} onSave={onSave} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogbookDayEntries;
