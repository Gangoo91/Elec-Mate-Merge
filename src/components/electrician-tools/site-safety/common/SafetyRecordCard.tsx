/**
 * SafetyRecordCard
 *
 * Premium shared card component for all safety record list views.
 * Consistent design across all 12 safety tools.
 * Matches the PremiumEquipmentCard / PremiumBriefingCard design language.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  MapPin,
  Calendar,
  Download,
  Loader2,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';

export type CardStatus = 'pass' | 'fail' | 'active' | 'expired' | 'closed' | 'isolated' | 're_energised' | 'in_progress' | 'cancelled' | 'pending' | 'completed' | 'positive' | 'improvement' | 'recorded' | 'good' | 'attention' | 'overdue' | 'low' | 'medium' | 'high' | 'critical' | 'minor' | 'moderate' | 'major' | 'fatal';

const STATUS_CONFIG: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  pass: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', gradient: 'from-emerald-500 via-emerald-400 to-emerald-500' },
  good: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', gradient: 'from-emerald-500 via-emerald-400 to-emerald-500' },
  completed: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', gradient: 'from-emerald-500 via-emerald-400 to-emerald-500' },
  positive: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', gradient: 'from-emerald-500 via-emerald-400 to-emerald-500' },
  re_energised: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', gradient: 'from-emerald-500 via-emerald-400 to-emerald-500' },
  closed: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', gradient: 'from-blue-500 via-blue-400 to-blue-500' },
  recorded: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', gradient: 'from-blue-500 via-blue-400 to-blue-500' },
  low: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', gradient: 'from-blue-500 via-blue-400 to-blue-500' },
  active: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', gradient: 'from-amber-500 via-amber-400 to-amber-500' },
  in_progress: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', gradient: 'from-amber-500 via-amber-400 to-amber-500' },
  pending: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', gradient: 'from-amber-500 via-amber-400 to-amber-500' },
  attention: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', gradient: 'from-amber-500 via-amber-400 to-amber-500' },
  improvement: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', gradient: 'from-amber-500 via-amber-400 to-amber-500' },
  medium: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', gradient: 'from-amber-500 via-amber-400 to-amber-500' },
  moderate: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', gradient: 'from-amber-500 via-amber-400 to-amber-500' },
  fail: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', gradient: 'from-red-500 via-red-400 to-red-500' },
  expired: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', gradient: 'from-red-500 via-red-400 to-red-500' },
  isolated: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', gradient: 'from-red-500 via-red-400 to-red-500' },
  overdue: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', gradient: 'from-red-500 via-red-400 to-red-500' },
  high: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', gradient: 'from-red-500 via-red-400 to-red-500' },
  critical: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', gradient: 'from-red-500 via-red-400 to-red-500' },
  major: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', gradient: 'from-red-500 via-red-400 to-red-500' },
  fatal: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', gradient: 'from-red-500 via-red-400 to-red-500' },
  cancelled: { bg: 'bg-white/5', text: 'text-white', border: 'border-white/10', gradient: 'from-gray-500 via-gray-400 to-gray-500' },
  minor: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', gradient: 'from-emerald-500 via-emerald-400 to-emerald-500' },
};

const DEFAULT_STATUS = { bg: 'bg-white/5', text: 'text-white', border: 'border-white/10', gradient: 'from-gray-500 via-gray-400 to-gray-500' };

interface MetaItem {
  icon?: LucideIcon;
  label: string;
}

interface ActionButton {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface SafetyRecordCardProps {
  /** Unique record ID */
  id: string;
  /** Main title (e.g. "Scaffold Check", "Hot Work Permit") */
  title: string;
  /** Optional subtitle (e.g. equipment description, circuit name) */
  subtitle?: string;
  /** Status key for colour coding */
  status: string;
  /** Human-readable status label */
  statusLabel: string;
  /** Regulation badge text (e.g. "WAHR 2005", "GS38") */
  regulation?: string;
  /** Icon for the card */
  icon: LucideIcon;
  /** Icon colour class override */
  iconColour?: string;
  /** Key metadata to show (icon + text, max 3-4) */
  meta?: MetaItem[];
  /** Action buttons (max 3) */
  actions?: ActionButton[];
  /** PDF export type (if exportable) */
  pdfType?: string;
  /** Expandable detail content */
  children?: React.ReactNode;
  /** Tap handler for the whole card */
  onTap?: () => void;
  /** Animation index for stagger */
  index?: number;
}

