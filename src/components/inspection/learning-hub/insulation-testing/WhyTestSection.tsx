import { ArrowLeft, Zap, Flame, Shield, AlertTriangle } from 'lucide-react';
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
    title: 'Electric Shock Prevention',
    description: 'Insulation separates live conductors from exposed metalwork and the user. When insulation breaks down, current leaks to earth or to parts that can be touched — creating a direct shock hazard. IR testing detects this before it causes injury.',
  },
  {
    icon: Flame,
    title: 'Fire Prevention',
    description: 'Deteriorated insulation allows leakage current to flow through unintended paths. This generates heat at the point of breakdown, which can ignite surrounding materials. Electrical fires from insulation failure are a leading cause of fire in buildings.',
  },
  {
    icon: Shield,
    title: 'Equipment Protection',
    description: 'Low insulation resistance causes erratic equipment behaviour, nuisance RCD tripping, and premature failure of motors, drives and control gear. Early detection through IR testing prevents expensive equipment damage.',
  },
  {
    icon: AlertTriangle,
    title: 'Deterioration Monitoring',
    description: 'Insulation degrades over time from heat, moisture, UV exposure, chemical contamination, and mechanical damage. Periodic IR testing reveals this deterioration trend — falling readings over successive inspections indicate a circuit approaching failure.',
  },
];

const causes = [
  { cause: 'Moisture ingress', detail: 'Water in junction boxes, conduit or cable glands dramatically reduces IR. Common in basements, bathrooms, and outdoor installations. Can cause readings to drop from >999MΩ to <1MΩ overnight.' },
  { cause: 'Mechanical damage', detail: 'Cables damaged by drilling, nailing, rodent attack, or crushing during building work. Even a small nick in the sheath can expose the conductor and cause low IR readings.' },
  { cause: 'Thermal degradation', detail: 'Prolonged overloading heats conductors beyond their rating, causing PVC insulation to become brittle and crack. Common at terminations and in overcrowded trunking.' },
  { cause: 'Chemical contamination', detail: 'Oil, solvents, plaster dust, and cleaning chemicals attack insulation materials. Industrial environments and kitchens are high-risk areas.' },
  { cause: 'Age-related breakdown', detail: 'PVC insulation has a typical service life of 25-40 years. Rubber and TRS cables in older installations may have much shorter lives. Insulation becomes hard, brittle, and cracked with age.' },
  { cause: 'UV exposure', detail: 'Cables exposed to sunlight (e.g., surface-mounted in conservatories or on external walls) suffer UV degradation of the outer sheath and insulation.' },
];

const realWorldExamples = [
  {
    title: 'Kitchen Ring — Moisture in Junction Box',
    fault: 'IR reading of 0.3MΩ between neutral and earth on kitchen ring circuit',
    consequence: 'RCD tripping intermittently. Investigation found condensation inside a junction box behind the dishwasher where steam had been entering through a loose gland.',
    resolution: 'Dried and re-sealed junction box, replaced damaged cable section. Re-tested at >200MΩ.',
  },
  {
    title: 'Lighting Circuit — Drill Damage',
    fault: 'IR reading of 0MΩ (dead short) between live and earth on first-floor lighting circuit',
    consequence: 'MCB tripping immediately on energisation. Cable had been drilled through during shelf installation — brown and green/yellow conductors in contact.',
    resolution: 'Located damage, isolated section, replaced cable. Re-tested at >999MΩ.',
  },
  {
    title: 'Periodic Inspection — Aged TRS Cables',
    fault: 'IR readings declining over successive inspections: 50MΩ (2015) → 8MΩ (2020) → 1.2MΩ (2025)',
    consequence: 'Original 1960s TRS (tough rubber sheath) cables showing progressive insulation breakdown. Still above 1MΩ minimum but trending towards failure.',
    resolution: 'Recommended full rewire. Client agreed to phased replacement starting with highest-risk circuits.',
  },
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
            <h1 className="text-base font-semibold text-white">Why Test IR?</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Insulation resistance (IR) testing applies a DC voltage between conductors to measure how effectively the insulation prevents current leakage. It detects deterioration, damage and contamination that could cause electric shock, fire, or equipment failure.
            </p>
          </div>
        </motion.div>

        {/* Core regulations */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4 space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-yellow-400 bg-yellow-400/20 px-2 py-0.5 rounded-lg">Reg 612.3</span>
              </div>
              <p className="text-sm text-white leading-relaxed">
                Insulation resistance shall be measured between live conductors and between live conductors and the protective conductor connected to earth. The test shall be carried out with the installation isolated from the supply.
              </p>
            </div>
            <div className="border-t border-yellow-400/20 pt-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-yellow-400 bg-yellow-400/20 px-2 py-0.5 rounded-lg">Reg 643.3</span>
              </div>
              <p className="text-sm text-white leading-relaxed">
                Initial insulation resistance measurements must be taken prior to energisation of new installations using appropriate test voltages. Minimum acceptable value for final circuits up to 500V is 1.0MΩ at 500V DC test voltage.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hazards */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">What IR Testing Prevents</p>
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

        {/* Causes of low IR */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">What Causes Low Insulation Resistance</p>
        </motion.div>

        {causes.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-sm font-semibold text-white">{item.cause}</p>
              <p className="text-sm text-white/80 mt-1 leading-relaxed">{item.detail}</p>
            </div>
          </motion.div>
        ))}

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
                    <p className="text-xs font-medium text-white/60">Finding</p>
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
                    <span className="text-xs font-bold text-green-400">R</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60">Resolution</p>
                    <p className="text-sm text-white">{example.resolution}</p>
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
