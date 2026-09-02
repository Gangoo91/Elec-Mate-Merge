import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { labelCn, selectTriggerCn } from '@/components/forms/fieldStyles';

const MobileSelect = SelectPrimitive.Root;

const MobileSelectGroup = SelectPrimitive.Group;

const MobileSelectValue = SelectPrimitive.Value;

const MobileSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    label?: string;
    error?: string;
    hint?: string;
  }
>(({ className, children, label, error, hint, ...props }, ref) => (
  <div>
    {label && <Label className={labelCn}>{label}</Label>}
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        selectTriggerCn,
        'flex w-full items-center justify-between disabled:cursor-not-allowed disabled:text-white/70',
        error && '!border-red-400',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 text-white" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    {hint && !error && <p className="mt-1.5 text-[11.5px] leading-snug text-white">{hint}</p>}
    {error && (
      <p className="mt-1.5 text-[11.5px] leading-snug text-red-300 animate-fade-in">{error}</p>
    )}
  </div>
));
MobileSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const MobileSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
MobileSelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const MobileSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
MobileSelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const MobileSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-[9999] max-h-96 min-w-[8rem] overflow-hidden rounded-xl border border-white/[0.12]',
        'bg-[hsl(0_0%_10%)] text-white shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95',
        'data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2',
        'data-[side=top]:slide-in-from-bottom-2',
        // Mobile optimizations
        'touch-manipulation will-change-transform',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <MobileSelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <MobileSelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
MobileSelectContent.displayName = SelectPrimitive.Content.displayName;

const MobileSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
));
MobileSelectLabel.displayName = SelectPrimitive.Label.displayName;

const MobileSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-2.5 pl-8 pr-2',
      'text-sm text-white outline-none focus:bg-white/[0.08] focus:text-white',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      // Mobile-specific improvements
      'min-h-[48px] touch-manipulation', // Larger touch targets
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
MobileSelectItem.displayName = SelectPrimitive.Item.displayName;

const MobileSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
MobileSelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  MobileSelect,
  MobileSelectGroup,
  MobileSelectValue,
  MobileSelectTrigger,
  MobileSelectContent,
  MobileSelectLabel,
  MobileSelectItem,
  MobileSelectSeparator,
  MobileSelectScrollUpButton,
  MobileSelectScrollDownButton,
};
