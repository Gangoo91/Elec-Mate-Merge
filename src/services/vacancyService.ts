import { supabase } from '@/integrations/supabase/client';

export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Temporary';
export type VacancyStatus = 'Open' | 'Closed' | 'Filled' | 'Draft';

export interface Vacancy {
  id: string;
  title: string;
  location: string;
  type: EmploymentType;
  status: VacancyStatus;
  salary_min: number | null;
  salary_max: number | null;
  salary_period: string;
  description: string | null;
  requirements: string[];
  benefits: string[];
  closing_date: string | null;
  views: number;
  applications_count: number;
  created_at: string;
  updated_at: string;
}

export interface VacancyApplication {
  id: string;
  vacancy_id: string;
  applicant_profile_id: string | null;
  applicant_name: string;
  applicant_email: string | null;
  applicant_phone: string | null;
  cover_letter: string | null;
  cv_url: string | null;
  status: 'New' | 'Reviewing' | 'Shortlisted' | 'Interviewed' | 'Offered' | 'Hired' | 'Rejected';
  notes: string | null;
  applied_at: string;
  updated_at: string;
  // Joined data
  vacancy?: Vacancy;
  elec_id_profile?: {
    elec_id_number: string;
    ecs_card_type: string;
    verification_tier: string;
    is_verified: boolean;
  };
}

// Vacancy CRUD
export const getVacancies = async (): Promise<Vacancy[]> => {
  const { data, error } = await supabase
    .from('vacancies')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching vacancies:', error);
    throw error;
  }

  return data || [];
};

export const getOpenVacancies = async (): Promise<Vacancy[]> => {
  const { data, error } = await supabase
    .from('vacancies')
    .select('*')
    .eq('status', 'Open')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching open vacancies:', error);
    throw error;
  }

  return data || [];
};

export const getVacancyById = async (id: string): Promise<Vacancy | null> => {
  const { data, error } = await supabase
    .from('vacancies')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching vacancy:', error);
    return null;
  }

  return data;
};

export const createVacancy = async (
  vacancy: Omit<Vacancy, 'id' | 'created_at' | 'updated_at' | 'views' | 'applications_count'>
): Promise<Vacancy> => {
  const { data, error } = await supabase
    .from('vacancies')
    .insert(vacancy)
    .select()
    .single();

  if (error) {
    console.error('Error creating vacancy:', error);
    throw error;
  }

  return data;
};

export const updateVacancy = async (
  id: string,
  updates: Partial<Vacancy>
): Promise<Vacancy | null> => {
  const { data, error } = await supabase
    .from('vacancies')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating vacancy:', error);
    return null;
  }

  return data;
};

export const deleteVacancy = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('vacancies')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting vacancy:', error);
    return false;
  }

  return true;
};

export const incrementVacancyViews = async (id: string): Promise<void> => {
  const { error } = await supabase.rpc('increment_vacancy_views', { vacancy_id: id });

  if (error) {
    // Fallback to manual increment
    const vacancy = await getVacancyById(id);
    if (vacancy) {
      await updateVacancy(id, { views: (vacancy.views || 0) + 1 });
    }
  }
};

// Vacancy Applications CRUD
export const getApplicationsForVacancy = async (vacancyId: string): Promise<VacancyApplication[]> => {
  const { data, error } = await supabase
    .from('vacancy_applications')
    .select(`
      *,
      elec_id_profile:elec_id_profiles (
        elec_id_number,
        ecs_card_type,
        verification_tier,
        is_verified
      )
    `)
    .eq('vacancy_id', vacancyId)
    .order('applied_at', { ascending: false });

  if (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }

  return data || [];
};

export const getAllApplications = async (): Promise<VacancyApplication[]> => {
  const { data, error } = await supabase
    .from('vacancy_applications')
    .select(`
      *,
      vacancy:vacancies (
        id,
        title,
        location,
        status
      ),
      elec_id_profile:elec_id_profiles (
        elec_id_number,
        ecs_card_type,
        verification_tier,
        is_verified
      )
    `)
    .order('applied_at', { ascending: false });

  if (error) {
    console.error('Error fetching all applications:', error);
    throw error;
  }

  return data || [];
};

