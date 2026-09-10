import { supabase } from '@/integrations/supabase/client';
import { schemeDisplayLabel } from '@/utils/registrationScheme';
import { TRANSPARENT_PIXEL } from '@/utils/resolveSchemeLogo';
import { mastheadFor, measureLogoTone, logoTonePreference, type LogoTone } from '@/utils/logoTone';
import { getSchemeInfo, schemeLogoPath } from '@/constants/schemeLogos';

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
  /**
   * The scheme lockup for the WHITE cover masthead (standard artwork) and for
   * the DARK interior masthead (reversed artwork). Two fields because one image
   * cannot be legible on both grounds — that pairing is ELE-1669.
   */
  schemeLogoLight: string;
  schemeLogoDark: string;
  /** ELE-1671 — which cover treatment the electrician chose. */
  coverStyle: CertCoverStyle;
  /** Whether their logo artwork is light or dark — drives the masthead. */
  logoTone: LogoTone;
  /**
   * The `--em-cover-*` values to spread into the PDF payload. For `house` these
   * are exactly the templates' own Liquid defaults, so sending them changes
   * nothing — that is what makes this safe to roll out to every certificate.
   */
  cover: CoverPalette;
}

/**
 * Which colour drives the cover. `cert_cover_color` is chosen FOR the cover;
 * `primary_color` is only the fallback for anyone who opted in before that
 * setting existed. A brand palette is not a cover palette.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const coverBrandOf = (cp: any): string =>
  hex(cp?.cert_cover_color) || hex(cp?.primary_color) || hex(cp?.accent_color);

/** Normalise a stored hex; returns '' when unusable so the caller's default wins. */
const hex = (v: unknown): string => {
  const s = String(v ?? '').trim();
  return /^#[0-9a-fA-F]{6}$/.test(s) ? s : '';
};

/**
 * The navy the certificate cover block and page masthead are painted in.
 * Sampled from live output — it is the same on every certificate type.
 */
const CERT_DARK_BG = '#0A1628';

/** WCAG relative luminance. */
const luminance = (h: string): number => {
  const ch = [1, 3, 5].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
};

/** WCAG contrast ratio between two hex colours. 1 = identical, 21 = max. */
const contrast = (a: string, b: string): number => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

/** Mix a hex colour towards white by `amount` (0–1). */
const lighten = (h: string, amount: number): string => {
  const mixed = [1, 3, 5].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16);
    return Math.round(c + (255 - c) * amount);
  });
  return `#${mixed.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
};

/** Mix a hex colour towards black by `amount` (0–1). */
const darken = (h: string, amount: number): string => {
  const mixed = [1, 3, 5].map((i) => Math.round(parseInt(h.slice(i, i + 2), 16) * (1 - amount)));
  return `#${mixed.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
};

