/**
 * featureGate.ts (ELE-1969)
 *
 * Pure decision for the per-feature minimum native build. No imports, so it
 * can be unit-tested in the browser and reused anywhere.
 *
 * Config lives on app_versions.feature_minimums (the is_current row per
 * platform), e.g. {"college": {"build": 48, "version": "1.0.5"}}.
 */

export interface FeatureFloor {
  build?: number | string | null;
  version?: string | null;
}

export type FeatureMinimums = Record<string, FeatureFloor | null | undefined>;

export type FeatureGateDecision = 'none' | 'block' | 'nudge';

/** -1 if a < b, 0 if equal, 1 if a > b, for dotted numeric versions. */
export function compareDotted(a: string, b: string): number {
  const pa = a.split('.').map((n) => Number.parseInt(n, 10) || 0);
  const pb = b.split('.').map((n) => Number.parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const x = pa[i] ?? 0;
    const y = pb[i] ?? 0;
    if (x < y) return -1;
    if (x > y) return 1;
  }
  return 0;
}

/** True when the installed build is below the floor for this feature. */
export function isBelowFeatureFloor(
  floor: FeatureFloor | null | undefined,
  currentVersion: string | null | undefined,
  currentBuild: string | number | null | undefined
): boolean {
  if (!floor) return false;
  const minBuild = floor.build == null || floor.build === '' ? NaN : Number(floor.build);
  const build = currentBuild == null || currentBuild === '' ? NaN : Number(currentBuild);
  if (Number.isFinite(minBuild) && Number.isFinite(build) && build < minBuild) return true;
  if (floor.version && currentVersion && compareDotted(currentVersion, floor.version) < 0) {
    return true;
  }
  return false;
}

/** The College Hub and the apprentice side of it. */
export function isCollegePath(pathname: string): boolean {
  return (
    pathname === '/college' ||
    pathname.startsWith('/college/') ||
    pathname.startsWith('/apprentice/college')
  );
}

/**
 * What to show a college-linked user on an old build:
 *   block  on College Hub screens (they must not see a stale hub)
 *   nudge  elsewhere in the app (a banner they can dismiss for the session)
 *   none   when they are not college-linked or are up to date
 */
export function collegeGateDecision(input: {
  minimums: FeatureMinimums | null | undefined;
  currentVersion: string | null | undefined;
  currentBuild: string | number | null | undefined;
  isCollegeLinked: boolean;
  pathname: string;
}): FeatureGateDecision {
  if (!input.isCollegeLinked) return 'none';
  const floor = input.minimums?.college;
  if (!isBelowFeatureFloor(floor, input.currentVersion, input.currentBuild)) return 'none';
  return isCollegePath(input.pathname) ? 'block' : 'nudge';
}
