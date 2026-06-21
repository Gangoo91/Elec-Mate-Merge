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

// PDF letterhead logos only need to be a few hundred px wide, but some users
// have uploaded multi-MB images as their company logo. The PDF size guard can't
// strip them (logos are deliberately preserved so branding survives), so the
// whole EICR PDF fails to generate (ELE-1177). Downscale any oversized logo
// data URL before it reaches the PDF payload. Returns the original on any
// failure — never blocks PDF generation.
const LOGO_MAX_DIM = 320;
const LOGO_INLINE_LIMIT_BYTES = 120 * 1024; // ~120KB — above this, downscale

export const downscaleLogoDataUrl = async (dataUrl: string): Promise<string> => {
  if (!dataUrl || !isDataUrl(dataUrl)) return dataUrl;
  // Cheap size estimate: base64 decodes to ~0.75× its string length.
  if (dataUrl.length * 0.75 <= LOGO_INLINE_LIMIT_BYTES) return dataUrl;
  if (typeof document === 'undefined') return dataUrl; // SSR / non-DOM guard
  try {
    return await new Promise<string>((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          let { width, height } = img;
          if (!width || !height) return resolve(dataUrl);
          if (width > LOGO_MAX_DIM || height > LOGO_MAX_DIM) {
            if (width >= height) {
              height = Math.round((height * LOGO_MAX_DIM) / width);
              width = LOGO_MAX_DIM;
            } else {
              width = Math.round((width * LOGO_MAX_DIM) / height);
              height = LOGO_MAX_DIM;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(dataUrl);
          ctx.drawImage(img, 0, 0, width, height);
          // PNG preserves logo transparency; a 320px logo is only a few KB.
          const out = canvas.toDataURL('image/png');
          resolve(out && out.length < dataUrl.length ? out : dataUrl);
        } catch {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  } catch {
    return dataUrl;
  }
};

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
  // 1) Already PDF-safe — but downscale if the user uploaded an oversized image
  //    (ELE-1177): a multi-MB logo bloats the payload past the PDF size limit.
  if (isDataUrl(storedLogo)) return await downscaleLogoDataUrl(storedLogo);
  if (isAbsoluteUrl(storedLogo)) return storedLogo;
  // 2) Relative path — try to fetch + convert
  if (isRelativePath(storedLogo)) {
    const dataUrl = await fetchAsDataUrl(storedLogo);
    if (dataUrl) return await downscaleLogoDataUrl(dataUrl);
  }
  // 3) Could not resolve — drop it so the template doesn't render a broken img
  return '';
};
