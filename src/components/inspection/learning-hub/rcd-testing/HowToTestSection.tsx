import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const equipment = [
  { name: 'Calibrated RCD tester', detail: 'Capable of injecting 50%, 100% and 5× rated residual current. Must test at 0° and 180° phase angles. Accuracy ±5% or better.' },
  { name: 'Socket adaptor (for plug-in testing)', detail: 'Plugs into socket outlet downstream of RCD. Quick, safe, and tests the complete circuit as installed.' },
  { name: 'Test leads (for terminal testing)', detail: 'For testing at the distribution board or where socket access is not available. Connect between line and CPC.' },
  { name: 'Proving unit', detail: 'To prove the tester before and after use. Mandatory — never skip this step.' },
];

const testSequence = [
  { step: 'Test Button Check', detail: 'Press the mechanical \'T\' button on the RCD. It must trip immediately. If it fails, the RCD is faulty — do not proceed with electrical tests. Replace the RCD.', note: 'This confirms basic mechanical operation only — it does NOT verify electrical performance or trip timing.' },
  { step: 'Connect Tester', detail: 'For socket testing: plug the RCD tester into a socket downstream of the RCD. For terminal testing: connect between line and CPC at the load side of the RCD.', note: 'Verify correct polarity and supply voltage (207-253V) before proceeding.' },
  { step: '50% Test (Non-Trip)', detail: 'Apply 50% of rated tripping current (15mA for a 30mA RCD) for up to 2 seconds. The RCD must NOT trip. If it trips, the RCD is oversensitive — investigate background leakage or replace.', note: 'Record: PASS = no trip, FAIL = tripped.' },
  { step: '100% Test (1×IΔn)', detail: 'Apply 100% of rated tripping current (30mA for a 30mA RCD). Test at both 0° and 180° phase angles. The RCD must trip within 300ms (general type) or 500ms (S-type). Record the worst-case (longest) trip time.', note: 'Typical healthy RCD trips in 20-40ms. Readings >200ms suggest deterioration.' },
  { step: '5×IΔn Test (Additional Protection)', detail: 'Apply 5× rated current (150mA for a 30mA RCD). The RCD must trip within 40ms (general type) or 150ms (S-type). This is the critical test for personal protection — confirms fast disconnection at higher fault currents.', note: 'This test is mandatory where the RCD provides additional protection (Reg 411.3.3).' },
  { step: 'Reset and Verify', detail: 'Reset the RCD after each test. Verify the protected circuits are restored and functioning normally. Record all results on the Schedule of Test Results.', note: 'Check that the RCD resets cleanly — difficulty resetting may indicate a genuine fault on the circuit.' },
];

const commonMistakes = [
  { mistake: 'Testing with loads connected', fix: 'Connected equipment can cause false trips or provide leakage paths that affect results. Disconnect loads where practical, or note load conditions in the results.' },
  { mistake: 'Only pressing the T button without instrument testing', fix: 'The T button checks mechanical operation only. It does not verify trip timing, sensitivity, or response to different fault currents. Calibrated instrument testing is essential.' },
  { mistake: 'Not testing at both phase angles', fix: 'RCDs can be more sensitive at one phase angle than the other. Test at 0° and 180° and record the worst-case (longest) trip time. GN3 Section 2.6.18 requires this.' },
  { mistake: 'Forgetting to notify occupants', fix: 'RCD testing causes power interruptions. Always notify building occupants before testing. Check for critical equipment — alarms, refrigeration, medical equipment, IT systems.' },
  { mistake: 'Not proving the test instrument', fix: 'Prove the tester on a proving unit before and after every test session. An uncalibrated or faulty tester gives false confidence in results.' },
  { mistake: 'Not recording device type (general vs S-type)', fix: 'S-type (time-delayed) RCDs have different acceptance criteria. If you apply general-type limits to an S-type, you will record false failures.' },
];

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
                  <p className="text-sm text-white mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Test sequence */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Test Sequence (6 Steps)</p>
        </motion.div>

        {testSequence.map((item, i) => (
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

        {/* Discrimination testing */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Testing RCDs in Series (Discrimination)</p>
            <p className="text-sm text-white leading-relaxed mb-3">
              When RCDs are installed in series (e.g., main RCCB + downstream RCBO), test the downstream device first. If both trip during testing, discrimination has failed — the upstream device should be S-type (time-delayed) to allow the downstream device to trip first.
            </p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">Test downstream RCDs/RCBOs first — they should trip independently</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">If the upstream RCCB also trips, discrimination is inadequate — upgrade upstream to S-type</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">S-type upstream RCD has intentional time delay (500ms at 1×IΔn, 150ms at 5×IΔn)</p>
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

        {/* Three-phase RCD testing */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Testing Three-Phase RCDs</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
            <p className="text-sm text-white leading-relaxed">
              Three-phase RCDs sense all live conductors through the toroidal transformer. Standard practice is to test on one pole (L1 to CPC), but additional pole testing can detect counterfeit or faulty devices.
            </p>
            <div className="space-y-2">
              {[
                { step: 'Perform standard RCD tests (0.5×, 1×, 5× IΔn) using L1 to CPC as the test connection', note: 'If all tests pass on L1, the device is functioning correctly for most purposes.' },
                { step: 'If any doubt about the device, or if results seem inconsistent — repeat the same tests on L2 and L3', note: 'Genuine RCDs should perform identically on all poles. The sensing covers all live conductors.' },
                { step: 'Compare trip times across all three poles', note: 'Little or no discernible difference should exist. If one pole fails while others pass, the device is faulty.' },
                { step: 'If results differ significantly between poles — remove and replace the unit', note: 'Inconsistent pole performance is a strong indicator of a counterfeit device or internal defect.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-yellow-400">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm text-white">{item.step}</p>
                    <p className="text-xs text-yellow-400/80 mt-1">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Counterfeit RCD Detection</p>
            <p className="text-sm text-white leading-relaxed">
              Counterfeit RCDs are a growing problem in the UK market. They may pass basic single-pole testing but fail on other poles. If you encounter a device with inconsistent results across poles, record serial numbers, remove the device, and report to Trading Standards. Never leave a suspect device in service.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowToTestSection;
