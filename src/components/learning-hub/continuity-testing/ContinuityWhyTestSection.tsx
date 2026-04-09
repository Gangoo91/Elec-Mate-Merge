import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const sections = [
  {
    id: 'safety',
    title: 'Critical Safety Protection',
    accent: 'red',
    items: [
      { heading: 'Ensures Protective Conductor Integrity', body: 'Protective conductors must provide a continuous low-resistance path for fault currents. A broken or high-resistance protective conductor cannot safely carry fault currents to earth, potentially leaving metalwork at dangerous potentials during fault conditions.' },
      { heading: 'Enables Automatic Disconnection', body: 'For automatic disconnection of supply (ADS) to operate effectively, protective conductors must have sufficiently low resistance. High resistance prevents adequate fault current flow, potentially causing protective devices to fail to operate within required time limits.' },
      { heading: 'Protects Against Electric Shock', body: 'Continuity testing verifies that exposed-conductive-parts are effectively connected to earth. Without proper continuity, these parts could remain at dangerous potentials during fault conditions, creating serious shock hazards for users.' },
      { heading: 'Validates Design Calculations', body: 'Measured R1+R2 values are essential for verifying that calculated fault currents are achievable in practice. This ensures that protective device characteristics will provide adequate protection as designed.' },
    ],
  },
  {
    id: 'fault-paths',
    title: 'Understanding Fault Current Paths',
    accent: 'blue',
    content: {
      intro: 'How protective conductors work in fault conditions:',
      columns: [
        { heading: 'Normal Operation', items: ['Current flows through phase conductor to load', 'Returns via neutral conductor to source', 'Protective conductor carries no current', 'Exposed metalwork remains at earth potential', 'No potential difference between metalwork and earth'] },
        { heading: 'Fault Condition', items: ['Phase conductor contacts exposed metalwork', 'Fault current flows through protective conductor', 'Protective device must operate within time limits', 'Higher fault current = faster disconnection', 'Low resistance path essential for safety'] },
      ],
      physics: {
        heading: 'The Physics of Fault Protection',
        columns: [
          { heading: "Ohm's Law in Fault Conditions", items: ['Fault Current (If) = Supply Voltage (U0) / Total Loop Impedance (Zs)', 'Zs = Ze + R1 + R2 (external + phase + protective conductor)', 'Lower R1+R2 = Higher fault current = Faster disconnection', 'Protective conductor resistance (R2) is critical component'] },
          { heading: 'Time/Current Relationship', items: ['BS 7671 requires disconnection within 0.4s (final circuits)', 'Higher fault currents operate protective devices faster', 'Broken protective conductor = infinite resistance', 'No fault current = no automatic disconnection'] },
        ],
      },
    },
  },
  {
    id: 'failures',
    title: 'Common Failure Modes',
    accent: 'orange',
    content: {
      intro: 'Real-world protective conductor failures:',
      failureModes: [
        'Mechanical damage: Cables crushed, cut, or severed during installation',
        'Corrosion: Damp conditions causing conductor deterioration',
        'Loose connections: High resistance joints at terminals',
        'Installation errors: Incorrect termination or routing',
        'Thermal damage: Overheating from poor connections',
        'Rodent damage: Cables chewed by pests',
        'Age-related failure: Insulation breakdown affecting conductor',
        'Inadequate sizing: Undersized conductors with excessive resistance',
      ],
      consequences: {
        immediate: ['Exposed metalwork at dangerous potentials', 'Electric shock from normally safe surfaces', 'Protective devices fail to operate', 'Sustained fault conditions'],
        progressive: ['Electrical fires from sustained arcing', 'Equipment damage from fault currents', 'System instability and power quality issues', 'Cascading failures in interconnected systems'],
      },
    },
  },
  {
    id: 'common-defects',
    title: 'Common Defects Found During Testing',
    accent: 'red',
    content: {
      defects: {
        bonding: [
          'Loose bonding connections',
          'Missing bonding conductor',
          'Painted-over or corroded bonds',
        ],
        ring: [
          'Open conductor in ring',
          'Poor jointing at termination points',
          'Corroded conductor joints',
          'Parallel connection to unrelated circuit',
        ],
        radial: [
          'Incorrectly connected neutrals',
          'Loose connections at sockets',
          'Undersized spur cable',
          'Damaged outer sheath',
        ],
      },
    },
  },
  {
    id: 'regulations',
    title: 'Regulatory and Professional Requirements',
    accent: 'green',
    content: {
      legal: [
        'BS 7671:18+A3:2024: Regulation 612.2 - Continuity of protective conductors',
        'Electricity at Work Regulations 1989: Regulation 4 - Systems to be safe',
        'Building Regulations Part P: Electrical safety in dwellings',
        'IET Guidance Note 3: Inspection & Testing procedures',
        'Health and Safety at Work Act 1974: Duty of care requirements',
      ],
      professional: [
        'Competent Person Schemes: NICEIC, NAPIT, ELECSA requirements',
        'City & Guilds 2391: Inspection and testing qualification',
        'IET Code of Practice: Professional competence standards',
        'JIB Handbook: Industry recognised procedures',
      ],
      certification: {
        initial: ['All protective conductors must be tested', 'Results recorded on schedule of test results', 'Electrical Installation Certificate required', 'Building Control notification where applicable'],
        periodic: ['Protective conductor integrity verification', 'Comparison with previous test results', 'Electrical Installation Condition Report', 'Recommendations for remedial action'],
      },
    },
  },
];

