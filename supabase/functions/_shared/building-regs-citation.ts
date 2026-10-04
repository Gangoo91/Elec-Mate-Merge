/**
 * Building Regulations sources in the bs7671_facets corpus (added 30 Sep 2026).
 *
 * Two document types:
 *   approved_doc — Approved Documents P, B, F, L, M, S, R, 7 (England) and
 *                  Approved Document P (Wales). Numbered in PARAGRAPHS (2.5)
 *                  plus the Part's own requirement boxes (P1, B1…).
 *   legislation  — The Building Regulations 2010 and the Electrical Safety
 *                  Standards in the Private Rented Sector (England) Regs 2020.
 *                  Keys: reg12 (England), reg12-W (Wales), Sch1-P, Sch3, Sch4.
 *
 * 🔴 Why this module exists: both prompt formatters render anything they do
 * not recognise as `Reg ${number}`. Approved Document P paragraph 2.5 would
 * then reach the model as "Reg 2.5" — a BS 7671 regulation that does not
 * exist — and be repeated to the user as one. Every citation of these sources
 * must name the document, which is the edition code.
 */

export const BUILDING_REGS_DOC_TYPES = new Set<string>(['approved_doc', 'legislation']);

export const isBuildingRegsDocType = (docType: string | undefined | null): boolean =>
  !!docType && BUILDING_REGS_DOC_TYPES.has(docType);

/** "reg12" → "reg 12", "reg12-W" → "reg 12 (Wales)", "Sch1-P" → "Schedule 1 Part P". */
export function legislationProvision(key: string): string {
  // Strip the Wales marker first — "Sch3-W" is Schedule 3 (Wales), not Part W.
  const wales = key.endsWith('-W');
  const base = wales ? key.slice(0, -2) : key;
  const where = wales ? ' (Wales)' : '';
  const reg = base.match(/^reg(\d+[A-Z]{0,3}\d{0,2})$/);
  if (reg) return `reg ${reg[1]}${where}`;
  const sch = base.match(/^Sch(\d{1,2}[A-Z]?)(?:-([A-Z]{1,2}))?$/);
  if (sch)
    return sch[2] ? `Schedule ${sch[1]} Part ${sch[2]}${where}` : `Schedule ${sch[1]}${where}`;
  return key;
}

/**
 * Full citation for one retrieved unit, e.g.
 *   "Approved Document P (England) 2013 para 2.5"
 *   "Approved Document B Vol 1 (England) 2019 incl. 2025 amendments, requirement B1"
 *   "Building Regulations 2010 (revised to 30 Sep 2026) reg 12"
 */
export function buildingRegsCitation(
  docType: string | undefined | null,
  editionCode: string | undefined | null,
  num: string | undefined | null
): string {
  const book = editionCode || (docType === 'legislation' ? 'Legislation' : 'Approved Document');
  if (!num) return book;
  if (docType === 'legislation') return `${book} ${legislationProvision(num)}`;
  // "AppA" is a whole unnumbered appendix; "P1"/"B5"/"M4"/"RA1" are the Part's
  // requirement boxes; longer letter-numbers ("B24") are appendix paragraphs.
  const app = num.match(/^App([A-Z])$/);
  if (app) return `${book}, Appendix ${app[1]}`;
  if (/^[A-Z]{1,2}\d$/.test(num)) return `${book}, requirement ${num}`;
  return `${book} para ${num}`;
}

/*
 * Jurisdiction. Asked "is a like-for-like board change notifiable in England?",
 * Elec-AI answered NO — it had been handed Approved Document P (WALES) para
 * 0.7, the older text whose non-notifiable list covers replacement work, and
 * applied it to England. England is the default (nearly every user); Wales
 * material is used only when the question is about Wales, and then the
 * England-only documents step aside.
 */
export type BuildingRegsJurisdiction = 'england' | 'wales';

export function buildingRegsJurisdiction(query: string | undefined | null): BuildingRegsJurisdiction {
  return /\b(wales|welsh|cymru)\b/i.test(query ?? '') ? 'wales' : 'england';
}

const PRS_ENGLAND = /Private Rented Sector \(England\)/;

/** True when this Building Regs unit should NOT be shown for the jurisdiction. */
export function isOutOfJurisdiction(
  j: BuildingRegsJurisdiction,
  docType: string | undefined | null,
  editionCode: string | undefined | null,
  regNumber: string | undefined | null
): boolean {
  if (!isBuildingRegsDocType(docType)) return false;
  const code = editionCode ?? '';
  const walesUnit = code.includes('(Wales)') || (docType === 'legislation' && !!regNumber?.endsWith('-W'));
  if (j === 'england') return walesUnit;
  // Wales: England-only Approved Documents and the England-only PRS Regs step aside.
  return docType === 'approved_doc' ? code.includes('(England)') : PRS_ENGLAND.test(code);
}
