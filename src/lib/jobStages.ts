/**
 * The one job stage model (ELE-1961).
 *
 * `employer_jobs.board_stage` IS the stage. The Job Board, Timeline, Diary and
 * job list all read it from here, so a job can never sit in one column on the
 * board and a different one on the timeline again.
 *
 * The database keeps `status` (the older lifecycle column) in step with the
 * stage by trigger `sync_job_stage`, whichever one a screen writes. The rules
 * below mirror `job_status_for_stage` / `job_stage_for_status` so the UI can
 * place a job the instant it changes, before the refetch lands.
 */
import type { Tone } from '@/components/employer/editorial';

export type JobStage =
  | 'Enquiry'
  | 'Quoted'
  | 'Confirmed'
  | 'Scheduled'
  | 'In Progress'
  | 'Testing'
  | 'Complete'
  | 'On Hold';

export interface JobStageDef {
  id: JobStage;
  label: string;
  /** One line for pickers: what the stage means on a real job. */
  hint: string;
  tone: Tone;
  /** Solid bar colour for the timeline and diary blocks (never translucent yellow). */
  bar: string;
  /** Text colour that reads on `bar`. */
  barText: string;
}

/** In order of the work. On hold sits at the end: it can follow any stage. */
export const JOB_STAGES: JobStageDef[] = [
  {
    id: 'Enquiry',
    label: 'Enquiry',
    hint: 'Asked for a price or a visit',
    tone: 'indigo',
    bar: 'bg-indigo-400',
    barText: 'text-black',
  },
  {
    id: 'Quoted',
    label: 'Quoted',
    hint: 'Quote sent, waiting on the customer',
    tone: 'amber',
    bar: 'bg-amber-400',
    barText: 'text-black',
  },
  {
    id: 'Confirmed',
    label: 'Confirmed',
    hint: 'Won, no date yet',
    tone: 'cyan',
    bar: 'bg-cyan-400',
    barText: 'text-black',
  },
  {
    id: 'Scheduled',
    label: 'Scheduled',
    hint: 'Booked in with a date',
    tone: 'blue',
    bar: 'bg-blue-400',
    barText: 'text-black',
  },
  {
    id: 'In Progress',
    label: 'In progress',
    hint: 'On site now',
    tone: 'yellow',
    bar: 'bg-elec-yellow',
    barText: 'text-black',
  },
  {
    id: 'Testing',
    label: 'Testing',
    hint: 'Testing and certificates',
    tone: 'purple',
    bar: 'bg-purple-400',
    barText: 'text-black',
  },
  {
    id: 'Complete',
    label: 'Complete',
    hint: 'Finished and signed off',
    tone: 'emerald',
    bar: 'bg-emerald-400',
    barText: 'text-black',
  },
  {
    id: 'On Hold',
    label: 'On hold',
    hint: 'Paused: waiting on parts, access or the customer',
    tone: 'red',
    bar: 'bg-neutral-500',
    barText: 'text-white',
  },
];

export const JOB_STAGE_IDS = JOB_STAGES.map((s) => s.id);

const BY_ID = new Map(JOB_STAGES.map((s) => [s.id, s]));

export const isJobStage = (v: unknown): v is JobStage =>
  typeof v === 'string' && BY_ID.has(v as JobStage);

/** Same rules as SQL `job_stage_for_status` (used only when a row has no stage yet). */
export function stageForStatus(
  status: string | null | undefined,
  progress?: number | null,
  hasDate?: boolean
): JobStage {
  switch (status) {
    case 'Completed':
      return 'Complete';
    case 'On Hold':
      return 'On Hold';
    case 'Pending':
      return 'Quoted';
    default: {
      const p = progress ?? 0;
      if (p >= 90) return 'Testing';
      if (p > 0) return 'In Progress';
      return hasDate ? 'Scheduled' : 'Confirmed';
    }
  }
}

/** The stage a job is in. Always `board_stage`; the fallback only covers a stale cache. */
export function jobStage(job: {
  board_stage?: string | null;
  status?: string | null;
  progress?: number | null;
  start_date?: string | null;
}): JobStage {
  if (isJobStage(job.board_stage)) return job.board_stage;
  return stageForStatus(job.status, job.progress, !!job.start_date);
}

/** Same rules as SQL `job_status_for_stage`. */
export function statusForStage(stage: JobStage): 'Pending' | 'Active' | 'Completed' | 'On Hold' {
  switch (stage) {
    case 'Enquiry':
    case 'Quoted':
      return 'Pending';
    case 'Complete':
      return 'Completed';
    case 'On Hold':
      return 'On Hold';
    default:
      return 'Active';
  }
}

export const stageDef = (stage: JobStage): JobStageDef => BY_ID.get(stage) ?? JOB_STAGES[0];
export const stageLabel = (stage: JobStage): string => stageDef(stage).label;
export const stageTone = (stage: JobStage): Tone => stageDef(stage).tone;

/**
 * Moving between columns must not destroy real progress: keep the job's own
 * number when it already fits the target stage, only nudge it to the boundary
 * when it doesn't.
 */
export function progressForStage(stage: JobStage, current: number): number {
  switch (stage) {
    case 'In Progress':
      return current > 0 && current < 90 ? current : 25;
    case 'Testing':
      return current >= 90 && current < 100 ? current : 90;
    case 'Complete':
      return 100;
    case 'On Hold':
      // Paused, not reset: the work already done still counts.
      return current;
    default:
      return 0;
  }
}

/** Stages where the work is booked or happening — what the diary and timeline draw. */
export const LIVE_STAGES: JobStage[] = ['Confirmed', 'Scheduled', 'In Progress', 'Testing'];
