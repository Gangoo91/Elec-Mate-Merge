import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import {
  useCalibrationSessions,
  useCalibrationSession,
  type CalibrationGrade,
  type CalibrationSampleKind,
} from '@/hooks/useCalibrationSessions';
import { CalibrationDriftCard } from '@/components/college/CalibrationDriftCard';

/* ==========================================================================
   CalibrationSessionSheet — three modes:
     1. List existing sessions in this college
     2. Create a new one (HoD posts an anonymised brief + optional reference)
     3. View / respond to a session (tutors submit, modal grade + agreement
        revealed after submit so judgement isn't anchored)
   One bottom sheet (the FormSheet look, wide on desktop); the three views
   swap inside it so moving between them doesn't close and reopen the sheet.
   ========================================================================== */

const SAMPLE_KINDS: { value: CalibrationSampleKind; label: string }[] = [
  { value: 'portfolio_evidence', label: 'Portfolio evidence' },
  { value: 'mock_recording', label: 'Mock recording' },
  { value: 'practical_observation', label: 'Practical observation' },
  { value: 'professional_discussion', label: 'Professional discussion' },
  { value: 'knowledge_review', label: 'Knowledge review' },
];

const GRADES: { value: CalibrationGrade; label: string }[] = [
  { value: 'distinction', label: 'Distinction' },
  { value: 'merit', label: 'Merit' },
  { value: 'pass', label: 'Pass' },
  { value: 'fail', label: 'Fail / not yet' },
];

type View = { kind: 'list' } | { kind: 'create' } | { kind: 'detail'; id: string };

export function CalibrationSessionSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [view, setView] = useState<View>({ kind: 'list' });

  useEffect(() => {
    if (open) setView({ kind: 'list' });
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0"
      >
        {view.kind === 'list' && (
          <ListView
            onCreate={() => setView({ kind: 'create' })}
            onOpen={(id) => setView({ kind: 'detail', id })}
            onClose={() => onOpenChange(false)}
          />
        )}
        {view.kind === 'create' && (
          <CreateView
            onBack={() => setView({ kind: 'list' })}
            onCreated={(id) => setView({ kind: 'detail', id })}
          />
        )}
        {view.kind === 'detail' && (
          <DetailView id={view.id} onBack={() => setView({ kind: 'list' })} />
        )}
      </SheetContent>
    </Sheet>
  );
}

/* ── Shell: FormSheet's inner column (handle → header → body → footer), wide ── */

const INNER = 'mx-auto w-full max-w-2xl lg:max-w-[88rem]';

function Shell({
  eyebrow,
  title,
  description,
  footer,
  bodyClassName,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto mt-3 h-1 w-12 shrink-0 rounded-full bg-white/15" aria-hidden />
      <div className="shrink-0 px-4 sm:px-6 lg:px-10">
        <div className={INNER}>
          <SheetHeader className="pb-4 pt-2">
            <SheetTitle className="min-w-0 text-left">
              <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                {eyebrow}
              </span>
              <span className="mt-1 block text-[20px] font-semibold leading-tight tracking-tight text-white sm:text-[24px]">
                {title}
              </span>
            </SheetTitle>
            {description ? (
              <SheetDescription className="text-left text-[13px] leading-snug text-white">{description}</SheetDescription>
            ) : (
              <SheetDescription className="sr-only">{typeof title === 'string' ? title : eyebrow}</SheetDescription>
            )}
          </SheetHeader>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6 sm:px-6 lg:px-10">
        <div className={cn(INNER, bodyClassName ?? 'space-y-5')}>{children}</div>
      </div>
      {footer ? (
        <div
          className="shrink-0 border-t border-white/[0.08] bg-[hsl(0_0%_8%)] px-4 py-3 sm:px-6 lg:px-10"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <div className={cn(INNER, 'lg:[&>*]:ml-auto lg:[&>*]:max-w-lg')}>{footer}</div>
        </div>
      ) : null}
    </div>
  );
}

/** A plain section: white heading over a hairline. */
function Section({
  title,
  aside,
  top,
  children,
}: {
  title: string;
  aside?: ReactNode;
  top?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        'space-y-4 border-t border-white/[0.1] pt-4 first:border-t-0 first:pt-0',
        top && 'lg:border-t-0 lg:pt-0'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">{title}</h3>
        {aside}
      </div>
      {children}
    </section>
  );
}

