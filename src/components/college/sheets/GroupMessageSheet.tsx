/**
 * GroupMessageSheet — message a group, each learner with their own figures
 * (College Hub, 8 Oct 2026).
 *
 * Opened from the Learners list ("Message these N" on a filtered list or a
 * cohort, or "Message" on a Select-mode selection). Three steps in one sheet:
 *
 *   write    a template for a real situation, the subject and body with
 *            {merge fields}; beside it a preview that steps through each
 *            learner's actual message
 *   confirm  "This sends N private messages", with who is held back and why
 *   sent     the counts, and a way into each learner's Student 360
 *
 * Sending goes through send_group_message: one new thread per learner in the
 * existing tutor/learner channel, so the message lands in the learner's
 * message list and bell like any other tutor message, and shows on their
 * Student 360. The server checks the 60 cap, the scope and college_can again.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FormSheet } from '@/components/forms/FormSheet';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY } from '@/components/college/ui/CollegeUi';
import { StatusChip } from '@/components/college/people/peopleKit';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  GROUP_MESSAGE_MAX,
  MERGE_FIELDS,
  SKIP_WORDS,
  TEMPLATES,
  fetchGroupFigures,
  renderFor,
  sendGroupMessage,
  type GroupFigures,
  type GroupSendResult,
  type Rendered,
  type TemplateId,
} from '@/components/college/people/groupMessage';

export interface GroupMessageSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** College roll rows (college_students.id) the tutor picked. */
  learners: Array<{ id: string; name: string }>;
  /** Which list they came from: "behind on hours", "Level 3 Year 2"… */
  groupLabel?: string;
  scope: 'mine' | 'college';
  /** Template to start on (the filter they came from). */
  suggested?: TemplateId;
  /** First name to sign off with. */
  signOff: string;
  onSent?: (result: GroupSendResult) => void;
}

type Step = 'write' | 'confirm' | 'sent';

interface Planned {
  figures: GroupFigures;
  rendered: Rendered;
  /** Why this learner is held back, or null when they get the message. */
  hold: string | null;
}

const LABEL = 'mb-1 block text-[12px] font-medium text-white';
const FIELD =
  'input-underline w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white placeholder:opacity-50 hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation';
const PANEL =
  'card-surface -mx-4 !rounded-none !border-x-0 !border-y !border-white/[0.08] p-4 sm:mx-0 sm:!rounded-2xl sm:!border sm:p-5';
const pickCn = (on: boolean) =>
  cn(
    'inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-3.5 text-[13px] text-white transition-colors touch-manipulation',
    on
      ? 'border-elec-yellow font-semibold'
      : 'border-white/[0.14] font-medium hover:border-white/[0.3]'
  );

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

