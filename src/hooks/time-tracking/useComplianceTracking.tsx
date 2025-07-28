import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ComplianceGoal {
  id: string;
  user_id: string;
  goal_type: string;
  target_hours?: number;
  target_entries?: number;
  current_hours: number;
  current_entries: number;
  compliance_percentage: number;
  deadline?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useComplianceTracking = () => {
  const [goals, setGoals] = useState<ComplianceGoal[]>([]);
  const [otjGoal, setOtjGoal] = useState<ComplianceGoal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('compliance_goals')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active');

        if (error) throw error;

        setGoals(data || []);
        const otjGoalData = data?.find(g => g.goal_type === '20_percent_otj');
        setOtjGoal(otjGoalData || null);

        // If no 20% OTJ goal exists, create one
        if (!otjGoalData) {
          await createDefaultOTJGoal(user.id);
        }
      } catch (error) {
        console.error('Error fetching compliance goals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();

    // Set up realtime subscription
    const channel = supabase
      .channel('compliance-goals')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'compliance_goals'
        },
        (payload) => {
          const goal = payload.new as ComplianceGoal;
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            setGoals(prev => {
              const filtered = prev.filter(g => g.id !== goal.id);
              return [...filtered, goal];
            });
            
            if (goal.goal_type === '20_percent_otj') {
              setOtjGoal(goal);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const createDefaultOTJGoal = async (userId: string) => {
    try {
      // Default to 400 hours per year (20% of 2000 hour work year)
      const { data, error } = await supabase
        .from('compliance_goals')
        .insert({
          user_id: userId,
          goal_type: '20_percent_otj',
          target_hours: 400,
          deadline: new Date(new Date().getFullYear() + 1, 0, 1).toISOString().split('T')[0] // End of current training year
        })
        .select()
        .single();

      if (error) throw error;
      setOtjGoal(data);
    } catch (error) {
      console.error('Error creating default OTJ goal:', error);
    }
  };

  const updateGoal = async (goalId: string, updates: Partial<ComplianceGoal>) => {
    try {
      const { data, error } = await supabase
        .from('compliance_goals')
        .update(updates)
        .eq('id', goalId)
        .select()
        .single();

      if (error) throw error;
      
      setGoals(prev => prev.map(g => g.id === goalId ? data : g));
      if (data.goal_type === '20_percent_otj') {
        setOtjGoal(data);
      }
      
      return data;
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  };

  const createGoal = async (goalData: Omit<ComplianceGoal, 'id' | 'user_id' | 'current_hours' | 'current_entries' | 'compliance_percentage' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('compliance_goals')
        .insert({
          ...goalData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      
      setGoals(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  };

  // Calculate compliance status
  const getComplianceStatus = () => {
    if (!otjGoal) return { status: 'unknown', message: 'No compliance goal set' };
    
    const percentage = otjGoal.compliance_percentage;
    
    if (percentage >= 100) {
      return { status: 'compliant', message: 'Compliance target achieved' };
    } else if (percentage >= 80) {
      return { status: 'on-track', message: 'On track to meet target' };
    } else if (percentage >= 50) {
      return { status: 'at-risk', message: 'At risk of missing target' };
    } else {
      return { status: 'behind', message: 'Behind compliance target' };
    }
  };

  // Get remaining hours needed
  const getRemainingHours = () => {
    if (!otjGoal) return 0;
    return Math.max(0, (otjGoal.target_hours || 0) - otjGoal.current_hours);
  };

  return {
    goals,
    otjGoal,
    isLoading,
    updateGoal,
    createGoal,
    getComplianceStatus,
    getRemainingHours
  };
};