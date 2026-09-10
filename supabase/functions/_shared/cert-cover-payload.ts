/**
 * Carry the ELE-1671 cover palette through an edge function's payload
 * transform.
 *
 * The certificate edge functions are pass-through transformers: the client
 * merges company branding into `formData`, posts it here, and
 * `transformFormDataForTemplate` rebuilds a TYPED payload object for PDFMonkey.
 * Because that object is closed, any key the transform does not name is
 * silently dropped — which is why the palette needs an explicit hop rather than
 * riding along for free.
 *
 * Usage — one line inside the returned payload object:
 *
 *     return {
 *       ...coverKeys(formData),
 *       certificate_number: ...,
 *     };
 *
 * Safe to spread unconditionally. When the electrician has not opted into a
 * branded or print cover the client sends the house navy, which is identical to
 * each template's own Liquid defaults, so the rendered output is unchanged.
 * Verified across all 26 templates by byte-diffing the CSS at defaults, and by
 * rendering the same document through PDFMonkey before and after (zero
 * differing pixels).
 */

const KEYS = [
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
] as const;

export type CoverKeys = Partial<Record<(typeof KEYS)[number], string>>;

/**
 * Pull the palette off the incoming form data.
 *
 * Omits blank values rather than forwarding ''. Liquid's `default:` filter is
 * documented to substitute for nil, false AND empty string, so '' would very
 * likely fall through to the template default anyway — but omitting makes that
 * independent of the filter's exact semantics, and a wrong colour here paints
 * the whole cover block. Absent keys are unambiguously the template default,
 * which is what every user who has not opted in should get.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function coverKeys(formData: any): CoverKeys {
  const out: CoverKeys = {};
  for (const k of KEYS) {
    const v = formData?.[k];
    if (typeof v === 'string' && v.trim() !== '') out[k] = v.trim();
  }
  return out;
}
