import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const preTestChecks = [
  'Check tester battery condition — low batteries give unreliable readings',
  'Verify calibration certificate is current',
  'Prove tester on proving unit before starting',
  'Clean test probe tips for good contact — contamination gives false readings',
  'Select appropriate test voltage (500V DC for most LV circuits)',
  'Identify all circuits and map out the test sequence from the circuit chart',
  'Walk the installation and disconnect ALL electronic equipment and SPDs',
  'Ensure all switches are ON so test voltage reaches the full circuit extent',
  'Remove all lamps — they create parallel paths that reduce readings',
  'Notify building occupants that power will be isolated during testing',
];

const testingTechniques = [
  { technique: 'Test sequence: L-E first, then N-E, then L-N', detail: 'This order prioritises the most safety-critical test (line to earth) when equipment is freshest. It also allows you to identify which specific conductor has a fault based on which test fails.' },
  { technique: 'Apply for minimum 1 minute', detail: 'Insulation resistance readings stabilise over time as polarisation current decays. A reading taken after 5 seconds may be significantly different from the stable value at 60 seconds.' },
  { technique: 'Record immediately', detail: 'Write the reading on the schedule as soon as the tester stabilises. Do not test multiple circuits and try to record from memory afterwards.' },
  { technique: 'Discharge after every test', detail: 'Short-circuit the tested conductors together and to earth after each test. Long cable runs store dangerous capacitive charge at 500V. Use a discharge stick.' },
  { technique: 'Test individual circuits first', detail: 'If testing the whole installation at once gives a low reading, test each circuit individually to identify the problem circuit. Parallel resistance of many circuits together will always read lower.' },
  { technique: 'Compare L-E and N-E readings', detail: 'For a healthy circuit, L-E and N-E should be similar. A significantly lower reading on one conductor indicates specific damage to that conductor.' },
];

const commonDefects = [
  { defect: 'Low IR due to moisture ingress', detail: 'The most common cause of low readings. Check junction boxes, conduit entries, cable glands, and any point where water could enter. Damp readings often improve dramatically when dried out.', from: 'RAG: practical_work_intelligence' },
  { defect: 'Failed insulation due to cable damage', detail: 'Cables damaged by drilling, nailing, or crushing during building work. Even hairline damage to the sheath can allow moisture in over time, causing progressive insulation breakdown.', from: 'RAG: practical_work_intelligence' },
  { defect: 'Connected equipment reducing readings', detail: 'SPDs, dimmers, LED drivers and electronic equipment left connected during testing create parallel paths that reduce the apparent IR. Always verify everything is disconnected before recording a low result.', from: 'RAG: practical_work_intelligence' },
  { defect: 'Insufficient insulation values from contamination', detail: 'Plaster dust, oil, cleaning chemicals and rodent urine can coat cable surfaces and create conductive paths. Common in industrial, kitchen and agricultural environments.', from: 'RAG: practical_work_intelligence' },
  { defect: 'Loose terminations creating false low readings', detail: 'A loose terminal can allow a conductor to touch an adjacent terminal or the metalwork of the accessory, creating a low-resistance path that appears as poor insulation.', from: 'RAG: practical_work_intelligence' },
];

const proTips = [
  { tip: 'Beware of stored charge', detail: 'Long cable runs (particularly SWA or armoured) store significant capacitive energy at 500V. The discharge can be painful or dangerous. Always discharge all conductors thoroughly after testing.' },
  { tip: 'Test in dry conditions', detail: 'Humidity and surface moisture dramatically affect IR readings. If possible, test when the building is warm and dry. Record weather conditions for borderline results.' },
  { tip: 'Section the circuit for faults', detail: 'When you find a low reading, disconnect the circuit at intermediate junction boxes and test each section separately. The section with the low reading contains the fault.' },
  { tip: 'Check the tester leads themselves', detail: 'Damaged or contaminated test leads can give false low readings. Short the leads together and check for zero — then separate and check for infinity. If the open-circuit reading is less than 200MΩ, the leads need replacing.' },
  { tip: 'Document everything for trending', detail: 'Record the exact reading (not just "pass"), ambient temperature, date, weather conditions, and test voltage. This data is invaluable for comparison at the next periodic inspection.' },
  { tip: 'Flag circuits vulnerable to IR testing', detail: 'BS 7671 requires a durable notice at the distribution board identifying circuits with equipment vulnerable to insulation testing. Check for this before testing and update it if missing.' },
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

        {/* Techniques */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Testing Techniques</p>
        </motion.div>

        {testingTechniques.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-sm font-semibold text-white">{item.technique}</p>
              <p className="text-sm text-white/80 mt-1 leading-relaxed">{item.detail}</p>
            </div>
          </motion.div>
        ))}

        {/* Common defects from RAG */}
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
      </motion.div>
    </div>
  );
};

export default PracticalGuidanceSection;
