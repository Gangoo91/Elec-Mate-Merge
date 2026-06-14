/* ==========================================================================
   statusTone — one canonical status → Tone map for the whole College Hub.

   Why: before this, status chips were coloured ad-hoc per section, so the
   SAME state rendered different colours across surfaces, and elec-yellow (the
   CTA/action accent) was reused for statuses — e.g. "Gateway Ready" and
   "Not Started" both yellow. That makes status unreadable by colour alone.

   Rules:
     emerald = positive / done / on-track / agree / verified
     green   = strong-positive grade band (merit-ish)
     blue    = in-progress / pending / informational (authorised, submitted)
     amber   = attention / at-risk / behind / refer / resubmit
     red     = negative / fail / overdue / withdrawn / disagree
     grey    = neutral / not-tracked / not-started / archived
   elec-yellow ('yellow') is reserved for ACTIONS/CTAs and must NOT come back
   from here.

   Matching is case/space/underscore-insensitive. Unknown values fall back to
   'grey' (neutral) — never 'yellow'.
   ========================================================================== */

import type { Tone } from './index';

export type StatusDomain =
  | 'student'
  | 'attendance'
  | 'gradeStatus'
  | 'gradeValue'
  | 'epa'
  | 'otj'
  | 'iqaVerdict'
  | 'iqaFinding'
  | 'workQueue'
  | 'lesson'
  | 'generic';

const norm = (v: string) => v.trim().toLowerCase().replace(/[_\s-]+/g, ' ');

const MAPS: Record<StatusDomain, Record<string, Tone>> = {
  student: {
    active: 'emerald',
    completed: 'emerald',
    'on hold': 'grey',
    paused: 'grey',
    archived: 'grey',
    withdrawn: 'red',
    'break in learning': 'amber',
  },
  attendance: {
    present: 'emerald',
    late: 'amber',
    absent: 'red',
    authorised: 'blue',
    excused: 'blue',
  },
  gradeStatus: {
    graded: 'emerald',
    final: 'emerald',
    verified: 'emerald',
    signed off: 'emerald',
    submitted: 'blue',
    pending: 'blue',
    'awaiting review': 'blue',
    resubmission: 'amber',
    resubmit: 'amber',
    referred: 'amber',
  },
  gradeValue: {
    distinction: 'emerald',
    merit: 'green',
    pass: 'blue',
    competent: 'emerald',
    'not yet competent': 'amber',
    refer: 'amber',
    resit: 'amber',
    fail: 'red',
    'not achieved': 'red',
  },
  epa: {
    'not started': 'grey',
    'pre gateway': 'blue',
    'in progress': 'blue',
    'gateway ready': 'emerald',
    gateway: 'amber',
    'epa booked': 'blue',
    distinction: 'emerald',
    pass: 'emerald',
    fail: 'red',
  },
  otj: {
    verified: 'emerald',
    approved: 'emerald',
    pending: 'blue',
    submitted: 'blue',
    rejected: 'red',
    returned: 'amber',
    'on track': 'emerald',
    behind: 'amber',
    'at risk': 'red',
  },
  iqaVerdict: {
    agree: 'emerald',
    agreed: 'emerald',
    partial: 'amber',
    'partial agree': 'amber',
    refer: 'amber',
    disagree: 'red',
    escalate: 'red',
    pending: 'blue',
  },
  iqaFinding: {
    commendation: 'emerald',
    observation: 'blue',
    action: 'amber',
    concern: 'red',
  },
  workQueue: {
    completed: 'emerald',
    done: 'emerald',
    'in progress': 'blue',
    todo: 'grey',
    pending: 'blue',
    overdue: 'red',
    blocked: 'red',
  },
  lesson: {
    published: 'emerald',
    delivered: 'emerald',
    draft: 'grey',
    pending: 'blue',
    scheduled: 'blue',
    past: 'amber',
    overdue: 'amber',
  },
  generic: {
    active: 'emerald',
    on: 'emerald',
    enabled: 'emerald',
    off: 'grey',
    disabled: 'grey',
    inactive: 'grey',
    error: 'red',
    warning: 'amber',
  },
};

/** Resolve a status string in a domain to a canonical Tone. Unknown → 'grey'. */
export function statusTone(domain: StatusDomain, value: string | null | undefined): Tone {
  if (!value) return 'grey';
  return MAPS[domain]?.[norm(value)] ?? 'grey';
}
