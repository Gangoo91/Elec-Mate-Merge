import { useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Check, Plus, Users, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
} from '@/components/college/primitives';
import { useToast } from '@/hooks/use-toast';
import {
  useCalibrationSessions,
  useCalibrationSession,
  type CalibrationGrade,
  type CalibrationSampleKind,
} from '@/hooks/useCalibrationSessions';

/* ==========================================================================
   CalibrationSessionSheet — three modes:
     1. List existing sessions in this college
     2. Create a new one (HoD posts an anonymised brief + optional reference)
     3. View / respond to a session (tutors submit, modal grade + agreement
        revealed after submit so judgement isn't anchored)
   ========================================================================== */

const SAMPLE_KINDS: { value: CalibrationSampleKind; label: string }[] = [
  { value: 'portfolio_evidence', label: 'Portfolio evidence' },
  { value: 'mock_recording', label: 'Mock recording' },
  { value: 'practical_observation', label: 'Practical observation' },
  { value: 'professional_discussion', label: 'Professional discussion' },
  { value: 'knowledge_review', label: 'Knowledge review' },
];

const GRADES: { value: CalibrationGrade; label: string; tone: string }[] = [
  { value: 'distinction', label: 'Distinction', tone: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200' },
  { value: 'merit', label: 'Merit', tone: 'bg-amber-500/15 border-amber-400/40 text-amber-200' },
  { value: 'pass', label: 'Pass', tone: 'bg-blue-500/15 border-blue-400/40 text-blue-200' },
  { value: 'fail', label: 'Fail / not yet', tone: 'bg-red-500/15 border-red-400/40 text-red-200' },
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
        className="h-[90vh] sm:max-w-3xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
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
    <SheetShell
      eyebrow="Inter-rater calibration"
      title="Calibration sessions"
      description="Post an anonymised sample. Every tutor marks it independently. The hub shows agreement % and the modal grade — outliers become visible."
      footer={
        <>
          <SecondaryButton onClick={onClose} fullWidth>
            Close
          </SecondaryButton>
          <PrimaryButton onClick={onCreate} fullWidth>
            <Plus className="h-3.5 w-3.5 mr-1.5" strokeWidth={3} />
            New session
          </PrimaryButton>
        </>
      }
    >
      {loading && <div className="text-[12.5px] text-white/55">Loading…</div>}
      {!loading && sessions.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/[0.10] px-5 py-8 text-center text-[12.5px] text-white/45 leading-snug">
          No calibration sessions yet. Posting one is the fastest way to see if your team are grading consistently.
        </div>
      )}
      {!loading && sessions.length > 0 && (
        <ul className="space-y-2">
          {sessions.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onOpen(s.id)}
                className="w-full text-left rounded-xl border border-white/[0.08] bg-[hsl(0_0%_12%)] hover:bg-white/[0.04] px-4 py-3 touch-manipulation transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-[13.5px] font-semibold text-white truncate">{s.title}</div>
                    <div className="mt-0.5 text-[10.5px] text-white/55 capitalize">
                      {s.sample_kind.replace(/_/g, ' ')}
                      {s.reference_grade && (
                        <span className="ml-2 text-elec-yellow/85">
                          Ref: <span className="capitalize">{s.reference_grade}</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    {s.response_count != null && (
                      <span className="text-[10.5px] tabular-nums text-white/55">
                        {s.response_count} response{s.response_count === 1 ? '' : 's'}
                      </span>
                    )}
                    <span
                      className={cn(
                        'inline-flex items-center h-5 px-1.5 rounded-md text-[9.5px] font-semibold tracking-[0.06em] uppercase',
                        s.status === 'open'
                          ? 'bg-emerald-500/[0.15] border border-emerald-400/40 text-emerald-200'
                          : 'bg-white/[0.04] border border-white/[0.10] text-white/45'
                      )}
                    >
                      {s.status}
                    </span>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </SheetShell>
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
    <SheetShell
      eyebrow="New session"
      title="Post a calibration brief"
      description="Strip identifying details. Tutors mark it cold — they only see agreement stats after they submit, so judgement isn't anchored."
      footer={
        <>
          <SecondaryButton onClick={onBack} disabled={saving} fullWidth>
            ← Back
          </SecondaryButton>
          <PrimaryButton onClick={handleSave} disabled={saving} fullWidth>
            <Check className="h-3.5 w-3.5 mr-1.5" strokeWidth={3} />
            {saving ? 'Posting…' : 'Post session'}
          </PrimaryButton>
        </>
      }
    >
      <div>
        <Label>Title</Label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Q2 portfolio sample — anon learner"
          className="mt-2 w-full h-11 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white px-3 touch-manipulation"
        />
      </div>

      <div>
        <Label>Sample type</Label>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SAMPLE_KINDS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setKind(s.value)}
              className={cn(
                'h-11 rounded-xl border text-[12px] font-semibold tracking-tight transition-colors touch-manipulation',
                kind === s.value
                  ? 'bg-elec-yellow/[0.08] border-elec-yellow/40 text-white'
                  : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white/70 hover:bg-white/[0.04]'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>Anonymised brief</Label>
        <textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          rows={6}
          placeholder="Paste the sample tutors will mark. Remove any identifying details first."
          className="mt-2 w-full rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white p-3 leading-snug touch-manipulation"
        />
      </div>

      <div>
        <Label>Reference grade (optional)</Label>
        <p className="mt-1 text-[10.5px] text-white/45">
          The grade you think this sample deserves. Used as the calibration target after submissions.
        </p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => setReference(null)}
            className={cn(
              'h-10 rounded-xl border text-[11.5px] font-semibold transition-colors touch-manipulation col-span-4',
              reference === null
                ? 'bg-white/[0.06] border-white/[0.18] text-white'
                : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white/65 hover:bg-white/[0.04]'
            )}
          >
            No reference — blind calibration
          </button>
          {GRADES.map((g) => (
            <button
              key={g.value}
              type="button"
              onClick={() => setReference(g.value)}
              className={cn(
                'h-10 rounded-xl border text-[11.5px] font-semibold transition-colors touch-manipulation',
                reference === g.value
                  ? g.tone
                  : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white/65 hover:bg-white/[0.04]'
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>
    </SheetShell>
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
    [stats]
  );

  if (loading || !session) {
    return (
      <SheetShell
        eyebrow="Calibration"
        title="Loading…"
        description=""
        footer={
          <SecondaryButton onClick={onBack} fullWidth>
            ← Back
          </SecondaryButton>
        }
      >
        <div className="h-32 animate-pulse rounded-xl bg-white/[0.04]" />
      </SheetShell>
    );
  }

  const isOwner = !!session && !!me && session.created_by === me;

  return (
    <SheetShell
      eyebrow={`${session.sample_kind.replace(/_/g, ' ')} · ${session.status}`}
      title={session.title}
      description="Read the brief, then submit your grade. Agreement stats appear once you've submitted."
      footer={
        <>
          <SecondaryButton onClick={onBack} disabled={submitting} fullWidth>
            ← Back
          </SecondaryButton>
          {session.status === 'open' && (
            <PrimaryButton onClick={handleSubmit} disabled={submitting} fullWidth>
              <Check className="h-3.5 w-3.5 mr-1.5" strokeWidth={3} />
              {submitting ? 'Submitting…' : myResponse ? 'Update verdict' : 'Submit verdict'}
            </PrimaryButton>
          )}
        </>
      }
    >
      {/* Brief */}
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2">
          Anonymised brief
        </div>
        <p className="text-[12.5px] text-white/90 leading-snug whitespace-pre-wrap">
          {session.anonymised_brief}
        </p>
      </div>

      {/* Verdict form */}
      {session.status === 'open' && (
        <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4 space-y-3">
          <Label>Your verdict</Label>
          <div className="grid grid-cols-2 gap-2">
            {GRADES.map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => setGrade(g.value)}
                className={cn(
                  'h-11 rounded-xl border text-[12.5px] font-semibold tracking-tight transition-colors touch-manipulation',
                  grade === g.value
                    ? g.tone
                    : 'bg-[hsl(0_0%_10%)] border-white/[0.08] text-white/70 hover:bg-white/[0.04]'
                )}
              >
                {g.label}
              </button>
            ))}
          </div>
          <div>
            <Label>Score (optional, 0–100)</Label>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={100}
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="mt-2 w-full h-10 rounded-lg bg-[hsl(0_0%_10%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white px-3 touch-manipulation tabular-nums"
            />
          </div>
          <div>
            <Label>Rationale</Label>
            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              rows={3}
              placeholder="What specifically swung your grade? Key evidence, regs cited, behaviours observed."
              className="mt-2 w-full rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white p-3 leading-snug touch-manipulation"
            />
          </div>
        </div>
      )}

      {/* Stats — only visible once submitted (avoids anchoring) */}
      {revealedAfterSubmit && (
        <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-purple-200" />
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Cohort agreement
              </div>
            </div>
            <div className="text-[10.5px] text-white/55 tabular-nums">
              {stats.responseCount} response{stats.responseCount === 1 ? '' : 's'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/55">Modal grade</div>
              <div className="mt-1 text-[18px] font-semibold capitalize text-white">
                {stats.modalGrade ?? '—'}
              </div>
              <div className="mt-0.5 text-[10.5px] text-white/55">
                {stats.agreementPct}% agreement
              </div>
            </div>
            {session.reference_grade && (
              <div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-white/55 inline-flex items-center gap-1">
                  <Target className="h-3 w-3" /> Reference match
                </div>
                <div className="mt-1 text-[18px] font-semibold text-emerald-300 tabular-nums">
                  {stats.referenceMatchPct ?? 0}%
                </div>
                <div className="mt-0.5 text-[10.5px] text-white/55 capitalize">
                  Target: {session.reference_grade}
                </div>
              </div>
            )}
          </div>

          {/* Bar chart */}
          <div className="mt-4 space-y-2">
            {grades.map((g) => {
              const count = stats.breakdown[g];
              const width = Math.round((count / max) * 100);
              return (
                <div key={g} className="flex items-center gap-2">
                  <div className="w-20 text-[11px] text-white/70 capitalize">{g}</div>
                  <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className={cn(
                        'h-full',
                        g === 'distinction' && 'bg-emerald-400/70',
                        g === 'merit' && 'bg-amber-400/70',
                        g === 'pass' && 'bg-blue-400/70',
                        g === 'fail' && 'bg-red-400/70'
                      )}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <div className="w-6 text-right text-[11px] tabular-nums text-white/55">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Individual responses */}
          {responses.length > 0 && (
            <div className="mt-4 border-t border-white/[0.04] pt-3">
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/45 mb-2">
                Individual rationales
              </div>
              <ul className="space-y-2">
                {responses.map((r) => (
                  <li key={r.id} className="rounded-lg bg-white/[0.02] p-2.5">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11.5px] font-medium text-white">
                        {r.tutor_name ?? 'Tutor'}
                      </span>
                      <span className="text-[10.5px] font-semibold text-elec-yellow/85 capitalize">
                        {r.predicted_grade}
                        {r.predicted_score != null && (
                          <span className="ml-1 text-white/55 tabular-nums">({r.predicted_score})</span>
                        )}
                      </span>
                    </div>
                    {r.rationale && (
                      <div className="text-[11px] text-white/65 leading-snug whitespace-pre-wrap">
                        {r.rationale}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Close action (owner only, while open) */}
      {session.status === 'open' && isOwner && (
        <SecondaryButton onClick={handleClose} fullWidth>
          Close this session
        </SecondaryButton>
      )}
    </SheetShell>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">{children}</div>
  );
}
