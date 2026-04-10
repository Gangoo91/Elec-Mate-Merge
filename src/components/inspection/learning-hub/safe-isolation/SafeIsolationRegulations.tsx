import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const coreRegulations = [
  { number: 'Reg 132.15', title: 'Provision for Isolation', description: 'Suitable means shall be provided to allow the installation, every circuit and every item of equipment to be safely isolated for maintenance, inspection, fault detection and repair.' },
  { number: 'Reg 133.2', title: 'Disconnecting Devices', description: 'Disconnecting devices shall be provided to permit safe switching or isolation of installations, circuits or equipment for operation, inspection, testing, maintenance and repair.' },
  { number: 'Reg 134.2.2', title: 'Isolator Definition', description: 'A disconnector (isolator) provides mechanical switching that in the open position meets isolating requirements. It may carry negligible or no significant breaking current and is used for safe isolation during maintenance.' },
  { number: 'Reg 537.3', title: 'Emergency Switching', description: 'Emergency switching devices shall be readily accessible and clearly identifiable. They must disconnect the relevant circuits when operated, providing rapid disconnection in dangerous situations.' },
  { number: 'Reg 514.11', title: 'Warning Labels', description: 'Where equipment may retain dangerous charge after disconnection, a durable warning label must be fixed adjacent to the enclosure, visible before opening, warning not to presume dead.' },
];

const eawRegulations = [
  { number: 'EAW Reg 4', title: 'Systems to Be Safe', description: 'All systems shall be constructed, maintained and worked so as to prevent danger. This fundamental requirement underpins the safe isolation procedure.' },
  { number: 'EAW Reg 12', title: 'Means of Isolation', description: 'Suitable means shall be available for cutting off the supply of electrical energy to any electrical equipment. The means of isolation must be accessible and clearly identified.' },
  { number: 'EAW Reg 13', title: 'Precautions for Dead Working', description: 'Adequate precautions shall be taken to prevent electrical equipment which has been made dead from becoming live during work. This specifically requires lock-off and proving dead.' },
  { number: 'EAW Reg 14', title: 'Working on Live Conductors', description: 'No person shall work on or near a live conductor unless: (a) it is unreasonable for it to be dead, AND (b) it is reasonable for the person to be at work near it, AND (c) suitable precautions are taken. All three conditions must be met.' },
];

const otherStandards = [
  { standard: 'GS38', detail: 'HSE guidance on electrical test equipment for use by electricians. Sets mandatory requirements for voltage indicators: fused probes (max 500mA), finger guards, adequate insulation, and proving units.' },
  { standard: 'IET Guidance Note 3', detail: 'Section 2.1 — Safe isolation. Covers the complete procedure, acceptable isolation devices, proving dead requirements, and documentation.' },
  { standard: 'HSE HSG85', detail: 'Electricity at Work — Safe Working Practices. The definitive HSE guidance on electrical safety including safe isolation, permit-to-work systems, and competence requirements.' },
  { standard: 'BS EN 61243-3', detail: 'Product standard for two-pole voltage detectors. Defines performance requirements for the voltage indicators used in safe isolation.' },
];

const SafeIsolationRegulations = ({ onBack }: Props) => {
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
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Electricity at Work Regulations 1989</p>
        </motion.div>

        {eawRegulations.map((reg, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-xl bg-orange-400/10 border border-orange-400/20 px-2.5 py-1.5">
                  <span className="text-xs font-bold text-orange-400 whitespace-nowrap">{reg.number}</span>
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

        {/* Reg 514.11 warning notices by location */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Reg 514.11 — Warning Notices by Location</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white mb-3">Warning notices are required at isolation points. The content varies by location type:</p>
            <div className="space-y-1.5">
              {[
                'Domestic consumer unit — state isolation risks, which circuits are affected',
                'Commercial main isolator — identify affected socket and power circuits, name authorised persons',
                'Industrial motor isolators — advise lock-off/tag-off procedures, authorised maintenance personnel, restart hazards',
                'Medical/theatre circuits — indicate effects on life-support equipment, authorised clinical engineering personnel',
                'Emergency lighting/fire alarm — state that isolation renders life safety systems inoperative, specify approval procedures',
                'Data racks/PoE switches — indicate network and communications downtime, identify authorised IT personnel',
                'Outdoor/agricultural — must be durable and weatherproof, remain legible in exposed conditions',
                'Buried cable terminations — indicate excavation hazards and isolation location',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-red-400/10 border border-red-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Criminal Liability</p>
            <p className="text-sm text-white leading-relaxed">
              Failure to follow safe isolation is a criminal offence under the Electricity at Work Regulations 1989. Employers and individuals can be prosecuted. If someone is killed or seriously injured due to failure to isolate, the responsible person can face imprisonment under the Health and Safety at Work Act 1974 and the Corporate Manslaughter Act 2007.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SafeIsolationRegulations;
