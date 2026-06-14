import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
} from '@/components/college/primitives';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   MarkAttendanceSheet — inline attendance recorder for one learner.
   Saves to college_attendance with the staff member as recorded_by.
   ========================================================================== */

const STATUSES: { value: 'Present' | 'Absent' | 'Late' | 'Authorised'; label: string; tone: string }[] = [
  { value: 'Present', label: 'Present', tone: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200' },
  { value: 'Late', label: 'Late', tone: 'bg-amber-500/15 border-amber-400/40 text-amber-200' },
  { value: 'Absent', label: 'Absent', tone: 'bg-red-500/15 border-red-400/40 text-red-200' },
  { value: 'Authorised', label: 'Authorised', tone: 'bg-blue-500/15 border-blue-400/40 text-blue-200' },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName: string;
  onSaved?: () => void;
}

export function MarkAttendanceSheet({ open, onOpenChange, studentId, studentName, onSaved }: Props) {
  const { toast } = useToast();
  const [status, setStatus] = useState<typeof STATUSES[number]['value']>('Present');
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStatus('Present');
    setDate(new Date().toISOString().slice(0, 10));
    setNotes('');
  }, [open]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      // Upsert by (student_id, date) — recording today twice should overwrite
      const { error } = await supabase
        .from('college_attendance')
        .upsert(
          {
            student_id: studentId,
            date,
            status,
            notes: notes.trim() || null,
            recorded_by: user.id,
          },
          { onConflict: 'student_id,date' }
        );
      if (error) throw new Error(error.message || 'Could not save attendance');

      toast({
        title: 'Attendance saved',
        description: `${studentName.split(' ')[0]} · ${status} on ${formatDate(date)}.`,
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideCloseButton
        side="bottom"
        className="h-[78vh] sm:max-w-xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="Attendance"
          title={`Mark — ${studentName.split(' ')[0]}`}
          description="Quick attendance entry. Saves to the learner's record and refreshes the section."
          footer={
            <>
              <SecondaryButton onClick={() => onOpenChange(false)} disabled={saving} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={handleSave} disabled={saving} fullWidth>
                <Check className="h-3.5 w-3.5 mr-1.5" strokeWidth={3} />
                {saving ? 'Saving…' : 'Save'}
              </PrimaryButton>
            </>
          }
        >
          <div>
            <Label>Status</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setStatus(s.value)}
                  className={cn(
                    'h-11 rounded-xl border text-[12.5px] font-semibold tracking-tight transition-colors touch-manipulation',
                    status === s.value
                      ? s.tone
                      : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white/70 hover:bg-white/[0.04]'
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Date</Label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full h-11 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white px-3 touch-manipulation"
            />
          </div>

          <div>
            <Label>Notes (optional)</Label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Late by 15 min / sick note received / etc."
              className="mt-2 w-full rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white p-3 leading-snug touch-manipulation"
            />
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">{children}</div>;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
