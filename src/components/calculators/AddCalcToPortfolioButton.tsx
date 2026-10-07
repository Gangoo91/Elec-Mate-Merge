/**
 * AddCalcToPortfolioButton (ELE-1906)
 * ────────────────────────────────────────────────────────────────────────
 * For apprentices: one tap turns the calculation on screen into portfolio
 * evidence. It makes the same PDF the "PDF for client" button makes (the edge
 * function also keeps a copy in calculation_reports), then opens the capture
 * sheet on the portfolio with that calculation attached and the criteria it
 * could cover suggested. The learner still claims and saves.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderPlus, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { type CalcReport, DEFAULT_CALC_DISCLAIMER, reportHasContent } from '@/lib/calculator-report';
import { CALCULATION_REPORT_SAVED } from '@/hooks/useCalculationReports';

export function AddCalcToPortfolioButton({
  report,
  calculatorSlug,
  className,
}: {
  report: () => CalcReport | null;
  calculatorSlug?: string;
  className?: string;
}) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    if (busy) return;
    let built: CalcReport | null = null;
    try {
      built = report();
    } catch {
      built = null;
    }
    if (!reportHasContent(built)) {
      toast({ title: 'Nothing to add yet', description: 'Run the calculation first.' });
      return;
    }
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-calculation-pdf', {
        body: {
          calculatorSlug,
          report: { ...built, prepared_by: built!.preparedBy, disclaimer: built!.disclaimer ?? DEFAULT_CALC_DISCLAIMER },
        },
      });
      if (error || !data?.success) throw new Error(data?.error || error?.message || 'failed');
      if (!data.report_id) throw new Error('not saved');
      window.dispatchEvent(new Event(CALCULATION_REPORT_SAVED));
      navigate(`/apprentice/hub?capture=1&work=calculation:${data.report_id}`);
    } catch (err) {
      console.error('[AddCalcToPortfolioButton] failed', err);
      toast({
        title: 'Could not add it to your portfolio',
        description: 'Check your connection and try again. The calculation is still here.',
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      className={cn(
        'flex min-h-[44px] touch-manipulation items-center gap-1.5 rounded-lg px-3 py-1.5',
        'border border-elec-yellow/40 text-xs font-semibold text-white transition-colors hover:border-elec-yellow',
        'disabled:opacity-40',
        className
      )}
    >
      {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <FolderPlus className="h-3.5 w-3.5 text-elec-yellow" />}
      {busy ? 'Adding…' : 'Add to portfolio'}
    </button>
  );
}
