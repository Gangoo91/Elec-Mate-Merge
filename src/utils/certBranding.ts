import { supabase } from '@/integrations/supabase/client';

/**
 * Company branding for certificate PDFs — ONE reader for the whole fleet.
 *
 * Users already set all of this in Settings → Business → Brand (BrandSheet
 * writes company_profiles.primary_color / secondary_color / accent_color, and
 * the logo pickers write logo_url / logo_data_url / scheme_logo_data_url).
 * The last mile was missing: nothing in the app ever read `accent_color`, so
 * every certificate rendered the template's hardcoded colour no matter what
 * the electrician chose.
 *
 * Two column traps this centralises:
 *  - There is NO `company_profiles.company_logo` column. Certs reading
 *    `cp.company_logo` silently got '' and never showed the user's logo. The
 *    real columns are `logo_data_url` (inline, preferred for PDF embedding)
 *    then `logo_url`.
 *  - The scheme logo is `scheme_logo_data_url` first, then
 *    `registration_scheme_logo`.
 */
export interface CertBranding {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyWebsite: string;
  companyLogo: string;
  /** Hex the user picked in Settings → Business → Brand, else the cert's own default. */
  companyAccentColor: string;
  registrationScheme: string;
  registrationNumber: string;
  registrationSchemeLogo: string;
}

/** Normalise a stored hex; returns '' when unusable so the caller's default wins. */
const hex = (v: unknown): string => {
  const s = String(v ?? '').trim();
  return /^#[0-9a-fA-F]{6}$/.test(s) ? s : '';
};

/**
 * Map a company_profiles row to certificate branding.
 * `fallbackAccent` is the cert's own house colour, used only when the user has
 * not chosen one — so each certificate keeps its identity out of the box while
 * the electrician's brand always wins if set.
 */
export const brandingFromCompanyProfile = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cp: any,
  fallbackAccent: string
): CertBranding => ({
  companyName: cp?.company_name || '',
  companyAddress: [cp?.company_address, cp?.company_postcode].filter(Boolean).join(', '),
  companyPhone: cp?.company_phone || '',
  companyEmail: cp?.company_email || '',
  companyWebsite: cp?.company_website || '',
  // NOT cp.company_logo — that column does not exist.
  companyLogo: cp?.logo_data_url || cp?.logo_url || '',
  // Settings → Business → Brand offers Primary / Secondary / Accent. Primary is
  // the one an electrician means by "my colour" (it leads the sheet and the
  // preview), and it is what the six smart-form hooks have always used — so it
  // wins here too. Accent is read as a fallback for anyone who only set that.
  companyAccentColor: hex(cp?.primary_color) || hex(cp?.accent_color) || fallbackAccent,
  registrationScheme: cp?.registration_scheme || '',
  registrationNumber: cp?.registration_number || '',
  registrationSchemeLogo: cp?.scheme_logo_data_url || cp?.registration_scheme_logo || '',
});

/**
 * Fetch the signed-in user's branding. Never throws — branding is decorative,
 * so a failure must not stop a certificate being generated or emailed.
 */
export const fetchCertBranding = async (fallbackAccent: string): Promise<CertBranding> => {
  try {
    const { data } = await supabase.rpc('get_my_company_profile');
    const cp = Array.isArray(data) ? data[0] : data;
    return brandingFromCompanyProfile(cp, fallbackAccent);
  } catch {
    return brandingFromCompanyProfile(null, fallbackAccent);
  }
};
