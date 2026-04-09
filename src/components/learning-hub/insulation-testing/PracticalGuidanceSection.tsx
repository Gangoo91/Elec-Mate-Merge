import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const equipmentChecklist = [
  'Use calibrated insulation resistance tester (in-date calibration)',
  'Check battery condition before testing',
  'Ensure test leads are in good condition with no damage',
  'Clean test probe tips for good contact',
  'Select appropriate test voltage for circuit',
  'Verify tester accuracy with a known resistance',
];

const testSequence = [
  'Always test between all live conductors and earth first',
  'Start with Live-Earth test (L-E)',
  'Then test Neutral-Earth (N-E)',
  'Finally test Live-Neutral (L-N)',
  'Record all readings immediately',
  'Note any unusual readings for further investigation',
  'Discharge cables between each test',
];

const practicalTips = [
  'Damp or humid conditions will give lower readings \u2014 test on dry days where possible',
  'Long cable runs naturally have lower IR readings \u2014 consider cable length when assessing results',
  'If reading is borderline, check individual circuits by disconnecting at the distribution board',
  'Multiple parallel circuits will show lower combined IR \u2014 test individually for accurate assessment',
  'Always compare L-E and N-E readings \u2014 large differences may indicate a specific conductor fault',
  'Keep a record of previous test results to identify deterioration trends over time',
];

const lowReadingCauses = [
  'Moisture ingress in cables or junction boxes',
  'Damaged cable insulation (mechanical damage, rodent, or nail/screw)',
  'Contaminated terminations or dirty connections',
  'Equipment not fully disconnected',
  'Cable routes through damp areas (e.g. below DPC, external walls)',
  'Aged insulation that has become brittle and cracked',
  'Salt or chemical contamination in coastal or industrial settings',
];

const lowReadingSolutions = [
  'Allow time for moisture to evaporate (use a fan heater if necessary)',
  'Clean all terminations thoroughly',
  'Double-check all equipment is disconnected',
  'Test individual cable sections to isolate the fault',
  'Disconnect circuits one at a time at the DB to find the offending circuit',
  'Visually inspect cable routes for obvious damage',
  'Retest after remedial work to confirm improvement',
];

const inconsistentCauses = [
  'Poor test lead connections or dirty probes',
  'Intermittent faults (moisture that comes and goes)',
  'Temperature variations during extended testing periods',
  'Parallel paths through connected equipment',
  'Capacitive effects on long cable runs',
];

const inconsistentSolutions = [
  'Ensure good, firm contact at all test points',
  'Repeat tests to confirm readings (minimum 3 times)',
  'Check for and eliminate all parallel paths',
  'Consider environmental factors and note conditions',
  'Allow capacitive charge to stabilise before reading',
];

const beforeTestingSafety = [
  'Complete safe isolation procedure (GS 38)',
  'Prove dead on all conductors with approved voltage indicator',
  'Disconnect all electronic equipment and sensitive devices',
  'Remove or isolate surge protection devices (SPDs)',
  'Warn others that testing is in progress \u2014 barrier tape if needed',
  'Lock off isolation point with personal lock',
];

const duringTestingSafety = [
  'High voltage (up to 1000V DC) present during test \u2014 treat as live working',
  'Ensure no one touches exposed conductors during test',
  'Discharge cables after each test (most testers do this automatically)',
  'Be aware of capacitive effects on long runs (stored energy)',
  'Stop testing immediately if equipment overheats',
  'Never leave tester connected and unattended',
];

const disconnectList = [
  'Electronic ballasts and LED drivers',
  'Dimmer switches and lighting controllers',
  'Computer equipment and smart devices',
  'Electronic timers and programmers',
  'Smart meters and energy monitors',
  'Surge arresters and capacitors',
  'Electronic thermostats',
  'Alarm systems and fire detection panels',
  'Emergency lighting (test separately)',
  'PIR sensors and photocells',
];

