import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const rcdTypes = [
  { type: 'Type AC', detects: 'AC residual currents only', applications: ['Most domestic circuits (older installations)', 'Resistive and inductive loads', 'Lighting circuits', 'Heating elements'], limitations: ['Cannot detect pulsating DC fault currents', 'Not suitable for circuits with electronic equipment that may produce DC components', 'Being phased out in favour of Type A for new installations'] },
  { type: 'Type A', detects: 'AC and pulsating DC residual currents', applications: ['Standard for most modern installations', 'Washing machines, dishwashers', 'Computers, servers, IT equipment', 'Variable speed drives', 'LED lighting with electronic drivers'], limitations: ['Cannot detect smooth DC fault currents', 'Not sufficient for EV charging in all cases'] },
  { type: 'Type F', detects: 'AC, pulsating DC, and composite residual currents with frequency components', applications: ['Single-phase variable speed drives', 'Heat pumps with inverter compressors', 'Air conditioning units with frequency converters', 'Equipment generating mixed-frequency earth leakage'], limitations: ['More expensive than Type A', 'Not required for all VSD applications — check manufacturer guidance'] },
  { type: 'Type B', detects: 'AC, pulsating DC, smooth DC, and composite residual currents', applications: ['EV charging points (Mode 3)', 'Three-phase inverter equipment', 'Medical equipment applications', 'Photovoltaic installations', 'Three-phase variable speed drives'], limitations: ['Most expensive RCD type', 'Specialist test equipment may be needed', 'Physically larger — may not fit standard consumer units'] },
];

const sensitivityRatings = [
  { rating: '10mA', use: 'Medical equipment, patient-contact areas', protection: 'Enhanced personal protection' },
  { rating: '30mA', use: 'Socket outlets, portable equipment, bathrooms, outdoor circuits', protection: 'Additional protection against electric shock — the standard for most circuits' },
  { rating: '100mA', use: 'Fire protection, equipment protection', protection: 'Detects larger leakage currents that could cause arcing/fire' },
  { rating: '300mA', use: 'Distribution boards, sub-mains, industrial equipment', protection: 'Equipment and fire protection with reduced nuisance tripping' },
];

const timeCharacteristics = [
  { type: 'General (Instantaneous)', atRated: '≤300ms', atFiveX: '≤40ms', use: 'Final circuits — sockets, lighting, fixed equipment. Must trip as fast as possible for personal protection.' },
  { type: 'S-Type (Time Delayed)', atRated: '≤500ms', atFiveX: '≤150ms', use: 'Upstream discrimination. Used as the main RCCB when downstream RCBOs are installed. Allows the downstream device to trip first.' },
];

const evChargingRules = [
  'Mode 3 AC charging (7kW-22kW): Type A with 6mA DC detection (Type A-EV) OR Type B',
  'Type A-EV includes built-in 6mA DC residual current detection — usually sufficient for single-phase AC chargers',
  'Type B required only where smooth DC fault currents are possible — typically three-phase chargers or chargers without built-in DC detection',
  'Always check charger manufacturer requirements — some specify Type B regardless',
  'The charger control pilot circuit may have its own DC fault detection, reducing the external RCD requirement',
];

const RcdTypesSection = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">RCD Types</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        {/* Types */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">RCD Types — What They Detect</p>
        </motion.div>

        {rcdTypes.map((rcd, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{rcd.type}</p>
              </div>
              <p className="text-sm text-yellow-400/80">{rcd.detects}</p>
              <div className="grid grid-cols-1 gap-2">
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                  <p className="text-xs font-semibold text-white/60 mb-1.5">Applications</p>
                  <div className="space-y-1">
                    {rcd.applications.map((app, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5" />
                        <p className="text-sm text-white">{app}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                  <p className="text-xs font-semibold text-white/60 mb-1.5">Limitations</p>
                  <div className="space-y-1">
                    {rcd.limitations.map((lim, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5" />
                        <p className="text-sm text-white">{lim}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Sensitivity ratings */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Sensitivity Ratings</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left p-3 text-xs font-semibold text-white/60">Rating</th>
                    <th className="text-left p-3 text-xs font-semibold text-white/60">Use</th>
                    <th className="text-left p-3 text-xs font-semibold text-white/60">Protection</th>
                  </tr>
                </thead>
                <tbody>
                  {sensitivityRatings.map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04]">
                      <td className="p-3 text-yellow-400 font-semibold">{row.rating}</td>
                      <td className="p-3 text-white text-xs">{row.use}</td>
                      <td className="p-3 text-white/70 text-xs">{row.protection}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Time characteristics */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Time Characteristics</p>
        </motion.div>

        {timeCharacteristics.map((tc, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-sm font-semibold text-white mb-2">{tc.type}</p>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="rounded-xl bg-white/[0.05] p-2.5 text-center">
                  <p className="text-xs text-white/60">At 1×IΔn</p>
                  <p className="text-sm font-bold text-white">{tc.atRated}</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-2.5 text-center">
                  <p className="text-xs text-white/60">At 5×IΔn</p>
                  <p className="text-sm font-bold text-yellow-400">{tc.atFiveX}</p>
                </div>
              </div>
              <p className="text-sm text-white/80">{tc.use}</p>
            </div>
          </motion.div>
        ))}

        {/* EV charging */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-3">EV Charging — RCD Selection</p>
            <div className="space-y-1.5">
              {evChargingRules.map((rule, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                  <p className="text-sm text-white">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* What RCDs cannot protect against */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-3">What RCDs Cannot Protect Against</p>
            <div className="space-y-1.5">
              {[
                'Phase-to-neutral shock — no earth leakage current flows, so the RCD sees balanced currents',
                'Phase-to-phase contact in three-phase systems — balanced currents between phases',
                'Overcurrent conditions — RCDs do not provide overcurrent protection (that is the MCB/fuse\'s job)',
                'DC fault currents (for Type AC RCDs) — only detects AC residual currents',
                'Faults upstream of the RCD — the RCD only protects its load side',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
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

export default RcdTypesSection;
