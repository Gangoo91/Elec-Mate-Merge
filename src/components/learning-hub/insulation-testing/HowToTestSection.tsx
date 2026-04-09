import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const equipmentWarningItems = [
  'SPDs (Surge Protection Devices) — disconnect or remove',
  'Electronic dimmers and lighting controllers',
  'LED drivers and control gear',
  'PIR sensors and photocell switches',
  'RCDs — can be bridged out during testing',
  'Smart home devices and IoT equipment',
  'Computers, TVs, and all electronic appliances',
  'Electronic timers and programmers',
  'Alarm systems and fire detection panels',
  'Smart meters and energy monitors',
];

const procedureSteps = [
  { title: 'Safe Isolation', description: 'Complete full safe isolation procedure and prove dead on all conductors using a voltage indicator tested before and after.' },
  { title: 'Disconnect Loads', description: 'Remove all connected equipment, lamps, electronic devices. Switch off all MCBs/RCBOs.' },
  { title: 'Isolate Sensitive Equipment', description: 'Disconnect SPDs, capacitors, electronic dimmers, LED drivers, PIR sensors, and any equipment that could be damaged by the DC test voltage.' },
  { title: 'Test Voltage Selection', description: 'Choose appropriate DC test voltage: 250V for SELV, 500V for up to 500V circuits, 1000V for above 500V.' },
  { title: 'Test L-E First', description: 'Test Live to Earth first (same order as prove dead). Apply test voltage for at least 1 minute for accurate reading.' },
  { title: 'Test N-E', description: 'Test Neutral to Earth. Apply test voltage for at least 1 minute. Note the reading.' },
  { title: 'Test L-N', description: 'Test Live to Neutral. Apply test voltage for at least 1 minute. This completes the three-test sequence.' },
  { title: 'Record Results', description: 'Record the lowest reading obtained from all tests. Apply temperature correction if ambient is not 20\u00b0C. Discharge cables after each test.' },
];

const voltageGuide = [
  { voltage: '250V DC', circuits: 'SELV/PELV circuits', range: 'Up to 50V nominal', note: 'Telecommunications, ELV systems', colour: 'blue' },
  { voltage: '500V DC', circuits: 'LV installations', range: '50V to 500V', note: 'Most common — domestic & commercial 230V', colour: 'green' },
  { voltage: '1000V DC', circuits: 'HV installations', range: '500V to 1000V', note: 'Industrial systems, 3-phase 660V', colour: 'orange' },
];

const testSequencePoints = [
  'L-E first (Line to Earth) — detects insulation faults to earth',
  'N-E second (Neutral to Earth) — detects neutral insulation faults',
  'L-N last (Line to Neutral) — detects conductor-to-conductor faults',
  'This follows the same order as the prove-dead sequence',
  'Apply test voltage for at least 1 minute for each test',
  'Reading must be stable for the final 15 seconds',
  'Always record the lowest reading obtained',
];

const Bullet = ({ text, accent = 'white' }: { text: string; accent?: string }) => (
  <div className="flex gap-2">
    <div className={`w-1 h-1 rounded-full bg-${accent}/60 mt-2 shrink-0`} />
    <p className="text-[13px] text-white leading-relaxed">{text}</p>
  </div>
);

