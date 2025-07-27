import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const ScrollbarFreeSelect = SelectPrimitive.Root;

const ScrollbarFreeSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    label?: string;
    error?: string;
    hint?: string;
  }
>(({ className, children, label, error, hint, ...props }, ref) => (
  <div className="space-y-2">
    {label && (
      <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
        <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
        {label}
      </label>
    )}
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-12 w-full items-center justify-between rounded-xl border-2 border-elec-gray/50 bg-elec-card px-4 py-3 text-base font-medium ring-offset-background placeholder:text-elec-light/60 focus:border-elec-yellow focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-elec-light hover:border-elec-yellow/40 transition-all duration-200",
        error && "border-red-500",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-6 w-6 text-elec-yellow ml-3 flex-shrink-0" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    {hint && !error && (
      <p className="text-xs text-elec-light/70 flex items-center gap-1">
        <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
        {hint}
      </p>
    )}
    {error && (
      <p className="text-xs text-red-400 flex items-center gap-1">
        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
));
ScrollbarFreeSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const ScrollbarFreeSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-pointer items-center justify-center py-2 border-b border-elec-gray/20 bg-elec-card hover:bg-elec-yellow/20 transition-colors",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4 text-elec-yellow" />
  </SelectPrimitive.ScrollUpButton>
));
ScrollbarFreeSelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const ScrollbarFreeSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-pointer items-center justify-center py-2 border-t border-elec-gray/20 bg-elec-card hover:bg-elec-yellow/20 transition-colors",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4 text-elec-yellow" />
  </SelectPrimitive.ScrollDownButton>
));
ScrollbarFreeSelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const ScrollbarFreeSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-xl border border-elec-gray/50 bg-elec-card text-elec-light shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <ScrollbarFreeSelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1 scrollbar-none max-h-[200px] overflow-y-auto",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <ScrollbarFreeSelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
ScrollbarFreeSelectContent.displayName = SelectPrimitive.Content.displayName;

const ScrollbarFreeSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
ScrollbarFreeSelectLabel.displayName = SelectPrimitive.Label.displayName;

const ScrollbarFreeSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-lg py-3 pl-8 pr-2 text-sm outline-none focus:bg-elec-yellow/20 focus:text-elec-light data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-elec-yellow/10 transition-colors min-h-[48px] text-left",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText className="flex-1 text-left leading-tight">
      {children}
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
ScrollbarFreeSelectItem.displayName = SelectPrimitive.Item.displayName;

const ScrollbarFreeSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-elec-gray/20", className)}
    {...props}
  />
));
ScrollbarFreeSelectSeparator.displayName = SelectPrimitive.Separator.displayName;

const ScrollbarFreeSelectValue = SelectPrimitive.Value;

export {
  ScrollbarFreeSelect,
  ScrollbarFreeSelectTrigger,
  ScrollbarFreeSelectContent,
  ScrollbarFreeSelectItem,
  ScrollbarFreeSelectLabel,
  ScrollbarFreeSelectScrollUpButton,
  ScrollbarFreeSelectScrollDownButton,
  ScrollbarFreeSelectSeparator,
  ScrollbarFreeSelectValue,
};