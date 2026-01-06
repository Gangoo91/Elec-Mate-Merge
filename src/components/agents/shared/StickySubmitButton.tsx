import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { AgentType, AGENT_CONFIG } from "./AgentConfig";

interface StickySubmitButtonProps {
  agentType: AgentType;
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  customLabel?: string;
}

export function StickySubmitButton({
  agentType,
  onClick,
  isLoading = false,
  isDisabled = false,
  className,
  customLabel,
}: StickySubmitButtonProps) {
  const config = AGENT_CONFIG[agentType];
  const label = customLabel || config.submitLabel;

  return (
    <>
      {/* Spacer for mobile to prevent content being hidden behind sticky button */}
      <div className="h-20 sm:hidden" />

      {/* Sticky container on mobile, static on desktop */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe",
          "bg-background/95 backdrop-blur-xl border-t border-white/10",
          "sm:static sm:p-0 sm:bg-transparent sm:backdrop-blur-none sm:border-none",
          className
        )}
      >
        <Button
          onClick={onClick}
          disabled={isLoading || isDisabled}
          className={cn(
            "w-full h-14 text-base font-semibold rounded-xl",
            "touch-manipulation active:scale-[0.98] transition-all duration-150",
            "shadow-lg",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          style={{
            background: isLoading || isDisabled
              ? "rgba(255,255,255,0.1)"
              : `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
            boxShadow: isLoading || isDisabled
              ? "none"
              : `0 4px 20px ${config.gradientFrom}40`,
            color: isLoading || isDisabled ? "rgba(255,255,255,0.5)" : "#000",
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              {label}
            </>
          )}
        </Button>
      </div>
    </>
  );
}

// Non-sticky version for inline use
export function AgentSubmitButton({
  agentType,
  onClick,
  isLoading = false,
  isDisabled = false,
  className,
  customLabel,
  size = "default",
}: StickySubmitButtonProps & { size?: "default" | "sm" }) {
  const config = AGENT_CONFIG[agentType];
  const label = customLabel || config.submitLabel;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading || isDisabled}
      className={cn(
        "font-semibold rounded-xl",
        "touch-manipulation active:scale-[0.98] transition-all duration-150",
        "shadow-lg",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        size === "default" ? "h-12 px-6" : "h-10 px-4 text-sm",
        className
      )}
      style={{
        background: isLoading || isDisabled
          ? "rgba(255,255,255,0.1)"
          : `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
        boxShadow: isLoading || isDisabled
          ? "none"
          : `0 4px 20px ${config.gradientFrom}40`,
        color: isLoading || isDisabled ? "rgba(255,255,255,0.5)" : "#000",
      }}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
}
