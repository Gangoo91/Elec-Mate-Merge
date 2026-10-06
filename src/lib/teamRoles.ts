/**
 * A person's place in a firm's team (employer_employees.team_role).
 * One list for every screen; it was copied into four files and drifted.
 *
 * Not to be confused with profiles.role (the person's trade) or
 * employer_employees.role (their job title).
 */
export const TEAM_ROLES = [
  'QS',
  'Supervisor',
  'Project Manager',
  'Apprentice Co-ordinator',
  'Operative',
  'Apprentice',
  'Subcontractor',
] as const;

export type TeamRole = (typeof TEAM_ROLES)[number];

export const isTeamRole = (r: unknown): r is TeamRole =>
  typeof r === 'string' && (TEAM_ROLES as readonly string[]).includes(r);

/** Unknown or blank values read as Operative, as before. */
export const toTeamRole = (r: unknown): TeamRole => (isTeamRole(r) ? r : 'Operative');

/** What each role means in the app — shown under the picker. */
export const TEAM_ROLE_HINT: Partial<Record<TeamRole, string>> = {
  QS: 'Reviews and countersigns certificates your electricians submit.',
  Supervisor:
    'Runs work on site. Confirms apprentices’ training hours and is told about safety reports from the people they supervise.',
  'Project Manager': 'Runs jobs. Confirms apprentices’ training hours.',
  'Apprentice Co-ordinator':
    'Looks after your apprentices. Confirms their training hours and is told about any safety report involving one.',
  Operative: 'Sees their own jobs, time, expenses and leave.',
  Apprentice: 'Sees their own jobs and training, without client phone numbers or emails.',
  Subcontractor: 'Works your jobs on their own account. Sees their own jobs, time and expenses.',
};

/**
 * ELE-1831: what each role costs. Mirrors public.employer_seat_is_paid():
 * supervising roles are free, apprentices are free while they're linked to a
 * college, everyone else is a £9.99/month seat.
 */
export const TEAM_ROLE_SEAT: Record<TeamRole, string> = {
  QS: 'Free seat',
  Supervisor: 'Free seat',
  'Project Manager': 'Free seat',
  'Apprentice Co-ordinator': 'Free seat',
  Operative: '£9.99 a month',
  Apprentice: 'Free while linked to their college',
  Subcontractor: '£9.99 a month',
};

/** Roles that can be someone's named supervisor (first in the picker). */
export const SUPERVISING_ROLES: TeamRole[] = [
  'Supervisor',
  'Project Manager',
  'Apprentice Co-ordinator',
  'QS',
];
