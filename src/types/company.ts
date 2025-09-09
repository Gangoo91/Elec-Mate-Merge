export interface CompanyProfile {
  id: string;
  user_id: string;
  company_name: string;
  company_address?: string;
  company_postcode?: string;
  company_phone?: string;
  company_email?: string;
  company_website?: string;
  company_registration?: string;
  vat_number?: string;
  logo_url?: string;
  logo_data_url?: string;
  primary_color: string;
  secondary_color: string;
  currency: string;
  locale: string;
  payment_terms: string;
  bank_details?: any;
  created_at: Date;
  updated_at: Date;
}

export interface CompanyBranding {
  logo?: File | string;
  primaryColor: string;
  secondaryColor: string;
  currency: string;
  locale: string;
}