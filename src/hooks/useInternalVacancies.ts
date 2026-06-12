import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { getMyElecIdProfile, getMyElecIdProfileId } from '@/utils/elecIdLinkage';
import type { InternalVacancy } from '@/components/electrician/vacancies/InternalVacancyCard';

// Query keys
const INTERNAL_VACANCIES_KEY = ['internal-vacancies'];
const MY_APPLICATIONS_KEY = ['my-applications'];

export interface VacancyFilters {
  location?: string;
  type?: string;
  minSalary?: number;
  maxSalary?: number;
  searchQuery?: string;
}

/**
 * Hook for sparks to browse all open vacancies from employers
 */
export function useInternalVacancies(filters?: VacancyFilters) {
  const queryClient = useQueryClient();

  // Real-time subscription for new vacancies
  useEffect(() => {
    const channel = supabase
      .channel(realtimeChannelName('internal-vacancies-changes'))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'employer_vacancies' }, () => {
        queryClient.invalidateQueries({ queryKey: INTERNAL_VACANCIES_KEY });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: [...INTERNAL_VACANCIES_KEY, filters],
    placeholderData: keepPreviousData, // Show previous data while refetching
    queryFn: async (): Promise<InternalVacancy[]> => {
      // Get current user's elec_id_profile to check applications
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let query = supabase
        .from('employer_vacancies')
        .select(
          `
          id,
          title,
          location,
          type,
          status,
          salary_min,
          salary_max,
          salary_period,
          description,
          requirements,
          benefits,
          closing_date,
          views,
          created_at,
          employer_id
        `
        )
        .eq('status', 'Open')
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      if (filters?.type) {
        query = query.eq('type', filters.type);
      }
      if (filters?.minSalary) {
        query = query.gte('salary_min', filters.minSalary);
      }
      if (filters?.maxSalary) {
        query = query.lte('salary_max', filters.maxSalary);
      }
      if (filters?.searchQuery) {
        query = query.or(
          `title.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`
        );
      }

      const { data: vacancies, error } = await query;

      if (error) {
        console.error('Error fetching vacancies:', error);
        throw error;
      }

      // If user is logged in, check their applications
      let applicationVacancyIds: Set<string> = new Set();
      if (user) {
        const profileId = await getMyElecIdProfileId();
        if (profileId) {
          // Get their applications
          const { data: applications } = await supabase
            .from('employer_vacancy_applications')
            .select('vacancy_id')
            .eq('applicant_profile_id', profileId);

          applicationVacancyIds = new Set((applications || []).map((a) => a.vacancy_id));
        }
      }

      // Company branding via the sanctioned RPC (company_profiles is owner-only)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const employerIds = [...new Set((vacancies || []).map((v: any) => v.employer_id).filter(Boolean))];
      let companies: Record<string, { company_name?: string; logo_url?: string }> = {};
      if (employerIds.length > 0) {
        const { data: companyData } = await supabase.rpc('get_job_ad_companies', {
          p_employer_ids: employerIds,
        });
        companies = (companyData as typeof companies) || {};
      }

      // Transform data to match InternalVacancy type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (vacancies || []).map((v: any) => ({
        id: v.id,
        title: v.title,
        location: v.location,
        type: v.type || 'Full-time',
        status: v.status,
        salary_min: v.salary_min,
        salary_max: v.salary_max,
        salary_period: v.salary_period || 'annual',
        description: v.description || '',
        requirements: v.requirements || [],
        benefits: v.benefits || [],
        closing_date: v.closing_date,
        views: v.views || 0,
        created_at: v.created_at,
        employer: v.employer_id
          ? {
              id: v.employer_id,
              company_name: companies[v.employer_id]?.company_name || 'Employer',
              logo_url: companies[v.employer_id]?.logo_url ?? null,
            }
          : undefined,
        has_applied: applicationVacancyIds.has(v.id),
      }));
    },
  });
}

/**
 * Hook for a single vacancy by ID
 */
export function useInternalVacancy(id: string | undefined) {
  return useQuery({
    queryKey: [...INTERNAL_VACANCIES_KEY, 'detail', id],
    queryFn: async (): Promise<InternalVacancy | null> => {
      if (!id) return null;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: vacancy, error } = await supabase
        .from('employer_vacancies')
        .select(
          `
          id,
          title,
          location,
          type,
          status,
          salary_min,
          salary_max,
          salary_period,
          description,
          requirements,
          benefits,
          closing_date,
          views,
          created_at
        `
        )
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching vacancy:', error);
        return null;
      }

      // Check if user has applied
      let hasApplied = false;
      if (user) {
        const profileId = await getMyElecIdProfileId();
        if (profileId) {
          const { data: application } = await supabase
            .from('employer_vacancy_applications')
            .select('id')
            .eq('vacancy_id', id)
            .eq('applicant_profile_id', profileId)
            .maybeSingle();

          hasApplied = !!application;
        }
      }

      // Increment views (definer RPC — workers can't update employer rows directly)
      await supabase.rpc('increment_vacancy_views', { vacancy_id: id });

      return {
        id: vacancy.id,
        title: vacancy.title,
        location: vacancy.location,
        type: vacancy.type || 'Full-time',
        status: vacancy.status,
        salary_min: vacancy.salary_min,
        salary_max: vacancy.salary_max,
        salary_period: vacancy.salary_period || 'annual',
        description: vacancy.description || '',
        requirements: vacancy.requirements || [],
        benefits: vacancy.benefits || [],
        closing_date: vacancy.closing_date,
        views: vacancy.views || 0,
        created_at: vacancy.created_at,
        employer: undefined,
        has_applied: hasApplied,
      };
    },
    enabled: !!id,
  });
}

