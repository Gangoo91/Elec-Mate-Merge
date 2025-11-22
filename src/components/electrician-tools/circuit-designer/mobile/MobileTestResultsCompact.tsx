import { 
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent
} from '@/components/ui/mobile-accordion';
import { Badge } from '@/components/ui/badge';
import { ClipboardCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface TestResult {
  test: string;
  expectedValue: string;
  passCriteria: string;
  regulation: string;
  status?: 'pass' | 'warning' | 'fail';
  colorClass?: string;
}

interface MobileTestResultsCompactProps {
  circuit: any;
}

export const MobileTestResultsCompact = ({ circuit }: MobileTestResultsCompactProps) => {
  const buildTestResults = (): TestResult[] => {
    const results: TestResult[] = [];

    // Continuity (R1+R2)
    if (circuit.calculations?.r1r2) {
      results.push({
        test: 'Continuity (R1+R2)',
        expectedValue: `${circuit.calculations.r1r2.toFixed(3)}Ω`,
        passCriteria: 'Value recorded and consistent',
        regulation: 'BS 7671 Part 6',
        status: 'pass',
        colorClass: 'border-blue-500/50 bg-blue-500/10'
      });
    }

    // Earth Fault Loop Impedance (Zs)
    if (circuit.calculations?.zs !== undefined && circuit.calculations?.maxZs !== undefined) {
      const zs = circuit.calculations.zs;
      const maxZs = circuit.calculations.maxZs;
      const status = zs <= maxZs ? 'pass' : 'fail';
      
      results.push({
        test: 'Earth Fault Loop (Zs)',
        expectedValue: `${zs.toFixed(2)}Ω (Max: ${maxZs.toFixed(2)}Ω)`,
        passCriteria: `Zs ≤ ${maxZs.toFixed(2)}Ω`,
        regulation: 'BS 7671:411.4.5',
        status,
        colorClass: status === 'pass' ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'
      });
    }

    // Insulation Resistance
    results.push({
      test: 'Insulation Resistance',
      expectedValue: '≥1MΩ (500V DC)',
      passCriteria: 'Min 1MΩ between live conductors and earth',
      regulation: 'BS 7671:612.3.2',
      status: 'pass',
      colorClass: 'border-purple-500/50 bg-purple-500/10'
    });

    // Polarity
    results.push({
      test: 'Polarity',
      expectedValue: 'Correct',
      passCriteria: 'All single-pole devices in phase conductor',
      regulation: 'BS 7671:612.6',
      status: 'pass',
      colorClass: 'border-amber-500/50 bg-amber-500/10'
    });

    // RCD Test (if applicable)
    if (circuit.rcdProtection) {
      results.push({
        test: 'RCD Trip Time',
        expectedValue: `≤40ms @ ${circuit.rcdRating || 30}mA`,
        passCriteria: `Trip within 40ms at rated current`,
        regulation: 'BS 7671:411.4.9',
        status: 'pass',
        colorClass: 'border-cyan-500/50 bg-cyan-500/10'
      });
    }

    return results;
  };

  const testResults = buildTestResults();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-elec-light px-1 flex items-center gap-2">
        <ClipboardCheck className="h-4 w-4 text-elec-yellow" />
        Expected Test Results
      </h3>

      <MobileAccordion type="multiple" className="space-y-2">
        {testResults.map((result, idx) => (
          <MobileAccordionItem 
            key={idx} 
            value={`test-${idx}`}
            className={`border-l-4 ${result.colorClass || 'border-elec-yellow/50'} rounded-lg overflow-hidden`}
          >
            <MobileAccordionTrigger
              icon={result.status === 'pass' ? 
                <CheckCircle2 className="h-5 w-5 text-green-400" /> : 
                <AlertCircle className="h-5 w-5 text-red-400" />
              }
              className="bg-elec-gray/50 hover:bg-elec-gray/70"
            >
              <div className="flex items-center justify-between w-full pr-8">
                <span className="text-sm font-medium">{result.test}</span>
                <Badge 
                  variant="outline" 
                  className={`ml-2 text-xs ${
                    result.status === 'pass' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                    result.status === 'warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                    'bg-red-500/10 text-red-400 border-red-500/30'
                  }`}
                >
                  {result.status === 'pass' ? 'Pass' : result.status === 'warning' ? 'Check' : 'Review'}
                </Badge>
              </div>
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10 space-y-3">
                <div>
                  <p className="text-xs text-white/60 mb-1">Expected Value</p>
                  <p className="text-sm font-semibold text-elec-light">{result.expectedValue}</p>
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-1">Pass Criteria</p>
                  <p className="text-sm text-white/90">{result.passCriteria}</p>
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-1">Regulation</p>
                  <Badge variant="outline" className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                    {result.regulation}
                  </Badge>
                </div>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        ))}
      </MobileAccordion>

      <div className="mt-3 p-3 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
        <p className="text-xs text-white/80">
          <strong>Note:</strong> All test results must be recorded on the Electrical Installation Certificate (EIC) as per BS 7671 Part 6.
        </p>
      </div>
    </div>
  );
};
