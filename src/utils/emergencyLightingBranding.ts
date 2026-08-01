/**
 * Company branding helpers for the Emergency Lighting certificate.
 *
 * One merge used by BOTH the Generate path (EmergencyLightingCertificate.tsx)
 * and the Email path (EmergencyLightingTabNavigation.tsx) so a certificate
 * emailed before Generate carries the same logo, scheme badge and accent
 * colour as a generated one.
 */

import type { EmergencyLightingFormData } from '@/types/emergency-lighting';
import type { CompanyBranding } from '@/hooks/inspection/useEmergencyLightingSmartForm';

/** Merge saved Business Settings branding into the certificate data. */
export function mergeEmergencyLightingBranding(
  data: Partial<EmergencyLightingFormData>,
  branding: CompanyBranding | null
): Partial<EmergencyLightingFormData> {
  if (!branding) return data;
  return {
    ...data,
    companyLogo: branding.companyLogo || data.companyLogo,
    companyName: branding.companyName || data.companyName || data.testerCompany,
    companyAddress: branding.companyAddress || data.companyAddress,
    companyPhone: branding.companyPhone || data.companyPhone,
    companyEmail: branding.companyEmail || data.companyEmail,
    companyWebsite: branding.companyWebsite || data.companyWebsite,
    accentColor: branding.companyAccentColor || data.accentColor,
    registrationSchemeLogo: branding.registrationSchemeLogo || data.registrationSchemeLogo,
    registrationScheme: branding.registrationScheme || data.registrationScheme,
    registrationNumber: branding.registrationNumber || data.registrationNumber,
  };
}

/**
 * Auto-resolve the registration scheme logo to a data URL when a scheme is
 * set but the stored logo is missing or a placeholder. Never throws — on any
 * failure the data is returned unchanged.
 */
export async function resolveEmergencyLightingSchemeLogo(
  data: Partial<EmergencyLightingFormData>
): Promise<Partial<EmergencyLightingFormData>> {
  const schemeName = data.registrationScheme;
  const currentLogo = data.registrationSchemeLogo || '';
  const isPlaceholderLogo =
    !currentLogo || currentLogo.length < 2000 || currentLogo.includes('image/svg+xml');
  if (!schemeName || schemeName === 'none' || schemeName === 'other' || !isPlaceholderLogo) {
    return data;
  }
  try {
    const { getSchemeInfo } = await import('@/constants/schemeLogos');
    const info = getSchemeInfo(schemeName);
    if (!info) return data;
    const resp = await fetch(info.logoPath);
    const blob = await resp.blob();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return { ...data, registrationSchemeLogo: dataUrl };
  } catch (err) {
    console.warn('[EmergencyLighting] Failed to resolve scheme logo:', err);
    return data;
  }
}
