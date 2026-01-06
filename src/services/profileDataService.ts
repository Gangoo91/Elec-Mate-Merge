/**
 * Profile Data Service
 *
 * Provides unified access to profile data with cascade priority:
 * 1. Elec-ID (verified data)
 * 2. Inspector Profile (user-entered)
 * 3. Account Profile (fallback)
 */

import { supabase } from "@/integrations/supabase/client";

// Unified inspector details interface for form auto-fill
export interface InspectorDetails {
  name: string;
  email: string;
  phone: string;
  company: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  registrationScheme: string;
  registrationNumber: string;
  registrationExpiry?: string;
  qualifications: string[];
  signatureData?: string;
}

export type DataSource = 'elec_id' | 'inspector_profile' | 'account';
export type ConfidenceLevel = 'verified' | 'user_entered' | 'fallback';

export interface ProfileDataResult {
  source: DataSource;
  data: InspectorDetails;
  confidence: ConfidenceLevel;
  isVerified: boolean;
  elecIdNumber?: string;
}

/**
 * Get profile data with cascade priority
 * Elec-ID → Inspector Profile → Account
 */
export async function getProfileData(userId: string): Promise<ProfileDataResult | null> {
  try {
    // 1. Try Elec-ID first (verified data)
    const elecIdResult = await getElecIdData(userId);
    if (elecIdResult) {
      return elecIdResult;
    }

    // 2. Try Inspector Profile (default)
    const inspectorResult = await getInspectorProfileData(userId);
    if (inspectorResult) {
      return inspectorResult;
    }

    // 3. Fallback to account
    const accountResult = await getAccountData(userId);
    return accountResult;
  } catch (error) {
    console.error('Error getting profile data:', error);
    return null;
  }
}

/**
 * Get Elec-ID profile data if verified
 */
async function getElecIdData(userId: string): Promise<ProfileDataResult | null> {
  const { data: elecIdProfile, error } = await supabase
    .from('employer_elec_id_profiles')
    .select('*')
    .eq('employee_id', userId)
    .eq('activated', true)
    .maybeSingle();

  if (error || !elecIdProfile) {
    return null;
  }

  // Only use Elec-ID if activated and not opted out
  if (!elecIdProfile.activated || elecIdProfile.opt_out) {
    return null;
  }

  // Get additional profile data (name, email from profiles table)
  const { data: userProfile } = await supabase
    .from('profiles')
    .select('full_name, email, phone')
    .eq('id', userId)
    .single();

  return {
    source: 'elec_id',
    confidence: elecIdProfile.verification_tier === 'verified' || elecIdProfile.verification_tier === 'premium'
      ? 'verified'
      : 'user_entered',
    isVerified: elecIdProfile.is_verified || elecIdProfile.verification_tier === 'verified' || elecIdProfile.verification_tier === 'premium',
    elecIdNumber: elecIdProfile.elec_id_number,
    data: {
      name: userProfile?.full_name || '',
      email: userProfile?.email || '',
      phone: userProfile?.phone || '',
      company: '', // Elec-ID doesn't store company info directly
      companyAddress: '',
      companyPhone: '',
      companyEmail: '',
      registrationScheme: elecIdProfile.ecs_card_type || '',
      registrationNumber: elecIdProfile.ecs_card_number || '',
      registrationExpiry: elecIdProfile.ecs_expiry_date || undefined,
      qualifications: elecIdProfile.specialisations || [],
      signatureData: undefined,
    },
  };
}

/**
 * Get default inspector profile data
 */
async function getInspectorProfileData(userId: string): Promise<ProfileDataResult | null> {
  const { data: inspectorProfile, error } = await supabase
    .from('inspector_profiles')
    .select('*')
    .eq('user_id', userId)
    .eq('is_default', true)
    .maybeSingle();

  if (error || !inspectorProfile) {
    // Try any profile if no default
    const { data: anyProfile } = await supabase
      .from('inspector_profiles')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!anyProfile) {
      return null;
    }

    return mapInspectorProfile(anyProfile);
  }

  return mapInspectorProfile(inspectorProfile);
}

function mapInspectorProfile(profile: any): ProfileDataResult {
  return {
    source: 'inspector_profile',
    confidence: 'user_entered',
    isVerified: false,
    data: {
      name: profile.name || '',
      email: profile.company_email || '',
      phone: profile.company_phone || '',
      company: profile.company_name || '',
      companyAddress: profile.company_address || '',
      companyPhone: profile.company_phone || '',
      companyEmail: profile.company_email || '',
      registrationScheme: profile.registration_scheme || '',
      registrationNumber: profile.registration_number || '',
      registrationExpiry: profile.registration_expiry || undefined,
      qualifications: profile.qualifications || [],
      signatureData: profile.signature_data || undefined,
    },
  };
}

/**
 * Get basic account profile data (fallback)
 */
async function getAccountData(userId: string): Promise<ProfileDataResult | null> {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !profile) {
    return null;
  }

  return {
    source: 'account',
    confidence: 'fallback',
    isVerified: false,
    data: {
      name: profile.full_name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      company: '',
      companyAddress: '',
      companyPhone: '',
      companyEmail: '',
      registrationScheme: '',
      registrationNumber: '',
      qualifications: [],
    },
  };
}

/**
 * Get data source display info
 */
export function getSourceDisplayInfo(source: DataSource): {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
} {
  switch (source) {
    case 'elec_id':
      return {
        label: 'Elec-ID',
        color: 'text-green-400',
        bgColor: 'bg-green-500/20',
        borderColor: 'border-green-500/40',
      };
    case 'inspector_profile':
      return {
        label: 'Inspector Profile',
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20',
        borderColor: 'border-blue-500/40',
      };
    case 'account':
      return {
        label: 'Account',
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/20',
        borderColor: 'border-amber-500/40',
      };
  }
}
