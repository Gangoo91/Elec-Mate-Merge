import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const ShortCircuitPage = ({ onBack }: Props) => (
  <div>
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
      <div className="py-2"><div className="flex items-center gap-3 h-11">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"><ArrowLeft className="h-5 w-5" /></Button>
        <h1 className="text-base font-semibold text-white">Short Circuit Faults</h1>
      </div></div>
    </div>

    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      {/* What is it */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-2">What Is It</p>
          <p className="text-sm text-white leading-relaxed">A short circuit is a direct, low-impedance connection between two live conductors (usually line and neutral). This creates an extremely high fault current — potentially thousands of amps — that should trip the protective device instantaneously. The fault current is limited only by the supply impedance and the resistance of the conductors to the fault point.</p>
        </div>
      </motion.div>

      {/* Symptoms */}
      <motion.div variants={itemVariants}>
        <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Symptoms</p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <div className="space-y-2">
            {['MCB trips immediately on reset — cannot hold in the ON position', 'Fuse blows instantly when replaced', 'Audible bang, flash, or arc at the moment of fault', 'Burning smell — charred insulation at the fault point', 'Visible damage: melted cable, blackened terminals, arc marks', 'Zero or very low insulation resistance between L and N (0Ω = dead short)'].map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                <p className="text-sm text-white">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Common causes */}
      <motion.div variants={itemVariants}>
        <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Common Causes</p>
      </motion.div>

      {[
        { cause: 'Cable damaged by drilling or nailing', detail: 'The most common domestic cause. A drill bit or nail penetrates the cable, connecting line and neutral conductors through the metallic object. Often occurs during shelf fitting, picture hanging, or building work.', tip: 'Check cable routes against safe zones (BS 7671 Reg 522.6.6). Cables outside zones need mechanical protection.' },
        { cause: 'Loose conductor contacting adjacent terminal', detail: 'A conductor that has come loose from its terminal can touch the adjacent terminal in the same accessory. Common in socket outlets and junction boxes where L and N terminals are close together.', tip: 'Check terminal tightness during any work on accessories. Torque to manufacturer specification.' },
        { cause: 'Failed equipment with internal short', detail: 'Appliances or equipment with failed internal components can present a dead short to the supply. Motors with failed windings, transformers with shorted turns, or electronic equipment with failed capacitors.', tip: 'Disconnect all loads before testing the fixed wiring. If IR improves with loads disconnected, the fault is in the equipment.' },
        { cause: 'Insulation breakdown from overheating', detail: 'Prolonged overloading causes conductor heating that degrades the insulation between line and neutral. Over time, the insulation carbonises and becomes conductive, eventually creating a short circuit.', tip: 'Look for discolouration of cable sheath — a sign of historic overheating. Check the MCB rating against cable capacity.' },
        { cause: 'Rodent damage', detail: 'Rats and mice gnaw cable sheaths and insulation, exposing bare conductors that can touch. Common in loft spaces, underfloor voids, and rural properties.', tip: 'Look for gnaw marks on cables during visual inspection. Recommend pest control and mechanical cable protection.' },
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

      {/* How to diagnose */}
      <motion.div variants={itemVariants}>
        <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">How to Diagnose</p>
      </motion.div>

      {[
        'Isolate the circuit and prove dead. Do NOT repeatedly reset the MCB — each reset creates a high-energy arc at the fault point.',
        'Disconnect ALL loads from the circuit — unplug appliances, remove lamps, disconnect FCUs.',
        'Perform insulation resistance test between L and N. A dead short reads 0Ω. If IR is &gt;1MΩ with loads disconnected, the fault is in an appliance, not the wiring.',
        'If IR is low L-N on the fixed wiring: section the circuit at junction boxes. Disconnect one section at a time and retest IR on each section individually.',
        'The section that shows 0Ω L-N contains the fault. Trace the cable route for that section — look for drill holes, nail positions, or areas where the cable is accessible.',
        'Visually inspect the suspect cable run for damage. The fault point often shows charring, melted insulation, or discolouration.',
        'Replace the damaged cable section. Do NOT repair with tape or junction boxes at the damage point — replace the full run between accessories.',
        'After repair: retest IR (all three — L-E, N-E, L-N), continuity, polarity. Energise and verify functional operation.',
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

      {/* Real-world case */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider">Real-World Case</p>
          <p className="text-sm font-semibold text-white">Bedroom Socket Circuit — Shelf Installation</p>
          <p className="text-sm text-white">Client installed floating shelves in the bedroom. 32A ring circuit MCB tripped and will not reset.</p>
          <div className="rounded-xl bg-white/[0.05] p-3">
            <p className="text-xs font-semibold text-white mb-1">Investigation</p>
            <p className="text-xs text-white">IR test L-N: 0Ω. L-E: &gt;999MΩ. N-E: &gt;999MΩ. Dead short between L and N only — no earth involvement. Sectioned circuit at junction box behind headboard. Fault isolated to cable between JB and socket behind bed. Removed socket faceplate — drill hole visible in backbox where shelf bracket screw had penetrated the cable.</p>
          </div>
          <div className="rounded-xl bg-green-400/5 border border-green-400/10 p-3">
            <p className="text-xs font-semibold text-green-400 mb-1">Resolution</p>
            <p className="text-xs text-white">Replaced cable run from JB to socket. Installed cable protection plate at the drill point to prevent recurrence. Retested: IR &gt;999MΩ all tests. Advised client about safe zones for future fixings.</p>
          </div>
        </div>
      </motion.div>

      {/* Regulations */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4 space-y-2">
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider">Regulations</p>
          <div className="space-y-1.5">
            {[
              'Reg 434 — Protection against fault current. Protective devices must disconnect within the time required to prevent conductor damage.',
              'Reg 522.6.6 — Cables in walls must be in safe zones or mechanically protected.',
              'Reg 612.3 — Insulation resistance testing to detect and locate short circuits.',
              'EICR: Short circuit = C1 (danger present) if active, C2 if protective device has cleared it but cause is unresolved.',
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-xs text-white">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
);

export default ShortCircuitPage;
