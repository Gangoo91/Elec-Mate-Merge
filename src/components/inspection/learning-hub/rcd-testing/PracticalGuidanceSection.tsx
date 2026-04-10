import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const troubleshooting = [
  { problem: 'RCD won\'t reset after testing', actions: ['Disconnect all loads on the protected circuits and attempt reset', 'If it resets with loads disconnected, one of the loads has an earth fault — reconnect one circuit at a time to identify it', 'If it still won\'t reset with all loads disconnected, measure insulation resistance on the fixed wiring', 'Check for moisture in junction boxes, damaged cables, or neutral-earth connections', 'If wiring tests pass and the RCD still won\'t reset, the RCD mechanism itself is faulty — replace'] },
  { problem: 'Inconsistent trip times', actions: ['Check supply voltage — fluctuations affect trip characteristics', 'Allow the RCD to stabilise at ambient temperature before retesting', 'Repeat the test three times and record all readings', 'Check tester calibration — try a different instrument if available', 'If readings vary by more than 50%, the RCD is likely deteriorating — recommend replacement'] },
  { problem: 'RCD trips during normal operation (nuisance tripping)', actions: ['Measure background leakage current with a clamp meter around the live conductor only', 'Cumulative leakage from multiple electronic devices can exceed 30mA on a single RCD', 'Disconnect circuits one at a time to isolate the source of leakage', 'Check for water ingress or damaged cables on the tripping circuit', 'Consider whether the RCD type is appropriate for the connected loads (Type AC with electronic equipment = nuisance trips)'] },
  { problem: 'Both upstream and downstream RCDs trip together', actions: ['Discrimination has failed — the upstream RCD is not time-delayed enough', 'The upstream device should be S-type with intentional delay', 'Check the upstream RCD is not a general type incorrectly installed for discrimination', 'Verify the downstream RCBO is operating correctly in isolation', 'If the upstream RCD is already S-type and both still trip, the fault current may be too high for discrimination to work'] },
];

const commonDefects = [
  { defect: 'RCD fails to trip on test', detail: 'Internal mechanism seized, contaminated contacts, or component failure. This is a C1 (danger present) observation — the installation has no earth fault protection. Replace immediately.' },
  { defect: 'RCD trips too slowly', detail: 'Trip times exceeding limits indicate mechanical wear or internal deterioration. Common in RCDs over 10 years old. The device is providing some protection but not within required times.' },
  { defect: 'Test button stuck or non-operative', detail: 'Mechanical failure of the self-test mechanism. Without a working test button, the user cannot verify RCD function between professional inspections. Replace.' },
  { defect: 'Missing RCD test notice', detail: 'Reg 514.12.2 requires a durable notice at the origin advising the user to test RCDs quarterly/six-monthly. If missing, create and affix one during your inspection.' },
  { defect: 'Incorrect RCD type for connected loads', detail: 'Type AC RCD on circuits supplying electronic equipment with DC components. The RCD may not detect all fault types. Upgrade to Type A or appropriate type.' },
  { defect: 'Loose protective conductor connections', detail: 'High-resistance CPC at the test point gives unreliable results. The RCD may test correctly but fail to protect because fault current cannot reach the detection circuit.' },
];

const maintenanceIntervals = [
  { interval: 'Monthly (user)', action: 'Press the T button to confirm mechanical operation. Record the date.' },
  { interval: '6-monthly (user)', action: 'BS 7671 Reg 514.12.2 requires users to test at least every 6 months. Post a reminder notice at the distribution board.' },
  { interval: 'Annually', action: 'Professional testing with calibrated instruments — full test sequence including 0.5×, 1×, and 5× IΔn.' },
  { interval: '5 years', action: 'Comprehensive condition assessment as part of EICR. Compare results with previous inspections for deterioration trends.' },
  { interval: '10-15 years', action: 'Consider replacement regardless of test results. Internal components have a finite life. Proactive replacement prevents unexpected failure.' },
];

const proTips = [
  { tip: 'Test downstream first', detail: 'When multiple RCDs are in series, always test the furthest downstream device first. This confirms it operates independently before testing upstream discrimination.' },
  { tip: 'Record device details', detail: 'Note the manufacturer, type, rating, and age of each RCD. This information is essential for replacement planning and EICR reporting.' },
  { tip: 'Check for counterfeit devices', detail: 'If a three-phase RCD gives inconsistent results across poles, it may be counterfeit. Test all three poles and compare. Genuine devices should perform identically on each pole.' },
  { tip: 'Monitor trip time trends', detail: 'Increasing trip times over successive inspections indicate deterioration. Flag any RCD where trip times have doubled since last inspection.' },
  { tip: 'Consider the 6-monthly notice', detail: 'If the user test notice is missing (Reg 514.12.2), create and affix one. It is a formal requirement and its absence is an observation on an EICR.' },
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
        {/* Troubleshooting */}
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

        {/* Common defects from RAG */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Common Defects Found</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
            {commonDefects.map((item, i) => (
              <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                <p className="text-sm font-medium text-white">{item.defect}</p>
                <p className="text-sm text-white/70 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Maintenance intervals */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Testing & Maintenance Intervals</p>
        </motion.div>

        {maintenanceIntervals.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex-shrink-0 rounded-xl bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-1.5">
                <span className="text-xs font-bold text-yellow-400 whitespace-nowrap">{item.interval}</span>
              </div>
              <p className="text-sm text-white">{item.action}</p>
            </div>
          </motion.div>
        ))}

        {/* Pro tips */}
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
                  <p className="text-sm text-white/80 mt-0.5">{item.detail}</p>
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
