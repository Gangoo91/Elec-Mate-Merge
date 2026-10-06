/**
 * Starting Site Safety paperwork from a job.
 *
 * One place builds these URLs so the job page, its actions sheet and the Site
 * Safety hub cannot drift apart. Both used to send
 * `/electrician-tools/site-safety?projectId=…&location=…&clientName=…`, which
 * opened the Site Safety hub and silently dropped all three values — the RAMS
 * was neither pre-filled nor filed against the job.
 *
 * Everything travels in the query string (not route state) so it survives a
 * refresh, and `returnTo` brings the user back to the job when they finish.
 */

export interface JobLaunchContext {
  projectId: string;
  title?: string | null;
  location?: string | null;
  customerName?: string | null;
  description?: string | null;
}

/** Shape every Site Safety module accepts when opened from a job or a "Start" action. */
export interface SafetyToolLaunch {
  /** spark_projects id — pre-links the new record to the job. */
  jobId?: string;
  /** Open straight into a new record rather than the list. */
  startNew?: boolean;
  /** The job's site address, for forms that ask for one. */
  siteAddress?: string;
  /** The job's title, for forms that ask for a site or job name. */
  siteName?: string;
}

/** Site Safety tools that can be opened straight into a new record. */
export type SafetyToolId =
  | 'safe-isolation'
  | 'permit-to-work'
  | 'near-miss'
  | 'team-briefing'
  | 'coshh'
  | 'inspection-checklists'
  | 'pre-use-checks'
  | 'fire-watch'
  | 'accident-book'
  | 'safety-observations'
  | 'site-diary'
  | 'documents';

const SITE_SAFETY = '/electrician/site-safety';

export const jobPath = (projectId: string) => `/electrician/projects/${projectId}`;

function jobParams(ctx: JobLaunchContext): URLSearchParams {
  const p = new URLSearchParams();
  p.set('projectId', ctx.projectId);
  if (ctx.title) p.set('title', ctx.title);
  if (ctx.location) p.set('location', ctx.location);
  if (ctx.customerName) p.set('clientName', ctx.customerName);
  if (ctx.description) p.set('description', ctx.description.slice(0, 600));
  p.set('returnTo', jobPath(ctx.projectId));
  return p;
}

/** The AI RAMS generator, pre-filled from the job and filed against it. */
export const ramsFromJobUrl = (ctx: JobLaunchContext) =>
  `${SITE_SAFETY}/ai-rams?${jobParams(ctx).toString()}`;

/** A Site Safety tool opened on a new record already linked to the job. */
export const safetyToolFromJobUrl = (tool: SafetyToolId, ctx: JobLaunchContext) => {
  const p = jobParams(ctx);
  p.set('tool', tool);
  p.set('new', '1');
  return `${SITE_SAFETY}?${p.toString()}`;
};

/** Accept only in-app electrician paths — `returnTo` can arrive in a URL. */
export const safeReturnTo = (value: string | null | undefined): string | null =>
  value && /^\/electrician\/[\w\-/]*$/.test(value) ? value : null;
