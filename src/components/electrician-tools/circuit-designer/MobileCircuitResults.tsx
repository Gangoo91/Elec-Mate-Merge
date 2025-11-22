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
            <p className="text-xs text-white/80 truncate">{design.location}</p>
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
          <span>{design.consumerUnit?.mainSwitchRating || 100}A</span>
        </div>
      </div>

      {/* Enhanced Circuit Selector */}
      <div className="px-3 sm:px-4 py-4 border-b border-elec-yellow/10 bg-gradient-to-b from-elec-dark/50 to-transparent">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-elec-light flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            Circuit {selectedCircuitIndex + 1} of {design.circuits.length}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => navigateCircuit('prev')}
              disabled={selectedCircuitIndex === 0}
              className="p-2 bg-elec-dark border border-elec-yellow/30 rounded-lg hover:bg-elec-yellow/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4 text-elec-light" />
            </button>
            <button
              onClick={() => navigateCircuit('next')}
              disabled={selectedCircuitIndex === design.circuits.length - 1}
              className="p-2 bg-elec-dark border border-elec-yellow/30 rounded-lg hover:bg-elec-yellow/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all touch-manipulation"
            >
              <ArrowRight className="h-4 w-4 text-elec-light" />
            </button>
          </div>
        </div>

        {/* Scrollable Circuit Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory">
          {design.circuits.map((circuit, idx) => {
            const isActive = idx === selectedCircuitIndex;
            const status = circuit.warnings?.length > 0 ? 'warning' : 'pass';
            
            return (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCircuitIndex(idx);
                  if ('vibrate' in navigator) navigator.vibrate(10);
                }}
                className={`flex-shrink-0 px-5 py-2.5 rounded-lg border-2 transition-all touch-manipulation snap-center ${
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
                  {status === 'warning' && <AlertTriangle className="h-3 w-3 text-amber-400" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Circuit Card - Swipeable */}
      <div {...swipeHandlers} className="px-2 sm:px-4 mb-6">
        <CircuitCard 
          circuit={selectedCircuit}
          onViewWorkings={() => setShowWorkingsSheet(true)}
          showFullDetails={true}
        />
      </div>

      {/* Action Panel - Scrollable */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
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