const hintCn = 'mt-1.5 text-[12px] leading-relaxed text-white';
const sampleLabel = (k: string) => SAMPLE_KINDS.find((s) => s.value === k)?.label ?? k.replace(/_/g, ' ');
const gradeLabel = (g: string) => GRADES.find((x) => x.value === g)?.label ?? g;

function ListView({
  onCreate,
  onOpen,
  onClose,
}: {
  onCreate: () => void;
  onOpen: (id: string) => void;
  onClose: () => void;
}) {
  const { sessions, loading } = useCalibrationSessions();
  return (
    <Shell
      eyebrow="Inter-rater calibration"
      title="Calibration sessions"
      description="Post an anonymised sample. Every tutor marks it on their own. The hub shows agreement and the most common grade, so outliers stand out."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-7 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={onClose} className={buttonSecondaryCn}>
            Close
          </button>
          <button type="button" onClick={onCreate} className={buttonPrimaryCn}>
            New session
          </button>
        </div>
      }
    >
      <Section top title="Sessions">
        {loading && <p className="text-[13px] text-white">Loading…</p>}
        {!loading && sessions.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/[0.14] px-5 py-8 text-center text-[13px] leading-relaxed text-white">
            No calibration sessions yet. Posting one is the quickest way to see whether your team grade
            consistently.
          </div>
        )}
        {!loading && sessions.length > 0 && (
          <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]">
            {sessions.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onOpen(s.id)}
                  className="flex min-h-[64px] w-full items-center gap-3 px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-semibold text-white">{s.title}</div>
                    <div className="mt-0.5 text-[12px] text-white">
                      {sampleLabel(s.sample_kind)}
                      {s.reference_grade && <> · Reference {gradeLabel(s.reference_grade).toLowerCase()}</>}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-0.5 text-right">
                    <span
                      className={cn(
                        'text-[12px] font-semibold capitalize',
                        s.status === 'open' ? 'text-emerald-300' : 'text-white'
                      )}
                    >
                      {s.status}
                    </span>
                    {s.response_count != null && (
                      <span className="text-[12px] tabular-nums text-white">
                        {s.response_count} response{s.response_count === 1 ? '' : 's'}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Section>
      <div className="space-y-5">
        <CalibrationDriftCard />
        <Section top title="How it works">
          <ol className="space-y-3 text-[13px] leading-relaxed text-white">
            <li>
              <span className="font-semibold">1. Post a sample.</span> An anonymised piece of work, with the grade you
              think it deserves if you want a target.
            </li>
            <li>
              <span className="font-semibold">2. Every tutor marks it alone.</span> Nobody sees the others' grades until
              they have submitted their own.
            </li>
            <li>
              <span className="font-semibold">3. Compare.</span> Agreement, the most common grade and each tutor's
              reasoning show where marking drifts.
            </li>
          </ol>
        </Section>
      </div>
    </Shell>
  );
}

function CreateView({
  onBack,
  onCreated,
}: {
  onBack: () => void;
  onCreated: (id: string) => void;
}) {
  const { toast } = useToast();
  const { create } = useCalibrationSessions();
  const [title, setTitle] = useState('');
  const [kind, setKind] = useState<CalibrationSampleKind>('portfolio_evidence');
  const [brief, setBrief] = useState('');
  const [reference, setReference] = useState<CalibrationGrade | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      toast({ title: 'Add a title', variant: 'destructive' });
      return;
    }
    if (!brief.trim()) {
      toast({ title: 'Paste the anonymised brief', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const created = await create({
        title,
        sample_kind: kind,
        anonymised_brief: brief,
        reference_grade: reference,
      });
      if (created) {
        toast({ title: 'Session posted' });
        onCreated(created.id);
      }
    } catch (e) {
      toast({
        title: 'Could not create session',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Shell
      eyebrow="New session"
      title="Post a calibration brief"
      description="Strip identifying details. Tutors mark it cold and only see the agreement figures after they submit, so nobody's judgement is anchored."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-7 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={onBack} disabled={saving} className={buttonSecondaryCn}>
            Back
          </button>
          <button type="button" onClick={handleSave} disabled={saving} className={buttonPrimaryCn}>
            {saving ? 'Posting…' : 'Post session'}
          </button>
        </div>
      }
    >
      <Section top title="The sample">
        <div>
          <label htmlFor="cal-title" className={labelCn}>
            Title
          </label>
          <input
            id="cal-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Q2 portfolio sample, anonymous learner"
            className={inputCn}
          />
        </div>
        <div>
          <span className={labelCn}>Sample type</span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SAMPLE_KINDS.map((s) => (
              <button
                key={s.value}
                type="button"
                aria-pressed={kind === s.value}
                onClick={() => setKind(s.value)}
                className={cn(chipBase, 'px-2 text-[13px] leading-tight', kind === s.value ? chipOn : chipOff)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="cal-brief" className={labelCn}>
            Anonymised brief
          </label>
          <textarea
            id="cal-brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows={9}
            placeholder="Paste the sample tutors will mark. Remove any identifying details first."
            className={cn(textareaCn, 'min-h-[180px]')}
          />
        </div>
      </Section>

      <Section top title="Reference grade (optional)">
        <p className="-mt-2 text-[13px] leading-relaxed text-white">
          The grade you think this sample deserves. Used as the calibration target once tutors have submitted.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            aria-pressed={reference === null}
            onClick={() => setReference(null)}
            className={cn(chipBase, 'col-span-2 px-3', reference === null ? chipOn : chipOff)}
          >
            No reference, blind calibration
          </button>
          {GRADES.map((g) => (
            <button
              key={g.value}
              type="button"
              aria-pressed={reference === g.value}
              onClick={() => setReference(g.value)}
              className={cn(chipBase, 'px-3', reference === g.value ? chipOn : chipOff)}
            >
              {g.label}
            </button>
          ))}
        </div>
      </Section>
    </Shell>
  );
}

function DetailView({ id, onBack }: { id: string; onBack: () => void }) {
  const { toast } = useToast();
  const { session, responses, stats, loading, submit, myResponse, me } = useCalibrationSession(id);
  const { close } = useCalibrationSessions();

  const [grade, setGrade] = useState<CalibrationGrade>('pass');
  const [score, setScore] = useState('');
  const [rationale, setRationale] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (myResponse) {
      setGrade(myResponse.predicted_grade);
      setScore(myResponse.predicted_score != null ? String(myResponse.predicted_score) : '');
      setRationale(myResponse.rationale ?? '');
    }
  }, [myResponse]);

  const revealedAfterSubmit = !!myResponse;

  const handleSubmit = async () => {
    if (!rationale.trim()) {
      toast({
        title: 'Add rationale',
        description: 'Calibration is more useful when tutors share the reasoning.',
        variant: 'destructive',
      });
      return;
    }
    setSubmitting(true);
    try {
      const parsedScore = score.trim() ? Math.max(0, Math.min(100, Math.round(Number(score)))) : null;
      await submit({
        predicted_grade: grade,
        predicted_score: Number.isFinite(parsedScore as number) ? parsedScore : null,
        rationale: rationale.trim(),
      });
      toast({ title: 'Verdict submitted' });
    } catch (e) {
      toast({
        title: 'Could not submit',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = async () => {
    try {
      await close(id);
      toast({ title: 'Session closed' });
      onBack();
    } catch (e) {
      toast({
        title: 'Could not close session',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  const grades: CalibrationGrade[] = ['distinction', 'merit', 'pass', 'fail'];
  const max = useMemo(
    () => Math.max(1, ...grades.map((g) => stats.breakdown[g])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stats]
  );

  if (loading || !session) {
    return (
      <Shell
        eyebrow="Calibration"
        title="Loading…"
        footer={
          <button type="button" onClick={onBack} className={cn(buttonSecondaryCn, 'w-full')}>
            Back
          </button>
        }
      >
        <div className="h-32 animate-pulse rounded-2xl bg-white/[0.04]" />
      </Shell>
    );
  }

  const isOwner = !!session && !!me && session.created_by === me;

  return (
    <Shell
      eyebrow={`${sampleLabel(session.sample_kind)} · ${session.status}`}
      title={session.title}
      description="Read the brief, then submit your grade. The agreement figures appear once you have submitted."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
      footer={
        <div className={cn('grid gap-2.5', session.status === 'open' ? 'grid-cols-2' : 'grid-cols-1')}>
          <button type="button" onClick={onBack} disabled={submitting} className={buttonSecondaryCn}>
            Back
          </button>
          {session.status === 'open' && (
            <button type="button" onClick={handleSubmit} disabled={submitting} className={buttonPrimaryCn}>
              {submitting ? 'Submitting…' : myResponse ? 'Update verdict' : 'Submit verdict'}
            </button>
          )}
        </div>
      }
    >
      <Section top title="Anonymised brief">
        <p className="whitespace-pre-wrap rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-4 text-[14px] leading-relaxed text-white sm:px-5">
          {session.anonymised_brief}
        </p>
      </Section>

      <div className="space-y-7 border-t border-white/[0.1] pt-5 lg:border-t-0 lg:pt-0">
        {session.status === 'open' && (
          <Section title="Your verdict">
            <div className="grid grid-cols-2 gap-2">
              {GRADES.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  aria-pressed={grade === g.value}
                  onClick={() => setGrade(g.value)}
                  className={cn(chipBase, 'px-3', grade === g.value ? chipOn : chipOff)}
                >
                  {g.label}
                </button>
              ))}
            </div>
            <div>
              <label htmlFor="cal-score" className={labelCn}>
                Score (optional, 0–100)
              </label>
              <input
                id="cal-score"
                type="number"
                inputMode="numeric"
                min={0}
                max={100}
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className={cn(inputCn, 'tabular-nums')}
              />
            </div>
            <div>
              <label htmlFor="cal-rationale" className={labelCn}>
                Rationale
              </label>
              <textarea
                id="cal-rationale"
                value={rationale}
                onChange={(e) => setRationale(e.target.value)}
                rows={4}
                placeholder="What swung your grade? Key evidence, regulations cited, behaviours observed."
                className={textareaCn}
              />
              <p className={hintCn}>Shared with the other tutors once they have submitted too.</p>
            </div>
          </Section>
        )}

        {/* Stats: only visible once submitted (avoids anchoring) */}
        {revealedAfterSubmit && (
          <Section
            title="Team agreement"
            aside={
              <span className="text-[12px] tabular-nums text-white">
                {stats.responseCount} response{stats.responseCount === 1 ? '' : 's'}
              </span>
            }
          >
            <dl className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                <dt className="text-[12px] text-white">Most common grade</dt>
                <dd className="mt-1 text-[20px] font-semibold capitalize text-white">{stats.modalGrade ?? '—'}</dd>
                <dd className="mt-0.5 text-[12px] tabular-nums text-white">{stats.agreementPct}% agreement</dd>
              </div>
              {session.reference_grade && (
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                  <dt className="text-[12px] text-white">Reference match</dt>
                  <dd className="mt-1 text-[20px] font-semibold tabular-nums text-emerald-300">
                    {stats.referenceMatchPct ?? 0}%
                  </dd>
                  <dd className="mt-0.5 text-[12px] text-white">Target: {gradeLabel(session.reference_grade).toLowerCase()}</dd>
                </div>
              )}
            </dl>

            <div className="space-y-2">
              {grades.map((g) => {
                const count = stats.breakdown[g];
                const width = Math.round((count / max) * 100);
                const isModal = stats.modalGrade === g;
                return (
                  <div key={g} className="flex items-center gap-3">
                    <div className="w-24 text-[12.5px] capitalize text-white">{g}</div>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className={cn('h-full rounded-full', isModal ? 'bg-elec-yellow' : 'bg-white/40')}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <div className="w-6 text-right text-[12.5px] tabular-nums text-white">{count}</div>
                  </div>
                );
              })}
            </div>

            {responses.length > 0 && (
              <div className="border-t border-white/[0.08] pt-4">
                <h4 className="mb-2 text-[13px] font-semibold text-white">Each tutor's reasoning</h4>
                <ul className="divide-y divide-white/[0.06]">
                  {responses.map((r) => (
                    <li key={r.id} className="py-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[13px] font-semibold text-white">{r.tutor_name ?? 'Tutor'}</span>
                        <span className="text-[12.5px] font-semibold capitalize text-elec-yellow">
                          {r.predicted_grade}
                          {r.predicted_score != null && (
                            <span className="ml-1 font-normal tabular-nums text-white">({r.predicted_score})</span>
                          )}
                        </span>
                      </div>
                      {r.rationale && (
                        <p className="mt-1 whitespace-pre-wrap text-[13px] leading-snug text-white">{r.rationale}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Section>
        )}

        {session.status === 'open' && isOwner && (
          <button type="button" onClick={handleClose} className={cn(buttonSecondaryCn, 'w-full')}>
            Close this session
          </button>
        )}
      </div>
    </Shell>
  );
}
