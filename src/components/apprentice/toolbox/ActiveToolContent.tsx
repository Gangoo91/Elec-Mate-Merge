import { Button } from '@/components/ui/button';
import { CalcReportProvider } from '@/lib/calculator-report-context';
import { CalculatorReportAction } from '@/components/calculators/CalculatorReportAction';
import { ArrowLeft } from 'lucide-react';
import PowerFactorCalculator from '@/components/apprentice/calculators/PowerFactorCalculator';
import CableSizingCalculator from '@/components/apprentice/calculators/CableSizingCalculator';

type ActiveTool = string | null;

interface ActiveToolContentProps {
  activeTool: ActiveTool;
  onClose: () => void;
}

const ActiveToolContent = ({ activeTool, onClose }: ActiveToolContentProps) => {
  if (!activeTool) return null;

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'powerCalculator':
        return (
          <CalcReportProvider>
            <div className="mb-3 flex justify-end">
              <CalculatorReportAction />
            </div>
            <PowerFactorCalculator />
          </CalcReportProvider>
        );
      case 'cableSizing':
        return (
          <CalcReportProvider>
            <div className="mb-3 flex justify-end">
              <CalculatorReportAction />
            </div>
            <CableSizingCalculator />
          </CalcReportProvider>
        );
      default:
        return (
          <div className="rounded-xl border border-white/[0.10] bg-white/[0.06] p-6 text-center space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Tool content
            </span>
            <p className="text-[14px] text-white leading-relaxed">
              Content for {activeTool} is being developed and will be available soon.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        onClick={onClose}
        className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to guidance area
      </Button>
      {renderActiveTool()}
    </div>
  );
};

export default ActiveToolContent;
