import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

export interface IOSInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  icon?: React.ReactNode
}

const IOSInput = React.forwardRef<HTMLInputElement, IOSInputProps>(
  ({ label, error, hint, icon, className, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const isPasswordType = type === "password"
    const inputType = isPasswordType && showPassword ? "text" : type

    return (
      <div className="space-y-2">
        {/* Left-aligned label - iOS style */}
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

        {/* Input container */}
        <div className="relative">
          {/* Optional icon */}
          {icon && (
            <div
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2",
                "transition-colors duration-ios-fast",
                isFocused ? "text-elec-yellow" : "text-white/40"
              )}
            >
              {icon}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            className={cn(
              // Base sizing - 50px height for iOS touch targets
              "w-full h-[50px] py-3",
              icon ? "pl-12 pr-4" : "px-4",
              isPasswordType && "pr-12",
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
              "touch-manipulation",
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

          {/* Password toggle button */}
          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2",
                "p-1 rounded-lg",
                "text-white/40 hover:text-white/60",
                "transition-colors duration-ios-fast",
                "touch-manipulation"
              )}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
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

IOSInput.displayName = "IOSInput"

export { IOSInput }
