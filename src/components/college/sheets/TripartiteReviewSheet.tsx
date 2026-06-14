import { useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  PrimaryButton,
  SecondaryButton,
  SheetShell,
  Pill,
  type Tone,
} from '@/components/college/primitives';
import {
  useTripartiteReviews,
  type TripartiteReview,
  type AgendaItem,
} from '@/hooks/useTripartiteReviews';
import { cn } from '@/lib/utils';

/* ==========================================================================
   TripartiteReviewSheet — schedule, edit + e-sign 3-way reviews.
   ELE-930 (J1). Apprentice + tutor + employer.
   ========================================================================== */

type Mode = 'list' | 'new' | 'edit';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName: string;
  collegeId: string;
}

const STATUS_TONE: Record<string, Tone> = {
  scheduled: 'blue',
  in_progress: 'amber',
  completed: 'emerald',
  cancelled: 'red',
  no_show: 'red',
};

const DEFAULT_AGENDA: AgendaItem[] = [
  { topic: 'Progress since last review', owner: 'tutor', time_minutes: 10 },
  { topic: 'OTJ hours + workplace evidence', owner: 'employer', time_minutes: 15 },
  { topic: "Learner's view + concerns", owner: 'apprentice', time_minutes: 10 },
  { topic: 'ILP review + next-step targets', owner: 'tutor', time_minutes: 15 },
  { topic: 'Wellbeing + safeguarding check', owner: 'tutor', time_minutes: 5 },
  { topic: 'Agreed actions + sign-off', owner: 'all', time_minutes: 5 },
];

