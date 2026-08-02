import React from 'react';
import { MobileSelectPicker, type SelectOption } from '@/components/ui/mobile-select-picker';
import { selectTriggerCn } from './fieldStyles';
import { cn } from '@/lib/utils';

/**
 * The app's standard select.
 *
 * Wraps MobileSelectPicker so a phone gets a swipeable bottom sheet with
 * full-size touch targets, while desktop keeps the Radix dropdown. Replaces the
 * compositional `<Select><SelectTrigger/><SelectContent>…` pattern, which
 * renders a cramped dropdown on mobile.
 *
 * Options are a plain array rather than `<SelectItem>` children — that is what
 * MobileSelectPicker needs to render the sheet, and it keeps labels as strings
 * so they can be searched and shown in the trigger.
 */
export interface SelectFieldProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  /** Heading shown on the mobile sheet. Defaults to the placeholder. */
  title?: string;
  triggerClassName?: string;
  disabled?: boolean;
}

export const SelectField = ({
  value,
  onValueChange,
  options,
  placeholder,
  title,
  triggerClassName,
  disabled,
}: SelectFieldProps) => (
  <MobileSelectPicker
    value={value}
    onValueChange={onValueChange}
    options={options}
    placeholder={placeholder}
    title={title ?? placeholder}
    triggerClassName={cn(selectTriggerCn, triggerClassName)}
    disabled={disabled}
  />
);

export default SelectField;
