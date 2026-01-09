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
 *
 * iOS-Native Variants:
 * - `ios`          iOS glassmorphism card with backdrop blur
 * - `ios-elevated` iOS elevated card with stronger blur and shadow
 */
const cardVariants = cva(
  "rounded-xl border shadow-none overflow-hidden transition-all duration-200 touch-manipulation",
  {
    variants: {
      variant: {
        default: "bg-card border-border/30",
        elevated: "bg-gradient-to-br from-elec-gray to-elec-card border-border/30",
        subtle: "bg-muted/30 border-border/20",
        highlight: "bg-gradient-to-br from-elec-yellow/10 to-orange-500/5 border-elec-yellow/30",
        // iOS-native glassmorphism cards
        ios: "bg-white/10 backdrop-blur-xl rounded-2xl border-white/10 shadow-[0_2px_16px_rgba(0,0,0,0.2)]",
        "ios-elevated": "bg-white/[0.12] backdrop-blur-xl rounded-2xl border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
      },
      interactive: {
        true: "cursor-pointer hover:border-elec-yellow/40 hover:bg-muted/50 active:scale-[0.99] active:opacity-95",
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
      "rounded-xl bg-card border border-border/30",
      "shadow-none overflow-hidden",
      // Interactive states
      "hover:border-elec-yellow/40 hover:bg-muted/50",
      "active:scale-[0.99] active:opacity-95",
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
