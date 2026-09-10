/**
 * Is a company logo light artwork or dark artwork? — ELE-1671
 *
 * This decides the certificate masthead's background, and getting it wrong
 * makes the electrician's logo invisible on their own certificate. Both
 * failures have been shipped in turn: a dark logo vanished against the navy
 * cover, and once the masthead was made white, a white logo vanished against
 * that. There is no safe fixed choice — the ground has to follow the artwork.
 *
 * The measurement is mean luminance over the OPAQUE pixels only. Logos are
 * overwhelmingly artwork on transparency, so averaging the whole bitmap would
 * be dominated by the empty background and report every logo as "light".
 */

/** What the artwork is, which is the opposite of what it needs behind it. */
export type LogoTone = 'light' | 'dark';

/** Stored preference: `auto` measures, the others are the user's override. */
export type LogoTonePreference = 'auto' | LogoTone;

export const logoTonePreference = (v: unknown): LogoTonePreference =>
  v === 'light' || v === 'dark' ? v : 'auto';

/**
 * Anything below this counts as dark artwork. Sits well above mid-grey on
 * purpose: a logo has to be genuinely pale before we put it on a dark ground,
 * because a mid-tone logo survives white far better than it survives navy.
 */
const LIGHT_THRESHOLD = 150;

/** Ignore near-transparent pixels — antialiased edges are not the artwork. */
const ALPHA_FLOOR = 40;

/**
 * Measure a logo's artwork tone. Never throws and never blocks a certificate:
 * anything unreadable resolves to `'dark'`, which yields the white masthead —
 * the safer default, since dark artwork is far and away the common case.
 */
export const measureLogoTone = async (src: string): Promise<LogoTone> => {
  if (!src || typeof document === 'undefined') return 'dark';
  try {
    const img = new Image();
    // Needed for a hosted logo, or the canvas taints and getImageData throws.
    // Harmless on a data: URL.
    img.crossOrigin = 'anonymous';

    const loaded = await new Promise<boolean>((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
    if (!loaded || !img.width || !img.height) return 'dark';

    // Downscale before sampling — a 4000×4000 logo does not need 16M reads to
    // answer "is this light or dark".
    const scale = Math.min(1, 64 / Math.max(img.width, img.height));
    const w = Math.max(1, Math.round(img.width * scale));
    const h = Math.max(1, Math.round(img.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return 'dark';
    ctx.drawImage(img, 0, 0, w, h);

    const { data } = ctx.getImageData(0, 0, w, h);
    let sum = 0;
    let n = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < ALPHA_FLOOR) continue;
      sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      n += 1;
    }
    if (!n) return 'dark';
    return sum / n >= LIGHT_THRESHOLD ? 'light' : 'dark';
  } catch {
    // Tainted canvas, blocked image, no 2d context — all mean "we don't know",
    // and "we don't know" must not cost the user their logo.
    return 'dark';
  }
};

/**
 * The masthead ground and ink for a given artwork tone.
 *
 * 🔴 `schemeLogoVariant` here is for the COVER masthead only. The INTERIOR page
 * masthead is a different background — it stays the cover colour on every page
 * — so it needs its own variant. Driving both from this one value put the
 * standard dark NICEIC lockup on a navy interior masthead, i.e. ELE-1669 again
 * one page further in. See `interiorSchemeVariant` in certBranding.ts.
 */
export const mastheadFor = (
  tone: LogoTone,
  coverFrom: string
): { mast_bg: string; mast_fg: string; schemeLogoVariant: 'reversed' | 'standard' } =>
  tone === 'light'
    ? // Light artwork needs a dark ground, so the masthead borrows the cover
      // colour and the scheme lockup switches to its reversed variant with it.
      { mast_bg: coverFrom, mast_fg: '#ffffff', schemeLogoVariant: 'reversed' }
    : { mast_bg: '#ffffff', mast_fg: '#0a1628', schemeLogoVariant: 'standard' };
