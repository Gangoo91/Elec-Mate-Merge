import { Button } from "@/components/ui/button";
import { Copy, Download, RotateCcw, Zap, Eye, AlertTriangle, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
    <div className="relative overflow-hidden rounded-xl border border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/5 via-background to-elec-yellow/5 shadow-lg">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fbbf2410_1px,transparent_1px),linear-gradient(to_bottom,#fbbf2410_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="relative px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <Zap className="h-10 w-10 text-elec-yellow" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Commissioning Specialist
              </h1>
              <Badge variant="outline" className="mt-2 border-elec-yellow/30 text-elec-yellow">
                BS 7671:2018+A3:2024
              </Badge>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3 mb-6">
          <Progress value={completionPercentage} className="h-2" />
          <div className="text-right">
            <span className="text-2xl font-bold text-foreground">{completionPercentage}%</span>
            <span className="text-sm text-foreground/70 ml-2">Complete</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-elec-dark/40 border border-elec-yellow/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-elec-yellow" />
              <div className="text-xs text-foreground/70">Visual</div>
            </div>
            <div className="text-2xl font-bold text-foreground">{visualCount}</div>
          </div>
          <div className="bg-elec-dark/40 border border-elec-yellow/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-elec-yellow" />
              <div className="text-xs text-foreground/70">Dead Tests</div>
            </div>
            <div className="text-2xl font-bold text-foreground">{deadCount}</div>
          </div>
          <div className="bg-elec-dark/40 border border-elec-yellow/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              <div className="text-xs text-foreground/70">Live Tests</div>
            </div>
            <div className="text-2xl font-bold text-foreground">{liveCount}</div>
          </div>
          <div className="bg-elec-dark/40 border border-elec-yellow/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <div className="text-xs text-foreground/70">Est. Time</div>
            </div>
            <div className="text-2xl font-bold text-foreground">{estimatedHours}h</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            onClick={onCopyChecklist}
            className="touch-manipulation border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Checklist
          </Button>
          <Button 
            variant="outline" 
            onClick={onExportPDF}
            className="touch-manipulation border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button 
            variant="ghost" 
            onClick={onStartOver}
            className="touch-manipulation ml-auto hover:bg-elec-yellow/10"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Start Over
          </Button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />
    </div>
  );
};
