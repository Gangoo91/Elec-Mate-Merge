import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommissioningHeroSummaryProps {
  deadTestsCount: number;
  liveTestsCount: number;
  totalTests: number;
  completedTests?: number;
  estimatedDuration?: string;
  riskLevel?: 'low' | 'medium' | 'high';
}

const riskColors = {
  low: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20'
};

export const CommissioningHeroSummary = ({
  deadTestsCount,
  liveTestsCount,
  totalTests,
  completedTests = 0,
  estimatedDuration = "2-4 hours",
  riskLevel = 'medium'
}: CommissioningHeroSummaryProps) => {
  const completionPercentage = totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0;
  
  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-elec-yellow/5 via-background to-background border-elec-yellow/20 shadow-lg hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-semibold text-foreground">Testing Overview</h3>
        </div>
        
        {/* Desktop Layout - 5 columns */}
        <div className="hidden sm:grid sm:grid-cols-5 gap-4">
          {/* Total Tests */}
          <div className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 rounded-lg p-4 border border-elec-yellow/20 hover:border-elec-yellow/30 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-left">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-medium">Total Tests</span>
              </div>
              <div className="text-3xl font-black text-foreground text-center">{totalTests}</div>
            </div>
          </div>

          {/* Dead Tests */}
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-lg p-4 border border-red-500/20 hover:border-red-500/30 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-left">
                <XCircle className="h-4 w-4" />
                <span className="text-xs font-medium">Dead Tests</span>
              </div>
              <div className="text-3xl font-black text-foreground text-center">{deadTestsCount}</div>
            </div>
          </div>

          {/* Live Tests */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg p-4 border border-green-500/20 hover:border-green-500/30 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-left">
                <Zap className="h-4 w-4" />
                <span className="text-xs font-medium">Live Tests</span>
              </div>
              <div className="text-3xl font-black text-foreground text-center">{liveTestsCount}</div>
            </div>
          </div>

          {/* Duration */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4 border border-blue-500/20 hover:border-blue-500/30 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-left">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-medium">Duration</span>
              </div>
              <div className="text-xl font-black text-foreground text-center truncate" title={estimatedDuration}>
                {estimatedDuration}
              </div>
            </div>
          </div>

          {/* Risk Level */}
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-lg p-4 border border-amber-500/20 hover:border-amber-500/30 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-left">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs font-medium">Risk</span>
              </div>
              <Badge className={cn(riskColors[riskLevel], "text-sm font-bold uppercase w-full justify-center")}>
                {riskLevel}
              </Badge>
            </div>
          </div>
        </div>

        {/* Mobile Layout - 2 columns grid */}
        <div className="sm:hidden space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Total Tests */}
            <div className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 rounded-lg p-4 border border-elec-yellow/20 min-h-[100px] flex flex-col justify-between touch-manipulation">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-xs font-medium">TESTS</span>
              </div>
              <div className="text-4xl font-black text-foreground text-center">{totalTests}</div>
            </div>

            {/* Duration */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4 border border-blue-500/20 min-h-[100px] flex flex-col justify-between touch-manipulation">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span className="text-xs font-medium">DURATION</span>
              </div>
              <div className="text-2xl font-black text-foreground text-center truncate" title={estimatedDuration}>
                {estimatedDuration}
              </div>
            </div>

            {/* Dead Tests */}
            <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-lg p-4 border border-red-500/20 min-h-[100px] flex flex-col justify-between touch-manipulation">
              <div className="flex items-center gap-2 text-muted-foreground">
                <XCircle className="h-5 w-5" />
                <span className="text-xs font-medium">DEAD</span>
              </div>
              <div className="text-4xl font-black text-foreground text-center">{deadTestsCount}</div>
            </div>

            {/* Live Tests */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg p-4 border border-green-500/20 min-h-[100px] flex flex-col justify-between touch-manipulation">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="h-5 w-5" />
                <span className="text-xs font-medium">LIVE</span>
              </div>
              <div className="text-4xl font-black text-foreground text-center">{liveTestsCount}</div>
            </div>
          </div>

          {/* Risk Level - Full Width on Mobile */}
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-lg p-4 border border-amber-500/20 touch-manipulation">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm font-medium">RISK LEVEL</span>
              </div>
              <Badge className={cn(riskColors[riskLevel], "text-lg font-bold uppercase px-6 py-2")}>
                {riskLevel}
              </Badge>
            </div>
          </div>

          {/* Progress - Full Width on Mobile */}
          {completedTests > 0 && (
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg p-4 border border-purple-500/20 touch-manipulation">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Progress</span>
                <span className="text-lg font-bold text-foreground">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-background/50 rounded-full h-3">
                <div 
                  className="bg-elec-yellow h-3 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
