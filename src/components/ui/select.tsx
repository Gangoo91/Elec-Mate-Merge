import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base layout - iOS-style large touch targets
      "flex w-full h-14 sm:h-12 items-center justify-between",
      "px-4 py-3 gap-2",
      "text-[16px] sm:text-[15px] text-white text-left font-medium",
      // Background & border - premium dark glass feel
      "bg-white/[0.06] backdrop-blur-sm",
      "border border-white/[0.12] rounded-xl",
      // Placeholder
      "[&>span:first-child]:text-white/40 [&>span:first-child:not(:empty)]:text-white",
      // Focus states - elec-yellow glow
      "focus:outline-none focus:border-elec-yellow/50",
      "focus:ring-2 focus:ring-elec-yellow/20",
      // Active/pressed state - iOS-like feedback
      "active:scale-[0.98] active:bg-white/[0.08]",
      // Data state when open
      "data-[state=open]:border-elec-yellow/50",
      "data-[state=open]:ring-2 data-[state=open]:ring-elec-yellow/20",
      "data-[state=open]:bg-white/[0.08]",
      // Transitions
      "transition-all duration-150 ease-out",
      // Disabled
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Touch
      "touch-manipulation select-none cursor-pointer",
      className
    )}
    {...props}
  >
    <span className="block truncate text-left flex-1">{children}</span>
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-5 w-5 text-white/40 flex-shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-2 bg-gradient-to-b from-[#1c1c1e] to-transparent",
      "sticky top-0 z-10",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4 text-white/50" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-2 bg-gradient-to-t from-[#1c1c1e] to-transparent",
      "sticky bottom-0 z-10",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4 text-white/50" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        // Base
        "relative z-[9999] overflow-hidden",
        // Premium iOS-style styling - darker, more contrast
        "rounded-2xl",
        "border border-white/[0.12] bg-[#1c1c1e] backdrop-blur-xl",
        "text-foreground",
        "shadow-2xl shadow-black/70",
        // Width constraints
        "min-w-[260px] w-[var(--radix-select-trigger-width)]",
        // Max height for scrolling
        "max-h-[min(70vh,420px)]",
        // Animations - iOS-style spring
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
        "duration-200 ease-out",
        className
      )}
      position={position}
      sideOffset={8}
      align="center"
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-2 overflow-y-auto",
          "max-h-[min(65vh,400px)]",
          "touch-manipulation overscroll-contain",
          "[&]:[-webkit-overflow-scrolling:touch]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "py-2.5 pl-4 pr-2 text-[11px] uppercase tracking-wider font-semibold text-elec-yellow/70",
      className
    )}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      // Base - allow multi-line content
      "relative flex w-full cursor-pointer select-none items-start",
      "rounded-xl py-3.5 sm:py-3 pl-11 pr-4",
      "text-[16px] sm:text-[15px] outline-none",
      // Touch targets - 52px minimum on mobile
      "min-h-[52px] sm:min-h-[48px]",
      // Default state
      "text-white",
      // Add subtle bottom border for separation
      "border-b border-white/[0.04] last:border-b-0",
      // Hover/Focus states - subtle highlight
      "focus:bg-white/[0.08]",
      "data-[highlighted]:bg-white/[0.08]",
      // Active state - press feedback like iOS
      "active:bg-elec-yellow/15 active:scale-[0.99]",
      // Selected state - yellow accent with glow
      "data-[state=checked]:bg-elec-yellow/10",
      "data-[state=checked]:border-l-2 data-[state=checked]:border-l-elec-yellow",
      // Disabled
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      // Touch & transitions
      "touch-manipulation transition-all duration-100 ease-out",
      className
    )}
    {...props}
  >
    {/* Check icon - positioned left */}
    <span className="absolute left-3 top-3.5 sm:top-3 flex h-6 w-6 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-5 w-5 text-elec-yellow" strokeWidth={2.5} />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText className="flex-1 [&>div]:flex [&>div]:flex-col [&>div]:gap-0.5">
      {children}
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("my-2 mx-3 h-px bg-white/[0.1]", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
