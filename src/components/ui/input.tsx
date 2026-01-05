
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
          "flex h-12 w-full px-4 py-3 text-base text-foreground bg-input border border-border rounded-lg ring-offset-0 opacity-100 relative isolate",
          "font-sans font-[450] tracking-[0.005em] leading-[1.5] text-left",
          "will-change-[contents] transform-gpu backface-visibility-hidden backdrop-blur-none",
          "transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out",
          "file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground/60 placeholder:transition-colors placeholder:duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-0",
          "focus:border-primary focus:shadow-lg focus:shadow-primary/20 focus:scale-[1.002]",
          "disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100",
          "touch-manipulation",
          "md:h-10 md:px-3 md:py-2 md:text-sm",
          "selection:bg-primary/20 selection:text-foreground",
          "caret-primary",
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
