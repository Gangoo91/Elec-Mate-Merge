import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const expectedByScenario = [
  { scenario: 'Brand new installation', expected: '>999MΩ (off-scale)', detail: 'New cables with intact insulation should read off the top of the tester scale. Any reading below 200MΩ on new work indicates a problem — investigate before energisation.' },
  { scenario: 'Good existing installation (5-15 years)', expected: '50-200MΩ', detail: 'Normal age-related reduction. Insulation in good condition. No action required beyond recording the value for trending.' },
  { scenario: 'Older installation (15-30 years)', expected: '2-50MΩ', detail: 'Typical of aging PVC insulation. Still well above the 1MΩ minimum but trending downward. Compare with previous readings.' },
  { scenario: 'Aged installation (30+ years)', expected: '1-5MΩ', detail: 'Approaching end of insulation life. While still above the minimum, recommend monitoring at shorter intervals. Consider rewire planning.' },
  { scenario: 'Damp environment', expected: 'Variable — can drop significantly', detail: 'Moisture dramatically reduces IR. Test in dry conditions where possible. A low reading in wet weather may improve when dry — retest to confirm.' },
];

const faultIndicators = [
  { indicator: 'Reading below 1MΩ', severity: 'Fail', action: 'Investigate immediately. Disconnect equipment to confirm the fault is in the fixed wiring. Isolate the circuit section-by-section to locate the fault.' },
  { indicator: 'Significant variation between L-E, N-E, L-N', severity: 'Investigate', action: 'One conductor may have specific damage. The lowest reading identifies the conductor with the problem. Trace and inspect.' },
  { indicator: 'Reading declining during test', severity: 'Investigate', action: 'Insulation under stress. The applied voltage is revealing a weakness. The fault may be intermittent — the insulation is breaking down under voltage.' },
  { indicator: 'Cannot apply full test voltage', severity: 'Investigate', action: 'Check for connected equipment (SPDs, dimmers). If all disconnected, there is likely a dead short — complete insulation failure at some point on the circuit.' },
  { indicator: 'Reading drops then recovers', severity: 'Monitor', action: 'Possible moisture ingress that is drying out under the test voltage. Retest after 24 hours in dry conditions. May indicate a junction box or gland issue.' },
  { indicator: 'Consistent low readings on all circuits', severity: 'Investigate', action: 'Check for a common fault — possibly at the distribution board or in shared trunking. Also check the tester leads and calibration.' },
];

const troubleshooting = [
  { problem: 'Low L-E reading, N-E and L-N normal', actions: ['Line conductor has insulation damage to earth', 'Check cable route for mechanical damage — drilling, nailing', 'Inspect accessories for exposed conductor touching backbox', 'Section the circuit at junction boxes to locate the fault'] },
  { problem: 'Low N-E reading, L-E and L-N normal', actions: ['Neutral conductor has insulation damage to earth', 'Common cause: moisture in junction boxes or conduit', 'Check for neutral conductor trapped under earth terminal', 'Inspect consumer unit terminations for neutral-earth contact'] },
  { problem: 'Low L-N reading, L-E and N-E normal', actions: ['Phase-to-neutral insulation breakdown', 'Can indicate a short circuit that the protection device has not yet cleared', 'Check for damaged cable where L and N conductors are close', 'Inspect accessories for L-N contact inside backboxes'] },
  { problem: 'All three readings low', actions: ['General insulation degradation — likely age or environmental', 'Check for moisture throughout the circuit route', 'Verify all equipment is disconnected', 'If readings improve with equipment disconnected, a connected device is the cause'] },
];

const InsulationExpectedResults = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Expected Results</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {/* Expected by scenario */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Typical Readings by Installation Age</p>
        </motion.div>

        {expectedByScenario.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-white">{item.scenario}</p>
                <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-lg whitespace-nowrap">{item.expected}</span>
              </div>
              <p className="text-sm text-white leading-relaxed">{item.detail}</p>
            </div>
          </motion.div>
        ))}

        {/* Fault indicators */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">What Readings Tell You</p>
        </motion.div>

        {faultIndicators.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-semibold text-white">{item.indicator}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                  item.severity === 'Fail' ? 'text-red-400 bg-red-400/10' :
                  item.severity === 'Monitor' ? 'text-yellow-400 bg-yellow-400/10' :
                  'text-orange-400 bg-orange-400/10'
                }`}>{item.severity}</span>
              </div>
              <p className="text-sm text-white leading-relaxed">{item.action}</p>
            </div>
          </motion.div>
        ))}

        {/* Troubleshooting by test combination */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Fault Diagnosis by Test Combination</p>
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

        {/* Trending */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Trending — Comparing Results Over Time</p>
            <p className="text-sm text-white leading-relaxed mb-3">
              The most valuable use of IR data is comparing results between inspections. A consistent decline over successive periodic inspections indicates insulation degradation and allows planning before failure occurs.
            </p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">Always record ambient temperature so readings can be corrected for comparison</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">A halving of IR between inspections is a strong indicator of active deterioration</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">Request previous EICR results from the client to establish the trend</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InsulationExpectedResults;
