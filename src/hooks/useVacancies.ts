import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  getVacancies,
  getOpenVacancies,
  getVacancyById,
  createVacancy,
  updateVacancy,
  deleteVacancy,
  getVacancyStats,
  Vacancy,
} from '@/services/vacancyService';

// Query keys
const VACANCIES_KEY = ['vacancies'];
const VACANCY_STATS_KEY = ['vacancies', 'stats'];

export const useVacancies = () => {
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('vacancies-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'vacancies' },
        () => {
          queryClient.invalidateQueries({ queryKey: VACANCIES_KEY });
          queryClient.invalidateQueries({ queryKey: VACANCY_STATS_KEY });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: VACANCIES_KEY,
    queryFn: getVacancies,
  });
};

export const useOpenVacancies = () => {
  return useQuery({
    queryKey: [...VACANCIES_KEY, 'open'],
    queryFn: getOpenVacancies,
  });
};

export const useVacancy = (id: string) => {
  return useQuery({
    queryKey: [...VACANCIES_KEY, id],
    queryFn: () => getVacancyById(id),
    enabled: !!id,
  });
};

export const useVacancyStats = () => {
  return useQuery({
    queryKey: VACANCY_STATS_KEY,
    queryFn: getVacancyStats,
  });
};

export const useCreateVacancy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vacancy: Omit<Vacancy, 'id' | 'created_at' | 'updated_at' | 'views' | 'applications_count'>) =>
      createVacancy(vacancy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VACANCIES_KEY });
      queryClient.invalidateQueries({ queryKey: VACANCY_STATS_KEY });
    },
  });
};

export const useUpdateVacancy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Vacancy> }) =>
      updateVacancy(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: VACANCIES_KEY });
      queryClient.invalidateQueries({ queryKey: [...VACANCIES_KEY, variables.id] });
      queryClient.invalidateQueries({ queryKey: VACANCY_STATS_KEY });
    },
  });
};

export const useDeleteVacancy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVacancy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VACANCIES_KEY });
      queryClient.invalidateQueries({ queryKey: VACANCY_STATS_KEY });
    },
  });
};

// Quick status update helper
export const useToggleVacancyStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, currentStatus }: { id: string; currentStatus: string }) => {
      const newStatus = currentStatus === 'Open' ? 'Closed' : 'Open';
      return updateVacancy(id, { status: newStatus as Vacancy['status'] });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: VACANCIES_KEY });
      queryClient.invalidateQueries({ queryKey: [...VACANCIES_KEY, variables.id] });
      queryClient.invalidateQueries({ queryKey: VACANCY_STATS_KEY });
    },
  });
};
