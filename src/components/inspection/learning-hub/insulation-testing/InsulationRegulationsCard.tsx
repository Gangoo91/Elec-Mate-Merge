import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const coreRegulations = [
  { number: 'Reg 612.3', title: 'Insulation Resistance Test', description: 'Insulation resistance shall be measured between live conductors and between live conductors and the protective conductor connected to earth, with the installation isolated from the supply.' },
  { number: 'Reg 643.3', title: 'Initial Verification', description: 'Initial insulation resistance measurements must be taken prior to energisation of new installations. Minimum acceptable value for final circuits up to 500V is 1.0MΩ at 500V DC test voltage.' },
  { number: 'Reg 643.3', title: 'Domestic Circuits', description: 'Insulation resistance for single-phase domestic ring final and radial lighting circuits must meet acceptable values using standard test practices. Each circuit tested individually.' },
  { number: 'Reg 643.3', title: 'Post-Fault Verification', description: 'Mandatory insulation resistance testing after a significant earth fault or short-circuit event to confirm insulation condition before re-energisation. Deterioration or damage must be documented.' },
  { number: 'Reg 643.3', title: 'Buried Cables', description: 'Insulation resistance testing for buried cables must account for soil moisture, bedding and mechanical protection. Pre-laying and post-laying tests required to confirm integrity.' },
  { number: 'Reg 538.4', title: 'Insulation Monitoring (IT Systems)', description: 'Insulation monitoring devices provide continuous IR measurement in IT systems to detect first insulation faults without automatic supply disconnection, enabling planned maintenance.' },
  { number: 'Reg 421.1', title: 'High Fire-Risk Premises', description: 'Increased inspection and testing intervals, including periodic insulation testing, for installations in warehouses storing combustible or flammable goods to detect early deterioration.' },
  { number: 'Reg 131.2', title: 'Periodic Testing', description: 'Obligation to carry out and record periodic inspections and testing to confirm protective measures remain effective, including insulation resistance tests.' },
  { number: 'Reg 445.1', title: 'Post-Installation Testing', description: 'Mandatory inspection and testing procedures after installation including insulation resistance testing and issuing of electrical installation reports and certificates.' },
];

const otherStandards = [
  { standard: 'IET Guidance Note 3', detail: 'Inspection & Testing. Covers IR test procedures, test voltage selection, temperature correction, parallel circuit testing, and recording requirements.' },
  { standard: 'BS EN 61557-2', detail: 'Specification for insulation resistance testers. Defines accuracy, test voltage, short-circuit current and safety requirements for instruments.' },
  { standard: 'Electricity at Work Regulations 1989', detail: 'Regulation 4 — systems must be constructed and maintained to prevent danger. Deteriorated insulation that allows leakage current breaches this requirement.' },
  { standard: 'Building Regulations Part P', detail: 'Insulation resistance verification is mandatory for Part P notification. Results must be recorded on the EIC or Minor Works Certificate.' },
];

const certificationRequirements = [
  { cert: 'Electrical Installation Certificate (EIC)', requirement: 'IR must be measured on every circuit (L-E, N-E, L-N) and results recorded on the Schedule of Test Results. Test voltage and ambient temperature must be noted.' },
  { cert: 'Electrical Installation Condition Report (EICR)', requirement: 'IR is tested during periodic inspection. Values below 1MΩ are coded C2 (potentially dangerous). Significant deterioration from previous results may warrant C3 (improvement recommended).' },
  { cert: 'Minor Works Certificate', requirement: 'IR verification required for all minor works. Results recorded on the test results section with test voltage.' },
];

const InsulationRegulationsCard = ({ onBack }: Props) => {
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
                <p className="text-sm text-white"><span className="font-medium">Danger present.</span> IR so low that there is immediate risk of electric shock or fire. Circuit must be isolated immediately.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-orange-400/20 border border-orange-400/30 px-2 py-1">
                  <span className="text-xs font-bold text-orange-400">C2</span>
                </div>
                <p className="text-sm text-white"><span className="font-medium">Potentially dangerous.</span> IR below 1MΩ minimum — insulation is compromised but not an immediate emergency. Requires remedial action.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-yellow-400/20 border border-yellow-400/30 px-2 py-1">
                  <span className="text-xs font-bold text-yellow-400">C3</span>
                </div>
                <p className="text-sm text-white"><span className="font-medium">Improvement recommended.</span> IR above minimum but significantly deteriorated from expected values. Monitor at next inspection.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vulnerable equipment notice */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm font-semibold text-white mb-2">Vulnerable Equipment Notice (BS 7671)</p>
            <p className="text-sm text-white leading-relaxed">
              A durable diagram, chart or schedule at or within the distribution board must identify circuits and equipment vulnerable to insulation resistance testing. This prevents damage to SPDs, electronic equipment and sensitive devices during future testing. If this notice is missing, create one during your inspection.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InsulationRegulationsCard;
