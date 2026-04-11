import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const OverloadPage = ({ onBack }: Props) => (
  <div>
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
      <div className="py-2"><div className="flex items-center gap-3 h-11">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"><ArrowLeft className="h-5 w-5" /></Button>
        <h1 className="text-base font-semibold text-white">Overload Conditions</h1>
      </div></div>
    </div>

    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-2">What Is It</p>
          <p className="text-sm text-white leading-relaxed">An overload occurs when a circuit carries more current than its rated capacity for a sustained period. Unlike a short circuit (instant), an overload trips the thermal element of the MCB after minutes or hours of operation. The circuit heats up progressively, degrading insulation and creating fire risk before the protective device eventually operates.</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Symptoms</p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <div className="space-y-2">
            {['MCB trips after running under load for a period — not immediately on energisation', 'Cables warm or hot to touch, especially at terminations and in trunking', 'Discolouration of cable sheath near accessories — browning or yellowing of PVC', 'Burning smell from overheated insulation — may precede MCB trip by hours', 'MCB body is hot to touch when the circuit is loaded', 'Appliances running slowly or underperforming due to voltage drop under excessive load'].map((s, i) => (
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
        { cause: 'Too many appliances on one circuit', detail: 'A 32A ring circuit has a theoretical capacity of about 7kW. A kettle (3kW) + toaster (2kW) + microwave (1.5kW) = 6.5kW — close to the limit. Add a dishwasher and the circuit is overloaded.', tip: 'Measure the actual load with a clamp meter during peak usage. If it exceeds 80% of the MCB rating sustained, the circuit needs splitting.' },
        { cause: 'Undersized cable for the connected load', detail: 'A circuit that was adequate when installed may be overloaded after additional loads are connected. Common when sockets are added to existing circuits without checking cable capacity with derating factors applied.', tip: 'Check cable size against the installed load, accounting for grouping (Table F3), ambient temperature, and installation method derating.' },
        { cause: 'Loose connections causing localised heating', detail: 'A loose terminal adds resistance at the connection point. This generates heat proportional to I²R — even at normal load currents. The heat is concentrated at the loose joint, causing localised overheating without the MCB tripping.', tip: 'Use thermal imaging under load. A hot terminal is almost always a loose connection. Retorque to manufacturer specification.' },
        { cause: 'Incorrect MCB rating for the cable', detail: 'An MCB rated higher than the cable can carry allows sustained overload without tripping. A 32A MCB on a 1.5mm² cable will allow sustained current that overheats the cable.', tip: 'Never increase the MCB rating to stop tripping — check the cable rating first. The MCB protects the cable, not the load.' },
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

      {['Note when the MCB trips — a thermal trip occurs after sustained load, not instantly. Record the time between energisation and trip.', 'Measure load current with a clamp meter under normal operating conditions. Clamp around the line conductor at the MCB.', 'Compare measured current against the MCB rating AND the cable current-carrying capacity (with derating factors applied).', 'If load exceeds rating: identify the heaviest loads. Calculate total connected load. Determine if the circuit can be split.', 'If load is within rating but MCB still trips: check for loose connections. Use thermal imaging under load — hot spots indicate high-resistance joints.', 'Check cable route for bunching with other cables — grouping derating (Table F3) may reduce the effective cable capacity below the MCB rating.', 'After repair: recheck load current, retorque all connections, verify thermal performance under load.'].map((step, i) => (
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
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider">Real-World Case</p>
          <p className="text-sm font-semibold text-white">Kitchen Ring — Clamp Meter Reveals Overload</p>
          <p className="text-sm text-white">Client complains MCB trips every evening around dinner time. Never trips during the day.</p>
          <div className="rounded-xl bg-white/[0.05] p-3">
            <p className="text-xs text-white">Clamp meter reading during evening meal preparation: 34A on a 32A MCB. Kettle (13A) + oven (13A) + microwave (6A) + dishwasher (10A) running simultaneously. The MCB thermal element trips after ~15 minutes at 106% overload.</p>
          </div>
          <div className="rounded-xl bg-green-400/5 border border-green-400/10 p-3">
            <p className="text-xs text-white">Installed a dedicated radial circuit for the oven (6mm² cable, 32A MCB). Kitchen ring now peaks at 22A during dinner. MCB trips eliminated. Also retorqued all ring circuit connections as a precaution.</p>
          </div>
        </div>
      </motion.div>

      {/* Grouping derating */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <p className="text-sm font-semibold text-white mb-2">Cable Grouping Derating (Table F3)</p>
          <p className="text-sm text-white leading-relaxed mb-3">When cables are bunched or enclosed together, their current-carrying capacity is reduced. A cable rated at 27A in free air may only carry 19A when grouped with 5 other cables. If the load exceeds the derated capacity, the cable overheats even though the MCB has not tripped.</p>
          <div className="space-y-1.5">
            <div className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" /><p className="text-xs text-white">Measure actual load current under normal conditions with a clamp meter</p></div>
            <div className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" /><p className="text-xs text-white">Apply Table F3 grouping factor to the cable rating — this is the REAL capacity</p></div>
            <div className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" /><p className="text-xs text-white">If derated capacity &lt; measured current: re-route cables, reduce grouping, or upsize</p></div>
            <div className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" /><p className="text-xs text-white">Use thermal imaging under load — bunched cables with hotspots confirm inadequate derating</p></div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4">
          <p className="text-sm font-semibold text-white mb-2">Critical Warning</p>
          <p className="text-sm text-white leading-relaxed">Never increase the MCB rating to stop overload tripping. The MCB protects the cable — increasing the rating allows the cable to overheat, degrading insulation and creating a fire risk. The correct fix is to reduce the load or upgrade the cable.</p>
        </div>
      </motion.div>
    </motion.div>
  </div>
);

export default OverloadPage;
