/**
 * StaffNotes — private assessor notes, shown only on staff screens (batch 2,
 * 10 Oct 2026). Every block carries "Only staff see this". The rule is in
 * RLS (portfolio_staff_notes, _can_read_staff_notes): the learner and
 * employers never receive a row, whatever screen they are on.
 */
import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn, textareaCn } from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import type { StaffNote } from '@/hooks/portfolio/useStaffNotes';

const ROLE: Record<string, string> = {
  tutor: 'tutor',
  assessor: 'assessor',
  iqa: 'IQA',
  eqa: 'EQA',
  admin: 'college admin',
  head_of_department: 'head of department',
  epa_assessor: 'EPA assessor',
};

const when = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** The label every staff-only block wears. */
export function StaffOnlyLabel({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-[12px] font-semibold text-white',
        className
      )}
    >
      <Lock className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
      Only staff see this
    </span>
  );
}

export function StaffNotesList({
  notes,
  limit,
  className,
}: {
  notes: StaffNote[];
  /** Show only the newest few (the rest are counted). */
  limit?: number;
  className?: string;
}) {
  if (notes.length === 0) return null;
  const shown = limit ? notes.slice(0, limit) : notes;
  const more = notes.length - shown.length;
  return (
    <div
      data-testid="staff-notes"
      className={cn('rounded-xl border border-white/[0.14] bg-white/[0.03] px-3 py-2.5', className)}
    >
      <StaffOnlyLabel />
      <ul className="mt-1.5 space-y-2">
        {shown.map((n) => (
          <li key={n.id}>
            <p className="whitespace-pre-line text-[13px] leading-snug text-white">{n.body}</p>
            <p className="mt-0.5 text-[12px] text-white">
              {n.author_name ?? 'Staff'}
              {n.author_role ? `, ${ROLE[n.author_role] ?? n.author_role}` : ''} ·{' '}
              {when(n.created_at)}
            </p>
          </li>
        ))}
      </ul>
      {more > 0 && (
        <p className="mt-1.5 text-[12px] text-white">
          and {more} earlier note{more === 1 ? '' : 's'}
        </p>
      )}
    </div>
  );
}

/** Add a staff-only note to some criteria and/or evidence, with the notes already there. */
export function StaffNoteSheet({
  open,
  onOpenChange,
  learnerName,
  scopeLabel,
  existing,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  learnerName?: string;
  /** e.g. "022 AC 1.1, 022 AC 1.2" */
  scopeLabel: string;
  existing: StaffNote[];
  onAdd: (body: string) => Promise<void>;
}) {
  const { toast } = useToast();
  const [body, setBody] = useState('');
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (open) setBody('');
  }, [open]);
  const save = async () => {
    if (!body.trim() || saving) return;
    setSaving(true);
    try {
      await onAdd(body);
      toast({ title: 'Note saved', description: 'Only staff see it.' });
      onOpenChange(false);
    } catch (e) {
      toast({ title: 'Not saved', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };
  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={`Staff note · ${learnerName ?? 'Learner'}`}
      title="Private note"
      description={scopeLabel}
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-2"
      footer={
        <div className="grid grid-cols-[auto_1fr] gap-2.5">
          <button
            type="button"
            className={cn(buttonSecondaryCn, 'px-5')}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className={buttonPrimaryCn}
            disabled={!body.trim() || saving}
            onClick={() => void save()}
          >
            {saving ? 'Saving…' : 'Save note'}
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        <StaffOnlyLabel />
        <p className="text-[13.5px] leading-relaxed text-white">
          Assessors, tutors, IQA and EQA can read it. {learnerName?.split(' ')[0] ?? 'The learner'}{' '}
          and their employer never see it. It cannot be edited afterwards; add another note to
          correct it.
        </p>
        <label htmlFor="staff-note-body" className="block text-[12px] font-medium text-white">
          Note
        </label>
        <textarea
          id="staff-note-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          maxLength={4000}
          placeholder="e.g. Second photo is the same board as last week. Ask about the RCD test before passing 1.3."
          className={cn(textareaCn, 'min-h-[140px]')}
        />
      </div>
      <div className="min-w-0">
        {existing.length === 0 ? (
          <p className="text-[13px] text-white">No staff notes here yet.</p>
        ) : (
          <StaffNotesList notes={existing} />
        )}
      </div>
    </FormSheet>
  );
}
