import { supabase } from '@/integrations/supabase/client';
import type { VisualConditionFormData } from '@/types/visual-condition';

/**
 * Prefill a Visual Condition Report from the last certificate at the address.
 *
 * ── WHY NOT `useCertPrefill` ──────────────────────────────────────────────
 * `reportCloud.getLastCertificateAtAddress` filters `.eq('report_type', …)`, so
 * it only ever finds a previous report OF THE SAME TYPE. For a visual condition
 * report that means it fires on a repeat visit to the same property — a
 * landlord's annual check — and finds nothing at all on the first one, which is
 * the common case.
 *
 * The particulars worth carrying over (earthing arrangement, main switch
 * rating, where the board is) are properties of the PREMISES, not of the visit.
 * They are already recorded on the EICR or EIC done there, so that is what this
 * reads.
 *
 * 🔴 IT COPIES NOTHING THAT WAS MEASURED. No Ze, no Ipf, no Zs, no insulation
 * readings — not because they are unavailable, but because a visual report must
 * not contain them. Copying a Ze from an EICR taken two years ago onto a
 * document that states no testing was carried out would be the single worst
 * thing this feature could do. The allow-list below is the enforcement.
 */

/** Fields safe to carry onto a visual-only report. Nothing measured. */
export interface VisualPrefill {
  sourceType: string;
  sourceNumber: string;
  sourceDate: string;
  fields: Partial<VisualConditionFormData>;
}

const str = (v: unknown): string => {
  if (v === null || v === undefined) return '';
  const t = typeof v;
  if (t === 'string') return (v as string).trim();
  if (t === 'number' || t === 'boolean') return String(v);
  return '';
};

const TYPE_LABEL: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
  'visual-condition': 'Visual Condition Report',
};

/**
 * Normalises the several ways a supply is recorded across cert types.
 * `phases` alone is stored eight different ways in live data — "1", "single",
 * "Single", "three", "3", "1-phase-2-wire", "2" and "". Anything not clearly
 * three-phase is treated as single, which is also the safer default here: the
 * scope guard warns on three-phase, and a wrong warning is better than a
 * missing one.
 */
function readSupplyType(d: Record<string, unknown>): '' | 'single-phase' | 'three-phase' {
  const raw = str(d.phases) || str(d.supplyPhases) || str((d.supply_characteristics as Record<string, unknown>)?.phases);
  const p = raw.toLowerCase();
  if (!p) return '';
  return p === 'three' || p === '3' || p.startsWith('3-phase') || p.startsWith('three')
    ? 'three-phase'
    : 'single-phase';
}

/** First distribution board on the cert, whichever shape it was stored in. */
function readBoard(d: Record<string, unknown>): Record<string, unknown> {
  const boards = d.distributionBoards;
  if (Array.isArray(boards) && boards.length) return boards[0] as Record<string, unknown>;
  const single = d.distribution_board ?? d.distributionBoard;
  return (single && typeof single === 'object' ? single : {}) as Record<string, unknown>;
}

export async function findVisualPrefill(
  address: string,
  excludeReportId?: string
): Promise<VisualPrefill | null> {
  if (!address || address.trim().length < 6) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('reports')
    .select('report_id, report_type, certificate_number, inspection_date, updated_at, data')
    // An EICR or EIC is where the premises particulars actually live; a previous
    // visual report is the next best thing on a repeat visit.
    .in('report_type', ['eicr', 'eic', 'visual-condition'])
    .eq('user_id', user.id)
    .ilike('installation_address', `%${address.trim()}%`)
    .is('deleted_at', null)
    .order('updated_at', { ascending: false })
    .limit(5);

  if (error) {
    // Non-fatal: prefill is a convenience, and a report that opens without it
    // is far better than one that fails to open.
    console.warn('[visual-prefill] lookup failed:', error);
    return null;
  }

  const hit = (data ?? []).find((r) => r.report_id !== excludeReportId);
  if (!hit) return null;

  const d = (hit.data ?? {}) as Record<string, unknown>;
  const board = readBoard(d);

  /*
   * 🔴 THE ALLOW-LIST. Every field here is something you could see standing at
   * the board. Nothing derived from an instrument. Adding a measured value to
   * this object is the one change that must never be made.
   */
  const fields: Partial<VisualConditionFormData> = {
    clientName: str(d.clientName),
    clientAddress: str(d.clientAddress),
    clientPhone: str(d.clientPhone),
    clientEmail: str(d.clientEmail),
    installationAddress: str(d.installationAddress) || str(d.propertyAddress),
    occupier: str(d.occupier),
    supplyType: readSupplyType(d),
    earthingArrangement: str(d.earthingArrangement),
    mainSwitchRating: str(d.mainSwitchRating) || str(board.mainSwitchRating),
    boardLocation: str(board.location) || str(board.boardLocation),
    boardMake: [str(board.make), str(board.type)].filter(Boolean).join(' '),
    numberOfWays: str(board.totalWays) || str(board.ways),
  };

  // Drop empties so the patch never blanks something the user already typed.
  for (const k of Object.keys(fields) as (keyof VisualConditionFormData)[]) {
    if (fields[k] === '' || fields[k] === undefined) delete fields[k];
  }
  if (Object.keys(fields).length === 0) return null;

  return {
    sourceType: TYPE_LABEL[hit.report_type] ?? hit.report_type,
    sourceNumber: str(hit.certificate_number),
    sourceDate: str(hit.inspection_date) || str(hit.updated_at).slice(0, 10),
    fields,
  };
}
