/**
 * Filters for the marking and assessment screens: thin adapters over the
 * College Hub kit (CollegeUi.tsx, 10 Oct 2026). Same props and roles as
 * before, so every call site is unchanged.
 *
 *   - TextTabs: quiet text tabs with counts and a yellow underline, as a
 *     tablist.
 *   - JoinedToggle: one joined control for a choice of 2 to 4, as a
 *     radiogroup.
 *   - ActionSheet: a row's "more" actions as a bottom sheet on a phone.
 */
import type { ReactNode } from 'react';
import {
  ActionSheet as KitActionSheet,
  JoinedToggle as KitJoinedToggle,
  TextTabs as KitTextTabs,
} from '@/components/college/ui/CollegeUi';

export interface TabItem<K extends string> {
  key: K;
  label: ReactNode;
  count?: number | null;
  /** Shown to screen readers when the label alone is not enough. */
  ariaLabel?: string;
}

export function TextTabs<K extends string>({
  items,
  value,
  onChange,
  ariaLabel,
  className,
  bleed = true,
}: {
  items: TabItem<NoInfer<K>>[];
  value: K;
  onChange: (k: NoInfer<K>) => void;
  ariaLabel: string;
  className?: string;
  /** Run edge to edge on a phone (-mx-4 px-4). Off inside a padded card. */
  bleed?: boolean;
}) {
  return (
    <KitTextTabs<K>
      items={items}
      value={value}
      onChange={onChange}
      label={ariaLabel}
      asTabs
      bleed={bleed}
      className={className}
    />
  );
}

export function JoinedToggle<K extends string>({
  items,
  value,
  onChange,
  ariaLabel,
  className,
  stretch = false,
}: {
  items: TabItem<NoInfer<K>>[];
  value: K | null;
  onChange: (k: NoInfer<K>) => void;
  ariaLabel: string;
  className?: string;
  /** Fill the width, options sharing it equally. */
  stretch?: boolean;
}) {
  return (
    <KitJoinedToggle<K>
      options={items}
      value={value}
      onChange={onChange}
      label={ariaLabel}
      semantics="radio"
      fit={stretch ? 'fill' : 'auto'}
      className={className}
    />
  );
}

export interface SheetAction {
  label: string;
  onSelect: () => void;
  /** Orange: undoes or sends work back. */
  warn?: boolean;
  /** A hairline above this action. */
  divide?: boolean;
}

/** A short list of actions for one row, as a bottom sheet sized to its content. */
export function ActionSheet({
  open,
  onOpenChange,
  title,
  description,
  actions,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  description?: string;
  actions: SheetAction[];
}) {
  return (
    <KitActionSheet
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      items={actions.map((a) => ({
        label: a.label,
        onSelect: a.onSelect,
        tone: a.warn ? 'warn' : undefined,
        separated: a.divide,
      }))}
    />
  );
}
