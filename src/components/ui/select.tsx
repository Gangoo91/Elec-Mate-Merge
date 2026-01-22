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
      // Base layout - larger touch targets on mobile
      "flex w-full h-14 sm:h-12 items-center justify-between",
      "px-4 py-3",
      "text-base text-foreground text-left font-medium",
      // Background & border - premium glass feel
      "bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl",
      // Placeholder
      "placeholder:text-muted-foreground/50",
      // Focus states - elec-yellow glow
      "focus:outline-none focus:border-elec-yellow/60",
      "focus:shadow-[0_0_0_3px_hsl(var(--elec-yellow)/0.15)]",
      // Active/pressed state - iOS-like feedback
      "active:scale-[0.98] active:bg-white/8",
      // Data state when open
      "data-[state=open]:border-elec-yellow/60",
      "data-[state=open]:shadow-[0_0_0_3px_hsl(var(--elec-yellow)/0.15)]",
      "data-[state=open]:bg-white/8",
      // Transitions
      "transition-all duration-200 ease-out",
      // Disabled
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Touch
      "touch-manipulation select-none",
      className
    )}
    {...props}
  >
    <span className="block truncate text-left flex-1">{children}</span>
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-5 w-5 text-white/50 flex-shrink-0 ml-2 transition-transform duration-200" />
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
      "flex cursor-default items-center justify-center py-2",
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
      "flex cursor-default items-center justify-center py-2",
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
        // Premium styling
        "rounded-2xl",
        "border border-white/15 bg-[#1c1c1e] text-foreground",
        "shadow-2xl shadow-black/50",
        // Width constraints
        "min-w-[200px] w-[var(--radix-select-trigger-width)]",
        // Max height
        "max-h-[min(70vh,400px)]",
        // Animations
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
        "duration-200",
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
          "max-h-[min(65vh,380px)]",
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
      "py-2 pl-4 pr-2 text-xs uppercase tracking-wider font-semibold text-white/40",
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
      // Base
      "relative flex w-full cursor-pointer select-none items-center",
      "rounded-xl py-4 pl-11 pr-4",
      "text-base outline-none font-medium",
      // Touch targets - 56px minimum
      "min-h-[56px]",
      // Default state
      "text-white/90",
      // Hover/Focus states
      "focus:bg-white/5",
      // Active state - press feedback
      "active:bg-elec-yellow/20 active:scale-[0.98]",
      // Selected state
      "data-[state=checked]:bg-elec-yellow/15",
      "data-[state=checked]:text-elec-yellow",
      "data-[highlighted]:bg-white/5",
      // Disabled
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      // Touch & transitions
      "touch-manipulation transition-all duration-150 ease-out",
      className
    )}
    {...props}
  >
    {/* Check icon */}
    <span className="absolute left-3 flex h-6 w-6 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-5 w-5 text-elec-yellow" strokeWidth={2.5} />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText className="flex-1">{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-white/10", className)}
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
