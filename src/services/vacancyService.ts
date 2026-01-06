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
