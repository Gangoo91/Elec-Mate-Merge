import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const minValues = [
  ['SELV / PELV (≤50V)', '250V DC', '0.5 MΩ'],
  ['LV up to 500V (most circuits)', '500V DC', '1.0 MΩ'],
  ['LV 500V to 1000V', '1000V DC', '1.0 MΩ'],
];

const tempCorrection = [
  ['0', '4.44', 'Very cold — IR reads much higher than at 20°C'],
  ['5', '2.11', 'Cold winter'],
  ['10', '1.40', 'Cool indoor'],
  ['15', '1.18', ''],
  ['20', '1.00', 'Reference temperature — no correction needed'],
  ['25', '0.85', 'Warm day'],
  ['30', '0.72', 'Hot environment'],
  ['35', '0.61', 'Plant room'],
  ['40', '0.52', 'Enclosed space, direct sun'],
];

const InsulationTablesSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">IR Tables</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {/* Quick reference */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Quick Reference</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-3 text-center">
              <p className="text-xs text-white">New installation</p>
              <p className="text-lg font-bold text-white">&gt;200MΩ</p>
              <p className="text-xs text-green-400">Excellent</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-3 text-center">
              <p className="text-xs text-white">Existing (good)</p>
              <p className="text-lg font-bold text-white">2-200MΩ</p>
              <p className="text-xs text-yellow-400">Acceptable</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-3 text-center">
              <p className="text-xs text-white">Investigate</p>
              <p className="text-lg font-bold text-white">&lt;1MΩ</p>
              <p className="text-xs text-red-400">Below minimum</p>
            </div>
          </div>
        </motion.div>

        {/* BS 7671 minimum values */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">BS 7671 Minimum Values — Table 61</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left p-3 text-xs font-semibold text-white">Circuit Voltage</th>
                    <th className="text-left p-3 text-xs font-semibold text-white">Test Voltage</th>
                    <th className="text-left p-3 text-xs font-semibold text-yellow-400">Min IR</th>
                  </tr>
                </thead>
                <tbody>
                  {minValues.map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04]">
                      <td className="p-3 text-white text-xs">{row[0]}</td>
                      <td className="p-3 text-white">{row[1]}</td>
                      <td className="p-3 text-yellow-400 font-semibold">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Important notes */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
            <p className="text-sm font-semibold text-white">Important Notes</p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">The 1MΩ minimum is <span className="font-semibold">per circuit</span> — not the whole installation. Each circuit must individually meet the minimum.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">If the whole installation is tested together (all circuits in parallel), the combined IR may be lower than any individual circuit. Always test circuits individually if the combined reading is below 2MΩ.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">Apply the test voltage for a <span className="font-semibold">minimum of 1 minute</span>. The reading must be stable for the final 15 seconds.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">A reading of exactly 1MΩ is a <span className="font-semibold">borderline pass</span> — investigate the cause even though it technically meets the minimum.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Temperature correction */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Temperature Correction Factors</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 mb-3">
            <p className="text-sm text-white leading-relaxed">
              Insulation resistance <span className="font-semibold">decreases</span> as temperature increases (opposite to conductor resistance). BS 7671 values are referenced to 20°C. If testing in cold conditions, the reading will be artificially high — apply the correction factor to see the true 20°C value.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/[0.06]">
              <p className="text-sm font-semibold text-white">IR corrected = IR measured × correction factor</p>
              <p className="text-xs text-white mt-0.5">Multiply your reading by the factor to get the equivalent value at 20°C</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left p-3 text-xs font-semibold text-white">Temp (°C)</th>
                    <th className="text-left p-3 text-xs font-semibold text-yellow-400">Factor</th>
                    <th className="text-left p-3 text-xs font-semibold text-white">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {tempCorrection.map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04]">
                      <td className="p-3 text-white font-medium">{row[0]}°C</td>
                      <td className="p-3 text-yellow-400 font-semibold">{row[1]}</td>
                      <td className="p-3 text-white text-xs">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Worked example */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Worked Example</p>
            <p className="text-sm text-white leading-relaxed">
              Measured IR = 2.5MΩ at 5°C ambient. Correction factor at 5°C = 2.11.
            </p>
            <p className="text-sm text-white mt-2">
              IR at 20°C = 2.5 × <span className="font-semibold text-orange-400">0.475</span> (reciprocal of 2.11) = <span className="font-semibold text-yellow-400">1.19MΩ</span>
            </p>
            <p className="text-sm text-white mt-2">
              This circuit passes (≥1MΩ) but only just. At 20°C the reading would be significantly lower than the 2.5MΩ measured in cold conditions. Flag for monitoring at next inspection.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InsulationTablesSection;
