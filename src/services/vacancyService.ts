import { supabase } from '@/integrations/supabase/client';

// Helper to send push notification (fire and forget)
const sendPushNotification = async (
  userId: string,
  title: string,
  body: string,
  type: 'job' | 'team' | 'college' | 'peer' | 'vacancy',
  data?: Record<string, unknown>
) => {
  try {
    await supabase.functions.invoke('send-push-notification', {
      body: { userId, title, body, type, data },
    });
  } catch (error) {
    console.error('Push notification error:', error);
  }
};

// Helper to notify available electricians of new vacancy
async function notifyAvailableElectricians(vacancy: Vacancy) {
  try {
    // Only notify for open vacancies
    if (vacancy.status !== 'Open') return;

    // Get all electricians marked as available for hire
    const { data: availableProfiles, error } = await supabase
      .from('employer_elec_id_profiles')
      .select('user_id')
      .eq('available_for_hire', true);

    if (error || !availableProfiles || availableProfiles.length === 0) {
      return;
    }

    // Format salary for notification
    let salaryText = '';
    if (vacancy.salary_min && vacancy.salary_max) {
      salaryText = ` - £${(vacancy.salary_min / 1000).toFixed(0)}k-£${(vacancy.salary_max / 1000).toFixed(0)}k`;
    } else if (vacancy.salary_max) {
      salaryText = ` - Up to £${(vacancy.salary_max / 1000).toFixed(0)}k`;
    }

    // Send notification to each available electrician (fire and forget)
    for (const profile of availableProfiles) {
      if (profile.user_id) {
        sendPushNotification(
          profile.user_id,
          '🔧 New Job Opportunity',
          `${vacancy.title} in ${vacancy.location}${salaryText}`,
          'vacancy',
          { vacancyId: vacancy.id }
        ).catch(console.error);
      }
    }
  } catch (error) {
    console.error('Error notifying available electricians:', error);
  }
}

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
    .from('employer_vacancies')
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
    .from('employer_vacancies')
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
    .from('employer_vacancies')
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
    .from('employer_vacancies')
    .insert(vacancy)
    .select()
    .single();

  if (error) {
    console.error('Error creating vacancy:', error);
    throw error;
  }

  // Notify available electricians if vacancy is published as open
  if (data.status === 'Open') {
    notifyAvailableElectricians(data).catch(console.error);
  }

  return data;
};

export const updateVacancy = async (
  id: string,
  updates: Partial<Vacancy>
): Promise<Vacancy | null> => {
  // Get current status to check if it's being published
  let wasNotOpen = false;
  if (updates.status === 'Open') {
    const { data: current } = await supabase
      .from('employer_vacancies')
      .select('status')
      .eq('id', id)
      .single();
    wasNotOpen = current?.status !== 'Open';
  }

  const { data, error } = await supabase
    .from('employer_vacancies')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating vacancy:', error);
    return null;
  }

  // Notify available electricians if vacancy just became open
  if (wasNotOpen && data.status === 'Open') {
    notifyAvailableElectricians(data).catch(console.error);
  }

  return data;
};

export const deleteVacancy = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('employer_vacancies')
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
    .from('employer_vacancy_applications')
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
    .from('employer_vacancy_applications')
    .select(`
      *,
      vacancy:employer_vacancies (
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
    .from('employer_vacancy_applications')
    .select(`
      *,
      vacancy:employer_vacancies (*),
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
    .from('employer_vacancy_applications')
    .insert(application)
    .select()
    .single();

  if (error) {
    console.error('Error creating application:', error);
    throw error;
  }

  // Update applications count on vacancy
  await supabase.rpc('increment_applications_count', { vacancy_id: application.vacancy_id });

  // Send push notification to vacancy owner
  notifyVacancyOwner(application.vacancy_id, application.applicant_name, data.id).catch(console.error);

  return data;
};

// Helper to notify vacancy owner of new application
async function notifyVacancyOwner(vacancyId: string, applicantName: string, applicationId: string) {
  try {
    // Get vacancy details including owner
    const { data: vacancy } = await supabase
      .from('employer_vacancies')
      .select('title, created_by')
      .eq('id', vacancyId)
      .single();

    if (vacancy?.created_by) {
      await sendPushNotification(
        vacancy.created_by,
        '📋 New Job Application',
        `${applicantName} applied for ${vacancy.title}`,
        'job',
        { applicationId, vacancyId, isEmployer: true }
      );
    }
  } catch (error) {
    console.error('Error notifying vacancy owner:', error);
  }
}

