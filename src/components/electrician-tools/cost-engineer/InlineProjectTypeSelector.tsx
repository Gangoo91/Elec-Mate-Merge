import { Home, Building2, Factory } from "lucide-react";
import { cn } from "@/lib/utils";
import { AGENT_CONFIG, type AgentType } from "@/components/agents/shared/AgentConfig";

interface InlineProjectTypeSelectorProps {
  selectedType: 'domestic' | 'commercial' | 'industrial';
  onTypeChange: (type: 'domestic' | 'commercial' | 'industrial') => void;
  agentType?: AgentType;
}

const TYPE_CONFIG = {
  domestic: { label: 'Domestic', icon: Home },
  commercial: { label: 'Commercial', icon: Building2 },
  industrial: { label: 'Industrial', icon: Factory }
} as const;

export const InlineProjectTypeSelector = ({
  selectedType,
  onTypeChange,
  agentType = 'cost-engineer'
}: InlineProjectTypeSelectorProps) => {
  const config = AGENT_CONFIG[agentType];

  return (
    <div className="grid grid-cols-3 gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
      {(Object.entries(TYPE_CONFIG) as [keyof typeof TYPE_CONFIG, typeof TYPE_CONFIG[keyof typeof TYPE_CONFIG]][]).map(([key, typeConfig]) => {
        const Icon = typeConfig.icon;
        const isSelected = selectedType === key;

        return (
          <button
            key={key}
            onClick={() => onTypeChange(key)}
            className={cn(
              "flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl",
              "transition-all duration-200 touch-manipulation active:scale-[0.98]",
              "min-h-[56px] font-medium",
              isSelected && "shadow-lg"
            )}
            style={
              isSelected
                ? {
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    color: '#000',
                  }
                : {
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.6)',
                  }
            }
          >
            <Icon
              className={cn("h-5 w-5", !isSelected && "opacity-60")}
              style={!isSelected ? { color: config.gradientFrom } : undefined}
            />
            <span className={cn(
              "text-xs font-semibold",
              !isSelected && "text-white/80"
            )}>
              {typeConfig.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
