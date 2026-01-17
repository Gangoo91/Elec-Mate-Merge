/**
 * useCVSync - Hybrid sync between Elec-ID and CV data
 *
 * Sync Strategy:
 * - AUTO-SYNC: Skills and Certifications (merge & dedupe)
 * - ON-DEMAND: Work History → Experience, Training → Education
 * - CV-ONLY: Professional Summary, Template, Formatting
 *
 * This ensures the CV always has up-to-date credentials while
 * preserving user-customised content.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { CVData, WorkExperience, Education } from '@/components/cv-builder/types';
import {
  getCurrentUserElecIdForCV,
  ElecIdProfile,
  ElecIdSkill,
  ElecIdWorkHistory,
  ElecIdTraining,
  ElecIdQualification,
} from '@/services/elecIdService';
import { useUpdateCV, cvQueryKeys } from './useCV';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface SyncStatus {
  isInSync: boolean;
  pendingSkills: string[];
  pendingCertifications: string[];
  hasElecIdProfile: boolean;
  lastSynced: Date | null;
}

export interface SyncPreview {
  skills: {
    toAdd: string[];
    toRemove: string[];
    unchanged: string[];
  };
  certifications: {
    toAdd: string[];
    toRemove: string[];
    unchanged: string[];
  };
}

export interface ImportPreview {
  experience: {
    available: WorkExperience[];
    alreadyImported: string[];
  };
  education: {
    available: Education[];
    alreadyImported: string[];
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// QUERY KEYS
// ═══════════════════════════════════════════════════════════════════════════

export const elecIdQueryKeys = {
  all: ['elec-id'] as const,
  forCV: () => [...elecIdQueryKeys.all, 'for-cv'] as const,
};

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Normalise a string for comparison (lowercase, trimmed)
 */
function normalise(str: string): string {
  return str.toLowerCase().trim();
}

/**
 * Check if two strings are equivalent (case-insensitive)
 */
function stringsMatch(a: string, b: string): boolean {
  return normalise(a) === normalise(b);
}

/**
 * Convert Elec-ID skills to CV skill strings
 */
function elecIdSkillsToCVSkills(skills: ElecIdSkill[]): string[] {
  return skills.map(s => s.skill_name).filter(Boolean);
}

/**
 * Convert Elec-ID qualifications to CV certification strings
 */
function elecIdQualificationsToCVCertifications(qualifications: ElecIdQualification[]): string[] {
  return qualifications.map(q => q.qualification_name).filter(Boolean);
}

/**
 * Convert Elec-ID work history to CV work experience
 */
function elecIdWorkHistoryToCVExperience(workHistory: ElecIdWorkHistory[]): WorkExperience[] {
  return workHistory.map(wh => ({
    id: wh.id,
    jobTitle: wh.job_title,
    company: wh.employer_name,
    location: '', // Elec-ID doesn't have location
    startDate: wh.start_date || '',
    endDate: wh.end_date || '',
    current: wh.is_current,
    description: wh.description || '',
  }));
}

/**
 * Convert Elec-ID training to CV education
 */
function elecIdTrainingToCVEducation(training: ElecIdTraining[]): Education[] {
  return training.map(t => ({
    id: t.id,
    qualification: t.training_name,
    institution: t.provider || '',
    location: '',
    startDate: '',
    endDate: t.completed_date || '',
    current: t.status !== 'completed',
    grade: t.status === 'completed' ? 'Completed' : 'In Progress',
  }));
}

/**
 * Merge and dedupe arrays (case-insensitive)
 */
function mergeAndDedupe(existing: string[], newItems: string[]): string[] {
  const normalisedExisting = new Set(existing.map(normalise));
  const result = [...existing];

  for (const item of newItems) {
    if (!normalisedExisting.has(normalise(item))) {
      result.push(item);
      normalisedExisting.add(normalise(item));
    }
  }

  return result;
}

/**
 * Calculate sync preview between Elec-ID and CV data
 */
function calculateSyncPreview(
  cvData: CVData,
  elecIdProfile: ElecIdProfile | null
): SyncPreview {
  if (!elecIdProfile) {
    return {
      skills: { toAdd: [], toRemove: [], unchanged: cvData.skills },
      certifications: { toAdd: [], toRemove: [], unchanged: cvData.certifications },
    };
  }

  const elecIdSkills = elecIdSkillsToCVSkills(elecIdProfile.skills || []);
  const elecIdCerts = elecIdQualificationsToCVCertifications(elecIdProfile.qualifications || []);

  // Calculate skill changes
  const cvSkillsNorm = new Set(cvData.skills.map(normalise));
  const elecIdSkillsNorm = new Set(elecIdSkills.map(normalise));

  const skillsToAdd = elecIdSkills.filter(s => !cvSkillsNorm.has(normalise(s)));
  const skillsUnchanged = cvData.skills.filter(s => elecIdSkillsNorm.has(normalise(s)));
  const skillsToRemove: string[] = []; // We don't remove, only add

  // Calculate certification changes
  const cvCertsNorm = new Set(cvData.certifications.map(normalise));
  const elecIdCertsNorm = new Set(elecIdCerts.map(normalise));

  const certsToAdd = elecIdCerts.filter(c => !cvCertsNorm.has(normalise(c)));
  const certsUnchanged = cvData.certifications.filter(c => elecIdCertsNorm.has(normalise(c)));
  const certsToRemove: string[] = []; // We don't remove, only add

  return {
    skills: {
      toAdd: skillsToAdd,
      toRemove: skillsToRemove,
      unchanged: skillsUnchanged,
    },
    certifications: {
      toAdd: certsToAdd,
      toRemove: certsToRemove,
      unchanged: certsUnchanged,
    },
  };
}

