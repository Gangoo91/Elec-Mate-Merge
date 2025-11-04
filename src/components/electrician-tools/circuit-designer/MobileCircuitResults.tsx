import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { InstallationDesign } from '@/types/installation-design';
import { MobileButton } from '@/components/ui/mobile-button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, ArrowRight, Zap, Cable, Shield, TrendingDown, 
  CheckCircle2, AlertTriangle, AlertCircle, Download, FileText, RotateCcw
} from 'lucide-react';
import { CircuitWorkingsSheet } from './CircuitWorkingsSheet';
import { CircuitJustificationSheet } from './CircuitJustificationSheet';
import { CircuitCard } from './CircuitCard';

interface MobileCircuitResultsProps {
  design: InstallationDesign;
  onReset: () => void;
  onExport: () => void;
}

export const MobileCircuitResults = ({ design, onReset, onExport }: MobileCircuitResultsProps) => {
  const [selectedCircuitIndex, setSelectedCircuitIndex] = useState(0);
  const [showWorkingsSheet, setShowWorkingsSheet] = useState(false);
  const [showJustificationSheet, setShowJustificationSheet] = useState(false);

  const selectedCircuit = design.circuits[selectedCircuitIndex];

  // Calculate overall compliance status
  const allCircuitsCompliant = design.circuits.every(c => 
    c.calculations?.voltageDrop?.compliant && 
    (c.calculations?.zs ?? 0) <= (c.calculations?.maxZs ?? 999)
  );
  const hasWarnings = design.circuits.some(c => c.warnings && c.warnings.length > 0);
  const overallStatus = !allCircuitsCompliant ? 'fail' : hasWarnings ? 'warning' : 'pass';

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
      <div className="px-4 pt-4 pb-3 border-b border-elec-yellow/20">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-elec-light truncate">
              {design.projectName}
            </h1>
            <p className="text-xs text-elec-light/60 truncate">{design.location}</p>
          </div>
          <Badge 
            variant={overallStatus === 'pass' ? 'default' : overallStatus === 'warning' ? 'outline' : 'destructive'}
            className={`ml-3 flex-shrink-0 ${
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
        
        {/* Quick stats inline - minimal */}
        <div className="flex items-center gap-4 mt-2 text-xs text-elec-light/70">
          <span>{design.circuits.length} circuits</span>
          <span>•</span>
          <span>{(design.totalLoad / 1000).toFixed(1)}kW</span>
          <span>•</span>
          <span>{design.consumerUnit.mainSwitchRating}A</span>
        </div>
      </div>

      {/* Circuit Selector Carousel */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-elec-light flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            Circuit {selectedCircuitIndex + 1} of {design.circuits.length}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => navigateCircuit('prev')}
              disabled={selectedCircuitIndex === 0}
              className="p-2 rounded-lg bg-card border border-elec-yellow/30 disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation"
              aria-label="Previous circuit"
            >
              <ArrowLeft className="h-4 w-4 text-elec-yellow" />
            </button>
            <button
              onClick={() => navigateCircuit('next')}
              disabled={selectedCircuitIndex === design.circuits.length - 1}
              className="p-2 rounded-lg bg-card border border-elec-yellow/30 disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation"
              aria-label="Next circuit"
            >
              <ArrowRight className="h-4 w-4 text-elec-yellow" />
            </button>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {design.circuits.map((circuit, index) => (
            <button
              key={circuit.circuitNumber}
              onClick={() => {
                setSelectedCircuitIndex(index);
                if ('vibrate' in navigator) navigator.vibrate(10);
              }}
              className={`flex flex-col items-center gap-1 min-w-[60px] p-2 rounded-lg transition-all touch-manipulation ${
                index === selectedCircuitIndex 
                  ? 'bg-elec-yellow/20 border border-elec-yellow' 
                  : 'bg-card border border-elec-yellow/20'
              }`}
              aria-label={`Go to circuit ${index + 1}`}
            >
              <span className={`text-xs font-medium ${
                index === selectedCircuitIndex ? 'text-elec-yellow' : 'text-elec-light/60'
              }`}>
                C{circuit.circuitNumber}
              </span>
              <div className={`h-1.5 w-1.5 rounded-full ${
                index === selectedCircuitIndex ? 'bg-elec-yellow' : 'bg-elec-light/30'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Circuit Card - Swipeable */}
      <div {...swipeHandlers} className="px-4 mb-6">
        <CircuitCard 
          circuit={selectedCircuit}
          onViewWorkings={() => setShowWorkingsSheet(true)}
          onViewJustification={() => setShowJustificationSheet(true)}
        />
      </div>

      {/* Quick Actions - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-elec-dark via-elec-dark to-elec-dark/0 p-4 pt-8">
        <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
          <MobileButton
            variant="elec-outline"
            size="wide"
            icon={<RotateCcw className="h-5 w-5" />}
            onClick={onReset}
          >
            New Design
          </MobileButton>
          <MobileButton
            variant="elec"
            size="wide"
            icon={<Download className="h-5 w-5" />}
            onClick={onExport}
          >
            Export PDF
          </MobileButton>
        </div>
      </div>

      {/* Bottom Sheets */}
      <CircuitWorkingsSheet
        circuit={selectedCircuit}
        design={design}
        isOpen={showWorkingsSheet}
        onClose={() => setShowWorkingsSheet(false)}
      />

      <CircuitJustificationSheet
        circuit={selectedCircuit}
        isOpen={showJustificationSheet}
        onClose={() => setShowJustificationSheet(false)}
      />
    </div>
  );
};
