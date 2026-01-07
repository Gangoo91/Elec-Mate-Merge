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
}

const IOSInput = React.forwardRef<HTMLInputElement, IOSInputProps>(
  ({ label, error, hint, icon, success, floatingLabel = false, className, type, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(!!value)
    const isPasswordType = type === "password"
    const inputType = isPasswordType && showPassword ? "text" : type

    // Track if input has value
    React.useEffect(() => {
      setHasValue(!!value && String(value).length > 0)
    }, [value])

    const shouldFloatLabel = floatingLabel && (isFocused || hasValue)

    return (
      <div className="space-y-2">
        {/* Standard label (non-floating) */}
        {!floatingLabel && (
          <motion.label
            initial={false}
            animate={{
              color: error ? "rgb(248 113 113)" : isFocused ? "hsl(var(--elec-yellow))" : "rgba(255,255,255,0.8)"
            }}
            transition={{ duration: 0.2 }}
            className="block text-ios-subhead font-medium"
          >
            {label}
          </motion.label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Floating label */}
          {floatingLabel && (
            <motion.label
              initial={false}
              animate={{
                y: shouldFloatLabel ? -28 : 0,
                x: shouldFloatLabel ? (icon ? -32 : 0) : 0,
                scale: shouldFloatLabel ? 0.85 : 1,
                color: error
                  ? "rgb(248 113 113)"
                  : isFocused
                    ? "hsl(var(--elec-yellow))"
                    : shouldFloatLabel
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(255,255,255,0.4)"
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 pointer-events-none",
                "text-ios-body font-medium origin-left",
                icon ? "left-12" : "left-4"
              )}
            >
              {label}
            </motion.label>
          )}

          {/* Optional icon */}
          {icon && (
            <motion.div
              initial={false}
              animate={{
                color: error
                  ? "rgb(248 113 113)"
                  : isFocused
                    ? "hsl(var(--elec-yellow))"
                    : "rgba(255,255,255,0.4)",
                scale: isFocused ? 1.05 : 1
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            >
              {icon}
            </motion.div>
          )}

          {/* Glow effect on focus */}
          <AnimatePresence>
            {isFocused && !error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 rounded-2xl bg-elec-yellow/5 pointer-events-none"
                style={{ filter: "blur(8px)" }}
              />
            )}
          </AnimatePresence>

          <motion.div
            initial={false}
            animate={{
              borderColor: error
                ? "rgba(248, 113, 113, 0.6)"
                : success
                  ? "rgba(34, 197, 94, 0.6)"
                  : isFocused
                    ? "hsla(var(--elec-yellow-hsl), 0.6)"
                    : "rgba(255,255,255,0.1)",
              boxShadow: isFocused && !error
                ? "0 0 0 4px hsla(var(--elec-yellow-hsl), 0.1), 0 4px 12px rgba(0,0,0,0.1)"
                : error
                  ? "0 0 0 4px rgba(248, 113, 113, 0.1)"
                  : success
                    ? "0 0 0 4px rgba(34, 197, 94, 0.1)"
                    : "none"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative"
          >
            <input
              ref={ref}
              type={inputType}
              value={value}
              className={cn(
                // Base sizing - 56px height for premium feel
                "w-full h-[56px] py-3",
                icon ? "pl-12 pr-4" : "px-4",
                isPasswordType && "pr-12",
                // Typography - iOS body style
                "text-ios-body text-white placeholder:text-white/40",
                // Background & border - premium rounded
                "bg-white/[0.03] rounded-2xl border-2 border-transparent",
                // Focus state - handled by motion wrapper
                "focus:outline-none",
                "focus:bg-white/[0.06]",
                // Animation
                "transition-colors duration-200",
                // Touch optimization
                "touch-manipulation",
                // Selection
                "selection:bg-elec-yellow/20",
                // Autofill styling
                "[&:-webkit-autofill]:bg-white/[0.03]",
                "[&:-webkit-autofill]:shadow-[0_0_0_30px_rgba(255,255,255,0.03)_inset]",
                "[&:-webkit-autofill]:[-webkit-text-fill-color:white]",
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
          </motion.div>

          {/* Password toggle button */}
          {isPasswordType && (
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2",
                "p-1.5 rounded-lg",
                "text-white/40 hover:text-white/70 active:text-elec-yellow",
                "transition-colors duration-150",
                "touch-manipulation"
              )}
              tabIndex={-1}
            >
              <AnimatePresence mode="wait">
                {showPassword ? (
                  <motion.div
                    key="hide"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <EyeOff className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="show"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Eye className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          {/* Success indicator */}
          <AnimatePresence>
            {success && !isPasswordType && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error indicator */}
          <AnimatePresence>
            {error && !isPasswordType && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hint/Error text with animation */}
        <AnimatePresence mode="wait">
          {(hint || error) && (
            <motion.p
              key={error ? "error" : "hint"}
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "text-ios-caption-1 overflow-hidden",
                error ? "text-red-400" : "text-white/50"
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
