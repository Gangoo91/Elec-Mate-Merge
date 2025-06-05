
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CareerProgress {
  id: string;
  user_id: string;
  career_path_id: string;
  progress_percentage: number;
  milestones_completed: string[];
  target_completion_date?: string;
  created_at: string;
  updated_at: string;
}

export const useCareerProgress = () => {
  const [progress, setProgress] = useState<CareerProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('career_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setProgress(data || []);
    } catch (error) {
      console.error('Error fetching career progress:', error);
      toast({
        title: "Error",
        description: "Failed to load career progress",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (careerPathId: string, progressData: Partial<CareerProgress>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('career_progress')
        .upsert({
          user_id: user.id,
          career_path_id: careerPathId,
          ...progressData,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      setProgress(prev => {
        const existing = prev.find(p => p.career_path_id === careerPathId);
        if (existing) {
          return prev.map(p => p.career_path_id === careerPathId ? data : p);
        } else {
          return [data, ...prev];
        }
      });

      toast({
        title: "Progress Updated",
        description: "Your career progress has been saved",
      });

      return data;
    } catch (error) {
      console.error('Error updating career progress:', error);
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
    }
  };

  const getProgressForPath = (careerPathId: string) => {
    return progress.find(p => p.career_path_id === careerPathId);
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return {
    progress,
    loading,
    updateProgress,
    getProgressForPath,
    refetch: fetchProgress,
  };
};
