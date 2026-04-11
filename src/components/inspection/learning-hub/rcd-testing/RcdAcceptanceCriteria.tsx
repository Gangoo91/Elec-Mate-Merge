import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const generalType = [
  ['0.5× IΔn (15mA)', 'Must NOT trip', 'Confirms RCD is not oversensitive'],
  ['1× IΔn (30mA) at 0°', '≤300ms', 'Core trip test — positive half-cycle'],
  ['1× IΔn (30mA) at 180°', '≤300ms', 'Core trip test — negative half-cycle'],
  ['5× IΔn (150mA)', '≤40ms', 'Fast trip for additional protection'],
];

const sType = [
  ['0.5× IΔn (15mA)', 'Must NOT trip', 'Confirms RCD is not oversensitive'],
  ['1× IΔn (30mA) at 0°', '≤500ms', 'Intentional delay for discrimination'],
  ['1× IΔn (30mA) at 180°', '≤500ms', 'Intentional delay for discrimination'],
  ['5× IΔn (150mA)', '≤150ms', 'Delayed fast trip for discrimination'],
];

const failureIndicators = [
  { indicator: 'No trip at rated current', severity: 'C1', action: 'RCD completely failed. Immediate danger — no earth fault protection. Isolate circuit and replace RCD immediately.' },
  { indicator: 'Trip time >300ms at 1×IΔn (general type)', severity: 'C2', action: 'RCD too slow — disconnection time exceeds BS 7671 limits. Replace RCD.' },
  { indicator: 'Trip time >40ms at 5×IΔn (general type)', severity: 'C2', action: 'Inadequate fast response for additional protection. Replace RCD.' },
  { indicator: 'Trips at 0.5×IΔn', severity: 'Investigate', action: 'RCD oversensitive. Check background leakage current. May indicate high leakage from connected equipment or deteriorating insulation.' },
  { indicator: 'Test button does not operate RCD', severity: 'C1', action: 'Mechanical failure. Replace immediately — no way to verify RCD function between professional tests.' },
  { indicator: 'Inconsistent trip times between tests', severity: 'Investigate', action: 'Possible intermittent fault, temperature sensitivity, or end-of-life deterioration. Repeat tests. Consider replacement if inconsistency persists.' },
  { indicator: 'RCD won\'t reset after tripping', severity: 'Investigate', action: 'Genuine earth fault on protected circuit, high background leakage, or damaged RCD mechanism. Disconnect loads and attempt reset. If it resets with loads disconnected, trace the fault circuit-by-circuit.' },
];

const typicalHealthyValues = [
  { test: '1×IΔn trip time', healthy: '15-30ms', marginal: '100-200ms', failing: '>200ms' },
  { test: '5×IΔn trip time', healthy: '8-15ms', marginal: '25-35ms', failing: '>35ms' },
];

const RcdAcceptanceCriteria = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Pass/Fail Criteria</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {/* General type table */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">General Type RCD (30mA) — GN3 Table 2.17</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left p-3 text-xs font-semibold text-white">Test Current</th>
                    <th className="text-left p-3 text-xs font-semibold text-yellow-400">Limit</th>
                    <th className="text-left p-3 text-xs font-semibold text-white">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {generalType.map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04]">
                      <td className="p-3 text-white font-medium text-xs">{row[0]}</td>
                      <td className="p-3 text-yellow-400 font-semibold">{row[1]}</td>
                      <td className="p-3 text-white text-xs">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* S-type table */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">S-Type (Time Delayed) RCD (30mA)</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left p-3 text-xs font-semibold text-white">Test Current</th>
                    <th className="text-left p-3 text-xs font-semibold text-yellow-400">Limit</th>
                    <th className="text-left p-3 text-xs font-semibold text-white">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {sType.map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04]">
                      <td className="p-3 text-white font-medium text-xs">{row[0]}</td>
                      <td className="p-3 text-yellow-400 font-semibold">{row[1]}</td>
                      <td className="p-3 text-white text-xs">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Typical healthy values */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">What Healthy RCDs Typically Read</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left p-3 text-xs font-semibold text-white">Test</th>
                    <th className="text-left p-3 text-xs font-semibold text-green-400">Healthy</th>
                    <th className="text-left p-3 text-xs font-semibold text-yellow-400">Marginal</th>
                    <th className="text-left p-3 text-xs font-semibold text-red-400">Failing</th>
                  </tr>
                </thead>
                <tbody>
                  {typicalHealthyValues.map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04]">
                      <td className="p-3 text-white font-medium">{row.test}</td>
                      <td className="p-3 text-green-400">{row.healthy}</td>
                      <td className="p-3 text-yellow-400">{row.marginal}</td>
                      <td className="p-3 text-red-400">{row.failing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 border-t border-white/[0.06]">
              <p className="text-xs text-white">A new RCD typically trips in 15-30ms at 1×IΔn. Trip times consistently above 100ms, while still technically within the 300ms limit, suggest the RCD is deteriorating and should be flagged for monitoring or replacement.</p>
            </div>
          </div>
        </motion.div>

        {/* Failure indicators */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Failure Indicators & EICR Coding</p>
        </motion.div>

        {failureIndicators.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-semibold text-white">{item.indicator}</p>
                {item.severity !== 'Investigate' && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${item.severity === 'C1' ? 'text-red-400 bg-red-400/10' : 'text-orange-400 bg-orange-400/10'}`}>{item.severity}</span>
                )}
              </div>
              <p className="text-sm text-white leading-relaxed">{item.action}</p>
            </div>
          </motion.div>
        ))}

        {/* Recording */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Recording Results</p>
            <p className="text-sm text-white leading-relaxed mb-3">
              On the Schedule of Test Results, record for each RCD:
            </p>
            <div className="space-y-1.5">
              {[
                'RCD type and rated residual current (e.g., Type A, 30mA)',
                'Test button operation: Satisfactory / Unsatisfactory',
                'Trip time at 1×IΔn: ___ms (record worst-case from 0° and 180° tests)',
                'Trip time at 5×IΔn: ___ms (mandatory for additional protection)',
                'Non-trip at 0.5×IΔn: confirmed / failed',
                'Overall: Satisfactory / Unsatisfactory',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RcdAcceptanceCriteria;
