import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const minimumValues = [
  { circuit: 'SELV/PELV (\u226450V)', test: '250V DC', min: '0.25 M\u03a9' },
  { circuit: 'Up to 500V (inc. 230V)', test: '500V DC', min: '0.5 M\u03a9' },
  { circuit: 'Above 500V', test: '1000V DC', min: '1.0 M\u03a9' },
];

const testDurations = [
  { type: 'Standard Test', duration: '1 minute' },
  { type: 'Periodic Test', duration: '1 minute' },
  { type: 'Initial Verification', duration: '1 minute' },
  { type: 'Fault Investigation', duration: 'As required' },
];

const correctionFactors = [
  { temp: '0', factor: '4.438' },
  { temp: '5', factor: '2.105' },
  { temp: '10', factor: '1.403' },
  { temp: '15', factor: '1.184' },
  { temp: '20', factor: '1.000' },
  { temp: '25', factor: '0.847' },
  { temp: '30', factor: '0.718' },
  { temp: '35', factor: '0.609' },
  { temp: '40', factor: '0.516' },
];

const typicalNewItems = [
  'New PVC cables: > 999M\u03a9',
  'XLPE cables: > 999M\u03a9',
  'Rubber cables: 100\u2013999M\u03a9',
  'MICC cables: > 999M\u03a9',
];

const typicalAgedItems = [
  '10\u201320 years: 10\u2013100M\u03a9',
  '20\u201330 years: 2\u201350M\u03a9',
  '30+ years: 1\u201310M\u03a9',
  'Damp conditions: 0.5\u20135M\u03a9',
];

const problemItems = [
  '< 1.0M\u03a9 on a new installation',
  '< 0.5M\u03a9 on an existing installation',
  'Rapidly declining readings over time',
  'Inconsistent phase-to-phase readings',
];

const benchmarkItems = [
  { label: 'New installation typical', value: '> 200M\u03a9', colour: 'text-green-400' },
  { label: 'Aged installation acceptable', value: '> 2M\u03a9', colour: 'text-amber-400' },
  { label: 'Investigate below', value: '< 1M\u03a9', colour: 'text-red-400' },
];

const environmentalTempItems = [
  'Cold weather increases resistance readings (flattering result)',
  'Hot weather decreases resistance readings (harsher result)',
  'Correction needed when test temperature \u2260 20\u00b0C',
  'Seasonal variation can be 10:1 ratio winter to summer',
  'Thermal cycling over years affects cable ageing rate',
];

const environmentalHumidityItems = [
  'High humidity reduces surface resistance',
  'Condensation can cause very low readings',
  'Dirt and dust create conductive paths',
  'Salt contamination is particularly problematic',
  'Chemical exposure degrades insulation materials',
];

const beforeTestingItems = [
  'Allow cables to reach ambient temperature',
  'Clean terminations and connections',
  'Check for visible moisture or contamination',
];

const duringTestingItems = [
  'Record ambient temperature',
  'Note humidity conditions',
  'Apply test voltage for full 1 minute duration',
];

const afterTestingItems = [
  'Apply temperature correction if not at 20\u00b0C',
  'Consider environmental factors in assessment',
  'Document any unusual conditions',
];

const Bullet = ({ text, accent = 'white' }: { text: string; accent?: string }) => (
  <div className="flex gap-2">
    <div className={`w-1 h-1 rounded-full bg-${accent}/60 mt-2 shrink-0`} />
    <p className="text-[13px] text-white leading-relaxed">{text}</p>
  </div>
);

