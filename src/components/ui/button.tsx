import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button variants using class-variance-authority (cva)
 *
 * Variant Usage Guide:
 * - `accent`         Primary CTA (elec-yellow background) - Use for main actions
 * - `accent-outline` Secondary actions with yellow border
 * - `accent-ghost`   Subtle yellow text actions
 * - `default`        Standard primary button
 * - `outline`        Tertiary/navigation actions
 * - `ghost`          Minimal/inline actions
 * - `secondary`      Alternative primary style
 * - `destructive`    Dangerous/delete actions
 * - `link`           Text link style
 *
 * iOS-Native Variants (for mobile-first onboarding):
 * - `ios-primary`    iOS-style primary button with yellow bg, scale press
 * - `ios-secondary`  iOS-style secondary with glass effect
 * - `ios-ghost`      iOS-style ghost with yellow text
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-manipulation active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        link: "text-primary underline-offset-4 hover:underline active:opacity-70",
        accent: "bg-elec-yellow text-black hover:bg-elec-yellow/90 active:bg-elec-yellow/80 font-semibold shadow-sm",
        "accent-outline": "border-2 border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/60 active:bg-elec-yellow/20 font-medium",
        "accent-ghost": "text-elec-yellow hover:bg-elec-yellow/10 hover:text-elec-yellow/90 active:bg-elec-yellow/20 font-medium",
        // iOS-Native variants
        "ios-primary": "bg-elec-yellow text-black font-semibold rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-ios-fast ease-ios-ease active:scale-[0.97] active:shadow-[0_1px_4px_rgba(0,0,0,0.1)]",
        "ios-secondary": "bg-white/10 text-white font-medium rounded-xl border border-white/20 transition-all duration-ios-fast ease-ios-ease active:scale-[0.97] active:bg-white/15",
        "ios-ghost": "text-elec-yellow font-medium rounded-xl bg-transparent transition-all duration-ios-fast ease-ios-ease active:bg-elec-yellow/10",
      },
      size: {
        default: "h-12 px-4 py-3 text-base md:h-10 md:px-4 md:py-2 md:text-sm min-h-[44px] md:min-h-0",
        sm: "h-11 px-3 py-2 text-sm md:h-9 md:px-3 md:py-2 md:text-xs min-h-[44px] md:min-h-0",
        lg: "h-14 px-6 py-4 text-base md:h-11 md:px-8 md:text-sm min-h-[48px] md:min-h-0",
        icon: "h-12 w-12 md:h-10 md:w-10 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0",
        // iOS-native sizes
        "ios-large": "h-[56px] px-8 text-ios-headline",
        "ios-default": "h-[50px] px-6 text-ios-body",
        "ios-small": "h-[44px] px-4 text-ios-subhead",
        "ios-icon": "h-[50px] w-[50px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
