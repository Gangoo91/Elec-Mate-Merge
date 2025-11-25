import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, Calendar as CalendarIcon, RotateCcw } from "lucide-react";
import { PhaseCard } from "./PhaseCard";
import { PhaseDetailsSheet } from "./PhaseDetailsSheet";
import { Badge } from "@/components/ui/badge";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

interface MobilePhaseResultsProps {
  results: any;
  projectName: string;
  startDate: string;
  onExportPDF: () => void;
  onExportCalendar: () => void;
  onStartOver: () => void;
}

export const MobilePhaseResults = ({
  results,
  projectName,
  startDate,
  onExportPDF,
  onExportCalendar,
  onStartOver
}: MobilePhaseResultsProps) => {
  const phases = results?.projectPlan?.phases || [];
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [detailsSheetOpen, setDetailsSheetOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  const goToNextPhase = () => {
    if (activePhaseIndex < phases.length - 1) {
      setDirection(1);
      setActivePhaseIndex(prev => prev + 1);
    }
  };

  const goToPrevPhase = () => {
    if (activePhaseIndex > 0) {
      setDirection(-1);
      setActivePhaseIndex(prev => prev - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: goToNextPhase,
    onSwipedRight: goToPrevPhase,
    trackMouse: true,
    preventScrollOnSwipe: true,
    delta: 50
  });

  if (!phases || phases.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No phases available
      </div>
    );
  }

  const activePhase = phases[activePhaseIndex];
  const completedCount = activePhaseIndex;
  const totalPhases = phases.length;
  const progressPercent = (completedCount / totalPhases) * 100;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-elec-dark pb-20">
      {/* Compact Header - Scrolls Away */}
      <div className="sticky top-0 z-20 bg-elec-dark/95 backdrop-blur-sm border-b border-border/50 pb-3">
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-lg font-bold">{projectName || 'Project Plan'}</h2>
              <p className="text-xs text-muted-foreground">
                Phase {activePhaseIndex + 1} of {totalPhases}
              </p>
            </div>
            <Badge variant="outline" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40">
              {Math.round(progressPercent)}% Complete
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-elec-yellow to-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Phase Selector Pills */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 px-4 pt-3">
          <div className="flex gap-2 pb-2">
            {phases.map((phase: any, idx: number) => {
              const isActive = idx === activePhaseIndex;
              const isCritical = phase.criticalPath || false;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activePhaseIndex ? 1 : -1);
                    setActivePhaseIndex(idx);
                  }}
                  className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-semibold transition-all touch-manipulation ${
                    isActive
                      ? isCritical
                        ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg scale-105'
                        : 'bg-gradient-to-r from-elec-yellow to-yellow-400 text-gray-900 shadow-lg scale-105'
                      : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  Phase {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Phase Card - Swipeable */}
      <div {...handlers} className="px-4 pt-6 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activePhaseIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            <PhaseCard
              phase={activePhase}
              phaseNumber={activePhaseIndex + 1}
              startDate={startDate}
              onViewDetails={() => setDetailsSheetOpen(true)}
              isActive={true}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center mt-6 gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={goToPrevPhase}
            disabled={activePhaseIndex === 0}
            className="touch-manipulation flex-1"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={goToNextPhase}
            disabled={activePhaseIndex === phases.length - 1}
            className="touch-manipulation flex-1"
          >
            Next
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Swipe Hint */}
        <div className="text-center mt-4 text-xs text-muted-foreground">
          ← Swipe to navigate phases →
        </div>
      </div>

      {/* Action Buttons - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-elec-dark/95 backdrop-blur-sm border-t border-border/50 p-4 space-y-3 z-30">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onExportPDF}
            className="touch-manipulation bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold h-12"
          >
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button
            onClick={onExportCalendar}
            variant="outline"
            className="touch-manipulation h-12"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Calendar
          </Button>
        </div>
        <Button
          onClick={onStartOver}
          variant="ghost"
          className="w-full touch-manipulation"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Start New Plan
        </Button>
      </div>

      {/* Phase Details Sheet */}
      <PhaseDetailsSheet
        open={detailsSheetOpen}
        onOpenChange={setDetailsSheetOpen}
        phase={activePhase}
        phaseNumber={activePhaseIndex + 1}
      />
    </div>
  );
};
