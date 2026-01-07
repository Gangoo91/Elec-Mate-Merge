import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      // Base
      "flex cursor-pointer select-none items-center",
      "rounded-xl sm:rounded-lg px-3 py-3 sm:px-2.5 sm:py-2.5 md:py-2",
      "text-base sm:text-sm outline-none font-medium",
      // Touch targets
      "min-h-[48px] sm:min-h-[44px] md:min-h-[36px]",
      // States
      "hover:bg-white/5 focus:bg-white/5",
      "active:bg-elec-yellow/15",
      "data-[state=open]:bg-white/5",
      // Transitions
      "touch-manipulation transition-colors duration-100",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-5 w-5 sm:h-4 sm:w-4 text-muted-foreground" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      // Base
      "z-[9999] min-w-[8rem] overflow-hidden",
      // Premium glass morphism
      "rounded-2xl sm:rounded-xl",
      "border border-white/10 bg-card/95 backdrop-blur-xl text-foreground",
      "shadow-2xl shadow-black/40",
      // Padding
      "p-2 sm:p-1.5",
      // Animations
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        // Base
        "z-[9999] min-w-[8rem] overflow-hidden",
        // Premium glass morphism
        "rounded-2xl sm:rounded-xl",
        "border border-white/10 bg-card/95 backdrop-blur-xl text-foreground",
        "shadow-2xl shadow-black/40",
        // Padding - larger on mobile
        "p-2 sm:p-1.5",
        // Animations
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      // Base
      "relative flex cursor-pointer select-none items-center",
      "rounded-xl sm:rounded-lg px-3 py-3 sm:px-2.5 sm:py-2.5 md:py-2",
      "text-base sm:text-sm outline-none font-medium",
      // Touch targets - iOS standard 44pt minimum
      "min-h-[48px] sm:min-h-[44px] md:min-h-[36px]",
      // Focus/hover states
      "hover:bg-white/5 focus:bg-white/5",
      // Active state - iOS-like feedback
      "active:bg-elec-yellow/15 active:scale-[0.98]",
      // Highlighted (keyboard nav)
      "data-[highlighted]:bg-white/5",
      // Disabled
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      // Transitions
      "touch-manipulation transition-all duration-100 ease-out",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      // Base
      "relative flex cursor-pointer select-none items-center",
      "rounded-xl sm:rounded-lg py-3 pl-10 pr-3 sm:py-2.5 sm:pl-8 sm:pr-2",
      "text-base sm:text-sm outline-none font-medium",
      // Touch targets
      "min-h-[48px] sm:min-h-[44px] md:min-h-[36px]",
      // States
      "hover:bg-white/5 focus:bg-white/5",
      "active:bg-elec-yellow/15 active:scale-[0.98]",
      "data-[state=checked]:text-elec-yellow",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      // Transitions
      "touch-manipulation transition-all duration-100 ease-out",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-3 sm:left-2 flex h-5 w-5 sm:h-4 sm:w-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-5 w-5 sm:h-4 sm:w-4 text-elec-yellow" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      // Base
      "relative flex cursor-pointer select-none items-center",
      "rounded-xl sm:rounded-lg py-3 pl-10 pr-3 sm:py-2.5 sm:pl-8 sm:pr-2",
      "text-base sm:text-sm outline-none font-medium",
      // Touch targets
      "min-h-[48px] sm:min-h-[44px] md:min-h-[36px]",
      // States
      "hover:bg-white/5 focus:bg-white/5",
      "active:bg-elec-yellow/15 active:scale-[0.98]",
      "data-[state=checked]:text-elec-yellow",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      // Transitions
      "touch-manipulation transition-all duration-100 ease-out",
      className
    )}
    {...props}
  >
    <span className="absolute left-3 sm:left-2 flex h-5 w-5 sm:h-4 sm:w-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2.5 w-2.5 sm:h-2 sm:w-2 fill-elec-yellow text-elec-yellow" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-3 py-2 sm:px-2 sm:py-1.5 text-sm font-semibold text-muted-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-2 sm:my-1 h-px bg-white/10", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