const HowToTestSection = ({ onBack }: Props) => {
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
            <h1 className="text-base font-semibold text-white">How to Test</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
        {/* Equipment Protection Warning - always visible */}
        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl bg-white/[0.07] border border-red-500/20 p-4 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-red-500/50" />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/50 rounded-l-2xl" />
            <p className="text-[15px] font-bold text-red-400">CRITICAL: Equipment Protection Warning</p>
            <p className="text-[13px] text-white mt-1 leading-relaxed">
              The following MUST be disconnected before insulation testing or they WILL be destroyed by the DC test voltage:
            </p>
            <div className="mt-3 space-y-2">
              {equipmentWarningItems.map((item, i) => (
                <Bullet key={i} text={item} accent="red-400" />
              ))}
            </div>
            <p className="text-[13px] text-red-400 font-medium mt-3 leading-relaxed">
              Failure to disconnect these items will result in expensive equipment damage!
            </p>
          </div>
        </motion.div>

        {/* Testing Procedure */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => toggle('procedure')}
            className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
          >
            <div className={`relative rounded-2xl bg-white/[0.07] border ${expanded === 'procedure' ? 'border-blue-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
              <div className="absolute inset-x-0 top-0 h-[2px] bg-blue-500/50" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/50 rounded-l-2xl" />
              <div className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-blue-400">Complete Testing Procedure</p>
                </div>
                <motion.div animate={{ rotate: expanded === 'procedure' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white shrink-0" />
                </motion.div>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {expanded === 'procedure' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-2 px-1 pb-1 space-y-3">
                  <div className="h-px bg-white/[0.06]" />
                  {procedureSteps.map((step, i) => (
                    <div key={i} className="rounded-xl bg-white/[0.05] p-3 flex gap-3">
                      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-white">{step.title}</p>
                        <p className="text-[13px] text-white mt-0.5 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Test Sequence */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => toggle('sequence')}
            className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
          >
            <div className={`relative rounded-2xl bg-white/[0.07] border ${expanded === 'sequence' ? 'border-cyan-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
              <div className="absolute inset-x-0 top-0 h-[2px] bg-cyan-500/50" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500/50 rounded-l-2xl" />
              <div className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-cyan-400">Test Sequence: L-E, N-E, L-N</p>
                </div>
                <motion.div animate={{ rotate: expanded === 'sequence' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white shrink-0" />
                </motion.div>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {expanded === 'sequence' && (
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
                    <p className="text-[13px] font-semibold text-white mb-2">Correct Test Order</p>
                    <div className="space-y-2">
                      {testSequencePoints.map((point, i) => (
                        <Bullet key={i} text={point} accent="cyan-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Test Voltage Selection Guide */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => toggle('voltage')}
            className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
          >
            <div className={`relative rounded-2xl bg-white/[0.07] border ${expanded === 'voltage' ? 'border-blue-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
              <div className="absolute inset-x-0 top-0 h-[2px] bg-blue-500/50" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/50 rounded-l-2xl" />
              <div className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-blue-400">Test Voltage Selection Guide</p>
                </div>
                <motion.div animate={{ rotate: expanded === 'voltage' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white shrink-0" />
                </motion.div>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {expanded === 'voltage' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-2 px-1 pb-1 space-y-3">
                  <div className="h-px bg-white/[0.06]" />
                  <div className="rounded-xl bg-white/[0.05] overflow-hidden">
                    <table className="w-full text-[13px]">
                      <thead>
                        <tr className="border-b border-white/[0.08]">
                          <th className="px-3 py-2.5 text-left text-[11px] font-medium text-white uppercase tracking-wider">Test V</th>
                          <th className="px-3 py-2.5 text-left text-[11px] font-medium text-white uppercase tracking-wider">Circuits</th>
                          <th className="px-3 py-2.5 text-left text-[11px] font-medium text-white uppercase tracking-wider">Range</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        {voltageGuide.map((v, i) => (
                          <tr key={i}>
                            <td className="px-3 py-2.5 text-white font-semibold">{v.voltage}</td>
                            <td className="px-3 py-2.5 text-white">{v.circuits}</td>
                            <td className="px-3 py-2.5 text-white">{v.range}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {voltageGuide.map((v, i) => {
                    const colourMap: Record<string, string> = { blue: 'text-blue-400', green: 'text-green-400', orange: 'text-orange-400' };
                    return (
                      <div key={i} className="rounded-xl bg-white/[0.05] p-3">
                        <p className={`text-[13px] font-semibold ${colourMap[v.colour]} mb-1`}>{v.voltage}</p>
                        <p className="text-[13px] text-white leading-relaxed">{v.note}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowToTestSection;
