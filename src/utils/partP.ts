/**
 * Does Part P of the Building Regulations apply to this premises?
 *
 * ELE-1662. Part P — "Electrical safety — Dwellings" — applies to electrical
 * work in dwellings and nowhere else. The forms were offering Part P
 * compliance and building-control notification on every certificate
 * regardless, so a commercial EV install or an industrial EIC could carry
 * "Building Regulations Part P ✓" and "submitted via competent person scheme"
 * on the printed document. Both are simply false for those premises.
 *
 * ── THE RULE IS DELIBERATELY ONE-SIDED ────────────────────────────────────
 *
 * Part P is HIDDEN only when the premises is KNOWN not to be a dwelling.
 * Blank, unknown or free-text values leave it available. Two reasons:
 *
 *   1. 533 of 1,262 live EICRs carry no property type at all, and the field
 *      also holds hand-typed values ("Caravan", "B an b", "Landlords Supply
 *      - Communal Areas"). A rule that required a positive dwelling match
 *      would strip Part P off 42% of the EICRs in the database, most of which
 *      are houses.
 *   2. The failure modes are not symmetric. Part P offered on a non-dwelling
 *      is a box the electrician can leave unticked. Part P withheld from a
 *      dwelling is a notification the electrician cannot record, on a
 *      certificate that will be read by building control.
 *
 * So: certain it is not a dwelling → hide. Anything else → show.
 *
 * ⚠️ Minor Works has no premises-type field, so it cannot be gated and is not.
 * Do not "fix" that by gating on something else — see the ticket.
 */
const NON_DWELLING = new Set(['commercial', 'industrial', 'public']);

/** True only when the premises type is one of the values we KNOW is not a dwelling. */
export function isKnownNonDwelling(premisesType: unknown): boolean {
  return typeof premisesType === 'string' && NON_DWELLING.has(premisesType.trim().toLowerCase());
}

/** The sentence shown where the Part P controls would have been. */
export const PART_P_NOT_APPLICABLE =
  'Part P of the Building Regulations applies to dwellings only, so it does not apply to this installation and will not print on the certificate.';
