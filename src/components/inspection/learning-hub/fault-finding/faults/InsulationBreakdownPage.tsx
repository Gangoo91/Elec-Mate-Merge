import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const InsulationBreakdownPage = ({ onBack }: Props) => (
  <div>
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
      <div className="py-2"><div className="flex items-center gap-3 h-11">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"><ArrowLeft className="h-5 w-5" /></Button>
        <h1 className="text-base font-semibold text-white">Insulation Breakdown</h1>
      </div></div>
    </div>

    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-2">What Is It</p>
          <p className="text-sm text-white leading-relaxed">Insulation breakdown is the gradual deterioration of cable insulation over time, reducing its ability to prevent current leakage. Unlike a sudden fault, insulation breakdown is progressive — readings decline over successive inspections until the insulation fails completely. It is the electrical equivalent of a slow puncture.</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Symptoms</p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <div className="space-y-2">
            {['Declining IR readings over successive periodic inspections — the key indicator', 'Intermittent RCD tripping that worsens over time', 'IR just above or just below the 1MΩ minimum — borderline readings', 'No single obvious fault — general degradation across the circuit', 'IR readings that change with temperature or weather conditions', 'Nuisance tripping that correlates with seasons (worse in winter/damp)'].map((s, i) => (
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
        { cause: 'Age-related degradation', detail: 'PVC insulation has a typical service life of 25-40 years. It becomes brittle, cracks, and loses its dielectric properties. Rubber and TRS cables (pre-1970s) degrade faster. Age is the single biggest cause of insulation breakdown in UK installations.', tip: 'Request previous EICR results to establish the IR trend. A halving of IR between inspections is a strong indicator of active deterioration.' },
        { cause: 'Thermal damage from overloading', detail: 'Prolonged operation above the cable rating heats the conductor, which degrades the surrounding insulation. The damage is cumulative and irreversible — even if the overload is corrected, the insulation does not recover.', tip: 'Look for discolouration of the cable sheath. Brown/yellow PVC indicates historic overheating. Check the MCB rating against the cable capacity.' },
        { cause: 'Moisture ingress over time', detail: 'Persistent damp conditions gradually degrade insulation. Not a sudden event — years of moisture exposure reduce IR progressively. Common in basements, external walls, and underfloor voids.', tip: 'IR readings that improve in summer and worsen in winter indicate moisture-related degradation.' },
        { cause: 'UV exposure', detail: 'Cables exposed to direct sunlight (conservatories, external walls, south-facing trunking) suffer UV degradation. The outer sheath becomes brittle and the insulation underneath deteriorates.', tip: 'Surface-mounted cables in direct sunlight should be UV-rated (LSF/LSZH). Standard PVC is not UV-stable.' },
        { cause: 'Chemical contamination', detail: 'Oil, solvents, cleaning chemicals, and plaster dust attack insulation materials. Industrial environments, commercial kitchens, and agricultural buildings are high-risk.', tip: 'Where chemical contamination is possible, use cables with chemical-resistant sheaths (LSF or specific industrial types).' },
      ].map((item, i) => (
        <motion.div key={i} variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
            <p className="text-sm font-semibold text-white">{item.cause}</p>
            <p className="text-sm text-white leading-relaxed">{item.detail}</p>
            <div className="rounded-xl bg-yellow-400/5 border border-yellow-400/10 p-2.5">
              <p className="text-xs text-yellow-400/80">{item.tip}</p>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div variants={itemVariants}>
        <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">How to Diagnose</p>
      </motion.div>

      {['Perform IR testing on each circuit individually — L-E, N-E, L-N at 500V DC for 1 minute', 'Compare results with previous EICR data. A declining trend confirms active deterioration.', 'Temperature-correct all readings to 20°C for fair comparison between inspections taken in different seasons.', 'If IR is borderline (1-5MΩ): the circuit is approaching failure. Flag for monitoring with shorter inspection intervals.', 'If IR is below 1MΩ: the circuit has failed. Investigate the cause — is it localised damage or general degradation?', 'Section the circuit to determine if the low IR is concentrated in one area (localised damage) or uniform (general degradation).', 'For general degradation: the cable needs replacement. Plan a phased rewire starting with the worst circuits.', 'For localised damage: identify and repair the specific fault point. Retest to confirm the remainder of the circuit is healthy.'].map((step, i) => (
        <motion.div key={i} variants={itemVariants}>
          <div className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/10 p-3.5">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
              <span className="text-sm font-bold text-yellow-400">{i + 1}</span>
            </div>
            <p className="text-sm text-white leading-relaxed pt-1">{step}</p>
          </div>
        </motion.div>
      ))}

      {/* Trending guide */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
          <p className="text-sm font-semibold text-white mb-3">IR Trending — Reading the Story</p>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-white/[0.05] p-2.5"><p className="text-[10px] text-white">2015</p><p className="text-sm font-bold text-green-400">&gt;200MΩ</p></div>
              <div className="rounded-xl bg-white/[0.05] p-2.5"><p className="text-[10px] text-white">2020</p><p className="text-sm font-bold text-yellow-400">15MΩ</p></div>
              <div className="rounded-xl bg-white/[0.05] p-2.5"><p className="text-[10px] text-white">2025</p><p className="text-sm font-bold text-red-400">1.8MΩ</p></div>
            </div>
            <p className="text-xs text-white">This circuit has lost 99% of its insulation resistance in 10 years. At this rate, it will fall below 1MΩ within 2 years. Recommend rewire before the next periodic inspection.</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider">Real-World Case</p>
          <p className="text-sm font-semibold text-white">1960s Flat — TRS Cable Degradation</p>
          <p className="text-sm text-white">EICR on a 1960s flat. Client says "everything works fine". Previous EICR from 2019 shows IR trending downward.</p>
          <div className="rounded-xl bg-white/[0.05] p-3">
            <p className="text-xs text-white">2019 EICR: Kitchen ring IR = 8MΩ, Lighting = 12MΩ. 2025 EICR: Kitchen ring = 1.2MΩ, Lighting = 3MΩ. Original 1960s TRS rubber-sheathed cable throughout. Rubber insulation brittle and cracking at every accessory termination. No single fault — general degradation across all circuits.</p>
          </div>
          <div className="rounded-xl bg-green-400/5 border border-green-400/10 p-3">
            <p className="text-xs text-white">Recommended full rewire. Client agreed to phased approach: kitchen and bathroom first (highest risk), then bedrooms and living areas over 12 months. Issued C2 codes for circuits below 2MΩ with agreed remedial timescales.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
);

export default InsulationBreakdownPage;
