import { useEffect, useState } from 'react';
import { useCollegeSafeguardingReadiness } from '@/hooks/useCollegeSafeguardingReadiness';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOn,
  fieldFullCn,
  grid2Cn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';
import { useToast } from '@/hooks/use-toast';
import { useDraftOneToOne } from '@/hooks/useDraftOneToOne';

export type NoteKind =
  'note' | 'one_to_one' | 'flag' | 'concern' | 'safeguarding' | 'praise' | 'intervention';

type Visibility = 'author_only' | 'tutors' | 'course_lead' | 'safeguarding';

interface OptimisticDraft {
  kind: NoteKind;
  visibility: Visibility;
  title: string | null;
  body: string;
  action_required: string | null;
  action_by_date: string | null;
  author_id: string | null;
  author_name: string | null;
}

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  studentId: string;
  studentName: string;
  defaultKind?: NoteKind;
  onSaved?: () => void;
  /**
   * Optimistic handlers. When provided, the dialog closes immediately on
   * submit and fires the DB write in the background.
   */
  onOptimisticStart?: (draft: OptimisticDraft) => string; // returns a token
  onOptimisticConfirm?: (token: string, serverRow: unknown) => void;
  onOptimisticRollback?: (token: string) => void;
}

const KIND_META: Record<
  NoteKind,
  { label: string; placeholder: string; defaultVisibility: Visibility }
> = {
  note: {
    label: 'Note',
    placeholder: 'Quick observation, context for a colleague, reminder…',
    defaultVisibility: 'tutors',
  },
  one_to_one: {
    label: '1-2-1',
    placeholder: 'What did you discuss? Outcomes? Next steps agreed?',
    defaultVisibility: 'tutors',
  },
  intervention: {
    label: 'Intervention',
    placeholder: 'What action have you taken? Target? Review date?',
    defaultVisibility: 'tutors',
  },
  flag: {
    label: 'Flag',
    placeholder: 'What needs attention from another tutor or lead?',
    defaultVisibility: 'tutors',
  },
  concern: {
    label: 'Concern',
    placeholder: 'What is the concern? When did it start? What have you tried?',
    defaultVisibility: 'course_lead',
  },
  praise: {
    label: 'Praise',
    placeholder: 'What did they do well? Specifics.',
    defaultVisibility: 'tutors',
  },
  safeguarding: {
    label: 'Safeguarding',
    placeholder: 'Record the facts. Use direct quotes where possible. Do not offer opinions.',
    defaultVisibility: 'safeguarding',
  },
};

const KIND_CHIPS: { key: NoteKind; label: string }[] = [
  { key: 'note', label: 'Note' },
  { key: 'one_to_one', label: '1-2-1' },
  { key: 'intervention', label: 'Intervention' },
  { key: 'praise', label: 'Praise' },
  { key: 'flag', label: 'Flag' },
  { key: 'concern', label: 'Concern' },
  { key: 'safeguarding', label: 'Safeguarding' },
];

