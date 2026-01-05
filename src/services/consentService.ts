import { supabase } from '@/integrations/supabase/client';

export interface ConsentRecord {
  user_id?: string;
  email: string;
  full_name: string;
  terms_accepted: boolean;
  privacy_accepted: boolean;
  data_processing_accepted: boolean;
  marketing_opt_in: boolean;
  consent_timestamp: string;
  ip_address?: string;
  user_agent?: string;
}

/**
 * Store consent record in the database
 * This is called after successful signup to persist GDPR consent
 */
export const storeConsent = async (consent: ConsentRecord): Promise<{ success: boolean; error?: string }> => {
  try {
    // Get current user if available
    const { data: { user } } = await supabase.auth.getUser();

    const consentData = {
      user_id: user?.id || null,
      email: consent.email,
      full_name: consent.full_name,
      terms_accepted: consent.terms_accepted,
      privacy_accepted: consent.privacy_accepted,
      data_processing_accepted: consent.data_processing_accepted,
      marketing_opt_in: consent.marketing_opt_in,
      consent_timestamp: consent.consent_timestamp,
      ip_address: consent.ip_address || null,
      user_agent: consent.user_agent || navigator.userAgent,
      created_at: new Date().toISOString()
    };

    // Try to insert into user_consents table
    // If table doesn't exist, it will fail gracefully
    const { error } = await supabase
      .from('user_consents')
      .insert(consentData);

    if (error) {
      console.warn('Consent storage to DB failed, keeping local storage only:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('Consent storage error:', err.message);
    return { success: false, error: err.message };
  }
};

/**
 * Get consent record for the current user
 */
export const getConsent = async (userId: string): Promise<ConsentRecord | null> => {
  try {
    const { data, error } = await supabase
      .from('user_consents')
      .select('*')
      .eq('user_id', userId)
      .order('consent_timestamp', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      user_id: data.user_id,
      email: data.email,
      full_name: data.full_name,
      terms_accepted: data.terms_accepted,
      privacy_accepted: data.privacy_accepted,
      data_processing_accepted: data.data_processing_accepted,
      marketing_opt_in: data.marketing_opt_in,
      consent_timestamp: data.consent_timestamp
    };
  } catch {
    return null;
  }
};

/**
 * Update marketing consent preference
 */
export const updateMarketingConsent = async (userId: string, optIn: boolean): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_consents')
      .update({
        marketing_opt_in: optIn,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    return !error;
  } catch {
    return false;
  }
};

/**
 * Record consent withdrawal (for GDPR compliance)
 */
export const recordConsentWithdrawal = async (userId: string, reason?: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_consents')
      .update({
        consent_withdrawn: true,
        consent_withdrawn_at: new Date().toISOString(),
        withdrawal_reason: reason || null
      })
      .eq('user_id', userId);

    return !error;
  } catch {
    return false;
  }
};
