import { ArrowLeft, AlertTriangle, Zap, ShieldAlert, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const hazards = [
  {
    icon: Zap,
    title: 'Electric Shock Risk',
    description: 'Reversed polarity can energise parts that should be safe to touch. A socket outlet with phase and neutral reversed means equipment casings could become live during a fault.',
  },
  {
    icon: ShieldAlert,
    title: 'Protection Failure',
    description: 'Single-pole switches and fuses must interrupt the line conductor. If connected in the neutral instead, the circuit remains live even when switched off — creating a hidden danger.',
  },
  {
    icon: Lightbulb,
    title: 'Lampholder Hazards',
    description: 'Edison screw lampholders with reversed polarity have the outer threaded shell permanently live. Anyone changing a bulb could receive a fatal shock by touching the thread.',
  },
  {
    icon: AlertTriangle,
    title: 'Equipment Damage',
    description: 'Some equipment relies on correct phase identification to operate safely. Reversed polarity can cause malfunction, damage, or create fire risks in sensitive installations.',
  },
];

const realWorldExamples = [
  {
    title: 'Domestic Socket — Reversed L/N',
    fault: 'Phase and neutral swapped at socket terminals',
    consequence: 'Appliance switch breaks neutral only — metal casing remains live during fault. User receives shock touching toaster body.',
    detection: 'Dead test with continuity tester between line at board and socket line terminal shows no reading. Phase found on neutral terminal.',
  },
  {
    title: 'Lighting Circuit — Neutral Switching',
    fault: 'Two-way switch wired with neutral as common instead of line',
    consequence: 'Lamp appears off but lampholder centre contact remains permanently live at 230V. Electrician receives shock when replacing lamp.',
    detection: 'Continuity test from line at board to switch common shows open circuit. Line found on lamp terminal instead.',
  },
  {
    title: 'Fused Spur — Fuse in Neutral',
    fault: 'Fused connection unit wired with fuse in neutral conductor',
    consequence: 'Fuse blows on neutral but circuit remains energised via line. No overcurrent protection on the live conductor.',
    detection: 'Polarity test reveals continuity between board line and spur load terminal bypassing the fuse.',
  },
];

const WhyTestSection = ({ onBack }: Props) => {
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
            <h1 className="text-base font-semibold text-white">Why Test Polarity?</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {/* Key point */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Polarity testing confirms that line, neutral and earth conductors are connected to the correct terminals throughout the installation. It ensures single-pole devices interrupt the line conductor only, as required by BS 7671.
            </p>
          </div>
        </motion.div>

        {/* Hazards */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">What Can Go Wrong</p>
        </motion.div>

        {hazards.map((hazard, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <hazard.icon className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{hazard.title}</p>
                  <p className="text-sm text-white mt-1 leading-relaxed">{hazard.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Core regulation requirements */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">The Regulations</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-yellow-400 bg-yellow-400/20 px-2 py-0.5 rounded-lg">Reg 612.6</span>
              </div>
              <p className="text-sm text-white leading-relaxed">
                A polarity test shall be made to verify that single-pole devices for protection or switching are connected in the line conductor only. This applies to every circuit in the installation.
              </p>
            </div>

            <div className="border-t border-yellow-400/20 pt-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-yellow-400 bg-yellow-400/20 px-2 py-0.5 rounded-lg">Reg 133.2</span>
              </div>
              <p className="text-sm text-white leading-relaxed">
                Insert single-pole fuses, switches or circuit-breakers only in the line conductor. Avoid insertion in neutral except where fully linked to break all related line conductors simultaneously.
              </p>
            </div>

            <div className="border-t border-yellow-400/20 pt-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-yellow-400 bg-yellow-400/20 px-2 py-0.5 rounded-lg">Reg 463.1.2</span>
              </div>
              <p className="text-sm text-white leading-relaxed">
                In domestic lighting circuits, a single-pole switching device must not be placed in the neutral conductor. Switches must interrupt the live conductor to avoid switched-neutral hazards.
              </p>
            </div>

            <div className="border-t border-yellow-400/20 pt-3">
              <p className="text-sm text-white leading-relaxed">
                Incorrect polarity is coded as a <span className="font-semibold text-orange-400">C1 — Danger present</span> observation on an EICR, requiring immediate remedial action. It applies to all new installations (EIC) and periodic inspections.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Acceptance criteria from RAG */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm font-semibold text-white mb-2">Acceptance Criteria</p>
            <p className="text-sm text-white leading-relaxed">
              The acceptance standard is straightforward: <span className="font-semibold">correct L, N, E connections at all terminations</span> with no reversals. There is no tolerance — polarity is either correct or it is not. Any reversal must be rectified before the installation can be certified.
            </p>
          </div>
        </motion.div>

        {/* Real-world examples */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Real-World Examples</p>
        </motion.div>

        {realWorldExamples.map((example, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
              <p className="text-sm font-semibold text-white">{example.title}</p>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-yellow-400">F</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60">Fault</p>
                    <p className="text-sm text-white">{example.fault}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-orange-400">C</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60">Consequence</p>
                    <p className="text-sm text-white">{example.consequence}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-green-400">D</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60">Detection</p>
                    <p className="text-sm text-white">{example.detection}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WhyTestSection;
