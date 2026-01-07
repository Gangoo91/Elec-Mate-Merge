import * as React from "react"
import { cn } from "@/lib/utils"

export interface IOSTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
  showCharCount?: boolean
  maxChars?: number
  minChars?: number
}

const IOSTextarea = React.forwardRef<HTMLTextAreaElement, IOSTextareaProps>(
  ({ label, error, hint, showCharCount, maxChars, minChars = 0, className, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const charCount = typeof value === 'string' ? value.length : 0

    const getCharCountColor = () => {
      if (maxChars && charCount > maxChars) return "text-red-400"
      if (minChars && charCount >= minChars) return "text-emerald-400"
      if (charCount > 0) return "text-white/60"
      return "text-white/40"
    }

    return (
      <div className="space-y-2">
        {/* Left-aligned label - iOS style */}
        <div className="flex items-center justify-between">
          <label
            className={cn(
              "block text-ios-subhead font-medium",
              "transition-colors duration-ios-fast",
              isFocused ? "text-elec-yellow" : "text-white/80",
              error && "text-red-400"
            )}
          >
            {label}
          </label>

          {/* Character counter */}
          {showCharCount && (
            <span className={cn(
              "text-ios-caption-1 font-medium tabular-nums transition-colors",
              getCharCountColor()
            )}>
              {charCount}
              {minChars > 0 && charCount >= minChars && (
                <span className="ml-1">✓</span>
              )}
              {maxChars && <span className="text-white/30">/{maxChars}</span>}
            </span>
          )}
        </div>

        {/* Textarea container */}
        <div className="relative">
          <textarea
            ref={ref}
            value={value}
            className={cn(
              // Base sizing
              "w-full min-h-[120px] py-4 px-4",
              // Typography - iOS body style
              "text-ios-body text-white placeholder:text-white/40",
              // Background & border - iOS style rounded rect
              "bg-white/5 rounded-xl border-2",
              "border-white/10",
              // Focus state
              "focus:outline-none focus:border-elec-yellow/60",
              "focus:bg-white/8",
              "focus:shadow-[0_0_0_4px_hsl(var(--elec-yellow)/0.1)]",
              // Animation
              "transition-all duration-ios-normal ease-ios-ease",
              // Error state
              error && "border-red-400/60 focus:border-red-400",
              // Touch optimization
              "touch-manipulation resize-none",
              // Selection
              "selection:bg-elec-yellow/20",
              className
            )}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            {...props}
          />
        </div>

        {/* Hint/Error text */}
        {(hint || error) && (
          <p
            className={cn(
              "text-ios-caption-1",
              error ? "text-red-400" : "text-white/50"
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    )
  }
)

IOSTextarea.displayName = "IOSTextarea"

export { IOSTextarea }
