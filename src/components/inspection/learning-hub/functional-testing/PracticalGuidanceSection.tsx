import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const troubleshooting = [
  { problem: 'Switch does not operate its intended load', actions: ['Verify the switch is wired to the correct circuit at the board', 'Check for loose or disconnected wiring at the switch or accessory', 'Test for voltage at the switch terminals with a voltage indicator', 'Check if the load device itself has failed (lamp blown, motor overload tripped)'] },
  { problem: 'Two-way switching not working from one position', actions: ['Check common terminal identification — line must be on COM at both switches', 'Verify strappers are on L1 and L2 terminals at both switches', 'Test continuity of strappers between switches', 'A new switch may have different terminal layout to the old one — check manufacturer marking'] },
  { problem: 'RCD test button does not trip the device', actions: ['Mechanical failure — the T button mechanism is seized or broken', 'This is a C1 observation regardless of calibrated test results', 'Replace the RCD immediately', 'Do not rely on calibrated testing alone — the T button provides user-accessible safety'] },
  { problem: 'Emergency stop does not disconnect all equipment', actions: ['Check contactor wiring — the E-stop should break the contactor coil supply', 'Verify all contactors in the system are connected to the E-stop circuit', 'Check for equipment with independent supplies bypassing the E-stop', 'Review the control circuit drawing against the actual wiring'] },
  { problem: 'Motor runs in wrong direction', actions: ['STOP the motor immediately — wrong rotation can damage driven equipment', 'Swap any two phase connections at the motor terminals or starter', 'Retest direction before coupling to the driven equipment', 'For single-phase motors, check start capacitor wiring against manufacturer instructions'] },
];

const commonDefects = [
  { defect: 'Stiff or damaged switch mechanisms', detail: 'Switches that are difficult to operate or do not make positive contact. Common in older installations. The switch may work intermittently, creating arcing and fire risk.' },
  { defect: 'Incorrect circuit chart labelling', detail: 'Circuit chart does not match actual circuits. This is a safety issue — someone isolating "kitchen" may leave the actual kitchen circuit live. Always verify during functional testing.' },
  { defect: 'Indicator lamps not working', detail: 'Neon indicators on cooker switches, shower isolators, or FCUs that are blown or not connected. The user cannot tell if the circuit is live without working indicators.' },
  { defect: 'Interlocks bypassed or defeated', detail: 'Safety interlocks that have been wired out, taped over, or mechanically defeated. This is a C1 observation — interlocks exist to prevent access to dangerous parts.' },
  { defect: 'Time delay controls set incorrectly', detail: 'Extractor fan overruns, PIR delays, or timer programmes set to inappropriate values. Functional testing should verify these are set to the correct duration.' },
];

const proTips = [
  { tip: 'Work with a second person', detail: 'Some functional tests require simultaneous operation at two locations (e.g., testing two-way switches, emergency stops at different positions). A colleague makes this faster and safer.' },
  { tip: 'Test in the correct order', detail: 'Start at the consumer unit (main switch first, then individual devices) and work outwards to accessories. This systematic approach ensures nothing is missed.' },
  { tip: 'Record defects as you find them', detail: 'Do not try to fix defects during functional testing — record them and address them separately. This keeps the testing process systematic and prevents confusion.' },
  { tip: 'Check the circuit chart against reality', detail: 'Functional testing is your best opportunity to verify the circuit chart. Switch each MCB off individually and confirm which circuit loses power. Update the chart if wrong.' },
  { tip: 'Test emergency systems with care', detail: 'Coordinate with building management before testing fire alarm interfaces, emergency lighting, and E-stops. False alarms and unexpected shutdowns cause disruption and cost money.' },
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
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Common Defects Found</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
            {commonDefects.map((item, i) => (
              <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                <p className="text-sm font-medium text-white">{item.defect}</p>
                <p className="text-sm text-white mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

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
