
import React from "react";
import { TimeEntry } from "@/types/time-tracking";
import { Card, CardContent } from "@/components/ui/card";
import TimeEntryCard from "./TimeEntryCard";
import { Skeleton } from "@/components/ui/skeleton";

export interface EntriesListProps {
  entries: TimeEntry[];
  isLoading?: boolean; // Add optional isLoading prop
}

const EntriesList = ({ entries, isLoading = false }: EntriesListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="bg-elec-gray/50 overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-4 mt-2 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <Card className="bg-elec-gray/50 overflow-hidden">
        <CardContent className="p-4 text-center">
          <p className="text-muted-foreground">No entries found</p>
        </CardContent>
      </Card>
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
