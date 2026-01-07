import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { InstallationDesign } from '@/types/installation-design';
import { MobileButton } from '@/components/ui/mobile-button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  ArrowLeft, ArrowRight, Zap, Cable, Shield, TrendingDown,
  CheckCircle2, AlertTriangle, AlertCircle, Download, RotateCcw,
  FileCheck, Loader2
} from 'lucide-react';
import { CircuitWorkingsSheet } from './CircuitWorkingsSheet';
import { CircuitCard } from './CircuitCard';
import { MobileSystemSummary } from './mobile/MobileSystemSummary';
import { cn } from '@/lib/utils';

interface MobileCircuitResultsProps {
  design: InstallationDesign;
  onReset: () => void;
  onExport: () => void;
  onSendToEIC?: () => void;
  isSendingToEIC?: boolean;
}

export const MobileCircuitResults = ({
  design,
  onReset,
  onExport,
  onSendToEIC,
  isSendingToEIC = false
}: MobileCircuitResultsProps) => {
  const [selectedCircuitIndex, setSelectedCircuitIndex] = useState(0);
  const [showWorkingsSheet, setShowWorkingsSheet] = useState(false);

  const selectedCircuit = design.circuits[selectedCircuitIndex];

  // Use backend complianceStatus for consistent results
  const allCircuitsCompliant = design.circuits.every(c => {
    const status = (c as any).complianceStatus;
    // Use backend status if available, fallback to calculation check
    return status ? status === 'pass' : 
      (c.calculations?.voltageDrop?.compliant && 
       (c.calculations?.zs ?? 0) <= (c.calculations?.maxZs ?? 999));
  });
  const hasWarnings = design.circuits.some(c => (c as any).complianceStatus === 'warning' || (c.warnings && c.warnings.length > 0));
  const overallStatus = !allCircuitsCompliant ? 'fail' : hasWarnings ? 'warning' : 'pass';

  // Calculate compliance stats for MobileSystemSummary
  const complianceStats = design.circuits.reduce((acc, circuit) => {
    const status = (circuit as any).complianceStatus;
    if (status === 'pass' || (!status && circuit.calculations?.voltageDrop?.compliant && (circuit.calculations?.zs ?? 0) <= (circuit.calculations?.maxZs ?? 999))) {
      acc.compliant++;
    } else if (status === 'warning' || circuit.warnings?.length > 0) {
      acc.warnings++;
    } else {
      acc.fails++;
    }
    return acc;
  }, { compliant: 0, warnings: 0, fails: 0 });

  // Swipe handlers for circuit navigation
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (selectedCircuitIndex < design.circuits.length - 1) {
        setSelectedCircuitIndex(selectedCircuitIndex + 1);
        // Haptic feedback
        if ('vibrate' in navigator) navigator.vibrate(10);
      }
    },
    onSwipedRight: () => {
      if (selectedCircuitIndex > 0) {
        setSelectedCircuitIndex(selectedCircuitIndex - 1);
        // Haptic feedback
        if ('vibrate' in navigator) navigator.vibrate(10);
      }
    },
    trackMouse: false,
    preventScrollOnSwipe: false,
    delta: 80
  });

  const navigateCircuit = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && selectedCircuitIndex > 0) {
      setSelectedCircuitIndex(selectedCircuitIndex - 1);
    } else if (direction === 'next' && selectedCircuitIndex < design.circuits.length - 1) {
      setSelectedCircuitIndex(selectedCircuitIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-elec-dark pb-20">
      {/* Compact Page Header (scrolls away) */}
      <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-2 sm:pb-3 border-b border-elec-yellow/20">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-elec-light truncate">
              {design.projectName}
            </h1>
            <p className="text-xs text-foreground/80 truncate">{design.location}</p>
          </div>
          <Badge 
            variant={overallStatus === 'pass' ? 'default' : overallStatus === 'warning' ? 'outline' : 'destructive'}
            className={`ml-3 flex-shrink-0 text-[10px] sm:text-xs ${
              overallStatus === 'pass' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
              overallStatus === 'warning' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
              'bg-red-500/20 text-red-400 border-red-500/30'
            }`}
          >
            {overallStatus === 'pass' && <CheckCircle2 className="h-3 w-3 mr-1" />}
            {overallStatus === 'warning' && <AlertTriangle className="h-3 w-3 mr-1" />}
            {overallStatus === 'fail' && <AlertCircle className="h-3 w-3 mr-1" />}
            {overallStatus === 'pass' ? 'Pass' : overallStatus === 'warning' ? 'Warning' : 'Review'}
          </Badge>
        </div>
      </div>

      {/* Enhanced System Summary */}
      <div className="px-3 sm:px-4 py-3 sm:py-4">
        <MobileSystemSummary 
          design={design} 
          complianceStats={complianceStats}
        />
      </div>

      {/* Enhanced Circuit Selector */}
      <div className="px-3 sm:px-4 py-3 sm:py-4 border-b border-elec-yellow/10 bg-gradient-to-b from-elec-dark/50 to-transparent">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-elec-light flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            Circuit {selectedCircuitIndex + 1} of {design.circuits.length}
          </h3>
          <div className="flex gap-1.5 sm:gap-2">
            <button
              onClick={() => navigateCircuit('prev')}
              disabled={selectedCircuitIndex === 0}
              className="p-2.5 sm:p-2 bg-elec-dark border border-elec-yellow/30 rounded-lg hover:bg-elec-yellow/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all touch-manipulation min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
            >
              <ArrowLeft className="h-4 w-4 text-elec-light" />
            </button>
            <button
              onClick={() => navigateCircuit('next')}
              disabled={selectedCircuitIndex === design.circuits.length - 1}
              className="p-2.5 sm:p-2 bg-elec-dark border border-elec-yellow/30 rounded-lg hover:bg-elec-yellow/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all touch-manipulation min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
            >
              <ArrowRight className="h-4 w-4 text-elec-light" />
            </button>
          </div>
        </div>

        {/* Scrollable Circuit Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory">
          {design.circuits.map((circuit, idx) => {
            const isActive = idx === selectedCircuitIndex;
            // Use backend complianceStatus, fallback to warning check
            const status = (circuit as any).complianceStatus || 
              (circuit.warnings?.length > 0 ? 'warning' : 'pass');
            
            return (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCircuitIndex(idx);
                  if ('vibrate' in navigator) navigator.vibrate(10);
                }}
                className={`flex-shrink-0 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-lg border-2 transition-all touch-manipulation snap-center min-h-[44px] ${
                  isActive 
                    ? 'bg-elec-yellow/20 border-elec-yellow text-elec-yellow font-semibold shadow-lg shadow-elec-yellow/20' 
                    : 'bg-elec-dark/60 border-elec-yellow/20 text-elec-light/60 hover:border-elec-yellow/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    Way {idx + 1}
                    {circuit.phases === 'three' && (
                      <span className="text-[10px] ml-1 opacity-70">3Ø</span>
                    )}
                  </span>
                  {status !== 'pass' && (
                    <AlertTriangle className={`h-3 w-3 ${status === 'fail' ? 'text-red-400' : 'text-amber-400'}`} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Circuit Card - Swipeable with Full Details */}
      <div {...swipeHandlers} className="px-3 sm:px-4 mb-4 sm:mb-6">
        <CircuitCard 
          circuit={selectedCircuit}
          displayNumber={selectedCircuitIndex + 1}
          onViewWorkings={() => setShowWorkingsSheet(true)}
          showFullDetails={true}
        />
      </div>

      {/* Action Panel - Premium Styling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-3 sm:px-4 pb-4 sm:pb-6 space-y-2.5 sm:space-y-3"
      >
        {/* Primary Actions */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <MobileButton
            variant="elec"
            size="wide"
            icon={<Download className="h-5 w-5" />}
            onClick={onExport}
          >
            Export PDF
          </MobileButton>
          {onSendToEIC && (
            <MobileButton
              variant="elec-outline"
              size="wide"
              icon={isSendingToEIC ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileCheck className="h-5 w-5" />}
              onClick={onSendToEIC}
              disabled={isSendingToEIC}
              className={cn(
                "bg-elec-yellow/10 border-elec-yellow/30",
                "hover:bg-elec-yellow/20 hover:border-elec-yellow/50",
                "text-elec-yellow"
              )}
            >
              {isSendingToEIC ? 'Saving...' : 'Send to EIC'}
            </MobileButton>
          )}
        </div>
        {/* Secondary Actions */}
        <MobileButton
          variant="ghost"
          size="wide"
          icon={<RotateCcw className="h-5 w-5" />}
          onClick={onReset}
          className="w-full text-white/60 hover:text-white hover:bg-white/5"
        >
          New Design
        </MobileButton>
      </motion.div>

      {/* Bottom Sheet - Workings Only */}
      <CircuitWorkingsSheet
        circuit={selectedCircuit}
        design={design}
        isOpen={showWorkingsSheet}
        onClose={() => setShowWorkingsSheet(false)}
      />
    </div>
  );
};
