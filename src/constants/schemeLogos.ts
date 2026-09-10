export interface SchemeInfo {
  value: string;
  label: string;
  /** The asset for a DARK cover — the default everywhere today. */
  logoPath: string;
  /**
   * The asset for a LIGHT cover (ELE-1671 print mode). Only set where the two
   * genuinely differ: NICEIC ships a reversed white lockup for dark grounds and
   * the standard dark one for light. Most schemes carry their own opaque white
   * box and so look correct on either, and omit this.
   */
  logoPathOnLight?: string;
  brandColor: string;
}

/**
 * Pick the scheme asset that will actually be visible on a given cover.
 *
 * 🔴 Call this whenever the cover colour is not the house navy. Getting it
 * wrong is ELE-1669 in the other direction: the reversed white NICEIC lockup
 * on a white print cover is exactly as invisible as the black one was on navy.
 */
export const schemeLogoPath = (info: SchemeInfo, cover: 'dark' | 'light'): string =>
  cover === 'light' ? (info.logoPathOnLight ?? info.logoPath) : info.logoPath;

/**
 * ⚠️ Scheme logos are only ever drawn on a DARK background.
 *
 * Every certificate puts them in the navy cover block (page 1) and the navy
 * masthead (every page after), and the app's own UI is dark too — verified
 * across EICR, EIC, Minor Works, EV and PAT output. So a logo whose artwork is
 * dark-on-transparent is invisible everywhere we render it.
 *
 * NAPIT is safe because its PNG has no alpha — it carries its own opaque white
 * box. The ones to watch are the transparent-background assets:
 *
 *   • NICEIC — black wordmark. Fixed below.
 *   • BESCA  — #260859 dark purple. Same bug, but 0 users have selected it;
 *              needs a white/reversed asset before anyone does.
 *   • STROMA — #0E6F6C dark teal. Legible but low contrast on navy. 1 user.
 *
 * If you add a scheme, check its artwork against #0A1628 before shipping it.
 */
export const SCHEMES: SchemeInfo[] = [
  {
    value: 'NICEIC',
    label: 'NICEIC',
    // ELE-1669 — the reversed asset, not `niceic.png`. That PNG's wordmark and
    // "APPROVED CONTRACTOR" strapline are near-black (#0E0E02) on a transparent
    // background, so against the navy cover only the red tick survived and
    // users reported the logo as missing.
    //
    // `niceic-reversed.png` is the same official lockup with the dark ink
    // flipped to white and the red tick untouched — i.e. the reversed treatment
    // for dark backgrounds, not a redrawn logo.
    //
    // ⚠️ NOT `niceic.svg`, which is also white and also in this folder. That one
    // is the bare wordmark: no tick, no "APPROVED CONTRACTOR". The strapline is
    // the actual certification claim, so it must not be silently dropped.
    //
    // TODO ELE-1669 — still only 200×116, so it is soft at print size. Replace
    // with the official reversed EPS/SVG from the NICEIC brand portal.
    logoPath: '/logos/schemes/niceic-reversed.png',
    // The original artwork — correct on a white print cover, invisible on navy.
    logoPathOnLight: '/logos/schemes/niceic.png',
    brandColor: '#E31837',
  },
  { value: 'NAPIT', label: 'NAPIT', logoPath: '/logos/schemes/napit.png', brandColor: '#005EB8' },
  {
    value: 'ELECSA',
    label: 'ELECSA',
    logoPath: '/logos/schemes/elecsa.png',
    brandColor: '#F36F21',
  },
  {
    value: 'STROMA',
    label: 'STROMA',
    logoPath: '/logos/schemes/stroma.png',
    brandColor: '#00A859',
  },
  { value: 'OFTEC', label: 'OFTEC', logoPath: '/logos/schemes/oftec.png', brandColor: '#003B71' },
  { value: 'BESCA', label: 'BESCA', logoPath: '/logos/schemes/besca.svg', brandColor: '#1B3D6F' },
  { value: 'BRE', label: 'BRE', logoPath: '/logos/schemes/bre.svg', brandColor: '#00529B' },
];

export const getSchemeInfo = (value: string): SchemeInfo | undefined =>
  SCHEMES.find((s) => s.value === value.toUpperCase());
