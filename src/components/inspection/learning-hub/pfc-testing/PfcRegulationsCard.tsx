import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const coreRegulations = [
  { number: 'Reg 612.11', title: 'Measurement of PFC', description: 'The prospective fault current shall be measured, calculated or determined by another method at the origin of the installation and at every relevant point. The value shall not exceed the rated breaking capacity of the protective device.' },
  { number: 'Reg 434.5.2', title: 'Fault Current Calculation', description: 'Prospective fault current I = U₀ ÷ Zs. This must be calculated or measured for every circuit to verify that protective devices will operate within the required time under fault conditions.' },
  { number: 'Reg 132.2', title: 'Documentation of PFC', description: 'Calculation and documentation of prospective fault current and external earth fault loop impedance by calculation, measurement or enquiry to select protective devices and verify disconnection times.' },
  { number: 'Reg 131.5', title: 'Conductor & Equipment Withstand', description: 'Conductors and equipment must be verified to survive the magnitude and duration of prospective fault currents thermally and mechanically until the protective device disconnects.' },
  { number: 'Reg 131.3', title: 'Overcurrent Device Selection', description: 'Select overcurrent protective devices to prevent conductor and equipment overheating by matching device characteristics to cable rating, prospective fault current and application.' },
  { number: 'Reg 712.534.101', title: 'Certificate Recording', description: 'The recorded prospective fault current (Ipf) must be the greater of the prospective short-circuit current or the prospective earth fault current. The maximum prospective value shall be stated on the certificate.' },
  { number: 'Reg 826.1.4', title: 'Breaking Capacity', description: 'Overcurrent protective devices shall be specified for sufficient breaking capacity using maximum short-circuit currents. Tripping characteristics must be adjusted to operate reliably given minimum fault currents.' },
  { number: 'Reg 132.15', title: 'Isolation Device Rating', description: 'Isolation devices and switch-disconnectors must have adequate rated breaking capacity and be suitable for the prospective fault current of the circuit.' },
];

const otherStandards = [
  { standard: 'IET Guidance Note 3', detail: 'Inspection & Testing. Covers PFC measurement procedures, calculation methods, recording requirements, and assessment against protective device characteristics.' },
  { standard: 'BS EN 60898', detail: 'MCB product standard. Defines breaking capacity ratings (Icn), service breaking capacity (Ics), and time/current characteristics for Types B, C, and D.' },
  { standard: 'BS EN 60947', detail: 'Industrial switchgear standard. Defines breaking capacity for MCCBs and ACBs used in commercial and industrial installations.' },
  { standard: 'Electricity at Work Regulations 1989', detail: 'Regulation 5 — electrical equipment must be of adequate strength and capability for the prospective fault conditions. Inadequate breaking capacity breaches this requirement.' },
];

const certificationRequirements = [
  { cert: 'Electrical Installation Certificate (EIC)', requirement: 'PFC must be measured at the origin and recorded. The greater of L-E and L-N PFC is stated. All protective devices must have adequate breaking capacity for the recorded PFC.' },
  { cert: 'Electrical Installation Condition Report (EICR)', requirement: 'PFC is verified during periodic inspection. If PFC has changed (supply upgrade, additional generation), protective devices are reassessed. Inadequate breaking capacity is coded C1.' },
  { cert: 'Minor Works Certificate', requirement: 'PFC at the point of the new work must be verified. Particularly important when adding circuits to existing installations — the supply characteristics may have changed.' },
];

const PfcRegulationsCard = ({ onBack }: Props) => {
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
            <p className="text-sm font-semibold text-white mb-2">EICR Observation Coding</p>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-red-400/20 border border-red-400/30 px-2 py-1">
                  <span className="text-xs font-bold text-red-400">C1</span>
                </div>
                <p className="text-sm text-white"><span className="font-medium">Danger present.</span> PFC exceeds breaking capacity of installed device. The device could fail explosively during a fault. Immediate replacement required.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-orange-400/20 border border-orange-400/30 px-2 py-1">
                  <span className="text-xs font-bold text-orange-400">C2</span>
                </div>
                <p className="text-sm text-white"><span className="font-medium">Potentially dangerous.</span> PFC below minimum for magnetic MCB operation — disconnection time will exceed BS 7671 requirements during an earth fault.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PfcRegulationsCard;