const Bullet = ({ text, accent = 'white' }: { text: string; accent?: string }) => (
  <div className="flex gap-2">
    <div className={`w-1 h-1 rounded-full bg-${accent}/60 mt-2 shrink-0`} />
    <p className="text-[13px] text-white leading-relaxed">{text}</p>
  </div>
);

const PracticalGuidanceSection = ({ onBack }: Props) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => setExpanded((prev) => (prev === id ? null : id));

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
            <h1 className="text-base font-semibold text-white">Practical Guide</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
        {/* Equipment Setup */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => toggle('equipment')}
            className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
          >
            <div className={`relative rounded-2xl bg-white/[0.07] border ${expanded === 'equipment' ? 'border-amber-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
              <div className="absolute inset-x-0 top-0 h-[2px] bg-amber-500/50" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/50 rounded-l-2xl" />
              <div className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-amber-400">Equipment Setup</p>
                </div>
                <motion.div animate={{ rotate: expanded === 'equipment' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white shrink-0" />
                </motion.div>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {expanded === 'equipment' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-2 px-1 pb-1 space-y-3">
                  <div className="h-px bg-white/[0.06]" />
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-white mb-2">Equipment Checklist</p>
                    <div className="space-y-2">
                      {equipmentChecklist.map((item, i) => (
                        <Bullet key={i} text={item} accent="amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-white mb-2">Test Sequence</p>
                    <div className="space-y-2">
                      {testSequence.map((item, i) => (
                        <Bullet key={i} text={item} accent="amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Practical Tips */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => toggle('tips')}
            className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
          >
            <div className={`relative rounded-2xl bg-white/[0.07] border ${expanded === 'tips' ? 'border-blue-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
              <div className="absolute inset-x-0 top-0 h-[2px] bg-blue-500/50" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/50 rounded-l-2xl" />
              <div className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-blue-400">Site Tips & Best Practice</p>
                </div>
                <motion.div animate={{ rotate: expanded === 'tips' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white shrink-0" />
                </motion.div>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {expanded === 'tips' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-2 px-1 pb-1 space-y-3">
                  <div className="h-px bg-white/[0.06]" />
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-white mb-2">Practical Tips from the Field</p>
                    <div className="space-y-2">
                      {practicalTips.map((item, i) => (
                        <Bullet key={i} text={item} accent="blue-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Testing Scenarios */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => toggle('techniques')}
            className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
          >
            <div className={`relative rounded-2xl bg-white/[0.07] border ${expanded === 'techniques' ? 'border-amber-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
              <div className="absolute inset-x-0 top-0 h-[2px] bg-amber-500/50" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/50 rounded-l-2xl" />
              <div className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-amber-400">Common Testing Scenarios</p>
                </div>
                <motion.div animate={{ rotate: expanded === 'techniques' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white shrink-0" />
                </motion.div>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {expanded === 'techniques' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-2 px-1 pb-1 space-y-3">
                  <div className="h-px bg-white/[0.06]" />
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-blue-400 mb-2">New Installation</p>
                    <div className="space-y-2">
                      <Bullet text="Expected: > 999M\u03a9 all tests (typically > 200M\u03a9 per circuit)" accent="blue-400" />
                      <Bullet text="Test voltage: 500V DC for standard 230V circuits" accent="blue-400" />
                      <Bullet text="Duration: 1 minute minimum per test" accent="blue-400" />
                      <Bullet text="Action: If < 1M\u03a9, investigate before energising" accent="blue-400" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-blue-400 mb-2">Periodic Inspection</p>
                    <div className="space-y-2">
                      <Bullet text="Expected: > 1M\u03a9 (new) / > 0.5M\u03a9 (existing acceptable)" accent="blue-400" />
                      <Bullet text="Test voltage: 500V DC typical for domestic/commercial" accent="blue-400" />
                      <Bullet text="Compare with previous test results for trending" accent="blue-400" />
                      <Bullet text="Action: Investigate any declining trends between inspections" accent="blue-400" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-blue-400 mb-2">Fault Investigation</p>
                    <div className="space-y-2">
                      <Bullet text="Symptoms: RCD tripping, earth leakage, blown fuses" accent="blue-400" />
                      <Bullet text="Method: Test individual circuits by disconnecting at DB" accent="blue-400" />
                      <Bullet text="Look for: Low or declining readings on specific circuits" accent="blue-400" />
                      <Bullet text="Action: Isolate and repair faulty circuits before re-energising" accent="blue-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Troubleshooting - Reading Too Low */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => toggle('troubleshoot-low')}
            className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
          >
            <div className={`relative rounded-2xl bg-white/[0.07] border ${expanded === 'troubleshoot-low' ? 'border-red-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
              <div className="absolute inset-x-0 top-0 h-[2px] bg-red-500/50" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/50 rounded-l-2xl" />
              <div className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-red-400">Troubleshooting: Reading Too Low</p>
                </div>
                <motion.div animate={{ rotate: expanded === 'troubleshoot-low' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white shrink-0" />
                </motion.div>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {expanded === 'troubleshoot-low' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-2 px-1 pb-1 space-y-3">
                  <div className="h-px bg-white/[0.06]" />
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-white mb-2">Common Causes</p>
                    <div className="space-y-2">
                      {lowReadingCauses.map((item, i) => (
                        <Bullet key={i} text={item} accent="red-400" />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-white mb-2">Solutions</p>
                    <div className="space-y-2">
                      {lowReadingSolutions.map((item, i) => (
                        <Bullet key={i} text={item} accent="green-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Troubleshooting - Inconsistent Readings */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => toggle('troubleshoot-inconsistent')}
            className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
          >
            <div className={`relative rounded-2xl bg-white/[0.07] border ${expanded === 'troubleshoot-inconsistent' ? 'border-amber-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
              <div className="absolute inset-x-0 top-0 h-[2px] bg-amber-500/50" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/50 rounded-l-2xl" />
              <div className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-amber-400">Troubleshooting: Inconsistent Readings</p>
                </div>
                <motion.div animate={{ rotate: expanded === 'troubleshoot-inconsistent' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white shrink-0" />
                </motion.div>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {expanded === 'troubleshoot-inconsistent' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-2 px-1 pb-1 space-y-3">
                  <div className="h-px bg-white/[0.06]" />
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-white mb-2">Possible Causes</p>
                    <div className="space-y-2">
                      {inconsistentCauses.map((item, i) => (
                        <Bullet key={i} text={item} accent="amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-white mb-2">Solutions</p>
                    <div className="space-y-2">
                      {inconsistentSolutions.map((item, i) => (
                        <Bullet key={i} text={item} accent="green-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Safety Considerations */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => toggle('safety')}
            className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
          >
            <div className={`relative rounded-2xl bg-white/[0.07] border ${expanded === 'safety' ? 'border-red-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
              <div className="absolute inset-x-0 top-0 h-[2px] bg-red-500/50" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/50 rounded-l-2xl" />
              <div className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-red-400">Safety Considerations</p>
                </div>
                <motion.div animate={{ rotate: expanded === 'safety' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white shrink-0" />
                </motion.div>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {expanded === 'safety' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-2 px-1 pb-1 space-y-3">
                  <div className="h-px bg-white/[0.06]" />
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-white mb-2">Before Testing</p>
                    <div className="space-y-2">
                      {beforeTestingSafety.map((item, i) => (
                        <Bullet key={i} text={item} accent="red-400" />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-white mb-2">During Testing</p>
                    <div className="space-y-2">
                      {duringTestingSafety.map((item, i) => (
                        <Bullet key={i} text={item} accent="red-400" />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-red-400 mb-2">Equipment That Must Be Disconnected</p>
                    <div className="space-y-2">
                      {disconnectList.map((item, i) => (
                        <Bullet key={i} text={item} accent="red-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PracticalGuidanceSection;
