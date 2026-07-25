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

/* ── Shared row primitives for settings ListCards ── */

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
  <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
    <div className="flex-1 min-w-0">
      <div className="text-[15px] font-medium text-white truncate">{label}</div>
      {subtitle && <div className="mt-0.5 text-[11.5px] text-white/65 truncate">{subtitle}</div>}
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
  <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
    <div className="flex-1 min-w-0">
      <div className="text-[15px] font-medium text-white truncate">{label}</div>
      {subtitle && <div className="mt-0.5 text-[11.5px] text-white/65 truncate">{subtitle}</div>}
    </div>
    <button
      onClick={onAction}
      disabled={disabled}
      className={cn(
        'h-10 px-4 rounded-full text-[13px] font-medium touch-manipulation transition-colors shrink-0',
        'border disabled:opacity-50',
        destructive
          ? 'border-red-500/25 text-red-400 hover:bg-red-500/10'
          : 'border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]'
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
  <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
    <div className="flex-1 min-w-0">
      <div className="text-[15px] font-medium text-white truncate">{label}</div>
    </div>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-auto min-w-[110px] h-10 bg-white/[0.04] border-white/[0.08] rounded-full px-4 text-[13px] text-white touch-manipulation">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-[hsl(0_0%_16%)] border-white/[0.12] shadow-xl shadow-black/50 text-white">
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
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
export const SettingsCard = ({ eyebrow, title, action, children, className }: SettingsCardProps) => (
  <div
    className={cn(
      'h-full flex flex-col rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.08] overflow-hidden',
      className
    )}
  >
    <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-white/[0.06] flex items-end justify-between gap-4">
      <div className="min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
          {eyebrow}
        </div>
        <h3 className="mt-1 text-[17px] font-semibold text-white tracking-tight truncate">
          {title}
        </h3>
      </div>
      {action && <div className="shrink-0 pb-0.5">{action}</div>}
    </div>
    <div className="flex-1 divide-y divide-white/[0.06]">{children}</div>
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
    onClick={onClick}
    className="group w-full flex items-center gap-4 px-5 sm:px-6 py-4 text-left hover:bg-white/[0.03] transition-colors touch-manipulation min-h-[44px]"
  >
    <div className="h-9 w-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0">
      <Icon className="h-4 w-4 text-elec-yellow" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[14.5px] font-medium text-white truncate">{title}</div>
      {subtitle && <div className="mt-0.5 text-[12px] text-white/60 truncate">{subtitle}</div>}
    </div>
    <span
      aria-hidden
      className="text-[13px] font-medium text-elec-yellow/70 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all"
    >
      {'→'}
    </span>
  </button>
);