/** Mix `a` towards `b` by `amount` (0–1). */
const mix = (a: string, b: string, amount: number): string => {
  const mixed = [1, 3, 5].map((i) => {
    const ca = parseInt(a.slice(i, i + 2), 16);
    const cb = parseInt(b.slice(i, i + 2), 16);
    return Math.round(ca + (cb - ca) * amount);
  });
  return `#${mixed.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
};

/**
 * Keep a user's brand colour, but never at the cost of a legible certificate.
 *
 * The accent is painted onto the cover — eyebrow text, the rule under the
 * title, the status banner, the left rail. Nothing ever checked it against that
 * background, so an electrician whose brand colour was close to the cover got a
 * certificate with invisible text. Not hypothetical: a live EV Charging
 * certificate rendered its "BS 7671:2018 + AMENDMENT 4:2026" eyebrow, its
 * status banner and its "7.4 kW · Mode 3" rating in #0A2C49 on #0A1628.
 *
 * Rather than overriding the colour outright, move it towards white (on a dark
 * cover) or towards black (on a light one) only as far as legibility requires,
 * so it still reads as their colour. If neither direction can carry it, fall
 * back to the certificate's own house accent.
 *
 * `bg` is a parameter rather than a constant because the cover is no longer
 * always navy — see `coverPalette` below.
 */
const readableAccent = (
  chosen: string,
  fallbackAccent: string,
  bg: string = CERT_DARK_BG
): string => {
  if (!chosen) return fallbackAccent;
  // 4.5:1 is the WCAG AA threshold for body text. The eyebrow and banner labels
  // are small and uppercase, so they need the full ratio, not the 3:1 large-text
  // allowance.
  if (contrast(chosen, bg) >= 4.5) return chosen;
  const towardsLight = luminance(bg) < 0.2;
  for (const amount of [0.2, 0.35, 0.5, 0.65, 0.8]) {
    const moved = towardsLight ? lighten(chosen, amount) : darken(chosen, amount);
    if (contrast(moved, bg) >= 4.5) return moved;
  }
  return contrast(fallbackAccent, bg) >= 4.5 ? fallbackAccent : readableFg(bg);
};

/** White or near-black — whichever is more legible on `bg`. */
const readableFg = (bg: string): string =>
  contrast('#FFFFFF', bg) >= contrast(CERT_DARK_BG, bg) ? '#FFFFFF' : CERT_DARK_BG;

/** How the cover block on page 1 (and the per-page masthead) is painted. */
export type CertCoverStyle = 'house' | 'brand' | 'print';

/**
 * The palette the PDF templates consume — ELE-1671.
 *
 * Every certificate template now reads its cover furniture from `--em-cover-*`
 * custom properties whose Liquid defaults are the original navy, so sending
 * NONE of these keys renders exactly as before. That is the safety property the
 * whole change rests on: `house` returns the defaults verbatim.
 *
 * 🔴 `schemeLogoVariant` is not cosmetic and must be honoured. The NICEIC
 * lockup is dark ink on transparent; the reversed asset is white ink. Put the
 * wrong one on the wrong cover and the wordmark disappears — that is ELE-1669,
 * which is precisely the bug this pairing exists to prevent. Whoever changes
 * the cover colour changes the logo with it.
 */
export interface CoverPalette {
  cover_from: string;
  cover_mid: string;
  cover_to: string;
  cover_fg: string;
  cover_muted: string;
  cover_dim: string;
  /**
   * The decorative accent — eyebrow, the rule under the title, the status
   * value, the left rail.
   *
   * 🔴 This is the certificate's HOUSE accent checked against the cover, NOT
   * the electrician's brand colour. Feeding the brand colour in here makes the
   * accent a paler shade of the cover it sits on: still legible, but flat, and
   * it throws away the only contrast the cover has. Gold already clears AA on a
   * deep brand colour; only a gold-ish cover moves it. Proven by rendering both
   * ways through PDFMonkey.
   */
  accent: string;
  accentDeep: string;
  /**
   * The masthead the logos sit in. Follows the LOGO, not the cover — see
   * `logoTone.ts`. `schemeLogoVariant` follows the masthead with it, because
   * that is where the scheme lockup is drawn.
   */
  mast_bg: string;
  mast_fg: string;
  /** Which scheme lockup the COVER masthead needs (follows `mast_bg`). */
  schemeLogoVariant: 'reversed' | 'standard';
  /**
   * Which scheme lockup the INTERIOR page masthead needs. Separate on purpose:
   * the interior masthead keeps the cover colour on every page, so it is dark
   * even when the cover masthead is white. Driving both from one value put a
   * black NICEIC lockup on a navy masthead — ELE-1669, one page further in.
   */
  interiorSchemeVariant: 'reversed' | 'standard';
}

/** The Elec-Mate house cover — byte-for-byte the templates' own defaults. */
const HOUSE: CoverPalette = {
  cover_from: '#0a1628',
  cover_mid: '#152238',
  cover_to: '#1c2e4a',
  cover_fg: '#ffffff',
  cover_muted: '#cbd5e1',
  cover_dim: '#94a3b8',
  accent: '#fbbf24',
  accentDeep: '#f59e0b',
  mast_bg: '#ffffff',
  mast_fg: '#0a1628',
  schemeLogoVariant: 'standard',
  interiorSchemeVariant: 'reversed',
};

export const coverPalette = (
  style: CertCoverStyle,
  brand: string,
  houseAccent = '#fbbf24',
  logoTone: LogoTone = 'dark'
): CoverPalette => {
  if (style === 'print') {
    // ELE-1671 — Billy Joe: "not printer friendly, wastes a lot of ink". Page 1
    // measured 39.3% ink coverage before, 2.3% after: a 94% saving on the cover
    // sheet alone. It also rescues dark company logos, which were invisible
    // against the navy.
    return {
      cover_from: '#ffffff',
      cover_mid: '#ffffff',
      cover_to: '#ffffff',
      cover_fg: CERT_DARK_BG,
      cover_muted: '#475569',
      cover_dim: '#64748b',
      accent: readableAccent(houseAccent, houseAccent, '#ffffff'),
      accentDeep: darken(readableAccent(houseAccent, houseAccent, '#ffffff'), 0.3),
      ...mastheadFor(logoTone, '#334155'),
      // Print: the interior masthead goes white too, so the standard lockup.
      interiorSchemeVariant: 'standard',
    };
  }

  if (style === 'brand' && brand) {
    // A three-stop gradient in the electrician's own colour, matching the shape
    // of the house one (base → slightly lifted → lifted more).
    const from = brand;
    const fg = readableFg(from);
    const towardsLight = fg === '#FFFFFF';
    return {
      cover_from: from,
      cover_mid: towardsLight ? lighten(from, 0.08) : darken(from, 0.06),
      cover_to: towardsLight ? lighten(from, 0.18) : darken(from, 0.14),
      cover_fg: fg,
      cover_muted: mix(fg, from, 0.25),
      cover_dim: mix(fg, from, 0.42),
      accent: readableAccent(houseAccent, houseAccent, from),
      accentDeep: darken(readableAccent(houseAccent, houseAccent, from), towardsLight ? 0.18 : 0.3),
      ...mastheadFor(logoTone, from),
      interiorSchemeVariant: fg === '#FFFFFF' ? 'reversed' : 'standard',
    };
  }

  return { ...HOUSE, ...mastheadFor(logoTone, HOUSE.cover_from) }; // house cover is always dark
};

/** Normalise the stored column; anything unrecognised (or NULL) means house. */
export const certCoverStyle = (v: unknown): CertCoverStyle =>
  v === 'brand' || v === 'print' ? v : 'house';

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
): CertBranding => {
  // ELE-1671 — the cover colour is its OWN setting, not the brand palette.
  // A brand is not a cover: a yellow-and-black brand makes a garish, hard to
  // read certificate, and driving the cover off `primary_color` forced that on
  // people. `cert_cover_color` wins; primary_color is only the fallback for
  // anyone who opted in before this existed.
  const brand = coverBrandOf(cp);
  const style = certCoverStyle(cp?.cert_cover_style);
  const pref = logoTonePreference((cp as { cert_logo_tone?: string })?.cert_logo_tone);
  // Sync path cannot measure; 'auto' assumes dark artwork (the common case).
  const tone: LogoTone = pref === 'auto' ? 'dark' : pref;
  // Resolved before the accent, because the accent has to be legible against
  // THIS cover — which is no longer always navy.
  const cover = coverPalette(style, brand, fallbackAccent, tone);

  return {
    companyName: cp?.company_name || '',
    companyAddress: [cp?.company_address, cp?.company_postcode].filter(Boolean).join(', '),
    companyPhone: cp?.company_phone || '',
    companyEmail: cp?.company_email || '',
    companyWebsite: cp?.company_website || '',
    // NOT cp.company_logo — that column does not exist.
    //
    // ELE-1668 — the hosted URL leads, the data URL is the fallback. This order
    // used to be reversed, and it was the whole reason logos printed blurry.
    //
    // A data URL has to survive two size guards on its way into a PDF payload:
    // `downscaleLogoDataUrl` crushes anything over 120KB, and the optimiser
    // strips any "preserved" logo over 150KB outright. The average stored
    // `logo_data_url` is ~400KB, so in practice every real logo was being
    // rewritten down to a 320px thumbnail and then printed at letterhead size.
    //
    // `logo_url` is a public object in the `company-branding` bucket. It costs
    // ~100 bytes in the payload instead of ~400KB, PDFMonkey's renderer fetches
    // it server-side at full resolution, and neither guard touches it. This is
    // already what `generate-pdf-monkey` does — the client formatters were the
    // odd ones out, which is why the SAME logo came out 320×320 on a user's EIC
    // and 4000×4000 on their EV certificate.
    companyLogo: cp?.logo_url || cp?.logo_data_url || '',
    // Settings → Business → Brand offers Primary / Secondary / Accent. Primary is
    // the one an electrician means by "my colour" (it leads the sheet and the
    // preview), and it is what the six smart-form hooks have always used — so it
    // wins here too. Accent is read as a fallback for anyone who only set that.
    // ELE-1672 — wrapped in the legibility guard. Note the order still prefers
    // `primary_color`: if that one is unusable on the cover we lift it rather
    // than silently swapping to `accent_color`, because "my colour came out a bit
    // lighter" is a far smaller surprise than "my certificate is a different
    // colour to the one I picked".
    companyAccentColor: readableAccent(brand, fallbackAccent, cover.cover_from),
    // ELE-1570 — a display LABEL, never the raw column. `registration_scheme`
    // has been written by more than one control with different casing, and this
    // value goes straight onto page 1 of a legal certificate: a NICEIC-registered
    // firm stored as `other` printed "Other" beside their NICEIC number.
    registrationScheme: schemeDisplayLabel(cp?.registration_scheme),
    registrationNumber: cp?.registration_number || '',
    // Never '' — 227 of 291 company profiles have no scheme logo stored, and the
    // PDF templates render `<img src="{{registration_scheme_logo}}">`
    // unconditionally. An empty src makes Chrome draw its broken-image glyph with
    // the alt text beside it, so those certificates went out with a torn-page
    // icon captioned "Registration Scheme" on page 1 — confirmed on live PAT
    // output before this fix.
    //
    // ELE-1581 solved exactly this for EICR/EIC/Minor Works inside
    // `resolveSchemeLogo`, but ~18 other formatters never call that resolver and
    // read this field straight. Defaulting here covers all of them at once: a 1×1
    // transparent PNG draws nothing and costs ~70 bytes.
    registrationSchemeLogo:
      cp?.scheme_logo_data_url || cp?.registration_scheme_logo || TRANSPARENT_PIXEL,
    // The sync mapper cannot fetch, so both resolve to the stored value.
    // `fetchCertBranding` replaces them with the correct per-ground variants.
    schemeLogoLight: cp?.scheme_logo_data_url || cp?.registration_scheme_logo || TRANSPARENT_PIXEL,
    schemeLogoDark: cp?.scheme_logo_data_url || cp?.registration_scheme_logo || TRANSPARENT_PIXEL,
    coverStyle: style,
    logoTone: tone,
    cover,
  };
};

/**
 * Swap a scheme lockup for the variant that will be visible on the background
 * it is about to be drawn on.
 *
 * Only ever swaps a BUNDLED asset. If the electrician uploaded their own scheme
 * logo we leave it exactly as they set it — silently replacing someone's own
 * artwork would be a worse bug than the one this fixes.
 */
const schemeLogoForBackground = async (
  stored: string,
  schemeName: string,
  variant: 'reversed' | 'standard'
): Promise<string> => {
  try {
    const info = schemeName ? getSchemeInfo(schemeName) : undefined;
    if (!info) return stored;
    const wanted = schemeLogoPath(info, variant === 'reversed' ? 'dark' : 'light');
    const { resolveSchemeLogo } = await import('@/utils/resolveSchemeLogo');
    return (await resolveSchemeLogo(wanted, schemeName)) || stored;
  } catch {
    return stored;
  }
};

/**
 * Fetch the signed-in user's branding. Never throws — branding is decorative,
 * so a failure must not stop a certificate being generated or emailed.
 */
export const fetchCertBranding = async (fallbackAccent: string): Promise<CertBranding> => {
  try {
    const { data } = await supabase.rpc('get_my_company_profile');
    const cp = Array.isArray(data) ? data[0] : data;
    const base = brandingFromCompanyProfile(cp, fallbackAccent);

    // ELE-1671 — the masthead has to follow the logo, so when the electrician
    // has not told us what their artwork is, measure it. Async, which is why it
    // lives here rather than in the sync mapper, and it cannot fail: an
    // unreadable logo resolves to 'dark' and the white masthead.
    const pref = logoTonePreference((cp as { cert_logo_tone?: string })?.cert_logo_tone);
    const tone = pref === 'auto' ? await measureLogoTone(base.companyLogo) : pref;
    const cover = coverPalette(base.coverStyle, coverBrandOf(cp), fallbackAccent, tone);

    // 🔴 `registrationSchemeLogo` is left EXACTLY as stored. It is the fallback
    // for BOTH mastheads on any template that does not yet send the new keys,
    // and the stored value is now the standard hosted lockup — right for the
    // white cover masthead, which is the client-facing page. Overriding it with
    // the interior variant fixed page 2 and broke every cover.
    //
    // Instead each masthead gets its OWN key, because one image cannot serve a
    // white ground and a dark one.
    const [schemeLogoLight, schemeLogoDark] = await Promise.all([
      schemeLogoForBackground(base.registrationSchemeLogo, base.registrationScheme, 'standard'),
      schemeLogoForBackground(base.registrationSchemeLogo, base.registrationScheme, 'reversed'),
    ]);

    return {
      ...base,
      logoTone: tone,
      cover,
      schemeLogoLight,
      schemeLogoDark,
    };
  } catch {
    return brandingFromCompanyProfile(null, fallbackAccent);
  }
};
