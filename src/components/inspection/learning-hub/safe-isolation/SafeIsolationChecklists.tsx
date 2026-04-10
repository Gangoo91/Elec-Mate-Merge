import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const equipmentChecklist = [
  'GS38-compliant voltage indicator — fused probes, finger guards, adequate insulation',
  'Proving unit — to prove the voltage indicator before and after use',
  'Lock-off devices — suitable for the MCBs/isolators on site (carry multiple types)',
  'Padlocks — unique key, labelled with your name',
  'Warning tags — pre-printed with spaces for name, date, reason',
  'Insulated screwdrivers — for removing fuse carriers where needed',
  'Insulated gloves — rated for the voltage level',
  'Safety glasses — protection against arc flash',
];

const preIsolationChecklist = [
  'Identified the correct circuit from circuit chart or drawings',
  'Checked for multiple supply sources (PV, generator, UPS, battery)',
  'Obtained permission from client/responsible person to isolate',
  'Informed all affected personnel of the planned isolation',
  'Assessed the impact on other services (alarms, refrigeration, IT, medical)',
  'Verified lock-off devices are compatible with the isolation point',
  'Proved the voltage indicator on a known live source or proving unit',
];

const duringWorkChecklist = [
  'Lock-off device remains in place throughout work',
  'Warning tag visible and legible',
  'No one else has access to your padlock key',
  'Re-prove dead if you leave and return to the work area',
  'Keep removed fuses on your person — not on the board or in a pocket that could be confused',
  'Do not remove anyone else\'s lock — even if they ask',
];

const restorationChecklist = [
  'All tools and equipment removed from the work area',
  'All connections made and tightened to specification',
  'All covers and barriers replaced',
  'Work area clear of debris',
  'Inform all personnel that power is about to be restored',
  'Remove your lock and tag',
  'Re-energise and verify correct operation',
  'Perform any required post-work tests (continuity, IR, functional)',
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

const SafeIsolationChecklists = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Checklists</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <ChecklistSection title="Equipment Check" items={equipmentChecklist} />
        <ChecklistSection title="Before Isolation" items={preIsolationChecklist} />
        <ChecklistSection title="During Work" items={duringWorkChecklist} />
        <ChecklistSection title="Restoration" items={restorationChecklist} />

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-red-400/10 border border-red-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Warning Labels (Reg 514.11)</p>
            <p className="text-sm text-white leading-relaxed">
              Where equipment may retain a dangerous electrical charge after disconnection (e.g., large capacitors), a durable warning label must be fixed adjacent to the enclosure. The label must be visible BEFORE opening the enclosure, warning operatives not to presume dead and to follow safe isolation.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SafeIsolationChecklists;
