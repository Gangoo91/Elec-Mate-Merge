import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const socketChecks = [
  { terminal: 'Line (Right)', what: 'Right-hand terminal when viewed from the front. Must be connected to the line (brown) conductor.', why: 'Ensures the switch on any appliance plugged in breaks the line, not the neutral.' },
  { terminal: 'Neutral (Left)', what: 'Left-hand terminal when viewed from the front. Must be connected to the neutral (blue) conductor.', why: 'Reversed polarity means the plug fuse protects the neutral — the appliance remains live even with a blown fuse.' },
  { terminal: 'Earth (Top)', what: 'Top terminal. Must be connected to the circuit protective conductor (green/yellow).', why: 'Correct by physical design — the earth pin is longer and engages first for safety.' },
];

const lightingChecks = [
  { item: 'Plate Switches', check: 'The line conductor must be connected to the common (COM) terminal. The switch must interrupt the line, not the neutral.', risk: 'If the neutral is switched, the lampholder remains permanently live even when the light is off.' },
  { item: 'Edison Screw (E27/E14)', check: 'Line conductor to centre contact. Neutral conductor to outer threaded shell.', risk: 'Reversed polarity means the threaded shell is live. Anyone touching it while changing a bulb could receive a fatal shock — this is why Edison screw polarity is critical.' },
  { item: 'Bayonet Cap (B22/B15)', check: 'Line conductor to centre contact pin. Neutral to the other contact.', risk: 'Less critical than Edison screw (no exposed thread) but still required to be correct for proper operation and safety.' },
  { item: 'Two-Way Switches', check: 'Line must arrive at the common terminal of switch 1. Switched line must leave from the common terminal of switch 2. Strappers between L1/L2.', risk: 'Incorrect common terminal connection means live strappers can backfeed through the wrong switch.' },
  { item: 'Intermediate Switches', check: 'Connected between the strappers of two-way switches. Must not have any direct connection to line or neutral supply.', risk: 'Wiring errors can leave conductors permanently energised in unexpected positions.' },
];

const isolatorChecks = [
  { item: 'Single-Pole MCBs', check: 'Must be connected in the line conductor only. The neutral should pass straight through to the neutral bar.', risk: 'An MCB in the neutral leaves the circuit live even when tripped.' },
  { item: 'Isolator Switches', check: 'Must break the line conductor. Double-pole isolators must break both line and neutral simultaneously.', risk: 'A neutral-only isolator gives a false sense of security — the circuit is still energised.' },
  { item: 'Fused Connection Units', check: 'The fuse must be in the line conductor. Supply connects to the "SUPPLY" or "FEED" side.', risk: 'A fuse in the neutral provides no overcurrent protection on the live conductor.' },
  { item: 'Emergency Switches', check: 'Must interrupt the line supply. Emergency stop buttons must be immediately accessible and clearly marked.', risk: 'Failure to interrupt line means the equipment remains dangerous even after emergency shutdown.' },
];

const troubleshooting = [
  { problem: 'Reversed polarity at a single socket', cause: 'Line and neutral swapped at the accessory terminals', fix: 'Re-terminate conductors in the correct terminals. Re-test.' },
  { problem: 'Reversed polarity throughout a circuit', cause: 'Line and neutral swapped at the distribution board', fix: 'Re-terminate at the board. Verify every accessory on the circuit afterwards.' },
  { problem: 'Polarity correct at socket but wrong under load', cause: 'Borrowed neutral from another circuit (shared neutral)', fix: 'Trace and separate neutrals. Each circuit must have its own dedicated neutral.' },
  { problem: 'Intermittent polarity readings', cause: 'Loose terminal connections or damaged conductor', fix: 'Tighten all connections. Inspect for cable damage. Replace if necessary.' },
];

const PracticalGuidanceSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">What to Check</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {/* Socket Outlets */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Socket Outlets</p>
        </motion.div>

        {socketChecks.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-yellow-400">{item.terminal.split(' ')[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{item.terminal}</p>
                  <p className="text-sm text-white mt-1 leading-relaxed">{item.what}</p>
                  <p className="text-xs text-yellow-400/80 mt-2">{item.why}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Lighting Circuits */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Lighting Circuits</p>
        </motion.div>

        {lightingChecks.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
              <p className="text-sm font-semibold text-white">{item.item}</p>
              <p className="text-sm text-white leading-relaxed">{item.check}</p>
              <div className="rounded-xl bg-orange-400/5 border border-orange-400/10 p-3">
                <p className="text-xs text-white"><span className="font-semibold text-orange-400">Risk if incorrect:</span> {item.risk}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Isolators & Protection */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Isolators & Protection</p>
        </motion.div>

        {isolatorChecks.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
              <p className="text-sm font-semibold text-white">{item.item}</p>
              <p className="text-sm text-white leading-relaxed">{item.check}</p>
              <div className="rounded-xl bg-orange-400/5 border border-orange-400/10 p-3">
                <p className="text-xs text-white"><span className="font-semibold text-orange-400">Risk if incorrect:</span> {item.risk}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Troubleshooting */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Troubleshooting</p>
        </motion.div>

        {troubleshooting.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
              <p className="text-sm font-semibold text-white">{item.problem}</p>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-white/60 mt-0.5 shrink-0">Cause</span>
                  <p className="text-sm text-white">{item.cause}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-yellow-400/80 mt-0.5 shrink-0">Fix</span>
                  <p className="text-sm text-white">{item.fix}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Common defects found during inspections — from RAG */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Common Defects Found During Inspections</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
            <p className="text-sm text-white mb-1">These are the most frequently encountered polarity-related defects from real inspection data:</p>
            <div className="space-y-2">
              {[
                { defect: 'Incorrect polarity at socket outlets', detail: 'Most common on spurred sockets and sockets added by unqualified persons. Always check every socket, not just ring main outlets.' },
                { defect: 'Loose terminations at accessories', detail: 'Can cause intermittent polarity readings and create fire risk through high-resistance joints. Torque all terminals to manufacturer specification.' },
                { defect: 'Damaged insulation from cable chasing', detail: 'Cable sheath nicked during wall chasing can expose conductors, potentially causing cross-connection between line and neutral.' },
                { defect: 'Incorrect loop continuity on ring circuits', detail: 'Rings that have been broken and reconnected incorrectly can have polarity issues at the point of reconnection.' },
                { defect: 'Missing or damaged CPC at accessories', detail: 'Earth conductor not connected or broken under terminal screw. Particularly common at older accessories being reused.' },
                { defect: 'Neutral and earth conductors not correctly sleeved in backboxes', detail: 'Can lead to confusion during re-termination and incorrect polarity when accessories are changed.' },
                { defect: 'FCU wired with fuse in neutral', detail: 'Particularly common where non-electricians have installed fused spurs. The fuse must always be in the line conductor.' },
                { defect: 'Two-way switches with neutral on common terminal', detail: 'Often found in older installations or where switches have been replaced without understanding the circuit.' },
              ].map((item, i) => (
                <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                  <p className="text-sm font-medium text-white">{item.defect}</p>
                  <p className="text-sm text-white/70 mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pro tips */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Professional Tips</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4 space-y-3">
            {[
              { tip: 'Test systematically', detail: 'Work through circuits in board order. Mark each circuit as tested on the schedule before moving to the next. Do not skip between circuits.' },
              { tip: 'Photograph defects', detail: 'Take photos of any polarity defects found before rectifying them. This provides evidence for the EICR and protects you professionally.' },
              { tip: 'Cross-reference with the circuit chart', detail: 'Verify the circuit chart matches the actual installation. Incorrect labelling at the board is often a sign of other wiring issues.' },
              { tip: 'Check both ends of every conductor', detail: 'A conductor may be correctly identified at the board but incorrectly terminated at the accessory. Always test at the point of use.' },
              { tip: 'Record immediately', detail: 'Write results down as you take them. Do not rely on memory — it is too easy to lose track across multiple circuits.' },
            ].map((item, i) => (
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
      </motion.div>
    </div>
  );
};

export default PracticalGuidanceSection;
