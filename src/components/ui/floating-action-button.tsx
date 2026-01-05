import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  label?: string;
  className?: string;
  variant?: "primary" | "secondary";
}

export function FloatingActionButton({
  icon,
  onClick,
  label,
  className,
  variant = "primary"
}: FloatingActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed z-50 rounded-full shadow-lg touch-feedback",
        "bottom-6 right-4 h-14 w-14",
        "pb-safe",
        variant === "primary" 
          ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-gold" 
          : "bg-card text-foreground border border-border hover:bg-muted",
        className
      )}
      aria-label={label}
    >
      {icon}
    </Button>
  );
}
