import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { generateElecIdNumber } from '@/utils/elecIdGenerator';
import {
  fetchTeamCredentials,
  type CredentialItem,
  type VerificationLevel,
} from '@/services/credentialsService';

// Types matching the database schema
export type RateType = 'hourly' | 'daily' | 'weekly' | 'yearly';

/** Boundary conversion: generated Rows carry plain strings/nullables where the
 *  app narrows to unions and non-null (validated by writers/UI). Cast once at
 *  the query edge rather than implicitly at every return. */
const toElecIdProfile = (row: unknown): ElecIdProfile => row as ElecIdProfile;

export interface ElecIdProfile {
  id: string;
  employee_id: string;
  elec_id_number: string;
  ecs_card_type: string | null;
  ecs_card_number: string | null;
  ecs_expiry_date: string | null;
  bio: string | null;
  specialisations: string[] | null;
  profile_views: number;
  shareable_link: string | null;
  /** Approved by an Elec-Mate admin — a profile review, NOT a check of the
   *  ECS card or any qualification (ELE-1950). Never label it "Verified". */
  is_verified: boolean;
  verified_at: string | null;
  verified_by: string | null;
  verification_method?: string | null;
  /** How the ECS card was checked (self_declared / document_seen / verified_at_source). */
  ecs_verification_level?: VerificationLevel;
  ecs_verified_at?: string | null;
  ecs_verification_method?: string | null;
  ecs_verifier_name?: string | null;
  ecs_verifier_firm?: string | null;
  /** Firm view: the employer_employees row the profile actually hangs off
   *  (employee_id is the firm's roster row). */
  owner_employee_id?: string;
  linked_account?: boolean;
  // Rate settings
  rate_type: RateType | null;
  rate_amount: number | null;
  created_at: string;
  updated_at: string;
  // Joined data
  employee?: {
    id: string;
    name: string;
    role: string;
    photo_url: string | null;
    email: string | null;
    phone: string | null;
  };
  skills?: ElecIdSkill[];
  work_history?: ElecIdWorkHistory[];
  training?: ElecIdTraining[];
  qualifications?: ElecIdQualification[];
}

export interface ElecIdSkill {
  id: string;
  profile_id: string;
  skill_name: string;
  skill_level: string;
  years_experience: number;
  is_verified: boolean;
  created_at: string;
}

export interface ElecIdWorkHistory {
  id: string;
  profile_id: string;
  employer_name: string;
  job_title: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  projects: string[] | null;
  is_verified: boolean;
  verified_by_employer: boolean;
  created_at: string;
}

export interface ElecIdTraining {
  id: string;
  profile_id: string;
  training_name: string;
  provider: string | null;
  completed_date: string | null;
  expiry_date: string | null;
  certificate_id: string | null;
  funded_by: string | null;
  status: string;
  created_at: string;
}

/** A row in THE credentials store (employer_elec_id_qualifications) — see
 *  credentialsService for the verification model. */
export interface ElecIdQualification {
  id: string;
  profile_id: string;
  qualification_name: string;
  qualification_type: string;
  category: string | null;
  awarding_body: string | null;
  grade: string | null;
  date_achieved: string | null;
  expiry_date: string | null;
  certificate_number: string | null;
  /** Derived: true only when verified at source. */
  is_verified: boolean;
  created_at: string;
  verification_level?: VerificationLevel;
  verified_at?: string | null;
  verification_method?: string | null;
  verifier_name?: string | null;
  verifier_firm?: string | null;
  added_by_employer_id?: string | null;
  document_url?: string | null;
  training_type?: string | null;
  training_status?: CredentialItem['training_status'];
  start_date?: string | null;
  funded_by?: string | null;
}

