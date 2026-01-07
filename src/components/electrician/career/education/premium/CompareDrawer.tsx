/**
 * CompareDrawer - Programme comparison feature
 * Side-by-side comparison with visual progress bars
 */

import { motion, AnimatePresence } from "framer-motion";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SwipeableCard } from "@/components/ui/SwipeableCard";
import { cn } from "@/lib/utils";
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
  ChevronRight,
} from "lucide-react";
import { fadeUpVariants } from "./animations/variants";
import type { LiveEducationData } from "@/hooks/useLiveEducationData";
import type { ComparisonMetric } from "./hooks/useCompare";

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
  const colors = ["purple", "blue", "green"] as const;
  const color = colors[index % colors.length];
  const colorClasses = {
    purple: "border-purple-500/30 hover:border-purple-500/50",
    blue: "border-blue-500/30 hover:border-blue-500/50",
    green: "border-green-500/30 hover:border-green-500/50",
  };
  const dotClasses = {
    purple: "bg-purple-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
  };

  return (
    <SwipeableCard
      leftAction={{
        icon: <Trash2 className="h-5 w-5" />,
        bgColor: "bg-destructive",
        label: "Remove",
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
          "w-[180px] bg-white/5 rounded-xl border overflow-hidden cursor-pointer transition-colors",
          colorClasses[color]
        )}
      >
        {/* Color indicator */}
        <div className={cn("h-1", dotClasses[color])} />

        {/* Image */}
        <div className="h-20 overflow-hidden">
          {programme.imageUrl ? (
            <img
              src={programme.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-white/10 flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-white/20" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <h4 className="text-sm font-medium text-white line-clamp-2 leading-tight">
            {programme.title}
          </h4>
          <p className="text-xs text-purple-400 mt-1 line-clamp-1">
            {programme.institution}
          </p>
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
  type: "progress" | "text";
  max?: number;
  format?: (v: number) => string;
  icon?: typeof Star;
}) => {
  const colors = ["purple", "blue", "green"] as const;
  const progressColors = {
    purple: "bg-purple-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
  };

  // Find the winner (highest value for progress type)
  let winnerIndex = -1;
  if (type === "progress" && values.length >= 2) {
    const numericValues = values as number[];
    const maxValue = Math.max(...numericValues);
    const allSame = numericValues.every((v) => v === numericValues[0]);
    if (!allSame) {
      winnerIndex = numericValues.indexOf(maxValue);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-white/40" />}
        <span className="text-sm text-white/60">{label}</span>
      </div>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${values.length}, 1fr)` }}>
        {values.map((value, index) => {
          const color = colors[index % colors.length];
          const isWinner = index === winnerIndex;

          if (type === "progress") {
            const numericValue = value as number;
            const displayValue = format ? format(numericValue) : String(numericValue);
            const percentage = (numericValue / max) * 100;

            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm font-medium", isWinner ? "text-white" : "text-white/70")}>
                    {displayValue}
                  </span>
                  {isWinner && (
                    <Badge className="bg-green-500/20 border-green-500/30 text-green-400 text-[10px] px-1.5">
                      Best
                    </Badge>
                  )}
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={cn("h-full rounded-full", progressColors[color])}
                  />
                </div>
              </div>
            );
          }

          return (
            <div key={index} className="text-sm text-white/70 text-center py-1">
              {String(value)}
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
        const titles = programmes.map((p) => p.title).join(" vs ");
        await navigator.share({
          title: `Comparing: ${titles}`,
          text: `Check out this programme comparison:\n${programmes.map((p) => `- ${p.title} at ${p.institution}`).join("\n")}`,
        });
      } catch (error) {
        // User cancelled or error
      }
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh] rounded-t-3xl">
        <DrawerHeader className="border-b border-white/10">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-semibold">
              Compare Programmes ({programmes.length}/{maxItems})
            </DrawerTitle>
            <DrawerClose className="h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center">
              <X className="h-4 w-4" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Programme Cards Row */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-4">
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
                className="min-w-[180px] h-[160px] rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-2 hover:border-purple-500/50 hover:bg-white/5 transition-colors"
              >
                <Plus className="h-8 w-8 text-white/30" />
                <span className="text-sm text-white/40">Add Programme</span>
              </motion.button>
            )}
          </div>

          {/* Swipe hint */}
          <p className="text-xs text-white/40 text-center mb-6">
            Swipe left on a card to remove it
          </p>

          {/* Comparison Grid */}
          {programmes.length >= 2 ? (
            <motion.div
              variants={fadeUpVariants}
              initial="initial"
              animate="animate"
              className="space-y-6"
            >
              <h3 className="text-sm font-medium text-white/60 uppercase tracking-wide">
                Comparison
              </h3>

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
                values={programmes.map((p) => p.locations[0] || "Online")}
                type="text"
              />
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <GraduationCap className="h-16 w-16 text-white/10 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Add programmes to compare
              </h3>
              <p className="text-sm text-white/50 max-w-xs mx-auto">
                Select at least 2 programmes to see a side-by-side comparison
              </p>
              <Button
                onClick={onAddMore}
                className="mt-4 bg-purple-500 hover:bg-purple-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Browse Programmes
              </Button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <DrawerFooter className="border-t border-white/10 safe-area-inset-bottom">
          <div className="flex gap-3">
            {programmes.length > 0 && (
              <Button
                variant="outline"
                onClick={onClear}
                className="border-white/20 hover:bg-white/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
            {programmes.length >= 2 && (
              <Button
                variant="outline"
                onClick={handleShare}
                className="flex-1 border-white/20 hover:bg-white/10"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Comparison
              </Button>
            )}
            <Button
              onClick={onAddMore}
              disabled={programmes.length >= maxItems}
              className="flex-1 bg-purple-500 hover:bg-purple-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Programme
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CompareDrawer;