const caseStudies = [
  {
    title: 'Case 1: Commercial Kitchen Equipment Fault',
    description: "A commercial kitchen's stainless steel worktop became live due to a faulty appliance connection:",
    fault: 'Protective conductor broken in appliance plug',
    consequence: 'Kitchen staff received shocks from worktop',
    detection: 'Continuity testing revealed open circuit',
    outcome: 'Immediate repair prevented serious injury',
  },
  {
    title: 'Case 2: Industrial Motor Installation',
    description: 'High-power motor installation with inadequate protective conductor sizing:',
    fault: 'Undersized CPC with excessive resistance',
    consequence: 'Motor casing became live during earth fault',
    detection: 'R1+R2 measurement exceeded maximum values',
    outcome: 'Protective conductor upgraded before energisation',
  },
  {
    title: 'Case 3: Domestic Ring Circuit Failure',
    description: 'Ring final circuit with broken protective conductor continuity:',
    fault: 'CPC severed during cavity wall insulation work',
    consequence: 'Socket outlets beyond break had no earth protection',
    detection: 'Continuity test revealed infinite resistance',
    outcome: 'Cable replacement restored safety',
  },
];

const accentMap: Record<string, { bar: string; heading: string; border: string }> = {
  red: { bar: 'bg-red-500/50', heading: 'text-red-400', border: 'border-red-500/20' },
  blue: { bar: 'bg-blue-500/50', heading: 'text-blue-400', border: 'border-blue-500/20' },
  orange: { bar: 'bg-orange-500/50', heading: 'text-orange-400', border: 'border-orange-500/20' },
  green: { bar: 'bg-green-500/50', heading: 'text-green-400', border: 'border-green-500/20' },
  purple: { bar: 'bg-purple-500/50', heading: 'text-purple-400', border: 'border-purple-500/20' },
};