// Fetch the firm's team Elec-IDs — each roster member resolved to THEIR
// Elec-ID (usually hanging off their own stub row, which the old roster-only
// join never saw), with the whole credentials store. Scoped server-side by
// my_employer_scope(), so co-admins see the firm's team (ELE-1950).
export const getElecIdProfiles = async (): Promise<ElecIdProfile[]> => {
  const team = await fetchTeamCredentials();
  return team.map((p) =>
    toElecIdProfile({
      ...p,
      employee_id: p.employee_id ?? p.owner_employee_id,
      training: [],
    })
  );
};

// Fetch single profile by employee ID
export const getElecIdProfileByEmployeeId = async (
  employeeId: string
): Promise<ElecIdProfile | null> => {
  const { data: profile, error } = await supabase
    .from('employer_elec_id_profiles')
    .select(
      `
      *,
      employee:employer_employees(id, name, role, photo_url, email, phone)
    `
    )
    .eq('employee_id', employeeId)
    .maybeSingle();

  if (error) throw error;
  if (!profile) return null;

  const [{ data: skills }, { data: workHistory }, { data: training }, { data: qualifications }] =
    await Promise.all([
      supabase.from('employer_elec_id_skills').select('*').eq('profile_id', profile.id),
      supabase
        .from('employer_elec_id_work_history')
        .select('*')
        .eq('profile_id', profile.id)
        .order('start_date', { ascending: false }),
      // employer_elec_id_training is LEGACY (ELE-1950) — training lives in
      // the qualifications store below
      Promise.resolve({ data: [] as ElecIdTraining[] }),
      supabase
        .from('employer_elec_id_qualifications')
        .select('*')
        .eq('profile_id', profile.id)
        .order('date_achieved', { ascending: false }),
    ]);

  return toElecIdProfile({
    ...profile,
    skills: skills || [],
    work_history: workHistory || [],
    training: training || [],
    qualifications: qualifications || [],
  });
};

// Lookup profile by Elec-ID number (for scanning)
export const getElecIdProfileByNumber = async (
  elecIdNumber: string
): Promise<ElecIdProfile | null> => {
  const { data: profile, error } = await supabase
    .from('employer_elec_id_profiles')
    .select(
      `
      *,
      employee:employer_employees(id, name, role, photo_url, email, phone)
    `
    )
    .eq('elec_id_number', elecIdNumber)
    .maybeSingle();

  if (error) throw error;
  if (!profile) return null;

  const [{ data: skills }, { data: workHistory }, { data: training }, { data: qualifications }] =
    await Promise.all([
      supabase.from('employer_elec_id_skills').select('*').eq('profile_id', profile.id),
      supabase
        .from('employer_elec_id_work_history')
        .select('*')
        .eq('profile_id', profile.id)
        .order('start_date', { ascending: false }),
      // employer_elec_id_training is LEGACY (ELE-1950) — training lives in
      // the qualifications store below
      Promise.resolve({ data: [] as ElecIdTraining[] }),
      supabase
        .from('employer_elec_id_qualifications')
        .select('*')
        .eq('profile_id', profile.id)
        .order('date_achieved', { ascending: false }),
    ]);

  // Increment profile views
  await supabase
    .from('employer_elec_id_profiles')
    .update({ profile_views: (profile.profile_views || 0) + 1 })
    .eq('id', profile.id);

  return toElecIdProfile({
    ...profile,
    skills: skills || [],
    work_history: workHistory || [],
    training: training || [],
    qualifications: qualifications || [],
  });
};

