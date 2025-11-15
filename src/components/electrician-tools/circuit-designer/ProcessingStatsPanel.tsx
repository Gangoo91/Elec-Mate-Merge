import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedProgressRing } from "./AnimatedProgressRing";
import { useEffect, useState } from "react";
import { Clock, Zap, CheckCircle2 } from "lucide-react";
import { animateValue } from "@/utils/animation-helpers";

interface ProcessingStatsPanelProps {
  currentStage: number;
  currentPercent: number;
  totalCircuits: number;
  completedCircuits: number;
  currentStepName: string;
  startTime: Date;
}

export const ProcessingStatsPanel = ({ currentStage, currentPercent, totalCircuits, completedCircuits, currentStepName, startTime }: ProcessingStatsPanelProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [displayCompleted, setDisplayCompleted] = useState(0);
  
  useEffect(() => {
    const cleanup = animateValue(displayCompleted, completedCircuits, 600, (value) => setDisplayCompleted(Math.round(value)));
    return cleanup;
  }, [completedCircuits, displayCompleted]);

  useEffect(() => {
    const interval = setInterval(() => { setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000)); }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const estimatedRemaining = Math.max(0, 180 - elapsedTime);

  return (
    <div className="space-y-6 lg:sticky lg:top-6">
      <Card className="overflow-hidden bg-gradient-to-br from-background to-background/80 backdrop-blur-sm border-border/50">
        <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><Zap className="w-4 h-4 text-elec-yellow" />Overall Progress</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center"><AnimatedProgressRing progress={currentPercent} size={140} strokeWidth={10} /></div>
          <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-border/50">
            <div className="space-y-1"><div className="text-muted-foreground flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />Elapsed</div><div className="font-bold text-lg tabular-nums animate-count-up">{formatTime(elapsedTime)}</div></div>
            <div className="space-y-1"><div className="text-muted-foreground flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />Remaining</div><div className="font-bold text-lg tabular-nums animate-count-up">~{formatTime(estimatedRemaining)}</div></div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-background to-background/80 backdrop-blur-sm border-border/50">
        <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" />Circuit Progress</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Designed</span><span className="font-bold text-2xl tabular-nums animate-count-up">{displayCompleted} <span className="text-base text-muted-foreground">of {totalCircuits}</span></span></div>
            <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden"><div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700 rounded-full relative overflow-hidden" style={{ width: `${(completedCircuits / totalCircuits) * 100}%` }}><div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%]" /></div></div>
            <div className="flex gap-1.5 flex-wrap">{[...Array(totalCircuits)].map((_, i) => (<div key={i} className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold transition-all duration-500 ${i < completedCircuits ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-muted/30 text-muted-foreground'}`} style={{ animationDelay: `${i * 100}ms` }}>{i < completedCircuits ? '⚡' : i + 1}</div>))}</div>
          </div>
          <div className="text-sm text-muted-foreground pt-2 border-t border-border/50">{totalCircuits - completedCircuits} circuits remaining</div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-background to-background/80 backdrop-blur-sm border-border/50 overflow-hidden relative">
        <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><div className="flex gap-0.5"><div className="w-1.5 h-1.5 rounded-full bg-elec-yellow animate-pulse" style={{ animationDelay: '0ms' }} /><div className="w-1.5 h-1.5 rounded-full bg-elec-yellow animate-pulse" style={{ animationDelay: '150ms' }} /><div className="w-1.5 h-1.5 rounded-full bg-elec-yellow animate-pulse" style={{ animationDelay: '300ms' }} /></div>What's Happening Now</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3"><div className="font-bold text-base leading-relaxed animate-fade-in">{currentStepName}</div><div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-elec-yellow/10 border border-elec-yellow/30"><Zap className="w-3.5 h-3.5 text-elec-yellow" /><span className="text-xs font-semibold text-elec-yellow">Stage {currentStage} of 8</span></div></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-elec-yellow/5 to-transparent rounded-full blur-2xl" />
        </CardContent>
      </Card>
    </div>
  );
};
