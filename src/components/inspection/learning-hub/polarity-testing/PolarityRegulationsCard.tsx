import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const coreRegulations = [
  {
    number: 'Reg 612.6',
    title: 'Verification of Polarity',
    description: 'A polarity test shall be made to verify that single-pole devices for protection or switching are connected in the line conductor only. This applies to every circuit in the installation.',
  },
  {
    number: 'Reg 133.2',
    title: 'Single-Pole Device Placement',
    description: 'Insert single-pole fuses, switches or circuit-breakers only in the line conductor. Avoid insertion in neutral except where fully linked to break all related line conductors simultaneously. This is the fundamental polarity rule.',
  },
  {
    number: 'Reg 463.1.2',
    title: 'Domestic Lighting Switching',
    description: 'In domestic lighting circuits, a single-pole switching device must not be placed in the neutral conductor. Switches must interrupt the live conductor to avoid switched-neutral hazards that leave lampholders permanently energised.',
  },
  {
    number: 'Reg 651.5',
    title: 'Prohibition on Neutral Switching',
    description: 'Prohibits use of single-pole switching and switching of neutral conductors where it could leave a circuit energised or compromise protective conductors. Requires appropriate multi-pole switching for safety.',
  },
  {
    number: 'Reg 132.15',
    title: 'Switching & Isolation',
    description: 'Single-phase circuits must be isolated by appropriate devices. Single-pole switches must interrupt the line conductor. Double-pole devices required where neutral may need to be switched.',
  },
  {
    number: 'Reg 533.3',
    title: 'Fuse Base Connections',
    description: 'Screw-in fuse bases must connect the centre contact to the supply (line) conductor and the shell to the load conductor. Incorrect connection reverses polarity through the fuse.',
  },
  {
    number: 'Reg 826.1.4',
    title: 'Overcurrent Device Polarity',
    description: 'Selection and erection of overcurrent devices must account for all possible directions of current flow and polarity. Connections via switchgear must comply with Reg 551.7.2.',
  },
  {
    number: 'Reg 419.3',
    title: 'Two-Fault Condition',
    description: 'If two faults affect exposed-conductive-parts fed by conductors of different polarity, the protective device must disconnect within times specified in Table 41.1 to prevent hazardous voltages.',
  },
  {
    number: 'Reg 642.3',
    title: 'Inspection Requirements',
    description: 'Accessories such as sockets and switches must be connected with correct polarity and secure terminations to prevent overheating and maintain safety under normal and fault conditions.',
  },
  {
    number: 'Reg 710.511.1',
    title: 'Lampholder Requirements',
    description: 'Requirements for bayonet lampholders (BS EN 61184:2017) covering mechanical retention, insulation and safe connection practices. Line conductor must connect to centre contact.',
  },
  {
    number: 'Reg 413.1.3',
    title: 'CPC to Accessories',
    description: 'A circuit protective conductor must be run to and terminated at each wiring point and accessory, except lampholders that have no exposed-conductive-parts and are suspended from such points.',
  },
];

const otherStandards = [
  { standard: 'IET Guidance Note 3', detail: 'Inspection & Testing — covers polarity testing procedures, acceptable methods, and recording requirements for certificates.' },
  { standard: 'GS38', detail: 'HSE guidance on electrical test equipment. Sets requirements for probe tips, fusing, and finger guards when live testing polarity.' },
  { standard: 'Electricity at Work Regulations 1989', detail: 'Regulation 4 — systems must be constructed and maintained to prevent danger. Incorrect polarity breaches this requirement.' },
  { standard: 'Building Regulations Part P', detail: 'Electrical safety in dwellings. Polarity verification is mandatory for Part P notification and self-certification.' },
];

const certificationRequirements = [
  { cert: 'Electrical Installation Certificate (EIC)', requirement: 'Polarity must be verified on every circuit and results recorded on the Schedule of Test Results. Column reference: polarity.' },
  { cert: 'Electrical Installation Condition Report (EICR)', requirement: 'Polarity is checked during periodic inspection. Incorrect polarity is coded C1 (danger present) requiring immediate remedial action.' },
  { cert: 'Minor Works Certificate', requirement: 'Polarity verification required for all minor works. Results recorded on the certificate test results section.' },
];

const PolarityRegulationsCard = ({ onBack }: Props) => {
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

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {/* BS 7671 Core */}
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

        {/* Other Standards */}
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

        {/* Certification */}
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

        {/* EICR Coding */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">EICR Observation Coding</p>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-red-400/20 border border-red-400/30 px-2 py-1">
                  <span className="text-xs font-bold text-red-400">C1</span>
                </div>
                <p className="text-sm text-white"><span className="font-medium">Danger present.</span> Reversed polarity at socket outlets or switches — immediate risk of electric shock. Requires urgent remedial action.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-orange-400/20 border border-orange-400/30 px-2 py-1">
                  <span className="text-xs font-bold text-orange-400">C2</span>
                </div>
                <p className="text-sm text-white"><span className="font-medium">Potentially dangerous.</span> Polarity issues on circuits with reduced risk (e.g., dedicated equipment circuits) — requires remedial action.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Professional standards */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Professional Standards</p>
        </motion.div>

        {[
          { body: 'Competent Person Schemes (NICEIC, NAPIT, ELECSA)', detail: 'Polarity verification is a mandatory test for all scheme-registered work. Failure to test invalidates self-certification under Part P.' },
          { body: 'City & Guilds 2391', detail: 'Inspection and Testing qualification. Polarity testing is examined in both the practical assessment and written paper. Candidates must demonstrate correct dead and live testing methods.' },
          { body: 'IET Code of Practice', detail: 'Professional competence standards require polarity testing as part of the standard test sequence. Results must be recorded and retained for the required period.' },
          { body: 'Health and Safety at Work Act 1974', detail: 'Duty of care requirements. An employer or self-employed person who fails to verify polarity may be liable for injuries caused by incorrect wiring.' },
        ].map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-sm font-semibold text-white">{item.body}</p>
              <p className="text-sm text-white mt-1 leading-relaxed">{item.detail}</p>
            </div>
          </motion.div>
        ))}

        {/* Special locations */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Special Locations</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
            <p className="text-sm text-white leading-relaxed">
              Polarity testing is specifically required in commissioning tests for special locations under Part 7 of BS 7671:
            </p>
            <div className="space-y-1.5">
              {[
                'Bathrooms and shower rooms (Reg 701) — polarity critical for zone-dependent circuits',
                'Swimming pools and fountains (Reg 702) — SELV/PELV systems require correct polarity for transformer connections',
                'Medical locations (Reg 710) — incorrect polarity on patient-care circuits is a life-safety issue',
                'EV charging installations (Reg 722) — polarity verification mandatory before first use',
                'Shore connections for boats (Reg 709) — polarity confirmed during commissioning tests',
                'Temporary installations at events (Reg 740) — polarity checked at all outlet positions',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PolarityRegulationsCard;