// Resolve a scanned share-link QR (https://…/share/{token}) to its profile.
// Downloaded QR codes encode the share URL, so the camera scanner must be
// able to walk token → share link → profile.
export const getElecIdProfileByShareToken = async (
  shareToken: string
): Promise<ElecIdProfile | null> => {
  const { data: link, error: linkError } = await supabase
    .from('employer_elec_id_share_links')
    .select('profile_id, is_active, expires_at')
    .eq('share_token', shareToken)
    .maybeSingle();

  if (linkError) throw linkError;
  if (!link || !link.is_active) return null;
  if (link.expires_at && new Date(link.expires_at).getTime() < Date.now()) return null;

  const { data: profile, error } = await supabase
    .from('employer_elec_id_profiles')
    .select(`*, employee:employer_employees(id, name, role, photo_url, email, phone)`)
    .eq('id', link.profile_id)
    .maybeSingle();

  if (error) throw error;
  if (!profile) return null;

  const [{ data: skills }, { data: workHistory }, { data: training }, { data: qualifications }] =
    await Promise.all([
      supabase.from('employer_elec_id_skills').select('*').eq('profile_id', profile.id),
      supabase
        .from('employer_elec_id_work_history')
        .select('*')
        .eq('profile_id', profile.id)
        .order('start_date', { ascending: false }),
      // employer_elec_id_training is LEGACY (ELE-1950) — training lives in
      // the qualifications store below
      Promise.resolve({ data: [] as ElecIdTraining[] }),
      supabase
        .from('employer_elec_id_qualifications')
        .select('*')
        .eq('profile_id', profile.id)
        .order('date_achieved', { ascending: false }),
    ]);

  return toElecIdProfile({
    ...profile,
    skills: skills || [],
    work_history: workHistory || [],
    training: training || [],
    qualifications: qualifications || [],
  });
};

// Create a new profile
export const createElecIdProfile = async (data: {
  employee_id: string;
  elec_id_number?: string;
  ecs_card_type?: string | null;
  ecs_card_number?: string;
  ecs_expiry_date?: string;
  bio?: string;
  specialisations?: string[];
}): Promise<ElecIdProfile> => {
  // Canonical platform format (EM-XXXXXX, ambiguous characters excluded) —
  // the old ad-hoc ELEC-{year}-{5 digits} shape clashed with the electrician
  // side's validation and collided easily. Retry on the unique constraint so
  // a rare collision never aborts a bulk "Create all" run.
  const maxAttempts = 3;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const elecIdNumber =
      data.elec_id_number || generateElecIdNumber();

    const { data: profile, error } = await supabase
      .from('employer_elec_id_profiles')
      // ecs_card_type has a DB default of 'gold' — omitting it stamps a
      // fabricated Gold Card on the credential. Explicit null = "not recorded".
      .insert({ ...data, elec_id_number: elecIdNumber, ecs_card_type: data.ecs_card_type ?? null })
      .select(`*, employee:employer_employees(id, name, role, photo_url, email, phone)`)
      .single();

    if (error) {
      // 23505 = duplicate elec_id_number — regenerate and retry (unless the
      // caller supplied the number themselves)
      if (error.code === '23505' && !data.elec_id_number && attempt < maxAttempts - 1) continue;
      throw error;
    }

    return toElecIdProfile({
      ...profile,
      skills: [],
      work_history: [],
      training: [],
      qualifications: [],
    });
  }
  throw new Error('Could not generate a unique Elec-ID number');
};

// Update profile
export const updateElecIdProfile = async (
  id: string,
  updates: Partial<ElecIdProfile>
): Promise<ElecIdProfile> => {
  const { data, error } = await supabase
    .from('employer_elec_id_profiles')
    .update(
      updates as unknown as Database['public']['Tables']['employer_elec_id_profiles']['Update']
    )
    .eq('id', id)
    .select(`*, employee:employer_employees(id, name, role, photo_url, email, phone)`)
    .single();

  if (error) throw error;
  return toElecIdProfile(data);
};

// (verifyElecIdProfile removed — ELE-1950. It let any firm flip the global
// "verified" flag. Firms now record how they checked a specific item via
// setCredentialVerification / setEcsCardVerification in credentialsService.)

