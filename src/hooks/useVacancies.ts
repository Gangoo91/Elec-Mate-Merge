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
  VacancyStatus,
} from '@/services/vacancyService';
import type { VacancyFormData } from '@/components/employer/vacancy-form/schema';

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
        { event: '*', schema: 'public', table: 'employer_vacancies' },
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
    mutationFn: (formData: VacancyFormData) => {
      // Transform camelCase form data to snake_case database format
      const vacancy = {
        title: formData.title,
        location: formData.location,
        type: formData.type as Vacancy['type'],
        status: 'Open' as VacancyStatus,
        salary_min: formData.salaryMin || null,
        salary_max: formData.salaryMax || null,
        salary_period: formData.salaryPeriod || 'year',
        description: formData.description || null,
        requirements: formData.requirements || [],
        benefits: formData.benefits || [],
        closing_date: formData.closingDate || null,
      };
      return createVacancy(vacancy);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VACANCIES_KEY });
      queryClient.invalidateQueries({ queryKey: VACANCY_STATS_KEY });
    },
  });
};

export const useUpdateVacancy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<VacancyFormData> }) => {
      // Transform camelCase form data to snake_case database format
      const dbUpdates: Partial<Vacancy> = {};

      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.location !== undefined) dbUpdates.location = updates.location;
      if (updates.type !== undefined) dbUpdates.type = updates.type as Vacancy['type'];
      if (updates.salaryMin !== undefined) dbUpdates.salary_min = updates.salaryMin || null;
      if (updates.salaryMax !== undefined) dbUpdates.salary_max = updates.salaryMax || null;
      if (updates.salaryPeriod !== undefined) dbUpdates.salary_period = updates.salaryPeriod;
      if (updates.description !== undefined) dbUpdates.description = updates.description || null;
      if (updates.requirements !== undefined) dbUpdates.requirements = updates.requirements;
      if (updates.benefits !== undefined) dbUpdates.benefits = updates.benefits;
      if (updates.closingDate !== undefined) dbUpdates.closing_date = updates.closingDate || null;

      return updateVacancy(id, dbUpdates);
    },
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
