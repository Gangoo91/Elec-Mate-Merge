import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const diagnosticTests = [
  { test: 'Insulation Resistance Test', diagnoses: 'Earth faults, insulation breakdown, moisture ingress, cable damage', when: 'Circuit trips RCD, low IR on previous test, suspected insulation damage, after water ingress incident', procedure: 'Isolate and prove dead. Disconnect all loads. Apply 500V DC between L-E, N-E, L-N for 1 minute each. Record. Section circuit at junctions to locate fault if IR is low.', interpretation: '<1MΩ = fault present. Section the circuit to locate. Compare L-E and N-E — the lower one identifies the faulty conductor.' },
  { test: 'Continuity Test', diagnoses: 'Open circuits, broken conductors, loose terminals, disconnected earths', when: 'No power at accessory with MCB on, partial circuit failure, suspected CPC break', procedure: 'Isolate and prove dead. Test from board to furthest accessory. For rings, test end-to-end continuity of L, N and CPC.', interpretation: 'Infinite = open circuit (break). High reading = high resistance joint. Inconsistent ring readings = break in ring.' },
  { test: 'Voltage Measurement', diagnoses: 'Supply problems, loose neutrals, phase imbalance, backfeed', when: 'Equipment malfunction, flickering lights, voltage-related symptoms, suspected supply issue', procedure: 'Measure L-N, L-E, and N-E at the origin. A healthy supply shows ~230V L-N, ~230V L-E, and ~0V N-E.', interpretation: 'High N-E voltage = loose neutral (dangerous). L-N outside 207-253V = supply problem. Fluctuating = intermittent supply fault.' },
  { test: 'Current Measurement (Clamp Meter)', diagnoses: 'Overloads, unbalanced loads, earth leakage, inrush problems', when: 'MCB thermal trips, overheating, suspected overload, RCD nuisance tripping', procedure: 'Clamp around the line conductor of the circuit under test. Read steady-state current under normal operating conditions.', interpretation: 'Current > MCB rating = overload. Current on CPC = earth leakage. Imbalance between phases = unbalanced load or neutral fault.' },
  { test: 'Earth Loop Impedance (Zs)', diagnoses: 'High impedance faults, loose CPC, corroded connections, undersized conductors', when: 'Zs exceeds limits, suspect earth path problems, after cable modifications', procedure: 'Live test at furthest point. Compare with BS 7671 80% limits. Cross-check: Ze + R1+R2 should ≈ measured Zs.', interpretation: 'Zs higher than expected = problem in earth path. Much higher than Ze + R1+R2 = additional resistance in CPC connections.' },
  { test: 'Thermal Imaging', diagnoses: 'Loose connections, overloaded conductors, high-resistance joints, failing components', when: 'Suspected overheating, preventive maintenance, investigating intermittent faults, post-repair verification', procedure: 'Scan with thermal camera under normal load conditions. Compare temperatures of similar connections. Hotspots >10°C above ambient or adjacent connections warrant investigation.', interpretation: 'Localised hotspot = loose connection or high-resistance joint. General heating = overloaded circuit. Hot busbar = undersized or overloaded.' },
];

const DiagnosticsSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Diagnostics</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Each diagnostic test reveals specific fault types. Choosing the right test first saves time — match the test to the symptom before you start.
            </p>
          </div>
        </motion.div>

        {diagnosticTests.map((dt, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
              <p className="text-sm font-semibold text-white">{dt.test}</p>
              <p className="text-xs text-yellow-400/80">{dt.diagnoses}</p>

              <div className="space-y-2">
                <div className="rounded-xl bg-white/[0.05] p-3">
                  <p className="text-xs font-semibold text-white/60 mb-1">When to Use</p>
                  <p className="text-sm text-white">{dt.when}</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-3">
                  <p className="text-xs font-semibold text-white/60 mb-1">Procedure</p>
                  <p className="text-sm text-white">{dt.procedure}</p>
                </div>
                <div className="rounded-xl bg-yellow-400/5 border border-yellow-400/10 p-3">
                  <p className="text-xs font-semibold text-yellow-400 mb-1">How to Interpret</p>
                  <p className="text-sm text-white">{dt.interpretation}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Consumer unit visual inspection */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Consumer Unit Visual Inspection</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
            <p className="text-sm text-white leading-relaxed">Before connecting any test instrument, open the consumer unit and look. Visual inspection finds 80% of faults faster than any instrument. Check for these signs:</p>
            <div className="space-y-2">
              {[
                { check: 'Discoloured or browned busbars', indicates: 'Historic overheating from loose connections or overloaded circuits. Busbar damage may require CU replacement.' },
                { check: 'Melted insulation on conductors', indicates: 'Sustained overheating — the conductor has exceeded its temperature rating. Check the MCB rating against the cable capacity.' },
                { check: 'Charred or blackened terminals', indicates: 'Arcing from loose connections. The connection has been intermittently making and breaking under load.' },
                { check: 'Burning smell (even faint)', indicates: 'Active high-resistance fault. Isolate immediately and investigate — this is a potential fire risk.' },
                { check: 'Loose incoming tails', indicates: 'The main supply connections are not tight. Can cause voltage fluctuations and overheating at the meter tails.' },
                { check: 'Insulation clamped under terminal screws', indicates: 'The conductor was not stripped correctly — the terminal is gripping insulation instead of bare copper. High-resistance connection.' },
                { check: 'Missing covers, shields or barriers', indicates: 'Live parts may be exposed. Immediate danger if the CU is in an area accessible to non-qualified persons.' },
                { check: 'Excess conductors crammed into one terminal', indicates: 'More conductors than the terminal is designed for — poor contact, overheating risk.' },
                { check: 'Signs of moisture or condensation', indicates: 'Water ingress — can cause insulation breakdown, corrosion, and earth faults. Identify and fix the source.' },
                { check: 'Tripped MCBs or RCDs', indicates: 'A device has operated — investigate the cause before resetting. Do not just reset and walk away.' },
              ].map((item, i) => (
                <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                  <p className="text-sm font-medium text-white">{item.check}</p>
                  <p className="text-xs text-yellow-400/80 mt-1">{item.indicates}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* When to use which instrument */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Which Instrument First?</p>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm text-white mb-3">Match the symptom to the instrument — the right first test saves time:</p>
            <div className="space-y-1.5">
              {[
                { symptom: 'Tripping (any device)', instrument: 'Insulation resistance tester — reveals the fault type (L-E, N-E, or L-N)' },
                { symptom: 'No power to accessory', instrument: 'Continuity tester — finds the break in the circuit' },
                { symptom: 'Overheating / burning', instrument: 'Thermal camera + clamp meter — identifies the hot spot and whether the load is excessive' },
                { symptom: 'Flickering / voltage issues', instrument: 'Voltage indicator — measure L-N and N-E to identify supply or neutral problems' },
                { symptom: 'RCD nuisance tripping', instrument: 'IR tester + systematic load disconnection — isolate the leakage source' },
                { symptom: 'Intermittent fault', instrument: 'Thermal camera under load + IR test in the fault condition — capture the fault when it occurs' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                  <p className="text-xs text-white"><span className="font-semibold">{item.symptom}:</span> {item.instrument}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DiagnosticsSection;
