/**
 * CompareDrawer — editorial side-by-side comparison.
 *
 * Type-led. Brand-mark mini cards in a horizontal rail, then a stacked
 * comparison grid with eyebrow labels, tabular nums, and a single
 * elec-yellow "Best" pill on the leading value. Drops the per-card colour
 * indicator (yellow/emerald/blue) — order is given by tabular numbering.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import { cn } from '@/lib/utils';
import {
  X,
  Plus,
  Share2,
  Trash2,
  Star,
  TrendingUp,
  Clock,
  PoundSterling,
  MapPin,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import { fadeUpVariants } from './animations/variants';
import { Eyebrow } from '@/components/college/primitives';
import type { LiveEducationData } from '@/hooks/useLiveEducationData';

interface CompareDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  programmes: LiveEducationData[];
  onRemove: (programmeId: string) => void;
  onClear: () => void;
  onAddMore: () => void;
  onSelectProgramme?: (programme: LiveEducationData) => void;
  maxItems?: number;
}

const initialsOf = (institution: string): string =>
  institution
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join('')
    .toUpperCase();

const MiniCompareCard = ({
  programme,
  index,
  onRemove,
  onClick,
}: {
  programme: LiveEducationData;
  index: number;
  onRemove: () => void;
  onClick?: () => void;
}) => (
  <SwipeableCard
    leftAction={{
      icon: <Trash2 className="h-5 w-5" />,
      bgColor: 'bg-destructive',
      label: 'Remove',
      onAction: onRemove,
    }}
    className="flex-shrink-0"
  >
    <motion.button
      type="button"
      variants={fadeUpVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={onClick}
      className="w-[180px] text-left rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-white/[0.10] hover:border-elec-yellow/40 active:bg-white/[0.04] transition-colors p-3.5 touch-manipulation shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow">
          {String(index + 1).padStart(2, '0')}
        </span>
        <Eyebrow>{programme.category}</Eyebrow>
      </div>
      <div className="mt-2 flex items-start gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-elec-yellow/[0.08] border border-elec-yellow/30 shrink-0">
          <span className="text-[9px] font-semibold tabular-nums text-elec-yellow">
            {initialsOf(programme.institution)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-[12.5px] font-semibold text-white line-clamp-2 leading-tight">
            {programme.title}
          </h4>
          <p className="text-[11px] text-elec-yellow line-clamp-1 mt-0.5">
            {programme.institution}
          </p>
        </div>
      </div>
    </motion.button>
  </SwipeableCard>
);

const ComparisonRow = ({
  label,
  values,
  type,
  max = 100,
  format,
  icon: Icon,
}: {
  label: string;
  values: (string | number)[];
  type: 'progress' | 'text';
  max?: number;
  format?: (v: number) => string;
  icon?: LucideIcon;
}) => {
  let winnerIndex = -1;
  if (type === 'progress' && values.length >= 2) {
    const numeric = values as number[];
    const top = Math.max(...numeric);
    const allSame = numeric.every((v) => v === numeric[0]);
    if (!allSame) winnerIndex = numeric.indexOf(top);
  }

  return (
    <div className="space-y-2 py-3 border-b border-white/[0.06] last:border-0">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-3 w-3 text-white/65" aria-hidden />}
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65">
          {label}
        </span>
      </div>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${values.length}, 1fr)` }}
      >
        {values.map((value, index) => {
          const isWinner = index === winnerIndex;

          if (type === 'progress') {
            const numericValue = value as number;
            const display = format ? format(numericValue) : String(numericValue);
            const pct = (numericValue / max) * 100;
            return (
              <div key={index} className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className={cn(
                      'text-[13px] font-semibold tabular-nums',
                      isWinner ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    {display}
                  </span>
                  {isWinner && (
                    <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-elec-yellow border border-elec-yellow/40 bg-elec-yellow/[0.08] rounded-md px-1 py-0">
                      Best
                    </span>
                  )}
                </div>
                <div className="h-[2px] rounded-full bg-white/[0.08] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className={cn(
                      'h-full rounded-full',
                      isWinner ? 'bg-elec-yellow' : 'bg-white/40'
                    )}
                  />
                </div>
              </div>
            );
          }

          return (
            <div
              key={index}
              className="text-[12.5px] text-white tabular-nums truncate"
              title={String(value)}
            >
              {String(value) || '—'}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CompareDrawer = ({
  open,
  onOpenChange,
  programmes,
  onRemove,
  onClear,
  onAddMore,
  onSelectProgramme,
  maxItems = 3,
}: CompareDrawerProps) => {
  const handleShare = async () => {
    if (navigator.share && programmes.length >= 2) {
      try {
        const titles = programmes.map((p) => p.title).join(' vs ');
        await navigator.share({
          title: `Comparing: ${titles}`,
          text: programmes.map((p) => `- ${p.title} at ${p.institution}`).join('\n'),
        });
      } catch {
        // user cancelled
      }
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh] rounded-t-3xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border-white/[0.10]">
        <VisuallyHidden>
          <DrawerTitle>Compare programmes</DrawerTitle>
          <DrawerDescription>
            Side-by-side comparison of selected programmes
          </DrawerDescription>
        </VisuallyHidden>
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-white/15" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 sm:px-6 pt-2 pb-4 border-b border-white/[0.06]">
          <div className="space-y-1">
            <Eyebrow>COMPARE</Eyebrow>
            <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight">
              <span className="text-elec-yellow">Side</span>{' '}
              <span className="text-white">by side.</span>
            </h2>
            <p className="text-[11.5px] text-white/65 tabular-nums">
              {programmes.length} of {maxItems} selected
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="text-white/65 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-9 w-9 inline-flex items-center justify-center shrink-0 touch-manipulation transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4">
          {/* Mini card rail */}
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-5 sm:-mx-6 px-5 sm:px-6 pb-3">
            <AnimatePresence mode="popLayout">
              {programmes.map((programme, index) => (
                <MiniCompareCard
                  key={programme.id}
                  programme={programme}
                  index={index}
                  onRemove={() => onRemove(programme.id)}
                  onClick={() => onSelectProgramme?.(programme)}
                />
              ))}
            </AnimatePresence>

            {programmes.length < maxItems && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={onAddMore}
                className="min-w-[180px] h-[120px] rounded-2xl border-2 border-dashed border-white/15 flex flex-col items-center justify-center gap-2 hover:border-elec-yellow/40 hover:bg-white/[0.03] transition-colors touch-manipulation"
              >
                <Plus className="h-5 w-5 text-white/65" />
                <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-white/85">
                  Add programme
                </span>
              </motion.button>
            )}
          </div>

          <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white/65 text-center my-4">
            Swipe left to remove
          </p>

          {/* Comparison grid */}
          {programmes.length >= 2 ? (
            <motion.div
              variants={fadeUpVariants}
              initial="initial"
              animate="animate"
              className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] px-4 py-1"
            >
              <ComparisonRow
                label="Rating"
                icon={Star}
                values={programmes.map((p) => p.rating || 0)}
                type="progress"
                max={5}
                format={(v) => v.toFixed(1)}
              />
              <ComparisonRow
                label="Employed"
                icon={TrendingUp}
                values={programmes.map((p) => p.employmentRate || 0)}
                type="progress"
                max={100}
                format={(v) => `${v}%`}
              />
              <ComparisonRow
                label="Duration"
                icon={Clock}
                values={programmes.map((p) => p.duration)}
                type="text"
              />
              <ComparisonRow
                label="Fees"
                icon={PoundSterling}
                values={programmes.map((p) => p.tuitionFees)}
                type="text"
              />
              <ComparisonRow
                label="Mode"
                icon={GraduationCap}
                values={programmes.map((p) => p.studyMode)}
                type="text"
              />
              <ComparisonRow
                label="Location"
                icon={MapPin}
                values={programmes.map((p) => p.locations[0] || 'Online')}
                type="text"
              />
            </motion.div>
          ) : (
            <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-6 sm:p-8 text-center">
              <h3 className="text-[18px] font-semibold text-white tracking-tight">
                Pick two to start.
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-white/85 max-w-md mx-auto">
                Add at least two programmes to see ratings, fees, duration and employment side by
                side.
              </p>
              <button
                type="button"
                onClick={onAddMore}
                className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-2.5 min-h-[40px] touch-manipulation transition-colors"
              >
                <Plus className="h-4 w-4" />
                Browse programmes
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="border-t border-white/[0.06] px-5 sm:px-6 pt-3 pb-4 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl space-y-2"
          style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          {programmes.length >= 2 && (
            <button
              type="button"
              onClick={handleShare}
              className="w-full text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors"
            >
              <Share2 className="h-4 w-4" />
              Share comparison
            </button>
          )}
          <div className="flex gap-2">
            {programmes.length > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="flex-1 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 hover:border-red-500/40 hover:text-red-300 rounded-full px-4 py-2.5 min-h-[40px] inline-flex items-center justify-center gap-1.5 touch-manipulation transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={onAddMore}
              disabled={programmes.length >= maxItems}
              className="flex-1 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 hover:border-white/30 rounded-full px-4 py-2.5 min-h-[40px] inline-flex items-center justify-center gap-1.5 touch-manipulation transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="h-3.5 w-3.5" />
              Add more
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CompareDrawer;
