import { supabase } from '@/integrations/supabase/client';

export interface OutreachContact {
  id: string;
  email: string;
  name: string | null;
  organisation: string | null;
  role: string | null;
  contact_type: string | null;
  tags: string[];
  source: string | null;
  is_suppressed: boolean;
  suppression_reason: string | null;
  notes: string | null;
  created_at: string;
  engagement_score?: number;
  total_opens?: number;
  total_clicks?: number;
  total_sends?: number;
  last_opened_at?: string | null;
  last_clicked_at?: string | null;
  suppressed_at?: string | null;
}

export interface OutreachCampaign {
  id: string;
  name: string;
  subject: string;
  html_body: string;
  from_name: string;
  from_email: string;
  reply_to?: string | null;
  preheader?: string | null;
  segment_filter: Record<string, unknown>;
  status: string;
  total_recipients: number;
  sent_count: number;
  failed_count: number;
  open_count: number;
  click_count: number;
  bounce_count: number;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  scheduled_at?: string | null;
  cloned_from?: string | null;
  template_slug?: string | null;
  notes?: string | null;
}

export interface OutreachTemplate {
  id: string;
  slug: string;
  name: string;
  category: string;
  subject: string;
  preheader: string | null;
  html_body: string;
  merge_tags: string[];
  description: string | null;
  thumbnail_emoji: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export async function callOutreach(action: string, payload: Record<string, unknown> = {}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const res = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-outreach-campaign`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ action, ...payload }),
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const CAMPAIGN_STATUS_STYLES: Record<string, string> = {
  draft: 'bg-slate-500/20 text-slate-300',
  scheduled: 'bg-violet-500/20 text-violet-300',
  sending: 'bg-blue-500/20 text-blue-300',
  paused: 'bg-amber-500/20 text-amber-300',
  completed: 'bg-green-500/20 text-green-300',
};

export const CONTACT_TYPE_STYLES: Record<string, string> = {
  college: 'bg-blue-500/20 text-blue-300',
  employer: 'bg-green-500/20 text-green-300',
  supplier: 'bg-purple-500/20 text-purple-300',
  training_provider: 'bg-amber-500/20 text-amber-300',
  trade_body: 'bg-cyan-500/20 text-cyan-300',
  tutor: 'bg-pink-500/20 text-pink-300',
  apprentice: 'bg-yellow-500/20 text-yellow-300',
  other: 'bg-slate-500/20 text-slate-300',
};

export const CONTACT_TYPES = [
  'college',
  'employer',
  'supplier',
  'training_provider',
  'trade_body',
  'tutor',
  'apprentice',
  'other',
] as const;

export const MERGE_TAGS = [
  { tag: '{{FirstName}}', label: 'First name', example: 'Sam' },
  { tag: '{{Name}}', label: 'Full name', example: 'Sam Tutor' },
  { tag: '{{OrganisationName}}', label: 'Organisation', example: 'Barnet College' },
  { tag: '{{Region}}', label: 'Region / location', example: 'London' },
  { tag: '{{Role}}', label: 'Role / job title', example: 'Head of Electrical' },
  { tag: '{{Email}}', label: 'Email address', example: 'sam@college.ac.uk' },
];

// Smart segment presets applied in the Contacts tab
export interface SmartSegment {
  id: string;
  label: string;
  emoji: string;
  filter: {
    contact_type?: string;
    tag?: string;
    suppressed_only?: boolean;
    engaged_only?: boolean;
    never_opened?: boolean;
  };
}

export interface EducationLead {
  id: string;
  source: string;
  source_url: string | null;
  source_id: string | null;
  email: string | null;
  email_type: string | null;
  name: string | null;
  role: string | null;
  phone: string | null;
  organisation: string;
  organisation_type: string | null;
  website: string | null;
  domain: string | null;
  city: string | null;
  postcode: string | null;
  region: string | null;
  country: string;
  offers_electrical_level_2: boolean | null;
  offers_electrical_level_3: boolean | null;
  specialisms: string[];
  confidence_score: number;
  verification_status: string;
  status: string;
  notes: string | null;
  created_at: string;
}

export interface BusinessLead {
  id: string;
  source: string;
  source_url: string | null;
  source_id: string | null;
  company_name: string;
  trading_name: string | null;
  company_number: string | null;
  sic_codes: string[];
  company_status: string | null;
  incorporation_date: string | null;
  email: string | null;
  email_type: string | null;
  website: string | null;
  domain: string | null;
  phone: string | null;
  city: string | null;
  postcode: string | null;
  region: string | null;
  country: string;
  director_names: string[];
  director_emails: string[];
  employee_estimate: string | null;
  accreditations: string[];
  confidence_score: number;
  verification_status: string;
  status: string;
  notes: string | null;
  created_at: string;
}

export interface ScrapeRun {
  id: string;
  source: string;
  target_table: string;
  status: string;
  started_at: string;
  completed_at: string | null;
  records_inserted: number;
  records_updated: number;
  records_skipped: number;
  errors_count: number;
  error_sample: string | null;
}

export const LEAD_STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-300',
  reviewed: 'bg-violet-500/20 text-violet-300',
  promoted: 'bg-green-500/20 text-green-300',
  rejected: 'bg-red-500/20 text-red-300',
  duplicate: 'bg-slate-500/20 text-slate-300',
};

export const SMART_SEGMENTS: SmartSegment[] = [
  { id: 'all', label: 'All contacts', emoji: '👥', filter: {} },
  { id: 'colleges', label: 'Colleges', emoji: '🎓', filter: { contact_type: 'college' } },
  { id: 'employers', label: 'Employers', emoji: '🔌', filter: { contact_type: 'employer' } },
  { id: 'tutors', label: 'Tutors', emoji: '🧑‍🏫', filter: { contact_type: 'tutor' } },
  { id: 'apprentices', label: 'Apprentices', emoji: '⚡', filter: { contact_type: 'apprentice' } },
  { id: 'london', label: 'London', emoji: '🇬🇧', filter: { tag: 'london' } },
  { id: 'scotland', label: 'Scotland', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', filter: { tag: 'scotland' } },
  { id: 'engaged', label: 'Engaged', emoji: '🔥', filter: { engaged_only: true } },
  { id: 'never-opened', label: 'Never opened', emoji: '👀', filter: { never_opened: true } },
  { id: 'suppressed', label: 'Suppressed', emoji: '🚫', filter: { suppressed_only: true } },
];
