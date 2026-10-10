import type { ReactNode } from 'react';
import {
  JoinedToggle as KitJoinedToggle,
  TextTabs,
  TileGrid,
  type TileOption,
} from '@/components/college/ui/CollegeUi';

/* ==========================================================================
   Choice controls for the Quality, reports and settings screens: thin
   adapters over the College Hub kit (CollegeUi.tsx, 10 Oct 2026). Same props
   and roles as before, so every call site is unchanged.

   - QuietTabs     filters over a list, or tabs when `asTabs` (kit TextTabs).
   - JoinedToggle  a choice of 2 to 4 short options: full width on a phone,
                   sized to its labels from sm: up; labels may wrap.
   - ChoiceGrid    equal outlined tiles for a pick from many (kit TileGrid).
   ========================================================================== */

export interface QuietTab<T extends string> {
  key: T;
  label: string;
  count?: number;
  /** Orange count: something is overdue or missing behind this tab. */
  warn?: boolean;
}

export function QuietTabs<T extends string>({
  tabs,
  value,
  onChange,
  label,
  className,
  asTabs = false,
}: {
  tabs: QuietTab<T>[];
  value: T;
  onChange: (key: T) => void;
  label: string;
  className?: string;
  /** True when each tab swaps the panel below (a tablist), not a filter. */
  asTabs?: boolean;
}) {
  return (
    <TextTabs<T>
      items={tabs}
      value={value}
      onChange={onChange}
      label={label}
      asTabs={asTabs}
      className={className}
    />
  );
}

export function JoinedToggle<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: Array<{ key: T; label: ReactNode; disabled?: boolean }>;
  value: T;
  onChange: (key: T) => void;
  label: string;
  className?: string;
}) {
  return (
    <KitJoinedToggle<T>
      options={options}
      value={value}
      onChange={onChange}
      label={label}
      fit="phone"
      wrap
      className={className}
    />
  );
}

export type ChoiceOption<T extends string> = TileOption<T>;

/**
 * Equal tiles for a pick from many (or long-named) options. `selected` is
 * the chosen key, or the chosen keys when `multiple`.
 */
export const ChoiceGrid = TileGrid;
