import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, Zap, FileText } from "lucide-react";
import type { CommissioningResponse } from "@/types/commissioning-response";

interface TestingSummaryStatsProps {
  results: CommissioningResponse;
}

const TestingSummaryStats = ({ results }: TestingSummaryStatsProps) => {
  // Calculate total tests (Visual checkpoints + Dead tests + Live tests)
  const visualCheckpoints = results.structuredData?.testingProcedure?.visualInspection?.checkpoints.length || 0;
  const deadTests = results.structuredData?.testingProcedure?.deadTests?.length || 0;
  const liveTests = results.structuredData?.testingProcedure?.liveTests?.length || 0;
  const totalTestItems = visualCheckpoints + deadTests + liveTests;

  // Calculate estimated duration (15 mins per test item average)
  const estimatedDuration = (totalTestItems * 15) / 60;

  // Get max Zs value from circuits
  const maxZs = results.circuits?.length > 0 
    ? Math.max(...results.circuits.map((c: any) => parseFloat(c.zsMax || '0'))).toFixed(2)
    : 'N/A';

  // Get certificate type and extract abbreviation
  const certificateType = results.structuredData?.certification?.certificateType || 'EIC';
  
  const getCertificateAbbreviation = (certType: string): string => {
    // Extract abbreviation from parentheses (e.g., "EIC" from "Certificate (EIC)")
    const match = certType.match(/\(([A-Z]+)\)/);
    if (match) return match[1];
    
    // If no parentheses, try to extract first 3-4 uppercase letters
    const abbrev = certType.match(/^[A-Z]{2,4}/);
    if (abbrev) return abbrev[0];
    
    // Fallback: return as-is but truncate to 10 chars max
    return certType.length > 10 ? certType.substring(0, 10) : certType;
  };
  
  const certificateAbbreviation = getCertificateAbbreviation(certificateType);
  const circuitCount = results.circuits?.length || 0;

  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-500/5 via-background to-background border-purple-500/20">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-purple-400" />
        Testing Procedure Summary
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 auto-rows-fr">
        {/* Total Tests */}
        <div className="bg-elec-gray/50 rounded-lg p-4 border border-purple-500/10 hover:border-purple-500/30 transition-all hover:scale-105">
          <div className="flex flex-col items-center text-center">
            <CheckCircle2 className="h-5 w-5 text-purple-400 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">
              {totalTestItems}
            </div>
            <div className="text-xs text-white">Test Items</div>
            <div className="text-xs text-white mt-1">
              {visualCheckpoints}V + {deadTests}D + {liveTests}L
            </div>
          </div>
        </div>

        {/* Expected Duration */}
        <div className="bg-elec-gray/50 rounded-lg p-4 border border-purple-500/10 hover:border-purple-500/30 transition-all hover:scale-105">
          <div className="flex flex-col items-center text-center">
            <Clock className="h-5 w-5 text-purple-400 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">
              {estimatedDuration.toFixed(1)}h
            </div>
            <div className="text-xs text-white">Expected Duration</div>
            <div className="text-xs text-white mt-1">
              ~{Math.round(estimatedDuration * 60)} minutes
            </div>
          </div>
        </div>

        {/* Highest Zs Value */}
        <div className="bg-elec-gray/50 rounded-lg p-4 border border-purple-500/10 hover:border-purple-500/30 transition-all hover:scale-105">
          <div className="flex flex-col items-center text-center">
            <Zap className="h-5 w-5 text-purple-400 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">
              {maxZs === 'N/A' ? 'N/A' : `${maxZs}Ω`}
            </div>
            <div className="text-xs text-white">Highest Zs Value</div>
            <div className="text-xs text-white mt-1">
              {circuitCount > 0 
                ? `${circuitCount} circuit${circuitCount === 1 ? '' : 's'}`
                : 'No circuits tested'}
            </div>
          </div>
        </div>

        {/* Certificate Required */}
        <div className="bg-elec-gray/50 rounded-lg p-4 border border-purple-500/10 hover:border-purple-500/30 transition-all hover:scale-105">
          <div className="flex flex-col items-center text-center">
            <FileText className="h-5 w-5 text-purple-400 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">
              {certificateAbbreviation}
            </div>
            <div className="text-xs text-white">Certificate Required</div>
            <div className="text-xs text-white mt-1">
              {results.structuredData?.certification?.requiredSchedules?.length || 0} schedules
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TestingSummaryStats;
