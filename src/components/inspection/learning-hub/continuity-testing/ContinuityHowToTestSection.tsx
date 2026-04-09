import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const equipmentApproved = [
  'Low resistance ohmmeter (preferred method)',
  'Continuity tester with adequate test current',
  'Multimeter with low resistance capability',
  'Insulation and continuity tester (combined unit)',
  'Calibration certificate must be current',
];

const equipmentSpecs = [
  'Test current: Minimum 200mA DC for protective conductors',
  'Resolution: 0.01\u03A9 or better for accurate readings',
  'Accuracy: \u00B12% of reading or better',
  'Test voltage: 4-24V DC (varies by manufacturer)',
  'Safety category: CAT III 300V minimum',
];

const leadConsiderations = [
  { heading: 'Lead Resistance', items: ['Must be known and recorded', 'Subtracted from test readings', 'Typically 0.01-0.05\u03A9 per lead'] },
  { heading: 'Lead Quality', items: ['Robust construction essential', 'Good contact with test probes', 'Adequate current carrying capacity'] },
  { heading: 'Lead Safety', items: ['Insulated for working voltage', 'Finger guards on probes', 'Regular visual inspection'] },
];

const r1r2Steps = [
  { number: 1, text: 'Ensure circuit is safely isolated and locked off' },
  { number: 2, text: 'Remove all lamps, equipment, and accessories' },
  { number: 3, text: 'Identify phase and CPC at distribution board' },
  { number: 4, text: 'Check test instrument calibration and leads' },
  { number: 5, text: 'Measure and record test lead resistance' },
  { number: 6, text: 'Connect test leads to phase and CPC at board' },
  { number: 7, text: 'Go to furthest point of circuit' },
  { number: 8, text: 'Connect phase and CPC terminals together' },
  { number: 9, text: 'Take reading on test instrument' },
  { number: 10, text: 'Subtract test lead resistance from reading' },
];

const r1r2Advantages = [
  'Tests complete fault path (phase + protective conductor)',
  'No temporary links required at distribution board',
  'Directly measures impedance for fault calculations',
  'Suitable for all circuit types and configurations',
];

const r1r2SafetyBenefits = [
  'Minimal disturbance to distribution board',
  'Reduces risk of incorrect reconnection',
  'Clear indication of complete circuit integrity',
  'Easier to identify and locate faults',
];

const r2Steps = [
  { number: 1, text: 'Ensure circuit is safely isolated' },
  { number: 2, text: 'Install temporary link between phase and CPC at board' },
  { number: 3, text: 'Ensure good electrical connection' },
  { number: 4, text: 'Verify link is secure and safe' },
  { number: 5, text: 'Prepare test equipment and leads' },
  { number: 6, text: 'Go to circuit end point' },
  { number: 7, text: 'Connect test leads between phase and CPC terminals' },
  { number: 8, text: 'Take resistance reading (this is R2)' },
  { number: 9, text: 'Return to board and remove temporary link' },
  { number: 10, text: 'Calculate R1+R2 if required for design verification' },
];

const r2Suitable = [
  'Ring circuits where R1+R2 method is complex',
  'Circuits with multiple cable types',
  'When phase conductor access is limited',
  'Existing installations with unknown cable types',
];

const r2Limitations = [
  'Only tests protective conductor',
  'Requires calculation for R1+R2 value',
  'Additional steps and temporary connections',
  'Potential for reconnection errors',
];

const ringStepA = [
  { number: 1, text: 'Identify L, N and CPC conductors at the distribution board' },
  { number: 2, text: 'Measure end-to-end resistance of line conductors (L-L)' },
  { number: 3, text: 'Measure end-to-end resistance of neutral conductors (N-N)' },
  { number: 4, text: 'Measure end-to-end resistance of CPC conductors (CPC-CPC)' },
  { number: 5, text: 'A finite reading on each confirms no open circuit. Record all readings.' },
];

const ringStepB = [
  { number: 6, text: 'Connect outgoing L to returning N and vice versa at the board' },
  { number: 7, text: 'Measure resistance between L and N at each socket outlet on the ring' },
  { number: 8, text: 'All readings should be substantially the same' },
  { number: 9, text: 'Significant variation indicates a ring break or interconnection fault' },
];

const ringStepC = [
  { number: 10, text: 'Reconnect L-N correctly, then cross-connect L to CPC and vice versa' },
  { number: 11, text: 'Measure at each socket outlet on the ring' },
  { number: 12, text: 'Ring sockets should show substantially the same readings at approximately half the loop resistance' },
  { number: 13, text: 'Spurs will show proportionally higher resistance corresponding to spur cable length' },
];

