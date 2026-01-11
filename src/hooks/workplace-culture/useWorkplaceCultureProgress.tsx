import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export interface ModuleProgress {
  id: string;
  user_id: string;
  module_id: string;
  completed: boolean;
  progress_percent: number;
  sections_completed: string[];
  started_at: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UseWorkplaceCultureProgressReturn {
  progress: Record<string, ModuleProgress>;
  isLoading: boolean;
  error: Error | null;
  getModuleProgress: (moduleId: string) => ModuleProgress | undefined;
  updateModuleProgress: (moduleId: string, progressPercent: number) => Promise<boolean>;
  completeSection: (moduleId: string, sectionId: string, totalSections: number) => Promise<boolean>;
  completeModule: (moduleId: string) => Promise<boolean>;
  resetModule: (moduleId: string) => Promise<boolean>;
  stats: {
    totalModules: number;
    completedModules: number;
    overallProgress: number;
  };
  refetch: () => Promise<void>;
}

// Define all workplace culture modules
export const WORKPLACE_CULTURE_MODULES = [
  'professional-conduct',
  'communication',
  'workplace-safety',
  'teamwork',
  'time-management',
  'conflict-resolution',
  'customer-service',
  'continuous-learning',
];

export const useWorkplaceCultureProgress = (): UseWorkplaceCultureProgressReturn => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch all progress
  const fetchProgress = useCallback(async () => {
    if (!user?.id) {
      setProgress({});
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('workplace_culture_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      // Convert array to record keyed by module_id
      const progressMap: Record<string, ModuleProgress> = {};
      (data || []).forEach((item: ModuleProgress) => {
        progressMap[item.module_id] = item;
      });
      setProgress(progressMap);
      setError(null);
    } catch (err) {
      console.error('Error fetching workplace culture progress:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Initial fetch
  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Get progress for a specific module
  const getModuleProgress = useCallback((moduleId: string): ModuleProgress | undefined => {
    return progress[moduleId];
  }, [progress]);

  // Update module progress percentage
  const updateModuleProgress = useCallback(async (
    moduleId: string,
    progressPercent: number
  ): Promise<boolean> => {
    if (!user?.id) return false;

    const isComplete = progressPercent >= 100;
    const existingProgress = progress[moduleId];

    try {
      if (existingProgress) {
        // Update existing
        const { error } = await supabase
          .from('workplace_culture_progress')
          .update({
            progress_percent: Math.min(progressPercent, 100),
            completed: isComplete,
            completed_at: isComplete && !existingProgress.completed ? new Date().toISOString() : existingProgress.completed_at,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingProgress.id)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from('workplace_culture_progress')
          .insert({
            user_id: user.id,
            module_id: moduleId,
            progress_percent: Math.min(progressPercent, 100),
            completed: isComplete,
            completed_at: isComplete ? new Date().toISOString() : null,
            sections_completed: [],
          });

        if (error) throw error;
      }

      // Refetch to get updated data
      await fetchProgress();

      if (isComplete && (!existingProgress || !existingProgress.completed)) {
        toast({
          title: "Module completed!",
          description: "Great work on completing this module.",
        });
      }

      return true;
    } catch (err) {
      console.error('Error updating module progress:', err);
      toast({
        title: "Error",
        description: "Failed to save progress",
        variant: "destructive",
      });
      return false;
    }
  }, [user?.id, progress, fetchProgress, toast]);

  // Complete a section within a module
  const completeSection = useCallback(async (
    moduleId: string,
    sectionId: string,
    totalSections: number
  ): Promise<boolean> => {
    if (!user?.id) return false;

    const existingProgress = progress[moduleId];
    const sectionsCompleted = existingProgress?.sections_completed || [];

    // Don't add duplicate sections
    if (sectionsCompleted.includes(sectionId)) {
      return true;
    }

    const newSections = [...sectionsCompleted, sectionId];
    const progressPercent = Math.round((newSections.length / totalSections) * 100);
    const isComplete = progressPercent >= 100;

    try {
      if (existingProgress) {
        const { error } = await supabase
          .from('workplace_culture_progress')
          .update({
            sections_completed: newSections,
            progress_percent: progressPercent,
            completed: isComplete,
            completed_at: isComplete && !existingProgress.completed ? new Date().toISOString() : existingProgress.completed_at,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingProgress.id)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('workplace_culture_progress')
          .insert({
            user_id: user.id,
            module_id: moduleId,
            sections_completed: newSections,
            progress_percent: progressPercent,
            completed: isComplete,
            completed_at: isComplete ? new Date().toISOString() : null,
          });

        if (error) throw error;
      }

      await fetchProgress();

      if (isComplete && (!existingProgress || !existingProgress.completed)) {
        toast({
          title: "Module completed!",
          description: "Great work on completing this module.",
        });
      }

      return true;
    } catch (err) {
      console.error('Error completing section:', err);
      return false;
    }
  }, [user?.id, progress, fetchProgress, toast]);

  // Mark entire module as complete
  const completeModule = useCallback(async (moduleId: string): Promise<boolean> => {
    return updateModuleProgress(moduleId, 100);
  }, [updateModuleProgress]);

  // Reset module progress
  const resetModule = useCallback(async (moduleId: string): Promise<boolean> => {
    if (!user?.id) return false;

    const existingProgress = progress[moduleId];
    if (!existingProgress) return true;

    try {
      const { error } = await supabase
        .from('workplace_culture_progress')
        .delete()
        .eq('id', existingProgress.id)
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchProgress();
      return true;
    } catch (err) {
      console.error('Error resetting module:', err);
      return false;
    }
  }, [user?.id, progress, fetchProgress]);

  // Calculate stats
  const stats = {
    totalModules: WORKPLACE_CULTURE_MODULES.length,
    completedModules: Object.values(progress).filter(p => p.completed).length,
    overallProgress: WORKPLACE_CULTURE_MODULES.length > 0
      ? Math.round(
          WORKPLACE_CULTURE_MODULES.reduce((sum, moduleId) => {
            return sum + (progress[moduleId]?.progress_percent || 0);
          }, 0) / WORKPLACE_CULTURE_MODULES.length
        )
      : 0,
  };

  return {
    progress,
    isLoading,
    error,
    getModuleProgress,
    updateModuleProgress,
    completeSection,
    completeModule,
    resetModule,
    stats,
    refetch: fetchProgress,
  };
};