export function TripartiteReviewSheet({
  open,
  onOpenChange,
  studentId,
  studentName,
  collegeId,
}: Props) {
  const { reviews, loading, create, update, sign, refetch } = useTripartiteReviews(studentId);
  const { profile } = useAuth();
  const { toast } = useToast();
  const [mode, setMode] = useState<Mode>('list');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setMode('list');
      setEditingId(null);
    }
  }, [open]);

  const editing = useMemo(
    () => (editingId ? reviews.find((r) => r.id === editingId) ?? null : null),
    [editingId, reviews]
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideCloseButton side="bottom" className="h-[92vh] p-0 rounded-t-2xl overflow-hidden">
        <SheetShell
          title="Tripartite reviews"
          subtitle={
            mode === 'new'
              ? `Schedule a new 3-way review for ${studentName}`
              : mode === 'edit' && editing
                ? `Edit review · ${new Date(editing.scheduled_at || editing.created_at).toLocaleDateString('en-GB')}`
                : `Apprentice + tutor + employer reviews for ${studentName}`
          }
          onClose={() => onOpenChange(false)}
        >
          {mode === 'list' && (
            <ReviewList
              loading={loading}
              reviews={reviews}
              onNew={() => setMode('new')}
              onEdit={(id) => {
                setEditingId(id);
                setMode('edit');
              }}
            />
          )}

          {mode === 'new' && (
            <ReviewForm
              studentId={studentId}
              collegeId={collegeId}
              onCancel={() => setMode('list')}
              onSaved={async () => {
                await refetch();
                setMode('list');
                toast({ title: 'Review scheduled' });
              }}
              create={create}
            />
          )}

          {mode === 'edit' && editing && (
            <ReviewEditor
              review={editing}
              currentUserName={profile?.full_name ?? profile?.email ?? 'You'}
              onCancel={() => {
                setEditingId(null);
                setMode('list');
              }}
              onSave={async (patch) => {
                await update(editing.id, patch);
                toast({ title: 'Saved' });
              }}
              onSign={async (party, name) => {
                await sign(editing.id, party, name);
                toast({ title: `${party} signature recorded` });
              }}
              onMarkComplete={async () => {
                await update(editing.id, { status: 'completed' });
                toast({ title: 'Review marked complete' });
                setEditingId(null);
                setMode('list');
              }}
            />
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

function ReviewList({
  loading,
  reviews,
  onNew,
  onEdit,
}: {
  loading: boolean;
  reviews: TripartiteReview[];
  onNew: () => void;
  onEdit: (id: string) => void;
}) {
  return (
    <div className="px-5 py-4 overflow-y-auto">
      <div className="flex justify-end mb-4">
        <PrimaryButton onClick={onNew}>+ Schedule review</PrimaryButton>
      </div>

      {loading && <div className="text-sm text-white/60">Loading…</div>}

      {!loading && reviews.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center text-sm text-white/70">
          No tripartite reviews scheduled yet. Click <strong>Schedule review</strong> to start one.
        </div>
      )}

      {!loading && reviews.length > 0 && (
        <ul className="space-y-2">
          {reviews.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => onEdit(r.id)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/[0.08] touch-manipulation transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white">
                      {r.scheduled_at
                        ? new Date(r.scheduled_at).toLocaleString('en-GB', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'Unscheduled'}
                    </div>
                    <div className="mt-1 text-xs text-white/60">
                      {r.location || 'No location set'} · {r.duration_minutes ?? 60} min
                      {r.employer_contact_name ? ` · ${r.employer_contact_name}` : ''}
                    </div>
                  </div>
                  <Pill tone={STATUS_TONE[r.status] || 'blue'}>{r.status.replace('_', ' ')}</Pill>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ReviewForm({
  studentId,
  collegeId,
  onCancel,
  onSaved,
  create,
}: {
  studentId: string;
  collegeId: string;
  onCancel: () => void;
  onSaved: () => Promise<void> | void;
  create: ReturnType<typeof useTripartiteReviews>['create'];
}) {
  const [scheduledAt, setScheduledAt] = useState('');
  const [location, setLocation] = useState('workplace');
  const [meetingUrl, setMeetingUrl] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [employerEmail, setEmployerEmail] = useState('');
  const [employerPhone, setEmployerPhone] = useState('');
  const [duration, setDuration] = useState(60);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!scheduledAt) {
      toast({ title: 'Pick a date + time', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await create({
        college_id: collegeId,
        student_id: studentId,
        scheduled_at: new Date(scheduledAt).toISOString(),
        location,
        meeting_url: meetingUrl.trim() || null,
        employer_contact_name: employerName.trim() || null,
        employer_contact_email: employerEmail.trim() || null,
        employer_contact_phone: employerPhone.trim() || null,
        duration_minutes: duration,
        agenda: DEFAULT_AGENDA,
        outcomes: {},
        signatures: {},
      });
      await onSaved();
    } catch (e) {
      toast({
        title: 'Could not schedule',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-5 py-4 space-y-4 overflow-y-auto">
      <div>
        <label className="text-xs uppercase tracking-wider text-white/50">Date + time</label>
        <Input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-wider text-white/50">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 h-11 w-full rounded-md bg-elec-gray border border-white/30 px-3 text-sm text-white touch-manipulation"
          >
            <option value="workplace">Workplace</option>
            <option value="college">College</option>
            <option value="video">Video call</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-white/50">
            Duration (minutes)
          </label>
          <Input
            type="number"
            min={15}
            max={180}
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value || '60', 10))}
            className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
          />
        </div>
      </div>

      {location === 'video' && (
        <div>
          <label className="text-xs uppercase tracking-wider text-white/50">Meeting URL</label>
          <Input
            value={meetingUrl}
            onChange={(e) => setMeetingUrl(e.target.value)}
            placeholder="https://…"
            className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
          />
        </div>
      )}

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
        <div className="text-xs uppercase tracking-wider text-white/50">Employer contact</div>
        <Input
          placeholder="Name"
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
          className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            type="email"
            placeholder="Email"
            value={employerEmail}
            onChange={(e) => setEmployerEmail(e.target.value)}
            className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
          />
          <Input
            type="tel"
            placeholder="Phone"
            value={employerPhone}
            onChange={(e) => setEmployerPhone(e.target.value)}
            className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
          />
        </div>
      </div>

      <div className="text-xs text-white/70">
        A standard 6-item agenda will be added. You can edit it later when capturing outcomes.
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
        <PrimaryButton onClick={handleSave} disabled={saving}>
          {saving ? 'Scheduling…' : 'Schedule review'}
        </PrimaryButton>
      </div>
    </div>
  );
}

function ReviewEditor({
  review,
  currentUserName,
  onCancel,
  onSave,
  onSign,
  onMarkComplete,
}: {
  review: TripartiteReview;
  currentUserName: string;
  onCancel: () => void;
  onSave: (patch: Partial<TripartiteReview>) => Promise<void>;
  onSign: (party: 'student' | 'tutor' | 'employer', name: string) => Promise<void>;
  onMarkComplete: () => Promise<void>;
}) {
  const [outcomes, setOutcomes] = useState(review.outcomes ?? {});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setOutcomes(review.outcomes ?? {});
  }, [review.id]);

  const setOutcome = (key: string, value: string) => {
    setOutcomes((o) => ({ ...o, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ outcomes });
    } finally {
      setSaving(false);
    }
  };

  const sigs = review.signatures ?? {};

  return (
    <div className="px-5 py-4 space-y-5 overflow-y-auto">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-white/60 flex flex-wrap gap-x-4 gap-y-1">
        <span>
          {review.scheduled_at
            ? new Date(review.scheduled_at).toLocaleString('en-GB')
            : 'Unscheduled'}
        </span>
        <span>·</span>
        <span>{review.location || 'no location'}</span>
        <span>·</span>
        <span>{review.duration_minutes ?? 60} min</span>
        {review.employer_contact_name && (
          <>
            <span>·</span>
            <span>{review.employer_contact_name}</span>
          </>
        )}
      </div>

      <OutcomeField
        label="Summary"
        value={(outcomes.summary as string) ?? ''}
        onChange={(v) => setOutcome('summary', v)}
        placeholder="One paragraph headline from this meeting."
      />
      <OutcomeField
        label="Progress notes"
        value={(outcomes.progress_notes as string) ?? ''}
        onChange={(v) => setOutcome('progress_notes', v)}
      />
      <OutcomeField
        label="ILP updates"
        value={(outcomes.ilp_updates as string) ?? ''}
        onChange={(v) => setOutcome('ilp_updates', v)}
      />
      <OutcomeField
        label="OTJ review"
        value={(outcomes.otj_review as string) ?? ''}
        onChange={(v) => setOutcome('otj_review', v)}
      />
      <OutcomeField
        label="Safeguarding check"
        value={(outcomes.safeguarding_check as string) ?? ''}
        onChange={(v) => setOutcome('safeguarding_check', v)}
      />
      <OutcomeField
        label="Wellbeing check"
        value={(outcomes.wellbeing_check as string) ?? ''}
        onChange={(v) => setOutcome('wellbeing_check', v)}
      />
      <OutcomeField
        label="Concerns"
        value={(outcomes.concerns as string) ?? ''}
        onChange={(v) => setOutcome('concerns', v)}
      />

      {/* Signatures */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
        <div className="text-xs uppercase tracking-wider text-white/50">Signatures</div>
        <SignatureRow
          party="student"
          name={sigs.student_name ?? null}
          signedAt={sigs.student_signed_at ?? null}
          onSign={() => onSign('student', currentUserName)}
        />
        <SignatureRow
          party="tutor"
          name={sigs.tutor_name ?? null}
          signedAt={sigs.tutor_signed_at ?? null}
          onSign={() => onSign('tutor', currentUserName)}
        />
        <SignatureRow
          party="employer"
          name={sigs.employer_name ?? null}
          signedAt={sigs.employer_signed_at ?? null}
          onSign={() => onSign('employer', review.employer_contact_name || 'Employer')}
        />
      </section>

      <div className="flex flex-wrap justify-end gap-2 pt-2">
        <SecondaryButton onClick={onCancel}>Close</SecondaryButton>
        <SecondaryButton onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save notes'}
        </SecondaryButton>
        {review.status !== 'completed' && (
          <PrimaryButton onClick={onMarkComplete}>Mark complete</PrimaryButton>
        )}
      </div>
    </div>
  );
}

function OutcomeField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-white/50">{label}</label>
      <Textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="touch-manipulation text-base border-white/30 focus:border-yellow-500"
      />
    </div>
  );
}

function SignatureRow({
  party,
  name,
  signedAt,
  onSign,
}: {
  party: 'student' | 'tutor' | 'employer';
  name: string | null;
  signedAt: string | null;
  onSign: () => void;
}) {
  const partyLabel = {
    student: 'Apprentice',
    tutor: 'Tutor',
    employer: 'Employer',
  }[party];
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="text-sm text-white">{partyLabel}</div>
        {signedAt ? (
          <div className="text-[11px] text-white/70">
            Signed by {name || 'unknown'} ·{' '}
            {new Date(signedAt).toLocaleString('en-GB', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        ) : (
          <div className="text-[11px] text-white/70">Not yet signed</div>
        )}
      </div>
      {signedAt ? (
        <Pill tone="emerald">Signed</Pill>
      ) : (
        <button
          type="button"
          onClick={onSign}
          className="rounded-lg border border-elec-yellow/40 bg-elec-yellow/10 px-3 py-1.5 text-xs font-semibold text-elec-yellow touch-manipulation"
        >
          Sign now
        </button>
      )}
    </div>
  );
}
