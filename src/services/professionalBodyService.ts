import { supabase } from '@/integrations/supabase/client';

export interface ProfessionalBody {
  id: string;
  name: string;
  code: string;
  description: string;
  annual_cpd_hours: number;
  renewal_period_months: number;
  categories: any;
  requirements: any;
  assessment_cycle: string;
  website_url?: string;
}

export interface UserProfessionalMembership {
  id: string;
  user_id: string;
  professional_body_id: string;
  membership_number?: string;
  registration_date?: string;
  renewal_date?: string;
  is_active: boolean;
  professional_body?: ProfessionalBody;
}

export const professionalBodyService = {
  async getAllProfessionalBodies(): Promise<ProfessionalBody[]> {
    const { data, error } = await supabase
      .from('professional_bodies')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching professional bodies:', error);
      throw error;
    }

    return data || [];
  },

  async getUserMemberships(userId: string): Promise<UserProfessionalMembership[]> {
    const { data, error } = await supabase
      .from('user_professional_memberships')
      .select(`
        *,
        professional_body:professional_bodies(*)
      `)
      .eq('user_id', userId)
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching user memberships:', error);
      throw error;
    }

    return data || [];
  },

  async addUserMembership(membership: Omit<UserProfessionalMembership, 'id'>): Promise<UserProfessionalMembership> {
    const { data, error } = await supabase
      .from('user_professional_memberships')
      .insert(membership)
      .select(`
        *,
        professional_body:professional_bodies(*)
      `)
      .single();

    if (error) {
      console.error('Error adding user membership:', error);
      throw error;
    }

    return data;
  },

  async updateUserMembership(id: string, updates: Partial<UserProfessionalMembership>): Promise<UserProfessionalMembership> {
    const { data, error } = await supabase
      .from('user_professional_memberships')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        professional_body:professional_bodies(*)
      `)
      .single();

    if (error) {
      console.error('Error updating user membership:', error);
      throw error;
    }

    return data;
  },

  async removeUserMembership(id: string): Promise<void> {
    const { error } = await supabase
      .from('user_professional_memberships')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error removing user membership:', error);
      throw error;
    }
  },

  async getProfessionalBodyById(id: string): Promise<ProfessionalBody | null> {
    const { data, error } = await supabase
      .from('professional_bodies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching professional body:', error);
      return null;
    }

    return data;
  }
};