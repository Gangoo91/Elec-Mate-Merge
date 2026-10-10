import { JoinedToggle as KitJoinedToggle, TextTabs } from '@/components/college/ui/CollegeUi';

/* ==========================================================================
   Hours, reviews and inbox: the choice controls, now thin adapters over the
   College Hub kit (CollegeUi.tsx, 10 Oct 2026). Same props and roles as
   before, so every call site is unchanged.

   - QuietTabs     filters over a list (kit TextTabs, aria-pressed).
   - JoinedToggle  a choice of 2 to 4 filling the width (kit JoinedToggle).
   ========================================================================== */

export interface QuietTab<T extends string> {
  key: T;
  label: string;
  count?: number;
  /** Orange count: something is overdue behind this tab. */
  warn?: boolean;
}

export function QuietTabs<T extends string>({
  tabs,
  value,
  onChange,
  label,
  className,
}: {
  tabs: QuietTab<NoInfer<T>>[];
  value: T;
  onChange: (key: NoInfer<T>) => void;
  label: string;
  className?: string;
}) {
  return (
    <TextTabs<T>
      items={tabs}
      value={value}
      onChange={onChange}
      label={label}
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
  options: Array<{ key: NoInfer<T>; label: string }>;
  value: T;
  onChange: (key: NoInfer<T>) => void;
  label: string;
  className?: string;
}) {
  return (
    <KitJoinedToggle<T>
      options={options}
      value={value}
      onChange={onChange}
      label={label}
      fit="fill"
      className={className}
    />
  );
}
