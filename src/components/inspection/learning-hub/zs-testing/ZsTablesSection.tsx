import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const typeBValues = [
  ['6', '7.28', '5.82'],
  ['10', '4.37', '3.50'],
  ['16', '2.73', '2.19'],
  ['20', '2.19', '1.75'],
  ['25', '1.75', '1.40'],
  ['32', '1.37', '1.09'],
  ['40', '1.09', '0.87'],
  ['50', '0.87', '0.70'],
];

const typeCValues = [
  ['6', '3.64', '2.91'],
  ['10', '2.19', '1.75'],
  ['16', '1.37', '1.09'],
  ['20', '1.09', '0.87'],
  ['25', '0.87', '0.70'],
  ['32', '0.68', '0.55'],
  ['40', '0.55', '0.44'],
  ['50', '0.44', '0.35'],
];

const typeDValues = [
  ['6', '1.82', '1.46'],
  ['10', '1.09', '0.87'],
  ['16', '0.68', '0.55'],
  ['20', '0.55', '0.44'],
  ['25', '0.44', '0.35'],
  ['32', '0.34', '0.27'],
  ['40', '0.27', '0.22'],
  ['50', '0.22', '0.18'],
];

const fuseValues = [
  ['5', '8.89', '7.11'],
  ['6', '7.42', '5.94'],
  ['10', '4.26', '3.41'],
  ['16', '2.45', '1.96'],
  ['20', '1.77', '1.42'],
  ['25', '1.35', '1.08'],
  ['32', '1.00', '0.80'],
];

const ZsTable = ({ title, subtitle, rows }: { title: string; subtitle: string; rows: string[][] }) => (
  <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
    <div className="p-4 border-b border-white/[0.06]">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="text-xs text-white/60 mt-0.5">{subtitle}</p>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.08]">
            <th className="text-left p-3 text-xs font-semibold text-white/60">Rating (A)</th>
            <th className="text-left p-3 text-xs font-semibold text-white/60">BS 7671 Max (Ω)</th>
            <th className="text-left p-3 text-xs font-semibold text-yellow-400">80% Test Limit (Ω)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/[0.04]">
              <td className="p-3 text-white font-medium">{row[0]}</td>
              <td className="p-3 text-white">{row[1]}</td>
              <td className="p-3 text-yellow-400 font-semibold">{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ZsTablesSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Zs Tables</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {/* 80% Rule Explanation */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">The 80% Rule — Why Two Columns?</p>
            <p className="text-sm text-white leading-relaxed mb-3">
              BS 7671 Appendix 3 states maximum Zs values at <span className="font-semibold">conductor operating temperature (~70°C for PVC)</span>. When you measure on site, conductors are at ambient temperature (~20°C) so resistance is lower. The <span className="font-semibold text-yellow-400">80% test limit</span> accounts for this — your measured Zs must not exceed 80% of the BS 7671 maximum.
            </p>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-sm text-white">
                <span className="font-semibold text-yellow-400">Testing rule:</span> Measured Zs ≤ 80% value = PASS. If your reading is between 80% and 100%, apply full temperature correction to determine compliance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick reference */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Quick Reference — Common Circuits</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-xs text-white/60">Lighting (6A Type B)</p>
              <p className="text-lg font-bold text-white">5.82Ω</p>
              <p className="text-xs text-yellow-400">80% test limit</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-xs text-white/60">Ring Main (32A Type B)</p>
              <p className="text-lg font-bold text-white">1.09Ω</p>
              <p className="text-xs text-yellow-400">80% test limit</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-xs text-white/60">Cooker (32A Type B)</p>
              <p className="text-lg font-bold text-white">1.09Ω</p>
              <p className="text-xs text-yellow-400">80% test limit</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-xs text-white/60">Shower (40A Type B)</p>
              <p className="text-lg font-bold text-white">0.87Ω</p>
              <p className="text-xs text-yellow-400">80% test limit</p>
            </div>
          </div>
        </motion.div>

        {/* Tables */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">MCB Tables — 0.4s Disconnection (Final Circuits)</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ZsTable title="Type B MCBs" subtitle="BS 7671 Table 41.3(a) — Trip at 5× In" rows={typeBValues} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ZsTable title="Type C MCBs" subtitle="BS 7671 Table 41.3(b) — Trip at 10× In" rows={typeCValues} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ZsTable title="Type D MCBs" subtitle="BS 7671 Table 41.3(c) — Trip at 20× In" rows={typeDValues} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">BS 88-3 Fuses — 0.4s Disconnection</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ZsTable title="BS 88-3 Fuses" subtitle="BS 7671 Table 41.2(b)" rows={fuseValues} />
        </motion.div>

        {/* RCD note */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm font-semibold text-white mb-2">RCD-Protected Circuits</p>
            <p className="text-sm text-white leading-relaxed">
              Where circuits are protected by an RCD, the maximum Zs is determined by the RCD operating current, not the MCB. For a 30mA RCD: Zs ≤ 50V ÷ 0.03A = 1667Ω. In practice, any Zs that gives a reading on your tester will be adequate for RCD operation. However, you should still verify the MCB Zs for overcurrent protection compliance.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ZsTablesSection;
