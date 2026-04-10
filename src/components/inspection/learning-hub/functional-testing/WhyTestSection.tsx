import { ArrowLeft, Shield, Settings, AlertTriangle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const reasons = [
  { icon: Shield, title: 'Safety System Verification', description: 'Electrical tests prove the wiring is correct. Functional tests prove the equipment actually works. An emergency stop that passes all electrical tests but has a seized button provides no protection. Functional testing catches these real-world failures.' },
  { icon: Settings, title: 'Operational Confirmation', description: 'Every switch must switch, every isolator must isolate, every interlock must prevent access. Functional testing verifies that the installed equipment performs its intended function — not just that it is electrically connected correctly.' },
  { icon: AlertTriangle, title: 'Defect Detection', description: 'Mechanical faults, stiff controls, incorrect adjustment, mis-wired control circuits, and failed indicator lamps are only discovered through functional testing. These defects are invisible to electrical measurement but can have serious safety consequences.' },
  { icon: Zap, title: 'Handover Confidence', description: 'Functional testing provides evidence that the installation works as designed before handover to the client. It protects you professionally — demonstrating that everything was working when you signed it off.' },
];

const whatItCovers = [
  'Switching devices — all switches, isolators, and disconnectors operate correctly',
  'Protective devices — MCBs, RCDs, fuses trip and reset as expected',
  'Control equipment — contactors, relays, timers, and programmable devices function correctly',
  'Interlocks — mechanical and electrical interlocks prevent unsafe access or operation',
  'Emergency systems — emergency stops, fire alarm interfaces, emergency lighting changeover',
  'Indicating devices — neon indicators, pilot lamps, and status displays show correct state',
  'Motorised equipment — motors rotate in the correct direction, overloads function',
  'Heating controls — thermostats, timers, and zone valves respond correctly',
];

const WhyTestSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Why Test?</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Functional testing is the final step in the verification sequence. After all dead tests (continuity, IR, polarity) and live tests (Zs, PFC, RCD) are complete, functional testing confirms that every assembly, component and control system actually works as intended when operated by the user.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-yellow-400 bg-yellow-400/20 px-2 py-0.5 rounded-lg">Reg 612.13</span>
            </div>
            <p className="text-sm text-white leading-relaxed">
              "Assemblies, including switchgear and controlgear assemblies, and components of the electrical installation shall be subjected to a functional test to show that they are properly mounted, adjusted and installed in accordance with BS 7671."
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Why It Matters</p>
        </motion.div>

        {reasons.map((r, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <r.icon className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{r.title}</p>
                  <p className="text-sm text-white mt-1 leading-relaxed">{r.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">What Functional Testing Covers</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <div className="space-y-1.5">
              {whatItCovers.map((item, i) => (
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

export default WhyTestSection;
