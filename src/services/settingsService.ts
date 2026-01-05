import { supabase } from '@/integrations/supabase/client';

export interface AppSetting {
  id: string;
  key: string;
  value: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

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

export async function setSetting(key: string, value: string): Promise<boolean> {
  const { error } = await supabase
    .from('app_settings')
    .upsert({ 
      key, 
      value, 
      updated_at: new Date().toISOString() 
    }, { 
      onConflict: 'key' 
    });

  if (error) {
    console.error('Error saving setting:', error);
    return false;
  }

  return true;
}

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

export interface BrandingSettings {
  company_logo_url: string | null;
  brand_primary_color: string;
  brand_secondary_color: string;
}

export async function getCompanySettings(): Promise<CompanySettings> {
  const keys = [
    'company_name',
    'company_address', 
    'company_phone',
    'company_email',
    'company_number',
    'company_vat_number',
    'company_website',
    'bank_account_name',
    'bank_sort_code',
    'bank_account_number'
  ];

  const { data, error } = await supabase
    .from('app_settings')
    .select('key, value')
    .in('key', keys);

  if (error) {
    console.error('Error fetching company settings:', error);
  }

  const settings: CompanySettings = {
    company_name: '',
    company_address: '',
    company_phone: '',
    company_email: '',
    company_number: '',
    company_vat_number: '',
    company_website: '',
    bank_account_name: '',
    bank_sort_code: '',
    bank_account_number: ''
  };

  data?.forEach(row => {
    if (row.key in settings) {
      settings[row.key as keyof CompanySettings] = row.value || '';
    }
  });

  return settings;
}

export async function saveCompanySettings(settings: CompanySettings): Promise<boolean> {
  const entries = Object.entries(settings);
  
  for (const [key, value] of entries) {
    const success = await setSetting(key, value);
    if (!success) return false;
  }
  
  return true;
}

export async function getBrandingSettings(): Promise<BrandingSettings> {
  const keys = ['company_logo_url', 'brand_primary_color', 'brand_secondary_color'];

  const { data, error } = await supabase
    .from('app_settings')
    .select('key, value')
    .in('key', keys);

  if (error) {
    console.error('Error fetching branding settings:', error);
  }

  const settings: BrandingSettings = {
    company_logo_url: null,
    brand_primary_color: '#f59e0b',
    brand_secondary_color: '#0f172a'
  };

  data?.forEach(row => {
    if (row.key === 'company_logo_url') {
      settings.company_logo_url = row.value;
    } else if (row.key === 'brand_primary_color' && row.value) {
      settings.brand_primary_color = row.value;
    } else if (row.key === 'brand_secondary_color' && row.value) {
      settings.brand_secondary_color = row.value;
    }
  });

  return settings;
}

export async function saveBrandingSettings(settings: BrandingSettings): Promise<boolean> {
  const entries = Object.entries(settings);
  
  for (const [key, value] of entries) {
    if (value !== null) {
      const success = await setSetting(key, value);
      if (!success) return false;
    }
  }
  
  return true;
}

export async function uploadCompanyLogo(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `logo-${Date.now()}.${fileExt}`;
  const filePath = `logos/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('company-assets')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.error('Error uploading logo:', uploadError);
    return null;
  }

  const { data } = supabase.storage
    .from('company-assets')
    .getPublicUrl(filePath);

  const logoUrl = data.publicUrl;

  // Save URL to settings
  const saved = await setSetting('company_logo_url', logoUrl);
  if (!saved) {
    console.error('Failed to save logo URL to settings');
    return null;
  }

  return logoUrl;
}

export async function getAllSettings(): Promise<AppSetting[]> {
  const { data, error } = await supabase
    .from('app_settings')
    .select('*')
    .order('key');

  if (error) {
    console.error('Error fetching all settings:', error);
    return [];
  }

  return data ?? [];
}

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
