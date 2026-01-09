import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface SegmentOption<T extends string> {
  value: T
  label: string
  icon?: React.ReactNode
}

export interface IOSSegmentedControlProps<T extends string> {
  options: SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
  size?: "default" | "large"
}

function IOSSegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  size = "default"
}: IOSSegmentedControlProps<T>) {
  const selectedIndex = options.findIndex(opt => opt.value === value)

  return (
    <div
      className={cn(
        "relative flex rounded-xl bg-white/10 p-1",
        "border border-white/10",
        className
      )}
    >
      {/* Animated selection indicator */}
      <motion.div
        className="absolute top-1 bottom-1 rounded-lg bg-elec-yellow"
        initial={false}
        animate={{
          left: `calc(${selectedIndex * (100 / options.length)}% + 4px)`,
          width: `calc(${100 / options.length}% - 8px)`,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      />

      {/* Options */}
      {options.map((option, index) => {
        const isSelected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "relative z-10 flex-1 flex items-center justify-center gap-2",
              "transition-colors duration-ios-fast",
              "touch-manipulation ios-pressable",
              size === "default" ? "py-2.5 px-3 text-ios-subhead" : "py-3.5 px-4 text-ios-body",
              isSelected
                ? "text-black font-semibold"
                : "text-white/60 font-medium hover:text-white/80"
            )}
          >
            {option.icon && (
              <span className={cn(
                "transition-transform duration-ios-fast",
                isSelected && "scale-110"
              )}>
                {option.icon}
              </span>
            )}
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

IOSSegmentedControl.displayName = "IOSSegmentedControl"

export { IOSSegmentedControl }
