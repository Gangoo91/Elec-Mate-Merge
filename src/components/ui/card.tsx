import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Base card styling - lighter grey with gold ring
      "rounded-2xl bg-[#1e1e1e] border border-elec-yellow/20",
      // Modern shadow and overflow
      "shadow-none overflow-hidden",
      // Smooth transitions for interactions
      "transition-all duration-200",
      // Touch-friendly interactions
      "touch-manipulation",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

// Interactive card variant for clickable cards
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

export { Card, CardInteractive, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
