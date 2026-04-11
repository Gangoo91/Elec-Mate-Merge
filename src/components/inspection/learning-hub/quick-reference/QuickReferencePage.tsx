import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.03 } } };
const itemVariants = { hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 0.2 } } };

interface Props { onBack: () => void }

const QuickReferencePage = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-4">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-base font-semibold text-white">Quick Reference</h1>
              <p className="text-[10px] text-white">All key values — one page</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">

        {/* ─── INSULATION RESISTANCE ─── */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="px-4 py-2.5 bg-yellow-400/5 border-b border-white/[0.06]">
              <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Insulation Resistance — Minimum Values</p>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-white/[0.05] p-2.5">
                  <p className="text-[10px] text-white">SELV ≤50V</p>
                  <p className="text-lg font-black text-white">0.5</p>
                  <p className="text-[10px] text-white">MΩ @ 250V</p>
                </div>
                <div className="rounded-xl bg-yellow-400/10 border border-yellow-400/20 p-2.5">
                  <p className="text-[10px] text-white">LV ≤500V</p>
                  <p className="text-lg font-black text-yellow-400">1.0</p>
                  <p className="text-[10px] text-yellow-400">MΩ @ 500V</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-2.5">
                  <p className="text-[10px] text-white">500-1000V</p>
                  <p className="text-lg font-black text-white">1.0</p>
                  <p className="text-[10px] text-white">MΩ @ 1000V</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Zs MAX — Type B ─── */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="px-4 py-2.5 bg-yellow-400/5 border-b border-white/[0.06]">
              <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Zs Maximum — Type B MCBs (80% test limit)</p>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-4 gap-1.5">
                {[['6A', '5.82'], ['10A', '3.50'], ['16A', '2.19'], ['20A', '1.75'], ['25A', '1.40'], ['32A', '1.09'], ['40A', '0.87'], ['50A', '0.70']].map(([rating, zs]) => (
                  <div key={rating} className="rounded-lg bg-white/[0.05] p-2 text-center">
                    <p className="text-[10px] text-white">{rating}</p>
                    <p className="text-sm font-bold text-white">{zs}Ω</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Zs MAX — Type C ─── */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06]">
              <p className="text-xs font-bold text-white uppercase tracking-wider">Zs Maximum — Type C MCBs (80% test limit)</p>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-4 gap-1.5">
                {[['6A', '2.91'], ['10A', '1.75'], ['16A', '1.09'], ['20A', '0.87'], ['25A', '0.70'], ['32A', '0.55'], ['40A', '0.44'], ['50A', '0.35']].map(([rating, zs]) => (
                  <div key={rating} className="rounded-lg bg-white/[0.05] p-2 text-center">
                    <p className="text-[10px] text-white">{rating}</p>
                    <p className="text-sm font-bold text-white">{zs}Ω</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── PFC MINIMUM — Type B ─── */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="px-4 py-2.5 bg-yellow-400/5 border-b border-white/[0.06]">
              <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">PFC Minimum — Type B MCBs (5× In)</p>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-4 gap-1.5">
                {[['6A', '30'], ['10A', '50'], ['16A', '80'], ['20A', '100'], ['25A', '125'], ['32A', '160'], ['40A', '200'], ['50A', '250']].map(([rating, pfc]) => (
                  <div key={rating} className="rounded-lg bg-white/[0.05] p-2 text-center">
                    <p className="text-[10px] text-white">{rating}</p>
                    <p className="text-sm font-bold text-white">{pfc}A</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── RCD TRIP TIMES ─── */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="px-4 py-2.5 bg-yellow-400/5 border-b border-white/[0.06]">
              <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">RCD Trip Times (30mA)</p>
            </div>
            <div className="p-3 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white/[0.05] p-2.5 text-center">
                  <p className="text-[10px] text-white">0.5× (15mA)</p>
                  <p className="text-sm font-bold text-white">No trip</p>
                </div>
                <div className="rounded-xl bg-yellow-400/10 border border-yellow-400/20 p-2.5 text-center">
                  <p className="text-[10px] text-white">1× (30mA)</p>
                  <p className="text-sm font-bold text-yellow-400">≤300ms</p>
                </div>
                <div className="rounded-xl bg-yellow-400/10 border border-yellow-400/20 p-2.5 text-center">
                  <p className="text-[10px] text-white">5× (150mA)</p>
                  <p className="text-sm font-bold text-yellow-400">≤40ms</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white/[0.05] p-2.5 text-center">
                  <p className="text-[10px] text-white">S-type 0.5×</p>
                  <p className="text-xs font-bold text-white">No trip</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-2.5 text-center">
                  <p className="text-[10px] text-white">S-type 1×</p>
                  <p className="text-xs font-bold text-white">≤500ms</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-2.5 text-center">
                  <p className="text-[10px] text-white">S-type 5×</p>
                  <p className="text-xs font-bold text-white">≤150ms</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Ze TYPICAL VALUES ─── */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="px-4 py-2.5 bg-yellow-400/5 border-b border-white/[0.06]">
              <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Ze — Typical External Loop Impedance</p>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white/[0.05] p-3 text-center">
                  <p className="text-xs font-semibold text-white">TN-S</p>
                  <p className="text-lg font-black text-white">0.8Ω</p>
                  <p className="text-[10px] text-white">max declared</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-3 text-center">
                  <p className="text-xs font-semibold text-white">TN-C-S</p>
                  <p className="text-lg font-black text-white">0.35Ω</p>
                  <p className="text-[10px] text-white">max declared</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-3 text-center">
                  <p className="text-xs font-semibold text-white">TT</p>
                  <p className="text-lg font-black text-white">21Ω</p>
                  <p className="text-[10px] text-white">max declared</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── CONTINUITY ─── */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="px-4 py-2.5 bg-yellow-400/5 border-b border-white/[0.06]">
              <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Continuity — Target Values</p>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white/[0.05] p-3 text-center">
                  <p className="text-[10px] text-white">CPC (R1+R2)</p>
                  <p className="text-lg font-black text-white">≤0.5Ω</p>
                  <p className="text-[10px] text-white">typical target</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-3 text-center">
                  <p className="text-[10px] text-white">Main bonding</p>
                  <p className="text-lg font-black text-white">≤0.5Ω</p>
                  <p className="text-[10px] text-white">to MET</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── TEMPERATURE CORRECTION ─── */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06]">
              <p className="text-xs font-bold text-white uppercase tracking-wider">Zs Temperature Correction</p>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-4 gap-1.5">
                {[['10°C', '1.00'], ['15°C', '1.02'], ['20°C', '1.04'], ['25°C', '1.06'], ['30°C', '1.08'], ['35°C', '1.10'], ['40°C', '1.12']].map(([temp, factor]) => (
                  <div key={temp} className="rounded-lg bg-white/[0.05] p-2 text-center">
                    <p className="text-[10px] text-white">{temp}</p>
                    <p className="text-sm font-bold text-white">×{factor}</p>
                  </div>
                ))}
                <div className="rounded-lg bg-yellow-400/10 p-2 text-center">
                  <p className="text-[10px] text-yellow-400">Formula</p>
                  <p className="text-[10px] font-bold text-yellow-400">×(300÷230+T)</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── KEY FORMULAS ─── */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-yellow-400/20">
              <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Key Formulas</p>
            </div>
            <div className="p-3 space-y-2">
              {[
                { formula: 'Ipf = U₀ ÷ Zs', label: 'Prospective fault current' },
                { formula: 'Zs = Ze + (R1 + R2)', label: 'Earth fault loop impedance' },
                { formula: 'Ra ≤ 50 ÷ IΔn', label: 'TT earth electrode (50V touch voltage)' },
                { formula: 'Zs(corr) = Zs × (300 ÷ (230 + T))', label: 'Temperature correction to 70°C' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-white/[0.05] px-3 py-2.5">
                  <p className="text-sm font-bold text-white font-mono">{item.formula}</p>
                  <p className="text-[10px] text-white text-right">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ─── DISCONNECTION TIMES ─── */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06]">
              <p className="text-xs font-bold text-white uppercase tracking-wider">Disconnection Times — Reg 411.3.2</p>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white/[0.05] p-3 text-center">
                  <p className="text-[10px] text-white">Final circuits ≤63A</p>
                  <p className="text-lg font-black text-white">0.4s</p>
                  <p className="text-[10px] text-white">sockets, portable</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-3 text-center">
                  <p className="text-[10px] text-white">Distribution / fixed</p>
                  <p className="text-lg font-black text-white">5s</p>
                  <p className="text-[10px] text-white">distribution circuits</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QuickReferencePage;