/**
 * Hook to apply to a vacancy
 */
export function useApplyToVacancy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      vacancyId,
      coverLetter,
      cvUrl,
    }: {
      vacancyId: string;
      coverLetter?: string;
      cvUrl?: string;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get elec_id_profile through the real linkage
      const profile = await getMyElecIdProfile<{
        id: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        employee: any;
      }>('id, employee:employer_employees(name, email, phone)');

      if (!profile) {
        throw new Error('Please complete your Elec-ID profile first');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const employee = (profile as any).employee;

      // Create application with optional CV attachment
      const { data: application, error } = await supabase
        .from('employer_vacancy_applications')
        .insert({
          vacancy_id: vacancyId,
          applicant_profile_id: profile.id,
          applicant_name: employee?.name || 'Unknown',
          applicant_email: employee?.email,
          applicant_phone: employee?.phone,
          cover_letter: coverLetter,
          cv_url: cvUrl, // Include CV if provided
          status: 'New',
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          throw new Error('You have already applied to this vacancy');
        }
        throw error;
      }

      // Applying resolves any open invitation to this vacancy automatically
      await supabase
        .from('employer_vacancy_invitations')
        .update({ status: 'applied', responded_at: new Date().toISOString() })
        .eq('vacancy_id', vacancyId)
        .eq('electrician_profile_id', profile.id)
        .in('status', ['pending', 'viewed']);

      // Keep the vacancy's applications counter honest
      await supabase.rpc('increment_applications_count', { vacancy_id: vacancyId });

      return application;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INTERNAL_VACANCIES_KEY });
      queryClient.invalidateQueries({ queryKey: MY_APPLICATIONS_KEY });
      queryClient.invalidateQueries({ queryKey: ['my-invitations'] });
      // Also invalidate conversations as applying unlocks chat
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

/**
 * Hook to get spark's own applications
 */
export function useMyApplications() {
  return useQuery({
    queryKey: MY_APPLICATIONS_KEY,
    placeholderData: keepPreviousData, // Show previous data while refetching
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const profileId = await getMyElecIdProfileId();
      if (!profileId) return [];

      const { data: applications, error } = await supabase
        .from('employer_vacancy_applications')
        .select(
          `
          id,
          vacancy_id,
          cover_letter,
          status,
          applied_at,
          vacancy:employer_vacancies (
            id,
            title,
            location,
            type,
            status,
            employer_id
          )
        `
        )
        .eq('applicant_profile_id', profileId)
        .order('applied_at', { ascending: false });

      if (error) throw error;

      const rows = applications || [];
      const employerIds = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...new Set(rows.map((a: any) => a.vacancy?.employer_id).filter(Boolean)),
      ];
      let companies: Record<string, { company_name?: string; logo_url?: string }> = {};
      if (employerIds.length > 0) {
        const { data: companyData } = await supabase.rpc('get_job_ad_companies', {
          p_employer_ids: employerIds,
        });
        companies = (companyData as typeof companies) || {};
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return rows.map((a: any) => ({
        ...a,
        vacancy: a.vacancy
          ? {
              ...a.vacancy,
              employer: a.vacancy.employer_id
                ? { id: a.vacancy.employer_id, ...companies[a.vacancy.employer_id] }
                : undefined,
            }
          : a.vacancy,
      }));
    },
  });
}

/**
 * Hook to get vacancy invitations for the spark
 */
export function useMyInvitations() {
  const queryClient = useQueryClient();

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel(realtimeChannelName('my-invitations-changes'))
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'employer_vacancy_invitations' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['my-invitations'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['my-invitations'],
    placeholderData: keepPreviousData, // Show previous data while refetching
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const profileId = await getMyElecIdProfileId();
      if (!profileId) return [];

      const { data: invitations, error } = await supabase
        .from('employer_vacancy_invitations')
        .select(
          `
          id,
          vacancy_id,
          message,
          status,
          sent_at,
          expires_at,
          vacancy:employer_vacancies (
            id,
            title,
            location,
            type,
            employer_id
          )
        `
        )
        .eq('electrician_profile_id', profileId)
        .in('status', ['pending', 'viewed'])
        .order('sent_at', { ascending: false });

      if (error) throw error;

      const rows = invitations || [];
      const employerIds = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...new Set(rows.map((i: any) => i.vacancy?.employer_id).filter(Boolean)),
      ];
      let companies: Record<string, { company_name?: string; logo_url?: string }> = {};
      if (employerIds.length > 0) {
        const { data: companyData } = await supabase.rpc('get_job_ad_companies', {
          p_employer_ids: employerIds,
        });
        companies = (companyData as typeof companies) || {};
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return rows.map((i: any) => ({
        ...i,
        vacancy: i.vacancy
          ? {
              ...i.vacancy,
              employer: i.vacancy.employer_id
                ? { id: i.vacancy.employer_id, ...companies[i.vacancy.employer_id] }
                : undefined,
            }
          : i.vacancy,
      }));
    },
  });
}

/**
 * Hook to respond to an invitation
 */
export function useRespondToInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      invitationId,
      response,
    }: {
      invitationId: string;
      response: 'applied' | 'declined';
    }) => {
      const { data, error } = await supabase
        .from('employer_vacancy_invitations')
        .update({
          status: response,
          responded_at: new Date().toISOString(),
        })
        .eq('id', invitationId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-invitations'] });
      queryClient.invalidateQueries({ queryKey: INTERNAL_VACANCIES_KEY });
    },
  });
}
