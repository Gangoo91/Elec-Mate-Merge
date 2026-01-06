import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  getApplicationsForVacancy,
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
  VacancyApplication,
} from '@/services/vacancyService';

// Query keys
const APPLICATIONS_KEY = ['vacancy-applications'];

export const useVacancyApplications = (vacancyId?: string) => {
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('vacancy-applications-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'vacancy_applications' },
        () => {
          queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
          // Also invalidate vacancies to update application counts
          queryClient.invalidateQueries({ queryKey: ['vacancies'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: vacancyId ? [...APPLICATIONS_KEY, vacancyId] : APPLICATIONS_KEY,
    queryFn: () => vacancyId ? getApplicationsForVacancy(vacancyId) : getAllApplications(),
  });
};

export const useApplication = (id: string) => {
  return useQuery({
    queryKey: [...APPLICATIONS_KEY, 'detail', id],
    queryFn: () => getApplicationById(id),
    enabled: !!id,
  });
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (application: Omit<VacancyApplication, 'id' | 'applied_at' | 'updated_at'>) =>
      createApplication(application),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
      queryClient.invalidateQueries({ queryKey: [...APPLICATIONS_KEY, variables.vacancy_id] });
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      notes,
    }: {
      id: string;
      status: VacancyApplication['status'];
      notes?: string;
    }) => updateApplicationStatus(id, status, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
    },
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
    },
  });
};

// Bulk status update
export const useBulkUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      ids,
      status,
    }: {
      ids: string[];
      status: VacancyApplication['status'];
    }) => {
      const results = await Promise.all(
        ids.map(id => updateApplicationStatus(id, status))
      );
      return results;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
    },
  });
};

// Get new applications count
export const useNewApplicationsCount = () => {
  return useQuery({
    queryKey: [...APPLICATIONS_KEY, 'new-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('vacancy_applications')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'New');

      if (error) throw error;
      return count || 0;
    },
  });
};
