import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const coreRegulations = [
  { number: 'Reg 411.3.2', title: 'Disconnection Times', description: 'Protective devices must disconnect within 0.4 seconds for final circuits not exceeding 63A supplying socket outlets, and within 5 seconds for distribution circuits and final circuits supplying fixed equipment.' },
  { number: 'Reg 134.2.2', title: 'Definition of Zs', description: 'Earth fault loop impedance (Zs) is the impedance of the fault loop from the point of the fault through the CPC, consumer earthing, return path and transformer winding. System type (TN/TT/IT) determines the return path and affects disconnection times.' },
  { number: 'Reg 434.5.2', title: 'Fault Current Calculation', description: 'Prospective fault current I = U₀ ÷ Zs. This must be calculated or measured for every circuit to verify that protective devices will operate within the required time under fault conditions.' },
  { number: 'Reg 132.14', title: 'Protective Device Selection', description: 'Ensuring protective devices operate within required times by verifying earth fault loop impedance (Zs) and selecting devices to clear earth faults promptly in TN and TT systems.' },
  { number: 'Reg 131.5', title: 'TN & TT System Requirements', description: 'In TN systems, Zs must be low enough for overcurrent devices to disconnect. In TT systems where loop impedance is too high, RCDs must be used for automatic disconnection — overcurrent devices alone cannot provide adequate protection.' },
  { number: 'Reg 131.2', title: 'Automatic Disconnection Criteria', description: 'Sets maximum earth loop impedance and required disconnection times for different circuits to ensure rapid fault clearance and minimise touch voltages.' },
  { number: 'Reg 131.3', title: 'Thermal Protection', description: 'Earth-fault conditions must not produce excessive thermal effects. Zs verification ensures the protective device operates fast enough to prevent conductor overheating and fire risk.' },
  { number: 'Reg 643.7', title: 'Measurement of Zs', description: 'Earth fault loop impedance shall be measured or determined by calculation for every circuit. Measurement must be at the furthest point of the circuit for worst-case values.' },
  { number: 'Reg 132.2', title: 'External Loop Impedance', description: 'Determination and documentation of prospective fault current and external earth fault loop impedance (Ze) by calculation, measurement or enquiry to select protective devices and verify disconnection times.' },
  { number: 'Reg 411.5', title: 'RCD Additional Protection', description: 'Where Zs verification confirms adequate disconnection via overcurrent devices, additional RCD protection provides supplementary safety. Zs may be higher on RCD-protected circuits but still requires verification.' },
];

const otherStandards = [
  { standard: 'IET Guidance Note 3', detail: 'Inspection & Testing. Covers Zs measurement procedures, temperature correction methods, 80% rule application, and recording requirements for EIC/EICR.' },
  { standard: 'GS38', detail: 'HSE guidance on electrical test equipment. Sets requirements for probes, fusing and finger guards. Mandatory for live Zs testing.' },
  { standard: 'BS EN 61557-3', detail: 'Specification for loop impedance testers. Defines accuracy, test current and safety requirements for instruments used to measure Zs.' },
  { standard: 'Electricity at Work Regulations 1989', detail: 'Regulation 4 — systems must prevent danger. Inadequate earth fault protection (high Zs allowing slow disconnection) breaches this requirement.' },
];

const certificationRequirements = [
  { cert: 'Electrical Installation Certificate (EIC)', requirement: 'Zs must be measured at the furthest point of every circuit. Results recorded on the Schedule of Test Results with ambient temperature noted. Maximum permitted Zs stated for the protective device.' },
  { cert: 'Electrical Installation Condition Report (EICR)', requirement: 'Zs is measured during periodic inspection. Values exceeding BS 7671 limits are coded C2 (potentially dangerous) or C1 if disconnection is severely compromised. Comparison with previous results shows deterioration trends.' },
  { cert: 'Minor Works Certificate', requirement: 'Zs verification required for the altered or new circuit. Recorded on the test results section with protective device details.' },
];

const ZsRegulationsCard = ({ onBack }: Props) => {
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
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Other Standards & Guidance</p>
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
                <p className="text-sm text-white"><span className="font-medium">Danger present.</span> Zs so high that protective device will not disconnect in any reasonable time — exposed metalwork could remain live indefinitely during a fault.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-orange-400/20 border border-orange-400/30 px-2 py-1">
                  <span className="text-xs font-bold text-orange-400">C2</span>
                </div>
                <p className="text-sm text-white"><span className="font-medium">Potentially dangerous.</span> Zs exceeds maximum for the protective device — disconnection time will be longer than required, increasing shock risk.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-yellow-400/20 border border-yellow-400/30 px-2 py-1">
                  <span className="text-xs font-bold text-yellow-400">C3</span>
                </div>
                <p className="text-sm text-white"><span className="font-medium">Improvement recommended.</span> Zs is within limits but approaching maximum — deterioration could cause failure at next inspection.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ZsRegulationsCard;
