import * as React from "react"
import { cn } from "@/lib/utils"

interface IOSStepIndicatorProps {
  steps: number
  currentStep: number // 0-indexed
  className?: string
}

const IOSStepIndicator: React.FC<IOSStepIndicatorProps> = ({
  steps,
  currentStep,
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {Array.from({ length: steps }).map((_, index) => {
        const isActive = index === currentStep
        const isCompleted = index < currentStep

        return (
          <div
            key={index}
            className={cn(
              "h-2 rounded-full transition-all duration-ios-normal ease-ios-ease",
              // Active: wide pill shape
              isActive && "w-8 bg-elec-yellow",
              // Completed: small dot, slightly dimmed
              isCompleted && "w-2 bg-elec-yellow/60",
              // Pending: small dot, very dim
              !isActive && !isCompleted && "w-2 bg-white/20"
            )}
          />
        )
      })}
    </div>
  )
}

// Alternative style with step numbers for longer flows
interface IOSStepIndicatorNumberedProps {
  steps: { label: string }[]
  currentStep: number // 0-indexed
  className?: string
}

const IOSStepIndicatorNumbered: React.FC<IOSStepIndicatorNumberedProps> = ({
  steps,
  currentStep,
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      {steps.map((step, index) => {
        const isActive = index === currentStep
        const isCompleted = index < currentStep

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              {/* Step circle */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  "text-ios-caption-1 font-semibold",
                  "transition-all duration-ios-normal ease-ios-ease",
                  isActive && "bg-elec-yellow text-black",
                  isCompleted && "bg-elec-yellow/20 text-elec-yellow",
                  !isActive && !isCompleted && "bg-white/10 text-white/40"
                )}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {/* Step label - only show on active */}
              <span
                className={cn(
                  "mt-2 text-ios-caption-2 transition-opacity duration-ios-fast",
                  isActive ? "text-white/80 opacity-100" : "opacity-0"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 -mt-6",
                  "transition-colors duration-ios-normal",
                  isCompleted ? "bg-elec-yellow/40" : "bg-white/10"
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export { IOSStepIndicator, IOSStepIndicatorNumbered }
