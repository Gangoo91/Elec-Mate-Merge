
import { useState, useEffect } from 'react';
import { cpdDataService, CPDEntry, CPDStats, CPDGoal } from '@/services/cpdDataService';
import { useToast } from '@/components/ui/use-toast';

export const useCPDData = () => {
  const [entries, setEntries] = useState<CPDEntry[]>([]);
  const [goals, setGoals] = useState<CPDGoal[]>([]);
  const [stats, setStats] = useState<CPDStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const refreshData = () => {
    try {
      const newEntries = cpdDataService.getEntries();
      const newGoals = cpdDataService.getGoals();
      const newStats = cpdDataService.getStats();
      
      setEntries(newEntries);
      setGoals(newGoals);
      setStats(newStats);
    } catch (error) {
      console.error('Error refreshing CPD data:', error);
      toast({
        title: "Error loading CPD data",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addEntry = (entryData: Omit<CPDEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newEntry = cpdDataService.saveEntry(entryData);
      refreshData();
      toast({
        title: "CPD entry added",
        description: `${entryData.activity} has been recorded.`,
      });
      return newEntry;
    } catch (error) {
      console.error('Error adding CPD entry:', error);
      toast({
        title: "Error adding entry",
        description: "Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateEntry = (id: string, updates: Partial<CPDEntry>) => {
    try {
      const updatedEntry = cpdDataService.updateEntry(id, updates);
      if (updatedEntry) {
        refreshData();
        toast({
          title: "CPD entry updated",
          description: "Your changes have been saved.",
        });
      }
      return updatedEntry;
    } catch (error) {
      console.error('Error updating CPD entry:', error);
      toast({
        title: "Error updating entry",
        description: "Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  };

  const deleteEntry = (id: string) => {
    try {
      const success = cpdDataService.deleteEntry(id);
      if (success) {
        refreshData();
        toast({
          title: "CPD entry deleted",
          description: "The entry has been removed.",
        });
      }
      return success;
    } catch (error) {
      console.error('Error deleting CPD entry:', error);
      toast({
        title: "Error deleting entry",
        description: "Please try again later.",
        variant: "destructive"
      });
      return false;
    }
  };

  const addGoal = (goalData: Omit<CPDGoal, 'id' | 'createdAt'>) => {
    try {
      const newGoal = cpdDataService.saveGoal(goalData);
      refreshData();
      toast({
        title: "CPD goal created",
        description: `${goalData.title} has been added to your goals.`,
      });
      return newGoal;
    } catch (error) {
      console.error('Error adding CPD goal:', error);
      toast({
        title: "Error creating goal",
        description: "Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateGoal = (id: string, updates: Partial<CPDGoal>) => {
    try {
      const updatedGoal = cpdDataService.updateGoal(id, updates);
      if (updatedGoal) {
        refreshData();
        toast({
          title: "CPD goal updated",
          description: "Your changes have been saved.",
        });
      }
      return updatedGoal;
    } catch (error) {
      console.error('Error updating CPD goal:', error);
      toast({
        title: "Error updating goal",
        description: "Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  };

  const deleteGoal = (id: string) => {
    try {
      const success = cpdDataService.deleteGoal(id);
      if (success) {
        refreshData();
        toast({
          title: "CPD goal deleted",
          description: "The goal has been removed.",
        });
      }
      return success;
    } catch (error) {
      console.error('Error deleting CPD goal:', error);
      toast({
        title: "Error deleting goal",
        description: "Please try again later.",
        variant: "destructive"
      });
      return false;
    }
  };

  const addAutoTrackedHours = (activity: string, hours: number, source: string) => {
    try {
      const newEntry = cpdDataService.addAutoTrackedHours(activity, hours, source);
      refreshData();
      toast({
        title: "Auto-tracked hours added",
        description: `${hours} hours from ${activity} has been automatically recorded.`,
      });
      return newEntry;
    } catch (error) {
      console.error('Error adding auto-tracked hours:', error);
      return null;
    }
  };

  return {
    entries,
    goals,
    stats,
    loading,
    addEntry,
    updateEntry,
    deleteEntry,
    addGoal,
    updateGoal,
    deleteGoal,
    addAutoTrackedHours,
    refreshData,
  };
};
