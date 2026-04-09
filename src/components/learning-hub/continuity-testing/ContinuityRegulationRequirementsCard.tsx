import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

type SectionId = 'reg612' | 'reg543' | 'reg411' | 'compliance';

const regulations = [
  {
    id: 'reg612' as SectionId,
    title: 'Regulation 612.2 - Continuity of Protective Conductors',
    accent: 'blue',
    content: [
      {
        heading: '612.2.1 - Test Requirements:',
        items: [
          'Continuity of every protective conductor must be verified',
          'Test current shall not be less than 200mA',
          'Test shall be made using a low resistance ohmmeter',
          'The resistance of test leads shall be measured and recorded',
          'Test results shall be corrected for test lead resistance',
        ],
      },
      {
        heading: '612.2.2 - Test Methods:',
        items: [
          'Method 1: Test between phase and protective conductor (R1+R2)',
          'Method 2: Test protective conductor only (R2)',
          'Temporary link method acceptable for Method 2',
          'All parallel paths must be disconnected during testing',
          'Results must be recorded on appropriate test certificate',
        ],
      },
    ],
  },
  {
    id: 'reg543' as SectionId,
    title: 'Regulation 543.1 - Protective Conductor Cross-sectional Areas',
    accent: 'green',
    content: [
      {
        heading: '543.1.3 - Minimum Cross-sectional Areas:',
        items: [
          'Where phase conductor \u2264 16mm\u00B2: CPC = phase conductor size',
          'Where phase conductor >16mm\u00B2 but \u2264 35mm\u00B2: CPC = 16mm\u00B2',
          'Where phase conductor > 35mm\u00B2: CPC = phase conductor size \u00F7 2',
          'Minimum CPC size: 2.5mm\u00B2 for mechanical protection',
          'Alternative calculation method using adiabatic equation',
        ],
      },
      {
        heading: '543.1.4 - Ring Final Circuits:',
        items: [
          'Total resistance R1+R2 shall not exceed 1.67\u03A9',
          'This ensures adequate fault current for protective device operation',
          'Value based on 32A protective device with 0.4s disconnection',
          'Applies to both socket outlet and fixed equipment circuits',
          'Regular verification required during periodic inspection',
        ],
      },
    ],
  },
  {
    id: 'reg411' as SectionId,
    title: 'Regulation 411.3.2 - Automatic Disconnection Requirements',
    accent: 'orange',
    content: [
      {
        heading: '411.3.2.2 - Maximum Disconnection Times:',
        items: [
          'Final circuits \u226432A: disconnection time not more than 0.4s',
          'Final circuits >32A and distribution circuits: disconnection time up to 5s',
          'Measured Zs must be such that the protective device disconnects the circuit within the required time stated in BS 7671',
          'Special locations may have reduced disconnection times',
          'Times apply to TN systems (TT systems have different requirements)',
          'Protective conductor continuity essential for compliance',
        ],
      },
      {
        heading: '411.3.2.3 - Maximum Zs Values:',
        items: [
          'Earth fault loop impedance must not exceed tabulated values',
          'Values ensure adequate fault current for protective device operation',
          'R1+R2 component critical for overall Zs calculation',
          'Temperature correction factors must be applied',
          'Regular testing ensures continued compliance',
        ],
      },
    ],
  },
  {
    id: 'compliance' as SectionId,
    title: 'Critical Compliance Points',
    accent: 'red',
    content: [
      {
        heading: 'Testing Requirements:',
        items: [
          'Every protective conductor must be tested',
          'Minimum 200mA test current required',
          'Test lead resistance must be accounted for',
          'Results must be recorded and retained',
        ],
      },
      {
        heading: 'Design Compliance:',
        items: [
          'Protective conductor sizing per Regulation 543',
          'Maximum R1+R2 values for automatic disconnection',
          'Ring circuit specific limitations',
          'Bonding conductor requirements',
        ],
      },
      {
        heading: 'Documentation:',
        items: [
          'Electrical Installation Certificate required',
          'Schedule of Test Results must be completed',
          'Periodic inspection reports for existing installations',
          'Competent person certification',
        ],
      },
    ],
  },
];

const barMap: Record<string, string> = {
  blue: 'bg-blue-500/50',
  green: 'bg-green-500/50',
  orange: 'bg-orange-500/50',
  red: 'bg-red-500/50',
};
const topAccentMap: Record<string, string> = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
};
const borderActiveMap: Record<string, string> = {
  blue: 'border-blue-500/20',
  green: 'border-green-500/20',
  orange: 'border-orange-500/20',
  red: 'border-red-500/20',
};
const textMap: Record<string, string> = {
  blue: 'text-blue-400',
  green: 'text-green-400',
  orange: 'text-orange-400',
  red: 'text-red-400',
};

const ContinuityRegulationRequirementsCard = ({ onBack }: Props) => {
  const [expanded, setExpanded] = useState<SectionId | null>(null);
  const toggle = (id: SectionId) => setExpanded((prev) => (prev === id ? null : id));

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

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl bg-white/[0.03] border border-cyan-500/20 p-4 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-cyan-500" />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500/60 rounded-l-2xl" />
            <p className="text-[15px] font-bold text-cyan-400">BS 7671 Regulation Requirements</p>
            <p className="text-[12px] text-white mt-1">
              Detailed regulatory requirements for continuity of protective conductors testing
            </p>
          </div>
        </motion.div>

        {regulations.map((reg) => {
          const isOpen = expanded === reg.id;
          return (
            <motion.div key={reg.id} variants={itemVariants}>
              <button
                type="button"
                onClick={() => toggle(reg.id)}
                className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
              >
                <div className={`relative rounded-2xl bg-white/[0.07] border ${isOpen ? borderActiveMap[reg.accent] : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
                  <div className={`absolute inset-x-0 top-0 h-[2px] ${topAccentMap[reg.accent]}`} />
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${barMap[reg.accent]} rounded-l-2xl`} />
                  <div className="p-4 flex items-center gap-3">
                    <p className={`text-[15px] font-bold ${textMap[reg.accent]} flex-1`}>{reg.title}</p>
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
                    <div className="pt-2 px-1 pb-1 space-y-2">
                      {reg.content.map((block, i) => (
                        <div key={i} className="rounded-xl bg-white/[0.05] p-3">
                          <p className="text-[12px] font-semibold text-white mb-1.5">{block.heading}</p>
                          <div className="space-y-1">
                            {block.items.map((item, j) => (
                              <p key={j} className="text-[12px] text-white">- {item}</p>
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

export default ContinuityRegulationRequirementsCard;
