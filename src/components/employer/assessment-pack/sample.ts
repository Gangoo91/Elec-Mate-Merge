import type { PackCertificate } from './types';
import { SAMPLE_TYPES, type Scheme } from './schemes';

/**
 * A suggested sample to have ready (ELE-2069). The assessor picks the
 * actual sample; schemes say it must reflect the range and scale of your
 * work from about the last 12 months (EAS 15.1, NICEIC Surveillance Guide).
 * So we shortlist: at least the scheme's minimum sites, an EIC first
 * (NICEIC DIS needs an EIC on every site offered), then one from each
 * certificate type and each person, newest first, notifiable jobs ahead.
 */
export function suggestSample(certs: PackCertificate[], scheme: Scheme, periodEnd: string) {
  const from = new Date(`${periodEnd}T00:00:00`);
  from.setFullYear(from.getFullYear() - 1);
  const cutoff = from.toISOString().slice(0, 10);
  const pool = certs
    .filter((c) => SAMPLE_TYPES.includes(c.report_type) && c.issued_on >= cutoff)
    .sort(
      (a, b) =>
        Number(b.part_p_verdict === 'yes') - Number(a.part_p_verdict === 'yes') ||
        b.issued_on.localeCompare(a.issued_on)
    );
  const picked: PackCertificate[] = [];
  const take = (c?: PackCertificate) => {
    if (c && !picked.includes(c)) picked.push(c);
  };
  take(pool.find((c) => c.report_type === 'eic'));
  for (const t of SAMPLE_TYPES) take(pool.find((c) => c.report_type === t));
  const people = [...new Set(pool.map((c) => c.user_id))];
  for (const u of people) {
    if (!picked.some((c) => c.user_id === u)) take(pool.find((c) => c.user_id === u));
  }
  const target = Math.min(pool.length, Math.max(scheme.minSites + 2, picked.length), 12);
  for (const c of pool) {
    if (picked.length >= target) break;
    take(c);
  }
  return {
    sample: picked.slice(0, Math.max(target, Math.min(picked.length, 12))),
    poolSize: pool.length,
    cutoff,
  };
}
