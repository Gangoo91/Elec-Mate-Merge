import { supabase } from "@/integrations/supabase/client";

// Types matching the database schema
export type RateType = "hourly" | "daily" | "weekly" | "yearly";

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
  is_verified: boolean;
  verified_at: string | null;
  verified_by: string | null;
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
  is_verified: boolean;
  created_at: string;
}

// Fetch all Elec-ID profiles with related data
export const getElecIdProfiles = async (): Promise<ElecIdProfile[]> => {
  const { data: profiles, error: profileError } = await supabase
    .from('employer_elec_id_profiles')
    .select(`
      *,
      employee:employer_employees(id, name, role, photo_url, email, phone)
    `)
    .order('created_at', { ascending: false });

  if (profileError) throw profileError;
  if (!profiles) return [];

  // Fetch related data for each profile
  const profileIds = profiles.map(p => p.id);

  const [
    { data: skills },
    { data: workHistory },
    { data: training },
    { data: qualifications }
  ] = await Promise.all([
    supabase.from('employer_elec_id_skills').select('*').in('profile_id', profileIds),
    supabase.from('employer_elec_id_work_history').select('*').in('profile_id', profileIds).order('start_date', { ascending: false }),
    supabase.from('employer_elec_id_training').select('*').in('profile_id', profileIds).order('completed_date', { ascending: false }),
    supabase.from('employer_elec_id_qualifications').select('*').in('profile_id', profileIds).order('date_achieved', { ascending: false }),
  ]);

  return profiles.map(profile => ({
    ...profile,
    skills: skills?.filter(s => s.profile_id === profile.id) || [],
    work_history: workHistory?.filter(w => w.profile_id === profile.id) || [],
    training: training?.filter(t => t.profile_id === profile.id) || [],
    qualifications: qualifications?.filter(q => q.profile_id === profile.id) || [],
  }));
};

// Fetch single profile by employee ID
export const getElecIdProfileByEmployeeId = async (employeeId: string): Promise<ElecIdProfile | null> => {
  const { data: profile, error } = await supabase
    .from('employer_elec_id_profiles')
    .select(`
      *,
      employee:employer_employees(id, name, role, photo_url, email, phone)
    `)
    .eq('employee_id', employeeId)
    .maybeSingle();

  if (error) throw error;
  if (!profile) return null;

  const [
    { data: skills },
    { data: workHistory },
    { data: training },
    { data: qualifications }
  ] = await Promise.all([
    supabase.from('employer_elec_id_skills').select('*').eq('profile_id', profile.id),
    supabase.from('employer_elec_id_work_history').select('*').eq('profile_id', profile.id).order('start_date', { ascending: false }),
    supabase.from('employer_elec_id_training').select('*').eq('profile_id', profile.id).order('completed_date', { ascending: false }),
    supabase.from('employer_elec_id_qualifications').select('*').eq('profile_id', profile.id).order('date_achieved', { ascending: false }),
  ]);

  return {
    ...profile,
    skills: skills || [],
    work_history: workHistory || [],
    training: training || [],
    qualifications: qualifications || [],
  };
};

// Lookup profile by Elec-ID number (for scanning)
export const getElecIdProfileByNumber = async (elecIdNumber: string): Promise<ElecIdProfile | null> => {
  const { data: profile, error } = await supabase
    .from('employer_elec_id_profiles')
    .select(`
      *,
      employee:employer_employees(id, name, role, photo_url, email, phone)
    `)
    .eq('elec_id_number', elecIdNumber)
    .maybeSingle();

  if (error) throw error;
  if (!profile) return null;

  const [
    { data: skills },
    { data: workHistory },
    { data: training },
    { data: qualifications }
  ] = await Promise.all([
    supabase.from('employer_elec_id_skills').select('*').eq('profile_id', profile.id),
    supabase.from('employer_elec_id_work_history').select('*').eq('profile_id', profile.id).order('start_date', { ascending: false }),
    supabase.from('employer_elec_id_training').select('*').eq('profile_id', profile.id).order('completed_date', { ascending: false }),
    supabase.from('employer_elec_id_qualifications').select('*').eq('profile_id', profile.id).order('date_achieved', { ascending: false }),
  ]);

  // Increment profile views
  await supabase
    .from('employer_elec_id_profiles')
    .update({ profile_views: (profile.profile_views || 0) + 1 })
    .eq('id', profile.id);

  return {
    ...profile,
    skills: skills || [],
    work_history: workHistory || [],
    training: training || [],
    qualifications: qualifications || [],
  };
};

