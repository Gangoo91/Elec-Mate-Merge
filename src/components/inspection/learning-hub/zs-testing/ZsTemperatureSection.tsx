import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const correctionFactors = [
  ['10', '1.00', 'Reference temperature'],
  ['15', '1.02', ''],
  ['20', '1.04', 'Typical indoor'],
  ['25', '1.06', 'Warm day'],
  ['30', '1.08', 'Hot environment'],
  ['35', '1.10', 'Plant room'],
  ['40', '1.12', 'Enclosed space'],
];

const workedExamples = [
  {
    title: '32A Type B MCB — Kitchen Ring',
    measured: '1.05',
    temp: '20',
    maxBs: '1.37',
    eightyPercent: '1.09',
    corrected: '1.05 × 1.04 = 1.09Ω',
    result: 'PASS',
    explanation: 'Measured 1.05Ω at 20°C. Corrected to 1.09Ω. This equals the 80% limit of 1.09Ω — borderline pass. Record and flag for monitoring at next periodic inspection.',
  },
  {
    title: '40A Type B MCB — Shower Circuit',
    measured: '0.72',
    temp: '25',
    maxBs: '1.09',
    eightyPercent: '0.87',
    corrected: '0.72 × 1.06 = 0.76Ω',
    result: 'PASS',
    explanation: 'Measured 0.72Ω at 25°C (bathroom). Corrected to 0.76Ω. Well within the 80% limit of 0.87Ω. Comfortable margin.',
  },
  {
    title: '16A Type C MCB — Boiler Circuit',
    measured: '1.25',
    temp: '35',
    maxBs: '1.37',
    eightyPercent: '1.09',
    corrected: '1.25 × 1.10 = 1.38Ω',
    result: 'FAIL',
    explanation: 'Measured 1.25Ω at 35°C (plant room). Corrected to 1.38Ω — exceeds BS 7671 maximum of 1.37Ω. Investigation required: check CPC connections and cable sizing.',
  },
];

const ZsTemperatureSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Temperature Correction</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {/* Why correct */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Conductor resistance increases with temperature. You measure Zs at ambient temperature (typically 10-25°C), but during a fault the conductors heat to their maximum operating temperature (70°C for PVC). The corrected Zs predicts what Zs will be under fault conditions.
            </p>
          </div>
        </motion.div>

        {/* Formula */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-3">The Correction Formula</p>
            <div className="rounded-xl bg-white/[0.05] p-4 text-center">
              <p className="text-lg font-bold text-white">Zs(corrected) = Zs(measured) × (230 + 70) ÷ (230 + T)</p>
              <p className="text-xs text-white/60 mt-2">Where T = ambient temperature at time of measurement (°C)</p>
            </div>
            <div className="mt-3 space-y-1.5">
              <p className="text-sm text-white"><span className="font-semibold text-yellow-400">230</span> — inferred zero resistance temperature for copper (°C)</p>
              <p className="text-sm text-white"><span className="font-semibold text-yellow-400">70</span> — maximum conductor operating temperature for PVC insulation (°C)</p>
              <p className="text-sm text-white"><span className="font-semibold text-yellow-400">T</span> — your measured ambient temperature (°C)</p>
            </div>
          </div>
        </motion.div>

        {/* The 80% shortcut */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm font-semibold text-white mb-2">The 80% Shortcut</p>
            <p className="text-sm text-white leading-relaxed mb-3">
              At 20°C ambient, the correction factor is approximately 1.20 (i.e., Zs increases by ~20% from ambient to fault temperature). This is where the "80% rule" comes from:
            </p>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-sm text-white">
                <span className="font-semibold text-yellow-400">80% of BS 7671 max</span> ≈ the maximum measured Zs at ~20°C that will still be within limits at 70°C. If your reading is below 80%, it passes without needing full calculation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Correction factor table */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Correction Factors by Ambient Temperature</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left p-3 text-xs font-semibold text-white/60">Ambient (°C)</th>
                    <th className="text-left p-3 text-xs font-semibold text-white/60">Factor</th>
                    <th className="text-left p-3 text-xs font-semibold text-white/60">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {correctionFactors.map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04]">
                      <td className="p-3 text-white font-medium">{row[0]}°C</td>
                      <td className="p-3 text-yellow-400 font-semibold">{row[1]}</td>
                      <td className="p-3 text-white/60 text-xs">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Worked examples */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Worked Examples</p>
        </motion.div>

        {workedExamples.map((ex, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{ex.title}</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${ex.result === 'PASS' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                  {ex.result}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white/[0.05] p-2.5">
                  <p className="text-xs text-white/60">Measured</p>
                  <p className="text-sm font-semibold text-white">{ex.measured}Ω at {ex.temp}°C</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-2.5">
                  <p className="text-xs text-white/60">Corrected</p>
                  <p className="text-sm font-semibold text-white">{ex.corrected}</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-2.5">
                  <p className="text-xs text-white/60">BS 7671 Max</p>
                  <p className="text-sm text-white">{ex.maxBs}Ω</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-2.5">
                  <p className="text-xs text-white/60">80% Limit</p>
                  <p className="text-sm text-yellow-400 font-semibold">{ex.eightyPercent}Ω</p>
                </div>
              </div>
              <p className="text-sm text-white/80">{ex.explanation}</p>
            </div>
          </motion.div>
        ))}

        {/* Important note */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">When Full Correction Matters</p>
            <p className="text-sm text-white leading-relaxed">
              If your measured Zs is between 80% and 100% of the BS 7671 maximum, apply the full temperature correction formula to determine whether the circuit truly fails. A reading at 85% measured in a cold garage at 5°C may actually pass when properly corrected. Conversely, a reading at 78% in a hot plant room at 40°C might be borderline when corrected.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ZsTemperatureSection;