// Generate shareable link — inserts a real, resolvable share-link row (the
// /share/:token route reads employer_elec_id_share_links.share_token).
export const generateShareableLink = async (
  id: string,
  options?: { sections?: string[]; expiresInDays?: number | null }
): Promise<string> => {
  const shareToken = crypto.randomUUID().replace(/-/g, '').substring(0, 12);
  const url = `https://www.elec-mate.com/share/${shareToken}`;
  const sections = options?.sections ?? [
    'basics',
    'qualifications',
    'experience',
    'skills',
    'training',
  ];
  const days = options?.expiresInDays === undefined ? 30 : options.expiresInDays;
  const expiresAt =
    days == null ? null : new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

  const { error } = await supabase.from('employer_elec_id_share_links').insert({
    profile_id: id,
    share_token: shareToken,
    url,
    sections,
    expires_at: expiresAt,
    is_active: true,
  });

  if (error) throw error;

  // Keep the profile's convenience copy in sync for surfaces that read it.
  await supabase.from('employer_elec_id_profiles').update({ shareable_link: url }).eq('id', id);

  return url;
};

// Skills CRUD
export const addElecIdSkill = async (
  data: Omit<ElecIdSkill, 'id' | 'created_at'>
): Promise<ElecIdSkill> => {
  const { data: skill, error } = await supabase
    .from('employer_elec_id_skills')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return skill;
};

export const deleteElecIdSkill = async (id: string): Promise<void> => {
  const { error } = await supabase.from('employer_elec_id_skills').delete().eq('id', id);
  if (error) throw error;
};

// Work History CRUD
export const addElecIdWorkHistory = async (
  data: Omit<ElecIdWorkHistory, 'id' | 'created_at'>
): Promise<ElecIdWorkHistory> => {
  const { data: history, error } = await supabase
    .from('employer_elec_id_work_history')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return history;
};

export const deleteElecIdWorkHistory = async (id: string): Promise<void> => {
  const { error } = await supabase.from('employer_elec_id_work_history').delete().eq('id', id);
  if (error) throw error;
};

// Training CRUD — writes go to THE credentials store (category 'training');
// employer_elec_id_training is LEGACY (ELE-1950).
export const addElecIdTraining = async (
  data: Omit<ElecIdTraining, 'id' | 'created_at'>
): Promise<ElecIdTraining> => {
  const { data: row, error } = await supabase
    .from('employer_elec_id_qualifications')
    .insert({
      profile_id: data.profile_id,
      qualification_name: data.training_name,
      qualification_type: 'training',
      category: 'training',
      awarding_body: data.provider,
      date_achieved: data.completed_date,
      expiry_date: data.expiry_date,
      certificate_number: data.certificate_id,
    } as never)
    .select()
    .single();

  if (error) throw error;
  return qualificationToTraining(row as unknown as ElecIdQualification);
};

export const deleteElecIdTraining = async (id: string): Promise<void> => {
  const { error } = await supabase.from('employer_elec_id_qualifications').delete().eq('id', id);
  if (error) throw error;
};

/** Training-category rows of the store in the old ElecIdTraining shape. */
export const qualificationToTraining = (q: ElecIdQualification): ElecIdTraining => ({
  id: q.id,
  profile_id: q.profile_id,
  training_name: q.qualification_name,
  provider: q.awarding_body,
  completed_date: q.date_achieved,
  expiry_date: q.expiry_date,
  certificate_id: q.certificate_number,
  funded_by: q.funded_by ?? null,
  status:
    q.expiry_date && new Date(q.expiry_date).getTime() < Date.now()
      ? 'expired'
      : q.training_status && q.training_status !== 'Completed'
        ? 'pending'
        : 'valid',
  created_at: q.created_at,
});

// Qualifications CRUD
export const addElecIdQualification = async (
  data: Omit<ElecIdQualification, 'id' | 'created_at'>
): Promise<ElecIdQualification> => {
  const { data: qualification, error } = await supabase
    .from('employer_elec_id_qualifications')
    // Verification columns are DB-guarded (a direct write stays self-declared)
    .insert(data as never)
    .select()
    .single();

  if (error) throw error;
  return qualification as unknown as ElecIdQualification;
};

export const deleteElecIdQualification = async (id: string): Promise<void> => {
  const { error } = await supabase.from('employer_elec_id_qualifications').delete().eq('id', id);
  if (error) throw error;
};