const InsulationTablesSection = ({ onBack }: Props) => {
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
            <h1 className="text-base font-semibold text-white">IR Values & Tables</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
        {/* BS 7671 Minimum Values */}
        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl bg-white/[0.07] border border-white/[0.08] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-emerald-500/50" />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/50 rounded-l-2xl" />
            <div className="p-4">
              <p className="text-[15px] font-bold text-emerald-400 mb-3">BS 7671 Minimum Insulation Resistance (Table 61)</p>
              <div className="rounded-xl bg-white/[0.05] overflow-hidden">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      <th className="px-3 py-2.5 text-left text-[11px] font-medium text-white uppercase tracking-wider">Circuit Voltage</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-medium text-white uppercase tracking-wider">Test Voltage</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-medium text-white uppercase tracking-wider">Min IR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {minimumValues.map((row, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2.5 text-white">{row.circuit}</td>
                        <td className="px-3 py-2.5 text-white">{row.test}</td>
                        <td className="px-3 py-2.5 text-white font-semibold">{row.min}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 rounded-xl bg-white/[0.05] overflow-hidden">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      <th className="px-3 py-2.5 text-left text-[11px] font-medium text-white uppercase tracking-wider">Test Type</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-medium text-white uppercase tracking-wider">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {testDurations.map((row, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2.5 text-white">{row.type}</td>
                        <td className="px-3 py-2.5 text-white">{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-amber-400 font-medium mt-3">Note: Reading must be stable for final 15 seconds</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Benchmarks */}
        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl bg-white/[0.07] border border-white/[0.08] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-emerald-500/50" />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/50 rounded-l-2xl" />
            <div className="p-4">
              <p className="text-[15px] font-bold text-emerald-400 mb-3">Quick Benchmarks</p>
              <div className="rounded-xl bg-white/[0.05] overflow-hidden">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      <th className="px-3 py-2.5 text-left text-[11px] font-medium text-white uppercase tracking-wider">Condition</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-medium text-white uppercase tracking-wider">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {benchmarkItems.map((row, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2.5 text-white">{row.label}</td>
                        <td className={`px-3 py-2.5 font-semibold ${row.colour}`}>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Temperature Correction Factors */}
        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl bg-white/[0.07] border border-white/[0.08] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-emerald-500/50" />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/50 rounded-l-2xl" />
            <div className="p-4">
              <p className="text-[15px] font-bold text-emerald-400 mb-3">Temperature Correction Factors</p>
              <div className="rounded-xl bg-white/[0.05] overflow-hidden">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      <th className="px-3 py-2.5 text-left text-[11px] font-medium text-white uppercase tracking-wider">Temperature (\u00b0C)</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-medium text-white uppercase tracking-wider">Correction Factor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {correctionFactors.map((row, i) => (
                      <tr key={i} className={row.temp === '20' ? 'bg-emerald-500/10' : ''}>
                        <td className={`px-3 py-2.5 text-white ${row.temp === '20' ? 'font-semibold' : ''}`}>{row.temp}\u00b0C</td>
                        <td className={`px-3 py-2.5 text-white ${row.temp === '20' ? 'font-semibold' : ''}`}>{row.factor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 rounded-xl bg-white/[0.05] p-3 space-y-3">
                <div>
                  <p className="text-[13px] font-semibold text-white mb-1">Correction Formula</p>
                  <p className="text-[13px] font-mono text-emerald-400">R&#x2082;&#x2080; = R_measured \u00d7 1.07^(20\u2013T)</p>
                </div>
                <div className="h-px bg-white/[0.06]" />
                <div className="space-y-2">
                  <Bullet text="R\u2082\u2080 = Resistance corrected to 20\u00b0C" accent="emerald-400" />
                  <Bullet text="R_measured = Actual measured resistance" accent="emerald-400" />
                  <Bullet text="T = Temperature during test (\u00b0C)" accent="emerald-400" />
                  <Bullet text="1.07 = Temperature coefficient for typical insulation" accent="emerald-400" />
                </div>
                <p className="text-[11px] text-amber-400 font-medium">Example: 500M\u03a9 at 5\u00b0C = 500 \u00d7 0.475 = 238M\u03a9 at 20\u00b0C</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Typical Values */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider px-0.5 mb-2">Typical Insulation Resistance Values</p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3">
          {/* New Installations */}
          <div className="relative rounded-2xl bg-white/[0.07] border border-white/[0.08] overflow-hidden p-4">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500/50 rounded-l-2xl" />
            <p className="text-[13px] font-semibold text-green-400 mb-2">New Installations</p>
            <div className="space-y-2">
              {typicalNewItems.map((item, i) => (
                <Bullet key={i} text={item} accent="green-400" />
              ))}
            </div>
            <p className="text-[11px] text-green-400 font-medium mt-2">Typical new install: {'>'} 200M\u03a9 per circuit</p>
          </div>

          {/* Aged Installations */}
          <div className="relative rounded-2xl bg-white/[0.07] border border-white/[0.08] overflow-hidden p-4">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/50 rounded-l-2xl" />
            <p className="text-[13px] font-semibold text-amber-400 mb-2">Aged Installations</p>
            <div className="space-y-2">
              {typicalAgedItems.map((item, i) => (
                <Bullet key={i} text={item} accent="amber-400" />
              ))}
            </div>
            <p className="text-[11px] text-amber-400 font-medium mt-2">Acceptable if {'>'} 2M\u03a9 with stable readings</p>
          </div>

          {/* Problem Indicators */}
          <div className="relative rounded-2xl bg-white/[0.07] border border-white/[0.08] overflow-hidden p-4">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/50 rounded-l-2xl" />
            <p className="text-[13px] font-semibold text-red-400 mb-2">Problem Indicators</p>
            <div className="space-y-2">
              {problemItems.map((item, i) => (
                <Bullet key={i} text={item} accent="red-400" />
              ))}
            </div>
            <p className="text-[11px] text-red-400 font-medium mt-2">Investigate any reading below 1M\u03a9</p>
          </div>
        </motion.div>

        {/* Environmental Factors */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => toggle('environmental')}
            className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
          >
            <div className={`relative rounded-2xl bg-white/[0.07] border ${expanded === 'environmental' ? 'border-amber-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
              <div className="absolute inset-x-0 top-0 h-[2px] bg-amber-500/50" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/50 rounded-l-2xl" />
              <div className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-amber-400">Environmental Factors Affecting Results</p>
                </div>
                <motion.div animate={{ rotate: expanded === 'environmental' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white shrink-0" />
                </motion.div>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {expanded === 'environmental' && (
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
                    <p className="text-[13px] font-semibold text-amber-400 mb-2">Temperature Effects</p>
                    <div className="space-y-2">
                      {environmentalTempItems.map((item, i) => (
                        <Bullet key={i} text={item} accent="amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.05] p-3">
                    <p className="text-[13px] font-semibold text-amber-400 mb-2">Humidity & Contamination</p>
                    <div className="space-y-2">
                      {environmentalHumidityItems.map((item, i) => (
                        <Bullet key={i} text={item} accent="amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.05] p-3 space-y-3">
                    <p className="text-[13px] font-semibold text-red-400">Test Conditions Best Practice</p>
                    <div>
                      <p className="text-[13px] font-semibold text-white mb-1.5">Before Testing</p>
                      <div className="space-y-2">
                        {beforeTestingItems.map((item, i) => (
                          <Bullet key={i} text={item} accent="white" />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white mb-1.5">During Testing</p>
                      <div className="space-y-2">
                        {duringTestingItems.map((item, i) => (
                          <Bullet key={i} text={item} accent="white" />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white mb-1.5">After Testing</p>
                      <div className="space-y-2">
                        {afterTestingItems.map((item, i) => (
                          <Bullet key={i} text={item} accent="white" />
                        ))}
                      </div>
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

export default InsulationTablesSection;
