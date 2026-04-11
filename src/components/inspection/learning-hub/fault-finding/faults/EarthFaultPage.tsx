import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const EarthFaultPage = ({ onBack }: Props) => (
  <div>
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
      <div className="py-2"><div className="flex items-center gap-3 h-11">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"><ArrowLeft className="h-5 w-5" /></Button>
        <h1 className="text-base font-semibold text-white">Earth Fault Conditions</h1>
      </div></div>
    </div>

    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-2">What Is It</p>
          <p className="text-sm text-white leading-relaxed">An earth fault occurs when current leaks from a live conductor to earth through an unintended path — often through damaged insulation to the CPC, metalwork, or the ground itself. This is the most common cause of RCD tripping and the most dangerous fault type because it can energise exposed metalwork that people touch.</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Symptoms</p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <div className="space-y-2">
            {['RCD trips — may be immediate (solid fault) or intermittent (moisture/temperature dependent)', 'MCB may also trip if the earth fault current is high enough to exceed the MCB magnetic threshold', 'Low insulation resistance between L-E or N-E (or both)', 'Tingling sensation when touching metalwork (indicates live exposed parts — dangerous)', 'Nuisance tripping that worsens in damp weather or after rain', 'Burning smell at the fault point if sustained arcing is occurring'].map((s, i) => (
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
        { cause: 'Water ingress', detail: 'The number one cause of earth faults. Water in junction boxes, conduit entries, cable glands, and outdoor accessories creates a conductive path between live conductors and earth. Can cause IR to drop from &gt;999MΩ to <1MΩ overnight.', tip: 'Check all junction boxes, glands and outdoor connections. Look for condensation, drip marks, or staining.' },
        { cause: 'Cable insulation damage', detail: 'Mechanical damage to cable sheath or insulation allowing the live conductor to contact the CPC or surrounding metalwork. May be intermittent if the contact is only made under certain conditions (temperature, vibration).', tip: 'Trace the cable route for the faulty section. Look for drill/nail points, chafing on metal edges, or rodent damage.' },
        { cause: 'Faulty appliance with internal earth fault', detail: 'A connected appliance with failed internal insulation creates an earth fault that appears to be on the fixed wiring. Kettles, washing machines, dishwashers, and immersion heaters are common culprits.', tip: 'Always disconnect ALL appliances before testing the fixed wiring. If IR improves, reconnect one at a time to identify the faulty appliance.' },
        { cause: 'Neutral-earth fault', detail: 'A neutral conductor touching the CPC or earthed metalwork. This creates a current path that bypasses the neutral return — the RCD sees an imbalance and trips. Often caused by incorrect termination or damaged cables.', tip: 'Test IR between N and E specifically. A low N-E reading with normal L-E and L-N confirms a neutral-earth fault.' },
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

      {[
        'Isolate the supply at the consumer unit and prove dead',
        'Disconnect ALL appliances and loads on the affected RCD group',
        'Attempt to reset the RCD. If it holds with loads disconnected → appliance fault. If it trips → fixed wiring fault.',
        'For appliance fault: reconnect appliances one at a time, resetting the RCD after each. The appliance that causes the trip is faulty.',
        'For fixed wiring fault: perform IR test on each circuit individually — L-E, N-E, L-N. The circuit with low L-E or N-E is the faulty one.',
        'Section the faulty circuit at junction boxes. Test each section individually to locate the fault to a specific cable run.',
        'Visually inspect the suspect section for moisture, damage, or incorrect termination.',
        'Repair: dry out moisture, replace damaged cable, re-terminate incorrect connections. Retest IR and RCD operation.',
      ].map((step, i) => (
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
          <p className="text-sm font-semibold text-white">Bathroom RCD Tripping — Water Behind Tiles</p>
          <p className="text-sm text-white">RCD trips every time the shower is used. Works fine the rest of the time.</p>
          <div className="rounded-xl bg-white/[0.05] p-3">
            <p className="text-xs text-white">IR test dry: L-E = 35MΩ. IR test after running shower for 10 mins: L-E = 0.4MΩ. Water was penetrating through failed grout behind the shower tiles and soaking a junction box in the ceiling void above the bathroom. Steam and moisture condensed inside the JB, creating a conductive path L to E.</p>
          </div>
          <div className="rounded-xl bg-green-400/5 border border-green-400/10 p-3">
            <p className="text-xs text-white">Replaced junction box. Sealed cable entries with IP-rated glands. Advised client to re-grout shower surround. Re-tested dry and after shower: IR &gt;200MΩ both conditions.</p>
          </div>
        </div>
      </motion.div>

      {/* TT-specific */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider">TT Systems — Seasonal Earth Faults</p>
          <p className="text-sm text-white leading-relaxed">On TT installations, earth electrode resistance varies with soil moisture. During dry spells, electrode resistance can increase significantly — sometimes enough to cause nuisance RCD tripping as the earth fault loop impedance rises above the RCD operating threshold.</p>
          <div className="space-y-1.5">
            <div className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" /><p className="text-xs text-white">Check earth electrode resistance after dry weather — it may have doubled since last test</p></div>
            <div className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" /><p className="text-xs text-white">Consider additional rods or alternative electrode types if resistance is seasonally variable</p></div>
            <div className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" /><p className="text-xs text-white">Do not replace the RCD before checking the electrode — the RCD may be operating correctly</p></div>
          </div>
        </div>
      </motion.div>

      {/* Common mistakes */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4">
          <p className="text-xs font-medium text-orange-400 uppercase tracking-wider mb-2">Common Mistakes</p>
          <div className="space-y-1.5">
            {['Replacing the RCD before checking CPC continuity and connected equipment — the RCD may be working correctly, the fault is elsewhere', 'Assuming an appliance fault without testing — always disconnect loads and test the fixed wiring before blaming equipment', 'Not isolating before testing insulation resistance — testing on a live circuit gives unreliable results and is dangerous', 'Confusing nuisance tripping with a genuine fault — investigate systematically before concluding the RCD is faulty'].map((m, i) => (
              <div key={i} className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" /><p className="text-xs text-white">{m}</p></div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4 space-y-1.5">
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider">Regulations</p>
          {['Reg 411.3.3 — Additional RCD protection (≤30mA) for socket outlets and mobile equipment', 'Reg 612.3 — Insulation resistance testing to detect earth faults', 'Reg 531.2 — RCD type selection for the loads present', 'EICR: Active earth fault on accessible metalwork = C1 (danger present)'].map((r, i) => (
            <div key={i} className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" /><p className="text-xs text-white">{r}</p></div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </div>
);

export default EarthFaultPage;
