/**
 * Competence-matched dispatch (ELE-1834): does the crew on a job hold, between
 * them, what the job needs? One check shared by the job sheet, the assign
 * sheet and the diary, built on the competence matrix (one credentials store,
 * ELE-1950), so nothing is typed twice.
 *
 * Rules:
 *  - A requirement is met when at least one person on the crew holds it valid
 *    on the day the job starts (a card that lapses before then doesn't count).
 *  - An apprentice can't be the only person on a job.
 *  - An expired ECS card is flagged per person, even when ECS isn't required:
 *    it's the first thing a site asks for.
 */
import {
  assessSiteReadiness,
  requirementLabel,
  type CompetenceMatrix,
  type WorkerGap,
} from '@/utils/competenceMatrix';

/** What the office can require of a crew, in the order they're usually thought of. */
export const CREW_REQUIREMENTS: { key: string; label: string; hint: string }[] = [
  { key: 'ecs', label: 'ECS card', hint: 'A current card for site access' },
  { key: '18th', label: '18th Edition', hint: 'BS 7671, current amendment' },
  { key: '2391', label: 'Inspection & Testing', hint: '2391 / 2394 / 2395, for EICRs and EICs' },
  { key: 'ev', label: 'EV Charging', hint: '2919 / 2921' },
  { key: 'solar', label: 'Solar PV / Battery', hint: '2399 or MCS-recognised' },
  { key: 'pat', label: 'PAT Testing', hint: '2377' },
  { key: 'ipaf', label: 'IPAF', hint: 'Powered access (MEWP)' },
  { key: 'pasma', label: 'PASMA', hint: 'Mobile towers' },
  { key: 'asbestos', label: 'Asbestos Awareness', hint: 'Pre-2000 buildings' },
  { key: 'firstaid', label: 'First Aid', hint: 'A first aider on site' },
  { key: 'ssts', label: 'SSSTS / SMSTS', hint: 'Site supervision' },
];

const LABEL = Object.fromEntries(CREW_REQUIREMENTS.map((r) => [r.key, r.label]));

/** A starting point from the job itself; the office changes it as they like. */
export function suggestRequirements(job: { title?: string | null; job_type?: string | null; description?: string | null }): string[] {
  const t = `${job.job_type ?? ''} ${job.title ?? ''} ${job.description ?? ''}`.toLowerCase();
  const keys = new Set<string>(['18th']);
  if (/\beicr\b|\beic\b|periodic|inspection|testing|landlord|re-?test/.test(t)) keys.add('2391');
  if (/\bev\b|charg|zappi|wallbox|ohme|pod point/.test(t)) {
    keys.add('ev');
    keys.add('2391');
  }
  if (/solar|\bpv\b|battery|bess|inverter/.test(t)) keys.add('solar');
  if (/\bpat\b|portable appliance/.test(t)) keys.add('pat');
  if (/commercial|site|principal|factory|warehouse|school|hospital/.test(t)) keys.add('ecs');
  if (/cherry picker|mewp|scissor lift|high level|warehouse lighting/.test(t)) keys.add('ipaf');
  if (/consumer unit|\bcu\b|rewire|board change/.test(t)) keys.add('2391');
  return CREW_REQUIREMENTS.map((r) => r.key).filter((k) => keys.has(k));
}

export interface CrewMember {
  employeeId: string;
  name: string;
  role?: string | null;
}

export interface CrewCheck {
  /** Requirement keys nobody on the crew holds valid on the start date. */
  missing: { key: string; label: string }[];
  /** Per person: their own gaps against the requirements (for the assign list). */
  personGaps: Record<string, string[]>;
  /** Everyone on the crew is an apprentice. */
  apprenticesOnly: boolean;
  /** People whose ECS card has expired (or lapses before the start). */
  ecsExpired: string[];
  /** One line per problem, ready to show or log. Empty = the crew covers the job. */
  problems: string[];
}

const isApprentice = (role?: string | null) => /apprentice/i.test(role ?? '');
const first = (name: string) => name.replace(/\(.*?\)/g, '').trim().split(/\s+/)[0] || name;

const gapText = (g: WorkerGap) =>
  g.reason === 'missing' ? `No ${g.label}` : g.reason === 'expired' ? `${g.label} expired` : `${g.label} lapses before the start`;

export function checkCrew(
  matrix: CompetenceMatrix | null | undefined,
  requiredKeys: string[] | null | undefined,
  crew: CrewMember[],
  startDate?: string | null
): CrewCheck {
  const keys = (requiredKeys ?? []).filter(Boolean);
  const empty: CrewCheck = { missing: [], personGaps: {}, apprenticesOnly: false, ecsExpired: [], problems: [] };
  if (!crew.length) return empty;

  const apprenticesOnly = crew.every((c) => isApprentice(c.role));
  const result: CrewCheck = { ...empty, apprenticesOnly };

  if (matrix) {
    const crewIds = new Set(crew.map((c) => c.employeeId));
    const scoped: CompetenceMatrix = { ...matrix, workers: matrix.workers.filter((w) => crewIds.has(w.employeeId)) };
    const allKeys = Array.from(new Set([...keys, 'ecs']));
    const readiness = assessSiteReadiness(scoped, allKeys, startDate);
    const byId = new Map(readiness.workers.map((w) => [w.employeeId, w]));

    for (const key of keys) {
      const covered = crew.some((c) => {
        const r = byId.get(c.employeeId);
        return r ? !r.gaps.some((g) => g.key === key) : false;
      });
      if (!covered) result.missing.push({ key, label: LABEL[key] ?? requirementLabel(key, matrix.columns) });
    }
    for (const c of crew) {
      const r = byId.get(c.employeeId);
      const gaps = r ? r.gaps.filter((g) => keys.includes(g.key)) : keys.map((k) => ({ key: k, label: LABEL[k] ?? k, reason: 'missing' as const, expiry: null }));
      if (gaps.length) result.personGaps[c.employeeId] = gaps.map(gapText);
      const ecs = r?.gaps.find((g) => g.key === 'ecs');
      if (ecs && ecs.reason !== 'missing') result.ecsExpired.push(first(c.name));
    }
  } else if (keys.length) {
    // No credentials loaded at all: everything required is unproven.
    result.missing = keys.map((k) => ({ key: k, label: LABEL[k] ?? k }));
  }

  for (const m of result.missing) result.problems.push(`Nobody on this job holds ${m.label}`);
  if (apprenticesOnly) result.problems.push('Only apprentices on this job: send someone qualified with them');
  if (result.ecsExpired.length)
    result.problems.push(
      `${result.ecsExpired.join(' and ')}'s ECS card ${result.ecsExpired.length === 1 ? 'has' : 'have'} expired`
    );
  return result;
}

export const requirementName = (key: string) => LABEL[key] ?? key;