export const getApplicationById = async (id: string): Promise<VacancyApplication | null> => {
  const { data, error } = await supabase
    .from('vacancy_applications')
    .select(`
      *,
      vacancy:vacancies (*),
      elec_id_profile:elec_id_profiles (*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching application:', error);
    return null;
  }

  return data;
};

export const createApplication = async (
  application: Omit<VacancyApplication, 'id' | 'applied_at' | 'updated_at'>
): Promise<VacancyApplication> => {
  const { data, error } = await supabase
    .from('vacancy_applications')
    .insert(application)
    .select()
    .single();

  if (error) {
    console.error('Error creating application:', error);
    throw error;
  }

  // Update applications count on vacancy
  await supabase.rpc('increment_applications_count', { vacancy_id: application.vacancy_id });

  return data;
};

export const updateApplicationStatus = async (
  id: string,
  status: VacancyApplication['status'],
  notes?: string
): Promise<VacancyApplication | null> => {
  const updates: Partial<VacancyApplication> = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (notes !== undefined) {
    updates.notes = notes;
  }

  const { data, error } = await supabase
    .from('vacancy_applications')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating application status:', error);
    return null;
  }

  return data;
};

export const deleteApplication = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('vacancy_applications')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting application:', error);
    return false;
  }

  return true;
};

// Stats
export const getVacancyStats = async (): Promise<{
  totalOpen: number;
  totalApplications: number;
  newApplications: number;
}> => {
  const [vacanciesResult, applicationsResult, newAppsResult] = await Promise.all([
    supabase.from('vacancies').select('id', { count: 'exact' }).eq('status', 'Open'),
    supabase.from('vacancy_applications').select('id', { count: 'exact' }),
    supabase.from('vacancy_applications').select('id', { count: 'exact' }).eq('status', 'New'),
  ]);

  return {
    totalOpen: vacanciesResult.count || 0,
    totalApplications: applicationsResult.count || 0,
    newApplications: newAppsResult.count || 0,
  };
};

// =============================================================================
// EMPLOYER VACANCY APPLICATIONS (for external electrician applications)
// =============================================================================

export interface ElecIdSkill {
  id: string;
  skill_name: string;
  skill_level: string;
  years_experience: number;
  is_verified: boolean;
}

export interface ElecIdWorkHistory {
  id: string;
  employer_name: string;
  job_title: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  is_verified: boolean;
}

export interface ElecIdQualification {
  id: string;
  qualification_name: string;
  qualification_type: string;
  awarding_body: string | null;
  grade: string | null;
  date_achieved: string | null;
  certificate_number: string | null;
  is_verified: boolean;
}

export interface ElecIdTraining {
  id: string;
  training_name: string;
  provider: string | null;
  completed_date: string | null;
  expiry_date: string | null;
  status: string;
}

export interface FullElecIdProfile {
  id: string;
  employee_id: string;
  elec_id_number: string;
  ecs_card_type: string | null;
  ecs_card_number: string | null;
  ecs_expiry_date: string | null;
  bio: string | null;
  specialisations: string[] | null;
  verification_tier: 'basic' | 'verified' | 'premium';
  is_verified: boolean;
  profile_views: number;
  available_for_hire: boolean;
  // Related data
  skills?: ElecIdSkill[];
  work_history?: ElecIdWorkHistory[];
  qualifications?: ElecIdQualification[];
  training?: ElecIdTraining[];
}

export interface EmployerVacancyApplication {
  id: string;
  vacancy_id: string;
  applicant_profile_id: string | null;
  applicant_name: string;
  applicant_email: string | null;
  applicant_phone: string | null;
  cover_letter: string | null;
  cv_url: string | null;
  status: 'New' | 'Reviewing' | 'Shortlisted' | 'Interviewed' | 'Offered' | 'Hired' | 'Rejected';
  notes: string | null;
  applied_at: string;
  updated_at: string;
  // Joined data - Full Elec-ID profile
  elec_id_profile?: FullElecIdProfile;
  vacancy?: {
    id: string;
    title: string;
    location: string;
    type: string;
    status: string;
  };
}

/**
 * Fetch all applications for employer vacancies with full Elec-ID data
 * This is for employers viewing who applied to their jobs
 */
export const getEmployerVacancyApplications = async (vacancyId?: string): Promise<EmployerVacancyApplication[]> => {
  let query = supabase
    .from('employer_vacancy_applications')
    .select(`
      *,
      vacancy:employer_vacancies (
        id,
        title,
        location,
        type,
        status
      ),
      elec_id_profile:employer_elec_id_profiles (
        id,
        employee_id,
        elec_id_number,
        ecs_card_type,
        ecs_card_number,
        ecs_expiry_date,
        bio,
        specialisations,
        verification_tier,
        is_verified,
        profile_views,
        available_for_hire
      )
    `)
    .order('applied_at', { ascending: false });

  if (vacancyId) {
    query = query.eq('vacancy_id', vacancyId);
  }

  const { data: applications, error } = await query;

  if (error) {
    console.error('Error fetching employer vacancy applications:', error);
    throw error;
  }

  if (!applications || applications.length === 0) {
    return [];
  }

  // Get all profile IDs to fetch related data
  const profileIds = applications
    .map(a => (a.elec_id_profile as any)?.id)
    .filter(Boolean);

  if (profileIds.length === 0) {
    return applications as EmployerVacancyApplication[];
  }

  // Fetch related Elec-ID data in parallel
  const [
    { data: skills },
    { data: workHistory },
    { data: qualifications },
    { data: training }
  ] = await Promise.all([
    supabase.from('employer_elec_id_skills').select('*').in('profile_id', profileIds),
    supabase.from('employer_elec_id_work_history').select('*').in('profile_id', profileIds).order('start_date', { ascending: false }),
    supabase.from('employer_elec_id_qualifications').select('*').in('profile_id', profileIds).order('date_achieved', { ascending: false }),
    supabase.from('employer_elec_id_training').select('*').in('profile_id', profileIds).order('completed_date', { ascending: false }),
  ]);

  // Map related data to profiles
  return applications.map(app => {
    const profile = app.elec_id_profile as any;
    if (profile) {
      return {
        ...app,
        elec_id_profile: {
          ...profile,
          skills: skills?.filter(s => s.profile_id === profile.id) || [],
          work_history: workHistory?.filter(w => w.profile_id === profile.id) || [],
          qualifications: qualifications?.filter(q => q.profile_id === profile.id) || [],
          training: training?.filter(t => t.profile_id === profile.id) || [],
        },
      };
    }
    return app;
  }) as EmployerVacancyApplication[];
};

/**
 * Fetch a single application with full Elec-ID profile data
 */
export const getEmployerVacancyApplicationById = async (id: string): Promise<EmployerVacancyApplication | null> => {
  const { data: application, error } = await supabase
    .from('employer_vacancy_applications')
    .select(`
      *,
      vacancy:employer_vacancies (
        id,
        title,
        location,
        type,
        status,
        description,
        requirements,
        benefits
      ),
      elec_id_profile:employer_elec_id_profiles (
        id,
        employee_id,
        elec_id_number,
        ecs_card_type,
        ecs_card_number,
        ecs_expiry_date,
        bio,
        specialisations,
        verification_tier,
        is_verified,
        profile_views,
        available_for_hire
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching employer vacancy application:', error);
    return null;
  }

  if (!application) return null;

  const profile = application.elec_id_profile as any;
  if (!profile?.id) return application as EmployerVacancyApplication;

  // Fetch related Elec-ID data
  const [
    { data: skills },
    { data: workHistory },
    { data: qualifications },
    { data: training }
  ] = await Promise.all([
    supabase.from('employer_elec_id_skills').select('*').eq('profile_id', profile.id),
    supabase.from('employer_elec_id_work_history').select('*').eq('profile_id', profile.id).order('start_date', { ascending: false }),
    supabase.from('employer_elec_id_qualifications').select('*').eq('profile_id', profile.id).order('date_achieved', { ascending: false }),
    supabase.from('employer_elec_id_training').select('*').eq('profile_id', profile.id).order('completed_date', { ascending: false }),
  ]);

  return {
    ...application,
    elec_id_profile: {
      ...profile,
      skills: skills || [],
      work_history: workHistory || [],
      qualifications: qualifications || [],
      training: training || [],
    },
  } as EmployerVacancyApplication;
};

/**
 * Update application status for employer vacancy applications
 */
export const updateEmployerVacancyApplicationStatus = async (
  id: string,
  status: EmployerVacancyApplication['status'],
  notes?: string
): Promise<EmployerVacancyApplication | null> => {
  const updates: Record<string, any> = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (notes !== undefined) {
    updates.notes = notes;
  }

  const { data, error } = await supabase
    .from('employer_vacancy_applications')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating employer vacancy application status:', error);
    return null;
  }

  return data as EmployerVacancyApplication;
};

/**
 * Get stats for employer vacancies
 */
export const getEmployerVacancyStats = async (): Promise<{
  totalOpen: number;
  totalApplications: number;
  newApplications: number;
  shortlistedCount: number;
}> => {
  const [vacanciesResult, applicationsResult, newAppsResult, shortlistedResult] = await Promise.all([
    supabase.from('employer_vacancies').select('id', { count: 'exact' }).eq('status', 'open'),
    supabase.from('employer_vacancy_applications').select('id', { count: 'exact' }),
    supabase.from('employer_vacancy_applications').select('id', { count: 'exact' }).eq('status', 'New'),
    supabase.from('employer_vacancy_applications').select('id', { count: 'exact' }).eq('status', 'Shortlisted'),
  ]);

  return {
    totalOpen: vacanciesResult.count || 0,
    totalApplications: applicationsResult.count || 0,
    newApplications: newAppsResult.count || 0,
    shortlistedCount: shortlistedResult.count || 0,
  };
};
