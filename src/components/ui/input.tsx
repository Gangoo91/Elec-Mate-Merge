
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, inputMode, ...props }, ref) => {
    // Auto-set inputMode for better mobile experience
    const finalInputMode = inputMode || (type === 'number' ? 'decimal' : type === 'email' ? 'email' : type === 'tel' ? 'tel' : undefined);
    
    return (
      <input
        type={type}
        inputMode={finalInputMode}
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        className={cn(
          // Base layout & sizing
          "flex w-full h-12 md:h-11 px-4 py-3 md:px-3 md:py-2",
          "text-base md:text-sm text-foreground",
          // Background & border
          "bg-input border border-border/50 rounded-lg",
          // Typography
          "font-sans font-[450] tracking-[0.005em] leading-[1.5] text-left",
          // Placeholder
          "placeholder:text-muted-foreground/70",
          // Focus states - elec-yellow glow
          "focus:outline-none focus:border-elec-yellow focus:ring-0",
          "focus:shadow-[0_0_0_3px_hsl(var(--elec-yellow)/0.15)]",
          // Caret
          "caret-elec-yellow",
          // Transitions
          "transition-all duration-200 ease-out",
          // Disabled state
          "disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-70",
          // Touch optimization
          "touch-manipulation",
          // Selection
          "selection:bg-elec-yellow/20 selection:text-foreground",
          // File inputs
          "file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
