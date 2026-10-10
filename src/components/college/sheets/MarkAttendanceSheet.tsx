import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOnQuiet as chipOn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  ATTENDANCE_CONFLICT,
  REGISTER_SESSIONS,
  SESSION_LABEL,
  currentSession,
  type RegisterSession,
} from '@/lib/college/attendanceSession';

/* ==========================================================================
   MarkAttendanceSheet — inline attendance recorder for one learner.
   Saves to college_attendance with the staff member as recorded_by, one mark
   per learner per session (morning / afternoon).
   ========================================================================== */

const STATUSES: { value: 'Present' | 'Absent' | 'Late' | 'Authorised'; label: string }[] = [
  { value: 'Present', label: 'Present' },
  { value: 'Late', label: 'Late' },
  { value: 'Absent', label: 'Absent' },
  { value: 'Authorised', label: 'Authorised absence' },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName: string;
  onSaved?: () => void;
}

export function MarkAttendanceSheet({
  open,
  onOpenChange,
  studentId,
  studentName,
  onSaved,
}: Props) {
  const { toast } = useToast();
  const [status, setStatus] = useState<(typeof STATUSES)[number]['value']>('Present');
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [session, setSession] = useState<RegisterSession>(() => currentSession());
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStatus('Present');
    setDate(new Date().toISOString().slice(0, 10));
    setSession(currentSession());
    setNotes('');
  }, [open]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      // Upsert by (student_id, date, session): marking the same session again overwrites
      const { error } = await supabase.from('college_attendance').upsert(
        {
          student_id: studentId,
          date,
          session,
          status,
          notes: notes.trim() || null,
          recorded_by: user.id,
        },
        { onConflict: ATTENDANCE_CONFLICT }
      );
      if (error) throw new Error(error.message || 'Could not save attendance');

      toast({
        title: 'Attendance saved',
        description: `${studentName.split(' ')[0]} · ${status}, ${SESSION_LABEL[session].toLowerCase()} of ${formatDate(date)}.`,
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
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={`Attendance · ${studentName}`}
      title={`Mark ${studentName.split(' ')[0]}`}
      description="Saves to the learner's record. Marking the same session again replaces the earlier mark."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-5 lg:grid-cols-2"
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
          <button type="button" onClick={handleSave} disabled={saving} className={buttonPrimaryCn}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <p className={labelCn}>Status</p>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {STATUSES.map((s) => (
              <button
                key={s.value}
                type="button"
                aria-pressed={status === s.value}
                onClick={() => setStatus(s.value)}
                className={cn(chipBase, status === s.value ? chipOn : chipOff)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className={labelCn}>Session</p>
          <div className="mt-1 grid max-w-xs grid-cols-2 gap-2">
            {REGISTER_SESSIONS.map((s) => (
              <button
                key={s.value}
                type="button"
                aria-pressed={session === s.value}
                onClick={() => setSession(s.value)}
                className={cn(chipBase, session === s.value ? chipOn : chipOff)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-xs">
          <label className={labelCn} htmlFor="ma-date">
            Date
          </label>
          <input
            id="ma-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputCn}
          />
        </div>
      </div>

      <div>
        <label className={labelCn} htmlFor="ma-notes">
          Notes (optional)
        </label>
        <textarea
          id="ma-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="e.g. late by 15 minutes, sick note received"
          className={textareaCn}
        />
      </div>
    </FormSheet>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