export const updateApplicationStatus = async (
  id: string,
  status: VacancyApplication['status'],
  notes?: string
): Promise<VacancyApplication | null> => {
  // Get application details for notification
  const { data: existingApp } = await supabase
    .from('employer_vacancy_applications')
    .select(`
      status,
      applicant_profile_id,
      vacancy:vacancies(title)
    `)
    .eq('id', id)
    .single();

  const updates: Partial<VacancyApplication> = {
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
    console.error('Error updating application status:', error);
    return null;
  }

  // Notify applicant of status change
  if (existingApp && existingApp.status !== status) {
    notifyApplicantStatusChange(id, existingApp, status).catch(console.error);
  }

  return data;
};

// Helper to notify applicant of status change
async function notifyApplicantStatusChange(
  applicationId: string,
  existingApp: { applicant_profile_id: string | null; vacancy: { title: string } | null },
  newStatus: string
) {
  try {
    if (!existingApp.applicant_profile_id) return;

    // Get the user ID from the elec_id profile
    const { data: profile } = await supabase
      .from('employer_elec_id_profiles')
      .select('user_id')
      .eq('id', existingApp.applicant_profile_id)
      .single();

    if (!profile?.user_id) return;

    const vacancyTitle = (existingApp.vacancy as any)?.title || 'a job';
    let title = '';
    let body = '';
    let emoji = '';

    switch (newStatus) {
      case 'Reviewing':
        emoji = '👀';
        title = 'Application Being Reviewed';
        body = `Your application for ${vacancyTitle} is being reviewed`;
        break;
      case 'Shortlisted':
        emoji = '⭐';
        title = 'You\'ve Been Shortlisted!';
        body = `Great news! You've been shortlisted for ${vacancyTitle}`;
        break;
      case 'Interviewed':
        emoji = '🎤';
        title = 'Interview Scheduled';
        body = `Your interview for ${vacancyTitle} has been noted`;
        break;
      case 'Offered':
        emoji = '🎉';
        title = 'Job Offer!';
        body = `Congratulations! You've received an offer for ${vacancyTitle}`;
        break;
      case 'Hired':
        emoji = '🎊';
        title = 'You\'re Hired!';
        body = `Welcome aboard! You've been hired for ${vacancyTitle}`;
        break;
      case 'Rejected':
        title = 'Application Update';
        body = `Your application for ${vacancyTitle} was not successful this time`;
        break;
      default:
        return; // Don't notify for other statuses
    }

    await sendPushNotification(
      profile.user_id,
      emoji ? `${emoji} ${title}` : title,
      body,
      'job',
      { applicationId, status: newStatus, isEmployer: false }
    );
  } catch (error) {
    console.error('Error notifying applicant:', error);
  }
}

export const deleteApplication = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('employer_vacancy_applications')
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
    supabase.from('employer_vacancies').select('id', { count: 'exact' }).eq('status', 'Open'),
    supabase.from('employer_vacancy_applications').select('id', { count: 'exact' }),
    supabase.from('employer_vacancy_applications').select('id', { count: 'exact' }).eq('status', 'New'),
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
    supabase.from('employer_vacancies').select('id', { count: 'exact' }).eq('status', 'Open'),
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

// =============================================================================
// VACANCY TEMPLATES
// =============================================================================

export interface VacancyTemplate {
  id: string;
  name: string;
  title: string;
  type: EmploymentType;
  location: string | null;
  work_arrangement: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_period: string;
  benefits: string[];
  requirements: string[];
  experience_level: string | null;
  description: string | null;
  nice_to_have: string[] | null;
  schedule: string | null;
  is_system_template: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Get all vacancy templates (system + user created)
 */
export const getVacancyTemplates = async (): Promise<VacancyTemplate[]> => {
  const { data: { user } } = await supabase.auth.getUser();

  // Get user's custom templates (stored as JSONB)
  const { data, error } = await supabase
    .from('employer_vacancy_templates')
    .select('*')
    .eq('user_id', user?.id || '')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching vacancy templates:', error);
  }

