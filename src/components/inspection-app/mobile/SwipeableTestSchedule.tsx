/**
 * SwipeableTestSchedule - Swipeable circuit navigator for mobile
 *
 * - Swipe left/right between circuits (carousel-style)
 * - All test sections visible (no accordions)
 * - Sticky header with circuit info and position (3/12)
 * - Quick jump button to show list of all circuits
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ChevronLeft,
  ChevronRight,
  List,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { TestResult } from '@/types/testResult';
import CircuitTestForm from './CircuitTestForm';
import CircuitQuickNav from './CircuitQuickNav';
import { cn } from '@/lib/utils';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

interface SwipeableTestScheduleProps {
  testResults: TestResult[];
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onRemove: (id: string) => void;
  onAddCircuit: () => void;
}

// Calculate circuit completion
const getCircuitCompletion = (circuit: TestResult) => {
  const checks = {
    designation: !!circuit.circuitDesignation,
    description: !!circuit.circuitDescription,
    conductors: !!(circuit.liveSize && circuit.cpcSize),
    device: !!(circuit.bsStandard && circuit.protectiveDeviceRating),
    continuity: !!(circuit.r1r2 || (circuit.ringR1 && circuit.ringR2)),
    insulation: !!(circuit.insulationLiveEarth || circuit.insulationLiveNeutral),
    polarity: !!circuit.polarity,
    zs: !!circuit.zs,
  };

  const completed = Object.values(checks).filter(Boolean).length;
  const total = Object.keys(checks).length;

  return {
    completed,
    total,
    percentage: Math.round((completed / total) * 100),
    isComplete: completed === total,
    hasIssues: !!(circuit.zs && circuit.maxZs && parseFloat(circuit.zs) > parseFloat(circuit.maxZs)),
  };
};

// Try haptic feedback (fails silently on web)
const triggerHaptic = async () => {
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {
    // Haptics not available (web)
  }
};

const SwipeableTestSchedule: React.FC<SwipeableTestScheduleProps> = ({
  testResults,
  onUpdate,
  onRemove,
  onAddCircuit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuickNav, setShowQuickNav] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep index in bounds when circuits change
  useEffect(() => {
    if (currentIndex >= testResults.length && testResults.length > 0) {
      setCurrentIndex(testResults.length - 1);
    }
  }, [testResults.length, currentIndex]);

  // Navigate to previous circuit
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setDirection('left');
      setCurrentIndex(prev => prev - 1);
      triggerHaptic();
      // Scroll to top
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex]);

  // Navigate to next circuit
  const goToNext = useCallback(() => {
    if (currentIndex < testResults.length - 1) {
      setDirection('right');
      setCurrentIndex(prev => prev + 1);
      triggerHaptic();
      // Scroll to top
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex, testResults.length]);

  // Jump to specific circuit
  const goToCircuit = useCallback((index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
    triggerHaptic();
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    preventScrollOnSwipe: false,
    trackMouse: false,
    trackTouch: true,
    delta: 50,
    swipeDuration: 500,
  });

  // Current circuit data
  const currentCircuit = testResults[currentIndex];
  const completion = currentCircuit ? getCircuitCompletion(currentCircuit) : null;

  // Animation variants
  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? -300 : 300,
      opacity: 0,
    }),
  };

  // Empty state
  if (testResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Zap className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Circuits Yet</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-xs">
          Add your first circuit to start recording test results
        </p>
        <Button onClick={onAddCircuit} className="h-12 px-6 gap-2">
          <Plus className="h-5 w-5" />
          Add First Circuit
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border/50 shadow-sm">
        {/* Circuit Navigation Bar */}
        <div className="flex items-center justify-between px-3 py-2">
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="h-10 w-10 touch-manipulation"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Circuit Title & Position */}
          <div className="flex-1 text-center min-w-0 px-2">
            <div className="flex items-center justify-center gap-2">
              <span className="font-semibold text-foreground truncate">
                {currentCircuit?.circuitDesignation || `Circuit ${currentIndex + 1}`}
              </span>
              {currentCircuit?.phaseType === '3P' && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-purple-500/50 text-purple-400">
                  3PH
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {currentCircuit?.circuitDescription || 'No description'}
            </p>
          </div>

          {/* Position Indicator */}
          <Badge
            variant="secondary"
            className="text-xs px-2 py-0.5 bg-muted text-muted-foreground"
          >
            {currentIndex + 1}/{testResults.length}
          </Badge>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            disabled={currentIndex === testResults.length - 1}
            className="h-10 w-10 touch-manipulation"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Status Bar */}
        {completion && (
          <div className="flex items-center justify-between px-4 py-1.5 bg-muted/30 border-t border-border/30">
            {/* Quick Info */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {currentCircuit.protectiveDeviceCurve && (
                <span className="bg-muted px-1.5 py-0.5 rounded">
                  {currentCircuit.protectiveDeviceCurve}{currentCircuit.protectiveDeviceRating}
                </span>
              )}
              {currentCircuit.liveSize && (
                <span>{currentCircuit.liveSize}mm²</span>
              )}
            </div>

            {/* Completion Status */}
            <div className="flex items-center gap-2">
              {completion.hasIssues && (
                <AlertTriangle className="h-4 w-4 text-amber-400" />
              )}
              {completion.isComplete ? (
                <span className="flex items-center gap-1 text-xs text-green-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Complete
                </span>
              ) : (
                <span className={cn(
                  "text-xs font-medium",
                  completion.percentage >= 50 ? "text-amber-400" : "text-muted-foreground"
                )}>
                  {completion.percentage}%
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Swipeable Content Area */}
      <div
        {...swipeHandlers}
        className="flex-1 overflow-hidden relative"
      >
        <ScrollArea ref={scrollRef} className="h-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentCircuit?.id || currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween', duration: 0.2 }}
              className="p-4"
            >
              {currentCircuit && (
                <CircuitTestForm
                  result={currentCircuit}
                  onUpdate={onUpdate}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </ScrollArea>

        {/* Swipe hint overlay (fades after first swipe) */}
        <div className="absolute inset-x-0 bottom-24 pointer-events-none flex justify-center">
          <div className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs text-muted-foreground border border-border/50 opacity-60">
            Swipe left/right to navigate
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-background border-t border-border/50 px-3 py-2 flex items-center justify-between gap-2 safe-area-pb">
        {/* All Circuits Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowQuickNav(true)}
          className="h-10 px-3 gap-2 touch-manipulation"
        >
          <List className="h-4 w-4" />
          All Circuits
        </Button>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="h-10 px-3 gap-1 touch-manipulation"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNext}
            disabled={currentIndex === testResults.length - 1}
            className="h-10 px-3 gap-1 touch-manipulation"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Delete Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => currentCircuit && onRemove(currentCircuit.id)}
          className="h-10 w-10 text-red-400 hover:text-red-300 hover:bg-red-500/10 touch-manipulation"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Nav Sheet */}
      <CircuitQuickNav
        open={showQuickNav}
        onOpenChange={setShowQuickNav}
        circuits={testResults}
        currentIndex={currentIndex}
        onSelectCircuit={goToCircuit}
      />
    </div>
  );
};

export default SwipeableTestSchedule;
