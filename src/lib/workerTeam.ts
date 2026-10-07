/**
 * Worker Tools access rule (ELE-1998): an employer_employees row counts only
 * while its status is Active. An Archived (removed) row still satisfies the
 * worker's own-row SELECT policy, so "has a roster record" is not "is on the
 * team". The server applies the same rule (my_employee_ids, is_assigned_to_job
 * and the worker RPCs are all active-only).
 */
export const isActiveRosterRow = (row: { status?: string | null } | null | undefined): boolean =>
  !!row && (row.status ?? '').toLowerCase() === 'active';

/** Where every Worker Tools page lives. */
export const WORKER_TOOLS_BASE = '/electrician/worker-tools';
