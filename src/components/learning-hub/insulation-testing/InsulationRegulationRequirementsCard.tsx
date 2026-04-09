import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const regulations = [
  {
    id: 'reg-612',
    title: 'Regulation 612.3 \u2014 Insulation Resistance Testing',
    accent: 'cyan',
    content: [
      {
        heading: '612.3.1 \u2014 Test Requirements',
        items: [
          'Test voltage shall be DC (not AC \u2014 to avoid capacitive effects)',
          'Test voltage selection based on circuit nominal voltage',
          'SELV/PELV circuits: 250V DC, minimum 0.25M\u03a9',
          'Circuits up to 500V (inc. 230V): 500V DC, minimum 0.5M\u03a9',
          'Circuits above 500V: 1000V DC, minimum 1.0M\u03a9',
        ],
      },
      {
        heading: '612.3.2 \u2014 Test Procedure',
        items: [
          'All equipment and accessories must be disconnected',
          'Surge protective devices (SPDs) must be isolated',
          'Test between all live conductors and earth (L-E and N-E)',
          'Test between live conductors (L-N)',
          'Apply test voltage for minimum 1 minute',
          'Reading must be stable for the final 15 seconds',
          'Results must meet minimum values per Table 61 of BS 7671',
        ],
      },
    ],
  },
  {
    id: 'reg-134',
    title: 'Regulation 134.1.1 \u2014 Protection Against Electric Shock',
    accent: 'blue',
    content: [
      {
        heading: 'Basic Protection Requirements',
        items: [
          'Insulation of live parts is essential for basic protection',
          'Insulation must be suitable for the circuit voltage',
          'Minimum insulation resistance values must be maintained throughout the life of the installation',
          'Regular testing ensures continued protection against electric shock',
          'Deterioration must be identified and remedied promptly',
        ],
      },
      {
        heading: 'Environmental Considerations',
        items: [
          'Insulation must be suitable for the installation environment',
          'Temperature rating must be adequate for the application',
          'Moisture resistance required where damp conditions exist',
          'Chemical resistance needed in industrial environments',
          'UV resistance essential for outdoor cable installations',
        ],
      },
    ],
  },
  {
    id: 'reg-651',
    title: 'Regulation 651.4 \u2014 Periodic Inspection and Testing',
    accent: 'green',
    content: [
      {
        heading: 'Periodic Testing Requirements',
        items: [
          'Insulation resistance testing is mandatory at every periodic inspection',
          'Test intervals depend on installation type and environment',
          'Domestic: 10 years maximum interval (5 years recommended for change of occupancy)',
          'Commercial: 5 years maximum interval',
          'Industrial: 3 years maximum interval',
          'Special locations (swimming pools, construction sites): more frequent testing required',
        ],
      },
      {
        heading: 'Acceptable Values for Existing Installations',
        items: [
          'Minimum 1.0M\u03a9 preferred for all installations',
          '0.5M\u03a9 acceptable for existing installations (not new)',
          'Values below 0.5M\u03a9 require urgent investigation',
          'Trending analysis is important \u2014 compare with previous results',
          'Significant deterioration between inspections requires remedial action',
          'Environmental factors must be considered when assessing results',
        ],
      },
    ],
  },
  {
    id: 'reg-421',
    title: 'Regulation 421.1.201 \u2014 RCD Protection',
    accent: 'orange',
    content: [
      {
        heading: 'Insulation and RCD Relationship',
        items: [
          'Poor insulation is the most common cause of RCD nuisance tripping',
          'Earth leakage current increases proportionally with deteriorating insulation',
          '30mA RCD trips at 15\u201330mA leakage current (50\u2013100% of rated)',
          'Multiple circuits with poor insulation compound the leakage problem',
          'Good insulation resistance is essential for reliable RCD operation',
        ],
      },
      {
        heading: 'Acceptable Earth Leakage',
        items: [
          'Total standing earth leakage should be less than 9mA per RCD',
          'Individual circuit leakage should be less than 3mA recommended',
          'High insulation resistance = low earth leakage = reliable RCD operation',
          'Regular IR testing prevents unexpected RCD tripping problems',
          'Poor insulation identification prevents costly power outages',
        ],
      },
    ],
  },
  {
    id: 'reg-compliance',
    title: 'Critical Compliance Summary',
    accent: 'red',
    content: [
      {
        heading: 'Testing Compliance',
        items: [
          'Correct test voltage selection per Table 61',
          'Minimum 1 minute test duration with stable final reading',
          'All equipment and SPDs properly disconnected before testing',
          'Temperature correction applied when ambient is not 20\u00b0C',
          'Results properly documented on Schedule of Test Results',
        ],
      },
      {
        heading: 'Value Compliance',
        items: [
          'New installations: must meet or exceed minimum values in Table 61',
          'SELV/PELV: \u2265 0.25M\u03a9 at 250V DC',
          'Up to 500V: \u2265 0.5M\u03a9 at 500V DC',
          'Above 500V: \u2265 1.0M\u03a9 at 1000V DC',
          'Existing installations: \u2265 0.5M\u03a9 acceptable',
          'Trend analysis essential for identifying deterioration',
        ],
      },
      {
        heading: 'Documentation Requirements',
        items: [
          'Electrical Installation Certificate (EIC) for new work',
          'Schedule of Test Results \u2014 all IR values recorded',
          'Electrical Installation Condition Report (EICR) for periodic',
          'Test conditions recorded (temperature, humidity, date)',
          'Non-compliance observations documented with coding (C1/C2/C3/FI)',
        ],
      },
    ],
  },
];

