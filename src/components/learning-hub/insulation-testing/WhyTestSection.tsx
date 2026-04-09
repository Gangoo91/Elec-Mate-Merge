import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const safetyReasons = [
  { heading: 'Prevent Electric Shock', body: 'Ensures electrical conductors are properly insulated to prevent contact with live parts.' },
  { heading: 'Fire Prevention', body: 'Detects deteriorated insulation that could cause arcing and electrical fires.' },
  { heading: 'Equipment Protection', body: 'Identifies insulation breakdown before it damages expensive electrical equipment.' },
  { heading: 'Legal Compliance', body: 'Required by BS 7671 for all new installations and periodic inspections.' },
];

const deteriorationCauses = [
  'Heat from overloaded cables or high ambient temperatures',
  'Moisture ingress from leaks, condensation, or flooding',
  'Chemical exposure in industrial or agricultural environments',
  'Mechanical stress from vibration, movement, or physical damage',
  'UV radiation degradation on cables exposed to sunlight',
  'Ageing — all insulation materials degrade naturally over time',
];

const minimumIRValues = [
  { circuit: 'SELV/PELV circuits', testVoltage: '250V DC', minimum: '0.25M\u03a9' },
  { circuit: 'Up to 500V (inc. 230V)', testVoltage: '500V DC', minimum: '0.5M\u03a9' },
  { circuit: 'Above 500V', testVoltage: '1000V DC', minimum: '1.0M\u03a9' },
];

const failureScenarios = [
  { title: 'Domestic Installation', body: 'Cable damaged by drilling — insulation breakdown leads to RCD tripping and potential electrocution. A common scenario where IR testing during periodic inspection would have identified the fault before it became dangerous.' },
  { title: 'Industrial Environment', body: 'Chemical contamination of cables — gradual insulation deterioration causing equipment failure. In aggressive environments, insulation can degrade rapidly without visible external signs.' },
  { title: 'Damp Conditions', body: 'Moisture ingress in junction boxes — low insulation resistance causing nuisance tripping. Even small amounts of moisture dramatically reduce IR values and can create dangerous leakage paths.' },
  { title: 'Aged Installation', body: '30-year-old PVC cables — insulation becomes brittle and cracks, creating safety hazards. Thermal cycling over decades causes micro-cracks that moisture can penetrate.' },
];

const financialItems = [
  'Equipment replacement costs',
  'Business downtime losses',
  'Emergency repair expenses',
  'Insurance claims and increased premiums',
];

const safetyConsequences = [
  'Electric shock injuries or fatalities',
  'Fire and property damage',
  'Legal liability and prosecution',
  'Regulatory violations and enforcement notices',
];

const Bullet = ({ text, accent = 'white' }: { text: string; accent?: string }) => (
  <div className="flex gap-2">
    <div className={`w-1 h-1 rounded-full bg-${accent}/60 mt-2 shrink-0`} />
    <p className="text-[13px] text-white leading-relaxed">{text}</p>
  </div>
);

