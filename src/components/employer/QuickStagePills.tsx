import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
  if (!isActive) return 'bg-[hsl(0_0%_12%)] text-white hover:bg-[hsl(0_0%_12%)] border-white/[0.08]';

  switch (stageId) {
    case 'Quoted':
      return 'bg-[hsl(0_0%_12%)]-foreground text-background border-white/[0.08]-foreground';
    case 'Confirmed':
      return 'bg-info text-info-foreground border-info';
    case 'Scheduled':
      return 'bg-warning text-warning-foreground border-warning';
    case 'In Progress':
      return 'bg-elec-yellow text-elec-yellow-foreground border-elec-yellow';
    case 'Testing':
      return 'bg-purple-500 text-white border-purple-500';
    case 'Complete':
      return 'bg-success text-success-foreground border-success';
    default:
      return 'bg-elec-yellow text-elec-yellow-foreground border-elec-yellow';
  }
};

export function QuickStagePills({
  stages,
  counts,
  activeStage,
  onStageClick,
}: QuickStagePillsProps) {
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar -mx-1 px-1">
      {stages.map((stage) => (
        <button
          key={stage.id}
          onClick={() => onStageClick(stage.id)}
          className={cn(
            'flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all',
            'border flex items-center gap-1.5',
            getStageColor(stage.id, activeStage === stage.id)
          )}
        >
          <span className="truncate max-w-[80px]">{stage.label}</span>
          <Badge
            variant="secondary"
            className={cn(
              'h-5 px-1.5 text-xs',
              activeStage === stage.id && 'bg-[hsl(0_0%_8%)]/20 text-inherit'
            )}
          >
            {counts[stage.id] || 0}
          </Badge>
        </button>
      ))}
    </div>
  );
}
