
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        className={cn(
          // Base layout
          "flex w-full min-h-[100px] md:min-h-[80px]",
          "px-4 py-3 md:px-3 md:py-2",
          "text-base md:text-sm text-foreground",
          // Background & border - match Input
          "bg-input border border-border/50 rounded-lg",
          // Typography
          "font-sans font-[450] tracking-[0.005em] leading-[1.6]",
          // Placeholder
          "placeholder:text-muted-foreground/50",
          // Focus states - elec-yellow glow
          "focus:outline-none focus:border-elec-yellow focus:ring-0",
          "focus:shadow-[0_0_0_3px_hsl(var(--elec-yellow)/0.15)]",
          // Caret
          "caret-elec-yellow",
          // Transitions
          "transition-all duration-200 ease-out",
          // Resize
          "resize-y",
          // Disabled
          "disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-70",
          // Touch
          "touch-manipulation",
          // Selection
          "selection:bg-elec-yellow/20 selection:text-foreground",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
