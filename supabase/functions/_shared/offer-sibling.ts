/**
 * The same offer for the other plan.
 *
 * Offer codes are plan-specific (promo_offers.plan_id) and come in pairs —
 * FIRSTGO25 / FIRSTGO25APP, COVENTRY25 / COVENTRYELEC25, GILBERTESL30 /
 * GILBERTESLELEC40. Someone who arrives on the electrician link and then picks
 * Apprentice used to lose the discount silently (create-checkout rejects a
 * plan mismatch). These are the partner codes to try, most likely first; the
 * caller keeps the first one that exists, is active and is for the other plan.
 *
 * Naming patterns observed in promo_offers (2 Oct 2026):
 *   X        ↔ XAPP          (FIRSTGO25, TEAM25, WINBACK50)
 *   X<n>     ↔ XELEC<n>      (COVENTRY25, CLASSROOM50, BSASCADDAN50)
 *   X30      ↔ XELEC40 / X40 (employer + win-back + personal outreach pairs)
 */
export function offerSiblingCandidates(rawCode: string): string[] {
  const code = rawCode.trim().toUpperCase();
  const out: string[] = [];
  const add = (c: string) => {
    if (c && c !== code && !out.includes(c)) out.push(c);
  };

  if (code.endsWith('APP')) add(code.slice(0, -3));
  else add(`${code}APP`);

  const m = code.match(/^(.*?)(ELEC)?(\d+)$/);
  if (m) {
    const [, stem, elec, n] = m;
    if (elec) {
      add(`${stem}${n}`);
      if (n === '40') add(`${stem}30`);
    } else {
      add(`${stem}ELEC${n}`);
      if (n === '30') {
        add(`${stem}ELEC40`);
        add(`${stem}40`);
      }
      if (n === '40') add(`${stem}30`);
    }
  }
  return out;
}
