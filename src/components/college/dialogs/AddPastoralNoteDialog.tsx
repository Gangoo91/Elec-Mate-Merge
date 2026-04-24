import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useDraftOneToOne } from '@/hooks/useDraftOneToOne';

export type NoteKind =
  | 'note'
  | 'one_to_one'
  | 'flag'
  | 'concern'
  | 'safeguarding'
  | 'praise'
  | 'intervention';

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

const KIND_META: Record<NoteKind, { label: string; placeholder: string; defaultVisibility: Visibility }> = {
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
    placeholder:
      'Record the facts. Use direct quotes where possible. Do not offer opinions.',
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
  const meta = KIND_META[kind];

  const canSave = body.trim().length > 0 && !saving;

  const resolveAuthor = async () => {
    const { data: userRes } = await supabase.auth.getUser();
    if (!userRes?.user) throw new Error('Not signed in');
    const { data: profile } = await supabase
      .from('profiles')
      .select('college_id')
      .eq('id', userRes.user.id)
      .maybeSingle();
    if (!profile?.college_id) throw new Error('No college for current user');
    const { data: staff } = await supabase
      .from('college_staff')
      .select('id, name')
      .eq('user_id', userRes.user.id)
      .eq('college_id', profile.college_id)
      .maybeSingle();
    return {
      college_id: profile.college_id as string,
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
              description: isSafeguarding
                ? 'Visible to safeguarding leads only.'
                : undefined,
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
        description: isSafeguarding
          ? 'Visible to safeguarding leads only.'
          : undefined,
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

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !saving && onOpenChange(false)}>
      <DialogContent
        className={cn(
          'w-[min(100vw-1rem,620px)] max-h-[92vh]',
          'bg-[hsl(0_0%_10%)] border-white/[0.08]',
          'p-0 gap-0 flex flex-col overflow-hidden',
          'sm:w-[min(100vw-2rem,620px)]'
        )}
      >
        <DialogHeader className="shrink-0 border-b border-white/[0.06] px-6 py-5 sm:px-7 sm:py-6 space-y-2 text-left">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow/85">
            Pastoral note
          </div>
          <DialogTitle className="text-xl sm:text-[22px] font-semibold text-white tracking-tight leading-tight">
            Record about {studentName}
          </DialogTitle>
          <DialogDescription className="text-[12.5px] text-white/70 leading-relaxed">
            Notes help you and colleagues build the picture. Safeguarding
            entries are restricted to designated leads.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 sm:px-7 py-5 space-y-5">
          {/* Kind */}
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 mb-2.5">
              Kind
            </div>
            <div className="flex flex-wrap gap-1.5">
              {KIND_CHIPS.map((k) => (
                <button
                  key={k.key}
                  type="button"
                  onClick={() => setKind(k.key)}
                  className={cn(
                    'h-8 px-3 rounded-full text-[12px] border transition-colors touch-manipulation',
                    kind === k.key
                      ? k.key === 'safeguarding'
                        ? 'bg-red-500/[0.08] border-red-500/30 text-red-200 font-medium'
                        : k.key === 'flag' || k.key === 'concern'
                          ? 'bg-amber-500/[0.08] border-amber-500/30 text-amber-200 font-medium'
                          : k.key === 'praise'
                            ? 'bg-emerald-500/[0.08] border-emerald-500/30 text-emerald-200 font-medium'
                            : 'bg-elec-yellow/[0.1] border-elec-yellow/40 text-elec-yellow font-medium'
                      : 'bg-[hsl(0_0%_13%)] border-white/[0.08] text-white/80 hover:text-white hover:border-white/[0.18]'
                  )}
                >
                  {k.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title (optional) */}
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 mb-2">
              Title (optional)
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Late to lesson, catch-up agreed"
              className="h-11 w-full bg-[hsl(0_0%_13%)] border border-white/[0.08] rounded-xl px-4 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60 transition-colors"
            />
          </div>

          {/* Body */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/65">
                Detail
              </div>
              {/* AI-draft button — available for kinds where a pre-filled
                  body saves the tutor real time. */}
              {(kind === 'one_to_one' ||
                kind === 'concern' ||
                kind === 'intervention' ||
                kind === 'note') && (
                <button
                  type="button"
                  onClick={async () => {
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
                  }}
                  disabled={drafting}
                  className={cn(
                    'h-7 px-3 rounded-full text-[11px] font-medium transition-colors disabled:opacity-50',
                    drafting
                      ? 'text-elec-yellow/85 border border-elec-yellow/30'
                      : 'text-elec-yellow hover:text-black hover:bg-elec-yellow border border-elec-yellow/40'
                  )}
                >
                  {drafting
                    ? 'Drafting…'
                    : kind === 'one_to_one'
                      ? 'AI draft agenda →'
                      : 'AI draft →'}
                </button>
              )}
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={meta.placeholder}
              rows={6}
              className={cn(
                'w-full bg-[hsl(0_0%_13%)] border rounded-xl px-4 py-3 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60 transition-colors resize-y min-h-[200px]',
                drafting ? 'border-elec-yellow/30' : 'border-white/[0.08]'
              )}
            />
            {drafting && (
              <div className="mt-1.5 text-[11px] text-elec-yellow/80 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-elec-yellow animate-pulse" />
                Drafting from this learner's data — you can edit while it
                streams.
              </div>
            )}
          </div>

          {/* Action (optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px] gap-3">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 mb-2">
                Action (optional)
              </div>
              <input
                type="text"
                value={actionRequired}
                onChange={(e) => setActionRequired(e.target.value)}
                placeholder="e.g. Book catch-up session on Thursday"
                className="h-11 w-full bg-[hsl(0_0%_13%)] border border-white/[0.08] rounded-xl px-4 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60 transition-colors"
              />
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 mb-2">
                By date
              </div>
              <input
                type="date"
                value={actionByDate}
                onChange={(e) => setActionByDate(e.target.value)}
                className="h-11 w-full bg-[hsl(0_0%_13%)] border border-white/[0.08] rounded-xl px-4 text-[13.5px] text-white focus:outline-none focus:border-elec-yellow/60 transition-colors"
              />
            </div>
          </div>

          {/* Visibility */}
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 mb-2.5">
              Visibility
            </div>
            {isSafeguarding ? (
              <div className="bg-red-500/[0.05] border border-red-500/25 rounded-xl px-4 py-3 text-[12.5px] text-red-200 leading-relaxed">
                Safeguarding entries are visible to designated leads only. This
                cannot be changed.
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {(['author_only', 'tutors', 'course_lead'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVisibility(v)}
                    className={cn(
                      'h-8 px-3 rounded-full text-[12px] border transition-colors',
                      visibility === v
                        ? 'bg-elec-yellow/[0.1] border-elec-yellow/40 text-elec-yellow font-medium'
                        : 'bg-[hsl(0_0%_13%)] border-white/[0.08] text-white/80 hover:text-white hover:border-white/[0.18]'
                    )}
                  >
                    {v === 'author_only'
                      ? 'Only me'
                      : v === 'tutors'
                        ? 'All tutors at college'
                        : 'Course leads only'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-white/[0.06] bg-[hsl(0_0%_10%)] px-6 py-4 sm:px-7 sm:py-5 flex items-center justify-end gap-2 flex-col-reverse sm:flex-row">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={saving}
            className="h-11 w-full sm:w-auto px-5 rounded-full border border-white/[0.12] text-[13px] font-medium text-white hover:bg-white/[0.06] transition-colors disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className="h-11 w-full sm:w-auto px-6 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[13px] font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : `Save ${meta.label.toLowerCase()}`}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
