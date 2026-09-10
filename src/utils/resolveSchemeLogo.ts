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
//
// ELE-1668 — this used to be a single hard pass at 320px, which is where the
// "logo goes blurry when I zoom in" reports came from. 320px is roughly 100dpi
// at the size a letterhead logo actually prints, so it looked soft on screen
// and worse on paper. Worth being precise about what the constraint really is:
// it was never "logos must be small", it was "the whole JSON payload must stay
// under ~800KB, and `pdfDataOptimizer` strips any preserved logo over 150KB".
//
// So the cap is a BYTE budget, not a pixel one. Start at a dimension that
// prints cleanly and step down only as far as the budget actually forces.
// Most logos are flat-colour artwork that stay tiny as PNG even at 1024px, so
// in practice they now keep 3× the resolution they had — and only a
// photographic logo gets stepped down at all.
//
// Note this path is now the FALLBACK, not the norm: `certBranding` prefers the
// hosted `logo_url`, which skips inlining (and therefore this function) whole.
const LOGO_DIM_LADDER = [1024, 768, 512, 320] as const;
// Sits just under `PRESERVE_MAX_BYTES` (150KB) in `pdfDataOptimizer.ts`. Above
// that the optimiser strips the logo entirely, so overshooting here trades a
// slightly soft logo for no logo at all. Keep the two in step.
const LOGO_BUDGET_BYTES = 140 * 1024;
// Below this, leave the image completely alone — re-encoding a small logo can
// only lose quality.
const LOGO_INLINE_LIMIT_BYTES = 120 * 1024;

/** Decoded byte estimate for a base64 data URL (base64 is ~4/3 of the bytes). */
const dataUrlBytes = (s: string): number => s.length * 0.75;

export const downscaleLogoDataUrl = async (dataUrl: string): Promise<string> => {
  if (!dataUrl || !isDataUrl(dataUrl)) return dataUrl;
  if (dataUrlBytes(dataUrl) <= LOGO_INLINE_LIMIT_BYTES) return dataUrl;
  if (typeof document === 'undefined') return dataUrl; // SSR / non-DOM guard
  try {
    return await new Promise<string>((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          const { width: srcW, height: srcH } = img;
          if (!srcW || !srcH) return resolve(dataUrl);

          let best: string | null = null;

          for (const maxDim of LOGO_DIM_LADDER) {
            // Never upscale: a 400px logo stays 400px even at the 1024 rung.
            const scale = Math.min(1, maxDim / Math.max(srcW, srcH));
            const width = Math.max(1, Math.round(srcW * scale));
            const height = Math.max(1, Math.round(srcH * scale));

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return resolve(dataUrl);
            // Logos are line art and type; a good resampler is the difference
            // between crisp edges and mush when stepping down from 4000px.
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            // PNG preserves logo transparency, which JPEG would flatten to
            // black on the dark certificate cover.
            const out = canvas.toDataURL('image/png');
            if (!out) continue;
            // Remember the first (largest) rung as the floor, so a logo that
            // never fits the budget still comes back smaller than it started.
            if (!best || out.length < best.length) best = out;
            if (dataUrlBytes(out) <= LOGO_BUDGET_BYTES) break;
          }

          resolve(best && best.length < dataUrl.length ? best : dataUrl);
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

const matchesBundledScheme = (path: string): boolean => SCHEMES.some((s) => path === s.logoPath);

/**
 * 1×1 fully transparent PNG.
 *
 * Stands in for "no logo" wherever a PDF template renders an unconditional
 * `<img>`. An empty src makes Chrome draw its broken-image glyph onto the
 * certificate; this draws nothing. ~70 bytes, so it costs nothing in the
 * payload and is well under every size guard.
 */
export const TRANSPARENT_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

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

  // 4) Nothing usable.
  //
  // ELE-1581 — this used to return '' on the assumption that "the template
  // will skip render". It does not. As the header of this file says, the
  // templates render `<img src="{{registration_scheme_logo}}" />`
  // unconditionally, and Chrome draws its broken-image placeholder for an
  // empty src. That placeholder is the "watermark ... requiring an image"
  // users reported seeing on certificates when they had no scheme logo.
  //
  // A 1×1 transparent PNG renders as nothing at all, so the certificate comes
  // out clean without needing the PDFMonkey template changed. Returning a
  // real image also keeps the `<img>` valid rather than relying on renderer
  // behaviour for a malformed one.
  return storedLogo || TRANSPARENT_PIXEL;
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
