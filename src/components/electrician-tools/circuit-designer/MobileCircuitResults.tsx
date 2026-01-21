import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';
import { InstallationDesign } from '@/types/installation-design';
import { MobileButton } from '@/components/ui/mobile-button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowLeft, ArrowRight, Zap, Cable, Shield, TrendingDown,
  CheckCircle2, AlertTriangle, AlertCircle, Download, RotateCcw,
  FileCheck, Loader2, Send, Wrench, FileText, Calculator, TestTube
} from 'lucide-react';
import { CircuitWorkingsSheet } from './CircuitWorkingsSheet';
import { CircuitCard } from './CircuitCard';
import { MobileSystemSummary } from './mobile/MobileSystemSummary';
import { cn } from '@/lib/utils';
import { generateCircuitContext } from '@/utils/circuit-context-generator';

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
  const navigate = useNavigate();
  const [selectedCircuitIndex, setSelectedCircuitIndex] = useState(0);
  const [showWorkingsSheet, setShowWorkingsSheet] = useState(false);

  // Send to Agent handler
  const sendToAgent = (agentType: 'installer' | 'rams' | 'cost-engineer' | 'commissioning') => {
    const context = generateCircuitContext(design);
    const routes: Record<string, string> = {
      'installer': '/electrician-tools/installation-advisor',
      'rams': '/electrician-tools/site-safety',
      'cost-engineer': '/electrician-tools/cost-engineer',
      'commissioning': '/electrician-tools/commissioning'
    };
    navigate(routes[agentType], { state: { circuitContext: context } });
  };

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
    <div className="min-h-screen bg-elec-dark pb-32">
      {/* Mobile Header - Native App Style */}
      <div className="px-4 pt-safe pb-3 bg-gradient-to-b from-elec-dark to-transparent">
        {/* Status Bar */}
        <div className="flex items-center justify-between mb-4">
          <Badge className="bg-white/10 text-white/80 border-0 text-xs">
            BS 7671:2018+A3:2024
          </Badge>
          <Badge
            className={cn(
              "border-0 font-medium",
              overallStatus === 'pass'
                ? "bg-green-500/20 text-green-400"
                : overallStatus === 'warning'
                ? "bg-amber-500/20 text-amber-400"
                : "bg-red-500/20 text-red-400"
            )}
          >
            {overallStatus === 'pass' ? (
              <><CheckCircle2 className="h-3 w-3 mr-1" /> Compliant</>
            ) : overallStatus === 'warning' ? (
              <><AlertTriangle className="h-3 w-3 mr-1" /> Review</>
            ) : (
              <><AlertCircle className="h-3 w-3 mr-1" /> Issues</>
            )}
          </Badge>
        </div>

        {/* Project Title - Large & Clear */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-elec-yellow to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Zap className="h-6 w-6 text-black" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-white truncate">
              {design.projectName}
            </h1>
            <p className="text-sm text-white/50 flex items-center gap-1 mt-0.5">
              <span className="truncate">{design.location}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Single Padding Source */}
      <main className="px-4 space-y-3">
        {/* System Summary */}
        <MobileSystemSummary
          design={design}
          complianceStats={complianceStats}
        />

        {/* Circuit Selector */}
        <div className="py-3 border-b border-elec-yellow/10">
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
                      <AlertTriangle className={`h-3 w-3 ${status === 'fail' ? 'text-red-400' : 'text-orange-400'}`} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Circuit Card - Swipeable with Full Details */}
        <div {...swipeHandlers} className="mb-3">
          <CircuitCard
            circuit={selectedCircuit}
            displayNumber={selectedCircuitIndex + 1}
            onViewWorkings={() => setShowWorkingsSheet(true)}
            showFullDetails={true}
          />
        </div>
      </main>

      {/* Fixed Footer - Native Pattern */}
      <div className="fixed bottom-0 left-0 right-0 bg-elec-dark/95 backdrop-blur-xl border-t border-elec-yellow/20 px-4 py-3 pb-safe z-40">
        <div className="space-y-2">
          {/* Primary Actions Row */}
          <div className="grid grid-cols-2 gap-2">
            <MobileButton
              variant="elec"
              size="wide"
              icon={<Download className="h-5 w-5" />}
              onClick={onExport}
              className="h-12"
            >
              Export PDF
            </MobileButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 h-12 gap-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Send className="h-4 w-4" />
                  Send to Agent
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" side="top" className="w-56 mb-2 bg-elec-dark border-elec-yellow/30">
                <DropdownMenuItem
                  onClick={() => sendToAgent('installer')}
                  className="text-white hover:bg-elec-yellow/20 focus:bg-elec-yellow/20 cursor-pointer"
                >
                  <Wrench className="h-4 w-4 mr-2 text-elec-yellow" />
                  Installation Specialist
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => sendToAgent('rams')}
                  className="text-white hover:bg-elec-yellow/20 focus:bg-elec-yellow/20 cursor-pointer"
                >
                  <FileText className="h-4 w-4 mr-2 text-elec-yellow" />
                  RAMS Generator
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => sendToAgent('cost-engineer')}
                  className="text-white hover:bg-elec-yellow/20 focus:bg-elec-yellow/20 cursor-pointer"
                >
                  <Calculator className="h-4 w-4 mr-2 text-elec-yellow" />
                  Cost Engineer
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => sendToAgent('commissioning')}
                  className="text-white hover:bg-elec-yellow/20 focus:bg-elec-yellow/20 cursor-pointer"
                >
                  <TestTube className="h-4 w-4 mr-2 text-elec-yellow" />
                  Commissioning
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Secondary Actions Row */}
          <div className="grid grid-cols-2 gap-2">
            {onSendToEIC && (
              <MobileButton
                variant="elec-outline"
                size="wide"
                icon={isSendingToEIC ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileCheck className="h-5 w-5" />}
                onClick={onSendToEIC}
                disabled={isSendingToEIC}
                className={cn(
                  "h-11 bg-elec-yellow/10 border-elec-yellow/30",
                  "hover:bg-elec-yellow/20 hover:border-elec-yellow/50",
                  "text-elec-yellow"
                )}
              >
                {isSendingToEIC ? 'Saving...' : 'Send to EIC'}
              </MobileButton>
            )}
            <MobileButton
              variant="ghost"
              size="wide"
              icon={<RotateCcw className="h-5 w-5" />}
              onClick={onReset}
              className={cn(
                "h-11 text-white/60 hover:text-white hover:bg-white/5",
                !onSendToEIC && "col-span-2"
              )}
            >
              New Design
            </MobileButton>
          </div>
        </div>
      </div>

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
