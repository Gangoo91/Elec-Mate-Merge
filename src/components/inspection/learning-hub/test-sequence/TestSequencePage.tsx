import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

interface Props { onBack: () => void }

const deadTests = [
  { number: 1, test: 'Continuity of Protective Conductors', ref: 'Reg 612.2', what: 'Verify CPC provides continuous low-resistance path for fault current. Test R1+R2 from board to furthest point of each circuit.', acceptance: 'Continuity confirmed, ≤0.5Ω typical', why: 'Must be done first — proves the earth path exists before any other test relies on it.' },
  { number: 2, test: 'Continuity of Ring Final Circuits', ref: 'Reg 612.2', what: 'End-to-end continuity of L, N and CPC. Cross-connection tests at every socket. Confirms ring is continuous and no breaks exist.', acceptance: 'Consistent readings around ring, no open circuits', why: 'Ring integrity must be verified before insulation testing — a broken ring changes the circuit behaviour.' },
  { number: 3, test: 'Insulation Resistance', ref: 'Reg 612.3', what: 'Apply 500V DC between L-E, N-E, L-N. Measures insulation quality between conductors. Circuit must be isolated, all equipment disconnected.', acceptance: '≥1.0MΩ per circuit (500V test)', why: 'Done after continuity so you know the CPC is connected. Done dead because 500V DC would destroy connected equipment.' },
  { number: 4, test: 'Polarity', ref: 'Reg 612.6', what: 'Verify L, N, E connected to correct terminals at every accessory. Single-pole devices must be in the line conductor only.', acceptance: 'Correct at all terminations — no reversals', why: 'Last dead test. Confirms wiring is correct before the circuit is energised for the first time.' },
];

const liveTests = [
  { number: 5, test: 'Earth Fault Loop Impedance (Zs)', ref: 'Reg 643.7', what: 'Measure total impedance of the fault loop at the furthest point of each circuit. Circuit must be energised.', acceptance: 'Measured Zs ≤ 80% of BS 7671 max for the protective device', why: 'First live test. Confirms the fault loop will allow the protective device to disconnect within required time.' },
  { number: 6, test: 'Prospective Fault Current (PFC)', ref: 'Reg 612.11', what: 'Measure maximum fault current at the origin. Record the higher of L-E and L-N PFC. Compare against device breaking capacity.', acceptance: 'PFC ≥ device minimum for magnetic trip AND ≤ breaking capacity', why: 'Verifies protective devices can safely handle the available fault current without failing.' },
  { number: 7, test: 'RCD Operation', ref: 'Reg 612.13', what: 'Test at 0.5×, 1× and 5× IΔn. Test button check. Both 0° and 180° phase angles for 1× test.', acceptance: 'No trip at 0.5×, ≤300ms at 1× (general), ≤40ms at 5×', why: 'RCDs are the last line of defence against electric shock. Must be verified working after all other tests pass.' },
  { number: 8, test: 'Functional Testing', ref: 'Reg 612.13', what: 'Operate every switch, isolator, control device, interlock, and emergency stop. Verify the installation works as designed.', acceptance: 'All assemblies function correctly as intended', why: 'Final test. Confirms everything actually works — not just that it is wired correctly.' },
];

const TestSequencePage = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-base font-semibold text-white">Test Sequence</h1>
              <p className="text-[10px] text-white">BS 7671 mandated order</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
        {/* Why order matters */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              The test sequence is not arbitrary — each test builds on the results of the previous one. Dead tests verify the wiring is safe before energising. Live tests verify the installation performs correctly under power. Getting the order wrong can destroy equipment, miss faults, or put you at risk.
            </p>
          </div>
        </motion.div>

        {/* Dead tests header */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-yellow-400/20" />
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest px-3">Dead Tests — Circuit Isolated</span>
            <div className="h-px flex-1 bg-yellow-400/20" />
          </div>
        </motion.div>

        {deadTests.map((t) => (
          <motion.div key={t.number} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
              {/* Number strip */}
              <div className="flex items-stretch">
                <div className="w-14 bg-yellow-400/10 flex items-center justify-center border-r border-white/[0.06] shrink-0">
                  <span className="text-2xl font-black text-yellow-400">{t.number}</span>
                </div>
                <div className="flex-1 p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">{t.test}</p>
                    <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-lg shrink-0">{t.ref}</span>
                  </div>
                  <p className="text-sm text-white leading-relaxed">{t.what}</p>
                  <div className="flex items-start gap-2 pt-1">
                    <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded shrink-0 mt-0.5">PASS</span>
                    <p className="text-xs text-white">{t.acceptance}</p>
                  </div>
                  <p className="text-xs text-yellow-400/70 italic">{t.why}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Transition */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4 text-center">
            <p className="text-sm font-semibold text-orange-400">All Dead Tests Must Pass Before Energising</p>
            <p className="text-xs text-white mt-1">If any dead test fails, rectify and retest before proceeding to live tests.</p>
          </div>
        </motion.div>

        {/* Live tests header */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-orange-400/20" />
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest px-3">Live Tests — Circuit Energised</span>
            <div className="h-px flex-1 bg-orange-400/20" />
          </div>
        </motion.div>

        {liveTests.map((t) => (
          <motion.div key={t.number} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
              <div className="flex items-stretch">
                <div className="w-14 bg-orange-400/10 flex items-center justify-center border-r border-white/[0.06] shrink-0">
                  <span className="text-2xl font-black text-orange-400">{t.number}</span>
                </div>
                <div className="flex-1 p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">{t.test}</p>
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-lg shrink-0">{t.ref}</span>
                  </div>
                  <p className="text-sm text-white leading-relaxed">{t.what}</p>
                  <div className="flex items-start gap-2 pt-1">
                    <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded shrink-0 mt-0.5">PASS</span>
                    <p className="text-xs text-white">{t.acceptance}</p>
                  </div>
                  <p className="text-xs text-yellow-400/70 italic">{t.why}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Supplementary */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mt-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-bold text-white uppercase tracking-widest px-3">If Required</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white">+</span>
              <p className="text-sm text-white">Earth electrode resistance (TT systems)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white">+</span>
              <p className="text-sm text-white">Supplementary bonding (bathrooms, special locations)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white">+</span>
              <p className="text-sm text-white">External earth fault loop impedance Ze (at the origin)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white">+</span>
              <p className="text-sm text-white">Phase sequence verification (three-phase installations)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white">+</span>
              <p className="text-sm text-white">Voltage drop verification (long runs or critical loads)</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TestSequencePage;
