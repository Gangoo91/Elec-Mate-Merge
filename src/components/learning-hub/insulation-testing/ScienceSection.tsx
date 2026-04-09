import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const physicsConcepts = [
  {
    id: 'ohms',
    title: "Ohm's Law Application",
    body: 'R = V / I \u2014 Higher voltage reveals insulation weaknesses through increased stress. The insulation resistance tester applies a known DC voltage and measures the tiny leakage current flowing through the insulation. From this, it calculates the resistance.',
    details: [
      'Leakage current through insulation = Applied Voltage / Insulation Resistance',
      'Example: 500V applied, 1\u00b5A leakage = 500M\u03a9 insulation resistance',
      'Example: 500V applied, 1mA leakage = 0.5M\u03a9 (failing insulation)',
      'The higher the IR value, the better the insulation condition',
    ],
  },
  {
    id: 'dielectric',
    title: 'Dielectric Strength',
    body: 'Insulation materials break down when the electric field exceeds their dielectric strength. Different insulation materials (PVC, XLPE, rubber, mineral) have different dielectric strengths measured in kV/mm.',
    details: [
      'PVC: typically 12\u201350 kV/mm depending on grade',
      'XLPE: typically 20\u201370 kV/mm (better than PVC)',
      'Mineral insulation (MICC): extremely high dielectric strength',
      'Dielectric strength reduces with age, temperature, and contamination',
    ],
  },
  {
    id: 'leakage',
    title: 'Leakage Current',
    body: 'Even good insulation allows tiny current flow \u2014 we measure this to assess condition. No insulation is perfect; there is always some leakage. The IR test quantifies this leakage to determine if it is within acceptable limits.',
    details: [
      'Leakage current = Applied Voltage / Insulation Resistance',
      'Good insulation (200M\u03a9): 500V / 200M\u03a9 = 2.5\u00b5A leakage',
      'Poor insulation (0.5M\u03a9): 500V / 0.5M\u03a9 = 1mA leakage',
      'RCDs detect earth leakage current \u2014 poor IR causes nuisance tripping',
    ],
  },
  {
    id: 'dc-testing',
    title: 'Why DC Not AC?',
    body: 'The test applies DC voltage because AC would be affected by cable capacitance. If AC were used, the capacitive reactance of the cable would draw current that has nothing to do with insulation quality, giving false readings.',
    details: [
      'Cable capacitance creates a charging current under AC \u2014 masking true IR',
      'DC eliminates capacitive effects after initial charge period',
      'DC gives a true measure of resistive leakage through the insulation',
      'The initial capacitive charge is why we wait for readings to stabilise',
    ],
  },
  {
    id: 'temperature',
    title: 'Temperature Coefficient',
    body: 'Insulation resistance decreases with temperature \u2014 roughly halving every 10\u00b0C rise. This is because higher temperatures increase the mobility of charge carriers within the insulation material.',
    details: [
      'IR approximately halves for every 10\u00b0C increase in temperature',
      'A cable showing 100M\u03a9 at 10\u00b0C may only show 25M\u03a9 at 30\u00b0C',
      'This is why BS 7671 specifies correction to 20\u00b0C reference',
      'Formula: R\u2082\u2080 = R_measured \u00d7 1.07^(20\u2013T)',
    ],
  },
  {
    id: 'moisture',
    title: 'Moisture & Insulation',
    body: 'Moisture is the biggest enemy of insulation \u2014 even small amounts dramatically reduce IR. Water is a conductor compared to insulation materials, so any moisture path through insulation creates a low-resistance leakage route.',
    details: [
      'Pure water has a resistivity of ~18M\u03a9\u00b7cm, but tap water is much lower',
      'Surface moisture creates conductive films across terminations',
      'Moisture absorbed into insulation material reduces bulk resistance',
      'Dew point condensation inside enclosures is a common hidden cause',
      'Always note weather conditions when recording IR test results',
    ],
  },
];

const temperaturePoints = [
  { heading: 'Consistent Standards', body: 'BS 7671 specifies minimum values at 20\u00b0C reference temperature so results are comparable regardless of when testing is done.' },
  { heading: 'Fair Assessment', body: 'Cables tested in winter (cold) naturally show higher resistance. Without correction, a marginally failing cable could appear to pass in cold weather.' },
  { heading: 'Accurate Diagnosis', body: 'Temperature correction reveals the true insulation condition, removing the variable of ambient temperature from the assessment.' },
  { heading: 'Trending Analysis', body: 'Corrected values allow comparison of test results taken at different times, seasons, and temperatures \u2014 essential for identifying deterioration.' },
];

const Bullet = ({ text, accent = 'white' }: { text: string; accent?: string }) => (
  <div className="flex gap-2">
    <div className={`w-1 h-1 rounded-full bg-${accent}/60 mt-2 shrink-0`} />
    <p className="text-[13px] text-white leading-relaxed">{text}</p>
  </div>
);

const ScienceSection = ({ onBack }: Props) => {
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
            <h1 className="text-base font-semibold text-white">The Science</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
        {/* Physics concepts */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-purple-400 uppercase tracking-wider px-0.5 mb-2">Physics of Insulation Testing</p>
        </motion.div>

        {physicsConcepts.map((concept) => {
          const isOpen = expanded === concept.id;
          return (
            <motion.div key={concept.id} variants={itemVariants}>
              <button
                type="button"
                onClick={() => toggle(concept.id)}
                className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
              >
                <div className={`relative rounded-2xl bg-white/[0.07] border ${isOpen ? 'border-purple-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-purple-500/50" />
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500/50 rounded-l-2xl" />
                  <div className="p-4 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-bold text-purple-400">{concept.title}</p>
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
                    <div className="pt-2 px-1 pb-1 space-y-3">
                      <div className="h-px bg-white/[0.06]" />
                      <div className="rounded-xl bg-white/[0.05] p-3">
                        <p className="text-[13px] text-white leading-relaxed">{concept.body}</p>
                      </div>
                      {concept.details && (
                        <div className="rounded-xl bg-white/[0.05] p-3">
                          <p className="text-[13px] font-semibold text-white mb-2">Key Points</p>
                          <div className="space-y-2">
                            {concept.details.map((detail, i) => (
                              <Bullet key={i} text={detail} accent="purple-400" />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Temperature Correction */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => toggle('temp-correction')}
            className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
          >
            <div className={`relative rounded-2xl bg-white/[0.07] border ${expanded === 'temp-correction' ? 'border-green-500/20' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
              <div className="absolute inset-x-0 top-0 h-[2px] bg-green-500/50" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500/50 rounded-l-2xl" />
              <div className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-green-400">Why Temperature Correction Matters</p>
                </div>
                <motion.div animate={{ rotate: expanded === 'temp-correction' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white shrink-0" />
                </motion.div>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {expanded === 'temp-correction' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-2 px-1 pb-1 space-y-3">
                  <div className="h-px bg-white/[0.06]" />
                  {temperaturePoints.map((point, i) => (
                    <div key={i} className="rounded-xl bg-white/[0.05] p-3">
                      <p className="text-[13px] font-semibold text-white">{point.heading}</p>
                      <p className="text-[13px] text-white mt-0.5 leading-relaxed">{point.body}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScienceSection;
