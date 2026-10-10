/**
 * Delete a briefing — a bottom sheet, not a centred dialog (ELE-1944), so it
 * can be reached one-handed. Says what goes with it: the register and its
 * signatures.
 */
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';

interface DeleteBriefingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefing: { id: string; briefing_name?: string | null; job_name?: string | null } | null;
  onSuccess: () => void;
}

export const DeleteBriefingDialog = ({
  open,
  onOpenChange,
  briefing,
  onSuccess,
}: DeleteBriefingDialogProps) => {
  const [loading, setLoading] = useState(false);
  const name = briefing?.briefing_name || briefing?.job_name || 'this briefing';

  const handleDelete = async () => {
    if (!briefing) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('team_briefings')
        .delete()
        .eq('id', briefing.id)
        .select('id');
      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error(
          'Only the person who made this briefing, or a manager at the firm, can delete it.'
        );
      }
      toast.success('Briefing deleted.');
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not delete the briefing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Toolbox talk"
      title="Delete this briefing?"
      description={`“${name}” and its sign-off register will be deleted for good. Signed copies people have already downloaded are not affected.`}
      width="wide"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <button
            type="button"
            disabled={loading}
            onClick={() => onOpenChange(false)}
            className="h-11 rounded-full sm:flex-1 border border-white/[0.14] bg-white/[0.06] px-5 text-[14px] font-semibold text-white touch-manipulation"
          >
            Keep it
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="h-11 rounded-full sm:flex-1 bg-red-600 px-5 text-[14px] font-semibold text-white touch-manipulation disabled:opacity-50"
          >
            {loading ? 'Deleting…' : 'Delete briefing'}
          </button>
        </div>
      }
    >
      <p className="text-[14px] leading-relaxed text-white">
        If the talk was given, keep it: the register is your record that the crew was briefed.
      </p>
    </FormSheet>
  );
};
