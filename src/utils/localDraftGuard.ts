/**
 * A newer local draft must never hide test results the cloud already holds.
 *
 * When a certificate is opened, the form prefers the device's local draft if
 * its timestamp is newer than the cloud row. That is right for the offline
 * case — the electrician typed in a plant room and the cloud has not caught up.
 * It is wrong for the stale-snapshot case: a draft written by an emergency
 * background save from a half-hydrated form, or by a session that never got
 * the cloud data at all, carries a newer timestamp and an emptier schedule.
 * Prefer it and every reading the cloud holds vanishes on THAT device only,
 * while another device still shows them — "results disappeared on my iPad,
 * not my phone" (Rovell Electrical, 28 Sep 2026).
 *
 * The observation rescue that already lives in the EIC/EICR providers covers
 * one array. This covers the ones that carry test results, and it asks the
 * only question that matters: would taking the local draft show FEWER circuit
 * rows, or fewer rows with readings, than the cloud has? If so the local draft
 * is not a newer version of this certificate, it is a broken one, and the
 * cloud copy wins.
 */

const RESULT_KEYS = [
  'zs',
  'r1r2',
  'r2',
  'ringR1',
  'ringR2',
  'ringRn',
  'insulationLiveEarth',
  'insulationLiveNeutral',
  'insulationResistance',
  'rcdOneX',
  'pfc',
  'pfcLiveEarth',
  'pfcLiveNeutral',
] as const;

/** Arrays that carry per-row test results, per certificate family. */
const RESULT_ARRAYS = ['scheduleOfTests', 'circuits', 'testResults'] as const;

const filled = (v: unknown): boolean => {
  if (v === null || v === undefined) return false;
  const s = String(v).trim();
  return s !== '' && s.toUpperCase() !== 'N/A';
};

/** Rows in `rows` that hold at least one real reading. */
export function countRowsWithReadings(rows: unknown): number {
  if (!Array.isArray(rows)) return 0;
  return rows.filter(
    (r) =>
      r &&
      typeof r === 'object' &&
      RESULT_KEYS.some((k) => filled((r as Record<string, unknown>)[k]))
  ).length;
}

export interface LocalDraftVerdict {
  /** True when taking the local draft would show fewer rows or readings than the cloud has. */
  hides: boolean;
  /** Which array tripped it, for the log line. */
  array?: string;
  localRows: number;
  cloudRows: number;
  localReadings: number;
  cloudReadings: number;
}

export function localDraftHidesCloudResults(
  local: Record<string, unknown> | null | undefined,
  cloud: Record<string, unknown> | null | undefined
): LocalDraftVerdict {
  const none: LocalDraftVerdict = {
    hides: false,
    localRows: 0,
    cloudRows: 0,
    localReadings: 0,
    cloudReadings: 0,
  };
  if (!local || !cloud) return none;

  for (const key of RESULT_ARRAYS) {
    const cloudArr = Array.isArray(cloud[key]) ? (cloud[key] as unknown[]) : [];
    if (cloudArr.length === 0) continue;
    const localArr = Array.isArray(local[key]) ? (local[key] as unknown[]) : [];
    const verdict: LocalDraftVerdict = {
      hides: false,
      array: key,
      localRows: localArr.length,
      cloudRows: cloudArr.length,
      localReadings: countRowsWithReadings(localArr),
      cloudReadings: countRowsWithReadings(cloudArr),
    };
    if (verdict.localRows < verdict.cloudRows || verdict.localReadings < verdict.cloudReadings) {
      return { ...verdict, hides: true };
    }
  }
  return none;
}

/**
 * Merge a newer local draft ONTO the cloud copy instead of choosing one.
 *
 * Rule per value: local wins when it holds something, cloud fills every blank.
 * Rows in the result arrays are matched by `id`; a row only one side has is
 * kept. Internal `_` keys (client identity, project prefill) stay as the cloud
 * has them. The result can therefore never show fewer readings than either
 * side — which is the whole point: a device holding a partial snapshot gets the
 * cloud's rows back, and a device holding genuinely newer work keeps it.
 *
 * This is the load-side twin of `isServerContainedInLocal` on the save side.
 */
const isBlank = (v: unknown): boolean =>
  v === null || v === undefined || (typeof v === 'string' && v.trim() === '');

const rowId = (r: unknown): string | null =>
  r && typeof r === 'object' && 'id' in r && (r as { id?: unknown }).id != null
    ? String((r as { id: unknown }).id)
    : null;

function mergeRow(local: Record<string, unknown>, cloud: Record<string, unknown>) {
  const out: Record<string, unknown> = { ...cloud };
  for (const [k, v] of Object.entries(local)) {
    if (!isBlank(v)) out[k] = v;
    else if (!(k in out)) out[k] = v;
  }
  return out;
}

function mergeRows(local: unknown[], cloud: unknown[]): unknown[] {
  // Arrays of plain values (bonding locations, completed steps) have no ids to
  // match on: the local list stands in whole if it holds anything, else the
  // cloud's. Merging them element-wise would duplicate every entry.
  const keyed = (arr: unknown[]) => arr.some((r) => rowId(r) !== null);
  if (!keyed(local) && !keyed(cloud)) return local.length > 0 ? local : cloud;

  // Keyed rows: keep the CLOUD order (the persisted order), merge each row
  // with its local twin, then append rows only the local draft has.
  const localById = new Map<string, unknown>();
  local.forEach((r) => {
    const id = rowId(r);
    if (id) localById.set(id, r);
  });
  const seen = new Set<string>();
  const merged: unknown[] = cloud.map((c) => {
    const id = rowId(c);
    if (!id) return c;
    seen.add(id);
    const l = localById.get(id);
    return l && typeof l === 'object' && typeof c === 'object'
      ? mergeRow(l as Record<string, unknown>, c as Record<string, unknown>)
      : c;
  });
  local.forEach((r) => {
    const id = rowId(r);
    if (!id || !seen.has(id)) merged.push(r);
  });
  return merged;
}

export function mergeLocalOntoCloud(
  local: Record<string, unknown>,
  cloud: Record<string, unknown>
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...cloud };
  for (const [k, lv] of Object.entries(local)) {
    if (k.startsWith('_')) continue;
    const cv = cloud[k];
    if (Array.isArray(lv) && Array.isArray(cv)) {
      out[k] = mergeRows(lv, cv);
    } else if (Array.isArray(lv)) {
      out[k] = lv;
    } else if (lv && typeof lv === 'object' && cv && typeof cv === 'object' && !Array.isArray(cv)) {
      out[k] = mergeRow(lv as Record<string, unknown>, cv as Record<string, unknown>);
    } else if (!isBlank(lv)) {
      out[k] = lv;
    } else if (!(k in out)) {
      out[k] = lv;
    }
  }
  return out;
}