const ContinuityWhyTestSection = ({ onBack }: Props) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  const toggle = (id: string) => setExpanded((prev) => (prev === id ? null : id));
  const toggleCase = (i: number) => setExpandedCase((prev) => (prev === i ? null : i));

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
            <h1 className="text-base font-semibold text-white">Why Test Continuity?</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
        {/* Main expandable sections */}
        {sections.map((section) => {
          const isOpen = expanded === section.id;
          const colours = accentMap[section.accent];
          return (
            <motion.div key={section.id} variants={itemVariants}>
              <button
                type="button"
                onClick={() => toggle(section.id)}
                className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
              >
                <div className={`relative rounded-2xl bg-white/[0.07] border ${isOpen ? colours.border : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
                  <div className={`absolute inset-x-0 top-0 h-[2px] ${colours.bar}`} />
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${colours.bar} rounded-l-2xl`} />
                  <div className="p-4 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className={`text-[15px] font-bold ${colours.heading}`}>{section.title}</p>
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
                      {renderSectionContent(section, colours)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Case Studies */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-purple-400 uppercase tracking-wider px-0.5 mb-2 mt-4">Case Studies</p>
        </motion.div>
        {caseStudies.map((cs, i) => {
          const isOpen = expandedCase === i;
          return (
            <motion.div key={i} variants={itemVariants}>
              <button
                type="button"
                onClick={() => toggleCase(i)}
                className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
              >
                <div className={`relative rounded-2xl bg-white/[0.07] border ${isOpen ? 'border-white/[0.15]' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500/50 rounded-l-2xl" />
                  <div className="p-4 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-white">{cs.title}</p>
                      <p className="text-[12px] text-white mt-0.5">{cs.description}</p>
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
                    <div className="pt-2 px-1 pb-1 space-y-1.5">
                      <div className="rounded-xl bg-white/[0.05] p-3">
                        <p className="text-[12px] text-red-400"><span className="font-semibold">Fault:</span> {cs.fault}</p>
                      </div>
                      <div className="rounded-xl bg-white/[0.05] p-3">
                        <p className="text-[12px] text-red-400"><span className="font-semibold">Consequence:</span> {cs.consequence}</p>
                      </div>
                      <div className="rounded-xl bg-white/[0.05] p-3">
                        <p className="text-[12px] text-green-400"><span className="font-semibold">Detection:</span> {cs.detection}</p>
                      </div>
                      <div className="rounded-xl bg-white/[0.05] p-3">
                        <p className="text-[12px] text-blue-400"><span className="font-semibold">Outcome:</span> {cs.outcome}</p>
                      </div>
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderSectionContent(section: any, colours: { bar: string; heading: string; border: string }) {
  if (section.id === 'safety') {
    return (
      <div className="space-y-2">
        {section.items.map((item: any, i: number) => (
          <div key={i} className="rounded-xl bg-white/[0.05] p-3">
            <p className="text-[13px] font-semibold text-white">{item.heading}</p>
            <p className="text-[12px] text-white mt-1 leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>
    );
  }

  if (section.id === 'fault-paths') {
    const c = section.content;
    return (
      <div className="space-y-2">
        <p className="text-[12px] text-white font-medium px-1">{c.intro}</p>
        {c.columns.map((col, i) => (
          <div key={i} className="rounded-xl bg-white/[0.05] p-3">
            <p className="text-[12px] font-semibold text-blue-400 mb-1.5">{col.heading}</p>
            <div className="space-y-1">
              {col.items.map((item, j) => (
                <p key={j} className="text-[12px] text-white">- {item}</p>
              ))}
            </div>
          </div>
        ))}
        <div className="rounded-xl bg-white/[0.05] p-3">
          <p className="text-[12px] font-semibold text-green-400 mb-2">{c.physics.heading}</p>
          {c.physics.columns.map((col, i) => (
            <div key={i} className="mb-2 last:mb-0">
              <p className="text-[12px] font-semibold text-white mb-1">{col.heading}</p>
              <div className="space-y-0.5">
                {col.items.map((item, j) => (
                  <p key={j} className="text-[12px] text-white">- {item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section.id === 'failures') {
    const c = section.content;
    return (
      <div className="space-y-2">
        <p className="text-[12px] text-white font-medium px-1">{c.intro}</p>
        <div className="rounded-xl bg-white/[0.05] p-3 space-y-1">
          {c.failureModes.map((mode, i) => (
            <p key={i} className="text-[12px] text-white">- {mode}</p>
          ))}
        </div>
        <div className="rounded-xl bg-white/[0.05] p-3">
          <p className="text-[12px] font-semibold text-red-400 mb-1.5">Consequences of Inadequate Continuity</p>
          <p className="text-[12px] font-semibold text-white mb-1">Immediate Dangers:</p>
          <div className="space-y-0.5 mb-2">
            {c.consequences.immediate.map((item, i) => (
              <p key={i} className="text-[12px] text-white">- {item}</p>
            ))}
          </div>
          <p className="text-[12px] font-semibold text-white mb-1">Progressive Risks:</p>
          <div className="space-y-0.5">
            {c.consequences.progressive.map((item, i) => (
              <p key={i} className="text-[12px] text-white">- {item}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (section.id === 'common-defects') {
    const c = section.content;
    return (
      <div className="space-y-2">
        <div className="rounded-xl bg-white/[0.05] p-3">
          <p className="text-[12px] font-semibold text-amber-400 mb-1.5">Bonding Defects:</p>
          <div className="space-y-0.5">
            {c.defects.bonding.map((item: string, i: number) => (
              <p key={i} className="text-[12px] text-white">- {item}</p>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white/[0.05] p-3">
          <p className="text-[12px] font-semibold text-orange-400 mb-1.5">Ring Circuit Defects:</p>
          <div className="space-y-0.5">
            {c.defects.ring.map((item: string, i: number) => (
              <p key={i} className="text-[12px] text-white">- {item}</p>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white/[0.05] p-3">
          <p className="text-[12px] font-semibold text-red-400 mb-1.5">Radial Circuit Defects:</p>
          <div className="space-y-0.5">
            {c.defects.radial.map((item: string, i: number) => (
              <p key={i} className="text-[12px] text-white">- {item}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (section.id === 'regulations') {
    const c = section.content;
    return (
      <div className="space-y-2">
        <div className="rounded-xl bg-white/[0.05] p-3">
          <p className="text-[12px] font-semibold text-white mb-1.5">UK Legal and Standards Framework:</p>
          <div className="space-y-1">
            {c.legal.map((item, i) => (
              <p key={i} className="text-[12px] text-white">- {item}</p>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white/[0.05] p-3">
          <p className="text-[12px] font-semibold text-white mb-1.5">Professional Standards:</p>
          <div className="space-y-1">
            {c.professional.map((item, i) => (
              <p key={i} className="text-[12px] text-white">- {item}</p>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white/[0.05] p-3">
          <p className="text-[12px] font-semibold text-yellow-400 mb-1.5">Certification Requirements:</p>
          <p className="text-[12px] font-semibold text-white mb-1">Initial Verification:</p>
          <div className="space-y-0.5 mb-2">
            {c.certification.initial.map((item, i) => (
              <p key={i} className="text-[12px] text-white">- {item}</p>
            ))}
          </div>
          <p className="text-[12px] font-semibold text-white mb-1">Periodic Inspection:</p>
          <div className="space-y-0.5">
            {c.certification.periodic.map((item, i) => (
              <p key={i} className="text-[12px] text-white">- {item}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default ContinuityWhyTestSection;
