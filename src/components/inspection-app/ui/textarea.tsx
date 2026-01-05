
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
          "flex min-h-[80px] w-full rounded-md border border-border bg-black hover:bg-black px-3 py-2 text-base text-foreground ring-offset-background",
          "font-sans font-[450] tracking-[0.005em] leading-[1.5]",
          "will-change-[contents] transform-gpu backface-visibility-hidden",
          "transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out",
          "placeholder:text-neutral-500 placeholder:transition-colors placeholder:duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 focus-visible:ring-offset-0",
          "focus:bg-black focus:border-elec-yellow focus:shadow-lg focus:shadow-elec-yellow/20 focus:scale-[1.002]",
          "disabled:cursor-not-allowed disabled:bg-background disabled:text-neutral-400 disabled:opacity-100",
          "resize-none touch-manipulation",
          "md:min-h-[80px] md:px-3 md:py-2 md:text-sm",
          "selection:bg-primary/20 selection:text-foreground",
          "caret-elec-yellow",
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
