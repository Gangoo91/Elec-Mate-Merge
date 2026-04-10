import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const additionalTests = [
  {
    title: 'External Earth Fault Loop Impedance (Ze)',
    when: 'At every installation origin — part of initial verification and periodic inspection',
    procedure: 'Disconnect the main earthing conductor from the MET (with supply isolated). Measure between line and the incoming earth at the supply intake. This gives the impedance of the supply transformer, cables and earthing arrangement.',
    acceptance: 'TN-S: typically 0.35-0.8Ω. TN-C-S (PME): typically 0.2-0.35Ω. TT: varies widely depending on electrode.',
    tip: 'Ze must be measured before circuit Zs testing. If Ze is unexpectedly high, all circuit Zs values will be affected. Contact the DNO if Ze exceeds their declared maximum.',
  },
  {
    title: 'Voltage Drop Verification',
    when: 'When circuit length or load suggests voltage drop may exceed BS 7671 limits (3% lighting, 5% other)',
    procedure: 'Calculate voltage drop using cable resistance tables and circuit current. For verification, measure voltage at the supply origin and at the furthest point under load. The difference is the actual voltage drop.',
    acceptance: 'Lighting circuits: ≤3% of nominal (≤6.9V). Other circuits: ≤5% of nominal (≤11.5V). These are the limits from origin to load.',
    tip: 'Voltage drop is usually calculated at design stage, not measured. If measured values exceed calculations, check for loose connections or undersized conductors adding unexpected resistance.',
  },
  {
    title: 'Phase Sequence Verification',
    when: 'All three-phase installations — new, altered, or after any work involving phase conductor reconnection',
    procedure: 'Use a phase rotation meter. Prove on a known supply. Test at the origin and at every load point. L1-L2-L3 sequence must be consistent throughout.',
    acceptance: 'Phase sequence at load must match supply origin. Any mismatch indicates a phase interchange at a termination point.',
    tip: 'Wrong phase sequence causes motors to run backwards — potentially destroying pumps, compressors and fans within seconds. Always verify before coupling to driven equipment.',
  },
  {
    title: 'Verification of Voltage',
    when: 'At initial verification and where supply voltage is critical to equipment operation',
    procedure: 'Measure supply voltage at the origin using a calibrated voltmeter. Record phase-to-neutral (single phase) or phase-to-phase and phase-to-neutral (three phase).',
    acceptance: 'Single phase: 230V ±10% (207-253V). Three phase: 400V ±10% (360-440V). Outside these limits, notify the DNO.',
    tip: 'Low voltage can indicate supply problems, high load, or undersized supply cables. High voltage can damage sensitive equipment.',
  },
];

const AdditionalTestsSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Additional Tests</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {additionalTests.map((test, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
              <p className="text-sm font-semibold text-white">{test.title}</p>
              <div className="space-y-2">
                <div className="rounded-xl bg-white/[0.05] p-3">
                  <p className="text-xs font-semibold text-white/60 mb-1">When Required</p>
                  <p className="text-sm text-white">{test.when}</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-3">
                  <p className="text-xs font-semibold text-white/60 mb-1">Procedure</p>
                  <p className="text-sm text-white">{test.procedure}</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-3">
                  <p className="text-xs font-semibold text-white/60 mb-1">Acceptance</p>
                  <p className="text-sm text-white">{test.acceptance}</p>
                </div>
                <div className="rounded-xl bg-yellow-400/5 border border-yellow-400/10 p-3">
                  <p className="text-xs text-yellow-400/80">{test.tip}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdditionalTestsSection;