  // Transform JSONB template_data to flat VacancyTemplate structure
  const userTemplates: VacancyTemplate[] = (data || []).map((row: {
    id: string;
    name: string;
    template_data: Record<string, unknown>;
    created_at: string;
    updated_at: string;
  }) => {
    const td = row.template_data || {};
    return {
      id: row.id,
      name: row.name,
      title: (td.title as string) || row.name,
      type: (td.type as EmploymentType) || 'Full-time',
      location: (td.location as string) || null,
      work_arrangement: (td.workArrangement as string) || 'On-site',
      salary_min: (td.salaryMin as number) || null,
      salary_max: (td.salaryMax as number) || null,
      salary_period: (td.salaryPeriod as string) || 'year',
      benefits: (td.benefits as string[]) || [],
      requirements: (td.requirements as string[]) || [],
      experience_level: (td.experienceLevel as string) || 'Mid',
      description: (td.description as string) || null,
      nice_to_have: (td.niceToHave as string[]) || [],
      schedule: (td.schedule as string) || null,
      is_system_template: false,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  });

  // Return built-in templates first, then user templates
  return [...getBuiltInTemplates(), ...userTemplates];
};

/**
 * Save a vacancy as a reusable template
 */
export const saveVacancyAsTemplate = async (
  name: string,
  vacancyData: Partial<Vacancy> & {
    work_arrangement?: string;
    experience_level?: string;
    nice_to_have?: string[];
    schedule?: string;
  }
): Promise<VacancyTemplate | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('No authenticated user');
    return null;
  }

  // Store as JSONB template_data with camelCase keys
  const template_data = {
    title: vacancyData.title || '',
    type: vacancyData.type || 'Full-time',
    location: vacancyData.location || null,
    workArrangement: vacancyData.work_arrangement || 'On-site',
    salaryMin: vacancyData.salary_min || null,
    salaryMax: vacancyData.salary_max || null,
    salaryPeriod: vacancyData.salary_period || 'year',
    benefits: vacancyData.benefits || [],
    requirements: vacancyData.requirements || [],
    experienceLevel: vacancyData.experience_level || 'Mid',
    description: vacancyData.description || null,
    niceToHave: vacancyData.nice_to_have || [],
    schedule: vacancyData.schedule || null,
  };

  const { data, error } = await supabase
    .from('employer_vacancy_templates')
    .insert({
      user_id: user.id,
      name,
      template_data,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving vacancy template:', error);
    return null;
  }

  // Transform the returned JSONB to flat structure
  const td = data.template_data || {};
  return {
    id: data.id,
    name: data.name,
    title: (td.title as string) || name,
    type: (td.type as EmploymentType) || 'Full-time',
    location: (td.location as string) || null,
    work_arrangement: (td.workArrangement as string) || 'On-site',
    salary_min: (td.salaryMin as number) || null,
    salary_max: (td.salaryMax as number) || null,
    salary_period: (td.salaryPeriod as string) || 'year',
    benefits: (td.benefits as string[]) || [],
    requirements: (td.requirements as string[]) || [],
    experience_level: (td.experienceLevel as string) || 'Mid',
    description: (td.description as string) || null,
    nice_to_have: (td.niceToHave as string[]) || [],
    schedule: (td.schedule as string) || null,
    is_system_template: false,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
};

/**
 * Delete a user-created template
 */
export const deleteVacancyTemplate = async (id: string): Promise<boolean> => {
  // Don't allow deleting built-in templates (they have 'template-' prefix)
  if (id.startsWith('template-')) {
    console.error('Cannot delete built-in templates');
    return false;
  }

  const { error } = await supabase
    .from('employer_vacancy_templates')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting vacancy template:', error);
    return false;
  }

  return true;
};

/**
 * Duplicate an existing vacancy (for edit/clone)
 */
export const duplicateVacancy = async (vacancyId: string): Promise<Vacancy | null> => {
  const original = await getVacancyById(vacancyId);
  if (!original) return null;

  const duplicatedData = {
    title: `${original.title} (Copy)`,
    location: original.location,
    type: original.type,
    status: 'Draft' as VacancyStatus,
    salary_min: original.salary_min,
    salary_max: original.salary_max,
    salary_period: original.salary_period,
    description: original.description,
    requirements: original.requirements,
    benefits: original.benefits,
    closing_date: null,
  };

  return createVacancy(duplicatedData);
};

/**
 * Built-in templates for common electrical industry roles
 */
