import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const r1r2Steps = [
  { number: 1, title: 'Ensure Safe Isolation', description: 'Verify circuit is safely isolated and proven dead before testing' },
  { number: 2, title: 'Connect at Distribution Board', description: 'Connect test leads between phase and CPC terminals at the distribution board' },
  { number: 3, title: 'Test at Furthest Point', description: 'Test at the furthest point of the circuit for maximum resistance' },
  { number: 4, title: 'Record R1+R2 Reading', description: 'Record the combined resistance reading (includes both conductors)' },
  { number: 5, title: 'Verify Requirements', description: 'Ensure result meets BS 7671 requirements for the circuit' },
];

const r2Steps = [
  { number: 1, title: 'Ensure Safe Isolation', description: 'Verify circuit is safely isolated and proven dead before testing' },
  { number: 2, title: 'Install Temporary Link', description: 'Connect temporary link between phase and CPC at board' },
  { number: 3, title: 'Test at Circuit End', description: 'Test between phase and CPC at the end of the circuit' },
  { number: 4, title: 'Remove Link & Record', description: 'Remove temporary link and record R2 reading' },
  { number: 5, title: 'Calculate R1+R2', description: 'Calculate total R1+R2 if required for fault current verification' },
];

const ContinuityTestProcedureCard = ({ onBack }: Props) => {
  const renderSteps = (steps: typeof r1r2Steps, accent: string) => {
    const numColour: Record<string, string> = { amber: 'text-amber-400', blue: 'text-blue-400' };
    const barColour: Record<string, string> = { amber: 'bg-amber-500/50', blue: 'bg-blue-500/50' };
    return (
      <div className="space-y-1.5">
        {steps.map((step) => (
          <div key={step.number} className="relative rounded-xl bg-white/[0.05] p-3 overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${barColour[accent]} rounded-l-xl`} />
            <div className="flex items-start gap-3 pl-2">
              <span className={`text-2xl font-bold ${numColour[accent]} shrink-0 w-8 text-center`}>{step.number}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-white">{step.title}</p>
                <p className="text-[12px] text-white mt-0.5 leading-relaxed">{step.description}</p>
              </div>
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
            <h1 className="text-base font-semibold text-white">Test Procedures</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
        {/* R1+R2 Method */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-amber-400 uppercase tracking-wider px-0.5">R1+R2 Method (Preferred)</p>
            <span className="text-[10px] font-semibold text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5">Recommended</span>
          </div>
          {renderSteps(r1r2Steps, 'amber')}
        </motion.div>

        {/* R2 Method */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-blue-400 uppercase tracking-wider px-0.5">R2 Method (Alternative)</p>
            <span className="text-[10px] font-semibold text-white bg-white/[0.07] border border-white/[0.1] rounded-full px-2 py-0.5">Alternative</span>
          </div>
          {renderSteps(r2Steps, 'blue')}
        </motion.div>

        {/* Critical Requirements */}
        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl bg-white/[0.07] border border-white/[0.08] overflow-hidden p-4">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500/50 rounded-l-2xl" />
            <p className="text-[13px] font-semibold text-yellow-400 mb-3">Critical Test Requirements</p>
            <div className="space-y-3">
              <div>
                <p className="text-[12px] font-semibold text-white">Test Current</p>
                <p className="text-[12px] text-white">- Minimum 200mA DC</p>
                <p className="text-[12px] text-white">- Higher for bonding</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold text-white">Instrument</p>
                <p className="text-[12px] text-white">- Low resistance ohmmeter</p>
                <p className="text-[12px] text-white">- 0.01&Omega; resolution min</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold text-white">Test Leads</p>
                <p className="text-[12px] text-white">- Robust construction</p>
                <p className="text-[12px] text-white">- Known resistance</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContinuityTestProcedureCard;
