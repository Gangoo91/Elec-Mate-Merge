import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Stage {
  id: string;
  label: string;
  color?: string;
}

interface QuickStagePillsProps {
  stages: Stage[];
  counts: Record<string, number>;
  activeStage?: string;
  onStageClick: (stageId: string) => void;
}

// Get stage-specific colours
const getStageColor = (stageId: string, isActive: boolean): string => {
  if (!isActive) return "bg-elec-gray text-muted-foreground hover:bg-muted border-border";
  
  switch (stageId) {
    case "Quoted": return "bg-muted-foreground text-background border-muted-foreground";
    case "Confirmed": return "bg-info text-info-foreground border-info";
    case "Scheduled": return "bg-warning text-warning-foreground border-warning";
    case "In Progress": return "bg-elec-yellow text-elec-yellow-foreground border-elec-yellow";
    case "Testing": return "bg-purple-500 text-foreground border-purple-500";
    case "Complete": return "bg-success text-success-foreground border-success";
    default: return "bg-elec-yellow text-elec-yellow-foreground border-elec-yellow";
  }
};

export function QuickStagePills({ stages, counts, activeStage, onStageClick }: QuickStagePillsProps) {
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);
  
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar -mx-1 px-1">
      {stages.map((stage) => (
        <button
          key={stage.id}
          onClick={() => onStageClick(stage.id)}
          className={cn(
            "flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
            "border flex items-center gap-1.5",
            getStageColor(stage.id, activeStage === stage.id)
          )}
        >
          <span className="truncate max-w-[80px]">{stage.label}</span>
          <Badge 
            variant="secondary" 
            className={cn(
              "h-5 px-1.5 text-xs",
              activeStage === stage.id && "bg-background/20 text-inherit"
            )}
          >
            {counts[stage.id] || 0}
          </Badge>
        </button>
      ))}
    </div>
  );
}
