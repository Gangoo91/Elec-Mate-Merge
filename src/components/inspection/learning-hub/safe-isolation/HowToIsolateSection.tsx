import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const sixSteps = [
  { step: 'Identify the Circuit', detail: 'Identify the correct circuit to be isolated from the circuit chart, drawings, or by tracing the wiring. Check for multiple supply sources — generators, UPS, solar PV, battery storage. Seek permission from the client before switching off.', critical: 'Never isolate the wrong circuit. Verify by checking the circuit chart AND physically tracing the cable where possible.' },
  { step: 'Switch Off', detail: 'Switch off at the distribution board or local isolator. Ensure the switch is fully in the OFF position — verify visually. For three-phase supplies, ensure ALL phases are switched off.', critical: 'Consider the implications of isolation — other services, alarms, refrigeration, IT equipment. Inform all affected personnel.' },
  { step: 'Isolate', detail: 'Use an appropriate isolation device: isolator switch, switch-disconnector, MCB, or fuse removal. The device must provide a visible break or a reliable indication that it is open. RCDs and contactors are NOT suitable isolation devices.', critical: 'Acceptable: isolators with visible break, MCBs/fuse removal. NOT acceptable: RCDs, contactors, plug/socket, key switches without visible break.' },
  { step: 'Lock Off and Tag', detail: 'Apply a lock-off device to the isolation point so it cannot be switched back on. Attach a warning tag with your name, date, and reason for isolation. Use a unique padlock — only you hold the key.', critical: 'If lock-off is not possible (e.g., no lock-off facility), remove the fuse and keep it on your person. Never rely on tape or signs alone.' },
  { step: 'Prove Dead (Three-Step Test)', detail: 'Using a GS38-compliant voltage indicator: (1) Prove the tester on a KNOWN LIVE source or proving unit. (2) Test the isolated circuit — between all conductors and between each conductor and earth. (3) Prove the tester AGAIN on the known live source. All three steps must pass.', critical: 'This is the most critical step. If you skip any of the three prove steps, you cannot be certain the circuit is dead. Test between L-N, L-E, and N-E.' },
  { step: 'Begin Work', detail: 'Only begin work when all five previous steps are complete and you are satisfied the circuit is dead. Maintain the lock-off throughout your work. If you leave the work area, re-prove dead on your return.', critical: 'If anyone removes your lock or you find the circuit has been re-energised, STOP. Repeat the entire procedure before continuing.' },
];

const threePhaseTest = [
  'L1 to L2', 'L2 to L3', 'L3 to L1',
  'L1 to N', 'L2 to N', 'L3 to N',
  'L1 to E', 'L2 to E', 'L3 to E', 'N to E',
];

const commonMistakes = [
  { mistake: 'Not proving the voltage indicator before AND after', fix: 'The three-step test exists because voltage indicators can fail. A tester that has failed between your prove and test will show "dead" on a live circuit. Prove → Test → Prove. Every time.' },
  { mistake: 'Using a non-contact voltage detector (NCVD) to prove dead', fix: 'NCVDs are screening tools ONLY. They miss DC, shielded cables, and low voltages. They cannot be used to prove dead. Only a direct-contact GS38-compliant voltage indicator is acceptable.' },
  { mistake: 'Not locking off the isolation point', fix: 'Without a physical lock, someone can re-energise the circuit while you are working on it. Use a padlock with a unique key that only you hold. No lock = not isolated.' },
  { mistake: 'Testing at the board instead of the point of work', fix: 'Prove dead at the POINT OF WORK, not just at the board. Multi-feed circuits, stored capacitive charge, and back-feeding from other sources can leave the work area live.' },
  { mistake: 'Not considering multiple supply sources', fix: 'Modern installations may have solar PV, battery storage, generators, or UPS. Each source must be individually identified and isolated. Check for all possible feeds before proving dead.' },
];

const HowToIsolateSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">How to Isolate</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">The "SAFELY" Mnemonic</p>
            <div className="grid grid-cols-2 gap-1">
              {[
                ['S', 'Switch off at origin'],
                ['A', 'Apply isolation device'],
                ['F', 'Fix with locks and tags'],
                ['E', 'Establish dead (prove it)'],
                ['L', 'Leave warning notices'],
                ['Y', 'You begin work safely'],
              ].map(([letter, desc], i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sm font-bold text-yellow-400 w-4">{letter}</span>
                  <p className="text-sm text-white">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Six steps */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">The Six-Step Safe Isolation Procedure</p>
        </motion.div>

        {sixSteps.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-red-400/10 border border-red-400/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-red-400">{i + 1}</span>
                </div>
                <p className="text-sm font-semibold text-white">{item.step}</p>
              </div>
              <p className="text-sm text-white leading-relaxed pl-12">{item.detail}</p>
              <div className="rounded-xl bg-orange-400/5 border border-orange-400/10 p-2.5 ml-12">
                <p className="text-xs text-orange-400">{item.critical}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Three-phase 10-point test */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Three-Phase: The 10-Point Prove Dead Test</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white mb-3">For three-phase supplies, prove dead between ALL combinations of conductors:</p>
            <div className="grid grid-cols-2 gap-1.5">
              {threePhaseTest.map((test, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-2.5">
                  <div className="flex-shrink-0 w-6 h-6 rounded-md bg-yellow-400/10 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-yellow-400">{i + 1}</span>
                  </div>
                  <p className="text-sm text-white">{test}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-yellow-400/80 mt-3">ALL 10 tests must show zero volts. Any reading means the circuit is NOT dead. Investigate before proceeding.</p>
          </div>
        </motion.div>

        {/* Common mistakes */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Common Mistakes That Kill</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <div className="space-y-3">
              {commonMistakes.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-red-400/10 border border-red-400/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-red-400">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{item.mistake}</p>
                    <p className="text-sm text-white mt-0.5">{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stored energy */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Stored Energy — Don't Assume Dead Means Safe</p>
            <p className="text-sm text-white leading-relaxed mb-3">
              Some equipment retains dangerous energy even after isolation. Capacitors, UPS batteries, DC bus bars, and motor flywheels can deliver lethal shocks or cause injury after the supply is disconnected.
            </p>
            <div className="space-y-1.5">
              {[
                'Large capacitors (motor drives, power factor correction) — can retain charge for minutes or hours after isolation. Discharge safely before approaching.',
                'UPS and battery systems — DC circuits remain live even with AC isolated. Isolate DC separately.',
                'Solar PV arrays — DC side is live whenever there is daylight. Cannot be switched off. Isolate at DC isolator AND cover panels if required.',
                'Motor flywheels and rotating equipment — mechanical stored energy. Wait for rotation to stop completely.',
                'Reg 132.15 requires temporary earthing arrangements to discharge stored energy during prolonged work on de-energised equipment.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Backfeed prevention */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm font-semibold text-white mb-2">Backfeed Prevention</p>
            <p className="text-sm text-white leading-relaxed mb-3">
              Generators, solar PV, and battery storage can backfeed through the installation and energise conductors you believe are dead — including the DNO supply cables.
            </p>
            <div className="space-y-1.5">
              {[
                'Always identify ALL supply sources before isolation — mains, generator, PV, battery, UPS',
                'Generators must have a transfer switch or interlock that prevents parallel operation with the mains',
                'Relying on "engine off" is NOT sufficient backfeed prevention — use mechanical interlocks',
                'If DNO-sealed equipment is opened or supply configuration changed, notify the DNO',
                'Prove dead at the POINT OF WORK, not just at the board — backfeed may not be visible at the isolation point',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Permit to work */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm font-semibold text-white mb-2">When a Permit-to-Work Is Required</p>
            <div className="space-y-1.5">
              {[
                'Work on or near high-voltage systems (>1000V AC)',
                'Complex isolations involving multiple supply sources',
                'Multiple teams working on interconnected systems',
                'Work on live conductors (where all three conditions of EAW Reg 14 are met)',
                'Industrial installations with automated restart — the PTW prevents re-energisation during work',
                'The PTW is a written safe system of work — it records who isolated, what was isolated, and who authorised the work',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowToIsolateSection;
