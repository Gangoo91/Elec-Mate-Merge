import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export interface OJTGoal {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  target_value: number;
  current_value: number | null;
  unit: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  deadline: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface CreateOJTGoalInput {
  title: string;
  description?: string;
  target_value: number;
  unit: string;
  priority?: 'low' | 'medium' | 'high';
  category: string;
  deadline?: string;
}

export interface UpdateOJTGoalInput {
  title?: string;
  description?: string;
  target_value?: number;
  current_value?: number;
  unit?: string;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  deadline?: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}

export const useOJTGoals = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [goals, setGoals] = useState<OJTGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch goals
  const fetchGoals = useCallback(async () => {
    if (!user?.id) {
      setGoals([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('ojt_goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching OJT goals:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Initial fetch
  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  // Create a new goal
  const addGoal = useCallback(async (input: CreateOJTGoalInput): Promise<OJTGoal | null> => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create goals",
        variant: "destructive",
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('ojt_goals')
        .insert({
          user_id: user.id,
          title: input.title,
          description: input.description || null,
          target_value: input.target_value,
          current_value: 0,
          unit: input.unit,
          priority: input.priority || 'medium',
          category: input.category,
          deadline: input.deadline || null,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      setGoals(prev => [data, ...prev]);
      toast({
        title: "Goal created",
        description: "Your goal has been saved",
      });
      return data;
    } catch (err) {
      console.error('Error creating OJT goal:', err);
      toast({
        title: "Error",
        description: "Failed to create goal",
        variant: "destructive",
      });
      return null;
    }
  }, [user?.id, toast]);

  // Update a goal
  const updateGoal = useCallback(async (id: string, input: UpdateOJTGoalInput): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const { error } = await supabase
        .from('ojt_goals')
        .update(input)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setGoals(prev => prev.map(goal =>
        goal.id === id ? { ...goal, ...input, updated_at: new Date().toISOString() } : goal
      ));
      toast({
        title: "Goal updated",
        description: "Your goal has been updated",
      });
      return true;
    } catch (err) {
      console.error('Error updating OJT goal:', err);
      toast({
        title: "Error",
        description: "Failed to update goal",
        variant: "destructive",
      });
      return false;
    }
  }, [user?.id, toast]);

  // Update progress on a goal
  const updateProgress = useCallback(async (id: string, current_value: number): Promise<boolean> => {
    if (!user?.id) return false;

    const goal = goals.find(g => g.id === id);
    if (!goal) return false;

    // Auto-complete if target reached
    const newStatus = current_value >= goal.target_value ? 'completed' : goal.status;

    try {
      const { error } = await supabase
        .from('ojt_goals')
        .update({
          current_value,
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setGoals(prev => prev.map(g =>
        g.id === id ? { ...g, current_value, status: newStatus, updated_at: new Date().toISOString() } : g
      ));

      if (newStatus === 'completed' && goal.status !== 'completed') {
        toast({
          title: "Goal completed!",
          description: `You've reached your target for "${goal.title}"`,
        });
      }
      return true;
    } catch (err) {
      console.error('Error updating goal progress:', err);
      return false;
    }
  }, [user?.id, goals, toast]);

  // Delete a goal
  const deleteGoal = useCallback(async (id: string): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const { error } = await supabase
        .from('ojt_goals')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setGoals(prev => prev.filter(goal => goal.id !== id));
      toast({
        title: "Goal deleted",
        description: "Your goal has been removed",
      });
      return true;
    } catch (err) {
      console.error('Error deleting OJT goal:', err);
      toast({
        title: "Error",
        description: "Failed to delete goal",
        variant: "destructive",
      });
      return false;
    }
  }, [user?.id, toast]);

  // Calculate statistics
  const stats = {
    total: goals.length,
    completed: goals.filter(g => g.status === 'completed').length,
    inProgress: goals.filter(g => g.status === 'in_progress').length,
    pending: goals.filter(g => g.status === 'pending').length,
    overdue: goals.filter(g =>
      g.deadline &&
      new Date(g.deadline) < new Date() &&
      g.status !== 'completed' &&
      g.status !== 'cancelled'
    ).length,
  };

  return {
    goals,
    isLoading,
    error,
    stats,
    addGoal,
    updateGoal,
    updateProgress,
    deleteGoal,
    refetch: fetchGoals,
  };
};
