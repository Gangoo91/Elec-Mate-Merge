import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const typeBMcb = [['6', '30'], ['10', '50'], ['16', '80'], ['20', '100'], ['25', '125'], ['32', '160'], ['40', '200'], ['50', '250'], ['63', '315']];
const typeCMcb = [['6', '60'], ['10', '100'], ['16', '160'], ['20', '200'], ['25', '250'], ['32', '320'], ['40', '400'], ['50', '500'], ['63', '630']];
const typeDMcb = [['6', '120'], ['10', '200'], ['16', '320'], ['20', '400'], ['25', '500'], ['32', '640'], ['40', '800'], ['50', '1000'], ['63', '1260']];
const bs88Fuse = [['6', '43'], ['10', '72'], ['16', '115'], ['20', '144'], ['25', '180'], ['32', '230'], ['40', '288'], ['50', '360'], ['63', '454']];
const bs1361Fuse = [['5', '23'], ['15', '69'], ['20', '92'], ['30', '138'], ['45', '207'], ['60', '276'], ['80', '368'], ['100', '460']];

const PfcTable = ({ title, subtitle, rows, multiplier }: { title: string; subtitle: string; rows: string[][]; multiplier: string }) => (
  <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
    <div className="p-4 border-b border-white/[0.06]">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="text-xs text-white mt-0.5">{subtitle} — Magnetic trip at {multiplier}</p>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.08]">
            <th className="text-left p-3 text-xs font-semibold text-white">Rating (A)</th>
            <th className="text-left p-3 text-xs font-semibold text-yellow-400">Min PFC (A)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/[0.04]">
              <td className="p-3 text-white font-medium">{row[0]}</td>
              <td className="p-3 text-yellow-400 font-semibold">{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PfcTablesSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">PFC Tables</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {/* Quick reference */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Quick Reference — Common Domestic Circuits</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-xs text-white">Lighting (6A Type B)</p>
              <p className="text-lg font-bold text-white">30A</p>
              <p className="text-xs text-yellow-400">minimum PFC</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-xs text-white">Ring Main (32A Type B)</p>
              <p className="text-lg font-bold text-white">160A</p>
              <p className="text-xs text-yellow-400">minimum PFC</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-xs text-white">Shower (40A Type B)</p>
              <p className="text-lg font-bold text-white">200A</p>
              <p className="text-xs text-yellow-400">minimum PFC</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-xs text-white">Cooker (32A Type C)</p>
              <p className="text-lg font-bold text-white">320A</p>
              <p className="text-xs text-yellow-400">minimum PFC</p>
            </div>
          </div>
        </motion.div>

        {/* Explanation */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Understanding These Values</p>
            <p className="text-sm text-white leading-relaxed">
              These are the <span className="font-semibold">minimum fault currents</span> required for the MCB to trip magnetically (instantaneously). If the measured PFC is below these values, the MCB will operate in its thermal zone — taking seconds or minutes instead of milliseconds. The PFC must also not exceed the device's <span className="font-semibold">breaking capacity</span> (typically 6kA or 10kA for domestic MCBs).
            </p>
          </div>
        </motion.div>

        {/* MCB Tables */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">MCB Minimum PFC for Magnetic Operation</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <PfcTable title="Type B MCBs" subtitle="Most common domestic type" rows={typeBMcb} multiplier="5× In" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <PfcTable title="Type C MCBs" subtitle="Motor starting, commercial" rows={typeCMcb} multiplier="10× In" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <PfcTable title="Type D MCBs" subtitle="High inrush loads, transformers" rows={typeDMcb} multiplier="20× In" />
        </motion.div>

        {/* Fuse tables */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Fuse Minimum PFC (0.4s Disconnection)</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <PfcTable title="BS 88-3 Fuses" subtitle="Industrial cartridge fuses" rows={bs88Fuse} multiplier="~7.2× In" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <PfcTable title="BS 1361 Fuses" subtitle="Consumer unit cartridge fuses" rows={bs1361Fuse} multiplier="~4.6× In" />
        </motion.div>

        {/* Assessment guide */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Assessment Guide</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-3">
              <p className="text-xs text-green-400 font-semibold">Excellent</p>
              <p className="text-sm font-bold text-white">&gt;10× min</p>
              <p className="text-[10px] text-white mt-1">Large safety margin. Future-proof.</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-3">
              <p className="text-xs text-yellow-400 font-semibold">Acceptable</p>
              <p className="text-sm font-bold text-white">2-10× min</p>
              <p className="text-[10px] text-white mt-1">Meets BS 7671. Monitor.</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-3">
              <p className="text-xs text-red-400 font-semibold">Investigate</p>
              <p className="text-sm font-bold text-white">&lt;2× min</p>
              <p className="text-[10px] text-white mt-1">Marginal. Remedial action.</p>
            </div>
          </div>
        </motion.div>

        {/* Breaking capacity */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Breaking Capacity — The Upper Limit</p>
            <p className="text-sm text-white leading-relaxed mb-3">
              While PFC must exceed the minimum for magnetic trip, it must NOT exceed the device's breaking capacity. If PFC &gt; breaking capacity, the device will fail catastrophically during a fault.
            </p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">Domestic MCBs: typically 6kA (6,000A) — adequate for most domestic supplies</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">Enhanced MCBs: 10kA — for installations close to transformers or with high PFC</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">Commercial/industrial: 10-25kA MCCBs — for high fault level installations</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PfcTablesSection;
