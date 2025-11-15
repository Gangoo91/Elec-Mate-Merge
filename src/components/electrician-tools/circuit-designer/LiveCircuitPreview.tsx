import { Card } from "@/components/ui/card";
import { CheckCircle2, Loader2, Circle, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface LiveCircuitPreviewProps {
  totalCircuits: number;
  completedCircuits: number;
  currentCircuitName?: string;
  recentlyCompleted?: string[];
}

export const LiveCircuitPreview = ({ totalCircuits, completedCircuits, currentCircuitName, recentlyCompleted = [] }: LiveCircuitPreviewProps) => {
  const [justCompleted, setJustCompleted] = useState<string | null>(null);
  
  useEffect(() => {
    if (recentlyCompleted.length > 0) {
      const latest = recentlyCompleted[recentlyCompleted.length - 1];
      setJustCompleted(latest);
      const timer = setTimeout(() => setJustCompleted(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [recentlyCompleted]);

  const previewItems = Array.from({ length: Math.min(totalCircuits, 5) }, (_, i) => {
    const status = i < completedCircuits ? 'completed' : i === completedCircuits ? 'current' : 'pending';
    const name = recentlyCompleted[i] || `Circuit ${i + 1}`;
    return { index: i, status, name: status === 'completed' ? name : status === 'current' ? (currentCircuitName || `Designing ${name}...`) : name };
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {previewItems.map((item, index) => {
          const isJustCompleted = justCompleted === item.name;
          return (
            <Card key={index} className={`p-5 transition-all duration-500 hover:shadow-lg ${item.status === 'completed' ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 hover:border-emerald-500/50' : ''} ${item.status === 'current' ? 'border-elec-yellow ring-2 ring-elec-yellow/20 shadow-lg shadow-elec-yellow/10 relative overflow-hidden' : ''} ${item.status === 'pending' ? 'opacity-40 border-dashed hover:opacity-60 hover:scale-[1.02]' : ''} ${isJustCompleted ? 'animate-card-flip' : ''}`} style={{ animationDelay: `${index * 50}ms` }}>
              {item.status === 'current' && <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-elec-yellow to-transparent animate-scan-line opacity-50" />}
              {isJustCompleted && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent animate-shimmer-wave" />}
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {item.status === 'completed' && <div className="relative"><CheckCircle2 className="w-6 h-6 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />{isJustCompleted && <div className="absolute inset-0 w-6 h-6 border-2 border-emerald-500 rounded-full animate-ping" />}</div>}
                  {item.status === 'current' && <div className="relative"><Zap className="w-6 h-6 text-elec-yellow animate-pulse-glow" /><Loader2 className="w-6 h-6 text-elec-yellow animate-spin absolute inset-0" /></div>}
                  {item.status === 'pending' && <Circle className="w-6 h-6 text-muted-foreground" />}
                </div>
                <div className="flex-1 space-y-2">
                  <div className={`font-semibold text-sm ${item.status === 'current' ? 'text-elec-yellow' : ''}`}>{item.name}</div>
                  {item.status === 'completed' && recentlyCompleted.includes(item.name) && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Completed</span>
                    </div>
                  )}
                  {item.status === 'current' && (
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground animate-pulse">Calculating cable size...</div>
                      <div className="w-full h-1 bg-muted/30 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-elec-yellow to-orange-500 animate-shimmer bg-[length:200%_100%]" style={{ width: '75%' }} /></div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="text-center text-sm text-muted-foreground">{completedCircuits} of {totalCircuits} circuits designed</div>
    </div>
  );
};
