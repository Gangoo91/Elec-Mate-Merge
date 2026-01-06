
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Size - larger touch target
      "peer h-7 w-7 md:h-6 md:w-6 shrink-0",
      // Border & rounded
      "rounded-md border-2 border-border",
      // Background
      "bg-input",
      // Layout
      "flex items-center justify-center",
      // Focus states
      "focus:outline-none focus:border-elec-yellow",
      "focus:shadow-[0_0_0_3px_hsl(var(--elec-yellow)/0.15)]",
      // Checked state - elec-yellow
      "data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow",
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
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-background")}
    >
      <Check className="h-4 w-4 stroke-[3]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
