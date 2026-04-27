/**
 * Scheme logo resolver — ELE-876
 *
 * The PDF templates render `<img src="{{registration_scheme_logo}}" />`.
 * PDFMonkey fetches the image at PDF-generation time, so the value MUST be
 * one of:
 *   • A data URL (`data:image/...;base64,...`) — embeds the image inline
 *   • A fully-qualified absolute URL (`https://...`) — PDFMonkey can fetch
 *
 * Relative paths like `/logos/schemes/niceic.png` work in the browser preview
 * but fail in PDFMonkey's Chrome renderer, producing a broken-image
 * placeholder. Some legacy certs were saved with relative paths because the
 * data-URL pipeline didn't exist yet.
 *
 * This resolver:
 *   1. If the value is already a data URL, returns it unchanged.
 *   2. If it's a relative path matching one of our bundled scheme logos,
 *      fetches it and converts to a data URL.
 *   3. If a `registrationScheme` value is provided (e.g. "NICEIC") and the
 *      logo URL is missing or broken, looks up the bundled scheme and
 *      converts that to a data URL.
 *   4. Otherwise returns the original value (could be empty, an absolute URL,
 *      or the user's own uploaded URL — leave alone).
 */
import { getSchemeInfo, SCHEMES } from '@/constants/schemeLogos';

const fetchAsDataUrl = async (path: string): Promise<string | null> => {
  try {
    const response = await fetch(path);
    if (!response.ok) return null;
    const blob = await response.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

const isDataUrl = (s: string): boolean => s.startsWith('data:');
const isAbsoluteUrl = (s: string): boolean => /^https?:\/\//i.test(s);
const isRelativePath = (s: string): boolean => s.startsWith('/');

const matchesBundledScheme = (path: string): boolean =>
  SCHEMES.some((s) => path === s.logoPath);

/**
 * Convert any scheme-logo value into a PDF-safe form.
 * Pass either the stored URL/path OR the scheme name (or both).
 */
export const resolveSchemeLogo = async (
  storedLogo: string | undefined | null,
  schemeName?: string | null
): Promise<string> => {
  // 1) Already PDF-safe
  if (storedLogo && isDataUrl(storedLogo)) return storedLogo;
  if (storedLogo && isAbsoluteUrl(storedLogo)) return storedLogo;

  // 2) Relative path matching a bundled scheme — fetch + convert
  if (storedLogo && isRelativePath(storedLogo) && matchesBundledScheme(storedLogo)) {
    const dataUrl = await fetchAsDataUrl(storedLogo);
    if (dataUrl) return dataUrl;
  }

  // 3) Stored logo is empty/broken but we know the scheme — derive from the lookup
  if (schemeName) {
    const info = getSchemeInfo(schemeName);
    if (info) {
      const dataUrl = await fetchAsDataUrl(info.logoPath);
      if (dataUrl) return dataUrl;
    }
  }

  // 4) Nothing usable — return original (probably empty string), template will skip render
  return storedLogo || '';
};

/**
 * Convert any company-logo value into a PDF-safe form.
 *
 * Company logos differ from scheme logos in two ways:
 *   • There's no scheme-name fallback — if the value is missing we have to
 *     leave it empty (template skips render).
 *   • Relative paths could be ANYTHING the user uploaded, not just a fixed
 *     bundled set — try to fetch every relative path.
 *
 * Same PDF-safety guarantees: data URL or absolute URL go through unchanged,
 * relative paths get converted to data URLs, anything else is dropped.
 */
export const resolveCompanyLogo = async (
  storedLogo: string | undefined | null
): Promise<string> => {
  if (!storedLogo) return '';
  // Drop placeholder strings
  if (storedLogo.includes('placeholder')) return '';
  // 1) Already PDF-safe
  if (isDataUrl(storedLogo)) return storedLogo;
  if (isAbsoluteUrl(storedLogo)) return storedLogo;
  // 2) Relative path — try to fetch + convert
  if (isRelativePath(storedLogo)) {
    const dataUrl = await fetchAsDataUrl(storedLogo);
    if (dataUrl) return dataUrl;
  }
  // 3) Could not resolve — drop it so the template doesn't render a broken img
  return '';
};
