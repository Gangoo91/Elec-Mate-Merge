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
      "flex w-full h-14 sm:h-12 md:h-11 items-center justify-between",
      "px-4 py-3 md:px-3 md:py-2",
      "text-base md:text-sm text-foreground text-left font-medium",
      // Background & border - premium glass feel
      "bg-input/80 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-lg",
      // Placeholder
      "placeholder:text-muted-foreground/50",
      // Focus states - elec-yellow glow
      "focus:outline-none focus:border-elec-yellow focus:ring-0",
      "focus:shadow-[0_0_0_3px_hsl(var(--elec-yellow)/0.15)]",
      // Active/pressed state - iOS-like feedback
      "active:scale-[0.98] active:bg-input",
      // Data state when open
      "data-[state=open]:border-elec-yellow/50 data-[state=open]:shadow-[0_0_0_3px_hsl(var(--elec-yellow)/0.1)]",
      // Transitions - smooth spring-like feel
      "transition-all duration-150 ease-out",
      // Disabled
      "disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-70 disabled:active:scale-100",
      // Touch
      "touch-manipulation select-none",
      className
    )}
    {...props}
  >
    <span className="block truncate text-left flex-1">{children}</span>
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-5 w-5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0 ml-2 transition-transform duration-200 data-[state=open]:rotate-180" />
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
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
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
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
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
        "relative z-[9999] min-w-[8rem] overflow-hidden",
        // Premium glass morphism
        "rounded-2xl sm:rounded-xl",
        "border border-white/10 bg-card/95 backdrop-blur-xl text-foreground",
        "shadow-2xl shadow-black/40",
        // Max height - taller on mobile for better UX
        "max-h-[min(70vh,28rem)] sm:max-h-[min(24rem,calc(100vh-8rem))]",
        // Animations - smoother on mobile
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      collisionPadding={16}
      avoidCollisions={true}
      sideOffset={8}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-2 sm:p-1.5 overflow-y-auto",
          "max-h-[min(65vh,26rem)] sm:max-h-[min(22rem,calc(100vh-10rem))]",
          "touch-manipulation overscroll-contain",
          "-webkit-overflow-scrolling-touch",
          // Smooth scrolling
          "scroll-smooth",
          position === "popper" &&
            "w-full min-w-[var(--radix-select-trigger-width)]"
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
    className={cn("py-2 md:py-1.5 pl-8 pr-2 text-sm md:text-sm font-semibold text-muted-foreground", className)}
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
      "rounded-xl sm:rounded-lg py-3.5 pl-10 pr-4 sm:py-3 sm:pl-9 sm:pr-3 md:py-2.5 md:pl-8 md:pr-2",
      "text-base md:text-sm outline-none font-medium",
      // Touch targets - iOS standard 44pt minimum
      "min-h-[52px] sm:min-h-[48px] md:min-h-[40px]",
      // Hover/Focus states - subtle highlight
      "hover:bg-white/5 focus:bg-white/5",
      // Active state - iOS-like press feedback
      "active:bg-elec-yellow/15 active:scale-[0.98]",
      // Selected/checked state - prominent highlight
      "data-[state=checked]:bg-elec-yellow/10 data-[state=checked]:text-elec-yellow",
      "data-[highlighted]:bg-white/5",
      // Disabled
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      // Touch & transitions
      "touch-manipulation transition-all duration-100 ease-out",
      className
    )}
    {...props}
  >
    <span className="absolute left-3 sm:left-2.5 md:left-2 flex h-5 w-5 sm:h-4 sm:w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-5 w-5 sm:h-4 sm:w-4 text-elec-yellow" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-2 sm:my-1 h-px bg-white/10", className)}
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
