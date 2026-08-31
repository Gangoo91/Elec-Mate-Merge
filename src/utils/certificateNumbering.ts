import { supabase } from '@/integrations/supabase/client';

/**
 * Certificate numbering — {PREFIX}-{YEAR}-{NNNN}, e.g. EICR-2026-0001.
 *
 * ELE-1542 — numbers are allocated PER ACCOUNT.
 *
 * They used to come from `generate_certificate_number`, which drew from a
 * Postgres sequence shared by every account on the platform. 202 firms drew
 * this year's EICR numbers from one counter, so an electrician's own numbers
 * jumped — 0847, then 0912 — because the gap was other people's certificates.
 *
 * Two further faults fell out of the same design, both verified against
 * production on 2026-08-21:
 *
 *  - That RPC only knew eicr / eic / minor-works. Everything else fell through
 *    to a random-hex fallback, so **every** specialist certificate — smoke/CO,
 *    fire alarm, EV charging, emergency lighting, PAT, testing-only — carried
 *    something like `EV-CHARGING-2026-09C6C2` rather than a number. It could
 *    not have been extended either: it interpolated the report type into a
 *    sequence name, and `certificate_seq_ev-charging_2026` is a syntax error at
 *    the hyphen (ELE-1443).
 *  - Even on the three supported types the fallback was firing in the field —
 *    about 5% of this year's EICR/EIC/MW numbers are random hex.
 *
 * `next_certificate_number` replaces it: one counter row per (account, prefix,
 * year), taking a prefix rather than a report type, so every certificate type
 * is numbered by the same path. An existing account's counter is seeded from
 * the highest number it has already issued, so numbers continue rather than
 * restarting at 0001 below a number already on an issued certificate.
 */

/**
 * Report type → certificate prefix.
 *
 * This is the ONE source of truth, deliberately kept in TypeScript rather than
 * mirrored into the database — it carries scheme-specific cases (FA/G1..G7,
 * SMOKE-CO, G98/G99) that the database has no business knowing, and two copies
 * are how the printed prefix and the stored prefix drift apart.
 *
 * Verified against `certificate_number` on real rows 2026-08-05. Types whose
 * prefix is simply the uppercased report type (EV-CHARGING, EMERGENCY-LIGHTING,
 * SOLAR-PV, BESS, PAT-TESTING, TESTING-ONLY) are absent on purpose, not
 * forgotten — the fallback below already produces the right thing.
 */
const PREFIX_MAP: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'MW',
  'fire-alarm': 'FA/G2',
  'fire-alarm-design': 'FA/G1',
  'fire-alarm-commissioning': 'FA/G3',
  'fire-alarm-inspection': 'FA/G6',
  'fire-alarm-modification': 'FA/G7',
  'g98-commissioning': 'G98',
  'g99-commissioning': 'G99',
  'smoke-co-alarm': 'SMOKE-CO',
  // Not "VC" — VCR is what the trade calls a visual condition report.
  'visual-condition': 'VCR',
  // Not "RI" — RIR reads as a report reference and cannot be confused with an
  // instrument reading on a job sheet.
  'routine-inspection': 'RIR',
  // "PPS", not "SURVEY" — it goes to a house-buyer alongside a mortgage
  // valuation and a building survey, and must not read like an EICR reference.
  'pre-purchase-survey': 'PPS',
  // "PIS", not the fallback "PLUG-IN-SOLAR", which is unwieldy on a cover and
  // in an email subject. Short enough to read as a reference, distinct from the
  // "PV"/"SOLAR-PV" used by designed installations under Section 712 — the two
  // must never be confused, because they carry completely different liability.
  'plug-in-solar': 'PIS',
};

export const certificatePrefixFor = (reportType: string): string =>
  PREFIX_MAP[reportType] || reportType.toUpperCase();

export const generateCertificateNumber = async (reportType: string): Promise<string> => {
  const prefix = certificatePrefixFor(reportType);

  try {
    // `as never` — the generated types.ts predates this function. Matches how
    // every other post-generation RPC in the codebase is called; regenerating
    // types.ts wholesale would drag in unrelated schema drift (see the
    // migration-ledger divergence).
    const { data, error } = await supabase.rpc('next_certificate_number' as never, {
      p_prefix: prefix,
    } as never);

    if (error) {
      console.error('Error generating certificate number from database:', error);
      return generateFallbackCertificateNumber(prefix);
    }

    return data as string;
  } catch (error) {
    console.error('Exception generating certificate number:', error);
    return generateFallbackCertificateNumber(prefix);
  }
};

/**
 * Last resort when the RPC is unreachable — offline, or a failed round-trip.
 *
 * Random rather than sequential on purpose: a client that cannot reach the
 * counter cannot know what the next number is, and guessing would hand two
 * certificates the same one. A number that is obviously not a sequence is
 * better than a plausible duplicate on a legal document.
 *
 * ⚠️ Roughly 5% of this year's EICR/EIC/MW numbers came out of here, so it is
 * not theoretical. If that rate does not drop after ELE-1542, the cause is the
 * round-trip, not the numbering.
 */
const generateFallbackCertificateNumber = (prefix: string): string => {
  const year = new Date().getFullYear();
  const uniqueId = crypto.randomUUID().replace(/-/g, '').substring(0, 6).toUpperCase();
  return `${prefix}-${year}-${uniqueId}`;
};
