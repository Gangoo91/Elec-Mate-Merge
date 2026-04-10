import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const troubleshooting = [
  { problem: 'PFC below minimum for the protective device', actions: ['Confirm the reading by retesting — check connections are secure', 'Verify the protective device type and rating — a Type C MCB needs twice the PFC of a Type B', 'Measure Ze at the intake — if Ze is high, the problem is upstream (DNO supply)', 'Check main bonding and earthing conductor sizes', 'Options: reduce MCB rating, upgrade conductors, add RCD protection, or request DNO supply upgrade'] },
  { problem: 'PFC exceeds device breaking capacity', actions: ['This is a serious safety issue — the device could fail explosively during a fault', 'Verify the reading and check the device kA rating (marked on the device)', 'The device must be upgraded to one with adequate breaking capacity', 'Consider installing a current-limiting device upstream (e.g., HRC fuse)', 'Common near substations or on large commercial supplies'] },
  { problem: 'Large difference between L-E and L-N PFC', actions: ['Normal — L-N PFC is usually higher because the neutral path has lower impedance than the CPC', 'Very large differences may indicate a problem with the earth path', 'Check CPC continuity and main bonding connections', 'If L-E PFC is very low but L-N is adequate, the earth path needs investigation'] },
  { problem: 'PFC varies between repeat tests', actions: ['Supply voltage fluctuations affect PFC readings — test during stable supply conditions', 'Check test lead connections — poor contact gives variable readings', 'Verify tester calibration and battery condition', 'If readings vary by more than 10%, investigate before recording'] },
];

const commonDefects = [
  { defect: 'Protective device breaking capacity inadequate for PFC', detail: 'The measured PFC exceeds the kA rating of the installed MCB. This means the device could fail to safely interrupt a fault. Upgrade to a device with adequate breaking capacity.' },
  { defect: 'PFC too low for magnetic MCB operation', detail: 'The most common finding. Usually caused by long cable runs, undersized conductors, or high Ze from the supply. The MCB will not trip fast enough during a fault.' },
  { defect: 'High Ze from DNO supply', detail: 'The external earth fault loop impedance is higher than expected. Contact the DNO to verify their declared values. Long rural supplies and aging infrastructure are common causes.' },
  { defect: 'Undersized main earthing conductor', detail: 'The main earthing conductor is too small, adding impedance to the fault loop and reducing PFC. Verify sizing against BS 7671 Table 54.7.' },
  { defect: 'Missing or corroded main bonding', detail: 'Bonding connections to gas, water or structural steelwork are loose, corroded, or missing. This affects the earth fault path and can reduce PFC readings.' },
];

const proTips = [
  { tip: 'Test at the origin first', detail: 'The highest PFC will be at the main intake. If this exceeds all device breaking capacities, you are safe. Work outwards from the intake to distribution boards and circuits.' },
  { tip: 'Use PFC to cross-check Zs', detail: 'PFC = 230/Zs. If your PFC reading does not match the calculated value from your Zs measurement, one of the readings is wrong. Investigate before recording.' },
  { tip: 'Record L-N PFC too', detail: 'While the Schedule of Test Results typically records the higher value, knowing both L-E and L-N PFC helps with discrimination studies and fault analysis.' },
  { tip: 'Check device kA ratings at the board', detail: 'Before testing, note the kA rating of every device. After testing, confirm PFC does not exceed any of them. This is often overlooked on domestic inspections.' },
  { tip: 'Consider temperature effects', detail: 'PFC is affected by conductor temperature. A circuit under heavy load will have higher conductor resistance and therefore lower PFC. Test under representative conditions.' },
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
        {/* Troubleshooting */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Troubleshooting</p>
        </motion.div>

        {troubleshooting.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
              <p className="text-sm font-semibold text-white">{item.problem}</p>
              <div className="space-y-1">
                {item.actions.map((action, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                    <p className="text-sm text-white">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Common defects */}
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

        {/* Remedial options */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">When PFC is Inadequate — Remedial Options</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
            {[
              { option: 'Reduce MCB rating', detail: 'A lower-rated MCB needs less PFC for magnetic operation. 32A → 20A reduces minimum PFC from 160A to 100A (Type B). Only viable if the circuit load allows it.' },
              { option: 'Change MCB type', detail: 'Switch from Type C to Type B where possible. Type B needs 5×In vs Type C at 10×In — halving the PFC requirement.' },
              { option: 'Upgrade circuit conductors', detail: 'Larger conductors reduce R1+R2, lowering Zs and increasing PFC. Expensive but solves the root cause.' },
              { option: 'Add RCD protection', detail: 'An RCD provides earth fault protection independently of PFC. Essential for TT systems where PFC is inherently low. Does not solve overcurrent protection inadequacy.' },
              { option: 'Request DNO supply upgrade', detail: 'If Ze is the limiting factor, the DNO may be able to improve the supply. This is usually a last resort and can take time.' },
              { option: 'Install local sub-distribution', detail: 'Shorter circuit runs from a local DB reduce R1+R2 and increase PFC at the point of use.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-yellow-400">{i + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{item.option}</p>
                  <p className="text-sm text-white/70 mt-0.5">{item.detail}</p>
                </div>
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
