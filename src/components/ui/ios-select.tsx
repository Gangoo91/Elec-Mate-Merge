import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Check } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface IOSSelectOption {
  value: string
  label: string
  description?: string
}

export interface IOSSelectProps {
  label: string
  value: string
  onValueChange: (value: string) => void
  options: IOSSelectOption[]
  placeholder?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
  disabled?: boolean
}

const IOSSelect = React.forwardRef<HTMLButtonElement, IOSSelectProps>(
  ({ label, value, onValueChange, options, placeholder, error, hint, icon, disabled }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <div className="space-y-2">
        {/* Left-aligned label - iOS style */}
        <label
          className={cn(
            "block text-ios-subhead font-medium",
            "transition-colors duration-ios-fast",
            isOpen ? "text-elec-yellow" : "text-white/80",
            error && "text-red-400"
          )}
        >
          {label}
        </label>

        {/* Select container */}
        <Select
          value={value}
          onValueChange={onValueChange}
          onOpenChange={setIsOpen}
          disabled={disabled}
        >
          <SelectTrigger
            ref={ref}
            className={cn(
              // Base sizing - 50px height for iOS touch targets
              "w-full h-[50px] py-3",
              icon ? "pl-12 pr-4" : "px-4",
              // Typography - iOS body style
              "text-ios-body text-white",
              // Background & border - Consistent elec-yellow/gold styling
              "bg-gradient-to-br from-elec-yellow/[0.08] to-amber-950/20 rounded-xl border",
              "border-elec-yellow/30",
              // Focus/Open state
              "focus:outline-none",
              isOpen && "border-elec-yellow bg-elec-yellow/[0.12] shadow-[0_0_0_3px_hsl(var(--elec-yellow)/0.15)]",
              // Animation
              "transition-all duration-ios-normal ease-ios-ease",
              // Error state
              error && "border-red-400/60",
              // Touch optimization
              "touch-manipulation active:scale-[0.99]",
              // Disabled state
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {/* Optional icon */}
            {icon && (
              <div
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2",
                  "transition-colors duration-ios-fast",
                  isOpen ? "text-elec-yellow" : "text-white/40"
                )}
              >
                {icon}
              </div>
            )}
            <SelectValue placeholder={placeholder || "Select..."} />
          </SelectTrigger>

          <SelectContent
            className={cn(
              // Premium dropdown styling with gold accents
              "bg-[#1a1a1a]/98 backdrop-blur-xl",
              "border border-elec-yellow/20 rounded-xl",
              "shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_hsl(var(--elec-yellow)/0.1)]",
              "overflow-hidden"
            )}
          >
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className={cn(
                  "px-4 py-3.5 cursor-pointer",
                  "text-ios-body text-white",
                  "focus:bg-elec-yellow/15 focus:text-white",
                  "data-[state=checked]:bg-elec-yellow/25 data-[state=checked]:text-elec-yellow",
                  "transition-colors duration-ios-fast",
                  "touch-manipulation active:bg-elec-yellow/20"
                )}
              >
                <div className="flex flex-col">
                  <span>{option.label}</span>
                  {option.description && (
                    <span className="text-ios-caption-1 text-white/50 mt-0.5">
                      {option.description}
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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

IOSSelect.displayName = "IOSSelect"

export { IOSSelect }
