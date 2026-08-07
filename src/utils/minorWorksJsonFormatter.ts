/**
 * Build the Minor Works payload.
 *
 * ## Why this is a module and not a closure
 *
 * This logic lived inside `MinorWorksPdfGenerator` as a local function, which
 * made it the only certificate whose payload could not be inspected by anything
 * — not a test, not `check-cert-mapping`, not a person reading a diff. Every
 * other cert has an extractable `*JsonFormatter`. That is why Minor Works is the
 * one row in the mapping report nobody can verify: 80 unread template variables
 * and 107 blank fields, and no way to tell whether any of it is real.
 *
 * Behaviour is unchanged. The only difference is that company branding arrives
 * as an argument instead of being read from a hook, because a hook cannot be
 * called outside a component — which was the thing keeping this untestable.
 */
import { formatFieldForPdf } from '@/utils/minorWorksValidation';

/** Company branding, already loaded by the caller. Null when none is saved. */
export interface MinorWorksBranding {
  companyLogo?: string;
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  companyTagline?: string;
  companyAccentColor?: string;
  companyWebsite?: string;
  registrationSchemeLogo?: string;
}

export const formatMinorWorksJson = async (
  formData: Record<string, any>,
  savedReportId?: string,
  branding?: MinorWorksBranding | null
): Promise<Record<string, any>> => {
  // Merge company branding into form data
  let dataWithBranding = { ...formData };
  if (branding) {
    dataWithBranding = {
      ...dataWithBranding,
      companyLogo: branding.companyLogo || dataWithBranding.companyLogo || '',
      companyName:
        branding.companyName ||
        dataWithBranding.companyName ||
        dataWithBranding.contractorName ||
        '',
      companyAddress:
        branding.companyAddress ||
        dataWithBranding.companyAddress ||
        dataWithBranding.contractorAddress ||
        '',
      companyPhone: branding.companyPhone || dataWithBranding.companyPhone || '',
      companyEmail: branding.companyEmail || dataWithBranding.companyEmail || '',
      brandingTagline: branding.companyTagline || dataWithBranding.brandingTagline || '',
      brandingAccentColor:
        branding.companyAccentColor || dataWithBranding.brandingAccentColor || '#d69e2e',
      brandingWebsite: branding.companyWebsite || dataWithBranding.brandingWebsite || '',
      schemeLogo: branding.registrationSchemeLogo || dataWithBranding.schemeLogo || '',
    };
  }

  // ELE-876 — resolve scheme + company logos to PDF-safe data URLs before
  // the edge function receives them. Relative paths like
  // `/logos/schemes/niceic.png` would otherwise render as broken images
  // in PDFMonkey because it can't fetch our static asset paths.
  const { resolveSchemeLogo, resolveCompanyLogo } = await import('@/utils/resolveSchemeLogo');
  const resolvedSchemeLogo = await resolveSchemeLogo(
    dataWithBranding.schemeLogoDataUrl ||
      dataWithBranding.registrationSchemeLogo ||
      dataWithBranding.schemeLogo,
    dataWithBranding.registrationScheme || dataWithBranding.schemeProvider
  );
  const resolvedCompanyLogo = await resolveCompanyLogo(dataWithBranding.companyLogo);
  dataWithBranding = {
    ...dataWithBranding,
    schemeLogo: resolvedSchemeLogo,
    schemeLogoDataUrl: resolvedSchemeLogo,
    registrationSchemeLogo: resolvedSchemeLogo,
    companyLogo: resolvedCompanyLogo,
  };

  // Format form data for better PDF presentation
  const formattedFormData = { ...dataWithBranding };
  Object.keys(formattedFormData).forEach((key) => {
    if (formattedFormData[key]) {
      formattedFormData[key] = formatFieldForPdf(key, formattedFormData[key]);
    }
  });

  // Qualifying Supervisor countersignature — included in the payload when
  // the latest QS review is approved (rendered once the template has a QS
  // block; unknown keys are ignored by PDFMonkey until then).
  const { getLatestApprovedQsReview, formatQsReviewDate } = await import('@/utils/qsReviewPdf');
  const qsReview = savedReportId ? await getLatestApprovedQsReview(savedReportId) : null;
  if (qsReview) {
    formattedFormData.qsName = qsReview.reviewer_name;
    formattedFormData.qsSignature = qsReview.qs_signature;
    formattedFormData.qsPosition = qsReview.qs_position;
    formattedFormData.qsDate = formatQsReviewDate(qsReview.reviewed_at);
  }

  return formattedFormData;
};
