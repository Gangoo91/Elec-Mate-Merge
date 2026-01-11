import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export interface OJTAssessment {
  id: string;
  user_id: string;
  title: string;
  type: 'practical' | 'written' | 'observation' | 'portfolio' | 'other';
  due_date: string;
  status: 'pending' | 'scheduled' | 'completed' | 'failed' | 'deferred';
  grade: string | null;
  feedback: string | null;
  tutor_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateOJTAssessmentInput {
  title: string;
  type: 'practical' | 'written' | 'observation' | 'portfolio' | 'other';
  due_date: string;
  status?: 'pending' | 'scheduled' | 'completed' | 'failed' | 'deferred';
}

export interface UpdateOJTAssessmentInput {
  title?: string;
  type?: 'practical' | 'written' | 'observation' | 'portfolio' | 'other';
  due_date?: string;
  status?: 'pending' | 'scheduled' | 'completed' | 'failed' | 'deferred';
  grade?: string;
  feedback?: string;
  tutor_notes?: string;
}

export const useOJTAssessments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [assessments, setAssessments] = useState<OJTAssessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch assessments
  const fetchAssessments = useCallback(async () => {
    if (!user?.id) {
      setAssessments([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('ojt_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true });

      if (error) throw error;
      setAssessments(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching OJT assessments:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Initial fetch
  useEffect(() => {
    fetchAssessments();
  }, [fetchAssessments]);

  // Create a new assessment
  const addAssessment = useCallback(async (input: CreateOJTAssessmentInput): Promise<OJTAssessment | null> => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to add assessments",
        variant: "destructive",
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('ojt_assessments')
        .insert({
          user_id: user.id,
          title: input.title,
          type: input.type,
          due_date: input.due_date,
          status: input.status || 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      setAssessments(prev => [...prev, data].sort((a, b) =>
        new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
      ));
      toast({
        title: "Assessment added",
        description: "Your assessment has been saved",
      });
      return data;
    } catch (err) {
      console.error('Error creating OJT assessment:', err);
      toast({
        title: "Error",
        description: "Failed to add assessment",
        variant: "destructive",
      });
      return null;
    }
  }, [user?.id, toast]);

  // Update an assessment
  const updateAssessment = useCallback(async (id: string, input: UpdateOJTAssessmentInput): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const { error } = await supabase
        .from('ojt_assessments')
        .update(input)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setAssessments(prev => prev.map(assessment =>
        assessment.id === id ? { ...assessment, ...input, updated_at: new Date().toISOString() } : assessment
      ));
      toast({
        title: "Assessment updated",
        description: "Your assessment has been updated",
      });
      return true;
    } catch (err) {
      console.error('Error updating OJT assessment:', err);
      toast({
        title: "Error",
        description: "Failed to update assessment",
        variant: "destructive",
      });
      return false;
    }
  }, [user?.id, toast]);

  // Mark assessment as completed
  const completeAssessment = useCallback(async (id: string, grade?: string, feedback?: string): Promise<boolean> => {
    return updateAssessment(id, {
      status: 'completed',
      grade,
      feedback,
    });
  }, [updateAssessment]);

  // Delete an assessment
  const deleteAssessment = useCallback(async (id: string): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const { error } = await supabase
        .from('ojt_assessments')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setAssessments(prev => prev.filter(assessment => assessment.id !== id));
      toast({
        title: "Assessment deleted",
        description: "Your assessment has been removed",
      });
      return true;
    } catch (err) {
      console.error('Error deleting OJT assessment:', err);
      toast({
        title: "Error",
        description: "Failed to delete assessment",
        variant: "destructive",
      });
      return false;
    }
  }, [user?.id, toast]);

  // Calculate statistics
  const stats = {
    total: assessments.length,
    completed: assessments.filter(a => a.status === 'completed').length,
    pending: assessments.filter(a => a.status === 'pending' || a.status === 'scheduled').length,
    failed: assessments.filter(a => a.status === 'failed').length,
    upcoming: assessments.filter(a =>
      (a.status === 'pending' || a.status === 'scheduled') &&
      new Date(a.due_date) >= new Date()
    ).length,
    overdue: assessments.filter(a =>
      (a.status === 'pending' || a.status === 'scheduled') &&
      new Date(a.due_date) < new Date()
    ).length,
  };

  // Get upcoming assessments (next 7 days)
  const upcomingAssessments = assessments.filter(a => {
    if (a.status === 'completed' || a.status === 'failed') return false;
    const dueDate = new Date(a.due_date);
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return dueDate >= now && dueDate <= weekFromNow;
  });

  return {
    assessments,
    upcomingAssessments,
    isLoading,
    error,
    stats,
    addAssessment,
    updateAssessment,
    completeAssessment,
    deleteAssessment,
    refetch: fetchAssessments,
  };
};
