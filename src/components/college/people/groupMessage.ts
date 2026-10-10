/**
 * Group message (College Hub, 8 Oct 2026): the templates, the merge fields
 * and the renderer behind GroupMessageSheet.
 *
 * Every figure comes from get_group_message_figures, which reads the same
 * sources as the rest of the hub (get_otj_summary, get_portfolio_ac_state,
 * the review board's next review, the register). A message that needs a
 * figure the learner does not have (no register marked, no account) is never
 * sent with a gap in it: the learner is held back and the tutor told why.
 */
import { supabase } from '@/integrations/supabase/client';

export const GROUP_MESSAGE_MAX = 60;

export interface GroupFigures {
  student_id: string;
  name: string;
  first_name: string;
  status: string | null;
  has_account: boolean;
  can_message: boolean;
  skip_reason: 'withdrawn' | 'no_account' | 'not_allowed' | null;
  hours_counted: number | null;
  hours_planned_by_now: number | null;
  hours_behind: number | null;
  hours_required: number | null;
  otj_risk: string | null;
  criteria_passed: number | null;
  criteria_total: number | null;
  criteria_sent_back: number | null;
  next_review_date: string | null;
  next_review_kind: 'booked' | 'due' | null;
  attendance_last_4_weeks: number | null;
  sessions_last_4_weeks: number;
  sessions_missed_last_4_weeks: number;
}

export async function fetchGroupFigures(studentIds: string[]): Promise<GroupFigures[]> {
  if (studentIds.length === 0) return [];
  const { data, error } = await supabase.rpc(
    'get_group_message_figures' as never,
    { p_student_ids: studentIds } as never
  );
  if (error) throw new Error(error.message);
  return (data as unknown as GroupFigures[]) ?? [];
}

export interface GroupSendResult {
  sent: number;
  skipped: number;
  threads: Array<{ student_id: string; thread_id: string; message_id: string }>;
  skipped_learners: Array<{ student_id: string; reason: string }>;
}

export async function sendGroupMessage(
  subject: string,
  messages: Array<{ student_id: string; body: string }>,
  scope: 'mine' | 'college'
): Promise<GroupSendResult> {
  const { data, error } = await supabase.rpc(
    'send_group_message' as never,
    { p_subject: subject, p_messages: messages, p_scope: scope } as never
  );
  if (error) throw new Error(error.message);
  return data as unknown as GroupSendResult;
}

/* ── Merge fields ───────────────────────────────────────────────────── */

export interface MergeField {
  key: string;
  label: string;
  /** What the tutor needs to know about the value. */
  hint: string;
  value: (f: GroupFigures) => string | null;
  /** Said when a learner has no value for it. */
  missing: string;
  /**
   * A figure that only makes sense above zero ("you're 0 hours behind").
   * Returns why this learner is held back, or null when the figure fits.
   */
  notApplicable?: (f: GroupFigures) => string | null;
}

const num = (n: number | null | undefined) =>
  n === null || n === undefined ? null : Math.round(n).toLocaleString('en-GB');
/** Hours to 0.1 h, as the server sends them: "2.6", "623", "1,066". */
const hrs = (n: number | null | undefined) =>
  n === null || n === undefined ? null : n.toLocaleString('en-GB', { maximumFractionDigits: 1 });

