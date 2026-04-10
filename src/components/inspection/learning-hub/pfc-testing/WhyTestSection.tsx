import { ArrowLeft, Shield, Zap, Flame, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const hazards = [
  { icon: Shield, title: 'Automatic Disconnection Verification', description: 'PFC confirms that enough fault current is available to trip protective devices within the required time. Without adequate PFC, an MCB may take seconds or minutes to trip instead of milliseconds — leaving dangerous voltages present on exposed metalwork.' },
  { icon: Zap, title: 'Breaking Capacity Verification', description: 'Every protective device has a rated breaking capacity — the maximum fault current it can safely interrupt. If the PFC exceeds this rating, the device could fail catastrophically during a fault, causing an arc flash, fire, or explosion.' },
  { icon: Flame, title: 'Fire Prevention', description: 'Sustained fault currents cause arcing and extreme heating at the fault point. If the protective device is too slow to operate (due to inadequate PFC), the fault energy can ignite surrounding materials. PFC testing confirms faults will be cleared quickly.' },
  { icon: AlertTriangle, title: 'Conductor Protection', description: 'Conductors must be able to carry the prospective fault current without exceeding their thermal limits. Reg 131.5 requires verification that conductors will survive the fault until the protective device disconnects. PFC testing provides the data for this calculation.' },
];

const whatIsPfc = [
  { term: 'Prospective Fault Current (Ipf)', definition: 'The maximum current that would flow at a given point in the installation during a fault of negligible impedance. It is determined by the supply characteristics and the impedance of the circuit up to the fault point.' },
  { term: 'Phase-Earth PFC', definition: 'The fault current that would flow during an earth fault — line to earth via the CPC. This is the critical value for ADS verification. Usually lower than phase-neutral PFC.' },
  { term: 'Phase-Neutral PFC', definition: 'The fault current that would flow during a short circuit between phase and neutral. Usually higher than phase-earth PFC. Important for discrimination and breaking capacity assessment.' },
  { term: 'Record the higher value', definition: 'BS 7671 requires the greater of phase-earth and phase-neutral PFC to be recorded on the certificate. This is the value the protective device must be rated to interrupt safely.' },
];

const mcbOperationZones = [
  { zone: 'Thermal Zone (1-3× In)', time: '1-60 minutes', description: 'Overload protection only. The MCB heats up slowly and eventually trips. Far too slow for fault protection — a person could be in contact with a live fault for minutes.' },
  { zone: 'Magnetic Zone (>5× In for Type B)', time: '<0.1 seconds', description: 'Instantaneous fault protection. The magnetic coil trips the MCB within milliseconds. This is what PFC testing verifies — that enough fault current exists to reach this zone.' },
];

const realWorldExamples = [
  { title: 'Kitchen Ring — Adequate PFC', finding: 'Measured PFC: 420A (L-E). 32A Type B MCB requires minimum 160A for magnetic trip.', outcome: 'Safety margin: 420/160 = 2.6×. MCB will trip magnetically in <0.1s during a fault. Satisfactory.', result: 'PASS' },
  { title: 'Long Radial — Marginal PFC', finding: 'Measured PFC: 110A (L-E). 20A Type B MCB requires minimum 100A for magnetic trip.', outcome: 'Safety margin: 110/100 = 1.1×. Barely adequate — MCB may operate in thermal-magnetic transition zone. Flag for monitoring. Consider reducing MCB rating to 16A (minimum 80A required).', result: 'MARGINAL' },
  { title: 'Outbuilding on TT — Inadequate PFC', finding: 'Measured PFC: 15A (L-E). 20A Type B MCB requires minimum 100A for magnetic trip.', outcome: 'PFC far too low for MCB magnetic operation. However, 30mA RCD provides earth fault protection independently of PFC. The RCD is the primary protection in this TT system.', result: 'RCD REQUIRED' },
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
            <h1 className="text-base font-semibold text-white">Why Test PFC?</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Prospective Fault Current testing measures the maximum current that would flow during a fault. This confirms two critical things: that protective devices will trip fast enough to prevent electric shock, and that they have adequate breaking capacity to safely interrupt the fault without failing.
            </p>
          </div>
        </motion.div>

        {/* What is PFC */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">What Is PFC?</p>
        </motion.div>

        {whatIsPfc.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-sm font-semibold text-white">{item.term}</p>
              <p className="text-sm text-white/80 mt-1 leading-relaxed">{item.definition}</p>
            </div>
          </motion.div>
        ))}

        {/* Key formula */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-3">The Key Formula</p>
            <div className="rounded-xl bg-white/[0.05] p-4 text-center mb-3">
              <p className="text-lg font-bold text-white">Ipf = U₀ ÷ Zs</p>
              <p className="text-xs text-white/60 mt-2">Prospective fault current = Supply voltage ÷ Loop impedance</p>
            </div>
            <p className="text-sm text-white leading-relaxed">
              Lower impedance = higher fault current = faster disconnection. The relationship between PFC and Zs is inverse — they test the same thing from different angles. High Zs means low PFC, and vice versa.
            </p>
          </div>
        </motion.div>

        {/* Why it matters */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Why It Matters</p>
        </motion.div>

        {hazards.map((h, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <h.icon className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{h.title}</p>
                  <p className="text-sm text-white mt-1 leading-relaxed">{h.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* MCB operation zones */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">MCB Operation — Why PFC Determines Trip Speed</p>
        </motion.div>

        {mcbOperationZones.map((zone, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-white">{zone.zone}</p>
                <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-lg">{zone.time}</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">{zone.description}</p>
            </div>
          </motion.div>
        ))}

        {/* Real-world examples */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Real-World Examples</p>
        </motion.div>

        {realWorldExamples.map((ex, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{ex.title}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${ex.result === 'PASS' ? 'text-green-400 bg-green-400/10' : ex.result === 'MARGINAL' ? 'text-yellow-400 bg-yellow-400/10' : 'text-orange-400 bg-orange-400/10'}`}>{ex.result}</span>
              </div>
              <p className="text-sm text-white">{ex.finding}</p>
              <p className="text-sm text-white/70">{ex.outcome}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WhyTestSection;