const accentMap: Record<string, { bar: string; heading: string; border: string; bullet: string }> = {
  cyan: { bar: 'bg-cyan-500/50', heading: 'text-cyan-400', border: 'border-cyan-500/20', bullet: 'cyan-400' },
  blue: { bar: 'bg-blue-500/50', heading: 'text-blue-400', border: 'border-blue-500/20', bullet: 'blue-400' },
  green: { bar: 'bg-green-500/50', heading: 'text-green-400', border: 'border-green-500/20', bullet: 'green-400' },
  orange: { bar: 'bg-orange-500/50', heading: 'text-orange-400', border: 'border-orange-500/20', bullet: 'orange-400' },
  red: { bar: 'bg-red-500/50', heading: 'text-red-400', border: 'border-red-500/20', bullet: 'red-400' },
};

const Bullet = ({ text, accent = 'white' }: { text: string; accent?: string }) => (
  <div className="flex gap-2">
    <div className={`w-1 h-1 rounded-full bg-${accent}/60 mt-2 shrink-0`} />
    <p className="text-[13px] text-white leading-relaxed">{text}</p>
  </div>
);

const InsulationRegulationRequirementsCard = ({ onBack }: Props) => {
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
            <h1 className="text-base font-semibold text-white">Regulations</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
        {regulations.map((reg) => {
          const isOpen = expanded === reg.id;
          const colours = accentMap[reg.accent];
          return (
            <motion.div key={reg.id} variants={itemVariants}>
              <button
                type="button"
                onClick={() => toggle(reg.id)}
                className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
              >
                <div className={`relative rounded-2xl bg-white/[0.07] border ${isOpen ? colours.border : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
                  <div className={`absolute inset-x-0 top-0 h-[2px] ${colours.bar}`} />
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${colours.bar} rounded-l-2xl`} />
                  <div className="p-4 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className={`text-[15px] font-bold ${colours.heading}`}>{reg.title}</p>
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
                      {reg.content.map((section, i) => (
                        <div key={i} className="rounded-xl bg-white/[0.05] p-3">
                          <p className="text-[13px] font-semibold text-white mb-2">{section.heading}</p>
                          <div className="space-y-2">
                            {section.items.map((item, j) => (
                              <Bullet key={j} text={item} accent={colours.bullet} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default InsulationRegulationRequirementsCard;