// Create a new profile
export const createElecIdProfile = async (data: {
  employee_id: string;
  elec_id_number?: string;
  ecs_card_type?: string;
  ecs_card_number?: string;
  ecs_expiry_date?: string;
  bio?: string;
  specialisations?: string[];
}): Promise<ElecIdProfile> => {
  const elecIdNumber = data.elec_id_number || `ELEC-${new Date().getFullYear()}-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
  
  const { data: profile, error } = await supabase
    .from('employer_elec_id_profiles')
    .insert({ ...data, elec_id_number: elecIdNumber })
    .select(`*, employee:employer_employees(id, name, role, photo_url, email, phone)`)
    .single();

  if (error) throw error;
  return { ...profile, skills: [], work_history: [], training: [], qualifications: [] };
};

// Update profile
export const updateElecIdProfile = async (id: string, updates: Partial<ElecIdProfile>): Promise<ElecIdProfile> => {
  const { data, error } = await supabase
    .from('employer_elec_id_profiles')
    .update(updates)
    .eq('id', id)
    .select(`*, employee:employer_employees(id, name, role, photo_url, email, phone)`)
    .single();

  if (error) throw error;
  return data;
};

// Verify profile credentials
export const verifyElecIdProfile = async (id: string, verifiedBy: string): Promise<ElecIdProfile> => {
  const { data, error } = await supabase
    .from('employer_elec_id_profiles')
    .update({
      is_verified: true,
      verified_at: new Date().toISOString(),
      verified_by: verifiedBy
    })
    .eq('id', id)
    .select(`*, employee:employer_employees(id, name, role, photo_url, email, phone)`)
    .single();

  if (error) throw error;
  return data;
};

// Generate shareable link
export const generateShareableLink = async (id: string): Promise<string> => {
  const shareableLink = `https://elec-id.app/profile/${id}?token=${crypto.randomUUID()}`;
  
  const { error } = await supabase
    .from('employer_elec_id_profiles')
    .update({ shareable_link: shareableLink })
    .eq('id', id);

  if (error) throw error;
  return shareableLink;
};