/**
 * Calculate import preview for work history and training
 */
function calculateImportPreview(
  cvData: CVData,
  elecIdProfile: ElecIdProfile | null
): ImportPreview {
  if (!elecIdProfile) {
    return {
      experience: { available: [], alreadyImported: [] },
      education: { available: [], alreadyImported: [] },
    };
  }

  const elecIdExperience = elecIdWorkHistoryToCVExperience(elecIdProfile.work_history || []);
  const elecIdEducation = elecIdTrainingToCVEducation(elecIdProfile.training || []);

  // Find which work history entries are already in CV
  const cvJobTitles = new Set(cvData.experience.map(e => normalise(`${e.jobTitle}-${e.company}`)));
  const alreadyImportedExp = elecIdExperience
    .filter(e => cvJobTitles.has(normalise(`${e.jobTitle}-${e.company}`)))
    .map(e => e.id);
  const availableExp = elecIdExperience.filter(
    e => !cvJobTitles.has(normalise(`${e.jobTitle}-${e.company}`))
  );

  // Find which training entries are already in CV
  const cvQualifications = new Set(cvData.education.map(e => normalise(e.qualification)));
  const alreadyImportedEdu = elecIdEducation
    .filter(e => cvQualifications.has(normalise(e.qualification)))
    .map(e => e.id);
  const availableEdu = elecIdEducation.filter(
    e => !cvQualifications.has(normalise(e.qualification))
  );

  return {
    experience: {
      available: availableExp,
      alreadyImported: alreadyImportedExp,
    },
    education: {
      available: availableEdu,
      alreadyImported: alreadyImportedEdu,
    },
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Fetch current user's Elec-ID data for CV sync
 */
export function useElecIdForCV() {
  return useQuery({
    queryKey: elecIdQueryKeys.forCV(),
    queryFn: getCurrentUserElecIdForCV,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Main sync hook - provides sync status, preview, and sync functions
 */
export function useCVSync(cvId: string, cvData: CVData) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const updateCV = useUpdateCV();
  const { data: elecIdData, isLoading: isLoadingElecId } = useElecIdForCV();

  const elecIdProfile = elecIdData?.profile || null;

  // Calculate sync preview
  const syncPreview = calculateSyncPreview(cvData, elecIdProfile);
  const importPreview = calculateImportPreview(cvData, elecIdProfile);

  // Determine sync status
  const syncStatus: SyncStatus = {
    isInSync:
      syncPreview.skills.toAdd.length === 0 &&
      syncPreview.certifications.toAdd.length === 0,
    pendingSkills: syncPreview.skills.toAdd,
    pendingCertifications: syncPreview.certifications.toAdd,
    hasElecIdProfile: !!elecIdProfile,
    lastSynced: null, // Could be stored in CV metadata in future
  };

  // Sync skills and certifications (auto-sync fields)
  const syncSkillsAndCerts = useMutation({
    mutationFn: async () => {
      if (!elecIdProfile) {
        throw new Error('No Elec-ID profile found');
      }

      const elecIdSkills = elecIdSkillsToCVSkills(elecIdProfile.skills || []);
      const elecIdCerts = elecIdQualificationsToCVCertifications(elecIdProfile.qualifications || []);

      const newSkills = mergeAndDedupe(cvData.skills, elecIdSkills);
      const newCertifications = mergeAndDedupe(cvData.certifications, elecIdCerts);

      const updatedCVData: CVData = {
        ...cvData,
        skills: newSkills,
        certifications: newCertifications,
      };

      return updateCV.mutateAsync({ cvId, cv_data: updatedCVData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.detail(cvId) });
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.list(user!.id) });
    },
  });

  // Import work history (on-demand)
  const importWorkHistory = useMutation({
    mutationFn: async (selectedIds?: string[]) => {
      if (!elecIdProfile) {
        throw new Error('No Elec-ID profile found');
      }

      let experienceToImport = elecIdWorkHistoryToCVExperience(elecIdProfile.work_history || []);

      // Filter by selected IDs if provided
      if (selectedIds && selectedIds.length > 0) {
        experienceToImport = experienceToImport.filter(e => selectedIds.includes(e.id));
      }

      // Merge with existing, avoiding duplicates
      const existingJobKeys = new Set(
        cvData.experience.map(e => normalise(`${e.jobTitle}-${e.company}`))
      );
      const newExperience = experienceToImport.filter(
        e => !existingJobKeys.has(normalise(`${e.jobTitle}-${e.company}`))
      );

      const updatedCVData: CVData = {
        ...cvData,
        experience: [...cvData.experience, ...newExperience],
      };

      return updateCV.mutateAsync({ cvId, cv_data: updatedCVData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.detail(cvId) });
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.list(user!.id) });
    },
  });

  // Import training (on-demand)
  const importTraining = useMutation({
    mutationFn: async (selectedIds?: string[]) => {
      if (!elecIdProfile) {
        throw new Error('No Elec-ID profile found');
      }

      let educationToImport = elecIdTrainingToCVEducation(elecIdProfile.training || []);

      // Filter by selected IDs if provided
      if (selectedIds && selectedIds.length > 0) {
        educationToImport = educationToImport.filter(e => selectedIds.includes(e.id));
      }

      // Merge with existing, avoiding duplicates
      const existingQualifications = new Set(cvData.education.map(e => normalise(e.qualification)));
      const newEducation = educationToImport.filter(
        e => !existingQualifications.has(normalise(e.qualification))
      );

      const updatedCVData: CVData = {
        ...cvData,
        education: [...cvData.education, ...newEducation],
      };

      return updateCV.mutateAsync({ cvId, cv_data: updatedCVData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.detail(cvId) });
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.list(user!.id) });
    },
  });

  // Full import from Elec-ID (fills in personal info too)
  const importFromElecId = useMutation({
    mutationFn: async () => {
      if (!elecIdData) {
        throw new Error('No Elec-ID data found');
      }

      const { profile, userInfo } = elecIdData;

      const updatedCVData: CVData = {
        personalInfo: {
          ...cvData.personalInfo,
          // Only fill in if empty
          fullName: cvData.personalInfo.fullName || userInfo?.full_name || '',
          email: cvData.personalInfo.email || userInfo?.email || '',
        },
        experience: profile
          ? [
              ...cvData.experience,
              ...elecIdWorkHistoryToCVExperience(profile.work_history || []).filter(
                newExp =>
                  !cvData.experience.some(
                    e => normalise(`${e.jobTitle}-${e.company}`) === normalise(`${newExp.jobTitle}-${newExp.company}`)
                  )
              ),
            ]
          : cvData.experience,
        education: profile
          ? [
              ...cvData.education,
              ...elecIdTrainingToCVEducation(profile.training || []).filter(
                newEdu =>
                  !cvData.education.some(e => normalise(e.qualification) === normalise(newEdu.qualification))
              ),
            ]
          : cvData.education,
        skills: profile
          ? mergeAndDedupe(cvData.skills, elecIdSkillsToCVSkills(profile.skills || []))
          : cvData.skills,
        certifications: profile
          ? mergeAndDedupe(cvData.certifications, elecIdQualificationsToCVCertifications(profile.qualifications || []))
          : cvData.certifications,
      };

      return updateCV.mutateAsync({ cvId, cv_data: updatedCVData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.detail(cvId) });
      queryClient.invalidateQueries({ queryKey: cvQueryKeys.list(user!.id) });
    },
  });

  return {
    // Status
    syncStatus,
    syncPreview,
    importPreview,
    isLoading: isLoadingElecId,
    hasElecIdProfile: !!elecIdProfile,

    // Elec-ID data
    elecIdProfile,
    userInfo: elecIdData?.userInfo,

    // Sync actions
    syncSkillsAndCerts: syncSkillsAndCerts.mutate,
    isSyncingSkillsAndCerts: syncSkillsAndCerts.isPending,

    // Import actions
    importWorkHistory: importWorkHistory.mutate,
    isImportingWorkHistory: importWorkHistory.isPending,

    importTraining: importTraining.mutate,
    isImportingTraining: importTraining.isPending,

    importFromElecId: importFromElecId.mutate,
    isImportingFromElecId: importFromElecId.isPending,
  };
}

/**
 * Simple hook to check if CV needs sync (for badges/indicators)
 */
export function useCVSyncStatus(cvData: CVData | undefined) {
  const { data: elecIdData, isLoading } = useElecIdForCV();

  if (isLoading || !cvData || !elecIdData?.profile) {
    return {
      isLoading,
      needsSync: false,
      pendingCount: 0,
    };
  }

  const preview = calculateSyncPreview(cvData, elecIdData.profile);
  const pendingCount = preview.skills.toAdd.length + preview.certifications.toAdd.length;

  return {
    isLoading: false,
    needsSync: pendingCount > 0,
    pendingCount,
  };
}