const WhyTestSection = ({ onBack }: Props) => {
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
            <h1 className="text-base font-semibold text-white">Why Test IR?</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
        {/* Safety Reasons */}
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
                  <p className="text-[15px] font-bold text-red-400">Critical Safety Protection</p>
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
                  {safetyReasons.map((item, i) => (
                    <div key={i} className="rounded-xl bg-white/[0.05] p-3">
                      <p className="text-[13px] font-semibold text-white">{item.heading}</p>
                      <p className="text-[13px] text-white mt-1 leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Insulation Deterioration */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => toggle('deterioration')}
            className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
          >
            <div className={`relative rounded-2xl bg-white/[0.07] border ${expanded === 'deterioration' ? 'border-orange-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
              <div className="absolute inset-x-0 top-0 h-[2px] bg-orange-500/50" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500/50 rounded-l-2xl" />
              <div className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-orange-400">Why Insulation Deteriorates</p>
                </div>
                <motion.div animate={{ rotate: expanded === 'deterioration' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white shrink-0" />
                </motion.div>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {expanded === 'deterioration' && (
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
                    <p className="text-[13px] font-semibold text-white mb-2">Common Causes of Deterioration</p>
                    <div className="space-y-2">
                      {deteriorationCauses.map((item, i) => (
                        <Bullet key={i} text={item} accent="orange-400" />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-white mb-1">Key Point</p>
                    <p className="text-[13px] text-white leading-relaxed">
                      Insulation deterioration is often invisible from the outside. A cable can look perfectly fine externally while its insulation resistance has dropped to dangerous levels. This is why regular IR testing is essential — it reveals hidden faults before they cause harm.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* BS 7671 Minimum Values */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => toggle('bs-values')}
            className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
          >
            <div className={`relative rounded-2xl bg-white/[0.07] border ${expanded === 'bs-values' ? 'border-emerald-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
              <div className="absolute inset-x-0 top-0 h-[2px] bg-emerald-500/50" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/50 rounded-l-2xl" />
              <div className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-emerald-400">BS 7671 Minimum IR Values</p>
                </div>
                <motion.div animate={{ rotate: expanded === 'bs-values' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white shrink-0" />
                </motion.div>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {expanded === 'bs-values' && (
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
                          <th className="px-3 py-2.5 text-left text-[11px] font-medium text-white uppercase tracking-wider">Circuit</th>
                          <th className="px-3 py-2.5 text-left text-[11px] font-medium text-white uppercase tracking-wider">Test V</th>
                          <th className="px-3 py-2.5 text-left text-[11px] font-medium text-white uppercase tracking-wider">Min IR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        {minimumIRValues.map((row, i) => (
                          <tr key={i}>
                            <td className="px-3 py-2.5 text-white">{row.circuit}</td>
                            <td className="px-3 py-2.5 text-white">{row.testVoltage}</td>
                            <td className="px-3 py-2.5 text-white font-semibold">{row.minimum}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-white mb-2">Test Voltage Selection</p>
                    <div className="space-y-2">
                      <Bullet text="250V DC for SELV/PELV circuits (up to 50V)" accent="emerald-400" />
                      <Bullet text="500V DC for circuits up to 500V (most domestic/commercial)" accent="emerald-400" />
                      <Bullet text="1000V DC for circuits above 500V (industrial HV)" accent="emerald-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Real-World Failure Scenarios */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-amber-400 uppercase tracking-wider px-0.5 mb-2 mt-4">Real-World Failure Scenarios</p>
        </motion.div>
        {failureScenarios.map((scenario, i) => {
          const isOpen = expanded === `scenario-${i}`;
          return (
            <motion.div key={i} variants={itemVariants}>
              <button
                type="button"
                onClick={() => toggle(`scenario-${i}`)}
                className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
              >
                <div className={`relative rounded-2xl bg-white/[0.07] border ${isOpen ? 'border-amber-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/50 rounded-l-2xl" />
                  <div className="p-4 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-white">{scenario.title}</p>
                    </div>
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
                    <div className="pt-2 px-1 pb-1">
                      <div className="h-px bg-white/[0.06] mb-3" />
                      <div className="rounded-xl bg-white/[0.05] p-3">
                        <p className="text-[13px] text-white leading-relaxed">{scenario.body}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Cost of Poor Insulation */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => toggle('cost')}
            className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
          >
            <div className={`relative rounded-2xl bg-white/[0.07] border ${expanded === 'cost' ? 'border-red-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
              <div className="absolute inset-x-0 top-0 h-[2px] bg-red-500/50" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/50 rounded-l-2xl" />
              <div className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-red-400">Cost of Poor Insulation</p>
                </div>
                <motion.div animate={{ rotate: expanded === 'cost' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white shrink-0" />
                </motion.div>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {expanded === 'cost' && (
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
                    <p className="text-[13px] font-semibold text-white mb-2">Financial Impact</p>
                    <div className="space-y-2">
                      {financialItems.map((item, i) => (
                        <Bullet key={i} text={item} accent="red-400" />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-white mb-2">Safety Consequences</p>
                    <div className="space-y-2">
                      {safetyConsequences.map((item, i) => (
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

export default WhyTestSection;
