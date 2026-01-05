import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCollegeStaff,
  getActiveCollegeStaff,
  getCollegeStaffById,
  getCollegeStaffByRole,
  createCollegeStaff,
  updateCollegeStaff,
  archiveCollegeStaff,
  deleteCollegeStaff,
  CollegeStaff,
  StaffRole,
} from '@/services/college';

export const useCollegeStaff = (collegeId?: string) => {
  return useQuery({
    queryKey: ['college-staff', collegeId],
    queryFn: () => getCollegeStaff(collegeId),
  });
};

export const useActiveCollegeStaff = (collegeId?: string) => {
  return useQuery({
    queryKey: ['college-staff', 'active', collegeId],
    queryFn: () => getActiveCollegeStaff(collegeId),
  });
};

export const useCollegeStaffMember = (id: string) => {
  return useQuery({
    queryKey: ['college-staff', 'member', id],
    queryFn: () => getCollegeStaffById(id),
    enabled: !!id,
  });
};

export const useCollegeStaffByRole = (role: StaffRole, collegeId?: string) => {
  return useQuery({
    queryKey: ['college-staff', 'role', role, collegeId],
    queryFn: () => getCollegeStaffByRole(role, collegeId),
  });
};

export const useCreateCollegeStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (staff: Omit<CollegeStaff, 'id' | 'created_at' | 'updated_at'>) =>
      createCollegeStaff(staff),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-staff'] });
    },
  });
};

export const useUpdateCollegeStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<CollegeStaff> }) =>
      updateCollegeStaff(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['college-staff'] });
      queryClient.invalidateQueries({ queryKey: ['college-staff', 'member', variables.id] });
    },
  });
};

export const useArchiveCollegeStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archiveCollegeStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-staff'] });
    },
  });
};

export const useDeleteCollegeStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCollegeStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-staff'] });
    },
  });
};
