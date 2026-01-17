/**
 * useCV - React Query hooks for CV CRUD operations
 *
 * Provides hooks for managing user CVs stored in the user_cvs table:
 * - useCVs() - Fetch all user's CVs
 * - useCV(cvId) - Fetch a single CV by ID
 * - usePrimaryCV() - Fetch the user's primary CV
 * - useCreateCV() - Create a new CV
 * - useUpdateCV() - Update an existing CV
 * - useDeleteCV() - Delete a CV
 * - useSetPrimaryCV() - Set a CV as primary
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { CVData } from '@/components/cv-builder/types';
import { CVTemplateId } from '@/components/cv-builder/premium/CVTemplateShowcase';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface UserCV {
  id: string;
  user_id: string;
  template_id: CVTemplateId;
  cv_data: CVData;
  pdf_url: string | null;
  is_primary: boolean;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCVInput {
  template_id: CVTemplateId;
  cv_data: CVData;
  title?: string;
  is_primary?: boolean;
}

export interface UpdateCVInput {
  template_id?: CVTemplateId;
  cv_data?: CVData;
  title?: string;
  pdf_url?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// QUERY KEYS
// ═══════════════════════════════════════════════════════════════════════════

export const cvQueryKeys = {
  all: ['cvs'] as const,
  lists: () => [...cvQueryKeys.all, 'list'] as const,
  list: (userId: string) => [...cvQueryKeys.lists(), userId] as const,
  details: () => [...cvQueryKeys.all, 'detail'] as const,
  detail: (cvId: string) => [...cvQueryKeys.details(), cvId] as const,
  primary: (userId: string) => [...cvQueryKeys.all, 'primary', userId] as const,
};

// ═══════════════════════════════════════════════════════════════════════════
// FETCH FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

async function fetchUserCVs(userId: string): Promise<UserCV[]> {
  const { data, error } = await supabase
    .from('user_cvs')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch CVs: ${error.message}`);
  }

  return (data || []).map(cv => ({
    ...cv,
    template_id: cv.template_id as CVTemplateId,
    cv_data: cv.cv_data as CVData,
    is_primary: cv.is_primary ?? false,
    title: cv.title ?? 'My CV',
  }));
}

async function fetchCV(cvId: string): Promise<UserCV | null> {
  const { data, error } = await supabase
    .from('user_cvs')
    .select('*')
    .eq('id', cvId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw new Error(`Failed to fetch CV: ${error.message}`);
  }

  return data ? {
    ...data,
    template_id: data.template_id as CVTemplateId,
    cv_data: data.cv_data as CVData,
    is_primary: data.is_primary ?? false,
    title: data.title ?? 'My CV',
  } : null;
}

async function fetchPrimaryCV(userId: string): Promise<UserCV | null> {
  const { data, error } = await supabase
    .from('user_cvs')
    .select('*')
    .eq('user_id', userId)
    .eq('is_primary', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No primary CV set
    throw new Error(`Failed to fetch primary CV: ${error.message}`);
  }

  return data ? {
    ...data,
    template_id: data.template_id as CVTemplateId,
    cv_data: data.cv_data as CVData,
    is_primary: true,
    title: data.title ?? 'My CV',
  } : null;
}

// ═══════════════════════════════════════════════════════════════════════════
// MUTATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

async function createCV(userId: string, input: CreateCVInput): Promise<UserCV> {
  // If this is set as primary, unset other primary CVs first
  if (input.is_primary) {
    await supabase
      .from('user_cvs')
      .update({ is_primary: false })
      .eq('user_id', userId)
      .eq('is_primary', true);
  }

  const { data, error } = await supabase
    .from('user_cvs')
    .insert({
      user_id: userId,
      template_id: input.template_id,
      cv_data: input.cv_data as unknown as Record<string, unknown>,
      title: input.title || 'My CV',
      is_primary: input.is_primary ?? false,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create CV: ${error.message}`);
  }

  return {
    ...data,
    template_id: data.template_id as CVTemplateId,
    cv_data: data.cv_data as CVData,
    is_primary: data.is_primary ?? false,
    title: data.title ?? 'My CV',
  };
}

async function updateCV(cvId: string, input: UpdateCVInput): Promise<UserCV> {
  const updateData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (input.template_id !== undefined) updateData.template_id = input.template_id;
  if (input.cv_data !== undefined) updateData.cv_data = input.cv_data as unknown as Record<string, unknown>;
  if (input.title !== undefined) updateData.title = input.title;
  if (input.pdf_url !== undefined) updateData.pdf_url = input.pdf_url;

  const { data, error } = await supabase
    .from('user_cvs')
    .update(updateData)
    .eq('id', cvId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update CV: ${error.message}`);
  }

  return {
    ...data,
    template_id: data.template_id as CVTemplateId,
    cv_data: data.cv_data as CVData,
    is_primary: data.is_primary ?? false,
    title: data.title ?? 'My CV',
  };
}

async function deleteCV(cvId: string): Promise<void> {
  const { error } = await supabase
    .from('user_cvs')
    .delete()
    .eq('id', cvId);

  if (error) {
    throw new Error(`Failed to delete CV: ${error.message}`);
  }
}

async function setAsPrimary(userId: string, cvId: string): Promise<void> {
  // First, unset all other primary CVs
  const { error: unsetError } = await supabase
    .from('user_cvs')
    .update({ is_primary: false })
    .eq('user_id', userId)
    .eq('is_primary', true);

  if (unsetError) {
    throw new Error(`Failed to unset primary CVs: ${unsetError.message}`);
  }

  // Set the new primary CV
  const { error: setError } = await supabase
    .from('user_cvs')
    .update({ is_primary: true, updated_at: new Date().toISOString() })
    .eq('id', cvId);

  if (setError) {
    throw new Error(`Failed to set primary CV: ${setError.message}`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// QUERY HOOKS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Fetch all CVs for the current user
 */
