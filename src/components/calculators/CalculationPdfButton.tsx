/**
 * CalculationPdfButton
 * ────────────────────────────────────────────────────────────────────────
 * The whole client-PDF feature, from a calculator's point of view. Drop it
 * beside the result and give it a function that describes the calculation:
 *
 *   <CalculationPdfButton report={buildReport} />
 *
 * That is the entire integration. There are 77 calculators and one template,
 * so nothing here — or in the edge function, or in the PDF — is specific to
 * any of them.
 *
 * `report` is a FUNCTION, not an object: it is only called on click, so a
 * calculator that recomputes on every keystroke isn't also rebuilding a report
 * nobody has asked for.
 */

import { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';

import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { saveOrShareFile } from '@/utils/save-or-share-file';
import { cn } from '@/lib/utils';
import {
  type CalcReport,
  DEFAULT_CALC_DISCLAIMER,
  reportHasContent,
} from '@/lib/calculator-report';
import { CALCULATION_REPORT_SAVED } from '@/hooks/useCalculationReports';

interface CalculationPdfButtonProps {
  /** Called on click. Return null when there is nothing to report yet. */
  report: () => CalcReport | null;
  /** Disable while the calculator has no valid result. */
  disabled?: boolean;
  className?: string;
  label?: string;
  /** Stored with the saved copy so it can link back to this calculator. */
  calculatorSlug?: string;
}

export function CalculationPdfButton({
  report,
  disabled,
  className,
  label = 'PDF for client',
  calculatorSlug,
}: CalculationPdfButtonProps) {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    if (busy) return;

    let built: CalcReport | null = null;
    try {
      built = report();
    } catch (err) {
      console.error('[CalculationPdfButton] building the report threw', err);
    }

    if (!reportHasContent(built)) {
      toast({
        title: 'Nothing to report yet',
        description: 'Run the calculation first, then create the PDF.',
      });
      return;
    }

    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-calculation-pdf', {
        body: {
          calculatorSlug,
          report: {
            ...built,
            // Named to match the payload the template expects. The server
            // overrides `company` entirely — branding is never sent from here.
            prepared_by: built!.preparedBy,
            disclaimer: built!.disclaimer ?? DEFAULT_CALC_DISCLAIMER,
          },
        },
      });
      if (error) throw new Error(error.message);
      if (!data?.success) throw new Error(data?.error || 'Could not create the PDF');

      // Fetch the bytes and hand them to the shared saver. A plain `<a download>`
      // is silently ignored by WKWebView, so on native this has to go through
      // the OS share sheet — which is exactly what saveOrShareFile does.
      const res = await fetch(data.url);
      if (!res.ok) throw new Error('Could not download the PDF');
      const blob = await res.blob();
      await saveOrShareFile(blob, data.filename || 'calculation.pdf');

      // Tell any open "Saved reports" list to refresh — the row is already written
      // by the edge function, but a list mounted before this would not show it.
      window.dispatchEvent(new Event(CALCULATION_REPORT_SAVED));

      toast({
        title: 'PDF ready',
        description: 'Saved and ready to send to your client.',
      });
    } catch (err) {
      console.error('[CalculationPdfButton] failed', err);
      // The raw message is usually transport-level ("Edge Function returned a
      // non-2xx status code") — alarming and useless to an electrician stood in
      // a loft. The detail goes to the console; the toast says what to do.
      const message = err instanceof Error ? err.message : '';
      // Verified against the real strings: Supabase surfaces "Failed to send a
      // request to the Edge Function" when the call never lands, and "Edge
      // Function returned a non-2xx status code" when it fails server-side.
      const isTransport =
        !message ||
        /Edge Function|Failed to fetch|NetworkError|Load failed|fetch failed/i.test(message);
      toast({
        title: 'Could not create the PDF',
        description: isTransport
          ? 'Check your connection and try again — the calculation is still here.'
          : message,
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
      disabled={disabled || busy}
      className={cn(
        'flex min-h-[44px] touch-manipulation items-center gap-1.5 rounded-lg px-3 py-1.5',
        'bg-white/5 text-xs font-medium text-white transition-colors hover:bg-white/10',
        'disabled:opacity-40',
        className
      )}
    >
      {busy ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <FileText className="h-3.5 w-3.5" />
      )}
      {busy ? 'Creating…' : label}
    </button>
  );
}
