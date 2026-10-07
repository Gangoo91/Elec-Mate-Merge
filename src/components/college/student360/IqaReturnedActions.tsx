/**
 * IqaReturnedActions — the IQA's returned work for one learner (ELE-1871).
 *
 * When an IQA returns a decision (from a sampling plan or from Student 360)
 * the database opens an action on college_iqa_findings for the assessor and
 * sends them a notification that lands here (#assess). The assessor reads the
 * feedback, looks again, then closes the action with a note via
 * close_iqa_action. Closed actions stay on the IQA dashboard and in the IQA
 * report; here we only show what is still open.
 */
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY, COLLEGE_CARD } from '@/components/college/ui/CollegeUi';

interface ReturnedAction {
  id: string;
  description: string;
  action_plan: string | null;
  due_date: string | null;
  created_at: string | null;
  assessor_name: string | null;
  iqa_name_snapshot: string | null;
}

const fmt = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '';

export function IqaReturnedActions({ studentId }: { studentId: string }) {
  const { toast } = useToast();
  const [rows, setRows] = useState<ReturnedAction[]>([]);
  const [closing, setClosing] = useState<ReturnedAction | null>(null);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from('college_iqa_findings')
      .select('id, description, action_plan, due_date, created_at, assessor_name, iqa_name_snapshot')
      .eq('college_student_id' as never, studentId)
      .eq('status', 'Open')
      .order('created_at', { ascending: false });
    if (!error) setRows((data ?? []) as unknown as ReturnedAction[]);
  }, [studentId]);

  useEffect(() => {
    void load();
  }, [load]);

  const close = async () => {
    if (!closing) return;
    if (!note.trim()) {
      toast({ title: 'Say what you did', description: 'The IQA reads your note when the action closes.' });
      return;
    }
    setSaving(true);
    const { error } = await supabase.rpc('close_iqa_action' as never, { p_finding: closing.id, p_note: note.trim() } as never);
    setSaving(false);
    if (error) {
      toast({ title: 'Could not close the action', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Action closed', description: 'The IQA has been told.' });
    setClosing(null);
    setNote('');
    void load();
  };

  if (rows.length === 0) return null;

  return (
    <div className={cn(COLLEGE_CARD, 'space-y-3 border-orange-400/40')}>
      <div>
        <p className="text-[14.5px] font-semibold text-white">
          Returned by IQA · {rows.length} open {rows.length === 1 ? 'action' : 'actions'}
        </p>
        <p className="mt-0.5 text-[13px] text-white">
          Look at the work again with the IQA's feedback, record a new decision below if needed, then close the action.
        </p>
      </div>
      <ul className="divide-y divide-white/[0.08]">
        {rows.map((r) => (
          <li key={r.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[13.5px] text-white">{r.description.replace(/^Returned by IQA: /, '')}</p>
              <p className="mt-0.5 text-[12px] text-white">
                {[r.iqa_name_snapshot && `IQA ${r.iqa_name_snapshot}`, r.assessor_name && `Assessor ${r.assessor_name}`, r.created_at && `Returned ${fmt(r.created_at)}`, r.due_date && `Due ${fmt(r.due_date)}`]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>
            <button type="button" onClick={() => setClosing(r)} className={cn(COLLEGE_BTN, 'h-11 shrink-0 touch-manipulation')}>
              Close action
            </button>
          </li>
        ))}
      </ul>

      <FormSheet
        open={!!closing}
        onOpenChange={(o) => {
          if (!o) {
            setClosing(null);
            setNote('');
          }
        }}
        width="wide"
        eyebrow="IQA action"
        title="Close the returned action"
        description={closing?.description.replace(/^Returned by IQA: /, '')}
        footer={
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setClosing(null)} className={cn(COLLEGE_BTN, 'h-11')}>
              Cancel
            </button>
            <button type="button" onClick={close} disabled={saving} className={cn(COLLEGE_BTN_PRIMARY, 'h-11')}>
              {saving ? 'Closing…' : 'Close action'}
            </button>
          </div>
        }
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <label htmlFor="iqa-close-note" className="mb-1 block text-[12px] font-medium text-white">
              What did you do?
            </label>
            <textarea
              id="iqa-close-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="For example: asked for a clearer photo of the test result and recorded a new decision."
              className="w-full touch-manipulation rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white caret-elec-yellow placeholder:text-white/25 focus:border-elec-yellow focus:outline-none focus:ring-0"
            />
          </div>
          <div className="space-y-2 text-[13px] text-white">
            <p className="font-semibold">What happens next</p>
            <p>The action closes with your note and the IQA is told. It stays on the IQA dashboard and in the IQA report as part of the audit trail.</p>
            {closing?.action_plan && <p>{closing.action_plan}</p>}
          </div>
        </div>
      </FormSheet>
    </div>
  );
}

export default IqaReturnedActions;
