import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const testProcedure = [
  { step: 'Locate the earth electrode and identify suitable positions for auxiliary stakes', note: 'Preferably in undisturbed soil, >3m from the electrode under test' },
  { step: 'Set up 3-wire (fall-of-potential) earth resistance tester: connect E (electrode), P (potential), C (current)', note: 'Place C at 20m and P at 40m from electrode (or per instrument guidance) in a straight line' },
  { step: 'Measure at multiple probe separations to confirm stable reading', note: 'Take at least two consistent results. Readings should be within ±5-10%' },
  { step: 'Record the measured earth electrode resistance', note: 'If inaccessible or unstable, use clamp-on method and note the method used' },
  { step: 'Compare measured Ra with the required maximum: Ra ≤ U₀ ÷ IΔn', note: 'For 30mA RCD: Ra ≤ 230/0.03 = 7,667Ω. Aim for <200Ω for service reliability' },
  { step: 'Record on the certificate (Form 1/2/6 as appropriate)', note: 'Include test method, environmental conditions (dry/wet/frozen), and date' },
];

const commonDefects = [
  { defect: 'High electrode resistance due to dry soil', detail: 'Seasonal variation can cause readings to double in summer. Test in dry conditions for worst-case values. Consider additional rods if consistently high.' },
  { defect: 'Corroded or loose earth clamp', detail: 'Corrosion at the rod head increases contact resistance. Clean and replace clamps during inspection. Use stainless steel or brass clamps.' },
  { defect: 'Rod removed or encroached by landscaping', detail: 'Building works, paving, or garden changes can disturb or expose the electrode. Verify the rod is still in virgin ground.' },
  { defect: 'Interference from nearby metallic structures', detail: 'Bonding to structural steel can create parallel paths that mask true electrode resistance. Disconnect bonds temporarily for accurate measurement.' },
];

const EarthElectrodeSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Earth Electrode Testing</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Earth electrode resistance testing is required for all TT installations. The electrode must provide a low enough resistance for the RCD to operate within required disconnection times. Testing uses the 3-point fall-of-potential method.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Acceptance Criteria</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.05] p-3 text-center">
                <p className="text-xs text-white">Formula</p>
                <p className="text-sm font-bold text-white">Ra ≤ U₀ ÷ IΔn</p>
              </div>
              <div className="rounded-xl bg-white/[0.05] p-3 text-center">
                <p className="text-xs text-white">30mA RCD target</p>
                <p className="text-sm font-bold text-yellow-400">&lt;200Ω</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Test Procedure</p>
        </motion.div>

        {testProcedure.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-1">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-yellow-400">{i + 1}</span>
                </div>
                <div>
                  <p className="text-sm text-white">{item.step}</p>
                  <p className="text-xs text-yellow-400/80 mt-1">{item.note}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Common Defects</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
            {commonDefects.map((item, i) => (
              <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                <p className="text-sm font-medium text-white">{item.defect}</p>
                <p className="text-sm text-white mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alternative electrode types */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Alternative Electrode Types</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
            <p className="text-sm text-white mb-2">Where driven rods cannot achieve adequate resistance (e.g., rocky ground, high-resistivity soil), consider:</p>
            {[
              { type: 'Copper earth tape', detail: 'Buried horizontally at 600mm depth. Effective in shallow topsoil over rock. Requires conductive backfill in high-resistivity soils.' },
              { type: 'Earth plates', detail: 'Copper or galvanised steel plates buried vertically. Greater surface area than rods — useful where depth is limited.' },
              { type: 'Pipe electrodes', detail: 'Copper or galvanised steel pipes driven or buried. Can be used as water pipe connections where metallic continuity exists.' },
              { type: 'Multiple rod electrodes', detail: 'Additional rods connected in parallel reduce combined resistance. Maintain separation ≥ combined driven depth between rods.' },
              { type: 'Foundation electrodes', detail: 'Steel reinforcement in concrete foundations (BS 7430). Very low resistance but requires planning during construction.' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                <p className="text-sm font-medium text-white">{item.type}</p>
                <p className="text-sm text-white mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Labelling */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Earth Connection Labels (BS 951)</p>
            <p className="text-sm text-white leading-relaxed">
              A permanent brass or plastic label to BS 951 format must be fixed at every earth electrode connection, protective bonding point, and main earth terminal. Labels must be durable, legible and fixed to the permanent structure — not to removable covers. Use corrosion-resistant fixings for external electrodes.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EarthElectrodeSection;
