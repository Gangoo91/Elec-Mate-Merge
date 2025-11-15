import { Card } from '@/components/ui/card';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LiveCircuitPreviewProps {
  totalCircuits: number;
  completedCircuits: number;
  currentCircuitName?: string;
  recentlyCompleted?: string[];
}

export const LiveCircuitPreview = ({
  totalCircuits,
  completedCircuits,
  currentCircuitName,
  recentlyCompleted = []
}: LiveCircuitPreviewProps) => {
  // Generate preview items
  const previewItems = Array.from({ length: Math.min(totalCircuits, 5) }, (_, i) => {
    const isCompleted = i < completedCircuits;
    const isCurrent = i === completedCircuits;
    const isPending = i > completedCircuits;
    const name = recentlyCompleted[i] || `Circuit ${i + 1}`;

    return {
      index: i,
      isCompleted,
      isCurrent,
      isPending,
      name: isCompleted ? name : isCurrent ? (currentCircuitName || `Designing ${name}...`) : name
    };
  });

  const hasMore = totalCircuits > 5;

  return (
    <div className="space-y-2 sm:space-y-3">
      <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">
        Circuits: {completedCircuits} of {totalCircuits} designed
      </h3>
      
      <div className="space-y-1.5 sm:space-y-2">
        {previewItems.map((item) => (
          <Card 
            key={item.index}
            className={cn(
              "p-2 sm:p-3 transition-all duration-300",
              item.isCompleted && "bg-primary/5 border-primary/20",
              item.isCurrent && "bg-primary/10 border-primary/30 animate-pulse",
              item.isPending && "bg-muted/30 border-border/50 opacity-60"
            )}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Status Icon */}
              <div className="flex-shrink-0">
                {item.isCompleted && (
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                )}
                {item.isCurrent && (
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary animate-spin" />
                )}
                {item.isPending && (
                  <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/40" />
                )}
              </div>

              {/* Circuit Name */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-xs sm:text-sm truncate",
                  item.isCompleted && "text-foreground font-medium",
                  item.isCurrent && "text-foreground font-semibold",
                  item.isPending && "text-muted-foreground"
                )}>
                  {item.name}
                </p>
                {item.isCurrent && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Calculating cable sizes & protection...
                  </p>
                )}
              </div>

              {/* Completion Badge */}
              {item.isCompleted && (
                <div className="flex-shrink-0">
                  <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                    ✓
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}

        {/* More Indicator */}
        {hasMore && (
          <div className="text-center py-1.5 sm:py-2">
            <span className="text-xs text-muted-foreground">
              + {totalCircuits - 5} more circuit{totalCircuits - 5 !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
