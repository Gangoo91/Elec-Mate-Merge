import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getActiveEmployees,
  Employee,
} from '@/services/employeeService';

// Query keys
const EMPLOYEES_KEY = ['employer-employees'];

export const useEmployees = () => {
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('employer-employees-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'employer_employees' },
        () => {
          queryClient.invalidateQueries({ queryKey: EMPLOYEES_KEY });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: EMPLOYEES_KEY,
    queryFn: getEmployees,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
  });
};

export const useActiveEmployees = () => {
  return useQuery({
    queryKey: [...EMPLOYEES_KEY, 'active'],
    queryFn: getActiveEmployees,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: [...EMPLOYEES_KEY, id],
    queryFn: () => getEmployeeById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (employee: Omit<Employee, 'id' | 'created_at' | 'updated_at'>) =>
      createEmployee(employee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMPLOYEES_KEY });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Employee> }) =>
      updateEmployee(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: EMPLOYEES_KEY });
      queryClient.invalidateQueries({ queryKey: [...EMPLOYEES_KEY, variables.id] });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMPLOYEES_KEY });
    },
  });
};
