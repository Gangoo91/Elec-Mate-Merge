import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const scenarios = [
  { title: 'Domestic Consumer Unit', scenario: 'Replacing a light fitting in a house', steps: ['Identify the lighting circuit from the circuit chart', 'Switch off the MCB for that circuit', 'Lock off with a miniature lock-off device on the MCB', 'Prove dead at the ceiling rose — L to N, L to E, N to E', 'Work on the fitting, keeping the lock in place'] },
  { title: 'Commercial Distribution Board', scenario: 'Adding a socket outlet to an office circuit', steps: ['Check circuit chart — identify the correct RCBO/MCB', 'Notify building management and affected occupants', 'Switch off and lock off the RCBO', 'Prove dead at the point of new socket — all conductors', 'Check for parallel feeds from other circuits in the same trunking'] },
  { title: 'Industrial Motor Control', scenario: 'Replacing a contactor on a three-phase motor', steps: ['Identify the motor isolator AND the supply MCB at the distribution board', 'Isolate at BOTH points — belt and braces approach', 'Lock off both isolation points with separate padlocks', 'Prove dead at the contactor terminals — all 10 points (3-phase)', 'Check for stored energy in capacitors — discharge if present'] },
  { title: 'Multiple Supply Sources', scenario: 'Working on a circuit in a building with solar PV', steps: ['Identify ALL supply sources — mains AND solar PV inverter', 'Isolate the mains circuit at the consumer unit', 'Isolate the PV system at the AC isolator AND the DC isolator', 'Lock off all isolation points', 'Prove dead at the point of work — PV systems can backfeed through the inverter'] },
];

const troubleshooting = [
  { problem: 'No lock-off facility on the MCB', actions: ['Remove the MCB fuse/device entirely and keep it on your person', 'Apply a warning tag at the empty way', 'Consider installing a lock-off kit — they are available for most MCB types', 'As a last resort, tape the MCB off and apply multiple warning notices — but this is NOT a substitute for a physical lock'] },
  { problem: 'Cannot achieve isolation — circuit appears live after switching off', actions: ['Check for alternative supply sources — generator, UPS, PV, battery', 'Verify you have isolated the correct circuit (not an adjacent one)', 'Check for cross-connections between circuits', 'Contact the DNO if the problem is upstream of the meter'] },
  { problem: 'Multiple people need to work on the same circuit', actions: ['Each person applies their OWN padlock to a multi-lock hasp', 'The circuit cannot be re-energised until ALL locks are removed', 'Each person proves dead independently before starting their own work', 'Use a permit-to-work system for complex multi-person isolation'] },
  { problem: 'Client refuses permission to isolate', actions: ['Explain the legal requirement — EAW Reg 14', 'Document their refusal in writing', 'Do NOT work on the circuit live unless it meets the strict criteria for live working', 'Consider whether the work can be rescheduled to allow isolation'] },
];

const proTips = [
  { tip: 'Build muscle memory', detail: 'Use the same sequence every single time — even on the simplest job. When it becomes automatic, you will never skip a step under pressure.' },
  { tip: 'Carry a dedicated isolation kit', detail: 'Voltage indicator, proving unit, lock-off devices, padlocks, warning tags — all in one pouch. If it is always ready, you will always use it.' },
  { tip: 'Photograph your isolation', detail: 'Take a photo of the lock-off in place before you start work. This protects you if anyone questions whether you isolated correctly.' },
  { tip: 'Re-prove after any break', detail: 'If you leave the work area for any reason — lunch, materials, phone call — re-prove dead when you return. Someone may have removed your lock.' },
  { tip: 'Never trust anyone else\'s isolation', detail: 'If a colleague says "it\'s isolated", prove it yourself anyway. Your safety is your responsibility.' },
];

const PracticalGuidanceSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Practical Guide</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Real-World Scenarios</p>
        </motion.div>

        {scenarios.map((s, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
              <p className="text-sm font-semibold text-white">{s.title}</p>
              <p className="text-sm text-white">{s.scenario}</p>
              <div className="space-y-1.5">
                {s.steps.map((step, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-yellow-400">{j + 1}</span>
                    </div>
                    <p className="text-sm text-white pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Troubleshooting</p>
        </motion.div>

        {troubleshooting.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
              <p className="text-sm font-semibold text-white">{item.problem}</p>
              <div className="space-y-1">
                {item.actions.map((action, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                    <p className="text-sm text-white">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Professional Tips</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4 space-y-3">
            {proTips.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <div>
                  <p className="text-sm font-medium text-white">{item.tip}</p>
                  <p className="text-sm text-white mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PracticalGuidanceSection;