// Skills CRUD
export const addElecIdSkill = async (data: Omit<ElecIdSkill, 'id' | 'created_at'>): Promise<ElecIdSkill> => {
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
export const addElecIdWorkHistory = async (data: Omit<ElecIdWorkHistory, 'id' | 'created_at'>): Promise<ElecIdWorkHistory> => {
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

// Training CRUD
export const addElecIdTraining = async (data: Omit<ElecIdTraining, 'id' | 'created_at'>): Promise<ElecIdTraining> => {
  const { data: training, error } = await supabase
    .from('employer_elec_id_training')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return training;
};

export const deleteElecIdTraining = async (id: string): Promise<void> => {
  const { error } = await supabase.from('employer_elec_id_training').delete().eq('id', id);
  if (error) throw error;
};

// Qualifications CRUD
export const addElecIdQualification = async (data: Omit<ElecIdQualification, 'id' | 'created_at'>): Promise<ElecIdQualification> => {
  const { data: qualification, error } = await supabase
    .from('employer_elec_id_qualifications')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return qualification;
};

export const deleteElecIdQualification = async (id: string): Promise<void> => {
  const { error } = await supabase.from('employer_elec_id_qualifications').delete().eq('id', id);
  if (error) throw error;
};

export const updateElecIdQualification = async (id: string, data: Partial<ElecIdQualification>): Promise<ElecIdQualification> => {
  const { data: qualification, error } = await supabase
    .from('employer_elec_id_qualifications')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return qualification;
};

export const updateElecIdSkill = async (id: string, data: Partial<ElecIdSkill>): Promise<ElecIdSkill> => {
  const { data: skill, error } = await supabase
    .from('employer_elec_id_skills')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return skill;
};

export const updateElecIdWorkHistory = async (id: string, data: Partial<ElecIdWorkHistory>): Promise<ElecIdWorkHistory> => {
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
export const getQualificationsByProfileId = async (profileId: string): Promise<ElecIdQualification[]> => {
  const { data, error } = await supabase
    .from('employer_elec_id_qualifications')
    .select('*')
    .eq('profile_id', profileId)
    .order('date_achieved', { ascending: false });

  if (error) throw error;
  return data || [];
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
export const getWorkHistoryByProfileId = async (profileId: string): Promise<ElecIdWorkHistory[]> => {
  const { data, error } = await supabase
    .from('employer_elec_id_work_history')
    .select('*')
    .eq('profile_id', profileId)
    .order('start_date', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Fetch training for a profile
export const getTrainingByProfileId = async (profileId: string): Promise<ElecIdTraining[]> => {
  const { data, error } = await supabase
    .from('employer_elec_id_training')
    .select('*')
    .eq('profile_id', profileId)
    .order('completed_date', { ascending: false });

  if (error) throw error;
  return data || [];
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

// Get all CVs for the current user
export const getUserCVs = async (): Promise<UserCV[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('user_cvs')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Get a specific CV by ID
export const getCVById = async (cvId: string): Promise<UserCV | null> => {
  const { data, error } = await supabase
    .from('user_cvs')
    .select('*')
    .eq('id', cvId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

// Get user's primary CV
export const getPrimaryCV = async (): Promise<UserCV | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('user_cvs')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_primary', true)
    .maybeSingle();

  if (error) throw error;
  return data;
};

// Save a new CV
export const saveCV = async (cvData: {
  template_id: UserCV['template_id'];
  cv_data: Record<string, unknown>;
  title?: string;
  is_primary?: boolean;
  pdf_url?: string;
}): Promise<UserCV> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('user_cvs')
    .insert({
      user_id: user.id,
      template_id: cvData.template_id,
      cv_data: cvData.cv_data,
      title: cvData.title || 'My CV',
      is_primary: cvData.is_primary ?? false,
      pdf_url: cvData.pdf_url,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Update an existing CV
export const updateCV = async (cvId: string, updates: Partial<{
  template_id: UserCV['template_id'];
  cv_data: Record<string, unknown>;
  title: string;
  is_primary: boolean;
  pdf_url: string;
}>): Promise<UserCV> => {
  const { data, error } = await supabase
    .from('user_cvs')
    .update(updates)
    .eq('id', cvId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Delete a CV
export const deleteCV = async (cvId: string): Promise<void> => {
  const { error } = await supabase
    .from('user_cvs')
    .delete()
    .eq('id', cvId);

  if (error) throw error;
};

// Set a CV as primary (and unset others)
export const setAsPrimaryCV = async (cvId: string): Promise<void> => {
  const { error } = await supabase
    .from('user_cvs')
    .update({ is_primary: true })
    .eq('id', cvId);

  if (error) throw error;
};

// Get current user's Elec-ID profile for CV import
export const getCurrentUserElecIdForCV = async (): Promise<{
  profile: ElecIdProfile | null;
  userInfo: { full_name: string; email: string } | null;
}> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { profile: null, userInfo: null };

  // Get user's basic info from profiles
  const { data: userProfile } = await supabase
    .from('profiles')
    .select('full_name, elec_id_number')
    .eq('id', user.id)
    .maybeSingle();

  const userInfo = userProfile ? {
    full_name: userProfile.full_name || '',
    email: user.email || '',
  } : null;

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
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const timestamp = Date.now();
  const fileName = `${user.id}/${cvId}/${timestamp}.pdf`;

  const { data, error } = await supabase.storage
    .from('cv-documents')
    .upload(fileName, pdfBlob, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (error) {
    throw new Error(`Failed to upload CV PDF: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('cv-documents')
    .getPublicUrl(data.path);

  return publicUrl;
};

/**
 * Delete a CV PDF from storage
 * @param pdfUrl - The public URL of the PDF to delete
 */
export const deleteCVPDF = async (pdfUrl: string): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  // Extract path from URL
  const url = new URL(pdfUrl);
  const pathMatch = url.pathname.match(/\/cv-documents\/(.+)$/);
  if (!pathMatch) {
    throw new Error('Invalid CV PDF URL');
  }

  const filePath = decodeURIComponent(pathMatch[1]);

  const { error } = await supabase.storage
    .from('cv-documents')
    .remove([filePath]);

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
