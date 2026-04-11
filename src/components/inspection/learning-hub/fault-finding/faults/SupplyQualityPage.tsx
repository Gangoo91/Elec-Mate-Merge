import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const SupplyQualityPage = ({ onBack }: Props) => (
  <div>
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
      <div className="py-2"><div className="flex items-center gap-3 h-11">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"><ArrowLeft className="h-5 w-5" /></Button>
        <h1 className="text-base font-semibold text-white">Supply Quality Issues</h1>
      </div></div>
    </div>

    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-2">What Is It</p>
          <p className="text-sm text-white leading-relaxed">Supply quality issues are problems with the incoming electrical supply that affect equipment operation — voltage variations, frequency deviations, harmonics, and transients. Unlike wiring faults, these may not trip any protective device but can cause equipment malfunction, overheating, and premature failure.</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Symptoms</p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <div className="space-y-2">
            {['Lights flickering or dimming — especially under load changes', 'Equipment malfunctioning despite correct wiring — random errors, resets, shutdowns', 'Motors running hot, vibrating, or making unusual noise', 'Voltage readings outside 230V ±10% (below 207V or above 253V)', 'Electronic equipment producing audible hum or buzzing', 'Neutral conductor running warm or hot — indicates current flowing in the neutral'].map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                <p className="text-sm text-white">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Common Causes</p>
      </motion.div>

      {[
        { cause: 'Loose neutral (DANGEROUS)', detail: 'A loose or broken neutral in the supply or installation causes the neutral point to "float". On a single-phase supply, this causes voltage to rise and fall unpredictably. On three-phase, it causes severe voltage imbalance between phases — equipment on the lightly loaded phase gets overvoltage, potentially destroying electronics.', tip: 'A loose neutral is EXTREMELY DANGEROUS. Voltage can exceed 400V on one phase. If you suspect a loose neutral, isolate immediately and investigate. Check N-E voltage — it should be near zero. High N-E voltage = loose neutral.' },
        { cause: 'DNO supply voltage issues', detail: 'The incoming supply voltage may be outside the 230V ±10% tolerance due to long rural supply cables, overloaded transformers, or network faults. Low voltage causes motors to draw more current and overheat. High voltage stresses insulation and damages electronics.', tip: 'Measure and log voltage over 24 hours. If consistently outside 207-253V, report to the DNO. They are obligated to maintain voltage within statutory limits.' },
        { cause: 'Harmonics from electronic loads', detail: 'LED lighting, variable speed drives, computers, and switched-mode power supplies generate harmonic currents that distort the voltage waveform. This causes overheating of neutral conductors, transformer buzzing, and interference with sensitive equipment.', tip: 'Use a power quality analyser to measure THD (Total Harmonic Distortion). Above 5% THD indicates a problem. Consider harmonic filters or dedicated circuits for heavy electronic loads.' },
        { cause: 'Transients and spikes', detail: 'Lightning strikes, switching of large loads (motors, compressors), and DNO network switching cause voltage spikes that damage sensitive equipment. SPDs protect against these but must be correctly installed and maintained.', tip: 'Install Type 2 SPDs at the consumer unit. Check existing SPDs for status indicators — a "fault" or "replace" indicator means the SPD has operated and needs replacement.' },
      ].map((item, i) => (
        <motion.div key={i} variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
            <p className="text-sm font-semibold text-white">{item.cause}</p>
            <p className="text-sm text-white/80 leading-relaxed">{item.detail}</p>
            <div className="rounded-xl bg-yellow-400/5 border border-yellow-400/10 p-2.5">
              <p className="text-xs text-yellow-400/80">{item.tip}</p>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div variants={itemVariants}>
        <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">How to Diagnose</p>
      </motion.div>

      {['Measure supply voltage at the origin: L-N, L-E, and N-E. Record all three.', 'Check N-E voltage specifically — should be near 0V. Any significant voltage (&gt;5V) indicates a neutral problem.', 'If voltage is outside 207-253V: log voltage over 24 hours to capture variations under different load conditions.', 'For flickering: measure voltage during the flicker event. Correlate with load changes (motors starting, heating switching).', 'For three-phase: measure all three phase voltages. They should be balanced within 2-3%. Imbalance >5% indicates a neutral issue.', 'For harmonics: use a power quality analyser. Measure THD and individual harmonic components. Identify the source loads.', 'For a suspected loose neutral: check all neutral connections from the meter to the consumer unit. Retorque all neutral bar connections.', 'If the supply itself is the problem: contact the DNO with your logged voltage data. They will investigate their network.'].map((step, i) => (
        <motion.div key={i} variants={itemVariants}>
          <div className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/10 p-3.5">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
              <span className="text-sm font-bold text-yellow-400">{i + 1}</span>
            </div>
            <p className="text-sm text-white leading-relaxed pt-1">{step}</p>
          </div>
        </motion.div>
      ))}

      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-red-400/10 border border-red-400/20 p-4">
          <p className="text-sm font-semibold text-white mb-2">Loose Neutral Warning</p>
          <p className="text-sm text-white leading-relaxed">A floating neutral is one of the most dangerous conditions in an electrical installation. On a TN-C-S (PME) supply, a lost neutral means the installation earth potential rises to a dangerous level. All exposed metalwork becomes live. This is a C1 emergency requiring immediate isolation and DNO notification.</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider">Real-World Case</p>
          <p className="text-sm font-semibold text-white">Office Block — Flickering Lights, All Floors</p>
          <p className="text-sm text-white/80">Multiple tenants report lights flickering. Problem affects all floors. Gets worse during business hours.</p>
          <div className="rounded-xl bg-white/[0.05] p-3">
            <p className="text-xs text-white">Voltage logging at the main intake showed 218-245V range over 24 hours — within limits but volatile. N-E voltage measured at 8V at the main neutral bar. Thermal scan revealed a hot spot at the main neutral connection to the busbar — 78°C versus 35°C ambient. The neutral bar bolt had lost 2 turns of torque over years of thermal cycling.</p>
          </div>
          <div className="rounded-xl bg-green-400/5 border border-green-400/10 p-3">
            <p className="text-xs text-white">Isolated main supply. Cleaned and retorqued all neutral bar connections to manufacturer specification. Re-tested: N-E voltage 0.3V, thermal scan normal. Voltage logging over next 48 hours showed stable 229-232V. Flickering eliminated. Recommended annual thermographic survey.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
);

export default SupplyQualityPage;
