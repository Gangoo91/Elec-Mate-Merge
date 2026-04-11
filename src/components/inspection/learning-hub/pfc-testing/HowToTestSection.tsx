import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const equipment = [
  { name: 'PFC/loop impedance tester', detail: 'Measurement range 10A to 25kA. Accuracy ±5%. CAT III 600V safety rating minimum. Current calibration certificate.' },
  { name: 'GS38-compliant test leads', detail: 'Fused probes with finger guards. Heavy duty rated for live testing. Check condition before every use.' },
  { name: 'Proving unit', detail: 'To prove the tester before and after use. Mandatory for all live testing.' },
  { name: 'PPE for live working', detail: 'Safety glasses, insulated gloves, safety boots. Arc-rated clothing where high fault levels are expected.' },
];

const testSteps = [
  { step: 'Risk Assessment', detail: 'Complete a live working risk assessment. PFC testing MUST be performed on energised circuits — there is no dead alternative. Ensure you have authorisation for live working and appropriate PPE.', note: 'GS38 compliance and proving are mandatory. No exceptions.' },
  { step: 'Preparation', detail: 'Disconnect all loads from the circuit while keeping it energised at the board. Remove lamps, unplug equipment. The circuit must remain live but unloaded. Establish barriers and warning notices.', note: 'Connected loads can affect readings and create parallel paths.' },
  { step: 'Prove Test Equipment', detail: 'Prove the PFC tester on the proving unit. Confirm it gives a reading and the display is functioning correctly.', note: 'Never skip proving — an unproven tester gives false confidence.' },
  { step: 'Phase-Earth Test', detail: 'Connect between phase and earth at the circuit origin (usually the distribution board). Press the test button. The tester briefly creates a controlled low-impedance path and calculates the prospective fault current. Record the reading.', note: 'This is the primary measurement for ADS verification.' },
  { step: 'Phase-Neutral Test', detail: 'Connect between phase and neutral at the same point. Press the test button. Record the reading. This is usually higher than L-E and is important for breaking capacity assessment.', note: 'The higher of L-E and L-N is recorded on the certificate.' },
  { step: 'Record and Assess', detail: 'Record the higher value on the Schedule of Test Results. Compare against the protective device breaking capacity and the minimum PFC required for magnetic operation. Verify the device rating is adequate.', note: 'If PFC exceeds device breaking capacity — immediate danger. The device must be upgraded.' },
];

const whereToTest = [
  { location: 'At the origin of the installation', detail: 'The highest PFC will be at the main intake. This determines the breaking capacity required for the main switch and incomer devices.' },
  { location: 'At each distribution board', detail: 'PFC decreases with distance from the supply. Each DB needs its own PFC measurement to verify the devices installed there are adequate.' },
  { location: 'At the origin of each circuit (optional)', detail: 'For critical circuits or where discrimination is important. The circuit PFC confirms the specific device on that circuit is adequate.' },
];

const commonMistakes = [
  { mistake: 'Trying to test on an isolated circuit', fix: 'PFC can ONLY be measured on a live circuit. Dead testing cannot provide PFC values — the supply impedance only exists when energised.' },
  { mistake: 'Not recording the higher of L-E and L-N', fix: 'BS 7671 requires the greater prospective fault current to be stated on the certificate. Always test both and record the higher value.' },
  { mistake: 'Comparing PFC to the wrong device rating', fix: 'PFC must be compared to breaking capacity (kA rating on the device), not the current rating (A). A 32A MCB with 6kA breaking capacity can handle 6,000A fault current.' },
  { mistake: 'Not proving the test instrument', fix: 'Prove before and after every test session. Live PFC testing relies on accurate readings — an uncalibrated instrument could miss an over-rated installation.' },
  { mistake: 'Poor connections causing arcing', fix: 'Make secure, low-resistance connections before pressing the test button. Loose probe contact on live terminals can cause arcing and burns.' },
];

const calculationMethod = {
  formula: 'Ipf = U₀ ÷ Zs',
  example: {
    title: 'Kitchen Ring Circuit',
    data: ['Ze = 0.35Ω (TN-C-S supply)', 'R1+R2 end-to-end = 0.96Ω', 'Ring factor = 0.25', 'Circuit R1+R2 = 0.96 × 0.25 = 0.24Ω'],
    calculation: ['Zs = Ze + R1+R2 = 0.35 + 0.24 = 0.59Ω', 'PFC = 230V ÷ 0.59Ω = 390A', '32A Type B MCB minimum = 160A', 'Safety margin: 390/160 = 2.4× — satisfactory'],
  },
};

const HowToTestSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">How to Test</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {/* PPE & Equipment */}
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
                  <p className="text-sm text-white mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Test procedure */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4 mb-3">
            <p className="text-sm font-semibold text-white">Live Testing Procedure</p>
            <p className="text-sm text-white mt-1">PFC testing MUST be performed on energised circuits. There is no dead alternative — the supply impedance only exists when the circuit is live.</p>
          </div>
        </motion.div>

        {testSteps.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-yellow-400">{i + 1}</span>
                </div>
                <p className="text-sm font-semibold text-white">{item.step}</p>
              </div>
              <p className="text-sm text-white leading-relaxed pl-11">{item.detail}</p>
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-2.5 ml-11">
                <p className="text-xs text-yellow-400/80">{item.note}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Where to test */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Where to Test</p>
        </motion.div>

        {whereToTest.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-sm font-semibold text-white">{item.location}</p>
              <p className="text-sm text-white mt-1">{item.detail}</p>
            </div>
          </motion.div>
        ))}

        {/* Calculation method */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-3">Calculation Method (Design Verification)</p>
            <div className="rounded-xl bg-white/[0.05] p-3 text-center mb-3">
              <p className="text-lg font-bold text-white">{calculationMethod.formula}</p>
            </div>
            <p className="text-sm font-semibold text-white mb-2">{calculationMethod.example.title}</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white/[0.05] p-3">
                <p className="text-xs text-white mb-1">Given Data</p>
                {calculationMethod.example.data.map((d, i) => (
                  <p key={i} className="text-sm text-white">{d}</p>
                ))}
              </div>
              <div className="rounded-xl bg-white/[0.05] p-3">
                <p className="text-xs text-white mb-1">Calculation</p>
                {calculationMethod.example.calculation.map((c, i) => (
                  <p key={i} className="text-sm text-white">{c}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Common mistakes */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Common Mistakes to Avoid</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <div className="space-y-3">
              {commonMistakes.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-orange-400">{i + 1}</span>
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
      </motion.div>
    </div>
  );
};

export default HowToTestSection;
