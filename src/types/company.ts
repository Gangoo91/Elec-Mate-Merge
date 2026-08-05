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
  instrument_type:
    | 'multifunction'
    | 'insulation'
    | 'loop_impedance'
    | 'rcd'
    | 'pat'
    | 'clamp_meter'
    | 'other';
  make: string;
  model: string;
  serial_number: string;
  calibration_date: string;
  calibration_due?: string;
  /**
   * Maximum insulation-resistance reading this instrument can display, per test
   * voltage (ELE-1438 / ELE-1467). Stored as the electrician writes it on the
   * cert — e.g. ">209.9" or ">1049" — because the ">" is part of the reading,
   * not decoration: it records that the true value exceeded the meter's range.
   *
   * These belong to the instrument, not the company: a Kewtech KT66DL tops out
   * at >209.9 MΩ on 250V and >1049 MΩ on 500V, and a different MFT on the same
   * van will differ. Only meaningful for multifunction / insulation testers.
   */
  ir_max_250v?: string;
  ir_max_500v?: string;
  ir_max_1000v?: string;
}

export interface CompanyProfile {
  id: string;
  user_id: string;
  company_name: string;
  company_address?: string;
  company_postcode?: string;
  office_lat?: number | null; // Office location latitude (from Google Places)
  office_lng?: number | null; // Office location longitude (from Google Places)
  company_phone?: string;
  company_email?: string;
  company_website?: string;
  company_registration?: string;
  vat_number?: string;
  // ELE-1373 — Unique Taxpayer Reference, shown on invoices when CIS applies.
  // NI number is deliberately never stored or shown on invoices.
  utr?: string | null;
  logo_url?: string;
  logo_data_url?: string;
  primary_color: string;
  secondary_color: string;
  currency: string;
  locale: string;
  payment_terms: string;
  bank_details?: any;
  hourly_rate?: number;
  /** ELE-1021 — optional day rate (£) for quote-builder day-rate mode.
   *  Null/undefined falls back to hourly_rate × 8. */
  day_rate?: number | null;
  overhead_percentage?: number;
  profit_margin?: number;
  created_at: Date;
  updated_at: Date;

  // Review requests — appended to invoice + payment-received emails.
  review_request_enabled?: boolean;
  review_links?: { url: string; label?: string }[];
  review_request_message?: string | null;

  // Worker rates for different worker types
  worker_rates?: WorkerRates;

  // Inspector details for certificates (EICR/EIC/Minor Works)
  inspector_name?: string;
  inspector_qualifications?: string[];
  registration_scheme?: string;
  registration_number?: string;
  registration_expiry?: string;
  scheme_logo_data_url?: string;
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

  // Invoice settings
  invoice_terms?: string;
  late_payment_interest_rate?: string;
  default_vat_registered?: boolean | null;
  default_reverse_charge?: boolean | null;
  default_cis_enabled?: boolean | null;
  default_invoice_summary_view?: boolean | null;
  preferred_payment_method?: string;
}

export interface CompanyBranding {
  logo?: File | string;
  primaryColor: string;
  secondaryColor: string;
  currency: string;
  locale: string;
}
