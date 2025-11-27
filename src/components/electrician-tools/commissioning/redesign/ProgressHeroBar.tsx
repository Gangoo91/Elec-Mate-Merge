import { Button } from "@/components/ui/button";
import { Copy, Download, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { CommissioningResponse } from "@/types/commissioning-response";

interface ProgressHeroBarProps {
  results: CommissioningResponse;
  onCopyChecklist: () => void;
  onExportPDF: () => void;
  onStartOver: () => void;
  completionPercentage: number;
}

export const ProgressHeroBar = ({
  results,
  onCopyChecklist,
  onExportPDF,
  onStartOver,
  completionPercentage
}: ProgressHeroBarProps) => {
  const visualCount = results.structuredData?.testingProcedure?.visualInspection?.checkpoints?.length || 0;
  const deadCount = results.structuredData?.testingProcedure?.deadTests?.length || 0;
  const liveCount = results.structuredData?.testingProcedure?.liveTests?.length || 0;
  
  // Calculate estimated time (rough estimate: 5min per visual, 15min per dead, 20min per live)
  const estimatedMinutes = (visualCount * 5) + (deadCount * 15) + (liveCount * 20);
  const estimatedHours = Math.round(estimatedMinutes / 60 * 10) / 10;

  return (
    <div className="bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark border border-border/40 rounded-xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          🔌 Commissioning Checklist
        </h1>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <Progress value={completionPercentage} className="h-3" />
        <div className="text-right">
          <span className="text-2xl font-bold text-white">{completionPercentage}%</span>
          <span className="text-sm text-muted-foreground ml-2">Complete</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-background/40 border border-border/40 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">{visualCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Visual</div>
        </div>
        <div className="bg-background/40 border border-border/40 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-red-400">{deadCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Dead Tests</div>
        </div>
        <div className="bg-background/40 border border-border/40 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-yellow-400">{liveCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Live Tests</div>
        </div>
        <div className="bg-background/40 border border-border/40 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-400">{estimatedHours}h</div>
          <div className="text-sm text-muted-foreground mt-1">Est. Time</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button 
          variant="outline" 
          onClick={onCopyChecklist}
          className="touch-manipulation"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Checklist
        </Button>
        <Button 
          variant="outline" 
          onClick={onExportPDF}
          className="touch-manipulation"
        >
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
        <Button 
          variant="ghost" 
          onClick={onStartOver}
          className="touch-manipulation ml-auto"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Start Over
        </Button>
      </div>
    </div>
  );
};
