import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export interface IOSInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  icon?: React.ReactNode
  success?: boolean
  floatingLabel?: boolean
  compact?: boolean
}

const IOSInput = React.forwardRef<HTMLInputElement, IOSInputProps>(
  ({ label, error, hint, icon, success, floatingLabel = false, compact = false, className, type, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(!!value)
    const isPasswordType = type === "password"
    const inputType = isPasswordType && showPassword ? "text" : type

    React.useEffect(() => {
      setHasValue(!!value && String(value).length > 0)
    }, [value])

    const shouldFloatLabel = floatingLabel && (isFocused || hasValue)
    const inputHeight = compact ? "h-12" : "h-14"

    return (
      <div className={compact ? "space-y-1" : "space-y-1.5"}>
        {/* Standard label */}
        {!floatingLabel && (
          <label
            className={cn(
              "block font-medium transition-colors duration-200",
              compact ? "text-xs" : "text-sm",
              error ? "text-elec-yellow" : isFocused ? "text-elec-yellow" : "text-white/70"
            )}
          >
            {label}
          </label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Floating label */}
          {floatingLabel && (
            <motion.label
              initial={false}
              animate={{
                y: shouldFloatLabel ? -24 : 0,
                x: shouldFloatLabel ? (icon ? -28 : 0) : 0,
                scale: shouldFloatLabel ? 0.85 : 1,
                color: error
                  ? "hsl(47, 100%, 50%)"
                  : isFocused
                    ? "hsl(47, 100%, 50%)"
                    : shouldFloatLabel
                      ? "rgba(255, 255, 255, 0.7)"
                      : "rgba(255, 255, 255, 0.4)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 pointer-events-none font-medium origin-left",
                compact ? "text-sm" : "text-base",
                icon ? "left-11" : "left-4"
              )}
            >
              {label}
            </motion.label>
          )}

          {/* Icon */}
          {icon && (
            <div
              className={cn(
                "absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200",
                error ? "text-elec-yellow" : isFocused ? "text-elec-yellow" : "text-white/40"
              )}
            >
              {icon}
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            type={inputType}
            value={value}
            className={cn(
              "w-full rounded-xl transition-all duration-200",
              inputHeight,
              icon ? "pl-11 pr-4" : "px-4",
              isPasswordType && "pr-12",
              // Typography
              compact ? "text-sm" : "text-base",
              "text-white placeholder:text-white/30",
              // Clean dark background - NO red/amber tints
              "bg-white/[0.06] border",
              // Border states
              error
                ? "border-elec-yellow/50 focus:border-elec-yellow"
                : success
                  ? "border-green-500/50"
                  : isFocused
                    ? "border-elec-yellow/60"
                    : "border-white/10 hover:border-white/20",
              // Focus ring
              isFocused && !error && "ring-2 ring-elec-yellow/20",
              error && "ring-2 ring-elec-yellow/10",
              success && "ring-2 ring-green-500/10",
              // Focus state
              "focus:outline-none focus:bg-white/[0.08]",
              // Touch
              "touch-manipulation",
              // Selection
              "selection:bg-elec-yellow/30",
              className
            )}
            placeholder={floatingLabel ? "" : props.placeholder}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            onChange={(e) => {
              setHasValue(e.target.value.length > 0)
              props.onChange?.(e)
            }}
            {...props}
          />

          {/* Password toggle */}
          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white/70 active:text-elec-yellow transition-colors touch-manipulation"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          )}

          {/* Success indicator */}
          <AnimatePresence>
            {success && !isPasswordType && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2"
              >
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error indicator */}
          <AnimatePresence>
            {error && !isPasswordType && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2"
              >
                <div className="w-5 h-5 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                  <AlertCircle className="h-3 w-3 text-elec-yellow" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Error/hint text */}
        <AnimatePresence>
          {(hint || error) && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className={cn(
                "text-xs",
                error ? "text-elec-yellow" : "text-white/50"
              )}
            >
              {error || hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

IOSInput.displayName = "IOSInput"

export { IOSInput }
