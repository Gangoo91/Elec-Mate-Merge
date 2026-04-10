import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const ppeRequired = [
  'Safety glasses — mandatory for all live testing',
  'Insulated gloves — when accessing exposed terminals',
  'Safety boots with insulated soles',
  'GS38-compliant test leads with fused probes and finger guards',
];

const equipment = [
  { name: 'Dedicated loop impedance tester', detail: 'Most accurate. High test current (15-25A). Purpose-built for Zs measurement. Automatic temperature compensation on some models.' },
  { name: 'Multifunction tester (MFT)', detail: 'Convenient for comprehensive testing. Check Zs capability and test current (some limited to 10A). Verify calibration for Zs function specifically.' },
  { name: 'GS38-compliant test leads', detail: 'Fused probes, finger guards, adequate insulation. Required for any live testing. Check lead condition before every use.' },
  { name: 'Proving unit', detail: 'To prove the tester is working correctly before and after use. Mandatory — never skip this step.' },
  { name: 'Thermometer', detail: 'To record ambient temperature at the time of testing. Essential for applying temperature correction to readings.' },
];

const socketMethod = [
  'Ensure the socket circuit is energised and the socket is switched on.',
  'Prove the tester on a proving unit before use.',
  'Plug the Zs tester directly into the socket outlet — it connects between phase and earth via the socket pins.',
  'Press the test button and record the reading immediately.',
  'Record the ambient temperature at the time of testing.',
  'On ring circuits, test at multiple sockets — work outwards from the board to find the highest reading.',
  'The highest reading represents the worst-case Zs for that circuit — record this value.',
  'Prove the tester again on the proving unit after completing the test sequence.',
];

const testLeadMethod = [
  'This method is used where socket testing is not possible — for example, lighting circuits, fixed equipment, or distribution boards.',
  'Ensure the circuit is energised. Use GS38-compliant test leads with fused probes.',
  'Connect one probe to the line terminal, the other to the earth terminal at the accessory or board.',
  'Press the test button and record the reading. Note: take extra care — you are working on exposed live terminals.',
  'Record ambient temperature.',
  'Always test at the furthest point from the protective device for the worst-case reading.',
];

const rcdProtectedCircuits = [
  'Many Zs testers inject a current that will trip 30mA RCDs. Use the tester\'s "no-trip" or "RCD mode" if available.',
  'If the RCD trips during testing, note this and use the non-trip test mode. If no non-trip mode is available, temporarily bypass the RCD for Zs testing only — then immediately reconnect.',
  'For RCD-protected circuits, the Zs value only needs to be low enough for the RCD to operate (not the MCB). However, best practice is to verify both.',
  'Record whether the circuit is RCD-protected on the Schedule of Test Results — this affects the maximum permitted Zs.',
];

const commonMistakes = [
  { mistake: 'Measuring at the wrong point', fix: 'Always test at the furthest accessible point of the circuit, not at the board. The highest Zs occurs at the end of the longest cable run.' },
  { mistake: 'Forgetting to record ambient temperature', fix: 'Temperature affects conductor resistance. Record the ambient temperature with every Zs reading so correction can be applied.' },
  { mistake: 'Comparing measured Zs to uncorrected BS 7671 values', fix: 'The 80% rule applies: your measured Zs must not exceed 80% of the BS 7671 maximum (which is stated at conductor operating temperature). See the Temperature section.' },
  { mistake: 'Not proving the test instrument', fix: 'Prove before and after every test session. An unproven instrument could give false readings that pass circuits which should fail.' },
  { mistake: 'Testing with equipment connected', fix: 'Connected equipment can provide parallel paths that reduce the measured Zs, giving misleadingly low (better) readings.' },
  { mistake: 'Not verifying the protective device rating first', fix: 'You must know the exact device type and rating before you can determine the maximum permitted Zs. A 32A Type B has very different limits to a 32A Type C.' },
];

const StepList = ({ steps }: { steps: string[] }) => (
  <div className="space-y-2">
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
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
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

        {/* Ze first */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm font-semibold text-white mb-2">Step 1: Measure Ze First</p>
            <p className="text-sm text-white leading-relaxed mb-3">
              Before testing individual circuits, measure the external earth fault loop impedance (Ze) at the main board. This is the impedance of the supply transformer, supply cables, and earthing arrangement — everything upstream of your installation.
            </p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">Disconnect the main earthing conductor from the MET (with supply isolated) and measure between line and the incoming earth</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">Typical Ze: TN-S = 0.35-0.8Ω, TN-C-S (PME) = 0.2-0.35Ω, TT = varies widely</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">If Ze is unexpectedly high, all circuit Zs values will be affected — investigate before proceeding</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white"><span className="font-semibold text-yellow-400">Cross-check:</span> Ze + R1+R2 (from continuity test) should approximately equal your measured Zs at the circuit end</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Socket outlet method */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4 mb-3">
            <p className="text-sm font-semibold text-white">Step 2: Socket Outlet Method (Most Common)</p>
            <p className="text-sm text-white mt-1">Plug the tester directly into the socket. Quick, safe, and tests the complete installation as the end user experiences it.</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <StepList steps={socketMethod} />
        </motion.div>

        {/* Test lead method */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4 mb-3">
            <p className="text-sm font-semibold text-white">Test Lead Method (Lighting, Fixed Equipment, DBs)</p>
            <p className="text-sm text-white mt-1">Used where plug-in testing is not possible. Requires extra care — you are working on exposed live terminals.</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <StepList steps={testLeadMethod} />
        </motion.div>

        {/* RCD-protected circuits */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">RCD-Protected Circuits</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <div className="space-y-2">
              {rcdProtectedCircuits.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                  <p className="text-sm text-white leading-relaxed">{item}</p>
                </div>
              ))}
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
