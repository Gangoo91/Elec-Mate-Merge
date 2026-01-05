import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButton {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "default" | "primary" | "destructive" | "success";
  disabled?: boolean;
}

interface MobileActionBarProps {
  actions: ActionButton[];
  className?: string;
}

const variantStyles = {
  default: "bg-muted hover:bg-muted/80 text-foreground",
  primary: "bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark",
  destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
  success: "bg-success hover:bg-success/90 text-success-foreground",
};

/**
 * Fixed bottom action bar for mobile.
 * Use for primary actions that should always be accessible.
 */
export function MobileActionBar({ actions, className }: MobileActionBarProps) {
  if (actions.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40",
        "bg-elec-gray/95 backdrop-blur-lg border-t border-elec-yellow/20",
        "px-4 py-3 pb-safe",
        "md:hidden", // Only show on mobile
        className
      )}
    >
      <div className="flex gap-2">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const isLast = index === actions.length - 1;

          return (
            <Button
              key={index}
              onClick={action.onClick}
              disabled={action.disabled}
              className={cn(
                "flex-1 h-12 gap-2 text-sm font-medium transition-all",
                "active:scale-[0.98]",
                variantStyles[action.variant || "default"],
                isLast && actions.length > 1 && "flex-[2]" // Last button is wider if multiple
              )}
            >
              <Icon className="h-4 w-4" />
              {action.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Floating action button for mobile.
 * Use for a single primary action.
 */
interface MobileFABProps {
  icon: LucideIcon;
  label?: string;
  onClick: () => void;
  variant?: "default" | "primary";
  className?: string;
}

export function MobileFAB({
  icon: Icon,
  label,
  onClick,
  variant = "primary",
  className
}: MobileFABProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed z-40 shadow-lg transition-all",
        "active:scale-95 hover:shadow-xl",
        "flex items-center justify-center gap-2",
        label
          ? "bottom-20 right-4 h-12 px-5 rounded-full"
          : "bottom-20 right-4 h-14 w-14 rounded-full",
        variant === "primary"
          ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          : "bg-elec-gray text-foreground border border-border hover:bg-muted",
        "md:bottom-6", // Higher on mobile to avoid bottom nav
        className
      )}
    >
      <Icon className={cn("shrink-0", label ? "h-4 w-4" : "h-6 w-6")} />
      {label && <span className="font-medium text-sm">{label}</span>}
    </button>
  );
}
