import { AccountingIntegration } from './accounting';

export interface WorkerRates {
  electrician: number;
  apprentice: number;
  labourer: number;
  designer: number;
  owner: number;
}

export interface TestingInstrument {
  id: string;
  instrument_type: 'multifunction' | 'insulation' | 'loop_impedance' | 'rcd' | 'pat' | 'clamp_meter' | 'other';
  make: string;
  model: string;
  serial_number: string;
  calibration_date: string;
  calibration_due?: string;
}

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
  hourly_rate?: number;
  created_at: Date;
  updated_at: Date;

  // Worker rates for different worker types
  worker_rates?: WorkerRates;

  // Inspector details for certificates (EICR/EIC/Minor Works)
  inspector_name?: string;
  inspector_qualifications?: string[];
  registration_scheme?: string;
  registration_number?: string;
  registration_expiry?: string;
  insurance_provider?: string;
  insurance_policy_number?: string;
  insurance_coverage?: string;
  insurance_expiry?: string;
  signature_data?: string;

  // Stripe integration fields (auto-managed by edge functions)
  stripe_account_id?: string;
  stripe_account_status?: 'not_connected' | 'pending' | 'active' | 'restricted';

  // Accounting software integrations
  accounting_integrations?: AccountingIntegration[];

  // Testing instruments for certificates
  testing_instruments?: TestingInstrument[];

  // Quote settings
  quote_terms?: string;
  quote_validity_days?: number;
  warranty_period?: string;
  deposit_percentage?: number;
  accent_color?: string;
}

export interface CompanyBranding {
  logo?: File | string;
  primaryColor: string;
  secondaryColor: string;
  currency: string;
  locale: string;
}