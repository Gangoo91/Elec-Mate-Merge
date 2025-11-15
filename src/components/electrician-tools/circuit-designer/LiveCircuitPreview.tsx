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
        {previewItems.map((item, index) => (
          <Card 
            key={index} 
            className={`p-4 border transition-all duration-200 ${
              item.status === 'completed' ? 'border-green-500/30 bg-green-500/5' :
              item.status === 'current' ? 'border-primary' :
              'border-dashed opacity-40'
            }`}
          >
            <div className="flex items-start gap-3">
              {item.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              {item.status === 'current' && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
              {item.status === 'pending' && <Circle className="w-5 h-5 text-muted-foreground" />}
              
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{item.name}</div>
                
                {item.status === 'current' && (
                  <div className="mt-2 space-y-1.5">
                    <div className="text-xs text-muted-foreground">Processing...</div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-3/4 transition-all" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="text-center text-sm text-muted-foreground">{completedCircuits} of {totalCircuits} circuits designed</div>
    </div>
  );
};
