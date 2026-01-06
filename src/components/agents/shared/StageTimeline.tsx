import { cn } from "@/lib/utils";
import { Check, Search, Zap, FileText, ShieldCheck } from "lucide-react";
import { AgentType, AGENT_CONFIG, PROCESSING_STAGES } from "./AgentConfig";

interface StageTimelineProps {
  currentStage: number; // 1-4
  agentType: AgentType;
  className?: string;
  compact?: boolean;
}

const stageIcons = {
  Search: Search,
  Zap: Zap,
  FileText: FileText,
  ShieldCheck: ShieldCheck,
};

export function StageTimeline({
  currentStage,
  agentType,
  className,
  compact = false,
}: StageTimelineProps) {
  const config = AGENT_CONFIG[agentType];

  return (
    <div className={cn("space-y-2", className)}>
      {PROCESSING_STAGES.map((stage, index) => {
        const isCompleted = stage.id < currentStage;
        const isActive = stage.id === currentStage;
        const isPending = stage.id > currentStage;
        const Icon = stageIcons[stage.icon as keyof typeof stageIcons];

        return (
          <div
            key={stage.id}
            className={cn(
              "flex items-center gap-3 rounded-xl p-2 sm:p-3 transition-all duration-300",
              isActive && "bg-white/5",
              compact && "p-1.5 sm:p-2"
            )}
          >
            {/* Icon container */}
            <div
              className={cn(
                "relative flex items-center justify-center rounded-xl transition-all duration-300",
                compact ? "h-8 w-8" : "h-10 w-10",
                isCompleted && "bg-success/20",
                isActive && "animate-pulse",
                isPending && "bg-white/5"
              )}
              style={
                isActive
                  ? {
                      background: `linear-gradient(135deg, ${config.gradientFrom}20, ${config.gradientTo}20)`,
                      boxShadow: `0 0 20px ${config.gradientFrom}30`,
                    }
                  : undefined
              }
            >
              {isCompleted ? (
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
              ) : (
                <Icon
                  className={cn(
                    compact ? "h-4 w-4" : "h-4 w-4 sm:h-5 sm:w-5",
                    isActive && config.colorClass,
                    isPending && "text-white/40"
                  )}
                  style={
                    isActive
                      ? { color: config.gradientFrom }
                      : undefined
                  }
                />
              )}

              {/* Active ring animation */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-xl animate-ping opacity-30"
                  style={{
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }}
                />
              )}
            </div>

            {/* Label */}
            <span
              className={cn(
                "text-xs sm:text-sm font-medium transition-colors duration-300",
                isCompleted && "text-success",
                isActive && "text-white",
                isPending && "text-white/40"
              )}
              style={
                isActive
                  ? { color: config.gradientFrom }
                  : undefined
              }
            >
              {stage.label}
            </span>

            {/* Completion indicator */}
            {isCompleted && !compact && (
              <span className="ml-auto text-[10px] text-success/60 hidden sm:inline">
                Complete
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Helper function to calculate current stage from progress
export function getStageFromProgress(progress: number): number {
  if (progress < 20) return 1;
  if (progress < 50) return 2;
  if (progress < 85) return 3;
  return 4;
}
