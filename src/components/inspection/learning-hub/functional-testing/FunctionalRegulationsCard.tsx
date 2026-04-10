import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const coreRegulations = [
  { number: 'Reg 612.13', title: 'Functional Testing Requirement', description: 'Assemblies, including switchgear and controlgear assemblies, and components of the electrical installation shall be subjected to a functional test to show that they are properly mounted, adjusted and installed in accordance with BS 7671.' },
  { number: 'Reg 612.13.1', title: 'Switchgear and Controlgear', description: 'Every item of switchgear and controlgear shall be operated to verify that it is properly fixed and adjusted. This includes main switches, isolators, MCBs, RCBOs, contactors, and all control devices.' },
  { number: 'Reg 612.13.2', title: 'Interlocks', description: 'Where interlocks are provided, they shall be tested to verify that they function correctly and cannot be easily defeated. This includes mechanical interlocks, electrical interlocks, and key-operated systems.' },
  { number: 'Reg 514.12.2', title: 'RCD Test Notice', description: 'Where an RCD is fitted, a notice shall be fixed at the origin stating it should be tested regularly. The T button is a functional test — verify it operates during functional testing.' },
  { number: 'Reg 537.3', title: 'Emergency Switching', description: 'Emergency switching devices shall be readily accessible and clearly identifiable. Functional testing shall verify they disconnect the relevant circuits when operated.' },
  { number: 'Reg 514.8', title: 'Circuit Chart', description: 'A durable chart or schedule giving details of every circuit shall be provided at the distribution board. Functional testing should verify the chart matches the actual circuit arrangement.' },
  { number: 'Reg 643.10', title: 'Functional Testing — Domestic', description: 'Functional testing of domestic final circuits (lighting and sockets) after installation. Verify RCD operation, correct polarities, continuity, protective bonding and earth loop impedance.' },
  { number: 'Reg 643.10', title: 'Functional Testing — Commercial 3-Phase', description: 'Commercial three-phase power circuits serving distribution boards. Functional tests to confirm phase sequence, imbalance, short-circuit protection coordination and earth fault detection.' },
  { number: 'Reg 643.10', title: 'Functional Testing — Industrial', description: 'Industrial motor control circuits: functional testing of starters, overloads, short-circuit protection, interlocks and emergency stop operation for safe restoration.' },
  { number: 'Reg 643.10', title: 'Functional Testing — Medical Locations', description: 'Hospital critical supply and medical locations: functional verification of alternative supplies, automatic transfer switch operation, selectivity and patient safety measures.' },
];

const otherStandards = [
  { standard: 'IET Guidance Note 3', detail: 'Section 2.7 — Functional testing. Covers the scope of functional tests, what must be tested, and how to record results on the Schedule of Test Results.' },
  { standard: 'BS EN 60947', detail: 'Industrial switchgear and controlgear. Defines functional test requirements for contactors, starters, and control devices in industrial installations.' },
  { standard: 'BS 5266', detail: 'Emergency lighting. Defines functional test requirements for emergency lighting systems including changeover, duration, and illumination levels.' },
  { standard: 'BS 5839', detail: 'Fire detection and alarm systems. Defines functional test requirements for fire alarm interfaces with electrical installations.' },
];

const certificationRequirements = [
  { cert: 'Electrical Installation Certificate (EIC)', requirement: 'Functional testing is part of initial verification. The certificate confirms that assemblies and equipment have been tested and function correctly. Record any defects.' },
  { cert: 'Electrical Installation Condition Report (EICR)', requirement: 'During periodic inspection, functional testing verifies continued correct operation. Stiff switches, failed indicators, and defeated interlocks are observations to record.' },
  { cert: 'Minor Works Certificate', requirement: 'Functional testing required for all minor works — verify the new or altered equipment operates correctly and does not affect existing circuits.' },
];

const FunctionalRegulationsCard = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Regulations</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">BS 7671:2018+A3:2024</p>
        </motion.div>

        {coreRegulations.map((reg, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-xl bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-1.5">
                  <span className="text-xs font-bold text-yellow-400 whitespace-nowrap">{reg.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{reg.title}</p>
                  <p className="text-sm text-white mt-1 leading-relaxed">{reg.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Other Standards</p>
        </motion.div>

        {otherStandards.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-sm font-semibold text-white">{item.standard}</p>
              <p className="text-sm text-white mt-1 leading-relaxed">{item.detail}</p>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Certification Requirements</p>
        </motion.div>

        {certificationRequirements.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-sm font-semibold text-white">{item.cert}</p>
              <p className="text-sm text-white mt-1 leading-relaxed">{item.requirement}</p>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">EICR Observations from Functional Testing</p>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-red-400/20 border border-red-400/30 px-2 py-1">
                  <span className="text-xs font-bold text-red-400">C1</span>
                </div>
                <p className="text-sm text-white"><span className="font-medium">Danger present.</span> Emergency stop not functioning, safety interlock bypassed, main switch fails to isolate.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-orange-400/20 border border-orange-400/30 px-2 py-1">
                  <span className="text-xs font-bold text-orange-400">C2</span>
                </div>
                <p className="text-sm text-white"><span className="font-medium">Potentially dangerous.</span> RCD test button not working, switch fails to make positive contact, indicator lamp failed.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-yellow-400/20 border border-yellow-400/30 px-2 py-1">
                  <span className="text-xs font-bold text-yellow-400">C3</span>
                </div>
                <p className="text-sm text-white"><span className="font-medium">Improvement recommended.</span> Circuit chart incorrect, stiff switch mechanism, timer set to wrong programme.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FunctionalRegulationsCard;