export function AddPastoralNoteDialog({
  open,
  onOpenChange,
  studentId,
  studentName,
  defaultKind = 'note',
  onSaved,
  onOptimisticStart,
  onOptimisticConfirm,
  onOptimisticRollback,
}: Props) {
  const { toast } = useToast();

  const [kind, setKind] = useState<NoteKind>(defaultKind);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [actionRequired, setActionRequired] = useState('');
  const [actionByDate, setActionByDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(
    KIND_META[defaultKind].defaultVisibility
  );
  const [saving, setSaving] = useState(false);
  const { draft: draftAgenda, streaming: drafting, reset: resetDraft } = useDraftOneToOne();

  // Reset when opened for a new kind
  useEffect(() => {
    if (!open) return;
    setKind(defaultKind);
    setTitle('');
    setBody('');
    setActionRequired('');
    setActionByDate('');
    setVisibility(KIND_META[defaultKind].defaultVisibility);
  }, [open, defaultKind]);

  // When kind changes, adjust visibility default (unless safeguarding locks it)
  useEffect(() => {
    setVisibility(KIND_META[kind].defaultVisibility);
  }, [kind]);

  const isSafeguarding = kind === 'safeguarding';
  const { canRoute: safeguardingCanRoute } = useCollegeSafeguardingReadiness();
  const meta = KIND_META[kind];

  const canSave = body.trim().length > 0 && !saving;

  const resolveAuthor = async () => {
    const { data: userRes } = await supabase.auth.getUser();
    if (!userRes?.user) throw new Error('Not signed in');
    const collegeId = await getMyCollegeId(userRes.user.id);
    if (!collegeId) throw new Error('No college for current user');
    const { data: staff } = await supabase
      .from('college_staff')
      .select('id, name')
      .eq('user_id', userRes.user.id)
      .eq('college_id', collegeId)
      .maybeSingle();
    return {
      college_id: collegeId,
      staff_id: staff?.id ?? null,
      staff_name: staff?.name ?? null,
    };
  };

  const handleSave = async () => {
    // Optimistic path — close the dialog instantly, write in the background.
    if (onOptimisticStart) {
      setSaving(true);
      try {
        const author = await resolveAuthor();
        const draft: OptimisticDraft = {
          kind,
          visibility: isSafeguarding ? 'safeguarding' : visibility,
          title: title.trim() || null,
          body: body.trim(),
          action_required: actionRequired.trim() || null,
          action_by_date: actionByDate || null,
          author_id: author.staff_id,
          author_name: author.staff_name,
        };
        const token = onOptimisticStart(draft);
        onOpenChange(false);

        // Fire the DB write detached
        supabase
          .from('pastoral_notes')
          .insert({
            student_id: studentId,
            college_id: author.college_id,
            author_id: author.staff_id,
            kind,
            visibility: isSafeguarding ? 'safeguarding' : visibility,
            title: title.trim() || null,
            body: body.trim(),
            action_required: actionRequired.trim() || null,
            action_by_date: actionByDate || null,
          })
          .select(
            'id, kind, visibility, title, body, action_required, action_by_date, action_completed_at, author_id, created_at'
          )
          .maybeSingle()
          .then(({ data, error }) => {
            if (error || !data) {
              onOptimisticRollback?.(token);
              toast({
                title: 'Note not saved',
                description: (error as Error)?.message ?? 'Unknown error',
                variant: 'destructive',
              });
              return;
            }
            onOptimisticConfirm?.(token, {
              ...data,
              author_name: author.staff_name,
            });
            toast({
              title: `${meta.label} saved`,
              description: isSafeguarding ? 'Visible to safeguarding leads only.' : undefined,
            });
          });
      } catch (e) {
        toast({
          title: 'Could not save',
          description: (e as Error).message,
          variant: 'destructive',
        });
      } finally {
        setSaving(false);
      }
      return;
    }

    // Non-optimistic fallback — original behaviour for callers that don't
    // wire the optimistic handlers.
    setSaving(true);
    try {
      const author = await resolveAuthor();
      const { error } = await supabase.from('pastoral_notes').insert({
        student_id: studentId,
        college_id: author.college_id,
        author_id: author.staff_id,
        kind,
        visibility: isSafeguarding ? 'safeguarding' : visibility,
        title: title.trim() || null,
        body: body.trim(),
        action_required: actionRequired.trim() || null,
        action_by_date: actionByDate || null,
      });
      if (error) throw error;

      toast({
        title: `${meta.label} saved`,
        description: isSafeguarding ? 'Visible to safeguarding leads only.' : undefined,
      });
      onSaved?.();
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not save',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const canAiDraft =
    kind === 'one_to_one' || kind === 'concern' || kind === 'intervention' || kind === 'note';

  const handleAiDraft = async () => {
    if (drafting) return;
    resetDraft();
    const starter = body.trim().length > 0 ? `${body.trim()}\n\n` : '';
    setBody(starter);
    try {
      await draftAgenda(studentId, {
        onDelta: (delta) => {
          setBody((prev) => prev + delta);
        },
      });
    } catch (e) {
      toast({
        title: 'AI draft failed',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  const VIS_LABEL: Record<Exclude<Visibility, 'safeguarding'>, string> = {
    author_only: 'Only me',
    tutors: 'All tutors at the college',
    course_lead: 'Heads of department and admins',
  };

  return (
    <FormSheet
      width="wide"
      bodyClassName="grid items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_24rem]"
      open={open}
      onOpenChange={(v) => !v && !saving && onOpenChange(false)}
      eyebrow={isSafeguarding ? 'Safeguarding record · restricted' : 'Pastoral note'}
      title={
        isSafeguarding ? `Safeguarding concern about ${studentName}` : `Record about ${studentName}`
      }
      description={
        isSafeguarding
          ? 'Only designated safeguarding leads can read this. Record what you saw and heard; do not investigate or promise confidentiality.'
          : 'Notes help you and colleagues build the picture. Safeguarding entries are restricted to designated leads.'
      }
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={saving}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className={buttonPrimaryCn}
          >
            {saving
              ? 'Saving…'
              : isSafeguarding
                ? 'Save restricted record'
                : `Save ${meta.label.toLowerCase()}`}
          </button>
        </div>
      }
    >
      {isSafeguarding && (
        <div
          role="note"
          className="rounded-2xl border border-red-500/50 bg-red-500/[0.08] px-4 py-3.5 lg:col-span-2"
        >
          <p className="text-[14px] font-semibold text-white">
            Restricted: designated safeguarding leads only
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-white">
            Other tutors, course leads and the learner cannot see this record. Who can see it is
            fixed and cannot be changed. If a learner is in immediate danger, call 999 first.
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <p className={labelCn}>Kind</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {KIND_CHIPS.map((k) => (
              <button
                key={k.key}
                type="button"
                aria-pressed={kind === k.key}
                onClick={() => setKind(k.key)}
                className={cn(
                  chipCn(kind === k.key),
                  k.key === 'safeguarding' &&
                    (kind === k.key
                      ? '!border-red-500 !bg-red-500 !text-white'
                      : '!border-red-500/40')
                )}
              >
                {k.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelCn} htmlFor="pn-title">
            Title (optional)
          </label>
          <input
            id="pn-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Late to lesson, catch-up agreed"
            className={inputCn}
          />
        </div>

        <div>
          <div className="mb-1 flex items-end justify-between gap-3">
            <label className={cn(labelCn, 'mb-0')} htmlFor="pn-body">
              {isSafeguarding ? 'What you saw or heard' : 'Detail'}
            </label>
            {/* AI draft: available for kinds where a pre-filled body saves the
                tutor real time. Never for safeguarding. */}
            {canAiDraft && (
              <button
                type="button"
                onClick={handleAiDraft}
                disabled={drafting}
                className="-my-2 h-11 rounded-xl px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation hover:bg-white/[0.06] disabled:opacity-60"
              >
                {drafting
                  ? 'Writing a draft…'
                  : kind === 'one_to_one'
                    ? 'Draft an agenda from their record'
                    : 'Draft from their record'}
              </button>
            )}
          </div>
          <textarea
            id="pn-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={meta.placeholder}
            rows={8}
            className={cn(textareaCn, 'min-h-[220px]', drafting && 'ring-1 ring-elec-yellow/40')}
          />
          {drafting ? (
            <p className="mt-2 text-[12.5px] text-white">
              AI is drafting from this learner&apos;s record. You can edit while it writes.
            </p>
          ) : canAiDraft ? (
            <p className="mt-2 text-[12px] text-white">
              Any AI text is a draft. Read and correct it before you save; the note is saved under
              your name.
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-6 border-t border-white/[0.1] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <div className={grid2Cn}>
          <div className={fieldFullCn}>
            <label className={labelCn} htmlFor="pn-action">
              Action (optional)
            </label>
            <input
              id="pn-action"
              type="text"
              value={actionRequired}
              onChange={(e) => setActionRequired(e.target.value)}
              placeholder="e.g. Book a catch-up on Thursday"
              className={inputCn}
            />
          </div>
          <div className={fieldFullCn}>
            <label className={labelCn} htmlFor="pn-by">
              By date
            </label>
            <input
              id="pn-by"
              type="date"
              value={actionByDate}
              onChange={(e) => setActionByDate(e.target.value)}
              className={inputCn}
            />
          </div>
        </div>

        <div>
          <p className={labelCn}>Who can see it</p>
          {isSafeguarding ? (
            <div className="mt-1 space-y-3">
              <p className="flex min-h-11 items-center rounded-xl border border-red-500/50 px-3.5 text-[13.5px] font-semibold text-white">
                Designated safeguarding leads only (fixed)
              </p>
              {!safeguardingCanRoute && (
                <div className="rounded-xl border border-orange-400/50 bg-orange-500/10 px-3.5 py-3 text-[13px] leading-relaxed text-white">
                  <span className="font-semibold">
                    No Designated Safeguarding Lead can receive this.
                  </span>{' '}
                  Your entry is still recorded and flagged to college admins, but assign a DSL with
                  an account so safeguarding concerns route properly.
                </div>
              )}
            </div>
          ) : (
            <div className="mt-1 grid grid-cols-1 gap-2">
              {(['author_only', 'tutors', 'course_lead'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={visibility === v}
                  onClick={() => setVisibility(v)}
                  className={cn(chipBase, 'px-3 text-left', visibility === v ? chipOn : chipOff)}
                >
                  {VIS_LABEL[v]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </FormSheet>
  );
}
