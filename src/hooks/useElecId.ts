import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getElecIdProfiles,
  getElecIdProfileByEmployeeId,
  getElecIdProfileByNumber,
  createElecIdProfile,
  updateElecIdProfile,
  verifyElecIdProfile,
  generateShareableLink,
  addElecIdSkill,
  deleteElecIdSkill,
  addElecIdWorkHistory,
  deleteElecIdWorkHistory,
  addElecIdTraining,
  deleteElecIdTraining,
  addElecIdQualification,
  deleteElecIdQualification,
  ElecIdProfile,
  ElecIdSkill,
  ElecIdWorkHistory,
  ElecIdTraining,
  ElecIdQualification,
} from '@/services/elecIdService';

// Query hooks
export const useElecIdProfiles = () => {
  return useQuery({
    queryKey: ['elec-id-profiles'],
    queryFn: getElecIdProfiles,
  });
};

export const useElecIdProfileByEmployee = (employeeId: string) => {
  return useQuery({
    queryKey: ['elec-id-profiles', 'employee', employeeId],
    queryFn: () => getElecIdProfileByEmployeeId(employeeId),
    enabled: !!employeeId,
  });
};

export const useElecIdProfileByNumber = (elecIdNumber: string) => {
  return useQuery({
    queryKey: ['elec-id-profiles', 'number', elecIdNumber],
    queryFn: () => getElecIdProfileByNumber(elecIdNumber),
    enabled: !!elecIdNumber,
  });
};

// Mutation hooks
export const useCreateElecIdProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof createElecIdProfile>[0]) => createElecIdProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elec-id-profiles'] });
    },
  });
};

export const useUpdateElecIdProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<ElecIdProfile> }) =>
      updateElecIdProfile(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elec-id-profiles'] });
    },
  });
};

export const useVerifyElecIdProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, verifiedBy }: { id: string; verifiedBy: string }) =>
      verifyElecIdProfile(id, verifiedBy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elec-id-profiles'] });
    },
  });
};

export const useGenerateShareableLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => generateShareableLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elec-id-profiles'] });
    },
  });
};

// Skills mutations
export const useAddElecIdSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<ElecIdSkill, 'id' | 'created_at'>) => addElecIdSkill(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elec-id-profiles'] });
    },
  });
};

export const useDeleteElecIdSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteElecIdSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elec-id-profiles'] });
    },
  });
};

// Work History mutations
export const useAddElecIdWorkHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<ElecIdWorkHistory, 'id' | 'created_at'>) => addElecIdWorkHistory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elec-id-profiles'] });
    },
  });
};

export const useDeleteElecIdWorkHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteElecIdWorkHistory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elec-id-profiles'] });
    },
  });
};

// Training mutations
export const useAddElecIdTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<ElecIdTraining, 'id' | 'created_at'>) => addElecIdTraining(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elec-id-profiles'] });
    },
  });
};

export const useDeleteElecIdTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteElecIdTraining(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elec-id-profiles'] });
    },
  });
};

// Qualifications mutations
export const useAddElecIdQualification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<ElecIdQualification, 'id' | 'created_at'>) => addElecIdQualification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elec-id-profiles'] });
    },
  });
};

export const useDeleteElecIdQualification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteElecIdQualification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elec-id-profiles'] });
    },
  });
};
