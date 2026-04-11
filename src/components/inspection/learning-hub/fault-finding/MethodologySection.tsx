import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const steps = [
  { step: 'Gather Information', detail: 'Talk to the client. What happened? When did it start? What changed? Has any recent work been done? Check for patterns — does the fault occur at specific times, with specific loads, or in specific weather conditions?', tips: ['Ask "what were you doing when it happened?" — this often reveals the cause', 'Check if the fault is intermittent or permanent — this changes your approach', 'Look at the circuit chart and installation drawings before touching anything'] },
  { step: 'Safe Isolation', detail: 'Isolate the faulty circuit using the full safe isolation procedure. Prove dead at the point of work. Never assume a faulty circuit is safe — fault conditions can create unexpected voltages.', tips: ['A faulted circuit may have backfeed from other sources', 'Capacitors may retain charge even after isolation', 'If the fault involves multiple circuits, consider isolating at the main switch'] },
  { step: 'Visual Inspection', detail: 'Before connecting any test instrument, look. Check for obvious signs: burning, discolouration, water ingress, mechanical damage, loose connections, rodent damage, overheating marks, tripped devices.', tips: ['80% of faults can be identified or narrowed down by visual inspection alone', 'Photograph any damage before disturbing it — evidence for the client and your records', 'Check the consumer unit — are any MCBs tripped? Is an RCD down?'] },
  { step: 'Check the Obvious', detail: 'Before complex testing, rule out simple causes. Is the MCB/fuse blown? Is the supply on? Has an RCD tripped? Is a time switch set incorrectly? Has a lamp simply failed?', tips: ['The most embarrassing faults are the simplest — check the basics first', 'Reset a tripped MCB/RCD once — if it trips again immediately, there is a genuine fault', 'Check both the local and main isolation points'] },
  { step: 'Systematic Testing', detail: 'Use the correct sequence of electrical tests to locate the fault. Start with the test most likely to reveal the fault type. Insulation resistance for earth faults. Continuity for open circuits. Voltage measurement for supply issues.', tips: ['Match your test to the symptom: tripping = IR test, no power = continuity test', 'Test the whole circuit first, then section it to narrow down the fault location', 'Record all readings — they tell the story of the fault'] },
  { step: 'Interpret Results', detail: 'Compare your test results against expected values and BS 7671 acceptance criteria. A result is only meaningful when compared to what it should be. Consider what the results tell you about fault location and type.', tips: ['Low IR between L and E = line-to-earth insulation fault', 'Open circuit on continuity = broken conductor or disconnected terminal', 'Unexpectedly low Zs = possible parallel earth path or cross-connection'] },
  { step: 'Repair and Rectify', detail: 'Fix the fault at its root cause — not just the symptom. Replace damaged components, re-terminate loose connections, replace damaged cable. Address the cause, not just the effect.', tips: ['If a cable was damaged by drilling, consider rerouting — the damage location may be vulnerable again', 'If a connection was loose, check all other connections in the same accessory', 'If water caused the fault, fix the water ingress as well as the electrical damage'] },
  { step: 'Test and Verify', detail: 'After repair, perform all relevant tests to confirm the fault is resolved and the circuit is safe. Continuity, IR, polarity, Zs, RCD — test everything, not just the parameter that failed. Energise and verify functional operation.', tips: ['A repair that fixes one fault may have introduced another — test comprehensively', 'Run the circuit under load to check for intermittent issues', 'Record all post-repair test results for the certificate'] },
];

const MethodologySection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Methodology</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Effective fault finding is systematic, not random. Follow these 8 steps in order every time. Skipping steps or jumping to conclusions wastes time and can miss the real cause — leading to repeat call-backs.
            </p>
          </div>
        </motion.div>

        {steps.map((s, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
              <div className="flex items-stretch">
                <div className="w-14 bg-yellow-400/10 flex items-center justify-center border-r border-white/[0.06] shrink-0">
                  <span className="text-2xl font-black text-yellow-400">{i + 1}</span>
                </div>
                <div className="flex-1 p-4 space-y-3">
                  <p className="text-sm font-semibold text-white">{s.step}</p>
                  <p className="text-sm text-white/80 leading-relaxed">{s.detail}</p>
                  <div className="space-y-1.5">
                    {s.tips.map((tip, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                        <p className="text-xs text-yellow-400/80">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">The Golden Rule</p>
            <p className="text-sm text-white leading-relaxed">
              Never skip straight to testing. Information gathering and visual inspection solve more faults than any test instrument. The most experienced electricians spend the most time on steps 1-4 and the least time on step 5.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MethodologySection;
