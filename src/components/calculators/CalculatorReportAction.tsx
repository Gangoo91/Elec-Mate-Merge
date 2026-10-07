/**
 * CalculatorReportAction
 * ────────────────────────────────────────────────────────────────────────
 * The page-level "PDF for client" button. Reads whatever report the active
 * calculator has published (see `calculator-report-context`) and hands it to
 * `CalculationPdfButton`.
 *
 * It renders nothing at all until a calculator publishes a result, so the
 * calculators that have not been given a `buildReport` yet simply show no
 * button rather than a dead one — which is what makes rolling this out across
 * the registry safe to do a few at a time.
 */

import { CalculationPdfButton } from '@/components/calculators/CalculationPdfButton';
import { AddCalcToPortfolioButton } from '@/components/calculators/AddCalcToPortfolioButton';
import { useCalcReport, useCalcReportSlug } from '@/lib/calculator-report-context';
import { useAuth } from '@/contexts/AuthContext';

export function CalculatorReportAction() {
  const report = useCalcReport();
  const calculatorSlug = useCalcReportSlug();
  const { profile } = useAuth();
  if (!report) return null;
  // ELE-1906: an apprentice's calculation is portfolio evidence.
  if (profile?.role === 'apprentice') {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <AddCalcToPortfolioButton report={report} calculatorSlug={calculatorSlug} />
        <CalculationPdfButton report={report} calculatorSlug={calculatorSlug} />
      </div>
    );
  }
  return <CalculationPdfButton report={report} calculatorSlug={calculatorSlug} />;
}
