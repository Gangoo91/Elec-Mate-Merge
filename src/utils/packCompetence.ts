/**
 * Does the crew on a job pack hold the certificates the pack asks for
 * (ELE-1962)? A pack stores its requirements as names ("IPAF", "18th
 * Edition"); this maps them onto the competence matrix keys and runs the same
 * crew check the job sheet and diary use (ELE-1834, utils/crewCompetence).
 */
import { canonicalKeyFor, type CompetenceMatrix } from '@/utils/competenceMatrix';
import { checkCrew, type CrewCheck } from '@/utils/crewCompetence';

const tidy = (s: string) => s.trim().replace(/\s+/g, ' ');

/** Pack requirement names → matrix keys, with the name to show for each key. */
export function packRequirementKeys(names: string[] | null | undefined): {
  keys: string[];
  labelFor: Record<string, string>;
} {
  const labelFor: Record<string, string> = {};
  for (const raw of names ?? []) {
    const name = tidy(raw ?? '');
    if (!name) continue;
    const key = canonicalKeyFor(name) ?? `other:${name.toLowerCase()}`;
    if (!labelFor[key]) labelFor[key] = name;
  }
  return { keys: Object.keys(labelFor), labelFor };
}

export interface PackCrewPerson {
  id: string;
  name: string;
  team_role?: string | null;
  role?: string | null;
}

export interface PackCrewCheck {
  /** Per person: what they are missing for this pack ("No IPAF", "18th Edition expired"). */
  gaps: Record<string, string[]>;
  /** One line per person with a gap: "Becky: No IPAF". */
  lines: string[];
  /** People on the pack with at least one gap. */
  peopleShort: number;
  /** Requirement names nobody on the pack holds. */
  missing: string[];
  /** The raw crew check, for the apprentice-only and ECS warnings. */
  check: CrewCheck;
}

const firstName = (name: string) =>
  name
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(/\s+/)[0] || name;

export function checkPackCrew(
  matrix: CompetenceMatrix | null | undefined,
  requiredNames: string[] | null | undefined,
  people: PackCrewPerson[],
  startDate?: string | null
): PackCrewCheck {
  const { keys, labelFor } = packRequirementKeys(requiredNames);
  const check = checkCrew(
    matrix,
    keys,
    people.map((p) => ({ employeeId: p.id, name: p.name, role: p.team_role ?? p.role ?? null })),
    startDate
  );
  // Leftover keys ("other:confined spaces") read back as the name the office typed.
  const relabel = (text: string) =>
    Object.entries(labelFor)
      .filter(([k]) => k.startsWith('other:'))
      .reduce((t, [k, label]) => t.split(k).join(label), text);

  const gaps: Record<string, string[]> = {};
  for (const [id, list] of Object.entries(check.personGaps)) gaps[id] = list.map(relabel);
  const lines = people
    .filter((p) => gaps[p.id]?.length)
    .map((p) => `${firstName(p.name)}: ${gaps[p.id].join(', ')}`);
  return {
    gaps,
    lines,
    peopleShort: lines.length,
    missing: check.missing.map((m) => labelFor[m.key] ?? relabel(m.label)),
    check,
  };
}
