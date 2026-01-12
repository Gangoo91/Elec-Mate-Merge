import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Certification {
  id: string;
  employee_id: string;
  name: string;
  status: string;
  expiry_date: string | null;
  issue_date: string | null;
  issuing_body: string | null;
  certificate_number: string | null;
  document_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useCertifications = () => {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: async (): Promise<Certification[]> => {
      const { data, error } = await supabase
        .from('employer_certifications')
        .select('*')
        .order('expiry_date', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
  });
};

export const useCertificationsByEmployee = (employeeId: string | undefined) => {
  return useQuery({
    queryKey: ['certifications', 'employee', employeeId],
    queryFn: async (): Promise<Certification[]> => {
      if (!employeeId) return [];

      const { data, error } = await supabase
        .from('employer_certifications')
        .select('*')
        .eq('employee_id', employeeId)
        .order('expiry_date', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!employeeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
  });
};

export const useCertificationsByEmployees = (employeeIds: string[]) => {
  return useQuery({
    queryKey: ['certifications', 'employees', employeeIds],
    queryFn: async (): Promise<Certification[]> => {
      if (!employeeIds.length) return [];

      const { data, error } = await supabase
        .from('employer_certifications')
        .select('*')
        .in('employee_id', employeeIds)
        .eq('status', 'Valid')
        .order('employee_id');

      if (error) throw error;
      return data || [];
    },
    enabled: employeeIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
  });
};