const ringExpected = [
  { heading: 'Leg-to-Leg Tests', items: ['Phase leg-to-leg: ~R1 value', 'Neutral leg-to-leg: ~R1 value', 'CPC leg-to-leg: ~R2 value', 'Values should be approximately equal'] },
  { heading: 'End-to-End Tests', items: ['All socket outlets: (R1+R2)/4', 'Consistent readings around ring', 'Maximum deviation: \u00B10.05\u03A9', 'Total R1+R2 must be \u22641.67\u03A9'] },
  { heading: 'Fault Indications', items: ['Infinite reading: broken conductor', 'Very high reading: poor connection', 'Inconsistent readings: ring not intact', 'Zero reading: short circuit'] },
];

const commonErrors = [
  'Inadequate test current: Using basic multimeter',
  'Parallel paths: Not isolating all connections',
  'Test lead resistance: Not compensating for lead resistance',
  'Poor connections: Inadequate probe contact',
  'Wrong terminals: Testing incorrect conductors',
];

const solutions = [
  'Use approved instruments: Minimum 200mA test current',
  'Proper isolation: Remove all parallel paths',
  'Measure lead resistance: Null or compensate readings',
  'Ensure good contact: Clean terminals and probes',
  'Verify connections: Double-check conductor identification',
];

const highResistanceCauses = [
  'Loose terminal connections',
  'Corroded or damaged conductors',
  'Inadequate cable sizing',
  'Poor crimped connections',
  'Damaged cable during installation',
];

const highResistanceSteps = [
  'Visual inspection of all connections',
  'Test individual cable sections',
  'Check for mechanical damage',
  'Verify cable specification',
  'Test at multiple points along route',
];

type SectionId = 'equipment' | 'r1r2' | 'r2' | 'ring' | 'errors';

