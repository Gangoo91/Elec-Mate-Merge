/**
 * The cover palette, in the shape the PDF templates read — ELE-1671.
 *
 * Every certificate template declares its cover furniture as `--em-*` custom
 * properties whose Liquid defaults are the original navy:
 *
 *     --em-cover-from: {{ em_cover_from | default: '#0a1628' }};
 *
 * so a payload carrying NONE of these keys renders exactly as it always did.
 * That is the property the whole rollout rests on — it was verified by
 * substituting every token back to its own default and diffing the CSS across
 * all 26 templates, and again by generating the same document through
 * PDFMonkey before and after the change (zero differing pixels).
 *
 * 🔴 Keys are namespaced `em_` deliberately. A bare `accent` would collide:
 * several templates already define their own
 * `--accent: {{ companyAccentColor | default: '#dc2626' }}` carrying a
 * per-certificate house colour, and an unnamespaced token silently overrode it.
 *
 * 🔴 `scheme_logo_variant` is not decorative. The NICEIC lockup is dark ink on
 * transparent and the reversed asset is white ink; putting the wrong one on the
 * wrong cover makes the wordmark vanish, which is ELE-1669 all over again. Any
 * caller that changes the cover must change the logo with it.
 */
import type { CertBranding } from '@/utils/certBranding';

export interface CoverPayloadKeys {
  em_cover_from: string;
  em_cover_mid: string;
  em_cover_to: string;
  em_cover_fg: string;
  em_cover_muted: string;
  em_cover_dim: string;
  em_accent: string;
  em_accent_deep: string;
  /**
   * The masthead the logos sit in. Follows the LOGO's own artwork, not the
   * cover — a white masthead rescues a dark logo and destroys a pale one, and
   * a dark masthead does the reverse. See `logoTone.ts`.
   */
  em_mast_bg: string;
  em_mast_fg: string;
  /**
   * 🔴 These are named for the GROUND they sit on, not for the artwork.
   *
   *   em_scheme_logo_light — the lockup drawn on the COVER masthead
   *   em_scheme_logo_dark  — the reversed lockup, for a dark ground
   *
   * The cover masthead is the only consumer today (`.cv-scheme`), and it reads
   * `em_scheme_logo_light` unconditionally. That name was chosen when the cover
   * masthead was assumed to always be white — but `mastheadFor()` flips it to
   * the cover colour whenever the company's own logo is LIGHT artwork, because
   * a pale logo needs a dark ground. On those covers the standard dark-ink
   * lockup was invisible: ELE-1669 again, on the one page the client sees.
   *
   * So `em_scheme_logo_light` carries whichever variant `cover.schemeLogoVariant`
   * asks for. Resolve it there, once, rather than asking twenty Liquid templates
   * to branch on it.
   */
  em_scheme_logo_light: string;
  em_scheme_logo_dark: string;
}

/**
 * Spread this into any certificate payload.
 *
 * Safe to send unconditionally: on the default `house` style these values are
 * identical to the templates' own defaults, so the output does not change.
 */
/**
 * Accepts a PARTIAL branding on purpose. Several formatters take
 * `Partial<CertBranding>` because a certificate must still generate for someone
 * who has saved no company profile at all. When the palette is absent we emit
 * NOTHING rather than empty strings, so every value falls through to the
 * template's own default — which is the original navy. A certificate missing
 * its branding is a certificate that looks like it always did, not a broken one.
 */
export const coverPayloadKeys = (
  branding: Partial<Pick<CertBranding, 'cover' | 'schemeLogoLight' | 'schemeLogoDark'>>
): Partial<CoverPayloadKeys> => {
  const c = branding.cover;
  if (!c) return {};
  return {
    em_cover_from: c.cover_from,
    em_cover_mid: c.cover_mid,
    em_cover_to: c.cover_to,
    em_cover_fg: c.cover_fg,
    em_cover_muted: c.cover_muted,
    em_cover_dim: c.cover_dim,
    em_accent: c.accent,
    em_accent_deep: c.accentDeep,
    em_mast_bg: c.mast_bg,
    em_mast_fg: c.mast_fg,
    // The cover masthead's ground decides the lockup — see the interface note.
    em_scheme_logo_light:
      (c.schemeLogoVariant === 'reversed' ? branding.schemeLogoDark : branding.schemeLogoLight) ??
      '',
    em_scheme_logo_dark: branding.schemeLogoDark ?? '',
  };
};

/**
 * The same keys under the camelCase names the client formatters use before the
 * edge function transforms them. Several formatters merge branding into
 * `formData` and hand that to an edge function which rebuilds a typed payload,
 * so the values have to survive that hop under a name the transform knows.
 */
export const coverFormDataKeys = (
  branding: Partial<Pick<CertBranding, 'cover' | 'schemeLogoLight' | 'schemeLogoDark'>>
): Partial<CoverPayloadKeys> & { schemeLogoVariant?: 'reversed' | 'standard' } => ({
  ...coverPayloadKeys(branding),
  ...(branding.cover ? { schemeLogoVariant: branding.cover.schemeLogoVariant } : {}),
});

/**
 * Read the cover palette back off a form-data object.
 *
 * Several certificate formatters take only `formData` — their branding is
 * merged in upstream by a smart-form hook — so they cannot call
 * `coverPayloadKeys(branding)` directly. This is the other half of that hop:
 * the hook writes the keys in, the formatter reads them out.
 *
 * Blank values are omitted rather than forwarded, so a payload from a user with
 * no company profile carries no palette at all and every template falls through
 * to its own defaults (the original navy). Mirrors
 * `supabase/functions/_shared/cert-cover-payload.ts` — if you change the key
 * list, change it in both.
 */
export const coverKeysFromFormData = (
  formData: Record<string, unknown> | null | undefined
): Partial<CoverPayloadKeys> => {
  const out: Partial<CoverPayloadKeys> = {};
  const keys: (keyof CoverPayloadKeys)[] = [
    'em_cover_from',
    'em_cover_mid',
    'em_cover_to',
    'em_cover_fg',
    'em_cover_muted',
    'em_cover_dim',
    'em_accent',
    'em_accent_deep',
    'em_mast_bg',
    'em_mast_fg',
    'em_scheme_logo_light',
    'em_scheme_logo_dark',
  ];
  for (const k of keys) {
    const v = formData?.[k];
    if (typeof v === 'string' && v.trim() !== '') out[k] = v.trim();
  }
  return out;
};
