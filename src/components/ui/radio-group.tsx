import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // Size - larger touch target
        "aspect-square h-6 w-6 md:h-5 md:w-5 shrink-0",
        // Border & shape
        "rounded-full border-2 border-border",
        // Background
        "bg-input",
        // Focus states
        "focus:outline-none focus:border-elec-yellow",
        "focus:shadow-[0_0_0_3px_hsl(var(--elec-yellow)/0.15)]",
        // Checked state
        "data-[state=checked]:border-elec-yellow data-[state=checked]:bg-elec-yellow/10",
        // Transitions
        "transition-all duration-200 ease-out",
        // Active press
        "active:scale-95",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Touch
        "touch-manipulation",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3 w-3 md:h-2.5 md:w-2.5 fill-elec-yellow text-elec-yellow" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
