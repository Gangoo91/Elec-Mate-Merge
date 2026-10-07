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
 * What each role costs the firm (Andrew 7 Oct). Mirrors public.employer_seat_kind():
 * everyone in Worker Tools is a paid seat, £9.99/month; apprentices £4.99/month.
 */
export const TEAM_ROLE_SEAT: Record<TeamRole, string> = {
  QS: '£9.99 a month',
  Supervisor: '£9.99 a month',
  'Project Manager': '£9.99 a month',
  'Apprentice Co-ordinator': '£9.99 a month',
  Operative: '£9.99 a month',
  Apprentice: '£4.99 a month',
  Subcontractor: '£9.99 a month',
};

/** Roles that can be someone's named supervisor (first in the picker). */
export const SUPERVISING_ROLES: TeamRole[] = [
  'Supervisor',
  'Project Manager',
  'Apprentice Co-ordinator',
  'QS',
];
