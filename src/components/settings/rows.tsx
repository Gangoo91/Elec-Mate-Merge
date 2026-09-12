import React from 'react';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

/**
 * Shared row primitives for the Settings pages.
 *
 * Restyled onto the card recipe so a settings card is made of the same stuff
 * as a hub card: the diagonal white-alpha ramp, the inset bevel and the volt
 * hairline border. The old flat `hsl(0 0% 12%)` slab with a white/8 border
 * was the last surface in the app still on the retired dialect.
 *
 * Every line of text is white. Sub-labels used to sit at /65 and /60, which
 * renders grey on this ground and is not allowed anywhere else in the app.
 */

const ROW = 'flex items-center gap-4 px-4 py-3.5 sm:px-5';

interface ToggleRowProps {
  label: string;
  subtitle?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  disabled?: boolean;
  trailing?: React.ReactNode;
}
export const ToggleRow = ({
  label,
  subtitle,
  checked,
  onCheckedChange,
  disabled,
  trailing,
}: ToggleRowProps) => (
  <div className={ROW}>
    <div className="min-w-0 flex-1">
      <div className="truncate text-[14.5px] font-medium text-white">{label}</div>
      {/* Not truncated. A subtitle that explains what a toggle does is useless
          cut off at one line on a phone, which is where it is mostly read. */}
      {subtitle && <div className="mt-0.5 text-[12px] leading-relaxed text-white">{subtitle}</div>}
    </div>
    {trailing && <div className="shrink-0">{trailing}</div>}
    <Switch checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />
  </div>
);

interface ActionRowProps {
  label: string;
  subtitle?: string;
  actionLabel: string;
  onAction: () => void;
  disabled?: boolean;
  destructive?: boolean;
}
export const ActionRow = ({
  label,
  subtitle,
  actionLabel,
  onAction,
  disabled,
  destructive,
}: ActionRowProps) => (
  <div className={ROW}>
    <div className="min-w-0 flex-1">
      <div className="truncate text-[14.5px] font-medium text-white">{label}</div>
      {subtitle && <div className="mt-0.5 truncate text-[12px] text-white">{subtitle}</div>}
    </div>
    <button
      type="button"
      onClick={onAction}
      disabled={disabled}
      className={cn(
        'h-10 shrink-0 rounded-full border px-4 text-[13px] font-semibold transition-colors touch-manipulation',
        'disabled:opacity-50',
        destructive
          ? 'border-red-500/40 text-red-400 hover:bg-red-500/10'
          : 'border-elec-yellow/35 bg-white/[0.04] text-white hover:border-elec-yellow/60 hover:bg-white/[0.08]'
      )}
    >
      {actionLabel}
    </button>
  </div>
);

interface SelectRowProps {
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}
export const SelectRow = ({ label, value, onValueChange, options, placeholder }: SelectRowProps) => (
  <div className={ROW}>
    <div className="min-w-0 flex-1">
      <div className="truncate text-[14.5px] font-medium text-white">{label}</div>
    </div>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-10 w-auto min-w-[110px] rounded-full border-elec-yellow/35 bg-white/[0.04] px-4 text-[13px] text-white touch-manipulation">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      {/* Opaque on purpose — a popover floats over content and cannot be a wash. */}
      <SelectContent className="border-elec-yellow/35 bg-[hsl(0_0%_13%)] text-white shadow-xl shadow-black/50">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

/* ── Module card: section header lives INSIDE the card ── */
interface SettingsCardProps {
  /**
   * Category word above the title. Purely numeric values ("01", "02") are
   * not rendered: the old cards numbered every group, which implied an order
   * the groups never had, and the hub rules dropped that pattern.
   */
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
export const SettingsCard = ({ eyebrow, title, action, children, className }: SettingsCardProps) => (
  <div
    className={cn(
      'relative flex h-full flex-col overflow-hidden rounded-2xl border border-elec-yellow/35',
      CARD_SURFACE,
      className
    )}
  >
    {/* The volt hairline catching the top edge — same as a hub tool card. */}
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
    />
    <div className="flex items-end justify-between gap-4 border-b border-white/[0.08] px-4 pb-3.5 pt-4 sm:px-5">
      <div className="min-w-0">
        {eyebrow && !/^\d+$/.test(eyebrow) && (
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
            {eyebrow}
          </div>
        )}
        <h3 className="mt-1 truncate text-[16px] font-semibold tracking-tight text-white">{title}</h3>
      </div>
      {action && <div className="shrink-0 pb-0.5">{action}</div>}
    </div>
    <div className="flex-1 divide-y divide-white/[0.08]">{children}</div>
  </div>
);

/* ── Navigation row with an icon anchor — opens a sheet or page ── */
interface NavRowProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  onClick: () => void;
}
export const NavRow = ({ icon: Icon, title, subtitle, onClick }: NavRowProps) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex min-h-[44px] w-full items-center gap-4 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-5"
  >
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-elec-yellow/35 bg-white/[0.05]">
      <Icon className="h-4 w-4 text-elec-yellow" />
    </div>
    <div className="min-w-0 flex-1">
      <div className="truncate text-[14.5px] font-medium text-white transition-colors group-hover:text-elec-yellow">
        {title}
      </div>
      {subtitle && <div className="mt-0.5 truncate text-[12px] text-white">{subtitle}</div>}
    </div>
    <span
      aria-hidden
      className="text-[13px] font-medium text-elec-yellow transition-transform group-hover:translate-x-0.5"
    >
      {'→'}
    </span>
  </button>
);