export function SafetyRecordCard({
  id,
  title,
  subtitle,
  status,
  statusLabel,
  regulation,
  icon: Icon,
  iconColour,
  meta = [],
  actions = [],
  pdfType,
  children,
  onTap,
  index = 0,
}: SafetyRecordCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const statusKey = status.toLowerCase().replace(/[\s-]/g, '_');
  const sc = STATUS_CONFIG[statusKey] || DEFAULT_STATUS;

  const handleCardTap = () => {
    if (onTap) {
      onTap();
    } else if (children) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 220, damping: 20 }}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-white/[0.04] to-white/[0.01]',
        'border transition-all duration-200',
        sc.border,
        'hover:border-white/[0.15]',
      )}
    >
      {/* Status accent line */}
      <div className={cn('h-0.5 bg-gradient-to-r', sc.gradient)} />

      {/* Main tappable area */}
      <button
        onClick={handleCardTap}
        className="w-full text-left p-4 touch-manipulation active:scale-[0.995] transition-transform duration-150"
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={cn(
            'p-2.5 rounded-xl border flex-shrink-0',
            sc.bg, sc.border,
          )}>
            <Icon className={cn('h-5 w-5', iconColour || sc.text)} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title row */}
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-semibold text-white truncate">{title}</h3>
              {/* Status badge */}
              <span className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide',
                sc.bg, sc.text,
              )}>
                {statusLabel}
              </span>
            </div>

            {/* Subtitle + regulation */}
            {(subtitle || regulation) && (
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {subtitle && (
                  <span className="text-xs text-white truncate">{subtitle}</span>
                )}
                {regulation && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {regulation}
                  </span>
                )}
              </div>
            )}

            {/* Meta row */}
            {meta.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                {meta.map((m, i) => {
                  const MetaIcon = m.icon;
                  return (
                    <div key={i} className="flex items-center gap-1 text-[11px] text-white">
                      {MetaIcon && <MetaIcon className="h-3 w-3 flex-shrink-0" />}
                      <span>{m.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Expand chevron (if expandable) */}
          {(children || !onTap) && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 mt-1"
            >
              <ChevronDown className="h-4 w-4 text-white" />
            </motion.div>
          )}
        </div>
      </button>

      {/* Action buttons (always visible) */}
      {(actions.length > 0 || pdfType) && (
        <div className="px-4 pb-3 flex gap-1.5">
          {actions.map((action, i) => {
            const ActionIcon = action.icon;
            return (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); action.onClick(); }}
                className={cn(
                  'flex-1 h-10 flex items-center justify-center gap-1.5 rounded-xl text-xs font-medium touch-manipulation active:scale-[0.97] transition-all',
                  action.variant === 'primary'
                    ? 'bg-elec-yellow/15 border border-elec-yellow/25 text-elec-yellow'
                    : action.variant === 'danger'
                      ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                      : 'bg-white/[0.04] border border-white/[0.08] text-white',
                )}
              >
                {ActionIcon && <ActionIcon className="h-3.5 w-3.5" />}
                {action.label}
              </button>
            );
          })}
          {pdfType && (
            <button
              onClick={(e) => { e.stopPropagation(); exportPDF(pdfType as Parameters<typeof exportPDF>[0], id); }}
              disabled={isExporting && exportingId === id}
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-white touch-manipulation active:scale-[0.97] transition-all flex-shrink-0"
              aria-label="Export PDF"
            >
              {isExporting && exportingId === id ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>
      )}

      {/* Expandable detail content */}
      <AnimatePresence>
        {isExpanded && children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1">
              <div className="h-px bg-white/[0.06] mb-3" />
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/** Convenience: format date for meta items */
export function fmtCardDate(d: string | null | undefined): string {
  if (!d) return 'N/A';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
