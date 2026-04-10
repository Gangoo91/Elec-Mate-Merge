import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const preTestChecklist = [
  'Circuit isolated at the distribution board and locked off',
  'Warning notices posted at point of isolation',
  'Proved dead using approved voltage indicator',
  'Voltage indicator proved before and after using proving unit',
  'Test instrument in calibration and battery condition checked',
  'Test lead resistance measured and recorded (null or note value)',
  'All lamps and equipment removed or disconnected from circuit',
  'Circuit route and accessories identified on installation drawings',
];

const socketOutletChecklist = [
  'Line (brown) connected to right-hand terminal (viewed from front)',
  'Neutral (blue) connected to left-hand terminal (viewed from front)',
  'Earth (green/yellow) connected to top terminal',
  'Continuity confirmed from board line to socket line terminal',
  'No continuity from board line to socket neutral terminal',
  'Earth continuity confirmed to socket earth terminal',
  'Accessory faceplate secure and undamaged',
  'Terminal screws tight — no exposed conductor visible',
];

const lightingChecklist = [
  'Switch interrupts line conductor — confirmed by continuity test',
  'Neutral passes straight through to lampholder — not switched',
  'Edison screw fittings: line to centre contact, neutral to outer shell',
  'Bayonet fittings: line to centre contact',
  'Two-way switches: line arrives at common (COM) of switch 1',
  'Two-way switches: switched line leaves from common (COM) of switch 2',
  'Strappers correctly connected between L1 and L2 terminals',
  'Intermediate switches: connected in strappers only, no supply connection',
];

const distributionBoardChecklist = [
  'All single-pole MCBs connected in line conductors only',
  'Neutral conductors connected directly to neutral bar',
  'RCBOs correctly wired — line through device, neutral through device',
  'Main switch breaks line (and neutral for double-pole)',
  'Earth bar connections tight and conductor identification correct',
  'Circuit chart complete and accurate — all circuits labelled',
  'No shared neutrals between circuits (unless designed as such)',
  'Conductor terminations tight — torqued to manufacturer specification',
];

const fusedSpurChecklist = [
  'Fuse is in the line conductor',
  'Supply side connected to "SUPPLY" or "FEED" terminals',
  'Load side connected to "LOAD" terminals',
  'Flex outlet (if present) has line, neutral and earth correctly terminated',
  'Neon indicator (if fitted) illuminates when supply is present',
  'Fuse rating correct for the connected load and cable',
];

const ChecklistSection = ({ title, items }: { title: string; items: string[] }) => (
  <>
    <motion.div variants={itemVariants}>
      <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">{title}</p>
    </motion.div>
    <motion.div variants={itemVariants}>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/10 p-3.5">
            <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mt-0.5">
              <Check className="h-3.5 w-3.5 text-yellow-400" />
            </div>
            <p className="text-sm text-white leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </>
);

const PolarityChecklistsSection = ({ onBack }: Props) => {
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
            <h1 className="text-base font-semibold text-white">Checklists</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Use these checklists to ensure thorough polarity verification at every point in the installation. Work through each item systematically — do not skip accessories.
            </p>
          </div>
        </motion.div>

        <ChecklistSection title="Before You Start" items={preTestChecklist} />
        <ChecklistSection title="Socket Outlets" items={socketOutletChecklist} />
        <ChecklistSection title="Lighting Circuits" items={lightingChecklist} />
        <ChecklistSection title="Distribution Board" items={distributionBoardChecklist} />
        <ChecklistSection title="Fused Connection Units & Spurs" items={fusedSpurChecklist} />

        {/* Recording reminder */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Recording Results</p>
            <p className="text-sm text-white leading-relaxed">
              Record polarity as correct (tick) or incorrect (cross) on the Schedule of Test Results for each circuit. Any incorrect polarity must be rectified before the installation can be certified. Note the fault and remedial action taken in the comments section.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PolarityChecklistsSection;