function reviewWords(f: GroupFigures): string | null {
  if (!f.next_review_date) return null;
  const d = new Date(`${f.next_review_date.slice(0, 10)}T12:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  const day = d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  return f.next_review_kind === 'due' ? `due by ${day}` : `on ${day}`;
}

export const MERGE_FIELDS: MergeField[] = [
  {
    key: 'first_name',
    label: 'First name',
    hint: 'Their first name',
    value: (f) => f.first_name || null,
    missing: 'no name on the roll',
  },
  {
    key: 'hours_counted',
    label: 'Hours counted',
    hint: 'Off-the-job hours counted so far',
    value: (f) => hrs(f.hours_counted),
    missing: 'no off-the-job hours record',
  },
  {
    key: 'hours_planned_by_now',
    label: 'Hours planned by now',
    hint: 'What their plan has them at today',
    value: (f) => hrs(f.hours_planned_by_now),
    missing: 'no off-the-job plan to measure against',
  },
  {
    key: 'hours_behind',
    label: 'Hours behind',
    hint: 'Planned by now minus counted, never below 0',
    value: (f) => hrs(f.hours_behind),
    missing: 'no off-the-job plan to measure against',
    notApplicable: (f) => (f.hours_behind === 0 ? 'not behind on off-the-job hours' : null),
  },
  {
    key: 'criteria_passed',
    label: 'Criteria passed',
    hint: 'Assessment criteria passed',
    value: (f) => num(f.criteria_passed),
    missing: 'no portfolio criteria yet',
  },
  {
    key: 'criteria_total',
    label: 'Criteria total',
    hint: 'Every criterion on their qualification',
    value: (f) => num(f.criteria_total),
    missing: 'no portfolio criteria yet',
  },
  {
    key: 'criteria_sent_back',
    label: 'Sent back',
    hint: 'Criteria sent back and not yet resubmitted',
    value: (f) => num(f.criteria_sent_back),
    missing: 'no portfolio criteria yet',
    notApplicable: (f) =>
      f.criteria_sent_back === 0 ? 'no evidence sent back waiting to be resubmitted' : null,
  },
  {
    key: 'next_review_date',
    label: 'Next review',
    hint: '"on Tuesday 20 October" when booked, "due by …" when not',
    value: reviewWords,
    missing: 'no progress review booked or due',
  },
  {
    key: 'attendance_last_4_weeks',
    label: 'Attendance, 4 weeks',
    hint: 'Present or late, last 28 days, as a percentage',
    value: (f) => (f.attendance_last_4_weeks === null ? null : `${f.attendance_last_4_weeks}%`),
    missing: 'no register marked in the last 4 weeks',
  },
  {
    key: 'sessions_missed_last_4_weeks',
    label: 'Sessions missed',
    hint: 'Sessions marked absent in the last 28 days',
    value: (f) => (f.sessions_last_4_weeks === 0 ? null : String(f.sessions_missed_last_4_weeks)),
    missing: 'no register marked in the last 4 weeks',
    notApplicable: (f) =>
      f.sessions_last_4_weeks > 0 && f.sessions_missed_last_4_weeks === 0
        ? 'has not missed a session in the last 4 weeks'
        : null,
  },
];

const FIELD_BY_KEY = new Map(MERGE_FIELDS.map((m) => [m.key, m]));

export type Segment = { text: string; field?: string };

export interface Rendered {
  text: string;
  segments: Segment[];
  /** Reasons this learner's message cannot be filled in. */
  missing: string[];
  /** {fields} the tutor typed that do not exist. */
  unknown: string[];
}

/** Fills {fields} for one learner. */
export function renderFor(template: string, f: GroupFigures): Rendered {
  const segments: Segment[] = [];
  const missing = new Set<string>();
  const unknown = new Set<string>();
  const re = /\{([a-z0-9_]+)\}/gi;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(template))) {
    if (m.index > last) segments.push({ text: template.slice(last, m.index) });
    const key = m[1].toLowerCase();
    const field = FIELD_BY_KEY.get(key);
    if (!field) {
      unknown.add(`{${m[1]}}`);
      segments.push({ text: m[0] });
    } else {
      const v = field.value(f);
      const na = field.notApplicable?.(f) ?? null;
      if (v === null || v === '') {
        missing.add(field.missing);
        segments.push({ text: m[0], field: key });
      } else {
        if (na) missing.add(na);
        segments.push({ text: v, field: key });
      }
    }
    last = m.index + m[0].length;
  }
  if (last < template.length) segments.push({ text: template.slice(last) });
  // "1 hours behind" reads like a mail merge. Singular after a figure of 1.
  for (let i = 0; i < segments.length - 1; i++) {
    if (segments[i].field && segments[i].text === '1' && !segments[i + 1].field) {
      segments[i + 1] = {
        text: segments[i + 1].text.replace(/^ (hours|sessions|criteria)\b/, (_w, noun: string) =>
          noun === 'criteria' ? ' criterion' : ` ${noun.slice(0, -1)}`
        ),
      };
    }
  }
  return {
    text: segments
      .map((s) => s.text)
      .join('')
      .trim(),
    segments,
    missing: [...missing],
    unknown: [...unknown],
  };
}

export const SKIP_WORDS: Record<string, string> = {
  withdrawn: 'Withdrawn, never messaged',
  no_account: 'No app account yet, so no message list to send to',
  not_allowed: 'Your role cannot message this learner',
};

/* ── Templates ──────────────────────────────────────────────────────── */

export type TemplateId = 'otj' | 'attendance' | 'evidence' | 'review' | 'general';

export interface GroupTemplate {
  id: TemplateId;
  label: string;
  subject: string;
  body: (signOff: string) => string;
}

export const TEMPLATES: GroupTemplate[] = [
  {
    id: 'otj',
    label: 'Behind on hours',
    subject: 'Your off-the-job hours',
    body: (me) =>
      `Hi {first_name},

Quick one about your off-the-job hours. You've got {hours_counted} hours counted so far, and your plan has you at {hours_planned_by_now} by now, so you're {hours_behind} hours behind.

It's very catchable if we start this week. Log anything that counts: training at work, college sessions, learning in the app, time your supervisor spends showing you something new. If you're not sure whether something counts, message me and we'll go through it together.

Thanks,
${me}`,
  },
  {
    id: 'attendance',
    label: 'Missed sessions',
    subject: 'Checking in',
    body: (me) =>
      `Hi {first_name},

I've noticed you've missed {sessions_missed_last_4_weeks} sessions in the last four weeks, which puts your attendance at {attendance_last_4_weeks}. Is everything all right?

If something is getting in the way, at work or at home, tell me and we'll sort out a plan. Reply here or grab me at the next session.

Thanks,
${me}`,
  },
  {
    id: 'evidence',
    label: 'Evidence sent back',
    subject: 'Evidence to resubmit',
    body: (me) =>
      `Hi {first_name},

You've got {criteria_sent_back} criteria where your evidence came back with feedback and hasn't been resubmitted yet. Have a read of the assessor's comments in your portfolio, make the changes and send it back in.

You're on {criteria_passed} of {criteria_total} criteria passed, so every one you get over the line moves you forward. If any of the feedback doesn't make sense, ask me.

Thanks,
${me}`,
  },
  {
    id: 'review',
    label: 'Review coming up',
    subject: 'Your progress review',
    body: (me) =>
      `Hi {first_name},

Your next progress review is {next_review_date}. Before then, have a think about how things are going at work and at college, and anything you want to raise.

So you know where you stand: {hours_counted} off-the-job hours counted against {hours_planned_by_now} planned by now, and {criteria_passed} of {criteria_total} criteria passed.

See you then,
${me}`,
  },
  {
    id: 'general',
    label: 'General note',
    subject: 'A note from your tutor',
    body: (me) =>
      `Hi {first_name},



Thanks,
${me}`,
  },
];
