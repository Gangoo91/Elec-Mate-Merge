import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Card variants for consistent styling across the application.
 *
 * Variant Usage Guide:
 * - `default`   Standard card with subtle yellow border
 * - `elevated`  Gradient background for emphasis
 * - `subtle`    Minimal styling for nested/grouped cards
 * - `highlight` Yellow gradient for featured/promoted content
 */
const cardVariants = cva(
  "rounded-2xl border shadow-none overflow-hidden transition-all duration-200 touch-manipulation",
  {
    variants: {
      variant: {
        default: "bg-[#1e1e1e] border-elec-yellow/20",
        elevated: "bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20",
        subtle: "bg-white/5 border-white/10",
        highlight: "bg-gradient-to-br from-elec-yellow/20 to-orange-500/10 border-elec-yellow/30",
      },
      interactive: {
        true: "cursor-pointer hover:border-elec-yellow/40 hover:bg-[#222222] active:scale-[0.98] active:opacity-90",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, interactive, className }))}
      {...props}
    />
  )
)
Card.displayName = "Card"

/**
 * @deprecated Use Card with interactive={true} instead.
 * Example: <Card interactive>...</Card>
 */
const CardInteractive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Base card styling
      "rounded-2xl bg-[#1e1e1e] border border-elec-yellow/20",
      "shadow-none overflow-hidden",
      // Interactive states
      "hover:border-elec-yellow/40 hover:bg-[#222222]",
      "active:scale-[0.98] active:opacity-90",
      // Transitions
      "transition-all duration-200",
      "touch-manipulation cursor-pointer",
      className
    )}
    {...props}
  />
))
CardInteractive.displayName = "CardInteractive"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-4 sm:p-5", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg sm:text-xl font-semibold leading-tight tracking-tight text-white",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-white/60", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 sm:p-5 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 sm:p-5 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardInteractive, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
