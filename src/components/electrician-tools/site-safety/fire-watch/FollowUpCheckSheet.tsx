import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { SheetShell, PrimaryButton, SecondaryButton, Field } from '@/components/college/primitives';
import { safetyInputCn, safetyTextareaCn } from '../common/SafetyDocField';
import { SignatureField } from '../common/SignatureField';
import type { FireWatchRecord } from '@/hooks/useFireWatchRecords';

/**
 * The two-hour check (HSG168 para 122).
 *
 * The hour of continuous watch ends and people leave. This is the check that
 * happens after they have gone — the one that finds a fire that has been
 * smouldering inside a void or on the far side of a partition since the torch
 * went out. It was not modelled at all: the tool wrote 'completed' when the
 * hour timer ran out, so nothing recorded it and nothing chased it.
 *
 * "All clear" is not the default. The two outcomes are deliberately equal
 * buttons rather than a tick-to-confirm, because a check that defaults to
 * passing is not a check.
 */
export function FollowUpCheckSheet({
  record,
  open,
  onClose,
  onDone,
}: {
  record: FireWatchRecord;
  open: boolean;
  onClose: () => void;
  onDone?: () => void;
}) {
  const { toast } = useToast();
  const haptic = useHaptic();
  const queryClient = useQueryClient();
  const [allClear, setAllClear] = useState<boolean | null>(null);
  const [name, setName] = useState(record.completed_by ?? '');
  const [notes, setNotes] = useState('');
  const [signature, setSignature] = useState('');
  const [saving, setSaving] = useState(false);

  // A "found something" outcome must say what was found — that note is the
  // only account of why the area was not clear.
  const canSave =
    allClear !== null &&
    name.trim().length > 0 &&
    signature.length > 0 &&
    (allClear || notes.trim().length > 0);

  const save = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('fire_watch_records')
        .update({
          status: 'completed',
          follow_up_completed_at: new Date().toISOString(),
          follow_up_by: name.trim(),
          follow_up_notes: notes.trim() || null,
          follow_up_all_clear: allClear,
        })
        .eq('id', record.id);
      if (error) throw error;
      haptic.success();
      toast({
        title: allClear ? 'Fire watch closed' : 'Recorded — area not clear',
        description: allClear
          ? 'Two-hour check signed off. The record is now complete.'
          : 'The check is recorded. Deal with the area before anyone leaves site.',
      });
      // Refresh the list in place rather than threading a refetch prop
      // through the history row.
      queryClient.invalidateQueries({ queryKey: ['fire-watch-records'] });
      onDone?.();
      onClose();
    } catch {
      haptic.error();
      toast({
        title: 'Error',
        description: 'Could not save the two-hour check.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const dueAt = record.follow_up_due_at ? new Date(record.follow_up_due_at) : null;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]"
      >
        <SheetShell
          eyebrow="HSG168 · two-hour check"
          title="Check the area again"
          description={
            dueAt
              ? `Due from ${dueAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
              : undefined
          }
          footer={
            <>
              <SecondaryButton onClick={onClose}>Not yet</SecondaryButton>
              <PrimaryButton fullWidth disabled={!canSave || saving} onClick={save}>
                {saving ? 'Saving…' : 'Sign off check'}
              </PrimaryButton>
            </>
          }
        >
          <p className="text-[13px] leading-relaxed text-white">
            Re-inspect the hot work area, including any void, ceiling or wall the work could have
            breached, and the far side of any partition worked on.
          </p>

          <div>
            <p className="mb-2 text-[12px] font-medium text-white">What did you find?</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: true, label: 'All clear' },
                { v: false, label: 'Signs of fire' },
              ].map((opt) => (
                <button
                  key={String(opt.v)}
                  type="button"
                  onClick={() => setAllClear(opt.v)}
                  aria-pressed={allClear === opt.v}
                  className={cn(
                    'h-11 touch-manipulation rounded-full border text-[13px] transition-colors',
                    allClear === opt.v
                      ? opt.v
                        ? 'border-emerald-500 bg-emerald-500 font-semibold text-black'
                        : 'border-red-500 bg-red-500 font-semibold text-white'
                      : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <Field
            label={allClear === false ? 'What did you find?' : 'Notes'}
            required={allClear === false}
          >
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={cn(safetyTextareaCn, 'min-h-[80px]')}
              placeholder={
                allClear === false
                  ? 'Describe what you found and what you did about it…'
                  : 'Anything worth recording…'
              }
            />
          </Field>

          <Field label="Checked by" required>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={safetyInputCn}
              placeholder="Full name"
            />
          </Field>

          <SignatureField label="Signature" value={signature} onChange={setSignature} />
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

export default FollowUpCheckSheet;
