import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const preTestChecks = [
  'Check tester battery condition and calibration certificate date',
  'Prove tester on proving unit — confirm it gives a reading on a known circuit',
  'Verify test lead condition — no damage, fused probes, finger guards fitted',
  'Identify the protective device type and rating for every circuit to be tested',
  'Note the ambient temperature — you will need this for correction',
  'Have the BS 7671 tables or 80% values to hand for comparison',
  'Notify occupants that brief supply interruptions may occur (RCD trips)',
];

const ringCircuitStrategy = [
  { step: 'Start at sockets closest to the consumer unit', detail: 'These will have the lowest Zs readings — they confirm the test equipment is working correctly.' },
  { step: 'Work outwards towards the furthest point', detail: 'Zs increases with distance from the board. The highest reading is your recorded test result.' },
  { step: 'Test every spur', detail: 'Spurs have higher Zs than ring sockets because the current path is longer. A spur to a remote utility room may be the worst case.' },
  { step: 'Compare readings for consistency', detail: 'Readings should increase smoothly. A sudden jump suggests a poor connection or break in the ring.' },
  { step: 'Record the highest reading', detail: 'This is the value that goes on the Schedule of Test Results. It represents the worst-case scenario for that circuit.' },
];

const commonDefects = [
  { defect: 'High Zs due to loose CPC connections', detail: 'The most common cause. A loose earth terminal at any point in the circuit increases the entire loop impedance. Check terminal tightness at every accessory.' },
  { defect: 'Undersized conductors', detail: 'Cable too small for the circuit length increases R1+R2 and therefore Zs. Particularly common on long radial runs or extended circuits.' },
  { defect: 'Corroded connections', detail: 'Corrosion at terminals, junction boxes or earth clamps increases resistance. Common in damp locations, outdoor circuits, and near bathrooms.' },
  { defect: 'Missing main bonding', detail: 'If the main bonding is disconnected or missing, the earth fault path is compromised. This can show as abnormally high Ze.' },
  { defect: 'High Ze from supply', detail: 'The external loop impedance (Ze) from the DNO supply can be higher than expected, especially on long rural supplies. Contact the DNO if Ze is consistently high.' },
  { defect: 'Shared neutrals affecting readings', detail: 'Borrowed neutrals from adjacent circuits can create parallel paths that give misleadingly low Zs readings. Investigate unexpected low readings.' },
  { defect: 'Broken ring circuit', detail: 'An open ring forces all current through one leg, effectively doubling the impedance for sockets beyond the break.' },
];

const troubleshooting = [
  { problem: 'Zs reading much higher than expected', actions: ['Check CPC continuity from board to furthest point', 'Inspect all connections for tightness — re-torque', 'Verify the protective conductor is continuous (no breaks)', 'Check for corroded earth clamps or bonding', 'Measure Ze at the board — if Ze is high, the problem is upstream'] },
  { problem: 'Zs reading much lower than expected', actions: ['Check for parallel paths — connected equipment may be providing alternative earth routes', 'Verify the circuit is not borrowing a neutral from another circuit', 'Disconnect all equipment and re-test', 'Check the ring is not cross-connected to another circuit'] },
  { problem: 'Inconsistent readings at different sockets', actions: ['Suspect a broken ring — test end-to-end continuity', 'Check for loose connections causing intermittent contact', 'Look for spurs that may be testing differently to ring sockets', 'Re-test several times at the inconsistent socket to confirm'] },
  { problem: 'RCD trips during Zs test', actions: ['Switch tester to non-trip / RCD mode if available', 'If no non-trip mode, temporarily bypass the RCD for Zs testing only', 'Immediately reconnect the RCD after testing', 'Note on the schedule that the circuit is RCD-protected'] },
];

