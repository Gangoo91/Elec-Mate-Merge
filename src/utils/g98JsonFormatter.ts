/**
 * Formats G98 Commissioning certificate form data for PDF generation.
 * Pass-through formatter — G98 PDF template uses the same camelCase
 * field names as the form, so this mainly merges branding and ensures defaults.
 *
 * EREC G98 Issue 5 — Generators ≤16A per phase
 */

import { supabase } from '@/integrations/supabase/client';
import type { CertBranding } from '@/utils/certBranding';
import { ukDate } from '@/utils/certDate';

/**
 * Branding the caller resolves via `fetchCertBranding()`. Partial because a
 * caller may still hand over a hand-rolled subset, and because branding is
 * decorative — a missing field must never block a certificate.
 */
type BrandingOptions = Partial<CertBranding>;

/** G98's house colour, used until the electrician sets their own in Settings. */
export const G98_ACCENT = '#ea580c';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Fetch this report's photo evidence and return public URLs (photos: string[]).
 * Photos live in the inspection_photos table (written by useInspectionPhotos) —
 * nothing ever writes formData.photos, so callers must inject this at
 * generate/email time. URLs are resized via Supabase image transform so the
 * PDF embeds small rasters and the emailed PDF stays under the attachment limit.
 */
export const fetchG98ReportPhotos = async (reportId: string): Promise<string[]> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    // inspection_photos.report_id holds the reports table UUID, not the
    // G98-xxx report_id string — resolve it first (same as useInspectionPhotos).
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

/** G98 default protection settings (EREC G98 Issue 5) */
const G98_DEFAULTS: Record<string, string> = {
  ovStage1Voltage: '264.0',
  ovStage1Time: '1.0',
  ovStage2Voltage: '276.0',
  ovStage2Time: '0.5',
  uvStage1Voltage: '207.0',
  uvStage1Time: '1.5',
  uvStage2Voltage: '195.5',
  uvStage2Time: '0.5',
  ofStage1Freq: '50.4',
  ofStage1Time: '0.5',
  ofStage2Freq: '52.0',
  ofStage2Time: '0.5',
  ufStage1Freq: '47.5',
  ufStage1Time: '0.5',
  ufStage2Freq: '47.0',
  ufStage2Time: '0.5',
  rocoFRate: '1.0',
  rocoFTime: '0.5',
  reconnectionDelay: '60',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDefaultG98Data = (): Record<string, any> => ({
  referenceNumber: '',
  commissioningDate: '',
  notificationDate: '',
  dnoName: '',
  // Installer
  installerName: '',
  installerCompany: '',
  installerPhone: '',
  installerEmail: '',
  mcsNumber: '',
  registrationScheme: '',
  registrationNumber: '',
  // Site
  installationAddress: '',
  mpan: '',
  supplyType: 'single-phase',
  earthingArrangement: '',
  // Client
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  clientAddress: '',
  // Equipment
  equipmentType: '',
  equipmentManufacturer: '',
  equipmentModel: '',
  equipmentSerial: '',
  ratedOutput: '',
  numberOfPhases: '1',
  typeTestCertRef: '',
  inverterManufacturer: '',
  inverterModel: '',
  associatedCertRef: '',
  // Export
  exportCapable: true,
  exportLimited: false,
  exportLimit: '',
  exportMeterFitted: false,
  exportMeterSerial: '',
  segSupplier: '',
  // Protection settings
  ...G98_DEFAULTS,
  // Commissioning confirmation
  antiIslandingConfirmed: false,
  protectionSettingsVerified: false,
  systemOperating: false,
  labelsApplied: false,
  customerInformed: false,
  // Signatures
  installerSignature: '',
  installerDate: '',
  customerSignature: '',
  customerDate: '',
  notes: '',
  // Form state
  completedSections: {},
  status: 'draft',
  // Branding
  companyLogo: '',
  companyName: '',
  companyAddress: '',
  companyPhone: '',
  companyEmail: '',
  companyWebsite: '',
  companyAccentColor: G98_ACCENT,
  registrationSchemeLogo: '',
});

/**
 * Main formatter — transforms G98 form data into the PDF payload.
 * Call this before sending to the generate-g98-commissioning-pdf edge function.
 */
export const formatG98Json = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: Record<string, any>,
  branding?: BrandingOptions,
) => {
  // Start with full defaults so every Liquid variable resolves
  const defaults = getDefaultG98Data();

  // Merge: defaults < formData < branding overrides
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload: Record<string, any> = {
    ...defaults,
    ...formData,

    // Ensure boolean fields are explicit true/false (not undefined)
    exportCapable: formData.exportCapable ?? true,
    exportLimited: formData.exportLimited ?? false,
    exportMeterFitted: formData.exportMeterFitted ?? false,
    antiIslandingConfirmed: formData.antiIslandingConfirmed ?? false,
    protectionSettingsVerified: formData.protectionSettingsVerified ?? false,
    systemOperating: formData.systemOperating ?? false,
    labelsApplied: formData.labelsApplied ?? false,
    customerInformed: formData.customerInformed ?? false,

    // Photo evidence (additive — safe for Liquid; template needs a photos
    // section added before these render on the PDF)
    photos: formData.photos ?? [],

    // Dates — the form stores ISO (date inputs); the PDF is a UK document.
    // These four are every date the G98 template renders.
    commissioningDate: ukDate(formData.commissioningDate ?? defaults.commissioningDate),
    notificationDate: ukDate(formData.notificationDate ?? defaults.notificationDate),
    installerDate: ukDate(formData.installerDate ?? defaults.installerDate),
    customerDate: ukDate(formData.customerDate ?? defaults.customerDate),

    // Branding overrides
    ...(branding?.companyLogo && { companyLogo: branding.companyLogo }),
    ...(branding?.companyName && { companyName: branding.companyName }),
    ...(branding?.companyAddress && { companyAddress: branding.companyAddress }),
    ...(branding?.companyPhone && { companyPhone: branding.companyPhone }),
    ...(branding?.companyEmail && { companyEmail: branding.companyEmail }),
    ...(branding?.companyWebsite && { companyWebsite: branding.companyWebsite }),
    ...(branding?.companyAccentColor && { companyAccentColor: branding.companyAccentColor }),
    ...(branding?.registrationSchemeLogo && {
      registrationSchemeLogo: branding.registrationSchemeLogo,
    }),
  };

  return payload;
};