export function GroupMessageSheet({
  open,
  onOpenChange,
  learners,
  groupLabel,
  scope,
  suggested = 'general',
  signOff,
  onSent,
}: GroupMessageSheetProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('write');
  const [templateId, setTemplateId] = useState<TemplateId>(suggested);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [cursor, setCursor] = useState(0);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<GroupSendResult | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const tooMany = learners.length > GROUP_MESSAGE_MAX;
  const ids = useMemo(() => learners.map((l) => l.id).sort(), [learners]);

  const figuresQuery = useQuery({
    queryKey: ['college-group-message-figures', ids],
    queryFn: () => fetchGroupFigures(ids),
    enabled: open && ids.length > 0 && !tooMany,
    staleTime: 30_000,
  });

  // A fresh start each time the sheet opens.
  useEffect(() => {
    if (!open) return;
    const t = TEMPLATES.find((x) => x.id === suggested) ?? TEMPLATES[TEMPLATES.length - 1];
    setStep('write');
    setTemplateId(t.id);
    setSubject(t.subject);
    setBody(t.body(signOff));
    setCursor(0);
    setResult(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const pickTemplate = (id: TemplateId) => {
    const t = TEMPLATES.find((x) => x.id === id);
    if (!t) return;
    setTemplateId(id);
    setSubject(t.subject);
    setBody(t.body(signOff));
    setCursor(0);
  };

  const insertField = (key: string) => {
    const el = bodyRef.current;
    const token = `{${key}}`;
    const start = el?.selectionStart ?? body.length;
    const end = el?.selectionEnd ?? body.length;
    const next = body.slice(0, start) + token + body.slice(end);
    setBody(next);
    requestAnimationFrame(() => {
      if (!el) return;
      el.focus();
      el.setSelectionRange(start + token.length, start + token.length);
    });
  };

  const plan: Planned[] = useMemo(() => {
    const figs = figuresQuery.data ?? [];
    return figs.map((f) => {
      const rendered = renderFor(body, f);
      const subj = renderFor(subject, f);
      const hold = !f.can_message
        ? (SKIP_WORDS[f.skip_reason ?? ''] ?? 'Cannot be messaged')
        : rendered.missing.length || subj.missing.length
          ? `Held back: ${[...rendered.missing, ...subj.missing].join(', ')}`
          : null;
      return { figures: f, rendered, hold };
    });
  }, [figuresQuery.data, body, subject]);

  // Picked but not returned: not visible to this tutor.
  const unseen = useMemo(() => {
    const got = new Set((figuresQuery.data ?? []).map((f) => f.student_id));
    return figuresQuery.data ? learners.filter((l) => !got.has(l.id)) : [];
  }, [figuresQuery.data, learners]);

  const sendable = plan.filter((p) => !p.hold);
  const held = plan.filter((p) => p.hold);
  const unknown = useMemo(
    () => [...new Set([...renderFor(body, EMPTY).unknown, ...renderFor(subject, EMPTY).unknown])],
    [body, subject]
  );
  // The general note starts as a greeting and a sign-off: nothing to send yet.
  const general = TEMPLATES.find((t) => t.id === 'general');
  const bodyEmpty = !body.trim() || (!!general && body.trim() === general.body(signOff).trim());
  const canReview =
    !tooMany && sendable.length > 0 && unknown.length === 0 && !!subject.trim() && !bodyEmpty;

  const current = plan[Math.min(cursor, Math.max(plan.length - 1, 0))];

  const send = async () => {
    if (sending) return;
    setSending(true);
    try {
      const res = await sendGroupMessage(
        subject.trim(),
        sendable.map((p) => ({ student_id: p.figures.student_id, body: p.rendered.text })),
        scope
      );
      setResult(res);
      setStep('sent');
      onSent?.(res);
      toast({
        title: res.sent === 1 ? 'Message sent' : `${res.sent} messages sent`,
        description: 'Each learner has it in their messages, with a notification.',
      });
    } catch (e) {
      toast({
        title: 'Nothing was sent',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  const nameOf = (id: string) =>
    plan.find((p) => p.figures.student_id === id)?.figures.name ??
    learners.find((l) => l.id === id)?.name ??
    'Learner';

  /* ── Steps ─────────────────────────────────────────────────────────── */

  const writeBody = (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
      <div className="min-w-0 space-y-5">
        <div>
          <span className={LABEL}>Start from</span>
          <div
            role="group"
            aria-label="Templates"
            className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={templateId === t.id}
                onClick={() => pickTemplate(t.id)}
                className={pickCn(templateId === t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="gm-subject" className={LABEL}>
            Subject
          </label>
          <input
            id="gm-subject"
            value={subject}
            maxLength={120}
            onChange={(e) => setSubject(e.target.value)}
            className={cn(FIELD, 'h-11')}
          />
        </div>

        <div>
          <label htmlFor="gm-body" className={LABEL}>
            Message
          </label>
          <textarea
            id="gm-body"
            ref={bodyRef}
            value={body}
            maxLength={3500}
            rows={12}
            onChange={(e) => setBody(e.target.value)}
            className={cn(FIELD, 'min-h-[220px] resize-y py-2 leading-relaxed')}
          />
          {unknown.length > 0 && (
            <p className="mt-2 text-[13px] font-medium text-orange-300">
              {unknown.join(', ')} {unknown.length === 1 ? 'is not a field' : 'are not fields'}.
              Pick one from the list below.
            </p>
          )}
        </div>

        <div>
          <span className={LABEL}>Put in their own figure</span>
          <div className="flex flex-wrap gap-2">
            {MERGE_FIELDS.map((m) => (
              <button
                key={m.key}
                type="button"
                title={m.hint}
                onClick={() => insertField(m.key)}
                className="inline-flex h-11 items-center rounded-full border border-white/[0.14] px-3 text-[12.5px] font-medium text-white touch-manipulation hover:border-white/[0.3]"
              >
                {m.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[12px] leading-snug text-white">
            Each one is filled in from that learner's own record when you send. Anyone missing a
            figure the message needs is held back, so nobody gets a message with a gap in it.
          </p>
        </div>
      </div>

      <div className="min-w-0 space-y-4">
        <section className={PANEL} aria-label="Preview">
          {figuresQuery.isLoading ? (
            <p className="text-[13px] text-white">Reading each learner's figures…</p>
          ) : figuresQuery.error ? (
            <p className="text-[13px] font-medium text-orange-300">
              Could not read their figures: {(figuresQuery.error as Error).message}
            </p>
          ) : !current ? (
            <p className="text-[13px] text-white">Nobody to preview.</p>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-elec-yellow">
                    Preview · {Math.min(cursor, plan.length - 1) + 1} of {plan.length}
                  </p>
                  <p className="mt-1 truncate text-[15px] font-semibold text-white">
                    {current.figures.name}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    aria-label="Previous learner"
                    disabled={cursor <= 0}
                    onClick={() => setCursor((c) => Math.max(0, c - 1))}
                    className={cn(COLLEGE_BTN, 'w-11 px-0')}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Next learner"
                    disabled={cursor >= plan.length - 1}
                    onClick={() => setCursor((c) => Math.min(plan.length - 1, c + 1))}
                    className={cn(COLLEGE_BTN, 'w-11 px-0')}
                  >
                    ›
                  </button>
                </div>
              </div>
              <div>
                {current.hold ? (
                  <StatusChip tone="action">{current.hold}</StatusChip>
                ) : (
                  <StatusChip tone="done">Will be sent</StatusChip>
                )}
              </div>
              <div className="border-t border-white/[0.08] pt-4">
                <p className="text-[12px] font-medium text-white">
                  Subject: <span className="font-semibold">{subject.trim() || 'No subject'}</span>
                </p>
                <div
                  data-testid="group-message-preview"
                  className="mt-3 whitespace-pre-wrap break-words text-[14px] leading-relaxed text-white"
                >
                  {current.rendered.segments.map((s, i) =>
                    s.field ? (
                      <span
                        key={i}
                        className="font-semibold underline decoration-elec-yellow decoration-2 underline-offset-4"
                      >
                        {s.text}
                      </span>
                    ) : (
                      <span key={i}>{s.text}</span>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {!figuresQuery.isLoading && (held.length > 0 || unseen.length > 0) && (
          <section className={PANEL} aria-label="Held back">
            <h3 className="text-[14px] font-semibold text-white">
              {plural(held.length + unseen.length, 'learner')} will not get this
            </h3>
            <ul className="mt-2 space-y-2">
              {held.map((p) => (
                <li key={p.figures.student_id} className="text-[13px] leading-snug text-white">
                  <span className="font-semibold">{p.figures.name}</span>: {p.hold}
                </li>
              ))}
              {unseen.map((l) => (
                <li key={l.id} className="text-[13px] leading-snug text-white">
                  <span className="font-semibold">{l.name}</span>: not on a roll you can see
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );

  const confirmBody = (
    <div className="mx-auto max-w-2xl space-y-5">
      <section className={PANEL}>
        <h3 className="text-[18px] font-semibold tracking-tight text-white">
          This sends {plural(sendable.length, 'private message')}
        </h3>
        <p className="mt-2 text-[13px] leading-snug text-white">
          Each learner gets their own message, with their own figures, in their messages in the app,
          plus a notification. They see it as a new conversation from you called "{subject.trim()}"
          and can reply to you there. Nobody sees anyone else's.
        </p>
        <ul className="mt-4 divide-y divide-white/[0.06] border-t border-white/[0.08]">
          {sendable.map((p) => (
            <li
              key={p.figures.student_id}
              className="flex min-h-[44px] items-center text-[14px] text-white"
            >
              {p.figures.name}
            </li>
          ))}
        </ul>
      </section>
      {(held.length > 0 || unseen.length > 0) && (
        <p className="text-[13px] leading-snug text-white">
          {plural(held.length + unseen.length, 'learner')} held back:{' '}
          {[...held.map((p) => p.figures.name), ...unseen.map((l) => l.name)].join(', ')}.
        </p>
      )}
    </div>
  );

  const sentBody = result && (
    <div className="mx-auto max-w-2xl space-y-5">
      <section className={PANEL}>
        <h3 className="text-[18px] font-semibold tracking-tight text-white">
          {result.sent === 1 ? '1 message sent' : `${result.sent} messages sent`}
        </h3>
        <p className="mt-2 text-[13px] leading-snug text-white">
          {result.skipped + held.length + unseen.length > 0
            ? `${plural(result.skipped + held.length + unseen.length, 'learner')} not messaged. `
            : ''}
          Each message is on that learner's Student 360 under messages, and their replies come to
          you.
        </p>
        <ul className="mt-4 divide-y divide-white/[0.06] border-t border-white/[0.08]">
          {result.threads.map((t) => (
            <li key={t.thread_id}>
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  navigate(`/college?section=student360&studentId=${t.student_id}#messages`);
                }}
                className="flex min-h-[44px] w-full items-center justify-between gap-3 text-left text-[14px] text-white touch-manipulation"
              >
                <span>{nameOf(t.student_id)}</span>
                <span className="text-[13px] font-semibold text-elec-yellow">Open</span>
              </button>
            </li>
          ))}
          {result.skipped_learners.map((s) => (
            <li
              key={s.student_id}
              className="flex min-h-[44px] items-center text-[14px] text-white"
            >
              {nameOf(s.student_id)}: {SKIP_WORDS[s.reason] ?? 'not sent'}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );

  const footer =
    step === 'write' ? (
      <button
        type="button"
        disabled={!canReview}
        onClick={() => setStep('confirm')}
        className={cn(COLLEGE_BTN_PRIMARY, 'w-full')}
      >
        {sendable.length > 0
          ? `Review ${plural(sendable.length, 'message')}`
          : 'Nobody to send to yet'}
      </button>
    ) : step === 'confirm' ? (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setStep('write')}
          disabled={sending}
          className={cn(COLLEGE_BTN, 'flex-1')}
        >
          Back
        </button>
        <button
          type="button"
          onClick={send}
          disabled={sending || sendable.length === 0}
          className={cn(COLLEGE_BTN_PRIMARY, 'flex-[2]')}
        >
          {sending ? 'Sending…' : `Send ${plural(sendable.length, 'message')}`}
        </button>
      </div>
    ) : (
      <button
        type="button"
        onClick={() => onOpenChange(false)}
        className={cn(COLLEGE_BTN_PRIMARY, 'w-full')}
      >
        Done
      </button>
    );

  const who = groupLabel
    ? `${plural(learners.length, 'learner')}, ${groupLabel}`
    : plural(learners.length, 'learner');

  return (
    <FormSheet
      open={open}
      onOpenChange={(o) => {
        if (sending) return;
        onOpenChange(o);
      }}
      eyebrow="Group message"
      title={
        step === 'sent' ? 'Sent' : step === 'confirm' ? 'Check before sending' : `Message ${who}`
      }
      description={
        step === 'write'
          ? 'One message, written once, filled in with each learner’s own figures. Step through the preview to read exactly what each person gets.'
          : undefined
      }
      width="wide"
      footer={tooMany ? undefined : footer}
    >
      {tooMany ? (
        <section className={PANEL}>
          <h3 className="text-[15px] font-semibold text-white">
            Up to {GROUP_MESSAGE_MAX} learners at a time
          </h3>
          <p className="mt-2 text-[13px] leading-snug text-white">
            You picked {learners.length}. Narrow the list with a cohort or status chip, or select
            the learners you want, then try again.
          </p>
        </section>
      ) : step === 'write' ? (
        writeBody
      ) : step === 'confirm' ? (
        confirmBody
      ) : (
        sentBody
      )}
    </FormSheet>
  );
}

/** Figures with nothing in them, used only to spot unknown {fields}. */
const EMPTY: GroupFigures = {
  student_id: '',
  name: '',
  first_name: '',
  status: null,
  has_account: false,
  can_message: false,
  skip_reason: null,
  hours_counted: null,
  hours_planned_by_now: null,
  hours_behind: null,
  hours_required: null,
  otj_risk: null,
  criteria_passed: null,
  criteria_total: null,
  criteria_sent_back: null,
  next_review_date: null,
  next_review_kind: null,
  attendance_last_4_weeks: null,
  sessions_last_4_weeks: 0,
  sessions_missed_last_4_weeks: 0,
};
