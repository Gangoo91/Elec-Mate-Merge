import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const OpenCircuitPage = ({ onBack }: Props) => (
  <div>
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
      <div className="py-2"><div className="flex items-center gap-3 h-11">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"><ArrowLeft className="h-5 w-5" /></Button>
        <h1 className="text-base font-semibold text-white">Open Circuit Faults</h1>
      </div></div>
    </div>

    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-2">What Is It</p>
          <p className="text-sm text-white leading-relaxed">An open circuit is a break in the conductive path — the circuit is incomplete, so no current can flow. The circuit appears dead even though the MCB is on and the supply is present. Open circuits are frustrating because there is no dramatic symptom — just silence where there should be power.</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Symptoms</p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <div className="space-y-2">
            {['No power at one or more accessories — but MCB is ON', 'Partial power loss on a ring circuit — some sockets work, others do not', 'Lights not working despite switch being on and MCB being on', 'Intermittent power — works sometimes, fails other times (loose connection)', 'No voltage at the accessory when tested with a voltage indicator', 'Continuity test shows infinite resistance on one or more conductors'].map((s, i) => (
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
        { cause: 'Loose terminal — conductor pulled out', detail: 'The most common cause. A conductor that was not properly tightened has worked loose over time due to thermal cycling (heating/cooling) or vibration. The conductor may have partially retracted from the terminal.', tip: 'Check all terminals in the last accessory that was worked on. Retorque to manufacturer specification. Loose terminals are the most common single fault in electrical installations.' },
        { cause: 'Broken conductor from mechanical damage', detail: 'A cable severed by drilling, nailing, or physical impact. If only one conductor is broken (e.g., line), the circuit appears dead but neutral and earth may still be intact.', tip: 'A broken line conductor is different to a short circuit — the MCB does NOT trip. The circuit simply stops working.' },
        { cause: 'Broken ring circuit', detail: 'A ring final circuit with one leg broken functions as two radial circuits. Sockets close to the break may have reduced capacity or no power. The ring appears to work normally from most sockets.', tip: 'Test end-to-end continuity of L, N and CPC. A broken ring shows infinite resistance on one leg. Cross-connection tests reveal which section is broken.' },
        { cause: 'Corroded connection', detail: 'Corrosion at terminals or junction boxes increases resistance until the connection effectively becomes an open circuit. Common in damp locations, outdoor installations, and near bathrooms.', tip: 'Look for green/white corrosion deposits on terminals. Clean thoroughly and replace if pitted. Apply anti-corrosion compound.' },
        { cause: 'Blown fuse not identified', detail: 'A blown fuse in an FCU, main fuse, or older rewireable fuse board can appear as an open circuit. The circuit is dead but the switch/fuse carrier appears normal from the outside.', tip: 'Always check fuses before complex testing. Remove and inspect. Use a continuity tester to confirm the fuse element is intact.' },
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

      {['Confirm the MCB/fuse is ON and intact. Check for tripped RCDs. Check for blown fuses in FCUs.', 'Test for voltage at the dead accessory using a voltage indicator. No voltage confirms open circuit (not a load fault).', 'Isolate the circuit and prove dead for safe testing.', 'Perform continuity test from the board to the dead accessory — L, N and E individually. The conductor showing infinite resistance has the break.', 'If all three conductors show infinite: the break is before the first junction point. If only one: trace that specific conductor.', 'Section the circuit at junction boxes. Test continuity of each section individually. The section showing infinite contains the break.', 'For ring circuits: test end-to-end continuity of each leg. Cross-connect and test at each socket to find the break location.', 'Re-terminate the loose connection or replace the broken cable section. Retest continuity, IR and polarity. Energise and verify.'].map((step, i) => (
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
          <p className="text-sm font-semibold text-white">Landing Light — Intermittent Open Circuit</p>
          <p className="text-sm text-white/80">Landing light works sometimes and fails other times. No pattern. Lamp is fine. Switch clicks normally.</p>
          <div className="rounded-xl bg-white/[0.05] p-3">
            <p className="text-xs text-white">Continuity test with switch ON: 0.3Ω (good). But when the switch faceplate was disturbed during testing, the reading jumped to infinity. The switched live conductor was barely held by the terminal screw — making contact under some conditions and losing contact when the faceplate was slightly moved. Years of thermal cycling had loosened the screw.</p>
          </div>
          <div className="rounded-xl bg-green-400/5 border border-green-400/10 p-3">
            <p className="text-xs text-white">Stripped, re-terminated and torqued the conductor. Checked all other terminals in the same switch — two others were also loose. Retested: solid continuity in all switch positions. Advised client that all switches of this age should have terminal tightness checked.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
);

export default OpenCircuitPage;