const proTips = [
  { tip: 'Test Ze first', detail: 'Measure external earth fault loop impedance (Ze) at the main board before testing individual circuits. If Ze is unexpectedly high, all circuit Zs values will be affected.' },
  { tip: 'Calculate expected Zs', detail: 'Ze + R1+R2 (from continuity test) should approximately equal your measured Zs. If not, investigate — there may be a problem with the earth path.' },
  { tip: 'Record everything immediately', detail: 'Write down the Zs reading, ambient temperature, and circuit reference as soon as you take each measurement. Do not batch results from memory.' },
  { tip: 'Use the schedule format', detail: 'The Schedule of Test Results has a specific column for Zs. Fill it in as you go — circuit by circuit, in board order.' },
  { tip: 'Flag borderline results', detail: 'If a reading is between 75-80% of the BS 7671 maximum, it passes today but may fail at the next periodic inspection as connections age. Note it for monitoring.' },
];

const PracticalGuidanceSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Practical Guide</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {/* Pre-test */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Before You Start</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <div className="space-y-1.5">
              {preTestChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Ring circuit strategy */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Ring Circuit Testing Strategy</p>
        </motion.div>

        {ringCircuitStrategy.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                <span className="text-sm font-bold text-yellow-400">{i + 1}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.step}</p>
                <p className="text-sm text-white/70 mt-0.5">{item.detail}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Common defects */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Common Defects Found</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
            {commonDefects.map((item, i) => (
              <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                <p className="text-sm font-medium text-white">{item.defect}</p>
                <p className="text-sm text-white/70 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Troubleshooting */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Troubleshooting</p>
        </motion.div>

        {troubleshooting.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
              <p className="text-sm font-semibold text-white">{item.problem}</p>
              <div className="space-y-1">
                {item.actions.map((action, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                    <p className="text-sm text-white">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Pro tips */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Professional Tips</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4 space-y-3">
            {proTips.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <div>
                  <p className="text-sm font-medium text-white">{item.tip}</p>
                  <p className="text-sm text-white/80 mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* TT System specifics */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">TT Systems — Additional Considerations</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
            <p className="text-sm text-white leading-relaxed">
              TT installations have unique Zs testing requirements because the earth return path goes through the ground via the earth electrode. Ze is much higher than TN systems, so RCDs are mandatory for fault protection.
            </p>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-sm font-semibold text-white mb-1">TT Acceptance Formula</p>
              <p className="text-sm text-white">Ra × IΔn ≤ 50V — where Ra is the total earth electrode resistance and IΔn is the RCD rated residual current.</p>
              <p className="text-sm text-white/70 mt-1">For a 30mA RCD: Ra ≤ 50 ÷ 0.03 = 1,667Ω. In practice, aim for Ra below 200Ω for reliability.</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
            <p className="text-sm font-semibold text-white mb-1">TT Troubleshooting — Persistent RCD Tripping</p>
            <p className="text-sm text-white/70 mb-2">Diagnostic workflow from IET/BS 7430 guidance:</p>
            <div className="space-y-2">
              {[
                'Isolate the supply and prove dead where necessary before accessing terminations.',
                'Visually inspect earthing conductor, clamps and bonding arrangements for corrosion or loose connections.',
                'Measure continuity of earthing conductor from main earthing terminal to electrode.',
                'Perform earth resistance test on electrode using 3-point fall-of-potential method. Record environmental conditions (dry/wet/frozen ground).',
                'Measure earth loop impedance (Zs) on representative circuits and compare with RCD characteristics.',
                'If resistance is excessive, consider additional rods, alternative electrode types (tape/plate), or improving connections and soil contact.',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-yellow-400">{i + 1}</span>
                  </div>
                  <p className="text-sm text-white leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm font-semibold text-white mb-2">Earth Electrode Common Defects</p>
            <div className="space-y-1.5">
              {[
                'Rod driven in disturbed or backfilled ground — poor soil contact gives high resistance',
                'Corroded clamp connections at rod head — increasing resistance over time',
                'Undersized or unprotected earthing conductor between electrode and MET',
                'Seasonal variation — electrode resistance rises significantly in dry summer months',
                'Nearby metallic structures affecting test readings — bonding to structural steel can mask true electrode performance',
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

export default PracticalGuidanceSection;
