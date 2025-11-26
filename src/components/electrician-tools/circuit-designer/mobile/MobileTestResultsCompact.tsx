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

    // Continuity (R1+R2) - Use expectedTests
    if (circuit.expectedTests?.r1r2) {
      results.push({
        test: 'Continuity (R1+R2)',
        expectedValue: `At 20°C: ${circuit.expectedTests.r1r2.at20C.toFixed(4)}Ω / At 70°C: ${circuit.expectedTests.r1r2.at70C.toFixed(4)}Ω`,
        passCriteria: 'Value recorded and consistent with cable length',
        regulation: circuit.expectedTests.r1r2.regulation,
        status: 'pass',
        colorClass: 'border-blue-500/50 bg-blue-500/10'
      });
    }

    // Earth Fault Loop Impedance (Zs) - Use expectedTests
    if (circuit.expectedTests?.zs) {
      const { expected, maxPermitted, compliant, marginPercent } = circuit.expectedTests.zs;
      const status = compliant ? 'pass' : 'fail';
      
      results.push({
        test: 'Earth Fault Loop (Zs)',
        expectedValue: `${expected.toFixed(3)}Ω (Max: ${maxPermitted.toFixed(3)}Ω) - ${marginPercent.toFixed(1)}% margin`,
        passCriteria: `Zs ≤ ${maxPermitted.toFixed(3)}Ω for disconnection time compliance`,
        regulation: circuit.expectedTests.zs.regulation,
        status,
        colorClass: status === 'pass' ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'
      });
    }

    // Insulation Resistance - Use expectedTests
    if (circuit.expectedTests?.insulationResistance) {
      results.push({
        test: 'Insulation Resistance',
        expectedValue: `${circuit.expectedTests.insulationResistance.minResistance} at ${circuit.expectedTests.insulationResistance.testVoltage}`,
        passCriteria: `Minimum ${circuit.expectedTests.insulationResistance.minResistance} between live conductors and earth`,
        regulation: circuit.expectedTests.insulationResistance.regulation,
        status: 'pass',
        colorClass: 'border-purple-500/50 bg-purple-500/10'
      });
    }

    // Polarity
    results.push({
      test: 'Polarity',
      expectedValue: 'Correct',
      passCriteria: 'All single-pole devices in phase conductor only',
      regulation: 'BS 7671 Reg 643.4',
      status: 'pass',
      colorClass: 'border-amber-500/50 bg-amber-500/10'
    });

    // RCD Test - Use expectedTests
    if (circuit.rcdProtected && circuit.expectedTests?.rcd) {
      results.push({
        test: 'RCD Trip Time',
        expectedValue: `Rating: ${circuit.expectedTests.rcd.ratingmA}mA, Max trip: <${circuit.expectedTests.rcd.maxTripTimeMs}ms`,
        passCriteria: `Trip within ${circuit.expectedTests.rcd.maxTripTimeMs}ms at rated current`,
        regulation: circuit.expectedTests.rcd.regulation,
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
