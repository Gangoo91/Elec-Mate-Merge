/**
 * useTutorRequirements
 *
 * Hook for tutors to manage custom evidence requirements for students.
 * Provides CRUD operations and real-time updates.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { TutorPortfolioRequirement, EvidenceTypeCode } from '@/types/evidence';

interface UseTutorRequirementsOptions {
  studentId?: string;
  categoryId?: string;
  status?: 'active' | 'completed' | 'cancelled' | 'all';
}

interface CreateRequirementInput {
  studentId: string;
  categoryId?: string;
  title: string;
  description?: string;
  evidenceTypeCodes: EvidenceTypeCode[];
  quantityRequired?: number;
  guidance?: string;
  isMandatory?: boolean;
  dueDate?: string;
}

interface UpdateRequirementInput {
  title?: string;
  description?: string;
  evidenceTypeCodes?: EvidenceTypeCode[];
  quantityRequired?: number;
  guidance?: string;
  isMandatory?: boolean;
  dueDate?: string | null;
  status?: 'active' | 'completed' | 'cancelled';
}

export function useTutorRequirements(options: UseTutorRequirementsOptions = {}) {
  const { studentId, categoryId, status = 'active' } = options;
  const { user } = useAuth();

  const [requirements, setRequirements] = useState<TutorPortfolioRequirement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch requirements
  const fetchRequirements = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('tutor_portfolio_requirements')
        .select('*')
        .order('created_at', { ascending: false });

      // Filter by student if specified
      if (studentId) {
        query = query.eq('student_id', studentId);
      }

      // Filter by category if specified
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      // Filter by status unless 'all' is requested
      if (status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setRequirements((data || []) as TutorPortfolioRequirement[]);
    } catch (err) {
      console.error('Error fetching tutor requirements:', err);
      setError('Failed to load requirements');
    } finally {
      setIsLoading(false);
    }
  }, [user, studentId, categoryId, status]);

  // Initial load
  useEffect(() => {
    fetchRequirements();
  }, [fetchRequirements]);

  // Create a new requirement
  const createRequirement = useCallback(
    async (input: CreateRequirementInput): Promise<TutorPortfolioRequirement | null> => {
      if (!user) return null;

      try {
        const { data, error: insertError } = await supabase
          .from('tutor_portfolio_requirements')
          .insert({
            tutor_id: user.id,
            student_id: input.studentId,
            category_id: input.categoryId || null,
            title: input.title,
            description: input.description || null,
            evidence_type_codes: input.evidenceTypeCodes,
            quantity_required: input.quantityRequired || 1,
            guidance: input.guidance || null,
            is_mandatory: input.isMandatory ?? true,
            due_date: input.dueDate || null,
            status: 'active',
          })
          .select()
          .single();

        if (insertError) throw insertError;

        const newReq = data as TutorPortfolioRequirement;
        setRequirements((prev) => [newReq, ...prev]);
        return newReq;
      } catch (err) {
        console.error('Error creating requirement:', err);
        throw err;
      }
    },
    [user]
  );

  // Update a requirement
  const updateRequirement = useCallback(
    async (
      requirementId: string,
      input: UpdateRequirementInput
    ): Promise<TutorPortfolioRequirement | null> => {
      if (!user) return null;

      try {
        const updateData: Record<string, unknown> = {};

        if (input.title !== undefined) updateData.title = input.title;
        if (input.description !== undefined) updateData.description = input.description;
        if (input.evidenceTypeCodes !== undefined)
          updateData.evidence_type_codes = input.evidenceTypeCodes;
        if (input.quantityRequired !== undefined)
          updateData.quantity_required = input.quantityRequired;
        if (input.guidance !== undefined) updateData.guidance = input.guidance;
        if (input.isMandatory !== undefined) updateData.is_mandatory = input.isMandatory;
        if (input.dueDate !== undefined) updateData.due_date = input.dueDate;
        if (input.status !== undefined) {
          updateData.status = input.status;
          if (input.status === 'completed') {
            updateData.completed_at = new Date().toISOString();
          }
        }

        const { data, error: updateError } = await supabase
          .from('tutor_portfolio_requirements')
          .update(updateData)
          .eq('id', requirementId)
          .eq('tutor_id', user.id)
          .select()
          .single();

        if (updateError) throw updateError;

        const updatedReq = data as TutorPortfolioRequirement;
        setRequirements((prev) =>
          prev.map((r) => (r.id === requirementId ? updatedReq : r))
        );
        return updatedReq;
      } catch (err) {
        console.error('Error updating requirement:', err);
        throw err;
      }
    },
    [user]
  );

  // Delete a requirement
  const deleteRequirement = useCallback(
    async (requirementId: string): Promise<boolean> => {
      if (!user) return false;

      try {
        const { error: deleteError } = await supabase
          .from('tutor_portfolio_requirements')
          .delete()
          .eq('id', requirementId)
          .eq('tutor_id', user.id);

        if (deleteError) throw deleteError;

        setRequirements((prev) => prev.filter((r) => r.id !== requirementId));
        return true;
      } catch (err) {
        console.error('Error deleting requirement:', err);
        throw err;
      }
    },
    [user]
  );

  // Mark requirement as completed
  const markComplete = useCallback(
    async (requirementId: string) => {
      return updateRequirement(requirementId, { status: 'completed' });
    },
    [updateRequirement]
  );

  // Cancel a requirement
  const cancelRequirement = useCallback(
    async (requirementId: string) => {
      return updateRequirement(requirementId, { status: 'cancelled' });
    },
    [updateRequirement]
  );

  // Reactivate a cancelled/completed requirement
  const reactivateRequirement = useCallback(
    async (requirementId: string) => {
      return updateRequirement(requirementId, { status: 'active' });
    },
    [updateRequirement]
  );

  // Get requirements due soon (within specified days)
  const getRequirementsDueSoon = useCallback(
    (withinDays: number = 7) => {
      const now = new Date();
      const futureDate = new Date(now.getTime() + withinDays * 24 * 60 * 60 * 1000);

      return requirements.filter((r) => {
        if (!r.due_date || r.status !== 'active') return false;
        const dueDate = new Date(r.due_date);
        return dueDate <= futureDate && dueDate >= now;
      });
    },
    [requirements]
  );

  // Get overdue requirements
  const getOverdueRequirements = useCallback(() => {
    const now = new Date();

    return requirements.filter((r) => {
      if (!r.due_date || r.status !== 'active') return false;
      const dueDate = new Date(r.due_date);
      return dueDate < now;
    });
  }, [requirements]);

  return {
    // Data
    requirements,
    isLoading,
    error,

    // Stats
    totalCount: requirements.length,
    activeCount: requirements.filter((r) => r.status === 'active').length,
    completedCount: requirements.filter((r) => r.status === 'completed').length,

    // CRUD operations
    createRequirement,
    updateRequirement,
    deleteRequirement,

    // Status helpers
    markComplete,
    cancelRequirement,
    reactivateRequirement,

    // Filtered views
    getRequirementsDueSoon,
    getOverdueRequirements,

    // Refetch
    refetch: fetchRequirements,
  };
}

/**
 * Hook for students to view their assigned requirements
 */
export function useStudentRequirements(categoryId?: string) {
  const { user } = useAuth();
  const [requirements, setRequirements] = useState<TutorPortfolioRequirement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequirements = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        let query = supabase
          .from('tutor_portfolio_requirements')
          .select('*')
          .eq('student_id', user.id)
          .eq('status', 'active')
          .order('is_mandatory', { ascending: false })
          .order('due_date', { ascending: true, nullsFirst: false });

        if (categoryId) {
          query = query.eq('category_id', categoryId);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setRequirements((data || []) as TutorPortfolioRequirement[]);
      } catch (err) {
        console.error('Error fetching student requirements:', err);
        setError('Failed to load requirements');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequirements();
  }, [user, categoryId]);

  return {
    requirements,
    isLoading,
    error,
    mandatoryCount: requirements.filter((r) => r.is_mandatory).length,
    optionalCount: requirements.filter((r) => !r.is_mandatory).length,
  };
}

export default useTutorRequirements;
