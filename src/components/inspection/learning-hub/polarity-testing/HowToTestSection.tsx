import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const equipment = [
  { name: 'Low resistance ohmmeter / continuity tester', detail: 'Minimum 200mA DC test current. Calibration certificate must be current.' },
  { name: 'Approved voltage indicator (for live testing)', detail: 'GS38 compliant with fused probes, finger guards, and adequate insulation. Safety category CAT III 300V minimum.' },
  { name: 'Proving unit', detail: 'To prove voltage indicator before and after use — confirms the tester is working correctly.' },
  { name: 'Wander lead', detail: 'Long lead from distribution board to furthest point. Must be robust with good contact probes.' },
  { name: 'Insulated screwdrivers and hand tools', detail: 'For accessing terminals. VDE rated to 1000V.' },
];

const ppeRequired = [
  'Insulated gloves (where live testing is required)',
  'Safety glasses',
  'Safety boots with insulated soles',
];

const visualInspectionBefore = [
  'Secure mounting of accessories — sockets, switches and FCUs firmly attached',
  'No damage to cable sheaths or insulation',
  'Correct sleeving of earth conductors (green/yellow) in backboxes',
  'Conductor identification correct — brown (line), blue (neutral), green/yellow (earth)',
  'No signs of overheating, discolouration or burning at terminals',
  'Terminal screws tight with no exposed bare conductor beyond the terminal',
];

const deadTestSteps = [
  'Isolate the circuit at the distribution board. Lock off and post warning notices.',
  'Prove dead at the point of work using an approved voltage indicator. Prove the tester before and after.',
  'Connect one lead of the continuity tester to the line conductor at the distribution board.',
  'Take the other lead (wander lead) to the first accessory on the circuit.',
  'Test between the wander lead and the line terminal at the accessory — you should get a low reading (continuity).',
  'Test between the wander lead and the neutral terminal — you should get no reading (open circuit) confirming line is not cross-connected.',
  'Repeat at every accessory, socket outlet, switch, and fused spur on the circuit.',
  'For switches: test with switch ON — continuity to switched line confirms correct polarity. Switch OFF should break the reading.',
];

const liveTestSteps = [
  'Live testing should only be used where dead testing is not practicable — for example, confirming phase presence at a socket during a periodic inspection.',
  'Use a GS38-compliant voltage indicator with appropriate PPE. Prove the tester on a known supply before and after.',
  'Test between line and neutral terminals — should read approximately 230V.',
  'Test between line and earth terminals — should read approximately 230V.',
  'Test between neutral and earth terminals — should read approximately 0V.',
  'If neutral-to-earth reads 230V, polarity is reversed — the line conductor is on the neutral terminal.',
];

const twoWaySwitching = [
  'Identify the common terminal on each two-way switch (usually marked C or COM).',
  'The common terminal on the first switch (nearest the board) must receive the line conductor from the supply.',
  'The common terminal on the last switch must connect to the switched line going to the light fitting.',
  'The L1 and L2 strappers between switches carry line voltage — they are NOT neutrals.',
  'Test: connect continuity tester to line at board. Toggle switches — common terminal at fitting should show continuity in one switch position and open circuit in the other.',
];

const StepList = ({ steps, label }: { steps: string[]; label?: string }) => (
  <div className="space-y-2">
    {label && <p className="text-xs font-medium text-white/60 uppercase tracking-wider mb-1">{label}</p>}
    {steps.map((step, i) => (
      <div key={i} className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/10 p-3.5">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
          <span className="text-sm font-bold text-yellow-400">{i + 1}</span>
        </div>
        <p className="text-sm text-white leading-relaxed pt-1">{step}</p>
      </div>
    ))}
  </div>
);

const HowToTestSection = ({ onBack }: Props) => {
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
            <h1 className="text-base font-semibold text-white">How to Test</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {/* PPE */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">PPE Required</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <div className="space-y-1.5">
              {ppeRequired.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Visual inspection */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Visual Inspection First</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white mb-3">Before connecting any test instruments, visually inspect the installation. Many polarity faults can be spotted by eye.</p>
            <div className="space-y-1.5">
              {visualInspectionBefore.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Equipment */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Test Equipment</p>
          <div className="space-y-2">
            {equipment.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-yellow-400">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{item.name}</p>
                  <p className="text-sm text-white/70 mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dead testing — preferred */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4 mb-3">
            <p className="text-sm font-semibold text-white">Dead Testing (Preferred Method)</p>
            <p className="text-sm text-white mt-1">
              Always the preferred approach. Uses a continuity tester with the circuit isolated — safer and more reliable than live testing.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <StepList steps={deadTestSteps} />
        </motion.div>

        {/* What the results mean */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
            <p className="text-sm font-semibold text-white">Interpreting Dead Test Results</p>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-green-400">OK</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Low reading (continuity) to line terminal</p>
                  <p className="text-sm text-white/70">Line conductor correctly connected</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-green-400">OK</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Open circuit to neutral terminal</p>
                  <p className="text-sm text-white/70">No cross-connection — polarity correct</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-orange-400">!</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Continuity to neutral instead of line</p>
                  <p className="text-sm text-white/70">Reversed polarity — line and neutral swapped. Rectify immediately.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live testing */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4 mb-3">
            <p className="text-sm font-semibold text-white">Live Testing (When Dead Testing is Not Practicable)</p>
            <p className="text-sm text-white mt-1">
              Only use when dead testing cannot be carried out — for example, during a periodic inspection where isolation of individual circuits is impractical. Additional risk — follow safe working practices.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <StepList steps={liveTestSteps} />
        </motion.div>

        {/* Two-way switching */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Two-Way & Intermediate Switching</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 mb-3">
            <p className="text-sm text-white leading-relaxed">
              Two-way switching is a common source of polarity errors. The line conductor must arrive at the common terminal of the first switch, and the switched line must leave from the common terminal of the last switch.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <StepList steps={twoWaySwitching} />
        </motion.div>

        {/* Common mistakes — from RAG practical_work_intelligence */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Common Mistakes to Avoid</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <div className="space-y-3">
              {[
                { mistake: 'Not proving test instruments before use', fix: 'Always prove your voltage indicator on a known live source (or proving unit) before and after every test session.' },
                { mistake: 'Omitting to record results', fix: 'Record polarity as correct/incorrect on the Schedule of Test Results for every circuit. Missing entries invalidate the certificate.' },
                { mistake: 'Testing without isolating all sources', fix: 'Multi-feed installations may have live conductors from other circuits. Identify and isolate all sources before dead testing.' },
                { mistake: 'Not removing parallel paths', fix: 'Disconnect all equipment and accessories that could provide alternative current paths, giving misleading continuity readings.' },
                { mistake: 'Using basic multimeter instead of continuity tester', fix: 'A standard multimeter may not provide the 200mA minimum test current required for reliable continuity readings.' },
                { mistake: 'Forgetting to check fused connection units', fix: 'FCUs are frequently wired incorrectly. Always verify the fuse is in the line conductor and supply/load sides are correct.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-orange-400">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{item.mistake}</p>
                    <p className="text-sm text-white/70 mt-0.5">{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowToTestSection;