export const updateElecIdQualification = async (
  id: string,
  data: Partial<ElecIdQualification>
): Promise<ElecIdQualification> => {
  const { data: qualification, error } = await supabase
    .from('employer_elec_id_qualifications')
    .update(data as never)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return qualification as unknown as ElecIdQualification;
};

export const updateElecIdSkill = async (
  id: string,
  data: Partial<ElecIdSkill>
): Promise<ElecIdSkill> => {
  const { data: skill, error } = await supabase
    .from('employer_elec_id_skills')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return skill;
};

export const updateElecIdWorkHistory = async (
  id: string,
  data: Partial<ElecIdWorkHistory>
): Promise<ElecIdWorkHistory> => {
  const { data: history, error } = await supabase
    .from('employer_elec_id_work_history')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return history;
};

// Fetch qualifications for a profile
export const getQualificationsByProfileId = async (
  profileId: string
): Promise<ElecIdQualification[]> => {
  const { data, error } = await supabase
    .from('employer_elec_id_qualifications')
    .select('*')
    .eq('profile_id', profileId)
    .or('category.is.null,category.neq.training')
    .order('date_achieved', { ascending: false });

  if (error) throw error;
  return (data || []) as unknown as ElecIdQualification[];
};

// Fetch skills for a profile
export const getSkillsByProfileId = async (profileId: string): Promise<ElecIdSkill[]> => {
  const { data, error } = await supabase
    .from('employer_elec_id_skills')
    .select('*')
    .eq('profile_id', profileId)
    .order('skill_name');

  if (error) throw error;
  return data || [];
};

// Fetch work history for a profile
export const getWorkHistoryByProfileId = async (
  profileId: string
): Promise<ElecIdWorkHistory[]> => {
  const { data, error } = await supabase
    .from('employer_elec_id_work_history')
    .select('*')
    .eq('profile_id', profileId)
    .order('start_date', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Fetch training for a profile
// Training = the training-category rows of THE credentials store (ELE-1950).
export const getTrainingByProfileId = async (profileId: string): Promise<ElecIdTraining[]> => {
  const { data, error } = await supabase
    .from('employer_elec_id_qualifications')
    .select('*')
    .eq('profile_id', profileId)
    .eq('category', 'training')
    .order('date_achieved', { ascending: false });

  if (error) throw error;
  return ((data || []) as unknown as ElecIdQualification[]).map(qualificationToTraining);
};

// ═══════════════════════════════════════════════════════════════════════════
// CV Storage Functions
// ═══════════════════════════════════════════════════════════════════════════

export interface UserCV {
  id: string;
  user_id: string;
  template_id: 'classic' | 'modern' | 'creative' | 'technical';
  cv_data: Record<string, unknown>;
  pdf_url: string | null;
  is_primary: boolean;
  title: string;
  created_at: string;
  updated_at: string;
}

const toUserCV = (row: unknown): UserCV => row as UserCV;

// Get all CVs for the current user
export const getUserCVs = async (): Promise<UserCV[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('user_cvs')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(toUserCV);
};

// Get a specific CV by ID
export const getCVById = async (cvId: string): Promise<UserCV | null> => {
  const { data, error } = await supabase.from('user_cvs').select('*').eq('id', cvId).maybeSingle();

  if (error) throw error;
  return data ? toUserCV(data) : null;
};

// Get user's primary CV
export const getPrimaryCV = async (): Promise<UserCV | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('user_cvs')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_primary', true)
    .maybeSingle();

  if (error) throw error;
  return data ? toUserCV(data) : null;
};

// Save a new CV
export const saveCV = async (cvData: {
  template_id: UserCV['template_id'];
  cv_data: Record<string, unknown>;
  title?: string;
  is_primary?: boolean;
  pdf_url?: string;
}): Promise<UserCV> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('user_cvs')
    .insert({
      user_id: user.id,
      template_id: cvData.template_id,
      cv_data: cvData.cv_data as Database['public']['Tables']['user_cvs']['Insert']['cv_data'],
      title: cvData.title || 'My CV',
      is_primary: cvData.is_primary ?? false,
      pdf_url: cvData.pdf_url,
    })
    .select()
    .single();

  if (error) throw error;
  return toUserCV(data);
};