function getBuiltInTemplates(): VacancyTemplate[] {
  const now = new Date().toISOString();

  return [
    {
      id: 'template-qualified-electrician',
      name: 'Qualified Electrician',
      title: 'Qualified Electrician',
      type: 'Full-time',
      location: null,
      work_arrangement: 'On-site',
      salary_min: 35000,
      salary_max: 45000,
      salary_period: 'year',
      benefits: ['Company Vehicle', 'Pension', 'Tools Provided', 'Training Budget'],
      requirements: ['18th Edition (BS7671)', 'NVQ Level 3', 'Full UK Driving Licence', 'ECS Gold Card'],
      experience_level: 'Mid',
      description: `<h2>About the Role</h2>
<p>We are looking for an experienced Qualified Electrician to join our team. You will be responsible for carrying out electrical installations, maintenance, and repairs across residential and commercial properties.</p>

<h2>Key Responsibilities</h2>
<ul>
<li>Install, maintain, and repair electrical systems</li>
<li>Ensure all work complies with BS7671 regulations</li>
<li>Complete accurate documentation and certification</li>
<li>Diagnose and resolve electrical faults efficiently</li>
</ul>

<h2>What We Offer</h2>
<ul>
<li>Competitive salary with overtime opportunities</li>
<li>Company vehicle and fuel card</li>
<li>Ongoing training and development</li>
<li>Supportive team environment</li>
</ul>`,
      nice_to_have: ['Testing & Inspection (2391)', 'Solar PV Experience'],
      schedule: 'Monday - Friday, 8am - 5pm',
      is_system_template: true,
      created_at: now,
      updated_at: now,
    },
    {
      id: 'template-electrical-apprentice',
      name: 'Electrical Apprentice',
      title: 'Electrical Apprentice',
      type: 'Apprenticeship',
      location: null,
      work_arrangement: 'On-site',
      salary_min: 18000,
      salary_max: 24000,
      salary_period: 'year',
      benefits: ['College Day Release', 'Tools Provided', 'Training', 'Pension'],
      requirements: ['GCSE Maths (Grade 4+)', 'GCSE English (Grade 4+)', 'Full UK Driving Licence'],
      experience_level: 'Entry',
      description: `<h2>About the Apprenticeship</h2>
<p>An exciting opportunity for someone looking to start their career in the electrical trade. You will gain hands-on experience while working towards your electrical qualifications.</p>

<h2>What You'll Learn</h2>
<ul>
<li>Domestic and commercial electrical installations</li>
<li>Electrical theory and regulations (BS7671)</li>
<li>Testing, inspection, and fault finding</li>
<li>Health and safety practices</li>
</ul>

<h2>Requirements</h2>
<ul>
<li>Enthusiasm to learn the trade</li>
<li>Good problem-solving skills</li>
<li>Reliable and punctual</li>
<li>Ability to work as part of a team</li>
</ul>`,
      nice_to_have: ['Basic Hand Tool Experience', 'Construction Site Experience'],
      schedule: '4 days on-site, 1 day college',
      is_system_template: true,
      created_at: now,
      updated_at: now,
    },
    {
      id: 'template-project-manager',
      name: 'Electrical Project Manager',
      title: 'Electrical Project Manager',
      type: 'Full-time',
      location: null,
      work_arrangement: 'Hybrid',
      salary_min: 50000,
      salary_max: 65000,
      salary_period: 'year',
      benefits: ['Company Car', 'Pension', 'Bonus Scheme', 'Healthcare'],
      requirements: ['18th Edition (BS7671)', 'Project Management Experience', 'Full UK Driving Licence', 'SMSTS'],
      experience_level: 'Senior',
      description: `<h2>About the Role</h2>
<p>We are seeking an experienced Electrical Project Manager to oversee multiple electrical installation projects from tender to completion.</p>

<h2>Key Responsibilities</h2>
<ul>
<li>Manage electrical installation projects</li>
<li>Coordinate with clients, contractors, and team members</li>
<li>Ensure projects are delivered on time and within budget</li>
<li>Maintain compliance with regulations and safety standards</li>
</ul>

<h2>What We Offer</h2>
<ul>
<li>Competitive salary with performance bonus</li>
<li>Company car and expenses</li>
<li>Flexible working arrangements</li>
<li>Career progression opportunities</li>
</ul>`,
      nice_to_have: ['PRINCE2 Certification', 'Commercial Project Experience'],
      schedule: 'Monday - Friday, flexible hours',
      is_system_template: true,
      created_at: now,
      updated_at: now,
    },
  ];
}
