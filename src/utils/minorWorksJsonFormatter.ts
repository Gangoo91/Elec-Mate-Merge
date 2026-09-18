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
import { normalisePdfDates } from '@/utils/certDate';
import { importWithRetry } from '@/utils/lazyWithRetry';

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
  const { resolveSchemeLogo, resolveCompanyLogo } = await importWithRetry(() => import('@/utils/resolveSchemeLogo'));

  // ELE-1671 — the cover palette. The caller passes a narrow branding object
  // that predates this, so fall back to the signed-in electrician's profile.
  const { fetchCertBranding } = await importWithRetry(() => import('@/utils/certBranding'));
  const { coverPayloadKeys } = await importWithRetry(() => import('@/utils/certCoverPayload'));
  // Kept as a named value, not inlined: the logo on it is the fallback the
  // company-logo resolution below depends on (ELE-1751).
  const emCoverBranding = await fetchCertBranding('#d69e2e');
  const emCover = coverPayloadKeys(emCoverBranding);
  const resolvedSchemeLogo = await resolveSchemeLogo(
    dataWithBranding.schemeLogoDataUrl ||
      dataWithBranding.registrationSchemeLogo ||
      dataWithBranding.schemeLogo,
    dataWithBranding.registrationScheme || dataWithBranding.schemeProvider
  );
  /*
   * ELE-1751 — the company logo was missing from every Minor Works PDF while
   * the scheme badge rendered fine beside it.
   *
   * The logo only ever arrived through the optional `branding` argument, and
   * `MinorWorksPdfGenerator` passes `hasSavedCompanyBranding ? … : null` — so
   * whenever that flag is false the logo is simply never set, and
   * `company.logo_url` reaches the template empty.
   *
   * The irony is that the real logo was already in hand: `fetchCertBranding()`
   * above reads `logo_url`/`logo_data_url` straight off the company profile,
   * and the result was being used for the cover palette and then thrown away.
   * Craig Soper's profile has both fields populated — the data was never the
   * problem.
   *
   * So the fetched branding is the fallback. The caller's value still wins
   * where it is given, and the scheme logo's three-way fallback beside it is
   * the pattern being matched here rather than invented.
   */
  const resolvedCompanyLogo = await resolveCompanyLogo(
    dataWithBranding.companyLogo || emCoverBranding.companyLogo || ''
  );
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
  /*
   * ELE-1750 — this is the import that failed for Craig Soper. His browser was
   * on a pre-deploy build and `IqsReviewPdf-C2wOb7K7.js` had been replaced, so
   * the 404 took the whole certificate down. Wrapped so a stale client
   * recovers instead of failing to issue a legal document.
   */
  const { getLatestApprovedQsReview, formatQsReviewDate } = await importWithRetry(
    () => import('@/utils/qsReviewPdf')
  );
  const qsReview = savedReportId ? await getLatestApprovedQsReview(savedReportId) : null;
  if (qsReview) {
    formattedFormData.qsName = qsReview.reviewer_name;
    formattedFormData.qsSignature = qsReview.qs_signature;
    formattedFormData.qsPosition = qsReview.qs_position;
    formattedFormData.qsDate = formatQsReviewDate(qsReview.reviewed_at);
  }

  // ELE-1671 — cover palette. Added AFTER the formatting pass on purpose:
  // `formatFieldForPdf` walks every key, and a hex colour is not something it
  // should get a chance to rewrite.
  Object.assign(formattedFormData, emCover);

  // ELE-1552 — formatFieldForPdf only formats four hard-coded field names
  // (the ELE-1167 fix), so testEquipmentCalDate and bsAmendmentDate still
  // reached the template as ISO. See utils/certDate.ts.
  return normalisePdfDates(formattedFormData);
};