const ContinuityHowToTestSection = ({ onBack }: Props) => {
  const [expanded, setExpanded] = useState<SectionId | null>(null);
  const toggle = (id: SectionId) => setExpanded((prev) => (prev === id ? null : id));

  const renderExpandable = (id: SectionId, title: string, accent: string, content: React.ReactNode) => {
    const isOpen = expanded === id;
    const barMap: Record<string, string> = {
      blue: 'bg-blue-500/50',
      amber: 'bg-amber-500/50',
      purple: 'bg-purple-500/50',
      cyan: 'bg-cyan-500/50',
      red: 'bg-red-500/50',
    };
    const textMap: Record<string, string> = {
      blue: 'text-blue-400',
      amber: 'text-amber-400',
      purple: 'text-purple-400',
      cyan: 'text-cyan-400',
      red: 'text-red-400',
    };
    return (
      <motion.div variants={itemVariants}>
        <button
          type="button"
          onClick={() => toggle(id)}
          className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
        >
          <div className={`relative rounded-2xl bg-white/[0.07] border ${isOpen ? 'border-white/[0.15]' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${barMap[accent]} rounded-l-2xl`} />
            <div className="p-4 flex items-center gap-3">
              <p className={`text-[13px] font-semibold ${textMap[accent]} flex-1`}>{title}</p>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-4 w-4 text-white shrink-0" />
              </motion.div>
            </div>
          </div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="pt-2 px-1 pb-1">{content}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderStepCards = (steps: { number: number; text: string }[], accent: string) => {
    const numColour: Record<string, string> = {
      amber: 'text-amber-400',
      purple: 'text-purple-400',
      cyan: 'text-cyan-400',
    };
    const barColour: Record<string, string> = {
      amber: 'bg-amber-500/50',
      purple: 'bg-purple-500/50',
      cyan: 'bg-cyan-500/50',
    };
    return (
      <div className="space-y-1.5">
        {steps.map((step) => (
          <div key={step.number} className="relative rounded-xl bg-white/[0.05] p-3 overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${barColour[accent]} rounded-l-xl`} />
            <div className="flex items-start gap-3 pl-2">
              <span className={`text-lg font-bold ${numColour[accent]} shrink-0 w-6 text-center`}>{step.number}</span>
              <p className="text-[12px] text-white leading-relaxed">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">How to Test</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
        {/* Equipment */}
        {renderExpandable('equipment', 'Test Equipment Requirements', 'blue', (
          <div className="space-y-2">
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-blue-400 mb-1.5">Approved Test Instruments:</p>
              <div className="space-y-1">
                {equipmentApproved.map((item, i) => (
                  <p key={i} className="text-[12px] text-white">- {item}</p>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-blue-400 mb-1.5">Technical Specifications:</p>
              <div className="space-y-1">
                {equipmentSpecs.map((item, i) => (
                  <p key={i} className="text-[12px] text-white">- {item}</p>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-yellow-400 mb-1.5">Test Lead Considerations:</p>
              {leadConsiderations.map((group, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="text-[12px] font-semibold text-white mb-0.5">{group.heading}:</p>
                  {group.items.map((item, j) => (
                    <p key={j} className="text-[12px] text-white">- {item}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* R1+R2 Method */}
        <p className="text-xs font-medium text-amber-400 uppercase tracking-wider px-0.5 mt-4">R1+R2 Method (Preferred)</p>
        {renderExpandable('r1r2', 'R1+R2 Step-by-Step Procedure', 'amber', (
          <div className="space-y-3">
            {renderStepCards(r1r2Steps, 'amber')}
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-blue-400 mb-1.5">Why R1+R2 is Preferred:</p>
              <p className="text-[12px] font-semibold text-white mb-1">Practical Advantages:</p>
              <div className="space-y-0.5 mb-2">
                {r1r2Advantages.map((item, i) => (
                  <p key={i} className="text-[12px] text-white">- {item}</p>
                ))}
              </div>
              <p className="text-[12px] font-semibold text-white mb-1">Safety Benefits:</p>
              <div className="space-y-0.5">
                {r1r2SafetyBenefits.map((item, i) => (
                  <p key={i} className="text-[12px] text-white">- {item}</p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* R2 Method */}
        <p className="text-xs font-medium text-purple-400 uppercase tracking-wider px-0.5 mt-4">R2 Method (Alternative)</p>
        {renderExpandable('r2', 'R2 Step-by-Step Procedure', 'purple', (
          <div className="space-y-3">
            {renderStepCards(r2Steps, 'purple')}
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-orange-400 mb-1.5">When to Use R2 Method:</p>
              <p className="text-[12px] font-semibold text-white mb-1">Suitable Situations:</p>
              <div className="space-y-0.5 mb-2">
                {r2Suitable.map((item, i) => (
                  <p key={i} className="text-[12px] text-white">- {item}</p>
                ))}
              </div>
              <p className="text-[12px] font-semibold text-white mb-1">Limitations:</p>
              <div className="space-y-0.5">
                {r2Limitations.map((item, i) => (
                  <p key={i} className="text-[12px] text-white">- {item}</p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Ring Circuit */}
        <p className="text-xs font-medium text-cyan-400 uppercase tracking-wider px-0.5 mt-4">Ring Circuit Testing</p>
        {renderExpandable('ring', 'Ring Circuit Testing Procedure', 'cyan', (
          <div className="space-y-3">
            <p className="text-[12px] font-semibold text-cyan-400 px-1">Step A: End-to-End Continuity</p>
            {renderStepCards(ringStepA, 'cyan')}
            <p className="text-[12px] font-semibold text-cyan-400 px-1 mt-2">Step B: Cross-Connection</p>
            {renderStepCards(ringStepB, 'cyan')}
            <p className="text-[12px] font-semibold text-cyan-400 px-1 mt-2">Step C: Verification</p>
            {renderStepCards(ringStepC, 'cyan')}
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-green-400 mb-1.5">Expected Results:</p>
              {ringExpected.map((group, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="text-[12px] font-semibold text-white mb-0.5">{group.heading}:</p>
                  {group.items.map((item, j) => (
                    <p key={j} className="text-[12px] text-white">- {item}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Common Errors */}
        {renderExpandable('errors', 'Common Testing Errors and Solutions', 'red', (
          <div className="space-y-2">
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-red-400 mb-1.5">Common Errors:</p>
              <div className="space-y-1">
                {commonErrors.map((item, i) => (
                  <p key={i} className="text-[12px] text-white">- {item}</p>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-green-400 mb-1.5">Solutions:</p>
              <div className="space-y-1">
                {solutions.map((item, i) => (
                  <p key={i} className="text-[12px] text-white">- {item}</p>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-[12px] font-semibold text-yellow-400 mb-1.5">Troubleshooting High Resistance Readings:</p>
              <p className="text-[12px] font-semibold text-white mb-1">Potential Causes:</p>
              <div className="space-y-0.5 mb-2">
                {highResistanceCauses.map((item, i) => (
                  <p key={i} className="text-[12px] text-white">- {item}</p>
                ))}
              </div>
              <p className="text-[12px] font-semibold text-white mb-1">Investigation Steps:</p>
              <div className="space-y-0.5">
                {highResistanceSteps.map((item, i) => (
                  <p key={i} className="text-[12px] text-white">- {item}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ContinuityHowToTestSection;
