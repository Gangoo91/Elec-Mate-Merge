import React from 'react';
import { TimeEntry } from '@/types/time-tracking';
import TimeEntryCard from './TimeEntryCard';
import { Skeleton } from '@/components/ui/skeleton';

export interface EntriesListProps {
  entries: TimeEntry[];
  isLoading?: boolean;
}

const EntriesList = ({ entries, isLoading = false }: EntriesListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
          >
            <div className="flex justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-4 mt-2 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
        <p className="text-[14px] text-white/85 leading-relaxed">No entries found</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <TimeEntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntriesList;
