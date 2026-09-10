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
import { useCalcReport } from '@/lib/calculator-report-context';

export function CalculatorReportAction() {
  const report = useCalcReport();
  if (!report) return null;
  return <CalculationPdfButton report={report} />;
}
