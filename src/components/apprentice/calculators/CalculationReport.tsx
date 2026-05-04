import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CalculatorValidator } from '@/services/calculatorValidation';

interface CalculationReportProps {
  calculationType: string;
  inputs: { [key: string]: any };
  results: { [key: string]: any };
  validation: any;
  onDownload?: () => void;
}

const CalculationReport: React.FC<CalculationReportProps> = ({
  calculationType,
  inputs,
  results,
  validation,
  onDownload,
}) => {
  const generateReport = () => {
    if (!validation) return '';

    return CalculatorValidator.generateCalculationReport(
      calculationType,
      inputs,
      results,
      validation
    );
  };

  const downloadReport = () => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${calculationType.replace(/\s+/g, '_')}_calculation_report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (onDownload) {
      onDownload();
    }
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Calculation report
      </span>
      <p className="text-[13px] text-white/85 leading-relaxed">
        Generate a calculation report for documentation and compliance purposes.
      </p>

      <Button
        onClick={downloadReport}
        className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
      >
        <Download className="mr-2 h-4 w-4" />
        Download report
      </Button>

      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Report includes
        </span>
        <ul className="space-y-1.5">
          {[
            'All input parameters and calculated results',
            'Standards compliance verification',
            'Safety warnings and recommendations',
            'Validation status',
            'Timestamp and calculation methodology',
          ].map((item, i) => (
            <li
              key={i}
              className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalculationReport;