// Update an existing CV
export const updateCV = async (
  cvId: string,
  updates: Partial<{
    template_id: UserCV['template_id'];
    cv_data: Record<string, unknown>;
    title: string;
    is_primary: boolean;
    pdf_url: string;
  }>
): Promise<UserCV> => {
  const { data, error } = await supabase
    .from('user_cvs')
    .update(updates as unknown as Database['public']['Tables']['user_cvs']['Update'])
    .eq('id', cvId)
    .select()
    .single();

  if (error) throw error;
  return toUserCV(data);
};

// Delete a CV
export const deleteCV = async (cvId: string): Promise<void> => {
  const { error } = await supabase.from('user_cvs').delete().eq('id', cvId);

  if (error) throw error;
};

// Set a CV as primary (and unset others)
export const setAsPrimaryCV = async (cvId: string): Promise<void> => {
  const { error } = await supabase.from('user_cvs').update({ is_primary: true }).eq('id', cvId);

  if (error) throw error;
};

// Get current user's Elec-ID profile for CV import
export const getCurrentUserElecIdForCV = async (): Promise<{
  profile: ElecIdProfile | null;
  userInfo: { full_name: string; email: string } | null;
}> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { profile: null, userInfo: null };

  // Get user's basic info from profiles
  const { data: userProfile } = await supabase
    .from('profiles')
    .select('full_name, elec_id_number')
    .eq('id', user.id)
    .maybeSingle();

  const userInfo = userProfile
    ? {
        full_name: userProfile.full_name || '',
        email: user.email || '',
      }
    : null;

  // If they have an Elec-ID number, try to find their profile
  if (userProfile?.elec_id_number) {
    const profile = await getElecIdProfileByNumber(userProfile.elec_id_number);
    return { profile, userInfo };
  }

  return { profile: null, userInfo };
};

// ═══════════════════════════════════════════════════════════════════════════
// CV PDF Storage Functions
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Upload a CV PDF to storage
 * @param cvId - The CV ID (used in filename)
 * @param pdfBlob - The PDF blob to upload
 * @returns The public URL of the uploaded PDF
 */
export const uploadCVPDF = async (cvId: string, pdfBlob: Blob): Promise<string> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const timestamp = Date.now();
  const fileName = `${user.id}/${cvId}/${timestamp}.pdf`;

  const { data, error } = await supabase.storage.from('cv-documents').upload(fileName, pdfBlob, {
    contentType: 'application/pdf',
    upsert: true,
  });

  if (error) {
    throw new Error(`Failed to upload CV PDF: ${error.message}`);
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from('cv-documents').getPublicUrl(data.path);

  return publicUrl;
};

/**
 * Delete a CV PDF from storage
 * @param pdfUrl - The public URL of the PDF to delete
 */
export const deleteCVPDF = async (pdfUrl: string): Promise<void> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  // Extract path from URL
  const url = new URL(pdfUrl);
  const pathMatch = url.pathname.match(/\/cv-documents\/(.+)$/);
  if (!pathMatch) {
    throw new Error('Invalid CV PDF URL');
  }

  const filePath = decodeURIComponent(pathMatch[1]);

  const { error } = await supabase.storage.from('cv-documents').remove([filePath]);

  if (error) {
    throw new Error(`Failed to delete CV PDF: ${error.message}`);
  }
};

/**
 * Update a user_cv record with the PDF URL
 */
export const updateCVPDFUrl = async (cvId: string, pdfUrl: string): Promise<void> => {
  const { error } = await supabase
    .from('user_cvs')
    .update({ pdf_url: pdfUrl, updated_at: new Date().toISOString() })
    .eq('id', cvId);

  if (error) {
    throw new Error(`Failed to update CV PDF URL: ${error.message}`);
  }
};
