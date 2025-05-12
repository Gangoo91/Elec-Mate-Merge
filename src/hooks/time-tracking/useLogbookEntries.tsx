
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useTimeEntries } from "./useTimeEntries";

export const useLogbookEntries = () => {
  const { entries, totalTime, addTimeEntry } = useTimeEntries();
  const { toast } = useToast();
  const [filterMonth, setFilterMonth] = useState<string>("all");
  
  // Get unique months from entries
  const months = [...new Set(entries.map(entry => {
    const date = new Date(entry.date);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }))];

  // Filter entries based on selected month
  const filteredEntries = filterMonth === "all" 
    ? entries 
    : entries.filter(entry => {
        const date = new Date(entry.date);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}` === filterMonth;
      });

  // Group entries by date for the logbook view
  const entriesByDate = filteredEntries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {} as Record<string, typeof entries>);

  const handleSaveEntry = (entryId: string, updatedData: { duration: number, activity: string, notes: string }) => {
    // In a real implementation, this would update the entry in the database
    toast({
      title: "Entry updated",
      description: "Your time entry has been updated successfully."
    });
  };

  const handleDeleteEntry = (entryId: string) => {
    // In a real implementation, this would delete the entry from the database
    toast({
      title: "Entry deleted",
      description: "Your time entry has been deleted.",
      variant: "destructive"
    });
  };
  
  const handleClearAllEntries = () => {
    // In a real implementation, this would delete all entries for the current filter
    toast({
      title: "Entries cleared",
      description: filterMonth === "all" 
        ? "All time entries have been deleted." 
        : `All entries for ${filterMonth} have been deleted.`,
      variant: "destructive"
    });
  };

  return {
    months,
    filterMonth,
    setFilterMonth,
    entriesByDate,
    addTimeEntry,
    handleSaveEntry,
    handleDeleteEntry,
    handleClearAllEntries,
    hasEntries: Object.keys(entriesByDate).length > 0
  };
};
