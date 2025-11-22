import { Activity, CheckCircle2, XCircle } from "lucide-react";
import {
  MobileAccordion,
  MobileAccordionContent,
  MobileAccordionItem,
  MobileAccordionTrigger,
} from "@/components/ui/mobile-accordion";

interface MobileTestResultsProps {
  circuit: any;
}

export const MobileTestResults = ({ circuit }: MobileTestResultsProps) => {
  const structuredOutput = circuit.structuredOutput;
  
  if (!structuredOutput?.expectedTestResults) return null;

  const testResults = structuredOutput.expectedTestResults;
  const zsCompliant = circuit.zs <= circuit.maxZs;

  return (
    <MobileAccordion type="single" collapsible className="w-full">
      <MobileAccordionItem value="tests">
        <MobileAccordionTrigger icon={<Activity className="h-5 w-5" />}>
          Expected Test Results
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="bg-elec-card border border-elec-yellow/10 rounded-b-lg p-4 space-y-3">
            {/* R1+R2 */}
            {testResults.r1r2 && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-blue-400">R1+R2 (Ω)</span>
                  <span className="text-sm text-white font-mono">{testResults.r1r2.expected}</span>
                </div>
                <p className="text-xs text-white/70">{testResults.r1r2.notes}</p>
              </div>
            )}

            {/* Zs */}
            {testResults.zs && (
              <div className={`${zsCompliant ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'} border rounded-lg p-3`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-white">Zs (Ω)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white font-mono">{circuit.zs}Ω</span>
                    {zsCompliant ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-white/70">
                  Max permitted: {circuit.maxZs}Ω {zsCompliant ? '✓' : '✗'}
                </p>
              </div>
            )}

            {/* IR */}
            {testResults.insulationResistance && (
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-purple-400">Insulation Resistance</span>
                  <span className="text-sm text-white font-mono">{testResults.insulationResistance.minimum}</span>
                </div>
                <p className="text-xs text-white/70">{testResults.insulationResistance.notes}</p>
              </div>
            )}

            {/* RCD */}
            {testResults.rcd && (
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-cyan-400">RCD Test</span>
                  <span className="text-sm text-white font-mono">{testResults.rcd.tripTime}</span>
                </div>
                <p className="text-xs text-white/70">{testResults.rcd.notes}</p>
              </div>
            )}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>
    </MobileAccordion>
  );
};
