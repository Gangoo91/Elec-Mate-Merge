/**
 * CompareDrawer - Programme comparison feature
 * Side-by-side comparison with visual progress bars
 */

import { motion, AnimatePresence } from 'framer-motion';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
} from 'lucide-react';
import { fadeUpVariants } from './animations/variants';
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

// Mini programme card for comparison
const MiniCompareCard = ({
  programme,
  onRemove,
  onClick,
  index,
}: {
  programme: LiveEducationData;
  onRemove: () => void;
  onClick?: () => void;
  index: number;
}) => {
  const colors = ['elec-yellow', 'emerald', 'blue'] as const;
  const color = colors[index % colors.length];
  const colorClasses = {
    'elec-yellow': 'border-elec-yellow/30 hover:border-elec-yellow/50',
    emerald: 'border-emerald-500/30 hover:border-emerald-500/50',
    blue: 'border-blue-500/30 hover:border-blue-500/50',
  };
  const dotClasses = {
    'elec-yellow': 'bg-elec-yellow',
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
  };

  return (
    <SwipeableCard
      leftAction={{
        icon: <Trash2 className="h-5 w-5" />,
        bgColor: 'bg-destructive',
        label: 'Remove',
        onAction: onRemove,
      }}
      className="flex-shrink-0"
    >
      <motion.div
        variants={fadeUpVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClick}
        className={cn(
          'w-[160px] bg-white/[0.04] rounded-xl border overflow-hidden cursor-pointer active:scale-[0.98] transition-all touch-manipulation',
          colorClasses[color]
        )}
      >
        {/* Color indicator */}
        <div className={cn('h-1', dotClasses[color])} />

        {/* Image */}
        <div className="h-16 overflow-hidden">
          {programme.imageUrl ? (
            <img src={programme.imageUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/10 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-2.5">
          <h4 className="text-xs font-medium text-white line-clamp-2 leading-tight">
            {programme.title}
          </h4>
          <p className="text-[11px] text-elec-yellow mt-1 line-clamp-1">{programme.institution}</p>
        </div>
      </motion.div>
    </SwipeableCard>
  );
};

// Comparison row component
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
  icon?: typeof Star;
}) => {
  const barColors = ['bg-elec-yellow', 'bg-emerald-500', 'bg-blue-500'];

  // Find the winner (highest value for progress type)
  let winnerIndex = -1;
  if (type === 'progress' && values.length >= 2) {
    const numericValues = values as number[];
    const maxValue = Math.max(...numericValues);
    const allSame = numericValues.every((v) => v === numericValues[0]);
    if (!allSame) {
      winnerIndex = numericValues.indexOf(maxValue);
    }
  }

  return (
    <div className="space-y-2 py-3 border-b border-white/[0.06] last:border-0">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-3.5 w-3.5 text-white" />}
        <span className="text-xs font-medium text-white uppercase tracking-wide">{label}</span>
      </div>
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${values.length}, 1fr)` }}>
        {values.map((value, index) => {
          const isWinner = index === winnerIndex;

          if (type === 'progress') {
            const numericValue = value as number;
            const displayValue = format ? format(numericValue) : String(numericValue);
            const percentage = (numericValue / max) * 100;

            return (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{displayValue}</span>
                  {isWinner && (
                    <Badge className="bg-emerald-500/15 border-emerald-500/25 text-emerald-400 text-[9px] px-1.5 py-0">
                      Best
                    </Badge>
                  )}
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={cn('h-full rounded-full', barColors[index % barColors.length])}
                  />
                </div>
              </div>
            );
          }

          return (
            <div key={index} className="text-sm text-white text-center py-0.5">
              {String(value) || 'Not specified'}
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
          text: `Check out this programme comparison:\n${programmes.map((p) => `- ${p.title} at ${p.institution}`).join('\n')}`,
        });
      } catch {
        // User cancelled or error
      }
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh] rounded-t-3xl">
        <DrawerHeader className="border-b border-white/10 px-4 py-3">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-base font-semibold text-white">
              Compare ({programmes.length}/{maxItems})
            </DrawerTitle>
            <DrawerClose className="h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center touch-manipulation">
              <X className="h-4 w-4 text-white" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {/* Programme Cards Row */}
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-3">
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

            {/* Add more button */}
            {programmes.length < maxItems && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={onAddMore}
                className="min-w-[160px] h-[130px] rounded-xl border-2 border-dashed border-white/15 flex flex-col items-center justify-center gap-2 hover:border-elec-yellow/40 hover:bg-white/[0.03] transition-colors touch-manipulation"
              >
                <Plus className="h-6 w-6 text-white" />
                <span className="text-xs text-white">Add Programme</span>
              </motion.button>
            )}
          </div>

          {/* Swipe hint */}
          <p className="text-[11px] text-white text-center mb-4">
            Swipe left on a card to remove it
          </p>

          {/* Comparison Grid */}
          {programmes.length >= 2 ? (
            <motion.div
              variants={fadeUpVariants}
              initial="initial"
              animate="animate"
              className="bg-white/[0.03] rounded-xl border border-white/[0.06] px-3 py-1"
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
                label="Employment Rate"
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
                label="Study Mode"
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
            <div className="text-center py-10">
              <GraduationCap className="h-12 w-12 text-white/10 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-white mb-1">Add programmes to compare</h3>
              <p className="text-sm text-white max-w-xs mx-auto mb-4">
                Select at least 2 programmes to see a side-by-side comparison
              </p>
              <Button
                onClick={onAddMore}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold touch-manipulation h-11"
              >
                <Plus className="h-4 w-4 mr-2" />
                Browse Programmes
              </Button>
            </div>
          )}
        </div>

        {/* Footer Actions — stacked on mobile for proper touch targets */}
        <DrawerFooter
          className="border-t border-white/10 px-4 pb-6 pt-3"
          style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
          {programmes.length >= 2 && (
            <Button
              onClick={handleShare}
              className="w-full h-11 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold touch-manipulation rounded-xl"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Comparison
            </Button>
          )}
          <div className="flex gap-2">
            {programmes.length > 0 && (
              <Button
                variant="outline"
                onClick={onClear}
                className="flex-1 h-11 border-white/15 text-white hover:bg-white/10 hover:text-white touch-manipulation rounded-xl"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
            <Button
              onClick={onAddMore}
              disabled={programmes.length >= maxItems}
              variant="outline"
              className="flex-1 h-11 border-white/15 text-white hover:bg-white/10 hover:text-white touch-manipulation rounded-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add More
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CompareDrawer;
