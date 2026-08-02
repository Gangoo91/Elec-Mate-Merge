/**
 * Formats G99 Commissioning certificate form data for PDF generation.
 * Pass-through formatter — G99 PDF template uses the same camelCase
 * field names as the form, so this mainly merges branding and ensures defaults.
 *
 * EREC G99 Issue 5 — Generators >16A per phase
 */

import { G99FormData, getDefaultG99FormData } from '@/types/g99-commissioning';
import { supabase } from '@/integrations/supabase/client';
import type { CertBranding } from '@/utils/certBranding';
import { ukDate } from '@/utils/certDate';

/** Branding the caller resolves via `fetchCertBranding()` — see certBranding.ts. */
type BrandingOptions = Partial<CertBranding>;

/** G99's house colour, used until the electrician sets their own in Settings. */
export const G99_ACCENT = '#dc2626';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Fetch this report's photo evidence and return public URLs (photos: string[]).
 * Photos live in the inspection_photos table (written by useInspectionPhotos) —
 * nothing ever writes formData.photos, so callers must inject this at
 * generate/email time. URLs are resized via Supabase image transform so the
 * PDF embeds small rasters and the emailed PDF stays under the attachment limit.
 */
export const fetchG99ReportPhotos = async (reportId: string): Promise<string[]> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    // inspection_photos.report_id holds the reports table UUID, not the
    // G99-xxx report_id string — resolve it first (same as useInspectionPhotos).
    const { data: report } = await supabase
      .from('reports')
      .select('id')
      .eq('report_id', reportId)
      .eq('user_id', user.id)
      .maybeSingle();
    const reportUuid = report?.id || (UUID_REGEX.test(reportId) ? reportId : null);
    if (!reportUuid) return [];

    const { data: photoRows } = await supabase
      .from('inspection_photos')
      .select('file_path')
      .eq('report_id', reportUuid)
      .order('uploaded_at');

    return (photoRows || []).map((photo) => {
      const {
        data: { publicUrl },
      } = supabase.storage.from('inspection-photos').getPublicUrl(photo.file_path, {
        transform: { width: 1000, height: 1400, resize: 'contain', quality: 60 },
      });
      return publicUrl;
    });
  } catch {
    return [];
  }
};

/**
 * Main formatter — transforms G99FormData into the PDF payload.
 * Call this before sending to the generate-g99-commissioning-pdf edge function.
 */
export const formatG99Json = (
  formData: Partial<G99FormData>,
  branding?: BrandingOptions
) => {
  // Start with full defaults so every Liquid variable resolves
  const defaults = getDefaultG99FormData();

  // Merge: defaults < formData < branding overrides
  const payload = {
    ...defaults,
    ...formData,

    // Ensure boolean fields are explicit true/false (not undefined)
    dnoApprovalReceived: formData.dnoApprovalReceived ?? false,
    networkStudyRequired: formData.networkStudyRequired ?? false,
    interTripRequired: formData.interTripRequired ?? false,
    exportCapable: formData.exportCapable ?? true,
    exportLimited: formData.exportLimited ?? false,
    exportMeterFitted: formData.exportMeterFitted ?? false,
    reactivePowerVerified: formData.reactivePowerVerified ?? false,
    activePowerControlVerified: formData.activePowerControlVerified ?? false,
    frequencyResponseVerified: formData.frequencyResponseVerified ?? false,
    dnoWitnessRequired: formData.dnoWitnessRequired ?? false,
    antiIslandingConfirmed: formData.antiIslandingConfirmed ?? false,
    protectionSettingsVerified: formData.protectionSettingsVerified ?? false,
    systemOperating: formData.systemOperating ?? false,
    labelsApplied: formData.labelsApplied ?? false,
    customerInformed: formData.customerInformed ?? false,

    // Photo evidence (additive — safe for Liquid; template needs a photos
    // section added before these render on the PDF)
    photos: formData.photos ?? [],

    // Dates — the form stores ISO (date inputs); the PDF is a UK document.
    // These seven are every date the G99 template renders.
    commissioningDate: ukDate(formData.commissioningDate),
    proposedCommissioningDate: ukDate(formData.proposedCommissioningDate),
    applicationDate: ukDate(formData.applicationDate),
    dnoApprovalDate: ukDate(formData.dnoApprovalDate),
    dnoWitnessDate: ukDate(formData.dnoWitnessDate),
    installerDate: ukDate(formData.installerDate),
    customerDate: ukDate(formData.customerDate),

    // Branding overrides
    ...(branding?.companyLogo && { companyLogo: branding.companyLogo }),
    ...(branding?.companyName && { companyName: branding.companyName }),
    ...(branding?.companyAddress && { companyAddress: branding.companyAddress }),
    ...(branding?.companyPhone && { companyPhone: branding.companyPhone }),
    ...(branding?.companyEmail && { companyEmail: branding.companyEmail }),
    ...(branding?.companyWebsite && { companyWebsite: branding.companyWebsite }),
    companyAccentColor: branding?.companyAccentColor || G99_ACCENT,
    ...(branding?.registrationSchemeLogo && {
      registrationSchemeLogo: branding.registrationSchemeLogo,
    }),
  };

  return payload;
};
