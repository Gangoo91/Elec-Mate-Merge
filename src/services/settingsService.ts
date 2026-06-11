import { supabase } from '@/integrations/supabase/client';

/**
 * Employer settings service.
 *
 * Company-scoped settings (details, bank, branding, office location,
 * notification email) live in `company_profiles` keyed to the signed-in
 * account — the same table and pattern the electrician side uses — so they
 * follow the employer and everyone they onboard, and flow onto quotes,
 * invoices and PDFs through the existing generators.
 *
 * `app_settings` is PLATFORM config (pricing display, maintenance message…):
 * reads are limited to rows marked is_public; writes are admin-only.
 */

export interface AppSetting {
  id: string;
  key: string;
  value: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

/* ────────────────────────────────────────────────────────
   Platform config (app_settings — read mostly, admin-write)
   ──────────────────────────────────────────────────────── */

export async function getSetting(key: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('app_settings')
    .select('value')
    .eq('key', key)
    .maybeSingle();

  if (error) {
    console.error('Error fetching setting:', error);
    return null;
  }

  return data?.value ?? null;
}

/** Admin-only — RLS rejects non-admin writes. */
export async function setSetting(key: string, value: string): Promise<boolean> {
  const { error } = await supabase.from('app_settings').upsert(
    {
      key,
      value,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: 'key',
    }
  );

  if (error) {
    console.error('Error saving setting:', error);
    return false;
  }

  return true;
}

/** Admin-only — RLS rejects non-admin writes. */
export async function clearSetting(key: string): Promise<boolean> {
  const { error } = await supabase
    .from('app_settings')
    .update({ value: null, updated_at: new Date().toISOString() })
    .eq('key', key);

  if (error) {
    console.error('Error clearing setting:', error);
    return false;
  }

  return true;
}

export async function getAllSettings(): Promise<AppSetting[]> {
  const { data, error } = await supabase.from('app_settings').select('*').order('key');

  if (error) {
    console.error('Error fetching all settings:', error);
    return [];
  }

  return data ?? [];
}

/* ────────────────────────────────────────────────────────
   Company profile backing (per-account)
   ──────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CompanyProfilePatch = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getMyCompanyProfile(): Promise<Record<string, any> | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('company_profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching company profile:', error);
    return null;
  }
  return data;
}

async function upsertMyCompanyProfile(patch: CompanyProfilePatch): Promise<boolean> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.error('Not authenticated');
    return false;
  }

  const { data: updated, error } = await supabase
    .from('company_profiles')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('user_id', user.id)
    .select('id');

  if (error) {
    console.error('Error saving company profile:', error);
    return false;
  }

  if (!updated || updated.length === 0) {
    // First save — create the row (company_name is NOT NULL)
    const { error: insertError } = await supabase
      .from('company_profiles')
      .insert({ user_id: user.id, company_name: '', ...patch });
    if (insertError) {
      // 23505: a concurrent first-save won the race (user_id is unique) —
      // the row exists now, so apply the patch as an update instead.
      if (insertError.code === '23505') {
        const { error: retryError } = await supabase
          .from('company_profiles')
          .update({ ...patch, updated_at: new Date().toISOString() })
          .eq('user_id', user.id);
        if (retryError) {
          console.error('Error saving company profile (retry):', retryError);
          return false;
        }
        return true;
      }
      console.error('Error creating company profile:', insertError);
      return false;
    }
  }

  return true;
}

/* ────────────────────────────────────────────────────────
   Company details + bank
   ──────────────────────────────────────────────────────── */

export interface CompanySettings {
  company_name: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_number: string;
  company_vat_number: string;
  company_website: string;
  bank_account_name: string;
  bank_sort_code: string;
  bank_account_number: string;
}

export async function getCompanySettings(): Promise<CompanySettings> {
  const profile = await getMyCompanyProfile();
  const bank = profile?.bank_details || {};

  return {
    company_name: profile?.company_name || '',
    company_address: profile?.company_address || '',
    company_phone: profile?.company_phone || '',
    company_email: profile?.company_email || '',
    company_number: profile?.company_registration || '',
    company_vat_number: profile?.vat_number || '',
    company_website: profile?.company_website || '',
    bank_account_name: bank.accountName || '',
    bank_sort_code: bank.sortCode || '',
    bank_account_number: bank.accountNumber || '',
  };
}

export async function saveCompanySettings(settings: CompanySettings): Promise<boolean> {
  // Merge bank fields into the existing JSONB (preserves bankName etc.
  // saved by the electrician-side PaymentSheet, same camelCase shape)
  const profile = await getMyCompanyProfile();
  const bank_details = {
    ...(profile?.bank_details || {}),
    accountName: settings.bank_account_name,
    sortCode: settings.bank_sort_code,
    accountNumber: settings.bank_account_number,
  };

  return upsertMyCompanyProfile({
    company_name: settings.company_name,
    company_address: settings.company_address,
    company_phone: settings.company_phone,
    company_email: settings.company_email,
    company_registration: settings.company_number,
    vat_number: settings.company_vat_number,
    company_website: settings.company_website,
    bank_details,
  });
}

/* ────────────────────────────────────────────────────────
   Branding
   ──────────────────────────────────────────────────────── */

export interface BrandingSettings {
  company_logo_url: string | null;
  brand_primary_color: string;
  brand_secondary_color: string;
}

export async function getBrandingSettings(): Promise<BrandingSettings> {
  const profile = await getMyCompanyProfile();

  return {
    company_logo_url: profile?.logo_url || null,
    brand_primary_color: profile?.primary_color || '#f59e0b',
    brand_secondary_color: profile?.secondary_color || '#0f172a',
  };
}

export async function saveBrandingSettings(settings: BrandingSettings): Promise<boolean> {
  return upsertMyCompanyProfile({
    logo_url: settings.company_logo_url,
    primary_color: settings.brand_primary_color,
    secondary_color: settings.brand_secondary_color,
  });
}

export async function uploadCompanyLogo(file: File): Promise<string | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.error('Not authenticated');
    return null;
  }

  // Storage RLS on company-branding requires the user's id as the top folder
  const fileExt = file.name.split('.').pop();
  const filePath = `${user.id}/logo-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('company-branding')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.error('Error uploading logo:', uploadError);
    return null;
  }

  const { data } = supabase.storage.from('company-branding').getPublicUrl(filePath);
  const logoUrl = data.publicUrl;

  // Invoice/quote PDF generators read logo_data_url — store both (same as
  // the electrician upload path) so the logo actually reaches documents.
  const logoDataUrl = await new Promise<string | null>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });

  const saved = await upsertMyCompanyProfile({
    logo_url: logoUrl,
    ...(logoDataUrl ? { logo_data_url: logoDataUrl } : {}),
  });
  if (!saved) {
    console.error('Failed to save logo URL to company profile');
    return null;
  }

  return logoUrl;
}

/* ────────────────────────────────────────────────────────
   Notification email
   ──────────────────────────────────────────────────────── */

export async function getNotificationEmail(): Promise<string> {
  const profile = await getMyCompanyProfile();
  return profile?.notification_email || '';
}

export async function setNotificationEmail(email: string): Promise<boolean> {
  return upsertMyCompanyProfile({ notification_email: email });
}

/* ────────────────────────────────────────────────────────
   Office location
   ──────────────────────────────────────────────────────── */

export interface OfficeLocation {
  lat: number | null;
  lng: number | null;
  address: string | null;
}

export async function getOfficeLocation(): Promise<OfficeLocation> {
  const profile = await getMyCompanyProfile();

  return {
    lat: profile?.office_lat ?? null,
    lng: profile?.office_lng ?? null,
    address: profile?.office_address ?? null,
  };
}

export async function saveOfficeLocation(location: OfficeLocation): Promise<boolean> {
  const patch: CompanyProfilePatch = {};
  if (location.lat !== null) patch.office_lat = location.lat;
  if (location.lng !== null) patch.office_lng = location.lng;
  if (location.address !== null) patch.office_address = location.address;
  if (Object.keys(patch).length === 0) return true;

  return upsertMyCompanyProfile(patch);
}
