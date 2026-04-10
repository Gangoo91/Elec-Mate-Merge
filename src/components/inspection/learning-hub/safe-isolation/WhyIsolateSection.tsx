import { ArrowLeft, Heart, Shield, Zap, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const reasons = [
  { icon: Heart, title: 'Prevention of Fatal Electric Shock', description: 'The human heart can be stopped by currents as low as 50mA. Muscular control is lost at 10-20mA, preventing the victim from releasing their grip. Safe isolation removes the energy source entirely — eliminating the risk before work begins.' },
  { icon: Zap, title: 'Protection Against Arc Flash', description: 'Electrical arcs can reach temperatures of 19,000°C — hotter than the surface of the sun. They cause severe burns, blindness, and hearing damage. Even a brief arc from a loose connection during live work can cause life-changing injuries.' },
  { icon: Shield, title: 'Legal Duty of Care', description: 'The Electricity at Work Regulations 1989 (Reg 14) require that no person shall be engaged in work on or near a live conductor unless it is dead, or it is unreasonable to make it dead, AND suitable precautions are taken. Safe isolation fulfils this legal duty.' },
  { icon: AlertTriangle, title: 'Protection of Others', description: 'Your isolation protects not just you but everyone on site — colleagues, other trades, building occupants. Poor isolation can lead to someone else unknowingly contacting a live circuit you assumed was dead.' },
];

const fatalErrors = [
  { error: 'Assuming a circuit is dead because the switch is off', consequence: 'Switches can fail mechanically, leaving contacts closed despite the handle being OFF. Multi-feed installations may have alternative supply paths. ALWAYS prove dead — never assume.' },
  { error: 'Using a non-contact voltage detector as the primary test', consequence: 'NCVDs are screening tools only — they cannot be used to prove dead. They miss DC voltages, shielded cables, and low voltages. Only a direct-contact voltage indicator can prove dead.' },
  { error: 'Not locking off the isolation point', consequence: 'Someone else can switch the circuit back on while you are working. Lock-off devices physically prevent this. Without a lock, you are relying on luck.' },
  { error: 'Testing at the wrong point', consequence: 'Proving dead at the board does not prove dead at the point of work. The circuit may be fed from multiple sources, or there may be stored energy in capacitors.' },
  { error: 'Not proving the tester before AND after', consequence: 'A faulty voltage indicator will show "dead" on a live circuit. Proving on a known live source before AND after confirms the tester was working throughout your test.' },
];

const WhyIsolateSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Why Isolate?</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Safe isolation is the single most important procedure in electrical work. It must be carried out before ANY work on or near electrical circuits. There are no shortcuts and no exceptions — every time, every circuit, every job.
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
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Fatal Errors — What Gets People Killed</p>
        </motion.div>

        {fatalErrors.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
              <p className="text-sm font-semibold text-white">{item.error}</p>
              <div className="rounded-xl bg-orange-400/5 border border-orange-400/10 p-3">
                <p className="text-sm text-white">{item.consequence}</p>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-red-400/10 border border-red-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">HSE Statistics</p>
            <p className="text-sm text-white leading-relaxed">
              Electrical accidents account for approximately 1,000 injuries at work each year in the UK, including around 30 fatalities. The majority involve contact with live conductors that the worker believed to be dead. Almost all of these are preventable through correct safe isolation procedure.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhyIsolateSection;