export function useCVs() {
  const { user } = useAuth();

  return useQuery({
    queryKey: cvQueryKeys.list(user?.id || ''),
    queryFn: () => fetchUserCVs(user!.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Fetch a single CV by ID
 */
export function useCV(cvId: string | undefined) {
  return useQuery({
    queryKey: cvQueryKeys.detail(cvId || ''),
    queryFn: () => fetchCV(cvId!),
    enabled: !!cvId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Fetch the user's primary CV
 */
export function usePrimaryCV() {
  const { user } = useAuth();

  return useQuery({
    queryKey: cvQueryKeys.primary(user?.id || ''),
    queryFn: () => fetchPrimaryCV(user!.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// MUTATION HOOKS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Create a new CV
 */
export function useCreateCV() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCVInput) => createCV(user!.id, input),
    onSuccess: (newCV) => {
      // Invalidate CV list
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.list(user!.id) });

      // If this is primary, also invalidate primary query
      if (newCV.is_primary) {
        queryClient.invalidateQueries({ queryKey: cvQueryKeys.primary(user!.id) });
      }
    },
  });
}

/**
 * Update an existing CV
 */
export function useUpdateCV() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cvId, ...input }: UpdateCVInput & { cvId: string }) =>
      updateCV(cvId, input),
    onSuccess: (updatedCV) => {
      // Invalidate specific CV
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.detail(updatedCV.id) });

      // Invalidate CV list
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.list(user!.id) });

      // Also update primary if this was the primary CV
      if (updatedCV.is_primary) {
        queryClient.invalidateQueries({ queryKey: cvQueryKeys.primary(user!.id) });
      }
    },
  });
}

/**
 * Delete a CV
 */
export function useDeleteCV() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cvId: string) => deleteCV(cvId),
    onSuccess: (_, cvId) => {
      // Invalidate specific CV
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.detail(cvId) });

      // Invalidate CV list
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.list(user!.id) });

      // Invalidate primary (in case deleted CV was primary)
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.primary(user!.id) });
    },
  });
}

/**
 * Set a CV as the primary CV
 */
export function useSetPrimaryCV() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cvId: string) => setAsPrimary(user!.id, cvId),
    onSuccess: () => {
      // Invalidate all CV queries to reflect the change
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.list(user!.id) });
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.primary(user!.id) });
    },
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate CV completeness percentage
 */
export function calculateCVCompleteness(cvData: CVData): number {
  let score = 0;
  const weights = {
    fullName: 10,
    email: 10,
    phone: 8,
    address: 5,
    postcode: 5,
    professionalSummary: 15,
    experience: 25,
    education: 12,
    skills: 5,
    certifications: 5,
  };

  // Personal info
  if (cvData.personalInfo.fullName?.trim()) score += weights.fullName;
  if (cvData.personalInfo.email?.trim()) score += weights.email;
  if (cvData.personalInfo.phone?.trim()) score += weights.phone;
  if (cvData.personalInfo.address?.trim()) score += weights.address;
  if (cvData.personalInfo.postcode?.trim()) score += weights.postcode;
  if (cvData.personalInfo.professionalSummary?.trim().length >= 50) score += weights.professionalSummary;

  // Experience (max weight if 2+ entries with descriptions)
  if (cvData.experience.length >= 2 && cvData.experience.some(e => e.description)) {
    score += weights.experience;
  } else if (cvData.experience.length >= 1) {
    score += weights.experience * 0.6;
  }

  // Education
  if (cvData.education.length >= 1) {
    score += weights.education;
  }

  // Skills (max weight if 5+ skills)
  if (cvData.skills.length >= 5) {
    score += weights.skills;
  } else if (cvData.skills.length >= 2) {
    score += weights.skills * 0.6;
  }

  // Certifications
  if (cvData.certifications.length >= 2) {
    score += weights.certifications;
  } else if (cvData.certifications.length >= 1) {
    score += weights.certifications * 0.6;
  }

  return Math.min(100, Math.round(score));
}

/**
 * Get a CV title suggestion based on content
 */
export function suggestCVTitle(cvData: CVData): string {
  const name = cvData.personalInfo.fullName?.trim();
  const latestJob = cvData.experience[0]?.jobTitle;

  if (latestJob) {
    return `${name || 'My'} - ${latestJob}`;
  }

  if (name) {
    return `${name}'s CV`;
  }

  return 'My CV';
}
