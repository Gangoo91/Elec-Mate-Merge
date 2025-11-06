import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, Zap, FileText } from "lucide-react";
import type { CommissioningResponse } from "@/types/commissioning-response";

interface TestingSummaryStatsProps {
  results: CommissioningResponse;
}

const TestingSummaryStats = ({ results }: TestingSummaryStatsProps) => {
  // Calculate total tests
  const visualCheckpoints = results.structuredData?.testingProcedure?.visualInspection?.checkpoints.length || 0;
  const deadTests = results.structuredData?.testingProcedure?.deadTests?.length || 0;
  const liveTests = results.structuredData?.testingProcedure?.liveTests?.length || 0;
  const totalTests = visualCheckpoints + deadTests + liveTests;

  // Calculate estimated duration (15 mins per test average)
  const estimatedDuration = (totalTests * 15) / 60;

  // Get max Zs value from circuits
  const maxZs = results.circuits?.length > 0 
    ? Math.max(...results.circuits.map((c: any) => parseFloat(c.zsMax || '0'))).toFixed(2)
    : 'N/A';

  // Get certificate type
  const certificateType = results.structuredData?.certification?.certificateType || 'EIC';

  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-500/5 via-background to-background border-purple-500/20">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-purple-400" />
        Testing Procedure Summary
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Tests */}
        <div className="bg-elec-gray/50 rounded-lg p-4 border border-purple-500/10 hover:border-purple-500/30 transition-all hover:scale-105">
          <div className="flex flex-col items-center text-center">
            <CheckCircle2 className="h-5 w-5 text-purple-400 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">
              {totalTests}
            </div>
            <div className="text-xs text-muted-foreground">Total Tests</div>
            <div className="text-xs text-muted-foreground mt-1">
              {visualCheckpoints}V / {deadTests}D / {liveTests}L
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
            <div className="text-xs text-muted-foreground">Expected Duration</div>
            <div className="text-xs text-muted-foreground mt-1">
              ~{Math.round(estimatedDuration * 60)} minutes
            </div>
          </div>
        </div>

        {/* Highest Zs Value */}
        <div className="bg-elec-gray/50 rounded-lg p-4 border border-purple-500/10 hover:border-purple-500/30 transition-all hover:scale-105">
          <div className="flex flex-col items-center text-center">
            <Zap className="h-5 w-5 text-purple-400 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">
              {maxZs}Ω
            </div>
            <div className="text-xs text-muted-foreground">Highest Zs Value</div>
            <div className="text-xs text-muted-foreground mt-1">
              {results.circuits?.length || 0} circuits
            </div>
          </div>
        </div>

        {/* Certificate Required */}
        <div className="bg-elec-gray/50 rounded-lg p-4 border border-purple-500/10 hover:border-purple-500/30 transition-all hover:scale-105">
          <div className="flex flex-col items-center text-center">
            <FileText className="h-5 w-5 text-purple-400 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">
              {certificateType}
            </div>
            <div className="text-xs text-muted-foreground">Certificate Required</div>
            <div className="text-xs text-muted-foreground mt-1">
              {results.structuredData?.certification?.requiredSchedules?.length || 0} schedules
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TestingSummaryStats;
